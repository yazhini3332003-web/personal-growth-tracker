import React, { useState } from "react";
import { blenderAddons } from "../../data/blenderLabData";

const BlenderTrendingTools: React.FC = () => {
  const [showAll, setShowAll] = useState(false);
  const [filterFree, setFilterFree] = useState<"all" | "free" | "paid">("all");

  const filtered = blenderAddons.filter((a) => {
    if (filterFree === "free") return a.free;
    if (filterFree === "paid") return !a.free;
    return true;
  });

  const displayed = showAll ? filtered : filtered.slice(0, 6);

  return (
    <div className="space-y-6">
      <div className="text-center mb-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">🧩 Trending Blender Tools & Addons</h2>
        <p className="text-gray-500 text-sm max-w-2xl mx-auto">
          Essential addons and plugins that every Blender artist should know about.
          These tools supercharge your workflow and unlock new capabilities.
        </p>
      </div>

      {/* Filters */}
      <div className="flex gap-2 flex-wrap justify-center">
        {(["all", "free", "paid"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilterFree(f)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all capitalize ${
              filterFree === f
                ? "bg-orange-500 text-white shadow-sm"
                : "bg-gray-100 text-gray-500 hover:bg-gray-200 border border-gray-200"
            }`}
          >
            {f === "all" ? "🌍 All" : f === "free" ? "🆓 Free" : "💰 Paid"}
          </button>
        ))}
      </div>

      {/* Addon Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {displayed.map((addon) => (
          <a
            key={addon.id}
            href={addon.url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white rounded-2xl border border-gray-200 p-5 hover:border-orange-300 transition-all group hover:shadow-lg"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                  {addon.icon}
                </div>
                <div>
                  <h3 className="text-gray-900 font-semibold text-sm group-hover:text-orange-500 transition-colors">
                    {addon.name}
                  </h3>
                </div>
              </div>
              <div className="flex gap-1.5">
                {addon.trending && (
                  <span className="px-2 py-0.5 bg-red-50 text-red-500 rounded-full text-[10px] font-semibold border border-red-200">
                    🔥 Trending
                  </span>
                )}
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${
                    addon.free
                      ? "bg-green-50 text-green-600 border-green-200"
                      : "bg-amber-50 text-amber-600 border-amber-200"
                  }`}
                >
                  {addon.free ? "Free" : "Paid"}
                </span>
              </div>
            </div>
            <p className="text-gray-500 text-xs leading-relaxed mb-3">{addon.description}</p>
            <div className="bg-blue-50 rounded-lg p-2.5 border border-blue-100">
              <span className="text-blue-600 text-xs font-medium">Why useful: </span>
              <span className="text-blue-700 text-xs">{addon.whyUseful}</span>
            </div>
          </a>
        ))}
      </div>

      {filtered.length > 6 && (
        <div className="text-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="px-6 py-2.5 bg-gray-100 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-200 transition-colors border border-gray-200"
          >
            {showAll ? "Show Less" : `Show All (${filtered.length})`}
          </button>
        </div>
      )}
    </div>
  );
};

export default BlenderTrendingTools;
