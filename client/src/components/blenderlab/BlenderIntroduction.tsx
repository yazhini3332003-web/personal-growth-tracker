import React from "react";
import { useBlenderLabContext } from "../../context/BlenderLabContext";

const BlenderIntroduction: React.FC = () => {
  const { getOverallStats } = useBlenderLabContext();
  const stats = getOverallStats();

  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
      <div className="p-8 sm:p-10">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange-50 rounded-full border border-orange-200 mb-5">
          <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
          <span className="text-orange-600 text-xs font-semibold tracking-wide uppercase">
            Blender Learning Platform
          </span>
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4 leading-tight">
          Blender{" "}
          <span className="text-orange-500">Learning Hub</span>
        </h1>

        {/* Description */}
        <p className="text-gray-500 text-base sm:text-lg mb-8 leading-relaxed max-w-3xl">
          Your complete interactive learning system to become a skilled Blender artist.
          Follow a structured roadmap from beginner to advanced, practice real exercises,
          build 3D projects, and master the world's best free 3D creation tool.
        </p>

        {/* Feature cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-8">
          {[
            { icon: "🗺️", text: "Follow a structured roadmap" },
            { icon: "📚", text: "Learn Blender step-by-step" },
            { icon: "🔨", text: "Practice real 3D exercises" },
            { icon: "🚀", text: "Build mini 3D projects" },
            { icon: "📊", text: "Track progress automatically" },
            { icon: "📰", text: "Stay updated with Blender news" },
            { icon: "🤖", text: "Discover AI tools for Blender" },
            { icon: "🧩", text: "Top addons & plugins" },
            { icon: "💼", text: "Career & industry insights" },
          ].map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 hover:border-orange-200 transition-colors"
            >
              <span className="text-lg flex-shrink-0">{item.icon}</span>
              <span className="text-gray-700 text-sm font-medium">{item.text}</span>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="flex flex-wrap items-center gap-x-0 gap-y-4 mb-8 bg-gray-50 rounded-xl border border-gray-200 px-2 py-4">
          {[
            { value: `${stats.totalProgress}%`, label: "Learning Progress" },
            { value: "10", label: "Learning Phases" },
            { value: "11+", label: "Practice Exercises" },
            { value: "10", label: "Mini Projects" },
          ].map((stat, i) => (
            <React.Fragment key={i}>
              {i > 0 && <div className="hidden sm:block w-px h-10 bg-gray-200 mx-2" />}
              <div className="flex-1 min-w-[120px] text-center px-4">
                <div className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-none mb-1">
                  {stat.value}
                </div>
                <div className="text-orange-500 text-xs font-medium">{stat.label}</div>
              </div>
            </React.Fragment>
          ))}
        </div>

        {/* Goal cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 bg-orange-50 rounded-xl border border-orange-200 flex flex-col">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg">🎯</span>
              <span className="text-gray-900 font-semibold text-sm">Learning Goal</span>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed flex-1">
              Become a skilled{" "}
              <span className="text-orange-500 font-semibold">Blender artist</span> capable
              of creating 3D models, animations, and renders
            </p>
          </div>
          <div className="p-5 bg-purple-50 rounded-xl border border-purple-200 flex flex-col">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg">⏱️</span>
              <span className="text-gray-900 font-semibold text-sm">Estimated Journey</span>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed flex-1">
              <span className="text-orange-500 font-semibold">Beginner → Advanced</span>{" "}
              roadmap with self-paced learning across 10 modules
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlenderIntroduction;
