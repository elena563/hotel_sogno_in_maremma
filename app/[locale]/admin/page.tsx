import { and, count, desc, eq, gte, lte, sql } from "drizzle-orm";
import { endOfMonth, format, startOfMonth, subMonths } from "date-fns";
import Link from "next/link";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { db } from "@/db/db";
import { booking, boardType, bookingStatus, roomType } from "@/db/schema";
import RevenueChart from "@/components/layout/RevenueChart";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "cn";

export const metadata: Metadata = {
  title: "Admin | Hotel Sogno in Maremma",
};

const PAGE_SIZE = 10;

const MONTH_KEYS = [
  "jan",
  "feb",
  "mar",
  "apr",
  "may",
  "jun",
  "jul",
  "aug",
  "sep",
  "oct",
  "nov",
  "dec",
] as const;

type StatusValue = (typeof bookingStatus.enumValues)[number];

const STATUS_CLASSES: Record<StatusValue, string> = {
  pending: "text-secondary",
  confirmed: "text-success",
  completed: "text-muted-foreground",
  cancelled: "text-destructive",
};

function KpiCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1 border border-border bg-card p-4">
      <span className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
        {label}
      </span>
      <span className="font-heading text-3xl">{value}</span>
    </div>
  );
}

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ page?: string | string[] }>;
};

export default async function AdminPage({ params, searchParams }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Admin" });

  const rawPage = (await searchParams).page;
  const parsedPage = Number.parseInt(
    Array.isArray(rawPage) ? (rawPage[0] ?? "") : (rawPage ?? ""),
    10,
  );
  const page = Number.isNaN(parsedPage) ? 1 : Math.max(1, parsedPage);

  const now = new Date();
  const monthStart = startOfMonth(now);
  const monthEnd = endOfMonth(now);
  const seriesStart = startOfMonth(subMonths(now, 11));
  const notDeleted = eq(booking.deleted, false);

  const [monthRows, pendingRows, monthlyRevenue, totalRows, rows] =
    await Promise.all([
      db.select({
          bookings: count(),
          revenue: sql<number>`coalesce(sum(${booking.price}), 0)`,
        })
        .from(booking)
        .where(
          and(
            notDeleted,
            gte(booking.checkIn, monthStart),
            lte(booking.checkIn, monthEnd),
          ),
        ),
      db.select({ pending: count() })
        .from(booking)
        .where(and(notDeleted, eq(booking.status, "pending"))),
      db.select({
          month: sql<string>`to_char(${booking.checkIn}, 'YYYY-MM')`,
          revenue: sql<number>`coalesce(sum(${booking.price}), 0)`,
        })
        .from(booking)
        .where(and(notDeleted, gte(booking.checkIn, seriesStart)))
        .groupBy(sql`1`)
        .orderBy(sql`1`),
      db.select({ total: count() }).from(booking).where(notDeleted),
      db.select({
          id: booking.id,
          name: booking.name,
          checkIn: booking.checkIn,
          checkOut: booking.checkOut,
          room: booking.room,
          board: booking.board,
          price: booking.price,
          status: booking.status,
        })
        .from(booking)
        .where(notDeleted)
        .orderBy(desc(booking.checkIn), desc(booking.id))
        .limit(PAGE_SIZE)
        .offset((page - 1) * PAGE_SIZE),
    ]);

  const monthStats = monthRows[0];
  const pendingStats = pendingRows[0];
  const total = totalRows[0].total;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  const eur = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  });

  const revenueByMonth = new Map(
    monthlyRevenue.map((row) => [row.month, Number(row.revenue)]),
  );
  const chartData = Array.from({ length: 12 }, (_, index) => {
    const monthDate = subMonths(startOfMonth(now), 11 - index);
    const key = format(monthDate, "yyyy-MM");
    return {
      month: t(`months.${MONTH_KEYS[monthDate.getMonth()]}`),
      revenue: revenueByMonth.get(key) ?? 0,
    };
  });

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-10">
      <div>
        <h1 className="font-heading text-3xl">{t("title")}</h1>
        <p className="text-sm text-muted-foreground">{t("subtitle")}</p>
      </div>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <KpiCard
          label={t("kpiBookings")}
          value={String(monthStats.bookings)}
        />
        <KpiCard
          label={t("kpiRevenue")}
          value={eur.format(Number(monthStats.revenue))}
        />
        <KpiCard
          label={t("kpiPending")}
          value={String(pendingStats.pending)}
        />
      </section>

      <section className="border border-border bg-card p-4">
        <h2 className="mb-4 font-heading text-xl">{t("chartTitle")}</h2>
        <RevenueChart data={chartData} revenueLabel={t("revenueLabel")} />
      </section>

      <section className="border border-border bg-card p-4">
        <h2 className="mb-4 font-heading text-xl">{t("tableTitle")}</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t("guest")}</TableHead>
              <TableHead>{t("checkIn")}</TableHead>
              <TableHead>{t("checkOut")}</TableHead>
              <TableHead>{t("room")}</TableHead>
              <TableHead>{t("board")}</TableHead>
              <TableHead className="text-right">{t("price")}</TableHead>
              <TableHead>{t("status")}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-center text-muted-foreground"
                >
                  {t("empty")}
                </TableCell>
              </TableRow>
            ) : (
              rows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell className="font-medium">{row.name}</TableCell>
                  <TableCell>{format(row.checkIn, "dd/MM/yyyy")}</TableCell>
                  <TableCell>{format(row.checkOut, "dd/MM/yyyy")}</TableCell>
                  <TableCell>{t(`rooms.${row.room}`)}</TableCell>
                  <TableCell>{t(`boards.${row.board}`)}</TableCell>
                  <TableCell className="text-right">
                    {eur.format(row.price)}
                  </TableCell>
                  <TableCell>
                    <Badge className={STATUS_CLASSES[row.status]}>
                      {t(`statuses.${row.status}`)}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <span className="text-sm text-muted-foreground">
            {t("pageInfo", { page, totalPages, total })}
          </span>
          <span className="flex gap-2">
            {page > 1 ? (
              <Link
                href={`?page=${page - 1}`}
                className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
              >
                {t("prev")}
              </Link>
            ) : (
              <span
                className={cn(
                  buttonVariants({ variant: "outline", size: "sm" }),
                  "pointer-events-none opacity-50",
                )}
              >
                {t("prev")}
              </span>
            )}
            {page < totalPages ? (
              <Link
                href={`?page=${page + 1}`}
                className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
              >
                {t("next")}
              </Link>
            ) : (
              <span
                className={cn(
                  buttonVariants({ variant: "outline", size: "sm" }),
                  "pointer-events-none opacity-50",
                )}
              >
                {t("next")}
              </span>
            )}
          </span>
        </div>
      </section>
    </div>
  );
}
