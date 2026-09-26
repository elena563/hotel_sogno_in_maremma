import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import BookingCTA from "@/components/layout/BookingCTA";
import RoomsRow from "@/components/layout/RoomsRow";
import ServicePreviewCard from "@/components/layout/ServicePreviewCard";
import ImageCarousel from "@/components/layout/ImageCarousel";

import { rooms } from "@/lib/data/rooms";
import { services } from "@/lib/data/services";

const rooms1 = [
  {
    id: 1,
    name: "Economy Room",
    description:
      "Our Economy Room offers a cozy and comfortable stay with all the essential amenities you need for a relaxing getaway. Perfect for solo travelers or couples, this room provides a budget-friendly option without compromising on quality.",
    header_image: "/images/economy-room.jpg",
    images: [
      "/images/economy-room.jpg",
      "/images/economy-bathroom.jpg",
      "/images/window.jpg",
    ],
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
    images: [
      "/images/deluxe-room.jpg",
      "/images/deluxe-bathroom.jpg",
      "/images/balcony.jpg",
    ],
    square_meters_double: 35,
    square_meters_quadruple: 50,
    price: 250,
  },
];

const carouselImages = [
  {
    src: "/images/pool-detail.webp",
    alt: "Pool",
    position: "object-[10%_70%]",
  },
  { src: "/images/sunset.webp", alt: "Sunset", position: "object-center" },
  {
    src: "/images/breakfast.webp",
    alt: "Breakfast",
    position: "object-[10%_70%]",
  },
  { src: "/images/animal.webp", alt: "Animal", position: "object-[10%_90%]" },
  { src: "/images/bikes.webp", alt: "Bikes", position: "object-center" },
];
export default function Home() {
  const t = useTranslations();
  const slides = t.raw("Slides") as { title: string; caption: string }[];

  const carouselContents = carouselImages.map((image, index) => ({
    ...image,
    title: slides[index].title,
    caption: slides[index].caption,
  }));

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-background font-serif">
      <main className="flex flex-1 w-full flex-col max-w-6xl items-center justify-between py-32 sm:items-start">
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="text-6xl font-heading font-bold text-foreground">
            NATURA, RELAX E COMFORT
          </h1>
        </div>
        <div className="relative left-1/2 -translate-x-1/2 w-dvw">
          <ImageCarousel
            images={carouselContents}
            showCaptions={true}
            imageHeight={80}
          />
        </div>

        <div className="flex flex-col gap-4 sm:flex-row">
          <Button>Prenota</Button>
          <Button variant="outline">Scopri di più</Button>
        </div>
        <div className="flex flex-col gap-4 sm:flex-row bg-secondary-dark p-6">
          <Button variant="outline_secondary">Scopri di più</Button>
        </div>
        <section className="p-6">
          <h2 className="text-3xl font-bold text-secondary text-center mb-4">
            {t("Services.title")}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {services.map((service) => (
              <ServicePreviewCard key={service.id} service={service} />
            ))}
          </div>
        </section>
        <RoomsRow rooms={rooms} />
        <BookingCTA type="form" />
      </main>
    </div>
  );
}
