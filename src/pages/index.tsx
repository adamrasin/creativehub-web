import React from "react";
import Link from "next/link";
import Navbar from "../components/navbar";

export default function HomePage() {
  return (
    <div className="bg-creativeGreen min-h-screen text-white">
      <Navbar />

      <header className="text-center py-16 px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Vítejte v CreativeHubu</h1>
        <p className="text-lg md:text-xl">
          Komunitní centrum pro akce, workshopy a sdílení nápadů.
        </p>
      </header>

      <section className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-semibold mb-6">Co u nás najdete</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>Akce pro veřejnost</li>
          <li>Workshopy a přednášky</li>
          <li>Možnost zapojení do komunity</li>
        </ul>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-semibold mb-6">Odkazy</h2>
        <div className="flex flex-col space-y-3">
          <Link href="/events" className="underline hover:text-gray-200">
            Události
          </Link>
          <Link href="/news" className="underline hover:text-gray-200">
            Novinky
          </Link>
          <Link href="/registration" className="underline hover:text-gray-200">
            Přihlásit se na akci
          </Link>
          <Link href="/login" className="underline hover:text-gray-200">
            Přihlášení / Registrace
          </Link>
        </div>
      </section>

      <footer className="text-center py-8 text-sm text-gray-100">
        © {new Date().getFullYear()} CreativeHub
      </footer>
    </div>
  );
}
