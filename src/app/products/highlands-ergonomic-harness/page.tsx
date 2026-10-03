import type { Metadata } from "next";
import Link from "next/link";
import { Stars } from "@/components/Icon";
import { AddSuiteButton } from "@/components/product/AddSuiteButton";
import { HarnessConfigurator } from "@/components/product/HarnessConfigurator";
import { HarnessTabs } from "@/components/product/HarnessTabs";
import { IMG } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "The Highlands Ergonomic Canine Leather Harness",
  description:
    "Hand-crafted from 9oz vegetable-tanned bridle leather with unlacquered solid brass hardware and complimentary bespoke monogramming.",
};

const SUITE = [
  {
    label: "Included Piece",
    name: "Ergonomic Harness",
    price: "$165.00",
    image: `${IMG}AB6AXuAbW8dZZLjSz5ifIDhNq4ZqbS5jl6Xl0GaQC5OejDPqgNlnNs09o-xeDb0Z3uAIfQZoJUu12raccT1Vq5WGdZx_f7zmym3LdOyyJmKAdQOUC1OvTATD6e7ihJ0ndlDUeH05t5g3OcLePhw087sJJccr6fi5VSvc4fJSquGftN1pDNWq0v3ifSROZ3PZRak4IqKQHdpejQCYFVlnUSAIaO06Yy3H2vnv5EaCYKFdGS-T_CMOXwaIzuzY`,
    alt: "Highlands Ergonomic Harness in saddle cognac leather",
  },
  {
    label: "Bundle Item 02",
    name: "Highlands 6ft Lead",
    price: "$85.00",
    image: `${IMG}AB6AXuBILtACPtFB6ZItKgYoXPhzToP8TTDafhSBxReJSvaGkDIpsIhKMo_5Q4H34fCFCS77I72PcSqHMo3OKW6dHEmWik8pRfZZrPxQ7pR1iIL6Vb0JdKuH2cfMhqc3SrHBgAw7hstC6JPsh-g77phI6i0N4FYTcW_Zq43Rb-eq0TzZ8naqG_y0FlhACcBN4add9BLRpmmXAwNlSJzSbCN_0d_02gjBtl6rH4Pi2ZQsGugiFI5ZPJRYR8Pq`,
    alt: "Matching 6 foot bridle leather lead with brass trigger snap in cognac tan",
  },
  {
    label: "Bundle Item 03",
    name: "Leather Carrier Pouch",
    price: "$45.00",
    image: `${IMG}AB6AXuAIykneRGUPttZnaJGh6uOeD48NU80j_Ts7WIEzKV5gtKsFZjTqb0z6Mju4OcSnn86k4jkGBMc6i7-SpIGbU3kTBfxMBfp4r5rBRvtmmnFwacFl2FWdOzTEQ4wH3PT7uZZrbn-jEUQ_Md1MqMTLxnou4VyPp8mv-lkg8IPtdU6RWaizpG2SoawDV0ZbA1cS1VsNR82h8tbEm_Ts6BjkTb2ZxpnevSt9fZw5E9ixymnsrzTMPJ4YJ6JB`,
    alt: "Cylindrical cognac leather waste bag pouch with brass screw stud",
  },
];

const REVIEWS = [
  {
    when: "3 weeks ago",
    title: "The last harness Archie will ever need.",
    body: "“We took our Springer Spaniel through wet Argyll bracken for 4 days straight. The bridle leather softened to butter and wiped clean with a dry rag. No rubbing whatsoever under his forelegs.”",
    name: "Lady C. Hamilton",
    meta: "Inveraray, Scotland • Verified Owner",
    fit: "Medium • Spaniel",
  },
  {
    when: "1 month ago",
    title: "Astonishing craft & rapid DHL delivery to Boston",
    body: "“Ordered on Monday morning from the US, sat on my porch Thursday afternoon. The solid brass D-ring has genuine weight and the blind monogramming of ‘BARNABY’ looks like Savile Row tailoring.”",
    name: "Dr. Julian Vance",
    meta: "Boston, MA, USA • Verified Owner",
    fit: "Large • Retriever",
  },
  {
    when: "2 months ago",
    title: "Finally, a harness that doesn't choke our Frenchie",
    body: "“Our French Bulldog Winston pulled constantly with fabric harnesses. The lowered chest bar design stops any wheezing or neck pressure. Worth every single penny.”",
    name: "Marcus Sterling",
    meta: "Kensington, London • Verified Owner",
    fit: "Small • Frenchie",
  },
];

export default function HarnessPage() {
  return (
    <div className="max-w-360 mx-auto px-margin md:px-margin-desktop py-space-md w-full">
      <nav
        aria-label="Breadcrumb"
        className="flex flex-wrap items-center gap-space-xs text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider mb-space-lg"
      >
        <Link className="hover:text-primary transition-colors" href="/">
          Atelier
        </Link>
        <span className="opacity-40">/</span>
        <Link className="hover:text-primary transition-colors" href="/shop/canine">
          The Canine Collection
        </Link>
        <span className="opacity-40">/</span>
        <span className="text-on-surface font-semibold">The Highlands Ergonomic Harness</span>
      </nav>

      <HarnessConfigurator />
      <HarnessTabs />

      <div className="mt-12 p-space-lg md:p-space-xl bg-surface-container-low rounded-2xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-space-md mb-space-lg">
          <div>
            <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary font-semibold">
              Atelier Curated Pairing
            </span>
            <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mt-1">
              Complete The Highlands Canine Suite
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Combine the matching 6ft bridle lead and brass bag carrier to save $35.
            </p>
          </div>
          <div className="flex items-center gap-space-md">
            <div className="text-right">
              <span className="font-body-sm text-body-sm line-through text-secondary block">$295.00 Total</span>
              <span className="font-headline-md text-headline-md font-semibold text-primary">$260.00 Bundle</span>
            </div>
            <AddSuiteButton />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
          {SUITE.map((s) => (
            <div key={s.name} className="bg-surface p-space-md rounded-xl flex items-center gap-space-md shadow-sm">
              <div className="w-20 h-20 rounded-lg overflow-hidden bg-surface-container shrink-0">
                <img className="w-full h-full object-cover" alt={s.alt} src={s.image} />
              </div>
              <div>
                <span className="font-label-sm text-[10px] text-secondary uppercase tracking-widest">{s.label}</span>
                <h4 className="font-headline-sm text-[16px] text-on-surface">{s.name}</h4>
                <span className="font-body-sm text-body-sm text-primary font-semibold">{s.price}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-20 pt-space-xl border-t border-surface-container-high scroll-mt-32" id="reviews-section">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md mb-space-xl">
          <div>
            <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary">Field-Tested &amp; Verified</span>
            <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mt-1">
              Patron Appraisals
            </h2>
            <div className="flex flex-wrap items-center gap-space-sm mt-space-xs">
              <Stars size={20} />
              <span className="font-headline-sm text-headline-sm text-on-surface">4.9 Overall Rating</span>
              <span className="font-body-sm text-body-sm text-on-surface-variant">• 128 verified canine guardians</span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg">
          {REVIEWS.map((r) => (
            <div key={r.name} className="p-space-lg bg-surface-container-low rounded-xl space-y-space-sm flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-space-xs">
                  <Stars />
                  <span className="font-label-sm text-label-sm text-secondary">{r.when}</span>
                </div>
                <h4 className="font-headline-sm text-[18px] text-on-surface">{r.title}</h4>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">{r.body}</p>
              </div>
              <div className="pt-space-md border-t border-surface-container-high flex items-center justify-between gap-space-sm">
                <div>
                  <p className="font-label-md text-label-md font-semibold text-on-surface">{r.name}</p>
                  <p className="font-label-sm text-label-sm text-secondary">{r.meta}</p>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-surface-bright text-[10px] font-label-sm text-on-surface uppercase font-semibold whitespace-nowrap">
                  {r.fit}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
