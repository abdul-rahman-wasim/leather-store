"use client";

import { useState } from "react";
import { IMG } from "@/lib/catalog";
import { Icon } from "../Icon";

const TABS = [
  { id: "craft", label: "Leather & Craft" },
  { id: "sizing", label: "Sizing & Anatomical Geometry" },
  { id: "care", label: "Leather Care & Highland Weather" },
  { id: "delivery", label: "US, UK & Scottish Delivery" },
] as const;

type TabId = (typeof TABS)[number]["id"];

const SIZE_ROWS = [
  ["Small", '15" – 21"', "38 – 53 cm", "French Bulldog, Boston Terrier, Dachshund", "160 grams"],
  ["Medium", '21" – 29"', "53 – 74 cm", "Cocker Spaniel, Beagle, Border Collie", "220 grams"],
  ["Large", '29" – 38"', "74 – 96 cm", "Golden Retriever, German Shepherd, Rhodesian", "295 grams"],
  ["Custom Bespoke", "Any Custom Span", "Hand-patterned", "Great Danes, Sighthounds, Bassets", "Bespoke Calibrated"],
];

const CARE = [
  {
    icon: "water_drop",
    title: "Wet Moorland Walks",
    text: "Tuscan vegetable-tanned hides endure rain with ease. Simply pat down with an unbleached towel and air-dry away from artificial radiators.",
  },
  {
    icon: "sanitizer",
    title: "Beeswax Conditioning",
    text: "Treat every 3 to 4 months with our Highland Neatsfoot & Heather Honey Balm to keep fibers supple and deepen the rich heirloom patina.",
  },
  {
    icon: "auto_fix_high",
    title: "Lifetime Stitch Warranty",
    text: "If a canine pull or tumble should ever compromise a seam, return it to our Mayfair or Edinburgh workshop for complimentary re-stitching.",
  },
];

const DELIVERY = [
  {
    region: "United States",
    carrier: "DHL Express 48-72h",
    text: "Free over $150. All import tariffs handled and covered by Velluto & Hide.",
  },
  {
    region: "United Kingdom",
    carrier: "Royal Mail Tracked 24",
    text: "Next working day delivery. Complimentary signature on receipt.",
  },
  {
    region: "Scotland & Highlands",
    carrier: "Special Delivery Guaranteed",
    text: "Delivered directly to Highland & Island postcodes within 24-48 hours.",
  },
];

export function HarnessTabs() {
  const [tab, setTab] = useState<TabId>("craft");

  return (
    <div className="mt-20 pt-space-xl">
      <div className="flex flex-wrap items-center gap-x-space-md gap-y-space-xs border-b-2 border-surface-container-high pb-px" role="tablist">
        {TABS.map((t) => (
          <button
            key={t.id}
            id={`tab-${t.id}`}
            role="tab"
            aria-selected={tab === t.id}
            aria-controls={`panel-${t.id}`}
            className={`font-headline-sm text-[18px] md:text-headline-sm pb-space-sm transition-colors ${
              tab === t.id ? "text-primary border-b-2 border-primary -mb-0.5" : "text-secondary hover:text-on-surface"
            }`}
            type="button"
            onClick={() => setTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div className="py-space-xl" role="tabpanel" id={`panel-${tab}`} aria-labelledby={`tab-${tab}`}>
        {tab === "craft" && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-space-xl items-center">
            <div className="md:col-span-6 space-y-space-md">
              <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary">Artisanal Pedigree</span>
              <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface">
                Tanned with Crushed Chestnut &amp; Mimosa Bark
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                Unlike 95% of modern pet leathers treated with harsh chromium salts, our hides undergo a slow, 60-day drum
                bath steeped in natural organic bark liquors in Tuscany. This produces leather that warms to your
                hound&apos;s posture, releasing a rich natural cedar aroma and repelling water without stiff synthetic
                coating.
              </p>
              <div className="grid grid-cols-2 gap-space-md pt-space-sm">
                <div className="p-space-md bg-surface-container-low rounded-xl">
                  <Icon name="healing" className="text-primary text-[26px] mb-1" />
                  <h3 className="font-headline-sm text-[18px] text-on-surface mb-1">Hand-Burnished</h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Sealed with Scottish organic beeswax to eliminate friction chafing across sensitive armpits.
                  </p>
                </div>
                <div className="p-space-md bg-surface-container-low rounded-xl">
                  <Icon name="lock" className="text-primary text-[26px] mb-1" />
                  <h3 className="font-headline-sm text-[18px] text-on-surface mb-1">Solid Forged Brass</h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Sand-cast hardware tested up to 450kg tensile strength. Will never rust or flake.
                  </p>
                </div>
              </div>
            </div>
            <div className="md:col-span-6">
              <div className="aspect-4/3 rounded-xl overflow-hidden shadow-md">
                <img
                  className="w-full h-full object-cover"
                  alt="Master leather artisan skiving edges on a thick cognac strap with an antique paring knife"
                  src={`${IMG}AB6AXuCJoSPFmdk-CDv1_5LloQ2jXqbr9p5Z9E8FJrG14Y0YeRqLUu-bfJh3uTRurJ0fZGuwbY9pHpcfGyGaLpISFbeXFcaZ0beyPRyPBbH-5xhuZSKy7EQxl-loseeLLHIIH1cN6-9hDGVJAyjOzPa2F0aw8LrHrGlkYVxzFmP9XyrsO3BxvcQcI8VbAAN4akdm33oDMwtK1SEyYvbadfLQBJWpAv8ZnhZCMT-kXRkSBQggc6rg38l_K8KK`}
                />
              </div>
            </div>
          </div>
        )}

        {tab === "sizing" && (
          <div className="space-y-space-lg">
            <div className="max-w-2xl">
              <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mb-space-xs">
                Anatomical Four-Point Adjustment
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Our Y-frame sternum arch bypasses sensitive windpipe cartilage entirely. Measure behind front legs at
                widest point of the ribcage.
              </p>
            </div>
            <div className="overflow-x-auto rounded-xl bg-surface-container-low p-space-md shadow-sm">
              <table className="w-full text-left font-body-sm text-body-sm text-on-surface">
                <thead>
                  <tr className="font-label-md text-label-md uppercase tracking-wider text-secondary border-b border-surface-container-high">
                    {["Size", "Chest Girth (Inches)", "Chest Girth (cm)", "Typical Breeds", "Hardware Weight"].map((h) => (
                      <th key={h} className="py-space-sm px-space-md whitespace-nowrap">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-container-high/60">
                  {SIZE_ROWS.map(([size, inches, cm, breeds, weight]) => (
                    <tr key={size}>
                      <td className="py-space-md px-space-md font-semibold">{size}</td>
                      <td className="py-space-md px-space-md">{inches}</td>
                      <td className="py-space-md px-space-md">{cm}</td>
                      <td className="py-space-md px-space-md">{breeds}</td>
                      <td className="py-space-md px-space-md text-secondary">{weight}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {tab === "care" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg">
            {CARE.map((c) => (
              <div key={c.title} className="p-space-lg bg-surface-container-low rounded-xl space-y-space-sm">
                <Icon name={c.icon} className="text-primary text-[32px]" />
                <h3 className="font-headline-sm text-headline-sm text-on-surface">{c.title}</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">{c.text}</p>
              </div>
            ))}
          </div>
        )}

        {tab === "delivery" && (
          <div className="space-y-space-md max-w-3xl">
            <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface">
              Seamless Express Shipping to US &amp; Great Britain
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              All shipments depart directly from our Scottish fulfillment workshop in Edinburgh. Orders are packaged in
              recyclable linen dust-bags and boxed with zero single-use plastics.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-md pt-space-xs">
              {DELIVERY.map((d) => (
                <div key={d.region} className="p-space-md bg-surface-container-low rounded-xl">
                  <span className="font-label-md text-label-md uppercase tracking-wider text-primary font-semibold block mb-1">
                    {d.region}
                  </span>
                  <p className="font-body-sm text-body-sm text-on-surface font-medium">{d.carrier}</p>
                  <p className="font-body-sm text-body-sm text-secondary">{d.text}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
