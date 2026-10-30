@AGENTS.md

# Vale & Rawat — leather store

Next.js 16 (App Router) + React 19 + Tailwind v4 + TypeScript. No backend; static catalog data, client-side cart. RFQ form emails via EmailJS (browser SDK) behind reCAPTCHA v2 — env keys in `.env.example`, copy to `.env.local`.

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
    Header, Footer, Icon (Icon + Stars), Toast (toast() + <Toast/> pill, mounted in layout), WhatsAppLink (wa.me link prefilled with RFQ articles — use for every WhatsApp CTA)
    Concierge.tsx         Floating "Islamabad Export Desk" chat + WhatsApp launcher (automated replies from site data, each with a WhatsApp handoff), mounted in layout
    Lookbook.tsx          openLookbook(source) / <LookbookButton> + <LookbookDialog/> email-gated PDF request, mounted in layout
    home/ shop/ product/ cart/   Feature components, grouped by page (home/RfqPortal sends the RFQ, home/Recaptcha is the v2 widget, home/QuoteEstimator gives indicative contract costing, cart/InvoiceRequest emails the satchel — no online payments; the desk replies with an invoice + payment link)
  lib/
    catalog.ts            Types, PRODUCTS, CATEGORY_LABELS, image URLs, formatPrice, lead times (makeDays, TRANSIT_DAYS), contract pricing (unitPrice, CUSTOMIZATIONS, estimateQuote — PLACEHOLDER figures)
    store.ts              Cart/region/wishlist/RFQ store (useSyncExternalStore + localStorage)
    emailjs.ts            useEmailForm(template): EmailJS send + reCAPTCHA token + status/error; register templates in TEMPLATES
    useDispatchCountdown.ts  Countdown to 18:00 dispatch cutoff (harness + cart)
```

## Guidelines

- Read `node_modules/next/dist/docs/` before using Next APIs. Use typed helpers `PageProps<"/route">` / `LayoutProps<"/">`; `params` is a Promise — `await` it.
- Server Components by default. Add `"use client"` only to leaf components needing state/effects/store; keep pages as server components.
- Import via `@/` alias (`@/lib/...`, `@/components/...`).
- Product/catalog data lives in `src/lib/catalog.ts` only — never hardcode products in components. Prices carry both `priceUsd` and `priceGbp`; display with `formatPrice`.
- Client state: read with `useStore()`, mutate with `actions.*` from `src/lib/store.ts`. No other state libraries.
- Brand story: everything is made in, and shipped from, the Islamabad factory. No UK/EU offices, workshops or dispatch hubs. UK/EU place names only as destinations, customers or product style names.
- Delivery estimates = bench time (`makeDays` / `orderMakeDays`) + `TRANSIT_DAYS`, shown with `formatDays`. Never hardcode day counts in components.
- UI source of truth: Stitch project "Artisan Leather Goods Store" — home: "Vale & Rawat Atelier & Manufacture - B2B Storefront"; other pages: Editorial Redesign screens. Match markup and copy.
- Styling: Tailwind utilities with theme tokens from `globals.css` (`bg-surface`, `text-on-surface`, `text-primary`, `font-headline-lg text-headline-lg`, ...). No raw hex colors, no CSS modules. New tokens go in `@theme`.
- Icons: `<Icon name="material_symbol_name" />`, never inline SVG.
- Images: plain `<img>` with descriptive `alt` (remote host not configured for `next/image`).
- Each non-home page exports `metadata` / `generateMetadata` with a `title` (layout applies `%s | Vale & Rawat`).
- Responsive: header rows are fixed height (32px strip + 80px bar = `pt-28` in layout, `top-28` for sticky bars) — never let them wrap; trim or hide copy per breakpoint instead. Dense layouts (spec cards, forms, sidebars, 4-up grids) go multi-column at `xl`, not `lg`. Chips, badges and buttons get `whitespace-nowrap`; label/value rows get `shrink-0` labels.
- Run `npm run lint` and `npm run build` before committing.

## Branches & PRs (MUST follow)

- Never commit straight to `dev` or `main`. Branch off `dev` per fix/feature: `feat/<slug>`, `fix/<slug>`, `docs/<slug>`, `chore/<slug>`.
- Before every commit: stage exactly the commit's files by name (never `git add -A`; unrelated local changes stay out) and write the one-line message to `.git/SQUASH_MSG` so it shows in VS Code's Source Control box. Then show message + file list and wait for explicit approval. If rejected, unstage and delete `.git/SQUASH_MSG`.
- Push the branch and open a PR into `dev` titled with the commit message. Never merge it: the user reviews and merges every PR. Branch new work off the latest `origin/dev`. `main` is updated from `dev` only.
- Pushing: Git Credential Manager may block on an account picker. Push with `GH_TOKEN=$(gh auth token --user abdul-rahman-wasim) git -c credential.helper= -c "credential.helper=!gh auth git-credential" push`.
- `gh`: active account may be `Team1-Sportech` (read-only here). Run PR commands as the owner without switching globally: `GH_TOKEN=$(gh auth token --user abdul-rahman-wasim) gh pr ...`.

## Commits (MUST follow)

- Conventional commit format: `type: short summary` (`feat`, `fix`, `style`, `refactor`, `chore`, `docs`, ...).
- One line only. Short, no body, no bullet lists.
- NEVER add a `Co-Authored-By` trailer or any Claude/AI attribution to commits or PRs.
- NEVER amend, rebase or force-push commits that are already pushed. Fix mistakes with a new follow-up commit.
