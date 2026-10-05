"use client";

import { useEffect, useState } from "react";
import { TEASERS, type Teaser } from "@/lib/catalog";
import { Icon } from "../Icon";

export function AtelierTeasers() {
  const [open, setOpen] = useState<Teaser | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const [joined, setJoined] = useState<string[]>([]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    if (!confirmed || !open) return;
    const t = setTimeout(() => {
      setJoined((j) => [...j, open.id]);
      setOpen(null);
      setConfirmed(false);
    }, 900);
    return () => clearTimeout(t);
  }, [confirmed, open]);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
        {TEASERS.map((t) => {
          const isJoined = joined.includes(t.id);
          return (
            <article
              key={t.id}
              className="group flex flex-col bg-surface-container-lowest rounded-xl p-3 border border-outline-variant/30 hover:border-outline transition-all duration-300 hover:shadow-lg"
            >
              <div className="relative w-full aspect-4/5 bg-surface-container rounded-lg overflow-hidden">
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  alt={t.imageAlt}
                  src={t.image}
                />
                <div className="absolute bottom-3 left-3 bg-surface/90 backdrop-blur-md px-2.5 py-1 rounded font-label-sm text-[10px] uppercase tracking-wider text-primary font-medium">
                  {t.stage}
                </div>
              </div>
              <div className="flex flex-col flex-1 pt-3 justify-between">
                <div>
                  <div className="flex items-center justify-between text-secondary font-label-sm text-label-sm mb-1">
                    <span>{t.collection}</span>
                    <span className="text-tertiary">{t.tag}</span>
                  </div>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface group-hover:text-primary transition-colors">
                    {t.name}
                  </h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2 mt-1">{t.description}</p>
                </div>
                <div className="pt-4">
                  <div className="flex items-baseline justify-between mb-3">
                    <div className="flex items-baseline gap-1.5">
                      <span className="font-headline-sm text-headline-sm text-primary">Est. ${t.estUsd}</span>
                      <span className="font-label-sm text-label-sm text-secondary">/ £{t.estGbp}</span>
                    </div>
                    <span className="font-label-sm text-[10px] uppercase text-secondary">{t.status}</span>
                  </div>
                  <button
                    className={`w-full py-2.5 rounded-lg font-label-md text-label-md uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-1.5 ${
                      isJoined
                        ? "bg-secondary text-on-secondary"
                        : "bg-surface-container hover:bg-primary hover:text-on-primary text-on-surface border border-outline-variant/30"
                    }`}
                    type="button"
                    disabled={isJoined}
                    onClick={() => setOpen(t)}
                  >
                    <Icon name={isJoined ? "check" : "notifications"} className="text-[16px]" />
                    {isJoined ? "Priority Reserved" : "Priority Access"}
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {open && (
        <div
          className="fixed inset-0 z-50 bg-inverse-surface/60 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={(e) => e.target === e.currentTarget && setOpen(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="waitlist-title"
            className="bg-surface-container-lowest rounded-xl max-w-md w-full p-8 shadow-2xl border border-outline-variant/40 text-center space-y-4"
          >
            <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center mx-auto text-secondary">
              <Icon name="draw" className="text-[26px]" />
            </div>
            <div>
              <h3 id="waitlist-title" className="font-headline-sm text-headline-sm text-primary">
                Priority Reservation
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-1.5">
                {open.name}: you will receive private early allocation access 24 hours prior to public release.
              </p>
            </div>
            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                setConfirmed(true);
              }}
            >
              <div className="space-y-1 text-left">
                <label
                  htmlFor="waitlist-modal-email"
                  className="font-label-sm text-label-sm uppercase tracking-wider text-secondary block"
                >
                  Patron Email Address
                </label>
                <input
                  id="waitlist-modal-email"
                  autoFocus
                  required
                  className="w-full bg-surface-container-lowest border border-outline-variant/60 rounded-lg px-3.5 py-2.5 text-on-surface font-body-sm text-body-sm focus:outline-none focus:border-primary"
                  type="email"
                  placeholder="patron@valerawat.com"
                />
              </div>
              <div className="flex items-center gap-3 pt-2">
                <button
                  className={`flex-1 text-on-primary py-2.5 rounded-lg font-label-md text-label-md uppercase tracking-wider transition-colors ${
                    confirmed ? "bg-secondary" : "bg-primary hover:bg-primary-container"
                  }`}
                  type="submit"
                  disabled={confirmed}
                >
                  {confirmed ? "Registry Confirmed" : "Confirm Registry"}
                </button>
                <button
                  className="px-4 py-2.5 text-secondary hover:text-primary font-label-md text-label-md uppercase tracking-wider"
                  type="button"
                  onClick={() => setOpen(null)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
