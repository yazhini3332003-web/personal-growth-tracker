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
import Blender3DWorkspacePro from "../components/blenderlab/Blender3DWorkspacePro";
import BlenderAssetLibrary from "../components/blenderlab/BlenderAssetLibrary";
import BlenderProjectGallery from "../components/blenderlab/BlenderProjectGallery";
import BlenderAIToolsLab from "../components/blenderlab/BlenderAIToolsLab";

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
  | "ai-lab"
  | "news"
  | "addons"
  | "workspace"
  | "assets"
  | "gallery";

type WorkspaceSize = "normal" | "medium" | "fullscreen";

interface NavGroup {
  label: string;
  color: string;
  items: { key: ViewMode; label: string; icon: string; description?: string }[];
}

const BlenderHubContent: React.FC = () => {
  const [view, setView] = useState<ViewMode>("intro");
  const [selectedPhaseId, setSelectedPhaseId] = useState<number>(1);
  const [workspaceSize, setWorkspaceSize] = useState<WorkspaceSize>("normal");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
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
      color: "from-blue-500 to-cyan-500",
      items: [
        { key: "intro", label: "Introduction", icon: "🏠", description: "Get started" },
        { key: "levels", label: "Learning Levels", icon: "📊", description: "Skill paths" },
        { key: "lessons", label: "Lessons", icon: "📚", description: "Video tutorials" },
        { key: "roadmap", label: "Roadmap", icon: "🗺️", description: "Learning path" },
      ]
    },
    {
      label: "CREATE",
      color: "from-orange-500 to-amber-500",
      items: [
        { key: "workspace", label: "3D Workspace", icon: "🎮", description: "Create 3D" },
        { key: "assets", label: "Asset Library", icon: "📦", description: "Models & materials" },
        { key: "gallery", label: "Gallery", icon: "🖼️", description: "Your projects" },
      ]
    },
    {
      label: "PRACTICE",
      color: "from-green-500 to-emerald-500",
      items: [
        { key: "practice", label: "Exercises", icon: "🏋️", description: "Skill practice" },
        { key: "projects", label: "Projects", icon: "🚀", description: "Build projects" },
      ]
    },
    {
      label: "COMMUNITY",
      color: "from-purple-500 to-pink-500",
      items: [
        { key: "showcase", label: "Showcase", icon: "🎨", description: "Community art" },
        { key: "community", label: "Discussion", icon: "💬", description: "Forums" },
      ]
    },
    {
      label: "AI STUDIO",
      color: "from-purple-500 to-indigo-600",
      items: [
        { key: "ai-lab", label: "AI Tools Lab", icon: "🧪", description: "Explore AI" },
        { key: "ai-tools", label: "AI Assistant", icon: "🤖", description: "AI help" },
      ]
    },
    {
      label: "RESOURCES",
      color: "from-gray-500 to-slate-600",
      items: [
        { key: "resources", label: "Library", icon: "📖", description: "References" },
        { key: "progress", label: "Progress", icon: "📈", description: "Your stats" },
        { key: "news", label: "News", icon: "📰", description: "Latest updates" },
        { key: "addons", label: "Addons", icon: "🧩", description: "Extensions" },
      ]
    }
  ];

  const allItems = navGroups.flatMap(g => g.items);
  const currentItem = allItems.find(i => i.key === view) || allItems[0];
  const currentGroup = navGroups.find(g => g.items.some(i => i.key === view));

  // Check if we're in workspace view with expanded mode
  const isExpandedWorkspace = view === "workspace" && (workspaceSize === "medium" || workspaceSize === "fullscreen");
  const isFullscreen = view === "workspace" && workspaceSize === "fullscreen";

  // Fullscreen workspace mode
  if (isFullscreen) {
    return (
      <div className="fixed inset-0 z-50 bg-gray-900">
        <Blender3DWorkspacePro 
          workspaceSize={workspaceSize}
          onSizeChange={setWorkspaceSize}
          onExit={() => setWorkspaceSize("normal")}
        />
      </div>
    );
  }

  return (
    <div className={`${isExpandedWorkspace ? "space-y-2" : "space-y-6"}`}>
      {/* Header */}
      {!isExpandedWorkspace && (
        <div className="bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 rounded-2xl p-6 shadow-lg">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center">
                <span className="text-4xl">🟠</span>
              </div>
              <div>
                <h1 className="text-white font-bold text-2xl">Blender Learning Hub</h1>
                <p className="text-white/80 text-sm mt-1">Complete 3D Creation Studio</p>
                <div className="flex items-center gap-4 mt-2">
                  <div className="flex items-center gap-2">
                    <div className="w-32 h-2 bg-white/20 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-white rounded-full transition-all"
                        style={{ width: `${stats.totalProgress}%` }}
                      />
                    </div>
                    <span className="text-white text-xs font-medium">{stats.totalProgress}%</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button 
                onClick={() => { setView("workspace"); setWorkspaceSize("normal"); }}
                className="px-4 py-2 bg-white text-orange-600 rounded-lg font-medium text-sm hover:bg-white/90 transition-colors shadow-lg"
              >
                🎮 Open 3D Studio
              </button>
              <button 
                onClick={() => { setView("workspace"); setWorkspaceSize("fullscreen"); }}
                className="px-4 py-2 bg-white/20 text-white rounded-lg font-medium text-sm hover:bg-white/30 transition-colors backdrop-blur"
              >
                🖥️ Fullscreen Mode
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Compact Header for Medium Workspace */}
      {isExpandedWorkspace && (
        <div className="bg-gray-800 rounded-xl px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🟠</span>
            <span className="text-white font-bold">Blender 3D Studio</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setWorkspaceSize("normal")}
              className="px-3 py-1.5 rounded text-xs font-medium transition-colors bg-gray-700 text-gray-300 hover:bg-gray-600"
            >
              Normal
            </button>
            <button
              onClick={() => setWorkspaceSize("medium")}
              className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${
                workspaceSize === "medium" ? "bg-orange-500 text-white" : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              Medium
            </button>
            <button
              onClick={() => setWorkspaceSize("fullscreen")}
              className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${
                workspaceSize === "fullscreen" ? "bg-orange-500 text-white" : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              Fullscreen
            </button>
            <div className="w-px h-6 bg-gray-600 mx-2" />
            <button
              onClick={() => setView("intro")}
              className="px-3 py-1.5 bg-gray-700 text-gray-300 rounded text-xs hover:bg-gray-600"
            >
              ← Back to Hub
            </button>
          </div>
        </div>
      )}

      {/* Navigation Cards - Only show when not in expanded workspace */}
      {!isExpandedWorkspace && (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          {navGroups.map((group) => (
            <div 
              key={group.label} 
              className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className={`bg-gradient-to-r ${group.color} px-4 py-2`}>
                <p className="text-xs font-bold text-white">{group.label}</p>
              </div>
              <div className="p-3 space-y-1">
                {group.items.map((item) => (
                  <button
                    key={item.key}
                    onClick={() => {
                      setView(item.key);
                      if (item.key === "workspace") {
                        setWorkspaceSize("normal");
                      }
                    }}
                    className={`w-full px-3 py-2.5 rounded-xl text-left transition-all flex items-center gap-3 group ${
                      view === item.key || (view === "phase" && item.key === "roadmap")
                        ? "bg-gradient-to-r " + group.color + " text-white shadow-sm"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <span className="text-lg">{item.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{item.label}</p>
                      <p className={`text-[10px] truncate ${
                        view === item.key ? "text-white/80" : "text-gray-400"
                      }`}>
                        {item.description}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Current Section Header - Only show when not in expanded workspace */}
      {!isExpandedWorkspace && (
        <div className={`flex items-center justify-between bg-gradient-to-r ${currentGroup?.color || "from-gray-500 to-gray-600"} rounded-xl px-4 py-3`}>
          <div className="flex items-center gap-3">
            <span className="text-2xl">{currentItem.icon}</span>
            <div>
              <span className="text-white font-bold">
                {view === "phase" ? "Phase Detail" : currentItem.label}
              </span>
              <p className="text-white/70 text-xs">{currentItem.description}</p>
            </div>
          </div>
          {view === "workspace" && (
            <div className="flex items-center gap-2">
              <span className="text-white/70 text-xs mr-2">Workspace Size:</span>
              <button
                onClick={() => setWorkspaceSize("normal")}
                className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${
                  workspaceSize === "normal" ? "bg-white text-orange-600" : "bg-white/20 text-white hover:bg-white/30"
                }`}
              >
                Normal
              </button>
              <button
                onClick={() => setWorkspaceSize("medium")}
                className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${
                  workspaceSize === "medium" ? "bg-white text-orange-600" : "bg-white/20 text-white hover:bg-white/30"
                }`}
              >
                Medium
              </button>
              <button
                onClick={() => setWorkspaceSize("fullscreen")}
                className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${
                  workspaceSize === "fullscreen" ? "bg-white text-orange-600" : "bg-white/20 text-white hover:bg-white/30"
                }`}
              >
                🖥️ Fullscreen
              </button>
            </div>
          )}
        </div>
      )}

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

      {view === "ai-lab" && <BlenderAIToolsLab />}

      {view === "news" && <BlenderNewsFeed />}

      {view === "addons" && <BlenderTrendingTools />}

      {view === "workspace" && (
        <Blender3DWorkspacePro 
          workspaceSize={workspaceSize}
          onSizeChange={setWorkspaceSize}
          onExit={() => setView("intro")}
        />
      )}

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
