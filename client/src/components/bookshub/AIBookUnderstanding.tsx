import React, { useState } from "react";
import { books } from "../../data/booksHubData";
import { useBooksHubContext } from "../../context/BooksHubContext";

const AIBookUnderstanding: React.FC = () => {
  const [selectedBook, setSelectedBook] = useState<string | null>(null);
  const [generating, setGenerating] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const { completeSummary } = useBooksHubContext();

  const booksWithSummaries = books.filter((b) => b.aiSummary);
  const selected = selectedBook ? books.find((b) => b.id === selectedBook) : null;

  const handleGenerate = () => {
    if (!selected) return;
    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);
      setShowSummary(true);
      completeSummary(selected.id);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-bold text-gray-900">AI Book Understanding</h2>
        <p className="text-gray-500 text-sm mt-1">
          AI generates clear summaries, explanations, and key ideas for books in any language
        </p>
      </div>

      {/* How It Works */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100 p-6">
        <h3 className="font-semibold text-blue-900 mb-3">🤖 How AI Understanding Works</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { step: "1", title: "Select a Book", desc: "Choose any book from the collection, in any language" },
            { step: "2", title: "AI Analyzes", desc: "AI reads and processes the entire text, understanding context and meaning" },
            { step: "3", title: "Get Insights", desc: "Receive a clear summary, key ideas, and main lessons — all in English" },
          ].map((s) => (
            <div key={s.step} className="text-center">
              <div className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center mx-auto font-bold text-lg">{s.step}</div>
              <h4 className="font-medium text-blue-900 mt-2 text-sm">{s.title}</h4>
              <p className="text-blue-700 text-xs mt-1">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Book Selection */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-3">Select a Book to Understand</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {booksWithSummaries.map((book) => (
            <button
              key={book.id}
              onClick={() => { setSelectedBook(book.id); setShowSummary(false); }}
              className={`text-left p-4 rounded-xl border transition-all ${
                selectedBook === book.id
                  ? "border-blue-300 bg-blue-50 shadow-sm"
                  : "border-gray-100 bg-white hover:shadow-md"
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="text-2xl">{book.coverUrl}</span>
                <div>
                  <h4 className="font-medium text-gray-900 text-sm">{book.title}</h4>
                  <p className="text-gray-500 text-xs">{book.authorName} · {book.language}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* AI Summary Display */}
      {selected && (
        <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <span className="text-3xl">{selected.coverUrl}</span>
              <div>
                <h3 className="font-semibold text-gray-900">{selected.title}</h3>
                <p className="text-gray-500 text-xs">Language: {selected.language} · {selected.pages} pages</p>
              </div>
            </div>
            {!showSummary && (
              <button
                onClick={handleGenerate}
                disabled={generating}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-all disabled:opacity-50"
              >
                {generating ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Analyzing...
                  </span>
                ) : (
                  "🤖 Generate AI Summary"
                )}
              </button>
            )}
          </div>

          {showSummary && (
            <div className="space-y-4 animate-fadeIn">
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
                <h4 className="font-semibold text-blue-800 text-sm mb-2">📝 AI Summary</h4>
                <p className="text-blue-900 text-sm leading-relaxed">{selected.aiSummary}</p>
              </div>

              {selected.keyIdeas && (
                <div className="bg-amber-50 border border-amber-100 rounded-xl p-4">
                  <h4 className="font-semibold text-amber-800 text-sm mb-2">💡 Key Ideas</h4>
                  <div className="space-y-2">
                    {selected.keyIdeas.map((idea, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <span className="text-amber-500 font-bold text-sm">{i + 1}.</span>
                        <span className="text-amber-900 text-sm">{idea}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {selected.chapterSummaries && (
                <div className="bg-green-50 border border-green-100 rounded-xl p-4">
                  <h4 className="font-semibold text-green-800 text-sm mb-2">📑 Chapter-wise Summary</h4>
                  <div className="space-y-2">
                    {selected.chapterSummaries.map((ch, i) => (
                      <div key={i} className="bg-white/60 rounded-lg p-3">
                        <p className="font-medium text-green-900 text-sm">{ch.chapter}</p>
                        <p className="text-green-800 text-xs mt-1">{ch.summary}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="bg-gray-50 rounded-lg p-3 text-xs text-gray-500 flex items-center gap-2">
                <span>🤖</span>
                <span>AI-generated summary. For complete understanding, we recommend reading the original text.</span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AIBookUnderstanding;
