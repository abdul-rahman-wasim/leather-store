import Link from "next/link";
import { BRAND, CONTRACT_ARTICLES, LOGO_SRC, LOOKBOOK_MESSAGE, TRADE_DESK } from "@/lib/catalog";
import { Icon } from "./Icon";
import { ToastButton } from "./Toast";

const CREDENTIALS = [
  { icon: "verified", title: "SEDEX SMETA Member", text: "4-Pillar Audited Workplace" },
  { icon: "shield_with_heart", title: "ISO 9001:2015 Certified", text: "Strict Quality Management System" },
  { icon: "eco", title: "REACH Chemical Compliant", text: "Vegetable Chrome-Free Tanning" },
  { icon: "account_balance", title: "Islamabad Chamber (ICCI)", text: "Registered Exporter #ICC-4491-L" },
];

const PROGRAM_CODES = ["VR-101", "VR-204", "VR-308", "VR-412", "VR-620"];

const LINK = "hover:text-primary transition-colors";

export function Footer() {
  const programs = CONTRACT_ARTICLES.filter((a) => PROGRAM_CODES.includes(a.code));

  return (
    <footer className="w-full bg-surface-container-low border-t border-outline-variant/30 pt-16 pb-12">
      <div className="max-w-360 mx-auto px-margin md:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 pb-12 border-b border-outline-variant/25 text-xs text-on-surface-variant">
          {CREDENTIALS.map((c) => (
            <div key={c.title} className="flex items-center gap-3">
              <Icon name={c.icon} className="text-[24px] text-accent-saddle" />
              <div>
                <strong className="text-on-surface block">{c.title}</strong>
                <span className="text-[11px] font-light">{c.text}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 py-12">
          <div className="lg:col-span-2 space-y-4">
            <img alt={`${BRAND} Logo`} className="h-8 w-auto object-contain" src={LOGO_SRC} />
            <p className="text-xs text-on-surface-variant font-light leading-relaxed max-w-sm">
              Contract leather manufacturing facility and export house combining master Pakistani leather artisans with
              British and European anatomical design benchmarks.
            </p>
            <div className="text-xs text-on-surface-variant space-y-1">
              <p>
                <strong className="font-semibold text-primary">Islamabad Manufacture:</strong> {TRADE_DESK.address}
              </p>
              <p>
                <strong className="font-semibold text-primary">Direct Trade Desk:</strong>{" "}
                <a className="hover:underline text-accent-saddle" href={TRADE_DESK.tel}>
                  {TRADE_DESK.phone}
                </a>{" "}
                |{" "}
                <a className="hover:underline text-accent-saddle" href={`mailto:${TRADE_DESK.email}`}>
                  {TRADE_DESK.email}
                </a>
              </p>
              <p>
                <strong className="font-semibold text-primary">European Liaison:</strong> Mayfair, London &amp; Edinburgh
                Workbenches
              </p>
            </div>
          </div>
          <div>
            <h5 className="text-xs font-semibold tracking-eyebrow uppercase text-on-surface mb-3">Contract Programs</h5>
            <ul className="space-y-2 text-xs text-on-surface-variant font-light">
              {programs.map((a) => (
                <li key={a.code}>
                  <Link className={LINK} href="/#catalog-section">
                    Art # {a.code} {a.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h5 className="text-xs font-semibold tracking-eyebrow uppercase text-on-surface mb-3">B2B Trade Portal</h5>
            <ul className="space-y-2 text-xs text-on-surface-variant font-light">
              <li>
                <Link className={LINK} href="/#rfq-portal">
                  Submit RFQ Specification
                </Link>
              </li>
              <li>
                <Link className={LINK} href="/#production-tracker">
                  Track Commission Batch
                </Link>
              </li>
              <li>
                <ToastButton className={LINK} message={LOOKBOOK_MESSAGE}>
                  Download 2026 Lookbook (PDF)
                </ToastButton>
              </li>
              <li>
                <ToastButton className={LINK} message="Factory physical tour booking open for B2B buyers">
                  Factory Visit &amp; Audit Tour
                </ToastButton>
              </li>
              <li>
                <ToastButton className={LINK} message="Lab reports for REACH chemical analysis requested">
                  REACH Compliance Sheets
                </ToastButton>
              </li>
            </ul>
          </div>
          <div>
            <h5 className="text-xs font-semibold tracking-eyebrow uppercase text-on-surface mb-3">Direct WhatsApp Desk</h5>
            <p className="text-xs text-on-surface-variant font-light mb-3">
              Connect directly with our Islamabad engineering desk for instant CAD and MOQ consultation.
            </p>
            <a
              className="inline-flex items-center gap-2 bg-primary text-surface px-4 py-2.5 rounded text-xs font-semibold uppercase tracking-wider hover:bg-primary-container shadow-sm transition-colors"
              href={TRADE_DESK.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon name="chat" className="text-[18px] text-secondary-container" />
              <span>WhatsApp Quick Chat</span>
            </a>
          </div>
        </div>
        <div className="pt-8 border-t border-outline-variant/25 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-on-surface-variant font-light">
          <p>
            © {new Date().getFullYear()} {BRAND} Leathercraft Mfg Ltd. All rights reserved. Islamabad, Pakistan.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6">
            <Link className="hover:text-on-surface transition-colors" href="#">
              SEDEX Compliance Terms
            </Link>
            <Link className="hover:text-on-surface transition-colors" href="#">
              Non-Disclosure Agreement (NDA)
            </Link>
            <Link className="hover:text-on-surface transition-colors" href="#">
              Incoterms &amp; Freight Rates
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
