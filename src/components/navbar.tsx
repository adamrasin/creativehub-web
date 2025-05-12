import Link from "next/link";

export default function Navbar() {
  return (
    <nav style={{ padding: "1rem", borderBottom: "1px solid #ccc", marginBottom: "2rem" }}>
      <Link href="/" style={{ marginRight: "1rem" }}>🏠 Domů</Link>
      <Link href="/events" style={{ marginRight: "1rem" }}>🗓 Události</Link>
      <Link href="/news" style={{ marginRight: "1rem" }}>📰 Novinky</Link>
      <Link href="/registration" style={{ marginRight: "1rem" }}>📝 Registrace</Link>
      <Link href="/profile" style={{ marginRight: "1rem" }}>👤 Profil</Link>
      <Link href="/login" style={{ marginRight: "1rem" }}>🔐 Login</Link>
    </nav>
  );
}
