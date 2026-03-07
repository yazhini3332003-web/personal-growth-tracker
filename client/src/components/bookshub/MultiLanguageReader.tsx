import React, { useState } from "react";
import { books } from "../../data/booksHubData";

const MultiLanguageReader: React.FC = () => {
  const [selectedBook, setSelectedBook] = useState<string | null>(null);
  const [readingLang, setReadingLang] = useState<string>("original");

  const selected = selectedBook ? books.find((b) => b.id === selectedBook) : null;

  const languageInfo: Record<string, { name: string; icon: string }> = {
    english: { name: "English", icon: "🇬🇧" },
    tamil: { name: "Tamil", icon: "🇮🇳" },
    arabic: { name: "Arabic", icon: "🇸🇦" },
    german: { name: "German", icon: "🇩🇪" },
    french: { name: "French", icon: "🇫🇷" },
    japanese: { name: "Japanese", icon: "🇯🇵" },
    chinese: { name: "Chinese", icon: "🇨🇳" },
    spanish: { name: "Spanish", icon: "🇪🇸" },
    russian: { name: "Russian", icon: "🇷🇺" },
    sanskrit: { name: "Sanskrit", icon: "🕉️" },
    latin: { name: "Latin", icon: "🏛️" },
  };

  const allLanguages = Array.from(new Set(books.map((b) => b.language)));

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-bold text-gray-900">Multi-Language Reading</h2>
        <p className="text-gray-500 text-sm mt-1">
          Read books in their original language, English, or AI-translated versions
        </p>
      </div>

      {/* Language Overview */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100 p-6">
        <h3 className="font-semibold text-blue-900 mb-3">🌐 Available Languages</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
          {allLanguages.map((lang) => {
            const info = languageInfo[lang] || { name: lang, icon: "📖" };
            const count = books.filter((b) => b.language === lang).length;
            return (
              <div key={lang} className="bg-white rounded-lg p-3 text-center border border-blue-50 hover:shadow-sm transition-all">
                <span className="text-2xl block">{info.icon}</span>
                <p className="font-medium text-gray-900 text-xs mt-1 capitalize">{info.name}</p>
                <p className="text-gray-400 text-xs">{count} book{count !== 1 ? "s" : ""}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Translation Feature */}
      <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
        <h3 className="font-semibold text-gray-900 mb-2">📖 How Multi-Language Reading Works</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
          <div className="bg-gray-50 rounded-lg p-4 text-center">
            <span className="text-2xl block mb-2">📚</span>
            <h4 className="font-medium text-gray-900 text-sm">Original Language</h4>
            <p className="text-gray-500 text-xs mt-1">Read the book as the author intended, in its original language</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 text-center">
            <span className="text-2xl block mb-2">🇬🇧</span>
            <h4 className="font-medium text-gray-900 text-sm">English Translation</h4>
            <p className="text-gray-500 text-xs mt-1">AI-assisted translation to read any book in English</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 text-center">
            <span className="text-2xl block mb-2">🤖</span>
            <h4 className="font-medium text-gray-900 text-sm">AI Understanding</h4>
            <p className="text-gray-500 text-xs mt-1">Get summaries and explanations in your preferred language</p>
          </div>
        </div>
      </div>

      {/* Book Selection with Translation */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-3">Select a Book to Read</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {books.map((book) => {
            const info = languageInfo[book.language] || { name: book.language, icon: "📖" };
            return (
              <div
                key={book.id}
                onClick={() => { setSelectedBook(book.id); setReadingLang("original"); }}
                className={`bg-white rounded-xl border p-4 transition-all cursor-pointer ${
                  selectedBook === book.id ? "border-amber-300 shadow-md" : "border-gray-100 hover:shadow-md"
                }`}
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{book.coverUrl}</span>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-gray-900 text-sm truncate">{book.title}</h4>
                    <p className="text-gray-500 text-xs">{book.authorName}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs">{info.icon}</span>
                      <span className="text-xs text-gray-600 capitalize">{info.name}</span>
                    </div>
                    {book.translations && book.translations.length > 0 && (
                      <div className="flex gap-1 mt-2">
                        {book.translations.filter((t) => t.available).map((t) => (
                          <span key={t.language} className="text-xs" title={t.language}>
                            {languageInfo[t.language]?.icon || "📖"}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Reading View */}
      {selected && (
        <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <span className="text-3xl">{selected.coverUrl}</span>
              <div>
                <h3 className="font-semibold text-gray-900">{selected.title}</h3>
                <p className="text-gray-500 text-xs">Original: {languageInfo[selected.language]?.name || selected.language}</p>
              </div>
            </div>
          </div>

          {/* Language Selector */}
          <div className="flex flex-wrap gap-2 mb-4">
            <button
              onClick={() => setReadingLang("original")}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                readingLang === "original" ? "bg-amber-100 text-amber-700" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {languageInfo[selected.language]?.icon} Original ({languageInfo[selected.language]?.name})
            </button>
            <button
              onClick={() => setReadingLang("english")}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                readingLang === "english" ? "bg-amber-100 text-amber-700" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              🇬🇧 English Translation
            </button>
            {selected.translations && selected.translations.filter((t) => t.available && t.language !== "english").map((t) => (
              <button
                key={t.language}
                onClick={() => setReadingLang(t.language)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  readingLang === t.language ? "bg-amber-100 text-amber-700" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {languageInfo[t.language]?.icon} {languageInfo[t.language]?.name}
              </button>
            ))}
          </div>

          {/* Reading Content */}
          <div className="bg-gray-50 rounded-xl p-6 min-h-[200px]">
            {readingLang === "original" ? (
              <div>
                <p className="text-sm text-gray-700 italic leading-relaxed">{selected.previewText}</p>
                <p className="text-xs text-gray-400 mt-4">— Preview text in original language</p>
              </div>
            ) : (
              <div>
                <p className="text-sm text-gray-700 leading-relaxed">{selected.aiSummary || selected.description}</p>
                <p className="text-xs text-gray-400 mt-4">— AI-translated summary in {readingLang === "english" ? "English" : languageInfo[readingLang]?.name || readingLang}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MultiLanguageReader;
