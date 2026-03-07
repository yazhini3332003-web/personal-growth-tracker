import React from "react";
import { useLearning } from "../../context/LearningContext";
import { roadmapStages, newsItems, dailyTaskTemplates } from "../../data/learningData";

interface Props {
  onNavigate: (tab: string) => void;
}

const resourceTypeIcons: Record<string, string> = {
  docs: "📄",
  tutorial: "📝",
  course: "🎓",
  github: "💻",
  blog: "📰",
  video: "🎥",
};

const LearningDashboard: React.FC<Props> = ({ onNavigate }) => {
  const { progress, getOverallCompletion, getTodayStats, getWeekStats, toggleDailyTask } = useLearning();
  const overall = getOverallCompletion();
  const today = getTodayStats();
  const week = getWeekStats();
  const currentStage = roadmapStages.find((s) => s.id === progress.currentStage) || roadmapStages[0];
  const nextTopics = currentStage.topics.filter(
    (_, i) => !progress.completedLessons.includes(`${currentStage.id}-t${i}`)
  );
  const completedTopics = currentStage.topics.length - nextTopics.length;
  const todayStr = new Date().toISOString().split("T")[0];
  const totalCompleted = progress.completedLessons.length + progress.completedExercises.length + progress.completedProjects.length;
  const completedStages = Object.values(progress.stageProgress).filter((v) => v >= 100).length;

  return (
    <div className="space-y-8">
      {/* Dashboard Stats Cards */}
      <section>
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Overview</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white border border-gray-200 rounded-lg p-5">
            <div className="flex items-center gap-3 mb-3">
              <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
              <span className="text-sm text-gray-500">Completion</span>
            </div>
            <div className="text-2xl font-semibold text-gray-900">{overall}%</div>
            <div className="mt-3 w-full bg-gray-100 rounded-full h-1.5">
              <div className="h-1.5 rounded-full bg-blue-500 transition-all duration-700" style={{ width: `${overall}%` }} />
            </div>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-5">
            <div className="flex items-center gap-3 mb-3">
              <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <span className="text-sm text-gray-500">Stages Done</span>
            </div>
            <div className="text-2xl font-semibold text-gray-900">{completedStages}<span className="text-sm font-normal text-gray-400 ml-1">/ 8</span></div>
            <p className="text-xs text-gray-400 mt-1">Stages completed</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-5">
            <div className="flex items-center gap-3 mb-3">
              <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" /></svg>
              <span className="text-sm text-gray-500">Total Completed</span>
            </div>
            <div className="text-2xl font-semibold text-gray-900">{totalCompleted}</div>
            <p className="text-xs text-gray-400 mt-1">Lessons, exercises & projects</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-5">
            <div className="flex items-center gap-3 mb-3">
              <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <span className="text-sm text-gray-500">This Week</span>
            </div>
            <div className="text-2xl font-semibold text-gray-900">{week.tasks}</div>
            <p className="text-xs text-gray-400 mt-1">{week.minutes} min · {week.days} active days</p>
          </div>
        </div>
      </section>

      {/* Current Learning Module */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Current Stage</h2>
          <button
            onClick={() => onNavigate("roadmap")}
            className="text-sm text-blue-500 hover:text-blue-600 font-medium"
          >
            View Roadmap →
          </button>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="p-6">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              <div className="flex items-start gap-3">
                <span className="text-2xl">{currentStage.icon}</span>
                <div>
                  <span className="text-xs font-medium text-blue-500 uppercase tracking-wide">Stage {currentStage.id} of 8</span>
                  <h3 className="text-lg font-semibold text-gray-900 mt-0.5">{currentStage.title}</h3>
                  <p className="text-sm text-gray-500 mt-1 max-w-lg">{currentStage.description.slice(0, 120)}...</p>
                </div>
              </div>
              <button
                onClick={() => onNavigate("roadmap")}
                className="px-5 py-2.5 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-medium transition-colors whitespace-nowrap"
              >
                Continue Learning
              </button>
            </div>

            {/* Stage Progress */}
            <div className="mt-5 flex items-center gap-3">
              <div className="flex-1 bg-gray-100 rounded-full h-1.5">
                <div
                  className="h-1.5 rounded-full bg-blue-500 transition-all duration-500"
                  style={{ width: `${progress.stageProgress[currentStage.id] || 0}%` }}
                />
              </div>
              <span className="text-sm text-gray-500">{progress.stageProgress[currentStage.id] || 0}%</span>
            </div>

            {/* Topics List */}
            <div className="mt-5">
              <h4 className="text-sm font-medium text-gray-500 mb-3">
                Topics ({completedTopics}/{currentStage.topics.length})
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {currentStage.topics.map((topic, i) => {
                  const isCompleted = progress.completedLessons.includes(`${currentStage.id}-t${i}`);
                  return (
                    <div
                      key={i}
                      className={`flex items-center gap-2.5 px-3 py-2 rounded-md text-sm ${
                        isCompleted
                          ? "bg-gray-50 text-gray-400"
                          : "text-gray-700"
                      }`}
                    >
                      {isCompleted ? (
                        <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                      ) : (
                        <div className="w-4 h-4 rounded-full border-2 border-gray-300 flex-shrink-0" />
                      )}
                      <span className={isCompleted ? "line-through" : ""}>{topic}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Tools */}
            <div className="mt-4 flex flex-wrap gap-2">
              {currentStage.tools.map((tool) => (
                <span key={tool} className="px-2.5 py-1 bg-gray-100 text-gray-600 rounded-md text-xs font-medium">
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Daily Tasks */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Today's Tasks</h2>
          <button
            onClick={() => onNavigate("daily")}
            className="text-sm text-blue-500 hover:text-blue-600 font-medium"
          >
            View All →
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {dailyTaskTemplates.map((task) => {
            const taskKey = `${todayStr}-${task.id}`;
            const isDone = progress.completedDailyTasks.includes(taskKey);
            return (
              <div
                key={task.id}
                className={`bg-white border rounded-lg p-4 transition-all ${
                  isDone ? "border-gray-200 opacity-60" : "border-gray-200 hover:border-blue-300"
                }`}
              >
                <div className="flex items-start gap-3">
                  <button
                    onClick={() => toggleDailyTask(task.id)}
                    className={`mt-0.5 w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                      isDone
                        ? "bg-blue-500 border-blue-500 text-white"
                        : "border-gray-300 hover:border-blue-400"
                    }`}
                  >
                    {isDone && (
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                    )}
                  </button>
                  <div className="flex-1 min-w-0">
                    <h4 className={`text-sm font-medium ${isDone ? "text-green-700 line-through" : "text-gray-800"}`}>
                      {task.title}
                    </h4>
                    <p className="text-xs text-gray-400 mt-0.5 line-clamp-2">{task.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Recommended Resources */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Recommended Resources</h2>
          <button
            onClick={() => onNavigate("roadmap")}
            className="text-sm text-blue-500 hover:text-blue-600 font-medium"
          >
            See Stage Details →
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentStage.resources.slice(0, 6).map((res, i) => (
            <a
              key={i}
              href={res.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white border border-gray-200 rounded-lg p-5 hover:border-blue-300 transition-all group"
            >
              <div className="flex items-start gap-3">
                <span className="text-lg flex-shrink-0 mt-0.5">
                  {resourceTypeIcons[res.type] || "📄"}
                </span>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                    {res.title}
                  </h4>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2">{res.description}</p>
                  <div className="flex items-center gap-2 mt-3">
                    <span className="px-2 py-0.5 bg-gray-100 text-gray-500 rounded text-xs capitalize font-medium">{res.type}</span>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Latest AI News */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Latest AI News</h2>
          <button
            onClick={() => onNavigate("news")}
            className="text-sm text-blue-500 hover:text-blue-600 font-medium"
          >
            View All →
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newsItems.slice(0, 4).map((item) => (
            <a
              key={item.id}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white border border-gray-200 rounded-lg p-5 hover:border-blue-300 transition-all group"
            >
              <span className="inline-block px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs font-medium mb-3">
                {item.category}
              </span>
              <h4 className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                {item.title}
              </h4>
              <p className="text-xs text-gray-500 mt-2 line-clamp-2">{item.summary}</p>
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                <span className="text-xs text-gray-400">{item.source}</span>
                <span className="text-xs text-blue-500 font-medium group-hover:underline">Read →</span>
              </div>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
};

export default LearningDashboard;
