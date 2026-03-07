import React, { useState } from "react";
import { artNews } from "../../data/artHubData";

const ArtNewsFeed: React.FC = () => {
  const [filter, setFilter] = useState<string>("all");

  const categoryConfig: Record<string, { label: string; icon: string; color: string }> = {
    global: { label: "Global", icon: "🌍", color: "bg-blue-100 text-blue-700" },
    exhibition: { label: "Exhibitions", icon: "🏛️", color: "bg-purple-100 text-purple-700" },
    digital: { label: "Digital Trends", icon: "🖥️", color: "bg-cyan-100 text-cyan-700" },
    ai: { label: "AI in Art", icon: "🤖", color: "bg-violet-100 text-violet-700" },
    interview: { label: "Interviews", icon: "🎙️", color: "bg-amber-100 text-amber-700" },
  };

  const categoryKeys = ["all", "global", "exhibition", "digital", "ai", "interview"];
  const filtered = filter === "all" ? artNews : artNews.filter((n) => n.category === filter);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900">Art News</h2>
        <p className="text-sm text-gray-500 mt-1">Stay informed about the creative world</p>
      </div>

      {/* Category Filters */}
      <div className="flex gap-2 flex-wrap">
        {categoryKeys.map((key) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all ${
              filter === key
                ? "bg-gray-900 text-white"
                : "bg-white text-gray-600 border border-gray-200 hover:shadow-sm"
            }`}
          >
            {key === "all" ? "🌐 All" : `${categoryConfig[key]?.icon} ${categoryConfig[key]?.label}`}
          </button>
        ))}
      </div>

      {/* Featured News */}
      {filtered.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all">
          <div className="p-6">
            <div className="flex items-center gap-2 mb-3">
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${categoryConfig[filtered[0].category]?.color}`}>
                {categoryConfig[filtered[0].category]?.icon} {categoryConfig[filtered[0].category]?.label}
              </span>
              <span className="text-xs text-gray-400">{new Date(filtered[0].date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">{filtered[0].title}</h3>
            <p className="text-sm text-gray-600 leading-relaxed">{filtered[0].summary}</p>
            <div className="flex items-center gap-2 mt-4 text-xs text-gray-400">
              <span>{filtered[0].icon}</span>
              <span>Source: {filtered[0].source}</span>
            </div>
          </div>
        </div>
      )}

      {/* News List */}
      <div className="space-y-3">
        {filtered.slice(1).map((article) => (
          <div
            key={article.id}
            className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-md transition-all duration-300 group"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 group-hover:scale-110 transition-transform">
                {article.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`px-2 py-0.5 rounded-full text-xs ${categoryConfig[article.category]?.color}`}>
                    {categoryConfig[article.category]?.label}
                  </span>
                  <span className="text-xs text-gray-400">
                    {new Date(article.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                  </span>
                </div>
                <h4 className="font-semibold text-gray-900 text-sm group-hover:text-purple-700 transition-colors">{article.title}</h4>
                <p className="text-xs text-gray-500 mt-1 line-clamp-2">{article.summary}</p>
                <p className="text-xs text-gray-400 mt-2">📰 {article.source}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArtNewsFeed;
