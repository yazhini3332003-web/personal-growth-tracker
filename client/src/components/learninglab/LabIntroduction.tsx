import React from "react";
import { useLabContext } from "../../context/LearningLabContext";

const LabIntroduction: React.FC = () => {
  const { getOverallStats } = useLabContext();
  const stats = getOverallStats();

  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
      <div className="p-8 sm:p-10">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-gray-50 rounded-full border border-blue-200 mb-5">
          <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
          <span className="text-blue-500 text-xs font-semibold tracking-wide uppercase">
            AI-Powered Learning Platform
          </span>
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4 leading-tight">
          AI Web Developer{" "}
          <span className="text-blue-500">Learning Lab</span>
        </h1>

        {/* Description */}
        <p className="text-gray-500 text-base sm:text-lg mb-8 leading-relaxed max-w-3xl">
          Your complete interactive learning system to become an AI-powered web developer.
          Follow a structured roadmap, practice real coding exercises, build mini projects,
          and track your progress.
        </p>

        {/* Feature cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-8">
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
              className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 hover:border-blue-200 transition-colors"
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
            { value: "8", label: "Learning Phases" },
            { value: "11+", label: "Coding Exercises" },
            { value: "8", label: "Mini Projects" },
          ].map((stat, i) => (
            <React.Fragment key={i}>
              {i > 0 && <div className="hidden sm:block w-px h-10 bg-gray-200 mx-2" />}
              <div className="flex-1 min-w-[120px] text-center px-4">
                <div className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-none mb-1">{stat.value}</div>
                <div className="text-blue-500 text-xs font-medium">{stat.label}</div>
              </div>
            </React.Fragment>
          ))}
        </div>

        {/* Goal cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 bg-gray-50 rounded-xl border border-blue-200 flex flex-col">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg">🎯</span>
              <span className="text-gray-900 font-semibold text-sm">Learning Goal</span>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed flex-1">
              Become an <span className="text-blue-500 font-semibold">AI-powered web developer</span> capable of building intelligent applications
            </p>
          </div>
          <div className="p-5 bg-purple-50 rounded-xl border border-purple-200 flex flex-col">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg">⏱️</span>
              <span className="text-gray-900 font-semibold text-sm">Estimated Time</span>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed flex-1">
              <span className="text-blue-500 font-semibold">Beginner → Advanced</span> roadmap with self-paced learning
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LabIntroduction;
