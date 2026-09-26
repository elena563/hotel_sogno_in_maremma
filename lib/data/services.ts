export interface Service {
  id: string;
  image: string;
  illustration: string;
  link: string;
}

export const services: Service[] = [
  {
    id: "pool",
    image: "/images/piscina.jpg",
    illustration: "/images/illustration-pool.png",
    link: "#",
  },
  {
    id: "spa",
    image: "/images/spa.jpg",
    illustration: "/images/illustration-spa.png",
    link: "#",
  },
  {
    id: "restaurant",
    image: "/images/restaurant.jpg",
    illustration: "/images/illustration-restaurant.png",
    link: "#",
  },
  {
    id: "bike",
    image: "/images/bike.jpg",
    illustration: "/images/illustration-bike.png",
    link: "#",
  },
];
