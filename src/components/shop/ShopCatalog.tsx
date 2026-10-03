"use client";

import Link from "next/link";
import { useState } from "react";
import { CATEGORY_LABELS, PRODUCTS, TEASERS, type Category } from "@/lib/catalog";
import { Icon } from "../Icon";
import { ProductCard, TONES } from "./ProductCard";

export type ShopFilter = Category | "all" | "preview";

const PILLS: { value: ShopFilter; label: string; count: number }[] = [
  { value: "all", label: "All Creations", count: PRODUCTS.length + TEASERS.length },
  ...(Object.keys(CATEGORY_LABELS) as Category[]).map((c) => ({
    value: c,
    label: CATEGORY_LABELS[c],
    count: PRODUCTS.filter((p) => p.category === c).length,
  })),
  { value: "preview", label: "Coming Soon / In Atelier", count: TEASERS.length },
];

type Sort = "featured" | "newest" | "price-asc" | "price-desc";

const PILL_BASE = "px-space-md py-1.5 rounded-full font-label-md text-label-md uppercase tracking-wider transition-all";

export function ShopCatalog({ initialCategory }: { initialCategory: ShopFilter }) {
  const [category, setCategory] = useState<ShopFilter>(initialCategory);
  const [sort, setSort] = useState<Sort>("featured");
  const [tone, setTone] = useState<string | null>(null);
  const [hardware, setHardware] = useState({ brass: true, nickel: true });
  const [deboss, setDeboss] = useState(true);

  function selectCategory(value: ShopFilter) {
    setCategory(value);
    window.history.replaceState(null, "", value === "all" ? "/shop" : `/shop/${value}`);
  }

  function reset() {
    selectCategory("all");
    setSort("featured");
    setTone(null);
    setHardware({ brass: true, nickel: true });
    setDeboss(true);
  }

  const visible = PRODUCTS.filter(
    (p) => (category === "all" || p.category === category) && (!tone || p.swatches.includes(tone)),
  ).sort((a, b) => {
    if (sort === "price-asc") return a.priceUsd - b.priceUsd;
    if (sort === "price-desc") return b.priceUsd - a.priceUsd;
    if (sort === "newest") return b.addedOrder - a.addedOrder;
    return 0;
  });

  const crumb =
    category === "all" ? "The Complete Catalog" : category === "preview" ? "In The Atelier" : CATEGORY_LABELS[category];

  let countLabel: string;
  if (category === "preview") countLabel = `Showing ${TEASERS.length} Atelier Teasers`;
  else if (category === "all" && !tone)
    countLabel = `Showing ${PRODUCTS.length + TEASERS.length} Masterworks (${PRODUCTS.length} In Stock, ${TEASERS.length} Atelier Teasers)`;
  else
    countLabel = `Showing ${visible.length} Masterworks (${category === "all" ? "All Atelier Creations" : CATEGORY_LABELS[category]}${tone ? ` • ${TONES[tone].name}` : ""})`;

  return (
    <>
      <section className="max-w-360 w-full mx-auto px-margin md:px-margin-desktop py-space-lg">
        <div className="flex flex-wrap items-center justify-between gap-space-sm mb-space-md text-on-surface-variant">
          <nav aria-label="Breadcrumb" className="flex items-center gap-space-xs font-label-md text-label-md uppercase tracking-wider">
            <Link className="hover:text-primary transition-colors" href="/">
              Atelier
            </Link>
            <span className="opacity-40">/</span>
            <button className="uppercase hover:text-primary transition-colors" type="button" onClick={() => selectCategory("all")}>
              Collections
            </button>
            <span className="opacity-40">/</span>
            <span className="text-on-surface font-semibold">{crumb}</span>
          </nav>
          <div className="flex items-center gap-space-xs bg-surface-container px-space-sm py-1 rounded-full text-secondary font-label-sm text-label-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span>Atelier Workrooms Active: London &amp; Edinburgh</span>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-space-lg pb-space-lg">
          <div className="max-w-2xl space-y-space-xs">
            <span className="font-label-sm text-label-sm uppercase tracking-[0.25em] text-secondary font-semibold">
              Hand-Welted • Full-Grain • Bespoke
            </span>
            <h1 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface tracking-tight">
              The Complete Atelier Collection
            </h1>
            <p className="font-body-md text-body-md text-on-surface-variant pt-space-xs">
              Handcrafted leather footwear, bespoke aviator outerwear, canine field gear, and preview prototypes seasoned
              with slow-batch Tuscan chestnut extracts.
            </p>
          </div>
          <div className="flex items-center gap-space-md bg-surface-container-low p-space-md rounded-xl shadow-sm self-start lg:self-auto">
            <div className="flex items-center gap-space-xs">
              <Icon name="token" className="text-primary text-[28px]" />
              <div>
                <p className="font-label-sm text-label-sm uppercase text-secondary">Harnesses &amp; Goods</p>
                <p className="font-headline-sm text-headline-sm text-on-surface">
                  {PRODUCTS.length + TEASERS.length} Editions
                </p>
              </div>
            </div>
            <div className="w-px h-8 bg-surface-container-highest" />
            <div className="flex items-center gap-space-xs">
              <Icon name="flight_takeoff" className="text-tertiary text-[28px]" />
              <div>
                <p className="font-label-sm text-label-sm uppercase text-secondary">Dispatch Direct</p>
                <p className="font-label-md text-label-md font-semibold text-on-surface">US, UK &amp; Scotland</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-surface-container-low p-space-md rounded-xl shadow-sm space-y-space-md">
          <div className="flex flex-wrap items-center justify-between gap-space-sm pb-space-sm">
            <div className="flex flex-wrap items-center gap-space-xs" role="group" aria-label="Filter by category">
              {PILLS.map((pill) => {
                const active = category === pill.value;
                return (
                  <button
                    key={pill.value}
                    type="button"
                    aria-pressed={active}
                    onClick={() => selectCategory(pill.value)}
                    className={`${PILL_BASE} ${
                      active
                        ? "bg-primary text-on-primary shadow-sm"
                        : "bg-surface-container hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface"
                    }`}
                  >
                    {pill.label} <span className="ml-1 opacity-80">({pill.count})</span>
                  </button>
                );
              })}
            </div>
            <div className="flex items-center gap-space-xs min-w-50">
              <span className="font-label-sm text-label-sm uppercase text-secondary">Sort:</span>
              <div className="relative w-full">
                <select
                  aria-label="Sort products by"
                  className="w-full bg-surface text-on-surface font-body-sm text-body-sm pl-space-sm pr-8 py-1.5 rounded-lg appearance-none cursor-pointer focus:outline-none focus:bg-surface-container-highest"
                  value={sort}
                  onChange={(e) => setSort(e.target.value as Sort)}
                >
                  <option value="featured">Featured Atelier Order</option>
                  <option value="newest">Newest Commission Batch</option>
                  <option value="price-asc">Price: Modest to Highest</option>
                  <option value="price-desc">Price: Highest to Modest</option>
                </select>
                <Icon name="expand_more" className="text-[18px] text-secondary absolute right-2 top-2 pointer-events-none" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md pt-space-xs">
            <div className="space-y-space-xs">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary block">
                Full-Grain Leather Tone
              </span>
              <div className="flex items-center gap-2" role="group" aria-label="Filter by leather tone">
                {Object.entries(TONES).map(([hex, { name, short }]) => (
                  <button
                    key={hex}
                    type="button"
                    title={name}
                    aria-label={name}
                    aria-pressed={tone === hex}
                    onClick={() => setTone(tone === hex ? null : hex)}
                    className={`w-6 h-6 rounded-full shadow-sm transform hover:scale-110 transition-transform relative group ${
                      tone === hex ? "ring-2 ring-offset-2 ring-offset-surface-container-low ring-primary" : ""
                    }`}
                    style={{ backgroundColor: hex }}
                  >
                    <span className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 bg-inverse-surface text-inverse-on-surface px-1.5 py-0.5 rounded text-[10px] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                      {short}
                    </span>
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => setTone(null)}
                  className={`font-body-sm text-[12px] pl-1 ${tone ? "text-primary underline" : "text-secondary"}`}
                >
                  All Tones
                </button>
              </div>
            </div>
            <div className="space-y-space-xs">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary block">
                Atelier Hardware Finish
              </span>
              <div className="flex items-center gap-space-xs">
                <label className="flex items-center gap-1.5 cursor-pointer bg-surface px-space-sm py-1 rounded-lg text-body-sm text-on-surface">
                  <input
                    checked={hardware.brass}
                    onChange={(e) => setHardware((h) => ({ ...h, brass: e.target.checked }))}
                    className="accent-primary-container w-3.5 h-3.5 rounded"
                    type="checkbox"
                  />
                  <span>Antique Brass</span>
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer bg-surface px-space-sm py-1 rounded-lg text-body-sm text-on-surface">
                  <input
                    checked={hardware.nickel}
                    onChange={(e) => setHardware((h) => ({ ...h, nickel: e.target.checked }))}
                    className="accent-primary-container w-3.5 h-3.5 rounded"
                    type="checkbox"
                  />
                  <span>Polished Nickel</span>
                </label>
              </div>
            </div>
            <div className="space-y-space-xs">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary block">
                Courier Hub Readiness
              </span>
              <div className="flex items-center gap-space-xs">
                <span className="bg-surface text-tertiary px-space-sm py-1 rounded-lg font-label-sm text-label-sm flex items-center gap-1">
                  <Icon name="local_mall" className="text-[14px]" /> US Domestic Stock
                </span>
                <span className="bg-surface text-tertiary px-space-sm py-1 rounded-lg font-label-sm text-label-sm flex items-center gap-1">
                  <Icon name="home_pin" className="text-[14px]" /> UK &amp; Scotland
                </span>
              </div>
            </div>
            <div className="flex flex-col justify-end">
              <label className="flex items-center justify-between bg-surface px-space-sm py-2 rounded-lg cursor-pointer hover:bg-surface-container transition-colors">
                <div className="flex items-center gap-space-xs">
                  <Icon name="drive_file_rename_outline" className="text-primary text-[18px]" />
                  <span className="font-label-sm text-label-sm uppercase font-semibold text-on-surface">
                    Complimentary Debossing
                  </span>
                </div>
                <input
                  checked={deboss}
                  onChange={(e) => setDeboss(e.target.checked)}
                  className="accent-primary-container w-4 h-4 rounded"
                  type="checkbox"
                />
              </label>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-360 w-full mx-auto px-margin md:px-margin-desktop pb-space-xl">
        <div className="flex items-center justify-between text-secondary py-space-sm font-label-sm text-label-sm">
          <span aria-live="polite">{countLabel}</span>
          <button className="hover:text-primary transition-colors flex items-center gap-1" type="button" onClick={reset}>
            <Icon name="refresh" className="text-[15px]" /> Reset Preferences
          </button>
        </div>
        {category === "preview" ? (
          <div className="bg-surface-container-low rounded-xl p-space-xl text-center space-y-space-sm">
            <Icon name="engineering" className="text-tertiary text-[32px]" />
            <p className="font-headline-sm text-headline-sm text-on-surface">Currently on the workshop bench</p>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Our upcoming editions are previewed in the atelier section below.
            </p>
            <a
              href="#in-the-atelier"
              className="inline-flex items-center gap-1 font-label-md text-label-md uppercase tracking-wider text-primary hover:text-primary-container"
            >
              View In The Atelier <Icon name="arrow_downward" className="text-[18px]" />
            </a>
          </div>
        ) : visible.length === 0 ? (
          <div className="bg-surface-container-low rounded-xl p-space-xl text-center space-y-space-sm">
            <p className="font-headline-sm text-headline-sm text-on-surface">No pieces match this tone</p>
            <button type="button" onClick={reset} className="font-label-md text-label-md uppercase tracking-wider text-primary">
              Reset Preferences
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
            {visible.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
