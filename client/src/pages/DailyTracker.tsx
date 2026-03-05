import React, { useEffect, useState } from "react";
import { useGoalContext } from "../context/GoalContext";
import {
  fetchTasks,
  fetchDailyLogs,
  createDailyLog,
  fetchCategories,
} from "../api";
import type { Task, DailyLog, Category } from "../types";
import toast from "react-hot-toast";
import { HiOutlineCheck, HiOutlineCalendar } from "react-icons/hi";

const DailyTracker: React.FC = () => {
  const { activeGoal, refreshGoals } = useGoalContext();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [dailyLogs, setDailyLogs] = useState<DailyLog[]>([]);
  const [selectedTasks, setSelectedTasks] = useState<string[]>([]);
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const loadData = async () => {
    if (!activeGoal) return;
    try {
      setLoading(true);
      const [tasksRes, logsRes, catsRes] = await Promise.all([
        fetchTasks(activeGoal._id),
        fetchDailyLogs(activeGoal._id),
        fetchCategories(activeGoal._id),
      ]);
      setTasks(tasksRes.data);
      setDailyLogs(logsRes.data);
      setCategories(catsRes.data);

      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const todayLog = logsRes.data.find((log: DailyLog) => {
        const logDate = new Date(log.date);
        logDate.setHours(0, 0, 0, 0);
        return logDate.getTime() === today.getTime();
      });

      if (todayLog) {
        setSelectedTasks(
          todayLog.completedTasks.map((ct) =>
            typeof ct.task === "string" ? ct.task : ct.task._id
          )
        );
        setNotes(todayLog.notes || "");
      } else {
        setSelectedTasks([]);
        setNotes("");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeGoal]);

  const toggleTask = (taskId: string) => {
    setSelectedTasks((prev) =>
      prev.includes(taskId)
        ? prev.filter((id) => id !== taskId)
        : [...prev, taskId]
    );
  };

  const getCurrentDayNumber = () => {
    if (!activeGoal) return 1;
    const start = new Date(activeGoal.startDate);
    start.setHours(0, 0, 0, 0);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const diff = today.getTime() - start.getTime();
    return Math.max(1, Math.ceil(diff / (1000 * 60 * 60 * 24)) + 1);
  };

  const todayPoints = selectedTasks.reduce((sum, taskId) => {
    const task = tasks.find((t) => t._id === taskId);
    return sum + (task ? task.points : 0);
  }, 0);

  const handleSave = async () => {
    if (!activeGoal) return;
    try {
      setSaving(true);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      await createDailyLog({
        goal: activeGoal._id,
        date: today.toISOString(),
        dayNumber: getCurrentDayNumber(),
        completedTaskIds: selectedTasks,
        notes,
      });

      toast.success("Progress saved!");
      await refreshGoals();
      await loadData();
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to save progress");
    } finally {
      setSaving(false);
    }
  };

  const tasksByCategory: Record<string, Task[]> = {};
  tasks.forEach((t) => {
    const catName =
      typeof t.category === "string" ? "Uncategorized" : t.category.name;
    if (!tasksByCategory[catName]) tasksByCategory[catName] = [];
    tasksByCategory[catName].push(t);
  });

  if (!activeGoal) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500">
          Please create a goal first to start tracking.
        </p>
      </div>
    );
  }

  const dayNumber = getCurrentDayNumber();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Daily Tracker</h1>
        <p className="text-gray-500 mt-1">
          Record your completed tasks for today
        </p>
      </div>

      <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <HiOutlineCalendar className="w-5 h-5 text-primary-200" />
              <span className="text-primary-200 text-sm">
                {new Date().toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
            <h2 className="text-2xl font-bold">
              Day {dayNumber} of {activeGoal.totalDays}
            </h2>
          </div>
          <div className="text-right">
            <p className="text-primary-200 text-sm">Today's Points</p>
            <p className="text-4xl font-bold">{todayPoints}</p>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary-600" />
        </div>
      ) : tasks.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl border border-gray-100">
          <p className="text-gray-500 text-lg">
            No tasks available. Please create tasks first.
          </p>
        </div>
      ) : (
        <>
          <div className="space-y-6">
            {Object.entries(tasksByCategory).map(([catName, catTasks]) => {
              const cat =
                typeof catTasks[0].category !== "string"
                  ? catTasks[0].category
                  : null;
              return (
                <div key={catName}>
                  <div className="flex items-center gap-2 mb-3">
                    {cat && (
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: cat.color }}
                      />
                    )}
                    <h3 className="text-lg font-semibold text-gray-700">
                      {catName}
                    </h3>
                  </div>
                  <div className="space-y-2">
                    {catTasks.map((task) => {
                      const isSelected = selectedTasks.includes(task._id);
                      return (
                        <button
                          key={task._id}
                          onClick={() => toggleTask(task._id)}
                          className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all ${
                            isSelected
                              ? "bg-primary-50 border-primary-300 shadow-sm"
                              : "bg-white border-gray-100 hover:border-gray-200"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition ${
                                isSelected
                                  ? "bg-primary-600 border-primary-600"
                                  : "border-gray-300"
                              }`}
                            >
                              {isSelected && (
                                <HiOutlineCheck className="w-4 h-4 text-white" />
                              )}
                            </div>
                            <span
                              className={`font-medium ${
                                isSelected
                                  ? "text-primary-700"
                                  : "text-gray-700"
                              }`}
                            >
                              {task.name}
                            </span>
                          </div>
                          <span
                            className={`font-bold text-sm ${
                              isSelected
                                ? "text-primary-600"
                                : "text-gray-400"
                            }`}
                          >
                            +{task.points} pts
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Notes (optional)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
              rows={3}
              placeholder="How was your day? Any reflections..."
            />
          </div>

          <button
            onClick={handleSave}
            disabled={saving}
            className="w-full py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition font-semibold text-lg shadow-lg shadow-primary-200 disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Today's Progress"}
          </button>

          {dailyLogs.length > 0 && (
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Progress History
              </h3>
              <div className="space-y-3">
                {[...dailyLogs].reverse().map((log) => (
                  <div
                    key={log._id}
                    className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-gray-900">
                          Day {log.dayNumber}
                        </p>
                        <p className="text-gray-500 text-sm">
                          {new Date(log.date).toLocaleDateString()}
                          {" \u00B7 "}
                          {log.completedTasks.length} tasks completed
                        </p>
                      </div>
                      <span className="text-primary-600 font-bold text-lg">
                        +{log.totalPoints} pts
                      </span>
                    </div>
                    {log.notes && (
                      <p className="text-gray-500 text-sm mt-2 italic">
                        "{log.notes}"
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default DailyTracker;
