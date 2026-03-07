import React, { useState } from "react";
import { books } from "../../data/booksHubData";

const AIReadingAssistant: React.FC = () => {
  const [selectedBook, setSelectedBook] = useState<string | null>(null);
  const [chatMessages, setChatMessages] = useState<{ role: "user" | "ai"; text: string }[]>([]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);

  const selected = selectedBook ? books.find((b) => b.id === selectedBook) : null;

  const quickPrompts = [
    "Summarize this book",
    "Explain the main idea",
    "What can I learn from this book?",
    "Explain the key concepts",
    "Give chapter wise summary",
    "Who should read this book?",
    "What is the historical context?",
    "Compare with similar books",
  ];

  const generateResponse = (query: string): string => {
    if (!selected) return "Please select a book first.";
    const q = query.toLowerCase();

    if (q.includes("summarize") || q.includes("summary")) {
      return selected.aiSummary || `"${selected.title}" by ${selected.authorName} is ${selected.description}. Published in ${selected.publishedYear < 0 ? Math.abs(selected.publishedYear) + " BCE" : selected.publishedYear}, this ${selected.pages}-page work explores themes of ${selected.tags.slice(0, 3).join(", ")}.`;
    }
    if (q.includes("main idea") || q.includes("key concept")) {
      if (selected.keyIdeas && selected.keyIdeas.length > 0) {
        return `The main ideas in "${selected.title}":\n\n${selected.keyIdeas.map((idea, i) => `${i + 1}. ${idea}`).join("\n")}`;
      }
      return `"${selected.title}" explores themes of ${selected.tags.join(", ")}. It's categorized under ${selected.category} and has been rated ${selected.rating}/5 by ${selected.ratingsCount} readers.`;
    }
    if (q.includes("learn") || q.includes("benefit")) {
      return `From "${selected.title}" you can learn about: ${selected.tags.map((t) => t.replace("-", " ")).join(", ")}. ${selected.keyIdeas ? `Key takeaways include: ${selected.keyIdeas[0]}` : "This book offers deep insights into " + selected.category + "."}\n\nThis is a ${selected.source.replace("-", " ")} work, making it accessible to all readers.`;
    }
    if (q.includes("chapter")) {
      if (selected.chapterSummaries && selected.chapterSummaries.length > 0) {
        return `Chapter-wise summary of "${selected.title}":\n\n${selected.chapterSummaries.map((ch) => `📖 ${ch.chapter}: ${ch.summary}`).join("\n\n")}`;
      }
      return `Detailed chapter summaries for "${selected.title}" are being compiled. The book covers: ${selected.description}`;
    }
    if (q.includes("who should") || q.includes("audience")) {
      return `"${selected.title}" is recommended for readers interested in ${selected.category}, especially those who appreciate ${selected.tags.slice(0, 3).join(", ")}. The book is written in ${selected.language}${selected.translations ? ` and available in ${selected.translations.filter((t) => t.available).map((t) => t.language).join(", ")}` : ""}.`;
    }
    if (q.includes("historical") || q.includes("context")) {
      return `"${selected.title}" was written by ${selected.authorName} in ${selected.publishedYear < 0 ? Math.abs(selected.publishedYear) + " BCE" : selected.publishedYear}. ${selected.description} It belongs to the ${selected.source.replace("-", " ")} collection and is classified under ${selected.category}.`;
    }
    return `Regarding "${selected.title}" by ${selected.authorName}: ${selected.aiSummary || selected.description}\n\nFeel free to ask more specific questions about this book!`;
  };

  const handleSend = (text?: string) => {
    const msg = text || input.trim();
    if (!msg || !selected) return;

    setChatMessages((prev) => [...prev, { role: "user", text: msg }]);
    setInput("");
    setThinking(true);

    setTimeout(() => {
      const response = generateResponse(msg);
      setChatMessages((prev) => [...prev, { role: "ai", text: response }]);
      setThinking(false);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-bold text-gray-900">AI Reading Assistant</h2>
        <p className="text-gray-500 text-sm mt-1">
          Interact with AI about any book — ask questions, get explanations, explore ideas
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Book Selection */}
        <div className="space-y-3">
          <h3 className="font-semibold text-gray-900 text-sm">Select a Book</h3>
          <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
            {books.map((book) => (
              <button
                key={book.id}
                onClick={() => { setSelectedBook(book.id); setChatMessages([]); }}
                className={`w-full text-left p-3 rounded-lg border transition-all ${
                  selectedBook === book.id
                    ? "border-amber-300 bg-amber-50"
                    : "border-gray-100 bg-white hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg">{book.coverUrl}</span>
                  <div className="min-w-0">
                    <p className="font-medium text-gray-900 text-xs truncate">{book.title}</p>
                    <p className="text-gray-500 text-xs truncate">{book.authorName}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Chat Interface */}
        <div className="lg:col-span-2">
          {selected ? (
            <div className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm">
              {/* Book Header */}
              <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-4 text-white">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{selected.coverUrl}</span>
                  <div>
                    <h4 className="font-semibold text-sm">{selected.title}</h4>
                    <p className="text-amber-100 text-xs">{selected.authorName} · {selected.language}</p>
                  </div>
                </div>
              </div>

              {/* Quick Prompts */}
              <div className="px-4 py-3 border-b border-gray-100">
                <p className="text-xs text-gray-500 mb-2">Quick questions:</p>
                <div className="flex flex-wrap gap-1.5">
                  {quickPrompts.map((prompt) => (
                    <button
                      key={prompt}
                      onClick={() => handleSend(prompt)}
                      className="px-2.5 py-1 bg-gray-100 text-gray-600 rounded-full text-xs hover:bg-amber-100 hover:text-amber-700 transition-all"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Chat Area */}
              <div className="h-80 overflow-y-auto p-4 space-y-3">
                {chatMessages.length === 0 && (
                  <div className="text-center py-12 text-gray-400">
                    <span className="text-3xl block mb-2">💬</span>
                    <p className="text-sm">Ask anything about "{selected.title}"</p>
                    <p className="text-xs mt-1">Use the quick prompts above or type your own question</p>
                  </div>
                )}
                {chatMessages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[80%] rounded-xl px-4 py-3 text-sm ${
                      msg.role === "user"
                        ? "bg-amber-500 text-white"
                        : "bg-gray-100 text-gray-800"
                    }`}>
                      {msg.role === "ai" && <span className="text-xs font-medium text-amber-600 block mb-1">🤖 AI Assistant</span>}
                      <p className="whitespace-pre-line text-sm leading-relaxed">{msg.text}</p>
                    </div>
                  </div>
                ))}
                {thinking && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 rounded-xl px-4 py-3 text-sm text-gray-500">
                      <span className="flex items-center gap-2">
                        <span className="w-3 h-3 border-2 border-gray-300 border-t-amber-500 rounded-full animate-spin" />
                        Thinking...
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Input */}
              <div className="p-3 border-t border-gray-100">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                    placeholder="Ask about this book..."
                    className="flex-1 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-amber-300"
                  />
                  <button
                    onClick={() => handleSend()}
                    disabled={!input.trim() || thinking}
                    className="px-4 py-2.5 bg-amber-500 text-white rounded-lg text-sm font-medium hover:bg-amber-600 transition-all disabled:opacity-50"
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-gray-100 p-12 text-center text-gray-400 shadow-sm">
              <span className="text-4xl block mb-3">📚</span>
              <p className="text-sm">Select a book from the left to start chatting with AI</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIReadingAssistant;
