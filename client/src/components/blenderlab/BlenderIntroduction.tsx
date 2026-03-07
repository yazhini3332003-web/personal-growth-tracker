import React from "react";
import { useBlenderLabContext } from "../../context/BlenderLabContext";

interface BlenderIntroductionProps {
  onNavigate?: (view: string) => void;
}

const BlenderIntroduction: React.FC<BlenderIntroductionProps> = ({ onNavigate }) => {
  const { getOverallStats } = useBlenderLabContext();
  const stats = getOverallStats();

  const whatYouCanCreate = [
    { title: "3D Characters", icon: "🧑‍🎨", desc: "Model and rig characters for games, films, and animations", color: "from-orange-400 to-red-500" },
    { title: "Game Environments", icon: "🏰", desc: "Build worlds, terrains, and level designs for video games", color: "from-emerald-400 to-teal-500" },
    { title: "Product Renders", icon: "📦", desc: "Create photorealistic product mockups and visualizations", color: "from-blue-400 to-indigo-500" },
    { title: "Animated Scenes", icon: "🎬", desc: "Animate stories, characters, and cinematic sequences", color: "from-purple-400 to-pink-500" },
    { title: "Visual Effects", icon: "💥", desc: "Simulate fire, water, smoke, explosions, and particle effects", color: "from-rose-400 to-red-500" },
    { title: "Motion Graphics", icon: "✨", desc: "Design animated logos, intros, and title sequences", color: "from-cyan-400 to-blue-500" },
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-orange-600 via-amber-600 to-yellow-500 p-8 md:p-12 text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-4 right-8 text-8xl">🟠</div>
          <div className="absolute bottom-4 left-8 text-6xl">🎨</div>
          <div className="absolute top-1/2 right-1/4 text-5xl">🧊</div>
        </div>
        <div className="relative z-10 max-w-3xl">
          <div className="flex items-center gap-2 mb-4">
            <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-medium backdrop-blur-sm">
              🌐 Open Source · Free Forever
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
            Welcome to{" "}
            <span className="text-yellow-200">Blender</span> Learning Hub
          </h1>
          <p className="text-white/90 text-lg leading-relaxed mb-3">
            Blender is the world's most powerful <strong>free and open-source</strong> 3D creation suite.
            It supports the entire 3D pipeline — modeling, rigging, animation, simulation, rendering,
            compositing, video editing, and motion tracking.
          </p>
          <p className="text-white/70 text-sm leading-relaxed mb-4">
            Used by solo artists, indie game studios, major film studios, and architects worldwide,
            Blender puts professional-grade 3D tools in everyone's hands — completely free. This hub
            helps you learn Blender from beginner to advanced with a structured roadmap, hands-on
            exercises, and real projects.
          </p>
          <p className="text-white/50 text-sm italic">
            "Blender enables anyone to create amazing 3D content — no paywall, no limits."
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { value: `${stats.totalProgress}%`, label: "Learning Progress", icon: "📊", color: "from-orange-500 to-amber-600" },
          { value: "10", label: "Learning Phases", icon: "🗺️", color: "from-violet-500 to-purple-600" },
          { value: "11+", label: "Practice Exercises", icon: "🔨", color: "from-emerald-500 to-teal-600" },
          { value: "10", label: "Mini Projects", icon: "🚀", color: "from-cyan-500 to-blue-600" },
        ].map((stat, i) => (
          <div key={i} className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-lg transition-all duration-300 group">
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
              <span className="text-lg">{stat.icon}</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* What You Can Create */}
      <div>
        <div className="text-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">🎨 What You Can Create With Blender</h2>
          <p className="text-gray-500 text-sm mt-1 max-w-2xl mx-auto">
            From 3D characters to cinematic VFX — Blender lets you build anything you can imagine
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {whatYouCanCreate.map((item, i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 group">
              <div className={`h-20 bg-gradient-to-br ${item.color} flex items-center justify-center`}>
                <span className="text-4xl opacity-40 group-hover:scale-125 transition-transform duration-500">{item.icon}</span>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 text-sm">{item.title}</h3>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Feature cards */}
      <div>
        <h2 className="text-lg font-bold text-gray-900 mb-4">🛠️ What This Platform Offers</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            { icon: "🗺️", text: "Structured beginner → advanced roadmap" },
            { icon: "📚", text: "Step-by-step learning modules" },
            { icon: "🔨", text: "Hands-on practice exercises" },
            { icon: "🚀", text: "Real mini 3D projects" },
            { icon: "📊", text: "Automatic progress tracking" },
            { icon: "📰", text: "Latest Blender news & updates" },
            { icon: "🤖", text: "AI tools for 3D creation" },
            { icon: "🧩", text: "Top addons & plugins" },
            { icon: "💼", text: "Career paths & industry insights" },
          ].map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-3 px-4 py-3 bg-white rounded-xl border border-gray-100 hover:border-orange-200 hover:shadow-sm transition-all"
            >
              <span className="text-lg flex-shrink-0">{item.icon}</span>
              <span className="text-gray-700 text-sm">{item.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Goal cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-5 bg-orange-50 rounded-xl border border-orange-200">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg">🎯</span>
            <span className="text-gray-900 font-semibold text-sm">Learning Goal</span>
          </div>
          <p className="text-gray-600 text-sm leading-relaxed">
            Become a skilled{" "}
            <span className="text-orange-500 font-semibold">Blender artist</span> capable
            of creating 3D models, animations, and photorealistic renders
          </p>
        </div>
        <div className="p-5 bg-purple-50 rounded-xl border border-purple-200">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg">⏱️</span>
            <span className="text-gray-900 font-semibold text-sm">Estimated Journey</span>
          </div>
          <p className="text-gray-600 text-sm leading-relaxed">
            <span className="text-orange-500 font-semibold">Beginner → Advanced</span>{" "}
            self-paced learning across 10 structured modules
          </p>
        </div>
      </div>

      {/* Quick Navigation */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div
          onClick={() => onNavigate?.("why")}
          className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-lg hover:border-orange-200 transition-all cursor-pointer group"
        >
          <span className="text-2xl block mb-2">🎯</span>
          <h3 className="font-semibold text-gray-900 text-sm">Why Learn Blender</h3>
          <p className="text-gray-500 text-xs mt-1">Benefits, careers, and industry applications</p>
        </div>
        <div
          onClick={() => onNavigate?.("progress")}
          className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-lg hover:border-emerald-200 transition-all cursor-pointer group"
        >
          <span className="text-2xl block mb-2">📊</span>
          <h3 className="font-semibold text-gray-900 text-sm">Track Progress</h3>
          <p className="text-gray-500 text-xs mt-1">Monitor your learning journey and milestones</p>
        </div>
        <div
          onClick={() => onNavigate?.("ai-tools")}
          className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-lg hover:border-blue-200 transition-all cursor-pointer group"
        >
          <span className="text-2xl block mb-2">🤖</span>
          <h3 className="font-semibold text-gray-900 text-sm">AI for 3D</h3>
          <p className="text-gray-500 text-xs mt-1">Discover AI tools that supercharge 3D creation</p>
        </div>
      </div>
    </div>
  );
};

export default BlenderIntroduction;
