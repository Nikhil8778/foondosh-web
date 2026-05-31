"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";

export default function CartPage() {
  const [cart, setCart] = useState<any[]>([]);

  async function loadCart() {
    const res = await fetch("/api/cart");
    const data = await res.json();
    setCart(data);
  }

  useEffect(() => {
    loadCart();
  }, []);

  const subtotal = cart.reduce(
    (sum, item) => sum + item.priceCents * item.quantity,
    0
  );

  const deliveryFee = cart.length > 0 ? 3000 : 0;
  const total = subtotal + deliveryFee;

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <Header />
      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow p-6">
        <h1 className="text-3xl font-bold mb-6">Your cart</h1>

        {cart.length === 0 ? (
          <p className="text-gray-600">Your cart is empty.</p>
        ) : (
          <>
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between border-b py-4">
                <div>
                  <h2 className="font-bold">{item.name}</h2>
                  <p className="text-gray-500">Qty: {item.quantity}</p>
                </div>

                <p className="font-semibold">
                  ₹{((item.priceCents * item.quantity) / 100).toFixed(0)}
                </p>
              </div>
            ))}

            <div className="mt-6 space-y-3">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{(subtotal / 100).toFixed(0)}</span>
              </div>

              <div className="flex justify-between">
                <span>Delivery Fee</span>
                <span>₹{(deliveryFee / 100).toFixed(0)}</span>
              </div>

              <div className="flex justify-between font-bold text-xl border-t pt-4">
                <span>Total</span>
                <span>₹{(total / 100).toFixed(0)}</span>
              </div>
            </div>

            <Link
              href="/checkout"
              className="block text-center mt-8 bg-black text-white py-4 rounded-full font-bold"
            >
              Go to checkout
            </Link>
          </>
        )}
      </div>
    </main>
  );
}