import React, { useState } from "react";
import { BlenderLabProvider, useBlenderLabContext } from "../context/BlenderLabContext";
import { blenderPhases } from "../data/blenderLabData";
import PhaseDetail from "../components/blenderlab/PhaseDetail";
import BlenderAITools from "../components/blenderlab/BlenderAITools";
import BlenderNewsFeed from "../components/blenderlab/BlenderNewsFeed";
import BlenderTrendingTools from "../components/blenderlab/BlenderTrendingTools";
import BlenderProgressTracker from "../components/blenderlab/BlenderProgressTracker";
// New components
import BlenderIntro from "../components/blenderlab/BlenderIntro";
import BlenderLearningLevels from "../components/blenderlab/BlenderLearningLevels";
import BlenderLessons from "../components/blenderlab/BlenderLessons";
import BlenderPractice from "../components/blenderlab/BlenderPractice";
import BlenderProjects from "../components/blenderlab/BlenderProjects";
import BlenderShowcase from "../components/blenderlab/BlenderShowcase";
import BlenderCommunity from "../components/blenderlab/BlenderCommunity";
import BlenderResources from "../components/blenderlab/BlenderResources";
import BlenderRoadmap from "../components/blenderlab/BlenderRoadmap";
// 3D Workspace components
import Blender3DWorkspace from "../components/blenderlab/Blender3DWorkspace";
import BlenderAssetLibrary from "../components/blenderlab/BlenderAssetLibrary";
import BlenderProjectGallery from "../components/blenderlab/BlenderProjectGallery";

type ViewMode = 
  | "intro" 
  | "levels" 
  | "lessons" 
  | "practice" 
  | "projects" 
  | "showcase" 
  | "community" 
  | "resources" 
  | "progress" 
  | "roadmap"
  | "phase"
  | "ai-tools"
  | "news"
  | "addons"
  | "workspace"
  | "assets"
  | "gallery";

interface NavGroup {
  label: string;
  items: { key: ViewMode; label: string; icon: string }[];
}

const BlenderHubContent: React.FC = () => {
  const [view, setView] = useState<ViewMode>("intro");
  const [selectedPhaseId, setSelectedPhaseId] = useState<number>(1);
  const { setCurrentPhase, getOverallStats } = useBlenderLabContext();
  const stats = getOverallStats();

  const handlePhaseClick = (phaseId: number) => {
    setSelectedPhaseId(phaseId);
    setCurrentPhase(phaseId);
    setView("phase");
  };

  const handleBackToHome = () => {
    setView("roadmap");
  };

  const selectedPhase = blenderPhases.find((p) => p.id === selectedPhaseId);

  const navGroups: NavGroup[] = [
    {
      label: "LEARN",
      items: [
        { key: "intro", label: "Introduction", icon: "🏠" },
        { key: "levels", label: "Learning Levels", icon: "📊" },
        { key: "lessons", label: "Lessons", icon: "📚" },
        { key: "roadmap", label: "Roadmap", icon: "🗺️" },
      ]
    },
    {
      label: "CREATE",
      items: [
        { key: "workspace", label: "3D Workspace", icon: "🎮" },
        { key: "assets", label: "Asset Library", icon: "📦" },
        { key: "gallery", label: "Gallery", icon: "🖼️" },
      ]
    },
    {
      label: "PRACTICE",
      items: [
        { key: "practice", label: "Exercises", icon: "🏋️" },
        { key: "projects", label: "Projects", icon: "🚀" },
      ]
    },
    {
      label: "COMMUNITY",
      items: [
        { key: "showcase", label: "Showcase", icon: "🎨" },
        { key: "community", label: "Discuss", icon: "💬" },
      ]
    },
    {
      label: "RESOURCES",
      items: [
        { key: "resources", label: "Library", icon: "📖" },
        { key: "progress", label: "Progress", icon: "📈" },
        { key: "ai-tools", label: "AI Tools", icon: "🤖" },
        { key: "news", label: "News", icon: "📰" },
        { key: "addons", label: "Addons", icon: "🧩" },
      ]
    }
  ];

  const allItems = navGroups.flatMap(g => g.items);
  const currentItem = allItems.find(i => i.key === view) || allItems[0];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-600 rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-2xl">🟠</span>
          </div>
          <div>
            <h1 className="text-gray-900 font-bold text-xl">Blender Learning Hub</h1>
            <p className="text-gray-500 text-xs">Complete 3D learning ecosystem · {stats.totalProgress}% complete</p>
          </div>
        </div>
      </div>

      {/* Grouped Navigation */}
      <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          {navGroups.map((group) => (
            <div key={group.label}>
              <p className="text-[10px] font-bold text-gray-400 mb-2 px-1">{group.label}</p>
              <div className="space-y-1">
                {group.items.map((item) => (
                  <button
                    key={item.key}
                    onClick={() => setView(item.key)}
                    className={`w-full px-3 py-2 rounded-lg text-xs font-medium transition-all flex items-center gap-2 ${
                      view === item.key || (view === "phase" && item.key === "roadmap")
                        ? "bg-orange-500 text-white shadow-sm"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    <span>{item.icon}</span>
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Current Section Indicator */}
      <div className="flex items-center gap-2 px-1">
        <span className="text-lg">{currentItem.icon}</span>
        <span className="text-sm font-medium text-gray-700">{view === "phase" ? "Phase Detail" : currentItem.label}</span>
        <span className="text-xs text-gray-400">·</span>
        <span className="text-xs text-gray-400">Blender Learning Hub</span>
      </div>

      {/* Content */}
      {view === "intro" && <BlenderIntro />}
      
      {view === "levels" && <BlenderLearningLevels />}
      
      {view === "lessons" && <BlenderLessons />}
      
      {view === "roadmap" && <BlenderRoadmap onPhaseClick={handlePhaseClick} />}

      {view === "phase" && selectedPhase && (
        <PhaseDetail phase={selectedPhase} onBack={handleBackToHome} />
      )}

      {view === "practice" && <BlenderPractice />}

      {view === "projects" && <BlenderProjects />}

      {view === "showcase" && <BlenderShowcase />}

      {view === "community" && <BlenderCommunity />}

      {view === "resources" && <BlenderResources />}

      {view === "progress" && <BlenderProgressTracker />}

      {view === "ai-tools" && <BlenderAITools />}

      {view === "news" && <BlenderNewsFeed />}

      {view === "addons" && <BlenderTrendingTools />}

      {view === "workspace" && <Blender3DWorkspace />}

      {view === "assets" && <BlenderAssetLibrary />}

      {view === "gallery" && <BlenderProjectGallery />}
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
