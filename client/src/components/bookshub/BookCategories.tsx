import React, { useState } from "react";
import { books } from "../../data/booksHubData";
import { BookCategory } from "../../types/booksHub";

const BookCategories: React.FC = () => {
  const [selectedCat, setSelectedCat] = useState<string | null>(null);

  const categoryData: { key: BookCategory; label: string; icon: string; desc: string; color: string }[] = [
    { key: "philosophy", label: "Philosophy", icon: "🧠", desc: "Ancient and modern philosophical traditions from around the world", color: "from-purple-500 to-indigo-600" },
    { key: "science", label: "Science & Knowledge", icon: "🔬", desc: "Hidden scientific writings, forgotten discoveries, independent research", color: "from-blue-500 to-cyan-600" },
    { key: "history", label: "History", icon: "🏛️", desc: "Historical writings, civilizational records, and forgotten chronicles", color: "from-amber-500 to-orange-600" },
    { key: "culture", label: "Culture & Society", icon: "🌍", desc: "Cultural traditions, social commentary, and anthropological writings", color: "from-green-500 to-emerald-600" },
    { key: "self-development", label: "Self Development", icon: "🌱", desc: "Personal growth, wisdom literature, practical life philosophy", color: "from-teal-500 to-green-600" },
    { key: "literature", label: "Literature", icon: "📖", desc: "Hidden literary masterpieces, novellas, and creative prose", color: "from-rose-500 to-pink-600" },
    { key: "short-stories", label: "Short Stories", icon: "📝", desc: "Collections of short fiction from independent and forgotten authors", color: "from-violet-500 to-purple-600" },
    { key: "poetry", label: "Poetry", icon: "🌸", desc: "Rare poetry from diverse traditions — Tamil, Sufi, Japanese, and more", color: "from-pink-500 to-rose-600" },
    { key: "educational", label: "Educational Books", icon: "🎓", desc: "Learning resources, moral education, and knowledge compendiums", color: "from-indigo-500 to-blue-600" },
    { key: "research", label: "Research Books", icon: "🔍", desc: "Academic research, independent papers, specialized studies", color: "from-gray-500 to-slate-600" },
  ];

  const catBooks = selectedCat ? books.filter((b) => b.category === selectedCat) : [];
  const catInfo = selectedCat ? categoryData.find((c) => c.key === selectedCat) : null;

  if (selectedCat && catInfo) {
    return (
      <div className="space-y-6">
        <button onClick={() => setSelectedCat(null)} className="text-amber-600 hover:text-amber-700 text-sm font-medium flex items-center gap-1">
          ← Back to Categories
        </button>
        <div className={`bg-gradient-to-r ${catInfo.color} rounded-xl p-6 text-white`}>
          <div className="flex items-center gap-3">
            <span className="text-3xl">{catInfo.icon}</span>
            <div>
              <h2 className="text-xl font-bold">{catInfo.label}</h2>
              <p className="text-white/80 text-sm">{catInfo.desc}</p>
            </div>
          </div>
        </div>
        {catBooks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {catBooks.map((book) => (
              <div key={book.id} className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-md transition-all">
                <div className="flex items-start gap-3">
                  <span className="text-3xl">{book.coverUrl}</span>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm">{book.title}</h3>
                    <p className="text-gray-500 text-xs">by {book.authorName}</p>
                    <p className="text-gray-600 text-xs mt-2 line-clamp-2">{book.description}</p>
                    <div className="flex gap-2 mt-2">
                      <span className="text-xs text-amber-600">⭐ {book.rating}</span>
                      {book.isFree && <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs">Free</span>}
                      {book.isTamil && <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded-full text-xs">Tamil</span>}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-400">
            <span className="text-3xl block mb-2">📭</span>
            <p className="text-sm">No books in this category yet. New books are added regularly!</p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-bold text-gray-900">Book Categories</h2>
        <p className="text-gray-500 text-sm mt-1">Explore books organized by knowledge areas</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categoryData.map((cat) => {
          const count = books.filter((b) => b.category === cat.key).length;
          return (
            <div
              key={cat.key}
              onClick={() => setSelectedCat(cat.key)}
              className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-lg transition-all cursor-pointer group"
            >
              <div className={`w-12 h-12 bg-gradient-to-br ${cat.color} rounded-xl flex items-center justify-center mb-3`}>
                <span className="text-xl">{cat.icon}</span>
              </div>
              <h3 className="font-semibold text-gray-900 group-hover:text-amber-600 transition-colors">{cat.label}</h3>
              <p className="text-gray-500 text-xs mt-1 line-clamp-2">{cat.desc}</p>
              <p className="text-amber-600 text-xs font-medium mt-3">{count} book{count !== 1 ? "s" : ""} →</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BookCategories;
