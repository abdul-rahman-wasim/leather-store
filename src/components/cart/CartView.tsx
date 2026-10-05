"use client";

import Link from "next/link";
import { useState } from "react";
import { HARNESS_SLUG, IMG, RECOMMENDED, formatPrice, type CartItem, type Currency } from "@/lib/catalog";
import { actions, useStore, type Region } from "@/lib/store";
import { useDispatchCountdown } from "@/lib/useDispatchCountdown";
import { Icon } from "../Icon";

const REGIONS: Record<
  Region,
  {
    label: string;
    courierTitle: string;
    courierDesc: string;
    postalLabel: string;
    postal: string;
    hub: string;
    currencyTag: string;
  }
> = {
  us: {
    label: "USA ($ USD)",
    courierTitle: "Express Transatlantic Courier",
    courierDesc:
      "Direct Express Air to United States (2–3 Business Days via DHL Express). All US customs tariffs, border clearances, and state import duties are 100% pre-paid by Vale & Rawat.",
    postalLabel: "Zip Code / State",
    postal: "10021 (New York, NY)",
    hub: "Verified US Hub",
    currencyTag: "USD Freight",
  },
  uk: {
    label: "UK (£ GBP)",
    courierTitle: "Royal Mail Special Bespoke Courier",
    courierDesc:
      "Next-Day Guaranteed Delivery from Savile Row Atelier. Signed delivery in padded protective linen cases.",
    postalLabel: "UK Postcode",
    postal: "W1S 2JR (Mayfair, London)",
    hub: "London Atelier Hub",
    currencyTag: "GBP Domestic",
  },
  scot: {
    label: "Scotland (£)",
    courierTitle: "Scottish Workbench Direct Courier",
    courierDesc:
      "Same-day or overnight courier dispatched direct from George Street, Edinburgh. Hand-inspected with certified tartan seal.",
    postalLabel: "Scottish Postal Code",
    postal: "EH2 3BU (Edinburgh)",
    hub: "Edinburgh Workbench",
    currencyTag: "GBP Scotland",
  },
};

const UPCOMING = [
  {
    batch: "Batch of 18 Pieces",
    release: "November",
    name: "The Cairngorm Shearling Aviator",
    text: "Double-faced Highlands fleece, hand-waxed saddle leather exterior, solid antique brass double buckles.",
    price: "$1,480.00",
    image: `${IMG}AB6AXuDbzZj8_0lx4j2ktWgHyVZuSNfptJ78NMZLwqLBp4ZcODT8AgV0jKdSTRmXu9SHTPtLVpWQY_kjmJveB5NwfUQVt3QLAFxgAOpLY_5oj61u2G0tU7yvrWnpzsoRaFcDdsqMDxtkFj5KfGBMkzFljT3yOKvdN7uvkOAbrsnPL3kTGSqXaxmWH7xjuChEglJrIv8gzCK2qQSgppaopMsUKi0Dy5z3znE4SY83TqRqsI3-y6OhSY_NFXTP`,
    alt: "Heavyweight Scottish shearling aviator jacket in deep espresso leather draped over an oak bench",
  },
  {
    batch: "Batch of 25 Pieces",
    release: "December",
    name: "The Mayfair Document Attaché",
    text: "Museum calfskin lined with racing green British pigskin suede. Integrated laptop shield and document bellows.",
    price: "$890.00",
    image: `${IMG}AB6AXuClbEzLOeY603xlzMvWPs377IsBa46lhiJtXq2bbZu9Ryk_86yFnmXl_DLDh-tYQsWmwRMO-fgfWIgAKbeXla47fOI_IPuGH_OdjGTeyrs56eXrnTueighCg4LnYewKLQvJxwU34NzAGKWwzthBbH2XtO4q4FwJnrOQXtKMG9NrbWySBIW-LNzaneIJZLuncuZ5tgJQ7AkPpPhxTtsdfUyFqUJIqVQfnLX7aHblC7Ox7N4p8nlk0KIP`,
    alt: "Slim structured briefcase in midnight espresso bridle hide with solid brass combination lock",
  },
  {
    batch: "Batch of 40 Pieces",
    release: "October",
    name: "The Glencoe Field Grooming Roll",
    text: "Pull-up oiled harness leather with waterproof Scottish tartan canvas interior and hand-forged hanging hook.",
    price: "$260.00",
    image: `${IMG}AB6AXuBX_-whk9Yf0OaAWCo3QDrHNcpk70fg1GuUtHOm8XHEGvwsz4bMJnopJUFqfoAHnbgEFv4fp8ncIoCS3OEna0iBdz1IjRpjrpKZkh8FVnlu0Jlf7T8yiArGMPHq3b5dpP1l8KxEfh7v2Mwn1AxyIs1T18xZrfNbfbZTCI__KWHhK3_rS9-PCFuHNZOAZsxYneSo7LvAGgB8zu7dLUuqKt3Te4IJ2rGTGGaNN1fuIZ1GQbVAT0jPQhNt`,
    alt: "Rolled leather travel washbag with brass turnbuckle unrolled to show horn combs and grooming tools",
  },
];

const GUARANTEES = [
  ["inventory_2", "Cedarwood Unboxing", "Each item rests inside aromatic Scottish cedar gift caskets with raw flax dustbags."],
  ["workspace_premium", "Lifetime Welt Guarantee", "Continuous warranty covering hand-saddled seams, welts, and bespoke brass rivets."],
  ["flight_takeoff", "Carbon-Neutral Freight", "DHL GoGreen transatlantic transport with Scottish peatland restoration offset."],
];

const EYEBROW = "font-label-sm text-label-sm tracking-eyebrow uppercase";

function price(item: { priceUsd: number; priceGbp: number }, currency: Currency, qty = 1) {
  return formatPrice(item.priceUsd * qty, item.priceGbp * qty, currency);
}

function CartLine({ item, currency }: { item: CartItem; currency: Currency }) {
  const editHref = item.productId === "highlands-harness" ? `/products/${HARNESS_SLUG}` : undefined;
  return (
    <div className="bg-surface-container p-6 md:p-8 flex flex-col md:flex-row gap-6 shadow-sm">
      <div className={`w-full md:w-44 ${item.blurb ? "h-36" : "h-48"} bg-surface-container-high overflow-hidden shrink-0`}>
        <img
          className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
          alt={item.imageAlt}
          src={item.image}
        />
      </div>
      <div className="flex flex-col justify-between flex-1 min-w-0">
        <div>
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className={`${EYEBROW} text-secondary`}>{item.collection}</span>
              <h2 className="font-headline-sm text-headline-sm text-primary mt-1">{item.name}</h2>
            </div>
            <div className="text-right shrink-0">
              <span className="font-headline-sm text-headline-sm text-primary tracking-tight whitespace-nowrap block">
                {price(item, currency, item.qty)}
              </span>
              {item.qty > 1 && (
                <span className="font-body-sm text-body-sm text-on-surface-variant">{price(item, currency)} each</span>
              )}
            </div>
          </div>
          {item.blurb && <p className="font-body-sm text-body-sm text-on-surface-variant mt-2">{item.blurb}</p>}
          {item.details.length > 0 && (
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2 text-on-surface-variant font-body-sm text-body-sm">
              {item.details.map((d) => (
                <p key={d.label} className="flex flex-wrap items-center gap-1.5">
                  <strong className="text-on-surface font-medium">{d.label}:</strong>
                  {d.highlight && (
                    <span className="bg-surface-container-high px-2 py-0.5 text-primary tracking-wider font-semibold">
                      &ldquo;{d.highlight}&rdquo;
                    </span>
                  )}
                  {d.value}
                </p>
              ))}
            </div>
          )}
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4 mt-6 bg-surface-container-low px-4 py-2.5">
          <div className="flex items-center bg-surface px-3 py-1 shadow-sm">
            <button
              aria-label="Decrease quantity"
              className="text-primary hover:text-secondary transition-colors p-1 active:scale-90 disabled:opacity-30"
              type="button"
              disabled={item.qty <= 1}
              onClick={() => actions.updateQty(item.key, -1)}
            >
              <Icon name="remove" className="text-[16px]" />
            </button>
            <span className="w-8 text-center font-label-md text-label-md text-primary font-semibold" aria-label={`Quantity ${item.qty}`}>
              {item.qty}
            </span>
            <button
              aria-label="Increase quantity"
              className="text-primary hover:text-secondary transition-colors p-1 active:scale-90"
              type="button"
              onClick={() => actions.updateQty(item.key, 1)}
            >
              <Icon name="add" className="text-[16px]" />
            </button>
          </div>
          <div className={`flex items-center gap-4 text-on-surface-variant ${EYEBROW}`}>
            {item.editLabel && editHref && (
              <>
                <Link className="hover:text-primary transition-colors flex items-center gap-1" href={editHref}>
                  <Icon name={item.editLabel.icon} className="text-[14px]" /> {item.editLabel.label}
                </Link>
                <span className="opacity-30">|</span>
              </>
            )}
            <button
              className="hover:text-error transition-colors flex items-center gap-1 uppercase"
              type="button"
              onClick={() => actions.removeItem(item.key)}
            >
              <Icon name="delete" className="text-[14px]" /> Relinquish
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function CartView() {
  const { cart, region, currency, subtotal, itemCount } = useStore();
  const info = REGIONS[region];
  const [postalByRegion, setPostalByRegion] = useState<Partial<Record<Region, string>>>({});
  const [verified, setVerified] = useState(false);
  const [checkoutNote, setCheckoutNote] = useState(false);
  const countdown = useDispatchCountdown(30_000);

  const postal = postalByRegion[region] ?? info.postal;
  const fmt = (n: number) => formatPrice(n, n, currency);
  const inCart = (productId: string) => cart.some((c) => c.productId === productId);
  const releaseWindow = countdown ? `${countdown.hours}h ${countdown.minutes}m` : "—";

  if (cart.length === 0) {
    return (
      <div className="max-w-360 mx-auto w-full px-6 md:px-12 py-20">
        <div className="bg-surface-container-low p-12 text-center max-w-2xl mx-auto space-y-6 shadow-sm">
          <Icon name="shopping_bag" className="text-secondary text-[40px]" />
          <span className={`${EYEBROW} text-secondary font-semibold block`}>Order Dispatch Docket</span>
          <h1 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary tracking-display">
            Your Commission Satchel is Empty
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Explore hand-welted footwear, bespoke outerwear, and the canine collection to begin your commission.
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center justify-center bg-primary hover:bg-primary-container text-on-primary px-8 py-4 font-label-md text-label-md uppercase tracking-eyebrow shadow-md transition-colors"
          >
            Explore the Catalog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full">
      <div className="w-full bg-surface-container-low px-6 md:px-12 py-5 shadow-sm">
        <div className="max-w-360 mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-3 text-on-surface-variant font-label-md text-label-md tracking-eyebrow uppercase"
          >
            <Link className="hover:text-primary transition-colors" href="/">
              Atelier Index
            </Link>
            <span className="opacity-40">/</span>
            <span className="text-secondary font-semibold">Bespoke Satchel &amp; Transatlantic Freight</span>
          </nav>
          <div className="flex items-center gap-3 bg-surface px-4 py-1.5 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
            <span className={`${EYEBROW} text-on-surface-variant`}>
              Bench Slot Reserved • Release Window: <strong className="text-on-surface">{releaseWindow}</strong>
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-360 mx-auto w-full px-6 md:px-12 py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-7 flex flex-col gap-12">
            <div className="flex items-end justify-between gap-4">
              <div>
                <span className={`${EYEBROW} text-secondary font-semibold`}>Order Dispatch Docket • No. VH-8492</span>
                <h1 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary tracking-display mt-2">
                  Commission Satchel
                </h1>
              </div>
              <span className="font-label-md text-label-md uppercase tracking-eyebrow text-on-surface-variant hidden sm:inline-block">
                {itemCount} Bespoke {itemCount === 1 ? "Commission" : "Commissions"}
              </span>
            </div>

            <div className="flex flex-col gap-6">
              {cart.map((item) => (
                <CartLine key={item.key} item={item} currency={currency} />
              ))}
            </div>

            <div className="bg-surface-container-low p-6 md:p-8 shadow-sm">
              <div className="flex items-center justify-between mb-6 gap-4">
                <div>
                  <span className={`${EYEBROW} text-secondary font-semibold`}>Hand-Selected Pairings</span>
                  <h3 className="font-headline-sm text-headline-sm text-primary">Atelier Complements for Your Order</h3>
                </div>
                <Icon name="auto_awesome" className="text-secondary text-2xl" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {RECOMMENDED.map((r) => {
                  const added = inCart(r.productId);
                  return (
                    <div
                      key={r.productId}
                      className="bg-surface p-4 flex items-center gap-4 shadow-sm hover:bg-surface-container transition-colors"
                    >
                      <div className="w-16 h-16 bg-surface-container-highest shrink-0 overflow-hidden">
                        <img className="w-full h-full object-cover" alt={r.imageAlt} src={r.image} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-headline-sm text-body-md text-primary truncate">{r.name}</h4>
                        <p className="font-body-sm text-body-sm text-on-surface-variant font-medium mt-0.5">
                          {price(r, currency)} {currency}
                        </p>
                      </div>
                      <button
                        aria-label={added ? `${r.name} added` : `Add ${r.name} to commission`}
                        className={`w-9 h-9 flex items-center justify-center transition-all active:scale-90 shrink-0 ${
                          added ? "bg-secondary text-on-secondary" : "bg-primary hover:bg-primary-container text-surface"
                        }`}
                        type="button"
                        onClick={() => actions.addItem(r)}
                      >
                        <Icon name={added ? "check" : "add"} className="text-[18px]" />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 bg-surface-container p-6 shadow-sm">
              {GUARANTEES.map(([icon, title, text]) => (
                <div key={title} className="flex flex-col gap-2">
                  <Icon name={icon} className="text-secondary text-2xl" />
                  <h4 className="font-label-lg text-label-lg uppercase tracking-eyebrow text-primary">{title}</h4>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">{text}</p>
                </div>
              ))}
            </div>
          </div>

          <aside className="lg:col-span-5 lg:sticky lg:top-32 flex flex-col gap-6">
            <div className="bg-surface-container-low p-6 md:p-8 shadow-md">
              <div className="flex items-center justify-between pb-6 gap-4">
                <h2 className="font-headline-md text-headline-md text-primary">Regional Dispatch</h2>
                <span className={`${EYEBROW} text-on-surface-variant font-semibold`}>Tier 1 Carrier</span>
              </div>

              <div className="mb-6">
                <span className={`${EYEBROW} text-on-surface-variant block mb-2 font-medium`}>Destination Territory</span>
                <div className="grid grid-cols-3 bg-surface p-1 gap-1 shadow-sm" role="radiogroup" aria-label="Destination territory">
                  {(Object.keys(REGIONS) as Region[]).map((r) => (
                    <button
                      key={r}
                      role="radio"
                      aria-checked={region === r}
                      className={`py-2.5 px-1 text-center font-label-md text-label-md uppercase tracking-eyebrow transition-all ${
                        region === r ? "bg-primary text-surface" : "text-on-surface-variant hover:text-primary"
                      }`}
                      type="button"
                      onClick={() => {
                        actions.setRegion(r);
                        setVerified(false);
                      }}
                    >
                      {REGIONS[r].label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-surface p-5 mb-6 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <Icon name="local_shipping" className="text-secondary text-[20px]" />
                  <h3 className="font-label-lg text-label-lg uppercase tracking-eyebrow text-primary">{info.courierTitle}</h3>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">{info.courierDesc}</p>
                <div className={`mt-3 flex items-center gap-2 text-secondary ${EYEBROW}`}>
                  <Icon name="verified" className="text-[16px]" />
                  <span>Guaranteed Delivered-Duty-Paid (DDP)</span>
                </div>
              </div>

              <form
                className="mb-6"
                onSubmit={(e) => {
                  e.preventDefault();
                  setVerified(true);
                }}
              >
                <div className="flex items-center justify-between mb-2 gap-2">
                  <label className={`${EYEBROW} text-on-surface-variant font-medium`} htmlFor="dest-zip">
                    {info.postalLabel}
                  </label>
                  <span className={`${EYEBROW} text-secondary`} role="status">
                    {verified ? "Recalculated: Pre-Cleared" : info.hub}
                  </span>
                </div>
                <div className="flex">
                  <input
                    className="w-full min-w-0 bg-surface text-on-surface font-body-sm text-body-sm px-4 py-3 focus:outline-none focus:bg-surface-bright focus:ring-1 focus:ring-primary shadow-sm"
                    id="dest-zip"
                    placeholder="Enter Zip or Postal Code"
                    type="text"
                    value={postal}
                    onChange={(e) => {
                      setPostalByRegion((p) => ({ ...p, [region]: e.target.value }));
                      setVerified(false);
                    }}
                  />
                  <button
                    className="bg-primary hover:bg-primary-container text-surface px-4 font-label-md text-label-md uppercase tracking-eyebrow transition-all active:scale-95"
                    type="submit"
                  >
                    Apply
                  </button>
                </div>
              </form>

              <div className="space-y-3 py-4 text-on-surface-variant font-body-sm text-body-sm">
                <div className="flex items-center justify-between gap-4">
                  <span>Item Portfolio Subtotal</span>
                  <span className="font-medium text-on-surface font-headline-sm text-body-md">
                    {fmt(subtotal)} {currency}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className="flex flex-wrap items-center gap-1.5">
                    Regional Express Freight
                    <span className="bg-surface-container-highest px-1.5 py-0.5 text-[10px] tracking-wider uppercase text-secondary font-bold">
                      Complimentary
                    </span>
                  </span>
                  <span className="text-secondary font-medium">{fmt(0)}</span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className="flex items-center gap-1.5">
                    {currency === "USD" ? "Estimated Import Duties & Taxes" : "UK 20% VAT"}
                    <span title="The atelier absorbs all clearance costs">
                      <Icon name="info" className="text-[14px] text-on-surface-variant" />
                    </span>
                  </span>
                  <span className="text-on-surface font-medium text-right">
                    {currency === "USD" ? `Pre-Paid by Atelier (${fmt(0)})` : `Included (${fmt(subtotal / 6)})`}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span>Aromatic Cedar Coffret &amp; Bags</span>
                  <span className="text-on-surface font-medium">Included</span>
                </div>
              </div>

              <div className="mt-4 bg-surface p-4 shadow-sm flex items-end justify-between gap-4">
                <div>
                  <span className={`${EYEBROW} text-on-surface-variant block font-medium`}>Total Balance</span>
                  <span className="text-[11px] text-on-surface-variant">All taxes and duties pre-settled</span>
                </div>
                <div className="text-right">
                  <span className="font-headline-md text-headline-md text-primary font-normal leading-none">{fmt(subtotal)}</span>
                  <span className={`block ${EYEBROW} text-secondary font-semibold mt-1`}>{info.currencyTag}</span>
                </div>
              </div>

              <div className="mt-6 space-y-2.5">
                <button
                  className="w-full bg-primary hover:bg-black text-on-primary py-3.5 flex items-center justify-center gap-2 font-label-md text-label-md uppercase tracking-eyebrow shadow-sm transition-all active:scale-95"
                  type="button"
                  onClick={() => setCheckoutNote(true)}
                >
                  <Icon name="phone_iphone" className="text-[18px]" /> Pay with Apple Pay
                </button>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    className={`bg-surface hover:bg-surface-container text-primary py-2.5 flex items-center justify-center gap-1 ${EYEBROW} shadow-sm transition-all active:scale-95`}
                    type="button"
                    onClick={() => setCheckoutNote(true)}
                  >
                    Google Pay
                  </button>
                  <button
                    className={`bg-surface hover:bg-surface-container text-primary py-2.5 flex items-center justify-center gap-1 ${EYEBROW} shadow-sm transition-all active:scale-95`}
                    type="button"
                    onClick={() => setCheckoutNote(true)}
                  >
                    Klarna <span className="text-[11px] font-normal normal-case tracking-normal">(3x {fmt(subtotal / 3)})</span>
                  </button>
                </div>
              </div>

              <button
                className="mt-4 w-full bg-secondary hover:bg-secondary/90 text-on-secondary py-4 text-center font-label-lg text-label-lg tracking-eyebrow uppercase font-bold shadow-md hover:shadow-lg transition-all active:scale-95 flex items-center justify-center gap-3"
                type="button"
                onClick={() => setCheckoutNote(true)}
              >
                <span>Proceed to Private Checkout</span>
                <Icon name="lock" className="text-[18px]" />
              </button>
              {checkoutNote && (
                <p className="mt-3 font-body-sm text-body-sm text-on-surface-variant text-center" role="status">
                  Checkout isn&apos;t connected yet — payment processing is coming soon.
                </p>
              )}

              <div className="mt-6 bg-surface-container p-4 shadow-sm flex items-start gap-3.5">
                <Icon name="support_agent" className="text-secondary text-[22px]" />
                <div>
                  <p className={`${EYEBROW} text-primary font-bold`}>Atelier Private Concierge</p>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                    Need a bespoke sizing fitting or leather swatch advice? Call directly:
                  </p>
                  <a
                    className="font-label-md text-label-md tracking-eyebrow text-secondary hover:underline font-semibold mt-1 inline-block"
                    href="tel:+441315550198"
                  >
                    +44 (0)131 555 0198 (London/Edin)
                  </a>
                </div>
              </div>
            </div>
          </aside>
        </div>

        <div className="mt-24 pt-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span className={`${EYEBROW} text-secondary font-semibold`}>Savile Row &amp; Edinburgh Workbenches</span>
              <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary mt-1">
                Upcoming Small-Batch Releases
              </h2>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-md">
              Limited allocations cut from rare hides. Reserve your bench priority before public atelier reveal.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {UPCOMING.map((u) => (
              <div
                key={u.name}
                className="bg-surface-container p-6 flex flex-col justify-between shadow-sm group hover:shadow-md transition-all"
              >
                <div>
                  <div className="h-64 bg-surface-container-high overflow-hidden mb-5">
                    <img
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      alt={u.alt}
                      src={u.image}
                    />
                  </div>
                  <div className={`flex items-center justify-between text-on-surface-variant ${EYEBROW} mb-1`}>
                    <span>{u.batch}</span>
                    <span className="text-secondary font-semibold">{u.release}</span>
                  </div>
                  <h3 className="font-headline-sm text-headline-sm text-primary">{u.name}</h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-2">{u.text}</p>
                </div>
                <div className="mt-6 pt-4 flex items-center justify-between gap-4">
                  <span className="font-headline-sm text-body-lg text-primary font-medium">{u.price}</span>
                  <Link
                    className={`bg-surface hover:bg-primary hover:text-surface text-primary ${EYEBROW} px-4 py-2 shadow-sm transition-all active:scale-95`}
                    href="/shop/preview"
                  >
                    Join Allocation
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
