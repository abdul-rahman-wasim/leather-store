"use client";

import emailjs from "@emailjs/browser";
import { useRef, useState, type FormEvent } from "react";
import { CONTRACT_ARTICLES, TRADE_DESK } from "@/lib/catalog";
import { actions, useStore } from "@/lib/store";
import { Icon } from "../Icon";
import { toast } from "../Toast";
import { WhatsAppLink } from "../WhatsAppLink";
import { Recaptcha, type RecaptchaHandle } from "./Recaptcha";

const EMAILJS = {
  serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
  templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
  publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
};
const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

const DESTINATIONS = [
  { value: "UK", label: "United Kingdom (Heathrow / Tilbury DDP)" },
  { value: "US", label: "United States (JFK / Chicago / LAX DDP)" },
  { value: "EU", label: "European Union (Frankfurt / Rotterdam)" },
  { value: "ME", label: "Middle East (Dubai / Riyadh)" },
  { value: "AU", label: "Australia / New Zealand" },
  { value: "OTHER", label: "Other International Port" },
];

const VOLUMES = [
  { value: "pilot", label: "Trial Run (25 – 50 Units per Silhouette)" },
  { value: "mid", label: "Commercial Volume (50 – 250 Units)" },
  { value: "high", label: "Wholesale Contract (250 – 1,000 Units)" },
  { value: "annual", label: "Enterprise Annual Agreement (1,000+ Units)" },
];

const CUSTOMIZATIONS = [
  "Blind Deboss / Hot-Foil Brand Monogram",
  "Custom Sand-Cast Brass Mold Casting",
  "Custom Woven Neck / Interior Fabric Label",
  "Bespoke Lasting / Anatomical Wooden Molds",
];

const ASSURANCES = [
  {
    icon: "verified",
    title: "Guaranteed 24-Hour Turnaround:",
    text: "Direct engineering assessment with Bill of Materials (BOM) cost sheet.",
  },
  {
    icon: "layers",
    title: "Physical Leather Swatch Kits:",
    text: "Dispatched via DHL Express from Islamabad with certified REACH certificates.",
  },
  {
    icon: "lock",
    title: "Strict Non-Disclosure Guarantee:",
    text: "All CAD files and custom tech packs protected under international IP law.",
  },
];

const LABEL = "block text-[11px] font-semibold uppercase tracking-wider text-on-surface mb-1.5";
const FIELD =
  "w-full bg-surface-container-low border border-outline-variant/40 rounded-sm px-3.5 py-2.5 text-xs text-on-surface focus:outline-none focus:border-primary";

const labelOf = (list: { value: string; label: string }[], value: FormDataEntryValue | null) =>
  list.find((o) => o.value === value)?.label ?? String(value ?? "");

export function RfqPortal() {
  const { rfq, rfqNotes } = useStore();
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [error, setError] = useState<string | null>(null);
  const [captcha, setCaptcha] = useState<string | null>(null);
  const captchaRef = useRef<RecaptchaHandle>(null);
  const items = CONTRACT_ARTICLES.filter((a) => rfq.includes(a.code));

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const { serviceId, templateId, publicKey } = EMAILJS;
    if (!serviceId || !templateId || !publicKey || !RECAPTCHA_SITE_KEY) {
      setError(`The online RFQ desk is offline. Please email your specification to ${TRADE_DESK.email}.`);
      return;
    }
    if (!captcha) {
      setError("Please confirm you are not a robot before submitting.");
      return;
    }
    const data = new FormData(form);
    const company = String(data.get("company") ?? "");
    setError(null);
    setStatus("sending");
    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          company,
          reply_to: data.get("email"),
          region: labelOf(DESTINATIONS, data.get("region")),
          volume: labelOf(VOLUMES, data.get("volume")),
          customizations: data.getAll("customizations").join(", ") || "None",
          articles: items.map((a) => `${a.code}: ${a.name} (MOQ ${a.moq} ${a.unit})`).join("\n") || "None selected",
          notes: rfqNotes || "—",
          "g-recaptcha-response": captcha,
        },
        { publicKey },
      );
      setStatus("sent");
      toast(`Quotation inquiry lodged for ${company}. Factory costing follows within 24 hours.`);
      form.reset();
      actions.clearRfq();
    } catch {
      setStatus("idle");
      setError(`We couldn't transmit your RFQ. Please try again or email ${TRADE_DESK.email}.`);
    } finally {
      captchaRef.current?.reset();
    }
  }

  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-12 items-start">
      <div className="xl:col-span-5 space-y-6">
        <div>
          <span className="text-xs font-semibold tracking-eyebrow uppercase text-accent-saddle block mb-2">
            Direct Contract Procurement
          </span>
          <h2 className="font-headline text-3xl sm:text-4xl text-on-surface font-normal">
            Request Industrial Quotation &amp; Swatch Kits
          </h2>
          <p className="text-on-surface-variant text-sm font-light mt-3 leading-relaxed">
            Partner directly with our Islamabad cutting and lasting floors. We provide complete factory costing within 24
            hours including FOB Karachi, CIF Heathrow, and DDP Continental United States.
          </p>
        </div>
        <div className="bg-surface-container-lowest p-6 rounded-lg border border-outline-variant/30 saddle-stitch">
          <div className="flex items-center justify-between gap-2 pb-3 border-b border-outline-variant/20 mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">Your Selected RFQ Articles</span>
            <span className="shrink-0 whitespace-nowrap text-[10px] bg-surface-container-high px-2 py-0.5 rounded text-accent-saddle font-bold">
              {items.length} Item{items.length === 1 ? "" : "s"} Attached
            </span>
          </div>
          <ul className="text-xs space-y-2 text-on-surface-variant">
            {items.map((a) => (
              <li
                key={a.code}
                className="flex justify-between items-center gap-3 bg-surface-container-low p-2 rounded border border-outline-variant/20"
              >
                <span>
                  {a.code}: {a.name}
                </span>
                <span className="flex items-center gap-3 shrink-0">
                  <span className="font-semibold text-primary">
                    MOQ {a.moq} {a.unit}
                  </span>
                  <button
                    aria-label={`Remove ${a.code} from RFQ`}
                    className="text-outline hover:text-error"
                    type="button"
                    onClick={() => actions.removeRfq(a.code)}
                  >
                    <Icon name="close" className="text-[14px]" />
                  </button>
                </span>
              </li>
            ))}
          </ul>
          <p className="text-[11px] text-on-surface-variant/70 italic mt-3">
            Click &apos;Add to RFQ&apos; on any article card above to attach specifications.
          </p>
        </div>
        <div className="space-y-3 text-xs text-on-surface-variant font-light">
          {ASSURANCES.map((a) => (
            <div key={a.icon} className="flex items-start gap-2.5">
              <Icon name={a.icon} className="text-[18px] text-secondary mt-0.5" />
              <span>
                <strong>{a.title}</strong> {a.text}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="xl:col-span-7 bg-surface-container-lowest p-8 sm:p-10 rounded-lg border border-outline-variant/30 shadow-md">
        <form className="space-y-5" onSubmit={submit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-end">
            <div>
              <label className={LABEL} htmlFor="rfq-company">
                Company / Brand Legal Name *
              </label>
              <input
                className={FIELD}
                id="rfq-company"
                name="company"
                placeholder="e.g. Mayfair Saddlery Ltd."
                required
                type="text"
              />
            </div>
            <div>
              <label className={LABEL} htmlFor="rfq-email">
                Corporate Procurement Email *
              </label>
              <input
                className={FIELD}
                id="rfq-email"
                name="email"
                placeholder="procurement@brand.com"
                required
                type="email"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-end">
            <div>
              <label className={LABEL} htmlFor="rfq-region">
                Destination Country / Port of Entry *
              </label>
              <select className={FIELD} id="rfq-region" name="region" required>
                {DESTINATIONS.map((d) => (
                  <option key={d.value} value={d.value}>
                    {d.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className={LABEL} htmlFor="rfq-volume">
                Anticipated Run Volume / Lot *
              </label>
              <select className={FIELD} id="rfq-volume" name="volume" required>
                {VOLUMES.map((v) => (
                  <option key={v.value} value={v.value}>
                    {v.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <fieldset>
            <legend className="block text-[11px] font-semibold uppercase tracking-wider text-on-surface mb-2">
              Required Private Label Customizations
            </legend>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-on-surface">
              {CUSTOMIZATIONS.map((c, i) => (
                <label
                  key={c}
                  className="flex items-center gap-2 bg-surface-container-low p-2 rounded cursor-pointer border border-outline-variant/20 hover:border-outline-variant"
                >
                  <input
                    className="accent-primary cursor-pointer"
                    defaultChecked={i === 0}
                    name="customizations"
                    type="checkbox"
                    value={c}
                  />
                  <span>{c}</span>
                </label>
              ))}
            </div>
          </fieldset>
          <div>
            <label className={LABEL} htmlFor="rfq-notes">
              Project Specifications, Leather Type &amp; Requirements
            </label>
            <textarea
              className={`${FIELD} p-3 resize-none h-24`}
              id="rfq-notes"
              name="notes"
              placeholder="Specify required hide thickness (e.g. 1.2mm calfskin vs 3.5mm bridle), hardware finish (antique brass or polished nickel), and desired target delivery timeline..."
              value={rfqNotes}
              onChange={(e) => actions.setRfqNotes(e.target.value)}
            />
          </div>
          <div className="flex items-start gap-2 p-3 bg-surface-container-low rounded border border-dashed border-outline-variant/60 text-xs text-on-surface-variant">
            <Icon name="attach_file" className="text-[18px] text-accent-saddle shrink-0" />
            <span>
              Tech packs &amp; vector CAD (.pdf, .ai, .zip): reply to our confirmation email or send them to{" "}
              <a className="text-accent-saddle font-semibold hover:underline" href={`mailto:${TRADE_DESK.email}`}>
                {TRADE_DESK.email}
              </a>
              .
            </span>
          </div>
          {RECAPTCHA_SITE_KEY && <Recaptcha ref={captchaRef} siteKey={RECAPTCHA_SITE_KEY} onToken={setCaptcha} />}
          <button
            className={`w-full text-surface transition-all duration-200 active:scale-95 text-xs font-semibold tracking-eyebrow uppercase py-4 rounded-sm shadow-md flex items-center justify-center gap-2 disabled:cursor-default ${
              status === "idle" ? "bg-primary hover:bg-primary-container" : "bg-secondary"
            }`}
            type="submit"
            disabled={status !== "idle"}
            aria-live="polite"
          >
            <Icon
              name={status === "idle" ? "send" : status === "sending" ? "progress_activity" : "check_circle"}
              className={`text-[18px] text-secondary-container ${status === "sending" ? "animate-spin" : ""}`}
            />
            <span>
              {status === "idle"
                ? "Submit RFQ for Guaranteed 24h Factory Costing"
                : status === "sending"
                  ? "Transmitting RFQ…"
                  : "RFQ Received • 24h Costing Initiated"}
            </span>
          </button>
          {error && (
            <p role="alert" className="text-xs text-error flex items-start gap-1.5">
              <Icon name="error" className="text-[16px] shrink-0" />
              {error}
            </p>
          )}
          <p className="text-xs text-on-surface-variant text-center">
            Prefer WhatsApp?{" "}
            <WhatsAppLink className="inline-flex items-center gap-1 font-semibold text-accent-saddle hover:underline">
              <Icon name="chat" className="text-[15px]" />
              {items.length ? "Send these articles to the export desk" : "Message the export desk"}
            </WhatsAppLink>
          </p>
        </form>
      </div>
    </div>
  );
}
