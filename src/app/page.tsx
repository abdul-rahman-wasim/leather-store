import Link from "next/link";
import { Icon, Stars } from "@/components/Icon";
import { ShippingCalculator } from "@/components/home/ShippingCalculator";
import { SizingAssistant } from "@/components/home/SizingAssistant";
import { WaitlistForm } from "@/components/home/WaitlistForm";
import { HARNESS_SLUG, IMG, LEATHER_FINISHES } from "@/lib/catalog";

const HERO_IMG = `${IMG}AB6AXuDgaIgUltyX9WIw1EsfhtDXu5vFrXYz-_Gabh0PApS-x453to42xs6gc6kublziMWbtMBaR3Gd2G5Iu3Q9uKqixA4UiEVCo8vz5on0EvF2Bd6sDfKsM0_r-bCxmuG0SYRpGFDmt-0XAcalTv_swRVRVuggjIG8HL-2w8ZP-zF4z_IuZIURJ_6vjZM1KcmLGdqcMgunsHomHf98KqqC3OWhyakPcNodB2CLwqETeyHyEDVrPgxBL6NuT`;

const PILLARS = [
  {
    title: "Hand-Welted Footwear",
    badge: "Made-To-Order Lasts",
    price: "From $390 / £310",
    image: `${IMG}AB6AXuDLnRgKa78yn3UhiBN2nC4wNczlcaa0QL-EWObgFm063tfJYalJjOYT_kqVwEu36kIjQBn4ubILeV3JrNSo0QOywvoCCmLEVZ4W1OCczKw15EHit08yZwPcG35VDwA8i7oPu1J29dNbnMNElLHq_Fi4urYT909CRGG5lbSZKi5nkcQYxLkp9ffDFO70C4HRfnXbIYLiaYGORGhaZa3rnRXDo3FMUCvGlxAU6LFsoHw0dzmZe3xIW5sP`,
    alt: "Cognac leather oxford and Chelsea boot with visible Goodyear welt stitching on an oak floor",
    text: "Derbys, Belgian Loafers, and Scottish Balmoral Boots. Channel-carved oak-bark outsoles and French calf uppers contoured to mold to your gait.",
    points: [
      "Resolable 360° Goodyear storm welt",
      "Natural cork bed for bespoke footbed impression",
      "Sizes US 7–14 / UK 6–13 (Half sizes included)",
    ],
    cta: "Explore Footwear",
    href: "/shop/shoes",
  },
  {
    title: "The Canine Collection",
    badge: "Custom Anatomical Sizing",
    price: "From $145 / £115",
    image: `${IMG}AB6AXuCjp1yyAQjqG3l7TZRzmYwTLZVEg-5SWzq3MAZY2LtilfhkF6_v6NdhreY6OQhUQJmmq2pVn10Rt1foSnqRi5VTTwVUNhUK_YBFj8Oljg__ifOY4o67Z3uZtYO-O3vcuiHlaezYek120YlrgiWduZr8-iaIqNElrWqnQ4NZL0rMrUKadZsTOPXpuV6B38Tv0m86VJcDAm1lwl4SK7zbfzyXJ2GQaLeJcc0r2U7DpN9yFE6DP6U9xxVj`,
    alt: "Sporting dog wearing a saddle cognac bridle leather harness with brass hardware in a manor library",
    text: "Ergonomic English bridle leather harness engineered to remove throat strain. Padded calfskin sternum shield and sand-cast solid English brass hardware.",
    points: [
      "Heavyweight Sedgwick English bridle leather",
      "Anatomical Y-frame for natural shoulder extension",
      "Complimentary blind deboss monogramming",
    ],
    cta: "Configure Sizing",
    href: `/products/${HARNESS_SLUG}`,
  },
  {
    title: "Bespoke Outerwear",
    badge: "100% Bespoke Custom Fit",
    featured: true,
    price: "From $890 / £720",
    image: `${IMG}AB6AXuAC1oPjK--7I65-R9WRfIsDTlBGNE7oE9uiWd2lYE_vpG-0z-kxZraDWjjIQIUV9qbfPAjNARhF86piistia2oJkI4MVqYQD2ZW8qRe4GfghwiZtMGN1-58yq1rNnP054bsHMAXbF-orQJsXXP3T1o6RvpfV00_agHVJIroTJAXxXhVBHrl94CliHJvKwSqvYoTSsdBbv08YFNHVHFd1YwiEK9O1ljyh3FdkwHNqE3hTVZJFVFff2wo`,
    alt: "Bespoke umber lambskin aviator jacket with shearling collar on a mahogany valet stand",
    text: "Full-grain Tuscan calfskin and Scottish lambskin aviator and café jackets. Individually hand-cut per patron and lined with pure natural cupro and heritage silk.",
    points: [
      "Bespoke pattern cut to your exact measurements",
      "Solid brass Swiss Riri antiqued closures",
      "Includes atelier or virtual fitting consultation",
    ],
    cta: "Commission Bespoke",
    href: "/shop/jackets",
  },
];

const UPCOMING = [
  {
    season: "Autumn Release",
    title: "The Highland Duffle",
    text: "48-hour luggage with Scottish waxed canvas.",
    image: `${IMG}AB6AXuCcbpIgSNPdJOCvwYZDKEOwc7JK_UJ6TicKbeHMX3mLn2kmCgmIx42qfmTIF5astq48hY1lvHZi1YO8U5KK96zioxDslY7pDUqSPiz1AziJ_jsmR_Ink0GxHT8Q07CztaOYw7yRV2Pbgb1_2Prnpy9wp2XO91xN7qvjHuOJUjFU8wV8CVBZeewLNb54wm6CluZllSJvZ3SnOXqbnlMHtKrczKhZCzJcYX9YuLukgIx1J6OGgG8an9vz`,
    alt: "Vegetable-tanned leather duffle bag with brass buckles against a vintage steamer trunk",
  },
  {
    season: "Winter Series",
    title: "Belts & Watch Straps",
    text: "Burnished bridle leather & 20mm horology bands.",
    image: `${IMG}AB6AXuCPqud05xo_1r-K7k8iioP2elcu4egTfFCy73_Z1Fx1SG5y71sndnhBt1RVDJTbE--ISAoV4mg1D_KmZy95gEBqwgEGsfB3x_OXKmxcMlIfgs4iAxATHrGjghnQhadmJS2GzqNJAV-DjMeKJYEWumuItM9DnkfTCmALmHpTaGYXedSXCjrNVFjVWQB2SKITSlNB2xjc8Q7R8Xgf-I7deH4HV-6iNGeM0uX783pAZfxpdt8HaL91WPLa`,
    alt: "Bridle leather watch straps and dress belts with brass buckles on a jeweler's cloth",
  },
  {
    season: "Limited Run",
    title: "Desk & Folio Suite",
    text: "Large format desk blotter & blind-embossed portfolio.",
    image: `${IMG}AB6AXuASTOa_So0vTWbv2nEPZqtHfhQIfiSv_iY0OTm2Ewx1EJ9w9vK0_9bFdjiutg5bvSM3yllT1259bNqu4LhWInMGggzr-7CobdXazc1yO2ToGuF2vhAeqgQm2sHUwFFblZY8jsvzeOmjgvvlJf_bTpxOPNjdZDGUGVO69e6yz_H_LLbHRcBsX-JD6TWxjxfgV6l66FjTIdVevKbQRg4dz5Vy7A-lrRrkzFdgXx2ENEWYsFQFHpTx967h`,
    alt: "Natural veg-tan leather desk mat and document folio with brass letter opener",
  },
];

const STORIES = [
  {
    place: "Santa Croce Sull’Arno",
    title: "Traditional Vegetable Tanning",
    text: "Hides steeped in mimosa and chestnut barks within centuries-old vats. Zero synthetic chromium salts, guaranteeing an earthy bouquet and golden patina over time.",
    footnote: "60 Days Natural Immersion",
    image: `${IMG}AB6AXuADAfE0EL_wrWp2lfY0MurvOwRrwwRyETC-gq6w_mH1MVwQJHO5KaiAEEuPZ2rvctzHfp4VgtI-lepTYYKtAPgWxkjvDrDYEwFqkwb2P2kQhzwB8TTniRQXzdGvqtyF-9NIBaespU9t03flNUzdnmUAdZQ9bKWIEo-N_T_l7K5bmEySNBhHF-7n310ixko89QRkY1ZEET4BUmtKB4UKwoS33sdDqOPGv1RRe6Mh6n1K-yaEv6Rtaq2h`,
    alt: "Open-air Tuscan tanning vats filled with chestnut and mimosa tannins in morning sun",
  },
  {
    place: "Edinburgh & Mayfair",
    title: "Two-Needle Saddle Stitch",
    text: "Every critical tension seam on harnesses, footwear, and sleeves is sewn completely by hand with beeswaxed linen thread. It will never unravel if a single strand is cut.",
    footnote: "Bespoke Craftsmanship Guarantee",
    image: `${IMG}AB6AXuAWU2Bk-NbGiVBXW0-Dw9Nka-Og9TKSYCwDFQupFWedbAAM7ZKKOfjAzE8TxfhxV5A4lvvTrmEHlOS-FN2xzapz8NMSkn78LhQvPKhgjolfV8GLwqxfPgWcep8xTPrc60zDUtx5jZKLf6UJfX8SY13aZhI8ncKo49Y3rF4PliWzkBHGfz_nwhLodxm5cZmd7O9xa74d5_uOwkgITYg9X-AOMougV_9Ipgxmx-9py_0j91PVVyY0YEpK`,
    alt: "Two-needle hand saddle stitching with waxed linen thread on saddle brown leather",
  },
  {
    place: "Walsall Foundry, UK",
    title: "Sand-Cast Solid Brass",
    text: "Buckles and hardware poured from molten brass at Britain's heritage foundry. Rated to withstand over 450 kg of mechanical pull without bending or wearing through.",
    footnote: "450 KG Tested Load Rating",
    image: `${IMG}AB6AXuBqEboT7u1wVD02K1gporw9B1xu4ZhqPweWezoYPvYcScHTGaug0ENznwzbxgCFdnofObPqYeHrzNxOxvyK9MqcgELlPRW5nnUGIw8uL_oMGxMsKqy0JUK-lfsb077gBqta3PhyxrRZsFdQQVPA8cR9V12i_HBG-rl6YAGcC3y-K6BjEU_-AzZmgWqvvBrkmE4u3LuiORiUgDEoEnlE_GLAeAWDvYWgr1-kHUFrH1bI3jLpfV-w3EF5`,
    alt: "Foundry craftsman pouring molten brass into sand casting molds for harness buckles",
  },
];

const REVIEWS = [
  {
    quote: "“The harness transformed our Highland hill walks.”",
    body: "“My Gordon Setter would pull relentlessly until we switched to the chest-plate harness. The leather has developed the richest dark mahogany glow from Scottish mist and rain.”",
    name: "Hamish MacIntyre",
    meta: "Custom Highlands Harness • Edinburgh",
    commission: "Bespoke Commission #082",
    item: { icon: "pets", label: "Item: Highland Bridle Harness • Cognac • Size L" },
  },
  {
    quote: "“Equal to the finest houses of Mayfair.”",
    body: "“I ordered the bespoke aviator jacket in cognac Tuscan lambskin. Delivered via hand courier to Chelsea in under 24 hours from final inspection. The drape and Riri zippers are utterly peerless.”",
    name: "Alastair Finch-Hatton",
    meta: "Bespoke Aviator Jacket • Mayfair",
    commission: "Bespoke Commission #114",
    item: { icon: "checkroom", label: "Item: Bespoke Lambskin Aviator • Hand Courier" },
  },
  {
    quote: "“New York to London seamlessly delivered.”",
    body: "“The Balmoral Boots landed in Manhattan just three days after dispatch with all US duties cleared. The cork insole conformed to my foot within a weekend. The most solid boot in my wardrobe.”",
    name: "Eleanor Vance",
    meta: "Made-to-Measure Balmoral Boots • Manhattan",
    commission: "Bespoke Commission #059",
    item: { icon: "flight_land", label: "Item: Balmoral Boots US 8.5 • DDP Manhattan" },
  },
];

const CONTAINER = "max-w-360 mx-auto px-margin md:px-12";
const EYEBROW = "text-xs font-semibold tracking-eyebrow uppercase text-secondary block";
const LIGHT_BUTTON =
  "inline-flex items-center justify-center bg-surface text-primary hover:bg-surface-container-lowest transition-all duration-200 active:scale-95 active:translate-y-0.5 text-xs font-semibold tracking-eyebrow uppercase px-8 py-4 rounded-sm";
const GHOST_BUTTON =
  "inline-flex items-center justify-center border border-surface/40 text-surface hover:bg-surface/10 hover:border-surface transition-all duration-200 active:scale-95 active:translate-y-0.5 text-xs font-semibold tracking-eyebrow uppercase px-8 py-4 rounded-sm";

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      <section className="relative min-h-[88vh] flex items-center justify-center overflow-hidden bg-primary text-surface">
        <div
          className="absolute inset-0 bg-cover bg-center"
          role="img"
          aria-label="Master craftsman hands working on saddle cognac full-grain hide in a historic British leather atelier"
          style={{ backgroundImage: `url('${HERO_IMG}')` }}
        />
        <div className="absolute inset-0 bg-linear-to-t from-primary via-primary/65 to-primary/30" />
        <div className="absolute inset-0 bg-linear-to-r from-primary/80 via-primary/50 to-transparent" />
        <div className={`relative z-10 ${CONTAINER} w-full py-28 md:py-36`}>
          <div className="max-w-3xl">
            <p className="text-xs font-semibold tracking-eyebrow uppercase text-surface/80 mb-6 flex items-center gap-2">
              <span className="inline-block w-4 h-px bg-secondary-container" />
              Savile Row &amp; Edinburgh • Bespoke British Leathercraft • Made to Measure
            </p>
            <h1 className="font-headline text-5xl sm:text-6xl lg:text-7xl font-normal leading-[1.08] tracking-tight text-surface-bright mb-8">
              The Art of <br />
              <span className="italic font-normal text-secondary-container">Handcrafted</span> Grain.
            </h1>
            <p className="text-base sm:text-lg text-surface-container-high/90 max-w-xl font-light leading-relaxed mb-4">
              Bespoke &amp; Made-To-Order: Each piece is custom cut, hand-stitched, and anatomically drafted to individual
              patron specifications — unhurried, enduring, and never off-the-rack.
            </p>
            <p className="text-xs sm:text-sm text-surface-container-high/70 max-w-xl font-light leading-relaxed mb-10">
              Full-grain vegetable-tanned leather footwear, bespoke outerwear, and luxury canine harnesses. Hand-stitched
              with unhurried devotion to endure generations.
            </p>
            <div className="flex flex-wrap items-center gap-5">
              <Link className={`${LIGHT_BUTTON} shadow-xl`} href="/shop">
                Explore Atelier Collection
              </Link>
              <Link className={GHOST_BUTTON} href="/shop/jackets">
                Discover Custom Made-To-Order
              </Link>
            </div>
            <div className="mt-16 pt-8 border-t border-surface/15 flex flex-wrap items-center gap-8 md:gap-12 text-xs font-medium text-surface/75 tracking-wider uppercase">
              {[
                ["verified", "Artisan Bench Handcrafted"],
                ["local_shipping", "Free Tracked Delivery: US, UK & Scotland"],
                ["published_with_changes", "30-Day Bespoke Exchanges"],
              ].map(([icon, label]) => (
                <div key={label} className="flex items-center gap-2">
                  <Icon name={icon} className="text-[16px] text-secondary-container" />
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className={`${CONTAINER} py-24 md:py-32 w-full`}>
        <div className="max-w-2xl mb-16 md:mb-20">
          <span className={`${EYEBROW} mb-3`}>Permanent Collection</span>
          <h2 className="font-headline text-3xl sm:text-4xl lg:text-5xl font-normal text-on-surface leading-tight">
            The Three Pillars of Velluto &amp; Hide
          </h2>
          <p className="text-on-surface-variant font-light text-base sm:text-lg mt-4 leading-relaxed">
            Each silhouette represents hundreds of hours of ergonomic fit prototyping and meticulous single-batch
            vegetable hide cutting.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-10">
          {PILLARS.map((p) => (
            <article
              key={p.title}
              className="group bg-surface-container-lowest border border-outline-variant/30 rounded-lg overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-4/5 overflow-hidden bg-surface-container-low">
                  <img
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    alt={p.alt}
                    src={p.image}
                  />
                  <div
                    className={`absolute top-4 left-4 text-surface text-[10px] tracking-eyebrow font-semibold uppercase px-3 py-1 rounded-sm backdrop-blur-md border ${
                      p.featured ? "bg-secondary border-secondary-container/50 shadow-sm" : "bg-primary/90 border-gold/40"
                    }`}
                  >
                    {p.badge}
                  </div>
                  <div className="absolute bottom-4 right-4 bg-surface/90 backdrop-blur-md px-3.5 py-1.5 rounded-sm border border-outline-variant/20 shadow-sm">
                    <span className="text-xs font-semibold text-primary tracking-wider">{p.price}</span>
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="font-headline text-2xl text-on-surface group-hover:text-secondary transition-colors mb-2">
                    {p.title}
                  </h3>
                  <p className="text-on-surface-variant text-sm font-light leading-relaxed mb-4">{p.text}</p>
                  <div className="flex flex-wrap items-center gap-2 mb-4">
                    <span className="text-[10px] uppercase font-semibold text-secondary tracking-wider">Finishes:</span>
                    <div className="flex items-center gap-1.5">
                      {LEATHER_FINISHES.map((f) => (
                        <span
                          key={f.name}
                          className="w-3.5 h-3.5 rounded-full border border-outline-variant/40"
                          style={{ backgroundColor: f.hex }}
                          title={f.name}
                        />
                      ))}
                    </div>
                    <span className="text-[10px] text-on-surface-variant font-light">
                      ({LEATHER_FINISHES.map((f) => f.short).join(", ")})
                    </span>
                  </div>
                  <ul className="space-y-2.5 text-xs text-on-surface-variant font-medium pt-2 border-t border-outline-variant/20">
                    {p.points.map((pt) => (
                      <li key={pt} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 shrink-0 rounded-full bg-secondary" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="px-8 pb-8">
                <Link
                  className="w-full inline-flex items-center justify-between border-t border-outline-variant/30 pt-4 text-xs font-semibold tracking-eyebrow uppercase text-on-surface group-hover:text-secondary transition-colors"
                  href={p.href}
                >
                  <span>{p.cta}</span>
                  <Icon name="arrow_forward" className="text-[18px] transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section
        id="shipping"
        className="border-y border-outline-variant/60 bg-surface-container-high/90 py-24 w-full shadow-inner scroll-mt-28"
      >
        <div className={CONTAINER}>
          <div className="mb-12 max-w-2xl">
            <span className={`${EYEBROW} mb-2`}>Atelier Dispatch &amp; Tailoring Utilities</span>
            <h3 className="font-headline text-3xl text-on-surface font-normal">Shipping Calculator &amp; Sizing Assistant</h3>
            <p className="text-on-surface-variant text-sm font-light mt-2 leading-relaxed">
              Calculate guaranteed duty-precleared transit times and review anatomical measurement benchmarks before
              commissioning your piece.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <ShippingCalculator />
            <SizingAssistant />
          </div>
        </div>
      </section>

      <section className={`${CONTAINER} py-24 md:py-32 w-full`}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-7">
            <div className="mb-12">
              <span className={`${EYEBROW} mb-2`}>Batch No. 04 In Development</span>
              <h2 className="font-headline text-3xl sm:text-4xl text-on-surface font-normal">
                More Handcrafted Goods Coming Soon
              </h2>
              <p className="text-on-surface-variant text-sm font-light mt-3 leading-relaxed max-w-xl">
                Strictly limited runs of fifty numbered pieces per silhouette. Currently finishing tanning in our Tuscan
                immersion vats.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {UPCOMING.map((u) => (
                <div key={u.title} className="group">
                  <div className="aspect-square bg-surface-container-low rounded overflow-hidden mb-4 border border-outline-variant/20">
                    <img
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      alt={u.alt}
                      src={u.image}
                    />
                  </div>
                  <span className="text-[10px] font-semibold uppercase tracking-eyebrow text-secondary block">{u.season}</span>
                  <h4 className="font-headline text-lg text-on-surface mt-1 group-hover:text-secondary transition-colors">
                    {u.title}
                  </h4>
                  <p className="text-on-surface-variant text-xs font-light mt-1">{u.text}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-5 bg-surface-container-lowest p-8 sm:p-10 rounded-lg border border-outline-variant/30 shadow-sm">
            <span className={`${EYEBROW} mb-2`}>Private Patron Registry</span>
            <h3 className="font-headline text-2xl sm:text-3xl text-on-surface mb-3">Reserve Priority Access</h3>
            <p className="text-on-surface-variant text-sm font-light leading-relaxed mb-8">
              Batch releases often allocate completely prior to general release. Patrons enjoy 24-hour advance access and
              private fitting invites.
            </p>
            <WaitlistForm />
            <p className="text-[11px] text-on-surface-variant/75 text-center mt-6 tracking-wide">
              Next Hide Dispatch: October 14 • 50 Units per Silhouette
            </p>
          </div>
        </div>
      </section>

      <section
        id="craftsmanship"
        className="bg-surface-container-low py-24 md:py-32 w-full border-t border-outline-variant/20 scroll-mt-28"
      >
        <div className={CONTAINER}>
          <div className="max-w-2xl mb-16">
            <span className={`${EYEBROW} mb-2`}>Uncompromising Traceability</span>
            <h2 className="font-headline text-3xl sm:text-4xl text-on-surface font-normal">The Heritage of Our Materials</h2>
            <p className="text-on-surface-variant text-base sm:text-lg font-light mt-3 leading-relaxed">
              True luxury is a slow, reverent dialogue between historical methods and raw nature.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            {STORIES.map((s) => (
              <div
                key={s.title}
                className="group bg-surface-container-lowest border border-outline-variant/25 rounded-lg overflow-hidden p-6 md:p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div>
                  <div className="aspect-16/10 bg-surface-container rounded overflow-hidden mb-6">
                    <img
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      alt={s.alt}
                      src={s.image}
                    />
                  </div>
                  <span className="text-[11px] font-semibold uppercase tracking-eyebrow text-secondary block mb-1">
                    {s.place}
                  </span>
                  <h3 className="font-headline text-xl text-on-surface mb-2">{s.title}</h3>
                  <p className="text-xs sm:text-sm text-on-surface-variant font-light leading-relaxed">{s.text}</p>
                </div>
                <div className="mt-6 pt-4 border-t border-outline-variant/20">
                  <span className="text-[10px] tracking-eyebrow uppercase font-semibold text-on-surface-variant/80">
                    {s.footnote}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={`${CONTAINER} py-24 md:py-32 w-full`}>
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className={`${EYEBROW} mb-2`}>Verified Reviews</span>
            <h2 className="font-headline text-3xl sm:text-4xl text-on-surface font-normal">Voices From Our Global Patrons</h2>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-headline text-2xl text-on-surface">4.96 / 5.00</span>
            <Stars size={18} />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {REVIEWS.map((r) => (
            <div
              key={r.name}
              className="relative p-8 bg-surface-container-lowest rounded-lg border border-outline-variant/30 flex flex-col justify-between hover:shadow-lg transition-all duration-300"
            >
              <div className="absolute -top-3 right-6 bg-primary text-secondary-container text-[9.5px] tracking-wider uppercase font-semibold px-3 py-0.5 rounded-full border border-gold/40 shadow-xs flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary-container" />
                <span>{r.commission}</span>
              </div>
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <Stars />
                  <span className="text-[9px] uppercase tracking-wider font-semibold text-secondary bg-surface-container px-2.5 py-0.5 rounded border border-outline-variant">
                    Verified Patron
                  </span>
                </div>
                <p className="font-headline text-lg text-on-surface mb-3">{r.quote}</p>
                <p className="text-xs sm:text-sm text-on-surface-variant font-light italic leading-relaxed mb-6">{r.body}</p>
                <div className="flex items-center gap-2 mb-4 bg-surface-container-low px-3 py-2 rounded border border-outline-variant/20 text-[11px] text-on-surface-variant font-light">
                  <Icon name={r.item.icon} className="text-[15px] text-secondary" />
                  <span>{r.item.label}</span>
                </div>
              </div>
              <div className="pt-4 border-t border-outline-variant/20 flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-on-surface">{r.name}</p>
                  <p className="text-[10px] text-on-surface-variant uppercase tracking-wider">{r.meta}</p>
                </div>
                <Icon name="verified" className="text-[18px] text-secondary" />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="appointments" className={`${CONTAINER} pb-24 md:pb-32 w-full scroll-mt-32`}>
        <div className="bg-primary text-surface rounded-lg p-10 md:p-14 shadow-xl flex flex-col lg:flex-row items-center justify-between gap-10">
          <div className="max-w-2xl text-center lg:text-left">
            <span className="text-xs font-semibold tracking-eyebrow uppercase text-secondary-container block mb-2">
              Private Atelier Appointments
            </span>
            <h3 className="font-headline text-3xl sm:text-4xl text-surface font-normal">
              Reserve a Bespoke Measurement Fitting
            </h3>
            <p className="text-surface-container-high/85 text-sm sm:text-base font-light mt-3 leading-relaxed">
              Meet with our head leather tailor in Mayfair or Edinburgh for bespoke footwear measurements and custom
              outerwear pattern drafting.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a className={`${LIGHT_BUTTON} shadow`} href="tel:+441315550198">
              Book Atelier Session
            </a>
            <Link className={GHOST_BUTTON} href="/#craftsmanship">
              Learn Our Craft
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
