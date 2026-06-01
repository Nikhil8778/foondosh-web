"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import { useCartStore } from "@/lib/cart-store";

export default function CheckoutPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [landmark, setLandmark] = useState("");
  const [instructions, setInstructions] = useState("");
  const [loading, setLoading] = useState(false);
  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);

  async function placeOrder() {
    if (!name || !phone || !address) {
      alert("Please enter name, phone and delivery address");
      return;
    }

    setLoading(true);

    const res = await fetch("/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
     body: JSON.stringify({
      name,
      phone,
      address: `${address}${landmark ? `, Landmark: ${landmark}` : ""}${
        instructions ? `, Instructions: ${instructions}` : ""
      }`,
      items,
    }),
    });

    const data = await res.json();

    setLoading(false);

   if (res.ok) {
      clearCart();
      router.push(`/order-success?order=${data.orderNumber}`);
    } else {
      alert(data.error || "Something went wrong");
    }
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />

      <section className="max-w-xl mx-auto p-6 mt-8">
        <div className="bg-white rounded-3xl shadow p-8">
          <h1 className="text-3xl font-bold mb-2">Checkout</h1>
          <p className="text-gray-500 mb-6">
            Enter delivery details before payment.
          </p>

          <input
            className="w-full border rounded-xl p-4 mb-4"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            className="w-full border rounded-xl p-4 mb-4"
            placeholder="Phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <textarea
            className="w-full border rounded-xl p-4 mb-4"
            placeholder="Delivery address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />

          <input
            className="w-full border rounded-xl p-4 mb-4"
            placeholder="Landmark / nearby place"
            value={landmark}
            onChange={(e) => setLandmark(e.target.value)}
          />

          <textarea
            className="w-full border rounded-xl p-4 mb-6"
            placeholder="Instructions for driver"
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
          />

          <button
            onClick={placeOrder}
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-full font-bold disabled:opacity-60"
          >
            {loading ? "Processing..." : "Pay & Place Order"}
          </button>
        </div>
      </section>
    </main>
  );
}