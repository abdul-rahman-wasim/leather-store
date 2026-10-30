"use client";

import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { TRADE_DESK } from "@/lib/catalog";
import { RECAPTCHA_SITE_KEY, useEmailForm } from "@/lib/emailjs";
import { Recaptcha } from "./home/Recaptcha";
import { Icon } from "./Icon";

const OPEN_EVENT = "vr:lookbook";

const LABEL = "block text-[11px] font-semibold uppercase tracking-wider text-on-surface mb-1.5";
const FIELD =
  "w-full bg-surface-container-low border border-outline-variant/40 rounded-sm px-3.5 py-2.5 text-xs text-on-surface focus:outline-none focus:border-primary";

/** Opens the lookbook request dialog; `source` tells the desk which CTA the lead came from. */
export function openLookbook(source: string) {
  window.dispatchEvent(new CustomEvent<string>(OPEN_EVENT, { detail: source }));
}

export function LookbookButton({
  source,
  className,
  title,
  children,
}: {
  source: string;
  className?: string;
  title?: string;
  children: ReactNode;
}) {
  return (
    <button className={className} type="button" title={title} aria-label={title} onClick={() => openLookbook(source)}>
      {children}
    </button>
  );
}

/** Email-gated 2026 Lookbook request, mounted once in the root layout. */
export function LookbookDialog() {
  const dialog = useRef<HTMLDialogElement>(null);
  const [source, setSource] = useState<string | null>(null);

  useEffect(() => {
    const open = (e: Event) => {
      setSource((e as CustomEvent<string>).detail);
      dialog.current?.showModal();
    };
    window.addEventListener(OPEN_EVENT, open);
    return () => window.removeEventListener(OPEN_EVENT, open);
  }, []);

  return (
    <dialog
      ref={dialog}
      aria-labelledby="lookbook-title"
      className="m-auto w-[calc(100%-2rem)] max-w-md rounded-lg bg-surface-container-lowest text-on-surface p-0 shadow-2xl border border-outline-variant/30 backdrop:bg-primary/60 backdrop:backdrop-blur-sm"
      onClose={() => setSource(null)}
      onClick={(e) => e.target === e.currentTarget && dialog.current?.close()}
    >
      {source !== null && <LookbookForm source={source} onClose={() => dialog.current?.close()} />}
    </dialog>
  );
}

function LookbookForm({ source, onClose }: { source: string; onClose: () => void }) {
  const { status, error, send, captchaRef, setCaptcha } = useEmailForm();
  const [email, setEmail] = useState("");

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    setEmail(String(data.get("email")));
    await send({
      form: "Lookbook",
      subject: `2026 Lookbook request — ${data.get("company")}`,
      name: String(data.get("name")),
      replyTo: String(data.get("email")),
      details: { Company: data.get("company"), Email: data.get("email"), Source: source },
    });
  }

  return (
    <div className="relative p-6 sm:p-8">
      <button
        aria-label="Close"
        className="absolute top-4 right-4 p-1 text-on-surface-variant hover:text-on-surface"
        type="button"
        onClick={onClose}
      >
        <Icon name="close" className="text-[20px]" />
      </button>
      <span className="text-[11px] font-semibold tracking-eyebrow uppercase text-accent-saddle block mb-2">
        2026 Contract Lookbook
      </span>
      {status === "sent" ? (
        <div className="space-y-4" aria-live="polite">
          <h2 id="lookbook-title" className="font-headline text-2xl text-on-surface flex items-center gap-2">
            <Icon name="check_circle" className="text-[24px] text-secondary" />
            Request received
          </h2>
          <p className="text-sm text-on-surface-variant font-light leading-relaxed">
            The export desk will send the 2026 Lookbook to <strong className="font-semibold">{email}</strong> within one
            business day.
          </p>
          <button
            className="w-full bg-primary text-surface hover:bg-primary-container text-xs font-semibold tracking-eyebrow uppercase py-3.5 rounded-sm"
            type="button"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      ) : (
        <form className="space-y-4" onSubmit={submit}>
          <h2 id="lookbook-title" className="font-headline text-2xl text-on-surface">
            Receive the Lookbook
          </h2>
          <p className="text-xs text-on-surface-variant font-light leading-relaxed">
            Article specifications, MOQ tiers and leather swatch charts, emailed as a PDF from {TRADE_DESK.email}.
          </p>
          <div>
            <label className={LABEL} htmlFor="lookbook-name">
              Full Name *
            </label>
            <input className={FIELD} id="lookbook-name" name="name" required type="text" autoComplete="name" />
          </div>
          <div>
            <label className={LABEL} htmlFor="lookbook-company">
              Company / Brand *
            </label>
            <input
              className={FIELD}
              id="lookbook-company"
              name="company"
              required
              type="text"
              autoComplete="organization"
            />
          </div>
          <div>
            <label className={LABEL} htmlFor="lookbook-email">
              Work Email *
            </label>
            <input className={FIELD} id="lookbook-email" name="email" required type="email" autoComplete="email" />
          </div>
          {RECAPTCHA_SITE_KEY && <Recaptcha ref={captchaRef} siteKey={RECAPTCHA_SITE_KEY} onToken={setCaptcha} />}
          <button
            className="w-full bg-primary text-surface hover:bg-primary-container transition-all active:scale-95 text-xs font-semibold tracking-eyebrow uppercase py-3.5 rounded-sm shadow-md flex items-center justify-center gap-2 disabled:cursor-default"
            type="submit"
            disabled={status === "sending"}
          >
            <Icon
              name={status === "sending" ? "progress_activity" : "menu_book"}
              className={`text-[18px] text-secondary-container ${status === "sending" ? "animate-spin" : ""}`}
            />
            {status === "sending" ? "Sending…" : "Email Me the Lookbook"}
          </button>
          {error && (
            <p role="alert" className="text-xs text-error flex items-start gap-1.5">
              <Icon name="error" className="text-[16px] shrink-0" />
              {error}
            </p>
          )}
        </form>
      )}
    </div>
  );
}
