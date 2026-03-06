import React, { useState } from "react";
import { trendingTools } from "../../data/learningData";

const categories = ["All", ...Array.from(new Set(trendingTools.map((t) => t.category)))];

const TrendingTools: React.FC = () => {
  const [filter, setFilter] = useState("All");

  const filtered = filter === "All" ? trendingTools : trendingTools.filter((t) => t.category === filter);

  return (
    <div className="space-y-4">
      <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white p-5 rounded-xl">
        <h3 className="text-lg font-bold flex items-center gap-2">
          🔥 Trending AI Developer Tools
        </h3>
        <p className="text-amber-100 text-sm mt-1">
          Discover the most popular AI tools used by developers today
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition ${
              filter === cat
                ? "bg-orange-500 text-white"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {filtered.map((tool) => (
          <a
            key={tool.name}
            href={tool.url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white border rounded-xl p-4 hover:shadow-lg hover:-translate-y-1 transition-all group"
          >
            <div className="flex items-start gap-3">
              <span className="text-3xl">{tool.icon}</span>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-slate-800 group-hover:text-orange-600 transition">
                    {tool.name}
                  </h4>
                  {tool.trending && (
                    <span className="px-1.5 py-0.5 bg-red-100 text-red-600 rounded text-xs font-bold">
                      🔥 HOT
                    </span>
                  )}
                </div>
                <p className="text-sm text-slate-500 mt-1">{tool.description}</p>
                <span className="inline-block mt-2 px-2 py-0.5 bg-slate-100 text-slate-500 rounded text-xs">
                  {tool.category}
                </span>
              </div>
              <span className="text-slate-300 group-hover:text-orange-500 transition">↗</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default TrendingTools;
