import React from "react";
import { aiArtTools } from "../../data/artHubData";

const AIArtLab: React.FC = () => {
  const categoryLabels: Record<string, { label: string; icon: string; color: string }> = {
    generation: { label: "AI Generation", icon: "🎨", color: "from-purple-500 to-indigo-600" },
    storytelling: { label: "AI Writing", icon: "📝", color: "from-amber-500 to-orange-600" },
    style: { label: "Style Tools", icon: "🖌️", color: "from-pink-500 to-rose-600" },
    prompt: { label: "Prompt Tools", icon: "💡", color: "from-cyan-500 to-blue-600" },
    trend: { label: "Trending", icon: "🔥", color: "from-red-500 to-orange-600" },
  };

  const categories = Array.from(new Set(aiArtTools.map((t) => t.category)));

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-600 p-8 text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-6 right-12 text-7xl">🤖</div>
          <div className="absolute bottom-6 left-12 text-5xl">✨</div>
        </div>
        <div className="relative z-10">
          <h2 className="text-2xl font-bold mb-2">AI Art Lab</h2>
          <p className="text-white/80 text-sm max-w-xl leading-relaxed">
            Explore the frontier of creativity where artificial intelligence meets artistic expression.
            Generate art, write stories with AI assistance, experiment with styles, and stay ahead of the latest trends.
          </p>
        </div>
      </div>

      {/* Category Sections */}
      {categories.map((cat) => {
        const config = categoryLabels[cat];
        const tools = aiArtTools.filter((t) => t.category === cat);
        return (
          <div key={cat}>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xl">{config.icon}</span>
              <h3 className="text-lg font-bold text-gray-900">{config.label}</h3>
              <span className="text-xs text-gray-400 ml-auto">{tools.length} tools</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {tools.map((tool) => (
                <a
                  key={tool.id}
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-lg transition-all duration-300 group block"
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${config.color} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                      <span className="text-lg">{tool.icon}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-gray-900 text-sm group-hover:text-purple-700 transition-colors">{tool.name}</h4>
                        {tool.trending && (
                          <span className="px-1.5 py-0.5 bg-red-100 text-red-600 text-xs rounded-full font-medium">🔥</span>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 mt-1 line-clamp-2">{tool.description}</p>
                      <p className="text-xs text-gray-400 mt-2 italic">{tool.useCase}</p>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-xs text-gray-400 capitalize">{tool.category}</span>
                    <span className="text-xs text-purple-600 font-medium group-hover:translate-x-1 transition-transform">Visit →</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        );
      })}

      {/* AI Prompt Playground */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
          <span>🎲</span> AI Prompt Ideas
        </h3>
        <p className="text-sm text-gray-500 mb-4">Try these creative prompts with any AI art tool:</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            "A floating library in the clouds during golden hour, watercolor style",
            "An ancient forest where the trees are made of crystal and light",
            "A cozy coffee shop on the surface of Mars, studio ghibli style",
            "Write a poem about the last star in the universe saying goodbye",
            "A city where buildings grow like flowers, surrealist photography",
            "Continue this story: The door opened, and behind it was a world where colors had sound",
          ].map((prompt, i) => (
            <div key={i} className="flex items-start gap-3 p-3 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg group hover:from-purple-100 hover:to-indigo-100 transition-colors cursor-pointer">
              <span className="text-purple-400 mt-0.5 text-xs">💫</span>
              <p className="text-sm text-gray-700 italic leading-relaxed">{prompt}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AIArtLab;
