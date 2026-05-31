import AddToCartButton from "@/components/AddToCartButton";
import Header from "@/components/Header";

async function getPartner(id: string) {
  const res = await fetch("http://localhost:3000/api/partners", {
    cache: "no-store",
  });

  const partners = await res.json();
  return partners.find(
  (p: any) => String(p.id) === String(id)
);
}

export default async function RestaurantDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const restaurant = await getPartner(id);
  if (!restaurant) {
    return <div className="p-10">Restaurant not found</div>;
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <section className="bg-orange-100 h-64 flex items-center justify-center text-8xl">
        🍛
      </section>

      <section className="max-w-6xl mx-auto p-6">
        <h1 className="text-5xl font-bold">{restaurant.name}</h1>
        <p className="text-gray-600 mt-2">
          {restaurant.city} • 25-40 min delivery
        </p>

        <h2 className="text-3xl font-bold mt-10 mb-6">Menu</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {restaurant.products.map((item: any) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl shadow p-5 flex justify-between gap-4"
            >
              <div>
                <h3 className="text-xl font-bold">{item.name}</h3>
                <p className="text-gray-500 mt-1">{item.description}</p>
                <p className="font-semibold mt-3">
                  ₹{(item.priceCents / 100).toFixed(0)}
                </p>
              </div>

              <AddToCartButton item={item} />
              
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}