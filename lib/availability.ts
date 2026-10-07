import "server-only";

import { Room } from "./data/rooms";

import { db } from "@/db/db";
import { booking } from "@/db/schema";
import { and, lt, gt, eq, ne } from "drizzle-orm";


export async function getAvailableRooms(
  rooms: Room[],
  nGuests: number,
  checkIn: Date,
  checkOut: Date,
): Promise<Room[]> {
  const rows = await db
    .select({ room: booking.room })
    .from(booking)
    .where(and(
      lt(booking.checkIn, checkOut),
      gt(booking.checkOut, checkIn),
      eq(booking.deleted, false),
      ne(booking.status, "cancelled"),
    ));

  const counts = new Map<string, number>();
  for (const row of rows) {
    counts.set(row.room, (counts.get(row.room) ?? 0) + 1);
  }

  return rooms.filter(
    (room) =>
      (room.maxOccupancy ?? 2) >= nGuests &&
      (room.units ?? 1) > (counts.get(room.type) ?? 0),
  );
}