import React from "react";
import { useLabContext } from "../../context/LearningLabContext";
import { labPhases } from "../../data/learningLabData";

const LabProgressTracker: React.FC = () => {
  const { getOverallStats, getPhaseProgress, progress, resetAllProgress } = useLabContext();
  const stats = getOverallStats();

  // Weekly data
  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    return d.toISOString().split("T")[0];
  });
  const weekLabels = weekDays.map((d) => {
    const date = new Date(d);
    return date.toLocaleDateString("en", { weekday: "short" });
  });
  const weekMinutes = weekDays.map((d) => progress.weeklyLog[d] || 0);
  const maxMinutes = Math.max(...weekMinutes, 30);

  return (
    <div className="space-y-6">
      <div className="text-center mb-4">
        <h2 className="text-2xl font-bold text-white mb-2">📊 Learning Progress</h2>
        <p className="text-gray-400 text-sm">Track your journey to becoming an AI developer</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-indigo-900/40 to-indigo-900/20 rounded-2xl p-5 border border-indigo-800/40">
          <p className="text-indigo-300 text-xs font-semibold mb-1">Total Progress</p>
          <div className="flex items-end gap-2">
            <span className="text-3xl font-bold text-white">{stats.totalProgress}%</span>
          </div>
          <div className="mt-3 bg-indigo-950 rounded-full h-2">
            <div
              className="h-full bg-indigo-500 rounded-full transition-all duration-700"
              style={{ width: `${stats.totalProgress}%` }}
            />
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-900/40 to-green-900/20 rounded-2xl p-5 border border-green-800/40">
          <p className="text-green-300 text-xs font-semibold mb-1">Phases Completed</p>
          <div className="flex items-end gap-2">
            <span className="text-3xl font-bold text-white">{stats.completedPhases}</span>
            <span className="text-green-400 text-sm mb-1">/ 8</span>
          </div>
          <div className="mt-3 bg-green-950 rounded-full h-2">
            <div
              className="h-full bg-green-500 rounded-full transition-all"
              style={{ width: `${(stats.completedPhases / 8) * 100}%` }}
            />
          </div>
        </div>

        <div className="bg-gradient-to-br from-amber-900/40 to-amber-900/20 rounded-2xl p-5 border border-amber-800/40">
          <p className="text-amber-300 text-xs font-semibold mb-1">🔥 Learning Streak</p>
          <div className="flex items-end gap-2">
            <span className="text-3xl font-bold text-white">{stats.streak}</span>
            <span className="text-amber-400 text-sm mb-1">days</span>
          </div>
          <p className="text-amber-500/60 text-xs mt-3">
            {stats.streak >= 7 ? "🏆 Amazing streak!" : stats.streak >= 3 ? "💪 Keep going!" : "🌱 Just getting started!"}
          </p>
        </div>

        <div className="bg-gradient-to-br from-cyan-900/40 to-cyan-900/20 rounded-2xl p-5 border border-cyan-800/40">
          <p className="text-cyan-300 text-xs font-semibold mb-1">⏱️ Total Time</p>
          <div className="flex items-end gap-2">
            <span className="text-3xl font-bold text-white">
              {stats.totalMinutes >= 60
                ? `${Math.floor(stats.totalMinutes / 60)}h`
                : `${stats.totalMinutes}m`}
            </span>
            {stats.totalMinutes >= 60 && (
              <span className="text-cyan-400 text-sm mb-1">
                {stats.totalMinutes % 60}m
              </span>
            )}
          </div>
          <p className="text-cyan-500/60 text-xs mt-3">
            Exercises: {stats.completedExercises} | Projects: {stats.completedProjects}
          </p>
        </div>
      </div>

      {/* Weekly Chart */}
      <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6">
        <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
          📅 Weekly Learning Activity
        </h3>
        <div className="flex items-end gap-3 h-[160px]">
          {weekDays.map((day, i) => {
            const minutes = weekMinutes[i];
            const height = maxMinutes > 0 ? (minutes / maxMinutes) * 100 : 0;
            const isToday = day === new Date().toISOString().split("T")[0];

            return (
              <div key={day} className="flex-1 flex flex-col items-center gap-2">
                <span className="text-gray-500 text-xs">{minutes}m</span>
                <div className="w-full bg-gray-800 rounded-t-lg relative" style={{ height: "120px" }}>
                  <div
                    className={`absolute bottom-0 w-full rounded-t-lg transition-all duration-500 ${
                      isToday ? "bg-indigo-500" : "bg-indigo-700"
                    }`}
                    style={{ height: `${height}%`, minHeight: minutes > 0 ? "4px" : "0" }}
                  />
                </div>
                <span className={`text-xs ${isToday ? "text-indigo-400 font-semibold" : "text-gray-500"}`}>
                  {weekLabels[i]}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Phase-by-Phase Breakdown */}
      <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6">
        <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
          🎯 Phase Breakdown
        </h3>
        <div className="space-y-3">
          {labPhases.map((phase) => {
            const pp = getPhaseProgress(phase.id);
            const percent = pp.phaseDone
              ? 100
              : Math.round(
                  ((pp.exercises + (pp.projectDone ? 1 : 0)) / (pp.totalExercises + 1)) * 100
                );

            return (
              <div key={phase.id} className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm" style={{ background: `${phase.color}33` }}>
                  {phase.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-gray-300 text-sm">{phase.title}</span>
                    <span className="text-gray-500 text-xs">
                      {pp.exercises}/{pp.totalExercises} exercises
                      {pp.projectDone && " • Project ✅"}
                    </span>
                  </div>
                  <div className="bg-gray-800 rounded-full h-2">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${percent}%`,
                        background: pp.phaseDone ? "#10b981" : phase.color,
                      }}
                    />
                  </div>
                </div>
                <span className="text-gray-500 text-xs w-10 text-right">{percent}%</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Reset */}
      <div className="text-center">
        <button
          onClick={() => {
            if (window.confirm("Are you sure you want to reset all progress? This cannot be undone.")) {
              resetAllProgress();
            }
          }}
          className="px-4 py-2 bg-red-900/30 hover:bg-red-900/50 text-red-400 text-xs rounded-lg border border-red-800/30 transition-colors"
        >
          🗑️ Reset All Progress
        </button>
      </div>
    </div>
  );
};

export default LabProgressTracker;
