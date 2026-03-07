import React, { useState } from "react";
import { authors } from "../../data/booksHubData";
import { books } from "../../data/booksHubData";
import { useBooksHubContext } from "../../context/BooksHubContext";

const AuthorProfiles: React.FC = () => {
  const [selectedAuthor, setSelectedAuthor] = useState<string | null>(null);
  const { followAuthor, unfollowAuthor, isAuthorFollowed } = useBooksHubContext();

  const selected = selectedAuthor ? authors.find((a) => a.id === selectedAuthor) : null;
  const authorBooks = selected ? books.filter((b) => b.authorId === selected.id) : [];

  if (selected) {
    return (
      <div className="space-y-6">
        <button onClick={() => setSelectedAuthor(null)} className="text-amber-600 hover:text-amber-700 text-sm font-medium flex items-center gap-1">
          ← Back to Authors
        </button>
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
          <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-8 text-white">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-white/10 rounded-xl flex items-center justify-center text-3xl">
                {selected.avatar.startsWith("http") ? "👤" : "👤"}
              </div>
              <div className="flex-1">
                <h1 className="text-2xl font-bold">{selected.name}</h1>
                <p className="text-gray-300 text-sm mt-1">{selected.nationality} · {selected.era}</p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {selected.specialization.map((s) => (
                    <span key={s} className="px-2 py-1 bg-white/15 rounded-full text-xs">{s}</span>
                  ))}
                </div>
              </div>
              <button
                onClick={() => isAuthorFollowed(selected.id) ? unfollowAuthor(selected.id) : followAuthor(selected.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  isAuthorFollowed(selected.id)
                    ? "bg-amber-500 text-white"
                    : "bg-white/15 text-white hover:bg-white/25 border border-white/20"
                }`}
              >
                {isAuthorFollowed(selected.id) ? "✓ Following" : "Follow"}
              </button>
            </div>
          </div>
          <div className="p-6 space-y-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Biography</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{selected.bio}</p>
            </div>
            <div className="bg-amber-50 border border-amber-100 rounded-xl p-4">
              <h3 className="font-semibold text-amber-800 text-sm mb-2">🏛️ Cultural Impact</h3>
              <p className="text-amber-900 text-sm leading-relaxed">{selected.culturalImpact}</p>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <p className="text-xl font-bold text-gray-900">{selected.booksCount}</p>
                <p className="text-gray-500 text-xs">Books</p>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <p className="text-xl font-bold text-gray-900">{(selected.followersCount / 1000).toFixed(1)}k</p>
                <p className="text-gray-500 text-xs">Followers</p>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <p className="text-xl font-bold text-gray-900">{selected.languages.length}</p>
                <p className="text-gray-500 text-xs">Languages</p>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Notable Works</h3>
              <div className="flex flex-wrap gap-2">
                {selected.notableWorks.map((work) => (
                  <span key={work} className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-xs font-medium">{work}</span>
                ))}
              </div>
            </div>
            {authorBooks.length > 0 && (
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Books in Our Collection</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {authorBooks.map((book) => (
                    <div key={book.id} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{book.coverUrl}</span>
                        <div>
                          <h4 className="font-medium text-gray-900 text-sm">{book.title}</h4>
                          <p className="text-gray-500 text-xs">⭐ {book.rating} · {book.pages}p</p>
                        </div>
                      </div>
                      <p className="text-gray-600 text-xs mt-2 line-clamp-2">{book.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Languages</h3>
              <div className="flex flex-wrap gap-2">
                {selected.languages.map((lang) => (
                  <span key={lang} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs capitalize">{lang}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-bold text-gray-900">Author Profiles</h2>
        <p className="text-gray-500 text-sm mt-1">Discover the minds behind hidden literary treasures</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {authors.map((author) => (
          <div
            key={author.id}
            onClick={() => setSelectedAuthor(author.id)}
            className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-lg transition-all cursor-pointer group"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-gradient-to-br from-gray-700 to-gray-900 rounded-xl flex items-center justify-center text-white text-lg font-bold">
                {author.name.charAt(0)}
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 group-hover:text-amber-600 transition-colors text-sm">{author.name}</h3>
                <p className="text-gray-500 text-xs">{author.nationality}</p>
              </div>
            </div>
            <p className="text-gray-600 text-xs line-clamp-2">{author.bio}</p>
            <div className="flex flex-wrap gap-1.5 mt-3">
              {author.specialization.slice(0, 3).map((spec) => (
                <span key={spec} className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full text-xs">{spec}</span>
              ))}
            </div>
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-50">
              <span className="text-xs text-gray-400">{author.era}</span>
              <span className="text-xs text-amber-600 font-medium">{author.booksCount} books →</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AuthorProfiles;
