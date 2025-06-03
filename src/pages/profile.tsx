import { useSession, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import Navbar from "../components/navbar";

type EventItem = {
  id: number;
  title: string;
  date: string;
  location: string;
};

export default function ProfilePage() {
  const { data: session } = useSession();
  const [userEvents, setUserEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserEvents = async () => {
      try {
        const res = await fetch("http://localhost:1337/api/events");
        const json = await res.json();
        setUserEvents(json.data || []);
      } catch (error) {
        console.error("Chyba při načítání událostí:", error);
        setUserEvents([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUserEvents();
  }, []);

  if (!session) {
    return (
      <div className="min-h-screen bg-creativeGreen text-white flex items-center justify-center">
        <p className="text-xl">Načítám nebo nejsi přihlášený...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-creativeGreen text-white">
      <Navbar />
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-4">Profil</h1>
        <p className="mb-2"><strong>Jméno:</strong> {session.user?.name}</p>
        <p className="mb-4"><strong>Email:</strong> {session.user?.email}</p>
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
        >
          Odhlásit se
        </button>

        <h2 className="text-2xl font-semibold mt-10 mb-4">Události</h2>

        {loading ? (
          <p>Načítám události...</p>
        ) : userEvents.length === 0 ? (
          <p>Žádné události nenalezeny.</p>
        ) : (
          <ul className="space-y-4">
            {userEvents.map((event) => (
              <li key={event.id} className="bg-white text-black p-4 rounded shadow">
                <h3 className="text-lg font-semibold">{event.title}</h3>
                <p>{event.date} • {event.location}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
