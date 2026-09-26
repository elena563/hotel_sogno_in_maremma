import ImageCarousel from "./ImageCarousel";

import { Room } from "@/lib/data/rooms";

interface RoomDetailsProps {
  room: Room;
  type?: "gallery" | "quote";
}

export default function RoomDetails({ room, type }: RoomDetailsProps) {
  return (
    <div className="flex flex-col md:flex-row gap-2 p-4 bg-surface">
      <div>
        <h3 className="text-secondary w-full font-heading font-semibold text-xl">
          {room.name}
        </h3>
        {room.square_meters_double && (
          <span className="text-sm">{room.square_meters_double} m² double</span>
        )}
        {room.square_meters_quadruple && (
          <span className="text-sm">
            {" "}
            | {room.square_meters_quadruple} m² quadruple
          </span>
        )}
        <p className="border-t border-t-secondary mt-2 pt-2">
          {room.description}
        </p>
      </div>
      {type === "gallery" && (
        <ImageCarousel
          images={room.images}
          className="max-w-[12rem] sm:max-w-xs"
          sizes="(min-width: 640px) 320px, 192px"
        />
      )}
    </div>
  );
}
