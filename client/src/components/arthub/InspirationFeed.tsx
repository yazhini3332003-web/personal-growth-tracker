import React, { useState, useEffect } from "react";
import { inspirationFeed, artworks, artistProfiles } from "../../data/artHubData";
import { useArtHubContext } from "../../context/ArtHubContext";

const InspirationFeed: React.FC = () => {
  const [currentQuoteIdx, setCurrentQuoteIdx] = useState(0);
  const [selectedWork, setSelectedWork] = useState<string | null>(null);
  const { isLiked, likeArtwork, unlikeArtwork, isBookmarked, bookmarkArtwork, unbookmarkArtwork } = useArtHubContext();
  
  const quotes = inspirationFeed.filter((i) => i.type === "quote");
  const trends = inspirationFeed.filter((i) => i.type === "trending");
  const allFeedArtworks = [...artworks].sort((a, b) => b.likes - a.likes);
  const selectedArtwork = artworks.find((a) => a.id === selectedWork);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentQuoteIdx((prev) => (prev + 1) % quotes.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [quotes.length]);

  const getCategoryIcon = (cat: string) => {
    const map: Record<string, string> = { stories: "📖", poems: "🌸", drawings: "✏️", "digital-art": "🖥️", experimental: "🔬" };
    return map[cat] || "🎨";
  };

  const getCategoryGradient = (cat: string) => {
    const map: Record<string, string> = {
      stories: "from-amber-400 to-orange-500",
      poems: "from-pink-400 to-rose-500",
      drawings: "from-emerald-400 to-teal-500",
      "digital-art": "from-purple-400 to-indigo-500",
      experimental: "from-cyan-400 to-blue-500",
    };
    return map[cat] || "from-gray-400 to-gray-500";
  };

  // Full Artwork View
  if (selectedArtwork) {
    const liked = isLiked(selectedArtwork.id);
    const bookmarked = isBookmarked(selectedArtwork.id);
    const artist = artistProfiles.find((a) => a.id === selectedArtwork.artistId);

    return (
      <div className="space-y-6">
        <button
          onClick={() => setSelectedWork(null)}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900"
        >
          ← Back to Feed
        </button>

        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className={`h-48 bg-gradient-to-br ${getCategoryGradient(selectedArtwork.category)} flex items-center justify-center`}>
            <span className="text-7xl opacity-20">{getCategoryIcon(selectedArtwork.category)}</span>
          </div>
          <div className="p-6">
            {/* Artist Info */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-xl">
                {selectedArtwork.artistAvatar}
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-sm">{selectedArtwork.artistName}</p>
                <p className="text-xs text-gray-400">
                  {new Date(selectedArtwork.createdAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                  {artist && ` · 📍 ${artist.location}`}
                </p>
              </div>
              <span className="ml-auto px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs capitalize">
                {getCategoryIcon(selectedArtwork.category)} {selectedArtwork.category.replace("-", " ")}
              </span>
            </div>

            <h2 className="text-xl font-bold text-gray-900 mb-2">{selectedArtwork.title}</h2>
            <p className="text-gray-600 text-sm leading-relaxed">{selectedArtwork.description}</p>

            {selectedArtwork.content && (
              <div className="mt-5 p-5 bg-gray-50 rounded-xl">
                <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line italic">{selectedArtwork.content}</p>
              </div>
            )}

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mt-4">
              {selectedArtwork.tags.map((tag, i) => (
                <span key={i} className="px-2 py-0.5 bg-gray-100 text-gray-500 rounded-md text-xs">#{tag}</span>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4 mt-5 pt-4 border-t border-gray-100">
              <button
                onClick={() => liked ? unlikeArtwork(selectedArtwork.id) : likeArtwork(selectedArtwork.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  liked ? "bg-red-50 text-red-600" : "bg-gray-100 text-gray-600 hover:bg-red-50 hover:text-red-600"
                }`}
              >
                {liked ? "❤️" : "🤍"} {selectedArtwork.likes + (liked ? 1 : 0)}
              </button>
              <button
                onClick={() => bookmarked ? unbookmarkArtwork(selectedArtwork.id) : bookmarkArtwork(selectedArtwork.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  bookmarked ? "bg-yellow-50 text-yellow-600" : "bg-gray-100 text-gray-600 hover:bg-yellow-50"
                }`}
              >
                {bookmarked ? "🔖 Saved" : "📌 Save"}
              </button>
              <span className="text-sm text-gray-400">💬 {selectedArtwork.comments.length} comments</span>
            </div>

            {/* Comments */}
            {selectedArtwork.comments.length > 0 && (
              <div className="mt-5 space-y-3">
                <h4 className="font-semibold text-gray-900 text-sm">Comments</h4>
                {selectedArtwork.comments.map((c) => (
                  <div key={c.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <span className="text-lg">{c.userAvatar}</span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-medium text-gray-700">{c.userName}</span>
                        <span className="text-xs text-gray-400">{c.createdAt}</span>
                      </div>
                      <p className="text-xs text-gray-600 mt-0.5">{c.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-bold text-gray-900">✨ Discover Art Feed</h2>
        <p className="text-sm text-gray-500 mt-1">Browse artworks by creators worldwide — get inspired, like, save, and explore</p>
      </div>

      {/* Rotating Quote */}
      <div className="bg-gradient-to-r from-rose-500 via-purple-500 to-indigo-500 rounded-2xl p-6 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 text-9xl flex items-center justify-center">💬</div>
        <div className="relative z-10">
          <p className="text-lg md:text-xl font-light italic leading-relaxed mb-2">
            "{quotes[currentQuoteIdx]?.content}"
          </p>
          <p className="text-white/70 text-sm">— {quotes[currentQuoteIdx]?.author}</p>
          <div className="flex justify-center gap-1.5 mt-3">
            {quotes.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentQuoteIdx(i)}
                className={`w-2 h-2 rounded-full transition-all ${i === currentQuoteIdx ? "bg-white w-6" : "bg-white/30"}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Trending Now */}
      {trends.length > 0 && (
        <div className="flex gap-3 overflow-x-auto pb-2">
          {trends.map((item) => (
            <div key={item.id} className="flex-shrink-0 px-4 py-2 bg-orange-50 border border-orange-100 rounded-xl">
              <p className="text-xs text-orange-700 font-medium">🔥 {item.content}</p>
            </div>
          ))}
        </div>
      )}

      {/* Art Feed Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {allFeedArtworks.map((work) => {
          const liked = isLiked(work.id);
          const bookmarked = isBookmarked(work.id);

          return (
            <div
              key={work.id}
              className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 group"
            >
              {/* Preview Image */}
              <div
                onClick={() => setSelectedWork(work.id)}
                className={`h-36 bg-gradient-to-br ${getCategoryGradient(work.category)} relative flex items-center justify-center cursor-pointer`}
              >
                <span className="text-5xl opacity-25 group-hover:scale-125 transition-transform duration-500">
                  {getCategoryIcon(work.category)}
                </span>
                <div className="absolute top-3 left-3">
                  <span className="px-2 py-0.5 bg-white/25 backdrop-blur-md rounded-full text-white text-xs capitalize">
                    {work.category.replace("-", " ")}
                  </span>
                </div>
                {work.featured && (
                  <div className="absolute top-3 right-3">
                    <span className="text-yellow-300">⭐</span>
                  </div>
                )}
              </div>

              <div className="p-4">
                {/* Artist Info */}
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">{work.artistAvatar}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-gray-900 truncate">{work.artistName}</p>
                    <p className="text-xs text-gray-400">{new Date(work.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</p>
                  </div>
                </div>

                {/* Title & Description */}
                <h3
                  onClick={() => setSelectedWork(work.id)}
                  className="font-bold text-gray-900 text-sm group-hover:text-purple-700 transition-colors cursor-pointer"
                >
                  {work.title}
                </h3>
                <p className="text-xs text-gray-500 mt-1 line-clamp-2">{work.description}</p>

                {/* Actions */}
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => liked ? unlikeArtwork(work.id) : likeArtwork(work.id)}
                      className={`flex items-center gap-1 text-xs font-medium transition-all ${liked ? "text-red-500" : "text-gray-400 hover:text-red-500"}`}
                    >
                      {liked ? "❤️" : "🤍"} {work.likes + (liked ? 1 : 0)}
                    </button>
                    <span
                      onClick={() => setSelectedWork(work.id)}
                      className="flex items-center gap-1 text-xs text-gray-400 cursor-pointer hover:text-purple-500"
                    >
                      💬 {work.comments.length}
                    </span>
                  </div>
                  <button
                    onClick={() => bookmarked ? unbookmarkArtwork(work.id) : bookmarkArtwork(work.id)}
                    className={`text-lg transition-all ${bookmarked ? "text-yellow-500" : "text-gray-300 hover:text-yellow-500"}`}
                  >
                    {bookmarked ? "🔖" : "📌"}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
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
