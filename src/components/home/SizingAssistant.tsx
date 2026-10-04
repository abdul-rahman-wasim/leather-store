"use client";

import { useState } from "react";
import { openConcierge } from "../Concierge";
import { Icon } from "../Icon";

const TABS = [
  {
    value: "harness",
    label: "Canine Harness",
    title: "Canine Anatomical Y-Frame Girth",
    range: "Sizes S to XL",
    text: "Measure circumference directly behind your hound's front legs at the widest ribcage point. Size S (18–22”), Size M (23–27”), Size L (28–34”), Size XL (35–42”).",
    note: "Includes complimentary custom punched strap spacing",
  },
  {
    value: "shoes",
    label: "Footwear",
    title: "Hand-Carved Last Dimensions",
    range: "US 7–14 / UK 6–13",
    text: "Contoured around anatomical wooden lasts. Order your normal dress shoe size; the vegetable-tanned oak bark footbed self-molds to your footprint over 14 days.",
    note: "Half-sizes and wide E/EE fittings crafted upon request",
  },
  {
    value: "jackets",
    label: "Outerwear",
    title: "Bespoke Tailoring Grid",
    range: "Custom Drafted",
    text: "Outerwear commissions draft a bespoke pattern mapped to chest breadth, sleeve armhole pitch, and back waist drop. Virtual or atelier fitting included.",
    note: "Pure cupro and heritage Scottish silk lining options",
  },
];

export function SizingAssistant() {
  const [active, setActive] = useState(TABS[0]);

  return (
    <div className="bg-surface-container-lowest p-8 rounded-lg border border-outline-variant/30 shadow-sm flex flex-col justify-between saddle-stitch">
      <div className="space-y-4">
        <div>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h4 className="font-headline text-xl text-on-surface">Bespoke Anatomical Sizing Assistant</h4>
            <span className="text-[10px] uppercase font-semibold text-secondary bg-surface-container px-2.5 py-1 rounded border border-outline-variant">
              Made-To-Measure
            </span>
          </div>
          <p className="text-xs text-on-surface-variant font-light mt-1">
            Select your silhouette to review fit dimensions and bespoke sizing specifications.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2 border-b border-outline-variant/20 pb-2" role="tablist">
          {TABS.map((t) => (
            <button
              key={t.value}
              role="tab"
              aria-selected={t.value === active.value}
              aria-controls="sizing-panel"
              className={`text-xs font-semibold tracking-wider uppercase px-3 py-1.5 rounded-sm transition-all ${
                t.value === active.value
                  ? "bg-primary text-surface"
                  : "bg-transparent hover:bg-surface-container text-on-surface-variant"
              }`}
              type="button"
              onClick={() => setActive(t)}
            >
              {t.label}
            </button>
          ))}
        </div>
        <div
          id="sizing-panel"
          role="tabpanel"
          className="bg-surface-container-low p-4 rounded-sm border border-outline-variant/30 text-xs space-y-2"
        >
          <div className="flex flex-wrap items-center justify-between gap-2 font-semibold text-primary">
            <span>{active.title}</span>
            <span>{active.range}</span>
          </div>
          <p className="text-[11px] text-on-surface-variant font-light leading-relaxed">{active.text}</p>
          <div className="flex items-center gap-2 text-[10px] text-secondary font-medium pt-1">
            <Icon name="straighten" className="text-[14px]" />
            <span>{active.note}</span>
          </div>
        </div>
        <div className="p-3 bg-surface-container-high/70 rounded border border-outline-variant/80">
          <p className="text-[11px] text-on-surface-variant font-light">
            <strong className="font-semibold text-on-surface">What Bespoke Means:</strong> Every silhouette is custom
            crafted from raw hides directly to your exact measurements, eliminating mass-production compromise.
          </p>
        </div>
      </div>
      <div className="pt-4 mt-5 text-[10px] text-on-surface-variant/80 border-t border-outline-variant/20 flex flex-wrap items-center justify-between gap-2">
        <span>Need bespoke tailoring advice?</span>
        <button
          className="font-semibold text-secondary hover:text-primary transition-colors uppercase tracking-wider"
          type="button"
          onClick={openConcierge}
        >
          Ask Virtual Assistant →
        </button>
      </div>
    </div>
  );
}
