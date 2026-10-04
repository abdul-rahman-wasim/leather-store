"use client";

import { useState } from "react";

export function NewsletterForm() {
  const [joined, setJoined] = useState(false);

  return (
    <form
      className="space-y-2"
      onSubmit={(e) => {
        e.preventDefault();
        setJoined(true);
      }}
    >
      <div className="flex">
        <input
          aria-label="Email address"
          className="w-full bg-surface-container-lowest border border-outline-variant/30 text-xs px-3 py-2.5 rounded-l-sm text-on-surface focus:outline-none focus:border-primary"
          placeholder="patron@estate.co.uk"
          type="email"
          required
          disabled={joined}
        />
        <button
          className="bg-primary hover:bg-primary-container text-surface px-4 text-xs font-semibold uppercase tracking-wider rounded-r-sm transition-all active:scale-95 duration-150 disabled:opacity-70"
          type="submit"
          disabled={joined}
        >
          {joined ? "Joined" : "Join"}
        </button>
      </div>
      <span className="text-[10px] text-on-surface-variant/70 block" role="status">
        {joined ? "Welcome to the Journal. Your first letter is on its way." : "Unsubscribe at any moment. Never shared."}
      </span>
    </form>
  );
}
