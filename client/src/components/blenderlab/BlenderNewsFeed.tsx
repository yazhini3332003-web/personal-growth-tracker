import React, { useState } from "react";
import { blenderNews } from "../../data/blenderLabData";

const categoryColors: Record<string, { bg: string; text: string; border: string }> = {
  update: { bg: "bg-orange-50", text: "text-orange-600", border: "border-orange-200" },
  community: { bg: "bg-blue-50", text: "text-blue-600", border: "border-blue-200" },
  addon: { bg: "bg-purple-50", text: "text-purple-600", border: "border-purple-200" },
  tutorial: { bg: "bg-green-50", text: "text-green-600", border: "border-green-200" },
  industry: { bg: "bg-amber-50", text: "text-amber-600", border: "border-amber-200" },
};

const BlenderNewsFeed: React.FC = () => {
  const [filter, setFilter] = useState<string>("all");

  const categories = ["all", "update", "community", "addon", "tutorial", "industry"];
  const filtered = filter === "all" ? blenderNews : blenderNews.filter((a) => a.category === filter);

  return (
    <div className="space-y-6">
      <div className="text-center mb-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">📰 Blender News & Updates</h2>
        <p className="text-gray-500 text-sm">
          Stay updated with the latest Blender releases, community news, and industry trends
        </p>
      </div>

      {/* Filters */}
      <div className="flex gap-2 flex-wrap justify-center">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all capitalize ${
              filter === cat
                ? "bg-orange-500 text-white shadow-sm"
                : "bg-gray-100 text-gray-500 hover:bg-gray-200 border border-gray-200"
            }`}
          >
            {cat === "all" ? "🌍 All" : cat}
          </button>
        ))}
      </div>

      {/* News Cards */}
      <div className="grid gap-4 md:grid-cols-2">
        {filtered.map((article) => {
          const colors = categoryColors[article.category] || categoryColors.update;
          return (
            <div
              key={article.id}
              className="bg-white rounded-2xl border border-gray-200 p-5 hover:border-orange-300 transition-all group hover:shadow-lg"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center text-2xl shrink-0 group-hover:scale-110 transition-transform">
                  {article.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize ${colors.bg} ${colors.text} border ${colors.border}`}
                    >
                      {article.category}
                    </span>
                    <span className="text-gray-400 text-xs">{article.date}</span>
                  </div>
                  <h3 className="text-gray-900 font-semibold text-sm mb-2 group-hover:text-orange-500 transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-gray-500 text-xs leading-relaxed">{article.summary}</p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-gray-400 text-xs">📰 {article.source}</span>
                    <a
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-orange-500 text-xs hover:text-orange-600 cursor-pointer"
                    >
                      Read more →
                    </a>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Auto-update notice */}
      <div className="text-center py-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-xl border border-gray-200">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-gray-500 text-xs">Auto-updating with latest Blender news</span>
        </div>
      </div>
    </div>
  );
};

export default BlenderNewsFeed;
