@AGENTS.md

# Velluto & Hide — leather store

Next.js 16 (App Router) + React 19 + Tailwind v4 + TypeScript. No backend; static catalog data, client-side cart.

## Structure

```
src/
  app/
    layout.tsx            Root layout: fonts (Hanken Grotesk, Bodoni Moda), Material Symbols, Header/Footer
    globals.css           Tailwind @theme tokens (colors, type scale) + .icon / .nav-link components
    page.tsx              Home
    shop/[[...category]]/ Shop; optional catch-all (shoes|canine|jackets|preview), statically generated
    products/<slug>/      Product detail pages (one folder per product)
    cart/                 Cart
  components/
    Header, Footer, Icon (Icon + Stars), NewsletterForm
    Concierge.tsx         Floating "Atelier Concierge" chatbot (scripted keyword replies), mounted in layout
    home/ shop/ product/ cart/   Feature components, grouped by page
  lib/
    catalog.ts            Types, PRODUCTS, CATEGORY_LABELS, image URLs, formatPrice
    store.ts              Cart/region/wishlist store (useSyncExternalStore + localStorage)
    useDispatchCountdown.ts  Countdown to 18:00 dispatch cutoff (harness + cart)
```

## Guidelines

- Read `node_modules/next/dist/docs/` before using Next APIs. Use typed helpers `PageProps<"/route">` / `LayoutProps<"/">`; `params` is a Promise — `await` it.
- Server Components by default. Add `"use client"` only to leaf components needing state/effects/store; keep pages as server components.
- Import via `@/` alias (`@/lib/...`, `@/components/...`).
- Product/catalog data lives in `src/lib/catalog.ts` only — never hardcode products in components. Prices carry both `priceUsd` and `priceGbp`; display with `formatPrice`.
- Client state: read with `useStore()`, mutate with `actions.*` from `src/lib/store.ts`. No other state libraries.
- UI source of truth: Stitch project "Artisan Leather Goods Store" (Editorial Redesign screens) — match its markup and copy.
- Styling: Tailwind utilities with theme tokens from `globals.css` (`bg-surface`, `text-on-surface`, `text-primary`, `font-headline-lg text-headline-lg`, ...). No raw hex colors, no CSS modules. New tokens go in `@theme`.
- Icons: `<Icon name="material_symbol_name" />`, never inline SVG.
- Images: plain `<img>` with descriptive `alt` (remote host not configured for `next/image`).
- Each non-home page exports `metadata` / `generateMetadata` with a `title` (layout applies `%s | Velluto & Hide`).
- Run `npm run lint` and `npm run build` before committing. Conventional commits (`feat:`, `fix:`, `style:`).
