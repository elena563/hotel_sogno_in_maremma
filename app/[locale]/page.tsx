
import { Button } from "@/components/ui/button";
import RoomCard from "@/components/layout/RoomCard";
import BookingCTA from "@/components/layout/BookingCTA";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import RoomsRow from "@/components/layout/RoomsRow";

const rooms = [
  {
    id: 1,
    name: "Economy Room",
    description:
      "Our Economy Room offers a cozy and comfortable stay with all the essential amenities you need for a relaxing getaway. Perfect for solo travelers or couples, this room provides a budget-friendly option without compromising on quality.",
    header_image: "/images/economy-room.jpg",
    images: ["/images/economy-room.jpg", "/images/economy-bathroom.jpg", "/images/window.jpg"],
    square_meters_double: 35,
    square_meters_quadruple: 50,
    price: 250,
  },
  {
    id: 2,
    name: "Deluxe Room",
    description:
      "Experience the ultimate in comfort and luxury in our Deluxe Room, featuring a spacious layout, elegant furnishings, and modern amenities. Enjoy a restful night's sleep in our plush bedding, and wake up to stunning views of the surrounding landscape.",
    header_image: "/images/deluxe-room.jpg",
    images: ["/images/deluxe-room.jpg", "/images/deluxe-bathroom.jpg", "/images/balcony.jpg"],
    square_meters_double: 35,
    square_meters_quadruple: 50,
    price: 250,
  },
]

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-background font-serif">
    <Header />
      <main className="flex flex-1 w-full flex-col max-w-6xl items-center justify-between py-32 sm:items-start">
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="text-6xl font-heading font-bold text-foreground">
            NATURA, RELAX E COMFORT
          </h1>
        </div>
        <RoomsRow rooms={rooms} />
        <BookingCTA type="form" />
        <div className="flex flex-col gap-4 sm:flex-row">
          <Button>Prenota</Button>
          <Button variant="outline">Scopri di più</Button>
        </div>
        <div className="flex flex-col gap-4 sm:flex-row bg-secondary-dark p-6">
          <Button variant="outline_secondary">Scopri di più</Button>
        </div>
        <RoomCard room={rooms[0]} />
      </main>
      <Footer />
    </div>
  );
}
