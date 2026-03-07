import React from "react";
import { newsItems } from "../../data/learningData";

const categoryColors: Record<string, string> = {
  "AI Research": "bg-gray-100 text-gray-600",
  "AI Tools": "bg-gray-100 text-gray-600",
  Programming: "bg-gray-100 text-gray-600",
  DevOps: "bg-gray-100 text-gray-600",
  Startups: "bg-gray-100 text-gray-600",
};

const AINewsFeed: React.FC = () => {
  return (
    <div className="space-y-5">
      {/* Compact Header */}
      <div className="bg-white border border-gray-200 rounded-lg p-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
            <span className="text-xl">📡</span>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">AI & Tech News Feed</h3>
            <p className="text-sm text-gray-500">Stay updated with the latest in AI, programming, and technology</p>
          </div>
        </div>
      </div>

      {/* News Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {newsItems.map((item) => (
          <a
            key={item.id}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white border border-gray-200 rounded-lg p-5 hover:border-blue-300 hover:shadow-sm transition-all group"
          >
            <div className="flex items-center gap-2 mb-3">
              <span className={`px-2 py-0.5 rounded text-xs font-medium ${categoryColors[item.category] || "bg-gray-100 text-gray-600"}`}>
                {item.category}
              </span>
              <span className="text-xs text-gray-400">{item.date}</span>
            </div>
            <h4 className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
              {item.title}
            </h4>
            <p className="text-sm text-gray-500 mt-2 line-clamp-2">{item.summary}</p>
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
              <span className="text-xs text-gray-400">{item.source}</span>
              <span className="text-xs text-blue-500 font-medium group-hover:underline">Read More →</span>
            </div>
          </a>
        ))}
      </div>

      {/* Footer Note */}
      <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
        <p className="text-gray-500 text-sm">
          💡 News is curated from trusted tech sources. Check back daily for new updates!
        </p>
      </div>
    </div>
  );
};

export default AINewsFeed;
