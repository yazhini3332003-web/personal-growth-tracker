import React, { useState, useRef, useEffect, useCallback } from "react";
import BlenderAIAssistant, { BlenderAIFloatingButton } from "./BlenderAIAssistant";

// ==================== TYPES ====================
interface SceneObject {
  id: string;
  name: string;
  type: "cube" | "sphere" | "cylinder" | "cone" | "torus" | "plane" | "light" | "camera";
  position: { x: number; y: number; z: number };
  rotation: { x: number; y: number; z: number };
  scale: { x: number; y: number; z: number };
  material: {
    color: string;
    roughness: number;
    metallic: number;
    opacity: number;
  };
  visible: boolean;
  locked: boolean;
}

interface Project {
  id: string;
  name: string;
  objects: SceneObject[];
  camera: CameraSettings;
  environment: string;
  createdAt: string;
  updatedAt: string;
  thumbnail?: string;
}

interface ProjectVersion {
  id: string;
  projectId: string;
  timestamp: string;
  description: string;
  objects: SceneObject[];
}

interface CameraSettings {
  fov: number;
  position: { x: number; y: number; z: number };
  target: { x: number; y: number; z: number };
}

type ToolMode = "select" | "move" | "rotate" | "scale" | "extrude" | "inset";
type ViewMode = "perspective" | "top" | "front" | "right";
type WorkspaceSize = "normal" | "medium" | "fullscreen";
type PanelTab = "hierarchy" | "properties" | "materials" | "lighting";

interface Blender3DWorkspaceProps {
  workspaceSize?: WorkspaceSize;
  onSizeChange?: (size: WorkspaceSize) => void;
  onExit?: () => void;
}

// ==================== CONSTANTS ====================
const STORAGE_KEY = "blender_workspace_data";
const AUTO_SAVE_INTERVAL = 5000; // 5 seconds

const defaultMaterial = {
  color: "#808080",
  roughness: 0.5,
  metallic: 0.0,
  opacity: 1.0
};

const primitiveIcons: Record<string, string> = {
  cube: "📦",
  sphere: "🔴",
  cylinder: "🥫",
  cone: "🔺",
  torus: "🍩",
  plane: "⬜",
  light: "💡",
  camera: "📷"
};

const presetMaterials = [
  { name: "Metal", color: "#C0C0C0", roughness: 0.2, metallic: 1.0 },
  { name: "Plastic", color: "#FF5733", roughness: 0.4, metallic: 0.0 },
  { name: "Wood", color: "#8B4513", roughness: 0.8, metallic: 0.0 },
  { name: "Glass", color: "#87CEEB", roughness: 0.0, metallic: 0.0 },
  { name: "Gold", color: "#FFD700", roughness: 0.3, metallic: 1.0 },
  { name: "Rubber", color: "#2F4F4F", roughness: 0.9, metallic: 0.0 },
];

const environmentPresets = [
  { name: "Studio", icon: "🏠", bg: "from-gray-700 to-gray-900" },
  { name: "Outdoor", icon: "🌳", bg: "from-blue-400 to-green-400" },
  { name: "Sunset", icon: "🌅", bg: "from-orange-500 to-purple-600" },
  { name: "Night", icon: "🌙", bg: "from-indigo-900 to-black" },
];

// ==================== MAIN COMPONENT ====================
const Blender3DWorkspacePro: React.FC<Blender3DWorkspaceProps> = ({
  workspaceSize = "normal",
  onSizeChange,
  onExit
}) => {
  // ==================== STATE ====================
  // Project state
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [versions, setVersions] = useState<ProjectVersion[]>([]);
  const [showProjectManager, setShowProjectManager] = useState(false);
  const [showVersionHistory, setShowVersionHistory] = useState(false);
  const [showRecoveryModal, setShowRecoveryModal] = useState(false);
  const [recoveryData, setRecoveryData] = useState<Project | null>(null);
  
  // Scene state
  const [objects, setObjects] = useState<SceneObject[]>([
    {
      id: "default-cube",
      name: "Cube",
      type: "cube",
      position: { x: 0, y: 0, z: 0 },
      rotation: { x: 0, y: 0, z: 0 },
      scale: { x: 1, y: 1, z: 1 },
      material: { ...defaultMaterial },
      visible: true,
      locked: false
    }
  ]);
  
  const [selectedObject, setSelectedObject] = useState<string | null>("default-cube");
  const [toolMode, setToolMode] = useState<ToolMode>("select");
  const [viewMode, setViewMode] = useState<ViewMode>("perspective");
  const [environment, setEnvironment] = useState("Studio");
  const [showGrid, setShowGrid] = useState(true);
  const [showWireframe, setShowWireframe] = useState(false);
  
  // Panel states
  const [activePanel, setActivePanel] = useState<PanelTab>("hierarchy");
  const [leftPanelCollapsed, setLeftPanelCollapsed] = useState(false);
  const [rightPanelCollapsed, setRightPanelCollapsed] = useState(false);
  const [bottomPanelCollapsed, setBottomPanelCollapsed] = useState(true);
  
  // Rendering states
  const [isRendering, setIsRendering] = useState(false);
  const [renderProgress, setRenderProgress] = useState(0);
  const [showRenderResult, setShowRenderResult] = useState(false);
  
  // Camera state
  const [cameraRotation, setCameraRotation] = useState({ x: 30, y: 45 });
  const [cameraDistance, setCameraDistance] = useState(5);
  const [cameraZoom, setCameraZoom] = useState(1);
  
  // Undo/Redo
  const [history, setHistory] = useState<SceneObject[][]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  
  // Auto-save
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  
  // AI Assistant states
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const [showHelpPrompt, setShowHelpPrompt] = useState(false);
  const [undoCount, setUndoCount] = useState(0);
  const [lastActivityTime, setLastActivityTime] = useState(Date.now());
  const [lastAction, setLastAction] = useState<string>("");
  
  // Refs
  const viewportRef = useRef<HTMLDivElement>(null);
  const helpPromptTimer = useRef<NodeJS.Timeout | null>(null);
  const inactivityTimer = useRef<NodeJS.Timeout | null>(null);
  const isDragging = useRef(false);
  const lastMousePos = useRef({ x: 0, y: 0 });
  const autoSaveTimer = useRef<NodeJS.Timeout | null>(null);

  // ==================== PERSISTENCE ====================
  // Load saved data on mount
  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        setProjects(parsed.projects || []);
        
        // Check for recovery data
        if (parsed.currentSession) {
          setRecoveryData(parsed.currentSession);
          setShowRecoveryModal(true);
        }
      } catch (e) {
        console.error("Failed to load saved data:", e);
      }
    }
  }, []);

  // Auto-save effect
  useEffect(() => {
    if (autoSaveTimer.current) {
      clearInterval(autoSaveTimer.current);
    }
    
    autoSaveTimer.current = setInterval(() => {
      if (hasUnsavedChanges && currentProject) {
        saveCurrentSession();
      }
    }, AUTO_SAVE_INTERVAL);
    
    return () => {
      if (autoSaveTimer.current) {
        clearInterval(autoSaveTimer.current);
      }
    };
  }, [hasUnsavedChanges, currentProject, objects]);

  // Track changes
  useEffect(() => {
    setHasUnsavedChanges(true);
    setLastActivityTime(Date.now());
  }, [objects]);

  // Help detection - repeated undos
  useEffect(() => {
    if (undoCount >= 3 && !showAIAssistant && !showHelpPrompt) {
      // User has undone 3+ times, they might be stuck
      setShowHelpPrompt(true);
      setUndoCount(0); // Reset counter
      
      // Auto-hide after 10 seconds
      if (helpPromptTimer.current) {
        clearTimeout(helpPromptTimer.current);
      }
      helpPromptTimer.current = setTimeout(() => {
        setShowHelpPrompt(false);
      }, 10000);
    }
  }, [undoCount, showAIAssistant, showHelpPrompt]);

  // Help detection - inactivity
  useEffect(() => {
    if (inactivityTimer.current) {
      clearTimeout(inactivityTimer.current);
    }
    
    // Show help prompt after 60 seconds of inactivity
    inactivityTimer.current = setTimeout(() => {
      if (!showAIAssistant && !showHelpPrompt) {
        setShowHelpPrompt(true);
        
        // Auto-hide after 10 seconds
        if (helpPromptTimer.current) {
          clearTimeout(helpPromptTimer.current);
        }
        helpPromptTimer.current = setTimeout(() => {
          setShowHelpPrompt(false);
        }, 10000);
      }
    }, 60000);
    
    return () => {
      if (inactivityTimer.current) {
        clearTimeout(inactivityTimer.current);
      }
    };
  }, [lastActivityTime, showAIAssistant, showHelpPrompt]);

  // Cleanup help prompt timer
  useEffect(() => {
    return () => {
      if (helpPromptTimer.current) {
        clearTimeout(helpPromptTimer.current);
      }
    };
  }, []);

  const saveCurrentSession = useCallback(() => {
    setIsSaving(true);
    const sessionData = {
      id: currentProject?.id || generateId(),
      name: currentProject?.name || "Untitled Project",
      objects,
      camera: {
        fov: 50,
        position: { x: 0, y: 0, z: cameraDistance },
        target: { x: 0, y: 0, z: 0 }
      },
      environment,
      createdAt: currentProject?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    const savedData = localStorage.getItem(STORAGE_KEY);
    const parsed = savedData ? JSON.parse(savedData) : { projects: [] };
    parsed.currentSession = sessionData;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
    
    setLastSaved(new Date());
    setHasUnsavedChanges(false);
    setIsSaving(false);
  }, [objects, environment, cameraDistance, currentProject]);

  const saveProject = () => {
    const project: Project = {
      id: currentProject?.id || generateId(),
      name: currentProject?.name || "Untitled Project",
      objects,
      camera: {
        fov: 50,
        position: { x: 0, y: 0, z: cameraDistance },
        target: { x: 0, y: 0, z: 0 }
      },
      environment,
      createdAt: currentProject?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    const updatedProjects = currentProject
      ? projects.map(p => p.id === currentProject.id ? project : p)
      : [...projects, project];
    
    setProjects(updatedProjects);
    setCurrentProject(project);
    
    // Save version
    const version: ProjectVersion = {
      id: generateId(),
      projectId: project.id,
      timestamp: new Date().toISOString(),
      description: `Version ${versions.filter(v => v.projectId === project.id).length + 1}`,
      objects: [...objects]
    };
    setVersions([...versions, version]);
    
    // Persist
    const savedData = localStorage.getItem(STORAGE_KEY);
    const parsed = savedData ? JSON.parse(savedData) : {};
    parsed.projects = updatedProjects;
    parsed.versions = [...versions, version];
    parsed.currentSession = null;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
    
    setLastSaved(new Date());
    setHasUnsavedChanges(false);
  };

  const loadProject = (project: Project) => {
    setCurrentProject(project);
    setObjects(project.objects);
    setEnvironment(project.environment);
    setShowProjectManager(false);
  };

  const restoreVersion = (version: ProjectVersion) => {
    setObjects(version.objects);
    setShowVersionHistory(false);
    setHasUnsavedChanges(true);
  };

  const recoverSession = () => {
    if (recoveryData) {
      setCurrentProject(recoveryData);
      setObjects(recoveryData.objects);
      setEnvironment(recoveryData.environment);
    }
    setShowRecoveryModal(false);
    setRecoveryData(null);
  };

  // ==================== HELPERS ====================
  const generateId = () => `obj-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  
  const selected = objects.find(o => o.id === selectedObject);

  // ==================== OBJECT OPERATIONS ====================
  const addObject = (type: SceneObject["type"]) => {
    const newObject: SceneObject = {
      id: generateId(),
      name: `${type.charAt(0).toUpperCase() + type.slice(1)}`,
      type,
      position: { x: 0, y: 0, z: 0 },
      rotation: { x: 0, y: 0, z: 0 },
      scale: { x: 1, y: 1, z: 1 },
      material: { ...defaultMaterial },
      visible: true,
      locked: false
    };
    
    // Save to history
    setHistory([...history.slice(0, historyIndex + 1), objects]);
    setHistoryIndex(historyIndex + 1);
    
    setObjects([...objects, newObject]);
    setSelectedObject(newObject.id);
  };

  const deleteSelected = () => {
    if (selectedObject) {
      setHistory([...history.slice(0, historyIndex + 1), objects]);
      setHistoryIndex(historyIndex + 1);
      setObjects(objects.filter(o => o.id !== selectedObject));
      setSelectedObject(null);
    }
  };

  const duplicateSelected = () => {
    if (selected) {
      const duplicate: SceneObject = {
        ...selected,
        id: generateId(),
        name: `${selected.name} Copy`,
        position: {
          x: selected.position.x + 0.5,
          y: selected.position.y,
          z: selected.position.z + 0.5
        }
      };
      setHistory([...history.slice(0, historyIndex + 1), objects]);
      setHistoryIndex(historyIndex + 1);
      setObjects([...objects, duplicate]);
      setSelectedObject(duplicate.id);
    }
  };

  const undo = () => {
    if (historyIndex >= 0) {
      setObjects(history[historyIndex]);
      setHistoryIndex(historyIndex - 1);
      
      // Track undo count for help detection
      setUndoCount(prev => prev + 1);
      setLastAction("undo");
      setLastActivityTime(Date.now());
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setObjects(history[historyIndex + 1]);
      setLastAction("redo");
      setLastActivityTime(Date.now());
    }
  };

  const updateObject = (id: string, updates: Partial<SceneObject>) => {
    setObjects(objects.map(o => o.id === id ? { ...o, ...updates } : o));
  };

  const updateTransform = (axis: "x" | "y" | "z", value: number, property: "position" | "rotation" | "scale") => {
    if (selected) {
      updateObject(selected.id, {
        [property]: { ...selected[property], [axis]: value }
      });
    }
  };

  const updateMaterial = (updates: Partial<SceneObject["material"]>) => {
    if (selected) {
      updateObject(selected.id, {
        material: { ...selected.material, ...updates }
      });
    }
  };

  // ==================== VIEWPORT CONTROLS ====================
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button === 1 || (e.button === 0 && e.altKey)) {
      isDragging.current = true;
      lastMousePos.current = { x: e.clientX, y: e.clientY };
    }
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (isDragging.current) {
      const deltaX = e.clientX - lastMousePos.current.x;
      const deltaY = e.clientY - lastMousePos.current.y;
      setCameraRotation(prev => ({
        x: Math.max(-90, Math.min(90, prev.x + deltaY * 0.5)),
        y: prev.y + deltaX * 0.5
      }));
      lastMousePos.current = { x: e.clientX, y: e.clientY };
    }
  }, []);

  const handleMouseUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  const handleWheel = (e: React.WheelEvent) => {
    setCameraDistance(prev => Math.max(2, Math.min(20, prev + e.deltaY * 0.01)));
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  const setView = (mode: ViewMode) => {
    setViewMode(mode);
    switch (mode) {
      case "top": setCameraRotation({ x: 90, y: 0 }); break;
      case "front": setCameraRotation({ x: 0, y: 0 }); break;
      case "right": setCameraRotation({ x: 0, y: 90 }); break;
      default: setCameraRotation({ x: 30, y: 45 });
    }
  };

  const resetCamera = () => {
    setCameraRotation({ x: 30, y: 45 });
    setCameraDistance(5);
    setCameraZoom(1);
  };

  // ==================== RENDERING ====================
  const renderScene = () => {
    setIsRendering(true);
    setRenderProgress(0);
    
    const interval = setInterval(() => {
      setRenderProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsRendering(false);
          setShowRenderResult(true);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 200);
  };

  // ==================== EXPORT ====================
  const exportProject = (format: "image" | "json" | "obj") => {
    const exportData = {
      name: currentProject?.name || "Untitled",
      objects,
      environment,
      exportedAt: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${exportData.name}.${format === "json" ? "json" : format}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // ==================== 3D PROJECTION ====================
  const project3D = (pos: { x: number; y: number; z: number }) => {
    const rotX = cameraRotation.x * Math.PI / 180;
    const rotY = cameraRotation.y * Math.PI / 180;
    
    const cosX = Math.cos(rotX);
    const sinX = Math.sin(rotX);
    const cosY = Math.cos(rotY);
    const sinY = Math.sin(rotY);
    
    const y1 = pos.y * cosX - pos.z * sinX;
    const z1 = pos.y * sinX + pos.z * cosX;
    const x2 = pos.x * cosY + z1 * sinY;
    
    const scale = (cameraDistance / (cameraDistance + z1)) * cameraZoom;
    
    return {
      x: 50 + x2 * 30 * scale,
      y: 50 - y1 * 30 * scale,
      scale: scale,
      z: z1
    };
  };

  // ==================== SIZE CALCULATIONS ====================
  const getWorkspaceHeight = () => {
    switch (workspaceSize) {
      case "fullscreen": return "h-screen";
      case "medium": return "h-[90vh]";
      default: return "h-[75vh]";
    }
  };

  const getPanelWidth = () => {
    switch (workspaceSize) {
      case "fullscreen": return "w-72";
      case "medium": return "w-64";
      default: return "w-56";
    }
  };

  const envGradient = environmentPresets.find(e => e.name === environment)?.bg || "from-gray-700 to-gray-900";

  // ==================== RENDER ====================
  return (
    <div className={`${getWorkspaceHeight()} flex flex-col bg-gray-900 rounded-2xl overflow-hidden`}>
      {/* ==================== TOP TOOLBAR ==================== */}
      <div className="bg-gray-800 border-b border-gray-700 px-4 py-2 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-2">
          {/* Project Name */}
          <div className="flex items-center gap-2 mr-4">
            <span className="text-orange-500 text-lg">🟠</span>
            <span className="text-white font-medium text-sm">
              {currentProject?.name || "Untitled Project"}
            </span>
            {hasUnsavedChanges && (
              <span className="text-yellow-400 text-xs">●</span>
            )}
          </div>

          <div className="w-px h-6 bg-gray-600" />

          {/* Quick Actions */}
          <button
            onClick={() => setShowProjectManager(true)}
            className="px-3 py-1.5 text-xs bg-gray-700 text-gray-300 rounded hover:bg-gray-600 transition-colors"
          >
            📁 Projects
          </button>
          <button
            onClick={saveProject}
            className="px-3 py-1.5 text-xs bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
          >
            💾 Save
          </button>
          <button
            onClick={undo}
            disabled={historyIndex < 0}
            className="p-1.5 text-sm bg-gray-700 text-gray-300 rounded hover:bg-gray-600 disabled:opacity-50"
          >
            ↶
          </button>
          <button
            onClick={redo}
            disabled={historyIndex >= history.length - 1}
            className="p-1.5 text-sm bg-gray-700 text-gray-300 rounded hover:bg-gray-600 disabled:opacity-50"
          >
            ↷
          </button>

          <div className="w-px h-6 bg-gray-600" />

          {/* Transform Tools */}
          {[
            { mode: "select" as ToolMode, icon: "🖱️", key: "Q" },
            { mode: "move" as ToolMode, icon: "✥", key: "G" },
            { mode: "rotate" as ToolMode, icon: "🔄", key: "R" },
            { mode: "scale" as ToolMode, icon: "⤢", key: "S" }
          ].map(tool => (
            <button
              key={tool.mode}
              onClick={() => setToolMode(tool.mode)}
              className={`p-2 rounded text-sm transition-colors ${
                toolMode === tool.mode
                  ? "bg-orange-500 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
              title={`${tool.mode} (${tool.key})`}
            >
              {tool.icon}
            </button>
          ))}

          <div className="w-px h-6 bg-gray-600" />

          {/* Add Primitives */}
          {(["cube", "sphere", "cylinder", "cone", "torus", "plane"] as const).map(type => (
            <button
              key={type}
              onClick={() => addObject(type)}
              className="p-2 bg-gray-700 text-gray-300 rounded hover:bg-gray-600 transition-colors text-sm"
              title={`Add ${type}`}
            >
              {primitiveIcons[type]}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          {/* Auto-save indicator */}
          {lastSaved && (
            <span className="text-gray-500 text-[10px] mr-2">
              {isSaving ? "Saving..." : `Saved ${lastSaved.toLocaleTimeString()}`}
            </span>
          )}

          {/* View Controls */}
          {(["perspective", "top", "front", "right"] as ViewMode[]).map(view => (
            <button
              key={view}
              onClick={() => setView(view)}
              className={`px-2 py-1 text-[10px] rounded capitalize ${
                viewMode === view
                  ? "bg-blue-500 text-white"
                  : "bg-gray-700 text-gray-400 hover:bg-gray-600"
              }`}
            >
              {view}
            </button>
          ))}

          <button
            onClick={resetCamera}
            className="p-1.5 bg-gray-700 text-gray-400 rounded hover:bg-gray-600 text-xs"
            title="Reset Camera"
          >
            🎯
          </button>

          <button onClick={renderScene} disabled={isRendering}
            className="px-4 py-1.5 bg-orange-500 text-white text-xs font-medium rounded hover:bg-orange-600 disabled:opacity-50"
          >
            {isRendering ? "Rendering..." : "🎬 Render"}
          </button>

          {/* AI Assistant Button */}
          <button 
            onClick={() => setShowAIAssistant(true)}
            className={`px-3 py-1.5 text-xs font-medium rounded transition-colors ${
              showAIAssistant 
                ? "bg-purple-500 text-white" 
                : "bg-purple-500/20 text-purple-400 hover:bg-purple-500/30"
            }`}
            title="AI Assistant"
          >
            🤖 AI Help
          </button>

          {/* Size Controls */}
          {onSizeChange && (
            <>
              <div className="w-px h-6 bg-gray-600" />
              <div className="flex items-center gap-1">
                {(["normal", "medium", "fullscreen"] as WorkspaceSize[]).map(size => (
                  <button
                    key={size}
                    onClick={() => onSizeChange(size)}
                    className={`px-2 py-1 text-[10px] rounded capitalize ${
                      workspaceSize === size
                        ? "bg-purple-500 text-white"
                        : "bg-gray-700 text-gray-400 hover:bg-gray-600"
                    }`}
                  >
                    {size === "fullscreen" ? "🖥️" : size}
                  </button>
                ))}
              </div>
            </>
          )}

          {onExit && workspaceSize === "fullscreen" && (
            <button
              onClick={onExit}
              className="px-3 py-1.5 bg-red-500/20 text-red-400 rounded text-xs hover:bg-red-500/30"
            >
              ✕ Exit
            </button>
          )}
        </div>
      </div>

      {/* ==================== MAIN CONTENT ==================== */}
      <div className="flex-1 flex overflow-hidden">
        {/* ==================== LEFT PANEL ==================== */}
        {!leftPanelCollapsed && (
          <div className={`${getPanelWidth()} bg-gray-800 border-r border-gray-700 flex flex-col flex-shrink-0`}>
            {/* Panel Tabs */}
            <div className="flex border-b border-gray-700">
              {[
                { id: "hierarchy" as PanelTab, label: "Scene", icon: "🌳" },
                { id: "properties" as PanelTab, label: "Props", icon: "⚙️" },
                { id: "materials" as PanelTab, label: "Mat", icon: "🎨" }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActivePanel(tab.id)}
                  className={`flex-1 py-2 text-[10px] font-medium transition-colors ${
                    activePanel === tab.id
                      ? "bg-gray-700 text-white border-b-2 border-orange-500"
                      : "text-gray-400 hover:text-gray-200"
                  }`}
                >
                  {tab.icon} {tab.label}
                </button>
              ))}
            </div>

            {/* Panel Content */}
            <div className="flex-1 overflow-y-auto p-3">
              {activePanel === "hierarchy" && (
                <div className="space-y-1">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-[10px] text-gray-400 font-medium">SCENE HIERARCHY</p>
                    <span className="text-[10px] text-gray-500">{objects.length} objects</span>
                  </div>
                  {objects.map(obj => (
                    <button
                      key={obj.id}
                      onClick={() => setSelectedObject(obj.id)}
                      className={`w-full flex items-center gap-2 px-2 py-1.5 rounded text-left transition-colors ${
                        selectedObject === obj.id
                          ? "bg-orange-500/20 text-orange-400 border border-orange-500/50"
                          : "text-gray-300 hover:bg-gray-700"
                      }`}
                    >
                      <span className="text-sm">{primitiveIcons[obj.type]}</span>
                      <span className="text-xs flex-1 truncate">{obj.name}</span>
                      {!obj.visible && <span className="text-[10px]">👁️‍🗨️</span>}
                      {obj.locked && <span className="text-[10px]">🔒</span>}
                    </button>
                  ))}
                  
                  {selected && (
                    <div className="flex gap-1 mt-3 pt-3 border-t border-gray-700">
                      <button onClick={duplicateSelected}
                        className="flex-1 py-1.5 bg-gray-700 text-gray-300 text-[10px] rounded hover:bg-gray-600"
                      >
                        📋 Duplicate
                      </button>
                      <button onClick={deleteSelected}
                        className="flex-1 py-1.5 bg-red-500/20 text-red-400 text-[10px] rounded hover:bg-red-500/30"
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  )}
                </div>
              )}

              {activePanel === "properties" && selected && (
                <div className="space-y-4">
                  <div>
                    <label className="text-[10px] text-gray-400 font-medium">NAME</label>
                    <input
                      type="text"
                      value={selected.name}
                      onChange={(e) => updateObject(selected.id, { name: e.target.value })}
                      className="w-full mt-1 px-2 py-1.5 bg-gray-700 border border-gray-600 rounded text-xs text-white"
                    />
                  </div>

                  {/* Position */}
                  <div>
                    <label className="text-[10px] text-gray-400 font-medium">POSITION</label>
                    <div className="grid grid-cols-3 gap-1 mt-1">
                      {(["x", "y", "z"] as const).map(axis => (
                        <div key={axis} className="flex items-center gap-1">
                          <span className={`text-[10px] font-bold ${
                            axis === "x" ? "text-red-400" : axis === "y" ? "text-green-400" : "text-blue-400"
                          }`}>{axis.toUpperCase()}</span>
                          <input
                            type="number"
                            step="0.1"
                            value={selected.position[axis]}
                            onChange={(e) => updateTransform(axis, parseFloat(e.target.value) || 0, "position")}
                            className="w-full px-1 py-1 bg-gray-700 border border-gray-600 rounded text-[10px] text-white"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Rotation */}
                  <div>
                    <label className="text-[10px] text-gray-400 font-medium">ROTATION</label>
                    <div className="grid grid-cols-3 gap-1 mt-1">
                      {(["x", "y", "z"] as const).map(axis => (
                        <div key={axis} className="flex items-center gap-1">
                          <span className={`text-[10px] font-bold ${
                            axis === "x" ? "text-red-400" : axis === "y" ? "text-green-400" : "text-blue-400"
                          }`}>{axis.toUpperCase()}</span>
                          <input
                            type="number"
                            step="5"
                            value={selected.rotation[axis]}
                            onChange={(e) => updateTransform(axis, parseFloat(e.target.value) || 0, "rotation")}
                            className="w-full px-1 py-1 bg-gray-700 border border-gray-600 rounded text-[10px] text-white"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Scale */}
                  <div>
                    <label className="text-[10px] text-gray-400 font-medium">SCALE</label>
                    <div className="grid grid-cols-3 gap-1 mt-1">
                      {(["x", "y", "z"] as const).map(axis => (
                        <div key={axis} className="flex items-center gap-1">
                          <span className={`text-[10px] font-bold ${
                            axis === "x" ? "text-red-400" : axis === "y" ? "text-green-400" : "text-blue-400"
                          }`}>{axis.toUpperCase()}</span>
                          <input
                            type="number"
                            step="0.1"
                            value={selected.scale[axis]}
                            onChange={(e) => updateTransform(axis, parseFloat(e.target.value) || 1, "scale")}
                            className="w-full px-1 py-1 bg-gray-700 border border-gray-600 rounded text-[10px] text-white"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activePanel === "materials" && selected && (
                <div className="space-y-4">
                  <div>
                    <label className="text-[10px] text-gray-400 font-medium">COLOR</label>
                    <div className="flex gap-2 mt-1">
                      <input
                        type="color"
                        value={selected.material.color}
                        onChange={(e) => updateMaterial({ color: e.target.value })}
                        className="w-10 h-8 rounded cursor-pointer"
                      />
                      <input
                        type="text"
                        value={selected.material.color}
                        onChange={(e) => updateMaterial({ color: e.target.value })}
                        className="flex-1 px-2 py-1 bg-gray-700 border border-gray-600 rounded text-[10px] text-white font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between">
                      <label className="text-[10px] text-gray-400 font-medium">ROUGHNESS</label>
                      <span className="text-[10px] text-gray-500">{selected.material.roughness.toFixed(2)}</span>
                    </div>
                    <input
                      type="range" min="0" max="1" step="0.01"
                      value={selected.material.roughness}
                      onChange={(e) => updateMaterial({ roughness: parseFloat(e.target.value) })}
                      className="w-full mt-1"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between">
                      <label className="text-[10px] text-gray-400 font-medium">METALLIC</label>
                      <span className="text-[10px] text-gray-500">{selected.material.metallic.toFixed(2)}</span>
                    </div>
                    <input
                      type="range" min="0" max="1" step="0.01"
                      value={selected.material.metallic}
                      onChange={(e) => updateMaterial({ metallic: parseFloat(e.target.value) })}
                      className="w-full mt-1"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-gray-400 font-medium mb-2 block">PRESETS</label>
                    <div className="grid grid-cols-3 gap-1">
                      {presetMaterials.map(preset => (
                        <button
                          key={preset.name}
                          onClick={() => updateMaterial({
                            color: preset.color,
                            roughness: preset.roughness,
                            metallic: preset.metallic
                          })}
                          className="p-2 rounded hover:bg-gray-700 transition-colors"
                          title={preset.name}
                        >
                          <div
                            className="w-full aspect-square rounded-full border-2 border-gray-600 hover:border-orange-500"
                            style={{ background: preset.color }}
                          />
                          <p className="text-[8px] text-gray-400 text-center mt-1">{preset.name}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {!selected && activePanel !== "hierarchy" && (
                <div className="flex flex-col items-center justify-center h-32 text-gray-500">
                  <span className="text-2xl mb-2">🖱️</span>
                  <p className="text-xs">Select an object</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Collapse Left Panel Button */}
        <button
          onClick={() => setLeftPanelCollapsed(!leftPanelCollapsed)}
          className="w-4 bg-gray-700 hover:bg-gray-600 flex items-center justify-center text-gray-400 text-[10px]"
        >
          {leftPanelCollapsed ? "▶" : "◀"}
        </button>

        {/* ==================== CENTER VIEWPORT ==================== */}
        <div className="flex-1 flex flex-col min-w-0">
          <div
            ref={viewportRef}
            className={`flex-1 relative bg-gradient-to-b ${envGradient} cursor-grab active:cursor-grabbing overflow-hidden`}
            onMouseDown={handleMouseDown}
            onWheel={handleWheel}
          >
            {/* Grid */}
            {showGrid && (
              <div className="absolute inset-0 pointer-events-none opacity-20">
                <svg className="w-full h-full">
                  <defs>
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
              </div>
            )}

            {/* 3D Objects */}
            <div className="absolute inset-0">
              {objects.filter(o => o.visible).map(obj => {
                const projected = project3D(obj.position);
                const isSelected = selectedObject === obj.id;
                const size = 40 * obj.scale.x * projected.scale;
                
                return (
                  <div
                    key={obj.id}
                    onClick={() => setSelectedObject(obj.id)}
                    className={`absolute cursor-pointer transition-all ${
                      isSelected ? "ring-2 ring-orange-500 ring-offset-2 ring-offset-transparent" : ""
                    }`}
                    style={{
                      left: `${projected.x}%`,
                      top: `${projected.y}%`,
                      transform: `translate(-50%, -50%) rotate(${obj.rotation.z}deg)`,
                      zIndex: Math.floor(1000 - projected.z * 100)
                    }}
                  >
                    <div
                      className={`flex items-center justify-center transition-all ${showWireframe ? "border-2" : ""}`}
                      style={{
                        width: size,
                        height: size,
                        background: showWireframe ? "transparent" : obj.material.color,
                        borderColor: obj.material.color,
                        borderRadius: obj.type === "sphere" ? "50%" : obj.type === "cylinder" ? "20%" : "8px",
                        opacity: obj.material.opacity,
                        boxShadow: isSelected 
                          ? `0 0 20px ${obj.material.color}50`
                          : obj.material.metallic > 0.5 
                            ? `0 2px 10px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.3)`
                            : "0 2px 10px rgba(0,0,0,0.2)"
                      }}
                    >
                      {obj.type === "light" && <span className="text-2xl">💡</span>}
                      {obj.type === "camera" && <span className="text-2xl">📷</span>}
                    </div>
                    
                    {isSelected && (
                      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap">
                        <span className="px-2 py-0.5 bg-orange-500 text-white text-[10px] rounded">
                          {obj.name}
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Axis Gizmo */}
            <div className="absolute bottom-4 left-4 w-16 h-16 bg-black/30 rounded-lg p-2">
              <svg viewBox="0 0 50 50" className="w-full h-full">
                <line x1="25" y1="25" x2="45" y2="25" stroke="#FF4444" strokeWidth="2" />
                <text x="47" y="28" fill="#FF4444" fontSize="8">X</text>
                <line x1="25" y1="25" x2="25" y2="5" stroke="#44FF44" strokeWidth="2" />
                <text x="22" y="3" fill="#44FF44" fontSize="8">Y</text>
                <line x1="25" y1="25" x2="10" y2="40" stroke="#4444FF" strokeWidth="2" />
                <text x="5" y="45" fill="#4444FF" fontSize="8">Z</text>
              </svg>
            </div>

            {/* Viewport Controls */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              <div className="bg-black/50 rounded-lg p-2 space-y-1">
                <p className="text-white/60 text-[10px]">View: {viewMode}</p>
                <p className="text-white/60 text-[10px]">Objects: {objects.length}</p>
                <p className="text-white/60 text-[10px]">Selected: {selected?.name || "None"}</p>
              </div>
              <div className="flex gap-1">
                <button
                  onClick={() => setCameraZoom(z => Math.min(3, z + 0.2))}
                  className="p-1.5 bg-black/50 text-white rounded text-xs hover:bg-black/70"
                >
                  +
                </button>
                <button
                  onClick={() => setCameraZoom(z => Math.max(0.5, z - 0.2))}
                  className="p-1.5 bg-black/50 text-white rounded text-xs hover:bg-black/70"
                >
                  -
                </button>
              </div>
            </div>

            {/* Tool Mode */}
            <div className="absolute top-4 right-4">
              <span className="px-2 py-1 bg-black/30 text-white text-[10px] rounded">
                {toolMode.charAt(0).toUpperCase() + toolMode.slice(1)}
              </span>
            </div>

            {/* Rendering Overlay */}
            {isRendering && (
              <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center">
                <div className="text-4xl mb-4 animate-pulse">🎬</div>
                <p className="text-white font-medium mb-2">Rendering Scene...</p>
                <div className="w-64 h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-orange-500 transition-all" style={{ width: `${Math.min(renderProgress, 100)}%` }} />
                </div>
                <p className="text-gray-400 text-sm mt-2">{Math.floor(renderProgress)}%</p>
              </div>
            )}
          </div>

          {/* Bottom Panel */}
          <div className={`bg-gray-800 border-t border-gray-700 transition-all ${bottomPanelCollapsed ? "h-10" : "h-32"}`}>
            <div className="flex items-center justify-between px-4 h-10 border-b border-gray-700">
              <div className="flex items-center gap-4">
                <span className="text-gray-400 text-xs">Environment:</span>
                {environmentPresets.map(env => (
                  <button
                    key={env.name}
                    onClick={() => setEnvironment(env.name)}
                    className={`px-2 py-1 rounded text-[10px] ${
                      environment === env.name ? "bg-orange-500 text-white" : "bg-gray-700 text-gray-400 hover:bg-gray-600"
                    }`}
                  >
                    {env.icon} {env.name}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowGrid(!showGrid)}
                  className={`p-1.5 rounded text-xs ${showGrid ? "bg-blue-500 text-white" : "bg-gray-700 text-gray-400"}`}
                >
                  #
                </button>
                <button
                  onClick={() => setShowWireframe(!showWireframe)}
                  className={`p-1.5 rounded text-xs ${showWireframe ? "bg-blue-500 text-white" : "bg-gray-700 text-gray-400"}`}
                >
                  ◇
                </button>
                <button
                  onClick={() => setBottomPanelCollapsed(!bottomPanelCollapsed)}
                  className="p-1.5 rounded text-xs bg-gray-700 text-gray-400 hover:bg-gray-600"
                >
                  {bottomPanelCollapsed ? "▲" : "▼"}
                </button>
              </div>
            </div>
            {!bottomPanelCollapsed && (
              <div className="p-3">
                <p className="text-gray-400 text-xs mb-2">Timeline / Object Info</p>
                <div className="h-14 bg-gray-700 rounded flex items-center justify-center text-gray-500 text-xs">
                  Animation Timeline (coming soon)
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Collapse Right Panel Button */}
        <button
          onClick={() => setRightPanelCollapsed(!rightPanelCollapsed)}
          className="w-4 bg-gray-700 hover:bg-gray-600 flex items-center justify-center text-gray-400 text-[10px]"
        >
          {rightPanelCollapsed ? "◀" : "▶"}
        </button>

        {/* ==================== RIGHT PANEL ==================== */}
        {!rightPanelCollapsed && (
          <div className={`${getPanelWidth()} bg-gray-800 border-l border-gray-700 flex flex-col flex-shrink-0`}>
            <div className="p-3 border-b border-gray-700">
              <p className="text-[10px] text-gray-400 font-medium mb-2">QUICK ACTIONS</p>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setShowVersionHistory(true)}
                  className="p-2 bg-gray-700 rounded text-xs text-gray-300 hover:bg-gray-600"
                >
                  📜 Versions
                </button>
                <button
                  onClick={() => exportProject("json")}
                  className="p-2 bg-gray-700 rounded text-xs text-gray-300 hover:bg-gray-600"
                >
                  📤 Export
                </button>
              </div>
            </div>

            <div className="p-3 border-b border-gray-700">
              <p className="text-[10px] text-gray-400 font-medium mb-2">ADD OBJECTS</p>
              <div className="grid grid-cols-3 gap-1">
                {(["cube", "sphere", "cylinder", "cone", "torus", "plane"] as const).map(type => (
                  <button
                    key={type}
                    onClick={() => addObject(type)}
                    className="p-2 bg-gray-700 rounded hover:bg-gray-600 flex flex-col items-center gap-1"
                  >
                    <span className="text-lg">{primitiveIcons[type]}</span>
                    <span className="text-[8px] text-gray-400 capitalize">{type}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-3">
              <p className="text-[10px] text-gray-400 font-medium mb-2">SHORTCUTS</p>
              <div className="space-y-1 text-[10px] text-gray-500">
                <p><kbd className="px-1 bg-gray-700 rounded">G</kbd> Move</p>
                <p><kbd className="px-1 bg-gray-700 rounded">R</kbd> Rotate</p>
                <p><kbd className="px-1 bg-gray-700 rounded">S</kbd> Scale</p>
                <p><kbd className="px-1 bg-gray-700 rounded">X</kbd> Delete</p>
                <p><kbd className="px-1 bg-gray-700 rounded">D</kbd> Duplicate</p>
                <p><kbd className="px-1 bg-gray-700 rounded">Ctrl+Z</kbd> Undo</p>
                <p><kbd className="px-1 bg-gray-700 rounded">Ctrl+S</kbd> Save</p>
                <p><kbd className="px-1 bg-gray-700 rounded">Alt+Drag</kbd> Orbit</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ==================== MODALS ==================== */}
      {/* Project Manager Modal */}
      {showProjectManager && (
        <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-2xl w-[600px] max-h-[80vh] overflow-hidden">
            <div className="p-4 border-b border-gray-700 flex items-center justify-between">
              <h3 className="text-white font-bold text-lg">📁 Project Manager</h3>
              <button onClick={() => setShowProjectManager(false)} className="text-gray-400 hover:text-white">✕</button>
            </div>
            <div className="p-4">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <button
                  onClick={() => {
                    setCurrentProject(null);
                    setObjects([{
                      id: generateId(),
                      name: "Cube",
                      type: "cube",
                      position: { x: 0, y: 0, z: 0 },
                      rotation: { x: 0, y: 0, z: 0 },
                      scale: { x: 1, y: 1, z: 1 },
                      material: { ...defaultMaterial },
                      visible: true,
                      locked: false
                    }]);
                    setShowProjectManager(false);
                  }}
                  className="p-4 bg-orange-500/20 border border-orange-500/50 rounded-xl text-left hover:bg-orange-500/30"
                >
                  <span className="text-2xl">➕</span>
                  <p className="text-white font-medium mt-2">New Project</p>
                  <p className="text-gray-400 text-xs">Start fresh</p>
                </button>
                <button className="p-4 bg-gray-700/50 border border-gray-600 rounded-xl text-left hover:bg-gray-700">
                  <span className="text-2xl">📂</span>
                  <p className="text-white font-medium mt-2">Import Project</p>
                  <p className="text-gray-400 text-xs">Load from file</p>
                </button>
              </div>
              
              <p className="text-gray-400 text-sm mb-2">Recent Projects ({projects.length})</p>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {projects.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">No saved projects yet</p>
                ) : (
                  projects.map(project => (
                    <button
                      key={project.id}
                      onClick={() => loadProject(project)}
                      className="w-full p-3 bg-gray-700/50 rounded-lg text-left hover:bg-gray-700 flex items-center gap-3"
                    >
                      <div className="w-12 h-12 bg-gray-600 rounded-lg flex items-center justify-center">
                        <span className="text-xl">📦</span>
                      </div>
                      <div className="flex-1">
                        <p className="text-white font-medium">{project.name}</p>
                        <p className="text-gray-400 text-xs">
                          {project.objects.length} objects · Last edited {new Date(project.updatedAt).toLocaleDateString()}
                        </p>
                      </div>
                    </button>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Version History Modal */}
      {showVersionHistory && (
        <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-2xl w-[500px] max-h-[70vh] overflow-hidden">
            <div className="p-4 border-b border-gray-700 flex items-center justify-between">
              <h3 className="text-white font-bold text-lg">📜 Version History</h3>
              <button onClick={() => setShowVersionHistory(false)} className="text-gray-400 hover:text-white">✕</button>
            </div>
            <div className="p-4 max-h-80 overflow-y-auto">
              {versions.filter(v => v.projectId === currentProject?.id).length === 0 ? (
                <p className="text-gray-500 text-center py-8">No versions saved yet</p>
              ) : (
                <div className="space-y-2">
                  {versions
                    .filter(v => v.projectId === currentProject?.id)
                    .reverse()
                    .map((version, i) => (
                      <div
                        key={version.id}
                        className="p-3 bg-gray-700/50 rounded-lg flex items-center justify-between"
                      >
                        <div>
                          <p className="text-white font-medium">{version.description}</p>
                          <p className="text-gray-400 text-xs">
                            {new Date(version.timestamp).toLocaleString()} · {version.objects.length} objects
                          </p>
                        </div>
                        <button
                          onClick={() => restoreVersion(version)}
                          className="px-3 py-1.5 bg-blue-500 text-white text-xs rounded hover:bg-blue-600"
                        >
                          Restore
                        </button>
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Session Recovery Modal */}
      {showRecoveryModal && recoveryData && (
        <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-2xl w-[400px] p-6">
            <div className="text-center mb-4">
              <span className="text-4xl">💾</span>
              <h3 className="text-white font-bold text-lg mt-2">Session Recovery</h3>
              <p className="text-gray-400 text-sm mt-1">
                Your previous project was automatically saved. Continue working?
              </p>
            </div>
            <div className="p-3 bg-gray-700 rounded-lg mb-4">
              <p className="text-white font-medium">{recoveryData.name}</p>
              <p className="text-gray-400 text-xs">
                {recoveryData.objects.length} objects · Last edited {new Date(recoveryData.updatedAt).toLocaleString()}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setShowRecoveryModal(false);
                  setRecoveryData(null);
                }}
                className="flex-1 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600"
              >
                Discard
              </button>
              <button
                onClick={recoverSession}
                className="flex-1 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Render Result Modal */}
      {showRenderResult && (
        <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-2xl max-w-2xl w-full mx-4 overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-gray-700">
              <h3 className="text-white font-bold">🎬 Render Complete</h3>
              <button onClick={() => setShowRenderResult(false)} className="text-gray-400 hover:text-white">✕</button>
            </div>
            <div className={`aspect-video bg-gradient-to-b ${envGradient} flex items-center justify-center`}>
              <div className="flex gap-4">
                {objects.slice(0, 5).map(obj => (
                  <div
                    key={obj.id}
                    className="w-16 h-16 flex items-center justify-center rounded"
                    style={{
                      background: obj.material.color,
                      borderRadius: obj.type === "sphere" ? "50%" : "8px"
                    }}
                  />
                ))}
              </div>
            </div>
            <div className="p-4 flex gap-2">
              <button onClick={() => setShowRenderResult(false)}
                className="flex-1 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600"
              >
                Close
              </button>
              <button onClick={() => exportProject("image")}
                className="flex-1 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                📥 Download PNG
              </button>
              <button className="flex-1 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">
                📤 Share
              </button>
            </div>
          </div>
        </div>
      )}

      {/* AI Assistant Floating Button */}
      {!showAIAssistant && (
        <BlenderAIFloatingButton
          onClick={() => {
            setShowAIAssistant(true);
            setShowHelpPrompt(false);
          }}
          showHelpPrompt={showHelpPrompt}
          onHelpPromptDismiss={() => setShowHelpPrompt(false)}
        />
      )}

      {/* AI Assistant Panel */}
      <BlenderAIAssistant
        isOpen={showAIAssistant}
        onClose={() => setShowAIAssistant(false)}
        currentObject={selected?.type}
        currentTool={toolMode}
        objectCount={objects.length}
        undoCount={undoCount}
        lastAction={lastAction}
        onSuggestionClick={(suggestion) => {
          console.log("AI suggestion:", suggestion);
          // Could implement automatic actions based on suggestions
        }}
      />
    </div>
  );
};

export default Blender3DWorkspacePro;
