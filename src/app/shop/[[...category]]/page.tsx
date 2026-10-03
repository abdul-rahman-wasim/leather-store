import type { Metadata } from "next";
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

      <section className="w-full bg-surface-container-high py-space-xl my-space-lg">
        <div className="max-w-360 mx-auto px-margin md:px-margin-desktop grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-center">
          <div className="lg:col-span-5 space-y-space-md">
            <span className="font-label-sm text-label-sm uppercase tracking-[0.2em] text-secondary">
              The Scottish &amp; Tuscan Thread
            </span>
            <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface">
              Formed by patient hands, never stamped in haste.
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Every hide selected by Velluto &amp; Hide undergoes a sixty-day conditioning period in organic bark
              extracts before being skived and saddle-stitched by hand in our Edinburgh and London mews.
            </p>
            <div className="flex items-center gap-space-lg pt-space-xs">
              {[
                ["100%", "Vegetable Tanned"],
                ["0%", "Synthetic Core"],
                ["Lifetime", "Stitch Guarantee"],
              ].map(([value, label]) => (
                <div key={label}>
                  <p className="font-headline-sm text-headline-sm text-primary">{value}</p>
                  <p className="font-label-sm text-label-sm text-secondary uppercase">{label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-7 grid grid-cols-2 gap-space-md">
            <div className="aspect-3/4 rounded-xl overflow-hidden shadow-sm">
              <img
                className="w-full h-full object-cover"
                alt="Artisan hand-beveling the edges of full-grain saddle leather in a sunlit Scottish workshop"
                src={`${IMG}AB6AXuAbqZvDv7s9Y6QMCtFSDT-FECMFfRbtOmKT_j8m7E-wiY_2xBz1cJ6RoKixRDPfgTLIfiKEMtVRMMFbMopk-UPthP6RXmgzotMuegVBiANGfjDTUEur149QgMz2eeJLCOHjLXH7T--45m0TTYaaszHCsJt6j6eRCdrHwFdZYpqERGK6ZVmORLp9W0U7R6gtWV1vwg_2lM3qj-A-bvp5ePwXuIEfwnu8RrIvsipIl8cTPh7TAhA82iqW`}
              />
            </div>
            <div className="aspect-3/4 rounded-xl overflow-hidden shadow-sm mt-space-md">
              <img
                className="w-full h-full object-cover"
                alt="Macro view of golden linen saddle-stitching on cognac Tuscan leather with brass buckle detail"
                src={`${IMG}AB6AXuC47oAMbSlb-Ta_nctBwMdfjbZEirgMfji7twpygB_PyyRV2-dsySVSlTe0ojI7xkWCe_ocR68lvlSTb8OzjoJo3eDZ0YDXV-wHOFSX1SGXkhX6mWLiQb_unR-uq7HQssTNnvCRP8bH_fPzh9-mCjF5zk3hKwWQtk5AFP6hN9-Rd2be1FbkvCsQ0_xrE2P-qXG2XRP8DPUTnI3H141TSSkHIC0iBHfq3H-4MNa3ZOBB2MxxiFweELtm`}
              />
            </div>
          </div>
        </div>
      </section>

      <section id="in-the-atelier" className="max-w-360 w-full mx-auto px-margin md:px-margin-desktop py-space-xl scroll-mt-32">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md mb-space-lg">
          <div>
            <div className="flex items-center gap-space-xs text-tertiary mb-1">
              <Icon name="engineering" className="text-[18px]" />
              <span className="font-label-sm text-label-sm uppercase tracking-widest font-semibold">
                Prototyping &amp; Next Batch
              </span>
            </div>
            <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface">In The Atelier</h2>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-xl">
              Limited editions currently undergoing wear-testing and hand-finishing. Reserve your priority allocation
              before public release.
            </p>
          </div>
        </div>
        <AtelierTeasers />
      </section>

      <section className="max-w-360 w-full mx-auto px-margin md:px-margin-desktop py-space-xl flex flex-col items-center gap-space-lg">
        <div className="max-w-2xl text-center bg-surface-container-low p-space-md rounded-xl space-y-space-xs">
          <div className="flex items-center justify-center gap-space-xs text-primary">
            <Icon name="local_shipping" className="text-[20px]" />
            <span className="font-label-sm text-label-sm uppercase tracking-widest font-semibold">
              Priority Courier Guarantee
            </span>
          </div>
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            All orders bound for the United States, England, and Scotland are dispatched via insured
            temperature-monitored courier with all duties, customs fees, and local VAT pre-settled by our Mayfair &amp;
            Edinburgh workshops.
          </p>
        </div>
      </section>
    </div>
  );
}
