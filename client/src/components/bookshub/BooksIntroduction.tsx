import React from "react";
import { readingInsights } from "../../data/booksHubData";

interface Props {
  onNavigate: (view: string) => void;
}

const BooksIntroduction: React.FC<Props> = ({ onNavigate }) => {
  const insights = readingInsights;

  const stats = [
    { label: "Books Available", value: `${insights.totalBooks}+`, icon: "📚", color: "from-amber-500 to-orange-600" },
    { label: "Languages", value: `${insights.totalLanguages}`, icon: "🌍", color: "from-blue-500 to-indigo-600" },
    { label: "Tamil Books", value: `${insights.tamilBooksCount}`, icon: "🏛️", color: "from-emerald-500 to-teal-600" },
    { label: "Free to Read", value: `${insights.freeBooks}`, icon: "🔓", color: "from-purple-500 to-violet-600" },
  ];

  const features = [
    { icon: "🔍", title: "Discover Hidden Books", desc: "Find valuable books that mainstream platforms ignore" },
    { icon: "🏛️", title: "Tamil Literature Priority", desc: "Special section dedicated to rare Tamil writings" },
    { icon: "🤖", title: "AI Understanding", desc: "AI summaries and explanations for any book in any language" },
    { icon: "✍️", title: "Independent Writers", desc: "Platform for new authors to share original works" },
    { icon: "🌐", title: "Multi-Language Access", desc: "Read books in original or translated versions" },
    { icon: "📖", title: "Knowledge Exploration", desc: "Explore books by topic, philosophy, science, culture" },
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-600 via-orange-600 to-red-700 p-8 md:p-12 text-white">
        <div className="absolute inset-0 bg-black/10" />
        <div className="absolute -top-20 -right-20 w-60 h-60 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-yellow-300/10 rounded-full blur-3xl" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-4xl">📚</span>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">Books Hub</h1>
              <p className="text-amber-100 text-sm">Global Knowledge Library</p>
            </div>
          </div>
          <p className="text-lg text-amber-50 max-w-2xl mt-4 leading-relaxed">
            There are millions of books in the world, but most platforms only promote already famous titles.
            This platform is different — we focus on <strong>valuable but lesser-known books</strong>,
            rare literature, independent authors, and hidden knowledge from cultures worldwide.
          </p>
          <p className="text-amber-200 mt-3 text-sm max-w-xl">
            Discover books that matter. Explore knowledge that mainstream platforms ignore.
          </p>
          <div className="flex flex-wrap gap-3 mt-6">
            <button
              onClick={() => onNavigate("collection")}
              className="px-5 py-2.5 bg-white text-amber-700 font-semibold rounded-xl hover:bg-amber-50 transition-all text-sm"
            >
              Explore Library →
            </button>
            <button
              onClick={() => onNavigate("tamil")}
              className="px-5 py-2.5 bg-white/15 text-white font-semibold rounded-xl hover:bg-white/25 transition-all text-sm border border-white/20"
            >
              Tamil Books 🏛️
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-all">
            <div className={`w-10 h-10 bg-gradient-to-br ${stat.color} rounded-lg flex items-center justify-center mb-3`}>
              <span className="text-lg">{stat.icon}</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            <p className="text-gray-500 text-xs mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Why Discover Hidden Books */}
      <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
        <h2 className="text-lg font-bold text-gray-900 mb-2">Why Discover Unknown Books?</h2>
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          Most publishing platforms promote the same bestsellers repeatedly. However, there are millions 
          of valuable books — ancient wisdom texts, independent research, forgotten poetry, rare cultural 
          writings — that remain unnoticed. These books contain knowledge, creativity, and perspectives 
          that can change how you see the world.
        </p>
        <div className="bg-amber-50 border border-amber-100 rounded-lg p-4 text-sm text-amber-800">
          <strong>Our Mission:</strong> Bring scattered, hidden, and underrated books from different 
          places into one organized platform — helping readers discover knowledge beyond mainstream literature.
        </div>
      </div>

      {/* Platform Features */}
      <div>
        <h2 className="text-lg font-bold text-gray-900 mb-4">What You Can Do</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f, i) => (
            <div
              key={i}
              className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-md transition-all cursor-pointer group"
            >
              <span className="text-2xl block mb-3">{f.icon}</span>
              <h3 className="font-semibold text-gray-900 group-hover:text-amber-600 transition-colors">{f.title}</h3>
              <p className="text-gray-500 text-xs mt-1">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Content Policy */}
      <div className="bg-gray-50 rounded-xl border border-gray-200 p-5">
        <h3 className="font-semibold text-gray-900 text-sm mb-2">📋 Content Guidelines</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-gray-600">
          <div className="flex items-start gap-2">
            <span className="text-green-500 mt-0.5">✓</span>
            <span>Knowledge, creativity, literature, education, and meaningful writing</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-green-500 mt-0.5">✓</span>
            <span>Underrated, independent, and rare books from all cultures</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-red-500 mt-0.5">✗</span>
            <span>Popular mainstream bestsellers are not featured here</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-red-500 mt-0.5">✗</span>
            <span>18+ and sexually explicit content is completely restricted</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BooksIntroduction;
