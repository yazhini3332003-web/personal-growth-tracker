import React, { useState } from "react";
import { useMoneyContext } from "../../context/MoneyContext";
import { expenseCategoryConfig } from "../../data/moneyData";
import { ExpenseCategory } from "../../types/money";

const ExpenseTracker: React.FC = () => {
  const { expenses, addExpense, removeExpense } = useMoneyContext();
  const [showForm, setShowForm] = useState(false);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<ExpenseCategory>("food");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [recurring, setRecurring] = useState(false);
  const [notes, setNotes] = useState("");
  const [filter, setFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"date" | "amount">("date");

  const handleAdd = () => {
    if (!description || !amount) return;
    addExpense({
      id: `exp-${Date.now()}`,
      description,
      category,
      amount: parseFloat(amount),
      date,
      recurring,
      notes: notes || undefined,
    });
    setDescription(""); setAmount(""); setNotes(""); setRecurring(false);
    setShowForm(false);
  };

  const filtered = filter === "all" ? expenses : expenses.filter((e) => e.category === filter);
  const sorted = [...filtered].sort((a, b) => sortBy === "date" ? new Date(b.date).getTime() - new Date(a.date).getTime() : b.amount - a.amount);

  const totalAll = expenses.reduce((s, e) => s + e.amount, 0);
  const currentMonth = new Date().toISOString().slice(0, 7);
  const monthlyTotal = expenses.filter((e) => e.date.startsWith(currentMonth)).reduce((s, e) => s + e.amount, 0);
  const dailyAvg = totalAll / Math.max(new Set(expenses.map((e) => e.date)).size, 1);

  const fmt = (n: number) => `₹${n.toLocaleString("en-IN")}`;

  // Category breakdown
  const catTotals: Record<string, number> = {};
  expenses.forEach((e) => { catTotals[e.category] = (catTotals[e.category] || 0) + e.amount; });
  const totalExpenses = Object.values(catTotals).reduce((a, b) => a + b, 0);

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <p className="text-gray-500 text-xs font-medium">Total Expenses</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{fmt(totalAll)}</p>
          <p className="text-[11px] text-gray-400 mt-1">{expenses.length} transactions</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <p className="text-gray-500 text-xs font-medium">This Month</p>
          <p className="text-2xl font-bold text-red-600 mt-1">{fmt(monthlyTotal)}</p>
          <p className="text-[11px] text-gray-400 mt-1">{expenses.filter((e) => e.date.startsWith(currentMonth)).length} transactions</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <p className="text-gray-500 text-xs font-medium">Daily Average</p>
          <p className="text-2xl font-bold text-amber-600 mt-1">{fmt(Math.round(dailyAvg))}</p>
          <p className="text-[11px] text-gray-400 mt-1">Across {new Set(expenses.map((e) => e.date)).size} days</p>
        </div>
      </div>

      {/* Category Pie Chart Visualization */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <h3 className="text-gray-900 font-bold text-sm mb-4">Spending by Category</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {Object.entries(catTotals)
            .sort((a, b) => b[1] - a[1])
            .map(([cat, amt]) => {
              const cfg = expenseCategoryConfig[cat] || { label: cat, icon: "📦", color: "bg-gray-100 text-gray-700 border-gray-200" };
              const pct = totalExpenses > 0 ? Math.round((amt / totalExpenses) * 100) : 0;
              return (
                <div key={cat} className={`p-3 rounded-xl border ${cfg.color} text-center`}>
                  <span className="text-2xl">{cfg.icon}</span>
                  <p className="text-xs font-semibold mt-1">{cfg.label}</p>
                  <p className="text-lg font-bold">{pct}%</p>
                  <p className="text-[10px] opacity-70">{fmt(amt)}</p>
                </div>
              );
            })}
        </div>
      </div>

      {/* Add Form */}
      {showForm && (
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h3 className="text-gray-900 font-bold text-sm mb-4">Add Expense</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-500 mb-1">Description</label>
              <input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="e.g. Grocery Shopping" className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-400" />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Category</label>
              <select value={category} onChange={(e) => setCategory(e.target.value as ExpenseCategory)} className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-400">
                {Object.entries(expenseCategoryConfig).map(([k, v]) => (
                  <option key={k} value={k}>{v.icon} {v.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Amount (₹)</label>
              <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="0" className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-400" />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Date</label>
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-400" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs text-gray-500 mb-1">Notes (optional)</label>
              <input value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Additional notes..." className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-400" />
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" checked={recurring} onChange={(e) => setRecurring(e.target.checked)} className="rounded border-gray-300" />
              <label className="text-xs text-gray-600">Recurring expense</label>
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <button onClick={handleAdd} className="px-4 py-2 text-xs font-medium text-white bg-gradient-to-r from-red-500 to-rose-600 rounded-xl hover:shadow-lg transition-all">Add Expense</button>
            <button onClick={() => setShowForm(false)} className="px-4 py-2 text-xs font-medium text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 transition-all">Cancel</button>
          </div>
        </div>
      )}

      {/* Entries */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <h3 className="text-gray-900 font-bold text-sm">Expense Entries</h3>
          <div className="flex items-center gap-2">
            <select value={filter} onChange={(e) => setFilter(e.target.value)} className="text-xs px-2 py-1.5 border border-gray-200 rounded-lg bg-white focus:outline-none">
              <option value="all">All</option>
              {Object.entries(expenseCategoryConfig).map(([k, v]) => (
                <option key={k} value={k}>{v.label}</option>
              ))}
            </select>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value as "date" | "amount")} className="text-xs px-2 py-1.5 border border-gray-200 rounded-lg bg-white focus:outline-none">
              <option value="date">Date</option>
              <option value="amount">Amount</option>
            </select>
            {!showForm && (
              <button onClick={() => setShowForm(true)} className="px-3 py-1.5 text-xs font-medium text-white bg-gradient-to-r from-red-500 to-rose-600 rounded-lg hover:shadow-md transition-all">+ Add</button>
            )}
          </div>
        </div>
        <div className="space-y-2">
          {sorted.length === 0 ? (
            <p className="text-center text-gray-400 text-sm py-8">No expenses recorded</p>
          ) : (
            sorted.map((exp) => {
              const cfg = expenseCategoryConfig[exp.category] || { label: exp.category, icon: "📦", color: "bg-gray-100 text-gray-700" };
              return (
                <div key={exp.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition-colors group">
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-lg ${cfg.color.split(" ").slice(0, 2).join(" ")} border flex items-center justify-center text-sm`}>
                      {cfg.icon}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">{exp.description}</p>
                      <p className="text-[11px] text-gray-400">{cfg.label} · {new Date(exp.date).toLocaleDateString("en-IN", { day: "numeric", month: "short" })} {exp.recurring && "· 🔄"}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-red-600">-{fmt(exp.amount)}</span>
                    <button onClick={() => removeExpense(exp.id)} className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-600 text-xs transition-all">✕</button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default ExpenseTracker;
