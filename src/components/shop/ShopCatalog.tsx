"use client";

import { useState } from "react";
import { CATEGORY_LABELS, PRODUCTS, TEASERS, type Category } from "@/lib/catalog";
import { Icon } from "../Icon";
import { ProductCard, TONES } from "./ProductCard";

export type ShopFilter = Category | "all" | "preview";

const TABS: { value: ShopFilter; label: string; count: number }[] = [
  { value: "all", label: "All Works", count: PRODUCTS.length + TEASERS.length },
  ...(Object.keys(CATEGORY_LABELS) as Category[]).map((c) => ({
    value: c,
    label: CATEGORY_LABELS[c],
    count: PRODUCTS.filter((p) => p.category === c).length,
  })),
  { value: "preview", label: "In Atelier", count: TEASERS.length },
];

type Sort = "featured" | "newest" | "price-asc" | "price-desc";

const SELECT =
  "w-full bg-surface-container-lowest border border-outline-variant/40 text-on-surface font-body-sm text-body-sm px-3 py-2 pr-7 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-1 focus:ring-primary";

export function ShopCatalog({ initialCategory }: { initialCategory: ShopFilter }) {
  const [category, setCategory] = useState<ShopFilter>(initialCategory);
  const [sort, setSort] = useState<Sort>("featured");
  const [tone, setTone] = useState<string | null>(null);

  function selectCategory(value: ShopFilter) {
    setCategory(value);
    window.history.replaceState(null, "", value === "all" ? "/shop" : `/shop/${value}`);
  }

  function reset() {
    selectCategory("all");
    setSort("featured");
    setTone(null);
  }

  const visible = PRODUCTS.filter(
    (p) => (category === "all" || p.category === category) && (!tone || p.swatches.includes(tone)),
  ).sort((a, b) => {
    if (sort === "price-asc") return a.priceUsd - b.priceUsd;
    if (sort === "price-desc") return b.priceUsd - a.priceUsd;
    if (sort === "newest") return b.addedOrder - a.addedOrder;
    return 0;
  });

  const count = category === "preview" ? TEASERS.length : category === "all" && !tone ? PRODUCTS.length + TEASERS.length : visible.length;
  const scope =
    category === "preview"
      ? "In The Atelier"
      : category === "all"
        ? "Mayfair & Edinburgh Workrooms"
        : CATEGORY_LABELS[category];

  return (
    <>
      <section className="max-w-360 w-full mx-auto px-margin md:px-margin-desktop pt-8 pb-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-outline-variant/30">
          <div className="max-w-2xl space-y-2">
            <div className="flex flex-wrap items-center gap-2 text-secondary font-label-sm text-label-sm uppercase tracking-[0.2em]">
              <span>Handcrafted In Mayfair &amp; Edinburgh</span>
              <span className="opacity-40">•</span>
              <span>Slow-Batch Vegetable Tanned</span>
            </div>
            <h1 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary tracking-tight">
              The Atelier Catalog
            </h1>
            <p className="font-body-md text-body-md text-on-surface-variant pt-1 max-w-xl">
              Pure vegetable-tanned Tuscan calfskin footwear, bespoke field jackets, and canine leather goods seasoned
              with chestnut bark extracts.
            </p>
          </div>
          <div className="flex items-center gap-6 text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider">
            <div className="text-right">
              <p className="font-headline-sm text-headline-sm text-primary normal-case tracking-normal">
                {PRODUCTS.length + TEASERS.length} Masterworks
              </p>
              <p className="text-secondary text-[10px]">Active Commissions</p>
            </div>
            <div className="h-8 w-px bg-outline-variant/40" />
            <div className="text-left">
              <p className="font-label-md font-semibold text-primary">Direct Express</p>
              <p className="text-secondary text-[10px]">US, UK &amp; Scotland Hubs</p>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 bg-surface-container-low p-2.5 rounded-xl border border-outline-variant/30">
          <div className="flex flex-wrap items-center gap-1.5" role="group" aria-label="Filter by category">
            {TABS.map((tab) => {
              const active = category === tab.value;
              return (
                <button
                  key={tab.value}
                  type="button"
                  aria-pressed={active}
                  onClick={() => selectCategory(tab.value)}
                  className={`px-4 py-2 rounded-lg font-label-md text-label-md uppercase tracking-wider transition-all duration-200 ${
                    active
                      ? "bg-primary text-on-primary shadow-sm"
                      : "text-on-surface-variant hover:text-primary hover:bg-surface-container"
                  }`}
                >
                  {tab.label} <span className="ml-1 opacity-70">({tab.count})</span>
                </button>
              );
            })}
          </div>
          <div className="flex items-center gap-3">
            <div className="relative flex-1 lg:flex-none lg:min-w-35">
              <select
                aria-label="Filter by leather tone"
                className={SELECT}
                value={tone ?? "all"}
                onChange={(e) => setTone(e.target.value === "all" ? null : e.target.value)}
              >
                <option value="all">All Tones</option>
                {Object.entries(TONES).map(([hex, { name }]) => (
                  <option key={hex} value={hex}>
                    {name}
                  </option>
                ))}
              </select>
              <Icon name="unfold_more" className="text-[16px] text-secondary absolute right-2.5 top-2.5 pointer-events-none" />
            </div>
            <div className="relative flex-1 lg:flex-none lg:min-w-40">
              <select
                aria-label="Sort products by"
                className={SELECT}
                value={sort}
                onChange={(e) => setSort(e.target.value as Sort)}
              >
                <option value="featured">Featured Order</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="newest">Newest Commission</option>
              </select>
              <Icon name="expand_more" className="text-[16px] text-secondary absolute right-2.5 top-2.5 pointer-events-none" />
            </div>
            <button
              className="p-2 text-secondary hover:text-primary transition-colors rounded-lg hover:bg-surface-container"
              title="Reset Filters"
              aria-label="Reset filters"
              type="button"
              onClick={reset}
            >
              <Icon name="restart_alt" className="text-[18px]" />
            </button>
          </div>
        </div>
      </section>

      <section className="max-w-360 w-full mx-auto px-margin md:px-margin-desktop pb-20">
        <div className="flex flex-wrap items-center justify-between gap-2 text-secondary py-3 mb-4 font-label-sm text-label-sm border-b border-outline-variant/20">
          <span aria-live="polite">
            Displaying {count} {count === 1 ? "Edition" : "Editions"} • {scope}
            {tone ? ` • ${TONES[tone].name}` : ""}
          </span>
          <span className="text-[11px] text-on-surface-variant/80">Duty-Paid Delivery • Guaranteed Allocation</span>
        </div>
        {category === "preview" ? (
          <div className="bg-surface-container-low rounded-xl border border-outline-variant/30 p-space-xl text-center space-y-3">
            <Icon name="engineering" className="text-secondary text-[32px]" />
            <p className="font-headline-sm text-headline-sm text-primary">Currently on the workshop bench</p>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Our upcoming editions are previewed in the atelier section below.
            </p>
            <a
              href="#in-the-atelier"
              className="inline-flex items-center gap-1 font-label-md text-label-md uppercase tracking-wider text-secondary hover:text-primary"
            >
              View In The Atelier <Icon name="arrow_downward" className="text-[18px]" />
            </a>
          </div>
        ) : visible.length === 0 ? (
          <div className="bg-surface-container-low rounded-xl border border-outline-variant/30 p-space-xl text-center space-y-3">
            <p className="font-headline-sm text-headline-sm text-primary">No pieces match this tone</p>
            <button
              type="button"
              onClick={reset}
              className="font-label-md text-label-md uppercase tracking-wider text-secondary hover:text-primary"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12">
            {visible.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
