import Image from "next/image";
import { getTranslations } from "next-intl/server";

import RoomsRow from "@/components/layout/RoomsRow";
import RoomsBooking from "@/components/layout/RoomsBooking";
import { getAvailableRooms } from "@/lib/availability";
import { parseBookingSearch } from "@/lib/booking-search";

import { rooms } from "@/lib/data/rooms";

type RoomsPageProps = {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function RoomsPage({ searchParams }: RoomsPageProps) {
    const t = await getTranslations();

    const search = parseBookingSearch(await searchParams);
    const availableRooms = search
        ? await getAvailableRooms(rooms, search.adults + search.children, search.checkIn, search.checkOut)
        : rooms;

    return (
        <div className="flex flex-col flex-1 items-center justify-center bg-background font-serif">
            <section className="relative h-[80vh]">
            <Image
                src="/images/hero-rooms.webp"
                alt="Hotel Sogno in Maremma"
                fill
                priority
                className="object-cover object-center"
            />
            <div className="absolute top-1/4 left-0 p-6 m-6 z-10 flex flex-col gap-6 items-start justify-end md:max-w-lg">
                <h1 className="text-5xl font-heading font-bold whitespace-pre-line leading-snug p-4 bg-surface/40 md:bg-transparent">
                {t("Rooms.headline")}
                </h1>
            </div>
            </section>
            <main className="flex flex-1 w-full flex-col max-w-6xl items-center justify-between pb-16 pt-8 sm:items-start">
                <div className="w-full flex flex-col items-center gap-6 px-6 py-10">
                    <h2 className="text-3xl font-semibold font-heading text-secondary text-center">
                    {t("Rooms.intro")}
                    </h2>
                    <p className="text-left sm:text-center">
                    {t("Rooms.text")}
                    </p>
                    <RoomsRow rooms={rooms} />
                </div>
                <span id="book"></span>
                <RoomsBooking rooms={availableRooms} search={search} />
            </main>
      </div>
    );
}
