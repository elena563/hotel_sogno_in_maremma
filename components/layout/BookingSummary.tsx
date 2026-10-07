import Image from "next/image";
import { useTranslations } from "next-intl";
import { format } from "date-fns";

import { Room } from "@/lib/data/rooms";
import { BookingSearch } from "@/lib/types";
import { Link } from "@/i18n/navigation";
import { buttonVariants } from "@/components/ui/button";

type Props = {
  search: BookingSearch;
  price: number;
  room: Room;
};

export default function BookingSummary({ search, price, room }: Props) {
    const t = useTranslations("");

    const backQuery: Record<string, string> = {
    checkIn: format(search.checkIn, "yyyy-MM-dd"),
    checkOut: format(search.checkOut, "yyyy-MM-dd"),
    adults: String(search.adults),
    children: String(search.children),
    board: search.board,
    };
    if (search.room) {
      backQuery.room = search.room;
    }
    const backHref = `/rooms?${new URLSearchParams(backQuery).toString()}#room-booking`;

  return (
    <div className="w-full bg-surface p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold font-heading mb-6 text-center">{t("Booking.summary")}</h2>
      <div className="flex flex-col md:flex-row-reverse justify-between items-center gap-4">
        <Image
            src={room.headerImage}
            alt={t(`Rooms.${room.type}.name`)}
            className="max-w-[11rem] sm:max-w-xs object-cover object-center"
            width={250}
            height={200}
          />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <p className="text-xl text-secondary font-heading font-semibold col-span-1 md:col-span-2">
              {t(`Rooms.${room.type}.name`)}
            </p>
            <p className="text-muted-foreground col-span-1 md:col-span-2">
              {t(`Booking.form.${search.board}`)}
            </p>
            <p className="text-muted-foreground">
              <span className="font-semibold">{t("Booking.checkin")}:</span> {search.checkIn.toISOString().split("T")[0]}
            </p>
            <p className="text-muted-foreground">
              <span className="font-semibold">{t("Booking.checkout")}:</span> {search.checkOut.toISOString().split("T")[0]}
            </p>
            <p className="text-muted-foreground col-span-1 md:col-span-2">
              {search.adults} {t("Booking.adults")}
              {search.children > 0 && (
                <span>
                  , {search.children} {t("Booking.children")}
                </span>
              )}
            </p>
            
            <p className="text-lg font-bold col-span-1 md:col-span-2">
              {t("Booking.total")}: €{price.toFixed(2)}
            </p>
            <Link
              href={backHref}
              className={buttonVariants({ variant: "outline" })}
            >
              {t("Booking.backToRooms")}
            </Link>
        </div>
        
      </div>
    </div>
  );
}