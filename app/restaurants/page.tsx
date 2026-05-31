import Link from "next/link";
import Header from "@/components/Header";

async function getPartners() {
  const res = await fetch("http://localhost:3000/api/partners", {
    cache: "no-store",
  });
  return res.json();
}

export default async function RestaurantsPage() {
  const partners = await getPartners();
  const restaurants = partners.filter((p: any) => p.type === "RESTAURANT");

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-8">
      <Header />
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">Restaurants near you</h1>
        <p className="text-gray-600 mb-8">Order food from local restaurants</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {restaurants.map((restaurant: any) => (
            <Link
              key={restaurant.id}
              href={`/restaurants/${restaurant.id}`}
              className="bg-white rounded-3xl overflow-hidden shadow hover:shadow-lg transition"
            >
              <div className="h-40 bg-orange-100 flex items-center justify-center text-6xl">
                🍛
              </div>

              <div className="p-5">
                <h2 className="text-xl font-bold">{restaurant.name}</h2>
                <p className="text-gray-500">{restaurant.city}</p>
                <p className="text-sm text-gray-500 mt-2">
                  {restaurant.products.length} menu items • 25-40 min
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}