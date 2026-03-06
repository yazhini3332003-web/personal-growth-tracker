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

  const handleAddTime = () => {
    const mins = parseInt(timeInput);
    if (mins > 0) {
      addTime(mins);
      setTimeInput("");
    }
  };

  return (
    <div className="space-y-5">
      <div className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white p-5 rounded-xl">
        <h3 className="text-lg font-bold">📋 Daily Learning Tasks</h3>
        <p className="text-cyan-100 text-sm mt-1">
          Complete these daily tasks to build consistent learning habits
        </p>
      </div>

      {/* Time Logger */}
      <div className="bg-white border rounded-xl p-5">
        <h4 className="font-bold text-slate-800 mb-3">⏱️ Log Study Time</h4>
        <div className="flex gap-3">
          <input
            type="number"
            value={timeInput}
            onChange={(e) => setTimeInput(e.target.value)}
            placeholder="Minutes studied today..."
            className="flex-1 border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            min="1"
          />
          <button
            onClick={handleAddTime}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition"
          >
            + Add Time
          </button>
        </div>
        <p className="text-xs text-slate-400 mt-2">
          Total logged today: {(progress.dailyLog[today]?.minutes || 0)} minutes
        </p>
      </div>

      {/* Daily Tasks */}
      <div className="space-y-3">
        {dailyTaskTemplates.map((task) => {
          const key = `${today}-${task.id}`;
          const completed = progress.completedDailyTasks.includes(key);

          return (
            <div
              key={task.id}
              className={`bg-white border-2 rounded-xl p-4 transition ${
                completed ? "border-green-200 bg-green-50" : "border-slate-200/60"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{taskTypeIcons[task.type] || "📝"}</span>
                <div className="flex-1">
                  <h4 className={`font-medium ${completed ? "text-green-600 line-through" : "text-slate-800"}`}>
                    {task.title}
                  </h4>
                  <p className="text-sm text-slate-500 mt-0.5">{task.description}</p>
                </div>
                <button
                  onClick={() => toggleDailyTask(task.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                    completed
                      ? "bg-green-500 text-white"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
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
      <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-5">
        <h4 className="font-bold text-indigo-800 mb-2 flex items-center gap-2">
          <span>{currentStage.icon}</span>
          Recommended for Stage {currentStage.id}: {currentStage.title}
        </h4>
        <ul className="space-y-2">
          {currentStage.topics.slice(0, 3).map((topic, i) => {
            const lessonId = `${currentStage.id}-t${i}`;
            const done = progress.completedLessons.includes(lessonId);
            return (
              <li key={i} className={`text-sm flex items-center gap-2 ${done ? "text-green-600 line-through" : "text-indigo-700"}`}>
                {done ? "✅" : "▸"} Study: {topic}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default DailyTasks;
