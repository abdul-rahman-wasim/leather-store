import Link from "next/link";
import { Icon } from "@/components/Icon";
import { ArticleActions } from "@/components/home/ArticleActions";
import { BatchTracker } from "@/components/home/BatchTracker";
import { RfqPortal } from "@/components/home/RfqPortal";
import { CONTRACT_ARTICLES, IMG } from "@/lib/catalog";

const HERO_IMG =`${IMG}AB6AXuDgaIgUltyX9WIw1EsfhtDXu5vFrXYz-_Gabh0PApS-x453to42xs6gc6kublziMWbtMBaR3Gd2G5Iu3Q9uKqixA4UiEVCo8vz5on0EvF2Bd6sDfKsM0_r-bCxmuG0SYRpGFDmt-0XAcalTv_swRVRVuggjIG8HL-2w8ZP-zF4z_IuZIURJ_6vjZM1KcmLGdqcMgunsHomHf98KqqC3OWhyakPcNodB2CLwqETeyHyEDVrPgxBL6NuT`;

const QUICK_LINKS = [
  { label: "Factory Credentials", href: "#factory-credentials" },
  { label: "Contract Articles (MOQ 15–50)", href: "#catalog-section" },
  { label: "Live Batch Tracker", href: "#production-tracker" },
];

const TRUST = [
  ["payments", "Factory Pricing (MOQ 25 Units)"],
  ["verified", "REACH, SEDEX & ISO 9001"],
  ["local_shipping", "Duty-Paid: US, UK & EU"],
  ["flight_takeoff", "Air Cargo & Ocean Freight"],
];

const CREDENTIALS = [
  {
    icon: "domain",
    title: "45,000 SQ FT Facility",
    text: "Dedicated pattern drafting, hydraulic clicker cutting, hide skiving, and two-needle bench stitch floor located at Sector I-9/2 Industrial Area, Islamabad.",
    footnote: "Single-Roof Execution",
  },
  {
    icon: "engineering",
    title: "180+ Master Guild Artisans",
    text: "Multi-generational leatherwrights specialized in Goodyear welt lasting, saddlery awl hand-stitching, French beveling, and anatomical equestrian drafting.",
    footnote: "Zero Casual Outwork",
  },
  {
    icon: "verified_user",
    title: "SEDEX SMETA & ISO 9001",
    text: "4-Pillar SMETA audited working conditions, ethical wages, environmental water recycling, and ISO 9001:2015 audited inspection gates on every lot.",
    footnote: "REACH Chemical Compliant",
  },
  {
    icon: "flight",
    title: "Export Corridors",
    text: "Direct Air Freight via Islamabad Int'l Airport (ISB) to Heathrow (LHR), Frankfurt (FRA), and JFK. Ocean cargo via Port Qasim & Karachi to Tilbury & Rotterdam.",
    footnote: "DDP Customs Pre-Cleared",
  },
];

const PROVENANCE = [
  {
    eyebrow: "Raw Material Integrity",
    title: "60-Day Mimosa Immersion",
    text: "Full-grain bovine and equine hides steeped in mimosa, quebracho, and chestnut barks. 100% free of synthetic chromium salts, guaranteeing an earthy bouquet that darkens gracefully over decades.",
    footnote: "REACH Annex XVII Certified",
    image: `${IMG}AB6AXuADAfE0EL_wrWp2lfY0MurvOwRrwwRyETC-gq6w_mH1MVwQJHO5KaiAEEuPZ2rvctzHfp4VgtI-lepTYYKtAPgWxkjvDrDYEwFqkwb2P2kQhzwB8TTniRQXzdGvqtyF-9NIBaespU9t03flNUzdnmUAdZQ9bKWIEo-N_T_l7K5bmEySNBhHF-7n310ixko89QRkY1ZEET4BUmtKB4UKwoS33sdDqOPGv1RRe6Mh6n1K-yaEv6Rtaq2h`,
    alt: "Open-air vegetable tanning vats filled with chestnut and mimosa tannins",
  },
  {
    eyebrow: "Bench Standards",
    title: "Indestructible Saddle Stitch",
    text: "Every harness tension yoke and boot welt is hand-perforated with traditional diamond awls and lock-stitched using twin needles and waxed Irish linen thread. Unbreakable under shear stress.",
    footnote: "10-Year Contract Warranty",
    image: `${IMG}AB6AXuAWU2Bk-NbGiVBXW0-Dw9Nka-Og9TKSYCwDFQupFWedbAAM7ZKKOfjAzE8TxfhxV5A4lvvTrmEHlOS-FN2xzapz8NMSkn78LhQvPKhgjolfV8GLwqxfPgWcep8xTPrc60zDUtx5jZKLf6UJfX8SY13aZhI8ncKo49Y3rF4PliWzkBHGfz_nwhLodxm5cZmd7O9xa74d5_uOwkgITYg9X-AOMougV_9Ipgxmx-9py_0j91PVVyY0YEpK`,
    alt: "Two-needle hand saddle stitching with waxed linen thread on saddle brown leather",
  },
  {
    eyebrow: "Foundry Metallurgy",
    title: "Virgin Sand-Cast Brass",
    text: "D-rings, roller buckles, and trigger snaps poured on-site in Islamabad using virgin brass ingot. Zero toxic lead leaching; mechanical pull rated up to 450 kilograms without deformation.",
    footnote: "Custom Logo Castings Available",
    image: `${IMG}AB6AXuBqEboT7u1wVD02K1gporw9B1xu4ZhqPweWezoYPvYcScHTGaug0ENznwzbxgCFdnofObPqYeHrzNxOxvyK9MqcgELlPRW5nnUGIw8uL_oMGxMsKqy0JUK-lfsb077gBqta3PhyxrRZsFdQQVPA8cR9V12i_HBG-rl6YAGcC3y-K6BjEU_-AzZmgWqvvBrkmE4u3LuiORiUgDEoEnlE_GLAeAWDvYWgr1-kHUFrH1bI3jLpfV-w3EF5`,
    alt: "Foundry craftsman pouring molten brass into sand casting molds",
  },
];

const CONTAINER = "max-w-360 mx-auto px-margin md:px-12";
const EYEBROW = "text-xs font-semibold tracking-eyebrow uppercase text-accent-saddle block";

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      <div className="w-full bg-primary border-b border-gold/40 sticky top-28 z-30 shadow-md">
        <div className={`${CONTAINER} py-2.5 flex flex-col md:flex-row items-center justify-between gap-3`}>
          <div className="flex items-center gap-2.5">
            <Icon name="factory" className="text-[16px] text-secondary-container" />
            <span className="text-[10px] tracking-eyebrow uppercase font-semibold text-secondary-container">
              Contract Atelier &amp; Global Export Desk
            </span>
            <span className="hidden lg:inline-block text-[10px] text-surface-dim/70 font-light border-l border-outline-variant/30 pl-2.5">
              Islamabad Industrial Estate (I-9/2) • Direct Ocean &amp; Air Logistics
            </span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {QUICK_LINKS.map((l) => (
              <a
                key={l.href}
                className="text-[10px] uppercase tracking-wider px-2.5 py-1 rounded bg-primary-container hover:bg-secondary/40 text-surface-dim/90 border border-outline-variant/30 transition-colors font-medium"
                href={l.href}
              >
                {l.label}
              </a>
            ))}
            <a
              className="text-[10px] uppercase tracking-wider px-2.5 py-1 rounded bg-secondary-container text-primary font-bold shadow-xs flex items-center gap-1"
              href="#rfq-portal"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              Submit B2B Spec
            </a>
          </div>
        </div>
      </div>

      <section className="relative min-h-[88vh] flex items-center justify-center overflow-hidden bg-primary text-surface">
        <div
          className="absolute inset-0 bg-cover bg-center"
          role="img"
          aria-label="Master leather craftsman cutting full-grain vegetable tanned hides under warm bench light with brass tools and saddle stitch awls"
          style={{ backgroundImage: `url('${HERO_IMG}')` }}
        />
        <div className="absolute inset-0 bg-linear-to-t from-primary via-primary/75 to-primary/45" />
        <div className="absolute inset-0 bg-linear-to-r from-primary/90 via-primary/65 to-transparent" />
        <div className={`relative z-10 ${CONTAINER} w-full py-24 md:py-32`}>
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-primary-container/90 border border-secondary-container/60 px-3 py-1 rounded-full text-[10px] uppercase tracking-wider text-secondary-container font-semibold mb-4 backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary-container" />
              Islamabad Atelier &amp; Manufacture • OEM &amp; Private Label Specifications
            </div>
            <h1 className="font-headline text-4xl sm:text-6xl lg:text-7xl font-normal leading-[1.08] tracking-tight text-surface-bright mb-6">
              Bespoke Leather <br />
              <span className="italic font-normal text-secondary-container">Manufacturing</span> at Industrial Scale.
            </h1>
            <p className="text-base sm:text-lg text-surface-container-high/90 max-w-2xl font-light leading-relaxed mb-4">
              Contract leatherwrights and master craftsmen producing hand-welted footwear, anatomical canine harnesses,
              equestrian tack, and heirloom outerwear for luxury brands, clubs, and private labels globally.
            </p>
            <p className="text-xs sm:text-sm text-surface-container-high/70 max-w-xl font-light leading-relaxed mb-8">
              Crafted in our compliant Islamabad facility combining British bench-saddle traditions with ISO-certified
              mass-production capabilities.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <a
                className="inline-flex items-center justify-center bg-secondary-container text-primary hover:bg-secondary-fixed-dim transition-all duration-200 active:scale-95 text-xs font-semibold tracking-eyebrow uppercase px-8 py-4 rounded-sm shadow-xl"
                href="#rfq-portal"
              >
                Submit B2B RFQ Specification
              </a>
              <a
                className="inline-flex items-center justify-center border border-surface/40 text-surface hover:bg-surface/10 hover:border-surface transition-all duration-200 active:scale-95 text-xs font-semibold tracking-eyebrow uppercase px-8 py-4 rounded-sm"
                href="#catalog-section"
              >
                Explore Manufacturing Catalog &amp; MOQs
              </a>
            </div>
            <div className="mt-14 pt-6 border-t border-surface/15 grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-medium text-surface/85 tracking-wider uppercase">
              {TRUST.map(([icon, label]) => (
                <div key={label} className="flex items-center gap-2">
                  <Icon name={icon} className="text-[18px] text-secondary-container" />
                  <span className="text-[11px]">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="factory-credentials" className="border-y border-outline-variant/30 bg-surface-container-high/80 py-16 w-full scroll-mt-40">
        <div className={CONTAINER}>
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-[11px] font-semibold tracking-eyebrow uppercase text-accent-saddle block mb-1">
                Infrastructure &amp; Audit Traceability
              </span>
              <h2 className="font-headline text-2xl sm:text-3xl text-on-surface">
                Factory Credentials • Sector I-9 Industrial Area
              </h2>
            </div>
            <span className="text-xs text-on-surface-variant font-medium bg-surface px-3 py-1.5 rounded border border-outline-variant/30">
              Islamabad Chamber of Commerce Reg. #ICC-4491-L
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CREDENTIALS.map((c) => (
              <div
                key={c.title}
                className="bg-surface-container-lowest p-6 rounded-lg border border-outline-variant/30 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-accent-saddle mb-4 border border-outline-variant/30">
                    <Icon name={c.icon} className="text-[22px]" />
                  </div>
                  <h3 className="font-headline text-lg text-on-surface mb-1">{c.title}</h3>
                  <p className="text-xs text-on-surface-variant font-light leading-relaxed">{c.text}</p>
                </div>
                <span className="text-[10px] uppercase font-semibold text-secondary mt-4 pt-3 border-t border-outline-variant/20 block">
                  {c.footnote}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="catalog-section" className={`${CONTAINER} py-20 md:py-28 w-full scroll-mt-40`}>
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <span className={`${EYEBROW} mb-2`}>OEM / ODM Contract Program</span>
            <h2 className="font-headline text-3xl sm:text-4xl text-on-surface font-normal">
              Contract Manufacturing Program &amp; Article Catalog
            </h2>
            <p className="text-on-surface-variant font-light text-sm sm:text-base mt-2 leading-relaxed">
              Order in flexible volume tiers with custom branding, proprietary brand embossed brass stamps, bespoke lasting,
              and laboratory-verified tensile strength.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-on-surface-variant">Filter Focus:</span>
            <span className="text-xs font-semibold bg-surface-container-high px-3 py-1 rounded text-primary">
              All {CONTRACT_ARTICLES.length} Active Contract Lines
            </span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {CONTRACT_ARTICLES.map((a) => (
            <article
              key={a.code}
              className="group bg-surface-container-lowest border border-outline-variant/30 rounded-lg overflow-hidden flex flex-col justify-between hover:shadow-lg transition-all"
            >
              <div>
                <div className="relative aspect-4/3 bg-surface-container-low overflow-hidden">
                  <img
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    alt={a.imageAlt}
                    src={a.image}
                  />
                  <div className="absolute top-3 left-3 bg-primary text-surface text-[10px] tracking-eyebrow font-semibold uppercase px-2.5 py-1 rounded-sm border border-secondary-container/40">
                    Art # {a.code}
                  </div>
                  <div className="absolute bottom-3 right-3 bg-surface/95 backdrop-blur-md px-2.5 py-1 rounded text-[11px] font-bold text-primary border border-outline-variant/30">
                    MOQ: {a.moq} {a.unit}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="font-headline text-xl text-on-surface">{a.name}</h3>
                    <span className="text-[10px] font-semibold text-secondary uppercase bg-surface-container px-2 py-0.5 rounded shrink-0 mt-1">
                      {a.division}
                    </span>
                  </div>
                  <p className="text-xs text-on-surface-variant font-light leading-relaxed mb-4">{a.description}</p>
                  <dl className="space-y-1.5 text-[11px] text-on-surface-variant bg-surface-container-low p-3 rounded border border-outline-variant/20">
                    {a.specs.map(([label, value]) => (
                      <div key={label} className="flex justify-between gap-3">
                        <dt>{label}:</dt>
                        <dd className="font-bold text-on-surface text-right">{value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
              <ArticleActions article={a} />
            </article>
          ))}
        </div>
      </section>

      <section id="rfq-portal" className="bg-surface-container-high/60 border-y border-outline-variant/30 py-24 w-full scroll-mt-40">
        <div className={CONTAINER}>
          <RfqPortal />
        </div>
      </section>

      <section id="production-tracker" className={`${CONTAINER} py-24 w-full scroll-mt-40`}>
        <div className="mb-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-surface-container-high border border-secondary/30 px-3 py-1 rounded-full text-[10px] uppercase tracking-wider text-secondary font-semibold mb-2">
            <Icon name="timeline" className="text-[13px] text-secondary" />
            Live Industrial Ledger &amp; Progress Portal
          </div>
          <span className={`${EYEBROW} mb-1`}>Contract Milestone Transparency</span>
          <h2 className="font-headline text-3xl sm:text-4xl text-on-surface font-normal">
            Track Batch Production &amp; Export Dispatch
          </h2>
          <p className="text-on-surface-variant text-sm font-light mt-2 leading-relaxed">
            Commercial patrons receive verified digital stage sign-offs as raw hides transition across cutting,
            bench-stitching, inspection, and air cargo handover.
          </p>
        </div>
        <BatchTracker />
      </section>

      <section id="provenance" className="bg-surface-container-low py-20 md:py-28 w-full border-t border-outline-variant/20 scroll-mt-40">
        <div className={CONTAINER}>
          <div className="max-w-2xl mb-12">
            <span className={`${EYEBROW} mb-2`}>Sustainable &amp; Traceable Sourcing</span>
            <h2 className="font-headline text-3xl sm:text-4xl text-on-surface font-normal">
              Purity of Grain &amp; Chemical Responsibility
            </h2>
            <p className="text-on-surface-variant text-sm font-light mt-2 leading-relaxed">
              We maintain zero-chromium chemical processes. All raw materials are fully traced back to agricultural
              byproducts, conditioned exclusively with plant barks and organic beeswax.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PROVENANCE.map((p) => (
              <div
                key={p.title}
                className="bg-surface-container-lowest border border-outline-variant/25 rounded-lg overflow-hidden p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="aspect-16/10 bg-surface-container rounded overflow-hidden mb-4">
                    <img className="w-full h-full object-cover" alt={p.alt} src={p.image} />
                  </div>
                  <span className="text-[10px] font-semibold uppercase tracking-eyebrow text-secondary block mb-1">
                    {p.eyebrow}
                  </span>
                  <h3 className="font-headline text-lg text-on-surface mb-2">{p.title}</h3>
                  <p className="text-xs text-on-surface-variant font-light leading-relaxed">{p.text}</p>
                </div>
                <span className="text-[10px] tracking-eyebrow uppercase font-semibold text-on-surface-variant/80 mt-4 pt-3 border-t border-outline-variant/20 block">
                  {p.footnote}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={`${CONTAINER} py-16 w-full`}>
        <div className="bg-primary text-surface rounded-lg p-8 md:p-12 shadow-xl flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl text-center lg:text-left">
            <span className="text-xs font-semibold tracking-eyebrow uppercase text-secondary-container block mb-2">
              Retail Atelier
            </span>
            <h3 className="font-headline text-2xl sm:text-3xl text-surface font-normal">Shop Finished Pieces Direct</h3>
            <p className="text-surface-container-high/85 text-sm font-light mt-2 leading-relaxed">
              Browse ready-to-ship footwear, canine harnesses, and outerwear from the same Islamabad benches.
            </p>
          </div>
          <Link
            className="inline-flex items-center justify-center bg-surface text-primary hover:bg-surface-container-lowest transition-all duration-200 active:scale-95 text-xs font-semibold tracking-eyebrow uppercase px-8 py-4 rounded-sm shadow"
            href="/shop"
          >
            Visit Retail Shop
          </Link>
        </div>
      </section>
    </div>
  );
}
