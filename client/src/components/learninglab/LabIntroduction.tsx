import React from "react";
import { useLabContext } from "../../context/LearningLabContext";

const LabIntroduction: React.FC = () => {
  const { getOverallStats } = useLabContext();
  const stats = getOverallStats();

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-950 via-purple-950 to-slate-900 border border-indigo-800/30">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />

      <div className="relative p-10 md:p-12">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-500/20 rounded-full border border-indigo-500/30 mb-6">
            <div className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
            <span className="text-indigo-300 text-xs font-semibold tracking-wide uppercase">
              AI-Powered Learning Platform
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
            AI Web Developer{" "}
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Learning Lab
            </span>
          </h1>

          {/* Description */}
          <p className="text-gray-300 text-lg mb-6 leading-relaxed">
            Your complete interactive learning system to become an AI-powered web developer.
            Follow a structured roadmap, practice real coding exercises, build mini projects,
            and track your progress — all without leaving this platform.
          </p>

          {/* What you'll learn */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
            {[
              { icon: "🗺️", text: "Follow a structured roadmap" },
              { icon: "📚", text: "Learn AI development step-by-step" },
              { icon: "💻", text: "Practice real coding exercises" },
              { icon: "🚀", text: "Build mini projects" },
              { icon: "📊", text: "Track progress automatically" },
              { icon: "📰", text: "Stay updated with AI news" },
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-2 px-3 py-2 bg-white/5 rounded-xl border border-white/10"
              >
                <span className="text-lg">{item.icon}</span>
                <span className="text-gray-300 text-xs">{item.text}</span>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{stats.totalProgress}%</div>
              <div className="text-indigo-300 text-xs">Learning Progress</div>
            </div>
            <div className="w-px bg-gray-700" />
            <div className="text-center">
              <div className="text-2xl font-bold text-white">8</div>
              <div className="text-indigo-300 text-xs">Learning Phases</div>
            </div>
            <div className="w-px bg-gray-700" />
            <div className="text-center">
              <div className="text-2xl font-bold text-white">11+</div>
              <div className="text-indigo-300 text-xs">Coding Exercises</div>
            </div>
            <div className="w-px bg-gray-700" />
            <div className="text-center">
              <div className="text-2xl font-bold text-white">8</div>
              <div className="text-indigo-300 text-xs">Mini Projects</div>
            </div>
          </div>
        </div>

        {/* Goal cards */}
        <div className="mt-8 grid md:grid-cols-2 gap-4 max-w-2xl">
          <div className="p-4 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 rounded-xl border border-indigo-500/20">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">🎯</span>
              <span className="text-white font-semibold text-sm">Learning Goal</span>
            </div>
            <p className="text-gray-300 text-sm">
              Become an <span className="text-indigo-300 font-semibold">AI-powered web developer</span> capable of building intelligent applications
            </p>
          </div>
          <div className="p-4 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-xl border border-purple-500/20">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">⏱️</span>
              <span className="text-white font-semibold text-sm">Estimated Time</span>
            </div>
            <p className="text-gray-300 text-sm">
              <span className="text-purple-300 font-semibold">Beginner → Advanced</span> roadmap with self-paced learning
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LabIntroduction;
