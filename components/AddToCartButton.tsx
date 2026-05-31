"use client";

export default function AddToCartButton({ item }: { item: any }) {
  async function addToCart() {
    await fetch("/api/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    });

    alert("Added to cart");
  }

  return (
    <button
      onClick={addToCart}
      className="bg-black text-white px-5 py-2 rounded-full h-fit"
    >
      Add
    </button>
  );
}