"use client";

import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface ImageCarouselProps {
  images: {
    src: string;
    alt: string;
    position?: string;
    title?: string;
    caption?: string;
  }[];
  className?: string;
  showCaptions?: boolean;
  imageHeight?: number;
  sizes?: string;
}

export default function ImageCarousel({
  images,
  className,
  showCaptions,
  imageHeight,
  sizes = "100vw",
}: ImageCarouselProps) {
  return (
    <Carousel className={`w-full ${className}`}>
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem key={index}>
            <div className={`relative w-full h-${imageHeight || 48}`}>
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes={sizes}
                priority={index === 0}
                className={`object-cover ${image.position || "object-center"}`}
              />
            </div>
            {showCaptions && (
              <div className="w-full absolute bottom-4 text-surface p-4 ml-2 bg-foreground/30">
                <h3 className="text-xl">{image.title}</h3>
                <p>{image.caption}</p>
              </div>
            )}
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-4" />
      <CarouselNext className="right-4" />
    </Carousel>
  );
}
