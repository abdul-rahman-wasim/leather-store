import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Icon } from "@/components/Icon";
import { AtelierTeasers } from "@/components/shop/AtelierTeasers";
import { ShopCatalog, type ShopFilter } from "@/components/shop/ShopCatalog";
import { CATEGORY_LABELS, IMG } from "@/lib/catalog";

const FILTERS = ["shoes", "canine", "jackets", "preview"] as const;

export const dynamicParams = false;

export function generateStaticParams() {
  return [{ category: [] }, ...FILTERS.map((f) => ({ category: [f] }))];
}

function parseFilter(segments: string[] | undefined): ShopFilter {
  if (!segments || segments.length === 0) return "all";
  const [first] = segments;
  if (segments.length > 1 || !(FILTERS as readonly string[]).includes(first)) notFound();
  return first as ShopFilter;
}

export async function generateMetadata(props: PageProps<"/shop/[[...category]]">): Promise<Metadata> {
  const filter = parseFilter((await props.params).category);
  if (filter === "all") return { title: "Shop All" };
  if (filter === "preview") return { title: "In The Atelier" };
  return { title: CATEGORY_LABELS[filter] };
}

export default async function ShopPage(props: PageProps<"/shop/[[...category]]">) {
  const filter = parseFilter((await props.params).category);

  return (
    <div className="flex flex-col w-full">
      <ShopCatalog initialCategory={filter} />

      <section className="w-full bg-surface-container py-20 border-y border-outline-variant/30">
        <div className="max-w-360 mx-auto px-margin md:px-margin-desktop grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-5 space-y-6">
            <span className="font-label-sm text-label-sm uppercase tracking-[0.25em] text-secondary font-semibold">
              Tuscan Tannery • Scottish Benchwork
            </span>
            <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary">
              Formed by patient hands, never stamped in haste.
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              Every hide selected by Vale &amp; Rawat undergoes a sixty-day conditioning period in organic bark
              extracts before being skived and saddle-stitched by hand in our Edinburgh and London mews.
            </p>
            <div className="grid grid-cols-3 gap-6 pt-4 border-t border-outline-variant/40">
              {[
                ["100%", "Bark Tanned"],
                ["0%", "Synthetic Core"],
                ["Lifetime", "Saddle Guarantee"],
              ].map(([value, label]) => (
                <div key={label}>
                  <p className="font-headline-sm text-headline-sm text-primary">{value}</p>
                  <p className="font-label-sm text-[10px] text-secondary uppercase tracking-wider mt-1">{label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-7 grid grid-cols-2 gap-6">
            <div className="aspect-3/4 rounded-xl overflow-hidden shadow-sm border border-outline-variant/30">
              <img
                className="w-full h-full object-cover"
                alt="Artisan hand-beveling the edges of full-grain saddle leather in a sunlit Scottish workshop"
                src={`${IMG}AB6AXuAbqZvDv7s9Y6QMCtFSDT-FECMFfRbtOmKT_j8m7E-wiY_2xBz1cJ6RoKixRDPfgTLIfiKEMtVRMMFbMopk-UPthP6RXmgzotMuegVBiANGfjDTUEur149QgMz2eeJLCOHjLXH7T--45m0TTYaaszHCsJt6j6eRCdrHwFdZYpqERGK6ZVmORLp9W0U7R6gtWV1vwg_2lM3qj-A-bvp5ePwXuIEfwnu8RrIvsipIl8cTPh7TAhA82iqW`}
              />
            </div>
            <div className="aspect-3/4 rounded-xl overflow-hidden shadow-sm border border-outline-variant/30 mt-8">
              <img
                className="w-full h-full object-cover"
                alt="Macro view of golden linen saddle-stitching on cognac Tuscan leather with brass buckle detail"
                src={`${IMG}AB6AXuC47oAMbSlb-Ta_nctBwMdfjbZEirgMfji7twpygB_PyyRV2-dsySVSlTe0ojI7xkWCe_ocR68lvlSTb8OzjoJo3eDZ0YDXV-wHOFSX1SGXkhX6mWLiQb_unR-uq7HQssTNnvCRP8bH_fPzh9-mCjF5zk3hKwWQtk5AFP6hN9-Rd2be1FbkvCsQ0_xrE2P-qXG2XRP8DPUTnI3H141TSSkHIC0iBHfq3H-4MNa3ZOBB2MxxiFweELtm`}
              />
            </div>
          </div>
        </div>
      </section>

      <section id="in-the-atelier" className="max-w-360 w-full mx-auto px-margin md:px-margin-desktop py-24 scroll-mt-32">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-secondary font-label-sm text-label-sm uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-secondary" />
              <span>Batch Allocation Preview</span>
            </div>
            <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary">In The Atelier</h2>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-xl">
              Editions currently at the cutting and burnishing stage. Patrons can join the reserve registry for 24-hour
              priority before release.
            </p>
          </div>
          <Link
            className="font-label-md text-label-md uppercase tracking-wider text-secondary hover:text-primary transition-colors flex items-center gap-1 group pb-1"
            href="/#craftsmanship"
          >
            <span>Production Notes</span>
            <Icon name="arrow_forward" className="text-[18px] group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        <AtelierTeasers />
      </section>

      <section className="max-w-360 w-full mx-auto px-margin md:px-margin-desktop pb-16">
        <div className="bg-surface-container-low p-6 rounded-xl border border-outline-variant/30 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center gap-3">
            <Icon name="verified" className="text-secondary text-[24px]" />
            <div>
              <p className="font-label-md text-label-md uppercase tracking-wider text-primary">
                Guaranteed Transatlantic Delivery
              </p>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                All customs duties, tariffs, and shipping insurance are pre-paid by Vale &amp; Rawat.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="font-label-sm text-label-sm text-secondary uppercase">Courier Partners:</span>
            <span className="font-label-sm text-label-sm text-primary font-semibold">FedEx Express • DHL Global</span>
          </div>
        </div>
      </section>
    </div>
  );
}
