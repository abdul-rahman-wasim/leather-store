"use client";

import { useState } from "react";
import { Icon } from "../Icon";

const INTERESTS = [
  { value: "duffle", label: "The Highland Duffle Bag" },
  { value: "canine", label: "Custom Canine Harness Sizes" },
  { value: "shoes", label: "Goodyear Welted Boot Restocks" },
  { value: "jackets", label: "Bespoke Outerwear Commission" },
  { value: "all", label: "Full Atelier Collection" },
];

const FIELD =
  "w-full bg-surface-container-low border border-outline-variant/30 rounded-sm px-4 py-3 text-sm text-on-surface focus:outline-none focus:border-primary transition-colors";
const LABEL = "block text-[11px] font-semibold uppercase tracking-eyebrow text-on-surface mb-2";

export function WaitlistForm() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <>
      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          setSubmitted(true);
        }}
      >
        <div>
          <label className={LABEL} htmlFor="waitlist-email">
            Patron Email Address
          </label>
          <input className={FIELD} id="waitlist-email" placeholder="patron@estate.co.uk" required type="email" />
        </div>
        <div>
          <label className={LABEL} htmlFor="interest-select">
            Primary Collection Interest
          </label>
          <select className={FIELD} id="interest-select" defaultValue={INTERESTS[0].value}>
            {INTERESTS.map((i) => (
              <option key={i.value} value={i.value}>
                {i.label}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-2.5 pt-2">
          <input className="w-4 h-4 rounded accent-primary cursor-pointer" id="waitlist-terms" required type="checkbox" />
          <label className="text-xs text-on-surface-variant font-light cursor-pointer" htmlFor="waitlist-terms">
            Notify me of private previews &amp; lot dispatches
          </label>
        </div>
        <button
          className={`w-full mt-4 text-surface transition-all duration-200 active:scale-95 active:translate-y-0.5 text-xs font-semibold tracking-eyebrow uppercase py-4 rounded-sm shadow-md flex items-center justify-center gap-2 ${
            submitted ? "bg-secondary" : "bg-primary hover:bg-primary-container"
          }`}
          type="submit"
          disabled={submitted}
        >
          <Icon name={submitted ? "check" : "lock"} className="text-[17px]" />
          <span>{submitted ? "Joined Priority Atelier" : "Join The Atelier Waitlist"}</span>
        </button>
      </form>
      {submitted && (
        <p className="mt-4 text-xs text-secondary text-center" role="status">
          Welcome to the registry. Your private invitation is dispatched.
        </p>
      )}
    </>
  );
}
