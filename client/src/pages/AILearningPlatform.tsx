import React, { useState } from "react";
import { LearningProvider } from "../context/LearningContext";
import VisualRoadmap from "../components/learning/VisualRoadmap";
import StageDetail from "../components/learning/StageDetail";
import ProgressTracker from "../components/learning/ProgressTracker";
import AINewsFeed from "../components/learning/AINewsFeed";
import TrendingTools from "../components/learning/TrendingTools";
import LearningDashboard from "../components/learning/LearningDashboard";
import DailyTasks from "../components/learning/DailyTasks";
import WeeklyReview from "../components/learning/WeeklyReview";
import { roadmapStages } from "../data/learningData";

type TabKey = "dashboard" | "roadmap" | "progress" | "daily" | "weekly" | "news" | "tools";

const tabs: { key: TabKey; label: string; icon: string }[] = [
  { key: "dashboard", label: "Dashboard", icon: "🏠" },
  { key: "roadmap", label: "Roadmap", icon: "🗺️" },
  { key: "progress", label: "Progress", icon: "📊" },
  { key: "daily", label: "Daily Tasks", icon: "📋" },
  { key: "weekly", label: "Weekly Review", icon: "📈" },
  { key: "news", label: "AI News", icon: "📡" },
  { key: "tools", label: "Trending Tools", icon: "🔥" },
];

const AILearningPlatformInner: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabKey>("dashboard");
  const [selectedStage, setSelectedStage] = useState<number | null>(null);

  const handleSelectStage = (stageId: number) => {
    setSelectedStage(selectedStage === stageId ? null : stageId);
  };

  const handleNavigate = (tab: string) => {
    setActiveTab(tab as TabKey);
  };

  const selectedStageData = selectedStage
    ? roadmapStages.find((s) => s.id === selectedStage)
    : null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-violet-700 via-indigo-700 to-blue-700 rounded-2xl p-6 md:p-8 text-white">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-4xl">🧠</span>
          <div>
            <h1 className="text-2xl md:text-3xl font-black">AI Web Developer Learning Platform</h1>
            <p className="text-indigo-200 text-sm md:text-base mt-1">
              Your complete interactive learning system — from zero to AI-powered web developer
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap gap-2 bg-white border border-slate-200/60 rounded-xl p-2">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
              activeTab === tab.key
                ? "bg-primary-600 text-white shadow-sm"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            <span>{tab.icon}</span>
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === "dashboard" && (
          <LearningDashboard onNavigate={handleNavigate} />
        )}

        {activeTab === "roadmap" && (
          <div className="space-y-6">
            <VisualRoadmap
              onSelectStage={handleSelectStage}
              selectedStage={selectedStage}
            />
            {selectedStageData && (
              <StageDetail
                stage={selectedStageData}
                onClose={() => setSelectedStage(null)}
              />
            )}
          </div>
        )}

        {activeTab === "progress" && <ProgressTracker />}
        {activeTab === "daily" && <DailyTasks />}
        {activeTab === "weekly" && <WeeklyReview />}
        {activeTab === "news" && <AINewsFeed />}
        {activeTab === "tools" && <TrendingTools />}
      </div>
    </div>
  );
};

const AILearningPlatform: React.FC = () => {
  return (
    <LearningProvider>
      <AILearningPlatformInner />
    </LearningProvider>
  );
};

export default AILearningPlatform;
