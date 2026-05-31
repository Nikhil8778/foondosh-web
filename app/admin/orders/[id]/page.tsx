import { prisma } from "@/lib/prisma";

export default async function OrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const order = await prisma.order.findUnique({
    where: { id },
    include: {
      customer: true,
      partner: true,
      items: {
        include: {
          product: true,
        },
      },
    },
  });

  if (!order) {
    return <div className="p-10">Order not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">
        {order.orderNumber}
      </h1>

      <div className="bg-white rounded-xl border p-6 space-y-4">

        <div>
          <div className="font-semibold">Customer</div>
          <div>{order.customer?.name}</div>
          <div>{order.customer?.phone}</div>
        </div>

        <div>
          <div className="font-semibold">Restaurant</div>
          <div>{order.partner?.name}</div>
        </div>

        <div>
          <div className="font-semibold mb-2">Items</div>

          {order.items.map((item) => (
            <div
              key={item.id}
              className="flex justify-between py-2 border-b"
            >
              <span>
                {item.quantity} x {item.product.name}
              </span>

              <span>
                ₹{(item.priceCents / 100).toFixed(0)}
              </span>
            </div>
          ))}
        </div>

        <div className="text-xl font-bold">
          Total ₹{(order.totalCents / 100).toFixed(0)}
        </div>

        <div className="flex gap-3 pt-4">
          <button className="bg-yellow-500 text-white px-4 py-2 rounded">
            Accept
          </button>

          <button className="bg-blue-500 text-white px-4 py-2 rounded">
            Preparing
          </button>

          <button className="bg-green-600 text-white px-4 py-2 rounded">
            Delivered
          </button>

          <button className="bg-red-600 text-white px-4 py-2 rounded">
            Cancel
          </button>
        </div>

      </div>
    </div>
  );
}