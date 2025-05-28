import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex flex-wrap items-center justify-center gap-4 py-4 border-b border-gray-200 bg-white shadow-sm">
      <Link href="/" className="text-green hover:underline">🏠 Domů</Link>
      <Link href="/events" className="text-green hover:underline">🗓 Události</Link>
      <Link href="/news" className="text-green hover:underline">📰 Novinky</Link>
      <Link href="/registration" className="text-green hover:underline">📝 Registrace</Link>
      <Link href="/profile" className="text-green hover:underline">👤 Profil</Link>
      <Link href="/login" className="text-green hover:underline">🔐 Login</Link>
    </nav>
  );
}
