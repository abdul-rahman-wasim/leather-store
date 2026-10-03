"use client";

import { useEffect, useState } from "react";
import { IMG } from "@/lib/catalog";
import { actions } from "@/lib/store";

export function AddSuiteButton() {
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (!added) return;
    const t = setTimeout(() => setAdded(false), 1800);
    return () => clearTimeout(t);
  }, [added]);

  return (
    <button
      className={`text-on-primary font-label-md text-label-md uppercase tracking-wider px-space-lg py-3 rounded-lg shadow-sm transition-all ${
        added ? "bg-tertiary" : "bg-primary hover:bg-primary-container"
      }`}
      type="button"
      onClick={() => {
        actions.addItem({
          productId: "highlands-suite",
          name: "The Highlands Canine Suite",
          collection: "The Canine Collection",
          image: `${IMG}AB6AXuAbW8dZZLjSz5ifIDhNq4ZqbS5jl6Xl0GaQC5OejDPqgNlnNs09o-xeDb0Z3uAIfQZoJUu12raccT1Vq5WGdZx_f7zmym3LdOyyJmKAdQOUC1OvTATD6e7ihJ0ndlDUeH05t5g3OcLePhw087sJJccr6fi5VSvc4fJSquGftN1pDNWq0v3ifSROZ3PZRak4IqKQHdpejQCYFVlnUSAIaO06Yy3H2vnv5EaCYKFdGS-T_CMOXwaIzuzY`,
          imageAlt: "Highlands Ergonomic Harness in saddle cognac leather",
          priceUsd: 260,
          priceGbp: 210,
          material: "Bundle • Save $35",
          badge: { label: "Curated Suite", tone: "tertiary" },
          details: [
            { label: "Harness", value: "Ergonomic, Cognac Tan" },
            { label: "Lead", value: "Highlands 6ft" },
            { label: "Pouch", value: "Leather Carrier" },
            { label: "Hardware", value: "Solid Brass" },
          ],
        });
        setAdded(true);
      }}
    >
      {added ? "Suite Added to Bag" : "Add Complete Suite"}
    </button>
  );
}
