import React from "react";
import { readingInsights } from "../../data/booksHubData";
import { books, tamilBooks, authors, independentWriters, bookNews, aiBookTools } from "../../data/booksHubData";
import { useBooksHubContext } from "../../context/BooksHubContext";

const ReadingInsights: React.FC = () => {
  const { getStats } = useBooksHubContext();
  const stats = getStats();
  const insights = readingInsights;

  const platformStats = [
    { label: "Total Books", value: books.length + tamilBooks.length, icon: "📚", color: "from-amber-500 to-orange-600" },
    { label: "Languages Available", value: insights.totalLanguages, icon: "🌐", color: "from-blue-500 to-indigo-600" },
    { label: "Authors", value: authors.length, icon: "👤", color: "from-purple-500 to-violet-600" },
    { label: "Independent Writers", value: independentWriters.length, icon: "✍️", color: "from-rose-500 to-pink-600" },
    { label: "Tamil Books", value: tamilBooks.length, icon: "🏛️", color: "from-emerald-500 to-teal-600" },
    { label: "Free Books", value: books.filter((b) => b.isFree).length, icon: "🔓", color: "from-green-500 to-lime-600" },
    { label: "Categories", value: insights.totalCategories, icon: "📂", color: "from-indigo-500 to-blue-600" },
    { label: "AI Tools", value: aiBookTools.length, icon: "🤖", color: "from-cyan-500 to-blue-600" },
  ];

  const userStats = [
    { label: "Books Read", value: stats.totalRead, icon: "📖" },
    { label: "Books Saved", value: stats.totalSaved, icon: "⭐" },
    { label: "Books Liked", value: stats.totalLiked, icon: "❤️" },
    { label: "Reading List", value: stats.readingListCount, icon: "📋" },
    { label: "Authors Followed", value: stats.followedAuthors, icon: "👤" },
    { label: "AI Summaries", value: stats.summariesCompleted, icon: "🤖" },
    { label: "Topics Explored", value: stats.topicsExplored, icon: "🔍" },
    { label: "Books Uploaded", value: stats.booksUploaded, icon: "📤" },
  ];

  const categoryBreakdown = [
    { name: "Philosophy", count: books.filter((b) => b.category === "philosophy").length, color: "bg-purple-500" },
    { name: "Literature", count: books.filter((b) => b.category === "literature").length, color: "bg-rose-500" },
    { name: "Poetry", count: books.filter((b) => b.category === "poetry").length, color: "bg-pink-500" },
    { name: "Self Development", count: books.filter((b) => b.category === "self-development").length, color: "bg-teal-500" },
    { name: "Educational", count: books.filter((b) => b.category === "educational").length, color: "bg-indigo-500" },
  ];

  const maxCount = Math.max(...categoryBreakdown.map((c) => c.count), 1);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-bold text-gray-900">Reading Insights Dashboard</h2>
        <p className="text-gray-500 text-sm mt-1">Overview of the platform and your reading activity</p>
      </div>

      {/* Platform Stats */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-3">📊 Platform Overview</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {platformStats.map((stat, i) => (
            <div key={i} className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-all">
              <div className={`w-10 h-10 bg-gradient-to-br ${stat.color} rounded-lg flex items-center justify-center mb-2`}>
                <span className="text-lg">{stat.icon}</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-gray-500 text-xs">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* User Activity */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-3">📖 Your Reading Activity</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {userStats.map((stat, i) => (
            <div key={i} className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
              <div className="flex items-center gap-2">
                <span className="text-lg">{stat.icon}</span>
                <div>
                  <p className="text-xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-gray-500 text-xs">{stat.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Category Breakdown */}
      <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
        <h3 className="font-semibold text-gray-900 mb-4">📂 Most Read Categories</h3>
        <div className="space-y-3">
          {categoryBreakdown.map((cat) => (
            <div key={cat.name} className="flex items-center gap-3">
              <span className="text-sm text-gray-700 w-32 flex-shrink-0">{cat.name}</span>
              <div className="flex-1 bg-gray-100 rounded-full h-6 overflow-hidden">
                <div
                  className={`${cat.color} h-full rounded-full flex items-center px-2 transition-all duration-500`}
                  style={{ width: `${(cat.count / maxCount) * 100}%`, minWidth: cat.count > 0 ? "24px" : "0px" }}
                >
                  <span className="text-white text-xs font-medium">{cat.count}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Facts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border border-amber-100 p-5">
          <h4 className="font-semibold text-amber-800 text-sm">📰 Latest News</h4>
          <p className="text-amber-700 text-xs mt-1">{bookNews.length} articles covering publishing trends, AI in books, and more</p>
        </div>
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl border border-emerald-100 p-5">
          <h4 className="font-semibold text-emerald-800 text-sm">🏛️ Tamil Priority</h4>
          <p className="text-emerald-700 text-xs mt-1">{tamilBooks.length} dedicated Tamil books spanning 2,000+ years of literature</p>
        </div>
      </div>
    </div>
  );
};

export default ReadingInsights;
