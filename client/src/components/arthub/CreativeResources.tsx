import React, { useState } from "react";
import { creativeResources } from "../../data/artHubData";

const CreativeResources: React.FC = () => {
  const [activeResource, setActiveResource] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>("all");

  const typeLabels: Record<string, { label: string; icon: string; color: string }> = {
    "color-palette": { label: "Color Palette", icon: "🎨", color: "bg-rose-50 text-rose-700" },
    "writing-prompt": { label: "Writing Prompt", icon: "💡", color: "bg-amber-50 text-amber-700" },
    "story-idea": { label: "Story Idea", icon: "📖", color: "bg-purple-50 text-purple-700" },
    reference: { label: "Reference", icon: "🧍", color: "bg-blue-50 text-blue-700" },
    template: { label: "Template", icon: "📐", color: "bg-emerald-50 text-emerald-700" },
    tool: { label: "Tool", icon: "🔧", color: "bg-cyan-50 text-cyan-700" },
  };

  const types = ["all"].concat(Array.from(new Set(creativeResources.map((r) => r.type))));
  const filtered = filter === "all" ? creativeResources : creativeResources.filter((r) => r.type === filter);
  const resource = creativeResources.find((r) => r.id === activeResource);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900">Creative Resources</h2>
        <p className="text-sm text-gray-500 mt-1">Helpful tools and materials to kickstart your next project</p>
      </div>

      {/* Filter */}
      <div className="flex gap-2 flex-wrap">
        {types.map((t) => (
          <button
            key={t}
            onClick={() => setFilter(t)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all ${
              filter === t
                ? "bg-gray-900 text-white"
                : "bg-white text-gray-600 border border-gray-200 hover:shadow-sm"
            }`}
          >
            {t === "all" ? "🌐 All" : `${typeLabels[t]?.icon || ""} ${t.replace("-", " ")}`}
          </button>
        ))}
      </div>

      {/* Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((res) => {
          const config = typeLabels[res.type];
          return (
            <div
              key={res.id}
              onClick={() => setActiveResource(activeResource === res.id ? null : res.id)}
              className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-lg transition-all duration-300 cursor-pointer group"
            >
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 ${config?.color || "bg-gray-50 text-gray-700"} rounded-xl flex items-center justify-center text-xl flex-shrink-0 group-hover:scale-110 transition-transform`}>
                  {res.icon}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm group-hover:text-purple-700 transition-colors">{res.name}</h4>
                  <p className="text-xs text-gray-500 mt-1">{res.description}</p>
                  <span className={`inline-block mt-2 px-2 py-0.5 rounded-full text-xs ${config?.color || "bg-gray-100 text-gray-600"}`}>
                    {config?.label || res.type}
                  </span>
                </div>
              </div>

              {/* Expanded Content */}
              {activeResource === res.id && res.content && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="space-y-2">
                    {res.content.split(" | ").map((item, i) => (
                      <div key={i} className="p-3 bg-gray-50 rounded-lg text-sm text-gray-700 leading-relaxed">
                        {res.type === "color-palette" ? (
                          <div>
                            <p className="font-medium text-xs text-gray-500 mb-2">{item.split(":")[0]}</p>
                            <div className="flex gap-2">
                              {item.split(":")[1]?.split(",").map((color, ci) => (
                                <div
                                  key={ci}
                                  className="w-8 h-8 rounded-lg shadow-sm border border-gray-200"
                                  style={{ backgroundColor: color.trim() }}
                                  title={color.trim()}
                                />
                              ))}
                            </div>
                          </div>
                        ) : (
                          <p className="italic">{item}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CreativeResources;
