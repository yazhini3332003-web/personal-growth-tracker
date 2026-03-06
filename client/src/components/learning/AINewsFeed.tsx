import React from "react";
import { newsItems } from "../../data/learningData";

const categoryColors: Record<string, string> = {
  "AI Research": "bg-purple-100 text-purple-700",
  "AI Tools": "bg-blue-100 text-blue-700",
  Programming: "bg-green-100 text-green-700",
  DevOps: "bg-orange-100 text-orange-700",
  Startups: "bg-pink-100 text-pink-700",
};

const AINewsFeed: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="bg-gradient-to-r from-rose-500 to-pink-600 text-white p-5 rounded-xl">
        <h3 className="text-lg font-bold flex items-center gap-2">
          📡 AI & Tech News Feed
        </h3>
        <p className="text-rose-100 text-sm mt-1">
          Stay updated with the latest in AI, programming, and technology
        </p>
      </div>

      <div className="space-y-3">
        {newsItems.map((item) => (
          <a
            key={item.id}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-white border rounded-xl p-4 hover:shadow-md hover:-translate-y-0.5 transition-all group"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${categoryColors[item.category] || "bg-slate-100 text-slate-600"}`}>
                    {item.category}
                  </span>
                  <span className="text-xs text-slate-400">{item.date}</span>
                </div>
                <h4 className="font-bold text-slate-800 group-hover:text-blue-600 transition">
                  {item.title}
                </h4>
                <p className="text-sm text-slate-500 mt-1">{item.summary}</p>
                <span className="text-xs text-slate-400 mt-2 inline-block">Source: {item.source}</span>
              </div>
              <span className="text-slate-300 group-hover:text-blue-500 transition text-xl mt-2">↗</span>
            </div>
          </a>
        ))}
      </div>

      <div className="bg-slate-50 border border-dashed border-slate-300 rounded-xl p-6 text-center">
        <p className="text-slate-500 text-sm">
          💡 News is curated from trusted tech sources. Check back daily for new updates!
        </p>
      </div>
    </div>
  );
};

export default AINewsFeed;
