export type RoomType = "economy" | "comfort" | "deluxe" | "hottub";

export interface Room {
  id: number;
  type: RoomType;
  headerImage: string;
  images: { src: string; alt: string }[];
  squareMetersDouble: number;
  squareMetersQuadruple?: number;
  maxOccupancy?: number;
  basePrice: number;
  amenities?: string[];
  units: number | 1;
}

export const rooms: Room[] = [
  {
    id: 1,
    type: "economy",
    headerImage: "/images/economy-room.webp",
    images: [
      { src: "/images/economy-room.webp", alt: "Economy Room" },
      { src: "/images/economy-bathroom.webp", alt: "Economy Bathroom" },
      { src: "/images/window.webp", alt: "Window" },
    ],
    squareMetersDouble: 25,
    squareMetersQuadruple: 35,
    maxOccupancy: 4,
    basePrice: 69,
    amenities: ["wifi", "fan", "monitor", "vault", "wine"],
    units: 4,
  },
  {
    id: 2,
    type: "comfort",
    headerImage: "/images/comfort-room.webp",
    images: [
      { src: "/images/comfort-room.webp", alt: "Comfort Room" },
      { src: "/images/comfort-bathroom.webp", alt: "Comfort Bathroom" },
      { src: "/images/comfort-detail.webp", alt: "Comfort Detail" },
    ],
    squareMetersDouble: 30,
    squareMetersQuadruple: 40,
    maxOccupancy: 4,
    basePrice: 85,
    amenities: ["wifi", "fan", "monitor", "vault", "wine"],
    units: 3,
  },
  {
    id: 3,
    type: "deluxe",
    headerImage: "/images/deluxe-room.webp",
    images: [
      { src: "/images/deluxe-room.webp", alt: "Deluxe Room" },
      { src: "/images/deluxe-bathroom.webp", alt: "Deluxe Bathroom" },
      { src: "/images/balcony.webp", alt: "Balcony" },
    ],
    squareMetersDouble: 45,
    squareMetersQuadruple: 55,
    maxOccupancy: 4,
    basePrice: 102,
    amenities: ["wifi", "fan", "monitor", "vault", "wine", "sofa"],
    units: 3,
  },
  {
    id: 4,
    type: "hottub",
    headerImage: "/images/hottub-room.webp",
    images: [
      { src: "/images/hottub-room.webp", alt: "HotTub Room" },
      { src: "/images/hottub-bathroom.webp", alt: "HotTub Bathroom" },
      { src: "/images/hottub-shower.webp", alt: "HotTub Shower" },
    ],
    squareMetersDouble: 35,
    maxOccupancy: 2,
    basePrice: 120,
    amenities: ["wifi", "fan", "monitor", "vault", "wine", "sofa", "bubbles"],
    units: 2,
  },
];
