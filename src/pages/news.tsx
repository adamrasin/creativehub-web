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
  const [expanded, setExpanded] = useState<number | null>(null);

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
    <div className="min-h-screen bg-creativeGreen text-white">
      <Navbar />
      <div className="max-w-4xl mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6 text-center">Novinky</h1>
        {news.length === 0 ? (
          <p className="text-center">Žádné novinky</p>
        ) : (
          <ul className="space-y-6">
            {news.map((item) => {
              const fullText = getContentText(item.content);
              const isExpanded = expanded === item.id;
              const displayText = isExpanded ? fullText : fullText.slice(0, 200) + (fullText.length > 200 ? "..." : "");

              return (
                <li key={item.id} className="bg-white text-black rounded-lg shadow p-4">
                  <h2 className="text-xl font-semibold">{item.title || "Bez názvu"}</h2>
                  <p className="text-sm text-gray-600">{new Date(item.publishedAt).toLocaleDateString()}</p>
                  <p className="mt-2 break-words whitespace-pre-line">{displayText}</p>
                  {fullText.length > 200 && (
                    <button
                      onClick={() => setExpanded(isExpanded ? null : item.id)}
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
