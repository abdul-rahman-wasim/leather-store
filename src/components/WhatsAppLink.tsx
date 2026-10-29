"use client";

import type { ReactNode } from "react";
import { whatsappRfqLink } from "@/lib/catalog";
import { useStore } from "@/lib/store";

/** WhatsApp link to the export desk, pre-filled with the articles currently attached to the RFQ. */
export function WhatsAppLink({ className, title, children }: { className?: string; title?: string; children: ReactNode }) {
  const { rfq } = useStore();
  return (
    <a className={className} href={whatsappRfqLink(rfq)} target="_blank" rel="noopener noreferrer" title={title}>
      {children}
    </a>
  );
}
