import React, { useState, useRef, useEffect, useCallback } from "react";

// Types for our 3D workspace
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

interface LightObject extends SceneObject {
  lightType: "point" | "directional" | "ambient" | "spot";
  intensity: number;
  lightColor: string;
}

interface CameraSettings {
  fov: number;
  position: { x: number; y: number; z: number };
  target: { x: number; y: number; z: number };
}

interface Project {
  id: string;
  name: string;
  objects: SceneObject[];
  camera: CameraSettings;
  environment: string;
  createdAt: Date;
}

type ToolMode = "select" | "move" | "rotate" | "scale" | "extrude" | "inset";
type ViewMode = "perspective" | "top" | "front" | "right";

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
  { name: "Ceramic", color: "#FFFAFA", roughness: 0.3, metallic: 0.1 },
  { name: "Carbon", color: "#1C1C1C", roughness: 0.4, metallic: 0.8 }
];

const environmentPresets = [
  { name: "Studio", icon: "🏠", bg: "from-gray-700 to-gray-900" },
  { name: "Outdoor", icon: "🌳", bg: "from-blue-400 to-green-400" },
  { name: "Sunset", icon: "🌅", bg: "from-orange-500 to-purple-600" },
  { name: "Night", icon: "🌙", bg: "from-indigo-900 to-black" },
  { name: "Industrial", icon: "🏭", bg: "from-gray-600 to-gray-800" },
  { name: "Abstract", icon: "🎨", bg: "from-pink-500 to-cyan-500" }
];

const Blender3DWorkspace: React.FC = () => {
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
  const [activePanel, setActivePanel] = useState<"hierarchy" | "properties" | "materials" | "lighting">("hierarchy");
  const [isRendering, setIsRendering] = useState(false);
  const [renderProgress, setRenderProgress] = useState(0);
  const [showRenderResult, setShowRenderResult] = useState(false);
  
  // Camera state for viewport navigation
  const [cameraRotation, setCameraRotation] = useState({ x: 30, y: 45 });
  const [cameraDistance, setCameraDistance] = useState(5);
  const viewportRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const lastMousePos = useRef({ x: 0, y: 0 });

  // Project state
  const [projects, setProjects] = useState<Project[]>([]);
  const [currentProjectName, setCurrentProjectName] = useState("Untitled Project");
  const [showSaveModal, setShowSaveModal] = useState(false);

  // Get selected object
  const selected = objects.find(o => o.id === selectedObject);

  // Generate unique ID
  const generateId = () => `obj-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  // Add new object
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
    setObjects([...objects, newObject]);
    setSelectedObject(newObject.id);
  };

  // Add light
  const addLight = (lightType: LightObject["lightType"]) => {
    const newLight: SceneObject = {
      id: generateId(),
      name: `${lightType.charAt(0).toUpperCase() + lightType.slice(1)} Light`,
      type: "light",
      position: { x: 2, y: 3, z: 2 },
      rotation: { x: 0, y: 0, z: 0 },
      scale: { x: 1, y: 1, z: 1 },
      material: { color: "#FFFFFF", roughness: 0, metallic: 0, opacity: 1 },
      visible: true,
      locked: false
    };
    setObjects([...objects, newLight]);
    setSelectedObject(newLight.id);
  };

  // Delete selected object
  const deleteSelected = () => {
    if (selectedObject) {
      setObjects(objects.filter(o => o.id !== selectedObject));
      setSelectedObject(null);
    }
  };

  // Duplicate selected object
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
      setObjects([...objects, duplicate]);
      setSelectedObject(duplicate.id);
    }
  };

  // Update object property
  const updateObject = (id: string, updates: Partial<SceneObject>) => {
    setObjects(objects.map(o => o.id === id ? { ...o, ...updates } : o));
  };

  // Update object transform
  const updateTransform = (axis: "x" | "y" | "z", value: number, property: "position" | "rotation" | "scale") => {
    if (selected) {
      updateObject(selected.id, {
        [property]: { ...selected[property], [axis]: value }
      });
    }
  };

  // Update material
  const updateMaterial = (updates: Partial<SceneObject["material"]>) => {
    if (selected) {
      updateObject(selected.id, {
        material: { ...selected.material, ...updates }
      });
    }
  };

  // Apply preset material
  const applyPresetMaterial = (preset: typeof presetMaterials[0]) => {
    if (selected) {
      updateObject(selected.id, {
        material: {
          color: preset.color,
          roughness: preset.roughness,
          metallic: preset.metallic,
          opacity: 1
        }
      });
    }
  };

  // Viewport mouse handlers
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

  // Set view mode
  const setView = (mode: ViewMode) => {
    setViewMode(mode);
    switch (mode) {
      case "top":
        setCameraRotation({ x: 90, y: 0 });
        break;
      case "front":
        setCameraRotation({ x: 0, y: 0 });
        break;
      case "right":
        setCameraRotation({ x: 0, y: 90 });
        break;
      default:
        setCameraRotation({ x: 30, y: 45 });
    }
  };

  // Render scene
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

  // Save project
  const saveProject = () => {
    const project: Project = {
      id: generateId(),
      name: currentProjectName,
      objects,
      camera: {
        fov: 50,
        position: { x: 0, y: 0, z: cameraDistance },
        target: { x: 0, y: 0, z: 0 }
      },
      environment,
      createdAt: new Date()
    };
    setProjects([...projects, project]);
    setShowSaveModal(false);
  };

  // Get environment gradient
  const envGradient = environmentPresets.find(e => e.name === environment)?.bg || "from-gray-700 to-gray-900";

  // Calculate 3D object position for CSS transform (simplified projection)
  const project3D = (pos: { x: number; y: number; z: number }) => {
    const rotX = cameraRotation.x * Math.PI / 180;
    const rotY = cameraRotation.y * Math.PI / 180;
    
    // Simple rotation transform
    const cosX = Math.cos(rotX);
    const sinX = Math.sin(rotX);
    const cosY = Math.cos(rotY);
    const sinY = Math.sin(rotY);
    
    const y1 = pos.y * cosX - pos.z * sinX;
    const z1 = pos.y * sinX + pos.z * cosX;
    const x2 = pos.x * cosY + z1 * sinY;
    
    const scale = cameraDistance / (cameraDistance + z1);
    
    return {
      x: 50 + x2 * 30 * scale,
      y: 50 - y1 * 30 * scale,
      scale: scale,
      z: z1
    };
  };

  return (
    <div className="h-[85vh] flex flex-col bg-gray-900 rounded-2xl overflow-hidden">
      {/* Top Toolbar */}
      <div className="bg-gray-800 border-b border-gray-700 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-4">
          {/* File Operations */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => setShowSaveModal(true)}
              className="px-3 py-1.5 text-xs bg-gray-700 text-gray-300 rounded hover:bg-gray-600 transition-colors"
            >
              💾 Save
            </button>
            <button className="px-3 py-1.5 text-xs bg-gray-700 text-gray-300 rounded hover:bg-gray-600 transition-colors">
              📂 Open
            </button>
            <button className="px-3 py-1.5 text-xs bg-gray-700 text-gray-300 rounded hover:bg-gray-600 transition-colors">
              📤 Export
            </button>
          </div>

          <div className="w-px h-6 bg-gray-600" />

          {/* Transform Tools */}
          <div className="flex items-center gap-1">
            {[
              { mode: "select" as ToolMode, icon: "🖱️", label: "Select" },
              { mode: "move" as ToolMode, icon: "✥", label: "Move (G)" },
              { mode: "rotate" as ToolMode, icon: "🔄", label: "Rotate (R)" },
              { mode: "scale" as ToolMode, icon: "⤢", label: "Scale (S)" }
            ].map(tool => (
              <button
                key={tool.mode}
                onClick={() => setToolMode(tool.mode)}
                className={`p-2 rounded text-sm transition-colors ${
                  toolMode === tool.mode
                    ? "bg-orange-500 text-white"
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                }`}
                title={tool.label}
              >
                {tool.icon}
              </button>
            ))}
          </div>

          <div className="w-px h-6 bg-gray-600" />

          {/* Add Objects */}
          <div className="flex items-center gap-1">
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

          <div className="w-px h-6 bg-gray-600" />

          {/* Add Lights */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => addLight("point")}
              className="p-2 bg-gray-700 text-gray-300 rounded hover:bg-gray-600 transition-colors text-sm"
              title="Point Light"
            >
              💡
            </button>
            <button
              onClick={() => addLight("directional")}
              className="p-2 bg-gray-700 text-gray-300 rounded hover:bg-gray-600 transition-colors text-sm"
              title="Sun Light"
            >
              ☀️
            </button>
            <button
              onClick={() => addLight("ambient")}
              className="p-2 bg-gray-700 text-gray-300 rounded hover:bg-gray-600 transition-colors text-sm"
              title="Ambient Light"
            >
              🌐
            </button>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* View Options */}
          <div className="flex items-center gap-1">
            {(["perspective", "top", "front", "right"] as ViewMode[]).map(view => (
              <button
                key={view}
                onClick={() => setView(view)}
                className={`px-2 py-1 text-[10px] rounded transition-colors capitalize ${
                  viewMode === view
                    ? "bg-blue-500 text-white"
                    : "bg-gray-700 text-gray-400 hover:bg-gray-600"
                }`}
              >
                {view}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowGrid(!showGrid)}
              className={`p-1.5 rounded text-xs ${showGrid ? "bg-blue-500 text-white" : "bg-gray-700 text-gray-400"}`}
              title="Toggle Grid"
            >
              #
            </button>
            <button
              onClick={() => setShowWireframe(!showWireframe)}
              className={`p-1.5 rounded text-xs ${showWireframe ? "bg-blue-500 text-white" : "bg-gray-700 text-gray-400"}`}
              title="Wireframe"
            >
              ◇
            </button>
          </div>

          <button
            onClick={renderScene}
            disabled={isRendering}
            className="px-4 py-1.5 bg-orange-500 text-white text-xs font-medium rounded hover:bg-orange-600 transition-colors disabled:opacity-50"
          >
            {isRendering ? "Rendering..." : "🎬 Render"}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Left Panel - Hierarchy & Properties */}
        <div className="w-64 bg-gray-800 border-r border-gray-700 flex flex-col">
          {/* Panel Tabs */}
          <div className="flex border-b border-gray-700">
            {[
              { id: "hierarchy" as const, label: "Scene", icon: "🌳" },
              { id: "properties" as const, label: "Props", icon: "⚙️" },
              { id: "materials" as const, label: "Mat", icon: "🎨" }
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
                    {!obj.visible && <span className="text-gray-500 text-[10px]">👁️‍🗨️</span>}
                    {obj.locked && <span className="text-gray-500 text-[10px]">🔒</span>}
                  </button>
                ))}
                
                {/* Quick Actions */}
                {selected && (
                  <div className="flex gap-1 mt-3 pt-3 border-t border-gray-700">
                    <button
                      onClick={duplicateSelected}
                      className="flex-1 py-1.5 bg-gray-700 text-gray-300 text-[10px] rounded hover:bg-gray-600"
                    >
                      📋 Duplicate
                    </button>
                    <button
                      onClick={deleteSelected}
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
                {/* Object Name */}
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
                  <label className="text-[10px] text-gray-400 font-medium">ROTATION (degrees)</label>
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

                {/* Visibility & Lock */}
                <div className="flex gap-2">
                  <button
                    onClick={() => updateObject(selected.id, { visible: !selected.visible })}
                    className={`flex-1 py-1.5 rounded text-[10px] font-medium ${
                      selected.visible ? "bg-blue-500/20 text-blue-400" : "bg-gray-700 text-gray-400"
                    }`}
                  >
                    {selected.visible ? "👁️ Visible" : "👁️‍🗨️ Hidden"}
                  </button>
                  <button
                    onClick={() => updateObject(selected.id, { locked: !selected.locked })}
                    className={`flex-1 py-1.5 rounded text-[10px] font-medium ${
                      selected.locked ? "bg-amber-500/20 text-amber-400" : "bg-gray-700 text-gray-400"
                    }`}
                  >
                    {selected.locked ? "🔒 Locked" : "🔓 Unlocked"}
                  </button>
                </div>
              </div>
            )}

            {activePanel === "materials" && selected && (
              <div className="space-y-4">
                {/* Color */}
                <div>
                  <label className="text-[10px] text-gray-400 font-medium">BASE COLOR</label>
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

                {/* Roughness */}
                <div>
                  <div className="flex justify-between">
                    <label className="text-[10px] text-gray-400 font-medium">ROUGHNESS</label>
                    <span className="text-[10px] text-gray-500">{selected.material.roughness.toFixed(2)}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={selected.material.roughness}
                    onChange={(e) => updateMaterial({ roughness: parseFloat(e.target.value) })}
                    className="w-full mt-1"
                  />
                </div>

                {/* Metallic */}
                <div>
                  <div className="flex justify-between">
                    <label className="text-[10px] text-gray-400 font-medium">METALLIC</label>
                    <span className="text-[10px] text-gray-500">{selected.material.metallic.toFixed(2)}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={selected.material.metallic}
                    onChange={(e) => updateMaterial({ metallic: parseFloat(e.target.value) })}
                    className="w-full mt-1"
                  />
                </div>

                {/* Preset Materials */}
                <div>
                  <label className="text-[10px] text-gray-400 font-medium mb-2 block">PRESETS</label>
                  <div className="grid grid-cols-4 gap-1">
                    {presetMaterials.map(preset => (
                      <button
                        key={preset.name}
                        onClick={() => applyPresetMaterial(preset)}
                        className="p-2 rounded hover:bg-gray-700 transition-colors group"
                        title={preset.name}
                      >
                        <div
                          className="w-full aspect-square rounded-full mx-auto border-2 border-gray-600 group-hover:border-orange-500"
                          style={{ background: preset.color }}
                        />
                        <p className="text-[8px] text-gray-400 text-center mt-1 truncate">{preset.name}</p>
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

        {/* 3D Viewport */}
        <div className="flex-1 flex flex-col">
          {/* Viewport */}
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

            {/* 3D Objects (CSS-based visualization) */}
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
                    {/* Object Visualization */}
                    <div
                      className={`flex items-center justify-center transition-all ${
                        showWireframe ? "border-2" : ""
                      }`}
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
                      {obj.type === "light" && (
                        <span className="text-2xl">💡</span>
                      )}
                      {obj.type === "camera" && (
                        <span className="text-2xl">📷</span>
                      )}
                    </div>
                    
                    {/* Object Label */}
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

            {/* Viewport Info */}
            <div className="absolute top-4 left-4 text-white/60 text-[10px] space-y-1">
              <p>View: {viewMode}</p>
              <p>Objects: {objects.length}</p>
              <p>Selected: {selected?.name || "None"}</p>
            </div>

            {/* Tool Info */}
            <div className="absolute top-4 right-4">
              <span className="px-2 py-1 bg-black/30 text-white text-[10px] rounded">
                Tool: {toolMode.charAt(0).toUpperCase() + toolMode.slice(1)}
              </span>
            </div>

            {/* Rendering Overlay */}
            {isRendering && (
              <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center">
                <div className="text-4xl mb-4 animate-pulse">🎬</div>
                <p className="text-white font-medium mb-2">Rendering Scene...</p>
                <div className="w-64 h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-orange-500 transition-all"
                    style={{ width: `${Math.min(renderProgress, 100)}%` }}
                  />
                </div>
                <p className="text-gray-400 text-sm mt-2">{Math.floor(renderProgress)}%</p>
              </div>
            )}
          </div>

          {/* Environment Bar */}
          <div className="bg-gray-800 border-t border-gray-700 px-4 py-2">
            <div className="flex items-center gap-4">
              <span className="text-[10px] text-gray-400">Environment:</span>
              <div className="flex gap-1">
                {environmentPresets.map(env => (
                  <button
                    key={env.name}
                    onClick={() => setEnvironment(env.name)}
                    className={`px-2 py-1 rounded text-[10px] transition-colors ${
                      environment === env.name
                        ? "bg-orange-500 text-white"
                        : "bg-gray-700 text-gray-400 hover:bg-gray-600"
                    }`}
                  >
                    {env.icon} {env.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Assets & Projects */}
        <div className="w-56 bg-gray-800 border-l border-gray-700 flex flex-col">
          <div className="p-3 border-b border-gray-700">
            <p className="text-[10px] text-gray-400 font-medium">PROJECT</p>
            <input
              type="text"
              value={currentProjectName}
              onChange={(e) => setCurrentProjectName(e.target.value)}
              className="w-full mt-1 px-2 py-1 bg-gray-700 border border-gray-600 rounded text-xs text-white"
            />
          </div>

          {/* Quick Assets */}
          <div className="p-3 border-b border-gray-700">
            <p className="text-[10px] text-gray-400 font-medium mb-2">QUICK ADD</p>
            <div className="grid grid-cols-3 gap-1">
              {(["cube", "sphere", "cylinder", "cone", "torus", "plane"] as const).map(type => (
                <button
                  key={type}
                  onClick={() => addObject(type)}
                  className="p-2 bg-gray-700 rounded hover:bg-gray-600 transition-colors flex flex-col items-center gap-1"
                >
                  <span className="text-lg">{primitiveIcons[type]}</span>
                  <span className="text-[8px] text-gray-400 capitalize">{type}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Saved Projects */}
          <div className="flex-1 overflow-y-auto p-3">
            <p className="text-[10px] text-gray-400 font-medium mb-2">SAVED PROJECTS ({projects.length})</p>
            {projects.length === 0 ? (
              <p className="text-[10px] text-gray-500 text-center py-4">No saved projects yet</p>
            ) : (
              <div className="space-y-2">
                {projects.map(project => (
                  <div
                    key={project.id}
                    className="p-2 bg-gray-700 rounded hover:bg-gray-600 cursor-pointer transition-colors"
                  >
                    <p className="text-xs text-white truncate">{project.name}</p>
                    <p className="text-[10px] text-gray-400">{project.objects.length} objects</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Keyboard Shortcuts */}
          <div className="p-3 border-t border-gray-700">
            <p className="text-[10px] text-gray-400 font-medium mb-2">SHORTCUTS</p>
            <div className="space-y-1 text-[10px] text-gray-500">
              <p><kbd className="px-1 bg-gray-700 rounded">G</kbd> Move</p>
              <p><kbd className="px-1 bg-gray-700 rounded">R</kbd> Rotate</p>
              <p><kbd className="px-1 bg-gray-700 rounded">S</kbd> Scale</p>
              <p><kbd className="px-1 bg-gray-700 rounded">X</kbd> Delete</p>
              <p><kbd className="px-1 bg-gray-700 rounded">D</kbd> Duplicate</p>
              <p><kbd className="px-1 bg-gray-700 rounded">Alt+Drag</kbd> Orbit</p>
            </div>
          </div>
        </div>
      </div>

      {/* Save Modal */}
      {showSaveModal && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-xl p-6 w-80">
            <h3 className="text-white font-bold mb-4">Save Project</h3>
            <input
              type="text"
              value={currentProjectName}
              onChange={(e) => setCurrentProjectName(e.target.value)}
              placeholder="Project name"
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white mb-4"
            />
            <div className="flex gap-2">
              <button
                onClick={() => setShowSaveModal(false)}
                className="flex-1 py-2 bg-gray-700 text-gray-300 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={saveProject}
                className="flex-1 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Render Result Modal */}
      {showRenderResult && (
        <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-xl p-6 max-w-2xl w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-bold">Render Complete</h3>
              <button
                onClick={() => setShowRenderResult(false)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            <div className={`aspect-video bg-gradient-to-b ${envGradient} rounded-lg mb-4 flex items-center justify-center`}>
              <div className="text-center">
                <div className="flex justify-center gap-4">
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
                <p className="text-white/60 text-sm mt-4">Rendered Scene Preview</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowRenderResult(false)}
                className="flex-1 py-2 bg-gray-700 text-gray-300 rounded hover:bg-gray-600"
              >
                Close
              </button>
              <button className="flex-1 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                📥 Download PNG
              </button>
              <button className="flex-1 py-2 bg-orange-500 text-white rounded hover:bg-orange-600">
                📤 Share
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Blender3DWorkspace;
