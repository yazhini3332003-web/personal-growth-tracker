import React, { useState } from "react";
import { LabProvider, useLabContext } from "../context/LearningLabContext";
import { labPhases } from "../data/learningLabData";
import LabIntroduction from "../components/learninglab/LabIntroduction";
import LabRoadmap from "../components/learninglab/LabRoadmap";
import PhaseWorkspace from "../components/learninglab/PhaseWorkspace";
import LabProgressTracker from "../components/learninglab/LabProgressTracker";
import LabNewsFeed from "../components/learninglab/LabNewsFeed";
import ResourceLibrary from "../components/learninglab/ResourceLibrary";

type ViewMode = "home" | "phase" | "progress" | "news" | "resources";

const LearningLabContent: React.FC = () => {
  const [view, setView] = useState<ViewMode>("home");
  const [selectedPhaseId, setSelectedPhaseId] = useState<number>(1);
  const { setCurrentPhase, getOverallStats } = useLabContext();
  const stats = getOverallStats();

  const handlePhaseClick = (phaseId: number) => {
    setSelectedPhaseId(phaseId);
    setCurrentPhase(phaseId);
    setView("phase");
  };

  const handleBackToHome = () => {
    setView("home");
  };

  const selectedPhase = labPhases.find((p) => p.id === selectedPhaseId);

  const navItems = [
    { key: "home" as ViewMode, label: "Home", icon: "🏠" },
    { key: "progress" as ViewMode, label: "Progress", icon: "📊" },
    { key: "resources" as ViewMode, label: "Resources", icon: "📚" },
    { key: "news" as ViewMode, label: "AI News", icon: "📰" },
  ];

  return (
    <div className="min-h-screen bg-gray-950 -mx-4 sm:-mx-6 lg:-mx-8 -my-8 px-4 sm:px-6 lg:px-8 py-6">
      {/* Top Navigation */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
            <span className="text-white text-lg">🧪</span>
          </div>
          <div>
            <h1 className="text-white font-bold text-lg">Learning Lab</h1>
            <p className="text-gray-500 text-xs">{stats.totalProgress}% complete</p>
          </div>
        </div>
        <div className="flex gap-1 bg-gray-900 rounded-xl p-1 border border-gray-800">
          {navItems.map((item) => (
            <button
              key={item.key}
              onClick={() => setView(item.key)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                view === item.key || (view === "phase" && item.key === "home")
                  ? "bg-gray-800 text-white"
                  : "text-gray-500 hover:text-gray-300"
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
          <LabIntroduction />
          <LabRoadmap onPhaseClick={handlePhaseClick} />
        </div>
      )}

      {view === "phase" && selectedPhase && (
        <PhaseWorkspace phase={selectedPhase} onBack={handleBackToHome} />
      )}

      {view === "progress" && <LabProgressTracker />}

      {view === "resources" && <ResourceLibrary />}

      {view === "news" && <LabNewsFeed />}
    </div>
  );
};

const AILearningLab: React.FC = () => {
  return (
    <LabProvider>
      <LearningLabContent />
    </LabProvider>
  );
};

export default AILearningLab;
