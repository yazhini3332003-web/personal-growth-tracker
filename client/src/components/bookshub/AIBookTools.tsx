import React, { useState } from "react";
import { aiBookTools } from "../../data/booksHubData";

const AIBookTools: React.FC = () => {
  const [filter, setFilter] = useState<string>("all");

  const categories = [
    { key: "all", label: "All Tools", icon: "🛠️" },
    { key: "reader", label: "For Readers", icon: "📖" },
    { key: "writer", label: "For Writers", icon: "✍️" },
    { key: "translator", label: "Translation", icon: "🌍" },
    { key: "narrator", label: "Audiobook / Narration", icon: "🎧" },
  ];

  const filtered = aiBookTools.filter((t) => filter === "all" || t.category === filter);

  const readerTools = aiBookTools.filter((t) => t.category === "reader");
  const writerTools = aiBookTools.filter((t) => t.category === "writer");
  const translatorTools = aiBookTools.filter((t) => t.category === "translator");
  const narratorTools = aiBookTools.filter((t) => t.category === "narrator");

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-bold text-gray-900">AI Tools for Books</h2>
        <p className="text-gray-500 text-sm mt-1">Useful AI tools for readers and writers</p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Reader Tools", count: readerTools.length, icon: "📖", color: "from-blue-500 to-indigo-600" },
          { label: "Writer Tools", count: writerTools.length, icon: "✍️", color: "from-violet-500 to-purple-600" },
          { label: "Translation", count: translatorTools.length, icon: "🌍", color: "from-green-500 to-teal-600" },
          { label: "Narration", count: narratorTools.length, icon: "🎧", color: "from-amber-500 to-orange-600" },
        ].map((card, i) => (
          <div key={i} className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
            <div className={`w-10 h-10 bg-gradient-to-br ${card.color} rounded-lg flex items-center justify-center mb-2`}>
              <span className="text-lg">{card.icon}</span>
            </div>
            <p className="text-xl font-bold text-gray-900">{card.count}</p>
            <p className="text-gray-500 text-xs">{card.label}</p>
          </div>
        ))}
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

      {/* Tools Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((tool) => (
          <div key={tool.id} className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-lg transition-all group">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{tool.icon}</span>
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm group-hover:text-amber-600 transition-colors">{tool.name}</h4>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    tool.category === "reader" ? "bg-blue-100 text-blue-700" :
                    tool.category === "writer" ? "bg-violet-100 text-violet-700" :
                    tool.category === "translator" ? "bg-green-100 text-green-700" :
                    "bg-amber-100 text-amber-700"
                  } capitalize`}>
                    {tool.category}
                  </span>
                </div>
              </div>
              <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${tool.isFree ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}`}>
                {tool.isFree ? "Free" : "Paid"}
              </span>
            </div>
            <p className="text-gray-600 text-xs leading-relaxed">{tool.description}</p>
            <div className="mt-3">
              <p className="text-xs text-gray-500 font-medium mb-1.5">Features:</p>
              <div className="flex flex-wrap gap-1.5">
                {tool.features.map((feature) => (
                  <span key={feature} className="px-2 py-0.5 bg-gray-50 text-gray-600 rounded text-xs">{feature}</span>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-50">
              <span className="text-xs text-amber-600">⭐ {tool.rating}/5</span>
              <a
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-amber-600 hover:text-amber-700 font-medium"
              >
                Visit Tool →
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AIBookTools;
