import React, { useState } from "react";
import { tamilBooks } from "../../data/booksHubData";
import { useBooksHubContext } from "../../context/BooksHubContext";

const TamilBookSection: React.FC = () => {
  const [selectedBook, setSelectedBook] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>("all");
  const { likeBook, unlikeBook, isLiked, saveBook, unsaveBook, isSaved } = useBooksHubContext();

  const filters = [
    { key: "all", label: "All Tamil Books", icon: "📚" },
    { key: "literature", label: "Literature", icon: "📖" },
    { key: "poetry", label: "Poetry", icon: "🌸" },
    { key: "philosophy", label: "Philosophy", icon: "🧠" },
    { key: "history", label: "History", icon: "🏛️" },
    { key: "rare", label: "Rare Books", icon: "💎" },
  ];

  const filtered = tamilBooks.filter((b) => filter === "all" || b.category === filter);
  const selected = selectedBook ? tamilBooks.find((b) => b.id === selectedBook) : null;

  if (selected) {
    return (
      <div className="space-y-6">
        <button onClick={() => setSelectedBook(null)} className="text-amber-600 hover:text-amber-700 text-sm font-medium flex items-center gap-1">
          ← Back to Tamil Books
        </button>
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
          <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-green-700 p-8 text-white">
            <div className="flex items-start gap-4">
              <span className="text-5xl">{selected.coverUrl}</span>
              <div>
                <p className="text-emerald-200 text-sm font-medium">{selected.tamilTitle}</p>
                <h1 className="text-2xl font-bold mt-1">{selected.title}</h1>
                <p className="text-emerald-100 mt-1">by {selected.authorName} · {selected.era}</p>
                <div className="flex flex-wrap gap-2 mt-3">
                  <span className="px-2 py-1 bg-white/20 rounded-full text-xs capitalize">{selected.category}</span>
                  <span className="px-2 py-1 bg-white/20 rounded-full text-xs">{selected.pages} pages</span>
                  {selected.featured && <span className="px-2 py-1 bg-yellow-400/30 rounded-full text-xs">Featured</span>}
                </div>
              </div>
            </div>
          </div>
          <div className="p-6 space-y-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">About</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{selected.description}</p>
            </div>
            <div className="bg-amber-50 border border-amber-100 rounded-xl p-4">
              <h3 className="font-semibold text-amber-800 text-sm mb-2">📜 Significance</h3>
              <p className="text-amber-900 text-sm leading-relaxed">{selected.significance}</p>
            </div>
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
              <h3 className="font-semibold text-blue-800 text-sm mb-2">🌍 English Summary</h3>
              <p className="text-blue-900 text-sm leading-relaxed">{selected.englishSummary}</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">🏛️ Cultural Importance</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{selected.culturalImportance}</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Key Themes</h3>
              <div className="flex flex-wrap gap-2">
                {selected.keyThemes.map((theme) => (
                  <span key={theme} className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-medium">{theme}</span>
                ))}
              </div>
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
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Tamil Section Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-xl p-6 text-white">
        <div className="flex items-center gap-3">
          <span className="text-3xl">🏛️</span>
          <div>
            <h2 className="text-xl font-bold">Tamil Book Collection</h2>
            <p className="text-emerald-100 text-sm mt-1">
              A dedicated collection of Tamil literature, poetry, philosophy, and rare writings
            </p>
          </div>
        </div>
        <p className="text-emerald-50 text-sm mt-4 leading-relaxed">
          Tamil has one of the longest literary traditions in the world, spanning over 2,000 years. 
          This special section highlights Tamil books that preserve invaluable knowledge, ethics, 
          and cultural heritage — from the ancient Sangam era to modern revolutionary poetry.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`px-3 py-2 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
              filter === f.key ? "bg-emerald-100 text-emerald-700 shadow-sm" : "bg-white text-gray-500 hover:text-gray-700 border border-gray-200"
            }`}
          >
            <span>{f.icon}</span> {f.label}
          </button>
        ))}
      </div>

      {/* Featured Tamil Books */}
      {filter === "all" && (
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">⭐ Featured Tamil Works</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tamilBooks.filter((b) => b.featured).map((book) => (
              <div
                key={book.id}
                onClick={() => setSelectedBook(book.id)}
                className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl border border-emerald-100 p-5 hover:shadow-lg transition-all cursor-pointer group"
              >
                <div className="flex items-start gap-3">
                  <span className="text-3xl">{book.coverUrl}</span>
                  <div className="flex-1">
                    <p className="text-emerald-600 text-xs font-medium">{book.tamilTitle}</p>
                    <h3 className="font-semibold text-gray-900 group-hover:text-emerald-600 transition-colors">{book.title}</h3>
                    <p className="text-gray-500 text-xs mt-0.5">{book.authorName} · {book.era}</p>
                    <p className="text-gray-600 text-xs mt-2 line-clamp-2">{book.significance}</p>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {book.keyThemes.slice(0, 3).map((theme) => (
                        <span key={theme} className="px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded-full text-xs">{theme}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* All Tamil Books */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-3">
          {filter === "all" ? "All Tamil Books" : `Tamil ${filter.charAt(0).toUpperCase() + filter.slice(1)}`}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((book) => (
            <div
              key={book.id}
              onClick={() => setSelectedBook(book.id)}
              className="bg-white rounded-xl border border-gray-100 p-4 hover:shadow-md transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">{book.coverUrl}</span>
                <div>
                  <p className="text-emerald-600 text-xs">{book.tamilTitle}</p>
                  <h4 className="font-semibold text-gray-900 text-sm group-hover:text-emerald-600 transition-colors">{book.title}</h4>
                </div>
              </div>
              <p className="text-gray-500 text-xs">{book.authorName} · {book.era}</p>
              <p className="text-gray-600 text-xs mt-2 line-clamp-2">{book.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TamilBookSection;
