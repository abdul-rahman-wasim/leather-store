import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: {
    default: "Velluto & Hide — Artisan Leather Atelier",
    template: "%s | Velluto & Hide",
  },
  description:
    "Full-grain vegetable-tanned leather footwear, bespoke outerwear, and luxury canine harnesses. Hand-stitched in London & Edinburgh.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        {/* Icon font must block: swap would flash raw ligature names like "shopping_bag" */}
        {/* eslint-disable-next-line @next/next/no-page-custom-font, @next/next/google-font-display */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=block"
        />
      </head>
      <body className="bg-surface font-body-md text-body-md text-on-surface antialiased">
        <Header />
        <main className="w-full pt-28 bg-surface min-h-[calc(100vh-14rem)]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
