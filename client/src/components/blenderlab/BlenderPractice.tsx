import React, { useState } from "react";

interface Exercise {
  id: string;
  title: string;
  category: "modeling" | "lighting" | "texturing" | "rendering";
  difficulty: "easy" | "medium" | "hard";
  description: string;
  objective: string;
  instructions: string[];
  tips: string[];
  estimatedTime: string;
}

const exercises: Exercise[] = [
  {
    id: "model-cup",
    title: "Model a Simple Cup",
    category: "modeling",
    difficulty: "easy",
    description: "Create a basic cup/mug shape using primitive modeling techniques.",
    objective: "Practice cylinder manipulation and basic extrusion to create a hollow vessel.",
    estimatedTime: "15-20 min",
    instructions: [
      "Start with a cylinder (Shift + A > Mesh > Cylinder)",
      "Enter Edit Mode (Tab)",
      "Select the top face and delete it to make the cylinder hollow",
      "Or use Inset (I) on the top face, then extrude down (E) to create thickness",
      "Add a loop cut (Ctrl + R) near the bottom and scale outward for a base",
      "Select edge loops on the side and scale to shape the cup profile",
      "For a handle, add a torus, shape it, and join (Ctrl + J) with the cup"
    ],
    tips: [
      "Use Subdivision Surface modifier to smooth the final result",
      "Keep topology clean with even quad faces",
      "Work in orthographic views (Numpad 1, 3) for precision"
    ]
  },
  {
    id: "model-table",
    title: "Model a Wooden Table",
    category: "modeling",
    difficulty: "easy",
    description: "Create a simple four-legged table with a flat top surface.",
    objective: "Practice creating and positioning multiple objects, joining, and basic transformations.",
    estimatedTime: "20-25 min",
    instructions: [
      "Create a cube and scale it flat (S, Z, 0.1) to make the tabletop",
      "Scale it wider (S, X) and longer (S, Y) to table dimensions",
      "Create another cube for a leg - scale it thin and tall",
      "Position the leg near one corner of the tabletop",
      "Duplicate the leg (Shift + D) and position at each corner",
      "Select all parts and join them (Ctrl + J) into one object",
      "Apply smooth shading and add a Bevel modifier for realistic edges"
    ],
    tips: [
      "Use snapping (hold Ctrl while moving) for precise placement",
      "Apply transforms (Ctrl + A > All Transforms) before modifiers",
      "Add a wood material later for realism"
    ]
  },
  {
    id: "model-snowman",
    title: "Model a Snowman Character",
    category: "modeling",
    difficulty: "medium",
    description: "Create a three-sphere snowman with facial features and accessories.",
    objective: "Practice working with multiple primitives, proportional editing, and adding details.",
    estimatedTime: "30-40 min",
    instructions: [
      "Add a UV Sphere for the large bottom body",
      "Add a smaller sphere above it for the middle section",
      "Add the smallest sphere on top for the head",
      "Add small spheres for eyes and buttons (coal pieces)",
      "Create a cone for the carrot nose",
      "Shape a cylinder into a top hat",
      "Add twig arms using tubes or simple extruded shapes",
      "Group and join appropriate parts"
    ],
    tips: [
      "Use different materials for each element (white for snow, orange for carrot, etc.)",
      "Position objects in Front view (Numpad 1) for vertical alignment",
      "Scale the hat to fit proportionally on the head"
    ]
  },
  {
    id: "light-portrait",
    title: "Portrait Lighting Setup",
    category: "lighting",
    difficulty: "easy",
    description: "Create a classic three-point lighting setup for illuminating a subject.",
    objective: "Understand key, fill, and rim lights and how they work together.",
    estimatedTime: "15-20 min",
    instructions: [
      "Add a subject (any simple object or imported model)",
      "Add a Key Light (Area Light) at 45° to one side, slightly above the subject",
      "Add a Fill Light (softer Area Light) on the opposite side, less intense",
      "Add a Rim Light behind the subject, pointing toward the camera",
      "Adjust intensities: Key strongest, Fill about 50% of Key, Rim for edge highlight",
      "Switch to Rendered view to see the lighting effect"
    ],
    tips: [
      "Key light creates the main shadows and defines form",
      "Fill light softens shadows without eliminating them",
      "Rim light separates the subject from the background"
    ]
  },
  {
    id: "light-dramatic",
    title: "Dramatic Mood Lighting",
    category: "lighting",
    difficulty: "medium",
    description: "Create a high-contrast, moody lighting setup with deep shadows.",
    objective: "Learn to use a single strong light source for dramatic effect.",
    estimatedTime: "20-25 min",
    instructions: [
      "Start with a scene containing your objects",
      "Delete all existing lights",
      "Add a single Spot light positioned to one side, aiming at your subject",
      "Set the spot size narrow (around 30-45 degrees)",
      "Increase the power significantly for strong highlights",
      "Consider adding a very dim fill or using ambient occlusion",
      "Adjust the world background to very dark or black"
    ],
    tips: [
      "High contrast = strong light + minimal fill",
      "Let some areas fall into complete shadow",
      "Colored lights can enhance mood (blue = cold, orange = warm)"
    ]
  },
  {
    id: "light-product",
    title: "Product Photography Lighting",
    category: "lighting",
    difficulty: "medium",
    description: "Set up clean, professional lighting for a product render.",
    objective: "Create even, soft lighting with minimal harsh shadows for product visualization.",
    estimatedTime: "25-30 min",
    instructions: [
      "Place your product object on a simple curved backdrop (plane with a curve modifier)",
      "Add a large Area Light directly above, pointing down (soft top light)",
      "Add Area Lights on both sides at eye level for fill",
      "Optionally add a subtle light from below (bounce light effect)",
      "Use HDRI for natural reflections if the product is glossy",
      "Ensure shadows are soft and not too dark"
    ],
    tips: [
      "Large light sources = soft shadows",
      "Keep lighting even for clean product shots",
      "White or neutral backdrop helps color accuracy"
    ]
  },
  {
    id: "texture-brick-wall",
    title: "Create a Brick Wall Material",
    category: "texturing",
    difficulty: "easy",
    description: "Apply and set up a brick texture using the Shader Editor.",
    objective: "Learn to use image textures and set up basic material nodes.",
    estimatedTime: "20-25 min",
    instructions: [
      "Create a plane and scale it to wall-sized proportions",
      "Download a brick texture set (diffuse, normal, roughness) from textures.com or similar",
      "Create a new material and open the Shader Editor",
      "Add an Image Texture node and load the diffuse (color) map",
      "Connect it to the Base Color of the Principled BSDF",
      "Add another Image Texture for the Normal map, connect through a Normal Map node",
      "Add a third Image Texture for Roughness, connect to Roughness input",
      "Add a Texture Coordinate > UV and Mapping node to control scale"
    ],
    tips: [
      "Normal maps give the illusion of depth without extra geometry",
      "Set normal map images to Non-Color in the Image Texture node",
      "Use Mapping node scale values to tile the texture"
    ]
  },
  {
    id: "texture-procedural-wood",
    title: "Create Procedural Wood Material",
    category: "texturing",
    difficulty: "medium",
    description: "Build a wood material entirely from procedural nodes — no images needed.",
    objective: "Understand procedural texturing using noise and wave patterns.",
    estimatedTime: "30-35 min",
    instructions: [
      "Create a new material and open the Shader Editor",
      "Add a Musgrave Texture node for base wood grain variation",
      "Add a Wave Texture node set to 'Bands' for wood ring patterns",
      "Mix the two using a Mix RGB node for combined effect",
      "Use a ColorRamp to map values to wood colors (light tan to dark brown)",
      "Connect the color output to Base Color",
      "Add subtle variation to Roughness using the same textures"
    ],
    tips: [
      "Procedural materials can be scaled infinitely without tiling issues",
      "Experiment with different texture scales and distortion amounts",
      "Add Bump node for subtle surface relief"
    ]
  },
  {
    id: "render-first-image",
    title: "Render Your First Scene",
    category: "rendering",
    difficulty: "easy",
    description: "Configure render settings and output your first Blender image.",
    objective: "Learn the basics of render output, resolution, and file saving.",
    estimatedTime: "15-20 min",
    instructions: [
      "Open Render Properties (camera icon in Properties panel)",
      "Set Resolution to 1920x1080 (HD) or your preferred size",
      "Choose Render Engine: Eevee for fast preview, Cycles for realistic output",
      "Set Samples: 128 for Eevee, 256-512 for Cycles (more = cleaner but slower)",
      "Press F12 to render the current camera view",
      "Once complete, go to Image > Save As to save your render",
      "Choose format (PNG for transparency, JPEG for web)"
    ],
    tips: [
      "Eevee is much faster but less physically accurate",
      "Cycles gives realistic lighting, reflections, and shadows",
      "Enable Denoising in Cycles for cleaner results at lower samples"
    ]
  },
  {
    id: "render-turntable",
    title: "Create a Turntable Animation",
    category: "rendering",
    difficulty: "hard",
    description: "Render a 360° spinning animation of your model.",
    objective: "Learn basic animation rendering and video output settings.",
    estimatedTime: "40-50 min",
    instructions: [
      "Position your model at the world origin",
      "Add an Empty (Shift + A > Empty > Plain Axes)",
      "Parent the camera to the Empty (select camera, then Empty, Ctrl + P > Object)",
      "Position the camera to frame your model",
      "Select the Empty, go to frame 1, rotate Z = 0, press I > Rotation",
      "Go to frame 120, rotate Z = 360°, press I > Rotation",
      "In Graph Editor, set keyframe extrapolation to Linear for smooth loop",
      "In Render Properties, set Frame End to 120, output to FFmpeg Video",
      "Press Ctrl + F12 to render animation"
    ],
    tips: [
      "120 frames at 30fps = 4 second loop",
      "Use a simple HDRI or gradient background",
      "Render at lower resolution first to test timing"
    ]
  }
];

const categoryIcons: Record<string, string> = {
  modeling: "🏗️",
  lighting: "💡",
  texturing: "🎨",
  rendering: "📷"
};

const categoryColors: Record<string, { bg: string; text: string; border: string }> = {
  modeling: { bg: "bg-blue-50", text: "text-blue-600", border: "border-blue-200" },
  lighting: { bg: "bg-amber-50", text: "text-amber-600", border: "border-amber-200" },
  texturing: { bg: "bg-pink-50", text: "text-pink-600", border: "border-pink-200" },
  rendering: { bg: "bg-emerald-50", text: "text-emerald-600", border: "border-emerald-200" }
};

const difficultyColors: Record<string, string> = {
  easy: "bg-emerald-100 text-emerald-700",
  medium: "bg-amber-100 text-amber-700",
  hard: "bg-red-100 text-red-700"
};

const BlenderPractice: React.FC = () => {
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [completedExercises, setCompletedExercises] = useState<string[]>([]);

  const filteredExercises = filterCategory === "all" 
    ? exercises 
    : exercises.filter((e) => e.category === filterCategory);

  const toggleComplete = (id: string) => {
    if (completedExercises.includes(id)) {
      setCompletedExercises(completedExercises.filter((e) => e !== id));
    } else {
      setCompletedExercises([...completedExercises, id]);
    }
  };

  if (selectedExercise) {
    const colors = categoryColors[selectedExercise.category];
    const isCompleted = completedExercises.includes(selectedExercise.id);

    return (
      <div className="space-y-6">
        {/* Back */}
        <button
          onClick={() => setSelectedExercise(null)}
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
        >
          <span>←</span> Back to Exercises
        </button>

        {/* Exercise Header */}
        <div className={`${colors.bg} rounded-2xl p-6 border ${colors.border}`}>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <span className="text-4xl">{categoryIcons[selectedExercise.category]}</span>
              <div>
                <h2 className={`font-bold text-xl ${colors.text}`}>{selectedExercise.title}</h2>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`px-2 py-0.5 text-[10px] font-medium rounded capitalize ${difficultyColors[selectedExercise.difficulty]}`}>
                    {selectedExercise.difficulty}
                  </span>
                  <span className="text-xs text-gray-500 capitalize">{selectedExercise.category}</span>
                  <span className="text-xs text-gray-400">⏱️ {selectedExercise.estimatedTime}</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => toggleComplete(selectedExercise.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                isCompleted
                  ? "bg-emerald-500 text-white"
                  : "bg-white border border-gray-200 text-gray-600 hover:border-emerald-300"
              }`}
            >
              {isCompleted ? "✓ Completed" : "Mark Complete"}
            </button>
          </div>
          <p className="text-gray-600 text-sm mt-4">{selectedExercise.description}</p>
        </div>

        {/* Objective */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <h3 className="font-bold text-gray-800 text-sm mb-2">🎯 Objective</h3>
          <p className="text-gray-600 text-sm">{selectedExercise.objective}</p>
        </div>

        {/* Instructions */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <h3 className="font-bold text-gray-800 text-sm mb-4">📋 Instructions</h3>
          <ol className="space-y-3">
            {selectedExercise.instructions.map((instruction, idx) => (
              <li key={idx} className="flex gap-3">
                <span className="w-6 h-6 rounded-full bg-orange-100 text-orange-600 text-xs font-bold flex items-center justify-center flex-shrink-0">
                  {idx + 1}
                </span>
                <p className="text-sm text-gray-700">{instruction}</p>
              </li>
            ))}
          </ol>
        </div>

        {/* Tips */}
        <div className="bg-blue-50 rounded-2xl border border-blue-100 p-5">
          <h3 className="font-bold text-blue-800 text-sm mb-3">💡 Pro Tips</h3>
          <ul className="space-y-2">
            {selectedExercise.tips.map((tip, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-blue-500 mt-0.5">•</span>
                <p className="text-sm text-blue-700">{tip}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Actions */}
        <button
          onClick={() => setSelectedExercise(null)}
          className="w-full py-3 bg-orange-500 rounded-xl text-sm font-medium text-white hover:bg-orange-600 transition-colors"
        >
          Back to Exercises
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-rose-500 via-pink-500 to-fuchsia-500 rounded-2xl p-6 text-white relative overflow-hidden">
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full" />
        <div className="relative">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">🏋️</span>
            <div>
              <h2 className="font-bold text-xl">Practice Exercises</h2>
              <p className="text-white/70 text-sm">Hands-on challenges to build your skills</p>
            </div>
          </div>
          <p className="text-white/80 text-sm leading-relaxed mt-3 max-w-xl">
            Put your knowledge into practice with targeted exercises. Each exercise includes 
            clear objectives, step-by-step instructions, and pro tips to help you succeed.
          </p>
        </div>
      </div>

      {/* Progress */}
      <div className="bg-white rounded-xl border border-gray-100 p-4">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-medium text-gray-700">Your Progress</p>
          <p className="text-sm text-gray-500">{completedExercises.length}/{exercises.length} completed</p>
        </div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all"
            style={{ width: `${(completedExercises.length / exercises.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setFilterCategory("all")}
          className={`px-4 py-2 rounded-xl text-xs font-medium transition-colors ${
            filterCategory === "all" ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          All ({exercises.length})
        </button>
        {Object.entries(categoryIcons).map(([cat, icon]) => {
          const count = exercises.filter((e) => e.category === cat).length;
          return (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-medium transition-colors capitalize flex items-center gap-1 ${
                filterCategory === cat
                  ? "bg-orange-500 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {icon} {cat} ({count})
            </button>
          );
        })}
      </div>

      {/* Exercises Grid */}
      <div className="grid gap-4">
        {filteredExercises.map((exercise) => {
          const colors = categoryColors[exercise.category];
          const isCompleted = completedExercises.includes(exercise.id);
          return (
            <div
              key={exercise.id}
              className={`bg-white rounded-xl border p-5 transition-all ${
                isCompleted ? "border-emerald-200 bg-emerald-50/50" : "border-gray-100 hover:border-gray-200 hover:shadow-sm"
              }`}
            >
              <div className="flex items-start gap-4">
                <span className="text-2xl">{categoryIcons[exercise.category]}</span>
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <h3 className={`font-bold text-gray-800 ${isCompleted ? "line-through text-gray-400" : ""}`}>
                      {exercise.title}
                    </h3>
                    {isCompleted && <span className="text-emerald-500 text-xs font-medium">✓ Done</span>}
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`px-2 py-0.5 text-[10px] font-medium rounded capitalize ${difficultyColors[exercise.difficulty]}`}>
                      {exercise.difficulty}
                    </span>
                    <span className={`px-2 py-0.5 text-[10px] font-medium rounded capitalize ${colors.bg} ${colors.text}`}>
                      {exercise.category}
                    </span>
                    <span className="text-[11px] text-gray-400">⏱️ {exercise.estimatedTime}</span>
                  </div>
                  <p className="text-xs text-gray-500 line-clamp-2">{exercise.description}</p>
                </div>
                <button
                  onClick={() => setSelectedExercise(exercise)}
                  className="px-4 py-2 bg-orange-500 text-white text-xs font-medium rounded-lg hover:bg-orange-600 transition-colors flex-shrink-0"
                >
                  Start
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Category Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {Object.entries(categoryIcons).map(([cat, icon]) => {
          const total = exercises.filter((e) => e.category === cat).length;
          const completed = exercises.filter((e) => e.category === cat && completedExercises.includes(e.id)).length;
          const colors = categoryColors[cat];
          return (
            <div key={cat} className={`${colors.bg} rounded-xl p-4 border ${colors.border}`}>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">{icon}</span>
                <span className={`text-xs font-medium capitalize ${colors.text}`}>{cat}</span>
              </div>
              <p className={`text-xl font-bold ${colors.text}`}>{completed}/{total}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BlenderPractice;
