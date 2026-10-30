"use client";

import { useState, type FormEvent } from "react";
import { TRADE_DESK, formatPrice, type CartItem, type Currency } from "@/lib/catalog";
import { RECAPTCHA_SITE_KEY, useEmailForm } from "@/lib/emailjs";
import { Icon } from "../Icon";
import { Recaptcha } from "../home/Recaptcha";

const EYEBROW = "font-label-sm text-label-sm tracking-eyebrow uppercase";
const FIELD =
  "w-full bg-surface text-on-surface font-body-sm text-body-sm px-4 py-3 focus:outline-none focus:bg-surface-bright focus:ring-1 focus:ring-primary shadow-sm";

function lineSummary(item: CartItem, currency: Currency) {
  const details = item.details.map((d) => `${d.label}: ${d.highlight ? `"${d.highlight}" ` : ""}${d.value}`.trim());
  const total = formatPrice(item.priceUsd * item.qty, item.priceGbp * item.qty, currency);
  return `${item.qty} × ${item.name}${details.length ? ` (${details.join("; ")})` : ""} — ${total}`;
}

/** No online payment: emails the satchel to the export desk, which replies with an invoice and secure payment link. */
export function InvoiceRequest({
  cart,
  currency,
  total,
  destination,
  postal,
  arrival,
}: {
  cart: CartItem[];
  currency: Currency;
  total: string;
  destination: string;
  postal: string;
  arrival: string;
}) {
  const { status, error, send, captchaRef, setCaptcha } = useEmailForm("invoice");
  const [email, setEmail] = useState("");

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    setEmail(String(data.get("email")));
    await send({
      name: data.get("name"),
      reply_to: data.get("email"),
      address: data.get("address"),
      destination,
      postal,
      currency,
      items: cart.map((item) => lineSummary(item, currency)).join("\n"),
      total,
      arrival,
    });
  }

  if (status === "sent") {
    return (
      <div className="mt-6 bg-surface p-5 shadow-sm space-y-2" aria-live="polite">
        <p className={`${EYEBROW} text-primary font-bold flex items-center gap-2`}>
          <Icon name="check_circle" className="text-[18px] text-secondary" /> Invoice Requested
        </p>
        <p className="font-body-sm text-body-sm text-on-surface-variant">
          The atelier will confirm bench allocation and email your invoice with a secure payment link to{" "}
          <strong className="text-on-surface font-medium">{email}</strong> within one business day.
        </p>
      </div>
    );
  }

  return (
    <form className="mt-6 space-y-3" onSubmit={submit}>
      <span className={`${EYEBROW} text-on-surface-variant block font-medium`}>Invoice Details</span>
      <input className={FIELD} name="name" placeholder="Full name *" aria-label="Full name" required autoComplete="name" />
      <input
        className={FIELD}
        name="email"
        type="email"
        placeholder="Email *"
        aria-label="Email"
        required
        autoComplete="email"
      />
      <textarea
        className={`${FIELD} resize-none h-20`}
        name="address"
        placeholder="Delivery address *"
        aria-label="Delivery address"
        required
        autoComplete="street-address"
      />
      {RECAPTCHA_SITE_KEY && <Recaptcha ref={captchaRef} siteKey={RECAPTCHA_SITE_KEY} onToken={setCaptcha} />}
      <button
        className="w-full bg-secondary hover:bg-secondary/90 text-on-secondary py-4 text-center font-label-lg text-label-lg tracking-eyebrow uppercase font-bold shadow-md hover:shadow-lg transition-all active:scale-95 flex items-center justify-center gap-3 disabled:cursor-default"
        type="submit"
        disabled={status === "sending"}
      >
        <span>{status === "sending" ? "Sending…" : "Request Invoice & Payment Link"}</span>
        <Icon
          name={status === "sending" ? "progress_activity" : "lock"}
          className={`text-[18px] ${status === "sending" ? "animate-spin" : ""}`}
        />
      </button>
      {error && (
        <p role="alert" className="font-body-sm text-body-sm text-error flex items-start gap-1.5">
          <Icon name="error" className="text-[16px] shrink-0 mt-0.5" />
          {error}
        </p>
      )}
      <p className="font-body-sm text-body-sm text-on-surface-variant text-center">
        No payment is taken here. Card and bank-transfer links are issued by {TRADE_DESK.email} once your commission is
        confirmed.
      </p>
    </form>
  );
}
