import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-3xl font-extrabold text-orange-600">
          Foondosh
        </Link>

        <nav className="flex items-center gap-5">
          <Link href="/restaurants">Restaurants</Link>
          <Link href="/pharmacy">Medicine</Link>
          <Link href="/grocery">Grocery</Link>
          <Link
            href="/cart"
            className="bg-black text-white px-5 py-2 rounded-full"
          >
            Cart
          </Link>
        </nav>
      </div>
    </header>
  );
}