"use client";

import { useState } from "react";

export function NewsletterForm() {
  const [joined, setJoined] = useState(false);

  return (
    <form
      className="space-y-space-xs"
      onSubmit={(e) => {
        e.preventDefault();
        setJoined(true);
      }}
    >
      <div className="flex">
        <input
          aria-label="Email address"
          className="w-full bg-surface border border-outline-variant rounded-l-lg px-space-sm py-2 font-body-sm text-body-sm text-on-surface focus:outline-none focus:border-primary"
          placeholder="Your email address"
          type="email"
          required
          disabled={joined}
        />
        <button
          className="bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md uppercase tracking-wider px-space-md py-2 rounded-r-lg transition-colors disabled:opacity-70"
          type="submit"
          disabled={joined}
        >
          {joined ? "Joined" : "Join"}
        </button>
      </div>
      <span className="font-label-sm text-label-sm text-secondary block" role="status">
        {joined ? "Welcome to the Journal. Your first letter is on its way." : "Unsubscribe at any moment. Never shared."}
      </span>
    </form>
  );
}
