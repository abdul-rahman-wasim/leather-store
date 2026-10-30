import emailjs from "@emailjs/browser";
import { useRef, useState } from "react";
import type { RecaptchaHandle } from "@/components/home/Recaptcha";
import { TRADE_DESK } from "./catalog";

const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
export const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

/** One shared EmailJS template for every form (the Free plan allows two). Enable reCAPTCHA V2 verification on it. */
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;

export type EmailRequest = {
  /** Which form sent it, e.g. "RFQ" — lets the desk filter the inbox. */
  form: string;
  subject: string;
  name: string;
  replyTo: string;
  /** Labelled fields, rendered one per line into {{message}} in insertion order. */
  details: Record<string, unknown>;
};

/** Send/captcha/error state for a form that emails the export desk through EmailJS. */
export function useEmailForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [error, setError] = useState<string | null>(null);
  const [captcha, setCaptcha] = useState<string | null>(null);
  const captchaRef = useRef<RecaptchaHandle>(null);

  async function send({ form, subject, name, replyTo, details }: EmailRequest) {
    if (!SERVICE_ID || !PUBLIC_KEY || !TEMPLATE_ID || !RECAPTCHA_SITE_KEY) {
      setError(`This form is offline. Please email ${TRADE_DESK.email} directly.`);
      return false;
    }
    if (!captcha) {
      setError("Please confirm you are not a robot before submitting.");
      return false;
    }
    setError(null);
    setStatus("sending");
    try {
      const message = Object.entries(details)
        .map(([label, value]) => `${label}: ${value}`)
        .join("\n");
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        { form, subject, name, reply_to: replyTo, message, "g-recaptcha-response": captcha },
        { publicKey: PUBLIC_KEY },
      );
      setStatus("sent");
      return true;
    } catch {
      setStatus("idle");
      setError(`We couldn't send your request. Please try again or email ${TRADE_DESK.email}.`);
      return false;
    } finally {
      captchaRef.current?.reset();
    }
  }

  return { status, error, send, captchaRef, setCaptcha };
}
