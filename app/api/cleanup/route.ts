import { NextResponse } from "next/server";
import { cleanupOldBookings } from "@/lib/cleanup";

export async function GET() {
  try {
    const result = await cleanupOldBookings();
    return NextResponse.json({ ok: true, deleted: result.deleted });
  } catch (e) {
    return NextResponse.json({ ok: false, error: String(e) }, { status: 500 });
  }
}
