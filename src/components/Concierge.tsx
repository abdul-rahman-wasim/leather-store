"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";
import { CONCIERGE_AVATAR_SRC, HARNESS_SLUG, PRODUCTS, formatPrice } from "@/lib/catalog";
import { actions, useStore } from "@/lib/store";
import { Icon } from "./Icon";

type Card = "harness" | "courier" | "monogram" | "balm";

type MessageBody =
  | { kind: "patron" | "artisan" | "notice"; text: string }
  | { kind: "card"; card: Card };

type Message = MessageBody & { id: number };

const ARTISAN = "Alistair Finch-Hatton";

const QUICK_PROMPTS = [
  { icon: "pets", text: "Dog Sizing Calculator" },
  { icon: "flight_takeoff", text: "US & Scotland Delivery" },
  { icon: "stylus_note", text: "Bespoke Monogramming" },
  { icon: "sanitizer", text: "Leather Balm Care" },
];

// Scripted replies, matched in order on whole words
const TOPICS: { match: RegExp; reply: Card | string }[] = [
  { match: /\b(harness|dogs?|canine|sizes?|sizing|breeds?|hounds?|puppy|chest)\b/i, reply: "harness" },
  { match: /\b(ship|shipping|courier|us|usa|uk|scotland|delivery|deliver|dispatch|customs)\b/i, reply: "courier" },
  { match: /\b(monogram|monogramming|stamp|deboss|initials?|engrave|personali[sz]e)\b/i, reply: "monogram" },
  { match: /\b(care|wax|beeswax|balm|clean|cleaning|oil|condition)\b/i, reply: "balm" },
  {
    match: /\b(boots?|shoes?|footwear|derby|loafers?)\b/i,
    reply:
      "Our Goodyear storm-welted footwear uses French full-grain calf and channel-carved oak bark soles. We provide half-sizes from US 7–14 (UK 6–13). If you are between widths, we recommend sizing half a notch down as the natural cork footbed moulds precisely to your foot arch within 3–4 outings.",
  },
  {
    match: /\b(jackets?|outerwear|aviator|moto|coat)\b/i,
    reply:
      "Each bespoke aviator jacket is drafted on Savile Row patterns using Tuscan lambskin. We invite patrons for an in-person measurement at Mayfair or Edinburgh, or we can dispatch an atelier fit kit with swatch leather samples.",
  },
];

function replyTo(query: string): Card | string {
  return (
    TOPICS.find((t) => t.match.test(query))?.reply ??
    `Thank you for noting this regarding “${query}”. I have recorded your inquiry in our Edinburgh bench daybook. I would be delighted to draft specific measurement options or reserve hides from our Santa Croce lot for your order.`
  );
}

/** Current UTC time as "HH:MM GMT". Null until mounted, so server and client markup match. */
function useGmtClock() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const pad = (n: number) => String(n).padStart(2, "0");
    const tick = () => {
      const now = new Date();
      setTime(`${pad(now.getUTCHours())}:${pad(now.getUTCMinutes())} GMT`);
    };
    const first = setTimeout(tick, 0);
    const id = setInterval(tick, 30000);
    return () => {
      clearTimeout(first);
      clearInterval(id);
    };
  }, []);

  return time ?? "--:-- GMT";
}

function ArtisanAvatar() {
  return (
    <div className="w-8 h-8 rounded-full bg-primary-container text-secondary-container shrink-0 flex items-center justify-center text-[10px] font-headline border border-gold/50 mt-1 shadow-sm">
      AF
    </div>
  );
}

function ArtisanMessage({ role, children }: { role: string; children: ReactNode }) {
  return (
    <div className="flex items-start gap-2.5 max-w-[95%]">
      <ArtisanAvatar />
      <div className="space-y-1.5 w-full min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-on-surface font-semibold">{ARTISAN}</span>
          <span className="text-[9px] text-secondary uppercase tracking-wider font-medium">{role}</span>
        </div>
        {children}
      </div>
    </div>
  );
}

const HARNESS = PRODUCTS.find((p) => p.href === `/products/${HARNESS_SLUG}`)!;
const HARNESS_SHADES = ["Cognac Saddle Tan", "Espresso Tuscan Hide", "Highland Forest Bark"];

function HarnessCard() {
  const [shade, setShade] = useState(0);
  const [reserved, setReserved] = useState(false);

  function reserve() {
    actions.addItem({
      productId: HARNESS.id,
      name: HARNESS.name,
      collection: HARNESS.collection,
      image: HARNESS.image,
      imageAlt: HARNESS.imageAlt,
      priceUsd: HARNESS.priceUsd,
      priceGbp: HARNESS.priceGbp,
      material: HARNESS.material,
      details: [
        { label: "Harness Shade", value: HARNESS_SHADES[shade] },
        { label: "Dimension", value: "Large (28-36 in)" },
      ],
    });
    setReserved(true);
  }

  return (
    <div className="bg-surface-container-lowest saddle-stitch p-4 rounded-xl shadow-md space-y-3">
      <div className="flex items-start justify-between gap-2 border-b border-outline-variant/40 pb-2.5">
        <div>
          <span className="text-[9px] uppercase tracking-wider text-secondary font-semibold block">Artisan Recommendation</span>
          <h3 className="font-headline text-base text-on-surface font-normal">{HARNESS.name}</h3>
        </div>
        <span className="text-xs font-semibold text-primary shrink-0">
          {formatPrice(HARNESS.priceUsd, HARNESS.priceGbp, "USD")} • {formatPrice(HARNESS.priceUsd, HARNESS.priceGbp, "GBP")}
        </span>
      </div>
      <p className="text-xs text-on-surface-variant font-light leading-relaxed">
        Padded Tuscan calfskin chest shield designed to prevent tracheal collapse. For sporting breeds (Labradors, Setters,
        Pointers) we recommend <strong className="font-semibold text-on-surface">Size L (28–36” ribcage girth)</strong>.
      </p>
      <div className="bg-surface-container-low p-2.5 rounded-lg border border-outline-variant/50 space-y-1.5">
        <div className="flex items-center justify-between gap-2 text-[10px]">
          <span className="text-on-surface-variant uppercase tracking-wider font-semibold">Tanned Leather:</span>
          <span className="font-medium text-primary">{HARNESS_SHADES[shade]}</span>
        </div>
        <div className="flex items-center gap-3 pt-1" role="radiogroup" aria-label="Tanned leather">
          {HARNESS.swatches.map((hex, i) => (
            <button
              key={hex}
              role="radio"
              aria-checked={i === shade}
              title={HARNESS_SHADES[i]}
              className={`w-6 h-6 rounded-full shadow-sm transition-all ${
                i === shade ? "ring-2 ring-secondary scale-110" : "hover:scale-105"
              }`}
              style={{ backgroundColor: hex }}
              type="button"
              onClick={() => setShade(i)}
            >
              <span className="sr-only">{HARNESS_SHADES[i]}</span>
            </button>
          ))}
        </div>
      </div>
      <button
        className="w-full bg-primary hover:bg-primary-container text-secondary-container text-[10px] tracking-eyebrow uppercase font-semibold py-2.5 px-3 rounded shadow-xs flex items-center justify-center gap-1.5 active:scale-95 transition-all"
        type="button"
        aria-live="polite"
        onClick={reserve}
      >
        <Icon name={reserved ? "check_circle" : "bookmark_added"} className="text-[14px]" />
        <span>{reserved ? "Reserved to Satchel" : "Reserve Sizing to Satchel"}</span>
      </button>
    </div>
  );
}

function CourierCard() {
  return (
    <div className="bg-surface-container-lowest saddle-stitch p-4 rounded-xl shadow-md space-y-3">
      <div className="flex items-center justify-between gap-2 border-b border-outline-variant/40 pb-2">
        <div className="flex items-center gap-2">
          <Icon name="verified" className="text-secondary text-[18px]" />
          <h3 className="font-headline text-base text-on-surface">Transatlantic Priority Dispatch</h3>
        </div>
        <span className="text-[9px] uppercase tracking-wider text-on-secondary-container bg-secondary-container/50 font-semibold px-2 py-0.5 rounded-full shrink-0">
          Duties Prepaid
        </span>
      </div>
      <div className="grid grid-cols-2 gap-2 text-xs">
        {[
          ["United States (DHL Air)", "2–3 Days Priority", "Customs pre-cleared, no tariffs owed at delivery."],
          ["Scotland & UK", "Next Business Day", "Royal Mail Special Tracked or Edinburgh mews collection."],
        ].map(([region, eta, note]) => (
          <div key={region} className="bg-surface-container-low p-2.5 rounded border border-outline-variant/40">
            <span className="text-[9px] uppercase font-semibold text-secondary block">{region}</span>
            <p className="font-semibold text-on-surface mt-0.5">{eta}</p>
            <p className="text-[10px] text-on-surface-variant font-light">{note}</p>
          </div>
        ))}
      </div>
      <p className="text-[11px] text-on-surface-variant italic font-light">
        Dispatched in our signature waxed presentation case with a complimentary jar of Highland beeswax hide conditioner.
      </p>
    </div>
  );
}

function MonogramCard() {
  return (
    <div className="bg-surface-container-lowest saddle-stitch p-4 rounded-xl shadow-md space-y-2.5">
      <div className="flex items-center justify-between gap-2 border-b border-outline-variant/40 pb-2">
        <h3 className="font-headline text-base text-on-surface">Complimentary Blind Hot-Stamping</h3>
        <span className="text-[9px] font-semibold tracking-wider uppercase text-secondary shrink-0">Savile Row Typeface</span>
      </div>
      <p className="text-xs text-on-surface-variant font-light leading-relaxed">
        We stamp up to 3 Roman capital letters without gold leaf or synthetic foils—yielding a crisp, permanent indentation
        in the natural grain that darkens beautifully with age.
      </p>
      <div className="bg-surface-container p-2.5 rounded text-xs flex items-center justify-between gap-2 border border-outline-variant/50">
        <span className="text-on-surface font-mono font-bold tracking-widest text-sm">“A . F . H”</span>
        <span className="text-[10px] text-on-surface-variant uppercase font-medium">Applied to Sternum Shield</span>
      </div>
      <p className="text-[10px] text-on-surface-variant font-light">
        Simply mention your desired letters in your order notes or reply right here in chat.
      </p>
    </div>
  );
}

function BalmCard() {
  const { currency } = useStore();
  return (
    <div className="bg-surface-container-lowest saddle-stitch p-4 rounded-xl shadow-md space-y-2">
      <h3 className="font-headline text-base text-on-surface">Atelier Beeswax &amp; Sweet Almond Regimen</h3>
      <p className="text-xs text-on-surface-variant font-light leading-relaxed">
        Because our hides undergo 60-day vegetable tanning rather than toxic chrome dipping, they thrive on organic
        nutrients. Buff sparingly with our beeswax paste once each autumn and spring.
      </p>
      <div className="flex items-center gap-2 pt-1 text-[11px] text-primary font-semibold">
        <Icon name="check_circle" className="text-[16px] text-secondary" />
        <span>Included with all orders over {formatPrice(150, 120, currency)}</span>
      </div>
    </div>
  );
}

const CARDS: Record<Card, () => ReactNode> = {
  harness: HarnessCard,
  courier: CourierCard,
  monogram: MonogramCard,
  balm: BalmCard,
};

export function Concierge() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [draft, setDraft] = useState("");
  const [typing, setTyping] = useState(false);
  const clock = useGmtClock();
  const streamRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const nextId = useRef(0);
  const replyTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(replyTimer.current), []);

  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => inputRef.current?.focus(), 200);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(t);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  useEffect(() => {
    const el = streamRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, typing]);

  function push(message: MessageBody) {
    setMessages((m) => [...m, { ...message, id: nextId.current++ }]);
  }

  function respond(reply: Card | string) {
    setTyping(true);
    clearTimeout(replyTimer.current);
    replyTimer.current = setTimeout(() => {
      setTyping(false);
      push(reply in CARDS ? { kind: "card", card: reply as Card } : { kind: "artisan", text: reply });
    }, 750);
  }

  function send(text: string) {
    const query = text.trim();
    if (!query) return;
    push({ kind: "patron", text: query });
    respond(replyTo(query));
  }

  function attach(file: File) {
    push({ kind: "patron", text: `Attached: ${file.name}` });
    respond(
      "Thank you — I have pinned your sizing sheet to the Edinburgh bench ledger. Our head cutter will cross-reference it against this week's hide lot and confirm your pattern shortly.",
    );
  }

  return (
    <>
      <div
        id="atelier-concierge"
        role="dialog"
        aria-label="Atelier Concierge"
        aria-hidden={!open}
        inert={!open}
        className={`fixed bottom-24 right-4 sm:right-8 z-50 w-105 max-w-[calc(100vw-1.5rem)] h-165 max-h-[calc(100dvh-7.5rem)] bg-surface/95 backdrop-blur-2xl rounded-2xl shadow-[0_25px_60px_-15px_color-mix(in_srgb,var(--color-primary)_38%,transparent)] border border-gold/40 overflow-hidden flex flex-col origin-bottom-right transition-all duration-300 ${
          open ? "scale-100 opacity-100 animate-envelope-open" : "scale-95 opacity-0 pointer-events-none"
        }`}
      >
        <div className="h-1.5 w-full shrink-0 bg-linear-to-r from-primary via-secondary to-primary border-b border-gold/30" />

        <div className="bg-primary text-surface px-5 py-4 border-b border-gold/30 select-none">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3.5 min-w-0">
              <div className="relative shrink-0">
                <div className="w-12 h-12 rounded-full p-0.5 bg-linear-to-br from-secondary-container via-gold to-secondary shadow-lg">
                  <div className="w-full h-full rounded-full bg-primary-container overflow-hidden border border-primary">
                    <img className="w-full h-full object-cover" alt="Portrait of Alistair Finch-Hatton, master leatherwright" src={CONCIERGE_AVATAR_SRC} />
                  </div>
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-secondary-container border-2 border-primary flex items-center justify-center shadow-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                </span>
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <h2 className="font-headline text-[17px] text-surface leading-tight font-normal">{ARTISAN}</h2>
                  <Icon name="verified" className="text-[15px] text-secondary-container" />
                </div>
                <p className="text-[10px] tracking-eyebrow uppercase text-secondary-container font-semibold mt-0.5">
                  Master Leatherwright &amp; Sizing Specialist
                </p>
                <div className="flex flex-wrap items-center gap-2 mt-1 text-[9px] text-surface-dim/85">
                  <span className="inline-flex items-center gap-1 bg-primary-container px-2 py-0.5 rounded-full border border-secondary/40">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary-container inline-block animate-pulse" />
                    <span className="tabular-nums">Edinburgh Bench • {clock}</span>
                  </span>
                  <span className="text-secondary-container/80 font-medium">No. 14 Savile Row</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1 text-surface-dim/80 shrink-0">
              <button
                aria-label="Minimize chat"
                className="p-1 hover:text-surface transition-colors rounded hover:bg-surface/10"
                type="button"
                onClick={() => setOpen(false)}
              >
                <Icon name="expand_more" className="text-[19px]" />
              </button>
              <button
                aria-label="Close chat"
                className="p-1 hover:text-surface transition-colors rounded hover:bg-surface/10"
                type="button"
                onClick={() => setOpen(false)}
              >
                <Icon name="close" className="text-[19px]" />
              </button>
            </div>
          </div>
          <div className="mt-3 pt-2.5 border-t border-secondary/30 flex items-center justify-between gap-2 text-[10px]">
            <span className="text-surface-dim/80 font-light flex items-center gap-1">
              <Icon name="deskphone" className="text-[13px] text-secondary-container" />
              Need phone fitting guidance?
            </span>
            <button
              className="text-secondary-container hover:text-surface uppercase tracking-wider text-[9px] font-semibold underline underline-offset-2 transition-colors"
              type="button"
              onClick={() =>
                push({
                  kind: "notice",
                  text: "Callback request logged. Alistair's assistant will contact you within 2 business hours.",
                })
              }
            >
              Request Workshop Callback
            </button>
          </div>
        </div>

        <div
          ref={streamRef}
          className="flex-1 overflow-y-auto p-4 space-y-4 text-xs concierge-scrollbar bg-surface/90"
          aria-live="polite"
        >
          <div className="flex items-center justify-center my-1">
            <span className="text-[9px] uppercase tracking-[0.2em] text-on-surface-variant/75 bg-surface-container-high/90 px-3 py-1 rounded-full border border-outline-variant/60 shadow-2xs font-semibold text-center">
              Edinburgh New Town Atelier • Live Workbench Ledger
            </span>
          </div>

          <ArtisanMessage role="Head Cutter">
            <div className="bg-surface-container-lowest saddle-stitch text-on-surface p-4 rounded-2xl rounded-tl-sm shadow-sm leading-relaxed">
              <p className="mb-2">
                Good day. I am currently at the Edinburgh bench inspecting our newest lot of Tuscan vegetable-tanned hides
                and bridle leathers.
              </p>
              <p className="text-on-surface-variant font-light">
                I can calculate bespoke sizing for your hound&apos;s harness, confirm US/UK tracked courier transit, or
                arrange traditional blind debossing with your estate initials.
              </p>
            </div>
          </ArtisanMessage>

          <div className="space-y-2 pt-1 pl-10">
            <span className="text-[10px] tracking-wider uppercase text-secondary font-semibold block">
              Artisan Quick Guidance:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {QUICK_PROMPTS.map((p) => (
                <button
                  key={p.text}
                  className="bg-surface-container hover:bg-surface-container-high border border-outline-variant hover:border-secondary text-on-surface px-3 py-1.5 rounded-full text-[11px] transition-all text-left shadow-2xs active:scale-95 flex items-center gap-1.5 group"
                  type="button"
                  onClick={() => send(p.text)}
                >
                  <Icon name={p.icon} className="text-[14px] text-secondary group-hover:scale-110 transition-transform" />
                  <span>{p.text}</span>
                </button>
              ))}
            </div>
          </div>

          {messages.map((m) => {
            switch (m.kind) {
              case "patron":
                return (
                  <div key={m.id} className="flex justify-end max-w-[90%] ml-auto">
                    <div className="text-right">
                      <span className="text-[9px] text-on-surface-variant font-medium mb-1 block">Patron</span>
                      <div className="bg-primary text-surface p-3.5 rounded-2xl rounded-tr-sm shadow-md leading-relaxed text-left border border-secondary/40 wrap-break-word">
                        {m.text}
                      </div>
                    </div>
                  </div>
                );
              case "artisan":
                return (
                  <ArtisanMessage key={m.id} role="Head Cutter">
                    <div className="bg-surface-container-lowest saddle-stitch p-3.5 rounded-2xl rounded-tl-sm shadow-sm leading-relaxed text-on-surface font-light">
                      {m.text}
                    </div>
                  </ArtisanMessage>
                );
              case "card": {
                const CardBody = CARDS[m.card];
                return (
                  <ArtisanMessage key={m.id} role="Bespoke Fit Card">
                    <CardBody />
                  </ArtisanMessage>
                );
              }
              case "notice":
                return (
                  <div key={m.id} className="flex items-center justify-center">
                    <span className="flex items-center gap-1.5 text-[10px] text-on-surface-variant bg-surface-container px-3 py-1.5 rounded-full border border-outline-variant/50 text-center">
                      <Icon name="check_circle" className="text-[13px] text-secondary shrink-0" />
                      {m.text}
                    </span>
                  </div>
                );
            }
          })}

          {typing && (
            <div className="flex items-start gap-2.5">
              <ArtisanAvatar />
              <div className="bg-surface-container-lowest saddle-stitch text-on-surface px-4 py-3 rounded-2xl rounded-tl-sm shadow-sm flex items-center gap-3">
                <div className="relative w-7 h-7 flex items-center justify-center shrink-0" aria-hidden="true">
                  <svg className="w-6 h-6 overflow-visible" viewBox="0 0 24 24">
                    <path
                      className="stroke-outline-variant needle-thread animate-thread"
                      d="M 2 12 Q 12 10 22 12"
                      fill="none"
                      strokeWidth="2"
                    />
                    <g className="animate-needle origin-bottom">
                      <line className="stroke-secondary" strokeLinecap="round" strokeWidth="2" x1="12" x2="19" y1="4" y2="18" />
                      <circle className="fill-secondary-container" cx="13" cy="5" r="1" />
                    </g>
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-[11px] font-medium text-on-surface">
                    Alistair is consulting the Edinburgh workbench ledger...
                  </span>
                  <span className="text-[9px] text-secondary font-light">Cross-referencing hide lots &amp; courier routes</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="p-3 bg-surface-container-high/90 backdrop-blur-md border-t border-outline-variant/70">
          <form
            className="flex items-center gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              send(draft);
              setDraft("");
            }}
          >
            <button
              aria-label="Attach sizing photo or measurements"
              title="Attach patron specs or dog photo"
              className="text-on-surface-variant hover:text-on-surface p-2 rounded-full hover:bg-surface-container transition-colors shrink-0"
              type="button"
              onClick={() => fileRef.current?.click()}
            >
              <Icon name="attach_file" className="text-[20px]" />
            </button>
            <input
              ref={fileRef}
              className="hidden"
              type="file"
              accept="image/*,.pdf"
              tabIndex={-1}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) attach(file);
                e.target.value = "";
              }}
            />
            <input
              ref={inputRef}
              aria-label="Message the atelier"
              autoComplete="off"
              className="flex-1 min-w-0 bg-surface-container-lowest border border-outline-variant rounded-full px-4 py-2.5 text-xs text-on-surface focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary/30 placeholder:text-on-surface-variant/60 shadow-inner"
              placeholder="Ask Alistair about harness fits, boots, or shipping..."
              type="text"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
            />
            <button
              aria-label="Send inquiry"
              className="w-9 h-9 rounded-full bg-primary hover:bg-primary-container text-secondary-container flex items-center justify-center transition-all shadow-md active:scale-95 shrink-0 border border-gold/40 disabled:opacity-50"
              type="submit"
              disabled={!draft.trim()}
            >
              <Icon name="arrow_upward" className="text-[17px]" />
            </button>
          </form>
          <div className="flex items-center justify-between gap-2 px-2 pt-2 text-[9px] text-on-surface-variant/75 tracking-wider uppercase font-medium">
            <span className="flex items-center gap-1">
              <Icon name="verified_user" className="text-[12px] text-secondary" />
              Savile Row &amp; Edinburgh Atelier Direct
            </span>
            <span>End-to-End Handcrafted</span>
          </div>
        </div>
      </div>

      <div className="fixed bottom-6 right-4 sm:right-8 z-50">
        <button
          aria-label={open ? "Close Atelier Concierge" : "Open Atelier Concierge"}
          aria-expanded={open}
          aria-controls="atelier-concierge"
          className="group relative flex items-center gap-3.5 pl-3.5 pr-4 py-3 bg-primary text-surface rounded-full shadow-2xl border-2 border-gold/70 hover:border-secondary-container hover:bg-primary-container transition-all active:scale-95 animate-candle-glow"
          type="button"
          onClick={() => setOpen((o) => !o)}
        >
          <span className="relative shrink-0">
            <span className="block w-10 h-10 rounded-full bg-linear-to-br from-secondary via-tertiary-container to-primary p-[1.5px] shadow-md">
              <span className="w-full h-full rounded-full bg-primary-container border border-secondary-container/60 flex items-center justify-center text-secondary-container font-headline text-sm tracking-wider shadow-inner font-semibold">
                VH
              </span>
            </span>
            <span className="absolute -top-0.5 -right-0.5 flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary-container opacity-75" />
              <span className="relative rounded-full h-3.5 w-3.5 bg-secondary border-2 border-surface flex items-center justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary-container" />
              </span>
            </span>
          </span>
          <span className="flex flex-col text-left leading-tight pr-1">
            <span className="flex items-center gap-2">
              <span className="font-headline text-[13px] text-surface tracking-wide font-medium">Atelier Concierge</span>
              <span className="bg-secondary/60 text-secondary-container border border-secondary-container/30 text-[8px] uppercase tracking-wider px-1.5 rounded font-semibold">
                Live Bench
              </span>
            </span>
            <span className="text-[9.5px] text-surface-dim/90 mt-0.5 font-light tabular-nums">
              Master Leatherwright Available • Edinburgh ({clock})
            </span>
          </span>
          <span className="w-6 h-6 rounded-full bg-primary-container border border-gold/40 flex items-center justify-center text-secondary-container group-hover:translate-x-0.5 transition-transform shrink-0">
            <Icon name={open ? "expand_more" : "forum"} className="text-[15px]" />
          </span>
        </button>
      </div>
    </>
  );
}
