"use client";

import Header from "@/components/Header";
import Link from "next/link";
import { useCartStore } from "@/lib/cart-store";

export default function CartPage() {
  const items = useCartStore((state) => state.items);

  const subtotal = items.reduce(
    (sum, item) => sum + item.priceCents * item.quantity,
    0
  );

  const deliveryFee = items.length > 0 ? 3000 : 0;
  const tax = Math.round(subtotal * 0.05);
  const total = subtotal + deliveryFee + tax;

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />

      <section className="max-w-3xl mx-auto p-6 mt-8">
        <div className="bg-white rounded-3xl shadow p-8">
          <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

          {items.length === 0 ? (
            <div>
              <p className="text-gray-500">Your cart is empty.</p>
              <Link
                href="/restaurants"
                className="inline-block mt-6 bg-black text-white px-6 py-3 rounded-full"
              >
                Browse Restaurants
              </Link>
            </div>
          ) : (
            <>
              <div className="space-y-5">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between border-b pb-4"
                  >
                    <div>
                      <h2 className="font-bold">{item.name}</h2>
                      <p className="text-gray-500">Qty: {item.quantity}</p>
                    </div>

                    <p className="font-semibold">
                      ₹{((item.priceCents * item.quantity) / 100).toFixed(0)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6 space-y-3 text-gray-700">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{(subtotal / 100).toFixed(0)}</span>
                </div>

                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span>₹{(deliveryFee / 100).toFixed(0)}</span>
                </div>

                <div className="flex justify-between">
                  <span>Taxes</span>
                  <span>₹{(tax / 100).toFixed(0)}</span>
                </div>

                <div className="border-t pt-4 flex justify-between text-xl font-bold">
                  <span>Total</span>
                  <span>₹{(total / 100).toFixed(0)}</span>
                </div>
              </div>

              <Link
              href="/checkout"
              className="block text-center mt-8 bg-green-600 hover:bg-green-700 transition-all text-white rounded-full py-4 font-semibold"
            >
              Proceed to Payment → ₹{(total / 100).toFixed(0)}
            </Link>
            </>
          )}
        </div>
      </section>
    </main>
  );
}