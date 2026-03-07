import React from "react";
import { labPhases } from "../../data/learningLabData";
import { useLabContext } from "../../context/LearningLabContext";

interface LabRoadmapProps {
  onPhaseClick: (phaseId: number) => void;
}

const LabRoadmap: React.FC<LabRoadmapProps> = ({ onPhaseClick }) => {
  const { progress, getPhaseProgress } = useLabContext();

  return (
    <div className="py-8">
      <div className="text-center mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">🗺️ Your Learning Journey</h2>
        <p className="text-gray-500 text-sm">Click any phase to start learning. Completed phases turn green.</p>
      </div>

      {/* Desktop Roadmap */}
      <div className="hidden lg:block">
        <div className="relative w-full">
          {/* Connection Lines */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ zIndex: 0 }}
          >
            {labPhases.slice(0, -1).map((phase, i) => {
              const row1 = i < 4;
              const row2 = !row1;
              const x1 = row1 ? (i * 25 + 12.5) : ((7 - i) * 25 + 12.5);
              const x2 = row1
                ? i === 3
                  ? (3 * 25 + 12.5)
                  : ((i + 1) * 25 + 12.5)
                : i === 7
                  ? x1
                  : ((7 - (i + 1)) * 25 + 12.5);
              const y1 = row1 ? 80 : 260;
              const y2 = i === 3 ? 260 : row1 ? 80 : 260;

              const isComplete =
                progress.completedPhases.includes(phase.id) &&
                progress.completedPhases.includes(phase.id + 1);

              return (
                <line
                  key={i}
                  x1={`${x1}%`}
                  y1={y1}
                  x2={`${x2}%`}
                  y2={y2}
                  stroke={isComplete ? "#10b981" : "#4b5563"}
                  strokeWidth="3"
                  strokeDasharray={isComplete ? "none" : "8 4"}
                />
              );
            })}
          </svg>

          {/* Row 1: Phases 1-4 */}
          <div className="grid grid-cols-4 gap-6 mb-16 relative" style={{ zIndex: 1 }}>
            {labPhases.slice(0, 4).map((phase) => {
              const pp = getPhaseProgress(phase.id);
              const isActive = progress.currentPhase === phase.id;
              const isComplete = pp.phaseDone;

              return (
                <button
                  key={phase.id}
                  onClick={() => onPhaseClick(phase.id)}
                  className={`group relative p-5 rounded-2xl border-2 transition-all duration-300 text-left hover:scale-105 hover:shadow-2xl ${
                    isComplete
                      ? "bg-green-50 border-green-500 shadow-md"
                      : isActive
                      ? "bg-gray-50 border-blue-500 shadow-md animate-pulse-slow"
                      : "bg-gray-100 border-gray-300 hover:border-gray-400"
                  }`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg font-bold ${
                        isComplete
                          ? "bg-green-500 text-white"
                          : isActive
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      {isComplete ? "✓" : phase.id}
                    </div>
                    <span className="text-xl">{phase.icon}</span>
                  </div>
                  <h3 className={`font-semibold text-sm mb-1 ${isComplete ? "text-green-600" : "text-gray-900"}`}>
                    {phase.title}
                  </h3>
                  <p className="text-gray-500 text-xs line-clamp-2">{phase.subtitle}</p>
                  {/* Progress bar */}
                  <div className="mt-3 bg-gray-200 rounded-full h-1.5">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        isComplete ? "bg-green-500" : "bg-blue-500"
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
            })}
          </div>

          {/* Row 2: Phases 5-8 (reversed) */}
          <div className="grid grid-cols-4 gap-6 relative" style={{ zIndex: 1 }}>
            {labPhases
              .slice(4, 8)
              .reverse()
              .map((phase) => {
                const pp = getPhaseProgress(phase.id);
                const isActive = progress.currentPhase === phase.id;
                const isComplete = pp.phaseDone;

                return (
                  <button
                    key={phase.id}
                    onClick={() => onPhaseClick(phase.id)}
                    className={`group relative p-5 rounded-2xl border-2 transition-all duration-300 text-left hover:scale-105 hover:shadow-2xl ${
                      isComplete
                        ? "bg-green-50 border-green-500 shadow-md"
                        : isActive
                        ? "bg-gray-50 border-blue-500 shadow-md"
                        : "bg-gray-100 border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg font-bold ${
                          isComplete
                            ? "bg-green-500 text-white"
                            : isActive
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200 text-gray-700"
                        }`}
                      >
                        {isComplete ? "✓" : phase.id}
                      </div>
                      <span className="text-xl">{phase.icon}</span>
                    </div>
                    <h3 className={`font-semibold text-sm mb-1 ${isComplete ? "text-green-600" : "text-gray-900"}`}>
                      {phase.title}
                    </h3>
                    <p className="text-gray-500 text-xs line-clamp-2">{phase.subtitle}</p>
                    <div className="mt-3 bg-gray-200 rounded-full h-1.5">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          isComplete ? "bg-green-500" : "bg-blue-500"
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
              })}
          </div>
        </div>
      </div>

      {/* Mobile Roadmap */}
      <div className="lg:hidden space-y-3">
        {labPhases.map((phase, i) => {
          const pp = getPhaseProgress(phase.id);
          const isActive = progress.currentPhase === phase.id;
          const isComplete = pp.phaseDone;

          return (
            <div key={phase.id} className="flex items-start gap-4">
              {/* Timeline */}
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${
                    isComplete
                      ? "bg-green-500 text-white"
                      : isActive
                      ? "bg-blue-500 text-white ring-4 ring-blue-200"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {isComplete ? "✓" : phase.id}
                </div>
                {i < labPhases.length - 1 && (
                  <div className={`w-0.5 h-12 ${isComplete ? "bg-green-500" : "bg-gray-300"}`} />
                )}
              </div>

              {/* Card */}
              <button
                onClick={() => onPhaseClick(phase.id)}
                className={`flex-1 p-4 rounded-xl border text-left transition-all ${
                  isComplete
                    ? "bg-green-50 border-green-300"
                    : isActive
                    ? "bg-gray-50 border-blue-500"
                    : "bg-gray-50 border-gray-200 hover:border-gray-400"
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span>{phase.icon}</span>
                  <h3 className="font-semibold text-sm text-gray-900">{phase.title}</h3>
                </div>
                <p className="text-gray-500 text-xs">{phase.subtitle}</p>
                <div className="mt-2 bg-gray-200 rounded-full h-1">
                  <div
                    className={`h-full rounded-full ${isComplete ? "bg-green-500" : "bg-blue-500"}`}
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
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LabRoadmap;
