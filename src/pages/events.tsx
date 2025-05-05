import React, { useEffect, useState } from "react";

type EventItem = {
  id: number;
  title: string;
  date: string;
  location: string;
};

export default function EventsPage() {
  const [events, setEvents] = useState<EventItem[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const res = await fetch("http://localhost:1337/api/events");
      const json = await res.json();
      setEvents(json.data);
    };

    fetchEvents();
  }, []);

  return (
    <div>
      <h1>Seznam událostí</h1>
      {events.length === 0 ? (
        <p>Žádné události</p>
      ) : (
        <ul>
          {events.map((event) => (
            <li key={event.id}>
              <h2>{event.title || "Bez názvu"}</h2>
              <p>{event.date}</p>
              <p>{event.location}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
