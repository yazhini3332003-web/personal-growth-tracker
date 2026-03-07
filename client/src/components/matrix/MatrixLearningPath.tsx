import React, { useState } from "react";

interface PathLevel {
  id: string;
  level: string;
  icon: string;
  gradient: string;
  duration: string;
  tagline: string;
  overview: string;
  skills: string[];
  milestones: { title: string; done: boolean }[];
  exercises: { title: string; description: string; difficulty: string }[];
  resources: { type: string; title: string; description: string }[];
}

const pathLevels: PathLevel[] = [
  {
    id: "beginner",
    level: "Beginner",
    icon: "🌱",
    gradient: "from-emerald-500 to-teal-600",
    duration: "Week 1-2",
    tagline: "Foundation — Learn the basics of structured thinking",
    overview: "Start here if you've never used a matrix before. You'll learn what structured thinking is, practice with simple 2×2 matrices, and build the habit of organizing your thoughts before deciding.",
    skills: [
      "Understand what a matrix is and why it works",
      "Create a basic 2×2 matrix on paper",
      "Use the Eisenhower Matrix for daily tasks",
      "Distinguish between urgent and important tasks",
      "Make a simple pros-and-cons comparison grid"
    ],
    milestones: [
      { title: "Read the Introduction section completely", done: false },
      { title: "Create your first Eisenhower Matrix with 10 tasks", done: false },
      { title: "Use a matrix to make one real decision this week", done: false },
      { title: "Explain matrix thinking to a friend in 2 minutes", done: false },
      { title: "Identify 3 decisions you made without structure (and how a matrix would have helped)", done: false },
    ],
    exercises: [
      { title: "Task Sort Challenge", description: "List 15 tasks from your life. Categorize each into one of the 4 Eisenhower quadrants. Time yourself — try to do it in under 5 minutes.", difficulty: "Easy" },
      { title: "Phone Comparison", description: "Pick 3 phones you're interested in. Create a matrix with 4 criteria (price, camera, battery, storage). Score each 1-10. Which wins?", difficulty: "Easy" },
      { title: "Weekend Optimizer", description: "List 8 things you could do this weekend. Rate each on 'Fun Factor' and 'Productivity'. Plot on a 2x2 grid. Pick the top-right quadrant activities.", difficulty: "Easy" },
    ],
    resources: [
      { type: "📖", title: "Read: Matrix Introduction", description: "Complete the Introduction tab in this section" },
      { type: "📊", title: "Study: Eisenhower Matrix", description: "Deep dive into the Eisenhower model in Matrix Models" },
      { type: "🔧", title: "Practice: Matrix Builder", description: "Create your first matrix using a template" },
    ]
  },
  {
    id: "intermediate",
    level: "Intermediate",
    icon: "🔥",
    gradient: "from-amber-500 to-orange-600",
    duration: "Week 3-4",
    tagline: "Application — Use matrices for real decisions",
    overview: "Now that you know the basics, it's time to apply matrix thinking to real decisions. You'll learn weighted scoring, practice with Decision Matrices, and start using Risk Matrices for bigger life choices.",
    skills: [
      "Create weighted Decision Matrices with 5+ criteria",
      "Assign and justify weights based on personal values",
      "Use Risk Matrices for financial and career decisions",
      "Combine multiple matrix types for complex decisions",
      "Identify bias in your scoring and correct for it"
    ],
    milestones: [
      { title: "Build a weighted Decision Matrix for a real purchase", done: false },
      { title: "Create a Risk Matrix for your top 5 financial risks", done: false },
      { title: "Make a career decision using a matrix (job, skill, or project choice)", done: false },
      { title: "Review a past decision — rebuild it as a matrix. Would you decide differently?", done: false },
      { title: "Create a matrix with 5+ options and 5+ weighted criteria", done: false },
    ],
    exercises: [
      { title: "Career Path Matrix", description: "Map 4 career options against 6 criteria (salary, growth, passion, stability, learning, impact). Weight each criterion. Score honestly. What does the data say?", difficulty: "Medium" },
      { title: "Financial Risk Audit", description: "List 8 risks in your financial life. Rate each on likelihood (1-5) and impact (1-5). Plot on a risk matrix. What falls in the Critical zone?", difficulty: "Medium" },
      { title: "Bias Check Exercise", description: "Build a matrix for a decision you already made. Score it honestly. Does the matrix agree with your choice? If not, were you biased?", difficulty: "Medium" },
    ],
    resources: [
      { type: "📊", title: "Study: Decision Matrix", description: "Master weighted scoring in Matrix Models" },
      { type: "🛡️", title: "Study: Risk Matrix", description: "Learn risk assessment frameworks" },
      { type: "🌍", title: "Apply: Real-Life Section", description: "Follow step-by-step guides for career and finance matrices" },
    ]
  },
  {
    id: "advanced",
    level: "Advanced",
    icon: "⭐",
    gradient: "from-violet-500 to-purple-600",
    duration: "Week 5+",
    tagline: "Mastery — Think in matrices naturally",
    overview: "At this level, matrix thinking becomes second nature. You'll learn to combine matrix types, teach others, create custom frameworks, and apply structured thinking automatically to any complex situation.",
    skills: [
      "Design custom matrix frameworks for unique problems",
      "Combine 2-3 matrix types for multi-layered analysis",
      "Use matrices for team/group decision-making",
      "Build scenario matrices (best/worst/likely case)",
      "Teach matrix thinking to others effectively"
    ],
    milestones: [
      { title: "Create a custom matrix framework for a unique problem", done: false },
      { title: "Use matrices to help someone else make a decision", done: false },
      { title: "Build a combined Decision + Risk Matrix for a major life choice", done: false },
      { title: "Create a personal Learning Matrix mapping all your skills", done: false },
      { title: "Design a yearly review matrix evaluating your goals and progress", done: false },
    ],
    exercises: [
      { title: "Life Audit Matrix", description: "Create a comprehensive matrix covering all life areas (career, health, relationships, finances, learning, fun). Rate satisfaction (1-10) and importance (1-5). Identify the biggest gaps.", difficulty: "Hard" },
      { title: "Scenario Planning", description: "For a major upcoming decision, build 3 matrices: Best Case, Worst Case, and Most Likely Case. Compare how your top choice changes across scenarios.", difficulty: "Hard" },
      { title: "Teach & Mentor", description: "Explain matrix thinking to someone who's never heard of it. Walk them through building their first Eisenhower Matrix for their tasks. Document what they learned.", difficulty: "Hard" },
    ],
    resources: [
      { type: "📚", title: "Study: All Matrix Models", description: "Master all 4 frameworks inside out" },
      { type: "🔧", title: "Create: Custom Matrices", description: "Use the Builder for complex, original frameworks" },
      { type: "📖", title: "Review: Case Studies", description: "Study real-world examples to deepen understanding" },
    ]
  }
];

const MatrixLearningPath: React.FC = () => {
  const [activeLevel, setActiveLevel] = useState<string>("beginner");
  const [completedMilestones, setCompletedMilestones] = useState<Record<string, boolean[]>>({
    beginner: [false, false, false, false, false],
    intermediate: [false, false, false, false, false],
    advanced: [false, false, false, false, false],
  });

  const currentLevel = pathLevels.find((l) => l.id === activeLevel)!;

  const toggleMilestone = (levelId: string, idx: number) => {
    setCompletedMilestones((prev) => {
      const updated = { ...prev };
      updated[levelId] = [...updated[levelId]];
      updated[levelId][idx] = !updated[levelId][idx];
      return updated;
    });
  };

  const getLevelProgress = (levelId: string): number => {
    const completed = completedMilestones[levelId]?.filter(Boolean).length || 0;
    const total = completedMilestones[levelId]?.length || 1;
    return Math.round((completed / total) * 100);
  };

  const overallProgress = Math.round(
    pathLevels.reduce((sum, l) => sum + getLevelProgress(l.id), 0) / pathLevels.length
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-pink-500 via-rose-500 to-red-500 rounded-2xl p-6 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-44 h-44 bg-white/5 rounded-full -translate-y-10 translate-x-10" />
        <div className="relative">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">🗺️</span>
            <div>
              <h2 className="font-bold text-xl">Learning Path</h2>
              <p className="text-white/70 text-sm mt-1">Beginner → Intermediate → Advanced structured thinking</p>
            </div>
          </div>
          <p className="text-white/80 text-sm leading-relaxed mt-3 max-w-xl">
            Follow this structured path to go from "never heard of matrices" to "thinking in matrices naturally." 
            Each level has skills, milestones, exercises, and resources to guide your growth.
          </p>
          <div className="mt-4 flex items-center gap-3">
            <div className="flex-1 bg-white/20 rounded-full h-2.5">
              <div className="bg-white rounded-full h-full transition-all duration-500" style={{ width: `${overallProgress}%` }} />
            </div>
            <span className="text-white text-xs font-bold">{overallProgress}%</span>
          </div>
        </div>
      </div>

      {/* Level Selector */}
      <div className="grid grid-cols-3 gap-3">
        {pathLevels.map((level) => {
          const progress = getLevelProgress(level.id);
          return (
            <button
              key={level.id}
              onClick={() => setActiveLevel(level.id)}
              className={`p-4 rounded-xl border transition-all text-left ${
                activeLevel === level.id
                  ? "bg-white border-indigo-200 shadow-md ring-2 ring-indigo-100"
                  : "bg-white border-gray-100 hover:border-gray-200 hover:shadow-sm"
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="text-xl">{level.icon}</span>
                <div>
                  <p className="text-sm font-bold text-gray-800">{level.level}</p>
                  <p className="text-[10px] text-gray-400">{level.duration}</p>
                </div>
              </div>
              <div className="mt-3 flex items-center gap-2">
                <div className="flex-1 bg-gray-100 rounded-full h-1.5">
                  <div className={`h-full rounded-full bg-gradient-to-r ${level.gradient} transition-all`} style={{ width: `${progress}%` }} />
                </div>
                <span className="text-[10px] text-gray-400 font-medium">{progress}%</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Level Detail */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className={`bg-gradient-to-r ${currentLevel.gradient} p-5 text-white`}>
          <div className="flex items-center gap-3">
            <span className="text-3xl">{currentLevel.icon}</span>
            <div>
              <h3 className="font-bold text-lg">{currentLevel.level} Level</h3>
              <p className="text-white/70 text-xs">{currentLevel.tagline}</p>
            </div>
          </div>
          <p className="text-white/85 text-sm mt-3 leading-relaxed">{currentLevel.overview}</p>
        </div>

        {/* Skills */}
        <div className="p-5 border-b border-gray-100">
          <p className="text-xs font-bold text-gray-700 mb-3">🎯 Skills You'll Develop</p>
          <div className="space-y-2">
            {currentLevel.skills.map((skill, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <span className="text-indigo-400 text-xs mt-0.5">✓</span>
                <p className="text-xs text-gray-600 leading-relaxed">{skill}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Milestones (checkable) */}
        <div className="p-5 border-b border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-bold text-gray-700">🏁 Milestones</p>
            <span className="text-[10px] text-gray-400">
              {completedMilestones[currentLevel.id]?.filter(Boolean).length || 0}/{currentLevel.milestones.length} completed
            </span>
          </div>
          <div className="space-y-2">
            {currentLevel.milestones.map((milestone, idx) => {
              const isCompleted = completedMilestones[currentLevel.id]?.[idx] || false;
              return (
                <button
                  key={idx}
                  onClick={() => toggleMilestone(currentLevel.id, idx)}
                  className={`w-full flex items-start gap-3 p-3 rounded-xl text-left transition-all ${
                    isCompleted ? "bg-emerald-50 border border-emerald-100" : "bg-gray-50 border border-gray-100 hover:bg-gray-100"
                  }`}
                >
                  <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 text-[10px] transition-all ${
                    isCompleted ? "bg-emerald-500 border-emerald-500 text-white" : "border-gray-300"
                  }`}>
                    {isCompleted && "✓"}
                  </span>
                  <p className={`text-xs leading-relaxed ${isCompleted ? "text-emerald-700 line-through" : "text-gray-600"}`}>
                    {milestone.title}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Exercises */}
        <div className="p-5 border-b border-gray-100">
          <p className="text-xs font-bold text-gray-700 mb-3">💪 Practice Exercises</p>
          <div className="space-y-3">
            {currentLevel.exercises.map((ex, idx) => (
              <div key={idx} className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-xs font-bold text-gray-800">{ex.title}</p>
                  <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                    ex.difficulty === "Easy" ? "bg-emerald-100 text-emerald-700" :
                    ex.difficulty === "Medium" ? "bg-amber-100 text-amber-700" :
                    "bg-red-100 text-red-700"
                  }`}>{ex.difficulty}</span>
                </div>
                <p className="text-[11px] text-gray-500 leading-relaxed mt-1">{ex.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Resources */}
        <div className="p-5">
          <p className="text-xs font-bold text-gray-700 mb-3">📚 Recommended Resources</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {currentLevel.resources.map((res, idx) => (
              <div key={idx} className="p-3 bg-indigo-50 rounded-xl border border-indigo-100">
                <span className="text-lg">{res.type}</span>
                <p className="text-xs font-semibold text-gray-800 mt-1">{res.title}</p>
                <p className="text-[10px] text-gray-500 mt-0.5">{res.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Journey Map */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <h3 className="text-sm font-bold text-gray-800 mb-4">🗺️ Your Journey Map</h3>
        <div className="flex items-center gap-3">
          {pathLevels.map((level, idx) => {
            const progress = getLevelProgress(level.id);
            return (
              <React.Fragment key={level.id}>
                <div className="flex flex-col items-center text-center flex-1">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl ${
                    progress === 100 ? "bg-emerald-100" : progress > 0 ? "bg-amber-100" : "bg-gray-100"
                  }`}>
                    {progress === 100 ? "✅" : level.icon}
                  </div>
                  <p className="text-[10px] font-bold text-gray-700 mt-2">{level.level}</p>
                  <p className="text-[9px] text-gray-400">{level.duration}</p>
                  <p className={`text-[10px] font-bold mt-1 ${
                    progress === 100 ? "text-emerald-600" : progress > 0 ? "text-amber-600" : "text-gray-400"
                  }`}>{progress}%</p>
                </div>
                {idx < pathLevels.length - 1 && (
                  <div className="flex-shrink-0 w-12 h-0.5 bg-gray-200 rounded-full mt-[-20px]">
                    <div className={`h-full rounded-full bg-gradient-to-r from-emerald-400 to-teal-400 transition-all`} style={{ width: `${progress}%` }} />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MatrixLearningPath;
