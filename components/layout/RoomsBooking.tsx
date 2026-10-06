import BookingCTA from "@/components/layout/BookingCTA";
import { Room } from "@/lib/data/rooms";
import { calculateTotalPrice } from "@/lib/pricing";
import type { BookingSearch } from "@/lib/types";
import RoomDetails from "./RoomDetails";

type RoomsBookingProps = {
  rooms: Room[];
  search: BookingSearch | null;
};

export default function RoomsBooking({ rooms, search }: RoomsBookingProps) {
  return (
    <div>
        <BookingCTA type="form" />

        {rooms.map((room) => (
        <div key={room.id} className="flex flex-col items-center">
            <RoomDetails
              room={room}
              type="quote"
              price={
                search
                  ? calculateTotalPrice(
                      room,
                      search.adults,
                      search.children,
                      search.board,
                      search.checkIn,
                      search.checkOut,
                    )
                  : undefined
              }
            />
        </div>
        ))}
    </div>
  )
};