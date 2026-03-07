import React, { useState } from "react";
import { knowledgeTopics } from "../../data/booksHubData";
import { books } from "../../data/booksHubData";
import { useBooksHubContext } from "../../context/BooksHubContext";

const KnowledgeExplorer: React.FC = () => {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const { exploreTopic } = useBooksHubContext();

  const selected = selectedTopic ? knowledgeTopics.find((t) => t.id === selectedTopic) : null;

  const handleExplore = (topicId: string) => {
    setSelectedTopic(topicId);
    exploreTopic(topicId);
  };

  const getRelatedBooks = (topic: string) => {
    const topicLower = topic.toLowerCase();
    return books.filter((book) => {
      const titleMatch = book.title.toLowerCase().includes(topicLower);
      const tagMatch = book.tags.some((t) => t.toLowerCase().includes(topicLower));
      const catMatch = book.category.toLowerCase().includes(topicLower);
      const descMatch = book.description.toLowerCase().includes(topicLower);
      return titleMatch || tagMatch || catMatch || descMatch;
    });
  };

  if (selected) {
    const relatedBooks = selected.subtopics.reduce<typeof books>((acc, sub) => {
      const found = getRelatedBooks(sub);
      found.forEach((b) => {
        if (!acc.some((existing) => existing.id === b.id)) {
          acc.push(b);
        }
      });
      return acc;
    }, []);

    // Also get books by main topic name
    const mainBooks = getRelatedBooks(selected.name);
    mainBooks.forEach((b) => {
      if (!relatedBooks.some((existing) => existing.id === b.id)) {
        relatedBooks.push(b);
      }
    });

    return (
      <div className="space-y-6">
        <button onClick={() => setSelectedTopic(null)} className="text-amber-600 hover:text-amber-700 text-sm font-medium flex items-center gap-1">
          ← Back to Topics
        </button>
        <div className="bg-gradient-to-r from-indigo-600 to-purple-700 rounded-xl p-6 text-white">
          <div className="flex items-center gap-3">
            <span className="text-4xl">{selected.icon}</span>
            <div>
              <h2 className="text-xl font-bold">{selected.name}</h2>
              <p className="text-indigo-200 text-sm mt-1">{selected.description}</p>
              <p className="text-indigo-300 text-xs mt-2">{selected.bookCount} books available</p>
            </div>
          </div>
        </div>

        {/* Subtopics */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">Explore Subtopics</h3>
          <div className="flex flex-wrap gap-2">
            {selected.subtopics.map((sub) => (
              <span key={sub} className="px-3 py-1.5 bg-indigo-100 text-indigo-700 rounded-lg text-xs font-medium">
                {sub}
              </span>
            ))}
          </div>
        </div>

        {/* Related Books */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">Related Books ({relatedBooks.length})</h3>
          {relatedBooks.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {relatedBooks.map((book) => (
                <div key={book.id} className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-md transition-all">
                  <div className="flex items-start gap-3">
                    <span className="text-3xl">{book.coverUrl}</span>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm">{book.title}</h4>
                      <p className="text-gray-500 text-xs">{book.authorName}</p>
                      <p className="text-gray-600 text-xs mt-2 line-clamp-2">{book.description}</p>
                      <div className="flex gap-2 mt-2">
                        <span className="text-xs text-amber-600">⭐ {book.rating}</span>
                        {book.isFree && <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs">Free</span>}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-gray-50 rounded-xl p-8 text-center text-gray-400">
              <span className="text-3xl block mb-2">📚</span>
              <p className="text-sm">Books for this topic are being added. Check back soon!</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-bold text-gray-900">Knowledge Exploration</h2>
        <p className="text-gray-500 text-sm mt-1">
          Explore books by topic — philosophy, science, culture, civilization knowledge and more
        </p>
      </div>

      {/* Intro */}
      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl border border-indigo-100 p-6">
        <h3 className="font-semibold text-indigo-900 mb-2">🔍 Global Knowledge Discovery</h3>
        <p className="text-indigo-800 text-xs leading-relaxed">
          This is more than a library — it's a knowledge exploration system. Instead of browsing by title 
          or author, explore by what you want to understand. Dive into philosophical traditions, scientific 
          discoveries, cultural histories, and civilizational knowledge from around the world.
        </p>
      </div>

      {/* Featured Topics */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-3">⭐ Featured Knowledge Areas</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {knowledgeTopics.filter((t) => t.featured).map((topic) => (
            <div
              key={topic.id}
              onClick={() => handleExplore(topic.id)}
              className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-lg transition-all cursor-pointer group"
            >
              <div className="flex items-start gap-3">
                <span className="text-3xl">{topic.icon}</span>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">{topic.name}</h4>
                  <p className="text-gray-600 text-xs mt-1 line-clamp-2">{topic.description}</p>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {topic.subtopics.slice(0, 4).map((sub) => (
                      <span key={sub} className="px-2 py-0.5 bg-indigo-50 text-indigo-600 rounded text-xs">{sub}</span>
                    ))}
                    {topic.subtopics.length > 4 && (
                      <span className="px-2 py-0.5 bg-gray-50 text-gray-400 rounded text-xs">+{topic.subtopics.length - 4} more</span>
                    )}
                  </div>
                  <p className="text-indigo-600 text-xs font-medium mt-3">{topic.bookCount} books →</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* All Topics */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-3">All Knowledge Areas</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {knowledgeTopics.map((topic) => (
            <div
              key={topic.id}
              onClick={() => handleExplore(topic.id)}
              className="bg-white rounded-xl border border-gray-100 p-4 hover:shadow-md transition-all cursor-pointer group text-center"
            >
              <span className="text-3xl block mb-2">{topic.icon}</span>
              <h4 className="font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors text-sm">{topic.name}</h4>
              <p className="text-gray-500 text-xs mt-1">{topic.bookCount} books</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default KnowledgeExplorer;
