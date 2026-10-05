"use client";

import type { ContractArticle } from "@/lib/catalog";
import { actions } from "@/lib/store";
import { toast } from "../Toast";

function scrollToRfq() {
  document.getElementById("rfq-portal")?.scrollIntoView({ behavior: "smooth" });
}

export function ArticleActions({ article }: { article: ContractArticle }) {
  return (
    <div className="p-6 pt-0 flex gap-2">
      <button
        className="flex-1 bg-primary hover:bg-primary-container text-surface text-[11px] font-semibold tracking-wider uppercase py-2.5 rounded transition-all active:scale-95"
        type="button"
        onClick={() => {
          actions.addRfq(article.code);
          toast(`Added to RFQ: ${article.code} ${article.name}`);
          scrollToRfq();
        }}
      >
        Add to RFQ
      </button>
      <button
        className="border border-outline-variant/60 hover:border-primary text-primary px-3 py-2.5 rounded text-[11px] font-semibold transition-colors"
        title="Request Swatch Sample"
        type="button"
        onClick={() => {
          const label = `${article.code} (${article.sample})`;
          actions.setRfqNotes(
            `Please dispatch physical leather swatch kit for ${label} with certification paperwork. Target delivery address: `,
          );
          toast(`Physical swatch kit request initiated for ${label}. Dispatched via DHL.`);
          scrollToRfq();
        }}
      >
        Sample
      </button>
    </div>
  );
}
