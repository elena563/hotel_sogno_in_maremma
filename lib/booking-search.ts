import { z } from "zod";

import { ROOM_TYPES, BOARD_VALUES, BookingSearch } from "./types";


const bookingSearchSchema = z.object({
  checkIn: z.iso.date(),
  checkOut: z.iso.date(),
  adults: z.coerce.number().int().min(0).max(20).default(0),
  children: z.coerce.number().int().min(0).max(20).default(0),
  board: z.enum(BOARD_VALUES).default("bb"),
  room: z.enum(ROOM_TYPES)
});


export function toLocalDate(iso: string): Date {
  const [year, month, day] = iso.split("-").map(Number);
  return new Date(year, month - 1, day);
}

export function parseBookingSearch(
  searchParams: Record<string, string | string[] | undefined>,
): BookingSearch | null {
  const parsed = bookingSearchSchema.safeParse(searchParams);

  if (!parsed.success) return null;

  const checkIn = toLocalDate(parsed.data.checkIn);
  const checkOut = toLocalDate(parsed.data.checkOut);

  if (checkOut <= checkIn) return null;

  return {
    checkIn,
    checkOut,
    adults: parsed.data.adults,
    children: parsed.data.children,
    board: parsed.data.board,
    room: parsed.data.room,
  };
}
