import React, { useState } from "react";

interface ExerciseStep {
  title: string;
  instruction: string;
  shortcut?: string;
  tip?: string;
  demonstration: string;
  expectedResult: string;
  toolUsed: string;
}

interface Exercise {
  id: string;
  title: string;
  category: "modeling" | "lighting" | "texturing" | "rendering";
  difficulty: "easy" | "medium" | "hard";
  description: string;
  objective: string;
  referenceImage: string;
  estimatedTime: string;
  skillsLearned: string[];
  prerequisites: string[];
  steps: ExerciseStep[];
}

const exercises: Exercise[] = [
  {
    id: "model-cup",
    title: "Model a Simple Cup",
    category: "modeling",
    difficulty: "easy",
    description: "Create a basic cup/mug shape using primitive modeling techniques.",
    objective: "Create a 3D cup model with handle using cylinder manipulation and basic extrusion.",
    referenceImage: "🥤",
    estimatedTime: "15-20 min",
    skillsLearned: ["Cylinder modeling", "Face selection", "Extrusion (E)", "Inset (I)", "Loop cuts (Ctrl+R)", "Object joining (Ctrl+J)"],
    prerequisites: ["Basic navigation", "Edit Mode basics"],
    steps: [
      {
        title: "Create a Cylinder",
        instruction: "Press Shift + A to open the Add menu, then navigate to Mesh > Cylinder. This will be the base of your cup.",
        shortcut: "Shift + A",
        tip: "The cylinder appears at the 3D cursor location. Make sure it's at the center (0,0,0).",
        demonstration: "🔵",
        expectedResult: "A cylinder should appear in your viewport",
        toolUsed: "Add Menu"
      },
      {
        title: "Enter Edit Mode",
        instruction: "With the cylinder selected, press Tab to enter Edit Mode. This allows you to modify the geometry directly.",
        shortcut: "Tab",
        tip: "Edit Mode lets you work with vertices, edges, and faces. The outline color changes to orange when in Edit Mode.",
        demonstration: "✏️",
        expectedResult: "The cylinder shows editable vertices and edges",
        toolUsed: "Mode Toggle"
      },
      {
        title: "Select the Top Face",
        instruction: "Press 3 to switch to Face Select mode, then click on the top face of the cylinder to select it.",
        shortcut: "3 (Face Mode)",
        tip: "You can also press Numpad 7 to view from the top, making selection easier.",
        demonstration: "🔝",
        expectedResult: "The top circular face is highlighted/selected",
        toolUsed: "Face Selection"
      },
      {
        title: "Delete the Top Face",
        instruction: "With the top face selected, press X and choose 'Faces' to delete it. This makes the cylinder hollow.",
        shortcut: "X → Faces",
        tip: "Alternatively, you can use the Inset method (next step) which creates thickness instead.",
        demonstration: "🕳️",
        expectedResult: "The cylinder is now open at the top",
        toolUsed: "Delete Menu"
      },
      {
        title: "Use Inset for Thickness",
        instruction: "Select the top edge loop. Press I to Inset, then move mouse to create a rim. Press E to extrude down to create wall thickness.",
        shortcut: "I (Inset), E (Extrude)",
        tip: "Inset creates a smaller face inside. Extruding down creates the inner wall of the cup.",
        demonstration: "📏",
        expectedResult: "The cup now has visible wall thickness",
        toolUsed: "Inset & Extrude"
      },
      {
        title: "Add Loop Cut for Base",
        instruction: "Press Ctrl + R and hover over the cylinder. Add a loop cut near the bottom, then scale it outward (S) to create a wider base.",
        shortcut: "Ctrl + R",
        tip: "Loop cuts add more geometry to work with. Scroll mouse wheel to add multiple cuts.",
        demonstration: "➕",
        expectedResult: "A new edge loop appears near the bottom",
        toolUsed: "Loop Cut"
      },
      {
        title: "Shape the Cup Profile",
        instruction: "Select edge loops on the side using Alt + Click. Use Scale (S) to adjust the width at different heights for a tapered cup shape.",
        shortcut: "Alt + Click, S",
        tip: "Work in Side view (Numpad 3) for precise shaping. Taper slightly for a realistic cup look.",
        demonstration: "📐",
        expectedResult: "The cup has a tapered shape, wider at top",
        toolUsed: "Scale Tool"
      },
      {
        title: "Create the Handle",
        instruction: "Press Tab to exit Edit Mode. Add a Torus (Shift + A > Mesh > Torus). Scale and rotate it to form a handle shape.",
        shortcut: "Shift + A → Torus",
        tip: "Scale the torus on the X axis to flatten it into a handle shape.",
        demonstration: "🔁",
        expectedResult: "A torus ring appears that will become the handle",
        toolUsed: "Add Torus"
      },
      {
        title: "Position the Handle",
        instruction: "Move (G) and rotate (R) the torus to position it on the side of the cup. Use Side view for accuracy.",
        shortcut: "G (Move), R (Rotate)",
        tip: "Hold Ctrl while moving to snap to grid for precise placement.",
        demonstration: "🎯",
        expectedResult: "The handle is positioned on the side of the cup",
        toolUsed: "Transform Tools"
      },
      {
        title: "Join Objects",
        instruction: "Select both the cup and handle (Shift + Click), then press Ctrl + J to join them into a single object.",
        shortcut: "Ctrl + J",
        tip: "The active object (last selected) determines the final object's origin point.",
        demonstration: "🔗",
        expectedResult: "Cup and handle are now one unified object",
        toolUsed: "Join"
      }
    ]
  },
  {
    id: "model-table",
    title: "Model a Wooden Table",
    category: "modeling",
    difficulty: "easy",
    description: "Create a simple four-legged table with a flat top surface.",
    objective: "Build a table using cubes, learning duplication and positioning techniques.",
    referenceImage: "🪑",
    estimatedTime: "20-25 min",
    skillsLearned: ["Cube scaling", "Object duplication (Shift+D)", "Precise positioning", "Applying transforms", "Bevel modifier"],
    prerequisites: ["Basic navigation", "Object selection"],
    steps: [
      {
        title: "Create the Tabletop",
        instruction: "Start with the default cube or add one (Shift + A > Mesh > Cube). This will be your tabletop.",
        shortcut: "Shift + A",
        tip: "The default cube is already in the scene when you open Blender. You can use it directly.",
        demonstration: "📦",
        expectedResult: "A cube appears in the viewport",
        toolUsed: "Add Menu"
      },
      {
        title: "Flatten the Cube",
        instruction: "Press S then Z then 0.1 to scale the cube flat on the Z axis. This creates a thin tabletop shape.",
        shortcut: "S → Z → 0.1",
        tip: "You can type exact values after pressing S for precise scaling.",
        demonstration: "📋",
        expectedResult: "The cube is now flat like a board",
        toolUsed: "Scale"
      },
      {
        title: "Widen the Tabletop",
        instruction: "Scale on X and Y axes to make the tabletop larger. Press S, then X or Y, and drag or type a value.",
        shortcut: "S → X, S → Y",
        tip: "A typical table might be 2-3 times wider than tall. Aim for realistic proportions.",
        demonstration: "↔️",
        expectedResult: "Tabletop is now wide and flat",
        toolUsed: "Scale"
      },
      {
        title: "Create a Table Leg",
        instruction: "Add a new cube (Shift + A > Mesh > Cube). Scale it thin and tall to create a leg shape.",
        shortcut: "Shift + A, S",
        tip: "Scale X and Y to about 0.1, and Z to about 2 for a typical leg proportion.",
        demonstration: "📍",
        expectedResult: "A thin, tall cube appears",
        toolUsed: "Add & Scale"
      },
      {
        title: "Position the First Leg",
        instruction: "Move the leg (G) to one corner of the tabletop. Use Top view (Numpad 7) and Side view (Numpad 3) for accuracy.",
        shortcut: "G, Numpad 7/3",
        tip: "Position the leg just under the corner of the tabletop.",
        demonstration: "📌",
        expectedResult: "Leg is placed at one corner",
        toolUsed: "Move"
      },
      {
        title: "Duplicate for Second Leg",
        instruction: "With the leg selected, press Shift + D to duplicate, then move to another corner.",
        shortcut: "Shift + D",
        tip: "After duplicating, the new object is immediately in grab mode. Move it directly.",
        demonstration: "📋",
        expectedResult: "Two legs are now positioned",
        toolUsed: "Duplicate"
      },
      {
        title: "Add Remaining Legs",
        instruction: "Repeat the duplication process to create legs for all four corners of the table.",
        shortcut: "Shift + D",
        tip: "Select both existing legs and duplicate them together, then move on the X or Y axis only.",
        demonstration: "4️⃣",
        expectedResult: "All four legs are in place",
        toolUsed: "Duplicate"
      },
      {
        title: "Join All Parts",
        instruction: "Select all parts (tabletop and 4 legs) using Shift + Click or Box Select (B), then join with Ctrl + J.",
        shortcut: "Ctrl + J",
        tip: "Joining makes the table a single object, easier to move and manage.",
        demonstration: "🔗",
        expectedResult: "Table is now one unified object",
        toolUsed: "Join"
      }
    ]
  },
  {
    id: "light-portrait",
    title: "Portrait Lighting Setup",
    category: "lighting",
    difficulty: "easy",
    description: "Create a classic three-point lighting setup for illuminating a subject.",
    objective: "Master the three-point lighting technique used in photography and film.",
    referenceImage: "💡",
    estimatedTime: "15-20 min",
    skillsLearned: ["Adding lights", "Light positioning", "Key/Fill/Rim concept", "Light intensity", "Color temperature"],
    prerequisites: ["Basic navigation", "Object positioning"],
    steps: [
      {
        title: "Add a Subject",
        instruction: "Add any object to light. A simple sphere or monkey head (Shift + A > Mesh > Monkey) works great for testing.",
        shortcut: "Shift + A",
        tip: "The monkey head (Suzanne) is a classic test object because of its varied surface angles.",
        demonstration: "🐵",
        expectedResult: "A subject object appears in the scene",
        toolUsed: "Add Menu"
      },
      {
        title: "Delete Default Light",
        instruction: "Select the default light in the scene and delete it (X). We'll create our own lighting setup.",
        shortcut: "X",
        tip: "Starting fresh gives you full control over your lighting design.",
        demonstration: "🗑️",
        expectedResult: "The scene has no lights (appears dark in render)",
        toolUsed: "Delete"
      },
      {
        title: "Add Key Light",
        instruction: "Add an Area Light (Shift + A > Light > Area). This will be your main/key light.",
        shortcut: "Shift + A → Light → Area",
        tip: "Area lights create soft shadows, good for portraits. Point lights are harsher.",
        demonstration: "☀️",
        expectedResult: "An area light appears in the scene",
        toolUsed: "Add Light"
      },
      {
        title: "Position Key Light",
        instruction: "Move the key light to 45° to one side of the subject, slightly above and pointing at it. Use G and R.",
        shortcut: "G (Move), R (Rotate)",
        tip: "The key light creates the main shadows that define depth and dimension.",
        demonstration: "↗️",
        expectedResult: "Key light is positioned at 45° angle",
        toolUsed: "Transform"
      },
      {
        title: "Adjust Key Light Power",
        instruction: "Select the light and go to Light Properties. Increase Power to around 500-1000W for visibility.",
        shortcut: "Light Properties Panel",
        tip: "Start with higher power and reduce if too bright. It's easier to see what you're doing.",
        demonstration: "🔆",
        expectedResult: "Subject is now clearly lit on one side",
        toolUsed: "Light Properties"
      },
      {
        title: "Add Fill Light",
        instruction: "Add another Area Light. Position it on the opposite side of the key light, at a similar height.",
        shortcut: "Shift + A → Light → Area",
        tip: "Fill light reduces harsh shadows without eliminating them completely.",
        demonstration: "💫",
        expectedResult: "Second light is positioned opposite the key",
        toolUsed: "Add Light"
      },
      {
        title: "Reduce Fill Light Power",
        instruction: "Set the fill light power to about 50% of the key light (250-500W). It should be softer.",
        shortcut: "Light Properties Panel",
        tip: "The fill should soften shadows, not eliminate them. Keep some contrast.",
        demonstration: "🌙",
        expectedResult: "Shadows are softer but still visible",
        toolUsed: "Light Properties"
      },
      {
        title: "Add Rim Light",
        instruction: "Add a third Area Light behind the subject, pointing toward the camera angle to create edge highlight.",
        shortcut: "Shift + A → Light → Area",
        tip: "Rim light separates the subject from the background by highlighting edges.",
        demonstration: "✨",
        expectedResult: "Third light is behind the subject",
        toolUsed: "Add Light"
      },
      {
        title: "Test in Rendered View",
        instruction: "Press Z and select 'Rendered' to see your lighting setup in action. Adjust as needed.",
        shortcut: "Z → Rendered",
        tip: "Switch between Material Preview and Rendered to compare results.",
        demonstration: "👁️",
        expectedResult: "Subject is well-lit with depth and dimension",
        toolUsed: "Viewport Shading"
      }
    ]
  }
];

const categoryIcons: Record<string, string> = {
  modeling: "🏗️",
  lighting: "💡",
  texturing: "🎨",
  rendering: "📷"
};

const categoryColors: Record<string, { bg: string; text: string; border: string; gradient: string }> = {
  modeling: { bg: "bg-blue-50", text: "text-blue-600", border: "border-blue-200", gradient: "from-blue-500 to-indigo-600" },
  lighting: { bg: "bg-amber-50", text: "text-amber-600", border: "border-amber-200", gradient: "from-amber-500 to-orange-600" },
  texturing: { bg: "bg-pink-50", text: "text-pink-600", border: "border-pink-200", gradient: "from-pink-500 to-rose-600" },
  rendering: { bg: "bg-emerald-50", text: "text-emerald-600", border: "border-emerald-200", gradient: "from-emerald-500 to-teal-600" }
};

const difficultyConfig = {
  easy: { color: "bg-emerald-100 text-emerald-700", label: "Beginner Friendly", icon: "🌱" },
  medium: { color: "bg-amber-100 text-amber-700", label: "Intermediate", icon: "🔥" },
  hard: { color: "bg-red-100 text-red-700", label: "Advanced", icon: "⭐" }
};

const BlenderPractice: React.FC = () => {
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [showHint, setShowHint] = useState(false);
  const [showExample, setShowExample] = useState(false);
  const [exerciseCompleted, setExerciseCompleted] = useState(false);
  const [completedExercises, setCompletedExercises] = useState<string[]>([]);
  const [filterCategory, setFilterCategory] = useState<string>("all");

  const filteredExercises = filterCategory === "all" 
    ? exercises 
    : exercises.filter((e) => e.category === filterCategory);

  const markStepComplete = () => {
    if (!completedSteps.includes(currentStep)) {
      const newCompleted = [...completedSteps, currentStep];
      setCompletedSteps(newCompleted);
      
      if (selectedExercise && newCompleted.length === selectedExercise.steps.length) {
        setExerciseCompleted(true);
        if (!completedExercises.includes(selectedExercise.id)) {
          setCompletedExercises([...completedExercises, selectedExercise.id]);
        }
      } else if (currentStep < (selectedExercise?.steps.length || 1) - 1) {
        setCurrentStep(currentStep + 1);
      }
    }
    setShowHint(false);
    setShowExample(false);
  };

  const resetExercise = () => {
    setCurrentStep(0);
    setCompletedSteps([]);
    setExerciseCompleted(false);
    setShowHint(false);
    setShowExample(false);
  };

  const startExercise = (exercise: Exercise) => {
    setSelectedExercise(exercise);
    resetExercise();
  };

  const navigateToExercise = (direction: "prev" | "next") => {
    if (!selectedExercise) return;
    const currentIndex = exercises.findIndex(e => e.id === selectedExercise.id);
    const newIndex = direction === "prev" ? currentIndex - 1 : currentIndex + 1;
    if (newIndex >= 0 && newIndex < exercises.length) {
      startExercise(exercises[newIndex]);
    }
  };

  // Interactive Practice View
  if (selectedExercise) {
    const step = selectedExercise.steps[currentStep];
    const progress = (completedSteps.length / selectedExercise.steps.length) * 100;
    const colors = categoryColors[selectedExercise.category];
    const currentExerciseIndex = exercises.findIndex(e => e.id === selectedExercise.id);
    const hasPrev = currentExerciseIndex > 0;
    const hasNext = currentExerciseIndex < exercises.length - 1;

    // Exercise Completed View
    if (exerciseCompleted) {
      return (
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 rounded-2xl p-8 text-white text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-white/5" />
            <div className="relative">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-2xl font-bold mb-2">Exercise Completed!</h2>
              <p className="text-white/80">Great job! You've successfully completed this exercise.</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 h-48 flex items-center justify-center">
              <div className="text-center">
                <span className="text-8xl">{selectedExercise.referenceImage}</span>
                <p className="text-white/60 text-sm mt-3">Your Completed Model</p>
              </div>
            </div>
            <div className="p-6">
              <h3 className="font-bold text-gray-800 text-lg">{selectedExercise.title}</h3>
              <p className="text-gray-500 text-sm mt-1">{selectedExercise.objective}</p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-2xl border border-violet-100 p-6">
            <h3 className="font-bold text-violet-800 flex items-center gap-2 mb-4">
              <span className="text-xl">🏆</span> Skills Learned
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {selectedExercise.skillsLearned.map((skill, idx) => (
                <div key={idx} className="flex items-center gap-2 p-3 bg-white rounded-xl border border-violet-100">
                  <span className="w-6 h-6 rounded-full bg-violet-500 text-white text-xs flex items-center justify-center">✓</span>
                  <span className="text-sm text-violet-700">{skill}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white rounded-xl border border-gray-100 p-4 text-center">
              <p className="text-2xl font-bold text-emerald-600">{selectedExercise.steps.length}</p>
              <p className="text-xs text-gray-500 mt-1">Steps Completed</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 p-4 text-center">
              <p className="text-2xl font-bold text-blue-600">{selectedExercise.skillsLearned.length}</p>
              <p className="text-xs text-gray-500 mt-1">Skills Learned</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 p-4 text-center">
              <p className="text-2xl font-bold text-amber-600">100%</p>
              <p className="text-xs text-gray-500 mt-1">Progress</p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <button onClick={resetExercise} className="py-3 px-4 bg-gray-100 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
              🔄 Repeat
            </button>
            <button onClick={() => setSelectedExercise(null)} className="py-3 px-4 bg-gray-100 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
              📋 All Exercises
            </button>
            {hasPrev && (
              <button onClick={() => navigateToExercise("prev")} className="py-3 px-4 bg-gray-100 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
                ← Previous
              </button>
            )}
            {hasNext && (
              <button onClick={() => navigateToExercise("next")} className="py-3 px-4 bg-orange-500 rounded-xl text-sm font-medium text-white hover:bg-orange-600 transition-colors flex items-center justify-center gap-2">
                Next Exercise →
              </button>
            )}
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        {/* Top Navigation Bar */}
        <div className="flex items-center justify-between">
          <button onClick={() => setSelectedExercise(null)} className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors">
            ← Back to Exercises
          </button>
          <div className="flex items-center gap-2">
            <button onClick={resetExercise} className="px-3 py-1.5 text-xs bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors">
              🔄 Reset
            </button>
            {hasPrev && (
              <button onClick={() => navigateToExercise("prev")} className="px-3 py-1.5 text-xs bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors">
                ← Prev
              </button>
            )}
            {hasNext && (
              <button onClick={() => navigateToExercise("next")} className="px-3 py-1.5 text-xs bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors">
                Next →
              </button>
            )}
          </div>
        </div>

        {/* Exercise Objective Banner */}
        <div className={`bg-gradient-to-r ${colors.gradient} rounded-2xl p-5 text-white`}>
          <div className="flex items-start gap-4">
            <div className="text-5xl">{selectedExercise.referenceImage}</div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2 py-0.5 bg-white/20 rounded text-[10px] font-medium">
                  {difficultyConfig[selectedExercise.difficulty].icon} {difficultyConfig[selectedExercise.difficulty].label}
                </span>
                <span className="text-white/70 text-xs">⏱️ {selectedExercise.estimatedTime}</span>
              </div>
              <h2 className="font-bold text-xl">{selectedExercise.title}</h2>
              <p className="text-white/80 text-sm mt-1">{selectedExercise.objective}</p>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span>Progress</span>
              <span>{completedSteps.length}/{selectedExercise.steps.length} steps</span>
            </div>
            <div className="h-2 bg-white/20 rounded-full overflow-hidden">
              <div className="h-full bg-white rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
            </div>
          </div>
        </div>

        {/* Split Layout: Practice Workspace + Instructions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Left: Interactive Practice Viewer */}
          <div className="bg-gray-900 rounded-2xl overflow-hidden">
            <div className="h-64 lg:h-80 flex items-center justify-center relative">
              <div className="text-center">
                <div className="text-7xl mb-3 animate-pulse">{step.demonstration}</div>
                <p className="text-white/60 text-sm">Step {currentStep + 1}: {step.title}</p>
              </div>
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <div className="flex gap-2">
                  <span className="px-2 py-1 bg-white/10 rounded text-white/60 text-[10px]">Perspective</span>
                  <span className="px-2 py-1 bg-white/10 rounded text-white/60 text-[10px]">Object Mode</span>
                </div>
                <span className="px-2 py-1 bg-blue-500/50 rounded text-white text-[10px]">Follow Along</span>
              </div>
            </div>
            <div className="p-4 border-t border-white/10">
              <p className="text-white/40 text-[10px] font-medium mb-1">EXPECTED RESULT</p>
              <p className="text-white/80 text-sm">{step.expectedResult}</p>
            </div>
          </div>

          {/* Right: Step Instructions */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-5 py-3 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      completedSteps.includes(currentStep) ? "bg-emerald-500 text-white" : "bg-orange-500 text-white"
                    }`}>
                      {completedSteps.includes(currentStep) ? "✓" : currentStep + 1}
                    </span>
                    <div>
                      <p className="font-bold text-gray-800">{step.title}</p>
                      <p className="text-xs text-gray-400">Tool: {step.toolUsed}</p>
                    </div>
                  </div>
                  <span className="text-2xl">{categoryIcons[selectedExercise.category]}</span>
                </div>
              </div>

              <div className="p-5">
                <p className="text-gray-700 text-sm leading-relaxed">{step.instruction}</p>
                {step.shortcut && (
                  <div className="mt-4 flex items-center gap-2">
                    <span className="text-xs text-gray-400">Shortcut:</span>
                    <code className="px-3 py-1.5 bg-gray-900 text-white text-sm font-mono rounded-lg">{step.shortcut}</code>
                  </div>
                )}
              </div>

              {step.tip && (
                <div className="mx-5 mb-5 p-4 bg-blue-50 rounded-xl border border-blue-100">
                  <div className="flex items-start gap-2">
                    <span className="text-lg">💡</span>
                    <div>
                      <p className="text-xs font-bold text-blue-800 mb-1">Pro Tip</p>
                      <p className="text-xs text-blue-700">{step.tip}</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="px-5 pb-5 space-y-3">
                {!completedSteps.includes(currentStep) && (
                  <button onClick={markStepComplete} className="w-full py-3 bg-emerald-500 text-white rounded-xl text-sm font-medium hover:bg-emerald-600 transition-colors flex items-center justify-center gap-2">
                    ✓ I've Completed This Step
                  </button>
                )}

                <div className="flex gap-2">
                  <button onClick={() => setShowHint(!showHint)} className={`flex-1 py-2 rounded-lg text-xs font-medium transition-colors ${showHint ? "bg-amber-100 text-amber-700" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
                    💬 {showHint ? "Hide Hint" : "Show Hint"}
                  </button>
                  <button onClick={() => setShowExample(!showExample)} className={`flex-1 py-2 rounded-lg text-xs font-medium transition-colors ${showExample ? "bg-violet-100 text-violet-700" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
                    🖼️ {showExample ? "Hide Example" : "Show Example"}
                  </button>
                </div>
              </div>

              {showHint && (
                <div className="mx-5 mb-5 p-4 bg-amber-50 rounded-xl border border-amber-200">
                  <p className="text-xs font-bold text-amber-800 mb-2">💡 Helpful Hint</p>
                  <p className="text-xs text-amber-700">{step.tip || "Focus on the viewport and follow the shortcut shown above."}</p>
                  <p className="text-xs text-amber-600 mt-2">Remember: {step.toolUsed} is the key tool for this step.</p>
                </div>
              )}

              {showExample && (
                <div className="mx-5 mb-5 p-4 bg-violet-50 rounded-xl border border-violet-200">
                  <p className="text-xs font-bold text-violet-800 mb-2">📸 Expected Result</p>
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-violet-100 rounded-xl flex items-center justify-center text-3xl">{step.demonstration}</div>
                    <div className="flex-1">
                      <p className="text-xs text-violet-700">{step.expectedResult}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="flex gap-2">
              <button onClick={() => setCurrentStep(Math.max(0, currentStep - 1))} disabled={currentStep === 0} className={`flex-1 py-2 rounded-lg text-xs font-medium transition-colors ${currentStep === 0 ? "bg-gray-100 text-gray-300 cursor-not-allowed" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
                ← Previous Step
              </button>
              <button onClick={() => setCurrentStep(Math.min(selectedExercise.steps.length - 1, currentStep + 1))} disabled={currentStep === selectedExercise.steps.length - 1} className={`flex-1 py-2 rounded-lg text-xs font-medium transition-colors ${currentStep === selectedExercise.steps.length - 1 ? "bg-gray-100 text-gray-300 cursor-not-allowed" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
                Next Step →
              </button>
            </div>
          </div>
        </div>

        {/* All Steps Overview */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <h3 className="font-bold text-gray-800 text-sm mb-4">📋 All Steps</h3>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {selectedExercise.steps.map((s, idx) => {
              const isComplete = completedSteps.includes(idx);
              const isCurrent = currentStep === idx;
              return (
                <button key={idx} onClick={() => setCurrentStep(idx)} className={`p-3 rounded-xl text-left transition-all ${isComplete ? "bg-emerald-50 border border-emerald-200" : isCurrent ? "bg-orange-50 border-2 border-orange-300" : "bg-gray-50 border border-gray-100 hover:border-gray-200"}`}>
                  <div className="flex items-center gap-2">
                    <span className={`w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center ${isComplete ? "bg-emerald-500 text-white" : isCurrent ? "bg-orange-500 text-white" : "bg-gray-300 text-white"}`}>
                      {isComplete ? "✓" : idx + 1}
                    </span>
                    <span className={`text-[11px] font-medium truncate ${isComplete ? "text-emerald-700" : isCurrent ? "text-orange-700" : "text-gray-600"}`}>{s.title}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // Exercise List View
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-rose-500 via-pink-500 to-fuchsia-500 rounded-2xl p-6 text-white relative overflow-hidden">
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full" />
        <div className="relative">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">🏋️</span>
            <div>
              <h2 className="font-bold text-xl">Interactive Practice Lab</h2>
              <p className="text-white/70 text-sm">Learn by doing with guided exercises</p>
            </div>
          </div>
          <p className="text-white/80 text-sm leading-relaxed mt-3 max-w-xl">
            Practice directly inside the platform with step-by-step guidance, visual demonstrations, and instant feedback. Each exercise walks you through from start to finish.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-gray-800 text-sm">📊 Your Progress</h3>
          <span className="text-sm text-gray-500">{completedExercises.length}/{exercises.length} exercises</span>
        </div>
        <div className="h-3 bg-gray-100 rounded-full overflow-hidden mb-4">
          <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all" style={{ width: `${(completedExercises.length / exercises.length) * 100}%` }} />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-xl font-bold text-emerald-600">{completedExercises.length}</p>
            <p className="text-[10px] text-gray-400">Completed</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-bold text-blue-600">{exercises.length - completedExercises.length}</p>
            <p className="text-[10px] text-gray-400">Remaining</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-bold text-amber-600">{exercises.reduce((acc, e) => acc + e.skillsLearned.length, 0)}</p>
            <p className="text-[10px] text-gray-400">Skills Available</p>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <button onClick={() => setFilterCategory("all")} className={`px-4 py-2 rounded-xl text-xs font-medium transition-colors ${filterCategory === "all" ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
          All ({exercises.length})
        </button>
        {Object.entries(categoryIcons).map(([cat, icon]) => {
          const count = exercises.filter((e) => e.category === cat).length;
          if (count === 0) return null;
          return (
            <button key={cat} onClick={() => setFilterCategory(cat)} className={`px-4 py-2 rounded-xl text-xs font-medium transition-colors capitalize flex items-center gap-1 ${filterCategory === cat ? "bg-orange-500 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
              {icon} {cat} ({count})
            </button>
          );
        })}
      </div>

      <div className="space-y-4">
        {filteredExercises.map((exercise) => {
          const colors = categoryColors[exercise.category];
          const difficulty = difficultyConfig[exercise.difficulty];
          const isCompleted = completedExercises.includes(exercise.id);
          
          return (
            <div key={exercise.id} className={`bg-white rounded-2xl border overflow-hidden transition-all ${isCompleted ? "border-emerald-200" : "border-gray-100 hover:border-gray-200 hover:shadow-md"}`}>
              <div className="flex flex-col sm:flex-row">
                <div className={`sm:w-40 h-32 sm:h-auto bg-gradient-to-br ${colors.gradient} flex items-center justify-center`}>
                  <span className="text-6xl">{exercise.referenceImage}</span>
                </div>
                <div className="flex-1 p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <h3 className={`font-bold text-gray-800 ${isCompleted ? "line-through text-gray-400" : ""}`}>{exercise.title}</h3>
                        {isCompleted && <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-[10px] font-medium rounded">✓ Completed</span>}
                      </div>
                      <div className="flex items-center gap-2 flex-wrap mb-2">
                        <span className={`px-2 py-0.5 text-[10px] font-medium rounded ${difficulty.color}`}>{difficulty.icon} {difficulty.label}</span>
                        <span className={`px-2 py-0.5 text-[10px] font-medium rounded capitalize ${colors.bg} ${colors.text}`}>{exercise.category}</span>
                        <span className="text-[10px] text-gray-400">⏱️ {exercise.estimatedTime}</span>
                        <span className="text-[10px] text-gray-400">📝 {exercise.steps.length} steps</span>
                      </div>
                      <p className="text-xs text-gray-500 mb-3">{exercise.objective}</p>
                      <div className="flex flex-wrap gap-1">
                        {exercise.skillsLearned.slice(0, 4).map((skill, idx) => (
                          <span key={idx} className="px-2 py-0.5 bg-gray-100 text-gray-500 text-[10px] rounded">{skill}</span>
                        ))}
                        {exercise.skillsLearned.length > 4 && (
                          <span className="px-2 py-0.5 bg-gray-100 text-gray-400 text-[10px] rounded">+{exercise.skillsLearned.length - 4} more</span>
                        )}
                      </div>
                    </div>
                    <button onClick={() => startExercise(exercise)} className={`px-5 py-3 rounded-xl text-sm font-medium transition-colors flex-shrink-0 ${isCompleted ? "bg-gray-100 text-gray-600 hover:bg-gray-200" : "bg-orange-500 text-white hover:bg-orange-600"}`}>
                      {isCompleted ? "Practice Again" : "Start Exercise"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-100 p-6">
        <h3 className="font-bold text-blue-800 mb-4">✨ Interactive Learning Features</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="w-12 h-12 mx-auto bg-blue-100 rounded-xl flex items-center justify-center text-2xl mb-2">📋</div>
            <p className="text-xs font-medium text-blue-800">Step-by-Step</p>
            <p className="text-[10px] text-blue-600">Guided instructions</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 mx-auto bg-blue-100 rounded-xl flex items-center justify-center text-2xl mb-2">💡</div>
            <p className="text-xs font-medium text-blue-800">Pro Tips</p>
            <p className="text-[10px] text-blue-600">Expert guidance</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 mx-auto bg-blue-100 rounded-xl flex items-center justify-center text-2xl mb-2">✅</div>
            <p className="text-xs font-medium text-blue-800">Validation</p>
            <p className="text-[10px] text-blue-600">Track progress</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 mx-auto bg-blue-100 rounded-xl flex items-center justify-center text-2xl mb-2">🏆</div>
            <p className="text-xs font-medium text-blue-800">Skills</p>
            <p className="text-[10px] text-blue-600">Learn and grow</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlenderPractice;
