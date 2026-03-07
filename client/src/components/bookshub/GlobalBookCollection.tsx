import React, { useState } from "react";
import { books } from "../../data/booksHubData";
import { useBooksHubContext } from "../../context/BooksHubContext";

const GlobalBookCollection: React.FC = () => {
  const [filter, setFilter] = useState<string>("all");
  const [sourceFilter, setSourceFilter] = useState<string>("all");
  const [selectedBook, setSelectedBook] = useState<string | null>(null);
  const { likeBook, unlikeBook, isLiked, saveBook, unsaveBook, isSaved, addToReadingList, isInReadingList } = useBooksHubContext();

  const categories: { key: string; label: string; icon: string }[] = [
    { key: "all", label: "All Books", icon: "📚" },
    { key: "philosophy", label: "Philosophy", icon: "🧠" },
    { key: "literature", label: "Literature", icon: "📖" },
    { key: "poetry", label: "Poetry", icon: "🌸" },
    { key: "self-development", label: "Self Development", icon: "🌱" },
    { key: "educational", label: "Educational", icon: "🎓" },
    { key: "science", label: "Science", icon: "🔬" },
    { key: "history", label: "History", icon: "🏛️" },
  ];

  const sources = [
    { key: "all", label: "All Sources" },
    { key: "public-domain", label: "Public Domain" },
    { key: "independent-author", label: "Independent Authors" },
    { key: "free-shared", label: "Free Shared" },
    { key: "rare-collection", label: "Rare Collection" },
  ];

  const filtered = books.filter((b) => {
    const catMatch = filter === "all" || b.category === filter;
    const srcMatch = sourceFilter === "all" || b.source === sourceFilter;
    return catMatch && srcMatch;
  });

  const selected = selectedBook ? books.find((b) => b.id === selectedBook) : null;

  if (selected) {
    return (
      <div className="space-y-6">
        <button onClick={() => setSelectedBook(null)} className="text-amber-600 hover:text-amber-700 text-sm font-medium flex items-center gap-1">
          ← Back to Collection
        </button>
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
          <div className="bg-gradient-to-r from-amber-500 to-orange-600 p-8 text-white">
            <div className="flex items-start gap-4">
              <span className="text-5xl">{selected.coverUrl}</span>
              <div className="flex-1">
                <h1 className="text-2xl font-bold">{selected.title}</h1>
                <p className="text-amber-100 mt-1">by {selected.authorName}</p>
                <div className="flex flex-wrap gap-2 mt-3">
                  <span className="px-2 py-1 bg-white/20 rounded-full text-xs">{selected.language}</span>
                  <span className="px-2 py-1 bg-white/20 rounded-full text-xs">{selected.publishedYear < 0 ? `${Math.abs(selected.publishedYear)} BCE` : selected.publishedYear}</span>
                  <span className="px-2 py-1 bg-white/20 rounded-full text-xs">{selected.pages} pages</span>
                  <span className="px-2 py-1 bg-white/20 rounded-full text-xs">⭐ {selected.rating}</span>
                  {selected.isFree && <span className="px-2 py-1 bg-green-400/30 rounded-full text-xs">Free</span>}
                  {selected.isTamil && <span className="px-2 py-1 bg-yellow-400/30 rounded-full text-xs">Tamil</span>}
                </div>
              </div>
            </div>
          </div>
          <div className="p-6 space-y-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">About This Book</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{selected.description}</p>
            </div>
            {selected.previewText && (
              <div className="bg-amber-50 border border-amber-100 rounded-xl p-4">
                <h3 className="font-semibold text-amber-800 text-sm mb-2">📖 Preview</h3>
                <p className="text-amber-900 text-sm italic leading-relaxed">{selected.previewText}</p>
              </div>
            )}
            {selected.aiSummary && (
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
                <h3 className="font-semibold text-blue-800 text-sm mb-2">🤖 AI Summary</h3>
                <p className="text-blue-900 text-sm leading-relaxed">{selected.aiSummary}</p>
              </div>
            )}
            {selected.keyIdeas && selected.keyIdeas.length > 0 && (
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">💡 Key Ideas</h3>
                <div className="space-y-2">
                  {selected.keyIdeas.map((idea, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="text-amber-500 mt-0.5 font-bold">{i + 1}.</span>
                      <span>{idea}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {selected.chapterSummaries && selected.chapterSummaries.length > 0 && (
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">📑 Chapter Summaries</h3>
                <div className="space-y-2">
                  {selected.chapterSummaries.map((ch, i) => (
                    <div key={i} className="bg-gray-50 rounded-lg p-3">
                      <p className="font-medium text-gray-900 text-sm">{ch.chapter}</p>
                      <p className="text-gray-600 text-xs mt-1">{ch.summary}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {selected.translations && selected.translations.length > 0 && (
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">🌐 Available Translations</h3>
                <div className="flex flex-wrap gap-2">
                  {selected.translations.map((t, i) => (
                    <span key={i} className={`px-3 py-1 rounded-full text-xs font-medium ${t.available ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-400"}`}>
                      {t.language} {t.available ? "✓" : "—"}
                    </span>
                  ))}
                </div>
              </div>
            )}
            <div className="flex flex-wrap gap-2">
              {selected.tags.map((tag) => (
                <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">#{tag}</span>
              ))}
            </div>
            <div className="flex flex-wrap gap-3 pt-2 border-t border-gray-100">
              <button
                onClick={() => isLiked(selected.id) ? unlikeBook(selected.id) : likeBook(selected.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${isLiked(selected.id) ? "bg-red-100 text-red-600" : "bg-gray-100 text-gray-600 hover:bg-red-50"}`}
              >
                {isLiked(selected.id) ? "❤️ Liked" : "🤍 Like"}
              </button>
              <button
                onClick={() => isSaved(selected.id) ? unsaveBook(selected.id) : saveBook(selected.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${isSaved(selected.id) ? "bg-amber-100 text-amber-600" : "bg-gray-100 text-gray-600 hover:bg-amber-50"}`}
              >
                {isSaved(selected.id) ? "⭐ Saved" : "☆ Save"}
              </button>
              <button
                onClick={() => addToReadingList(selected.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${isInReadingList(selected.id) ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-600 hover:bg-blue-50"}`}
              >
                {isInReadingList(selected.id) ? "📋 In Reading List" : "📋 Add to Reading List"}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-bold text-gray-900">Global Book Collection</h2>
        <p className="text-gray-500 text-sm mt-1">Rare, independent, public domain, and free books organized in one place</p>
      </div>

      {/* Category Filters */}
      <div className="overflow-x-auto pb-2">
        <div className="flex gap-2 min-w-max">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setFilter(cat.key)}
              className={`px-3 py-2 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 whitespace-nowrap ${
                filter === cat.key ? "bg-amber-100 text-amber-700 shadow-sm" : "bg-white text-gray-500 hover:text-gray-700 border border-gray-200"
              }`}
            >
              <span>{cat.icon}</span> {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Source Filter */}
      <div className="flex flex-wrap gap-2">
        {sources.map((src) => (
          <button
            key={src.key}
            onClick={() => setSourceFilter(src.key)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
              sourceFilter === src.key ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {src.label}
          </button>
        ))}
      </div>

      {/* Books Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((book) => (
          <div
            key={book.id}
            onClick={() => setSelectedBook(book.id)}
            className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-lg transition-all cursor-pointer group"
          >
            <div className="flex items-start gap-3">
              <span className="text-3xl">{book.coverUrl}</span>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 group-hover:text-amber-600 transition-colors text-sm truncate">
                  {book.title}
                </h3>
                <p className="text-gray-500 text-xs mt-0.5">by {book.authorName}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-amber-600">⭐ {book.rating}</span>
                  <span className="text-gray-300">·</span>
                  <span className="text-xs text-gray-400">{book.pages}p</span>
                  {book.isTamil && (
                    <>
                      <span className="text-gray-300">·</span>
                      <span className="text-xs text-emerald-600 font-medium">Tamil</span>
                    </>
                  )}
                </div>
              </div>
            </div>
            <p className="text-gray-600 text-xs mt-3 line-clamp-2">{book.description}</p>
            <div className="flex flex-wrap gap-1.5 mt-3">
              {book.isFree && <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs">Free</span>}
              <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full text-xs capitalize">{book.source.replace("-", " ")}</span>
              <span className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded-full text-xs capitalize">{book.language}</span>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-gray-400">
          <span className="text-4xl block mb-3">📭</span>
          <p className="text-sm">No books found for this filter</p>
        </div>
      )}
    </div>
  );
};

export default GlobalBookCollection;
