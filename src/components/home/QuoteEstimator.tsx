"use client";

import { useState } from "react";
import {
  CONTRACT_ARTICLES,
  CUSTOMIZATIONS,
  QUOTE_SPREAD,
  estimateQuote,
  formatPrice,
  type CustomizationId,
} from "@/lib/catalog";
import { actions, useStore } from "@/lib/store";
import { Icon } from "../Icon";
import { toast } from "../Toast";

const LABEL = "block text-[11px] font-semibold uppercase tracking-wider text-on-surface mb-1.5";
const FIELD =
  "w-full bg-surface-container-low border border-outline-variant/40 rounded-sm px-3.5 py-2.5 text-xs text-on-surface focus:outline-none focus:border-primary";
const MULTIPLES = [1, 2, 5, 10];

const usd = (n: number) => formatPrice(n, n, "USD");
const range = (n: number) => `${usd(n * (1 - QUOTE_SPREAD))} – ${usd(n * (1 + QUOTE_SPREAD))}`;
const spec = (specs: [string, string][], match: RegExp) => specs.find(([label]) => match.test(label))?.[1] ?? "On request";

/** Indicative contract costing: article × volume × private-label options, handed to the RFQ form. */
export function QuoteEstimator() {
  const { rfqNotes } = useStore();
  const [code, setCode] = useState(CONTRACT_ARTICLES[0].code);
  const [qtyInput, setQtyInput] = useState(String(CONTRACT_ARTICLES[0].moq));
  const [options, setOptions] = useState<CustomizationId[]>([]);

  const article = CONTRACT_ARTICLES.find((a) => a.code === code) ?? CONTRACT_ARTICLES[0];
  const entered = Math.floor(Number(qtyInput)) || 0;
  const qty = Math.max(entered, article.moq);
  const quote = estimateQuote(article, qty, options);
  const chosen = CUSTOMIZATIONS.filter((c) => options.includes(c.id));

  function toggle(id: CustomizationId) {
    setOptions((o) => (o.includes(id) ? o.filter((x) => x !== id) : [...o, id]));
  }

  function sendAsRfq() {
    const line = `Estimate: ${article.code} ${article.name} × ${qty} ${article.unit}${
      chosen.length ? ` with ${chosen.map((c) => c.label).join(", ")}` : ""
    }. Indicative ${range(quote.unit)} per unit, ${range(quote.total)} total FOB Islamabad.`;
    actions.addRfq(article.code);
    actions.setRfqNotes(rfqNotes ? `${rfqNotes}\n${line}` : line);
    toast(`${article.code} estimate attached to your RFQ.`);
    document.getElementById("rfq-portal")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
      <div className="xl:col-span-7 bg-surface-container-lowest p-6 sm:p-8 rounded-lg border border-outline-variant/30 shadow-sm space-y-6">
        <div>
          <label className={LABEL} htmlFor="quote-article">
            Contract Article
          </label>
          <select
            className={FIELD}
            id="quote-article"
            value={code}
            onChange={(e) => {
              const next = CONTRACT_ARTICLES.find((a) => a.code === e.target.value) ?? CONTRACT_ARTICLES[0];
              setCode(next.code);
              setQtyInput(String(next.moq));
            }}
          >
            {CONTRACT_ARTICLES.map((a) => (
              <option key={a.code} value={a.code}>
                {a.code} · {a.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={LABEL} htmlFor="quote-qty">
            Order Volume ({article.unit})
          </label>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              className={`${FIELD} sm:w-40 font-mono`}
              id="quote-qty"
              inputMode="numeric"
              min={article.moq}
              type="number"
              value={qtyInput}
              onChange={(e) => setQtyInput(e.target.value)}
            />
            <div className="grid grid-cols-4 sm:flex gap-2" role="group" aria-label="Volume presets">
              {MULTIPLES.map((m) => {
                const value = article.moq * m;
                const active = entered === value;
                return (
                  <button
                    key={m}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setQtyInput(String(value))}
                    className={`whitespace-nowrap text-[11px] font-semibold uppercase tracking-wider px-1.5 sm:px-3 py-2 rounded-sm border transition-colors ${
                      active
                        ? "bg-primary text-surface border-primary"
                        : "bg-surface-container-low text-on-surface-variant border-outline-variant/40 hover:border-primary"
                    }`}
                  >
                    {m === 1 ? "MOQ" : `${m}×`} · {value.toLocaleString("en-US")}
                  </button>
                );
              })}
            </div>
          </div>
          {entered < article.moq && (
            <p className="text-[11px] text-error mt-1.5" role="status">
              Minimum order is {article.moq} {article.unit}; estimating at MOQ.
            </p>
          )}
        </div>

        <fieldset>
          <legend className={LABEL}>Private Label Options</legend>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-on-surface">
            {CUSTOMIZATIONS.map((c) => (
              <label
                key={c.id}
                className="flex items-start gap-2 bg-surface-container-low p-2.5 rounded cursor-pointer border border-outline-variant/20 hover:border-outline-variant"
              >
                <input
                  className="accent-primary cursor-pointer mt-0.5"
                  type="checkbox"
                  checked={options.includes(c.id)}
                  onChange={() => toggle(c.id)}
                />
                <span>
                  {c.label}
                  <span className="block text-[10px] text-on-surface-variant mt-0.5">
                    {c.perUnit ? `+${usd(c.perUnit)} / unit · ` : ""}
                    {usd(c.setup)} {c.setupLabel}
                  </span>
                </span>
              </label>
            ))}
          </div>
        </fieldset>
      </div>

      <div
        className="xl:col-span-5 xl:sticky xl:top-32 bg-primary text-surface p-6 sm:p-8 rounded-lg shadow-xl space-y-5"
        aria-live="polite"
      >
        <div className="flex items-center justify-between gap-3">
          <span className="text-[11px] font-semibold tracking-eyebrow uppercase text-secondary-container">
            Indicative Estimate
          </span>
          <span className="whitespace-nowrap text-[10px] uppercase tracking-wider font-semibold bg-primary-container border border-secondary-container/40 text-secondary-container px-2 py-0.5 rounded">
            {quote.discount ? `−${Math.round(quote.discount * 100)}% volume tier` : "MOQ pricing"}
          </span>
        </div>
        <div>
          <p className="text-[11px] uppercase tracking-wider text-surface-dim/80">Per Unit</p>
          <p className="font-headline text-3xl sm:text-4xl text-surface-bright leading-tight">{range(quote.unit)}</p>
        </div>
        <dl className="space-y-2 text-xs border-t border-surface/15 pt-4">
          {[
            ["Order volume", `${qty.toLocaleString("en-US")} ${article.unit}`],
            ["One-off tooling", quote.setup ? usd(quote.setup) : "None"],
            ["Order total", range(quote.total)],
            ["Sample lead time", spec(article.specs, /sample/i)],
            ["Production lead time", spec(article.specs, /production/i)],
          ].map(([label, value]) => (
            <div key={label} className="flex justify-between gap-4">
              <dt className="shrink-0 whitespace-nowrap text-surface-dim/80">{label}</dt>
              <dd className="font-semibold text-right text-surface-bright">{value}</dd>
            </div>
          ))}
        </dl>
        <button
          className="w-full bg-secondary-container text-primary hover:bg-secondary-fixed-dim transition-all active:scale-95 text-xs font-semibold tracking-eyebrow uppercase py-4 rounded-sm shadow flex items-center justify-center gap-2"
          type="button"
          onClick={sendAsRfq}
        >
          <Icon name="request_quote" className="text-[18px]" />
          Send This Estimate as an RFQ
        </button>
        <p className="text-[11px] text-surface-dim/80 font-light leading-relaxed">
          FOB Islamabad, excluding freight and duties. Indicative ±{Math.round(QUOTE_SPREAD * 100)}%; your confirmed
          factory costing follows within 24 hours of the RFQ.
        </p>
      </div>
    </div>
  );
}
