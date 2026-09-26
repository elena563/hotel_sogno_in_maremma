import Image from "next/image";
import { useTranslations } from "next-intl";

import RoomsRow from "@/components/layout/RoomsRow";
import BookingCTA from "@/components/layout/BookingCTA";

import { rooms } from "@/lib/data/rooms";

export default function RoomsPage() {
    const t = useTranslations();
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
                <h1 className="text-5xl font-heading font-bold whitespace-pre-line leading-snug">
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
                <BookingCTA type="form" />
            </main>
      </div>
    );
}
