"use client";

import Image from "next/image"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

export default function ImageCarousel({ images }) {
    return (
        <Carousel className="w-full max-w-[12rem] sm:max-w-xs">
            <CarouselContent>
                {images.map((image, index) => (
                <CarouselItem key={index}>
                    <Image
                        src={image}
                        alt={`Image ${index + 1}`}
                        width={400}
                        height={300}
                        className="object-cover w-full h-48 sm:h-56"
                    />
                </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious className="left-4" />
            <CarouselNext className="right-4" />
        </Carousel>
    );
}