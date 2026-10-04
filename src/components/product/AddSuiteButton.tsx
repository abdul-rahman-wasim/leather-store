"use client";

import { useEffect, useState } from "react";
import { IMG } from "@/lib/catalog";
import { actions } from "@/lib/store";
import { Icon } from "../Icon";

export function AddSuiteButton() {
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (!added) return;
    const t = setTimeout(() => setAdded(false), 1800);
    return () => clearTimeout(t);
  }, [added]);

  return (
    <button
      className={`w-full text-on-primary py-4 px-6 flex items-center justify-center gap-3 text-label-md font-label-md uppercase tracking-eyebrow transition-all duration-200 active:scale-95 shadow-md ${
        added ? "bg-secondary" : "bg-primary hover:bg-primary-container"
      }`}
      type="button"
      aria-live="polite"
      onClick={() => {
        actions.addItem({
          productId: "highlands-suite",
          name: "Highland Field Trio",
          collection: "The Canine Collection",
          image: `${IMG}AB6AXuANdt3JKzJmR25y6EBz5ehmbVUoybFzINOyBjNpqa98WqdxFpWaXGewmAL2Y9C_ZiqSHptW9fqrv7ejwbItzjOJDlAilht5ekIY_WScdmgCPcROeB2lQt5cRk7Ubn59W-rg1rr3Bppzs5LhdF2XipdEBRz_IHS3pgebqu-SRdg_LDrKvbdsuE6MlXI7mlLaBbAv-zYymJhNVamA703VYq8TmU4rdnz5nVYRpSVwnASYZhfxa5x-vSb4`,
          imageAlt: "Cognac tan leather dog harness on a warm limestone studio background",
          priceUsd: 260,
          priceGbp: 210,
          material: "Bundle • Save $35",
          details: [
            { label: "Harness", value: "Highlands, Cognac Tan" },
            { label: "Lead", value: "Highlands 6ft" },
            { label: "Pouch", value: "Carrier Pouch" },
            { label: "Hardware", value: "Solid Brass" },
          ],
        });
        setAdded(true);
      }}
    >
      <Icon name={added ? "check_circle" : "inventory_2"} className="text-[18px]" />
      <span>{added ? "Suite Added to Satchel" : "Add Complete Suite • $260"}</span>
    </button>
  );
}
