import React, { useState } from "react";
import { artworks } from "../../data/artHubData";
import { useArtHubContext } from "../../context/ArtHubContext";
import { ArtCategory } from "../../types/artHub";

const categoryConfig: { key: ArtCategory | "all"; label: string; icon: string }[] = [
  { key: "all", label: "All Art", icon: "🌐" },
  { key: "stories", label: "Stories", icon: "📖" },
  { key: "poems", label: "Poems", icon: "🌸" },
  { key: "drawings", label: "Drawings", icon: "✏️" },
  { key: "digital-art", label: "Digital Art", icon: "🖥️" },
  { key: "experimental", label: "Experimental", icon: "🔬" },
];

const ArtCategories: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<ArtCategory | "all">("all");
  const [expandedArt, setExpandedArt] = useState<string | null>(null);
  const { isLiked, likeArtwork, unlikeArtwork, isBookmarked, bookmarkArtwork, unbookmarkArtwork } = useArtHubContext();

  const filteredArtworks = activeCategory === "all"
    ? artworks
    : artworks.filter((a) => a.category === activeCategory);

  const getCategoryGradient = (cat: ArtCategory) => {
    const map: Record<ArtCategory, string> = {
      stories: "from-amber-400 to-orange-500",
      poems: "from-pink-400 to-rose-500",
      drawings: "from-emerald-400 to-teal-500",
      "digital-art": "from-purple-400 to-indigo-500",
      experimental: "from-cyan-400 to-blue-500",
    };
    return map[cat];
  };

  const getCategoryIcon = (cat: ArtCategory) => {
    const map: Record<ArtCategory, string> = {
      stories: "📖",
      poems: "🌸",
      drawings: "✏️",
      "digital-art": "🖥️",
      experimental: "🔬",
    };
    return map[cat];
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Art Categories</h2>
          <p className="text-sm text-gray-500 mt-1">Explore and discover artwork across all creative forms</p>
        </div>
        <span className="text-xs text-gray-400">{filteredArtworks.length} works</span>
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 flex-wrap">
        {categoryConfig.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setActiveCategory(cat.key)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-1.5 ${
              activeCategory === cat.key
                ? "bg-gray-900 text-white shadow-lg"
                : "bg-white text-gray-600 border border-gray-200 hover:border-gray-300 hover:shadow-sm"
            }`}
          >
            <span>{cat.icon}</span>
            {cat.label}
          </button>
        ))}
      </div>

      {/* Artworks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredArtworks.map((art) => {
          const liked = isLiked(art.id);
          const bookmarked = isBookmarked(art.id);
          const isExpanded = expandedArt === art.id;

          return (
            <div
              key={art.id}
              className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 group"
            >
              {/* Card Header / Image placeholder */}
              <div className={`h-44 bg-gradient-to-br ${getCategoryGradient(art.category)} relative flex items-center justify-center`}>
                <span className="text-6xl opacity-30 group-hover:scale-110 transition-transform duration-500">
                  {getCategoryIcon(art.category)}
                </span>
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 bg-white/25 backdrop-blur-md rounded-full text-white text-xs font-medium">
                    {art.category.replace("-", " ")}
                  </span>
                </div>
                {art.featured && (
                  <div className="absolute top-3 right-3">
                    <span className="px-2.5 py-1 bg-yellow-400/90 backdrop-blur-md rounded-full text-yellow-900 text-xs font-medium">
                      ⭐ Featured
                    </span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xl">{art.artistAvatar}</span>
                  <div>
                    <p className="text-xs font-medium text-gray-900">{art.artistName}</p>
                    <p className="text-xs text-gray-400">{new Date(art.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</p>
                  </div>
                </div>

                <h3 className="font-bold text-gray-900 mb-1.5 group-hover:text-purple-700 transition-colors">
                  {art.title}
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed mb-3">
                  {art.description}
                </p>

                {/* Written content preview */}
                {art.content && (
                  <div className="mb-3">
                    <div className={`bg-gray-50 rounded-lg p-3 text-xs text-gray-600 italic leading-relaxed ${isExpanded ? "" : "line-clamp-4"}`}>
                      {art.content}
                    </div>
                    <button
                      onClick={() => setExpandedArt(isExpanded ? null : art.id)}
                      className="text-purple-600 text-xs mt-1 hover:text-purple-800 font-medium"
                    >
                      {isExpanded ? "Show less" : "Read more..."}
                    </button>
                  </div>
                )}

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {art.tags.slice(0, 4).map((tag, i) => (
                    <span key={i} className="px-2 py-0.5 bg-gray-100 text-gray-500 rounded-md text-xs">
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => liked ? unlikeArtwork(art.id) : likeArtwork(art.id)}
                      className={`flex items-center gap-1 text-xs font-medium transition-all ${
                        liked ? "text-red-500" : "text-gray-400 hover:text-red-500"
                      }`}
                    >
                      <span>{liked ? "❤️" : "🤍"}</span>
                      {art.likes + (liked ? 1 : 0)}
                    </button>
                    <span className="flex items-center gap-1 text-xs text-gray-400">
                      💬 {art.comments.length}
                    </span>
                  </div>
                  <button
                    onClick={() => bookmarked ? unbookmarkArtwork(art.id) : bookmarkArtwork(art.id)}
                    className={`text-lg transition-all ${
                      bookmarked ? "text-yellow-500" : "text-gray-300 hover:text-yellow-500"
                    }`}
                  >
                    {bookmarked ? "🔖" : "📌"}
                  </button>
                </div>

                {/* Comments Preview */}
                {art.comments.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-gray-50">
                    <div className="flex items-start gap-2">
                      <span className="text-sm">{art.comments[0].userAvatar}</span>
                      <div>
                        <span className="text-xs font-medium text-gray-700">{art.comments[0].userName}</span>
                        <p className="text-xs text-gray-500 line-clamp-2">{art.comments[0].text}</p>
                      </div>
                    </div>
                    {art.comments.length > 1 && (
                      <p className="text-xs text-purple-500 mt-1 cursor-pointer hover:text-purple-700">
                        View all {art.comments.length} comments
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ArtCategories;
