"use client";

import { useState } from "react";
import { Icon } from "../Icon";

const INTERESTS = [
  { value: "duffle", label: "The Highland Duffle Bag" },
  { value: "canine", label: "Custom Canine Harness Sizes" },
  { value: "shoes", label: "Goodyear Welted Boot Restocks" },
  { value: "jackets", label: "Bespoke Outerwear Fitting" },
  { value: "all", label: "Full Atelier Collection" },
];

export function WaitlistForm() {
  const [interest, setInterest] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const interestLabel = INTERESTS.find((i) => i.value === interest)?.label;

  return (
    <>
      <form
        className="space-y-space-sm"
        onSubmit={(e) => {
          e.preventDefault();
          setSubmitted(true);
        }}
      >
        <div>
          <label
            className="block font-label-md text-label-md uppercase tracking-wider text-on-surface mb-1"
            htmlFor="waitlist-email"
          >
            Patron Email Address
          </label>
          <input
            className="w-full bg-surface-bright px-space-md py-3 rounded-lg text-on-surface font-body-sm text-body-sm focus:outline-none focus:ring-2 focus:ring-primary shadow-sm"
            id="waitlist-email"
            placeholder="patron@estate.co.uk"
            required
            type="email"
          />
        </div>
        <div>
          <label
            className="block font-label-md text-label-md uppercase tracking-wider text-on-surface mb-1"
            htmlFor="interest-select"
          >
            Primary Collection Interest
          </label>
          <select
            className="w-full bg-surface-bright px-space-md py-3 rounded-lg text-on-surface font-body-sm text-body-sm focus:outline-none focus:ring-2 focus:ring-primary shadow-sm"
            id="interest-select"
            value={interest ?? INTERESTS[0].value}
            onChange={(e) => setInterest(e.target.value)}
          >
            {INTERESTS.map((i) => (
              <option key={i.value} value={i.value}>
                {i.label}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-space-xs pt-1">
          <input className="w-4 h-4 rounded accent-primary" id="waitlist-terms" required type="checkbox" />
          <label className="font-label-sm text-label-sm text-on-surface-variant" htmlFor="waitlist-terms">
            Notify me of private atelier previews and hide lot allocations.
          </label>
        </div>
        <button
          className="w-full bg-primary text-on-primary hover:bg-primary-container transition-colors py-3 rounded font-label-md text-label-md uppercase tracking-wider font-semibold shadow-md active:scale-[0.99] flex items-center justify-center gap-space-xs mt-space-md disabled:opacity-70"
          type="submit"
          disabled={submitted}
        >
          <Icon name="lock" className="text-[18px]" />
          <span>{interestLabel ? `Join Waitlist for ${interestLabel}` : "Join The Atelier Waitlist"}</span>
        </button>
      </form>
      {submitted && (
        <div
          className="mt-space-md p-space-sm bg-surface-bright rounded-lg text-primary text-center font-body-sm text-body-sm flex items-center justify-center gap-space-xs"
          role="status"
        >
          <Icon name="verified" className="text-[18px]" />
          <span>Welcome to the registry. Your private invitation is dispatched.</span>
        </div>
      )}
    </>
  );
}
