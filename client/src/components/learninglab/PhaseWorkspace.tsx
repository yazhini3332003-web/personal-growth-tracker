import React, { useState } from "react";
import { LabPhase } from "../../types/learningLab";
import { useLabContext } from "../../context/LearningLabContext";
import CodeEditor from "./CodeEditor";
import PromptPlayground from "./PromptPlayground";
import ChatbotSimulator from "./ChatbotSimulator";
import APITestingPlayground from "./APITestingPlayground";
import AgentWorkflowBuilder from "./AgentWorkflowBuilder";

interface PhaseWorkspaceProps {
  phase: LabPhase;
  onBack: () => void;
}

type WorkspaceTab = "learn" | "resources" | "practice" | "project";

const PhaseWorkspace: React.FC<PhaseWorkspaceProps> = ({ phase, onBack }) => {
  const [activeTab, setActiveTab] = useState<WorkspaceTab>("learn");
  const {
    completeExercise,
    completeProject,
    completePhase,
    progress,
    getPhaseProgress,
    addLearningTime,
    savePhaseNote,
  } = useLabContext();

  const pp = getPhaseProgress(phase.id);
  const [notes, setNotes] = useState(progress.phaseNotes[phase.id] || "");

  const tabs: { key: WorkspaceTab; label: string; icon: string }[] = [
    { key: "learn", label: "Learning", icon: "📖" },
    { key: "resources", label: "Resources", icon: "🔧" },
    { key: "practice", label: "Practice", icon: "💻" },
    { key: "project", label: "Mini Project", icon: "🚀" },
  ];

  const handleNotesSave = () => {
    savePhaseNote(phase.id, notes);
  };

  const handleCompletePhase = () => {
    completePhase(phase.id);
    addLearningTime(30);
  };

  return (
    <div className="space-y-6">
      {/* Phase Header */}
      <div
        className="relative overflow-hidden rounded-2xl mb-8"
        style={{
          background: `linear-gradient(135deg, ${phase.color}22, ${phase.color}08)`,
          borderColor: `${phase.color}44`,
          borderWidth: 1,
        }}
      >
        <div className="p-8">
          <button
            onClick={onBack}
            className="text-gray-500 hover:text-gray-900 text-sm mb-4 flex items-center gap-2 transition-colors"
          >
            ← Back to Roadmap
          </button>
          <div className="flex items-center gap-4 mb-3">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl"
              style={{ background: `${phase.color}33` }}
            >
              {phase.icon}
            </div>
            <div>
              <div className="flex items-center gap-3">
                <span className="text-gray-500 text-xs font-semibold uppercase tracking-wider">
                  Phase {phase.id} of 8
                </span>
                {pp.phaseDone && (
                  <span className="bg-green-100 text-green-600 text-xs px-2 py-0.5 rounded-full">
                    ✅ Completed
                  </span>
                )}
              </div>
              <h1 className="text-2xl font-bold text-gray-900">{phase.title}</h1>
            </div>
          </div>
          <p className="text-gray-500 text-sm max-w-3xl">{phase.description}</p>

          {/* Progress */}
          <div className="mt-4 flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="text-gray-500 text-xs">Exercises:</span>
              <span className="text-gray-900 text-sm font-semibold">
                {pp.exercises}/{pp.totalExercises}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-500 text-xs">Project:</span>
              <span className="text-gray-900 text-sm font-semibold">
                {pp.projectDone ? "✅ Done" : "⬜ Not started"}
              </span>
            </div>
            <div className="flex-1 max-w-[200px] bg-gray-100 rounded-full h-2">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${pp.phaseDone ? 100 : ((pp.exercises + (pp.projectDone ? 1 : 0)) / (pp.totalExercises + 1)) * 100}%`,
                  background: phase.color,
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-white rounded-xl p-1 mb-6 border border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2 ${
              activeTab === tab.key
                ? "bg-gray-100 text-gray-900 shadow-lg"
                : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
            }`}
          >
            <span>{tab.icon}</span>
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="space-y-6">
        {/* LEARN TAB */}
        {activeTab === "learn" && (
          <div className="space-y-6">
            {/* Why Important */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                ⚡ Why This Matters
              </h2>
              <p className="text-gray-700 text-sm leading-relaxed">{phase.whyImportant}</p>
            </div>

            {/* Real World Applications */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                🌍 Real-World Applications
              </h2>
              <div className="grid gap-2 sm:grid-cols-2">
                {phase.realWorldApps.map((app, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-200">
                    <span className="text-green-600 text-sm">✓</span>
                    <span className="text-gray-700 text-sm">{app}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Core Concepts */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                📚 Core Concepts
              </h2>
              <div className="space-y-4">
                {phase.learningContent.map((content, i) => (
                  <div
                    key={i}
                    className="flex gap-4 p-4 bg-gray-50 rounded-xl border border-gray-200"
                  >
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold shrink-0"
                      style={{ background: `${phase.color}33`, color: phase.color }}
                    >
                      {i + 1}
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed">{content}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Notes */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                📝 Your Notes
              </h2>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Write your notes here... Key concepts, questions, ideas..."
                className="w-full bg-gray-100 text-gray-700 text-sm p-4 rounded-xl outline-none resize-none min-h-[120px] border border-gray-200 focus:border-blue-500 transition-colors placeholder-gray-600"
              />
              <div className="flex justify-end mt-2">
                <button
                  onClick={handleNotesSave}
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-gray-900 text-sm rounded-lg transition-colors"
                >
                  💾 Save Notes
                </button>
              </div>
            </div>
          </div>
        )}

        {/* RESOURCES TAB */}
        {activeTab === "resources" && (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                🔧 Tools & Resources
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {phase.tools.map((tool, i) => (
                  <a
                    key={i}
                    href={tool.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-start gap-4 p-4 bg-gray-50 rounded-xl border border-gray-200 hover:border-gray-400 transition-all hover:bg-gray-100"
                  >
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl bg-gray-100 group-hover:scale-110 transition-transform">
                      {tool.icon}
                    </div>
                    <div>
                      <h3 className="text-gray-900 font-semibold text-sm group-hover:text-blue-300 transition-colors">
                        {tool.name}
                        <span className="text-xs text-gray-500 ml-2">↗</span>
                      </h3>
                      <p className="text-gray-500 text-xs mt-1">{tool.description}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">📎 Learning Resources</h2>
              <div className="space-y-2">
                {phase.resources.map((resource, i) => {
                  const typeColors: Record<string, string> = {
                    tutorial: "text-blue-400 bg-blue-500/10",
                    docs: "text-green-600 bg-green-500/10",
                    blog: "text-purple-400 bg-purple-500/10",
                    github: "text-gray-700 bg-gray-100",
                    video: "text-red-400 bg-red-500/10",
                  };
                  return (
                    <a
                      key={i}
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-200 hover:border-gray-400 transition-all group"
                    >
                      <div className="flex items-center gap-3">
                        <span className={`text-xs px-2 py-0.5 rounded-full ${typeColors[resource.type] || "text-gray-500 bg-gray-200"}`}>
                          {resource.type}
                        </span>
                        <div>
                          <span className="text-gray-900 text-sm group-hover:text-blue-300 transition-colors">{resource.title}</span>
                          <p className="text-gray-500 text-xs mt-0.5">{resource.description}</p>
                        </div>
                      </div>
                      <span className="text-gray-500 text-xs group-hover:text-blue-400">↗</span>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* PRACTICE TAB */}
        {activeTab === "practice" && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-gray-200 p-4">
              <p className="text-gray-500 text-sm flex items-center gap-2">
                <span>💡</span>
                {phase.practiceDescription}
              </p>
            </div>

            {/* Prompt Playground for prompt/api types */}
            {(phase.practiceType === "prompt" || phase.practiceType === "nocode") && (
              <PromptPlayground phaseId={phase.id} />
            )}

            {/* API Testing Playground */}
            {phase.practiceType === "api" && (
              <APITestingPlayground phaseId={phase.id} />
            )}

            {/* Chatbot Simulator */}
            {phase.practiceType === "chatbot" && (
              <ChatbotSimulator phaseId={phase.id} />
            )}

            {/* Agent Workflow Builder */}
            {phase.practiceType === "agent" && (
              <AgentWorkflowBuilder phaseId={phase.id} />
            )}

            {/* Exercises */}
            {phase.exercises.map((exercise) => (
              <CodeEditor
                key={exercise.id}
                exerciseId={exercise.id}
                initialCode={exercise.starterCode}
                title={exercise.title}
                description={exercise.description}
                hints={exercise.hints}
                onComplete={() => {
                  completeExercise(exercise.id);
                  addLearningTime(15);
                }}
                isCompleted={progress.completedExercises.includes(exercise.id)}
              />
            ))}
          </div>
        )}

        {/* PROJECT TAB */}
        {activeTab === "project" && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  🚀 {phase.miniProject.title}
                </h2>
                {pp.projectDone && (
                  <span className="bg-green-100 text-green-600 text-xs px-3 py-1 rounded-full">
                    ✅ Completed
                  </span>
                )}
              </div>
              <p className="text-gray-500 text-sm mb-4">{phase.miniProject.description}</p>

              {/* Steps */}
              <div className="mb-6">
                <h3 className="text-gray-700 text-sm font-semibold mb-3">📋 Steps to Complete:</h3>
                <div className="space-y-2">
                  {phase.miniProject.steps.map((step, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200"
                    >
                      <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs text-gray-500 font-bold">
                        {i + 1}
                      </div>
                      <span className="text-gray-700 text-sm">{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {phase.miniProject.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-gray-100 text-gray-500 text-xs rounded-full border border-gray-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Project Code Editor */}
            <CodeEditor
              exerciseId={phase.miniProject.id}
              initialCode={phase.miniProject.starterCode}
              title={`Project: ${phase.miniProject.title}`}
              description="Use the editor to build your project. Modify the starter code, run it to test, and mark complete when done."
              hints={[
                "Start by understanding the starter code",
                "Follow the steps listed above in order",
                "Test your code frequently as you build",
              ]}
              onComplete={() => {
                completeProject(phase.miniProject.id);
                addLearningTime(30);
              }}
              isCompleted={pp.projectDone}
            />
          </div>
        )}
      </div>

      {/* Complete Phase Button */}
      {!pp.phaseDone && pp.exercises > 0 && (
        <div className="mt-8 text-center">
          <button
            onClick={handleCompletePhase}
            className="px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl transition-all shadow-sm hover:shadow-md"
          >
            ✅ Mark Phase {phase.id} as Complete
          </button>
          <p className="text-gray-500 text-xs mt-2">
            Complete exercises and projects first for the best learning experience
          </p>
        </div>
      )}
    </div>
  );
};

export default PhaseWorkspace;
