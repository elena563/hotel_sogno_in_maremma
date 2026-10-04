export interface Room {
  id: number;
  name: string;
  description: string;
  headerImage: string;
  images: { src: string; alt: string }[];
  squareMetersDouble: number;
  squareMetersQuadruple?: number;
  maxOccupancy?: number;
  basePrice: number;
  amenities?: string[];
}

export const rooms: Room[] = [
  {
    id: 1,
    name: "Economy Room",
    description:
      "Our Economy Room offers a cozy and comfortable stay with all the essential amenities you need for a relaxing getaway. Perfect for solo travelers or couples, this room provides a budget-friendly option without compromising on quality.",
    headerImage: "/images/economy-room.jpg",
    images: [
      { src: "/images/economy-room.jpg", alt: "Economy Room" },
      { src: "/images/economy-bathroom.jpg", alt: "Economy Bathroom" },
      { src: "/images/window.jpg", alt: "Window" },
    ],
    squareMetersDouble: 25,
    squareMetersQuadruple: 35,
    maxOccupancy: 4,
    basePrice: 69,
    amenities: ["Free Wi-Fi", "Air Conditioning", "Flat-screen TV", "Safe", "Mini Fridge"]
  },
  {
    id: 2,
    name: "Comfort Room",
    description:
      "Experience the ultimate in comfort and luxury in our Deluxe Room, featuring a spacious layout, elegant furnishings, and modern amenities. Enjoy a restful night's sleep in our plush bedding, and wake up to stunning views of the surrounding landscape.",
    headerImage: "/images/deluxe-room.jpg",
    images: [
      { src: "/images/deluxe-room.jpg", alt: "Deluxe Room" },
      { src: "/images/deluxe-bathroom.jpg", alt: "Deluxe Bathroom" },
      { src: "/images/balcony.jpg", alt: "Balcony" },
    ],
    squareMetersDouble: 30,
    squareMetersQuadruple: 40,
    maxOccupancy: 4,
    basePrice: 85,
    amenities: ["Free Wi-Fi", "Air Conditioning", "Flat-screen TV", "Safe", "Mini Fridge"]
  },
  {
    id: 3,
    name: "Deluxe Suite",
    description:
      "Experience the ultimate in comfort and luxury in our Deluxe Room, featuring a spacious layout, elegant furnishings, and modern amenities. Enjoy a restful night's sleep in our plush bedding, and wake up to stunning views of the surrounding landscape.",
    headerImage: "/images/deluxe-room.jpg",
    images: [
      { src: "/images/deluxe-room.jpg", alt: "Deluxe Room" },
      { src: "/images/deluxe-bathroom.jpg", alt: "Deluxe Bathroom" },
      { src: "/images/balcony.jpg", alt: "Balcony" },
    ],
    squareMetersDouble: 45,
    squareMetersQuadruple: 55,
    maxOccupancy: 4,
    basePrice: 102,
    amenities: ["Free Wi-Fi", "Air Conditioning", "Flat-screen TV", "Safe", "Mini Fridge", "Living Area"]
  },
  {
    id: 4,
    name: "HotTub Suite",
    description:
      "Experience the ultimate in comfort and luxury in our Deluxe Room, featuring a spacious layout, elegant furnishings, and modern amenities. Enjoy a restful night's sleep in our plush bedding, and wake up to stunning views of the surrounding landscape.",
    headerImage: "/images/deluxe-room.jpg",
    images: [
      { src: "/images/deluxe-room.jpg", alt: "Deluxe Room" },
      { src: "/images/deluxe-bathroom.jpg", alt: "Deluxe Bathroom" },
      { src: "/images/balcony.jpg", alt: "Balcony" },
    ],
    squareMetersDouble: 35,
    maxOccupancy: 2,
    basePrice: 120,
    amenities: ["Free Wi-Fi", "Air Conditioning", "Flat-screen TV", "Safe", "Mini Fridge", "Living Area", "Private Hot Tub"]
  },
];
