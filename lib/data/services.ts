export interface Service {
  id: number;
  title: string;
  description: string;
  image: string;
  illustration: string;
  link: string;
}

export const services: Service[] = [
  {
    id: 1,
    title: "Le piscine",
    description:
      "Vivrai il piacere dell'acqua in un ambiente rilassante e rigenerante.",
    image: "/images/piscina.jpg",
    illustration: "/images/illustration-pool.png",
    link: "#",
  },
  {
    id: 2,
    title: "La spa",
    description:
      "Nel nostro rifugio di benessere, potrai rigenerare mente e corpo.",
    image: "/images/spa.jpg",
    illustration: "/images/illustration-spa.png",
    link: "#",
  },
  {
    id: 3,
    title: "Il ristorante",
    description:
      "Il nostro ristorante incanta con piatti raffinati e sapori autentici, offrendo un'esperienza culinaria indimenticabile.",
    image: "/images/restaurant.jpg",
    illustration: "/images/illustration-restaurant.png",
    link: "#",
  },
  {
    id: 4,
    title: "Il noleggio bici",
    description:
      "Un'oasi di tranquillità e bellezza naturale, dove potrai esplorare la campagna circostante in bicicletta.",
    image: "/images/bike.jpg",
    illustration: "/images/illustration-bike.png",
    link: "#",
  },
];
