"use client";

import { useState } from "react";

type Destination = "US" | "UK" | "SCOT";
type Tier = "standard" | "priority";

const DESTINATIONS: { value: Destination; label: string }[] = [
  { value: "US", label: "United States (Air Express)" },
  { value: "UK", label: "United Kingdom (Mainland)" },
  { value: "SCOT", label: "Scotland & Highlands" },
];

const CATEGORIES = [
  { value: "harness", label: "Canine Bridle Harness" },
  { value: "boots", label: "Hand-Welted Footwear" },
  { value: "outerwear", label: "Bespoke Outerwear Jacket" },
];

const TIERS: { value: Tier; label: string; price: string }[] = [
  { value: "standard", label: "Standard Tracked Courier (Complimentary Free • $0)", price: "Free Complimentary" },
  { value: "priority", label: "Express Priority Bespoke Courier (+$25 / £20)", price: "+$25 / £20 Express" },
];

const TRANSIT: Record<Destination, { standard: string; priority: string; desc: string }> = {
  US: {
    standard: "2–3 Days Priority Air",
    priority: "1–2 Days Transatlantic Express Air",
    desc: "Tracked express courier direct to your US residence. All US tariffs pre-cleared.",
  },
  UK: {
    standard: "Next Business Day",
    priority: "Guaranteed Morning Dispatch",
    desc: "Dispatched directly from Savile Row workbench via express tracked courier.",
  },
  SCOT: {
    standard: "1–2 Days Tracked",
    priority: "Same-Day / Overnight",
    desc: "New Town Edinburgh atelier direct courier with doorstep signature.",
  },
};

const LABEL = "block text-[11px] font-semibold uppercase tracking-wider text-on-surface mb-1.5";
const FIELD =
  "w-full bg-surface-container-low border border-outline-variant/30 rounded-sm px-3.5 py-2.5 text-xs text-on-surface focus:outline-none focus:border-primary";

export function ShippingCalculator() {
  const [destination, setDestination] = useState<Destination>("US");
  const [category, setCategory] = useState(CATEGORIES[0].value);
  const [tier, setTier] = useState<Tier>("standard");
  const transit = TRANSIT[destination];

  return (
    <div className="bg-surface-container-lowest p-8 rounded-lg border border-outline-variant/30 shadow-sm flex flex-col justify-between saddle-stitch">
      <div className="space-y-5">
        <div>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h4 className="font-headline text-xl text-on-surface">Regional Shipping Calculator</h4>
            <span className="text-[10px] uppercase font-semibold text-secondary bg-surface-container px-2.5 py-1 rounded border border-outline-variant">
              DDP Guaranteed
            </span>
          </div>
          <p className="text-xs text-on-surface-variant font-light mt-1">
            All customs, import duties, and tariffs are fully prepaid and pre-cleared by the atelier.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={LABEL} htmlFor="calc-destination">
              Destination
            </label>
            <select
              id="calc-destination"
              className={FIELD}
              value={destination}
              onChange={(e) => setDestination(e.target.value as Destination)}
            >
              {DESTINATIONS.map((d) => (
                <option key={d.value} value={d.value}>
                  {d.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className={LABEL} htmlFor="calc-category">
              Commission Category
            </label>
            <select id="calc-category" className={FIELD} value={category} onChange={(e) => setCategory(e.target.value)}>
              {CATEGORIES.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <label className={LABEL} htmlFor="calc-tier">
            Delivery Tier
          </label>
          <select id="calc-tier" className={FIELD} value={tier} onChange={(e) => setTier(e.target.value as Tier)}>
            {TIERS.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </div>
        <div className="bg-surface-container-high/90 p-4 rounded-sm border border-outline-variant space-y-2" aria-live="polite">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-semibold text-primary">
            <span>Estimated Transit: {transit[tier]}</span>
            <span className="text-secondary">{TIERS.find((t) => t.value === tier)!.price}</span>
          </div>
          <p className="text-[11px] text-on-surface-variant font-light">{transit.desc}</p>
        </div>
      </div>
      <div className="pt-4 mt-5 text-[10px] text-on-surface-variant/80 border-t border-outline-variant/20 flex flex-wrap items-center justify-between gap-2">
        <span>Dispatched in signature archival dust cases</span>
        <span className="font-medium text-primary">Insured White-Glove Transport</span>
      </div>
    </div>
  );
}
