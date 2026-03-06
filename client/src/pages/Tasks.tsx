import React, { useEffect, useState } from "react";
import { useGoalContext } from "../context/GoalContext";
import {
  fetchTasks,
  fetchCategories,
  createTask,
  updateTask,
  deleteTask,
} from "../api";
import type { Task, Category, TaskFormData } from "../types";
import Modal from "../components/Modal";
import toast from "react-hot-toast";
import { HiOutlinePlus, HiOutlineTrash, HiOutlinePencil } from "react-icons/hi";

const Tasks: React.FC = () => {
  const { activeGoal } = useGoalContext();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Omit<TaskFormData, "goal">>({
    name: "",
    category: "",
    points: 10,
  });

  const loadData = async () => {
    if (!activeGoal) return;
    try {
      setLoading(true);
      const [tasksRes, catsRes] = await Promise.all([
        fetchTasks(activeGoal._id),
        fetchCategories(activeGoal._id),
      ]);
      setTasks(tasksRes.data);
      setCategories(catsRes.data);
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

  const resetForm = () => {
    setForm({ name: "", category: "", points: 10 });
    setEditingId(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeGoal) return;
    try {
      if (editingId) {
        await updateTask(editingId, { ...form, goal: activeGoal._id });
        toast.success("Task updated!");
      } else {
        await createTask({ ...form, goal: activeGoal._id });
        toast.success("Task created!");
      }
      await loadData();
      setShowModal(false);
      resetForm();
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to save task");
    }
  };

  const handleEdit = (task: Task) => {
    const catId =
      typeof task.category === "string" ? task.category : task.category._id;
    setForm({ name: task.name, category: catId, points: task.points });
    setEditingId(task._id);
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this task?")) return;
    try {
      await deleteTask(id);
      toast.success("Task deleted!");
      await loadData();
    } catch (err) {
      toast.error("Failed to delete task");
    }
  };

  const tasksByCategory = tasks.reduce<Record<string, Task[]>>((acc, task) => {
    const catName =
      typeof task.category === "string"
        ? "Uncategorized"
        : task.category.name;
    if (!acc[catName]) acc[catName] = [];
    acc[catName].push(task);
    return acc;
  }, {});

  if (!activeGoal) {
    return (
      <div className="text-center py-20">
        <p className="text-slate-500">
          Please create a goal first to manage tasks.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Tasks</h1>
          <p className="text-slate-500 mt-1">
            Manage your daily improvement activities
          </p>
        </div>
        <button
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition font-medium shadow-sm hover:shadow-md"
          disabled={categories.length === 0}
        >
          <HiOutlinePlus className="w-5 h-5" />
          New Task
        </button>
      </div>

      {categories.length === 0 && (
        <div className="bg-amber-50 border border-amber-200 text-amber-700 px-4 py-3 rounded-xl">
          Please create categories first before adding tasks.
        </div>
      )}

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary-600" />
        </div>
      ) : tasks.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl border border-slate-200/60">
          <p className="text-slate-500 text-lg">
            No tasks yet. Create some activities to track!
          </p>
        </div>
      ) : (
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
                  <h3 className="text-lg font-semibold text-slate-700">
                    {catName}
                  </h3>
                  <span className="text-sm text-slate-400">
                    ({catTasks.length} tasks)
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {catTasks.map((task) => (
                    <div
                      key={task._id}
                      className="bg-white rounded-xl border border-slate-200/60 p-4 shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-semibold text-slate-900">
                            {task.name}
                          </h4>
                          <p className="text-primary-600 font-bold text-sm mt-1">
                            +{task.points} points
                          </p>
                        </div>
                        <div className="flex gap-1">
                          <button
                            onClick={() => handleEdit(task)}
                            className="p-1.5 text-slate-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition"
                          >
                            <HiOutlinePencil className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(task._id)}
                            className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                          >
                            <HiOutlineTrash className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          resetForm();
        }}
        title={editingId ? "Edit Task" : "New Task"}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Task Name
            </label>
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
              placeholder="e.g., Learn programming for 30 minutes"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Category
            </label>
            <select
              required
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Points
            </label>
            <input
              type="number"
              required
              min={1}
              value={form.points}
              onChange={(e) =>
                setForm({ ...form, points: parseInt(e.target.value) || 0 })
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
              {editingId ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Tasks;
