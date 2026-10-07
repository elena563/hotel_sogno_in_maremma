import { Room } from "@/lib/data/rooms";
import { BookingSearch } from "@/lib/types";
import { useTranslations } from "next-intl";

type Props = {
  search: BookingSearch;
  price: number;
  room: Room;
};

export default function BookingSummary({ search, price, room }: Props) {
    const t = useTranslations("");

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-2">{t("summary")}</h3>
      <p className="text-sm text-muted-foreground">
        {search.checkIn.toISOString().split("T")[0]} {t("to")} {search.checkOut.toISOString().split("T")[0]} - {search.adults} {t("adults")}, {search.children} {t("children")}
      </p>
      <p className="text-sm text-muted-foreground">
        {t("Booking.room")}: {t(`Rooms.${room.type}.name`)}
      </p>
      <p className="text-lg font-bold">
        {t("Booking.total")}: €{price.toFixed(2)}
      </p>
    </div>
  );
}