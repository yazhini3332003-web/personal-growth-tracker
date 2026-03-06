import React, { useState } from "react";
import { useGoalContext } from "../context/GoalContext";
import { createGoal, deleteGoal, updateGoal } from "../api";
import type { GoalFormData } from "../types";
import Modal from "../components/Modal";
import ProgressBar from "../components/ProgressBar";
import toast from "react-hot-toast";
import { HiOutlinePlus, HiOutlineTrash, HiOutlinePencil } from "react-icons/hi";

const Goals: React.FC = () => {
  const { goals, refreshGoals, setActiveGoal } = useGoalContext();
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<GoalFormData>({
    name: "",
    description: "",
    startDate: new Date().toISOString().split("T")[0],
    totalDays: 30,
    targetPoints: 1000,
  });

  const resetForm = () => {
    setForm({
      name: "",
      description: "",
      startDate: new Date().toISOString().split("T")[0],
      totalDays: 30,
      targetPoints: 1000,
    });
    setEditingId(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateGoal(editingId, form);
        toast.success("Goal updated!");
      } else {
        await createGoal(form);
        toast.success("Goal created!");
      }
      await refreshGoals();
      setShowModal(false);
      resetForm();
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to save goal");
    }
  };

  const handleEdit = (goal: any) => {
    setForm({
      name: goal.name,
      description: goal.description,
      startDate: goal.startDate.split("T")[0],
      totalDays: goal.totalDays,
      targetPoints: goal.targetPoints,
    });
    setEditingId(goal._id);
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this goal and all related data?")) return;
    try {
      await deleteGoal(id);
      toast.success("Goal deleted!");
      await refreshGoals();
    } catch (err) {
      toast.error("Failed to delete goal");
    }
  };

  const handleSetActive = async (goal: any) => {
    try {
      await updateGoal(goal._id, { ...goal, isActive: true } as any);
      setActiveGoal(goal);
      await refreshGoals();
      toast.success(`"${goal.name}" is now active`);
    } catch (err) {
      toast.error("Failed to set active goal");
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Goals</h1>
          <p className="text-slate-500 mt-1">
            Create and manage your personal improvement goals
          </p>
        </div>
        <button
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition font-medium shadow-sm hover:shadow-md"
        >
          <HiOutlinePlus className="w-5 h-5" />
          New Goal
        </button>
      </div>

      {goals.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl border border-slate-200/60">
          <p className="text-slate-500 text-lg">
            No goals yet. Create your first goal to get started!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {goals.map((goal) => (
            <div
              key={goal._id}
              className={`bg-white rounded-xl border p-6 shadow-sm hover:shadow-md transition-shadow ${
                goal.isActive
                  ? "border-primary-300 ring-2 ring-primary-100"
                  : "border-slate-200/60"
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-slate-900">
                      {goal.name}
                    </h3>
                    {goal.isActive && (
                      <span className="px-2 py-0.5 bg-primary-100 text-primary-700 text-xs font-semibold rounded-full">
                        Active
                      </span>
                    )}
                  </div>
                  <p className="text-slate-500 text-sm mt-1">
                    {goal.description || "No description"}
                  </p>
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() => handleEdit(goal)}
                    className="p-2 text-slate-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition"
                  >
                    <HiOutlinePencil className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(goal._id)}
                    className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                  >
                    <HiOutlineTrash className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
                <div>
                  <span className="text-slate-400">Duration</span>
                  <p className="font-semibold text-slate-700">
                    {goal.totalDays} days
                  </p>
                </div>
                <div>
                  <span className="text-slate-400">Target</span>
                  <p className="font-semibold text-slate-700">
                    {goal.targetPoints} pts
                  </p>
                </div>
                <div>
                  <span className="text-slate-400">Earned</span>
                  <p className="font-semibold text-primary-600">
                    {goal.currentPoints} pts
                  </p>
                </div>
              </div>

              <ProgressBar
                current={goal.currentPoints}
                target={goal.targetPoints}
                height="h-2"
              />

              {!goal.isActive && (
                <button
                  onClick={() => handleSetActive(goal)}
                  className="mt-4 w-full py-2 text-sm font-medium text-primary-600 bg-primary-50 rounded-lg hover:bg-primary-100 transition"
                >
                  Set as Active Goal
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          resetForm();
        }}
        title={editingId ? "Edit Goal" : "Create New Goal"}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Goal Name
            </label>
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
              placeholder="e.g., 30 Day Self Improvement Challenge"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Description
            </label>
            <textarea
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
              rows={3}
              placeholder="What do you want to achieve?"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Start Date
              </label>
              <input
                type="date"
                required
                value={form.startDate}
                onChange={(e) =>
                  setForm({ ...form, startDate: e.target.value })
                }
                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Challenge Days
              </label>
              <input
                type="number"
                required
                min={1}
                value={form.totalDays}
                onChange={(e) =>
                  setForm({ ...form, totalDays: parseInt(e.target.value) || 0 })
                }
                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
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
              className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
            />
          </div>
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={() => {
                setShowModal(false);
                resetForm();
              }}
              className="flex-1 py-2.5 px-4 border border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50 transition font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 px-4 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition font-medium"
            >
              {editingId ? "Update Goal" : "Create Goal"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Goals;
