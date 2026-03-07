import React, { useEffect, useState } from "react";
import { useGoalContext } from "../context/GoalContext";
import {
  fetchCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../api";
import type { Category, CategoryFormData } from "../types";
import Modal from "../components/Modal";
import toast from "react-hot-toast";
import { HiOutlinePlus, HiOutlineTrash, HiOutlinePencil } from "react-icons/hi";

const PRESET_COLORS = [
  "#3B82F6",
  "#ec4899",
  "#14b8a6",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
  "#06b6d4",
  "#84cc16",
  "#f97316",
  "#64748b",
];

const Categories: React.FC = () => {
  const { activeGoal } = useGoalContext();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Omit<CategoryFormData, "goal">>({
    name: "",
    color: "#3B82F6",
  });

  const loadCategories = async () => {
    if (!activeGoal) return;
    try {
      setLoading(true);
      const res = await fetchCategories(activeGoal._id);
      setCategories(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeGoal]);

  const resetForm = () => {
    setForm({ name: "", color: "#3B82F6" });
    setEditingId(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeGoal) return;
    try {
      if (editingId) {
        await updateCategory(editingId, form);
        toast.success("Category updated!");
      } else {
        await createCategory({ ...form, goal: activeGoal._id });
        toast.success("Category created!");
      }
      await loadCategories();
      setShowModal(false);
      resetForm();
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to save category");
    }
  };

  const handleEdit = (cat: Category) => {
    setForm({ name: cat.name, color: cat.color });
    setEditingId(cat._id);
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this category and all its tasks?")) return;
    try {
      await deleteCategory(id);
      toast.success("Category deleted!");
      await loadCategories();
    } catch (err) {
      toast.error("Failed to delete category");
    }
  };

  if (!activeGoal) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500">
          Please create a goal first to manage categories.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Categories</h1>
          <p className="text-gray-500 mt-1">
            Organize your improvement areas for "{activeGoal.name}"
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
          New Category
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary-600" />
        </div>
      ) : categories.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl border border-gray-200/60">
          <p className="text-gray-500 text-lg">
            No categories yet. Add some to organize your tasks!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <div
              key={cat._id}
              className="bg-white rounded-xl border border-gray-200/60 p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-lg"
                    style={{ backgroundColor: cat.color }}
                  >
                    {cat.name.charAt(0)}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">
                    {cat.name}
                  </h3>
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() => handleEdit(cat)}
                    className="p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition"
                  >
                    <HiOutlinePencil className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(cat._id)}
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                  >
                    <HiOutlineTrash className="w-4 h-4" />
                  </button>
                </div>
              </div>
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
        title={editingId ? "Edit Category" : "New Category"}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category Name
            </label>
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
              placeholder="e.g., Career Development"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Color
            </label>
            <div className="flex flex-wrap gap-2">
              {PRESET_COLORS.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setForm({ ...form, color })}
                  className={`w-8 h-8 rounded-lg transition-transform ${
                    form.color === color
                      ? "ring-2 ring-offset-2 ring-primary-500 scale-110"
                      : ""
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={() => {
                setShowModal(false);
                resetForm();
              }}
              className="flex-1 py-2.5 px-4 border border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50 transition font-medium"
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

export default Categories;
