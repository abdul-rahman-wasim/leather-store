"use client";

import { useEffect, useRef, useState } from "react";
import { BRAND, TRADE_DESK } from "@/lib/catalog";
import { Icon } from "./Icon";

type Message = { id: number; from: "buyer" | "desk"; text: string };

const QUICK_PROMPTS = [
  { label: "Boot MOQs", text: "What are your MOQ requirements for custom embossed boots?" },
  { label: "Swatch Kits", text: "Can we order sample swatch sets with REACH certificates?" },
  { label: "Air Logistics", text: "What is your DDP air freight transit time to the UK and US?" },
];

function replyTo(query: string) {
  return `Thank you for your inquiry regarding: “${query}”. Our Islamabad master pattern designer can facilitate this with sample batches in 7–10 days. An account director can also connect via WhatsApp at ${TRADE_DESK.phone}.`;
}

function DeskAvatar({ size = "w-8 h-8 text-[10px]" }: { size?: string }) {
  return (
    <div
      className={`${size} rounded-full bg-primary-container text-secondary-container shrink-0 flex items-center justify-center font-headline font-semibold border border-gold/50 mt-1 shadow-sm`}
    >
      VR
    </div>
  );
}

export function Concierge() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [draft, setDraft] = useState("");
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
  }, [messages]);

  function send(text: string) {
    const query = text.trim();
    if (!query) return;
    setMessages((m) => [...m, { id: nextId.current++, from: "buyer", text: query }]);
    clearTimeout(replyTimer.current);
    replyTimer.current = setTimeout(() => {
      setMessages((m) => [...m, { id: nextId.current++, from: "desk", text: replyTo(query) }]);
    }, 600);
  }

  return (
    <>
      <div
        id="export-desk-chat"
        role="dialog"
        aria-label="Islamabad Export Desk"
        aria-hidden={!open}
        inert={!open}
        className={`fixed bottom-24 right-4 sm:right-8 z-50 w-105 max-w-[calc(100vw-1.5rem)] h-155 max-h-[calc(100dvh-7.5rem)] bg-surface/95 backdrop-blur-2xl rounded-2xl shadow-[0_25px_60px_-15px_color-mix(in_srgb,var(--color-primary)_38%,transparent)] border border-gold/40 overflow-hidden flex flex-col origin-bottom-right transition-all duration-300 ${
          open ? "scale-100 opacity-100 animate-envelope-open" : "scale-95 opacity-0 pointer-events-none"
        }`}
      >
        <div className="h-1.5 w-full shrink-0 bg-linear-to-r from-primary via-accent-saddle to-primary border-b border-gold/30" />

        <div className="bg-primary text-surface px-5 py-4 border-b border-gold/30 select-none">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <DeskAvatar size="w-10 h-10 text-sm" />
              <div>
                <div className="flex items-center gap-1.5">
                  <h2 className="font-headline text-[16px] text-surface leading-tight">Islamabad Export Desk</h2>
                  <span className="bg-secondary-container/20 text-secondary-container border border-secondary-container/40 text-[8px] uppercase tracking-wider px-1.5 rounded font-semibold">
                    Live
                  </span>
                </div>
                <p className="text-[10px] text-secondary-container font-semibold mt-0.5">
                  B2B Specifications, Pricing &amp; Sample Inquiries
                </p>
              </div>
            </div>
            <button
              aria-label="Close chat"
              className="p-1 text-surface-dim/80 hover:text-surface transition-colors rounded hover:bg-surface/10"
              type="button"
              onClick={() => setOpen(false)}
            >
              <Icon name="close" className="text-[19px]" />
            </button>
          </div>
        </div>

        <div
          ref={streamRef}
          className="flex-1 overflow-y-auto p-4 space-y-4 text-xs concierge-scrollbar bg-surface/90"
          aria-live="polite"
        >
          <div className="flex items-center justify-center my-1">
            <span className="text-[9px] uppercase tracking-[0.2em] text-on-surface-variant/75 bg-surface-container-high/90 px-3 py-1 rounded-full border border-outline-variant/60 font-semibold text-center">
              {BRAND} Manufacture • Sector I-9 Floor
            </span>
          </div>

          <div className="flex items-start gap-2.5 max-w-[92%]">
            <DeskAvatar />
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-on-surface font-semibold">Director of International Accounts</span>
                <span className="text-[9px] text-secondary uppercase tracking-wider font-medium">B2B Engineer</span>
              </div>
              <div className="bg-surface-container-lowest saddle-stitch text-on-surface p-4 rounded-2xl rounded-tl-sm shadow-sm leading-relaxed">
                <p className="mb-2">
                  Welcome to {BRAND} Atelier &amp; Manufacture. I am on hand to advise on contract MOQs, custom brass mold
                  tooling, FOB/DDP freight calculations, or material test sheets.
                </p>
                <p className="text-on-surface-variant font-light">
                  Which article number or volume run are you planning to commission?
                </p>
              </div>
            </div>
          </div>

          {messages.map((m) =>
            m.from === "buyer" ? (
              <div key={m.id} className="flex justify-end max-w-[90%] ml-auto">
                <div className="text-right">
                  <span className="text-[9px] text-on-surface-variant font-medium mb-1 block">Procurement Buyer</span>
                  <div className="bg-primary text-surface p-3 rounded-2xl rounded-tr-sm shadow-md text-left border border-secondary/40 wrap-break-word">
                    {m.text}
                  </div>
                </div>
              </div>
            ) : (
              <div key={m.id} className="flex items-start gap-2.5 max-w-[92%]">
                <DeskAvatar />
                <div className="space-y-1">
                  <span className="text-[10px] text-on-surface font-semibold">Atelier Engineering Desk</span>
                  <div className="bg-surface-container-lowest saddle-stitch text-on-surface p-3.5 rounded-2xl rounded-tl-sm shadow-sm leading-relaxed">
                    {m.text}
                  </div>
                </div>
              </div>
            ),
          )}
        </div>

        <div className="p-2.5 bg-surface-container-low border-t border-outline-variant/30 flex flex-wrap gap-1.5">
          {QUICK_PROMPTS.map((p) => (
            <button
              key={p.label}
              className="bg-surface border border-outline-variant/40 hover:border-primary px-2.5 py-1 rounded text-[10px] font-semibold text-primary transition-all"
              type="button"
              onClick={() => send(p.text)}
            >
              {p.label}
            </button>
          ))}
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
            <input
              ref={inputRef}
              aria-label="Message the export desk"
              autoComplete="off"
              className="flex-1 min-w-0 bg-surface-container-lowest border border-outline-variant rounded-full px-4 py-2 text-xs text-on-surface focus:outline-none focus:border-primary"
              placeholder="Ask about tooling, lead times, or MOQs..."
              type="text"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
            />
            <button
              aria-label="Send inquiry"
              className="w-9 h-9 rounded-full bg-primary text-secondary-container flex items-center justify-center shadow active:scale-95 shrink-0 disabled:opacity-50"
              type="submit"
              disabled={!draft.trim()}
            >
              <Icon name="arrow_upward" className="text-[17px]" />
            </button>
          </form>
        </div>
      </div>

      <div className="fixed bottom-6 right-4 sm:right-8 z-50 flex items-center gap-3">
        <a
          className="flex items-center gap-2 bg-primary text-surface px-4 py-3 rounded-full shadow-2xl border-2 border-secondary-container/70 hover:border-secondary-container transition-all active:scale-95 animate-candle-glow"
          href={TRADE_DESK.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          title="Chat on WhatsApp"
        >
          <span className="w-8 h-8 rounded-full bg-secondary-container text-primary flex items-center justify-center shadow">
            <Icon name="chat" className="text-[18px]" />
          </span>
          <span className="hidden sm:flex flex-col text-left leading-tight pr-1">
            <span className="flex items-center gap-1.5">
              <span className="font-headline text-[13px] text-surface tracking-wide">Factory Desk</span>
              <span className="bg-emerald-900 text-emerald-200 text-[8px] uppercase tracking-wider px-1 rounded font-bold">
                Online
              </span>
            </span>
            <span className="text-[9px] text-surface-dim/90 mt-0.5">{TRADE_DESK.phone}</span>
          </span>
        </a>
        <button
          aria-label={open ? "Close export desk chat" : "Open export desk chat"}
          aria-expanded={open}
          aria-controls="export-desk-chat"
          className="w-12 h-12 rounded-full bg-secondary-container text-primary flex items-center justify-center shadow-2xl border-2 border-primary hover:scale-105 active:scale-95 transition-all"
          title="Open Atelier Concierge Desk"
          type="button"
          onClick={() => setOpen((o) => !o)}
        >
          <Icon name={open ? "close" : "support_agent"} className="text-[24px]" />
        </button>
      </div>
    </>
  );
}
