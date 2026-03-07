import React, { useState, useEffect } from "react";
import { inspirationFeed, artworks } from "../../data/artHubData";

const InspirationFeed: React.FC = () => {
  const [currentQuoteIdx, setCurrentQuoteIdx] = useState(0);
  const quotes = inspirationFeed.filter((i) => i.type === "quote");
  const trends = inspirationFeed.filter((i) => i.type === "trending");
  const featuredArtists = inspirationFeed.filter((i) => i.type === "featured-artist");
  const featuredWorks = artworks.filter((a) => a.featured).slice(0, 6);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentQuoteIdx((prev) => (prev + 1) % quotes.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [quotes.length]);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-bold text-gray-900">Inspiration Feed</h2>
        <p className="text-sm text-gray-500 mt-1">Discover, get inspired, and fuel your creativity</p>
      </div>

      {/* Rotating Quote */}
      <div className="bg-gradient-to-r from-rose-500 via-purple-500 to-indigo-500 rounded-2xl p-8 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 text-9xl flex items-center justify-center">💬</div>
        <div className="relative z-10">
          <p className="text-xl md:text-2xl font-light italic leading-relaxed mb-3">
            "{quotes[currentQuoteIdx]?.content}"
          </p>
          <p className="text-white/70 text-sm">— {quotes[currentQuoteIdx]?.author}</p>
          <div className="flex justify-center gap-1.5 mt-4">
            {quotes.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentQuoteIdx(i)}
                className={`w-2 h-2 rounded-full transition-all ${
                  i === currentQuoteIdx ? "bg-white w-6" : "bg-white/30"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Featured Artist */}
        <div className="lg:col-span-1 space-y-4">
          <h3 className="font-bold text-gray-900 flex items-center gap-2">🌟 Featured Artist</h3>
          {featuredArtists.map((item) => (
            <div key={item.id} className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-md transition-all">
              <div className="w-14 h-14 bg-gradient-to-br from-yellow-100 to-amber-100 rounded-xl flex items-center justify-center text-3xl mb-3">
                🌟
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">{item.content}</p>
              {item.author && <p className="text-xs text-purple-600 font-medium mt-2">{item.author}</p>}
            </div>
          ))}

          {/* Trending */}
          <h3 className="font-bold text-gray-900 flex items-center gap-2 pt-2">🔥 Trending Now</h3>
          {trends.map((item) => (
            <div key={item.id} className="bg-orange-50 rounded-xl border border-orange-100 p-4">
              <p className="text-sm text-gray-700">{item.content}</p>
            </div>
          ))}
        </div>

        {/* Featured Artworks */}
        <div className="lg:col-span-2">
          <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">✨ Featured Artworks</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {featuredWorks.map((work) => {
              const gradients = [
                "from-rose-400 to-pink-500",
                "from-violet-400 to-purple-500",
                "from-amber-400 to-orange-500",
                "from-emerald-400 to-teal-500",
                "from-cyan-400 to-blue-500",
                "from-fuchsia-400 to-pink-500",
              ];
              const gradient = gradients[Number(work.id.replace("art-", "")) % gradients.length];

              return (
                <div key={work.id} className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all group">
                  <div className={`h-28 bg-gradient-to-br ${gradient} flex items-center justify-center`}>
                    <span className="text-4xl opacity-30 group-hover:scale-125 transition-transform duration-500">
                      {work.category === "stories" ? "📖" : work.category === "poems" ? "🌸" : work.category === "drawings" ? "✏️" : work.category === "digital-art" ? "🖥️" : "🔬"}
                    </span>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-lg">{work.artistAvatar}</span>
                      <span className="text-xs text-gray-500">{work.artistName}</span>
                    </div>
                    <h4 className="font-semibold text-gray-900 text-sm group-hover:text-purple-700 transition-colors">{work.title}</h4>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-1">{work.description}</p>
                    <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">
                      <span>❤️ {work.likes}</span>
                      <span>💬 {work.comments.length}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Daily Inspiration */}
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-100 p-6">
        <h3 className="font-bold text-gray-900 mb-2">🎲 Daily Creative Spark</h3>
        <p className="text-sm text-gray-600">
          Try this today: <span className="font-medium text-purple-700 italic">
          Create something using only three colors and a single shape. Let constraints fuel creativity.
          </span>
        </p>
      </div>
    </div>
  );
};

export default InspirationFeed;
