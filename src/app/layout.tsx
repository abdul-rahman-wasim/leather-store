import type { Metadata } from "next";
import { Bodoni_Moda, Hanken_Grotesk } from "next/font/google";
import { Concierge } from "@/components/Concierge";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Toast } from "@/components/Toast";
import { BRAND } from "@/lib/catalog";
import "./globals.css";

const hanken = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const bodoni = Bodoni_Moda({
  variable: "--font-bodoni",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
});

export const metadata: Metadata = {
  title: {
    default: `${BRAND} Atelier & Manufacture | Islamabad Leathercraft Exporters`,
    template: `%s | ${BRAND}`,
  },
  description:
    "Contract leather manufacturing for luxury brands and private labels: hand-welted footwear, canine harnesses, outerwear and sand-cast brass hardware from Islamabad.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${hanken.variable} ${bodoni.variable}`}>
      <head>
        {/* Icon font must block: swap would flash raw ligature names like "shopping_bag" */}
        {/* eslint-disable-next-line @next/next/no-page-custom-font, @next/next/google-font-display */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=block"
        />
      </head>
      <body className="bg-surface font-body-md text-body-md text-on-surface antialiased selection:bg-primary-container selection:text-surface">
        <Header />
        <main className="w-full pt-28 bg-surface min-h-[calc(100vh-14rem)]">{children}</main>
        <Footer />
        <Concierge />
        <Toast />
      </body>
    </html>
  );
}
