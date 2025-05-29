import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-300 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-xl font-semibold text-black no-underline">
            CreativeHub
          </Link>

          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-black focus:outline-none"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          <div className="hidden md:flex gap-6">
            <NavLinks />
          </div>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden px-4 pb-4">
          <div className="flex flex-col gap-3">
            <NavLinks />
          </div>
        </div>
      )}
    </nav>
  );
}

function NavLinks() {
  const linkClass = "text-black no-underline hover:text-creativeGreen transition-colors";
  return (
    <>
      <Link href="/" className={linkClass}>🏠 Domů</Link>
      <Link href="/events" className={linkClass}>🗓 Události</Link>
      <Link href="/news" className={linkClass}>📰 Novinky</Link>
      <Link href="/registration" className={linkClass}>📝 Registrace</Link>
      <Link href="/profile" className={linkClass}>👤 Profil</Link>
      <Link href="/login" className={linkClass}>🔐 Login</Link>
    </>
  );
}
