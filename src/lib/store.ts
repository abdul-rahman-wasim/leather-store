import { useSyncExternalStore } from "react";
import { SEED_CART, type CartItem, type CartItemInput, type Currency } from "./catalog";

export type Region = "us" | "uk" | "scot";

type StoreState = {
  cart: CartItem[];
  region: Region;
  wishlist: string[];
};

const STORAGE_KEY = "velluto-hide-store-v1";
const INITIAL: StoreState = { cart: SEED_CART, region: "us", wishlist: [] };

let state = INITIAL;
let loaded = false;
const listeners = new Set<() => void>();

function load() {
  if (loaded || typeof window === "undefined") return;
  loaded = true;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) state = { ...INITIAL, ...JSON.parse(raw) };
  } catch {}
}

function setState(update: (s: StoreState) => StoreState) {
  load();
  state = update(state);
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {}
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot() {
  load();
  return state;
}

function getServerSnapshot() {
  return INITIAL;
}

function itemSignature(item: CartItemInput) {
  return item.productId + JSON.stringify(item.details);
}

export const actions = {
  addItem(item: CartItemInput, qty = 1) {
    setState((s) => {
      const sig = itemSignature(item);
      const existing = s.cart.find((c) => itemSignature(c) === sig);
      if (existing) {
        return { ...s, cart: s.cart.map((c) => (c === existing ? { ...c, qty: c.qty + qty } : c)) };
      }
      const key = `${item.productId}-${Date.now().toString(36)}`;
      return { ...s, cart: [...s.cart, { ...item, key, qty }] };
    });
  },
  updateQty(key: string, delta: number) {
    setState((s) => ({
      ...s,
      cart: s.cart.map((c) => (c.key === key ? { ...c, qty: Math.max(1, c.qty + delta) } : c)),
    }));
  },
  removeItem(key: string) {
    setState((s) => ({ ...s, cart: s.cart.filter((c) => c.key !== key) }));
  },
  setRegion(region: Region) {
    setState((s) => ({ ...s, region }));
  },
  setCurrency(currency: Currency) {
    setState((s) => {
      if (currency === "USD") return { ...s, region: "us" };
      return s.region === "us" ? { ...s, region: "uk" } : s;
    });
  },
  toggleWishlist(id: string) {
    setState((s) => ({
      ...s,
      wishlist: s.wishlist.includes(id) ? s.wishlist.filter((w) => w !== id) : [...s.wishlist, id],
    }));
  },
};

export function useStore() {
  const s = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const currency: Currency = s.region === "us" ? "USD" : "GBP";
  const itemCount = s.cart.reduce((n, c) => n + c.qty, 0);
  const subtotal = s.cart.reduce((n, c) => n + c.qty * (currency === "USD" ? c.priceUsd : c.priceGbp), 0);
  return { ...s, currency, itemCount, subtotal };
}
