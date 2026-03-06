import React from "react";
import { useLearning } from "../../context/LearningContext";
import { roadmapStages } from "../../data/learningData";

const ProgressTracker: React.FC = () => {
  const { progress, getOverallCompletion, getTodayStats, getWeekStats } = useLearning();
  const overall = getOverallCompletion();
  const today = getTodayStats();
  const week = getWeekStats();

  const stats = [
    { label: "Lessons Done", value: progress.completedLessons.length, icon: "📚", color: "bg-blue-50 text-blue-600" },
    { label: "Exercises Done", value: progress.completedExercises.length, icon: "💪", color: "bg-green-50 text-green-600" },
    { label: "Projects Done", value: progress.completedProjects.length, icon: "🚀", color: "bg-purple-50 text-purple-600" },
    { label: "Total Time", value: `${Math.round(progress.totalTimeMinutes / 60)}h ${progress.totalTimeMinutes % 60}m`, icon: "⏱️", color: "bg-orange-50 text-orange-600" },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className={`${stat.color} p-4 rounded-xl`}>
            <div className="text-2xl mb-1">{stat.icon}</div>
            <div className="text-2xl font-bold">{stat.value}</div>
            <div className="text-sm opacity-75">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Daily & Weekly */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white p-5 rounded-xl">
          <h4 className="font-bold text-lg mb-3">📅 Today's Progress</h4>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white/20 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold">{today.tasks}</div>
              <div className="text-xs text-white/80">Tasks Done</div>
            </div>
            <div className="bg-white/20 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold">{today.minutes}m</div>
              <div className="text-xs text-white/80">Time Spent</div>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-violet-500 to-purple-600 text-white p-5 rounded-xl">
          <h4 className="font-bold text-lg mb-3">📊 This Week</h4>
          <div className="grid grid-cols-3 gap-2">
            <div className="bg-white/20 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold">{week.tasks}</div>
              <div className="text-xs text-white/80">Tasks</div>
            </div>
            <div className="bg-white/20 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold">{week.minutes}m</div>
              <div className="text-xs text-white/80">Time</div>
            </div>
            <div className="bg-white/20 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold">{week.days}</div>
              <div className="text-xs text-white/80">Days Active</div>
            </div>
          </div>
        </div>
      </div>

      {/* Stage-by-Stage Progress */}
      <div className="bg-white rounded-xl border p-5">
        <h4 className="font-bold text-slate-800 mb-4">Stage Progress</h4>
        <div className="space-y-3">
          {roadmapStages.map((stage) => {
            const completion = progress.stageProgress[stage.id] || 0;
            return (
              <div key={stage.id} className="flex items-center gap-3">
                <span className="text-xl w-8 text-center">{stage.icon}</span>
                <span className="text-sm text-slate-600 w-36 truncate">{stage.title}</span>
                <div className="flex-1 bg-slate-100 rounded-full h-3">
                  <div
                    className="h-3 rounded-full transition-all duration-500"
                    style={{ width: `${completion}%`, backgroundColor: stage.color }}
                  />
                </div>
                <span className="text-sm font-medium text-slate-500 w-12 text-right">{completion}%</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Overall */}
      <div className="bg-slate-900 text-white p-5 rounded-xl">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-bold text-lg">🏆 Overall Mastery</h4>
          <span className="text-3xl font-black">{overall}%</span>
        </div>
        <div className="w-full bg-slate-700 rounded-full h-4">
          <div
            className="h-4 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-700"
            style={{ width: `${overall}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default ProgressTracker;
