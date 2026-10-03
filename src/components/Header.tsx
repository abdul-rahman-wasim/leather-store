"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { AVATAR_SRC, LOGO_SRC, formatPrice } from "@/lib/catalog";
import { actions, useStore } from "@/lib/store";
import { Icon } from "./Icon";

const NAV = [
  { label: "Storefront", href: "/" },
  { label: "Shop All", href: "/shop" },
  { label: "The Canine Collection", href: "/shop/canine" },
  { label: "Bespoke Jackets", href: "/shop/jackets" },
  { label: "Footwear", href: "/shop/shoes" },
  { label: "Craftsmanship Story", href: "/#craftsmanship" },
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
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(43,27,23,0.05)]">
      <div className="bg-surface-container-high py-space-xs px-margin md:px-margin-desktop">
        <div className="max-w-360 mx-auto flex items-center justify-between text-on-surface-variant">
          <div className="flex items-center gap-space-sm min-w-0">
            <Icon name="local_shipping" className="text-[15px] text-tertiary" />
            <p className="font-label-sm text-label-sm uppercase tracking-wider truncate">
              Complimentary Express Tracked Shipping to United States, United Kingdom &amp; Scotland • Bespoke
              Monogramming Available
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-space-md shrink-0 pl-space-md">
            <div className="flex items-center gap-space-xs bg-surface-container-low px-space-sm py-0.5 rounded-lg">
              <Icon name="public" className="text-[14px] text-tertiary" />
              <span className="font-label-sm text-label-sm uppercase text-on-surface">US / UK / SCT</span>
            </div>
            <div className="flex items-center gap-space-xs font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
              <button
                className={`hover:text-on-surface transition-colors ${currency === "USD" ? "font-semibold text-on-surface" : ""}`}
                type="button"
                aria-pressed={currency === "USD"}
                onClick={() => actions.setCurrency("USD")}
              >
                USD $
              </button>
              <span className="opacity-40">/</span>
              <button
                className={`hover:text-on-surface transition-colors ${currency === "GBP" ? "font-semibold text-on-surface" : ""}`}
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
      <div className="h-20 max-w-360 mx-auto px-margin md:px-margin-tablet 2xl:px-margin-desktop flex items-center justify-between gap-gutter">
        <div className="flex items-center gap-space-md">
          <button
            type="button"
            className="xl:hidden p-space-xs text-on-surface-variant hover:text-on-surface"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
          >
            <Icon name={menuOpen ? "close" : "menu"} className="text-[24px]" />
          </button>
          <Link className="flex items-center gap-space-sm" href="/">
            <img alt="Velluto & Hide Atelier Logo" className="h-8 w-auto object-contain" src={LOGO_SRC} />
            <div className="flex flex-col">
              <span className="font-headline-sm text-headline-sm tracking-tight text-on-surface">Velluto &amp; Hide</span>
              <span className="hidden sm:block font-label-sm text-label-sm tracking-[0.2em] uppercase text-secondary">
                Atelier • London &amp; Edinburgh
              </span>
            </div>
          </Link>
        </div>
        <nav className="hidden xl:flex items-center gap-space-md 2xl:gap-space-lg whitespace-nowrap">
          {NAV.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`font-label-md text-label-md uppercase tracking-wider transition-colors py-1 ${
                  active
                    ? "text-primary font-semibold border-b border-primary"
                    : "text-on-surface-variant hover:text-on-surface"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-space-md">
          <Link
            aria-label="Search catalog"
            href="/shop"
            className="hidden sm:block xl:hidden 2xl:block p-space-xs text-on-surface-variant hover:text-on-surface transition-colors"
          >
            <Icon name="search" className="text-[22px]" />
          </Link>
          <Link
            aria-label={`Wishlist (${wishlist.length})`}
            href="/shop"
            className="relative p-space-xs text-on-surface-variant hover:text-on-surface transition-colors"
          >
            <Icon name="favorite" className="text-[22px]" filled={wishlist.length > 0} />
            {wishlist.length > 0 && (
              <span className="absolute top-0 right-0 w-4 h-4 bg-tertiary text-on-tertiary rounded-full font-label-sm text-[9px] flex items-center justify-center font-semibold">
                {wishlist.length}
              </span>
            )}
          </Link>
          <Link
            href="/cart"
            className="flex items-center gap-space-xs bg-surface-container-low hover:bg-surface-container-high hover:text-on-surface transition-colors px-space-sm py-1.5 rounded-lg text-on-surface-variant"
          >
            <Icon name="shopping_bag" className="text-[20px] text-primary" />
            <div className="flex flex-col text-left">
              <span className="font-label-sm text-label-sm font-semibold text-on-surface">
                {formatPrice(subtotal, subtotal, currency)}
              </span>
              <span className="font-label-sm text-[9px] uppercase tracking-wider text-secondary">
                {itemCount} {itemCount === 1 ? "Item" : "Items"}
              </span>
            </div>
          </Link>
          <div className="hidden sm:flex xl:hidden 2xl:flex items-center gap-space-xs pl-space-xs">
            <span className="block p-0.5 rounded-full hover:ring-2 hover:ring-primary/20 transition-all">
              <img alt="Patron profile" className="w-8 h-8 rounded-full object-cover" src={AVATAR_SRC} />
            </span>
          </div>
        </div>
      </div>
      {menuOpen && (
        <nav className="xl:hidden border-t border-surface-container-high bg-surface px-margin md:px-margin-desktop py-space-md flex flex-col gap-space-sm">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className={`font-label-md text-label-md uppercase tracking-wider py-1 ${
                isActive(pathname, item.href) ? "text-primary" : "text-on-surface-variant hover:text-on-surface"
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
