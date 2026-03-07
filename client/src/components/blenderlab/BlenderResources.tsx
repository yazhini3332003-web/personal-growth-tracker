import React, { useState } from "react";

interface Shortcut {
  key: string;
  action: string;
  category: string;
}

interface Tip {
  id: string;
  title: string;
  content: string;
  category: string;
  difficulty: "beginner" | "intermediate" | "advanced";
}

interface Technique {
  id: string;
  title: string;
  description: string;
  category: string;
  steps: string[];
  icon: string;
}

const shortcuts: Shortcut[] = [
  // Navigation
  { key: "MMB Drag", action: "Orbit view", category: "Navigation" },
  { key: "Shift + MMB", action: "Pan view", category: "Navigation" },
  { key: "Scroll", action: "Zoom in/out", category: "Navigation" },
  { key: "Numpad 1/3/7", action: "Front/Right/Top view", category: "Navigation" },
  { key: "Numpad 5", action: "Toggle perspective/orthographic", category: "Navigation" },
  { key: "Numpad 0", action: "Camera view", category: "Navigation" },
  { key: "Home", action: "Frame all objects", category: "Navigation" },
  { key: "Numpad .", action: "Frame selected", category: "Navigation" },
  // Selection
  { key: "A", action: "Select all", category: "Selection" },
  { key: "Alt + A", action: "Deselect all", category: "Selection" },
  { key: "B", action: "Box select", category: "Selection" },
  { key: "C", action: "Circle select", category: "Selection" },
  { key: "L", action: "Select linked", category: "Selection" },
  { key: "Ctrl + I", action: "Invert selection", category: "Selection" },
  { key: "Alt + LMB", action: "Select edge loop", category: "Selection" },
  // Transform
  { key: "G", action: "Grab/Move", category: "Transform" },
  { key: "R", action: "Rotate", category: "Transform" },
  { key: "S", action: "Scale", category: "Transform" },
  { key: "G + X/Y/Z", action: "Move along axis", category: "Transform" },
  { key: "Shift + Z", action: "Transform excluding Z axis", category: "Transform" },
  { key: "Ctrl (hold)", action: "Snap to grid while transforming", category: "Transform" },
  // Modeling
  { key: "Tab", action: "Toggle Edit Mode", category: "Modeling" },
  { key: "1/2/3", action: "Vertex/Edge/Face select mode", category: "Modeling" },
  { key: "E", action: "Extrude", category: "Modeling" },
  { key: "I", action: "Inset faces", category: "Modeling" },
  { key: "Ctrl + R", action: "Loop cut", category: "Modeling" },
  { key: "Ctrl + B", action: "Bevel", category: "Modeling" },
  { key: "K", action: "Knife tool", category: "Modeling" },
  { key: "F", action: "Fill/Create face", category: "Modeling" },
  { key: "M", action: "Merge vertices", category: "Modeling" },
  { key: "P", action: "Separate selection", category: "Modeling" },
  // General
  { key: "Shift + A", action: "Add object/mesh", category: "General" },
  { key: "X / Delete", action: "Delete", category: "General" },
  { key: "Shift + D", action: "Duplicate", category: "General" },
  { key: "Ctrl + J", action: "Join objects", category: "General" },
  { key: "Ctrl + Z", action: "Undo", category: "General" },
  { key: "Ctrl + Shift + Z", action: "Redo", category: "General" },
  { key: "N", action: "Toggle sidebar", category: "General" },
  { key: "T", action: "Toggle toolbar", category: "General" },
  { key: "Z", action: "Viewport shading pie menu", category: "General" },
  { key: "F12", action: "Render image", category: "General" },
  { key: "Ctrl + F12", action: "Render animation", category: "General" }
];

const tips: Tip[] = [
  {
    id: "1",
    title: "Apply scale before modifiers",
    content: "Always apply scale (Ctrl + A > Scale) before adding modifiers like Subdivision Surface or Bevel. Uneven scale causes unpredictable results.",
    category: "Modeling",
    difficulty: "beginner"
  },
  {
    id: "2",
    title: "Use collections for organization",
    content: "Group related objects into Collections in the Outliner. You can toggle visibility and rendering for entire groups at once.",
    category: "Workflow",
    difficulty: "beginner"
  },
  {
    id: "3",
    title: "Enable backface culling for modeling",
    content: "In Viewport Overlays, enable Backface Culling to see when faces are flipped the wrong way — essential for clean models.",
    category: "Modeling",
    difficulty: "intermediate"
  },
  {
    id: "4",
    title: "Use HDRI for realistic reflections",
    content: "Even if you're using studio lighting, add an HDRI in the World settings for realistic reflections on metallic and glossy surfaces.",
    category: "Lighting",
    difficulty: "intermediate"
  },
  {
    id: "5",
    title: "Denoise in Render Properties, not post",
    content: "Enable Denoising in Render Properties for cleaner results than denoising in post. The OptiX denoiser is fast and effective.",
    category: "Rendering",
    difficulty: "beginner"
  },
  {
    id: "6",
    title: "Lock camera to view for easy framing",
    content: "In the N panel > View, check 'Lock Camera to View'. Now you can orbit and the camera moves with you — perfect for composition.",
    category: "Workflow",
    difficulty: "beginner"
  },
  {
    id: "7",
    title: "Use Auto Smooth for clean shading",
    content: "Enable Auto Smooth in Object Data Properties to get smooth shading on curved areas while keeping sharp edges crisp.",
    category: "Modeling",
    difficulty: "intermediate"
  },
  {
    id: "8",
    title: "Bake physics simulations before rendering",
    content: "Cloth, fluid, and particle simulations should be baked to cache before rendering animation. This prevents recalculation per frame.",
    category: "Simulation",
    difficulty: "advanced"
  }
];

const techniques: Technique[] = [
  {
    id: "box-modeling",
    title: "Box Modeling Workflow",
    description: "Start with a simple cube and refine it into complex shapes using extrusion and edge loops.",
    category: "Modeling",
    icon: "📦",
    steps: [
      "Start with a cube (Shift + A > Mesh > Cube)",
      "Enter Edit Mode (Tab)",
      "Add edge loops (Ctrl + R) to create more geometry where needed",
      "Select faces and extrude (E) to add volume",
      "Use scale (S) and move (G) to shape the form",
      "Add Subdivision Surface modifier for smoothness",
      "Apply bevels to control edge sharpness"
    ]
  },
  {
    id: "three-point-lighting",
    title: "Three-Point Lighting Setup",
    description: "The classic lighting setup used in photography and film for professional-looking illumination.",
    category: "Lighting",
    icon: "💡",
    steps: [
      "Add Key Light: Main light at 45° angle, slightly above subject",
      "Set key light to brightest intensity",
      "Add Fill Light: Opposite side of key, softer and dimmer (50% of key)",
      "Add Rim Light: Behind subject, creates edge separation",
      "Adjust color temperature (warm key, cool fill) for depth",
      "Fine-tune positions by checking shadows",
      "Render test and adjust intensities"
    ]
  },
  {
    id: "uv-unwrapping",
    title: "Clean UV Unwrapping",
    description: "Properly unwrap your model's UVs to apply textures without stretching or distortion.",
    category: "Texturing",
    icon: "🗺️",
    steps: [
      "Enter Edit Mode and select all faces (A)",
      "Mark seams along edges where texture can split (Ctrl + E > Mark Seam)",
      "Place seams in hidden areas (back, underside, joins)",
      "Open UV Editor in a split window",
      "Select all and unwrap (U > Unwrap)",
      "Check for stretching (UV > Display Stretch)",
      "Adjust UV islands for minimal distortion"
    ]
  },
  {
    id: "procedural-materials",
    title: "Creating Procedural Materials",
    description: "Build infinite, tileable materials using only nodes — no image textures needed.",
    category: "Materials",
    icon: "🔮",
    steps: [
      "Create new material and open Shader Editor",
      "Add Texture Coordinate and Mapping nodes for control",
      "Add noise textures (Noise, Musgrave, Voronoi) for variation",
      "Use ColorRamp to map values to colors",
      "Mix multiple textures with MixRGB",
      "Connect to Base Color of Principled BSDF",
      "Add Bump node for surface detail without geometry"
    ]
  },
  {
    id: "keyframe-basics",
    title: "Basic Keyframe Animation",
    description: "Animate objects by setting keyframes at different positions over time.",
    category: "Animation",
    icon: "🎬",
    steps: [
      "Move to frame 1 in Timeline",
      "Position your object, press I > Location",
      "Move to desired end frame",
      "Move object to new position, press I > Location",
      "Press Space to play animation",
      "Open Graph Editor to adjust timing curves",
      "Add ease-in/ease-out for natural motion"
    ]
  },
  {
    id: "render-optimization",
    title: "Optimize Render Times",
    description: "Get faster render times without sacrificing quality.",
    category: "Rendering",
    icon: "⚡",
    steps: [
      "Use Eevee for quick previews, Cycles for final",
      "Enable Denoising in Render Properties",
      "Lower samples with denoising (128-256 often enough)",
      "Use GPU rendering if available",
      "Reduce light bounces in Cycles settings",
      "Disable unneeded features (motion blur, DOF) for tests",
      "Render at lower resolution for previews"
    ]
  }
];

const shortcutCategories = Array.from(new Set(shortcuts.map((s) => s.category)));
const tipCategories = Array.from(new Set(tips.map((t) => t.category)));

const difficultyColors = {
  beginner: "bg-emerald-100 text-emerald-700",
  intermediate: "bg-amber-100 text-amber-700",
  advanced: "bg-violet-100 text-violet-700"
};

const BlenderResources: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"shortcuts" | "tips" | "techniques">("shortcuts");
  const [shortcutCategory, setShortcutCategory] = useState("All");
  const [expandedTechnique, setExpandedTechnique] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredShortcuts = shortcuts.filter((s) => {
    const matchesCategory = shortcutCategory === "All" || s.category === shortcutCategory;
    const matchesSearch = searchQuery === "" || 
      s.key.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.action.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 rounded-2xl p-6 text-white relative overflow-hidden">
        <div className="absolute -bottom-8 -right-8 w-36 h-36 bg-white/10 rounded-full" />
        <div className="relative">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">📚</span>
            <div>
              <h2 className="font-bold text-xl">Resource Library</h2>
              <p className="text-white/70 text-sm">Shortcuts, tips, and techniques</p>
            </div>
          </div>
          <p className="text-white/80 text-sm leading-relaxed mt-3 max-w-xl">
            Your reference guide for Blender. Quick keyboard shortcuts, pro tips from 
            experienced users, and step-by-step techniques for common tasks.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        {[
          { id: "shortcuts", label: "Shortcuts", icon: "⌨️", count: shortcuts.length },
          { id: "tips", label: "Pro Tips", icon: "💡", count: tips.length },
          { id: "techniques", label: "Techniques", icon: "🔧", count: techniques.length }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? "bg-teal-500 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            <span>{tab.icon}</span>
            {tab.label}
            <span className={`px-1.5 py-0.5 text-[10px] rounded ${
              activeTab === tab.id ? "bg-white/20" : "bg-gray-200"
            }`}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Shortcuts Tab */}
      {activeTab === "shortcuts" && (
        <>
          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search shortcuts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 pl-10 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setShortcutCategory("All")}
              className={`px-4 py-2 rounded-xl text-xs font-medium transition-colors ${
                shortcutCategory === "All" ? "bg-teal-500 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              All
            </button>
            {shortcutCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setShortcutCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-medium transition-colors ${
                  shortcutCategory === cat ? "bg-teal-500 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Shortcuts Table */}
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="px-4 py-3 text-left text-gray-500 font-medium">Shortcut</th>
                    <th className="px-4 py-3 text-left text-gray-500 font-medium">Action</th>
                    <th className="px-4 py-3 text-left text-gray-500 font-medium">Category</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredShortcuts.map((shortcut, idx) => (
                    <tr key={idx} className="border-b border-gray-50 hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <code className="px-2 py-1 bg-gray-800 text-white text-xs font-mono rounded">
                          {shortcut.key}
                        </code>
                      </td>
                      <td className="px-4 py-3 text-gray-700">{shortcut.action}</td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">
                          {shortcut.category}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Quick Reference Card */}
          <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl p-6 text-white">
            <h3 className="font-bold mb-4">⚡ Most Essential Shortcuts</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { k: "G", a: "Move" },
                { k: "R", a: "Rotate" },
                { k: "S", a: "Scale" },
                { k: "E", a: "Extrude" },
                { k: "Tab", a: "Edit Mode" },
                { k: "Shift+A", a: "Add" },
                { k: "Ctrl+Z", a: "Undo" },
                { k: "F12", a: "Render" }
              ].map((s) => (
                <div key={s.k} className="text-center">
                  <code className="px-3 py-1.5 bg-white text-gray-800 text-sm font-bold rounded">
                    {s.k}
                  </code>
                  <p className="text-xs text-gray-400 mt-1">{s.a}</p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Tips Tab */}
      {activeTab === "tips" && (
        <div className="space-y-4">
          {/* Category Pills */}
          <div className="flex flex-wrap gap-2">
            {tipCategories.map((cat) => (
              <span key={cat} className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                {cat}
              </span>
            ))}
          </div>

          {/* Tips Grid */}
          <div className="grid gap-4">
            {tips.map((tip) => (
              <div
                key={tip.id}
                className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-sm transition-shadow"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-bold text-gray-800">{tip.title}</h4>
                      <span className={`px-2 py-0.5 text-[10px] font-medium rounded capitalize ${difficultyColors[tip.difficulty]}`}>
                        {tip.difficulty}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">{tip.content}</p>
                    <span className="inline-block mt-3 px-2 py-0.5 bg-gray-100 text-gray-500 text-[10px] rounded">
                      {tip.category}
                    </span>
                  </div>
                  <span className="text-2xl flex-shrink-0">💡</span>
                </div>
              </div>
            ))}
          </div>

          {/* Add Tip Prompt */}
          <div className="bg-emerald-50 rounded-xl border border-emerald-100 p-5 flex items-center gap-4">
            <span className="text-3xl">🌟</span>
            <div className="flex-1">
              <p className="font-medium text-emerald-800">Have a tip to share?</p>
              <p className="text-xs text-emerald-600 mt-0.5">Help other learners by sharing your discoveries</p>
            </div>
            <button className="px-4 py-2 bg-emerald-500 text-white text-sm font-medium rounded-lg hover:bg-emerald-600 transition-colors">
              Submit Tip
            </button>
          </div>
        </div>
      )}

      {/* Techniques Tab */}
      {activeTab === "techniques" && (
        <div className="space-y-4">
          {techniques.map((technique) => {
            const isExpanded = expandedTechnique === technique.id;
            return (
              <div
                key={technique.id}
                className="bg-white rounded-xl border border-gray-100 overflow-hidden"
              >
                <button
                  onClick={() => setExpandedTechnique(isExpanded ? null : technique.id)}
                  className="w-full flex items-center gap-4 p-5 text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="text-3xl">{technique.icon}</span>
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-800">{technique.title}</h4>
                    <p className="text-xs text-gray-500 mt-0.5">{technique.description}</p>
                    <span className="inline-block mt-2 px-2 py-0.5 bg-blue-50 text-blue-600 text-[10px] rounded">
                      {technique.category}
                    </span>
                  </div>
                  <span className={`text-gray-400 transition-transform ${isExpanded ? "rotate-180" : ""}`}>
                    ▼
                  </span>
                </button>

                {isExpanded && (
                  <div className="px-5 pb-5 border-t border-gray-100">
                    <p className="text-xs font-bold text-gray-600 mt-4 mb-3">Step-by-Step:</p>
                    <ol className="space-y-2">
                      {technique.steps.map((step, idx) => (
                        <li key={idx} className="flex gap-3">
                          <span className="w-5 h-5 rounded-full bg-teal-100 text-teal-600 text-xs font-bold flex items-center justify-center flex-shrink-0">
                            {idx + 1}
                          </span>
                          <p className="text-sm text-gray-700">{step}</p>
                        </li>
                      ))}
                    </ol>
                  </div>
                )}
              </div>
            );
          })}

          {/* Categories Overview */}
          <div className="bg-white rounded-xl border border-gray-100 p-5">
            <h3 className="font-bold text-gray-800 text-sm mb-4">📂 Techniques by Category</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {Array.from(new Set(techniques.map((t) => t.category))).map((cat) => {
                const count = techniques.filter((t) => t.category === cat).length;
                return (
                  <div key={cat} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                    <span className="text-lg">📁</span>
                    <div>
                      <p className="text-sm font-medium text-gray-700">{cat}</p>
                      <p className="text-xs text-gray-400">{count} technique{count > 1 ? "s" : ""}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlenderResources;
