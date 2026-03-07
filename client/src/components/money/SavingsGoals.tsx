import React, { useState } from "react";
import { useMoneyContext } from "../../context/MoneyContext";
import { GoalPriority } from "../../types/money";

const SavingsGoals: React.FC = () => {
  const { savingsGoals, addSavingsGoal, updateSavingsGoal, removeSavingsGoal } = useMoneyContext();
  const [showForm, setShowForm] = useState(false);
  const [contributeId, setContributeId] = useState<string | null>(null);
  const [contributeAmount, setContributeAmount] = useState("");
  const [name, setName] = useState("");
  const [icon, setIcon] = useState("🎯");
  const [targetAmount, setTargetAmount] = useState("");
  const [deadline, setDeadline] = useState("");
  const [priority, setPriority] = useState<GoalPriority>("medium");

  const fmt = (n: number) => {
    if (n >= 100000) return `₹${(n / 100000).toFixed(1)}L`;
    if (n >= 1000) return `₹${(n / 1000).toFixed(1)}K`;
    return `₹${n.toLocaleString("en-IN")}`;
  };

  const totalSaved = savingsGoals.reduce((s, g) => s + g.currentAmount, 0);
  const totalTarget = savingsGoals.reduce((s, g) => s + g.targetAmount, 0);

  const colors = [
    "from-blue-500 to-indigo-600",
    "from-emerald-500 to-green-600",
    "from-purple-500 to-violet-600",
    "from-cyan-500 to-teal-600",
    "from-amber-500 to-orange-600",
    "from-pink-500 to-rose-600",
  ];

  const handleAdd = () => {
    if (!name || !targetAmount) return;
    addSavingsGoal({
      id: `goal-${Date.now()}`,
      name,
      icon,
      targetAmount: parseFloat(targetAmount),
      currentAmount: 0,
      deadline: deadline || undefined,
      priority,
      color: colors[savingsGoals.length % colors.length],
    });
    setName(""); setTargetAmount(""); setDeadline(""); setIcon("🎯");
    setShowForm(false);
  };

  const handleContribute = (id: string) => {
    if (!contributeAmount) return;
    updateSavingsGoal(id, parseFloat(contributeAmount));
    setContributeId(null);
    setContributeAmount("");
  };

  const priorityColors = {
    high: "bg-red-100 text-red-700",
    medium: "bg-amber-100 text-amber-700",
    low: "bg-green-100 text-green-700",
  };

  const iconOptions = ["🎯", "🛡️", "💻", "🎓", "✈️", "🚗", "🏠", "🏖️", "💍", "🎮", "📱", "🎸"];

  return (
    <div className="space-y-6">
      {/* Overall Progress */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-gray-900 font-bold text-lg">Savings Goals</h3>
            <p className="text-gray-400 text-xs">Track progress towards your financial dreams</p>
          </div>
          <button onClick={() => setShowForm(!showForm)} className="px-4 py-2 text-xs font-medium text-white bg-gradient-to-r from-emerald-500 to-green-600 rounded-xl hover:shadow-lg transition-all">
            + New Goal
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
          <div className="p-4 bg-emerald-50 rounded-xl text-center">
            <p className="text-[11px] text-emerald-600 font-medium">Total Saved</p>
            <p className="text-xl font-bold text-emerald-700">{fmt(totalSaved)}</p>
          </div>
          <div className="p-4 bg-blue-50 rounded-xl text-center">
            <p className="text-[11px] text-blue-600 font-medium">Total Target</p>
            <p className="text-xl font-bold text-blue-700">{fmt(totalTarget)}</p>
          </div>
          <div className="p-4 bg-purple-50 rounded-xl text-center">
            <p className="text-[11px] text-purple-600 font-medium">Overall Progress</p>
            <p className="text-xl font-bold text-purple-700">{totalTarget > 0 ? Math.round((totalSaved / totalTarget) * 100) : 0}%</p>
          </div>
        </div>

        <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-emerald-400 to-green-500 rounded-full transition-all" style={{ width: `${totalTarget > 0 ? (totalSaved / totalTarget) * 100 : 0}%` }} />
        </div>
      </div>

      {/* Add Goal Form */}
      {showForm && (
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h3 className="text-gray-900 font-bold text-sm mb-4">Create New Goal</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-500 mb-1">Goal Name</label>
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. New Laptop" className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400" />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Target Amount (₹)</label>
              <input type="number" value={targetAmount} onChange={(e) => setTargetAmount(e.target.value)} placeholder="50000" className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400" />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Deadline (optional)</label>
              <input type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400" />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Priority</label>
              <select value={priority} onChange={(e) => setPriority(e.target.value as GoalPriority)} className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl bg-white focus:outline-none">
                <option value="high">🔴 High</option>
                <option value="medium">🟡 Medium</option>
                <option value="low">🟢 Low</option>
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs text-gray-500 mb-1">Icon</label>
              <div className="flex gap-2 flex-wrap">
                {iconOptions.map((ic) => (
                  <button key={ic} onClick={() => setIcon(ic)} className={`w-9 h-9 rounded-lg text-lg flex items-center justify-center border transition-all ${icon === ic ? "border-emerald-400 bg-emerald-50 shadow-sm" : "border-gray-200 hover:border-gray-300"}`}>
                    {ic}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <button onClick={handleAdd} className="px-4 py-2 text-xs font-medium text-white bg-gradient-to-r from-emerald-500 to-green-600 rounded-xl hover:shadow-lg transition-all">Create Goal</button>
            <button onClick={() => setShowForm(false)} className="px-4 py-2 text-xs font-medium text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 transition-all">Cancel</button>
          </div>
        </div>
      )}

      {/* Goals Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {savingsGoals.map((goal) => {
          const pct = Math.round((goal.currentAmount / goal.targetAmount) * 100);
          const isComplete = pct >= 100;
          return (
            <div key={goal.id} className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-lg transition-all">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${goal.color} flex items-center justify-center text-lg`}>
                    {goal.icon}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800">{goal.name}</p>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${priorityColors[goal.priority]}`}>
                      {goal.priority}
                    </span>
                  </div>
                </div>
                <button onClick={() => removeSavingsGoal(goal.id)} className="text-gray-300 hover:text-red-500 text-xs transition-colors">✕</button>
              </div>

              <div className="mb-3">
                <div className="flex items-end justify-between mb-1">
                  <span className="text-lg font-bold text-gray-900">{fmt(goal.currentAmount)}</span>
                  <span className="text-xs text-gray-400">of {fmt(goal.targetAmount)}</span>
                </div>
                <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full transition-all bg-gradient-to-r ${goal.color}`} style={{ width: `${Math.min(pct, 100)}%` }} />
                </div>
                <div className="flex items-center justify-between mt-1">
                  <span className={`text-xs font-semibold ${isComplete ? "text-green-600" : "text-gray-600"}`}>{pct}%</span>
                  {goal.deadline && (
                    <span className="text-[10px] text-gray-400">Due: {new Date(goal.deadline).toLocaleDateString("en-IN", { month: "short", year: "numeric" })}</span>
                  )}
                </div>
              </div>

              {!isComplete && (
                contributeId === goal.id ? (
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={contributeAmount}
                      onChange={(e) => setContributeAmount(e.target.value)}
                      placeholder="Amount"
                      className="flex-1 px-3 py-1.5 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                      autoFocus
                    />
                    <button onClick={() => handleContribute(goal.id)} className="px-3 py-1.5 text-xs font-medium text-white bg-emerald-500 rounded-lg hover:bg-emerald-600">Add</button>
                    <button onClick={() => setContributeId(null)} className="px-2 py-1.5 text-xs text-gray-500 hover:text-gray-700">✕</button>
                  </div>
                ) : (
                  <button onClick={() => setContributeId(goal.id)} className="w-full py-2 text-xs font-medium text-emerald-600 bg-emerald-50 hover:bg-emerald-100 rounded-xl transition-colors">
                    + Contribute
                  </button>
                )
              )}
              {isComplete && (
                <div className="text-center py-2 text-xs font-medium text-green-600 bg-green-50 rounded-xl">
                  🎉 Goal Achieved!
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SavingsGoals;
