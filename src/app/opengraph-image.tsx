import { ImageResponse } from "next/og";
import { BRAND, CONTRACT_ARTICLES } from "@/lib/catalog";

export const alt = `${BRAND}: contract leather manufacturing in Islamabad for UK & EU brands`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Satori can't read Tailwind tokens; these mirror --color-primary, -secondary-container, -surface and -gold in globals.css.
const PRIMARY = "#211008";
const ACCENT = "#fec47e";
const SURFACE = "#fff8f1";
const GOLD = "#c5a059";

const HEADLINE = "Bespoke Leather Manufacturing at Industrial Scale";
const MOQ_MIN = Math.min(...CONTRACT_ARTICLES.map((a) => a.moq));

/** Fetches a Google font subset as TTF (Satori can't read woff2). Falls back to the default font offline. */
async function bodoni(text: string) {
  try {
    const css = await (
      await fetch(`https://fonts.googleapis.com/css2?family=Bodoni+Moda:wght@500&text=${encodeURIComponent(text)}`)
    ).text();
    const url = css.match(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/)?.[1];
    return url ? await (await fetch(url)).arrayBuffer() : null;
  } catch {
    return null;
  }
}

export default async function Image() {
  const font = await bodoni(`${BRAND}${HEADLINE}`);
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: PRIMARY,
          color: SURFACE,
          padding: 72,
          border: `2px solid ${GOLD}`,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <svg width="64" height="64" viewBox="0 0 44 44">
            <path d="M22 2 L40 12 L40 32 L22 42 L4 32 L4 12 Z" stroke={GOLD} strokeWidth="1.75" fill="none" />
            <path d="M22 10 L22 34" stroke={ACCENT} strokeWidth="1.75" strokeLinecap="round" />
            <path d="M15 22 L29 22" stroke={ACCENT} strokeWidth="1.25" />
          </svg>
          <div style={{ display: "flex", fontFamily: "Bodoni", fontSize: 34, letterSpacing: 6 }}>
            {BRAND.toUpperCase()}
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ display: "flex", fontFamily: "Bodoni", fontSize: 76, lineHeight: 1.08, maxWidth: 980 }}>
            {HEADLINE}
          </div>
          <div style={{ display: "flex", fontSize: 28, color: ACCENT }}>
            Contract atelier in Islamabad · OEM &amp; private label for UK &amp; EU brands
          </div>
        </div>
        <div style={{ display: "flex", gap: 40, fontSize: 24, letterSpacing: 3, color: GOLD }}>
          <span>{`MOQ FROM ${MOQ_MIN}`}</span>
          <span>DDP TO UK, EU &amp; US</span>
          <span>FACTORY COSTING IN 24H</span>
        </div>
      </div>
    ),
    { ...size, fonts: font ? [{ name: "Bodoni", data: font, weight: 500, style: "normal" }] : undefined },
  );
}
