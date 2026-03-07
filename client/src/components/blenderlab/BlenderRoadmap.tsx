import React from "react";
import { blenderPhases } from "../../data/blenderLabData";
import { useBlenderLabContext } from "../../context/BlenderLabContext";

interface BlenderRoadmapProps {
  onPhaseClick: (phaseId: number) => void;
}

const levelColors: Record<string, { bg: string; text: string; border: string; badge: string }> = {
  beginner: { bg: "bg-green-50", text: "text-green-600", border: "border-green-300", badge: "bg-green-100 text-green-700" },
  intermediate: { bg: "bg-blue-50", text: "text-blue-600", border: "border-blue-300", badge: "bg-blue-100 text-blue-700" },
  advanced: { bg: "bg-red-50", text: "text-red-600", border: "border-red-300", badge: "bg-red-100 text-red-700" },
};

const BlenderRoadmap: React.FC<BlenderRoadmapProps> = ({ onPhaseClick }) => {
  const { progress, getPhaseProgress } = useBlenderLabContext();

  const beginnerPhases = blenderPhases.filter((p) => p.level === "beginner");
  const intermediatePhases = blenderPhases.filter((p) => p.level === "intermediate");
  const advancedPhases = blenderPhases.filter((p) => p.level === "advanced");

  const renderPhaseCard = (phase: typeof blenderPhases[0]) => {
    const pp = getPhaseProgress(phase.id);
    const isActive = progress.currentPhase === phase.id;
    const isComplete = pp.phaseDone;
    const lc = levelColors[phase.level];

    return (
      <button
        key={phase.id}
        onClick={() => onPhaseClick(phase.id)}
        className={`group relative p-5 rounded-2xl border-2 transition-all duration-300 text-left hover:scale-[1.02] hover:shadow-xl ${
          isComplete
            ? "bg-green-50 border-green-500 shadow-md"
            : isActive
            ? `${lc.bg} border-orange-500 shadow-md`
            : "bg-white border-gray-200 hover:border-gray-300"
        }`}
      >
        <div className="flex items-center gap-3 mb-3">
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg font-bold ${
              isComplete
                ? "bg-green-500 text-white"
                : isActive
                ? "bg-orange-500 text-white"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            {isComplete ? "✓" : phase.id}
          </div>
          <span className="text-xl">{phase.icon}</span>
          <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold uppercase ${lc.badge}`}>
            {phase.level}
          </span>
        </div>
        <h3 className={`font-semibold text-sm mb-1 ${isComplete ? "text-green-600" : "text-gray-900"}`}>
          {phase.title}
        </h3>
        <p className="text-gray-500 text-xs line-clamp-2 mb-3">{phase.subtitle}</p>
        {/* Progress bar */}
        <div className="bg-gray-200 rounded-full h-1.5">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              isComplete ? "bg-green-500" : "bg-orange-500"
            }`}
            style={{
              width: `${
                isComplete
                  ? 100
                  : ((pp.exercises + (pp.projectDone ? 1 : 0)) / (pp.totalExercises + 1)) * 100
              }%`,
            }}
          />
        </div>
      </button>
    );
  };

  const renderSection = (title: string, emoji: string, phases: typeof blenderPhases, desc: string) => (
    <div className="mb-10">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-2xl">{emoji}</span>
        <div>
          <h3 className="text-lg font-bold text-gray-900">{title}</h3>
          <p className="text-gray-500 text-xs">{desc}</p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {phases.map(renderPhaseCard)}
      </div>
    </div>
  );

  return (
    <div className="py-4">
      <div className="text-center mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">🗺️ Blender Learning Roadmap</h2>
        <p className="text-gray-500 text-sm">
          Click any phase to start learning. Complete phases turn green.
        </p>
      </div>

      {renderSection(
        "Beginner",
        "🌱",
        beginnerPhases,
        "Start here — learn the basics of Blender's interface, objects, and modeling"
      )}
      {renderSection(
        "Intermediate",
        "⚡",
        intermediatePhases,
        "Level up with advanced modeling, materials, lighting, and rendering"
      )}
      {renderSection(
        "Advanced",
        "🔥",
        advancedPhases,
        "Master animation, physics, geometry nodes, sculpting, and VFX"
      )}
    </div>
  );
};

export default BlenderRoadmap;
