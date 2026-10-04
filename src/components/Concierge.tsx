"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "./Icon";

type Message = { id: number; from: "artisan" | "patron"; text: string };

const ARTISAN = "Hamish • Master Leatherwright";

const WELCOME =
  "Welcome to Velluto & Hide. I can assist with bespoke dog harness sizing, US/UK/Scotland delivery timeframes, personalized monogramming, or leather care regimens. How may I be of service today?";

const QUICK_PROMPTS = [
  { emoji: "🐕", text: "Dog Harness Breed Sizing" },
  { emoji: "✈️", text: "US & Scotland Shipping Times" },
  { emoji: "✨", text: "Complimentary Monogramming" },
  { emoji: "🍯", text: "Leather Care & Beeswax Balm" },
];

// Scripted replies, matched in order on whole words
const TOPICS: { match: RegExp; reply: string }[] = [
  {
    match: /\b(harness|dogs?|canine|sizes?|sizing|breeds?|puppy|chest)\b/i,
    reply:
      "For our English bridle leather canine harness, we require two measurements: lower neck circumference and ribcage girth just behind the forelegs. Small fits Terriers and Whippets (14–19” chest); Medium fits Setters, Spaniels, and Pointers (20–28”); Large suits Labradors, Retrievers, and Scottish Deerhounds (28–36”). Each harness includes 5 points of brass buckle adjustment and a felted calfskin chest pad.",
  },
  {
    match: /\b(ship|shipping|courier|us|usa|uk|scotland|delivery|deliver|dispatch|times?|customs)\b/i,
    reply:
      "Dispatches depart from our Edinburgh mews workshop. UK & Scottish deliveries arrive within 1–2 business days via Royal Mail Special Tracked. US orders travel via DHL Express Air (2–3 business days). All United States customs duties, clearance paperwork, and state taxes are fully prepaid by our atelier.",
  },
  {
    match: /\b(monogram|monogramming|stamp|deboss|initials?|engrave|personali[sz]e)\b/i,
    reply:
      "We offer complimentary traditional blind hot-stamp debossing (up to 3 characters in Roman capitals or initials) on canine harness sternum tabs, Balmoral boot pull loops, and bespoke outerwear inside pockets. Simply specify your desired monogram during checkout or reply here.",
  },
  {
    match: /\b(care|wax|beeswax|balm|clean|cleaning|oil|condition|rain|water)\b/i,
    reply:
      "We condition every hide with pure Scottish beeswax and sweet almond oil prior to shipping. We recommend applying our Atelier Nourishing Wax once every change of season using a cotton chamois cloth. Water exposure should be allowed to air-dry at room temperature away from artificial radiators.",
  },
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

function replyTo(query: string) {
  const topic = TOPICS.find((t) => t.match.test(query));
  return (
    topic?.reply ??
    `Thank you for your inquiry regarding "${query}". I have noted this on our workbench ledger. Would you like to schedule a private phone consult with our head cutter or reserve priority sizing?`
  );
}

function ArtisanAvatar() {
  return (
    <div className="w-7 h-7 rounded-full bg-primary-container text-secondary-container shrink-0 flex items-center justify-center text-[10px] font-headline border border-gold/40 mt-1">
      H
    </div>
  );
}

export function Concierge() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [draft, setDraft] = useState("");
  const [typing, setTyping] = useState(false);
  const streamRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const nextId = useRef(0);
  const replyTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(replyTimer.current), []);

  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => inputRef.current?.focus(), 150);
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

  function send(text: string) {
    const query = text.trim();
    if (!query) return;
    setMessages((m) => [...m, { id: nextId.current++, from: "patron", text: query }]);
    setTyping(true);
    clearTimeout(replyTimer.current);
    replyTimer.current = setTimeout(() => {
      setTyping(false);
      setMessages((m) => [...m, { id: nextId.current++, from: "artisan", text: replyTo(query) }]);
    }, 750);
  }

  return (
    <>
      <div
        id="atelier-concierge"
        role="dialog"
        aria-label="Atelier Concierge"
        aria-hidden={!open}
        inert={!open}
        className={`fixed bottom-24 right-4 sm:right-8 z-50 w-95 max-w-[calc(100vw-2rem)] h-145 max-h-[calc(100dvh-8rem)] bg-surface rounded-2xl shadow-2xl border border-outline-variant/50 overflow-hidden flex flex-col origin-bottom-right transition-all duration-300 ${
          open ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"
        }`}
      >
        <div className="bg-primary-container text-surface px-5 py-4 border-b border-on-tertiary-container/20 flex items-center justify-between select-none">
          <div className="flex items-center gap-3.5">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-tertiary border border-gold/60 flex items-center justify-center text-secondary-container shadow-inner font-headline text-base">
                VH
              </div>
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-primary-container" />
            </div>
            <div>
              <h2 className="font-headline text-lg tracking-wide text-surface leading-tight">Atelier Concierge</h2>
              <p className="text-[10px] tracking-eyebrow uppercase text-secondary-container font-medium mt-0.5">
                Bespoke Guidance &amp; Dispatch
              </p>
              <div className="flex items-center gap-1.5 mt-0.5 text-[9px] text-surface-variant/70">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse" />
                <span>Online • Edinburgh &amp; London Workbenches</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1 text-surface-variant/75">
            <button
              aria-label="Minimize chat"
              className="p-1 hover:text-surface transition-colors rounded hover:bg-white/10"
              type="button"
              onClick={() => setOpen(false)}
            >
              <Icon name="minimize" className="text-[20px]" />
            </button>
            <button
              aria-label="Close chat"
              className="p-1 hover:text-surface transition-colors rounded hover:bg-white/10"
              type="button"
              onClick={() => setOpen(false)}
            >
              <Icon name="close" className="text-[20px]" />
            </button>
          </div>
        </div>

        <div
          ref={streamRef}
          className="flex-1 overflow-y-auto p-4 space-y-4 text-xs concierge-scrollbar bg-surface"
          aria-live="polite"
        >
          <div className="flex items-center justify-center my-1">
            <span className="text-[10px] uppercase tracking-widest text-on-surface-variant/60 bg-surface-container px-3 py-1 rounded-full border border-outline-variant/30">
              Today • Edinburgh Mews
            </span>
          </div>

          <div className="flex items-start gap-2.5 max-w-[90%]">
            <ArtisanAvatar />
            <div>
              <span className="text-[10px] text-on-surface-variant font-medium mb-1 block">{ARTISAN}</span>
              <div className="bg-surface-container-lowest border border-outline-variant/30 text-on-surface p-3.5 rounded-2xl rounded-tl-sm shadow-sm leading-relaxed">
                {WELCOME}
              </div>
            </div>
          </div>

          <div className="space-y-1.5 pt-1 pl-9">
            <span className="text-[10px] tracking-wider uppercase text-on-surface-variant/70 font-semibold block mb-2">
              Direct Artisan Inquiries:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {QUICK_PROMPTS.map((p) => (
                <button
                  key={p.text}
                  className="bg-surface-container border border-outline-variant/40 hover:border-secondary hover:bg-surface-container-high text-on-surface px-3 py-1.5 rounded-full text-[11px] transition-all text-left shadow-2xs active:scale-95"
                  type="button"
                  onClick={() => send(p.text)}
                >
                  <span aria-hidden="true">{p.emoji}</span> {p.text}
                </button>
              ))}
            </div>
          </div>

          {messages.map((m) =>
            m.from === "patron" ? (
              <div key={m.id} className="flex justify-end max-w-[90%] ml-auto">
                <div className="text-right">
                  <span className="text-[10px] text-on-surface-variant font-medium mb-1 block">You</span>
                  <div className="bg-primary-container text-surface p-3.5 rounded-2xl rounded-tr-sm shadow-sm leading-relaxed text-left">
                    {m.text}
                  </div>
                </div>
              </div>
            ) : (
              <div key={m.id} className="flex items-start gap-2.5 max-w-[90%]">
                <ArtisanAvatar />
                <div>
                  <span className="text-[10px] text-on-surface-variant font-medium mb-1 block">{ARTISAN}</span>
                  <div className="bg-surface-container-lowest border border-outline-variant/30 text-on-surface p-3.5 rounded-2xl rounded-tl-sm shadow-sm leading-relaxed">
                    {m.text}
                  </div>
                </div>
              </div>
            ),
          )}

          {typing && (
            <div className="flex items-start gap-2.5">
              <ArtisanAvatar />
              <div
                className="bg-surface-container-lowest border border-outline-variant/30 px-4 py-3 rounded-2xl rounded-tl-sm flex items-center gap-1.5 shadow-sm"
                aria-label="Hamish is typing"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-secondary typing-dot" />
                <span className="w-1.5 h-1.5 rounded-full bg-secondary typing-dot" />
                <span className="w-1.5 h-1.5 rounded-full bg-secondary typing-dot" />
              </div>
            </div>
          )}
        </div>

        <div className="p-3 bg-surface-container-low border-t border-outline-variant/25">
          <form
            className="flex items-center gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              send(draft);
              setDraft("");
            }}
          >
            <input
              ref={inputRef}
              aria-label="Message the atelier"
              autoComplete="off"
              className="flex-1 min-w-0 bg-surface-container-lowest border border-outline-variant/40 rounded-full px-4 py-2.5 text-xs text-on-surface focus:outline-none focus:border-secondary placeholder:text-on-surface-variant/60 shadow-2xs"
              placeholder="Inquire with an artisan..."
              type="text"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
            />
            <button
              aria-label="Send message"
              className="w-9 h-9 rounded-full bg-primary-container hover:bg-primary text-secondary-container flex items-center justify-center transition-all shadow-md active:scale-95 shrink-0 disabled:opacity-50"
              type="submit"
              disabled={!draft.trim()}
            >
              <Icon name="arrow_upward" className="text-[17px]" />
            </button>
          </form>
          <div className="flex items-center justify-center gap-1.5 mt-2 text-[10px] text-on-surface-variant/70 tracking-wide">
            <Icon name="verified" className="text-[12px] text-secondary" />
            <span>Average response: Immediate • 100% Handcrafted Provenance</span>
          </div>
        </div>
      </div>

      <div className="fixed bottom-8 right-4 sm:right-8 z-50">
        <button
          aria-label={open ? "Close Atelier Concierge" : "Open Atelier Concierge"}
          aria-expanded={open}
          aria-controls="atelier-concierge"
          className="flex items-center gap-3 px-4 sm:px-5 py-3.5 bg-primary-container text-surface rounded-full shadow-2xl border border-gold/40 hover:bg-primary transition-all active:scale-95 group hover:shadow-[0_10px_25px_rgba(33,16,8,0.35)]"
          type="button"
          onClick={() => setOpen((o) => !o)}
        >
          <span className="relative flex items-center justify-center">
            <span className="w-2.5 h-2.5 rounded-full bg-secondary-container inline-block" />
            <span className="absolute w-4 h-4 rounded-full bg-secondary-container opacity-40 animate-ping" />
          </span>
          <Icon name="support_agent" className="text-[19px] text-secondary-container transition-transform group-hover:scale-110" />
          <span className="flex flex-col text-left leading-none">
            <span className="font-headline text-[13px] tracking-wide text-surface">Atelier Concierge</span>
            <span className="text-[9px] uppercase tracking-wider text-gold font-semibold mt-0.5">Online Assistance</span>
          </span>
          <Icon
            name={open ? "expand_more" : "chevron_right"}
            className="text-[16px] text-surface/60 group-hover:translate-x-0.5 transition-transform"
          />
        </button>
      </div>
    </>
  );
}
