import React, { useState } from "react";
import { blenderAITools } from "../../data/blenderLabData";

const categoryColors: Record<string, { bg: string; text: string; border: string }> = {
  texture: { bg: "bg-purple-50", text: "text-purple-600", border: "border-purple-200" },
  "concept-art": { bg: "bg-pink-50", text: "text-pink-600", border: "border-pink-200" },
  rendering: { bg: "bg-blue-50", text: "text-blue-600", border: "border-blue-200" },
  animation: { bg: "bg-green-50", text: "text-green-600", border: "border-green-200" },
  modeling: { bg: "bg-amber-50", text: "text-amber-600", border: "border-amber-200" },
};

const BlenderAITools: React.FC = () => {
  const [filter, setFilter] = useState<string>("all");

  const categories = ["all", "texture", "concept-art", "modeling", "animation", "rendering"];
  const filtered = filter === "all" ? blenderAITools : blenderAITools.filter((t) => t.category === filter);

  return (
    <div className="space-y-6">
      <div className="text-center mb-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">🤖 AI Tools for Blender</h2>
        <p className="text-gray-500 text-sm max-w-2xl mx-auto">
          Discover how AI can supercharge your Blender workflow — from texture generation
          to concept art, 3D scanning, and smart animation.
        </p>
      </div>

      {/* Info cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {[
          { icon: "🎨", title: "AI Textures", desc: "Generate any texture from text prompts" },
          { icon: "🖼️", title: "AI Concept Art", desc: "Create reference images with AI" },
          { icon: "⚡", title: "AI Rendering", desc: "Faster, smarter rendering with AI" },
          { icon: "🤸", title: "AI Animation", desc: "AI-assisted motion and posing" },
        ].map((item, i) => (
          <div key={i} className="bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200 p-4">
            <span className="text-2xl">{item.icon}</span>
            <h3 className="text-gray-900 font-semibold text-sm mt-2">{item.title}</h3>
            <p className="text-gray-500 text-xs mt-1">{item.desc}</p>
          </div>
        ))}
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
            {cat === "all" ? "🌍 All" : cat.replace("-", " ")}
          </button>
        ))}
      </div>

      {/* AI Tool Cards */}
      <div className="grid gap-4 md:grid-cols-2">
        {filtered.map((tool) => {
          const colors = categoryColors[tool.category] || categoryColors.texture;
          return (
            <a
              key={tool.id}
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-2xl border border-gray-200 p-5 hover:border-orange-300 transition-all group hover:shadow-lg"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center text-2xl shrink-0 group-hover:scale-110 transition-transform">
                  {tool.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize ${colors.bg} ${colors.text} border ${colors.border}`}
                    >
                      {tool.category.replace("-", " ")}
                    </span>
                  </div>
                  <h3 className="text-gray-900 font-semibold text-sm mb-2 group-hover:text-orange-500 transition-colors">
                    {tool.name}
                  </h3>
                  <p className="text-gray-500 text-xs leading-relaxed mb-3">{tool.description}</p>
                  <div className="bg-blue-50 rounded-lg p-2 border border-blue-100">
                    <span className="text-blue-600 text-xs font-medium">Use Case: </span>
                    <span className="text-blue-700 text-xs">{tool.useCase}</span>
                  </div>
                </div>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default BlenderAITools;
