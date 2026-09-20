import { integer, text, boolean, date, pgTable, pgEnum } from "drizzle-orm/pg-core";

export const boardType = pgEnum("board_type", ["bb", "half_board", "full_board"]);
export const roomType = pgEnum("room_type", ["economy", "comfort", "deluxe", "hottub"]);
export const bookingStatus = pgEnum("booking_status", ["pending", "confirmed", "completed", "cancelled"]);

export const booking = pgTable("bookings", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  checkIn: date("checkIn", { mode: 'date' }).notNull(),
  checkOut: date("checkOut", { mode: 'date' }).notNull(),
  adults: integer("adults").notNull(),
    children: integer("children").notNull(),
    room: roomType("room").notNull(),
    price: integer("price").notNull(),
    board: boardType("board").notNull(),
    status: bookingStatus("status").default("pending").notNull(),
  deleted: boolean("deleted").default(false).notNull(),
});
