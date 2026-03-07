import React, { useState } from "react";

interface ProjectStep {
  title: string;
  description: string;
  tasks: string[];
  tips: string[];
}

interface Project {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  description: string;
  learningOutcomes: string[];
  estimatedTime: string;
  prerequisites: string[];
  steps: ProjectStep[];
  finalResult: string;
  gradient: string;
}

const projects: Project[] = [
  {
    id: "simple-3d-scene",
    title: "Simple 3D Room Scene",
    subtitle: "Your First Complete Project",
    icon: "🏠",
    difficulty: "beginner",
    description: "Build a complete 3D room environment from scratch. You'll create furniture, add materials and textures, set up lighting, and render a final image. This project brings together all the beginner skills you've learned.",
    learningOutcomes: [
      "Model multiple objects in a single scene",
      "Apply different materials to various objects",
      "Set up proper scene lighting",
      "Compose and render a final image"
    ],
    estimatedTime: "3-5 hours",
    prerequisites: [
      "Basic navigation in Blender",
      "Adding and transforming objects",
      "Edit Mode fundamentals",
      "Applying basic materials"
    ],
    gradient: "from-emerald-500 to-teal-500",
    finalResult: "A rendered image of a cozy room with furniture, textured walls, and warm lighting",
    steps: [
      {
        title: "Create the Room Structure",
        description: "Build the floor, walls, and basic room layout.",
        tasks: [
          "Create a large plane for the floor and scale to room size",
          "Add cube walls — scale thin and position around the floor perimeter",
          "Leave one wall missing for the camera view into the room",
          "Add a plane for the ceiling (optional)",
          "Join all room elements (Ctrl + J)"
        ],
        tips: [
          "Work in Top view (Numpad 7) for wall positioning",
          "Use grid snapping for even spacing",
          "Room size: roughly 10m x 10m is a good starting point"
        ]
      },
      {
        title: "Model the Furniture",
        description: "Create simple furniture pieces for the room.",
        tasks: [
          "Model a simple table (flat top + 4 legs)",
          "Create a chair (seat, backrest, legs)",
          "Add a simple bookshelf (frame + shelves)",
          "Create a rug (flat plane on the floor)",
          "Optionally add a lamp, picture frames, or decorative items"
        ],
        tips: [
          "Keep geometry simple — focus on overall shapes",
          "Duplicate and modify to create variations",
          "Group furniture logically in the Outliner"
        ]
      },
      {
        title: "Apply Materials",
        description: "Give each object its own material and color.",
        tasks: [
          "Floor: Wood material with brown base color",
          "Walls: Off-white or cream color",
          "Table: Dark wood material with some roughness",
          "Chair: Match the table or use fabric texture",
          "Rug: Colorful fabric with high roughness",
          "Adjust roughness and metallic values for realism"
        ],
        tips: [
          "Use Material Preview mode (Z > Material Preview) to see results",
          "Varying roughness adds visual interest",
          "Consider using procedural noise for subtle texture variation"
        ]
      },
      {
        title: "Set Up Lighting",
        description: "Add lights to illuminate your room naturally.",
        tasks: [
          "Add a Sun light to simulate daylight through a window",
          "Position Area lights for ambient room lighting",
          "Consider adding a Point light inside the lamp fixture",
          "Adjust light colors (warm yellow for indoor lights)",
          "Balance light intensities for even illumination"
        ],
        tips: [
          "Too many lights can make scenes look flat",
          "Shadows add depth and realism",
          "Test your lighting in Rendered view"
        ]
      },
      {
        title: "Camera & Composition",
        description: "Position the camera and frame your shot.",
        tasks: [
          "Move the camera (G) to a corner of the room looking in",
          "Adjust camera height to eye level",
          "Use camera view (Numpad 0) to see the final frame",
          "Apply rule of thirds for composition",
          "Enable Depth of Field for a cinematic look"
        ],
        tips: [
          "Lock camera to view (N panel > View > Lock Camera to View) for easy adjustment",
          "A lower f-stop number = more blur in background",
          "Frame important furniture in the center or at focal points"
        ]
      },
      {
        title: "Final Render",
        description: "Configure settings and render your final image.",
        tasks: [
          "Set resolution: 1920x1080 or higher",
          "Choose Cycles for realistic output",
          "Set samples: 256-512 with Denoising enabled",
          "Press F12 to render",
          "Save the image (Image > Save As)"
        ],
        tips: [
          "Render a quick test at low resolution first",
          "If too grainy, increase samples or enable denoising",
          "Export as PNG for best quality"
        ]
      }
    ]
  },
  {
    id: "animated-scene",
    title: "Animated Solar System",
    subtitle: "Your First Animation Project",
    icon: "🌍",
    difficulty: "advanced",
    description: "Create an animated solar system with rotating planets orbiting a glowing sun. This project teaches you keyframe animation, empty parenting for orbits, emissive materials for the sun, and rendering an animation to video.",
    learningOutcomes: [
      "Use keyframe animation for rotation",
      "Parent objects for orbital motion",
      "Create emissive/glowing materials",
      "Render an animation sequence",
      "Output video files from Blender"
    ],
    estimatedTime: "4-6 hours",
    prerequisites: [
      "Confident with Blender interface",
      "Creating and positioning objects",
      "Applying materials",
      "Basic understanding of keyframes"
    ],
    gradient: "from-violet-500 to-purple-500",
    finalResult: "A looping animation of planets orbiting a glowing sun with camera movement",
    steps: [
      {
        title: "Create the Sun",
        description: "Build a glowing central sun as the center of the solar system.",
        tasks: [
          "Add a UV Sphere at the origin (Shift + A > Mesh > UV Sphere)",
          "Scale it to be the largest object in the scene",
          "Create a new material with Emission shader",
          "Set emission color to bright orange/yellow",
          "Increase emission strength (5-20 for glow)"
        ],
        tips: [
          "You can mix Principled BSDF + Emission for glow with surface detail",
          "Add a Point Light inside the sun for actual illumination",
          "Bloom in Eevee makes emission look more realistic"
        ]
      },
      {
        title: "Create the Planets",
        description: "Add multiple planets at varying orbit distances.",
        tasks: [
          "Create spheres for Earth, Mars, Saturn (with rings), etc.",
          "Scale each planet appropriately (not realistic sizes — artistic balance)",
          "Position planets at different distances from the sun",
          "Apply unique materials: blue for Earth, red for Mars, etc.",
          "For Saturn's rings, use a Torus scaled flat"
        ],
        tips: [
          "Use easy-to-spot colors for visual clarity",
          "Don't be afraid of artistic license — make it look good",
          "Parent Saturn's rings to Saturn (Ctrl + P > Object)"
        ]
      },
      {
        title: "Set Up Orbits with Empties",
        description: "Create orbit controllers using Empty objects.",
        tasks: [
          "Add an Empty at the sun's location (Shift + A > Empty > Plain Axes)",
          "Select a planet, then the Empty, and parent (Ctrl + P > Object)",
          "Repeat for each planet — each planet gets its own Empty",
          "Moving/rotating the Empty will now move/orbit the planet"
        ],
        tips: [
          "This technique allows independent orbit speeds",
          "Rotating the Empty rotates the planet around the sun",
          "You can offset planet positions from the Empty for elliptical looks"
        ]
      },
      {
        title: "Animate the Orbits",
        description: "Keyframe the empties rotating to create orbital motion.",
        tasks: [
          "Select an Empty, go to frame 1",
          "Set Z rotation to 0, press I > Rotation",
          "Go to frame 240 (or your animation length)",
          "Set Z rotation to 360°, press I > Rotation",
          "Repeat for each Empty with different ending rotations (inner planets faster)",
          "In Graph Editor, set extrapolation to Linear for continuous loop"
        ],
        tips: [
          "Inner planets should complete more rotations (faster orbit)",
          "Use different end rotations: Mercury = 720°, Earth = 360°, Saturn = 90°",
          "Linear extrapolation makes the animation loop seamlessly"
        ]
      },
      {
        title: "Add Planet Rotation",
        description: "Make planets spin on their own axis.",
        tasks: [
          "Select a planet directly (not the Empty)",
          "At frame 1, set rotation to 0, insert keyframe (I > Rotation)",
          "At frame 240, set Z rotation to 360 (or more), insert keyframe",
          "Repeat for all planets",
          "Vary speeds to add visual interest"
        ],
        tips: [
          "Planets should rotate faster than they orbit",
          "Earth rotates once per orbit visually (not realistic, but artistic)",
          "Tilt some planets' rotation axes for variety"
        ]
      },
      {
        title: "Camera & Environment",
        description: "Position the camera and set up the space environment.",
        tasks: [
          "Position camera to capture the whole solar system",
          "Set World background to solid black",
          "Optionally add a star HDRI or particle stars",
          "Consider animating camera orbit for dynamic shot",
          "For camera orbit: parent camera to Empty, rotate Empty"
        ],
        tips: [
          "A slow camera orbit adds professional feel",
          "Keep animation length divisible by 30/60 for clean video fps",
          "Black background makes planets pop"
        ]
      },
      {
        title: "Render the Animation",
        description: "Configure and render your animation to video.",
        tasks: [
          "Set frame range: Start = 1, End = 240 (or your length)",
          "Output format: FFmpeg Video with H.264 encoding",
          "Set output folder for rendered frames",
          "Enable Eevee Bloom for sun glow effect",
          "Press Ctrl + F12 to render animation",
          "Wait for all frames to complete"
        ],
        tips: [
          "Close other programs during animation render",
          "240 frames at 30fps = 8 second video",
          "Start with a short test render to check timing"
        ]
      }
    ]
  }
];

const difficultyColors = {
  beginner: { bg: "bg-emerald-100", text: "text-emerald-700", border: "border-emerald-200" },
  intermediate: { bg: "bg-amber-100", text: "text-amber-700", border: "border-amber-200" },
  advanced: { bg: "bg-violet-100", text: "text-violet-700", border: "border-violet-200" }
};

const BlenderProjects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [expandedStep, setExpandedStep] = useState<number>(0);

  const toggleStep = (stepIdx: number) => {
    if (completedSteps.includes(stepIdx)) {
      setCompletedSteps(completedSteps.filter((s) => s !== stepIdx));
    } else {
      setCompletedSteps([...completedSteps, stepIdx]);
      if (stepIdx < (selectedProject?.steps.length || 0) - 1) {
        setExpandedStep(stepIdx + 1);
      }
    }
  };

  if (selectedProject) {
    const progress = (completedSteps.length / selectedProject.steps.length) * 100;
    const colors = difficultyColors[selectedProject.difficulty];

    return (
      <div className="space-y-6">
        {/* Back */}
        <button
          onClick={() => { setSelectedProject(null); setCompletedSteps([]); setExpandedStep(0); }}
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
        >
          ← Back to Projects
        </button>

        {/* Project Header */}
        <div className={`bg-gradient-to-r ${selectedProject.gradient} rounded-2xl p-6 text-white`}>
          <div className="flex items-center gap-4">
            <span className="text-5xl">{selectedProject.icon}</span>
            <div>
              <p className="text-white/70 text-xs font-medium">{selectedProject.subtitle}</p>
              <h2 className="font-bold text-2xl mt-0.5">{selectedProject.title}</h2>
              <div className="flex items-center gap-3 mt-2">
                <span className="px-2 py-0.5 bg-white/20 text-white text-xs rounded capitalize">
                  {selectedProject.difficulty}
                </span>
                <span className="text-xs text-white/70">⏱️ {selectedProject.estimatedTime}</span>
              </div>
            </div>
          </div>
          <p className="text-white/80 text-sm mt-4 leading-relaxed">{selectedProject.description}</p>
        </div>

        {/* Progress */}
        <div className="bg-white rounded-xl border border-gray-100 p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-gray-700">Project Progress</p>
            <p className="text-sm text-gray-500">{completedSteps.length}/{selectedProject.steps.length} phases</p>
          </div>
          <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
            <div 
              className={`h-full bg-gradient-to-r ${selectedProject.gradient} rounded-full transition-all`}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Learning Outcomes */}
        <div className="bg-blue-50 rounded-xl border border-blue-100 p-5">
          <h3 className="font-bold text-blue-800 text-sm mb-3">🎯 What You'll Learn</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {selectedProject.learningOutcomes.map((outcome, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <span className="text-blue-500">✓</span>
                <p className="text-xs text-blue-700">{outcome}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Prerequisites */}
        <div className="bg-amber-50 rounded-xl border border-amber-100 p-5">
          <h3 className="font-bold text-amber-800 text-sm mb-3">📋 Prerequisites</h3>
          <div className="flex flex-wrap gap-2">
            {selectedProject.prerequisites.map((prereq, idx) => (
              <span key={idx} className="px-3 py-1 bg-amber-100 text-amber-700 text-xs rounded-full">
                {prereq}
              </span>
            ))}
          </div>
        </div>

        {/* Project Steps */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h3 className="font-bold text-gray-800 mb-4">📝 Project Phases</h3>
          <div className="space-y-3">
            {selectedProject.steps.map((step, idx) => {
              const isComplete = completedSteps.includes(idx);
              const isExpanded = expandedStep === idx;

              return (
                <div
                  key={idx}
                  className={`border rounded-xl overflow-hidden transition-all ${
                    isComplete ? "border-emerald-200 bg-emerald-50" : "border-gray-100"
                  }`}
                >
                  <button
                    onClick={() => setExpandedStep(isExpanded ? -1 : idx)}
                    className="w-full flex items-center gap-3 p-4 text-left hover:bg-gray-50/50 transition-colors"
                  >
                    <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${
                      isComplete ? "bg-emerald-500 text-white" : "bg-gray-200 text-gray-600"
                    }`}>
                      {isComplete ? "✓" : idx + 1}
                    </span>
                    <div className="flex-1">
                      <p className={`font-semibold text-sm ${isComplete ? "text-emerald-700" : "text-gray-800"}`}>
                        {step.title}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">{step.description}</p>
                    </div>
                    <span className={`text-gray-400 transition-transform ${isExpanded ? "rotate-180" : ""}`}>▼</span>
                  </button>

                  {isExpanded && (
                    <div className="px-4 pb-4 border-t border-gray-100 bg-white">
                      <div className="mt-4">
                        <p className="text-xs font-bold text-gray-700 mb-2">Tasks:</p>
                        <ul className="space-y-1.5">
                          {step.tasks.map((task, tidx) => (
                            <li key={tidx} className="flex items-start gap-2 text-xs text-gray-600">
                              <span className="text-gray-400 mt-0.5">•</span>
                              {task}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                        <p className="text-xs font-bold text-blue-700 mb-2">💡 Tips:</p>
                        <ul className="space-y-1">
                          {step.tips.map((tip, tidx) => (
                            <li key={tidx} className="text-xs text-blue-600">• {tip}</li>
                          ))}
                        </ul>
                      </div>
                      <button
                        onClick={() => toggleStep(idx)}
                        className={`mt-4 w-full py-2 rounded-lg text-sm font-medium transition-colors ${
                          isComplete
                            ? "bg-gray-200 text-gray-600 hover:bg-gray-300"
                            : "bg-emerald-500 text-white hover:bg-emerald-600"
                        }`}
                      >
                        {isComplete ? "Mark as Incomplete" : "Mark Phase Complete ✓"}
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Final Result */}
        {progress === 100 && (
          <div className="bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl p-6 text-white">
            <h3 className="font-bold text-lg mb-2">🎉 Congratulations!</h3>
            <p className="text-white/80 text-sm">You've completed all phases of this project.</p>
            <div className="mt-4 p-4 bg-white/10 rounded-xl">
              <p className="text-xs font-medium text-white/70">Your Final Result:</p>
              <p className="text-white mt-1">{selectedProject.finalResult}</p>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-orange-500 via-red-500 to-pink-500 rounded-2xl p-6 text-white relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full" />
        <div className="relative">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">🚀</span>
            <div>
              <h2 className="font-bold text-xl">Project-Based Learning</h2>
              <p className="text-white/70 text-sm">Build complete projects from start to finish</p>
            </div>
          </div>
          <p className="text-white/80 text-sm leading-relaxed mt-3 max-w-xl">
            The best way to learn is by doing. These guided projects walk you through 
            building complete 3D scenes and animations, applying everything you've learned 
            into real, portfolio-worthy work.
          </p>
        </div>
      </div>

      {/* Info Banner */}
      <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl border border-blue-100">
        <span className="text-2xl">💡</span>
        <div>
          <p className="text-sm font-medium text-blue-800">Two Major Projects</p>
          <p className="text-xs text-blue-600">
            One beginner project to solidify fundamentals, one advanced project for animation skills.
          </p>
        </div>
      </div>

      {/* Projects */}
      <div className="space-y-4">
        {projects.map((project) => {
          const colors = difficultyColors[project.difficulty];
          return (
            <button
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="w-full bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg hover:border-gray-200 transition-all text-left group"
            >
              <div className={`bg-gradient-to-r ${project.gradient} p-5 text-white`}>
                <div className="flex items-center gap-4">
                  <span className="text-4xl">{project.icon}</span>
                  <div>
                    <p className="text-white/70 text-xs">{project.subtitle}</p>
                    <h3 className="font-bold text-lg mt-0.5">{project.title}</h3>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="px-2 py-0.5 bg-white/20 text-xs rounded capitalize">{project.difficulty}</span>
                      <span className="text-xs text-white/70">⏱️ {project.estimatedTime}</span>
                      <span className="text-xs text-white/70">📝 {project.steps.length} phases</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-5">
                <p className="text-sm text-gray-600 line-clamp-2">{project.description}</p>
                <div className="mt-4">
                  <p className="text-xs font-medium text-gray-500 mb-2">You'll learn:</p>
                  <div className="flex flex-wrap gap-2">
                    {project.learningOutcomes.slice(0, 3).map((outcome, idx) => (
                      <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-600 text-[10px] rounded">
                        {outcome}
                      </span>
                    ))}
                    {project.learningOutcomes.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-400 text-[10px] rounded">
                        +{project.learningOutcomes.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <p className="text-xs text-gray-400">{project.finalResult}</p>
                  <span className="text-orange-500 group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Why Projects */}
      <div className="bg-gray-50 rounded-2xl border border-gray-100 p-6">
        <h3 className="font-bold text-gray-800 mb-4">🎓 Why Project-Based Learning?</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex items-start gap-3">
            <span className="text-lg">🔄</span>
            <div>
              <p className="text-sm font-medium text-gray-700">Contextual Learning</p>
              <p className="text-xs text-gray-500">Skills make more sense when used together</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-lg">💾</span>
            <div>
              <p className="text-sm font-medium text-gray-700">Portfolio Pieces</p>
              <p className="text-xs text-gray-500">Finished work to show your skills</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-lg">🎯</span>
            <div>
              <p className="text-sm font-medium text-gray-700">Clear Goals</p>
              <p className="text-xs text-gray-500">Defined outcomes keep you motivated</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-lg">🧩</span>
            <div>
              <p className="text-sm font-medium text-gray-700">Problem Solving</p>
              <p className="text-xs text-gray-500">Learn to overcome real challenges</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlenderProjects;
