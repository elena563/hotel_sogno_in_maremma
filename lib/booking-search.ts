import { z } from "zod";

import type { Board } from "./pricing";

const BOARD_VALUES = ["bb", "half_board", "full_board"] as const satisfies readonly Board[];

const bookingSearchSchema = z.object({
  checkIn: z.iso.date(),
  checkOut: z.iso.date(),
  adults: z.coerce.number().int().min(0).max(20).default(0),
  children: z.coerce.number().int().min(0).max(20).default(0),
  board: z.enum(BOARD_VALUES).default("bb"),
});

export type BookingSearch = {
  checkIn: Date;
  checkOut: Date;
  adults: number;
  children: number;
  board: Board;
};

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
  };
}
