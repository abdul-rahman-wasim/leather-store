import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/Icon";

const LINKS = [
  { href: "/#catalog-section", icon: "factory", label: "Contract Articles", text: "OEM & private label programme with MOQs" },
  { href: "/shop", icon: "shopping_bag", label: "Retail Shop", text: "Ready-to-ship footwear, harnesses & outerwear" },
  { href: "/#rfq-portal", icon: "request_quote", label: "Request a Quote", text: "Factory costing within 24 hours" },
];

export const metadata: Metadata = { title: "Page Not Found" };

export default function NotFound() {
  return (
    <div className="max-w-360 mx-auto px-margin md:px-12 py-24 md:py-32">
      <div className="max-w-2xl">
        <span className="text-xs font-semibold tracking-eyebrow uppercase text-accent-saddle block mb-3">
          404 · Off the Workbench
        </span>
        <h1 className="font-headline text-4xl sm:text-5xl text-on-surface font-normal leading-tight">
          This page isn&apos;t on our bench.
        </h1>
        <p className="text-on-surface-variant font-light mt-4 leading-relaxed">
          The link may be old or mistyped. Pick up from one of these instead:
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10 max-w-4xl">
        {LINKS.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="group bg-surface-container-lowest border border-outline-variant/30 hover:border-primary rounded-lg p-5 transition-colors"
          >
            <Icon name={l.icon} className="text-[22px] text-accent-saddle" />
            <span className="flex items-center gap-1 mt-3 text-xs font-semibold uppercase tracking-wider text-primary">
              {l.label}
              <Icon name="arrow_forward" className="text-[16px] transition-transform group-hover:translate-x-0.5" />
            </span>
            <span className="block text-xs text-on-surface-variant font-light mt-1">{l.text}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
