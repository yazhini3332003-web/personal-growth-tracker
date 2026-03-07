import React from "react";
import { useMoneyContext } from "../../context/MoneyContext";
import { expenseCategoryConfig, incomeCategoryConfig } from "../../data/moneyData";

const MoneyDashboard: React.FC = () => {
  const { incomes, expenses, savingsGoals, investments, subscriptions, getStats } = useMoneyContext();
  const stats = getStats();

  const months = ["2026-01", "2026-02", "2026-03"];
  const monthLabels = ["Jan", "Feb", "Mar"];
  const monthlyData = months.map((m) => {
    const inc = incomes.filter((i) => i.date.startsWith(m)).reduce((s, i) => s + i.amount, 0);
    const exp = expenses.filter((e) => e.date.startsWith(m)).reduce((s, e) => s + e.amount, 0);
    return { income: inc, expenses: exp };
  });
  const maxBar = Math.max(...monthlyData.flatMap((d) => [d.income, d.expenses]), 1);

  // Expense by category
  const categoryTotals: Record<string, number> = {};
  expenses.forEach((e) => {
    categoryTotals[e.category] = (categoryTotals[e.category] || 0) + e.amount;
  });
  const topCategories = Object.entries(categoryTotals)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);
  const maxCat = Math.max(...topCategories.map((c) => c[1]), 1);

  // Income by source
  const sourceTotals: Record<string, number> = {};
  incomes.forEach((i) => {
    sourceTotals[i.category] = (sourceTotals[i.category] || 0) + i.amount;
  });
  const topSources = Object.entries(sourceTotals).sort((a, b) => b[1] - a[1]);

  const totalInvested = investments.reduce((s, i) => s + i.investedAmount, 0);
  const totalCurrentValue = investments.reduce((s, i) => s + i.currentValue, 0);
  const investmentGain = totalCurrentValue - totalInvested;

  const activeSubs = subscriptions.filter((s) => s.active);
  const monthlySubs = activeSubs.reduce((s, sub) => s + (sub.billingCycle === "monthly" ? sub.amount : sub.amount / 12), 0);

  const savingsProgress = savingsGoals.reduce((s, g) => s + g.currentAmount, 0);
  const savingsTarget = savingsGoals.reduce((s, g) => s + g.targetAmount, 0);

  const fmt = (n: number) => {
    if (n >= 100000) return `₹${(n / 100000).toFixed(1)}L`;
    if (n >= 1000) return `₹${(n / 1000).toFixed(1)}K`;
    return `₹${n.toLocaleString("en-IN")}`;
  };

  const statCards = [
    { label: "Total Income", value: fmt(stats.totalIncome), sub: `This month: ${fmt(stats.monthlyIncome)}`, icon: "💰", gradient: "from-emerald-500 to-green-600" },
    { label: "Total Expenses", value: fmt(stats.totalExpenses), sub: `This month: ${fmt(stats.monthlyExpenses)}`, icon: "💸", gradient: "from-red-500 to-rose-600" },
    { label: "Net Balance", value: fmt(stats.netBalance), sub: `Savings rate: ${stats.totalIncome > 0 ? Math.round(((stats.totalIncome - stats.totalExpenses) / stats.totalIncome) * 100) : 0}%`, icon: "📊", gradient: "from-blue-500 to-indigo-600" },
    { label: "Investments", value: fmt(stats.totalInvestments), sub: `Gain: ${fmt(investmentGain)} (${totalInvested > 0 ? ((investmentGain / totalInvested) * 100).toFixed(1) : 0}%)`, icon: "📈", gradient: "from-purple-500 to-violet-600" },
  ];

  return (
    <div className="space-y-6">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card) => (
          <div key={card.label} className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-lg transition-all">
            <div className="flex items-center justify-between mb-3">
              <span className="text-2xl">{card.icon}</span>
              <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${card.gradient} opacity-20`} />
            </div>
            <p className="text-gray-500 text-xs font-medium">{card.label}</p>
            <p className="text-gray-900 text-2xl font-bold mt-1">{card.value}</p>
            <p className="text-gray-400 text-[11px] mt-1">{card.sub}</p>
          </div>
        ))}
      </div>

      {/* Monthly Trend + Expense Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Trend */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h3 className="text-gray-900 font-bold text-sm mb-4">Monthly Trend</h3>
          <div className="space-y-4">
            {monthLabels.map((label, idx) => (
              <div key={label}>
                <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                  <span>{label} 2026</span>
                  <span>Income: {fmt(monthlyData[idx].income)} | Expenses: {fmt(monthlyData[idx].expenses)}</span>
                </div>
                <div className="space-y-1">
                  <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-400 to-green-500 rounded-full transition-all"
                      style={{ width: `${(monthlyData[idx].income / maxBar) * 100}%` }}
                    />
                  </div>
                  <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-red-400 to-rose-500 rounded-full transition-all"
                      style={{ width: `${(monthlyData[idx].expenses / maxBar) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
            <div className="flex items-center gap-4 pt-2">
              <div className="flex items-center gap-1.5 text-[11px] text-gray-500"><div className="w-3 h-3 rounded-full bg-gradient-to-r from-emerald-400 to-green-500" /> Income</div>
              <div className="flex items-center gap-1.5 text-[11px] text-gray-500"><div className="w-3 h-3 rounded-full bg-gradient-to-r from-red-400 to-rose-500" /> Expenses</div>
            </div>
          </div>
        </div>

        {/* Top Expense Categories */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h3 className="text-gray-900 font-bold text-sm mb-4">Top Spending Categories</h3>
          <div className="space-y-3">
            {topCategories.map(([cat, amount]) => {
              const cfg = expenseCategoryConfig[cat] || { label: cat, icon: "📦", color: "bg-gray-100 text-gray-700" };
              return (
                <div key={cat} className="flex items-center gap-3">
                  <span className="text-lg w-6 text-center">{cfg.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-gray-700 font-medium">{cfg.label}</span>
                      <span className="text-gray-500">{fmt(amount)}</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full"
                        style={{ width: `${(amount / maxCat) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Income Sources + Savings + Quick Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Income Sources */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h3 className="text-gray-900 font-bold text-sm mb-4">Income Sources</h3>
          <div className="space-y-3">
            {topSources.map(([src, amount]) => {
              const cfg = incomeCategoryConfig[src] || { label: src, icon: "💰", color: "from-gray-500 to-slate-600" };
              return (
                <div key={src} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-base">{cfg.icon}</span>
                    <span className="text-xs text-gray-700 font-medium">{cfg.label}</span>
                  </div>
                  <span className="text-xs text-gray-900 font-semibold">{fmt(amount)}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Savings Progress */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h3 className="text-gray-900 font-bold text-sm mb-3">Savings Goals</h3>
          <div className="text-center mb-4">
            <p className="text-2xl font-bold text-gray-900">{fmt(savingsProgress)}</p>
            <p className="text-[11px] text-gray-400">of {fmt(savingsTarget)} target</p>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden mt-2">
              <div className="h-full bg-gradient-to-r from-emerald-400 to-green-500 rounded-full" style={{ width: `${(savingsProgress / savingsTarget) * 100}%` }} />
            </div>
          </div>
          <div className="space-y-2">
            {savingsGoals.slice(0, 3).map((g) => (
              <div key={g.id} className="flex items-center justify-between text-xs">
                <span className="text-gray-600">{g.icon} {g.name}</span>
                <span className="text-gray-900 font-medium">{Math.round((g.currentAmount / g.targetAmount) * 100)}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h3 className="text-gray-900 font-bold text-sm mb-3">Quick Stats</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-amber-50 rounded-xl">
              <div className="flex items-center gap-2 text-xs text-amber-700">
                <span>🔄</span>
                <span>Monthly Subscriptions</span>
              </div>
              <span className="text-xs font-bold text-amber-800">{fmt(Math.round(monthlySubs))}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-xl">
              <div className="flex items-center gap-2 text-xs text-blue-700">
                <span>📊</span>
                <span>Active Investments</span>
              </div>
              <span className="text-xs font-bold text-blue-800">{investments.length}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-xl">
              <div className="flex items-center gap-2 text-xs text-green-700">
                <span>🎯</span>
                <span>Savings Goals</span>
              </div>
              <span className="text-xs font-bold text-green-800">{savingsGoals.length} active</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-purple-50 rounded-xl">
              <div className="flex items-center gap-2 text-xs text-purple-700">
                <span>📅</span>
                <span>Recent Transactions</span>
              </div>
              <span className="text-xs font-bold text-purple-800">{incomes.length + expenses.length}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoneyDashboard;
