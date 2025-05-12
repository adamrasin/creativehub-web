import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar";


type NewsItem = {
  id: number;
  title: string;
  publishedAt: string;
  content?: {
    type: string;
    children: { type: string; text: string }[];
  }[];
};

export default function NewsPage() {
  const [news, setNews] = useState<NewsItem[]>([]);

  useEffect(() => {
    const fetchNews = async () => {
      const res = await fetch("http://localhost:1337/api/news");
      const json = await res.json();
      setNews(json.data);
    };

    fetchNews();
  }, []);

  const getContentText = (content: NewsItem["content"]) => {
    if (!content || !Array.isArray(content)) return "";
    return content
      .flatMap((block) => block.children?.map((child) => child.text) || [])
      .join(" ");
  };

  return (
    <div>
      <Navbar />
      <h1>Novinky</h1>
      {news.length === 0 ? (
        <p>Žádné novinky</p>
      ) : (
        <ul>
          {news.map((item: any) => (
            <li key={item.id}>
              <h2>{item.title || "Bez názvu"}</h2>
              <p>{new Date(item.publishedAt).toLocaleDateString()}</p>
              <p>{getContentText(item.content)}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
