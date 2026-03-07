import React from "react";
import { useBlenderLabContext } from "../../context/BlenderLabContext";
import { blenderPhases } from "../../data/blenderLabData";

const BlenderProgressTracker: React.FC = () => {
  const { getOverallStats, getPhaseProgress, progress, resetAllProgress } = useBlenderLabContext();
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
        <h2 className="text-2xl font-bold text-gray-900 mb-2">📊 Learning Progress</h2>
        <p className="text-gray-500 text-sm">Track your journey to becoming a skilled Blender artist</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-orange-50 rounded-2xl p-5 border border-orange-200">
          <p className="text-orange-600 text-xs font-semibold mb-1">Total Progress</p>
          <div className="flex items-end gap-2">
            <span className="text-3xl font-bold text-gray-900">{stats.totalProgress}%</span>
          </div>
          <div className="mt-3 bg-orange-100 rounded-full h-2">
            <div
              className="h-full bg-orange-500 rounded-full transition-all duration-700"
              style={{ width: `${stats.totalProgress}%` }}
            />
          </div>
        </div>

        <div className="bg-green-50 rounded-2xl p-5 border border-green-200">
          <p className="text-green-600 text-xs font-semibold mb-1">Phases Completed</p>
          <div className="flex items-end gap-2">
            <span className="text-3xl font-bold text-gray-900">{stats.completedPhases}</span>
            <span className="text-green-500 text-sm mb-1">/ 10</span>
          </div>
          <div className="mt-3 bg-green-100 rounded-full h-2">
            <div
              className="h-full bg-green-500 rounded-full transition-all"
              style={{ width: `${(stats.completedPhases / 10) * 100}%` }}
            />
          </div>
        </div>

        <div className="bg-amber-50 rounded-2xl p-5 border border-amber-200">
          <p className="text-amber-600 text-xs font-semibold mb-1">🔥 Learning Streak</p>
          <div className="flex items-end gap-2">
            <span className="text-3xl font-bold text-gray-900">{stats.streak}</span>
            <span className="text-amber-500 text-sm mb-1">days</span>
          </div>
          <p className="text-amber-400 text-xs mt-3">
            {stats.streak >= 7
              ? "🏆 Amazing streak!"
              : stats.streak >= 3
              ? "💪 Keep going!"
              : "🌱 Just getting started!"}
          </p>
        </div>

        <div className="bg-cyan-50 rounded-2xl p-5 border border-cyan-200">
          <p className="text-cyan-600 text-xs font-semibold mb-1">⏱️ Total Time</p>
          <div className="flex items-end gap-2">
            <span className="text-3xl font-bold text-gray-900">
              {stats.totalMinutes >= 60
                ? `${Math.floor(stats.totalMinutes / 60)}h`
                : `${stats.totalMinutes}m`}
            </span>
            {stats.totalMinutes >= 60 && (
              <span className="text-cyan-500 text-sm mb-1">{stats.totalMinutes % 60}m</span>
            )}
          </div>
          <p className="text-cyan-400 text-xs mt-3">
            Exercises: {stats.completedExercises} | Projects: {stats.completedProjects}
          </p>
        </div>

        <div className="bg-purple-50 rounded-2xl p-5 border border-purple-200 col-span-2 lg:col-span-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-purple-600 text-xs font-semibold">📖 Lessons Completed</p>
            <span className="text-purple-500 text-xs">{stats.completedLessons} lessons</span>
          </div>
          <div className="bg-purple-100 rounded-full h-2">
            <div
              className="h-full bg-purple-500 rounded-full transition-all duration-700"
              style={{ width: `${Math.min((stats.completedLessons / 60) * 100, 100)}%` }}
            />
          </div>
        </div>
      </div>

      {/* Weekly Chart */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <h3 className="text-gray-900 font-semibold mb-4 flex items-center gap-2">
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
                <div className="w-full bg-gray-100 rounded-t-lg relative" style={{ height: "120px" }}>
                  <div
                    className={`absolute bottom-0 w-full rounded-t-lg transition-all duration-500 ${
                      isToday ? "bg-orange-500" : "bg-orange-400"
                    }`}
                    style={{ height: `${height}%`, minHeight: minutes > 0 ? "4px" : "0" }}
                  />
                </div>
                <span className={`text-xs ${isToday ? "text-orange-500 font-semibold" : "text-gray-500"}`}>
                  {weekLabels[i]}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Daily Progress Log */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <h3 className="text-gray-900 font-semibold mb-4 flex items-center gap-2">
          📝 Daily Learning Log
        </h3>
        {Object.keys(progress.dailyLog || {}).length > 0 ? (
          <div className="grid grid-cols-7 gap-2">
            {Array.from({ length: 28 }, (_, i) => {
              const d = new Date();
              d.setDate(d.getDate() - (27 - i));
              const key = d.toISOString().split("T")[0];
              const mins = (progress.dailyLog || {})[key] || 0;
              const intensity =
                mins === 0 ? 0 : mins < 10 ? 1 : mins < 30 ? 2 : mins < 60 ? 3 : 4;
              const colors = [
                "bg-gray-200",
                "bg-orange-200",
                "bg-orange-300",
                "bg-orange-400",
                "bg-orange-500",
              ];
              return (
                <div
                  key={key}
                  className={`aspect-square rounded-md ${colors[intensity]} flex items-center justify-center cursor-default`}
                  title={`${key}: ${mins} min`}
                >
                  {i >= 21 && (
                    <span className="text-[10px] text-gray-600">{d.getDate()}</span>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-gray-500 text-sm text-center py-4">
            Start learning to see your daily activity!
          </p>
        )}
        <div className="flex items-center gap-2 mt-3 justify-end">
          <span className="text-gray-500 text-xs">Less</span>
          {["bg-gray-200", "bg-orange-200", "bg-orange-300", "bg-orange-400", "bg-orange-500"].map(
            (c, i) => (
              <div key={i} className={`w-3 h-3 rounded-sm ${c}`} />
            )
          )}
          <span className="text-gray-500 text-xs">More</span>
        </div>
      </div>

      {/* Phase-by-Phase Breakdown */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <h3 className="text-gray-900 font-semibold mb-4 flex items-center gap-2">
          🎯 Phase Breakdown
        </h3>
        <div className="space-y-3">
          {blenderPhases.map((phase) => {
            const pp = getPhaseProgress(phase.id);
            const percent = pp.phaseDone
              ? 100
              : Math.round(
                  ((pp.exercises + (pp.projectDone ? 1 : 0)) / (pp.totalExercises + 1)) * 100
                );

            return (
              <div key={phase.id} className="flex items-center gap-4">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-sm"
                  style={{ background: `${phase.color}22` }}
                >
                  {phase.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-gray-900 text-xs font-medium truncate pr-2">
                      {phase.title}
                    </span>
                    <span className="text-gray-500 text-xs whitespace-nowrap">{percent}%</span>
                  </div>
                  <div className="bg-gray-200 rounded-full h-1.5">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${percent}%`,
                        backgroundColor: pp.phaseDone ? "#22c55e" : phase.color,
                      }}
                    />
                  </div>
                </div>
                {pp.phaseDone && (
                  <span className="text-green-500 text-xs font-semibold">✓</span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Reset */}
      <div className="text-center py-4">
        <button
          onClick={() => {
            if (window.confirm("Are you sure you want to reset all Blender learning progress?")) {
              resetAllProgress();
            }
          }}
          className="px-4 py-2 text-gray-400 text-xs hover:text-red-400 transition-colors"
        >
          Reset All Progress
        </button>
      </div>
    </div>
  );
};

export default BlenderProgressTracker;
