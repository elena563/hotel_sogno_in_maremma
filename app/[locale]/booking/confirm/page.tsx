import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { CircleCheckBig } from "lucide-react";

import { Link } from "@/i18n/navigation";
import { db } from "@/db/db";
import { booking } from "@/db/schema";
import BookingSummary from "@/components/layout/BookingSummary";
import { buttonVariants } from "@/components/ui/button";
import { rooms } from "@/lib/data/rooms";

type Props = {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function ConfirmedPage({ searchParams }: Props) {
    const t = await getTranslations("Booking");
    const { id } = await searchParams;
    const [reservation] = await db
    .select()
    .from(booking)
    .where(eq(booking.id, Number(id)));

    if (!reservation) redirect("/");

    const room = rooms.find(r => r.type === reservation.room);
    if (!room) redirect("/");

  return (
    <div className="flex flex-col items-center gap-10 min-h-screen py-12 w-[min(100%-2rem,72rem)] mx-auto">
      <CircleCheckBig className="mx-auto w-16 h-16 text-secondary" />
      <h2 className="text-2xl sm:text-3xl font-bold font-heading text-center text-secondary">{t("confirmed")}</h2>
      <p className="text-center">{t("confirmMessage")}</p>
      <BookingSummary 
        search={{
            checkIn: reservation.checkIn,
            checkOut: reservation.checkOut,
            adults: reservation.adults,
            children: reservation.children,
            board: reservation.board,
            room: reservation.room,
        }} 
        price={reservation.price} 
        room={room} 
        />
        <Link href="/" className={buttonVariants({ variant: "default" })}>
              {t("back")}
          </Link>
    </div>
  );
}