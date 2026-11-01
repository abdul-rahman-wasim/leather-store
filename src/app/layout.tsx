import type { Metadata } from "next";
import { Bodoni_Moda, Hanken_Grotesk } from "next/font/google";
import { Concierge } from "@/components/Concierge";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { LookbookDialog } from "@/components/Lookbook";
import { Toast } from "@/components/Toast";
import { BRAND } from "@/lib/catalog";
import { ICON_FONT_URL } from "@/lib/icons";
import { SITE_DESCRIPTION, SITE_URL } from "@/lib/site";
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
  description: SITE_DESCRIPTION,
  metadataBase: new URL(SITE_URL),
  openGraph: { type: "website", siteName: BRAND, locale: "en_GB", description: SITE_DESCRIPTION },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${hanken.variable} ${bodoni.variable}`}>
      <head>
        {/* Icon font must block: swap would flash raw ligature names like "shopping_bag" */}
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="stylesheet" href={ICON_FONT_URL} />
      </head>
      <body className="bg-surface font-body-md text-body-md text-on-surface antialiased selection:bg-primary-container selection:text-surface">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-60 focus:bg-primary focus:text-surface focus:px-4 focus:py-2.5 focus:rounded focus:text-xs focus:font-semibold focus:uppercase focus:tracking-wider"
        >
          Skip to content
        </a>
        <Header />
        <main id="main-content" tabIndex={-1} className="w-full pt-28 bg-surface min-h-[calc(100vh-14rem)] outline-none">
          {children}
        </main>
        <Footer />
        <Concierge />
        <Toast />
        <LookbookDialog />
      </body>
    </html>
  );
}
