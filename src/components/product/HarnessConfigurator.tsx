"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IMG, formatPrice } from "@/lib/catalog";
import { actions, useStore } from "@/lib/store";
import { Icon, Stars } from "../Icon";

const PRICE = { usd: 165, gbp: 135 };

const GALLERY = [
  {
    main: `${IMG}AB6AXuDxGi6hLMnIoNpp7EjQAuDQzNoUuZx0CPvAV7OaDzI5pqHPk5uy8eF_QulYQFCC9keUy1mqmY85RUyP9SPtJyDvLq2SPC88RTaHDgwO-DTcuJNM8Wk7ejB1cyDPAR8bEapHghiwnKCp0elPzVNjhiFIIHeQZ9WPXKF_AW6Y-dVXRZpNegl0PIZFs0Hl60mNI6xMUc5kTbHmxE6M6hqpMquJecDKVD8vgOe8iQxug4lDGd4j_XJTtMkj`,
    thumb: `${IMG}AB6AXuC3lPRFyidZWM9j4174I7j_1XNXKd8s0-4IGGNq4MvousH03PVmACpbl8rEmxiR6WuatigLw5PUnY2aXUW79-FFK_AzR0xyy5uwYt30QQ4hgz6rT9Wjqz3Fy2l0sef1PZb6CtUoWkwghUjMXq3Ya_ZAJT5qmquzU_ks8NJTkA0aIGpMJEDYvA5wgZ1SyowMHRQeMuxgRPTmYcuHIHR9BBnNHFO4P0iXP_kB9hwY9Pv7SVx4KyMhJJCj`,
    alt: "Handcrafted saddle cognac leather dog harness with brushed brass buckles on a neutral linen pedestal",
  },
  {
    main: `${IMG}AB6AXuDBANZVMVhVnHr7rbzCTCU7WdSRx5GsBPm_41j4BpLqX0sBIQi9Pb4sP4mN97cf50zmH2h2Z98MPTrjNsqdFQ9nOwW4yTa_JpWKlfU0wuuzIx2lBBhR1KnsfteM5rhl70WUqY2fyAHtOljzeUJwZdHJYmPGG02KnrLNuEsyPjKeHiJd5sxDUe4QDsqRGtX-aApIORU7KiZF_C7Z98poXHKDEGQxS0Di3oMo7Aj4CBzlq5HmNfqZgXlf`,
    alt: "Macro view of the cast solid brass D-ring and hand-riveted stress points on the cognac harness",
  },
  {
    main: `${IMG}AB6AXuAmR4p0mcU-qz7xpWIkH9F7eQEFp6VooUqnr62AebweLJjNsjL9dYbgV8ys1tSv0ECGrfxqnllbxDw4tvGSR8tH44aDCv_g8ylrE6QK8uHUpizRvkRUh2HgtQ7VBkpsANjSVxSXj86814PbMTTLjAWQF-_MSU5UwKDsB03t0pDf6b2kZWX9hNJbBZ44pHlDU5Aos69eaDk3jUO99Mhp5C8ApERB_3H01qAPkKeASCoxIX1O-_sCl2nQ`,
    alt: "Hand-burnished beeswax edge beveling on thick bridle leather straps with embossed seal",
  },
  {
    main: `${IMG}AB6AXuAx55hLWI_jBanLc1tF73G7_a915-FnTOKEFUT4RE7JLM1DN4GLIcA05SIa60Pth-xtCQRr9A8dXE4UM4XEIoKudGEHDJbuavAdFbEoyMiiP1AF6py7vi0pnoh2BBShtU7XSrMvvIuedaqYBUp6ahr1u5BC7iFrFpHIbQ61tjSwsaxRX9cNA_hNgy8h0B4BgnNMFmCs0wlBoHzSMowhLH4pDeA6b_lUNQ4Q_rlgQs0ELgsTkyP_Lu5t`,
    alt: "Golden Retriever wearing the cognac harness running through misty heather in the Scottish Highlands",
  },
];

const LEATHERS = [
  { name: "Cognac Tan", hex: "#9A532C" },
  { name: "Espresso Dark Chocolate", hex: "#2B1B17" },
  { name: "British Racing Green", hex: "#1C2E24" },
];

const HARDWARE = [
  { name: "Brushed Solid Brass", short: "Brushed Brass", hex: "#C5A059" },
  { name: "Matte Gunmetal", short: "Matte Gunmetal", hex: "#4A4846" },
];

type Size = "S" | "M" | "L" | "Custom";

const SIZES: { value: Size; label: string; breeds: string; girth: string; rec: string }[] = [
  { value: "S", label: "Small", breeds: "Frenchie/Jack", girth: 'Chest 15" - 21"', rec: "Size Small (S)" },
  { value: "M", label: "Medium", breeds: "Spaniel/Beagle", girth: 'Chest 21" - 29"', rec: "Size Medium (M)" },
  { value: "L", label: "Large", breeds: "Retriever/Lab", girth: 'Chest 29" - 38"', rec: "Size Large (L)" },
  { value: "Custom", label: "Custom", breeds: "Bespoke Fit", girth: "Hand-patterned", rec: "Custom Bespoke Fit" },
];

const BREEDS: { label: string; size: Size }[] = [
  { label: 'French Bulldog (Chest 18-20") → Small', size: "S" },
  { label: 'Jack Russell / Dachshund (Chest 15-18") → Small', size: "S" },
  { label: 'Cocker Spaniel / Springer (Chest 22-26") → Medium', size: "M" },
  { label: 'Beagle / Whippet (Chest 20-25") → Medium', size: "M" },
  { label: 'Golden Retriever / Lab (Chest 30-34") → Large', size: "L" },
  { label: 'German Shepherd / Boxer (Chest 32-36") → Large', size: "L" },
  { label: "Greyhound / Great Dane (Deep Chest) → Custom Atelier", size: "Custom" },
];

export function HarnessConfigurator() {
  const router = useRouter();
  const { currency } = useStore();
  const [imageIndex, setImageIndex] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const [leather, setLeather] = useState(LEATHERS[0]);
  const [hardware, setHardware] = useState(HARDWARE[0]);
  const [size, setSize] = useState<Size>("M");
  const [monogram, setMonogram] = useState("");
  const [foil, setFoil] = useState<"blind" | "gold">("blind");
  const [guideOpen, setGuideOpen] = useState(false);
  const [breedIndex, setBreedIndex] = useState(2);
  const [added, setAdded] = useState(false);

  const price = formatPrice(PRICE.usd, PRICE.gbp, currency);
  const sizeInfo = SIZES.find((s) => s.value === size)!;
  const breedSize = SIZES.find((s) => s.value === BREEDS[breedIndex].size)!;

  useEffect(() => {
    if (!added) return;
    const t = setTimeout(() => setAdded(false), 2200);
    return () => clearTimeout(t);
  }, [added]);

  useEffect(() => {
    if (!guideOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setGuideOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [guideOpen]);

  function addToBag() {
    const mono = monogram.trim().toUpperCase();
    actions.addItem({
      productId: "highlands-harness",
      name: "The Highlands Ergonomic Canine Leather Harness",
      collection: "The Canine Collection",
      image: GALLERY[0].thumb ?? GALLERY[0].main,
      imageAlt: GALLERY[0].alt,
      priceUsd: PRICE.usd,
      priceGbp: PRICE.gbp,
      material: "Tuscan Saddle Hide",
      badge: mono ? { label: "Personalized", tone: "primary" } : undefined,
      details: [
        { label: "Color", value: leather.name },
        { label: "Size", value: `${sizeInfo.label} (${sizeInfo.girth.replace("Chest ", "Girth ")})` },
        { label: "Hardware", value: hardware.name },
        mono
          ? { label: "Debossing", value: foil === "gold" ? "(Gold Foil)" : "(Blind Deboss)", highlight: `"${mono}"` }
          : { label: "Debossing", value: "None" },
      ],
      editLabel: { label: "Edit Monogram", icon: "edit_note" },
    });
    setAdded(true);
  }

  const optionBtn = (active: boolean) =>
    active ? "bg-surface-container ring-1 ring-primary" : "bg-surface-container-low hover:bg-surface-container";

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-start">
        <div className="lg:col-span-7 flex flex-col gap-space-md">
          <div className="relative w-full aspect-4/5 bg-surface-container-low rounded-xl overflow-hidden shadow-sm">
            <img
              className={`w-full h-full object-cover object-center transition-transform duration-500 ease-out ${zoomed ? "scale-150 cursor-zoom-out" : ""}`}
              alt={GALLERY[imageIndex].alt}
              src={GALLERY[imageIndex].main}
              onClick={() => zoomed && setZoomed(false)}
            />
            <div className="absolute top-space-md left-space-md bg-surface-bright/95 backdrop-blur-md px-space-md py-1.5 rounded-lg shadow-sm flex items-center gap-space-xs">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface font-semibold">
                Tuscan Bridle Leather
              </span>
            </div>
            <button
              aria-label={zoomed ? "Zoom out" : "Inspect grain detail"}
              aria-pressed={zoomed}
              className="absolute bottom-space-md right-space-md w-10 h-10 rounded-full bg-surface-bright/90 backdrop-blur text-on-surface hover:bg-surface-bright flex items-center justify-center shadow-md transition-transform active:scale-95"
              type="button"
              onClick={() => setZoomed((z) => !z)}
            >
              <Icon name={zoomed ? "zoom_out" : "zoom_in"} className="text-[20px]" />
            </button>
          </div>
          <div className="grid grid-cols-4 gap-space-sm">
            {GALLERY.map((g, i) => (
              <button
                key={g.main}
                type="button"
                aria-label={`View image ${i + 1}`}
                aria-current={i === imageIndex}
                onClick={() => {
                  setImageIndex(i);
                  setZoomed(false);
                }}
                className={`relative aspect-square rounded-lg overflow-hidden bg-surface-container-high transition-all shadow-sm ${
                  i === imageIndex ? "ring-2 ring-primary" : "opacity-80 hover:opacity-100"
                }`}
              >
                <img className="w-full h-full object-cover" alt="" src={g.thumb ?? g.main} />
              </button>
            ))}
          </div>
          <div className="mt-space-lg p-space-lg bg-surface-container-low rounded-xl flex items-center justify-between gap-space-md">
            <div className="flex items-center gap-space-md">
              <Icon name="workspace_premium" className="text-primary text-[30px]" />
              <div>
                <p className="font-headline-sm text-headline-sm text-on-surface">Registered Atelier Registry No. 4920</p>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Each harness is serialized with an unvarnished brass tag hand-stamped in Edinburgh.
                </p>
              </div>
            </div>
            <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary font-semibold hidden sm:inline-block">
              Made in UK
            </span>
          </div>
        </div>

        <div className="lg:col-span-5 flex flex-col gap-space-lg lg:sticky lg:top-32">
          <div>
            <div className="flex items-center justify-between gap-space-sm mb-space-xs">
              <span className="font-label-sm text-label-sm uppercase tracking-[0.2em] text-secondary">
                Canine Equestrian Series
              </span>
              <div className="flex items-center gap-1">
                <Stars />
                <a className="font-label-sm text-label-sm text-on-surface underline ml-1" href="#reviews-section">
                  4.9 (128 reviews)
                </a>
              </div>
            </div>
            <h1 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mb-space-xs">
              The Highlands Ergonomic Canine Leather Harness
            </h1>
            <div className="flex flex-wrap items-baseline gap-x-space-sm mt-space-xs">
              <span className="font-display-lg text-[32px] leading-tight text-on-surface font-semibold">$165.00</span>
              <span className="font-body-md text-body-md text-on-surface-variant">/ £135.00 GBP</span>
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary ml-space-xs">
                Duty &amp; VAT Prepaid
              </span>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant mt-space-sm">
              Architecturally curved to distribute chest load without impinging shoulder kinematics. Hand-crafted from
              9oz vegetable-tanned Bavarian bridle leather with unlacquered solid brass hardware.
            </p>
          </div>

          <div className="space-y-space-md">
            <div>
              <div className="flex justify-between items-center mb-space-xs">
                <span className="font-label-md text-label-md uppercase tracking-wider text-on-surface">
                  Leather Selection: <span className="font-normal text-on-surface-variant">{leather.name}</span>
                </span>
                <span className="font-label-sm text-label-sm uppercase text-secondary">Tuscan Tannery</span>
              </div>
              <div aria-label="Leather Shade" className="flex items-center gap-space-sm" role="radiogroup">
                {LEATHERS.map((l) => {
                  const active = l.name === leather.name;
                  return (
                    <button
                      key={l.name}
                      role="radio"
                      aria-checked={active}
                      className={`group relative p-1 rounded-full transition-all ${
                        active ? "ring-2 ring-primary" : "ring-0 hover:ring-1 ring-outline-variant"
                      }`}
                      type="button"
                      onClick={() => setLeather(l)}
                    >
                      <span className="w-8 h-8 rounded-full block shadow-inner" style={{ backgroundColor: l.hex }} />
                      <span className="sr-only">{l.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-space-xs">
                <span className="font-label-md text-label-md uppercase tracking-wider text-on-surface">
                  Hardware Metallurgy: <span className="font-normal text-on-surface-variant">{hardware.name}</span>
                </span>
                <span className="font-label-sm text-label-sm uppercase text-secondary">Salt-Mist Tested</span>
              </div>
              <div className="grid grid-cols-2 gap-space-sm" role="radiogroup" aria-label="Hardware finish">
                {HARDWARE.map((h) => {
                  const active = h.name === hardware.name;
                  return (
                    <button
                      key={h.name}
                      role="radio"
                      aria-checked={active}
                      className={`py-space-sm px-space-md rounded-lg font-label-md text-label-md uppercase tracking-wider text-center flex items-center justify-center gap-space-xs transition-colors ${
                        active ? "bg-surface-container text-on-surface shadow-sm ring-1 ring-primary" : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container"
                      }`}
                      type="button"
                      onClick={() => setHardware(h)}
                    >
                      <span className="w-3 h-3 rounded-full inline-block shadow-sm" style={{ backgroundColor: h.hex }} />
                      {h.short}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-space-xs">
                <span className="font-label-md text-label-md uppercase tracking-wider text-on-surface">Canine Frame Sizing</span>
                <button
                  className="font-label-sm text-label-sm uppercase tracking-wider text-primary hover:text-primary-container transition-colors underline flex items-center gap-1"
                  type="button"
                  onClick={() => setGuideOpen(true)}
                >
                  <Icon name="straighten" className="text-[15px]" /> Breed Fit Finder
                </button>
              </div>
              <div aria-label="Canine Size" className="grid grid-cols-4 gap-space-xs" role="radiogroup">
                {SIZES.map((s) => (
                  <button
                    key={s.value}
                    role="radio"
                    aria-checked={size === s.value}
                    className={`p-space-sm rounded-lg text-on-surface text-center transition-all flex flex-col items-center justify-center gap-0.5 ${optionBtn(size === s.value)}`}
                    type="button"
                    onClick={() => setSize(s.value)}
                  >
                    <span className="font-label-md text-label-md font-semibold">{s.label}</span>
                    <span className="font-label-sm text-[10px] text-secondary truncate max-w-full">{s.breeds}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="p-space-md bg-surface-container-low rounded-xl space-y-space-sm">
              <div className="flex items-center justify-between gap-space-sm">
                <div className="flex items-center gap-space-xs">
                  <Icon name="draw" className="text-primary text-[18px]" />
                  <span className="font-label-md text-label-md uppercase tracking-wider text-on-surface font-semibold">
                    Complimentary Bespoke Monogram
                  </span>
                </div>
                <span className="font-label-sm text-label-sm text-secondary uppercase tracking-wider shrink-0">
                  Free (Save $25)
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm">
                <input
                  aria-label="Monogram text"
                  className="w-full bg-surface rounded-lg px-space-sm py-2 font-label-md text-label-md tracking-widest uppercase text-on-surface placeholder:text-outline focus:outline-none focus:ring-1 focus:ring-primary"
                  maxLength={8}
                  placeholder="PET NAME (MAX 8)"
                  type="text"
                  value={monogram}
                  onChange={(e) => setMonogram(e.target.value)}
                />
                <div className="flex gap-space-xs" role="radiogroup" aria-label="Monogram finish">
                  {(
                    [
                      ["blind", "Blind Deboss"],
                      ["gold", "24k Gold Leaf"],
                    ] as const
                  ).map(([value, label]) => (
                    <button
                      key={value}
                      role="radio"
                      aria-checked={foil === value}
                      className={`flex-1 py-1.5 px-space-xs rounded-lg text-center font-label-sm text-label-sm uppercase tracking-wider ${
                        foil === value
                          ? "bg-surface-bright text-on-surface ring-1 ring-primary"
                          : "bg-surface text-on-surface-variant hover:text-on-surface"
                      }`}
                      type="button"
                      onClick={() => setFoil(value)}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-between gap-space-sm text-secondary font-label-sm text-label-sm pt-space-xs">
                <span>
                  Preview:{" "}
                  <strong
                    className={`tracking-[0.2em] font-headline-sm text-[14px] ${foil === "gold" ? "text-tertiary" : "text-on-surface"}`}
                  >
                    {monogram.trim() ? monogram.trim().toUpperCase() : "BEAU"}
                  </strong>
                </span>
                <span>Embossed by Hand at Edinburgh Atelier</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-space-sm pt-space-xs">
            <button
              className={`w-full text-on-primary py-3.5 px-space-lg rounded-lg font-label-md text-label-md uppercase tracking-wider font-semibold shadow-md active:scale-[0.99] transition-all flex items-center justify-center gap-space-sm ${
                added ? "bg-tertiary-container" : "bg-primary hover:bg-primary-container"
              }`}
              type="button"
              onClick={addToBag}
              aria-live="polite"
            >
              <Icon name={added ? "check_circle" : "shopping_bag"} className="text-[20px]" />
              <span>{added ? "Added To Your Satchel" : `Add To Bespoke Satchel • ${price}`}</span>
            </button>
            <button
              className="w-full bg-surface-container hover:bg-surface-container-high text-on-surface py-3 px-space-lg rounded-lg font-label-md text-label-md uppercase tracking-wider transition-colors flex items-center justify-center gap-space-xs shadow-sm"
              type="button"
              onClick={() => {
                addToBag();
                router.push("/cart");
              }}
            >
              <Icon name="bolt" className="text-[18px] text-tertiary" />
              <span>Instant Express Checkout (Apple Pay / Shop)</span>
            </button>
          </div>

          <div className="p-space-md bg-surface-container-high/60 rounded-xl space-y-space-xs text-on-surface-variant">
            <div className="flex items-start gap-space-sm">
              <Icon name="local_shipping" className="text-primary text-[20px] shrink-0 mt-0.5" />
              <div className="font-body-sm text-body-sm">
                <span className="font-semibold text-on-surface">Atelier Priority Dispatch: </span>
                <span>In stock. Orders completed within 4 hours ship today.</span>
                <ul className="mt-1 space-y-0.5 text-secondary text-[12px]">
                  <li>
                    • <strong>United States:</strong> 2-3 Business Days via DHL Express Courier
                  </li>
                  <li>
                    • <strong>United Kingdom:</strong> Next-Day Delivery (Tracked 24)
                  </li>
                  <li>
                    • <strong>Scottish Highlands &amp; Islands:</strong> 1-2 Days via Royal Mail Special Delivery
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {guideOpen && (
        <div
          className="fixed inset-0 z-50 bg-inverse-surface/60 backdrop-blur-sm flex items-center justify-center p-space-md"
          onClick={(e) => e.target === e.currentTarget && setGuideOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="breed-finder-title"
            className="bg-surface rounded-2xl max-w-lg w-full p-space-lg sm:p-space-xl shadow-2xl relative"
          >
            <button
              aria-label="Close"
              className="absolute top-space-md right-space-md text-on-surface-variant hover:text-on-surface"
              type="button"
              onClick={() => setGuideOpen(false)}
            >
              <Icon name="close" className="text-[24px]" />
            </button>
            <div className="flex items-center gap-space-sm mb-space-sm pr-space-lg">
              <Icon name="pets" className="text-primary text-[28px]" />
              <h3 id="breed-finder-title" className="font-headline-md text-headline-md text-on-surface">
                Interactive Dog Breed Fit Finder
              </h3>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-md">
              Select your companion&apos;s breed profile or enter their chest girth measurement below to lock in the
              ideal atelier harness dimensions.
            </p>
            <div className="space-y-space-md">
              <div>
                <label
                  htmlFor="breed-dropdown"
                  className="block font-label-md text-label-md uppercase tracking-wider text-on-surface mb-1"
                >
                  Select Breed Family
                </label>
                <select
                  id="breed-dropdown"
                  className="w-full bg-surface-container-low border-0 rounded-lg p-2.5 font-body-sm text-body-sm text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
                  value={breedIndex}
                  onChange={(e) => setBreedIndex(Number(e.target.value))}
                >
                  {BREEDS.map((b, i) => (
                    <option key={b.label} value={i}>
                      {b.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="p-space-md bg-surface-container-low rounded-xl">
                <p className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-semibold">
                  Recommended Match
                </p>
                <div className="flex justify-between items-baseline mt-1">
                  <p className="font-headline-sm text-headline-sm text-on-surface">{breedSize.rec}</p>
                  <span className="font-body-sm text-body-sm text-secondary">{breedSize.girth}</span>
                </div>
                <p className="font-body-sm text-[12px] text-on-surface-variant mt-1">
                  Includes 4 points of 2-inch micro-adjustability with self-locking brass tang buckles.
                </p>
              </div>
              <button
                className="w-full bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md uppercase tracking-wider py-3 rounded-lg shadow-sm transition-colors"
                type="button"
                onClick={() => {
                  setSize(breedSize.value);
                  setGuideOpen(false);
                }}
              >
                Apply Sizing To Harness
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
