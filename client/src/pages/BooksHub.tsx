import React, { useState } from "react";
import { BooksHubProvider, useBooksHubContext } from "../context/BooksHubContext";
import BooksIntroduction from "../components/bookshub/BooksIntroduction";
import GlobalBookCollection from "../components/bookshub/GlobalBookCollection";
import BookCategories from "../components/bookshub/BookCategories";
import TamilBookSection from "../components/bookshub/TamilBookSection";
import AIBookUnderstanding from "../components/bookshub/AIBookUnderstanding";
import AIReadingAssistant from "../components/bookshub/AIReadingAssistant";
import AuthorProfiles from "../components/bookshub/AuthorProfiles";
import MultiLanguageReader from "../components/bookshub/MultiLanguageReader";
import BookUploadSystem from "../components/bookshub/BookUploadSystem";
import IndependentWriters from "../components/bookshub/IndependentWriters";
import AIRecommendations from "../components/bookshub/AIRecommendations";
import BooksNewsFeed from "../components/bookshub/BooksNewsFeed";
import AIBookTools from "../components/bookshub/AIBookTools";
import ReadingInsights from "../components/bookshub/ReadingInsights";
import KnowledgeExplorer from "../components/bookshub/KnowledgeExplorer";

type ViewMode =
  | "home"
  | "collection"
  | "categories"
  | "tamil"
  | "ai-understand"
  | "ai-assistant"
  | "authors"
  | "multilang"
  | "upload"
  | "writers"
  | "recommend"
  | "news"
  | "ai-tools"
  | "insights"
  | "explore";

const BooksHubContent: React.FC = () => {
  const [view, setView] = useState<ViewMode>("home");
  const { getStats } = useBooksHubContext();
  const stats = getStats();

  const navItems: { key: ViewMode; label: string; icon: string }[] = [
    { key: "home", label: "Home", icon: "🏠" },
    { key: "collection", label: "Collection", icon: "📚" },
    { key: "categories", label: "Categories", icon: "📂" },
    { key: "tamil", label: "Tamil", icon: "🏛️" },
    { key: "ai-understand", label: "AI Summary", icon: "🧠" },
    { key: "ai-assistant", label: "AI Chat", icon: "💬" },
    { key: "authors", label: "Authors", icon: "👤" },
    { key: "multilang", label: "Languages", icon: "🌐" },
    { key: "upload", label: "Upload", icon: "📤" },
    { key: "writers", label: "Writers", icon: "✍️" },
    { key: "recommend", label: "For You", icon: "⭐" },
    { key: "news", label: "News", icon: "📰" },
    { key: "ai-tools", label: "AI Tools", icon: "🤖" },
    { key: "insights", label: "Insights", icon: "📊" },
    { key: "explore", label: "Explore", icon: "🔍" },
  ];

  const handleNavigate = (section: string) => {
    setView(section as ViewMode);
  };

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg shadow-amber-200">
            <span className="text-xl">📚</span>
          </div>
          <div>
            <h1 className="text-gray-900 font-bold text-xl">Books Hub</h1>
            <p className="text-gray-500 text-xs">
              {stats.totalRead} read · {stats.totalSaved} saved · {stats.followedAuthors} authors followed
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Pills */}
      <div className="overflow-x-auto pb-2 -mx-1">
        <div className="flex gap-1 bg-gray-100 rounded-xl p-1.5 min-w-max">
          {navItems.map((item) => (
            <button
              key={item.key}
              onClick={() => setView(item.key)}
              className={`px-3 py-2 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 whitespace-nowrap ${
                view === item.key
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <span>{item.icon}</span>
              <span className="hidden sm:inline">{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      {view === "home" && <BooksIntroduction onNavigate={handleNavigate} />}
      {view === "collection" && <GlobalBookCollection />}
      {view === "categories" && <BookCategories />}
      {view === "tamil" && <TamilBookSection />}
      {view === "ai-understand" && <AIBookUnderstanding />}
      {view === "ai-assistant" && <AIReadingAssistant />}
      {view === "authors" && <AuthorProfiles />}
      {view === "multilang" && <MultiLanguageReader />}
      {view === "upload" && <BookUploadSystem />}
      {view === "writers" && <IndependentWriters />}
      {view === "recommend" && <AIRecommendations />}
      {view === "news" && <BooksNewsFeed />}
      {view === "ai-tools" && <AIBookTools />}
      {view === "insights" && <ReadingInsights />}
      {view === "explore" && <KnowledgeExplorer />}
    </div>
  );
};

const BooksHub: React.FC = () => {
  return (
    <BooksHubProvider>
      <BooksHubContent />
    </BooksHubProvider>
  );
};

export default BooksHub;
