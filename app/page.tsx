import Link from "next/link";
import Header from "@/components/Header";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#f6f3ee]">
      <Header />
      <header className="flex items-center justify-between px-8 py-5 bg-white shadow-sm">
        <div className="text-3xl font-bold text-orange-600">Foondosh</div>

        <div className="flex gap-4">
          <Link href="/login" className="px-5 py-2 rounded-full bg-gray-100">
            Log in
          </Link>
          <Link href="/signup" className="px-5 py-2 rounded-full bg-black text-white">
            Sign up
          </Link>
        </div>
      </header>

      <section className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-6xl font-extrabold leading-tight">
            Food, medicine & daily needs delivered fast
          </h1>

          <p className="mt-6 text-xl text-gray-700">
            Foondosh brings restaurants, pharmacies, grocery stores and local delivery partners together for small towns and rural India.
          </p>

          <div className="mt-8 flex bg-white rounded-full shadow-lg p-2 max-w-xl">
            <input
              placeholder="Enter your delivery location"
              className="flex-1 px-5 outline-none"
            />
            <Link
              href="/restaurants"
              className="bg-orange-600 text-white px-8 py-4 rounded-full font-semibold"
            >
              Find Food
            </Link>
          </div>
        </div>

        <div className="bg-orange-100 rounded-3xl p-10 text-center">
          <div className="text-8xl">🍛</div>
          <h2 className="text-3xl font-bold mt-6">Local food. Fast delivery.</h2>
          <p className="mt-3 text-gray-700">
            Built for towns where big delivery apps are not available.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-20 grid md:grid-cols-3 gap-6">
        <Link href="/restaurants" className="bg-white p-8 rounded-3xl shadow">
          <div className="text-5xl">🍽️</div>
          <h3 className="text-2xl font-bold mt-4">Order Food</h3>
          <p className="text-gray-600 mt-2">Restaurants near you</p>
        </Link>

        <Link href="/pharmacy" className="bg-white p-8 rounded-3xl shadow">
          <div className="text-5xl">💊</div>
          <h3 className="text-2xl font-bold mt-4">Order Medicine</h3>
          <p className="text-gray-600 mt-2">Pharmacy delivery</p>
        </Link>

        <Link href="/grocery" className="bg-white p-8 rounded-3xl shadow">
          <div className="text-5xl">🛒</div>
          <h3 className="text-2xl font-bold mt-4">Order Grocery</h3>
          <p className="text-gray-600 mt-2">Daily essentials</p>
        </Link>
      </section>
    </main>
    
  );
}
