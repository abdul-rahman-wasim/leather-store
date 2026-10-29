"use client";

import Script from "next/script";
import { useCallback, useEffect, useImperativeHandle, useRef, type Ref } from "react";

type Grecaptcha = {
  ready(cb: () => void): void;
  render(el: HTMLElement, opts: { sitekey: string; callback(token: string): void; "expired-callback"(): void }): number;
  reset(id?: number): void;
};

declare global {
  interface Window {
    grecaptcha?: Grecaptcha;
  }
}

export type RecaptchaHandle = { reset(): void };

/** Google reCAPTCHA v2 checkbox (the only version EmailJS verifies). Reports the token, or null once it expires. */
export function Recaptcha({
  siteKey,
  onToken,
  ref,
}: {
  siteKey: string;
  onToken: (token: string | null) => void;
  ref?: Ref<RecaptchaHandle>;
}) {
  const box = useRef<HTMLDivElement>(null);
  const widget = useRef<number | null>(null);
  const tokenCb = useRef(onToken);

  useEffect(() => {
    tokenCb.current = onToken;
  }, [onToken]);

  useImperativeHandle(ref, () => ({
    reset() {
      if (widget.current !== null) window.grecaptcha?.reset(widget.current);
      tokenCb.current(null);
    },
  }));

  const mount = useCallback(() => {
    const g = window.grecaptcha;
    if (!g || !box.current || widget.current !== null) return;
    g.ready(() => {
      if (!box.current || widget.current !== null || box.current.childElementCount) return;
      widget.current = g.render(box.current, {
        sitekey: siteKey,
        callback: (token) => tokenCb.current(token),
        "expired-callback": () => tokenCb.current(null),
      });
    });
  }, [siteKey]);

  return (
    <>
      <Script src="https://www.google.com/recaptcha/api.js?render=explicit" strategy="lazyOnload" onReady={mount} />
      <div ref={box} className="min-h-19.5" />
    </>
  );
}
