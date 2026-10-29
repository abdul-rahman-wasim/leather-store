import emailjs from "@emailjs/browser";
import { useRef, useState } from "react";
import type { RecaptchaHandle } from "@/components/home/Recaptcha";
import { TRADE_DESK } from "./catalog";

const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
export const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

/** EmailJS template per form. Each template must have reCAPTCHA V2 verification enabled. */
const TEMPLATES = {
  rfq: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
  lookbook: process.env.NEXT_PUBLIC_EMAILJS_LOOKBOOK_TEMPLATE_ID,
};

export type EmailTemplate = keyof typeof TEMPLATES;

/** Send/captcha/error state for a form that emails the export desk through EmailJS. */
export function useEmailForm(template: EmailTemplate) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [error, setError] = useState<string | null>(null);
  const [captcha, setCaptcha] = useState<string | null>(null);
  const captchaRef = useRef<RecaptchaHandle>(null);

  async function send(params: Record<string, unknown>) {
    const templateId = TEMPLATES[template];
    if (!SERVICE_ID || !PUBLIC_KEY || !templateId || !RECAPTCHA_SITE_KEY) {
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
      await emailjs.send(SERVICE_ID, templateId, { ...params, "g-recaptcha-response": captcha }, { publicKey: PUBLIC_KEY });
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
