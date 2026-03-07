import React, { useState } from "react";
import { independentWriters } from "../../data/booksHubData";
import { useBooksHubContext } from "../../context/BooksHubContext";

const IndependentWriters: React.FC = () => {
  const [selectedWriter, setSelectedWriter] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>("all");
  const { followAuthor, unfollowAuthor, isAuthorFollowed } = useBooksHubContext();

  const selected = selectedWriter ? independentWriters.find((w) => w.id === selectedWriter) : null;

  const allGenres = Array.from(
    independentWriters.reduce((acc, w) => {
      w.genre.forEach((g) => acc.add(g));
      return acc;
    }, new Set<string>())
  );

  const filtered = independentWriters.filter(
    (w) => filter === "all" || w.genre.some((g) => g === filter)
  );

  if (selected) {
    return (
      <div className="space-y-6">
        <button onClick={() => setSelectedWriter(null)} className="text-amber-600 hover:text-amber-700 text-sm font-medium flex items-center gap-1">
          ← Back to Writers
        </button>
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
          <div className="bg-gradient-to-r from-violet-600 to-purple-700 p-8 text-white">
            <div className="flex items-start gap-4">
              <span className="text-5xl">{selected.avatar}</span>
              <div className="flex-1">
                <h1 className="text-2xl font-bold">{selected.name}</h1>
                <p className="text-violet-200 text-sm mt-1">{selected.location}</p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {selected.genre.map((g) => (
                    <span key={g} className="px-2 py-1 bg-white/15 rounded-full text-xs">{g}</span>
                  ))}
                </div>
              </div>
              <button
                onClick={() => isAuthorFollowed(selected.id) ? unfollowAuthor(selected.id) : followAuthor(selected.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  isAuthorFollowed(selected.id) ? "bg-amber-500 text-white" : "bg-white/15 text-white hover:bg-white/25"
                }`}
              >
                {isAuthorFollowed(selected.id) ? "✓ Following" : "Follow"}
              </button>
            </div>
          </div>
          <div className="p-6 space-y-5">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">About</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{selected.bio}</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <p className="text-xl font-bold text-gray-900">{selected.publishedBooks}</p>
                <p className="text-gray-500 text-xs">Books</p>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <p className="text-xl font-bold text-gray-900">{selected.shortWritings}</p>
                <p className="text-gray-500 text-xs">Short Writings</p>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <p className="text-xl font-bold text-gray-900">{selected.followers}</p>
                <p className="text-gray-500 text-xs">Followers</p>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <p className="text-xl font-bold text-gray-900">{selected.languages.length}</p>
                <p className="text-gray-500 text-xs">Languages</p>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Languages</h3>
              <div className="flex flex-wrap gap-2">
                {selected.languages.map((lang) => (
                  <span key={lang} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs capitalize">{lang}</span>
                ))}
              </div>
            </div>
            <p className="text-gray-400 text-xs">Member since {new Date(selected.joinedDate).toLocaleDateString("en-US", { month: "long", year: "numeric" })}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-bold text-gray-900">Independent Writers Platform</h2>
        <p className="text-gray-500 text-sm mt-1">Discover new voices — writers sharing original books, research, and creative works</p>
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-r from-violet-600 to-purple-700 rounded-xl p-6 text-white">
        <h3 className="font-bold text-lg">Are You a Writer?</h3>
        <p className="text-violet-200 text-sm mt-1">
          Publish your books, share your knowledge, upload short writings, and share research with a global audience.
          This platform is built for new and unknown authors to gain visibility.
        </p>
        <button className="mt-4 px-5 py-2 bg-white text-violet-700 font-semibold rounded-lg text-sm hover:bg-violet-50 transition-all">
          Start Publishing →
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setFilter("all")}
          className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
            filter === "all" ? "bg-violet-100 text-violet-700" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          All Writers
        </button>
        {allGenres.map((genre) => (
          <button
            key={genre}
            onClick={() => setFilter(genre)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
              filter === genre ? "bg-violet-100 text-violet-700" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {genre}
          </button>
        ))}
      </div>

      {/* Featured Writers */}
      {filter === "all" && (
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">⭐ Featured Writers</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {independentWriters.filter((w) => w.featured).map((writer) => (
              <div
                key={writer.id}
                onClick={() => setSelectedWriter(writer.id)}
                className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-xl border border-violet-100 p-5 hover:shadow-lg transition-all cursor-pointer group"
              >
                <div className="flex items-start gap-3">
                  <span className="text-3xl">{writer.avatar}</span>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 group-hover:text-violet-600 transition-colors">{writer.name}</h4>
                    <p className="text-gray-500 text-xs">{writer.location}</p>
                    <p className="text-gray-600 text-xs mt-2 line-clamp-2">{writer.bio}</p>
                    <div className="flex items-center gap-3 mt-3 text-xs text-gray-500">
                      <span>{writer.publishedBooks} books</span>
                      <span>·</span>
                      <span>{writer.followers} followers</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* All Writers */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((writer) => (
          <div
            key={writer.id}
            onClick={() => setSelectedWriter(writer.id)}
            className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-lg transition-all cursor-pointer group"
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl">{writer.avatar}</span>
              <div>
                <h4 className="font-semibold text-gray-900 group-hover:text-violet-600 transition-colors text-sm">{writer.name}</h4>
                <p className="text-gray-500 text-xs">{writer.location}</p>
              </div>
            </div>
            <p className="text-gray-600 text-xs line-clamp-2">{writer.bio}</p>
            <div className="flex flex-wrap gap-1.5 mt-3">
              {writer.genre.slice(0, 2).map((g) => (
                <span key={g} className="px-2 py-0.5 bg-violet-100 text-violet-700 rounded-full text-xs">{g}</span>
              ))}
            </div>
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-50 text-xs text-gray-400">
              <span>{writer.publishedBooks} books · {writer.shortWritings} writings</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IndependentWriters;
