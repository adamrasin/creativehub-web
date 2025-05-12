import React, { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "../components/navbar";

export default function HomePage() {
  const [events, setEvents] = useState([]);
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const [eventsRes, newsRes] = await Promise.all([
        fetch("http://localhost:1337/api/events?sort=date:asc&pagination[limit]=2"),
        fetch("http://localhost:1337/api/news?sort=createdAt:desc&pagination[limit]=1"),
      ]);

      const eventsData = await eventsRes.json();
      const newsData = await newsRes.json();

      setEvents(eventsData.data || []);
      setNews(newsData.data || []);
    };

    fetchData();
  }, []);

  return (
    <div>
      <Navbar />
      <header>
        <h1>Vítejte v CreativeHubu</h1>
        <p>Komunitní centrum pro akce, workshopy a sdílení nápadů.</p>
      </header>

      <section>
        <h2>Nejbližší události</h2>
        {events.length === 0 ? (
          <p>Žádné plánované události</p>
        ) : (
          <ul>
            {events.map((event: any) => (
              <li key={event.id}>
                <strong>{event.attributes?.title || "Bez názvu"}</strong>
                <p>{event.attributes?.location}</p>
              </li>
            ))}
          </ul>
        )}
        <Link href="/events">Zobrazit všechny události</Link>
      </section>

      <section>
        <h2>Aktuality</h2>
        {news.length === 0 ? (
          <p>Žádné novinky</p>
        ) : (
          <article>
            <Link href="/news">Zobrazit všechny novinky</Link>
          </article>
        )}
      </section>

      <section>
        <h2>Zapoj se</h2>
        <Link href="/registration">Přihlásit se na akci</Link>
        <br />
        <Link href="/login">Přihlásit se / Registrovat</Link>
      </section>

      <footer>
        <p>© {new Date().getFullYear()} CreativeHub</p>
      </footer>
    </div>
  );
}
