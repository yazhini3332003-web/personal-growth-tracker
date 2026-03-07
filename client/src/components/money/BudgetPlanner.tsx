import React, { useState } from "react";
import { useMoneyContext } from "../../context/MoneyContext";
import { expenseCategoryConfig } from "../../data/moneyData";

const BudgetPlanner: React.FC = () => {
  const { budget, expenses, updateBudget } = useMoneyContext();
  const [editing, setEditing] = useState(false);
  const [editBudget, setEditBudget] = useState(budget);

  const fmt = (n: number) => `₹${n.toLocaleString("en-IN")}`;

  // Calculate actual spending per category this month
  const monthExpenses = expenses.filter((e) => e.date.startsWith(budget.month));
  const actualSpendingByCategory: Record<string, number> = {};
  monthExpenses.forEach((e) => {
    actualSpendingByCategory[e.category] = (actualSpendingByCategory[e.category] || 0) + e.amount;
  });
  const totalActualSpending = monthExpenses.reduce((s, e) => s + e.amount, 0);

  const monthName = new Date(budget.month + "-01").toLocaleDateString("en-IN", { month: "long", year: "numeric" });

  const savingsActual = budget.totalIncome - totalActualSpending;
  const savingsOnTrack = savingsActual >= budget.savingsTarget;

  const handleSave = () => {
    updateBudget(editBudget);
    setEditing(false);
  };

  const updateCategoryLimit = (category: string, limit: number) => {
    setEditBudget({
      ...editBudget,
      categoryBudgets: editBudget.categoryBudgets.map((cb) =>
        cb.category === category ? { ...cb, limit } : cb
      ),
    });
  };

  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-gray-900 font-bold text-lg">Budget for {monthName}</h3>
            <p className="text-gray-400 text-xs mt-0.5">Track your spending against planned budget</p>
          </div>
          <button
            onClick={() => { if (editing) handleSave(); else { setEditBudget(budget); setEditing(true); } }}
            className={`px-4 py-2 text-xs font-medium rounded-xl transition-all ${editing ? "text-white bg-gradient-to-r from-emerald-500 to-green-600 hover:shadow-lg" : "text-gray-600 bg-gray-100 hover:bg-gray-200"}`}
          >
            {editing ? "Save Changes" : "Edit Budget"}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="p-4 bg-emerald-50 rounded-xl text-center">
            <p className="text-[11px] text-emerald-600 font-medium">Total Income</p>
            {editing ? (
              <input type="number" value={editBudget.totalIncome} onChange={(e) => setEditBudget({ ...editBudget, totalIncome: parseInt(e.target.value) || 0 })} className="w-full text-center text-xl font-bold text-emerald-700 bg-transparent border-b border-emerald-300 focus:outline-none mt-1" />
            ) : (
              <p className="text-xl font-bold text-emerald-700 mt-1">{fmt(budget.totalIncome)}</p>
            )}
          </div>
          <div className="p-4 bg-blue-50 rounded-xl text-center">
            <p className="text-[11px] text-blue-600 font-medium">Planned Spending</p>
            {editing ? (
              <input type="number" value={editBudget.plannedSpending} onChange={(e) => setEditBudget({ ...editBudget, plannedSpending: parseInt(e.target.value) || 0 })} className="w-full text-center text-xl font-bold text-blue-700 bg-transparent border-b border-blue-300 focus:outline-none mt-1" />
            ) : (
              <p className="text-xl font-bold text-blue-700 mt-1">{fmt(budget.plannedSpending)}</p>
            )}
          </div>
          <div className="p-4 bg-amber-50 rounded-xl text-center">
            <p className="text-[11px] text-amber-600 font-medium">Actual Spending</p>
            <p className={`text-xl font-bold mt-1 ${totalActualSpending > budget.plannedSpending ? "text-red-600" : "text-amber-700"}`}>
              {fmt(totalActualSpending)}
            </p>
            {totalActualSpending > budget.plannedSpending && (
              <p className="text-[10px] text-red-500 font-medium mt-0.5">⚠️ Over budget!</p>
            )}
          </div>
          <div className="p-4 bg-purple-50 rounded-xl text-center">
            <p className="text-[11px] text-purple-600 font-medium">Savings Target</p>
            {editing ? (
              <input type="number" value={editBudget.savingsTarget} onChange={(e) => setEditBudget({ ...editBudget, savingsTarget: parseInt(e.target.value) || 0 })} className="w-full text-center text-xl font-bold text-purple-700 bg-transparent border-b border-purple-300 focus:outline-none mt-1" />
            ) : (
              <p className="text-xl font-bold text-purple-700 mt-1">{fmt(budget.savingsTarget)}</p>
            )}
            <p className={`text-[10px] font-medium mt-0.5 ${savingsOnTrack ? "text-green-500" : "text-red-500"}`}>
              {savingsOnTrack ? "✅ On track" : "⚠️ Below target"}
            </p>
          </div>
        </div>

        {/* Overall Progress */}
        <div className="mt-5">
          <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
            <span>Budget Utilization</span>
            <span>{budget.plannedSpending > 0 ? Math.round((totalActualSpending / budget.plannedSpending) * 100) : 0}%</span>
          </div>
          <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all ${totalActualSpending > budget.plannedSpending ? "bg-gradient-to-r from-red-400 to-rose-500" : totalActualSpending > budget.plannedSpending * 0.8 ? "bg-gradient-to-r from-amber-400 to-yellow-500" : "bg-gradient-to-r from-emerald-400 to-green-500"}`}
              style={{ width: `${Math.min((totalActualSpending / Math.max(budget.plannedSpending, 1)) * 100, 100)}%` }}
            />
          </div>
        </div>
      </div>

      {/* Category-wise Budget */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <h3 className="text-gray-900 font-bold text-sm mb-4">Category Budgets</h3>
        <div className="space-y-4">
          {(editing ? editBudget : budget).categoryBudgets.map((cb) => {
            const actual = actualSpendingByCategory[cb.category] || 0;
            const pct = cb.limit > 0 ? Math.round((actual / cb.limit) * 100) : 0;
            const isOver = actual > cb.limit;
            const isWarning = pct > 80 && !isOver;
            const cfg = expenseCategoryConfig[cb.category] || { label: cb.category, icon: "📦", color: "bg-gray-100 text-gray-700" };

            return (
              <div key={cb.category} className={`p-4 rounded-xl border ${isOver ? "border-red-200 bg-red-50/50" : isWarning ? "border-amber-200 bg-amber-50/50" : "border-gray-100 bg-gray-50/50"}`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{cfg.icon}</span>
                    <span className="text-sm font-medium text-gray-800">{cfg.label}</span>
                    {isOver && <span className="text-[10px] px-2 py-0.5 bg-red-100 text-red-600 rounded-full font-medium">Over Budget</span>}
                    {isWarning && <span className="text-[10px] px-2 py-0.5 bg-amber-100 text-amber-600 rounded-full font-medium">Warning</span>}
                  </div>
                  <div className="flex items-center gap-3 text-xs">
                    <span className="text-gray-500">Spent: <span className={`font-semibold ${isOver ? "text-red-600" : "text-gray-700"}`}>{fmt(actual)}</span></span>
                    <span className="text-gray-400">/</span>
                    {editing ? (
                      <input
                        type="number"
                        value={cb.limit}
                        onChange={(e) => updateCategoryLimit(cb.category, parseInt(e.target.value) || 0)}
                        className="w-20 px-2 py-1 text-xs border border-gray-200 rounded-lg focus:outline-none text-right"
                      />
                    ) : (
                      <span className="text-gray-700 font-semibold">{fmt(cb.limit)}</span>
                    )}
                  </div>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${isOver ? "bg-gradient-to-r from-red-400 to-rose-500" : isWarning ? "bg-gradient-to-r from-amber-400 to-yellow-500" : "bg-gradient-to-r from-emerald-400 to-green-500"}`}
                    style={{ width: `${Math.min(pct, 100)}%` }}
                  />
                </div>
                <p className="text-[10px] text-gray-400 mt-1">{pct}% utilized · {fmt(Math.max(cb.limit - actual, 0))} remaining</p>
              </div>
            );
          })}
        </div>
      </div>

      {editing && (
        <div className="flex gap-2">
          <button onClick={handleSave} className="px-5 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-emerald-500 to-green-600 rounded-xl hover:shadow-lg transition-all">Save Budget</button>
          <button onClick={() => setEditing(false)} className="px-5 py-2.5 text-sm font-medium text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 transition-all">Cancel</button>
        </div>
      )}
    </div>
  );
};

export default BudgetPlanner;
