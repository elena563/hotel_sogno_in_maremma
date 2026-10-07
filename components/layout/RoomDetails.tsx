import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { format } from "date-fns";
import { Wifi, Fan, Monitor, Vault, Wine, Sofa, Bubbles } from "lucide-react";
import type { LucideIcon } from "lucide-react";

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

const amenities: Record<string, LucideIcon> = {
  wifi: Wifi,
  fan: Fan,
  monitor: Monitor,
  vault: Vault,
  wine: Wine,
  sofa: Sofa,
  bubbles: Bubbles,
};

export default function RoomDetails({ room, search, type, price }: RoomDetailsProps) {
  const t = useTranslations("");
  return (
    <div className="w-full justify-between flex flex-col md:flex-row gap-2 p-4 bg-surface">
      <div className={`flex flex-col gap-4 w-full ${type === 'quote' ? 'md:flex-row md:gap-8' : 'md:gap-4'}`}>
        <div className={`flex flex-col w-full ${type === 'gallery' ? 'gap-2 md:flex-row' : ''}`}>
          <div>
            <h3 className="text-secondary w-full font-heading font-semibold text-xl">
              {t(`Rooms.${room.type}.name`)}
            </h3>

            {room.squareMetersDouble && (
              <span className="text-sm">{room.squareMetersDouble} m² {t("Rooms.double")}</span>
            )}
            {room.squareMetersQuadruple && (
              <span className="text-sm">
                {" "}
                | {room.squareMetersQuadruple} m² {t("Rooms.quadruple")}
              </span>
            )}
            {type !== "quote" && (
              <p className="border-t border-t-secondary mt-2 pt-2">
                {t(`Rooms.${room.type}.description`)}
              </p>
            )}
          </div>
          <ul className={`list-none list-inside ${type === 'quote' ? 'columns-2 border-t border-t-secondary mt-2 pt-2' : 'pt-4 px-4'}`}>
            {room.amenities?.map((key) => {
                const Icon = amenities[key];
                return (
                  <li key={key} className="text-sm mb-1 flex items-center gap-2">
                    <Icon className="w-5 h-5 text-secondary" />
                    <span className="text-nowrap">{t(`Rooms.amenities.${key}`)}</span>
                  </li>
                );
              })}
          </ul>
        </div>

        <div className={`flex flex-col items-start gap-4 pr-2 ${type === 'quote' ? 'md:self-end' : ''}`}>
          {type === "quote" && price !== undefined ? (
            <p className="font-semibold">
              {t("Booking.price")}: <br /><span className="font-bold text-2xl font-heading">{Math.round(price)} €</span>
            </p>
          ) : (
            <p className="font-semibold">
              {t("Rooms.starting")}: <br /><span className="font-bold text-2xl font-heading">{room.basePrice}€</span>/{t("Rooms.night")}
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
              {t("Booking.ctaButton")}
            </Link>
          ) : (
            <Link href="/rooms#room-booking" className={buttonVariants({ variant: "default" })}>
              {t("Booking.ctaButton")}
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
          alt={t(`Rooms.${room.type}.name`)}
          className="max-w-[12rem] sm:max-w-xs object-cover object-center"
          width={320}
          height={240}
        />
      )}
    </div>
  );
}
