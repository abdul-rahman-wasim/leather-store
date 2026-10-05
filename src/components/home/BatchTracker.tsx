"use client";

import { useState } from "react";
import { Icon } from "../Icon";
import { toast } from "../Toast";

const PROGRESS = 74;

const STEPS = [
  {
    title: "Hide Selection & Soak",
    text: "Vegetable oak & mimosa soak verified REACH compliant.",
    note: "Completed Sep 28",
    state: "done",
  },
  {
    title: "Pattern & CNC Cut",
    text: "Precision hide cutting, grain matching & skiving.",
    note: "Completed Oct 03",
    state: "done",
  },
  {
    title: "Artisan Bench Stitching",
    text: `Two-needle saddle stitching & burnishing in progress (${PROGRESS}%).`,
    note: "Bench 4 • Islamabad Floor",
    state: "current",
  },
  {
    title: "QA & Hardware Stamp",
    text: "Tensile pull test & custom brass monogram debossing.",
    note: "Queued Oct 12",
    state: "queued",
    icon: "schedule",
  },
  {
    title: "Air Cargo Handover",
    text: "Islamabad Int'l (ISB) to London Heathrow (LHR) DDP.",
    note: "Scheduled Oct 16",
    state: "queued",
    icon: "flight_takeoff",
  },
] as const;

const pad = (n: number) => String(n).padStart(2, "0");

export function BatchTracker() {
  const [po, setPo] = useState("VR-COMM-849");

  return (
    <div className="bg-surface-container-lowest p-6 sm:p-8 rounded-lg border border-outline-variant/30 shadow-md saddle-stitch">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center border-b border-outline-variant/20 pb-6 mb-8">
        <form
          className="md:col-span-5"
          onSubmit={(e) => {
            e.preventDefault();
            toast(`Real-time bench status verified for Commission ${po.trim().toUpperCase()}`);
          }}
        >
          <label className="block text-[11px] font-semibold uppercase tracking-wider text-on-surface mb-1.5" htmlFor="track-po">
            Enter Commission PO / Contract Batch #
          </label>
          <div className="flex gap-2">
            <input
              className="flex-1 min-w-0 bg-surface-container-low border border-outline-variant/40 rounded-sm px-3.5 py-2 text-xs text-on-surface font-mono uppercase focus:outline-none focus:border-primary"
              id="track-po"
              value={po}
              onChange={(e) => setPo(e.target.value)}
            />
            <button
              className="bg-primary hover:bg-primary-container text-surface text-xs uppercase tracking-wider font-semibold px-5 py-2 rounded-sm transition-all"
              type="submit"
            >
              Track
            </button>
          </div>
        </form>
        <div className="md:col-span-7 flex flex-wrap items-center gap-3 text-xs text-on-surface-variant md:justify-end">
          <span className="inline-flex items-center gap-1.5 bg-surface-container px-3 py-1 rounded border border-outline-variant/30">
            <strong className="text-on-surface">Client:</strong> Kensington Saddlery Co. (London)
          </span>
          <span className="inline-flex items-center gap-1.5 bg-surface-container px-3 py-1 rounded border border-outline-variant/30">
            <strong className="text-on-surface">Article:</strong> Art # VR-204 (150 Harnesses)
          </span>
          <span className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-900 font-semibold px-3 py-1 rounded border border-emerald-300">
            Stage 3 of 5 (Active)
          </span>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
          <span>Islamabad Manufacturing Floor Real-Time Progress</span>
          <span className="text-accent-saddle">{PROGRESS}% Complete</span>
        </div>
        <div
          className="w-full bg-surface-container h-2.5 rounded-full overflow-hidden border border-outline-variant/30"
          role="progressbar"
          aria-valuenow={PROGRESS}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Batch production progress"
        >
          <div className="bg-accent-saddle h-full rounded-full transition-all duration-700" style={{ width: `${PROGRESS}%` }} />
        </div>
        <ol className="grid grid-cols-1 sm:grid-cols-5 gap-3 pt-4">
          {STEPS.map((s, i) => {
            const step = `Step ${pad(i + 1)}`;
            if (s.state === "current") {
              return (
                <li key={s.title} className="bg-primary text-surface p-3.5 rounded border-2 border-secondary-container text-xs shadow-md">
                  <div className="flex items-center gap-1.5 text-secondary-container font-bold mb-1">
                    <span className="w-2 h-2 rounded-full bg-secondary-container animate-ping" />
                    <span className="text-[10px] uppercase tracking-wider">{step} • Current</span>
                  </div>
                  <p className="font-semibold text-surface-bright text-[12px]">{s.title}</p>
                  <p className="text-[10px] text-surface-container-high/80 font-light mt-0.5">{s.text}</p>
                  <span className="text-[9px] text-secondary-container font-semibold block mt-2">{s.note}</span>
                </li>
              );
            }
            const done = s.state === "done";
            return (
              <li
                key={s.title}
                className={`bg-surface-container-low p-3.5 rounded border text-xs ${
                  done ? "border-emerald-500/40" : "border-outline-variant/30 opacity-75"
                }`}
              >
                <div className={`flex items-center gap-1.5 mb-1 ${done ? "text-emerald-800 font-bold" : "text-outline font-semibold"}`}>
                  <Icon name={done ? "check_circle" : s.icon} className="text-[16px]" />
                  <span className="text-[10px] uppercase">{step}</span>
                </div>
                <p className="font-semibold text-on-surface text-[12px]">{s.title}</p>
                <p className="text-[10px] text-on-surface-variant font-light mt-0.5">{s.text}</p>
                <span className={`text-[9px] block mt-2 ${done ? "text-emerald-700 font-medium" : "text-on-surface-variant font-light"}`}>
                  {s.note}
                </span>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
