import React from "react";
import { useLearning } from "../../context/LearningContext";
import { roadmapStages } from "../../data/learningData";

const ProgressTracker: React.FC = () => {
  const { progress, getOverallCompletion, getTodayStats, getWeekStats } = useLearning();
  const overall = getOverallCompletion();
  const today = getTodayStats();
  const week = getWeekStats();

  const stats = [
    { label: "Lessons Done", value: progress.completedLessons.length, icon: "📚" },
    { label: "Exercises Done", value: progress.completedExercises.length, icon: "💪" },
    { label: "Projects Done", value: progress.completedProjects.length, icon: "🚀" },
    { label: "Total Time", value: `${Math.round(progress.totalTimeMinutes / 60)}h ${progress.totalTimeMinutes % 60}m`, icon: "⏱️" },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white border border-gray-200 rounded-lg p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-500">{stat.label}</span>
              <span className="text-lg">{stat.icon}</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Daily & Weekly */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <h4 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <svg className="w-4 h-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            Today's Progress
          </h4>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-gray-900">{today.tasks}</div>
              <div className="text-xs text-gray-500 mt-1">Tasks Done</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-gray-900">{today.minutes}m</div>
              <div className="text-xs text-gray-500 mt-1">Time Spent</div>
            </div>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <h4 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <svg className="w-4 h-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
            This Week
          </h4>
          <div className="grid grid-cols-3 gap-2">
            <div className="bg-gray-50 rounded-lg p-3 text-center">
              <div className="text-xl font-bold text-gray-900">{week.tasks}</div>
              <div className="text-xs text-gray-500 mt-1">Tasks</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-3 text-center">
              <div className="text-xl font-bold text-gray-900">{week.minutes}m</div>
              <div className="text-xs text-gray-500 mt-1">Time</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-3 text-center">
              <div className="text-xl font-bold text-gray-900">{week.days}</div>
              <div className="text-xs text-gray-500 mt-1">Days Active</div>
            </div>
          </div>
        </div>
      </div>

      {/* Stage-by-Stage Progress */}
      <div className="bg-white border border-gray-200 rounded-lg p-5">
        <h4 className="font-semibold text-gray-800 mb-4">Stage Progress</h4>
        <div className="space-y-3">
          {roadmapStages.map((stage) => {
            const completion = progress.stageProgress[stage.id] || 0;
            return (
              <div key={stage.id} className="flex items-center gap-3">
                <span className="text-xl w-8 text-center">{stage.icon}</span>
                <span className="text-sm text-gray-600 w-36 truncate">{stage.title}</span>
                <div className="flex-1 bg-gray-100 rounded-full h-1.5">
                  <div
                    className="h-1.5 rounded-full bg-blue-500 transition-all duration-500"
                    style={{ width: `${completion}%` }}
                  />
                </div>
                <span className="text-sm font-medium text-gray-500 w-12 text-right">{completion}%</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Overall Mastery */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-semibold text-gray-800 flex items-center gap-2">
            <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
            Overall Mastery
          </h4>
          <span className="text-3xl font-bold text-blue-500">{overall}%</span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-2">
          <div
            className="h-2 rounded-full bg-blue-500 transition-all duration-700"
            style={{ width: `${overall}%` }}
          />
        </div>
        <p className="text-xs text-gray-400 mt-2">Complete all 8 stages to reach 100% mastery</p>
      </div>
    </div>
  );
};

export default ProgressTracker;
