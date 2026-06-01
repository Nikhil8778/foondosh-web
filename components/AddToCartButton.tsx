"use client";

import { useCartStore } from "@/lib/cart-store";

export default function AddToCartButton({ item }: { item: any }) {
  const addItem = useCartStore((state) => state.addItem);

  return (
    <button
      onClick={() => addItem(item)}
      className="bg-black text-white px-5 py-2 rounded-full h-fit"
    >
      Add
    </button>
  );
}