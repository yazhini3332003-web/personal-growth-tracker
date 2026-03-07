import React, { useState } from "react";
import { useBlenderLabContext } from "../../context/BlenderLabContext";
import { BlenderPhase } from "../../types/blenderLab";

interface PhaseDetailProps {
  phase: BlenderPhase;
  onBack: () => void;
}

const PhaseDetail: React.FC<PhaseDetailProps> = ({ phase, onBack }) => {
  const {
    completeExercise,
    completeProject,
    completePhase,
    completeLesson,
    progress,
    getPhaseProgress,
    addLearningTime,
    savePhaseNote,
  } = useBlenderLabContext();

  const [activeTab, setActiveTab] = useState<"learn" | "practice" | "project" | "resources">("learn");
  const [note, setNote] = useState(progress.phaseNotes[phase.id] || "");
  const pp = getPhaseProgress(phase.id);

  const tabs = [
    { key: "learn" as const, label: "Learn", icon: "📚" },
    { key: "practice" as const, label: "Practice", icon: "🔨" },
    { key: "project" as const, label: "Project", icon: "🚀" },
    { key: "resources" as const, label: "Resources", icon: "🔗" },
  ];

  const levelBadge = {
    beginner: "bg-green-100 text-green-700",
    intermediate: "bg-blue-100 text-blue-700",
    advanced: "bg-red-100 text-red-700",
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={onBack}
          className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
        >
          ←
        </button>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-2xl">{phase.icon}</span>
            <h2 className="text-xl font-bold text-gray-900">{phase.title}</h2>
            <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold uppercase ${levelBadge[phase.level]}`}>
              {phase.level}
            </span>
          </div>
          <p className="text-gray-500 text-sm">{phase.subtitle}</p>
        </div>
        {!pp.phaseDone && (
          <button
            onClick={() => {
              completePhase(phase.id);
              addLearningTime(30);
            }}
            className="px-4 py-2 bg-orange-500 text-white rounded-xl text-sm font-medium hover:bg-orange-600 transition-colors"
          >
            Mark Complete ✓
          </button>
        )}
        {pp.phaseDone && (
          <span className="px-4 py-2 bg-green-100 text-green-700 rounded-xl text-sm font-medium">
            ✓ Completed
          </span>
        )}
      </div>

      {/* Progress bar */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex justify-between text-xs text-gray-500 mb-2">
          <span>Phase Progress</span>
          <span>
            {pp.exercises}/{pp.totalExercises} exercises · Project {pp.projectDone ? "✓" : "○"}
          </span>
        </div>
        <div className="bg-gray-200 rounded-full h-2">
          <div
            className={`h-full rounded-full transition-all ${pp.phaseDone ? "bg-green-500" : "bg-orange-500"}`}
            style={{
              width: `${pp.phaseDone ? 100 : ((pp.exercises + (pp.projectDone ? 1 : 0)) / (pp.totalExercises + 1)) * 100}%`,
            }}
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 rounded-xl p-1.5">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex-1 px-4 py-2.5 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2 ${
              activeTab === tab.key
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <span>{tab.icon}</span>
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Learn Tab */}
      {activeTab === "learn" && (
        <div className="space-y-6">
          {/* Why Important */}
          <div className="bg-orange-50 rounded-2xl border border-orange-200 p-6">
            <h3 className="text-gray-900 font-semibold mb-2 flex items-center gap-2">
              💡 Why This Matters
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">{phase.whyImportant}</p>
          </div>

          {/* Real-World Applications */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <h3 className="text-gray-900 font-semibold mb-4 flex items-center gap-2">
              🌍 Real-World Applications
            </h3>
            <div className="space-y-2">
              {phase.realWorldApps.map((app, i) => (
                <div key={i} className="flex items-start gap-3 text-sm">
                  <span className="text-orange-500 mt-0.5">▸</span>
                  <span className="text-gray-600">{app}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Learning Content */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <h3 className="text-gray-900 font-semibold mb-4 flex items-center gap-2">
              📖 Learning Content
            </h3>
            <div className="space-y-4">
              {phase.learningContent.map((content, i) => {
                const lessonId = `b${phase.id}-lesson-${i}`;
                const isDone = progress.completedLessons.includes(lessonId);
                return (
                  <div
                    key={i}
                    className={`p-4 rounded-xl border transition-all ${
                      isDone ? "bg-green-50 border-green-200" : "bg-gray-50 border-gray-200"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <button
                        onClick={() => {
                          completeLesson(lessonId);
                          addLearningTime(5);
                        }}
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all ${
                          isDone
                            ? "bg-green-500 border-green-500 text-white"
                            : "border-gray-300 hover:border-orange-500"
                        }`}
                      >
                        {isDone && <span className="text-xs">✓</span>}
                      </button>
                      <p className={`text-sm leading-relaxed ${isDone ? "text-green-700" : "text-gray-600"}`}>
                        {content}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Personal Notes */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <h3 className="text-gray-900 font-semibold mb-3 flex items-center gap-2">
              📝 Personal Notes
            </h3>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              onBlur={() => savePhaseNote(phase.id, note)}
              placeholder="Write your notes, key takeaways, and ideas here..."
              className="w-full h-32 bg-gray-50 rounded-xl border border-gray-200 p-4 text-sm text-gray-700 resize-none focus:border-orange-300 focus:outline-none"
            />
          </div>
        </div>
      )}

      {/* Practice Tab */}
      {activeTab === "practice" && (
        <div className="space-y-6">
          <div className="text-center mb-2">
            <h3 className="text-lg font-bold text-gray-900">🔨 Practice Exercises</h3>
            <p className="text-gray-500 text-xs">Complete these exercises to build real Blender skills</p>
          </div>

          {phase.exercises.map((exercise) => {
            const isDone = progress.completedExercises.includes(exercise.id);
            return (
              <div
                key={exercise.id}
                className={`bg-white rounded-2xl border p-6 transition-all ${
                  isDone ? "border-green-300 bg-green-50" : "border-gray-200"
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase ${
                      exercise.difficulty === "beginner"
                        ? "bg-green-100 text-green-700"
                        : exercise.difficulty === "intermediate"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-red-100 text-red-700"
                    }`}>
                      {exercise.difficulty}
                    </span>
                    <h4 className="text-gray-900 font-semibold text-sm">{exercise.title}</h4>
                  </div>
                  {isDone && <span className="text-green-500 text-sm font-medium">✓ Done</span>}
                </div>

                <p className="text-gray-500 text-sm mb-4">{exercise.description}</p>

                <div className="bg-orange-50 rounded-xl border border-orange-200 p-4 mb-4">
                  <h5 className="text-orange-700 font-semibold text-xs mb-2">📋 Task</h5>
                  <p className="text-gray-700 text-sm">{exercise.task}</p>
                </div>

                <div className="bg-blue-50 rounded-xl border border-blue-200 p-4 mb-4">
                  <h5 className="text-blue-700 font-semibold text-xs mb-2">🎯 Expected Result</h5>
                  <p className="text-gray-700 text-sm">{exercise.exampleResult}</p>
                </div>

                {exercise.hints.length > 0 && (
                  <div className="bg-gray-50 rounded-xl border border-gray-200 p-4 mb-4">
                    <h5 className="text-gray-700 font-semibold text-xs mb-2">💡 Hints</h5>
                    <ul className="space-y-1">
                      {exercise.hints.map((hint, i) => (
                        <li key={i} className="text-gray-600 text-xs flex items-start gap-2">
                          <span className="text-orange-500">•</span> {hint}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {!isDone && (
                  <button
                    onClick={() => {
                      completeExercise(exercise.id);
                      addLearningTime(15);
                    }}
                    className="w-full py-2.5 bg-orange-500 text-white rounded-xl text-sm font-medium hover:bg-orange-600 transition-colors"
                  >
                    Mark Exercise Complete ✓
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Project Tab */}
      {activeTab === "project" && (
        <div className="space-y-6">
          <div className={`bg-white rounded-2xl border p-6 ${pp.projectDone ? "border-green-300 bg-green-50" : "border-gray-200"}`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                🚀 {phase.miniProject.title}
              </h3>
              {pp.projectDone && <span className="text-green-500 font-medium text-sm">✓ Completed</span>}
            </div>

            <p className="text-gray-600 text-sm mb-5">{phase.miniProject.description}</p>

            <div className="bg-orange-50 rounded-xl border border-orange-200 p-4 mb-5">
              <h4 className="text-orange-700 font-semibold text-xs mb-2">🎯 Project Goal</h4>
              <p className="text-gray-700 text-sm">{phase.miniProject.goal}</p>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-4 mb-5">
              <h4 className="text-gray-900 font-semibold text-xs mb-3">📋 Steps to Build</h4>
              <div className="space-y-2">
                {phase.miniProject.steps.map((step, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-xs font-bold flex-shrink-0">
                      {i + 1}
                    </div>
                    <p className="text-gray-600 text-sm">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-purple-50 rounded-xl border border-purple-200 p-4 mb-5">
              <h4 className="text-purple-700 font-semibold text-xs mb-2">🧠 Skills Learned</h4>
              <div className="flex flex-wrap gap-2">
                {phase.miniProject.skillsLearned.map((skill, i) => (
                  <span key={i} className="px-2 py-1 bg-purple-100 text-purple-700 rounded-lg text-xs">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-blue-50 rounded-xl border border-blue-200 p-4 mb-5">
              <h4 className="text-blue-700 font-semibold text-xs mb-2">📸 Final Result Reference</h4>
              <p className="text-gray-700 text-sm">{phase.miniProject.resultReference}</p>
            </div>

            <div className="flex flex-wrap gap-2 mb-5">
              {phase.miniProject.tags.map((tag, i) => (
                <span key={i} className="px-2 py-1 bg-gray-100 text-gray-600 rounded-lg text-xs">
                  #{tag}
                </span>
              ))}
            </div>

            {!pp.projectDone && (
              <button
                onClick={() => {
                  completeProject(phase.miniProject.id);
                  addLearningTime(30);
                }}
                className="w-full py-3 bg-orange-500 text-white rounded-xl text-sm font-medium hover:bg-orange-600 transition-colors"
              >
                Mark Project Complete 🎉
              </button>
            )}
          </div>
        </div>
      )}

      {/* Resources Tab */}
      {activeTab === "resources" && (
        <div className="space-y-6">
          {/* Tools */}
          {phase.tools.length > 0 && (
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h3 className="text-gray-900 font-semibold mb-4 flex items-center gap-2">
                🛠️ Tools
              </h3>
              <div className="grid gap-3 sm:grid-cols-2">
                {phase.tools.map((tool, i) => (
                  <a
                    key={i}
                    href={tool.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-200 hover:border-orange-200 transition-colors group"
                  >
                    <span className="text-xl">{tool.icon}</span>
                    <div>
                      <h4 className="text-gray-900 text-sm font-medium group-hover:text-orange-500 transition-colors">
                        {tool.name}
                      </h4>
                      <p className="text-gray-500 text-xs">{tool.description}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Resources */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <h3 className="text-gray-900 font-semibold mb-4 flex items-center gap-2">
              📚 Learning Resources
            </h3>
            <div className="space-y-3">
              {phase.resources.map((resource, i) => {
                const typeIcon = { tutorial: "📖", docs: "📄", blog: "✍️", github: "💻", video: "🎥" };
                return (
                  <a
                    key={i}
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-200 hover:border-orange-200 transition-colors group"
                  >
                    <span className="text-lg">{typeIcon[resource.type] || "🔗"}</span>
                    <div className="flex-1">
                      <h4 className="text-gray-900 text-sm font-medium group-hover:text-orange-500 transition-colors">
                        {resource.title}
                      </h4>
                      <p className="text-gray-500 text-xs">{resource.description}</p>
                    </div>
                    <span className="text-gray-400 text-xs">→</span>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhaseDetail;
