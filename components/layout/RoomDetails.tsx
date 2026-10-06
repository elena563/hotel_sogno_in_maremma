import ImageCarousel from "./ImageCarousel";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { format } from "date-fns";
import { Room } from "@/lib/data/rooms";
import type { BookingSearch } from "@/lib/types";

interface RoomDetailsProps {
  room: Room;
  search?: BookingSearch;
  type?: "gallery" | "quote";
  price?: number;
}

export default function RoomDetails({ room, search, type, price }: RoomDetailsProps) {
  const t = useTranslations("Booking");
  return (
    <div className="flex flex-col md:flex-row gap-2 p-4 bg-surface">
      <div>
        <h3 className="text-secondary w-full font-heading font-semibold text-xl">
          {room.name}
        </h3>
        {room.squareMetersDouble && (
          <span className="text-sm">{room.squareMetersDouble} m² double</span>
        )}
        {room.squareMetersQuadruple && (
          <span className="text-sm">
            {" "}
            | {room.squareMetersQuadruple} m² quadruple
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
      {type === "quote" && price !== undefined && (
        <p className="border-t border-t-secondary mt-2 pt-2 font-semibold">
          {t("price")}: {Math.round(price)} €
        </p>
      )}
      {type === "quote" && search && (
        <Link
          href={{
            pathname: "/booking",
            query: {
              checkIn: format(search.checkIn, "yyyy-MM-dd"),
              checkOut: format(search.checkOut, "yyyy-MM-dd"),
              adults: String(search.adults),
              children: String(search.children),
              board: search.board,
              room: room.type,
            },
          }}
          className="..."
        >
          {t("ctaButton")}
        </Link>
      )}
    </div>
  );
}
