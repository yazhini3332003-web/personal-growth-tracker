import React, { useState } from "react";

type TabKey =
  | "health"
  | "time"
  | "money"
  | "knowledge"
  | "trending"
  | "ideas"
  | "news";

interface InvestmentTab {
  key: TabKey;
  label: string;
  color: string;
  icon: string;
}

const tabs: InvestmentTab[] = [
  { key: "health", label: "Health", color: "#10b981", icon: "\u2764\uFE0F" },
  { key: "time", label: "Time Freedom", color: "#6366f1", icon: "\u23F0" },
  { key: "money", label: "Money", color: "#f59e0b", icon: "\uD83D\uDCB0" },
  { key: "knowledge", label: "Knowledge", color: "#8b5cf6", icon: "\uD83D\uDCDA" },
  { key: "trending", label: "Trending", color: "#ec4899", icon: "\uD83D\uDD25" },
  { key: "ideas", label: "Ideas", color: "#14b8a6", icon: "\uD83D\uDCA1" },
  { key: "news", label: "Daily News", color: "#ef4444", icon: "\uD83D\uDCF0" },
];

const tabContent: Record<TabKey, { title: string; description: string; items: string[] }> = {
  health: {
    title: "Health Investment",
    description:
      "Health investment focuses on activities that improve physical and mental well-being. Investing in health improves long-term productivity and quality of life.",
    items: [
      "Regular exercise",
      "Healthy eating habits",
      "Meditation and mindfulness",
      "Quality sleep routines",
      "Stress management",
    ],
  },
  time: {
    title: "Time Freedom Investment",
    description:
      "Time freedom investment focuses on activities that give people more control over their future time. These investments help people build systems that reduce unnecessary work.",
    items: [
      "Learning automation tools",
      "Productivity systems",
      "Passive income development",
      "Delegation and outsourcing skills",
      "Time management strategies",
    ],
  },
  money: {
    title: "Money Investment",
    description:
      "Money investment focuses on financial growth and wealth management. Understanding financial investments helps individuals build financial stability.",
    items: [
      "Stock market investments",
      "Mutual funds",
      "Real estate investments",
      "Savings strategies",
      "Long-term financial planning",
    ],
  },
  knowledge: {
    title: "Knowledge Investment",
    description:
      "Knowledge investment focuses on learning new skills that increase future opportunities. Continuous learning improves career growth and personal development.",
    items: [
      "Reading books",
      "Online courses",
      "Professional certifications",
      "Technology skills",
      "Business knowledge",
    ],
  },
  trending: {
    title: "Trending Investments",
    description:
      "Modern investment trends help users identify future opportunities and stay ahead of the curve.",
    items: [
      "Artificial Intelligence skills",
      "Technology startups",
      "Creator economy",
      "Digital entrepreneurship",
      "Remote work businesses",
    ],
  },
  ideas: {
    title: "Investment Ideas",
    description:
      "Practical suggestions to help users explore new opportunities and build multiple income streams.",
    items: [
      "Learning high-demand skills",
      "Starting a side business",
      "Creating digital products",
      "Building passive income sources",
      "Investing in emerging industries",
    ],
  },
  news: {
    title: "Daily Investment News",
    description:
      "Stay informed about the latest developments in the financial and technology world with daily updates.",
    items: [
      "Business and finance",
      "Global markets",
      "Technology trends",
      "Startup ecosystem",
      "Investment opportunities",
    ],
  },
};

const Investment: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabKey>("health");
  const current = tabContent[activeTab];
  const activeTabMeta = tabs.find((t) => t.key === activeTab)!;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Investment</h1>
        <p className="text-gray-500 mt-1">
          Invest wisely in every area of life \u2014 health, knowledge, time, and
          money
        </p>
      </div>

      {/* Introduction */}
      <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl p-6 text-white">
        <h2 className="text-xl font-bold mb-3">Introduction</h2>
        <p className="text-amber-50 leading-relaxed">
          The Investment section helps users understand how to invest in
          different areas of life. Investment is not limited to money; it also
          includes health, knowledge, and time.
        </p>
        <p className="text-amber-50 leading-relaxed mt-3">
          This section provides insights, ideas, and trends that help users make
          better long-term decisions.
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
              activeTab === tab.key
                ? "text-white shadow-lg scale-105"
                : "bg-white text-gray-600 border border-gray-200 hover:border-gray-300 hover:shadow-sm"
            }`}
            style={
              activeTab === tab.key
                ? { backgroundColor: tab.color }
                : undefined
            }
          >
            <span>{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-lg"
            style={{ backgroundColor: activeTabMeta.color + "20" }}
          >
            {activeTabMeta.icon}
          </div>
          <h3 className="text-xl font-bold text-gray-900">{current.title}</h3>
        </div>
        <p className="text-gray-600 leading-relaxed mb-6">
          {current.description}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {current.items.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-3 p-4 rounded-xl border border-gray-100 hover:shadow-sm transition"
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
                style={{ backgroundColor: activeTabMeta.color }}
              >
                {index + 1}
              </div>
              <span className="text-gray-700 font-medium">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Overview Cards */}
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-4">
          All Investment Areas
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {tabs.map((tab) => {
            const content = tabContent[tab.key];
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`text-left p-5 rounded-xl border transition-all hover:shadow-md ${
                  activeTab === tab.key
                    ? "border-2 shadow-md"
                    : "border-gray-100"
                }`}
                style={
                  activeTab === tab.key
                    ? { borderColor: tab.color }
                    : undefined
                }
              >
                <div className="text-2xl mb-2">{tab.icon}</div>
                <h4 className="font-semibold text-gray-900 mb-1">
                  {tab.label}
                </h4>
                <p className="text-gray-500 text-xs line-clamp-2">
                  {content.description}
                </p>
                <p
                  className="text-xs font-medium mt-2"
                  style={{ color: tab.color }}
                >
                  {content.items.length} topics
                </p>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Investment;
