export interface Service {
  id: string;
  image: string;
  imgPosition?: string;
  illustration: string;
  link: string;
}

export const services: Service[] = [
  {
    id: "pool",
    image: "/images/hero-home.webp",
    imgPosition: "object-center object-right",
    illustration: "/images/illustration-pool.png",
    link: "/about/#pool",
  },
  {
    id: "spa",
    image: "/images/spa.webp",
    imgPosition: "object-center",
    illustration: "/images/illustration-spa.png",
    link: "/about/#spa",
  },
  {
    id: "restaurant",
    image: "/images/restaurant.webp",
    imgPosition: "object-bottom",
    illustration: "/images/illustration-restaurant.png",
    link: "/about/#restaurant",
  },
  {
    id: "bike",
    image: "/images/bike.webp",
    imgPosition: "object-[10%_70%] object-right",
    illustration: "/images/illustration-bike.png",
    link: "/about/#bike",
  },
];
