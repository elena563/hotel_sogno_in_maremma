"use server";

import { db } from "@/db/db";
import { booking } from "@/db/schema";
import { sql } from "drizzle-orm";

export async function cleanupOldBookings() {
  const result = await db.execute(sql`
    DELETE FROM bookings
    WHERE source = 'ui'
      AND created_at < NOW() - INTERVAL '30 days'
      AND deleted = false
  `);
  return { deleted: result.rowCount ?? 0 };
}
