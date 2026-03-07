import React, { useState } from "react";
import { useBooksHubContext } from "../../context/BooksHubContext";
import { BookCategory, BookLanguage } from "../../types/booksHub";
import toast from "react-hot-toast";

const BookUploadSystem: React.FC = () => {
  const { uploadBook } = useBooksHubContext();
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "literature" as BookCategory,
    language: "english" as BookLanguage,
    authorName: "",
    content: "",
    tags: "",
    isOriginal: true,
  });
  const [submitted, setSubmitted] = useState(false);

  const categories: { key: BookCategory; label: string }[] = [
    { key: "philosophy", label: "Philosophy" },
    { key: "science", label: "Science & Knowledge" },
    { key: "history", label: "History" },
    { key: "culture", label: "Culture & Society" },
    { key: "self-development", label: "Self Development" },
    { key: "literature", label: "Literature" },
    { key: "short-stories", label: "Short Stories" },
    { key: "poetry", label: "Poetry" },
    { key: "educational", label: "Educational" },
    { key: "research", label: "Research" },
  ];

  const languages: { key: BookLanguage; label: string }[] = [
    { key: "english", label: "English" },
    { key: "tamil", label: "Tamil" },
    { key: "arabic", label: "Arabic" },
    { key: "french", label: "French" },
    { key: "german", label: "German" },
    { key: "japanese", label: "Japanese" },
    { key: "chinese", label: "Chinese" },
    { key: "spanish", label: "Spanish" },
    { key: "russian", label: "Russian" },
    { key: "sanskrit", label: "Sanskrit" },
    { key: "other", label: "Other" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.description || !form.authorName || !form.content) {
      toast.error("Please fill in all required fields");
      return;
    }
    const bookId = "upload-" + Date.now();
    uploadBook(bookId);
    setSubmitted(true);
    toast.success("Book submitted for review!");
  };

  if (submitted) {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-xl border border-gray-100 p-12 text-center shadow-sm">
          <span className="text-5xl block mb-4">✅</span>
          <h2 className="text-xl font-bold text-gray-900">Book Submitted Successfully!</h2>
          <p className="text-gray-500 text-sm mt-2 max-w-md mx-auto">
            Your book has been submitted for review. Our team will verify that it meets our content guidelines 
            (original or lesser-known works only, no popular commercial books).
          </p>
          <button
            onClick={() => { setSubmitted(false); setForm({ title: "", description: "", category: "literature", language: "english", authorName: "", content: "", tags: "", isOriginal: true }); }}
            className="mt-6 px-5 py-2 bg-amber-500 text-white rounded-lg text-sm font-medium hover:bg-amber-600 transition-all"
          >
            Submit Another Book
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-bold text-gray-900">Upload a Book</h2>
        <p className="text-gray-500 text-sm mt-1">Share original or lesser-known books with the global community</p>
      </div>

      {/* Guidelines */}
      <div className="bg-amber-50 border border-amber-100 rounded-xl p-5">
        <h3 className="font-semibold text-amber-800 text-sm mb-2">📋 Upload Guidelines</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-amber-900">
          <div className="flex items-start gap-2">
            <span className="text-green-600 mt-0.5">✓</span>
            <span>Original works you have written</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-green-600 mt-0.5">✓</span>
            <span>Lesser-known books not widely available</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-green-600 mt-0.5">✓</span>
            <span>Public domain works and free literature</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-green-600 mt-0.5">✓</span>
            <span>Research, educational, and knowledge works</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-red-600 mt-0.5">✗</span>
            <span>No popular commercial books</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-red-600 mt-0.5">✗</span>
            <span>No 18+ or sexually explicit content</span>
          </div>
        </div>
      </div>

      {/* Upload Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1.5">Book Title *</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-amber-300"
              placeholder="Enter book title"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1.5">Author Name *</label>
            <input
              type="text"
              value={form.authorName}
              onChange={(e) => setForm({ ...form, authorName: e.target.value })}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-amber-300"
              placeholder="Author's full name"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1.5">Description *</label>
          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            rows={3}
            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-amber-300 resize-none"
            placeholder="Brief description of the book..."
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1.5">Category</label>
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value as BookCategory })}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-amber-300"
            >
              {categories.map((c) => (
                <option key={c.key} value={c.key}>{c.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1.5">Language</label>
            <select
              value={form.language}
              onChange={(e) => setForm({ ...form, language: e.target.value as BookLanguage })}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-amber-300"
            >
              {languages.map((l) => (
                <option key={l.key} value={l.key}>{l.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1.5">Book Content / Text *</label>
          <textarea
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
            rows={8}
            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-amber-300 resize-none"
            placeholder="Paste or type the book content here..."
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1.5">Tags</label>
          <input
            type="text"
            value={form.tags}
            onChange={(e) => setForm({ ...form, tags: e.target.value })}
            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-amber-300"
            placeholder="Comma separated tags (e.g., philosophy, ethics, tamil)"
          />
        </div>

        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={form.isOriginal}
            onChange={(e) => setForm({ ...form, isOriginal: e.target.checked })}
            className="w-4 h-4 rounded border-gray-300 text-amber-500 focus:ring-amber-400"
          />
          <label className="text-xs text-gray-700">
            I confirm this is an original work or a lesser-known book that I have the right to share
          </label>
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-amber-500 text-white rounded-xl font-semibold hover:bg-amber-600 transition-all text-sm"
        >
          📤 Submit Book for Review
        </button>
      </form>
    </div>
  );
};

export default BookUploadSystem;
