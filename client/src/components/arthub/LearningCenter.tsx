import React, { useState } from "react";
import { artTutorials } from "../../data/artHubData";
import { useArtHubContext } from "../../context/ArtHubContext";

const LearningCenter: React.FC = () => {
  const [selectedTutorial, setSelectedTutorial] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>("all");
  const { isTutorialCompleted, completeTutorial } = useArtHubContext();

  const filtered = filter === "all"
    ? artTutorials
    : artTutorials.filter((t) => t.difficulty === filter);

  const tutorial = artTutorials.find((t) => t.id === selectedTutorial);

  if (tutorial) {
    const completed = isTutorialCompleted(tutorial.id);
    return (
      <div className="space-y-6">
        <button
          onClick={() => setSelectedTutorial(null)}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900"
        >
          ← Back to Learning Center
        </button>

        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className={`h-32 bg-gradient-to-r ${tutorial.color} flex items-center justify-center`}>
            <span className="text-5xl">{tutorial.icon}</span>
          </div>
          <div className="p-6">
            <div className="flex items-center gap-2 mb-2">
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                tutorial.difficulty === "beginner" ? "bg-green-100 text-green-700" :
                tutorial.difficulty === "intermediate" ? "bg-yellow-100 text-yellow-700" :
                "bg-red-100 text-red-700"
              }`}>
                {tutorial.difficulty}
              </span>
              <span className="text-xs text-gray-400">⏱️ {tutorial.duration}</span>
              {completed && <span className="text-xs text-emerald-600 font-medium">✓ Completed</span>}
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">{tutorial.title}</h2>
            <p className="text-sm text-gray-600 leading-relaxed">{tutorial.description}</p>
          </div>
        </div>

        {/* Lessons */}
        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <h3 className="font-bold text-gray-900 mb-4">Lessons ({tutorial.lessons.length})</h3>
          <div className="space-y-3">
            {tutorial.lessons.map((lesson, i) => (
              <div
                key={i}
                className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors group"
              >
                <div className="w-8 h-8 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-sm font-bold text-gray-400 group-hover:text-purple-600 group-hover:border-purple-200 transition-colors">
                  {i + 1}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{lesson}</p>
                </div>
                <span className="text-gray-400 group-hover:text-purple-600 transition-colors">→</span>
              </div>
            ))}
          </div>
          {!completed && (
            <button
              onClick={() => completeTutorial(tutorial.id)}
              className="mt-6 w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-medium text-sm hover:shadow-lg transition-all"
            >
              Mark as Completed ✓
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Learning Center</h2>
          <p className="text-sm text-gray-500 mt-1">Develop your skills with guided tutorials and exercises</p>
        </div>
      </div>

      {/* Difficulty Filter */}
      <div className="flex gap-2">
        {["all", "beginner", "intermediate", "advanced"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-xl text-sm font-medium capitalize transition-all ${
              filter === f
                ? "bg-gray-900 text-white"
                : "bg-white text-gray-600 border border-gray-200 hover:shadow-sm"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Tutorials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((tut) => {
          const completed = isTutorialCompleted(tut.id);
          return (
            <div
              key={tut.id}
              onClick={() => setSelectedTutorial(tut.id)}
              className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group"
            >
              <div className={`h-32 bg-gradient-to-br ${tut.color} flex items-center justify-center relative`}>
                <span className="text-4xl group-hover:scale-125 transition-transform duration-500">{tut.icon}</span>
                {completed && (
                  <div className="absolute top-3 right-3 px-2 py-0.5 bg-white/90 rounded-full text-emerald-600 text-xs font-medium">
                    ✓ Done
                  </div>
                )}
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                    tut.difficulty === "beginner" ? "bg-green-100 text-green-700" :
                    tut.difficulty === "intermediate" ? "bg-yellow-100 text-yellow-700" :
                    "bg-red-100 text-red-700"
                  }`}>
                    {tut.difficulty}
                  </span>
                  <span className="text-xs text-gray-400">{tut.duration}</span>
                </div>
                <h3 className="font-bold text-gray-900 mb-1.5 group-hover:text-purple-700 transition-colors">{tut.title}</h3>
                <p className="text-xs text-gray-500 line-clamp-2">{tut.description}</p>
                <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
                  <span className="text-xs text-gray-400">{tut.lessons.length} lessons</span>
                  <span className="text-xs text-purple-600 font-medium group-hover:translate-x-1 transition-transform">Start →</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Practice Tips */}
      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl border border-purple-100 p-6">
        <h3 className="font-bold text-gray-900 mb-3">💡 Practice Tips</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { tip: "Practice daily, even for 15 minutes", icon: "⏰" },
            { tip: "Don't compare — focus on your journey", icon: "🎯" },
            { tip: "Embrace mistakes as part of learning", icon: "🌱" },
          ].map((t, i) => (
            <div key={i} className="flex items-center gap-3 bg-white/70 rounded-lg p-3">
              <span className="text-xl">{t.icon}</span>
              <p className="text-sm text-gray-700">{t.tip}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LearningCenter;
