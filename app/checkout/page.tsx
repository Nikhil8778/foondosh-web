"use client";

import { useState } from "react";
import Header from "@/components/Header";

export default function CheckoutPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState("");

  async function placeOrder() {
    const res = await fetch("/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, phone, address }),
    });

    const data = await res.json();

    if (res.ok) {
      setMessage(`Order placed successfully! Order #${data.orderNumber}`);
    } else {
      setMessage(data.error || "Something went wrong");
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <Header />
      <div className="max-w-xl mx-auto bg-white rounded-3xl shadow p-6">
        <h1 className="text-3xl font-bold mb-6">Checkout</h1>

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

        <button
          onClick={placeOrder}
          className="w-full bg-black text-white py-4 rounded-full font-bold"
        >
          Place Order
        </button>

        {message && <p className="mt-4 font-semibold">{message}</p>}
      </div>
    </main>
  );
}