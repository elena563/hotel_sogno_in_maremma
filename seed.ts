import { addDays, subDays } from "date-fns";

import { db } from "./db/drizzle";
import { booking } from "./db/schema";
import { rooms, type RoomType } from "./lib/data/rooms";
import { calculateTotalPrice, type Board } from "./lib/pricing";

type SeedRow = {
  name: string;
  email: string;
  daysAgo?: number;
  daysAhead?: number;
  nights: number;
  adults: number;
  children: number;
  room: RoomType;
  board: Board;
  status: "pending" | "confirmed" | "completed" | "cancelled";
};

const seedBookings: SeedRow[] = [
  { name: "Marco Bianchi", email: "marco.bianchi@gmail.com", daysAgo: 350, nights: 4, adults: 2, children: 0, room: "comfort", board: "bb", status: "completed" },
  { name: "Giulia Rossi", email: "giulia.rossi@libero.it", daysAgo: 322, nights: 5, adults: 2, children: 1, room: "economy", board: "bb", status: "completed" },
  { name: "Luca Ferrari", email: "luca.ferrari@gmail.com", daysAgo: 298, nights: 3, adults: 1, children: 0, room: "economy", board: "bb", status: "completed" },
  { name: "Chiara Esposito", email: "chiara.esposito@alice.it", daysAgo: 274, nights: 7, adults: 2, children: 2, room: "deluxe", board: "half_board", status: "completed" },
  { name: "Matteo Bruno", email: "matteo.bruno@gmail.com", daysAgo: 251, nights: 4, adults: 2, children: 0, room: "hottub", board: "bb", status: "completed" },
  { name: "Sara Colombo", email: "sara.colombo@libero.it", daysAgo: 233, nights: 6, adults: 3, children: 1, room: "comfort", board: "half_board", status: "completed" },
  { name: "Alessandro Ricci", email: "a.ricci@gmail.com", daysAgo: 210, nights: 2, adults: 2, children: 0, room: "economy", board: "bb", status: "cancelled" },
  { name: "Valentina Greco", email: "valentina.greco@alice.it", daysAgo: 187, nights: 5, adults: 2, children: 0, room: "deluxe", board: "bb", status: "completed" },
  { name: "Davide Marino", email: "davide.marino@gmail.com", daysAgo: 165, nights: 3, adults: 1, children: 0, room: "economy", board: "bb", status: "cancelled" },
  { name: "Francesca Romano", email: "francesca.romano@libero.it", daysAgo: 148, nights: 4, adults: 2, children: 2, room: "comfort", board: "full_board", status: "completed" },
  { name: "Paolo Marchetti", email: "paolo.marchetti@virgilio.it", daysAgo: 131, nights: 6, adults: 2, children: 0, room: "hottub", board: "half_board", status: "completed" },
  { name: "Alice Fontana", email: "alice.fontana@gmail.com", daysAgo: 112, nights: 3, adults: 2, children: 0, room: "comfort", board: "bb", status: "completed" },
  { name: "Simone Barbieri", email: "simone.barbieri@libero.it", daysAgo: 96, nights: 5, adults: 4, children: 0, room: "deluxe", board: "bb", status: "completed" },
  { name: "Martina Longo", email: "martina.longo@alice.it", daysAgo: 78, nights: 4, adults: 2, children: 1, room: "comfort", board: "half_board", status: "completed" },
  { name: "Federico Moretti", email: "f.moretti@gmail.com", daysAgo: 61, nights: 2, adults: 1, children: 0, room: "economy", board: "bb", status: "pending" },
  { name: "Beatrice Sala", email: "beatrice.sala@libero.it", daysAgo: 44, nights: 7, adults: 2, children: 2, room: "deluxe", board: "full_board", status: "completed" },
  { name: "Lorenzo De Angelis", email: "lorenzo.deangelis@gmail.com", daysAgo: 27, nights: 3, adults: 2, children: 0, room: "hottub", board: "bb", status: "completed" },
  { name: "Ilaria Pagano", email: "ilaria.pagano@virgilio.it", daysAgo: 12, nights: 2, adults: 2, children: 0, room: "comfort", board: "bb", status: "pending" },
  { name: "Tommaso Rinaldi", email: "tommaso.rinaldi@gmail.com", daysAhead: 2, nights: 3, adults: 2, children: 0, room: "comfort", board: "bb", status: "confirmed" },
  { name: "Gaia Testa", email: "gaia.testa@alice.it", daysAhead: 5, nights: 4, adults: 2, children: 1, room: "deluxe", board: "half_board", status: "confirmed" },
  { name: "Niccolò Villa", email: "niccolo.villa@gmail.com", daysAhead: 9, nights: 2, adults: 1, children: 0, room: "economy", board: "bb", status: "confirmed" },
  { name: "Camilla Serra", email: "camilla.serra@libero.it", daysAhead: 14, nights: 5, adults: 2, children: 2, room: "comfort", board: "bb", status: "pending" },
  { name: "Riccardo Coppola", email: "riccardo.coppola@gmail.com", daysAhead: 21, nights: 3, adults: 2, children: 0, room: "hottub", board: "bb", status: "confirmed" },
  { name: "Anna Lombardi", email: "anna.lombardi@alice.it", daysAhead: 30, nights: 6, adults: 2, children: 0, room: "deluxe", board: "half_board", status: "confirmed" },
  { name: "Emanuele Fiore", email: "emanuele.fiore@libero.it", daysAhead: 38, nights: 4, adults: 3, children: 1, room: "economy", board: "full_board", status: "pending" },
  { name: "Silvia Benedetti", email: "silvia.benedetti@gmail.com", daysAhead: 47, nights: 7, adults: 2, children: 0, room: "comfort", board: "bb", status: "confirmed" },
];

async function main() {
  const today = new Date();

  const values = seedBookings.map((row) => {
    const room = rooms.find((candidate) => candidate.type === row.room);
    if (!room) throw new Error(`Unknown room type: ${row.room}`);

    const checkIn =
      row.daysAgo != null
        ? subDays(today, row.daysAgo)
        : addDays(today, row.daysAhead ?? 0);
    const checkOut = addDays(checkIn, row.nights);
    const price = Math.round(
      calculateTotalPrice(room, row.adults, row.children, row.board, checkIn, checkOut),
    );

    return {
      name: row.name,
      email: row.email,
      checkIn,
      checkOut,
      adults: row.adults,
      children: row.children,
      room: row.room,
      price,
      board: row.board,
      status: row.status,
    };
  });

  await db.insert(booking).values(values);
  console.log(`Inserted ${values.length} bookings. Run this script only once per database.`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
