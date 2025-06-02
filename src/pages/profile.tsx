import { useSession, signOut } from "next-auth/react";

export default function ProfilePage() {
  const { data: session } = useSession();

  if (!session) {
    return <p className="p-8 text-center">Načítám nebo nejsi přihlášený...</p>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <h1 className="text-2xl font-bold mb-4">Profil</h1>
      <p className="mb-4">Přihlášen jako: {session.user?.email}</p>
      <button
        onClick={() => signOut({ callbackUrl: "/" })}
        className="bg-red-600 text-white px-4 py-2 rounded"
      >
        Odhlásit se
      </button>
    </div>
  );
}
