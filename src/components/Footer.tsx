import Link from "next/link";
import { LOGO_SRC } from "@/lib/catalog";
import { Icon } from "./Icon";
import { NewsletterForm } from "./NewsletterForm";

const PROMISES = [
  {
    icon: "verified",
    title: "Full-Grain Vegetable Tanned",
    text: "Certified Tuscan hides conditioned with organic chestnut extracts.",
  },
  {
    icon: "hardware",
    title: "Hand-Stitched Guarantee",
    text: "Traditional two-needle saddle stitching backed by our bespoke craftsmanship guarantee.",
  },
  {
    icon: "published_with_changes",
    title: "30-Day Bespoke Exchange",
    text: "Free delivery and courier returns across the United States, UK, and Scotland.",
  },
];

const CATALOG_LINKS = [
  { label: "Complete Catalog", href: "/shop" },
  { label: "Bespoke Outerwear", href: "/shop/jackets" },
  { label: "Canine Collection", href: "/shop/canine" },
  { label: "Handcrafted Footwear", href: "/shop/shoes" },
  { label: "Blind Monogramming", href: "/products/highlands-ergonomic-harness" },
];

const CARE_LINKS = [
  { label: "Leather Care Guide", href: "#" },
  { label: "US & UK Tariffs & Courier", href: "/#shipping" },
  { label: "Provenance & Sustainability", href: "/#craftsmanship" },
  { label: "Private Atelier Consult", href: "/#appointments" },
  { label: "Track Commission", href: "#" },
];

function LinkColumn({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h5 className="text-xs font-semibold tracking-eyebrow uppercase text-on-surface mb-4">{title}</h5>
      <ul className="space-y-2 text-xs text-on-surface-variant font-light">
        {links.map((l) => (
          <li key={l.label}>
            <Link className="hover:text-primary transition-colors" href={l.href}>
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="w-full bg-surface-container-low border-t border-outline-variant/30 pt-20 pb-12">
      <div className="max-w-360 mx-auto px-margin md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-16 border-b border-outline-variant/25">
          {PROMISES.map((p) => (
            <div key={p.title} className="flex items-start gap-4">
              <Icon name={p.icon} className="text-secondary text-[28px] mt-0.5" />
              <div>
                <h4 className="font-headline text-lg text-on-surface">{p.title}</h4>
                <p className="text-xs text-on-surface-variant font-light mt-1">{p.text}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 py-16">
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <img alt="Velluto & Hide Atelier Logo" className="h-7 w-auto object-contain" src={LOGO_SRC} />
              <span className="font-headline text-xl text-on-surface">Velluto &amp; Hide</span>
            </div>
            <p className="text-xs sm:text-sm text-on-surface-variant font-light leading-relaxed max-w-sm">
              Born in the historic mews of Mayfair and refined in the Scottish Highlands. We craft heirlooms honoring
              leatherworking methods unchanged for over a century.
            </p>
            <div className="pt-2 text-xs text-on-surface-variant">
              <span className="uppercase tracking-eyebrow font-semibold block text-[10px] text-secondary mb-1">
                Atelier Addresses
              </span>
              <p>14 Savile Row, London • 92 George Street, Edinburgh</p>
            </div>
          </div>
          <LinkColumn title="Catalog" links={CATALOG_LINKS} />
          <LinkColumn title="Patron Care" links={CARE_LINKS} />
          <div>
            <h5 className="text-xs font-semibold tracking-eyebrow uppercase text-on-surface mb-4">The Atelier Journal</h5>
            <p className="text-xs text-on-surface-variant font-light mb-4">
              Receive batch notices and 10% off your initial bespoke piece.
            </p>
            <NewsletterForm />
          </div>
        </div>
        <div className="pt-8 border-t border-outline-variant/25 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-on-surface-variant font-light">
          <p>© {new Date().getFullYear()} Velluto &amp; Hide Leathercraft Ltd. All rights reserved. London • Edinburgh.</p>
          <div className="flex items-center gap-6">
            <Link className="hover:text-on-surface transition-colors" href="#">
              Privacy Policy
            </Link>
            <Link className="hover:text-on-surface transition-colors" href="#">
              Terms of Service
            </Link>
            <Link className="hover:text-on-surface transition-colors" href="/#shipping">
              Duties &amp; Freight
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
