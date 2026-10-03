import type { Metadata } from "next";
import { CartView } from "@/components/cart/CartView";

export const metadata: Metadata = {
  title: "Bespoke Cart & Courier Dispatch",
};

export default function CartPage() {
  return <CartView />;
}
