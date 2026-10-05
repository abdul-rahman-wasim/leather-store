"use client";

import Link from "next/link";
import { useState } from "react";
import { BRAND, LOGO_SRC, LOOKBOOK_MESSAGE, TRADE_DESK } from "@/lib/catalog";
import { useStore } from "@/lib/store";
import { Icon } from "./Icon";
import { toast } from "./Toast";

const NAV = [
  { label: "Contract Articles", href: "/#catalog-section" },
  { label: "Atelier Audit", href: "/#factory-credentials" },
  { label: "B2B RFQ Portal", href: "/#rfq-portal" },
  { label: "Track Commission", href: "/#production-tracker" },
  { label: "Leather Standards", href: "/#provenance" },
];

export function Header() {
  const { rfq } = useStore();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-surface/95 backdrop-blur-xl border-b border-outline-variant/25">
      <div className="border-b border-outline-variant/15 py-2 px-margin md:px-12 text-xs bg-surface-container-low/70">
        <div className="max-w-360 mx-auto flex items-center justify-between gap-4 text-on-surface-variant font-medium">
          <div className="flex items-center gap-3 min-w-0 text-[11px] tracking-eyebrow uppercase">
            <span className="inline-flex items-center gap-1.5 text-primary font-semibold min-w-0">
              <span className="w-1.5 h-1.5 shrink-0 rounded-full bg-accent-saddle" />
              <span className="truncate">Factory Workbenches: I-9 Industrial Area, Islamabad, Pakistan</span>
            </span>
            <span className="hidden xl:inline text-outline/50">•</span>
            <span className="hidden xl:inline text-on-surface-variant/80 whitespace-nowrap">
              Direct Export Office:{" "}
              <a className="text-accent-saddle hover:underline normal-case" href={`mailto:${TRADE_DESK.email}`}>
                {TRADE_DESK.email}
              </a>
            </span>
          </div>
          <div className="hidden md:flex items-center gap-5 shrink-0 text-[11px] tracking-wider uppercase">
            <a
              className="flex items-center gap-1.5 text-primary font-semibold hover:text-accent-saddle transition-colors"
              href={TRADE_DESK.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon name="chat" className="text-[15px] text-accent-saddle" />
              <span>WhatsApp Line: {TRADE_DESK.phone}</span>
            </a>
            <span className="opacity-30 hidden lg:inline">|</span>
            <span className="text-on-surface-variant/80 hidden lg:inline">OEM &amp; Private Label Spec</span>
            <span className="opacity-30">|</span>
            <Link className="text-accent-saddle font-bold hover:underline" href="/#rfq-portal">
              Direct RFQ Desk
            </Link>
          </div>
        </div>
      </div>
      <div className="h-20 max-w-360 mx-auto px-margin md:px-12 flex items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="lg:hidden p-1.5 text-on-surface-variant hover:text-on-surface"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
          >
            <Icon name={menuOpen ? "close" : "menu"} className="text-[24px]" />
          </button>
          <Link className="flex items-center gap-2 group" href="/">
            <img
              alt={`${BRAND} Atelier & Manufacture Logo`}
              className="h-10 sm:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.02]"
              src={LOGO_SRC}
            />
          </Link>
        </div>
        <nav className="hidden lg:flex items-center gap-7 whitespace-nowrap text-[12px] uppercase font-semibold tracking-eyebrow text-on-surface-variant">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} className="nav-link hover:text-on-surface transition-colors">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <button
            className="hidden sm:inline-flex items-center gap-1.5 border border-outline-variant/60 hover:border-primary px-3 py-2 rounded text-[11px] uppercase tracking-wider font-semibold text-primary transition-all active:scale-95"
            type="button"
            onClick={() => toast(LOOKBOOK_MESSAGE)}
          >
            <Icon name="menu_book" className="text-[16px] text-accent-saddle" />
            <span>2026 Lookbook (PDF)</span>
          </button>
          <Link
            className="inline-flex items-center gap-1.5 bg-primary text-surface hover:bg-primary-container px-4 py-2.5 rounded text-[11px] uppercase tracking-eyebrow font-semibold shadow transition-all active:scale-95"
            href="/#rfq-portal"
          >
            <Icon name="assignment" className="text-[16px] text-secondary-container" />
            <span>Request RFQ ({rfq.length})</span>
          </Link>
        </div>
      </div>
      {menuOpen && (
        <nav className="lg:hidden border-t border-outline-variant/20 bg-surface px-margin md:px-12 py-4 flex flex-col gap-3">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="text-[12px] uppercase font-semibold tracking-eyebrow py-1 text-on-surface-variant hover:text-on-surface"
            >
              {item.label}
            </Link>
          ))}
          <a
            className="text-[12px] uppercase font-semibold tracking-eyebrow py-1 text-primary"
            href={TRADE_DESK.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp: {TRADE_DESK.phone}
          </a>
        </nav>
      )}
    </header>
  );
}
