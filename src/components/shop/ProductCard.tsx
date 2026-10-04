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
      badge: product.commission ? { label: "Made To Order", tone: "accent" } : undefined,
      details: [
        { label: "Color", value: TONES[product.swatches[0]].name },
        { label: product.commission ? "Fit" : "Finish", value: product.commission ? "Bespoke Measurement" : product.tag },
      ],
    });
    setAdded(true);
  }

  return (
    <article className="group flex flex-col bg-surface-container-lowest rounded-xl p-3 border border-outline-variant/30 hover:border-outline transition-all duration-300 hover:shadow-lg">
      <div className="relative w-full aspect-4/5 bg-surface-container rounded-lg overflow-hidden">
        <MaybeLink href={product.href} className="block w-full h-full">
          <img
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            alt={product.imageAlt}
            src={product.image}
          />
        </MaybeLink>
        <button
          aria-label={wished ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
          aria-pressed={wished}
          className={`absolute top-3 right-3 w-8 h-8 rounded-full bg-surface/85 backdrop-blur-md flex items-center justify-center hover:text-primary transition-all duration-200 shadow-sm ${wished ? "text-secondary" : "text-on-surface"}`}
          type="button"
          onClick={() => actions.toggleWishlist(product.id)}
        >
          <Icon name="favorite" filled={wished} className="text-[18px]" />
        </button>
        <div className="absolute bottom-3 left-3 bg-surface/90 backdrop-blur-md px-2.5 py-1 rounded font-label-sm text-[10px] uppercase tracking-wider text-primary font-medium pointer-events-none">
          {product.stock}
        </div>
      </div>
      <div className="flex flex-col flex-1 pt-3 justify-between">
        <div>
          <div className="flex items-center justify-between text-secondary font-label-sm text-label-sm mb-1">
            <span>{product.collection}</span>
            <span className="text-tertiary">{product.tag}</span>
          </div>
          <h3 className="font-headline-sm text-headline-sm text-on-surface group-hover:text-primary transition-colors">
            {product.href ? <Link href={product.href}>{product.name}</Link> : product.name}
          </h3>
          <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2 mt-1">{product.description}</p>
        </div>
        <div className="pt-4">
          <div className="flex items-baseline justify-between mb-3">
            <div className="flex items-baseline gap-1.5">
              <span className="font-headline-sm text-headline-sm text-primary">${product.priceUsd}</span>
              <span className="font-label-sm text-label-sm text-secondary">/ £{product.priceGbp}</span>
            </div>
            <div className="flex items-center gap-1.5">
              {product.swatches.map((hex) => (
                <span
                  key={hex}
                  title={TONES[hex].short}
                  className="w-3.5 h-3.5 rounded-full"
                  style={{ backgroundColor: hex }}
                />
              ))}
            </div>
          </div>
          <button
            className={`w-full py-2.5 rounded-lg font-label-md text-label-md uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-1.5 ${
              added
                ? "bg-secondary text-on-secondary"
                : product.commission
                  ? "bg-primary hover:bg-primary-container text-on-primary"
                  : "bg-surface-container hover:bg-primary hover:text-on-primary text-on-surface border border-outline-variant/30"
            }`}
            type="button"
            onClick={addToBag}
          >
            <Icon name={added ? "check" : product.commission ? "tune" : "shopping_bag"} className="text-[16px]" />
            {added ? "Added to Satchel" : product.commission ? "Commission Piece" : "Add to Satchel"}
          </button>
        </div>
      </div>
    </article>
  );
}
