import { RoomType } from "@/lib/data/rooms";
import { Board } from "@/lib/pricing";

export const ROOM_TYPES = [
  "economy",
  "comfort",
  "deluxe",
  "hottub",
] as const satisfies readonly RoomType[];

export const BOARD_VALUES = ["bb", "half_board", "full_board"] as const satisfies readonly Board[];

export type BookingSearch = {
  checkIn: Date;
  checkOut: Date;
  adults: number;
  children: number;
  board: Board;
  room?: RoomType;
};