import Link from "next/link";
import Header from "@/components/Header";
import { prisma } from "@/lib/prisma";

export default async function RestaurantsPage() {
  const partners = await prisma.partner.findMany({
    where: {
      type: "RESTAURANT",
      isActive: true,
    },
    include: {
      products: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />

      <section className="max-w-6xl mx-auto p-6">
        <h1 className="text-4xl font-bold">Restaurants near you</h1>
        <p className="text-gray-500 mt-2">Order food from local restaurants</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {partners.map((restaurant) => (
            <Link
              key={restaurant.id}
              href={`/restaurants/${restaurant.id}`}
              className="bg-white rounded-3xl shadow overflow-hidden"
            >
              <div className="h-40 bg-orange-100 flex items-center justify-center text-5xl">
                🍛
              </div>

              <div className="p-5">
                <h2 className="text-xl font-bold">{restaurant.name}</h2>
                <p className="text-gray-500">{restaurant.city}</p>
                <p className="text-sm text-gray-500 mt-3">
                  {restaurant.products.length} menu items · 25-40 min
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
} 