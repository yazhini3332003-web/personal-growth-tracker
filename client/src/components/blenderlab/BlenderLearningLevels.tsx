import React, { useState } from "react";

interface Topic {
  title: string;
  description: string;
  skills: string[];
}

interface LevelData {
  id: string;
  name: string;
  icon: string;
  gradient: string;
  tagline: string;
  description: string;
  goal: string;
  topics: Topic[];
  outcomes: string[];
  estimatedTime: string;
}

const levels: LevelData[] = [
  {
    id: "beginner",
    name: "Beginner Level",
    icon: "🌱",
    gradient: "from-emerald-500 to-teal-600",
    tagline: "For users who have never used Blender before",
    description: "Start your 3D journey from zero. You'll learn the Blender interface, basic navigation, creating simple objects, and understanding the fundamental tools that every 3D artist needs to know.",
    goal: "Become comfortable using Blender and create your first simple 3D scenes",
    estimatedTime: "2-4 weeks",
    topics: [
      {
        title: "Blender Interface Overview",
        description: "Understand the Blender workspace, editors, panels, and how to customize your layout.",
        skills: ["Identify main editors (3D Viewport, Outliner, Properties)", "Customize workspace layout", "Navigate the interface efficiently"]
      },
      {
        title: "Navigation Controls",
        description: "Master moving around in 3D space — orbiting, panning, zooming, and using viewport views.",
        skills: ["Orbit, pan, and zoom in 3D viewport", "Use numpad for preset views", "Switch between orthographic and perspective"]
      },
      {
        title: "Basic Shapes & Objects",
        description: "Learn to create, select, and manipulate primitive objects like cubes, spheres, cylinders, and planes.",
        skills: ["Add mesh primitives", "Select objects with various methods", "Duplicate and delete objects"]
      },
      {
        title: "Simple Modeling",
        description: "Introduction to Edit Mode — moving vertices, edges, and faces to shape your objects.",
        skills: ["Enter and exit Edit Mode", "Select vertices, edges, faces", "Use extrude, inset, and loop cut"]
      },
      {
        title: "Basic Lighting",
        description: "Add lights to your scene and understand the different light types available in Blender.",
        skills: ["Add point, sun, spot, and area lights", "Adjust light intensity and color", "Position lights for basic illumination"]
      },
      {
        title: "Simple Materials",
        description: "Apply colors and basic materials to your objects to give them a finished look.",
        skills: ["Create new materials", "Change base color and roughness", "Apply materials to objects"]
      }
    ],
    outcomes: [
      "Navigate Blender's interface confidently",
      "Create and manipulate basic 3D objects",
      "Understand Edit Mode fundamentals",
      "Light a scene with basic lights",
      "Apply simple materials to objects",
      "Render your first 3D image"
    ]
  },
  {
    id: "intermediate",
    name: "Intermediate Level",
    icon: "🔥",
    gradient: "from-amber-500 to-orange-600",
    tagline: "For users who understand the basics and want to improve",
    description: "Level up your skills with advanced modeling techniques, professional texturing, sophisticated lighting setups, and optimized rendering settings. You'll create more polished, realistic scenes.",
    goal: "Create polished, realistic 3D scenes with proper materials and lighting",
    estimatedTime: "4-8 weeks",
    topics: [
      {
        title: "Advanced Modeling Techniques",
        description: "Learn subdivision surface modeling, beveling, boolean operations, and non-destructive workflows.",
        skills: ["Use subdivision surface modifier", "Apply bevels for realistic edges", "Boolean operations for complex shapes", "Mirror modifier workflow"]
      },
      {
        title: "Texturing & UV Mapping",
        description: "Apply image textures to your models with proper UV unwrapping techniques.",
        skills: ["UV unwrap meshes", "Apply image textures", "Adjust UV layout in UV Editor", "Use texture painting"]
      },
      {
        title: "Advanced Materials (Shader Nodes)",
        description: "Build complex materials using the Shader Editor and node-based material system.",
        skills: ["Use Principled BSDF shader", "Mix shaders and textures", "Create procedural materials", "Use normal and displacement maps"]
      },
      {
        title: "Lighting Techniques",
        description: "Master three-point lighting, HDRI environment lighting, and mood-based setups.",
        skills: ["Set up three-point lighting", "Use HDRI for environment lighting", "Create dramatic and soft lighting", "Use light falloff and color temperature"]
      },
      {
        title: "Rendering Settings",
        description: "Optimize render output for quality and speed using Cycles and Eevee settings.",
        skills: ["Configure Cycles render settings", "Optimize samples and denoising", "Set up render layers", "Output high-quality images"]
      },
      {
        title: "Scene Composition",
        description: "Compose visually appealing scenes with camera placement, depth of field, and framing.",
        skills: ["Position cameras with rule of thirds", "Add depth of field", "Use focal length for different looks", "Create cinematic compositions"]
      }
    ],
    outcomes: [
      "Model complex objects with clean topology",
      "UV unwrap and texture your models",
      "Create realistic node-based materials",
      "Light scenes professionally",
      "Render high-quality images",
      "Compose visually appealing 3D art"
    ]
  },
  {
    id: "advanced",
    name: "Advanced Level",
    icon: "⭐",
    gradient: "from-violet-500 to-purple-600",
    tagline: "For users who want professional-level skills",
    description: "Master professional 3D techniques including character modeling, animation, physics simulations, particle systems, and cinematic rendering. This level prepares you for industry-quality work.",
    goal: "Create professional-quality 3D work suitable for portfolio and industry",
    estimatedTime: "8-16 weeks",
    topics: [
      {
        title: "Character Modeling",
        description: "Model human and stylized characters with proper topology for animation.",
        skills: ["Model human body proportions", "Create character faces", "Maintain animation-ready topology", "Use sculpting for details"]
      },
      {
        title: "Rigging & Armatures",
        description: "Create skeletal systems and controls to make your characters animatable.",
        skills: ["Build armature hierarchies", "Weight paint meshes", "Create custom bone shapes", "Use inverse kinematics (IK)"]
      },
      {
        title: "Animation Fundamentals",
        description: "Bring your creations to life with keyframe animation, timing, and motion principles.",
        skills: ["Set keyframes and use the timeline", "Work with the Graph Editor", "Apply animation principles (ease, anticipation)", "Animate walk cycles"]
      },
      {
        title: "Physics Simulations",
        description: "Create realistic cloth, soft body, rigid body, and fluid simulations.",
        skills: ["Set up cloth simulation", "Create rigid body dynamics", "Simulate soft body physics", "Bake simulations for playback"]
      },
      {
        title: "Particle Systems",
        description: "Generate hair, fur, grass, sparks, rain, and other particle-based effects.",
        skills: ["Create hair and fur systems", "Emit particles for effects", "Use force fields", "Style particle systems"]
      },
      {
        title: "Cinematic Rendering",
        description: "Produce film-quality renders with compositing, color grading, and post-processing.",
        skills: ["Use render passes and layers", "Composite in Blender", "Apply color grading", "Create motion blur and lens effects"]
      }
    ],
    outcomes: [
      "Model and rig animated characters",
      "Create keyframe and physics-based animations",
      "Simulate realistic cloth, hair, and particles",
      "Produce cinematic-quality renders",
      "Composite and post-process renders",
      "Build a professional-level portfolio"
    ]
  }
];

interface BlenderLearningLevelsProps {
  onSelectLevel?: (levelId: string) => void;
}

const BlenderLearningLevels: React.FC<BlenderLearningLevelsProps> = ({ onSelectLevel }) => {
  const [activeLevel, setActiveLevel] = useState<string>("beginner");
  const [expandedTopic, setExpandedTopic] = useState<number>(0);

  const currentLevel = levels.find((l) => l.id === activeLevel)!;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-2xl p-6 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-44 h-44 bg-white/5 rounded-full -translate-y-10 translate-x-10" />
        <div className="relative">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">🗺️</span>
            <div>
              <h2 className="font-bold text-xl">Structured Learning Path</h2>
              <p className="text-white/70 text-sm mt-1">Three levels designed for all types of learners</p>
            </div>
          </div>
          <p className="text-white/80 text-sm leading-relaxed mt-3 max-w-xl">
            Whether you're a complete beginner or looking to master professional techniques, 
            follow the level that matches your current skill. Progress through all three to 
            become a complete Blender artist.
          </p>
        </div>
      </div>

      {/* Level Selector */}
      <div className="grid grid-cols-3 gap-3">
        {levels.map((level) => (
          <button
            key={level.id}
            onClick={() => { setActiveLevel(level.id); setExpandedTopic(0); }}
            className={`p-4 rounded-xl border transition-all text-left ${
              activeLevel === level.id
                ? "bg-white border-orange-200 shadow-md ring-2 ring-orange-100"
                : "bg-white border-gray-100 hover:border-gray-200 hover:shadow-sm"
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="text-2xl">{level.icon}</span>
              <div>
                <p className="text-sm font-bold text-gray-800">{level.name}</p>
                <p className="text-[10px] text-gray-400">{level.estimatedTime}</p>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Level Detail */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className={`bg-gradient-to-r ${currentLevel.gradient} p-5 text-white`}>
          <div className="flex items-center gap-3">
            <span className="text-3xl">{currentLevel.icon}</span>
            <div>
              <h3 className="font-bold text-lg">{currentLevel.name}</h3>
              <p className="text-white/70 text-xs mt-0.5">{currentLevel.tagline}</p>
            </div>
          </div>
          <p className="text-white/85 text-sm mt-3 leading-relaxed">{currentLevel.description}</p>
          <div className="mt-3 p-3 bg-white/10 rounded-lg">
            <p className="text-white/70 text-xs font-medium">🎯 Goal</p>
            <p className="text-white text-sm font-medium">{currentLevel.goal}</p>
          </div>
        </div>

        {/* Topics */}
        <div className="p-5">
          <p className="text-xs font-bold text-gray-700 mb-3">📚 Topics Covered ({currentLevel.topics.length})</p>
          <div className="space-y-2">
            {currentLevel.topics.map((topic, idx) => {
              const isExpanded = expandedTopic === idx;
              return (
                <div key={idx} className="border border-gray-100 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setExpandedTopic(isExpanded ? -1 : idx)}
                    className="w-full flex items-center gap-3 p-4 text-left hover:bg-gray-50 transition-colors"
                  >
                    <span className="w-7 h-7 rounded-lg bg-orange-100 text-orange-600 text-xs font-bold flex items-center justify-center flex-shrink-0">
                      {idx + 1}
                    </span>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-800">{topic.title}</p>
                      <p className="text-[11px] text-gray-400 mt-0.5 line-clamp-1">{topic.description}</p>
                    </div>
                    <span className={`text-gray-400 text-xs transition-transform ${isExpanded ? "rotate-180" : ""}`}>▼</span>
                  </button>
                  {isExpanded && (
                    <div className="px-4 pb-4 border-t border-gray-50">
                      <p className="text-xs text-gray-600 mt-3 mb-3">{topic.description}</p>
                      <p className="text-[10px] font-bold text-gray-500 mb-2">Skills you'll learn:</p>
                      <div className="space-y-1.5">
                        {topic.skills.map((skill, sidx) => (
                          <div key={sidx} className="flex items-start gap-2">
                            <span className="text-emerald-500 text-xs mt-0.5">✓</span>
                            <p className="text-xs text-gray-600">{skill}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Outcomes */}
        <div className="px-5 pb-5">
          <p className="text-xs font-bold text-gray-700 mb-3">🏆 After Completing This Level</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {currentLevel.outcomes.map((outcome, idx) => (
              <div key={idx} className="flex items-start gap-2 p-3 bg-emerald-50 rounded-lg border border-emerald-100">
                <span className="text-emerald-500 text-xs mt-0.5">✓</span>
                <p className="text-xs text-emerald-700">{outcome}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* All Levels Overview */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <h3 className="text-gray-900 font-bold text-sm mb-4">🗂️ Learning Path Overview</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-3 py-2.5 text-left text-gray-500 font-bold rounded-tl-xl">Level</th>
                <th className="px-3 py-2.5 text-left text-gray-500 font-bold">For Who?</th>
                <th className="px-3 py-2.5 text-left text-gray-500 font-bold">Topics</th>
                <th className="px-3 py-2.5 text-left text-gray-500 font-bold rounded-tr-xl">Time</th>
              </tr>
            </thead>
            <tbody>
              {levels.map((level, idx) => (
                <tr key={idx} className="border-t border-gray-50 hover:bg-gray-50/50">
                  <td className="px-3 py-2.5 font-medium text-gray-800">
                    <span className="mr-1">{level.icon}</span> {level.name}
                  </td>
                  <td className="px-3 py-2.5 text-gray-600">{level.tagline}</td>
                  <td className="px-3 py-2.5 text-gray-600">{level.topics.length} topics</td>
                  <td className="px-3 py-2.5 text-gray-600">{level.estimatedTime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BlenderLearningLevels;
