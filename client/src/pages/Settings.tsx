import React, { useEffect, useState } from "react";
import { useGoalContext } from "../context/GoalContext";
import {
  updateGoal,
  resetGoal,
  fetchCategories,
  fetchTasks,
  deleteCategory,
  deleteTask,
} from "../api";
import type { Category, Task } from "../types";
import toast from "react-hot-toast";
import {
  HiOutlineCog,
  HiOutlineRefresh,
  HiOutlineTrash,
  HiOutlineExclamation,
} from "react-icons/hi";

const Settings: React.FC = () => {
  const { activeGoal, refreshGoals } = useGoalContext();
  const [categories, setCategories] = useState<Category[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
    totalDays: 30,
    targetPoints: 1000,
  });

  useEffect(() => {
    if (activeGoal) {
      setForm({
        name: activeGoal.name,
        description: activeGoal.description,
        totalDays: activeGoal.totalDays,
        targetPoints: activeGoal.targetPoints,
      });
      fetchCategories(activeGoal._id).then((res) => setCategories(res.data));
      fetchTasks(activeGoal._id).then((res) => setTasks(res.data));
    }
  }, [activeGoal]);

  const handleUpdateGoal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeGoal) return;
    try {
      await updateGoal(activeGoal._id, form);
      toast.success("Goal settings updated!");
      await refreshGoals();
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to update settings");
    }
  };

  const handleReset = async () => {
    if (!activeGoal) return;
    const confirmed = window.confirm(
      "Are you sure you want to reset all progress? This will delete all daily logs and reset points to 0. This action cannot be undone."
    );
    if (!confirmed) return;
    try {
      await resetGoal(activeGoal._id);
      toast.success("Progress has been reset!");
      await refreshGoals();
    } catch (err) {
      toast.error("Failed to reset progress");
    }
  };

  const handleDeleteCategory = async (id: string) => {
    if (
      !window.confirm("Delete this category and all its tasks?")
    )
      return;
    try {
      await deleteCategory(id);
      setCategories((prev) => prev.filter((c) => c._id !== id));
      setTasks((prev) => {
        const catTasks = prev.filter((t) => {
          const catId =
            typeof t.category === "string" ? t.category : t.category._id;
          return catId !== id;
        });
        return catTasks;
      });
      toast.success("Category deleted!");
    } catch (err) {
      toast.error("Failed to delete category");
    }
  };

  const handleDeleteTask = async (id: string) => {
    if (!window.confirm("Delete this task?")) return;
    try {
      await deleteTask(id);
      setTasks((prev) => prev.filter((t) => t._id !== id));
      toast.success("Task deleted!");
    } catch (err) {
      toast.error("Failed to delete task");
    }
  };

  if (!activeGoal) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500">
          Please create a goal first to access settings.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-3xl">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-500 mt-1">
          Manage your goal configuration and data
        </p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200/60 p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-6">
          <HiOutlineCog className="w-5 h-5 text-gray-500" />
          <h3 className="text-lg font-semibold text-gray-900">
            Goal Settings
          </h3>
        </div>
        <form onSubmit={handleUpdateGoal} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Goal Name
            </label>
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
              rows={3}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Challenge Days
              </label>
              <input
                type="number"
                required
                min={1}
                value={form.totalDays}
                onChange={(e) =>
                  setForm({
                    ...form,
                    totalDays: parseInt(e.target.value) || 0,
                  })
                }
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Target Points
              </label>
              <input
                type="number"
                required
                min={1}
                value={form.targetPoints}
                onChange={(e) =>
                  setForm({
                    ...form,
                    targetPoints: parseInt(e.target.value) || 0,
                  })
                }
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-2.5 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition font-medium"
          >
            Save Changes
          </button>
        </form>
      </div>

      <div className="bg-white rounded-xl border border-gray-200/60 p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Categories & Tasks
        </h3>
        {categories.length === 0 ? (
          <p className="text-gray-400">No categories yet.</p>
        ) : (
          <div className="space-y-4">
            {categories.map((cat) => {
              const catTasks = tasks.filter((t) => {
                const catId =
                  typeof t.category === "string"
                    ? t.category
                    : t.category._id;
                return catId === cat._id;
              });
              return (
                <div key={cat._id} className="border border-gray-200/60 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: cat.color }}
                      />
                      <span className="font-semibold text-gray-800">
                        {cat.name}
                      </span>
                      <span className="text-gray-400 text-sm">
                        ({catTasks.length} tasks)
                      </span>
                    </div>
                    <button
                      onClick={() => handleDeleteCategory(cat._id)}
                      className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                    >
                      <HiOutlineTrash className="w-4 h-4" />
                    </button>
                  </div>
                  {catTasks.length > 0 && (
                    <div className="ml-5 space-y-1">
                      {catTasks.map((task) => (
                        <div
                          key={task._id}
                          className="flex items-center justify-between text-sm py-1"
                        >
                          <span className="text-gray-600">{task.name}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-primary-600 font-medium">
                              {task.points} pts
                            </span>
                            <button
                              onClick={() => handleDeleteTask(task._id)}
                              className="p-1 text-gray-400 hover:text-red-500 transition"
                            >
                              <HiOutlineTrash className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="bg-white rounded-xl border border-red-200 p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <HiOutlineExclamation className="w-5 h-5 text-red-500" />
          <h3 className="text-lg font-semibold text-red-600">Danger Zone</h3>
        </div>
        <p className="text-gray-500 text-sm mb-4">
          Resetting progress will delete all daily logs and set your points back
          to 0. This action cannot be undone.
        </p>
        <button
          onClick={handleReset}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-red-600 text-white rounded-xl hover:bg-red-700 transition font-medium"
        >
          <HiOutlineRefresh className="w-5 h-5" />
          Reset All Progress
        </button>
      </div>
    </div>
  );
};

export default Settings;
