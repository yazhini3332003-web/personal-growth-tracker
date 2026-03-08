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
    <div className={`min-h-screen bg-gradient-to-br from-gray-50 via-orange-50/30 to-amber-50/20 ${isExpandedWorkspace ? "space-y-2 p-4" : "p-6"}`}>
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

      {/* Main Dashboard Layout */}
      {!isExpandedWorkspace && (
        <div className="max-w-[1600px] mx-auto">
          {/* Top Navigation Bar */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-100 shadow-sm mb-6 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-amber-500 rounded-xl flex items-center justify-center shadow-lg">
                    <span className="text-xl">🟠</span>
                  </div>
                  <div>
                    <h1 className="text-gray-800 font-bold text-lg leading-tight">Blender Learning Hub</h1>
                    <p className="text-gray-500 text-xs">Master 3D Creation</p>
                  </div>
                </div>
                <div className="h-8 w-px bg-gray-200 mx-2" />
                <div className="flex items-center gap-2">
                  <div className="px-3 py-1.5 bg-orange-100 text-orange-600 rounded-full text-xs font-semibold">
                    📊 {stats.totalProgress}% Complete
                  </div>
                  <div className="px-3 py-1.5 bg-green-100 text-green-600 rounded-full text-xs font-semibold">
                    🔥 {stats.streak || 0} Day Streak
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => { setView("workspace"); setWorkspaceSize("normal"); }}
                  className="px-4 py-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-xl font-medium text-sm hover:shadow-lg transition-all flex items-center gap-2"
                >
                  <span>🎮</span>
                  <span>Open 3D Studio</span>
                </button>
              </div>
            </div>
          </div>

          <div className="flex gap-6">
          {/* Left Sidebar - Navigation */}
          <div className="w-64 flex-shrink-0 space-y-4">
            {/* Quick Actions */}
            <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Quick Actions</p>
              <div className="space-y-2">
                <button 
                  onClick={() => { setView("workspace"); setWorkspaceSize("normal"); }}
                  className="w-full px-4 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-xl font-medium text-sm hover:shadow-lg transition-all flex items-center gap-3"
                >
                  <span className="text-lg">🎮</span>
                  <span>Open 3D Studio</span>
                </button>
                <button 
                  onClick={() => { setView("workspace"); setWorkspaceSize("fullscreen"); }}
                  className="w-full px-4 py-2.5 bg-gray-100 text-gray-700 rounded-xl font-medium text-sm hover:bg-gray-200 transition-colors flex items-center gap-3"
                >
                  <span>🖥️</span>
                  <span>Fullscreen Mode</span>
                </button>
              </div>
            </div>

            {/* Navigation Groups */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              {navGroups.map((group, groupIndex) => (
                <div key={group.label} className={groupIndex > 0 ? "border-t border-gray-100" : ""}>
                  <div className={`px-4 py-2.5 bg-gradient-to-r ${group.color}`}>
                    <p className="text-[10px] font-bold text-white uppercase tracking-wider">{group.label}</p>
                  </div>
                  <div className="p-2">
                    {group.items.map((item) => {
                      const isActive = view === item.key || (view === "phase" && item.key === "roadmap");
                      return (
                        <button
                          key={item.key}
                          onClick={() => {
                            setView(item.key);
                            if (item.key === "workspace") setWorkspaceSize("normal");
                          }}
                          className={`w-full px-3 py-2 rounded-lg text-left transition-all flex items-center gap-3 mb-1 last:mb-0 ${
                            isActive
                              ? `bg-gradient-to-r ${group.color} text-white shadow-sm`
                              : "text-gray-600 hover:bg-gray-50"
                          }`}
                        >
                          <span className="text-base">{item.icon}</span>
                          <span className="text-sm font-medium">{item.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 min-w-0 space-y-5">
            {/* Top Stats Bar */}
            <div className="grid grid-cols-4 gap-4">
              <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <span className="text-lg">📚</span>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Lessons</p>
                    <p className="text-lg font-bold text-gray-800">{stats.completedLessons || 0}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <span className="text-lg">🏋️</span>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Exercises</p>
                    <p className="text-lg font-bold text-gray-800">{stats.completedExercises || 0}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                    <span className="text-lg">🚀</span>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Projects</p>
                    <p className="text-lg font-bold text-gray-800">{stats.completedProjects || 0}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <span className="text-lg">🔥</span>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Day Streak</p>
                    <p className="text-lg font-bold text-gray-800">{stats.streak || 0}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Section Header */}
            <div className={`flex items-center justify-between bg-gradient-to-r ${currentGroup?.color || "from-gray-500 to-gray-600"} rounded-xl px-5 py-4 shadow-sm`}>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                  <span className="text-xl">{currentItem.icon}</span>
                </div>
                <div>
                  <h2 className="text-white font-bold text-lg">
                    {view === "phase" ? "Phase Detail" : currentItem.label}
                  </h2>
                  <p className="text-white/70 text-sm">{currentItem.description}</p>
                </div>
              </div>
              {view === "workspace" && (
                <div className="flex items-center gap-2">
                  <span className="text-white/70 text-xs mr-2">Size:</span>
                  {["normal", "medium", "fullscreen"].map((size) => (
                    <button
                      key={size}
                      onClick={() => setWorkspaceSize(size as WorkspaceSize)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors capitalize ${
                        workspaceSize === size 
                          ? "bg-white text-orange-600" 
                          : "bg-white/20 text-white hover:bg-white/30"
                      }`}
                    >
                      {size === "fullscreen" ? "🖥️ Full" : size}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Content Container */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden min-h-[500px]">
              <div className="p-6">
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
            </div>
          </div>
        </div>
        </div>
      )}
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
