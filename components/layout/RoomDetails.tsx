import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { format } from "date-fns";

import { Room } from "@/lib/data/rooms";
import type { BookingSearch } from "@/lib/types";
import { buttonVariants } from "@/components/ui/button";
import ImageCarousel from "./ImageCarousel";

interface RoomDetailsProps {
  room: Room;
  search?: BookingSearch;
  type?: "gallery" | "quote";
  price?: number;
}

export default function RoomDetails({ room, search, type, price }: RoomDetailsProps) {
  const t = useTranslations("Booking");
  return (
    <div className="w-full justify-between flex flex-col md:flex-row gap-2 p-4 bg-surface">
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
        <div className="flex flex-col md:flex-row gap-6 mt-2 mr-4">
            {type !== "quote" && (
        <p className="border-t border-t-secondary mt-2 pt-2">
          {room.description}
        </p>
            )}
        <ul className="list-none list-inside">
          { room.amenities !== undefined && room.amenities.map((feature, index) => (
            <li key={index} className="text-sm">
              {feature}
            </li>
          ))}
        </ul>
        </div>
        <div className="flex flex-col items-start gap-4 mt-2 pt-2">
        {type === "quote" && price !== undefined ? (
          <p className="font-semibold">
            {t("price")}: <br /><span className="font-bold text-2xl font-heading">{Math.round(price)} €</span>
          </p>
        ) : (
          <p className="font-semibold">
            {t("starting")}: <br /><span className="font-bold text-2xl font-heading">{room.basePrice}€</span>/{t("night")}
          </p>
        )}
        {type === "quote" && search ? (
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
            className={buttonVariants({ variant: "default" })}
          >
            {t("ctaButton")}
          </Link>
        ) : (
          <Link href="/rooms#room-booking" className={buttonVariants({ variant: "default" })}>
            {t("ctaButton")}
          </Link>
        )}
        </div>
      </div>
      {type === "gallery" ? (
        <ImageCarousel
          images={room.images}
          className="max-w-[12rem] sm:max-w-xs h-full"
          sizes="(min-width: 640px) 320px, 192px"
        />
      ) : (
        <Image
          src={room.headerImage}
          alt={room.name}
          className="max-w-[14rem] sm:max-w-md object-cover object-center"
          width={420}
          height={240}
        />
      )}
    </div>
  );
}
