import React, { useState } from "react";
import { LearningProvider, useLearning } from "../context/LearningContext";
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

const tabGroups: { label: string; tabs: { key: TabKey; label: string; icon: string }[] }[] = [
  {
    label: "Overview",
    tabs: [
      { key: "dashboard", label: "Dashboard", icon: "🏠" },
      { key: "roadmap", label: "Roadmap", icon: "🗺️" },
      { key: "progress", label: "Progress", icon: "📊" },
    ],
  },
  {
    label: "Learn",
    tabs: [
      { key: "daily", label: "Daily Tasks", icon: "📋" },
      { key: "weekly", label: "Weekly Review", icon: "📈" },
    ],
  },
  {
    label: "Discover",
    tabs: [
      { key: "news", label: "AI News", icon: "📡" },
      { key: "tools", label: "Trending Tools", icon: "🔥" },
    ],
  },
];

const AILearningPlatformInner: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabKey>("dashboard");
  const [selectedStage, setSelectedStage] = useState<number | null>(null);
  const { getOverallCompletion, getTodayStats, progress } = useLearning();
  const overall = getOverallCompletion();
  const today = getTodayStats();
  const currentStage = roadmapStages.find((s) => s.id === progress.currentStage) || roadmapStages[0];

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
      {/* Clean Header */}
      <div className="bg-white border-b border-gray-200 rounded-none -mx-6 lg:-mx-10 -mt-8 px-6 lg:px-10 py-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">AI Web Developer Learning Platform</h1>
            <p className="text-gray-500 text-sm mt-1">Track your progress from zero to AI-powered web developer</p>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-right">
              <div className="text-sm font-medium text-gray-900">{overall}%</div>
              <div className="text-xs text-gray-500">Complete</div>
            </div>
            <div className="text-right">
              <div className="text-sm font-medium text-gray-900">{today.tasks}</div>
              <div className="text-xs text-gray-500">Today</div>
            </div>
            <div className="hidden md:block text-right">
              <div className="text-sm font-medium text-gray-900">{currentStage.shortTitle}</div>
              <div className="text-xs text-gray-500">Current Stage</div>
            </div>
          </div>
        </div>
        {/* Progress Bar */}
        <div className="mt-4 flex items-center gap-3">
          <div className="flex-1 bg-gray-100 rounded-full h-1.5">
            <div
              className="h-1.5 rounded-full bg-blue-500 transition-all duration-700"
              style={{ width: `${overall}%` }}
            />
          </div>
          <span className="text-xs text-gray-500">{overall}%</span>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border border-gray-200 rounded-lg p-1 flex flex-wrap items-center gap-1">
        {tabGroups.map((group, gi) => (
          <React.Fragment key={group.label}>
            {gi > 0 && <div className="w-px h-6 bg-gray-200 mx-1 hidden sm:block" />}
            {group.tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium transition-all ${
                  activeTab === tab.key
                    ? "bg-blue-500 text-white"
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                }`}
              >
                <span className="text-sm">{tab.icon}</span>
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </React.Fragment>
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
