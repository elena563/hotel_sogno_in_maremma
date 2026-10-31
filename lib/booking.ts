"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { randomUUID } from "crypto";

import { db } from "@/db/db";
import { booking } from "@/db/schema";
import { getAvailableRooms } from "@/lib/availability";
import { toLocalDate } from "@/lib/booking-search";
import { rooms } from "@/lib/data/rooms";
import { ROOM_TYPES, BOARD_VALUES } from "@/lib/types";
import { calculateTotalPrice } from "@/lib/pricing";
import { sendBookingConfirmation } from "@/lib/email";


const bookingSchema = z.object({
  name: z.string().trim().min(1).max(200),
  email: z.email(),
  checkIn: z.iso.date(),
  checkOut: z.iso.date(),
  adults: z.coerce.number().int().min(0).max(20),
  children: z.coerce.number().int().min(0).max(20),
  room: z.enum(ROOM_TYPES),
  board: z.enum(BOARD_VALUES),
  locale: z.enum(["it", "en"]),
});

export type BookingState =
  | { status: "idle" }
  | {
      status: "error";
      reason: "invalid" | "unavailable" | "terms" | "server";
      fields: { name: string; email: string };
    }

function readFields(fd: FormData) {
  return {
    name: fd.get("name") as string ?? "",
    email: fd.get("email") as string ?? "",
  };
}

export async function createBooking(
  prevState: BookingState,
  formData: FormData,
): Promise<BookingState> {
  const parsed = bookingSchema.safeParse(Object.fromEntries(formData));

  if (!parsed.success) return { status: "error", reason: "invalid", fields: readFields(formData) };

  const { name, email, adults, children, room: roomType, board, locale } = parsed.data;

  if (formData.get("terms-checkbox") !== "on") {
    return { status: "error", reason: "terms", fields: { name, email } };
  }

  const checkIn = toLocalDate(parsed.data.checkIn);
  const checkOut = toLocalDate(parsed.data.checkOut);

  if (checkOut <= checkIn) return { status: "error", reason: "invalid", fields: { name, email } };

  const room = rooms.find((candidate) => candidate.type === roomType);

  if (!room) return { status: "error", reason: "invalid", fields: { name, email } };

  const price = Math.round(
    calculateTotalPrice(room, adults, children, board, checkIn, checkOut),
  );

  let insertedId: number | undefined;
  let insertedToken: string | null = null;

  let attempts = 0;
  const maxAttempts = 3;

  while (attempts < maxAttempts) {
    attempts++;
    try {
      await db.transaction(async (tx) => {
        const stillAvailable = await getAvailableRooms(
          rooms,
          adults + children,
          checkIn,
          checkOut,
          tx,
        );

        if (!stillAvailable.some((candidate) => candidate.type === roomType)) {
          throw new Error("UNAVAILABLE");
        }

        const publicToken = randomUUID();
    const [inserted] = await tx.insert(booking).values({
          name,
          email,
          adults,
          children,
          checkIn,
          checkOut,
          room: roomType,
          board,
          price,
          publicToken,
          source: "ui",
        }).returning({ id: booking.id, publicToken: booking.publicToken });

        insertedId = inserted?.id;
    insertedToken = inserted?.publicToken;
      }, { isolationLevel: "serializable" });
      break;
    } catch (error: any) {
      if (error?.message === "UNAVAILABLE") {
        return { status: "error", reason: "unavailable", fields: { name, email } };
      }
      if (error?.code === "40001" && attempts < maxAttempts) {
        continue;
      }
      console.error("Failed to create booking:", error);
      return { status: "error", reason: "server", fields: { name, email } };
    }
  }

  if (insertedId === undefined) {
    return { status: "error", reason: "server", fields: { name, email } };
  }

  try {
    await sendBookingConfirmation({
      name,
      email,
      checkIn,
      checkOut,
      adults,
      children,
      room: roomType,
      board,
      price,
      locale,
    });
  } catch (error) {
    console.error("Failed to send booking confirmation email:", error);
  }

  redirect(`/booking/confirm?token=${insertedToken ?? ""}`);
}
