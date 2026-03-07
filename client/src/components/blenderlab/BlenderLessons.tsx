import React, { useState } from "react";

interface Step {
  instruction: string;
  tip?: string;
  shortcut?: string;
}

interface Lesson {
  id: string;
  title: string;
  description: string;
  level: "beginner" | "intermediate" | "advanced";
  duration: string;
  icon: string;
  steps: Step[];
  practice: string;
}

const lessons: Lesson[] = [
  {
    id: "interface-tour",
    title: "Blender Interface Tour",
    description: "Get familiar with every part of Blender's workspace. Understand the main editors and how to navigate them.",
    level: "beginner",
    duration: "15 min",
    icon: "🖥️",
    steps: [
      { instruction: "Open Blender. You'll see the default startup screen with a cube in the center.", tip: "The cube is sitting in the 3D Viewport, the main area where you work." },
      { instruction: "Look at the top bar — this shows the current workspace (Layout, Modeling, Sculpting, etc.).", tip: "You can switch workspaces depending on your task." },
      { instruction: "On the left is the Toolbar (press T to toggle). It has transform and creation tools." },
      { instruction: "On the right side is the Outliner (top) showing all objects, and Properties panel (bottom) for settings.", tip: "Click an object in Outliner to select it." },
      { instruction: "At the bottom is the Timeline for animation. You won't need it yet, but know where it is." },
      { instruction: "Press N to open the Sidebar in the 3D Viewport. It shows transform values and other options.", shortcut: "N" }
    ],
    practice: "Explore each panel. Try clicking different objects in the Outliner and see them highlight in the viewport."
  },
  {
    id: "navigation-basics",
    title: "3D Navigation Basics",
    description: "Learn to orbit, pan, and zoom in the 3D viewport to view your scene from any angle.",
    level: "beginner",
    duration: "10 min",
    icon: "🧭",
    steps: [
      { instruction: "To orbit (rotate view): Hold Middle Mouse Button and drag.", shortcut: "MMB Drag", tip: "If you don't have a middle mouse button, you can emulate it in Preferences > Input." },
      { instruction: "To pan (move view sideways): Hold Shift + Middle Mouse Button and drag.", shortcut: "Shift + MMB" },
      { instruction: "To zoom: Scroll the mouse wheel up/down.", shortcut: "Scroll Wheel" },
      { instruction: "Use Numpad 1 for Front view, Numpad 3 for Right view, Numpad 7 for Top view.", shortcut: "Numpad 1/3/7", tip: "These orthographic views are useful for precise modeling." },
      { instruction: "Press Numpad 5 to toggle between Perspective and Orthographic view.", shortcut: "Numpad 5" },
      { instruction: "Press Home to reset the view and fit all objects in frame.", shortcut: "Home" }
    ],
    practice: "Orbit around the default cube. View it from top, front, and right. Zoom in and out."
  },
  {
    id: "adding-objects",
    title: "Adding & Deleting Objects",
    description: "Learn to add primitive shapes like cubes, spheres, and cylinders, then delete them.",
    level: "beginner",
    duration: "12 min",
    icon: "🧊",
    steps: [
      { instruction: "Press Shift + A to open the Add menu.", shortcut: "Shift + A" },
      { instruction: "Navigate to Mesh and select a primitive: Cube, UV Sphere, Cylinder, Cone, or Plane.", tip: "These are your basic building blocks for 3D modeling." },
      { instruction: "The new object appears at the 3D Cursor (the crosshair in the viewport).", tip: "Press Shift + Right Click to move the 3D Cursor." },
      { instruction: "To select an object, Left Click on it. The orange outline shows selection.", shortcut: "LMB" },
      { instruction: "To delete a selected object, press X and confirm 'Delete'.", shortcut: "X", tip: "Or press Delete key for the same menu." },
      { instruction: "To duplicate an object, press Shift + D then move your mouse and click to place.", shortcut: "Shift + D" }
    ],
    practice: "Add a sphere, a cylinder, and a cone. Position them next to the default cube. Delete the cone."
  },
  {
    id: "edit-mode-basics",
    title: "Introduction to Edit Mode",
    description: "Enter Edit Mode to modify the actual geometry of your mesh — vertices, edges, and faces.",
    level: "beginner",
    duration: "20 min",
    icon: "✏️",
    steps: [
      { instruction: "Select the default cube. Press Tab to enter Edit Mode.", shortcut: "Tab", tip: "In Edit Mode, you can modify the mesh itself, not just transform the whole object." },
      { instruction: "In Edit Mode, you see three selection modes at the top: Vertex (dots), Edge (lines), Face (squares).", tip: "Press 1, 2, 3 to switch between them." },
      { instruction: "Click on a vertex to select it. Hold Shift and click to select multiple.", shortcut: "Shift + LMB" },
      { instruction: "Press G to grab and move selected elements. Press S to scale. Press R to rotate.", shortcut: "G / S / R" },
      { instruction: "Select a face, then press E to Extrude — this pulls new geometry out.", shortcut: "E", tip: "Extrude is one of the most important modeling tools!" },
      { instruction: "Press Tab again to return to Object Mode.", shortcut: "Tab" }
    ],
    practice: "Enter Edit Mode on the cube. Select the top face and extrude it upward to make a tower shape."
  },
  {
    id: "basic-materials",
    title: "Applying Basic Materials",
    description: "Add colors and simple materials to your objects to give them a finished appearance.",
    level: "beginner",
    duration: "15 min",
    icon: "🎨",
    steps: [
      { instruction: "Select an object in Object Mode." },
      { instruction: "In the Properties panel (right side), click the Material Properties tab (sphere icon)." },
      { instruction: "Click 'New' to create a new material." },
      { instruction: "Click the Base Color swatch and choose a color from the picker.", tip: "You can also enter hex values for precise colors." },
      { instruction: "Adjust Roughness: 0 = shiny/reflective, 1 = matte/dull.", tip: "Metal objects typically have low roughness." },
      { instruction: "To see materials render, switch the viewport shading to 'Material Preview' (top right of 3D Viewport).", tip: "Or press Z and select Material Preview." }
    ],
    practice: "Create a red cube and a blue sphere. Make the sphere shiny (roughness 0.1) and the cube matte (roughness 0.8)."
  },
  {
    id: "basic-lighting",
    title: "Basic Scene Lighting",
    description: "Learn to add and position lights in your scene to illuminate your objects properly.",
    level: "beginner",
    duration: "18 min",
    icon: "💡",
    steps: [
      { instruction: "Press Shift + A > Light to add a light. Choose Point, Sun, Spot, or Area.", shortcut: "Shift + A", tip: "Point = bulb, Sun = directional, Spot = cone, Area = soft rectangle." },
      { instruction: "Move the light using G (grab). Position it above and to the side of your objects.", shortcut: "G" },
      { instruction: "Select the light and go to Light Properties (bulb icon in Properties panel).", tip: "Here you control intensity and color." },
      { instruction: "Increase 'Power' (in Watts) to make the light brighter." },
      { instruction: "Click the Color swatch to change light color. Warm lights are orange, cool lights are blue." },
      { instruction: "For soft shadows, use Area lights with larger size values.", tip: "Larger area = softer shadows." }
    ],
    practice: "Delete the default light. Add a Sun light and an Area light. Position them to create soft, even illumination on your objects."
  },
  {
    id: "subdivision-modeling",
    title: "Subdivision Surface Modeling",
    description: "Use the Subdivision Surface modifier to create smooth, organic shapes from simple meshes.",
    level: "intermediate",
    duration: "25 min",
    icon: "🔵",
    steps: [
      { instruction: "Create a cube (Shift + A > Mesh > Cube).", shortcut: "Shift + A" },
      { instruction: "Go to Modifier Properties (wrench icon) and click 'Add Modifier'." },
      { instruction: "Select 'Subdivision Surface' under Generate.", tip: "This smooths your mesh by subdividing it." },
      { instruction: "Increase Viewport level to 2 to see a smoother preview.", tip: "Keep Viewport lower than Render for better performance." },
      { instruction: "Enter Edit Mode (Tab). Selecting edges and pressing Ctrl + B adds bevels that preserve sharp edges.", shortcut: "Ctrl + B" },
      { instruction: "Edge creases (Shift + E) also control how sharp edges remain under subdivision.", shortcut: "Shift + E" }
    ],
    practice: "Start with a cube. Add subdivision. Use bevels and creases to create a rounded cube with some sharp edges."
  },
  {
    id: "hdri-lighting",
    title: "HDRI Environment Lighting",
    description: "Use High Dynamic Range images to create realistic, natural lighting and reflections.",
    level: "intermediate",
    duration: "20 min",
    icon: "🌅",
    steps: [
      { instruction: "Go to the World Properties tab (globe icon in Properties panel)." },
      { instruction: "Click the dot next to 'Color' and choose 'Environment Texture'." },
      { instruction: "Click 'Open' and select an HDRI image (.hdr or .exr file).", tip: "Download free HDRIs from polyhaven.com" },
      { instruction: "Switch viewport shading to 'Rendered' (press Z > Rendered) to see the effect.", shortcut: "Z" },
      { instruction: "Adjust 'Strength' in World settings to control how bright the HDRI lighting is.", tip: "Values around 0.5-1.5 often work well." },
      { instruction: "Rotate the HDRI by adding a Texture Coordinate and Mapping node in the Shader Editor (World mode).", tip: "Use the Z rotation on the Mapping node." }
    ],
    practice: "Download a free HDRI from polyhaven.com. Apply it to your scene. Add a reflective sphere to see the HDRI in reflections."
  },
  {
    id: "character-head",
    title: "Modeling a Basic Character Head",
    description: "Learn fundamental techniques for sculpting and modeling a simple character head.",
    level: "advanced",
    duration: "45 min",
    icon: "👤",
    steps: [
      { instruction: "Start with a UV Sphere (Shift + A > Mesh > UV Sphere). Set segments to 16.", tip: "Fewer segments makes it easier to work with initially." },
      { instruction: "Enter Edit Mode and enable Proportional Editing (O key) for smooth sculpting.", shortcut: "O" },
      { instruction: "Use Grab (G) with proportional editing to shape the basic head silhouette — forehead, chin, back of head." },
      { instruction: "Select edge loops (Alt + Click) around the eye area. Scale them inward for eye sockets.", shortcut: "Alt + LMB" },
      { instruction: "Extrude (E) selected faces inward for eye socket depth.", shortcut: "E" },
      { instruction: "For the nose, select front faces, extrude outward, then scale and move to shape.", tip: "Work in Front and Side views for accuracy." },
      { instruction: "Add a Mirror Modifier so you only model half the face and it mirrors automatically." },
      { instruction: "Apply Subdivision Surface to smooth the final result." }
    ],
    practice: "Model a simple stylized character head. It doesn't need to be realistic — focus on proportions and clean topology."
  },
  {
    id: "keyframe-animation",
    title: "Keyframe Animation Basics",
    description: "Animate objects by setting keyframes at different points in time.",
    level: "advanced",
    duration: "30 min",
    icon: "🎬",
    steps: [
      { instruction: "Select an object. Move to frame 1 in the Timeline (bottom of screen).", tip: "The blue marker shows the current frame." },
      { instruction: "Position your object where you want it to start. Press I and choose 'Location' to insert a keyframe.", shortcut: "I", tip: "A yellow diamond appears in the timeline." },
      { instruction: "Move to frame 50 by clicking in the timeline or typing the frame number." },
      { instruction: "Move your object to a new position using G. Press I > Location again to set another keyframe.", shortcut: "G, then I" },
      { instruction: "Press Space to play the animation. The object moves between your keyframe positions!", shortcut: "Space" },
      { instruction: "Open the Graph Editor to see animation curves. Here you can adjust timing and easing.", tip: "Window > Graph Editor, or switch an editor to Graph." }
    ],
    practice: "Create a ball. Animate it bouncing: start high, drop low at frame 30, bounce back up at frame 50. Adjust the curves for realistic easing."
  }
];

const levelColors = {
  beginner: { bg: "bg-emerald-50", text: "text-emerald-600", border: "border-emerald-200" },
  intermediate: { bg: "bg-amber-50", text: "text-amber-600", border: "border-amber-200" },
  advanced: { bg: "bg-violet-50", text: "text-violet-600", border: "border-violet-200" }
};

const BlenderLessons: React.FC = () => {
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [filterLevel, setFilterLevel] = useState<string>("all");

  const filteredLessons = filterLevel === "all" ? lessons : lessons.filter((l) => l.level === filterLevel);

  const markStepComplete = (stepIdx: number) => {
    if (!completedSteps.includes(stepIdx)) {
      setCompletedSteps([...completedSteps, stepIdx]);
    }
    if (stepIdx < (selectedLesson?.steps.length || 0) - 1) {
      setCurrentStep(stepIdx + 1);
    }
  };

  const resetLesson = () => {
    setCurrentStep(0);
    setCompletedSteps([]);
  };

  if (selectedLesson) {
    const progress = (completedSteps.length / selectedLesson.steps.length) * 100;
    return (
      <div className="space-y-6">
        {/* Back Button */}
        <button
          onClick={() => { setSelectedLesson(null); resetLesson(); }}
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
        >
          <span>←</span> Back to All Lessons
        </button>

        {/* Lesson Header */}
        <div className="bg-gradient-to-br from-orange-500 to-pink-500 rounded-2xl p-6 text-white">
          <div className="flex items-center gap-3">
            <span className="text-4xl">{selectedLesson.icon}</span>
            <div>
              <h2 className="font-bold text-xl">{selectedLesson.title}</h2>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-xs bg-white/20 px-2 py-0.5 rounded capitalize">{selectedLesson.level}</span>
                <span className="text-xs text-white/70">{selectedLesson.duration}</span>
              </div>
            </div>
          </div>
          <p className="text-white/80 text-sm mt-3">{selectedLesson.description}</p>
          <div className="mt-4">
            <div className="flex items-center justify-between text-xs mb-1">
              <span>Progress</span>
              <span>{completedSteps.length}/{selectedLesson.steps.length} steps</span>
            </div>
            <div className="h-2 bg-white/20 rounded-full overflow-hidden">
              <div className="h-full bg-white rounded-full transition-all" style={{ width: `${progress}%` }} />
            </div>
          </div>
        </div>

        {/* Steps */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h3 className="font-bold text-gray-800 mb-4">📝 Lesson Steps</h3>
          <div className="space-y-3">
            {selectedLesson.steps.map((step, idx) => {
              const isComplete = completedSteps.includes(idx);
              const isCurrent = currentStep === idx;
              return (
                <div
                  key={idx}
                  className={`p-4 rounded-xl border transition-all ${
                    isComplete
                      ? "border-emerald-200 bg-emerald-50"
                      : isCurrent
                      ? "border-orange-300 bg-orange-50 ring-2 ring-orange-100"
                      : "border-gray-100 bg-gray-50"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5 ${
                      isComplete ? "bg-emerald-500 text-white" : isCurrent ? "bg-orange-500 text-white" : "bg-gray-300 text-white"
                    }`}>
                      {isComplete ? "✓" : idx + 1}
                    </span>
                    <div className="flex-1">
                      <p className={`text-sm ${isComplete ? "text-emerald-700" : "text-gray-700"}`}>{step.instruction}</p>
                      {step.shortcut && (
                        <span className="inline-block mt-2 px-2 py-0.5 bg-gray-800 text-white text-[10px] font-mono rounded">
                          {step.shortcut}
                        </span>
                      )}
                      {step.tip && (
                        <p className="mt-2 text-xs text-blue-600 bg-blue-50 px-3 py-2 rounded-lg">💡 {step.tip}</p>
                      )}
                      {!isComplete && isCurrent && (
                        <button
                          onClick={() => markStepComplete(idx)}
                          className="mt-3 px-4 py-2 bg-orange-500 text-white text-xs font-medium rounded-lg hover:bg-orange-600 transition-colors"
                        >
                          Mark as Complete ✓
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Practice Assignment */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-100 p-6">
          <h3 className="font-bold text-blue-800 flex items-center gap-2 mb-3">
            <span>🎯</span> Practice Assignment
          </h3>
          <p className="text-sm text-blue-700">{selectedLesson.practice}</p>
          {progress === 100 && (
            <div className="mt-4 p-4 bg-emerald-100 rounded-xl border border-emerald-200">
              <p className="text-sm text-emerald-700 font-medium">🎉 You've completed all steps! Now practice what you learned.</p>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={resetLesson}
            className="flex-1 py-3 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
          >
            Reset Progress
          </button>
          <button
            onClick={() => { setSelectedLesson(null); resetLesson(); }}
            className="flex-1 py-3 bg-orange-500 rounded-xl text-sm font-medium text-white hover:bg-orange-600 transition-colors"
          >
            Back to Lessons
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-teal-500 via-cyan-500 to-blue-500 rounded-2xl p-6 text-white relative overflow-hidden">
        <div className="absolute -top-8 -right-8 w-32 h-32 bg-white/10 rounded-full" />
        <div className="relative">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">📚</span>
            <div>
              <h2 className="font-bold text-xl">Step-by-Step Lessons</h2>
              <p className="text-white/70 text-sm">Guided lessons with clear instructions</p>
            </div>
          </div>
          <p className="text-white/80 text-sm leading-relaxed mt-3 max-w-xl">
            Each lesson walks you through a specific skill with detailed steps, keyboard shortcuts, 
            pro tips, and a practice assignment to reinforce what you've learned.
          </p>
        </div>
      </div>

      {/* Filter */}
      <div className="flex items-center gap-2">
        <span className="text-xs text-gray-500">Filter by level:</span>
        <div className="flex gap-2">
          {["all", "beginner", "intermediate", "advanced"].map((level) => (
            <button
              key={level}
              onClick={() => setFilterLevel(level)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors capitalize ${
                filterLevel === level
                  ? "bg-orange-500 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {level}
            </button>
          ))}
        </div>
      </div>

      {/* Lessons Grid */}
      <div className="grid gap-4">
        {filteredLessons.map((lesson) => {
          const colors = levelColors[lesson.level];
          return (
            <button
              key={lesson.id}
              onClick={() => setSelectedLesson(lesson)}
              className="bg-white rounded-xl border border-gray-100 p-5 text-left hover:shadow-md hover:border-gray-200 transition-all group"
            >
              <div className="flex items-start gap-4">
                <span className="text-3xl">{lesson.icon}</span>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-gray-800 group-hover:text-orange-600 transition-colors">
                      {lesson.title}
                    </h3>
                    <span className={`px-2 py-0.5 text-[10px] font-medium rounded-full capitalize ${colors.bg} ${colors.text} ${colors.border} border`}>
                      {lesson.level}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 line-clamp-2">{lesson.description}</p>
                  <div className="flex items-center gap-4 mt-3 text-[11px] text-gray-400">
                    <span>⏱️ {lesson.duration}</span>
                    <span>📋 {lesson.steps.length} steps</span>
                  </div>
                </div>
                <span className="text-gray-300 group-hover:text-orange-400 transition-colors">→</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-emerald-50 rounded-xl p-4 text-center border border-emerald-100">
          <p className="text-2xl font-bold text-emerald-600">{lessons.filter((l) => l.level === "beginner").length}</p>
          <p className="text-xs text-emerald-700 mt-1">Beginner</p>
        </div>
        <div className="bg-amber-50 rounded-xl p-4 text-center border border-amber-100">
          <p className="text-2xl font-bold text-amber-600">{lessons.filter((l) => l.level === "intermediate").length}</p>
          <p className="text-xs text-amber-700 mt-1">Intermediate</p>
        </div>
        <div className="bg-violet-50 rounded-xl p-4 text-center border border-violet-100">
          <p className="text-2xl font-bold text-violet-600">{lessons.filter((l) => l.level === "advanced").length}</p>
          <p className="text-xs text-violet-700 mt-1">Advanced</p>
        </div>
      </div>
    </div>
  );
};

export default BlenderLessons;
