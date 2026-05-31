import { prisma } from "@/lib/prisma";
import { getCart, clearCart } from "@/lib/cart-store";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const cart = getCart();

    if (!cart.length) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    const partnerId = cart[0].partnerId;

    const subtotalCents = cart.reduce(
      (sum, item) => sum + item.priceCents * item.quantity,
      0
    );

    const deliveryCents = 3000;
    const totalCents = subtotalCents + deliveryCents;

    const customer = await prisma.user.upsert({
      where: { phone: body.phone },
      update: { name: body.name },
      create: {
        name: body.name,
        phone: body.phone,
        role: "CUSTOMER",
      },
    });

    const order = await prisma.order.create({
      data: {
        orderNumber: `FD-${Date.now()}`,
        customerId: customer.id,
        partnerId,
        customerPhone: body.phone,
        deliveryAddress: body.address,
        subtotalCents,
        deliveryCents,
        taxCents: 0,
        totalCents,
        paymentMethod: "COD",
        paymentStatus: "PENDING",
        status: "PENDING",
        items: {
          create: cart.map((item) => ({
            productId: item.id,
            quantity: item.quantity,
            priceCents: item.priceCents,
          })),
        },
      },
    });

    clearCart();

    return NextResponse.json(order);
  } catch (error: any) {
    console.error("ORDER_CREATE_ERROR", error);

    return NextResponse.json(
      { error: error.message || "Order creation failed" },
      { status: 500 }
    );
  }
}