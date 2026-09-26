export interface Room {
  id: number;
  name: string;
  description: string;
  header_image: string;
  images: { src: string; alt: string }[];
  square_meters_double: number;
  square_meters_quadruple: number;
  price: number;
}

export const rooms: Room[] = [
  {
    id: 1,
    name: "Economy Room",
    description:
      "Our Economy Room offers a cozy and comfortable stay with all the essential amenities you need for a relaxing getaway. Perfect for solo travelers or couples, this room provides a budget-friendly option without compromising on quality.",
    header_image: "/images/economy-room.jpg",
    images: [
      { src: "/images/economy-room.jpg", alt: "Economy Room" },
      { src: "/images/economy-bathroom.jpg", alt: "Economy Bathroom" },
      { src: "/images/window.jpg", alt: "Window" },
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
      { src: "/images/deluxe-room.jpg", alt: "Deluxe Room" },
      { src: "/images/deluxe-bathroom.jpg", alt: "Deluxe Bathroom" },
      { src: "/images/balcony.jpg", alt: "Balcony" },
    ],
    square_meters_double: 35,
    square_meters_quadruple: 50,
    price: 250,
  },
];
