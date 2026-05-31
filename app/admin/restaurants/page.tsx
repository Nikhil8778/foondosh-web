import Header from "@/components/Header";
import { prisma } from "@/lib/prisma";

export default async function AdminRestaurantsPage() {
  const partners = await prisma.partner.findMany({
    include: { products: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-4xl font-bold mb-6">Admin Partners</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {partners.map((partner) => (
            <div key={partner.id} className="bg-white rounded-3xl shadow p-6">
              <h2 className="text-xl font-bold">{partner.name}</h2>
              <p className="text-orange-600">{partner.type}</p>
              <p className="text-gray-600">{partner.city}</p>
              <p className="mt-3">{partner.products.length} products</p>
              <p className="text-sm text-gray-500 mt-2">{partner.phone}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}