"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Product } from "@/lib/catalog";
import { actions, useStore } from "@/lib/store";
import { Icon } from "../Icon";

export const TONES: Record<string, { name: string; short: string }> = {
  "#8E431E": { name: "Chestnut Cognac", short: "Chestnut" },
  "#3B251E": { name: "Espresso Brown", short: "Espresso" },
  "#1C1A19": { name: "Midnight Onyx", short: "Onyx" },
  "#5E583A": { name: "Highland Olive Tan", short: "Olive Tan" },
};

function MaybeLink({ href, className, children }: { href?: string; className?: string; children: React.ReactNode }) {
  return href ? (
    <Link href={href} className={className}>
      {children}
    </Link>
  ) : (
    <div className={className}>{children}</div>
  );
}

export function ProductCard({ product }: { product: Product }) {
  const { wishlist } = useStore();
  const [added, setAdded] = useState(false);
  const wished = wishlist.includes(product.id);

  useEffect(() => {
    if (!added) return;
    const t = setTimeout(() => setAdded(false), 1600);
    return () => clearTimeout(t);
  }, [added]);

  function addToBag() {
    actions.addItem({
      productId: product.id,
      name: product.name,
      collection: product.collection,
      image: product.image,
      imageAlt: product.imageAlt,
      priceUsd: product.priceUsd,
      priceGbp: product.priceGbp,
      material: product.material,
      badge: product.commission ? { label: "Made To Order", tone: "tertiary" } : undefined,
      details: [
        { label: "Color", value: TONES[product.swatches[0]].name },
        { label: product.commission ? "Fit" : "Finish", value: product.commission ? "Bespoke Measurement" : product.tag },
      ],
    });
    setAdded(true);
  }

  return (
    <article className="group flex flex-col bg-surface-container-lowest rounded-xl p-space-sm shadow-sm hover:shadow-md transition-all duration-300">
      <div className="relative w-full aspect-4/5 bg-surface-container rounded-lg overflow-hidden">
        <MaybeLink href={product.href} className="block w-full h-full">
          <img
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            alt={product.imageAlt}
            src={product.image}
          />
        </MaybeLink>
        {product.badge && (
          <div
            className={`absolute top-3 left-3 px-2.5 py-1 rounded font-label-sm text-label-sm uppercase tracking-wider shadow-sm font-semibold ${product.badge.className}`}
          >
            {product.badge.label}
          </div>
        )}
        <button
          aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
          aria-pressed={wished}
          className={`absolute top-3 right-3 w-8 h-8 rounded-full bg-surface/80 backdrop-blur-md flex items-center justify-center hover:text-primary transition-colors shadow-sm ${wished ? "text-primary" : "text-on-surface"}`}
          type="button"
          onClick={() => actions.toggleWishlist(product.id)}
        >
          <Icon name="favorite" filled={wished} className="text-[18px]" />
        </button>
        {product.stock && (
          <div className="absolute bottom-3 left-3 bg-surface/90 backdrop-blur-md px-2 py-1 rounded font-label-sm text-label-sm uppercase tracking-wider text-on-surface flex items-center gap-1">
            {product.stock.icon ? (
              <Icon name={product.stock.icon} className="text-[13px] text-tertiary" />
            ) : (
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
            )}
            {product.stock.label}
          </div>
        )}
      </div>
      <div className="flex flex-col flex-1 pt-space-sm px-1 justify-between">
        <div>
          <div className="flex items-center justify-between text-secondary font-label-sm text-label-sm mb-1">
            <span>{product.collection}</span>
            <span className="text-tertiary font-semibold">{product.tag}</span>
          </div>
          <h3 className="font-headline-sm text-headline-sm text-on-surface group-hover:text-primary transition-colors">
            {product.href ? <Link href={product.href}>{product.name}</Link> : product.name}
          </h3>
          <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2 mt-1">{product.description}</p>
        </div>
        <div className="pt-space-md">
          <div className="flex items-center justify-between mb-space-sm">
            <div className="flex flex-col">
              <span className="font-headline-sm text-headline-sm text-primary">${product.priceUsd}</span>
              <span className="font-label-sm text-label-sm text-secondary">£{product.priceGbp} GBP</span>
            </div>
            <div className="flex items-center gap-1.5">
              {product.swatches.map((hex) => (
                <span
                  key={hex}
                  title={TONES[hex].name}
                  className="w-4 h-4 rounded-full shadow-sm"
                  style={{ backgroundColor: hex }}
                />
              ))}
            </div>
          </div>
          <button
            className={`w-full py-2 rounded-lg font-label-md text-label-md uppercase tracking-wider transition-colors flex items-center justify-center gap-1 ${
              added
                ? "bg-tertiary text-on-tertiary"
                : product.commission
                  ? "bg-primary hover:bg-primary-container text-on-primary"
                  : "bg-surface-container hover:bg-primary hover:text-on-primary text-on-surface"
            }`}
            type="button"
            onClick={addToBag}
          >
            <Icon name={added ? "check" : product.commission ? "tune" : "shopping_bag"} className="text-[16px]" />
            {added ? "Added to Bag" : product.commission ? "Commission Piece" : "Add to Bag"}
          </button>
        </div>
      </div>
    </article>
  );
}
