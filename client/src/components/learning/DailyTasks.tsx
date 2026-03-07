import React, { useState } from "react";
import { useLearning } from "../../context/LearningContext";
import { dailyTaskTemplates, roadmapStages } from "../../data/learningData";

const taskTypeIcons: Record<string, string> = {
  concept: "📖",
  article: "📰",
  coding: "💻",
  project: "🚀",
  explore: "🔍",
};

const DailyTasks: React.FC = () => {
  const { progress, toggleDailyTask, addTime } = useLearning();
  const [timeInput, setTimeInput] = useState("");
  const today = new Date().toISOString().split("T")[0];
  const currentStage = roadmapStages.find((s) => s.id === progress.currentStage) || roadmapStages[0];
  const completedCount = dailyTaskTemplates.filter((t) => progress.completedDailyTasks.includes(`${today}-${t.id}`)).length;

  const handleAddTime = () => {
    const mins = parseInt(timeInput);
    if (mins > 0) {
      addTime(mins);
      setTimeInput("");
    }
  };

  return (
    <div className="space-y-6">
      {/* Compact Header */}
      <div className="bg-white border border-gray-200 rounded-lg p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
              <span className="text-xl">📋</span>
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">Daily Learning Tasks</h3>
              <p className="text-sm text-gray-500">Build consistent learning habits</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-gray-900">{completedCount}/{dailyTaskTemplates.length}</div>
            <div className="text-xs text-gray-400">Completed today</div>
          </div>
        </div>
        <div className="mt-3 w-full bg-gray-100 rounded-full h-1.5">
          <div
            className="h-1.5 rounded-full bg-blue-500 transition-all duration-500"
            style={{ width: `${(completedCount / dailyTaskTemplates.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Time Logger */}
      <div className="bg-white border border-gray-200 rounded-lg p-5">
        <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
          <svg className="w-4 h-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          Log Study Time
        </h4>
        <div className="flex gap-3">
          <input
            type="number"
            value={timeInput}
            onChange={(e) => setTimeInput(e.target.value)}
            placeholder="Minutes studied today..."
            className="flex-1 border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            min="1"
          />
          <button
            onClick={handleAddTime}
            className="px-5 py-2.5 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors"
          >
            + Add Time
          </button>
        </div>
        <p className="text-xs text-gray-400 mt-2">
          Total logged today: {(progress.dailyLog[today]?.minutes || 0)} minutes
        </p>
      </div>

      {/* Daily Tasks Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {dailyTaskTemplates.map((task) => {
          const key = `${today}-${task.id}`;
          const completed = progress.completedDailyTasks.includes(key);

          return (
            <div
              key={task.id}
              className={`bg-white border rounded-lg p-4 transition-all ${
                completed ? "border-gray-200 opacity-60" : "border-gray-200 hover:border-blue-300"
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 bg-gray-50">
                  <span className="text-lg">{taskTypeIcons[task.type] || "📝"}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className={`text-sm font-medium ${completed ? "text-gray-400 line-through" : "text-gray-900"}`}>
                    {task.title}
                  </h4>
                  <p className="text-xs text-gray-400 mt-0.5 line-clamp-2">{task.description}</p>
                </div>
                <button
                  onClick={() => toggleDailyTask(task.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex-shrink-0 ${
                    completed
                      ? "bg-gray-200 text-gray-500"
                      : "bg-blue-500 text-white hover:bg-blue-600"
                  }`}
                >
                  {completed ? "✓ Done" : "Complete"}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Stage-specific suggestion */}
      <div className="bg-white border border-gray-200 rounded-lg p-5">
        <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
          <span>{currentStage.icon}</span>
          Recommended for Stage {currentStage.id}: {currentStage.title}
        </h4>
        <div className="space-y-2">
          {currentStage.topics.slice(0, 3).map((topic, i) => {
            const lessonId = `${currentStage.id}-t${i}`;
            const done = progress.completedLessons.includes(lessonId);
            return (
              <div key={i} className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm ${
                done ? "bg-gray-50 text-gray-400" : "bg-gray-50 text-gray-700"
              }`}>
                {done ? (
                  <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                ) : (
                  <div className="w-4 h-4 rounded-full border-2 border-gray-300 flex-shrink-0" />
                )}
                <span className={done ? "line-through" : ""}>Study: {topic}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DailyTasks;
