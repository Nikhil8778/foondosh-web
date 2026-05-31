import Header from "@/components/Header";
import { prisma } from "@/lib/prisma";

export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({
    include: {
      customer: true,
      partner: true,
      driver: true,
      items: { include: { product: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-4xl font-bold mb-6">Admin Orders</h1>

        <div className="space-y-5">
          {orders.map((order) => (
            <div key={order.id} className="bg-white rounded-3xl shadow p-6">
              <div className="flex justify-between">
                <div>
                  <h2 className="font-bold text-xl">{order.orderNumber}</h2>
                  <p>{order.customer?.name} • {order.customerPhone}</p>
                  <p className="text-gray-500">{order.deliveryAddress}</p>
                </div>

                <div className="text-right">
                  <p className="font-bold">₹{(order.totalCents / 100).toFixed(0)}</p>
                  <p className="text-orange-600">{order.status}</p>
                </div>
              </div>

              <div className="mt-4 border-t pt-4">
                <p className="font-semibold">{order.partner.name}</p>
                {order.items.map((item) => (
                  <p key={item.id} className="text-gray-600">
                    {item.quantity} × {item.product.name}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}