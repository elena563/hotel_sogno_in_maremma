import { Room } from "@/lib/data/rooms";
import { BookingSearch } from "@/lib/types";
import { getTranslations } from "next-intl/server";

type Props = {
  search: BookingSearch;
  price: number;
  room: Room;
};

export default async function BookingSummary({ search, price, room }: Props) {
    const t = await getTranslations("Booking");

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-2">{t("summary")}</h3>
      <p className="text-sm text-muted-foreground">
        {search.checkIn.toISOString().split("T")[0]} {t("to")} {search.checkOut.toISOString().split("T")[0]} - {search.adults} {t("adults")}, {search.children} {t("children")}
      </p>
      <p className="text-sm text-muted-foreground">
        {t("room")}: {room?.name}
      </p>
      <p className="text-lg font-bold">
        {t("total")}: €{price.toFixed(2)}
      </p>
    </div>
  );
}