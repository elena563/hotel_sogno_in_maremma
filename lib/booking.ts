"use server";

import { z } from "zod";

import { db } from "@/db/db";
import { booking } from "@/db/schema";
import { getAvailableRooms } from "@/lib/availability";
import { toLocalDate } from "@/lib/booking-search";
import { rooms, type RoomType } from "@/lib/data/rooms";
import { calculateTotalPrice, type Board } from "@/lib/pricing";

const ROOM_TYPES = [
  "economy",
  "comfort",
  "deluxe",
  "hottub",
] as const satisfies readonly RoomType[];

const BOARD_VALUES = [
  "bb",
  "half_board",
  "full_board",
] as const satisfies readonly Board[];

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

export type BookingResult =
  | { ok: true }
  | { ok: false; reason: "invalid" | "unavailable" };

export async function createBooking(
  formData: FormData,
): Promise<BookingResult> {
  const parsed = bookingSchema.safeParse(Object.fromEntries(formData));

  if (!parsed.success) return { ok: false, reason: "invalid" };

  const { name, email, adults, children, room: roomType, board } = parsed.data;

  const checkIn = toLocalDate(parsed.data.checkIn);
  const checkOut = toLocalDate(parsed.data.checkOut);

  if (checkOut <= checkIn) return { ok: false, reason: "invalid" };

  const room = rooms.find((candidate) => candidate.type === roomType);

  if (!room) return { ok: false, reason: "invalid" };

  const stillAvailable = await getAvailableRooms(
    rooms,
    adults + children,
    checkIn,
    checkOut,
  );

  if (!stillAvailable.some((candidate) => candidate.type === roomType)) {
    return { ok: false, reason: "unavailable" };
  }

  const price = Math.round(
    calculateTotalPrice(room, adults, children, board, checkIn, checkOut),
  );

  await db.insert(booking).values({
    name,
    email,
    adults,
    children,
    checkIn,
    checkOut,
    room: roomType,
    board,
    price,
  });

  return { ok: true };
}
