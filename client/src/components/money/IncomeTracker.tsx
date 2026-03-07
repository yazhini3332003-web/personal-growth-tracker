import React, { useState } from "react";
import { useMoneyContext } from "../../context/MoneyContext";
import { incomeCategoryConfig } from "../../data/moneyData";
import { IncomeCategory } from "../../types/money";

const IncomeTracker: React.FC = () => {
  const { incomes, addIncome, removeIncome } = useMoneyContext();
  const [showForm, setShowForm] = useState(false);
  const [source, setSource] = useState("");
  const [category, setCategory] = useState<IncomeCategory>("salary");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [recurring, setRecurring] = useState(false);
  const [notes, setNotes] = useState("");
  const [filter, setFilter] = useState<string>("all");

  const handleAdd = () => {
    if (!source || !amount) return;
    addIncome({
      id: `inc-${Date.now()}`,
      source,
      category,
      amount: parseFloat(amount),
      date,
      recurring,
      notes: notes || undefined,
    });
    setSource(""); setAmount(""); setNotes(""); setRecurring(false);
    setShowForm(false);
  };

  const filtered = filter === "all" ? incomes : incomes.filter((i) => i.category === filter);
  const totalAll = incomes.reduce((s, i) => s + i.amount, 0);
  const currentMonth = new Date().toISOString().slice(0, 7);
  const monthlyTotal = incomes.filter((i) => i.date.startsWith(currentMonth)).reduce((s, i) => s + i.amount, 0);

  const fmt = (n: number) => `₹${n.toLocaleString("en-IN")}`;

  // Category summary
  const catSummary: Record<string, number> = {};
  incomes.forEach((i) => { catSummary[i.category] = (catSummary[i.category] || 0) + i.amount; });
  const maxCatAmount = Math.max(...Object.values(catSummary), 1);

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <p className="text-gray-500 text-xs font-medium">Total Income</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{fmt(totalAll)}</p>
          <p className="text-[11px] text-gray-400 mt-1">{incomes.length} entries</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <p className="text-gray-500 text-xs font-medium">This Month</p>
          <p className="text-2xl font-bold text-emerald-600 mt-1">{fmt(monthlyTotal)}</p>
          <p className="text-[11px] text-gray-400 mt-1">{incomes.filter((i) => i.date.startsWith(currentMonth)).length} entries</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <p className="text-gray-500 text-xs font-medium">Recurring Income</p>
          <p className="text-2xl font-bold text-blue-600 mt-1">{fmt(incomes.filter((i) => i.recurring).reduce((s, i) => s + i.amount, 0))}</p>
          <p className="text-[11px] text-gray-400 mt-1">{incomes.filter((i) => i.recurring).length} recurring sources</p>
        </div>
      </div>

      {/* Category Breakdown */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <h3 className="text-gray-900 font-bold text-sm mb-4">Income by Category</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {Object.entries(catSummary)
            .sort((a, b) => b[1] - a[1])
            .map(([cat, amount]) => {
              const cfg = incomeCategoryConfig[cat] || { label: cat, icon: "💰", color: "from-gray-500 to-slate-600" };
              return (
                <div key={cat} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${cfg.color} flex items-center justify-center text-white text-lg`}>
                    {cfg.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-gray-700 font-medium">{cfg.label}</span>
                      <span className="text-gray-900 font-semibold">{fmt(amount)}</span>
                    </div>
                    <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <div className={`h-full bg-gradient-to-r ${cfg.color} rounded-full`} style={{ width: `${(amount / maxCatAmount) * 100}%` }} />
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      {/* Add Income Form */}
      {showForm && (
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h3 className="text-gray-900 font-bold text-sm mb-4">Add Income</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-500 mb-1">Source</label>
              <input value={source} onChange={(e) => setSource(e.target.value)} placeholder="e.g. Freelance Project" className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400" />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Category</label>
              <select value={category} onChange={(e) => setCategory(e.target.value as IncomeCategory)} className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 bg-white">
                {Object.entries(incomeCategoryConfig).map(([k, v]) => (
                  <option key={k} value={k}>{v.icon} {v.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Amount (₹)</label>
              <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="0" className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400" />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Date</label>
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs text-gray-500 mb-1">Notes (optional)</label>
              <input value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Any additional notes..." className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400" />
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" checked={recurring} onChange={(e) => setRecurring(e.target.checked)} className="rounded border-gray-300" />
              <label className="text-xs text-gray-600">Recurring income</label>
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <button onClick={handleAdd} className="px-4 py-2 text-xs font-medium text-white bg-gradient-to-r from-emerald-500 to-green-600 rounded-xl hover:shadow-lg transition-all">Add Income</button>
            <button onClick={() => setShowForm(false)} className="px-4 py-2 text-xs font-medium text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 transition-all">Cancel</button>
          </div>
        </div>
      )}

      {/* Entries List */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-gray-900 font-bold text-sm">Income Entries</h3>
          <div className="flex items-center gap-2">
            <select value={filter} onChange={(e) => setFilter(e.target.value)} className="text-xs px-3 py-1.5 border border-gray-200 rounded-lg bg-white focus:outline-none">
              <option value="all">All Categories</option>
              {Object.entries(incomeCategoryConfig).map(([k, v]) => (
                <option key={k} value={k}>{v.label}</option>
              ))}
            </select>
            {!showForm && (
              <button onClick={() => setShowForm(true)} className="px-3 py-1.5 text-xs font-medium text-white bg-gradient-to-r from-emerald-500 to-green-600 rounded-lg hover:shadow-md transition-all">+ Add</button>
            )}
          </div>
        </div>
        <div className="space-y-2">
          {filtered.length === 0 ? (
            <p className="text-center text-gray-400 text-sm py-8">No income entries yet</p>
          ) : (
            filtered.map((inc) => {
              const cfg = incomeCategoryConfig[inc.category] || { label: inc.category, icon: "💰", color: "from-gray-500 to-slate-600" };
              return (
                <div key={inc.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition-colors group">
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${cfg.color} flex items-center justify-center text-white text-sm`}>
                      {cfg.icon}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">{inc.source}</p>
                      <p className="text-[11px] text-gray-400">{new Date(inc.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })} {inc.recurring && "• 🔄 Recurring"}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-emerald-600">+{fmt(inc.amount)}</span>
                    <button onClick={() => removeIncome(inc.id)} className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-600 text-xs transition-all">✕</button>
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

export default IncomeTracker;
