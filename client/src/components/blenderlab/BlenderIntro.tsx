import React, { useState } from "react";

const BlenderIntro: React.FC = () => {
  const [expandedSection, setExpandedSection] = useState<string | null>("what");

  const toggleSection = (id: string) => setExpandedSection(expandedSection === id ? null : id);

  const introSections = [
    {
      id: "what",
      icon: "🟠",
      title: "What is Blender?",
      gradient: "from-orange-500 to-amber-600",
      content: [
        "Blender is a **free, open-source 3D creation suite** used by professionals and hobbyists worldwide. It supports the entire 3D pipeline — modeling, sculpting, rigging, animation, simulation, rendering, compositing, and video editing.",
        "Unlike expensive software like Maya or Cinema 4D, Blender is **completely free** with no subscriptions, licenses, or hidden costs. It's developed by a global community and the Blender Foundation.",
        "Blender runs on Windows, macOS, and Linux. It's lightweight, fast, and constantly updated with new features. The latest versions include real-time rendering (Eevee), professional path tracing (Cycles), and AI-powered tools.",
        "In this platform, you'll learn Blender from scratch — from interface basics to advanced animation — entirely within these lessons. No external sites needed."
      ]
    },
    {
      id: "why",
      icon: "⚡",
      title: "Why is Blender So Powerful?",
      gradient: "from-violet-500 to-purple-600",
      content: [
        "**All-in-One Tool**: Unlike other pipelines requiring multiple software, Blender does modeling, texturing, rigging, animation, rendering, compositing, and video editing — all in one application.",
        "**Industry-Standard Quality**: Major studios like Ubisoft, Epic Games, and Netflix use Blender in their production pipelines. The quality rivals $5,000+ software.",
        "**Massive Community**: Millions of artists, free tutorials, thousands of addons, and constant feature updates. You're never stuck without help.",
        "**Two Render Engines**: Eevee for fast real-time previews, Cycles for photorealistic ray-traced renders. Both are built-in and free.",
        "**Procedural & Node-Based**: Geometry Nodes, Shader Nodes, and Compositing Nodes give you infinite creative control without destructive editing.",
        "**Constantly Evolving**: Major updates every few months add features that keep Blender at the cutting edge of 3D technology."
      ]
    },
    {
      id: "where",
      icon: "🌍",
      title: "Where is Blender Used in the Real World?",
      gradient: "from-emerald-500 to-teal-600",
      content: [
        "**Film & Animation**: Studios use Blender for animated films, VFX shots, pre-visualization, and storyboarding. Many Blender-made films have won awards.",
        "**Game Development**: Game studios create 3D characters, environments, props, and animations in Blender, then export to Unity or Unreal Engine.",
        "**Architecture Visualization**: Architects render photorealistic building designs, interior walkthroughs, and urban planning visualizations.",
        "**Product Design**: Companies create product renders for marketing, e-commerce, packaging design, and prototyping without expensive photography.",
        "**Visual Effects (VFX)**: Add explosions, smoke, fire, water simulations, and compositing effects to live-action footage.",
        "**Motion Graphics**: Design animated logos, title sequences, broadcast graphics, and social media content.",
        "**Medical & Scientific Visualization**: Create anatomical models, physics simulations, and educational animations."
      ]
    }
  ];

  const realWorldExamples = [
    { industry: "Film & Animation", icon: "🎬", examples: ["Animated films", "Short films", "VFX compositing", "Pre-visualization"], color: "bg-red-50 border-red-100" },
    { industry: "Game Development", icon: "🎮", examples: ["Characters", "Environments", "Props & weapons", "Cutscene animation"], color: "bg-blue-50 border-blue-100" },
    { industry: "Architecture", icon: "🏛️", examples: ["Building renders", "Interior design", "Virtual tours", "Urban planning"], color: "bg-emerald-50 border-emerald-100" },
    { industry: "Product Design", icon: "📦", examples: ["Product mockups", "E-commerce renders", "Packaging", "Prototypes"], color: "bg-amber-50 border-amber-100" },
    { industry: "Visual Effects", icon: "💥", examples: ["Fire & smoke", "Water simulation", "Explosions", "Compositing"], color: "bg-purple-50 border-purple-100" },
    { industry: "Motion Graphics", icon: "✨", examples: ["Logo animations", "Title sequences", "Social media", "Broadcast graphics"], color: "bg-cyan-50 border-cyan-100" },
  ];

  const platformFeatures = [
    { icon: "📚", title: "Structured Lessons", desc: "Step-by-step learning from beginner to advanced" },
    { icon: "🔧", title: "Practice Exercises", desc: "Hands-on tasks to apply what you learn immediately" },
    { icon: "🚀", title: "Real Projects", desc: "Build complete 3D scenes and animations" },
    { icon: "📊", title: "Progress Tracking", desc: "See your completion status across all modules" },
    { icon: "🎯", title: "Level-Based Path", desc: "Beginner, Intermediate, and Advanced tracks" },
    { icon: "📖", title: "Resource Library", desc: "Quick reference guides, shortcuts, and tips" },
  ];

  return (
    <div className="space-y-6">
      {/* Hero */}
      <div className="bg-gradient-to-br from-orange-500 via-amber-500 to-yellow-500 rounded-2xl p-6 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -translate-y-12 translate-x-12" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-8 -translate-x-8" />
        <div className="relative">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-4xl">🟠</span>
            <div>
              <h2 className="font-bold text-2xl">Welcome to Blender Learning Hub</h2>
              <p className="text-white/70 text-sm mt-1">Your complete 3D creation journey — no external sites needed</p>
            </div>
          </div>
          <p className="text-white/80 text-sm leading-relaxed mt-4 max-w-2xl">
            Blender is the world's most powerful <strong>free and open-source</strong> 3D creation suite.
            This platform teaches you everything — from interface basics to professional-level animation and rendering —
            all inside these lessons. Whether you want to make game assets, animated films, or product renders, 
            you'll find everything you need right here.
          </p>
          <div className="mt-5 flex items-center gap-3 flex-wrap">
            <span className="px-3 py-1.5 bg-white/15 rounded-lg text-xs font-medium backdrop-blur">🆓 100% Free</span>
            <span className="px-3 py-1.5 bg-white/15 rounded-lg text-xs font-medium backdrop-blur">📚 Self-Contained</span>
            <span className="px-3 py-1.5 bg-white/15 rounded-lg text-xs font-medium backdrop-blur">🎯 Beginner → Advanced</span>
            <span className="px-3 py-1.5 bg-white/15 rounded-lg text-xs font-medium backdrop-blur">🚀 Project-Based</span>
          </div>
        </div>
      </div>

      {/* Platform Features */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <h3 className="text-gray-900 font-bold text-sm mb-4">🛠️ Learn Blender Completely Inside This Platform</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {platformFeatures.map((item, idx) => (
            <div key={idx} className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl hover:bg-orange-50 transition-colors">
              <span className="text-xl">{item.icon}</span>
              <div>
                <p className="text-sm font-semibold text-gray-800">{item.title}</p>
                <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Deep Dive Sections */}
      <div className="space-y-3">
        {introSections.map((section) => {
          const isExpanded = expandedSection === section.id;
          return (
            <div key={section.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-sm transition-all">
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full flex items-center gap-3 p-5 text-left"
              >
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${section.gradient} flex items-center justify-center text-white text-lg flex-shrink-0`}>
                  {section.icon}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-800">{section.title}</p>
                  <p className="text-[11px] text-gray-400 mt-0.5">Click to {isExpanded ? "collapse" : "expand"}</p>
                </div>
                <span className={`text-gray-400 transition-transform ${isExpanded ? "rotate-180" : ""}`}>▼</span>
              </button>
              {isExpanded && (
                <div className="px-5 pb-5 space-y-3">
                  {section.content.map((paragraph, idx) => (
                    <div key={idx} className="flex gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-orange-400 flex-shrink-0 mt-1.5" />
                      <p className="text-sm text-gray-600 leading-relaxed">{paragraph}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Real-World Applications Grid */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <h3 className="text-gray-900 font-bold text-sm mb-4">🌍 Real-World Applications of Blender</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {realWorldExamples.map((item, idx) => (
            <div key={idx} className={`p-4 rounded-xl border ${item.color} hover:shadow-md transition-all`}>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">{item.icon}</span>
                <p className="text-sm font-semibold text-gray-800">{item.industry}</p>
              </div>
              <div className="space-y-1.5">
                {item.examples.map((ex, eidx) => (
                  <div key={eidx} className="flex items-center gap-1.5 text-xs text-gray-600">
                    <span className="text-orange-400">•</span>
                    {ex}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Promise */}
      <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl border border-orange-100 p-6 text-center">
        <span className="text-3xl">🎓</span>
        <h3 className="text-gray-900 font-bold text-base mt-3">Learn Blender Without Leaving This Platform</h3>
        <p className="text-gray-500 text-sm mt-2 max-w-lg mx-auto">
          This is a <strong>complete learning ecosystem</strong>. You'll find structured lessons, practice exercises, 
          guided projects, and a resource library — everything you need to go from beginner to advanced 
          Blender artist without ever needing an external tutorial site.
        </p>
      </div>
    </div>
  );
};

export default BlenderIntro;
