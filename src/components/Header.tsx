"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { LOGO_SRC, formatPrice } from "@/lib/catalog";
import { actions, useStore } from "@/lib/store";
import { Icon } from "./Icon";

const NAV = [
  { label: "Storefront", href: "/" },
  { label: "Shop All", href: "/shop" },
  { label: "Canine Collection", href: "/shop/canine" },
  { label: "Bespoke Outerwear", href: "/shop/jackets" },
  { label: "Footwear", href: "/shop/shoes" },
  { label: "Craftsmanship", href: "/#craftsmanship" },
];

function isActive(pathname: string, href: string) {
  if (href === "/shop/canine" && pathname.startsWith("/products/")) return true;
  return pathname === href;
}

export function Header() {
  const pathname = usePathname();
  const { currency, subtotal, itemCount, wishlist } = useStore();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-surface/90 backdrop-blur-xl border-b border-outline-variant/20">
      <div className="border-b border-outline-variant/15 py-2 px-margin md:px-12">
        <div className="max-w-360 mx-auto flex items-center justify-between gap-6 text-on-surface-variant font-medium">
          <div className="flex items-center gap-2 min-w-0">
            <span className="w-1.5 h-1.5 shrink-0 rounded-full bg-secondary" />
            <p className="tracking-eyebrow uppercase text-[11px] truncate">
              Complimentary Express Tracked Shipping to United States, United Kingdom &amp; Scotland
            </p>
          </div>
          <div className="hidden md:flex items-center gap-6 shrink-0 text-[11px] tracking-eyebrow uppercase">
            <span className="hidden lg:inline text-on-surface/80">London &amp; Edinburgh Workbenches</span>
            <div className="flex items-center gap-2">
              <button
                className={`hover:text-on-surface transition-colors ${currency === "USD" ? "font-semibold text-on-surface" : "opacity-70 hover:opacity-100"}`}
                type="button"
                aria-pressed={currency === "USD"}
                onClick={() => actions.setCurrency("USD")}
              >
                USD $
              </button>
              <span className="opacity-30">/</span>
              <button
                className={`hover:text-on-surface transition-colors ${currency === "GBP" ? "font-semibold text-on-surface" : "opacity-70 hover:opacity-100"}`}
                type="button"
                aria-pressed={currency === "GBP"}
                onClick={() => actions.setCurrency("GBP")}
              >
                GBP £
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="h-20 max-w-360 mx-auto px-margin md:px-12 flex items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="xl:hidden p-1.5 text-on-surface-variant hover:text-on-surface"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
          >
            <Icon name={menuOpen ? "close" : "menu"} className="text-[24px]" />
          </button>
          <Link className="flex items-center gap-3.5 group" href="/">
            <img
              alt="Velluto & Hide Atelier Logo"
              className="h-8 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              src={LOGO_SRC}
            />
            <div className="flex flex-col">
              <span className="font-headline text-2xl tracking-tight text-on-surface leading-none">Velluto &amp; Hide</span>
              <span className="hidden sm:block text-[10px] tracking-[0.25em] uppercase text-on-surface-variant/80 mt-1 font-semibold">
                Savile Row &amp; Edinburgh
              </span>
            </div>
          </Link>
        </div>
        <nav className="hidden xl:flex items-center gap-6 2xl:gap-8 whitespace-nowrap text-[12px] uppercase font-semibold tracking-wider 2xl:tracking-eyebrow text-on-surface-variant">
          {NAV.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`nav-link transition-colors ${active ? "text-on-surface" : "hover:text-on-surface"}`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-3 sm:gap-5">
          <Link
            aria-label="Search catalog"
            href="/shop"
            className="hidden sm:block p-1.5 text-on-surface-variant hover:text-on-surface transition-all active:scale-90"
          >
            <Icon name="search" className="text-[22px]" />
          </Link>
          <Link
            aria-label={`Wishlist (${wishlist.length})`}
            href="/shop"
            className="relative p-1.5 text-on-surface-variant hover:text-on-surface transition-all active:scale-90"
          >
            <Icon name="favorite" className="text-[22px]" filled={wishlist.length > 0} />
            {wishlist.length > 0 && (
              <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-secondary text-on-secondary rounded-full text-[9px] flex items-center justify-center font-bold">
                {wishlist.length}
              </span>
            )}
          </Link>
          <Link
            href="/cart"
            className="flex items-center gap-2.5 bg-surface-container hover:bg-surface-container-high transition-all active:scale-95 duration-200 px-3.5 py-2 rounded-full border border-outline-variant/30 text-on-surface"
          >
            <Icon name="shopping_bag" className="text-[19px] text-primary" />
            <div className="flex flex-col text-left leading-none">
              <span className="text-xs font-semibold">{formatPrice(subtotal, subtotal, currency)}</span>
              <span className="text-[9px] tracking-wider uppercase text-on-surface-variant mt-0.5">
                {itemCount} {itemCount === 1 ? "Item" : "Items"}
              </span>
            </div>
          </Link>
        </div>
      </div>
      {menuOpen && (
        <nav className="xl:hidden border-t border-outline-variant/20 bg-surface px-margin md:px-12 py-4 flex flex-col gap-3">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className={`text-[12px] uppercase font-semibold tracking-eyebrow py-1 ${
                isActive(pathname, item.href) ? "text-on-surface" : "text-on-surface-variant hover:text-on-surface"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
