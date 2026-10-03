"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { HARNESS_SLUG, IMG, RECOMMENDED, formatPrice, type CartItem, type Currency } from "@/lib/catalog";
import { actions, useStore, type Region } from "@/lib/store";
import { Icon } from "../Icon";

const REGIONS: Record<
  Region,
  { label: string; courierTitle: string; courierDesc: string; postal: string; taxLabel: string; note: string }
> = {
  us: {
    label: "USA ($)",
    courierTitle: "Complimentary Express Transatlantic Courier",
    courierDesc: "2–3 Business Days direct via DHL Express Air. Import duties & customs pre-cleared by the atelier.",
    postal: "10021",
    taxLabel: "Estimated Sales Tax (NY, US)",
    note: "Charged in USD ($)",
  },
  uk: {
    label: "UK (£)",
    courierTitle: "Royal Mail Tracked 24 / DPD Next Day",
    courierDesc: "Next working day by 13:00 across England and Wales. Fully carbon offset delivery.",
    postal: "SW1A 1AA",
    taxLabel: "UK 20% VAT (Included in price)",
    note: "Charged in GBP (£)",
  },
  scot: {
    label: "Scotland (£)",
    courierTitle: "Scottish Highlands & Islands Tracked Courier",
    courierDesc:
      "Atelier direct courier covering Edinburgh, Glasgow, Argyll & Outer Hebrides without regional surcharges.",
    postal: "EH2 2PF",
    taxLabel: "Scottish / UK VAT (Included in price)",
    note: "Charged in GBP (£) • Edinburgh Hub",
  },
};

function price(item: { priceUsd: number; priceGbp: number }, currency: Currency, qty = 1) {
  return formatPrice(item.priceUsd * qty, item.priceGbp * qty, currency);
}

function useDispatchCountdown() {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    const tick = () => setNow(Date.now());
    const first = setTimeout(tick, 0);
    const id = setInterval(tick, 30_000);
    return () => {
      clearTimeout(first);
      clearInterval(id);
    };
  }, []);
  if (now === null) return null;
  const d = new Date(now);
  const cutoff = new Date(d);
  cutoff.setHours(18, 0, 0, 0);
  const tomorrow = d >= cutoff;
  if (tomorrow) cutoff.setDate(cutoff.getDate() + 1);
  const mins = Math.floor((cutoff.getTime() - now) / 60_000);
  return { text: `${Math.floor(mins / 60)}h ${mins % 60}m`, day: tomorrow ? "tomorrow's" : "today's" };
}

function CartLine({ item, currency }: { item: CartItem; currency: Currency }) {
  const editHref = item.productId === "highlands-harness" ? `/products/${HARNESS_SLUG}` : undefined;
  return (
    <div className="bg-surface-container-lowest p-space-md md:p-space-lg rounded-xl shadow-sm hover:shadow-md transition-all">
      <div className="flex flex-col sm:flex-row gap-space-md md:gap-space-lg">
        <div className="relative w-full sm:w-44 h-48 sm:h-52 bg-surface-container-low rounded-lg overflow-hidden shrink-0">
          <img className="w-full h-full object-cover object-center" alt={item.imageAlt} src={item.image} />
          {item.badge && (
            <span
              className={`absolute top-2 left-2 bg-surface/90 backdrop-blur-md px-2 py-0.5 rounded-sm font-label-sm text-label-sm uppercase font-semibold ${
                item.badge.tone === "primary" ? "text-primary" : "text-tertiary"
              }`}
            >
              {item.badge.label}
            </span>
          )}
        </div>
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between gap-space-sm">
              <div>
                <span className="font-label-sm text-label-sm text-tertiary uppercase tracking-widest block mb-0.5">
                  {item.collection}
                </span>
                <h3 className="font-headline-sm text-headline-sm text-on-surface">{item.name}</h3>
              </div>
              <div className="text-right shrink-0">
                <span className="font-headline-sm text-headline-sm text-on-surface block">
                  {price(item, currency, item.qty)}
                </span>
                <span className="font-label-sm text-label-sm text-secondary">
                  {item.qty > 1 ? `${price(item, currency)} each` : item.material}
                </span>
              </div>
            </div>
            {item.details.length > 0 && (
              <div className="mt-space-sm grid grid-cols-1 sm:grid-cols-2 gap-space-xs text-body-sm font-body-sm text-on-surface-variant">
                {item.details.map((d) => (
                  <p key={d.label}>
                    <span className="text-secondary font-medium">{d.label}:</span>{" "}
                    {d.highlight && <span className="text-primary font-semibold">{d.highlight}</span>} {d.value}
                  </p>
                ))}
              </div>
            )}
          </div>
          <div className="flex flex-wrap items-center justify-between gap-space-sm pt-space-md mt-space-sm">
            <div className="flex items-center gap-space-xs bg-surface-container-high px-space-xs py-1 rounded-lg">
              <button
                aria-label="Decrease quantity"
                className="w-7 h-7 flex items-center justify-center text-on-surface hover:text-primary transition-colors text-lg font-semibold disabled:opacity-40"
                type="button"
                disabled={item.qty <= 1}
                onClick={() => actions.updateQty(item.key, -1)}
              >
                -
              </button>
              <span className="font-label-md text-label-md px-2 text-on-surface" aria-label={`Quantity ${item.qty}`}>
                {item.qty}
              </span>
              <button
                aria-label="Increase quantity"
                className="w-7 h-7 flex items-center justify-center text-on-surface hover:text-primary transition-colors text-lg font-semibold"
                type="button"
                onClick={() => actions.updateQty(item.key, 1)}
              >
                +
              </button>
            </div>
            <div className="flex items-center gap-space-md font-label-sm text-label-sm uppercase tracking-wider">
              {item.editLabel && editHref && (
                <Link className="text-secondary hover:text-primary transition-colors flex items-center gap-1" href={editHref}>
                  <Icon name={item.editLabel.icon} className="text-[16px]" /> {item.editLabel.label}
                </Link>
              )}
              <button
                className="text-outline hover:text-error transition-colors flex items-center gap-1 uppercase"
                type="button"
                onClick={() => actions.removeItem(item.key)}
              >
                <Icon name="delete" className="text-[16px]" /> Remove
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AddOnLine({ item, currency }: { item: CartItem; currency: Currency }) {
  return (
    <div className="bg-surface-container-low p-space-md md:p-space-lg rounded-xl flex flex-col sm:flex-row items-center justify-between gap-space-md">
      <div className="flex items-center gap-space-md">
        <div className="w-16 h-16 rounded-lg bg-surface-container-highest overflow-hidden shrink-0">
          <img className="w-full h-full object-cover" alt={item.imageAlt} src={item.image} />
        </div>
        <div>
          <div className="flex items-center gap-space-xs">
            <span className="font-label-sm text-label-sm text-primary uppercase font-bold tracking-wider">{item.collection}</span>
            <span className="text-secondary text-xs">•</span>
            <span className="font-label-sm text-label-sm text-on-surface-variant">{item.addOn?.title}</span>
          </div>
          <h4 className="font-headline-sm text-[18px] leading-tight text-on-surface">
            {item.name}
            {item.qty > 1 && <span className="text-secondary"> × {item.qty}</span>}
          </h4>
          <p className="font-body-sm text-body-sm text-secondary">{item.addOn?.blurb}</p>
        </div>
      </div>
      <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-space-xs shrink-0">
        <span className="font-headline-sm text-[20px] text-on-surface">{price(item, currency, item.qty)}</span>
        <button
          className="text-primary hover:text-primary-container font-label-sm text-label-sm uppercase tracking-wider font-semibold"
          type="button"
          onClick={() => actions.removeItem(item.key)}
        >
          Remove
        </button>
      </div>
    </div>
  );
}

const UPCOMING = [
  {
    badge: "Waitlist Only • 25 Pieces",
    badgeClass: "bg-inverse-surface text-inverse-on-surface",
    collection: "Bespoke Outerwear",
    name: "The Cairngorm Shearling Aviator",
    text: "Scottish tweed collar backing, thick oiled sheepskin, and custom solid copper buckles forged in Galloway.",
    price: "$1,480.00",
    cta: "Join Allocation List →",
    image:
      "AB6AXuAgzGrFy2MAJwB4PBYpLSiv2C9wOdbPqyUApkZDJFRk_67SYfKPdjZC9ydhALSSE9lfiqFgfENdb6Z4Xuzdv8v9m6_v3BA05rc-I841ML7FeaypAW-REAPmkL0STWwJCxEQZGs5vqGWOFtptd1Bk6eQLftj2ipWtkVfcKF51UCeKJofDEHCqDMYPNkCT-_HQ6V_RwDpJPAWttHvM-tBB1We7gcUZ7llkokJlurtyLshje63Zed-bhf7",
    alt: "Heavyweight shearling and oil-waxed leather flight jacket in a Scottish stone cottage workshop",
  },
  {
    badge: "Spring Batch",
    badgeClass: "bg-surface text-tertiary font-semibold",
    collection: "Architectural Portfolios",
    name: "The Mayfair Document Attache",
    text: "Full-grain harness leather conditioned with Scottish beeswax and lined with forest green British wool baize.",
    price: "$720.00",
    cta: "Reserve Serial # →",
    image:
      "AB6AXuAmpTtqesBecClfZ8aqTXyEygpISx9Fgobg9pgtyCdygEPW-Z4fdKfYVLZVkD_2Ej6-mo2do_pKJXm0-Qzkx_tuCh3jvQ5KAmUjIKlUn_hhwdm-tAOcV5SoC_9qK-MqaXSdfk88xSdUu_nS5N9gSYFNYSILQ0yNxW8xOeWIBL-PWUvZ0u_lFkTFEPnVKVohLwqkJe-1F6BJK8olsse-LrTm_h3vtHTtHHQxWgK8TaOELmV3cJdffqqI",
    alt: "Hand-stitched bridle leather portfolio briefcase with brass turn-lock beside a fountain pen",
  },
  {
    badge: "Complimentary Monogram",
    badgeClass: "bg-tertiary-fixed text-on-tertiary-fixed font-semibold",
    collection: "Travel & Field",
    name: "The Glencoe Field Grooming Roll",
    text: "Rollable saddle leather kit containing badger-hair brushes, burnished horn comb, and waterproofing wax.",
    price: "$295.00",
    cta: "Quick Add +",
    quickAdd: { usd: 295, gbp: 240 },
    image:
      "AB6AXuCWW2t0rzRgo5xJ9erbeVrey8OHeG8eY5W6st1YD0YFJy9Z3qWnxcwKAChl7E16nLyIZVleDD1n6EQv1VUhfPPPbMcrUX8R-NvJmVVrQmAwJzKrkKY2XUQPsd77Ft6ZMdxH37gVdQdpWkoi-Fmh87bWCeqKx5huoOwe2_IiwwglCEupeECYlZDPHT60UJN3aF72fqE9JiIZrgXXDD36GLlmv8Rz-j_uFOzSIJjGjuly78AAgZvpynoF",
    alt: "Bridle leather grooming roll unrolled with horsehair brushes, horn comb and brass tins",
  },
];

export function CartView() {
  const { cart, region, currency, subtotal, itemCount } = useStore();
  const info = REGIONS[region];
  const [postalByRegion, setPostalByRegion] = useState<Partial<Record<Region, string>>>({});
  const [appliedPostal, setAppliedPostal] = useState<string | null>(null);
  const [checkoutNote, setCheckoutNote] = useState(false);
  const postalRef = useRef<HTMLInputElement>(null);
  const countdown = useDispatchCountdown();

  const postal = postalByRegion[region] ?? info.postal;
  const vat = currency === "GBP" ? subtotal / 6 : 0;
  const fmt = (n: number) => formatPrice(n, n, currency);
  const inCart = (productId: string) => cart.some((c) => c.productId === productId);
  const quickAdded = inCart("glencoe-grooming-roll");

  if (cart.length === 0) {
    return (
      <div className="max-w-360 mx-auto px-margin md:px-margin-desktop py-space-xl w-full">
        <div className="bg-surface-container-low rounded-2xl p-space-xl text-center max-w-2xl mx-auto space-y-space-md">
          <Icon name="shopping_bag" className="text-primary text-[40px]" />
          <h1 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface">
            Your Commission Portfolio is Empty
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Explore hand-welted footwear, bespoke outerwear, and the canine collection to begin your commission.
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center justify-center bg-primary hover:bg-primary-container text-on-primary px-space-lg py-3 rounded-lg font-label-md text-label-md uppercase tracking-wider"
          >
            Explore the Catalog
          </Link>
        </div>
      </div>
    );
  }

  const mainItems = cart.filter((c) => !c.addOn);
  const addOns = cart.filter((c) => c.addOn);

  return (
    <div className="max-w-360 mx-auto px-margin md:px-margin-desktop py-space-md w-full">
      <div className="flex flex-wrap items-center justify-between gap-space-sm pb-space-md mb-space-lg">
        <nav aria-label="Breadcrumb" className="flex items-center gap-space-xs font-label-sm text-label-sm uppercase tracking-wider text-secondary">
          <Link className="hover:text-primary transition-colors" href="/">
            Atelier
          </Link>
          <span>/</span>
          <Link className="hover:text-primary transition-colors" href="/shop">
            Catalog
          </Link>
          <span>/</span>
          <span className="text-on-surface font-semibold">Bespoke Cart &amp; Courier Dispatch</span>
        </nav>
        <div className="flex items-center gap-space-sm bg-surface-container-high px-space-md py-1.5 rounded-full">
          <span className="inline-block w-2 h-2 rounded-full bg-tertiary animate-pulse" />
          <span className="font-label-sm text-label-sm text-on-surface uppercase tracking-widest">
            Atelier Queue: Priority Stitching Reserved
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-desktop items-start">
        <div className="lg:col-span-7 xl:col-span-8 space-y-space-xl">
          <div>
            <div className="flex flex-wrap items-baseline justify-between gap-space-sm mb-space-md">
              <h1 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface">
                Your Commission Portfolio
              </h1>
              <span className="font-label-md text-label-md text-secondary uppercase tracking-widest">
                {itemCount} Bespoke {itemCount === 1 ? "Item" : "Items"}
              </span>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl">
              Each artifact is inspected by our senior leatherwright in Edinburgh prior to final hot-stamp debossing,
              hand-oiling, and cedar-box packaging.
            </p>
          </div>

          <div className="space-y-space-md">
            {mainItems.map((item) => (
              <CartLine key={item.key} item={item} currency={currency} />
            ))}
            {addOns.map((item) => (
              <AddOnLine key={item.key} item={item} currency={currency} />
            ))}
          </div>

          <div className="bg-surface-container p-space-lg rounded-xl space-y-space-md">
            <div className="flex flex-wrap items-center justify-between gap-space-xs">
              <h3 className="font-headline-sm text-headline-sm text-on-surface">Recommended Atelier Complements</h3>
              <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary">
                Hand-Selected For This Order
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
              {RECOMMENDED.map((r) => {
                const added = inCart(r.productId);
                return (
                  <div
                    key={r.productId}
                    className="bg-surface-container-lowest p-space-md rounded-lg flex items-center justify-between gap-space-sm shadow-sm hover:shadow transition-shadow"
                  >
                    <div className="flex items-center gap-space-sm">
                      <div className="w-14 h-14 bg-surface-container rounded-lg overflow-hidden shrink-0">
                        <img className="w-full h-full object-cover" alt={r.imageAlt} src={r.image} />
                      </div>
                      <div>
                        <h4 className="font-headline-sm text-[16px] leading-tight text-on-surface">{r.name}</h4>
                        <p className="font-label-sm text-label-sm text-secondary tracking-wide">
                          {r.caption} • {price(r, currency)}
                        </p>
                      </div>
                    </div>
                    <button
                      aria-label={added ? `${r.name} added` : `Add ${r.name} to cart`}
                      className={`p-2 rounded-lg transition-colors shrink-0 ${
                        added ? "bg-tertiary text-on-tertiary" : "bg-surface-container-high hover:bg-primary hover:text-on-primary text-on-surface"
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md pt-space-xs">
            {[
              ["inventory_2", "Bespoke Cedar Unboxing", "Dispatched in reusable aromatic wood cases with organic unbleached cotton dust jackets."],
              ["verified_user", "Lifetime Stitch Warranty", "Two-needle saddle stitching backed unconditionally by our Mayfair & Edinburgh benches."],
              ["eco", "Carbon-Neutral Freight", "Fully offset international maritime and air routes direct from our workshop hub."],
            ].map(([icon, title, text]) => (
              <div key={title} className="bg-surface-container-low p-space-md rounded-xl space-y-space-xs">
                <Icon name={icon} className="text-primary text-[26px]" />
                <h5 className="font-headline-sm text-[17px] text-on-surface">{title}</h5>
                <p className="font-body-sm text-body-sm text-on-surface-variant">{text}</p>
              </div>
            ))}
          </div>
        </div>

        <aside className="lg:col-span-5 xl:col-span-4 lg:sticky lg:top-32 space-y-space-md">
          <div className="bg-surface-container-lowest p-space-md md:p-space-lg rounded-xl shadow-md space-y-space-md">
            <div className="flex items-center justify-between pb-space-xs">
              <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary font-bold">
                Courier Destination
              </span>
              <div className="flex items-center gap-1 text-tertiary">
                <Icon name="lock" className="text-[16px]" />
                <span className="font-label-sm text-label-sm uppercase font-semibold">256-Bit Encrypted</span>
              </div>
            </div>
            <div className="space-y-space-xs">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface block font-medium">
                Select Region &amp; Currency
              </span>
              <div className="grid grid-cols-3 gap-1 bg-surface-container-high p-1 rounded-lg" role="radiogroup" aria-label="Region">
                {(Object.keys(REGIONS) as Region[]).map((r) => (
                  <button
                    key={r}
                    role="radio"
                    aria-checked={region === r}
                    className={`py-2 text-center rounded-lg font-label-sm text-label-sm uppercase font-semibold transition-all ${
                      region === r ? "bg-surface text-primary shadow-sm" : "text-secondary hover:text-on-surface"
                    }`}
                    type="button"
                    onClick={() => {
                      actions.setRegion(r);
                      setAppliedPostal(null);
                    }}
                  >
                    {REGIONS[r].label}
                  </button>
                ))}
              </div>
            </div>
            <div className="bg-surface-container-low p-space-sm rounded-lg flex items-start gap-space-sm">
              <Icon name="flight_takeoff" className="text-primary text-[22px] shrink-0 mt-0.5" />
              <div>
                <p className="font-label-md text-label-md text-on-surface font-semibold">{info.courierTitle}</p>
                <p className="font-body-sm text-body-sm text-on-surface-variant">{info.courierDesc}</p>
              </div>
            </div>
            <div className="bg-primary/5 p-space-sm rounded-lg flex items-center justify-between gap-space-sm text-on-surface">
              <div className="flex items-center gap-space-xs">
                <Icon name="timer" className="text-primary text-[18px]" />
                <span className="font-body-sm text-body-sm font-medium">
                  Order in next <strong className="text-primary font-bold">{countdown?.text ?? "—"}</strong> for{" "}
                  {countdown?.day ?? "today's"} flight
                </span>
              </div>
              <span className="font-label-sm text-label-sm text-secondary uppercase tracking-wider shrink-0">Departs 18:00</span>
            </div>
            <form
              className="space-y-space-xs"
              onSubmit={(e) => {
                e.preventDefault();
                setAppliedPostal(postal.trim().toUpperCase());
              }}
            >
              <label htmlFor="postal-input" className="font-label-sm text-label-sm uppercase tracking-wider text-secondary flex justify-between">
                <span>Delivery Postal / ZIP Code</span>
                <button type="button" className="text-primary uppercase hover:underline" onClick={() => postalRef.current?.select()}>
                  Change {region === "us" ? "State" : "Postcode"}
                </button>
              </label>
              <div className="flex gap-2">
                <input
                  ref={postalRef}
                  className="flex-1 min-w-0 bg-surface-container-low px-space-sm py-2 rounded-lg font-body-sm text-body-sm text-on-surface focus:outline-none focus:bg-surface focus:ring-1 focus:ring-primary"
                  id="postal-input"
                  placeholder="ZIP / Postal Code"
                  type="text"
                  value={postal}
                  onChange={(e) => {
                    setPostalByRegion((p) => ({ ...p, [region]: e.target.value }));
                    setAppliedPostal(null);
                  }}
                />
                <button
                  className="bg-surface-container-high hover:bg-secondary hover:text-on-secondary px-space-md py-2 rounded-lg font-label-sm text-label-sm uppercase tracking-wider font-semibold transition-colors"
                  type="submit"
                >
                  Apply
                </button>
              </div>
              {appliedPostal && (
                <p className="font-label-sm text-label-sm text-tertiary flex items-center gap-1" role="status">
                  <Icon name="check_circle" className="text-[14px]" /> Courier route confirmed for {appliedPostal}
                </p>
              )}
            </form>
            <div className="space-y-space-xs pt-space-sm">
              <div className="flex justify-between font-body-sm text-body-sm text-on-surface-variant">
                <span>Item Portfolio Subtotal</span>
                <span className="text-on-surface font-medium">
                  {fmt(subtotal)} {currency}
                </span>
              </div>
              <div className="flex justify-between font-body-sm text-body-sm text-on-surface-variant">
                <span className="flex items-center gap-1">
                  Regional Express Freight
                  <span title="Tracked courier included without surcharge">
                    <Icon name="info" className="text-[14px] text-tertiary" />
                  </span>
                </span>
                <span className="text-primary font-medium">Complimentary ({fmt(0)})</span>
              </div>
              <div className="flex justify-between gap-space-sm font-body-sm text-body-sm text-on-surface-variant">
                <span>{info.taxLabel}</span>
                <span className="text-on-surface font-medium shrink-0">{currency === "USD" ? "$0.00*" : fmt(vat)}</span>
              </div>
              <div className="flex justify-between font-body-sm text-body-sm text-on-surface-variant">
                <span>Atelier Presentation Box &amp; Seal</span>
                <span className="text-tertiary font-medium">Included</span>
              </div>
              <div className="pt-space-sm mt-space-sm flex justify-between items-baseline">
                <div>
                  <span className="font-headline-sm text-headline-sm text-on-surface block">Total Due</span>
                  <span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest block">{info.note}</span>
                </div>
                <div className="text-right">
                  <span className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary block leading-none">
                    {fmt(subtotal)}
                  </span>
                  <span className="font-label-sm text-label-sm text-secondary">All tariffs prepaid</span>
                </div>
              </div>
              {currency === "USD" && (
                <p className="font-label-sm text-[10px] text-secondary">*Sales tax calculated at dispatch.</p>
              )}
            </div>
            <div className="space-y-space-xs pt-space-xs">
              <button
                className="w-full bg-[#111111] hover:bg-[#222222] text-white py-3.5 rounded-lg flex items-center justify-center gap-space-xs transition-all shadow hover:shadow-lg font-semibold text-sm"
                type="button"
                onClick={() => setCheckoutNote(true)}
              >
                <span className="tracking-tight text-white font-medium">Buy with</span>
                <span className="font-bold text-base tracking-normal">Pay</span>
              </button>
              <div className="grid grid-cols-2 gap-2">
                <button
                  className="bg-surface-container-high hover:bg-surface-container-highest text-on-surface py-2.5 rounded-lg flex items-center justify-center gap-1 transition-colors font-label-md text-label-md uppercase font-semibold"
                  type="button"
                  onClick={() => setCheckoutNote(true)}
                >
                  <span className="normal-case">
                    <span className="font-bold text-[#4285F4]">G</span>
                    <span className="font-bold text-[#EA4335]">o</span>
                    <span className="font-bold text-[#FBBC05]">o</span>
                    <span className="font-bold text-[#4285F4]">g</span>
                    <span className="font-bold text-[#34A853]">l</span>
                    <span className="font-bold text-[#EA4335]">e</span>
                  </span>{" "}
                  Pay
                </button>
                <button
                  className="bg-[#FFB3C7] hover:bg-[#fca1b9] text-[#171717] py-2.5 rounded-lg flex items-center justify-center font-label-md text-label-md uppercase font-bold tracking-wider transition-colors"
                  type="button"
                  onClick={() => setCheckoutNote(true)}
                >
                  Klarna.
                </button>
              </div>
            </div>
            <div className="relative flex items-center justify-center py-space-xs">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full h-px bg-surface-container-highest" />
              </div>
              <span className="relative bg-surface-container-lowest px-space-sm font-label-sm text-label-sm uppercase tracking-widest text-secondary">
                or traditional checkout
              </span>
            </div>
            <button
              className="w-full bg-primary hover:bg-primary-container text-on-primary py-3.5 rounded-lg font-label-md text-label-md uppercase tracking-[0.15em] font-semibold text-center block transition-all shadow-sm hover:shadow-md"
              type="button"
              onClick={() => setCheckoutNote(true)}
            >
              Proceed to Private Atelier Checkout
            </button>
            {checkoutNote && (
              <p className="font-body-sm text-body-sm text-on-surface-variant text-center" role="status">
                Checkout isn&apos;t connected yet — payment processing is coming soon.
              </p>
            )}
            <div className="bg-surface-container-low p-space-sm rounded-lg space-y-1">
              <div className="flex items-center gap-space-xs text-secondary font-label-sm text-label-sm">
                <Icon name="swap_horizontal_circle" className="text-[15px] text-tertiary" />
                <span>
                  Klarna available: 3 interest-free payments of <strong className="text-on-surface">{fmt(subtotal / 3)}</strong>
                </span>
              </div>
              <div className="flex items-center gap-space-xs text-secondary font-label-sm text-label-sm">
                <Icon name="event_available" className="text-[15px] text-tertiary" />
                <span>White-glove courier booking window selectable on next step</span>
              </div>
            </div>
          </div>
          <div className="p-space-md bg-surface-container rounded-xl flex items-center gap-space-md">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
              <Icon name="support_agent" className="text-[20px]" />
            </div>
            <div>
              <h5 className="font-headline-sm text-[16px] text-on-surface">Concierge Leather Specialist</h5>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Questions about fit or bespoke monogramming? Call our Edinburgh workshop directly at{" "}
                <a className="text-primary hover:underline font-medium" href="tel:+441315550198">
                  +44 (0)131 555 0198
                </a>
                .
              </p>
            </div>
          </div>
        </aside>
      </div>

      <div className="mt-space-xl pt-space-lg">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-space-lg gap-space-sm">
          <div>
            <span className="font-label-sm text-label-sm text-tertiary uppercase tracking-widest block mb-1">
              From the Edinburgh Workbenches
            </span>
            <h2 className="font-headline-md text-headline-md text-on-surface">Upcoming Small-Batch Releases</h2>
          </div>
          <Link
            className="font-label-md text-label-md uppercase tracking-wider text-primary hover:text-primary-container flex items-center gap-1 font-semibold"
            href="/shop/preview"
          >
            Explore All Rare Editions <Icon name="east" className="text-[18px]" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          {UPCOMING.map((u) => {
            return (
              <div key={u.name} className="bg-surface-container-lowest p-space-md rounded-xl space-y-space-md shadow-sm hover:shadow-md transition-all group">
                <div className="aspect-4/3 bg-surface-container-low rounded-lg overflow-hidden relative">
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    alt={u.alt}
                    src={IMG + u.image}
                  />
                  <span className={`absolute top-3 left-3 font-label-sm text-label-sm uppercase px-2 py-1 rounded ${u.badgeClass}`}>
                    {u.badge}
                  </span>
                </div>
                <div>
                  <span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest">{u.collection}</span>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface mt-1">{u.name}</h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-2 line-clamp-2">{u.text}</p>
                  <div className="flex items-center justify-between mt-space-md pt-space-xs">
                    <span className="font-headline-sm text-[20px] text-on-surface">{u.price}</span>
                    {u.quickAdd ? (
                      <button
                        className="text-primary hover:text-primary-container font-label-sm text-label-sm uppercase tracking-wider font-semibold disabled:text-tertiary"
                        type="button"
                        disabled={quickAdded}
                        onClick={() =>
                          actions.addItem({
                            productId: "glencoe-grooming-roll",
                            name: u.name,
                            collection: u.collection,
                            image: IMG + u.image,
                            imageAlt: u.alt,
                            priceUsd: u.quickAdd.usd,
                            priceGbp: u.quickAdd.gbp,
                            material: "Saddle Leather",
                            badge: { label: "Complimentary Monogram", tone: "tertiary" },
                            details: [{ label: "Contents", value: "Brushes, Horn Comb, Wax" }],
                          })
                        }
                      >
                        {quickAdded ? "Added ✓" : u.cta}
                      </button>
                    ) : (
                      <Link
                        className="text-primary hover:text-primary-container font-label-sm text-label-sm uppercase tracking-wider font-semibold"
                        href="/shop/preview"
                      >
                        {u.cta}
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
