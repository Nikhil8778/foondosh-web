"use client";

import Link from "next/link";
import { useCartStore } from "@/lib/cart-store";

export default function Header() {
  const items = useCartStore((state) => state.items);
  const totalQty = items.reduce((sum: number, item: any) => sum + item.quantity, 0);

  return (
    <header className="bg-white border-b">
      <div className="max-w-6xl mx-auto p-5 flex items-center justify-between">
        <Link href="/" className="text-3xl font-bold text-red-600">
          Foondosh
        </Link>

        <nav className="flex items-center gap-6">
          <Link href="/restaurants">Restaurants</Link>
          <Link href="/medicine">Medicine</Link>
          <Link href="/grocery">Grocery</Link>

          <Link
            href="/cart"
            className={`relative px-5 py-2 rounded-full text-white ${
              totalQty > 0 ? "bg-green-600" : "bg-black"
            }`}
          >
            Cart

            {totalQty > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                {totalQty}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}