import type { MetadataRoute } from "next";
import { HARNESS_SLUG, SHOP_FILTERS } from "@/lib/catalog";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/shop`, changeFrequency: "weekly", priority: 0.8 },
    ...SHOP_FILTERS.map((f) => ({ url: `${SITE_URL}/shop/${f}`, changeFrequency: "weekly" as const, priority: 0.6 })),
    { url: `${SITE_URL}/products/${HARNESS_SLUG}`, changeFrequency: "monthly", priority: 0.7 },
  ];
}
