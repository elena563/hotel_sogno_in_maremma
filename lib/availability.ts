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

  const booked = new Set(rows.map((r) => r.room));

  return rooms.filter(
    (room) => (room.maxOccupancy ?? 2) >= nGuests && !booked.has(room.type),
  );
}