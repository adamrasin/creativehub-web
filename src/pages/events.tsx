import React, { useEffect, useState } from "react";

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
    <div>
      <h1>Seznam událostí</h1>
      {events.length === 0 ? (
        <p>Žádné události</p>
      ) : (
        <ul>
          {events.map((event: any) => (
            <li key={event.id}>
              <h2>{event.title || "Bez názvu"}</h2>
              <p>{event.date}</p>
              <p>{event.location}</p>
              <p>{getDescriptionText(event.description)}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
