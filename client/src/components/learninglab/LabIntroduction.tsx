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

      <div className="relative p-8 sm:p-10 lg:p-12">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-500/20 rounded-full border border-indigo-500/30 mb-5">
          <div className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
          <span className="text-indigo-300 text-xs font-semibold tracking-wide uppercase">
            AI-Powered Learning Platform
          </span>
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4 leading-tight tracking-tight">
          AI Web Developer{" "}
          <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Learning Lab
          </span>
        </h1>

        {/* Description */}
        <p className="text-gray-300 text-base sm:text-lg mb-8 leading-relaxed max-w-4xl">
          Your complete interactive learning system to become an AI-powered web developer.
          Follow a structured roadmap, practice real coding exercises, build mini projects,
          and track your progress — all without leaving this platform.
        </p>

        {/* What you'll learn — feature buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-10">
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
              className="flex items-center gap-3 px-4 py-3 bg-white/5 rounded-xl border border-white/10 hover:bg-white/[0.08] transition-colors"
            >
              <span className="text-lg flex-shrink-0">{item.icon}</span>
              <span className="text-gray-200 text-sm font-medium">{item.text}</span>
            </div>
          ))}
        </div>

        {/* Stats — visual dividers */}
        <div className="flex flex-wrap items-center gap-x-0 gap-y-4 mb-10 bg-white/5 rounded-xl border border-white/10 px-2 py-4 sm:py-5">
          {[
            { value: `${stats.totalProgress}%`, label: "Learning Progress" },
            { value: "8", label: "Learning Phases" },
            { value: "11+", label: "Coding Exercises" },
            { value: "8", label: "Mini Projects" },
          ].map((stat, i) => (
            <React.Fragment key={i}>
              {i > 0 && <div className="hidden sm:block w-px h-10 bg-gray-700/60 mx-2" />}
              <div className="flex-1 min-w-[120px] text-center px-4">
                <div className="text-2xl sm:text-3xl font-extrabold text-white leading-none mb-1">{stat.value}</div>
                <div className="text-indigo-300/80 text-xs font-medium">{stat.label}</div>
              </div>
            </React.Fragment>
          ))}
        </div>

        {/* Goal cards — full-width, equal height */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 rounded-xl border border-indigo-500/20 flex flex-col">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg">🎯</span>
              <span className="text-white font-semibold text-sm">Learning Goal</span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed flex-1">
              Become an <span className="text-indigo-300 font-semibold">AI-powered web developer</span> capable of building intelligent applications
            </p>
          </div>
          <div className="p-5 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-xl border border-purple-500/20 flex flex-col">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg">⏱️</span>
              <span className="text-white font-semibold text-sm">Estimated Time</span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed flex-1">
              <span className="text-purple-300 font-semibold">Beginner → Advanced</span> roadmap with self-paced learning
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LabIntroduction;
