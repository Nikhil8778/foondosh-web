import Header from "@/components/Header";
import Link from "next/link";

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-5xl mx-auto p-6">
        <h1 className="text-4xl font-bold mb-8">Foondosh Admin</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link href="/admin/orders" className="bg-white rounded-3xl shadow p-8">
            <h2 className="text-2xl font-bold">Orders</h2>
            <p className="text-gray-500 mt-2">View and manage customer orders</p>
          </Link>

          <Link href="/admin/restaurants" className="bg-white rounded-3xl shadow p-8">
            <h2 className="text-2xl font-bold">Partners</h2>
            <p className="text-gray-500 mt-2">Restaurants, pharmacies and groceries</p>
          </Link>
        </div>
      </div>
    </main>
  );
}