import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar";

type EventItem = {
  id: number;
  title: string;
  date: string;
  location: string;
  description?: {
    type: string;
    children: { type: string; text: string }[];
  }[];
};

export default function EventsPage() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [expanded, setExpanded] = useState<number | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      const res = await fetch("http://localhost:1337/api/events");
      const json = await res.json();
      setEvents(json.data);
    };

    fetchEvents();
  }, []);

  const getDescriptionText = (desc: EventItem["description"]) => {
    if (!desc || !Array.isArray(desc)) return "";
    const firstBlock = desc[0];
    if (firstBlock?.children?.length > 0) {
      return firstBlock.children.map((child) => child.text).join(" ");
    }
    return "";
  };

  return (
    <div className="min-h-screen bg-creativeGreen text-white">
      <Navbar />
      <div className="max-w-4xl mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6 text-center">Seznam událostí</h1>
        {events.length === 0 ? (
          <p className="text-center">Žádné události</p>
        ) : (
          <ul className="space-y-6">
            {events.map((event) => {
              const fullText = getDescriptionText(event.description);
              const isExpanded = expanded === event.id;
              const displayText = isExpanded ? fullText : fullText.slice(0, 200) + (fullText.length > 200 ? "..." : "");

              return (
                <li key={event.id} className="bg-white text-black rounded-lg shadow p-4">
                  <h2 className="text-xl font-semibold">{event.title || "Bez názvu"}</h2>
                  <p><strong>ID události:</strong> {event.id}</p>
                  <p className="text-sm text-gray-600">{event.date} • {event.location}</p>
                  <p className="mt-2 break-words whitespace-pre-line">{displayText}</p>
                  {fullText.length > 200 && (
                    <button
                      onClick={() => setExpanded(isExpanded ? null : event.id)}
                      className="mt-2 text-green-700 hover:underline"
                    >
                      {isExpanded ? "Zobrazit méně" : "Zobrazit více"}
                    </button>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
