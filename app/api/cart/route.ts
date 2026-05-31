import { NextResponse } from "next/server";
import { addToCart, getCart } from "@/lib/cart-store";

export async function GET() {
  return NextResponse.json(getCart());
}

export async function POST(req: Request) {
  const item = await req.json();
  const cart = addToCart(item);

  return NextResponse.json(cart);
}