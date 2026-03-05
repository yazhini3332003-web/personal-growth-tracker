import React from "react";
import { useLearning } from "../../context/LearningContext";
import { roadmapStages } from "../../data/learningData";

const WeeklyReview: React.FC = () => {
  const { progress, getWeekStats } = useLearning();
  const week = getWeekStats();

  // Calculate recently completed items
  const today = new Date();
  const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
  const weekAgoStr = weekAgo.toISOString().split("T")[0];

  // Recent daily tasks (completed this week)
  const recentDailyTasks = progress.completedDailyTasks.filter((t) => {
    const date = t.split("-").slice(0, 3).join("-");
    return date >= weekAgoStr;
  });

  // Find stages with progress
  const activeStages = roadmapStages.filter(
    (s) => (progress.stageProgress[s.id] || 0) > 0
  );

  // Skills improved based on completed items
  const skillsList: string[] = [];
  progress.completedLessons.forEach((id) => {
    const stageId = parseInt(id.split("-")[0]);
    const topicIndex = parseInt(id.split("t")[1]);
    const stage = roadmapStages.find((s) => s.id === stageId);
    if (stage && stage.topics[topicIndex]) {
      skillsList.push(stage.topics[topicIndex]);
    }
  });

  const recentSkills = skillsList.slice(-8);

  // Letter grade based on activity
  const getGrade = () => {
    if (week.tasks >= 20) return { grade: "A+", color: "text-green-500", msg: "Outstanding week!" };
    if (week.tasks >= 15) return { grade: "A", color: "text-green-500", msg: "Excellent progress!" };
    if (week.tasks >= 10) return { grade: "B+", color: "text-blue-500", msg: "Great work!" };
    if (week.tasks >= 5) return { grade: "B", color: "text-blue-500", msg: "Good job, keep it up!" };
    if (week.tasks >= 3) return { grade: "C", color: "text-yellow-500", msg: "Decent effort, try more!" };
    if (week.tasks >= 1) return { grade: "D", color: "text-orange-500", msg: "Just getting started." };
    return { grade: "—", color: "text-gray-400", msg: "No activity this week yet." };
  };

  const { grade, color, msg } = getGrade();

  return (
    <div className="space-y-5">
      <div className="bg-gradient-to-r from-fuchsia-500 to-pink-600 text-white p-5 rounded-xl">
        <h3 className="text-lg font-bold">📈 Weekly Skill Review</h3>
        <p className="text-fuchsia-100 text-sm mt-1">
          Your learning summary for this week
        </p>
      </div>

      {/* Grade Card */}
      <div className="bg-white border-2 rounded-2xl p-8 text-center">
        <div className={`text-7xl font-black ${color}`}>{grade}</div>
        <p className="text-gray-600 mt-2 text-lg font-medium">{msg}</p>
      </div>

      {/* Week Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { icon: "📚", label: "Topics Learned", value: recentSkills.length },
          { icon: "💪", label: "Exercises Done", value: progress.completedExercises.length },
          { icon: "🚀", label: "Projects Finished", value: progress.completedProjects.length },
          { icon: "⏱️", label: "Minutes Spent", value: week.minutes },
        ].map((stat) => (
          <div key={stat.label} className="bg-gray-50 rounded-xl p-4 text-center">
            <div className="text-2xl">{stat.icon}</div>
            <div className="text-2xl font-bold text-gray-800 mt-1">{stat.value}</div>
            <div className="text-xs text-gray-500">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Skills Improved */}
      {recentSkills.length > 0 && (
        <div className="bg-white border rounded-xl p-5">
          <h4 className="font-bold text-gray-800 mb-3">🎯 Skills Improved</h4>
          <div className="flex flex-wrap gap-2">
            {recentSkills.map((skill, i) => (
              <span
                key={i}
                className="px-3 py-1.5 bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 text-indigo-700 rounded-full text-sm font-medium"
              >
                ✓ {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Active Stages */}
      {activeStages.length > 0 && (
        <div className="bg-white border rounded-xl p-5">
          <h4 className="font-bold text-gray-800 mb-3">📊 Stage Activity</h4>
          <div className="space-y-3">
            {activeStages.map((stage) => (
              <div key={stage.id} className="flex items-center gap-3">
                <span className="text-xl">{stage.icon}</span>
                <span className="text-sm text-gray-600 flex-1">{stage.title}</span>
                <div className="w-32 bg-gray-100 rounded-full h-2">
                  <div
                    className="h-2 rounded-full"
                    style={{
                      width: `${progress.stageProgress[stage.id] || 0}%`,
                      backgroundColor: stage.color,
                    }}
                  />
                </div>
                <span className="text-sm text-gray-500 w-10 text-right">
                  {progress.stageProgress[stage.id] || 0}%
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Daily Activity This Week */}
      <div className="bg-white border rounded-xl p-5">
        <h4 className="font-bold text-gray-800 mb-3">📅 Daily Activity (Last 7 Days)</h4>
        <div className="grid grid-cols-7 gap-2">
          {Array.from({ length: 7 }).map((_, i) => {
            const d = new Date();
            d.setDate(d.getDate() - (6 - i));
            const dateStr = d.toISOString().split("T")[0];
            const dayData = progress.dailyLog[dateStr];
            const hasActivity = dayData && dayData.tasks > 0;
            const dayNames = ["S", "M", "T", "W", "T", "F", "S"];

            return (
              <div key={i} className="text-center">
                <div className="text-xs text-gray-400 mb-1">{dayNames[d.getDay()]}</div>
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center mx-auto text-sm font-medium ${
                    hasActivity
                      ? "bg-green-500 text-white"
                      : "bg-gray-100 text-gray-400"
                  }`}
                >
                  {hasActivity ? dayData.tasks : "—"}
                </div>
                <div className="text-xs text-gray-400 mt-1">{d.getDate()}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Motivational Tip */}
      <div className="bg-gradient-to-r from-indigo-50 to-blue-50 border border-indigo-200 rounded-xl p-5 text-center">
        <p className="text-indigo-700 font-medium">
          💡 Consistency beats intensity. Even 15 minutes daily will compound into massive growth!
        </p>
      </div>
    </div>
  );
};

export default WeeklyReview;
