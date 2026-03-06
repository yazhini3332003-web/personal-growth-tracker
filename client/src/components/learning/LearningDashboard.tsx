import React from "react";
import { useLearning } from "../../context/LearningContext";
import { roadmapStages } from "../../data/learningData";
import { newsItems } from "../../data/learningData";

interface Props {
  onNavigate: (tab: string) => void;
}

const LearningDashboard: React.FC<Props> = ({ onNavigate }) => {
  const { progress, getOverallCompletion, getTodayStats, getWeekStats } = useLearning();
  const overall = getOverallCompletion();
  const today = getTodayStats();
  const week = getWeekStats();
  const currentStage = roadmapStages.find((s) => s.id === progress.currentStage) || roadmapStages[0];
  const nextTopics = currentStage.topics.filter(
    (_, i) => !progress.completedLessons.includes(`${currentStage.id}-t${i}`)
  );

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white p-6 rounded-2xl">
        <h2 className="text-2xl font-black mb-1">Welcome to Your AI Learning Journey! 🚀</h2>
        <p className="text-indigo-100">
          {overall === 0
            ? "Start your journey to becoming an AI-powered web developer today."
            : `You're ${overall}% through the roadmap. Keep going!`}
        </p>
        <div className="mt-4 flex items-center gap-4">
          <div className="flex-1 bg-white/20 rounded-full h-3">
            <div
              className="h-3 rounded-full bg-white transition-all duration-700"
              style={{ width: `${overall}%` }}
            />
          </div>
          <span className="font-bold text-lg">{overall}%</span>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { icon: "📚", label: "Current Stage", value: currentStage.shortTitle, color: "bg-blue-50" },
          { icon: "✅", label: "Today's Tasks", value: today.tasks, color: "bg-green-50" },
          { icon: "📊", label: "Week Tasks", value: week.tasks, color: "bg-purple-50" },
          { icon: "🏆", label: "Total Completed", value: progress.completedLessons.length + progress.completedExercises.length + progress.completedProjects.length, color: "bg-amber-50" },
        ].map((stat) => (
          <div key={stat.label} className={`${stat.color} rounded-xl p-4`}>
            <span className="text-2xl">{stat.icon}</span>
            <div className="text-xl font-bold text-slate-800 mt-1">{stat.value}</div>
            <div className="text-xs text-slate-500">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Current Stage */}
        <div className="bg-white border rounded-xl p-5">
          <h3 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
            <span className="text-xl">{currentStage.icon}</span>
            Current: {currentStage.title}
          </h3>
          <div className="mb-3">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-slate-500">Stage Progress</span>
              <span className="font-medium">{progress.stageProgress[currentStage.id] || 0}%</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2.5">
              <div
                className="h-2.5 rounded-full transition-all"
                style={{ width: `${progress.stageProgress[currentStage.id] || 0}%`, backgroundColor: currentStage.color }}
              />
            </div>
          </div>
          <h4 className="text-sm font-medium text-slate-600 mb-2">Next topics to study:</h4>
          <ul className="space-y-1.5">
            {nextTopics.slice(0, 4).map((topic, i) => (
              <li key={i} className="text-sm text-slate-600 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: currentStage.color }} />
                {topic}
              </li>
            ))}
            {nextTopics.length > 4 && (
              <li className="text-sm text-slate-400">+{nextTopics.length - 4} more topics</li>
            )}
          </ul>
          <button
            onClick={() => onNavigate("roadmap")}
            className="mt-4 w-full py-2 rounded-lg text-white text-sm font-medium transition hover:opacity-90"
            style={{ backgroundColor: currentStage.color }}
          >
            Continue Learning →
          </button>
        </div>

        {/* Recommended Resources */}
        <div className="bg-white border rounded-xl p-5">
          <h3 className="font-bold text-slate-800 mb-3">📌 Recommended Resources</h3>
          <div className="space-y-2">
            {currentStage.resources.slice(0, 4).map((res, i) => (
              <a
                key={i}
                href={res.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 bg-slate-50 hover:bg-blue-50 rounded-lg transition group"
              >
                <span className="text-lg">
                  {res.type === "docs" ? "📄" : res.type === "video" ? "🎥" : res.type === "course" ? "🎓" : res.type === "github" ? "💻" : "📝"}
                </span>
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-slate-700 group-hover:text-blue-600">{res.title}</h4>
                  <p className="text-xs text-slate-400">{res.type}</p>
                </div>
                <span className="text-slate-300 group-hover:text-blue-500">↗</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Recent News */}
      <div className="bg-white border rounded-xl p-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-slate-800">📰 Latest AI News</h3>
          <button
            onClick={() => onNavigate("news")}
            className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
          >
            View All →
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {newsItems.slice(0, 4).map((item) => (
            <a
              key={item.id}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-slate-50 hover:bg-blue-50 rounded-lg transition group"
            >
              <h4 className="text-sm font-medium text-slate-700 group-hover:text-blue-600 line-clamp-2">
                {item.title}
              </h4>
              <div className="flex items-center gap-2 mt-1.5">
                <span className="text-xs text-slate-400">{item.source}</span>
                <span className="text-xs text-slate-300">•</span>
                <span className="text-xs text-slate-400">{item.date}</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LearningDashboard;
