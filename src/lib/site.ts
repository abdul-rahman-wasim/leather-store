/** Canonical origin for absolute URLs (Open Graph, sitemap, structured data). Set NEXT_PUBLIC_SITE_URL in production. */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://valerawat.com").replace(/\/$/, "");

export const SITE_DESCRIPTION =
  "Contract leather manufacturing for luxury brands and private labels: hand-welted footwear, canine harnesses, outerwear and sand-cast brass hardware from Islamabad.";

/** Serialises JSON-LD for a <script> tag, escaping `<` so the payload can't close the tag early. */
export function jsonLd(data: Record<string, unknown>) {
  return { __html: JSON.stringify({ "@context": "https://schema.org", ...data }).replace(/</g, "\\u003c") };
}
