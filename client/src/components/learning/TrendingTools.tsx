import React, { useState } from "react";
import { trendingTools } from "../../data/learningData";

const categories = ["All", ...Array.from(new Set(trendingTools.map((t) => t.category)))];

const TrendingTools: React.FC = () => {
  const [filter, setFilter] = useState("All");

  const filtered = filter === "All" ? trendingTools : trendingTools.filter((t) => t.category === filter);

  return (
    <div className="space-y-5">
      {/* Compact Header */}
      <div className="bg-white border border-gray-200 rounded-lg p-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
            <span className="text-xl">🔥</span>
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">Trending AI Developer Tools</h3>
            <p className="text-sm text-gray-500">Discover the most popular AI tools used by developers today</p>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              filter === cat
                ? "bg-blue-500 text-white"
                : "bg-white border border-gray-200 text-gray-600 hover:border-blue-300"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((tool) => (
          <a
            key={tool.name}
            href={tool.url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white border border-gray-200 rounded-lg p-5 hover:border-blue-300 hover:shadow-sm transition-all group"
          >
            <div className="flex items-start gap-3">
              <div className="w-11 h-11 rounded-lg bg-gray-50 flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">{tool.icon}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                    {tool.name}
                  </h4>
                  {tool.trending && (
                    <span className="px-1.5 py-0.5 bg-gray-100 text-gray-500 rounded text-xs font-medium">
                      HOT
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-1 line-clamp-2">{tool.description}</p>
                <div className="flex items-center gap-2 mt-3">
                  <span className="px-2 py-0.5 bg-gray-100 text-gray-500 rounded text-xs font-medium">
                    {tool.category}
                  </span>
                  <span className="text-xs text-blue-500 font-medium group-hover:underline">Visit ↗</span>
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default TrendingTools;
