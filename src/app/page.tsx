import Link from "next/link";
import { Icon, Stars } from "@/components/Icon";
import { WaitlistForm } from "@/components/home/WaitlistForm";
import { IMG } from "@/lib/catalog";

const HERO_IMG = `${IMG}AB6AXuDgaIgUltyX9WIw1EsfhtDXu5vFrXYz-_Gabh0PApS-x453to42xs6gc6kublziMWbtMBaR3Gd2G5Iu3Q9uKqixA4UiEVCo8vz5on0EvF2Bd6sDfKsM0_r-bCxmuG0SYRpGFDmt-0XAcalTv_swRVRVuggjIG8HL-2w8ZP-zF4z_IuZIURJ_6vjZM1KcmLGdqcMgunsHomHf98KqqC3OWhyakPcNodB2CLwqETeyHyEDVrPgxBL6NuT`;

const PILLARS = [
  {
    title: "Hand-Welted Footwear",
    badge: "Goodyear Welted",
    badgeClass: "bg-surface/90 backdrop-blur-sm text-on-surface",
    price: "From $390 • £310",
    image: `${IMG}AB6AXuDLnRgKa78yn3UhiBN2nC4wNczlcaa0QL-EWObgFm063tfJYalJjOYT_kqVwEu36kIjQBn4ubILeV3JrNSo0QOywvoCCmLEVZ4W1OCczKw15EHit08yZwPcG35VDwA8i7oPu1J29dNbnMNElLHq_Fi4urYT909CRGG5lbSZKi5nkcQYxLkp9ffDFO70C4HRfnXbIYLiaYGORGhaZa3rnRXDo3FMUCvGlxAU6LFsoHw0dzmZe3xIW5sP`,
    alt: "Cognac leather oxford and Chelsea boot with visible Goodyear welt stitching on an oak floor",
    text: "Derbys, Belgian Loafers, and Scottish Balmoral Boots. Channel-carved oak-bark tanned leather outsoles and vegetable-tanned French calf uppers that mould to your arch.",
    points: [
      "Resolable 360° storm-welt construction",
      "Cork bed filling for custom foot impression",
      "Sizes US 7–14 / UK 6–13 (Half sizes included)",
    ],
    cta: "Explore Footwear",
    href: "/shop/shoes",
  },
  {
    title: "The Canine Collection",
    badge: "Flagship Creation",
    badgeClass: "bg-tertiary-container text-on-tertiary font-semibold",
    price: "From $145 • £115",
    image: `${IMG}AB6AXuCjp1yyAQjqG3l7TZRzmYwTLZVEg-5SWzq3MAZY2LtilfhkF6_v6NdhreY6OQhUQJmmq2pVn10Rt1foSnqRi5VTTwVUNhUK_YBFj8Oljg__ifOY4o67Z3uZtYO-O3vcuiHlaezYek120YlrgiWduZr8-iaIqNElrWqnQ4NZL0rMrUKadZsTOPXpuV6B38Tv0m86VJcDAm1lwl4SK7zbfzyXJ2GQaLeJcc0r2U7DpN9yFE6DP6U9xxVj`,
    alt: "Sporting dog wearing a saddle cognac bridle leather harness with brass hardware in a manor library",
    text: "Ergonomic full-grain bridle leather harness engineered to alleviate neck strain. Padded calfskin sternum shield, sand-cast solid English brass hardware, and personalized tag ring.",
    points: [
      "Heavyweight Sedgwick English bridle leather",
      "Anatomical Y-frame for unrestricted shoulder movement",
      "Complimentary blind deboss pet monogramming",
    ],
    cta: "Explore Canine Gear",
    href: "/shop/canine",
  },
  {
    title: "Bespoke Leather Outerwear",
    badge: "Made-to-Order",
    badgeClass: "bg-surface/90 backdrop-blur-sm text-on-surface",
    price: "From $890 • £720",
    image: `${IMG}AB6AXuAC1oPjK--7I65-R9WRfIsDTlBGNE7oE9uiWd2lYE_vpG-0z-kxZraDWjjIQIUV9qbfPAjNARhF86piistia2oJkI4MVqYQD2ZW8qRe4GfghwiZtMGN1-58yq1rNnP054bsHMAXbF-orQJsXXP3T1o6RvpfV00_agHVJIroTJAXxXhVBHrl94CliHJvKwSqvYoTSsdBbv08YFNHVHFd1YwiEK9O1ljyh3FdkwHNqE3hTVZJFVFff2wo`,
    alt: "Bespoke umber lambskin aviator jacket with shearling collar on a mahogany valet stand",
    text: "Full-grain Tuscan calfskin and Scottish lambskin aviator, café racer, and safari jackets. Individually hand-cut per order and lined with natural cupro and heritage tartan silk.",
    points: [
      "Custom pattern drafted to your exact measurements",
      "Solid brass Swiss Riri or Excella closures",
      "Includes 1-on-1 virtual or atelier fitting review",
    ],
    cta: "Commission Outerwear",
    href: "/shop/jackets",
  },
];

const HUBS = [
  {
    region: "United Kingdom",
    icon: "location_on",
    title: "Next Business Day",
    carrier: "Doddle / Royal Mail Special Tracked",
    note: "Free over £100",
  },
  {
    region: "Edinburgh & Highlands",
    icon: "terrain",
    title: "1–2 Days Tracked",
    carrier: "Edinburgh Atelier Courier Pickup",
    note: "Local Atelier Pickup Avail.",
  },
  {
    region: "United States",
    icon: "public",
    title: "2–3 Days Express",
    carrier: "DHL Express • All Import Duties Paid",
    note: "Free over $200 USD",
  },
];

const UPCOMING = [
  {
    season: "Autumn Release",
    title: "The Highland Duffle",
    text: "48-hour weekender luggage with waterproof waxed canvas lining.",
    image: `${IMG}AB6AXuCcbpIgSNPdJOCvwYZDKEOwc7JK_UJ6TicKbeHMX3mLn2kmCgmIx42qfmTIF5astq48hY1lvHZi1YO8U5KK96zioxDslY7pDUqSPiz1AziJ_jsmR_Ink0GxHT8Q07CztaOYw7yRV2Pbgb1_2Prnpy9wp2XO91xN7qvjHuOJUjFU8wV8CVBZeewLNb54wm6CluZllSJvZ3SnOXqbnlMHtKrczKhZCzJcYX9YuLukgIx1J6OGgG8an9vz`,
    alt: "Vegetable-tanned leather duffle bag with brass buckles against a vintage steamer trunk",
  },
  {
    season: "Winter Series",
    title: "Belts & Watch Straps",
    text: "Hand-burnished bridle leather belts and saddle-stitched 20mm horology bands.",
    image: `${IMG}AB6AXuCPqud05xo_1r-K7k8iioP2elcu4egTfFCy73_Z1Fx1SG5y71sndnhBt1RVDJTbE--ISAoV4mg1D_KmZy95gEBqwgEGsfB3x_OXKmxcMlIfgs4iAxATHrGjghnQhadmJS2GzqNJAV-DjMeKJYEWumuItM9DnkfTCmALmHpTaGYXedSXCjrNVFjVWQB2SKITSlNB2xjc8Q7R8Xgf-I7deH4HV-6iNGeM0uX783pAZfxpdt8HaL91WPLa`,
    alt: "Bridle leather watch straps and dress belts with brass buckles on a jeweler's cloth",
  },
  {
    season: "Limited Run",
    title: "Desk & Folio Suite",
    text: "Large format desk blotter and A4 portfolio with blind-embossed ruler markings.",
    image: `${IMG}AB6AXuASTOa_So0vTWbv2nEPZqtHfhQIfiSv_iY0OTm2Ewx1EJ9w9vK0_9bFdjiutg5bvSM3yllT1259bNqu4LhWInMGggzr-7CobdXazc1yO2ToGuF2vhAeqgQm2sHUwFFblZY8jsvzeOmjgvvlJf_bTpxOPNjdZDGUGVO69e6yz_H_LLbHRcBsX-JD6TWxjxfgV6l66FjTIdVevKbQRg4dz5Vy7A-lrRrkzFdgXx2ENEWYsFQFHpTx967h`,
    alt: "Natural veg-tan leather desk mat and document folio with brass letter opener",
  },
];

const STORIES = [
  {
    icon: "eco",
    place: "Santa Croce Sull’Arno",
    title: "Tuscan Vegetable Tanning",
    text: "We exclusively commission hides treated with mimosa, quebracho, and chestnut barks in centuries-old wooden vats. Zero synthetic chromium salts touch our leathers, ensuring an earthy aroma and deep, golden-hour patina.",
    footnote: "Process: 60 Days Immersion",
    image: `${IMG}AB6AXuADAfE0EL_wrWp2lfY0MurvOwRrwwRyETC-gq6w_mH1MVwQJHO5KaiAEEuPZ2rvctzHfp4VgtI-lepTYYKtAPgWxkjvDrDYEwFqkwb2P2kQhzwB8TTniRQXzdGvqtyF-9NIBaespU9t03flNUzdnmUAdZQ9bKWIEo-N_T_l7K5bmEySNBhHF-7n310ixko89QRkY1ZEET4BUmtKB4UKwoS33sdDqOPGv1RRe6Mh6n1K-yaEv6Rtaq2h`,
    alt: "Open-air Tuscan tanning vats filled with chestnut and mimosa tannins in morning sun",
  },
  {
    icon: "handyman",
    place: "Edinburgh & Mayfair",
    title: "The Two-Needle Saddle Stitch",
    text: "Every critical load point on our canine harnesses, outerwear armholes, and shoes is stitched entirely by hand using beeswax-conditioned thread. Unlike machine lockstitching, a hand saddle stitch will never unravel even if a strand snaps.",
    footnote: "Strength: Lifetime Guarantee",
    image: `${IMG}AB6AXuAWU2Bk-NbGiVBXW0-Dw9Nka-Og9TKSYCwDFQupFWedbAAM7ZKKOfjAzE8TxfhxV5A4lvvTrmEHlOS-FN2xzapz8NMSkn78LhQvPKhgjolfV8GLwqxfPgWcep8xTPrc60zDUtx5jZKLf6UJfX8SY13aZhI8ncKo49Y3rF4PliWzkBHGfz_nwhLodxm5cZmd7O9xa74d5_uOwkgITYg9X-AOMougV_9Ipgxmx-9py_0j91PVVyY0YEpK`,
    alt: "Two-needle hand saddle stitching with waxed linen thread on saddle brown leather",
  },
  {
    icon: "local_fire_department",
    place: "Walsall Foundry, UK",
    title: "Sand-Cast Solid Brass",
    text: "No hollow zinc die-casts or brittle alloy electroplating. Our buckle frames and leash D-rings are hand poured from pure molten brass at Britain's historic harness foundry, hand-polished and rated to withstand over 450 kg of tension.",
    footnote: "Hardware: Solid Sand-Cast Brass",
    image: `${IMG}AB6AXuBqEboT7u1wVD02K1gporw9B1xu4ZhqPweWezoYPvYcScHTGaug0ENznwzbxgCFdnofObPqYeHrzNxOxvyK9MqcgELlPRW5nnUGIw8uL_oMGxMsKqy0JUK-lfsb077gBqta3PhyxrRZsFdQQVPA8cR9V12i_HBG-rl6YAGcC3y-K6BjEU_-AzZmgWqvvBrkmE4u3LuiORiUgDEoEnlE_GLAeAWDvYWgr1-kHUFrH1bI3jLpfV-w3EF5`,
    alt: "Foundry craftsman pouring molten brass into sand casting molds for harness buckles",
  },
];

const REVIEWS = [
  {
    quote: "“The harness transformed our Highland hill walks.”",
    body: "“My Gordon Setter would pull relentlessly until we switched to the Velluto & Hide chest-plate harness. The leather has developed the richest dark mahogany glow from Scottish mist and rain. Impeccable craftsmanship.”",
    name: "Hamish MacIntyre",
    meta: "Edinburgh, Scotland • The Canine Harness",
  },
  {
    quote: "“Equal to the finest houses of Mayfair.”",
    body: "“I ordered the bespoke aviator jacket in cognac Tuscan lambskin. The jacket arrived via hand courier to Chelsea in under 24 hours from final inspection. The drape, the silk lining, and the riri hardware are utterly peerless.”",
    name: "Alastair Finch-Hatton",
    meta: "Mayfair, London • Bespoke Lambskin Aviator",
  },
  {
    quote: "“New York to London seamlessly delivered.”",
    body: "“The Balmoral Boots landed in Manhattan just three days after dispatch with all US duties cleared. The cork insole conformed to my foot within a weekend. Unquestionably the most solid leather shoe in my wardrobe.”",
    name: "Eleanor Vance",
    meta: "Manhattan, New York • Balmoral Leather Boots",
  },
];

function Eyebrow({ icon, children, className = "text-primary" }: { icon?: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`inline-flex items-center gap-space-xs font-label-sm text-label-sm uppercase tracking-widest mb-space-xs ${className}`}>
      {icon ? <Icon name={icon} className="text-[16px]" /> : <span className="w-2 h-2 rounded-full bg-primary" />}
      <span>{children}</span>
    </div>
  );
}

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      <section className="-mt-28 relative min-h-[942px] flex items-center overflow-hidden bg-surface-container-high">
        <div
          className="absolute inset-0 bg-cover bg-center scale-105"
          role="img"
          aria-label="Master craftsman hands working on saddle cognac full-grain hide in a historic British leather atelier"
          style={{ backgroundImage: `url('${HERO_IMG}')` }}
        />
        <div className="absolute inset-0 bg-linear-to-r from-on-surface/90 via-on-surface/75 to-on-surface/30" />
        <div className="absolute inset-0 bg-linear-to-t from-on-surface/90 via-transparent to-black/40" />
        <div className="relative z-10 max-w-360 mx-auto px-margin md:px-margin-desktop w-full pt-36 pb-space-xl">
          <div className="max-w-2xl text-on-primary">
            <div className="inline-flex items-center gap-space-xs bg-surface-bright/15 backdrop-blur-md px-space-md py-1.5 rounded-lg mb-space-md">
              <Icon name="verified" className="text-[16px] text-tertiary-fixed" />
              <span className="font-label-sm text-label-sm uppercase tracking-widest text-surface-bright">
                Savile Row • Edinburgh New Town
              </span>
            </div>
            <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg tracking-tight mb-space-md leading-[1.08] text-surface-bright">
              The Art of <span className="italic font-normal text-tertiary-fixed">Handcrafted</span> Grain
            </h1>
            <p className="font-body-lg text-body-lg text-surface-container-low/90 mb-space-xl max-w-xl font-normal leading-relaxed">
              Full-grain vegetable-tanned leather footwear, bespoke outerwear, and luxury canine harnesses. Hand-stitched
              with unhurried devotion to endure generations.
            </p>
            <div className="flex flex-wrap items-center gap-space-md">
              <Link
                className="inline-flex items-center justify-center bg-primary-container text-on-primary hover:bg-primary transition-all duration-300 font-label-md text-label-md uppercase tracking-wider px-space-lg py-3.5 rounded shadow-lg hover:shadow-xl active:scale-95"
                href="/shop"
              >
                Explore Collection
              </Link>
              <Link
                className="inline-flex items-center justify-center bg-surface-bright/10 backdrop-blur-md text-surface-bright hover:bg-surface-bright hover:text-on-surface transition-all duration-300 font-label-md text-label-md uppercase tracking-wider px-space-lg py-3.5 rounded shadow-sm"
                href="/shop/canine"
              >
                The Canine Edit
              </Link>
            </div>
            <div className="mt-space-xl pt-space-md flex flex-wrap items-center gap-space-lg text-surface-container-low/80">
              {[
                ["history_edu", "Certified Tuscan Tannery Hides"],
                ["local_shipping", "Tracked Courier: US, UK & Scotland"],
                ["all_inclusive", "Atelier Lifetime Stitch Guarantee"],
              ].map(([icon, label]) => (
                <div key={label} className="flex items-center gap-space-xs">
                  <Icon name={icon} className="text-[18px] text-tertiary-fixed" />
                  <span className="font-label-sm text-label-sm uppercase tracking-wider">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="hidden xl:flex absolute bottom-space-xl right-margin-desktop items-center gap-space-md bg-surface-bright/10 backdrop-blur-md px-space-md py-space-sm rounded-lg text-surface-bright/90">
          <span className="font-label-sm text-label-sm uppercase tracking-[0.25em] text-tertiary-fixed">Lot No. 1894</span>
          <div className="w-8 h-px bg-tertiary-fixed/40" />
          <span className="font-body-sm text-body-sm italic">Single-batch vegetable bark steeping in Tuscany</span>
        </div>
      </section>

      <section className="max-w-360 mx-auto px-margin md:px-margin-desktop py-space-xl w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-space-xl gap-space-md">
          <div>
            <Eyebrow>Permanent Collection</Eyebrow>
            <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface">
              The Three Pillars of Velluto &amp; Hide
            </h2>
          </div>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-md">
            Each category represents hundreds of hours of design iteration, bespoke fit development, and the finest
            selection of full-grain natural hides.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-space-lg">
          {PILLARS.map((p) => (
            <article
              key={p.title}
              className="group bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-4/5 overflow-hidden bg-surface-container">
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    alt={p.alt}
                    src={p.image}
                  />
                  <div className={`absolute top-space-sm left-space-sm px-space-sm py-1 rounded ${p.badgeClass}`}>
                    <span className="font-label-sm text-label-sm uppercase tracking-wider">{p.badge}</span>
                  </div>
                  <div className="absolute bottom-space-sm right-space-sm bg-surface-bright/95 backdrop-blur-sm px-space-md py-1 rounded shadow-sm">
                    <span className="font-label-md text-label-md text-primary font-semibold">{p.price}</span>
                  </div>
                </div>
                <div className="p-space-lg">
                  <h3 className="font-headline-sm text-headline-sm text-on-surface group-hover:text-primary transition-colors mb-space-xs">
                    {p.title}
                  </h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-md">{p.text}</p>
                  <ul className="space-y-space-xs text-on-surface-variant font-body-sm text-body-sm mb-space-lg">
                    {p.points.map((pt) => (
                      <li key={pt} className="flex items-center gap-space-xs">
                        <Icon name="check_circle" className="text-[16px] text-tertiary" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="px-space-lg pb-space-lg pt-0">
                <Link
                  className="w-full inline-flex items-center justify-between bg-surface-container hover:bg-primary hover:text-on-primary text-on-surface px-space-md py-3 rounded transition-all duration-300 font-label-md text-label-md uppercase tracking-wider group-hover:bg-primary group-hover:text-on-primary"
                  href={p.href}
                >
                  <span>{p.cta}</span>
                  <Icon name="arrow_forward" className="text-[18px]" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="shipping" className="max-w-360 mx-auto px-margin md:px-margin-desktop my-space-xl w-full scroll-mt-32">
        <div className="bg-surface-container-high rounded-2xl p-space-lg md:p-space-xl relative overflow-hidden shadow-sm">
          <div className="absolute -right-16 -bottom-16 w-96 h-96 bg-primary/5 rounded-full pointer-events-none blur-3xl" />
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-space-xl">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-space-xs bg-surface-bright px-space-sm py-1 rounded mb-space-sm text-primary">
                <Icon name="flight_takeoff" className="text-[18px]" />
                <span className="font-label-sm text-label-sm uppercase tracking-wider font-semibold">
                  Priority Courier Service
                </span>
              </div>
              <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mb-space-xs">
                Express Hand-Delivered to US, UK &amp; Scotland
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Zero customs duties, insured packaging, and personalized tracking direct from our Mayfair and Edinburgh
                workbenches.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-md w-full lg:w-auto">
              {HUBS.map((h) => (
                <div key={h.region} className="bg-surface-bright p-space-md rounded-xl shadow-sm flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-space-sm">
                    <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary">{h.region}</span>
                    <Icon name={h.icon} className="text-primary text-[20px]" />
                  </div>
                  <div className="space-y-0.5">
                    <p className="font-headline-sm text-headline-sm text-on-surface">{h.title}</p>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">{h.carrier}</p>
                  </div>
                  <div className="mt-space-sm pt-space-xs bg-surface-container-low px-space-xs py-1 rounded text-center">
                    <span className="font-label-sm text-label-sm text-primary font-semibold">{h.note}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-360 mx-auto px-margin md:px-margin-desktop py-space-xl w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-center">
          <div className="lg:col-span-7 space-y-space-lg">
            <div>
              <Eyebrow icon="hourglass_top" className="text-tertiary">
                Batch No. 04 In Development
              </Eyebrow>
              <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface">
                More Handcrafted Goods Coming Soon
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant mt-space-xs">
                Each batch is tanned and hand-stitched in strictly numbered runs of fifty pieces. Preview the creations
                currently on the workshop bench.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-md">
              {UPCOMING.map((u) => (
                <div key={u.title} className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="aspect-square bg-surface-container rounded-lg overflow-hidden mb-space-sm">
                    <img className="w-full h-full object-cover" alt={u.alt} src={u.image} />
                  </div>
                  <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary">{u.season}</span>
                  <h4 className="font-headline-sm text-headline-sm text-on-surface mt-0.5">{u.title}</h4>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">{u.text}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="bg-surface-container rounded-2xl p-space-lg md:p-space-xl shadow-sm">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-space-md">
                <Icon name="notifications_active" className="text-[26px]" />
              </div>
              <h3 className="font-headline-md text-headline-md text-on-surface mb-space-xs">Reserve Priority Atelier Access</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-lg">
                Batch releases often sell out within hours of hide cutting. Join our private patron register to receive
                24-hour advance access, bespoke hide selections, and invitations to Edinburgh and London trunk shows.
              </p>
              <WaitlistForm />
              <div className="mt-space-md pt-space-md flex items-center justify-between gap-space-sm text-on-surface-variant font-label-sm text-label-sm">
                <span>Next Hide Dispatch: October 14</span>
                <span className="text-tertiary font-semibold">Strictly 50 Units per Silhouette</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="craftsmanship" className="bg-surface-container-low py-space-xl my-space-lg w-full scroll-mt-28">
        <div className="max-w-360 mx-auto px-margin md:px-margin-desktop">
          <div className="max-w-2xl mb-space-xl">
            <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary block mb-space-xs">
              Uncompromising Traceability
            </span>
            <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface">
              The Heritage of Our Materials
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant mt-space-xs">
              True luxury is not an assembly line process. It is a slow, reverent dialogue between historical methods
              and raw nature.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg">
            {STORIES.map((s) => (
              <div key={s.title} className="bg-surface-bright p-space-lg rounded-xl shadow-sm flex flex-col justify-between">
                <div>
                  <div className="aspect-16/10 bg-surface-container rounded-lg overflow-hidden mb-space-md">
                    <img className="w-full h-full object-cover" alt={s.alt} src={s.image} />
                  </div>
                  <div className="flex items-center gap-space-xs text-primary mb-1">
                    <Icon name={s.icon} className="text-[18px]" />
                    <span className="font-label-sm text-label-sm uppercase tracking-wider font-semibold">{s.place}</span>
                  </div>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface mb-space-xs">{s.title}</h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">{s.text}</p>
                </div>
                <div className="mt-space-md pt-space-sm">
                  <span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest">{s.footnote}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-360 mx-auto px-margin md:px-margin-desktop py-space-xl w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-space-xl gap-space-md">
          <div>
            <Eyebrow icon="stars">Verified Patron Reviews</Eyebrow>
            <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface">
              Voices From Our Global Patrons
            </h2>
          </div>
          <div className="flex items-center gap-space-sm">
            <span className="font-headline-sm text-headline-sm text-on-surface">4.96 / 5.00</span>
            <Stars size={20} />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg">
          {REVIEWS.map((r) => (
            <div key={r.name} className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex flex-col justify-between">
              <div>
                <Stars className="gap-1 mb-space-sm" />
                <p className="font-headline-sm text-headline-sm text-on-surface mb-space-xs">{r.quote}</p>
                <p className="font-body-sm text-body-sm text-on-surface-variant italic mb-space-md">{r.body}</p>
              </div>
              <div className="pt-space-md flex items-center justify-between">
                <div>
                  <p className="font-label-md text-label-md text-on-surface font-semibold">{r.name}</p>
                  <p className="font-label-sm text-label-sm text-secondary">{r.meta}</p>
                </div>
                <Icon name="verified" className="text-primary text-[20px]" />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="appointments" className="max-w-360 mx-auto px-margin md:px-margin-desktop mb-space-xl w-full scroll-mt-32">
        <div className="bg-primary-container text-on-primary rounded-2xl p-space-lg md:p-space-xl shadow-lg flex flex-col lg:flex-row items-center justify-between gap-space-lg">
          <div className="space-y-space-xs text-center lg:text-left">
            <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary-fixed block">
              Private Atelier Appointments
            </span>
            <h3 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-primary">
              Reserve a Bespoke Measurement Fitting
            </h3>
            <p className="font-body-md text-body-md text-on-primary-container max-w-xl">
              Meet with our head leather tailor in Mayfair or Edinburgh for bespoke footwear measurements and custom
              outerwear pattern drafting.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-space-sm">
            <a
              className="inline-flex items-center justify-center bg-surface text-on-surface hover:bg-surface-container-low transition-colors font-label-md text-label-md uppercase tracking-wider px-space-lg py-3 rounded shadow"
              href="tel:+441315550198"
            >
              Book Atelier Session
            </a>
            <Link
              className="inline-flex items-center justify-center bg-primary text-on-primary hover:bg-on-primary hover:text-primary transition-colors font-label-md text-label-md uppercase tracking-wider px-space-lg py-3 rounded"
              href="/#craftsmanship"
            >
              Learn Our Craft
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
