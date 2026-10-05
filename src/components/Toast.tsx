"use client";

import { type ReactNode, useEffect, useState } from "react";
import { Icon } from "./Icon";

const TOAST_EVENT = "toast:show";

/** Shows a short confirmation pill below the header */
export function toast(message: string) {
  window.dispatchEvent(new CustomEvent<string>(TOAST_EVENT, { detail: message }));
}

/** Text button that raises a toast, for use inside server components */
export function ToastButton({ message, className, children }: { message: string; className?: string; children: ReactNode }) {
  return (
    <button className={className} type="button" onClick={() => toast(message)}>
      {children}
    </button>
  );
}

export function Toast() {
  const [message, setMessage] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const onToast = (e: Event) => {
      setMessage((e as CustomEvent<string>).detail);
      setVisible(true);
      clearTimeout(timer);
      timer = setTimeout(() => setVisible(false), 3500);
    };
    window.addEventListener(TOAST_EVENT, onToast);
    return () => {
      clearTimeout(timer);
      window.removeEventListener(TOAST_EVENT, onToast);
    };
  }, []);

  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed top-24 right-6 md:right-12 z-50 max-w-[calc(100vw-3rem)] flex items-center gap-3 bg-primary text-surface px-5 py-3 rounded-full shadow-2xl border border-outline-variant/30 text-xs tracking-wider uppercase font-medium transition-all duration-500 ease-out ${
        visible ? "translate-y-0 opacity-100" : "-translate-y-12 opacity-0 pointer-events-none"
      }`}
    >
      <Icon name="check_circle" className="text-[18px] text-secondary-container shrink-0" />
      <span>{message}</span>
    </div>
  );
}
