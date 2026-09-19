import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hotel Sogno in Maremma",
  description: "Un boutique hotel nel cuore della Maremma, Toscana, Italia. Vivi la perfetta combinazione di comfort, eleganza e autentica ospitalità italiana.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return children;
}
