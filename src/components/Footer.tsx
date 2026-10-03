import Link from "next/link";
import { LOGO_SRC } from "@/lib/catalog";
import { Icon } from "./Icon";
import { NewsletterForm } from "./NewsletterForm";

const PROMISES = [
  {
    icon: "verified",
    title: "Full-Grain Vegetable Tanned",
    text: "Certified Tuscan hides conditioned with organic chestnut bark extracts.",
  },
  {
    icon: "hardware",
    title: "Hand-Stitched Guarantee",
    text: "Traditional two-needle saddle stitching backed by our atelier lifetime warranty.",
  },
  {
    icon: "published_with_changes",
    title: "30-Day Bespoke Exchange",
    text: "Courier collection across the United States, United Kingdom, and Scotland.",
  },
];

const CATALOG_LINKS = [
  { label: "Complete Catalog", href: "/shop" },
  { label: "Made-to-Order Jackets", href: "/shop/jackets" },
  { label: "The Canine Collection", href: "/shop/canine" },
  { label: "Handcrafted Footwear", href: "/shop/shoes" },
  { label: "Blind-Deboss Monogramming", href: "/products/highlands-ergonomic-harness" },
];

const CARE_LINKS = [
  { label: "Leather Care Guide", href: "#" },
  { label: "US, UK & Scotland Tariffs & Courier", href: "/#shipping" },
  { label: "Provenance & Sustainability", href: "/#craftsmanship" },
  { label: "Private Atelier Consultations", href: "/#appointments" },
  { label: "Track Bespoke Commission", href: "#" },
];

function LinkColumn({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h5 className="font-label-md text-label-md uppercase tracking-wider text-on-surface mb-space-md">{title}</h5>
      <ul className="space-y-space-xs">
        {links.map((l) => (
          <li key={l.label} className="font-body-sm text-body-sm">
            <Link className="text-on-surface-variant hover:text-primary transition-colors" href={l.href}>
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
    <footer className="w-full bg-surface-container-low mt-space-xl pt-space-xl pb-space-lg shadow-[0_-1px_12px_rgba(43,27,23,0.03)]">
      <div className="max-w-360 mx-auto px-margin md:px-margin-desktop">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-space-xl pb-space-lg border-b border-surface-container-high">
          {PROMISES.map((p) => (
            <div key={p.title} className="flex items-center gap-space-md">
              <Icon name={p.icon} className="text-primary text-[32px]" />
              <div>
                <h4 className="font-headline-sm text-headline-sm text-on-surface">{p.title}</h4>
                <p className="font-body-sm text-body-sm text-on-surface-variant">{p.text}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-space-xl py-space-xl">
          <div className="lg:col-span-2 space-y-space-md">
            <div className="flex items-center gap-space-sm">
              <img alt="Velluto & Hide Atelier Logo" className="h-7 w-auto object-contain" src={LOGO_SRC} />
              <span className="font-headline-md text-headline-md text-on-surface">Velluto &amp; Hide</span>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-md">
              Born in the historic mews of Mayfair and refined in the Scottish Highlands. We craft heirlooms of untamed
              character, honoring leatherworking methods unchanged for over a century.
            </p>
            <div className="pt-space-xs">
              <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary block mb-space-xs">
                Ateliers
              </span>
              <p className="font-body-sm text-body-sm text-on-surface">
                14 Savile Row, London • 92 George Street, Edinburgh
              </p>
            </div>
          </div>
          <LinkColumn title="Catalog & Services" links={CATALOG_LINKS} />
          <LinkColumn title="Patron Care & Trust" links={CARE_LINKS} />
          <div>
            <h5 className="font-label-md text-label-md uppercase tracking-wider text-on-surface mb-space-md">
              The Atelier Journal
            </h5>
            <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-sm">
              Receive bespoke invitations, limited batch notices, and 10% off your initial commission.
            </p>
            <NewsletterForm />
          </div>
        </div>
        <div className="pt-space-lg border-t border-surface-container-high flex flex-col sm:flex-row items-center justify-between gap-space-md font-label-sm text-label-sm text-secondary">
          <p>© {new Date().getFullYear()} Velluto &amp; Hide Leathercraft Ltd. All rights reserved. Mayfair • Edinburgh.</p>
          <div className="flex items-center gap-space-md">
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
