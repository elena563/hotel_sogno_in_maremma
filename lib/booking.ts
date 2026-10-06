"use server";

import { z } from "zod";
import { redirect } from "next/navigation";

import { db } from "@/db/db";
import { booking } from "@/db/schema";
import { getAvailableRooms } from "@/lib/availability";
import { toLocalDate } from "@/lib/booking-search";
import { rooms } from "@/lib/data/rooms";
import { ROOM_TYPES, BOARD_VALUES } from "@/lib/types";
import { calculateTotalPrice, type Board } from "@/lib/pricing";


const bookingSchema = z.object({
  name: z.string().trim().min(1).max(200),
  email: z.email(),
  checkIn: z.iso.date(),
  checkOut: z.iso.date(),
  adults: z.coerce.number().int().min(0).max(20),
  children: z.coerce.number().int().min(0).max(20),
  room: z.enum(ROOM_TYPES),
  board: z.enum(BOARD_VALUES),
});

export type BookingState =
  | { status: "idle" }
  | { status: "error"; reason: "invalid" | "unavailable"; fields: { name: string; email: string } }

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

  const { name, email, adults, children, room: roomType, board } = parsed.data;

  const checkIn = toLocalDate(parsed.data.checkIn);
  const checkOut = toLocalDate(parsed.data.checkOut);

  if (checkOut <= checkIn) return { status: "error", reason: "invalid", fields: { name, email } };

  const room = rooms.find((candidate) => candidate.type === roomType);

  if (!room) return { status: "error", reason: "invalid", fields: { name, email } };

  const stillAvailable = await getAvailableRooms(
    rooms,
    adults + children,
    checkIn,
    checkOut,
  );

  if (!stillAvailable.some((candidate) => candidate.type === roomType)) {
    return { status: "error", reason: "unavailable", fields: { name, email } };
  }

  const price = Math.round(
    calculateTotalPrice(room, adults, children, board, checkIn, checkOut),
  );

  const [inserted] = await db.insert(booking).values({
    name,
    email,
    adults,
    children,
    checkIn,
    checkOut,
    room: roomType,
    board,
    price,
  }).returning({ id: booking.id });

  redirect(`/booking/confirmed?id=${inserted.id}`);
}
