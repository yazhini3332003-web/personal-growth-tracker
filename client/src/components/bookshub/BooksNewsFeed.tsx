import React, { useState } from "react";
import { bookNews } from "../../data/booksHubData";

const BooksNewsFeed: React.FC = () => {
  const [filter, setFilter] = useState<string>("all");
  const [selectedArticle, setSelectedArticle] = useState<string | null>(null);

  const categories = [
    { key: "all", label: "All News", icon: "📰" },
    { key: "ai-publishing", label: "AI & Publishing", icon: "🤖" },
    { key: "global-trends", label: "Global Trends", icon: "🌍" },
    { key: "technology", label: "Technology", icon: "💻" },
    { key: "indie-publishing", label: "Indie Publishing", icon: "✍️" },
    { key: "digital-reading", label: "Digital Reading", icon: "📱" },
  ];

  const filtered = bookNews.filter((n) => filter === "all" || n.category === filter);
  const selected = selectedArticle ? bookNews.find((n) => n.id === selectedArticle) : null;
  const featuredNews = bookNews.filter((n) => n.featured);

  if (selected) {
    return (
      <div className="space-y-6">
        <button onClick={() => setSelectedArticle(null)} className="text-amber-600 hover:text-amber-700 text-sm font-medium flex items-center gap-1">
          ← Back to News
        </button>
        <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-3xl">{selected.imageUrl}</span>
            <div>
              <span className="px-2 py-0.5 bg-amber-100 text-amber-700 rounded-full text-xs capitalize">{selected.category.replace("-", " ")}</span>
              <p className="text-gray-400 text-xs mt-1">{selected.sourceName} · {new Date(selected.publishedAt).toLocaleDateString()}</p>
            </div>
          </div>
          <h1 className="text-xl font-bold text-gray-900 mb-3">{selected.title}</h1>
          <p className="text-gray-600 text-sm leading-relaxed mb-4">{selected.content}</p>
          <a
            href={selected.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-amber-600 text-sm hover:text-amber-700 font-medium"
          >
            Read full article at {selected.sourceName} →
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-bold text-gray-900">Books News</h2>
        <p className="text-gray-500 text-sm mt-1">Latest developments in publishing, AI, and the book world</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setFilter(cat.key)}
            className={`px-3 py-2 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
              filter === cat.key ? "bg-amber-100 text-amber-700 shadow-sm" : "bg-white text-gray-500 hover:text-gray-700 border border-gray-200"
            }`}
          >
            <span>{cat.icon}</span> {cat.label}
          </button>
        ))}
      </div>

      {/* Featured News */}
      {filter === "all" && featuredNews.length > 0 && (
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">⭐ Featured Stories</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {featuredNews.map((article) => (
              <div
                key={article.id}
                onClick={() => setSelectedArticle(article.id)}
                className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border border-amber-100 p-5 hover:shadow-lg transition-all cursor-pointer group"
              >
                <div className="flex items-start gap-3">
                  <span className="text-3xl">{article.imageUrl}</span>
                  <div className="flex-1">
                    <span className="px-2 py-0.5 bg-amber-100 text-amber-700 rounded-full text-xs capitalize">{article.category.replace("-", " ")}</span>
                    <h4 className="font-semibold text-gray-900 group-hover:text-amber-600 mt-2 text-sm leading-snug">{article.title}</h4>
                    <p className="text-gray-600 text-xs mt-2 line-clamp-2">{article.summary}</p>
                    <p className="text-gray-400 text-xs mt-2">{article.sourceName} · {new Date(article.publishedAt).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* All News */}
      <div className="space-y-3">
        {filtered.map((article) => (
          <div
            key={article.id}
            onClick={() => setSelectedArticle(article.id)}
            className="bg-white rounded-xl border border-gray-100 p-4 hover:shadow-md transition-all cursor-pointer group flex items-start gap-4"
          >
            <span className="text-2xl flex-shrink-0">{article.imageUrl}</span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full text-xs capitalize">{article.category.replace("-", " ")}</span>
                <span className="text-gray-400 text-xs">{new Date(article.publishedAt).toLocaleDateString()}</span>
              </div>
              <h4 className="font-semibold text-gray-900 group-hover:text-amber-600 transition-colors text-sm">{article.title}</h4>
              <p className="text-gray-600 text-xs mt-1 line-clamp-1">{article.summary}</p>
              <p className="text-gray-400 text-xs mt-1">{article.sourceName}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BooksNewsFeed;
