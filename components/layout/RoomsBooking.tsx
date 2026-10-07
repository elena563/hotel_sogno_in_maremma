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
    <div id="room-booking" className="w-full w-[min(100%-2rem,72rem)]">
        <BookingCTA type="form" />

        {rooms.map((room) => (
        <div key={room.id} className="w-full flex flex-col gap-4 items-center">
            <RoomDetails
              room={room}
              search={search || undefined}
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