import React, { useState } from "react";
import { books } from "../../data/booksHubData";
import { useBooksHubContext } from "../../context/BooksHubContext";

const AIRecommendations: React.FC = () => {
  const [interests, setInterests] = useState<string[]>([]);
  const [showRecs, setShowRecs] = useState(false);
  const { isRead, isSaved } = useBooksHubContext();

  const topics = [
    { key: "philosophy", label: "Philosophy", icon: "🧠" },
    { key: "poetry", label: "Poetry", icon: "🌸" },
    { key: "history", label: "History", icon: "🏛️" },
    { key: "science", label: "Science", icon: "🔬" },
    { key: "literature", label: "Literature", icon: "📖" },
    { key: "ethics", label: "Ethics", icon: "⚖️" },
    { key: "tamil", label: "Tamil Literature", icon: "🇮🇳" },
    { key: "spiritual", label: "Spiritual Wisdom", icon: "🕉️" },
    { key: "feminism", label: "Feminism", icon: "✊" },
    { key: "nature", label: "Nature & Zen", icon: "🌿" },
    { key: "social", label: "Social Criticism", icon: "📢" },
    { key: "creativity", label: "Creativity", icon: "🎨" },
  ];

  const toggleInterest = (key: string) => {
    setInterests((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
    setShowRecs(false);
  };

  const getRecommendations = () => {
    if (interests.length === 0) return [];
    return books
      .filter((book) => {
        const matchesCategory = interests.includes(book.category);
        const matchesTags = book.tags.some((tag) => interests.some((i) => tag.includes(i)));
        const matchesTamil = interests.includes("tamil") && book.isTamil;
        return matchesCategory || matchesTags || matchesTamil;
      })
      .sort((a, b) => {
        // Prioritize unread and unsaved (truly underrated)
        const aScore = (isRead(a.id) ? 0 : 2) + (isSaved(a.id) ? 0 : 1) + (a.featured ? 0 : 1);
        const bScore = (isRead(b.id) ? 0 : 2) + (isSaved(b.id) ? 0 : 1) + (b.featured ? 0 : 1);
        return bScore - aScore;
      });
  };

  const recommendations = showRecs ? getRecommendations() : [];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-bold text-gray-900">AI Smart Recommendations</h2>
        <p className="text-gray-500 text-sm mt-1">
          Discover books based on your interests — prioritizing underrated works over popular ones
        </p>
      </div>

      {/* How It Works */}
      <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl border border-purple-100 p-5">
        <h3 className="font-semibold text-purple-900 text-sm mb-2">🤖 Smart Recommendation System</h3>
        <p className="text-purple-800 text-xs leading-relaxed">
          Unlike mainstream platforms that push popular titles, our AI recommendation system deliberately 
          prioritizes <strong>underrated and lesser-known books</strong>. The algorithm considers your interests 
          and reading behavior, but always surfaces hidden gems over already popular works.
        </p>
      </div>

      {/* Interest Selection */}
      <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
        <h3 className="font-semibold text-gray-900 mb-3">Select Your Interests</h3>
        <p className="text-gray-500 text-xs mb-4">Choose topics you're interested in to get personalized recommendations</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {topics.map((topic) => (
            <button
              key={topic.key}
              onClick={() => toggleInterest(topic.key)}
              className={`p-3 rounded-xl border text-left transition-all ${
                interests.includes(topic.key)
                  ? "border-purple-300 bg-purple-50 shadow-sm"
                  : "border-gray-100 hover:border-gray-200 hover:shadow-sm"
              }`}
            >
              <span className="text-xl block">{topic.icon}</span>
              <p className="font-medium text-gray-900 text-xs mt-1">{topic.label}</p>
            </button>
          ))}
        </div>

        {interests.length > 0 && (
          <div className="mt-4 flex items-center justify-between">
            <p className="text-xs text-gray-500">{interests.length} topic{interests.length !== 1 ? "s" : ""} selected</p>
            <button
              onClick={() => setShowRecs(true)}
              className="px-5 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 transition-all"
            >
              🤖 Get Recommendations
            </button>
          </div>
        )}
      </div>

      {/* Recommendations */}
      {showRecs && (
        <div className="space-y-4">
          <h3 className="font-semibold text-gray-900">
            📚 Recommended for You ({recommendations.length} books)
          </h3>
          {recommendations.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {recommendations.map((book, i) => (
                <div key={book.id} className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-md transition-all">
                  <div className="flex items-start gap-3">
                    <div className="relative">
                      <span className="text-3xl">{book.coverUrl}</span>
                      <span className="absolute -top-1 -left-1 w-5 h-5 bg-purple-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                        {i + 1}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 text-sm">{book.title}</h4>
                      <p className="text-gray-500 text-xs">{book.authorName}</p>
                      <p className="text-gray-600 text-xs mt-2 line-clamp-2">{book.description}</p>
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        <span className="text-xs text-amber-600">⭐ {book.rating}</span>
                        {book.isFree && <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs">Free</span>}
                        {book.isTamil && <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded-full text-xs">Tamil</span>}
                        {!book.featured && <span className="px-2 py-0.5 bg-purple-100 text-purple-700 rounded-full text-xs">Hidden Gem</span>}
                      </div>
                    </div>
                  </div>
                  {book.aiSummary && (
                    <div className="bg-gray-50 rounded-lg p-3 mt-3">
                      <p className="text-gray-600 text-xs line-clamp-2">{book.aiSummary}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-gray-100 p-8 text-center text-gray-400">
              <span className="text-3xl block mb-2">🔍</span>
              <p className="text-sm">No exact matches found. Try selecting different topics!</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AIRecommendations;
