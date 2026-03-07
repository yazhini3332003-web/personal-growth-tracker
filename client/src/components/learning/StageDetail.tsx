import React, { useState } from "react";
import { RoadmapStage } from "../../types/learning";
import { useLearning } from "../../context/LearningContext";

interface Props {
  stage: RoadmapStage;
  onClose: () => void;
}

type Tab = "topics" | "resources" | "practice" | "projects";

const resourceTypeIcons: Record<string, string> = {
  docs: "📄",
  tutorial: "📝",
  course: "🎓",
  github: "💻",
  blog: "📰",
  video: "🎥",
};

const difficultyColors: Record<string, string> = {
  beginner: "bg-green-100 text-green-700",
  intermediate: "bg-yellow-100 text-yellow-700",
  advanced: "bg-red-100 text-red-700",
};

const StageDetail: React.FC<Props> = ({ stage, onClose }) => {
  const [activeTab, setActiveTab] = useState<Tab>("topics");
  const { progress, toggleLesson, toggleExercise, toggleProject } = useLearning();

  const tabs: { key: Tab; label: string; icon: string }[] = [
    { key: "topics", label: "Topics", icon: "📚" },
    { key: "resources", label: "Resources", icon: "🔗" },
    { key: "practice", label: "Practice", icon: "💪" },
    { key: "projects", label: "Projects", icon: "🚀" },
  ];

  return (
    <div className="bg-white rounded-lg border-2 shadow-xl overflow-hidden" style={{ borderColor: stage.color }}>
      {/* Header */}
      <div className="p-6 text-white" style={{ background: `linear-gradient(135deg, ${stage.color}, ${stage.color}dd)` }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{stage.icon}</span>
            <div>
              <h2 className="text-xl font-bold">Stage {stage.id}: {stage.title}</h2>
              <p className="text-white/80 text-sm mt-1">{stage.description}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white bg-white/20 rounded-full w-8 h-8 flex items-center justify-center transition"
          >
            ✕
          </button>
        </div>

        {/* Tools */}
        <div className="mt-4 flex flex-wrap gap-2">
          {stage.tools.map((tool) => (
            <span key={tool} className="px-3 py-1 bg-white/20 rounded-full text-xs font-medium">
              {tool}
            </span>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex-1 px-4 py-3 text-sm font-medium transition-all ${
              activeTab === tab.key
                ? "border-b-2 text-gray-800"
                : "text-gray-500 hover:text-gray-700"
            }`}
            style={activeTab === tab.key ? { borderColor: stage.color } : {}}
          >
            <span className="mr-1">{tab.icon}</span> {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="p-6 max-h-96 overflow-y-auto">
        {activeTab === "topics" && (
          <div className="space-y-2">
            {stage.topics.map((topic, i) => {
              const id = `${stage.id}-t${i}`;
              const completed = progress.completedLessons.includes(id);
              return (
                <label
                  key={i}
                  className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition ${
                    completed ? "bg-green-50" : "bg-gray-50 hover:bg-gray-100"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={completed}
                    onChange={() => toggleLesson(id)}
                    className="w-5 h-5 rounded"
                    style={{ accentColor: stage.color }}
                  />
                  <span className={`flex-1 ${completed ? "line-through text-gray-400" : "text-gray-700"}`}>
                    {topic}
                  </span>
                  {completed && <span className="text-green-500 text-sm">✓ Done</span>}
                </label>
              );
            })}
          </div>
        )}

        {activeTab === "resources" && (
          <div className="space-y-3">
            {stage.resources.map((res, i) => (
              <a
                key={i}
                href={res.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 p-4 bg-gray-50 hover:bg-blue-50 rounded-lg transition group"
              >
                <span className="text-2xl">{resourceTypeIcons[res.type] || "📄"}</span>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-800 group-hover:text-blue-600 transition">{res.title}</h4>
                  <p className="text-sm text-gray-500 mt-0.5">{res.description}</p>
                  <span className="inline-block mt-2 px-2 py-0.5 bg-gray-200 text-gray-600 rounded text-xs capitalize">
                    {res.type}
                  </span>
                </div>
                <span className="text-gray-400 group-hover:text-blue-500 mt-1">↗</span>
              </a>
            ))}
          </div>
        )}

        {activeTab === "practice" && (
          <div className="space-y-3">
            {stage.practices.map((task) => {
              const completed = progress.completedExercises.includes(task.id);
              return (
                <div
                  key={task.id}
                  className={`p-4 rounded-lg border-2 transition ${
                    completed ? "border-green-200 bg-green-50" : "border-gray-200/60 bg-gray-50"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className={`font-semibold ${completed ? "text-green-600 line-through" : "text-gray-800"}`}>
                          {task.title}
                        </h4>
                        <span className={`px-2 py-0.5 rounded text-xs font-medium ${difficultyColors[task.difficulty]}`}>
                          {task.difficulty}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">{task.description}</p>
                    </div>
                    <button
                      onClick={() => toggleExercise(task.id)}
                      className={`ml-3 px-4 py-2 rounded-lg text-sm font-medium transition ${
                        completed
                          ? "bg-green-500 text-white hover:bg-green-600"
                          : "bg-white border-2 border-gray-200 text-gray-600 hover:border-gray-400"
                      }`}
                    >
                      {completed ? "✓ Done" : "Mark Done"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {activeTab === "projects" && (
          <div className="space-y-4">
            {stage.miniProjects.map((proj) => {
              const completed = progress.completedProjects.includes(proj.id);
              return (
                <div
                  key={proj.id}
                  className={`p-5 rounded-lg border-2 transition ${
                    completed ? "border-green-200 bg-green-50" : "border-gray-200/60 bg-white"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">🚀</span>
                        <h4 className={`font-bold text-lg ${completed ? "text-green-600 line-through" : "text-gray-800"}`}>
                          {proj.title}
                        </h4>
                        <span className={`px-2 py-0.5 rounded text-xs font-medium ${difficultyColors[proj.difficulty]}`}>
                          {proj.difficulty}
                        </span>
                      </div>
                      <p className="text-gray-600 mt-2">{proj.description}</p>
                    </div>
                    <button
                      onClick={() => toggleProject(proj.id)}
                      className={`ml-4 px-5 py-2.5 rounded-lg text-sm font-bold transition ${
                        completed
                          ? "bg-green-500 text-white hover:bg-green-600"
                          : "text-white hover:opacity-90"
                      }`}
                      style={!completed ? { backgroundColor: stage.color } : {}}
                    >
                      {completed ? "✓ Completed" : "Mark Complete"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default StageDetail;
