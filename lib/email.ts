import "server-only";

import { format } from "date-fns";
import { Resend } from "resend";

import enMessages from "@/messages/en.json";
import itMessages from "@/messages/it.json";

import type { RoomType } from "@/lib/data/rooms";
import type { Board } from "@/lib/pricing";

type Locale = "it" | "en";

export type BookingEmailData = {
  name: string;
  email: string;
  checkIn: Date;
  checkOut: Date;
  adults: number;
  children: number;
  room: RoomType;
  board: Board;
  price: number;
  locale: Locale;
};

const messages = { it: itMessages, en: enMessages };

type Copy = {
  subject: string;
  greeting: (name: string) => string;
  intro: string;
  room: string;
  board: string;
  checkin: string;
  checkout: string;
  guests: string;
  adults: string;
  children: string;
  total: string;
  footer: string;
};

const copy: Record<Locale, Copy> = {
  it: {
    subject: "Prenotazione confermata - Hotel Sogno in Maremma",
    greeting: (name: string) => `Ciao ${name},`,
    intro: "la tua prenotazione è confermata. Ecco il riepilogo del tuo soggiorno:",
    room: "Camera",
    board: "Trattamento",
    checkin: "Check-in",
    checkout: "Check-out",
    guests: "Ospiti",
    adults: "adulti",
    children: "bambini",
    total: "Totale",
    footer: "Ti aspettiamo in Maremma!",
  },
  en: {
    subject: "Booking confirmed - Hotel Sogno in Maremma",
    greeting: (name: string) => `Hello ${name},`,
    intro: "your booking is confirmed. Here is the summary of your stay:",
    room: "Room",
    board: "Board",
    checkin: "Check-in",
    checkout: "Check-out",
    guests: "Guests",
    adults: "adults",
    children: "children",
    total: "Total",
    footer: "We look forward to welcoming you in Maremma!",
  },
};

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export async function sendBookingConfirmation(data: BookingEmailData) {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.error("RESEND_API_KEY is not set, confirmation email not sent.");
    return;
  }

  const t = copy[data.locale];
  const roomName = messages[data.locale].Rooms[data.room].name;
  const boardName = messages[data.locale].Booking.form[data.board];
  const checkIn = format(data.checkIn, "dd/MM/yyyy");
  const checkOut = format(data.checkOut, "dd/MM/yyyy");
  const guests =
    data.children > 0
      ? `${data.adults} ${t.adults}, ${data.children} ${t.children}`
      : `${data.adults} ${t.adults}`;

  const rows = [
    [t.room, roomName],
    [t.board, boardName],
    [t.checkin, checkIn],
    [t.checkout, checkOut],
    [t.guests, guests],
    [t.total, `€${data.price.toFixed(2)}`],
  ];

  const text = [
    t.greeting(data.name),
    "",
    t.intro,
    "",
    ...rows.map(([label, value]) => `${label}: ${value}`),
    "",
    t.footer,
    "Hotel Sogno in Maremma",
  ].join("\n");

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #2b2b2b;">
      <h1 style="font-size: 22px; margin-bottom: 16px;">${escapeHtml(t.greeting(data.name))}</h1>
      <p style="margin-bottom: 16px;">${escapeHtml(t.intro)}</p>
      <table style="width: 100%; border-collapse: collapse;">
        ${rows
          .map(
            ([label, value]) => `
          <tr>
            <td style="padding: 8px 0; border-bottom: 1px solid #e5e5e5; font-weight: bold;">${escapeHtml(label)}</td>
            <td style="padding: 8px 0; border-bottom: 1px solid #e5e5e5; text-align: right;">${escapeHtml(value)}</td>
          </tr>`,
          )
          .join("")}
      </table>
      <p style="margin-top: 24px;">${escapeHtml(t.footer)}</p>
      <p style="font-weight: bold;">Hotel Sogno in Maremma</p>
    </div>
  `;

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: process.env.EMAIL_FROM ?? "onboarding@resend.dev",
    to: data.email,
    subject: t.subject,
    text,
    html,
  });

  if (error) {
    throw new Error(`Resend error: ${error.message}`);
  }
}
