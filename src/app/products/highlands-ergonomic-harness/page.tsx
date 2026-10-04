import type { Metadata } from "next";
import Link from "next/link";
import { Icon, Stars } from "@/components/Icon";
import { AddSuiteButton } from "@/components/product/AddSuiteButton";
import { HarnessConfigurator } from "@/components/product/HarnessConfigurator";
import { IMG } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "The Highlands Ergonomic Canine Leather Harness",
  description:
    "Hand-crafted from 9oz vegetable-tanned bridle leather with unlacquered solid brass hardware and complimentary bespoke monogramming.",
};

const STORY = [
  {
    eyebrow: "01 / Provenance",
    title: "60-Day Pit Tanning Soak",
    text: "Our hides rest in organic wooden vats steeped with natural mimosa and chestnut extracts. This archaic, non-chromium process maintains the living breathability of the leather, allowing it to soften and mold organically to your dog’s unique gait.",
    image: `${IMG}AB6AXuCSIWJppzF20o2Y7dJTOpdSWs3LwmRGV82AKLqgmJ7LJyrSGjNXXaXJXt14NL4E31cdk3D4r4YW2qcz1eLWhCH1aUmNyre9cYn-t-9opoIxm40tYAOeZG_rW9nihCQas1IJKzFmiKZdt3GXeyh2MBxkZFeGwk7BGZlprve7DXHPTSxrDet8gfjUBfOJFrEbhVJtAtsEitDMDZUFXk_10v9eyStiNYjG8kV-0hquo8jS8-OdrT1tDyHE`,
    alt: "Artisan submerging full-grain hides into dark chestnut tanning liquor in traditional Tuscan pits",
  },
  {
    eyebrow: "02 / Endurance",
    title: "Scottish Beeswax Edge Glaze",
    text: "Every raw edge is repeatedly hand-bevelled, sanded, and heat-burnished with organic beeswax harvested from apiaries in the Pentlands. This seals the fibrous bundle against torrential highland rain and pond water ingress.",
    image: `${IMG}AB6AXuA9JZ25NqLlCxWRYK2QiGHn71FBB9y8HLrCT-a2cAeJBAepzbjdVizuFyvFSvpjSX6hURNGSf6a1IQQOoZZDqANnwK8Ym3U3y_5rKIp1_Wo0V-XFrUwNKg_tcmItZXv56n2XrdFnQqkKv6dzKk0JG4WpV4Z3EswdwlueMIuA_vm__5WeJMxPQ3ZJmoYx8x3LDaC1vvGQxju33I3iXOp63I9MkEVBldAMQY5ItNbxF75giQ4a0ujvPu0`,
    alt: "Leathercrafter hand-burnishing the edge of a thick harness strap with a wooden slicker and beeswax",
  },
  {
    eyebrow: "03 / Strength",
    title: "450kg Load Sand-Cast Brass",
    text: "Unlike mass-manufactured zinc alloys that crack under sudden impulse jolts, our sand-cast brass O-rings and roller buckles endure over 450 kilograms of tensile stress. Left unlacquered to develop a rich, weathered golden patina.",
    image: `${IMG}AB6AXuCQ2IuNcZhayYgHAT9NNpFIE0eDizbAtAqnD1J5gvLl5y4aWqTdFtZjSbtkH3KlhAizddIt59sHEzqU0zWEUfD2RCZnsNSvUYVCpbgwnzFPjvMWq0U90c0e3Ulam1A9Os_pahhostBu81T9EphdFEX1DcDIZy5cnn0PB432wbI86GVfx--CnYIrv8JQU4MUOnWbqdStt3Z0AZHWrlFCttRy5RidrVopUVxDH00PvgCtc8DaZaFWYftF`,
    alt: "Molten brass poured into sand-cast moulds for harness hardware in an artisanal foundry",
  },
];

const SUITE = [
  {
    label: "Core Piece",
    labelClass: "text-secondary",
    name: "The Highlands Harness",
    price: "$165.00",
    image: `${IMG}AB6AXuANdt3JKzJmR25y6EBz5ehmbVUoybFzINOyBjNpqa98WqdxFpWaXGewmAL2Y9C_ZiqSHptW9fqrv7ejwbItzjOJDlAilht5ekIY_WScdmgCPcROeB2lQt5cRk7Ubn59W-rg1rr3Bppzs5LhdF2XipdEBRz_IHS3pgebqu-SRdg_LDrKvbdsuE6MlXI7mlLaBbAv-zYymJhNVamA703VYq8TmU4rdnz5nVYRpSVwnASYZhfxa5x-vSb4`,
    alt: "Cognac tan leather dog harness on a warm limestone studio background",
  },
  {
    label: "Companion",
    labelClass: "text-outline",
    name: "Highlands 6ft Lead",
    price: "$85.00",
    image: `${IMG}AB6AXuB7Pexmw6Tx1v0FzPSVH6pIle9woYFiT6DbASdIdenMVOvkey7W0e-Pfv-iLPJZ1w1FOnf7AAGuSz_RcJMKFJXUC6lc62sa7g62gPmrSPn1FAJeCSHodHu5PIrEsexahiWhpgB2gDGTvgpNffWSk9gvsyKPzCOi-BoZbaTPxhiULE5qTIbRCy4WbEe_hsoXZVoepQnJ0FBs3-rOuLMlOknnvsps-ZHoZa_U7xPbmRUNy9pwQWyHqqa9`,
    alt: "Six-foot matching English bridle leather lead with solid brass snap hook rolled on a cream surface",
  },
  {
    label: "Accoutrement",
    labelClass: "text-outline",
    name: "Carrier Pouch",
    price: "$45.00",
    image: `${IMG}AB6AXuCcTpM_F-Q_JbNW2jlPrO48dArsiy1szV6Hf2TFjyR72mW3s5KU2SNUi0U6wMd4Xb3Z0ClPzp30-WzkJMlA94wu5nYsUmQoGfScDH-F9ew82-8nHuuX-YdL1I4eMieVHxFvV0G6q_TWai6pVhvmUYl3g_wp-kJuISZLcysCDVruOUwQr0aMdUbq0pUonoSk72Jyocx-nHsVFQJmDF_jTGwDPK7V4AgbeV86SF9GLJCmoQIKxd1RYm8N`,
    alt: "Cylindrical leather bag dispenser pouch with solid brass snap shackle clasp",
  },
];

const METRICS = [
  { label: "Leather Suppleness & Grain", score: "5.0", width: "w-[99%]" },
  { label: "Anatomical Thoracic Fit", score: "4.9", width: "w-[97%]" },
  { label: "Solid Brass Metallurgy", score: "5.0", width: "w-full" },
];

const REVIEWS = [
  {
    title: "Transcends Any Commercial Gear",
    body: "We walk our Gordon Setter across Arthur’s Seat in rain and gale. Most padded harnesses soak up bog water and rot. The Highlands harness sheds water like oilcloth, and the cognac patina after four months is simply breathtaking.",
    name: "Alistair Drummond, Esq.",
    meta: "Edinburgh, Scotland • Size Large",
  },
  {
    title: "Zero Pressure on the Windpipe",
    body: "Our French Bulldog Barnaby struggled with respiratory coughing during brisk morning strolls in Beacon Hill. The broad pectoral plate holds him securely without impinging his neck. The gold deboss of his name looks exquisite.",
    name: "Eleanor Vance",
    meta: "Boston, MA • Size Small",
  },
  {
    title: "Saddlery Grade That Belongs in Hyde Park",
    body: "Having owned equestrian gear from Hermes and Swaine Adeney, I can unreservedly state that Velluto & Hide’s two-needle saddle stitching matches Savile Row bespoke tailoring. Truly an heirloom item for my Cocker Spaniel.",
    name: "Lord Julian Sterling",
    meta: "Kensington, London • Size Medium",
    wide: true,
  },
];

const GUARANTEES = [
  ["spa", "Full-Grain Bavarian Leather", "Naturally drum-dyed without harsh toxic chromium salts."],
  ["workspace_premium", "Lifetime Saddle Stitch Guarantee", "Complimentary restitching at our London or Edinburgh workshop."],
  ["sync_alt", "30-Day Bespoke Exchanges", "Prepaid express return parcel across US, UK & Highlands."],
];

const EYEBROW = "text-label-sm font-label-sm uppercase tracking-eyebrow text-secondary font-bold";

export default function HarnessPage() {
  return (
    <div className="flex flex-col w-full">
      <section className="max-w-360 mx-auto w-full px-6 md:px-12 py-6">
        <nav
          aria-label="Breadcrumb"
          className="flex flex-wrap items-center gap-3 text-label-sm font-label-sm uppercase tracking-eyebrow text-on-surface-variant"
        >
          <Link className="hover:text-primary transition-colors" href="/">
            Atelier
          </Link>
          <span className="text-outline/40">/</span>
          <Link className="hover:text-primary transition-colors" href="/shop/canine">
            The Canine Collection
          </Link>
          <span className="text-outline/40">/</span>
          <span className="text-primary font-semibold">The Highlands Ergonomic Harness</span>
        </nav>
      </section>

      <section className="max-w-360 mx-auto w-full px-6 md:px-12 pb-20">
        <HarnessConfigurator />
      </section>

      <section className="w-full bg-surface-container-low py-24 my-8">
        <div className="max-w-360 mx-auto px-6 md:px-12">
          <div className="max-w-2xl mx-auto text-center space-y-4 mb-16">
            <span className={EYEBROW}>Highland Ergonomics &amp; Materials</span>
            <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary">
              Tanned with Crushed Chestnut &amp; Mimosa Bark
            </h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant">
              Crafted for high-energy companions traversing rough heather or London parks. Every curve follows the
              thoracic vertebrae, never compressing the rib cage during gallops.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {STORY.map((s) => (
              <div key={s.title} className="bg-surface p-8 flex flex-col justify-between space-y-6 shadow-sm">
                <div className="space-y-4">
                  <span className={`${EYEBROW} block`}>{s.eyebrow}</span>
                  <h3 className="font-headline-md text-headline-md text-primary">{s.title}</h3>
                  <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">{s.text}</p>
                </div>
                <div className="w-full aspect-4/3 bg-surface-container overflow-hidden">
                  <img
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    alt={s.alt}
                    src={s.image}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12 bg-primary text-on-primary p-8 md:p-12 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-3 max-w-xl">
              <span className="text-label-sm font-label-sm uppercase tracking-eyebrow text-secondary-container font-semibold">
                Ergonomic Architecture
              </span>
              <h3 className="font-headline-md text-headline-md">Zero Tracheal Interference Guarantee</h3>
              <p className="font-body-md text-body-md text-on-primary-container leading-relaxed">
                The low-slung, padded Y-frame distributes impulse forces symmetrically across the dog’s rib cage rather
                than throat cartilage. Vetted by veterinary osteopaths across the UK.
              </p>
            </div>
            <div className="flex items-center gap-6">
              {[
                ["0%", "Laryngeal Choke"],
                ["450kg", "Tensile Threshold"],
              ].map(([value, label], i) => (
                <div key={label} className="flex items-center gap-6">
                  {i > 0 && <div className="w-px h-12 bg-outline-variant/30" />}
                  <div className="text-center px-4 py-2">
                    <span className="block font-headline-lg text-headline-lg font-light text-secondary-container">{value}</span>
                    <span className="text-label-sm font-label-sm uppercase tracking-wider text-surface/80">{label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-360 mx-auto w-full px-6 md:px-12 py-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <span className={EYEBROW}>Highland Ensemble</span>
            <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary mt-1">
              Complete The Highlands Canine Suite
            </h2>
          </div>
          <p className="font-body-sm text-body-sm text-on-surface-variant max-w-md">
            Coordinate your field walk with matching vegetable-tanned accessories crafted from the identical hide batch.
          </p>
        </div>
        <div className="bg-surface-container-low p-6 md:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
              {SUITE.map((s) => (
                <div key={s.name} className="bg-surface p-4 flex flex-col space-y-3">
                  <div className="w-full aspect-square bg-surface-container overflow-hidden">
                    <img className="w-full h-full object-cover" alt={s.alt} src={s.image} />
                  </div>
                  <div>
                    <span className={`text-[9px] uppercase tracking-wider font-bold ${s.labelClass}`}>{s.label}</span>
                    <p className="font-headline-sm text-base text-primary">{s.name}</p>
                    <p className="text-label-md font-label-md text-primary font-semibold mt-1">{s.price}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="lg:col-span-4 bg-surface p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-2">
                <span className={EYEBROW}>Curated Trio Discount</span>
                <h3 className="font-headline-md text-headline-md text-primary">Highland Field Trio</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Harmonized leather patina across harness, lead, and carrier. Arrives packed inside an unbleached Scottish
                  tweed protective satchel.
                </p>
              </div>
              <div className="space-y-4">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <div>
                    <span className="text-headline-lg font-headline-lg text-primary">$260.00</span>
                    <span className="text-body-md font-body-md text-on-surface-variant line-through ml-2 opacity-60">
                      $295.00
                    </span>
                  </div>
                  <span className="bg-secondary-container text-on-secondary-container px-2.5 py-1 text-label-sm font-label-sm uppercase font-bold tracking-wider">
                    Save $35.00
                  </span>
                </div>
                <AddSuiteButton />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-360 mx-auto w-full px-6 md:px-12 py-16 scroll-mt-32" id="patron-appraisals">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-4 space-y-6">
            <span className={EYEBROW}>Verified Guardians</span>
            <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary">Patron Appraisals</h2>
            <div className="flex items-baseline gap-3">
              <span className="font-headline-lg text-headline-lg font-light text-primary">4.96</span>
              <span className="text-body-md font-body-md text-on-surface-variant">out of 5.00</span>
            </div>
            <div className="space-y-2 pt-2">
              {METRICS.map((m, i) => (
                <div key={m.label} className={i > 0 ? "pt-2 space-y-2" : "space-y-2"}>
                  <div className="flex items-center justify-between text-body-sm font-body-sm text-on-surface-variant">
                    <span>{m.label}</span>
                    <span className="font-bold text-primary">{m.score}</span>
                  </div>
                  <div className="w-full bg-surface-container h-1.5 overflow-hidden">
                    <div className={`bg-secondary h-full ${m.width}`} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {REVIEWS.map((r) => (
              <div
                key={r.name}
                className={`bg-surface-container-low p-8 space-y-4 shadow-sm flex flex-col justify-between ${
                  r.wide ? "md:col-span-2" : ""
                }`}
              >
                <div className="space-y-3">
                  <Stars />
                  <h4 className="font-headline-sm text-headline-sm text-primary">&ldquo;{r.title}&rdquo;</h4>
                  <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">{r.body}</p>
                </div>
                <div className="pt-4 flex items-center justify-between text-body-sm font-body-sm">
                  <div>
                    <p className="font-bold text-primary">{r.name}</p>
                    <p className="text-outline text-xs">{r.meta}</p>
                  </div>
                  <Icon name="verified" className="text-secondary text-[18px]" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full bg-surface-container py-12">
        <div className="max-w-360 mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {GUARANTEES.map(([icon, title, text]) => (
              <div key={title} className="flex items-center gap-4">
                <div className="w-12 h-12 bg-surface flex items-center justify-center text-secondary shadow-sm shrink-0">
                  <Icon name={icon} className="text-[24px]" />
                </div>
                <div>
                  <h5 className="font-headline-sm text-base text-primary">{title}</h5>
                  <p className="text-body-sm font-body-sm text-on-surface-variant">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
