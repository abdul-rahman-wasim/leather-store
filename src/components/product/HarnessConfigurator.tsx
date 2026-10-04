"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IMG, formatPrice } from "@/lib/catalog";
import { actions, useStore } from "@/lib/store";
import { useDispatchCountdown } from "@/lib/useDispatchCountdown";
import { Icon } from "../Icon";

const PRICE = { usd: 165, gbp: 135 };

const GALLERY = [
  {
    main: `${IMG}AB6AXuB4HdzRuSHwUkkuRoHqdX32r8nSpEEG8GCzJSqR_r17bBvUTJ9k7Zy50ClOIDBaGgDgJTk3Or5HJql1UwhTOA-xZpYVrHwp05SwvjL-tg2bwk7br1wI1KSN5RnYaB7wSyrfLZ1KYtMHihusfyb5JdNGdxDqfbzTE2HvzFm1UZPn3LSMdcYH6sMd03EPtUhWTwvvbg9QIJZ-w1KWp9zIzdaf3O8kvw8pcePwHWBN3ssn79Vin8lgxty4`,
    thumb: `${IMG}AB6AXuBAFSUEqVmlhRYyZH56Ny5ihVWVgBbvb2oBqKJ9FLVMIxZQfbRXYO7yTvnm0S6iAb2Fwz29UmLm3FklfXJLxF0IhZn_Y5A_g3iVrzGtdGKL2YO2RTw-eRKJAzKirloCWPa5gxJ-oP3sOMtIdyYIVetbY7EoEd5yTohZFLATYJa59r9VHmn8-Kw1Q9TxcA6EWFsL4O9znmSF50GepO5uaxyuGKBOOY4BeN3x8Cde0VDRuxsKun0Yilfd`,
    alt: "The Highlands Ergonomic Canine Leather Harness in cognac tan vegetable-tanned leather with brushed brass O-rings on alabaster limestone",
  },
  {
    main: `${IMG}AB6AXuDlfQ8TeZincdKxOeToV4n-zzAw_ucn-9Xt_Sw3H6uDBLmYtp1rxfLL3mIQ5DShkHXI979LYH17C3bydw4VZX1YGISsfoFJPlxEidBOb3E9vqAgtCyRxDc8jLht8irH2T8Ic0I6kuQ8c6YyZXtxvtmLrUe5ac8TVccH5Q90EgiR-Ewl1S3pH9UCBIksn4W8NZx88ZsOutxD58tCgL2hjpAMA90m9BeRbnPgs6XyP8mZkcE-t-Q1XQ4l`,
    alt: "Macro view of a sand-cast unlacquered brass ring stitched with waxed linen thread into Bavarian bridle leather",
  },
  {
    main: `${IMG}AB6AXuCW2k5U9UAWR8yzrKkO43r3ks-q7KmpcAW0JkqicnWcH3o9JFeTSqMqErF-f0qW8pVdGhYMbhodEAju870983i77l9Y1AoZ6f8PMnwTND5KINZGpNtuwJoUKGSegYHzy5HU0qXEUufJ3ljtaZ6wXFq0z2z9_avoD27-_Q7-LBMRdb1lmNW8rxu_sc0tvV56mpz8S0lHuH4Zub7B_HXNN359MM7-27F5anMKRVAq_h-mBDpKOG2e_bwx`,
    alt: "Hot-stamped serif atelier seal debossed on a full-grain strap with bevelled, beeswax-burnished edges",
  },
  {
    main: `${IMG}AB6AXuBDeZfVROUaP1Z5wAjmhgamdP7PVKQFEYHVtY-0dm8V0ec7QnotpOUpqQ5Egzo-dKuSv8wks5KgNdYof0DPbO1ObEkfsSuU4s7FQhpleJbkezSsozwYWPVvEHp-OpDzHWtVVhwYQB1NyMP_kC1aUReYIy6ZShNd9UUEdECw1Cxwqiz00LWBO1xXTAFgYdSF6JhJsjTs1SFXaugLAi4UgeJ1vuC7EqpcA1NOznHGgdxjE7H0aRZyQ9Ny`,
    alt: "Golden Retriever wearing the handcrafted leather harness on misty Scottish Highland heather moorland",
  },
];

const LEATHERS = [
  { name: "Cognac Tan", hex: "#80551a" },
  { name: "Espresso Noir", hex: "#211008" },
  { name: "Highland Forest Green", hex: "#27382B" },
];

const HARDWARE = [
  { name: "Brushed Solid Brass", short: "Brushed Brass", hex: "#d4af37" },
  { name: "Matte Gunmetal Alloy", short: "Matte Gunmetal", hex: "#3a3d40" },
];

type Size = "S" | "M" | "L" | "Bespoke";

const SIZES: { value: Size; code: string; label: string; breeds: string; girth: string }[] = [
  { value: "S", code: "SM", label: "Small", breeds: "Frenchie / Jack", girth: "14-19 in" },
  { value: "M", code: "MD", label: "Medium", breeds: "Spaniel / Beagle", girth: "20-28 in" },
  { value: "L", code: "LG", label: "Large", breeds: "Retriever / Lab", girth: "28-36 in" },
  { value: "Bespoke", code: "BESPOKE", label: "Bespoke", breeds: "Custom Hound", girth: "Hand-patterned" },
];

const BREEDS: { label: string; size: Size }[] = [
  { label: "French Bulldog / Jack Russell → Small", size: "S" },
  { label: "Terrier / Whippet → Small", size: "S" },
  { label: "Cocker Spaniel / Springer → Medium", size: "M" },
  { label: "Beagle / Setter / Pointer → Medium", size: "M" },
  { label: "Golden Retriever / Labrador → Large", size: "L" },
  { label: "Scottish Deerhound / German Shepherd → Large", size: "L" },
  { label: "Greyhound / Great Dane (Deep Chest) → Bespoke", size: "Bespoke" },
];

const FINISHES = [
  { value: "blind", label: "Blind Deboss (Tactile)", tag: "Blind Deboss" },
  { value: "gold", label: "24K Florentine Gold Leaf", tag: "24K Gold Leaf" },
] as const;

const pad = (n: number) => String(n).padStart(2, "0");

export function HarnessConfigurator() {
  const router = useRouter();
  const { currency } = useStore();
  const countdown = useDispatchCountdown();
  const [imageIndex, setImageIndex] = useState(0);
  const [leather, setLeather] = useState(LEATHERS[0]);
  const [hardware, setHardware] = useState(HARDWARE[0]);
  const [size, setSize] = useState<Size>("M");
  const [monogram, setMonogram] = useState("");
  const [finish, setFinish] = useState<(typeof FINISHES)[number]>(FINISHES[0]);
  const [guideOpen, setGuideOpen] = useState(false);
  const [breedIndex, setBreedIndex] = useState(2);
  const [added, setAdded] = useState(false);

  const price = formatPrice(PRICE.usd, PRICE.gbp, currency);
  const altPrice = currency === "USD" ? `£${PRICE.gbp.toFixed(2)} GBP` : `$${PRICE.usd.toFixed(2)} USD`;
  const sizeInfo = SIZES.find((s) => s.value === size)!;
  const breedSize = SIZES.find((s) => s.value === BREEDS[breedIndex].size)!;
  const mono = monogram.trim().toUpperCase();

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
    actions.addItem({
      productId: "highlands-harness",
      name: "The Highlands Ergonomic Canine Leather Harness",
      collection: "The Canine Collection",
      image: GALLERY[0].main,
      imageAlt: GALLERY[0].alt,
      priceUsd: PRICE.usd,
      priceGbp: PRICE.gbp,
      material: "Tuscan Saddle Hide",
      details: [
        { label: "Harness Shade", value: leather.name },
        { label: "Dimension", value: `${sizeInfo.label} (${sizeInfo.girth})` },
        { label: "Hardware", value: hardware.name },
        mono ? { label: finish.tag, value: "", highlight: mono } : { label: "Monogram", value: "None" },
      ],
      editLabel: { label: "Edit Monogram", icon: "edit" },
    });
    setAdded(true);
  }

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-16 items-start">
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div className="relative w-full aspect-4/5 bg-surface-container overflow-hidden">
            <img
              key={imageIndex}
              className="w-full h-full object-cover object-center animate-fade-in"
              alt={GALLERY[imageIndex].alt}
              src={GALLERY[imageIndex].main}
            />
            <div className="absolute top-6 left-6">
              <span className="bg-surface/90 backdrop-blur-md text-primary px-3 py-1.5 text-label-sm font-label-sm uppercase tracking-eyebrow shadow-sm">
                Hand-Burnished No. 408
              </span>
            </div>
            <div className="absolute bottom-8 right-8 bg-surface-container-lowest/95 backdrop-blur-sm p-4 shadow-xl max-w-[60%]">
              <span className="font-label-sm uppercase text-outline block text-[9px] tracking-eyebrow">Atelier Blind Seal</span>
              <span
                className={`font-headline-sm text-headline-sm font-semibold tracking-widest uppercase mt-1 block break-all ${
                  finish.value === "gold" ? "text-secondary-container" : "text-primary"
                }`}
              >
                {mono || "PATRON"}
              </span>
              <span className="text-[9px] tracking-widest uppercase font-semibold text-secondary mt-0.5 block">{finish.tag}</span>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4">
            {GALLERY.map((g, i) => (
              <button
                key={g.main}
                type="button"
                aria-label={`View image ${i + 1}`}
                aria-current={i === imageIndex}
                onClick={() => setImageIndex(i)}
                className={`group relative aspect-square bg-surface-container-low overflow-hidden transition-all duration-300 ${
                  i === imageIndex ? "ring-2 ring-primary" : "opacity-70 hover:opacity-100"
                }`}
              >
                <img
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  alt=""
                  src={g.thumb ?? g.main}
                />
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors" />
              </button>
            ))}
          </div>

          <div className="bg-surface-container-low p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-2">
            <div className="flex items-center gap-3">
              <Icon name="verified_user" className="text-secondary text-2xl" />
              <div>
                <p className="font-headline-sm text-headline-sm text-primary">Highland Field Provenance</p>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Each harness is logged into our Mayfair ledger with an individual serial stamp.
                </p>
              </div>
            </div>
            <span className="text-label-sm font-label-sm uppercase tracking-eyebrow text-secondary font-bold shrink-0">
              Edinburgh Bench 04
            </span>
          </div>
        </div>

        <div className="lg:col-span-5 flex flex-col space-y-8 lg:sticky lg:top-32">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-label-sm font-label-sm tracking-eyebrow uppercase text-secondary font-bold">
                Canine Equestrian Series
              </span>
              <div className="flex items-center gap-1.5 text-secondary">
                <div className="flex" role="img" aria-label="4.9 out of 5 stars">
                  {["star", "star", "star", "star", "star_half"].map((s, i) => (
                    <Icon key={i} name={s} filled className="text-[16px]" />
                  ))}
                </div>
                <span className="text-label-sm font-label-sm text-primary font-semibold">4.9</span>
                <a
                  className="text-label-sm font-label-sm text-on-surface-variant hover:text-primary transition-colors underline underline-offset-4 decoration-outline-variant/60 ml-1"
                  href="#patron-appraisals"
                >
                  (128 appraisals)
                </a>
              </div>
            </div>
            <h1 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary tracking-display leading-[1.1]">
              The Highlands Ergonomic Canine Leather Harness
            </h1>
            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2 pt-2">
              <span className="font-headline-md text-headline-md font-normal text-primary">{price}</span>
              <span className="text-body-md font-body-md text-on-surface-variant opacity-50">{altPrice}</span>
              <span className="bg-secondary-container/40 text-on-secondary-container px-2.5 py-0.5 text-label-sm font-label-sm uppercase tracking-eyebrow">
                Duty &amp; VAT Pre-Cleared
              </span>
            </div>
          </div>

          <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
            Engineered around canine skeletal kinematics, the wide breastplate shifts lead load directly away from the
            delicate trachea and cervical spine onto the pectoral sternum. Cut by hand from 9oz full-grain Bavarian bridle
            leather, tanned for 60 days in chestnut liquor and tethered by heavy unlacquered sand-cast brass.
          </p>

          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between gap-2">
              <span className="text-label-sm font-label-sm uppercase tracking-eyebrow text-primary">
                Leather Hide: <span className="font-bold text-secondary">{leather.name}</span>
              </span>
              <span className="text-label-sm font-label-sm uppercase text-on-surface-variant shrink-0">9oz Tuscan Tannery</span>
            </div>
            <div aria-label="Leather hide" className="flex items-center gap-3" role="radiogroup">
              {LEATHERS.map((l) => {
                const active = l.name === leather.name;
                return (
                  <button
                    key={l.name}
                    role="radio"
                    aria-checked={active}
                    title={l.name}
                    className={`w-12 h-12 shadow-sm transition-all duration-200 ring-primary ring-offset-2 ring-offset-surface focus:outline-none ${
                      active ? "ring-2" : "ring-0 opacity-80 hover:opacity-100"
                    }`}
                    style={{ backgroundColor: l.hex }}
                    type="button"
                    onClick={() => setLeather(l)}
                  >
                    <span className="sr-only">{l.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between gap-2">
              <span className="text-label-sm font-label-sm uppercase tracking-eyebrow text-primary">
                Sand-Cast Metallurgy: <span className="font-bold text-secondary">{hardware.name}</span>
              </span>
              <span className="text-label-sm font-label-sm uppercase text-on-surface-variant shrink-0">450kg Load Rated</span>
            </div>
            <div className="grid grid-cols-2 gap-3" role="radiogroup" aria-label="Hardware finish">
              {HARDWARE.map((h) => {
                const active = h.name === hardware.name;
                return (
                  <button
                    key={h.name}
                    role="radio"
                    aria-checked={active}
                    className={`py-3 px-4 flex items-center justify-between transition-all duration-200 ${
                      active
                        ? "bg-surface-container-high text-primary ring-1 ring-primary shadow-sm"
                        : "bg-surface-container text-on-surface-variant hover:bg-surface-container-high"
                    }`}
                    type="button"
                    onClick={() => setHardware(h)}
                  >
                    <span className="flex items-center gap-2.5">
                      <span className="w-3.5 h-3.5 inline-block shadow-inner" style={{ backgroundColor: h.hex }} />
                      <span className="text-label-sm font-label-sm uppercase tracking-wider font-semibold">{h.short}</span>
                    </span>
                    <Icon name="check" className={`text-[16px] text-primary ${active ? "" : "opacity-0"}`} />
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between gap-2">
              <span className="text-label-sm font-label-sm uppercase tracking-eyebrow text-primary">Canine Frame Anatomy</span>
              <button
                className="text-label-sm font-label-sm uppercase tracking-eyebrow text-secondary hover:underline flex items-center gap-1"
                type="button"
                onClick={() => setGuideOpen(true)}
              >
                <Icon name="straighten" className="text-[14px]" /> Breed Fit Finder
              </button>
            </div>
            <div aria-label="Canine size" className="grid grid-cols-4 gap-2" role="radiogroup">
              {SIZES.map((s) => {
                const active = size === s.value;
                return (
                  <button
                    key={s.value}
                    role="radio"
                    aria-checked={active}
                    className={`p-3 text-center transition-all ${
                      active ? "bg-primary ring-1 ring-primary shadow-sm" : "bg-surface-container hover:bg-surface-container-high"
                    }`}
                    type="button"
                    onClick={() => setSize(s.value)}
                  >
                    <span
                      className={`block text-label-md font-label-md font-bold truncate ${
                        active ? "text-surface" : s.value === "Bespoke" ? "text-secondary" : "text-primary"
                      }`}
                    >
                      {s.code}
                    </span>
                    <span
                      className={`block text-[9px] uppercase tracking-wider mt-0.5 ${
                        active ? "text-surface/80" : "text-on-surface-variant"
                      }`}
                    >
                      {s.breeds}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="bg-surface-container-low p-6 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Icon name="draw" className="text-secondary text-[20px]" />
                <span className="text-label-sm font-label-sm uppercase tracking-eyebrow text-primary font-bold">
                  Complimentary Hot-Stamp Monogram
                </span>
              </div>
              <span className="text-label-sm font-label-sm uppercase tracking-wider text-secondary">Free Atelier Service</span>
            </div>
            <div className="space-y-3">
              <div className="relative">
                <input
                  aria-label="Monogram text"
                  className="w-full bg-surface-container-lowest text-primary text-body-md font-body-md tracking-widest uppercase py-3 pl-4 pr-28 focus:outline-none focus:ring-1 focus:ring-primary placeholder:text-outline/40 shadow-inner"
                  maxLength={10}
                  placeholder="CANINE NAME"
                  type="text"
                  value={monogram}
                  onChange={(e) => setMonogram(e.target.value)}
                />
                <span className="absolute right-3 top-3.5 text-[10px] tracking-widest text-outline uppercase">Max 10 Char</span>
              </div>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-1" role="radiogroup" aria-label="Monogram finish">
                {FINISHES.map((f) => (
                  <label key={f.value} className="flex items-center gap-2.5 cursor-pointer group">
                    <input
                      checked={finish.value === f.value}
                      className="w-4 h-4 accent-primary cursor-pointer"
                      name="monogram-finish"
                      type="radio"
                      onChange={() => setFinish(f)}
                    />
                    <span className="text-label-sm font-label-sm uppercase tracking-wider text-on-surface group-hover:text-primary transition-colors">
                      {f.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <button
              className={`w-full text-on-primary py-4 px-8 flex items-center justify-between text-label-md font-label-md uppercase tracking-eyebrow transition-all duration-200 active:scale-[0.98] shadow-lg hover:shadow-xl ${
                added ? "bg-secondary" : "bg-primary hover:bg-primary-container"
              }`}
              type="button"
              onClick={addToBag}
              aria-live="polite"
            >
              <span className="flex items-center gap-2">
                <Icon name={added ? "check_circle" : "shopping_bag"} className="text-[18px]" />
                <span>{added ? "Added to Your Satchel" : "Add to Bespoke Satchel"}</span>
              </span>
              <span>{price}</span>
            </button>
            <button
              className="w-full bg-surface-container-highest hover:bg-surface-variant text-primary py-3.5 px-6 flex items-center justify-center gap-2 text-label-md font-label-md uppercase tracking-eyebrow transition-all duration-200 active:scale-[0.98]"
              type="button"
              onClick={() => {
                addToBag();
                router.push("/cart");
              }}
            >
              <span>Express Pay</span>
              <span className="opacity-40">|</span>
              <span className="font-bold tracking-normal">Apple Pay / G Pay</span>
            </button>
          </div>

          <div className="bg-surface-container p-5 space-y-3 text-on-surface">
            <div className="flex items-center justify-between pb-3 gap-2">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary" />
                </span>
                <span className="text-label-sm font-label-sm uppercase tracking-eyebrow font-bold text-primary">
                  {countdown?.tomorrow ? "Next Atelier Batch Departing" : "Atelier Batch Departing"}
                </span>
              </div>
              <span className="text-label-sm font-label-sm font-mono text-secondary font-bold tabular-nums">
                {countdown
                  ? `${pad(countdown.hours)}h ${pad(countdown.minutes)}m ${pad(countdown.seconds)}s`
                  : "--h --m --s"}
              </span>
            </div>
            <div className="space-y-2 text-body-sm font-body-sm text-on-surface-variant">
              {[
                ["United States & Canada", "2–3 Days via DHL Express"],
                ["United Kingdom Mainlands", "Next-Day Special Delivery"],
                ["Scottish Highlands & Islands", "1–2 Days Tracked Courier"],
              ].map(([region, eta]) => (
                <div key={region} className="flex items-center justify-between gap-4">
                  <span>{region}</span>
                  <span className="font-semibold text-primary text-right">{eta}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {guideOpen && (
        <div
          className="fixed inset-0 z-50 bg-inverse-surface/60 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={(e) => e.target === e.currentTarget && setGuideOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="breed-finder-title"
            className="bg-surface max-w-lg w-full p-8 sm:p-10 shadow-2xl relative space-y-6"
          >
            <button
              aria-label="Close"
              className="absolute top-4 right-4 text-on-surface-variant hover:text-primary"
              type="button"
              onClick={() => setGuideOpen(false)}
            >
              <Icon name="close" className="text-[24px]" />
            </button>
            <div className="space-y-2 pr-8">
              <span className="text-label-sm font-label-sm uppercase tracking-eyebrow text-secondary font-bold">
                Fit Specialist
              </span>
              <h3 id="breed-finder-title" className="font-headline-md text-headline-md text-primary">
                Breed Fit Finder
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Measure the ribcage girth just behind the forelegs, or choose your companion&apos;s breed family below.
              </p>
            </div>
            <div className="space-y-2">
              <label
                htmlFor="breed-dropdown"
                className="block text-label-sm font-label-sm uppercase tracking-eyebrow text-primary"
              >
                Breed Family
              </label>
              <select
                id="breed-dropdown"
                className="w-full bg-surface-container-low p-3 font-body-sm text-body-sm text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
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
            <div className="bg-surface-container-low p-5">
              <p className="text-label-sm font-label-sm uppercase tracking-eyebrow text-secondary font-bold">
                Recommended Frame
              </p>
              <div className="flex justify-between items-baseline mt-1 gap-4">
                <p className="font-headline-sm text-headline-sm text-primary">{breedSize.label}</p>
                <span className="font-body-sm text-body-sm text-on-surface-variant">Chest {breedSize.girth}</span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                Five points of brass buckle adjustment and a felted calfskin chest pad.
              </p>
            </div>
            <button
              className="w-full bg-primary hover:bg-primary-container text-on-primary text-label-md font-label-md uppercase tracking-eyebrow py-4 shadow-md transition-colors"
              type="button"
              onClick={() => {
                setSize(breedSize.value);
                setGuideOpen(false);
              }}
            >
              Apply Frame To Harness
            </button>
          </div>
        </div>
      )}
    </>
  );
}
