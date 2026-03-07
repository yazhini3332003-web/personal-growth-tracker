import React, { useState } from "react";
import { BlenderLabProvider, useBlenderLabContext } from "../context/BlenderLabContext";
import { blenderPhases } from "../data/blenderLabData";
import BlenderIntroduction from "../components/blenderlab/BlenderIntroduction";
import BlenderRoadmap from "../components/blenderlab/BlenderRoadmap";
import PhaseDetail from "../components/blenderlab/PhaseDetail";
import WhyLearnBlender from "../components/blenderlab/WhyLearnBlender";
import BlenderAITools from "../components/blenderlab/BlenderAITools";
import BlenderNewsFeed from "../components/blenderlab/BlenderNewsFeed";
import BlenderTrendingTools from "../components/blenderlab/BlenderTrendingTools";
import BlenderProgressTracker from "../components/blenderlab/BlenderProgressTracker";

type ViewMode = "home" | "phase" | "why" | "practice" | "ai-tools" | "news" | "tools" | "progress";

const BlenderHubContent: React.FC = () => {
  const [view, setView] = useState<ViewMode>("home");
  const [selectedPhaseId, setSelectedPhaseId] = useState<number>(1);
  const { setCurrentPhase, getOverallStats } = useBlenderLabContext();
  const stats = getOverallStats();

  const handlePhaseClick = (phaseId: number) => {
    setSelectedPhaseId(phaseId);
    setCurrentPhase(phaseId);
    setView("phase");
  };

  const handleBackToHome = () => {
    setView("home");
  };

  const selectedPhase = blenderPhases.find((p) => p.id === selectedPhaseId);

  const navItems: { key: ViewMode; label: string; icon: string }[] = [
    { key: "home", label: "Home", icon: "🏠" },
    { key: "why", label: "Why Blender", icon: "🎯" },
    { key: "ai-tools", label: "AI Tools", icon: "🤖" },
    { key: "news", label: "News", icon: "📰" },
    { key: "tools", label: "Addons", icon: "🧩" },
    { key: "progress", label: "Progress", icon: "📊" },
  ];

  return (
    <div className="space-y-8">
      {/* Top Navigation */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
            <span className="text-lg">🟠</span>
          </div>
          <div>
            <h1 className="text-gray-900 font-bold text-xl">Blender Learning Hub</h1>
            <p className="text-gray-500 text-xs">{stats.totalProgress}% complete · {stats.completedPhases}/10 phases</p>
          </div>
        </div>
        <div className="flex gap-1 bg-gray-100 rounded-xl p-1.5 flex-wrap">
          {navItems.map((item) => (
            <button
              key={item.key}
              onClick={() => setView(item.key)}
              className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all flex items-center gap-1.5 ${
                view === item.key || (view === "phase" && item.key === "home")
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

      {/* Content */}
      {view === "home" && (
        <div className="space-y-8">
          <BlenderIntroduction />
          <BlenderRoadmap onPhaseClick={handlePhaseClick} />
        </div>
      )}

      {view === "phase" && selectedPhase && (
        <PhaseDetail phase={selectedPhase} onBack={handleBackToHome} />
      )}

      {view === "why" && <WhyLearnBlender />}

      {view === "ai-tools" && <BlenderAITools />}

      {view === "news" && <BlenderNewsFeed />}

      {view === "tools" && <BlenderTrendingTools />}

      {view === "progress" && <BlenderProgressTracker />}
    </div>
  );
};

const BlenderLearningHub: React.FC = () => {
  return (
    <BlenderLabProvider>
      <BlenderHubContent />
    </BlenderLabProvider>
  );
};

export default BlenderLearningHub;
