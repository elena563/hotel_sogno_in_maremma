import Image from "next/image";
import { useTranslations } from "next-intl";
import { Star, WavesHorizontal, Bed, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import BookingCTA from "@/components/layout/BookingCTA";
import RoomsRow from "@/components/layout/RoomsRow";
import ServicePreviewCard from "@/components/layout/ServicePreviewCard";
import ImageCarousel from "@/components/layout/ImageCarousel";

import { rooms } from "@/lib/data/rooms";
import { services } from "@/lib/data/services";

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

const icons = {
  star: Star,
  waves: WavesHorizontal, 
  bed: Bed, 
  users: Users
}


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
         <div className="flex flex-col gap-4 sm:flex-row">
          <Button>Prenota</Button>
          <Button variant="outline">Scopri di più</Button>
        </div>
        <div className="flex flex-col gap-4 sm:flex-row bg-secondary-dark p-6">
          <Button variant="outline_secondary">Scopri di più</Button>
        </div>
        <section>
          <div className="w-full flex flex-wrap justify-around gap-4 py-6">
          {Object.entries(icons).map(([key, Icon], index) => (
            <div key={index} className="flex flex-col items-center gap-2">
              <Icon className="w-10 h-10 text-secondary" />
              <span className="text-3xl font-heading text-secondary">
                {t(`Home.icons.${key}`)}
              </span>
            </div>
            ))}
          </div>
          <div className="flex flex-col items-center gap-6 px-6 py-10">
            <h2 className="text-3xl font-semibold font-heading text-secondary text-center">
              {t("Home.intro")}
            </h2>
            <p className="text-left sm:text-center">
              {t("Home.text")}
            </p>
            <Button variant="outline">{t("Home.book")}</Button>
          </div>
        </section>
        <div className="relative left-1/2 -translate-x-1/2 w-dvw">
          <ImageCarousel
            images={carouselContents}
            showCaptions={true}
            imageHeight={80}
          />
        </div>
        <section className="px-6 py-10">
          <h2 className="text-3xl font-semibold font-heading text-secondary text-center mb-6">
            {t("Home.reviews")}
          </h2>
          <div className="flex flex-col md:flex-row gap-4">
            <blockquote className="bg-surface p-4 rounded-md shadow-md">
              <p>Esperienza indimenticabile! Il servizio è stato impeccabile e le camere sono state perfette.</p>
              <footer>- <cite>Marco Rossi</cite>, Italia</footer>
            </blockquote>
            <blockquote className="bg-surface p-4 rounded-md shadow-md">
              <p>The perfect place to relax and unwind. The staff is friendly and the facilities are top-notch.</p>
              <footer>- <cite>Marie Dupont</cite>, France</footer>
            </blockquote>
          </div>
        </section>
        <section className="p-6">
          <h2 className="text-3xl font-semibold font-heading text-secondary text-center mb-4">
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
