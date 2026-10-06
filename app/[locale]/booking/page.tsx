import { redirect } from "next/navigation";

import { parseBookingSearch } from "@/lib/booking-search";
import { getAvailableRooms } from "@/lib/availability";
import { rooms } from "@/lib/data/rooms";
import { calculateTotalPrice } from "@/lib/pricing";
import { getTranslations } from "next-intl/server";
import ConfirmForm from "@/components/layout/ConfirmForm";
import BookingSummary from "@/components/layout/BookingSummary";

type Props = {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function BookingPage({ searchParams }: Props) {
    const t = await getTranslations("Booking");
    const search = parseBookingSearch(await searchParams);
  if (!search) redirect("/rooms");

  const availableRooms = await getAvailableRooms(rooms, search.adults + search.children, search.checkIn, search.checkOut);
  if (!availableRooms.some(r => r.type === search.room)) redirect("/rooms");

  const room = rooms.find(r => r.type === search.room);
  if (!room) redirect("/");
  const price = calculateTotalPrice(room, search.adults, search.children, search.board, search.checkIn, search.checkOut);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 w-[min(100%-2rem,72rem)] mx-auto">
            <h1 className="text-3xl font-bold mb-4">{t("ctaTitle")}</h1>
            <BookingSummary search={search} price={price} room={room} />
            <ConfirmForm search={search} />
        </div>
    )
}