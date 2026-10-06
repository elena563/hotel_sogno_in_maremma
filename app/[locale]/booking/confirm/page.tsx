import Link from "next/link";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { db } from "@/db/db";
import { booking } from "@/db/schema";
import BookingSummary from "@/components/layout/BookingSummary";
import { getTranslations } from "next-intl/server";
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
    <main>
      <h2>{t("confirmed")}</h2>
      <p>{t("confirmMessage")}</p>
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
    </main>
  );
}