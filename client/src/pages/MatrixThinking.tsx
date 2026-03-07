import React, { useState } from "react";
import MatrixIntroduction from "../components/matrix/MatrixIntroduction";
import MatrixModels from "../components/matrix/MatrixModels";
import MatrixRealLife from "../components/matrix/MatrixRealLife";
import MatrixBuilder from "../components/matrix/MatrixBuilder";
import MatrixLearningPath from "../components/matrix/MatrixLearningPath";
import MatrixCaseStudies from "../components/matrix/MatrixCaseStudies";

type ViewType =
  | "introduction"
  | "models"
  | "real-life"
  | "builder"
  | "learning-path"
  | "case-studies";

interface NavItem {
  id: ViewType;
  label: string;
  icon: string;
}

interface NavGroup {
  title: string;
  items: NavItem[];
}

const navGroups: NavGroup[] = [
  {
    title: "LEARN",
    items: [
      { id: "introduction", label: "Start Here", icon: "🧠" },
      { id: "models", label: "Matrix Models", icon: "📊" },
      { id: "real-life", label: "Real Life", icon: "🌍" },
    ],
  },
  {
    title: "PRACTICE",
    items: [
      { id: "builder", label: "Matrix Builder", icon: "🔧" },
      { id: "case-studies", label: "Case Studies", icon: "📖" },
    ],
  },
  {
    title: "GROW",
    items: [
      { id: "learning-path", label: "Learning Path", icon: "🗺️" },
    ],
  },
];

const MatrixThinking: React.FC = () => {
  const [activeView, setActiveView] = useState<ViewType>("introduction");

  const renderView = () => {
    switch (activeView) {
      case "introduction":
        return <MatrixIntroduction />;
      case "models":
        return <MatrixModels />;
      case "real-life":
        return <MatrixRealLife />;
      case "builder":
        return <MatrixBuilder />;
      case "learning-path":
        return <MatrixLearningPath />;
      case "case-studies":
        return <MatrixCaseStudies />;
      default:
        return <MatrixIntroduction />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Page Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-lg">
            🧩
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Matrix Thinking</h1>
            <p className="text-xs text-gray-500">
              Structured decision-making for a clearer life
            </p>
          </div>
        </div>

        {/* Grouped Navigation */}
        <div className="bg-white rounded-2xl border border-gray-100 p-3 mb-6">
          <div className="flex flex-wrap items-center gap-2">
            {navGroups.map((group, gidx) => (
              <React.Fragment key={group.title}>
                {gidx > 0 && (
                  <div className="hidden sm:block w-px h-8 bg-gray-200 mx-1" />
                )}
                <div className="flex items-center gap-1">
                  <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider px-1 hidden sm:block">
                    {group.title}
                  </span>
                  {group.items.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setActiveView(item.id)}
                      className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                        activeView === item.id
                          ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md shadow-indigo-100"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-800"
                      }`}
                    >
                      <span className="text-sm">{item.icon}</span>
                      <span className="hidden sm:inline">{item.label}</span>
                    </button>
                  ))}
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Active View Content */}
        {renderView()}
      </div>
    </div>
  );
};

export default MatrixThinking;
