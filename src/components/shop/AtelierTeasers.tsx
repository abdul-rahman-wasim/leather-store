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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
        {TEASERS.map((t) => {
          const isJoined = joined.includes(t.id);
          return (
            <article
              key={t.id}
              className="group relative flex flex-col bg-surface-container-lowest rounded-xl p-space-sm shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="relative w-full aspect-4/5 bg-surface-container rounded-lg overflow-hidden">
                <img
                  className="w-full h-full object-cover filter blur-[2px] scale-105 group-hover:blur-0 group-hover:scale-100 transition-all duration-700"
                  alt={t.imageAlt}
                  src={t.image}
                />
                <div className="absolute inset-0 bg-inverse-surface/30 backdrop-blur-[2px] group-hover:backdrop-blur-none group-hover:bg-transparent transition-all duration-500 flex flex-col items-center justify-center p-space-md text-center">
                  <span className="bg-surface/90 text-on-surface px-space-sm py-1 rounded-full font-label-sm text-label-sm uppercase tracking-wider shadow-sm mb-space-xs">
                    {t.stage}
                  </span>
                  <span className="font-headline-sm text-headline-sm text-on-primary drop-shadow-md">{t.overlayTitle}</span>
                </div>
              </div>
              <div className="pt-space-md px-1 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-secondary font-label-sm text-label-sm mb-1">
                    <span>{t.collection}</span>
                    <span className="text-tertiary font-semibold">{t.tag}</span>
                  </div>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface">{t.name}</h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">{t.description}</p>
                </div>
                <div className="pt-space-md">
                  <div className="flex items-center justify-between mb-space-sm text-secondary font-label-sm text-label-sm">
                    <span>{t.batch}</span>
                    <span className="font-semibold text-on-surface">{t.estimate}</span>
                  </div>
                  <button
                    className={`w-full py-2 rounded-lg font-label-md text-label-md uppercase tracking-wider transition-colors flex items-center justify-center gap-1 ${
                      isJoined
                        ? "bg-tertiary text-on-tertiary"
                        : "bg-surface-container-high hover:bg-primary hover:text-on-primary text-on-surface"
                    }`}
                    type="button"
                    disabled={isJoined}
                    onClick={() => setOpen(t)}
                  >
                    <Icon name={isJoined ? "check" : "notifications_active"} className="text-[16px]" />
                    {isJoined ? "On Priority Waitlist" : "Join Priority Waitlist"}
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {open && (
        <div
          className="fixed inset-0 z-50 bg-inverse-surface/60 backdrop-blur-sm flex items-center justify-center p-margin"
          onClick={(e) => e.target === e.currentTarget && setOpen(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="waitlist-title"
            className="bg-surface-container-lowest rounded-xl max-w-md w-full p-space-lg shadow-xl text-center space-y-space-md"
          >
            <div className="w-12 h-12 rounded-full bg-surface-container-high text-primary flex items-center justify-center mx-auto">
              <Icon name="mark_email_read" className="text-[28px]" />
            </div>
            <div>
              <h3 id="waitlist-title" className="font-headline-sm text-headline-sm text-on-surface">
                Waitlist Reservation
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                {open.name}: you will receive an exclusive 24-hour atelier window prior to public batch release.
              </p>
            </div>
            <form
              className="space-y-space-md"
              onSubmit={(e) => {
                e.preventDefault();
                setConfirmed(true);
              }}
            >
              <div className="space-y-space-xs text-left">
                <label
                  htmlFor="waitlist-modal-email"
                  className="font-label-sm text-label-sm uppercase tracking-wider text-secondary block"
                >
                  Patron Email
                </label>
                <input
                  id="waitlist-modal-email"
                  autoFocus
                  required
                  className="w-full bg-surface border border-outline-variant rounded-lg px-space-sm py-2 text-on-surface font-body-sm text-body-sm focus:outline-none focus:border-primary"
                  type="email"
                  placeholder="patron@vellutohide.com"
                />
              </div>
              <div className="flex items-center gap-space-xs pt-space-xs">
                <button
                  className={`flex-1 text-on-primary py-2 rounded-lg font-label-md text-label-md uppercase tracking-wider transition-colors ${
                    confirmed ? "bg-tertiary" : "bg-primary hover:bg-primary-container"
                  }`}
                  type="submit"
                  disabled={confirmed}
                >
                  {confirmed ? "Preference Recorded" : "Confirm Priority Access"}
                </button>
                <button
                  className="px-space-md py-2 text-secondary hover:text-on-surface font-label-md text-label-md uppercase tracking-wider"
                  type="button"
                  onClick={() => setOpen(null)}
                >
                  Dismiss
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
