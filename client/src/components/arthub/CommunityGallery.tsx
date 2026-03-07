import React, { useState } from "react";
import { artworks } from "../../data/artHubData";
import { useArtHubContext } from "../../context/ArtHubContext";
import { ArtCategory } from "../../types/artHub";

const CommunityGallery: React.FC = () => {
  const [filter, setFilter] = useState<ArtCategory | "all">("all");
  const [selectedWork, setSelectedWork] = useState<string | null>(null);
  const { isLiked, likeArtwork, unlikeArtwork } = useArtHubContext();

  const galleryWorks = artworks.filter((a) => a.galleryApproved);
  const filtered = filter === "all" ? galleryWorks : galleryWorks.filter((a) => a.category === filter);
  const work = artworks.find((a) => a.id === selectedWork);

  const categories: { key: ArtCategory | "all"; label: string; icon: string }[] = [
    { key: "all", label: "All", icon: "🌐" },
    { key: "poems", label: "Poems", icon: "🌸" },
    { key: "stories", label: "Stories", icon: "📖" },
    { key: "drawings", label: "Drawings", icon: "✏️" },
    { key: "digital-art", label: "Digital Art", icon: "🖥️" },
    { key: "experimental", label: "Experimental", icon: "🔬" },
  ];

  const getCatGradient = (cat: ArtCategory): string => {
    const m: Record<ArtCategory, string> = {
      stories: "from-amber-400 to-orange-500",
      poems: "from-pink-400 to-rose-500",
      drawings: "from-emerald-400 to-teal-500",
      "digital-art": "from-purple-400 to-indigo-500",
      experimental: "from-cyan-400 to-blue-500",
    };
    return m[cat];
  };

  if (work) {
    const liked = isLiked(work.id);
    return (
      <div className="space-y-6">
        <button
          onClick={() => setSelectedWork(null)}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900"
        >
          ← Back to Gallery
        </button>
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className={`h-48 bg-gradient-to-br ${getCatGradient(work.category)} flex items-center justify-center`}>
            <span className="text-7xl opacity-20">🖼️</span>
          </div>
          <div className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">{work.artistAvatar}</span>
              <div>
                <p className="font-medium text-gray-900">{work.artistName}</p>
                <p className="text-xs text-gray-400">{new Date(work.createdAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</p>
              </div>
              <span className="ml-auto px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-medium">✓ Gallery Approved</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{work.title}</h2>
            <p className="text-gray-600 leading-relaxed">{work.description}</p>

            {work.content && (
              <div className="mt-6 p-6 bg-gray-50 rounded-xl">
                <p className="text-gray-700 leading-relaxed whitespace-pre-line italic">{work.content}</p>
              </div>
            )}

            <div className="flex items-center gap-4 mt-6 pt-4 border-t border-gray-100">
              <button
                onClick={() => liked ? unlikeArtwork(work.id) : likeArtwork(work.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  liked ? "bg-red-50 text-red-600" : "bg-gray-100 text-gray-600 hover:bg-red-50 hover:text-red-600"
                }`}
              >
                {liked ? "❤️" : "🤍"} {work.likes + (liked ? 1 : 0)}
              </button>
              <span className="text-sm text-gray-400">💬 {work.comments.length} comments</span>
            </div>

            {/* Comments */}
            {work.comments.length > 0 && (
              <div className="mt-6 space-y-3">
                <h4 className="font-semibold text-gray-900">Comments</h4>
                {work.comments.map((c) => (
                  <div key={c.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <span className="text-lg">{c.userAvatar}</span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-700">{c.userName}</span>
                        <span className="text-xs text-gray-400">{c.createdAt}</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-0.5">{c.text}</p>
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
    <div className="space-y-6">
      {/* Gallery Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-600 via-rose-600 to-purple-700 p-8 text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-4 right-8 text-8xl">🖼️</div>
          <div className="absolute bottom-4 left-8 text-6xl">🏛️</div>
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-3">
            <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-medium backdrop-blur-sm">🌍 Digital Exhibition</span>
          </div>
          <h2 className="text-2xl font-bold mb-2">Community Art Gallery</h2>
          <p className="text-white/90 text-sm max-w-xl leading-relaxed">
            Welcome to the official gallery — a curated digital art exhibition featuring the best creative
            works from our global community. Every piece here has been submitted by an artist, reviewed
            by the community, and approved for public showcase.
          </p>
          <p className="text-white/60 text-xs mt-3">{galleryWorks.length} approved works on display</p>
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-gradient-to-r from-amber-50 to-rose-50 rounded-xl border border-amber-100 p-5">
        <h3 className="font-bold text-gray-900 mb-3 text-sm">🎯 How the Gallery Works</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="flex items-start gap-3 p-3 bg-white rounded-lg border border-amber-100">
            <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center text-sm flex-shrink-0">1</div>
            <div>
              <p className="text-xs font-semibold text-gray-900">Submit Your Art</p>
              <p className="text-[10px] text-gray-500 mt-0.5">Post your best work and submit it for gallery review</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 bg-white rounded-lg border border-rose-100">
            <div className="w-8 h-8 rounded-lg bg-rose-100 flex items-center justify-center text-sm flex-shrink-0">2</div>
            <div>
              <p className="text-xs font-semibold text-gray-900">Community Review</p>
              <p className="text-[10px] text-gray-500 mt-0.5">Your submission is reviewed for quality & originality</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 bg-white rounded-lg border border-purple-100">
            <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center text-sm flex-shrink-0">3</div>
            <div>
              <p className="text-xs font-semibold text-gray-900">Gallery Showcase</p>
              <p className="text-[10px] text-gray-500 mt-0.5">Approved works are featured in our global digital exhibition</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setFilter(cat.key)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-1.5 ${
              filter === cat.key
                ? "bg-gray-900 text-white shadow-lg"
                : "bg-white text-gray-600 border border-gray-200 hover:shadow-sm"
            }`}
          >
            <span>{cat.icon}</span>
            {cat.label}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((art) => (
          <div
            key={art.id}
            onClick={() => setSelectedWork(art.id)}
            className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group"
          >
            <div className={`h-36 bg-gradient-to-br ${getCatGradient(art.category)} relative flex items-center justify-center`}>
              <span className="text-5xl opacity-20 group-hover:scale-125 transition-transform duration-500">🖼️</span>
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                <span className="px-2 py-0.5 bg-white/25 backdrop-blur-md rounded-full text-white text-xs capitalize">{art.category.replace("-", " ")}</span>
                {art.featured && <span className="text-yellow-300 text-sm">⭐</span>}
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">{art.artistAvatar}</span>
                <span className="text-xs text-gray-500">{art.artistName}</span>
              </div>
              <h3 className="font-bold text-gray-900 text-sm group-hover:text-purple-700 transition-colors">{art.title}</h3>
              <p className="text-xs text-gray-500 mt-1 line-clamp-2">{art.description}</p>
              <div className="flex items-center gap-3 mt-3 pt-3 border-t border-gray-100 text-xs text-gray-400">
                <span>❤️ {art.likes}</span>
                <span>💬 {art.comments.length}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Submit CTA */}
      <div className="bg-gradient-to-r from-amber-50 to-rose-50 rounded-xl border border-amber-100 p-6">
        <div className="flex flex-col sm:flex-row items-center gap-5">
          <div className="w-16 h-16 bg-gradient-to-br from-amber-100 to-rose-100 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0">
            🖼️
          </div>
          <div className="flex-1 text-center sm:text-left">
            <h3 className="font-bold text-gray-900 mb-1">Want Your Art in the Gallery?</h3>
            <p className="text-sm text-gray-500">
              Submit your best creation for community review. Once approved, your work will be showcased
              in our global digital exhibition alongside artists from around the world.
            </p>
          </div>
          <button className="px-6 py-2.5 bg-gradient-to-r from-amber-600 to-rose-600 text-white rounded-xl text-sm font-medium hover:shadow-lg transition-all flex-shrink-0">
            Submit to Gallery →
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommunityGallery;
