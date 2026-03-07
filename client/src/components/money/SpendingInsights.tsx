import React from "react";
import { useMoneyContext } from "../../context/MoneyContext";
import { expenseCategoryConfig, incomeCategoryConfig } from "../../data/moneyData";

const SpendingInsights: React.FC = () => {
  const { incomes, expenses, budget, subscriptions } = useMoneyContext();

  const fmt = (n: number) => {
    if (n >= 100000) return `₹${(n / 100000).toFixed(1)}L`;
    if (n >= 1000) return `₹${(n / 1000).toFixed(1)}K`;
    return `₹${n.toLocaleString("en-IN")}`;
  };

  const totalIncome = incomes.reduce((s, i) => s + i.amount, 0);
  const totalExpenses = expenses.reduce((s, e) => s + e.amount, 0);
  const savingsRate = totalIncome > 0 ? Math.round(((totalIncome - totalExpenses) / totalIncome) * 100) : 0;

  // Monthly comparison
  const months = ["2026-01", "2026-02", "2026-03"];
  const monthNames = ["January", "February", "March"];
  const monthlyData = months.map((m) => ({
    income: incomes.filter((i) => i.date.startsWith(m)).reduce((s, i) => s + i.amount, 0),
    expenses: expenses.filter((e) => e.date.startsWith(m)).reduce((s, e) => s + e.amount, 0),
  }));

  // Category spending analysis
  const catTotals: Record<string, number> = {};
  expenses.forEach((e) => { catTotals[e.category] = (catTotals[e.category] || 0) + e.amount; });
  const sortedCats = Object.entries(catTotals).sort((a, b) => b[1] - a[1]);
  const topCategory = sortedCats[0];

  // Recurring vs One-time
  const recurringExpenses = expenses.filter((e) => e.recurring).reduce((s, e) => s + e.amount, 0);
  const oneTimeExpenses = expenses.filter((e) => !e.recurring).reduce((s, e) => s + e.amount, 0);

  // Budget adherence
  const monthExpenses = expenses.filter((e) => e.date.startsWith(budget.month));
  const actualByCategory: Record<string, number> = {};
  monthExpenses.forEach((e) => { actualByCategory[e.category] = (actualByCategory[e.category] || 0) + e.amount; });
  const overBudgetCategories = budget.categoryBudgets.filter((cb) => (actualByCategory[cb.category] || 0) > cb.limit);

  // Subscription cost
  const activeSubs = subscriptions.filter((s) => s.active);
  const monthlySubCost = activeSubs.reduce((s, sub) => s + (sub.billingCycle === "monthly" ? sub.amount : sub.amount / 12), 0);
  const yearlySubCost = monthlySubCost * 12;

  // Income diversification
  const incomeByCategory: Record<string, number> = {};
  incomes.forEach((i) => { incomeByCategory[i.category] = (incomeByCategory[i.category] || 0) + i.amount; });
  const topIncome = Object.entries(incomeByCategory).sort((a, b) => b[1] - a[1])[0];
  const incomeDependency = topIncome && totalIncome > 0 ? Math.round((topIncome[1] / totalIncome) * 100) : 0;

  // Generate insights
  const insights: { icon: string; title: string; description: string; type: "good" | "warning" | "tip" }[] = [];

  if (savingsRate >= 20) {
    insights.push({ icon: "🎉", title: "Great Savings Rate!", description: `You're saving ${savingsRate}% of your income. That's above the recommended 20%!`, type: "good" });
  } else if (savingsRate > 0) {
    insights.push({ icon: "⚠️", title: "Savings Below Target", description: `Your savings rate is ${savingsRate}%. Try to aim for at least 20% by cutting discretionary spending.`, type: "warning" });
  }

  if (topCategory) {
    const cfg = expenseCategoryConfig[topCategory[0]];
    insights.push({
      icon: cfg?.icon || "📊",
      title: `Biggest Expense: ${cfg?.label || topCategory[0]}`,
      description: `${cfg?.label} accounts for ${totalExpenses > 0 ? Math.round((topCategory[1] / totalExpenses) * 100) : 0}% of your total spending (${fmt(topCategory[1])}).`,
      type: "tip",
    });
  }

  if (overBudgetCategories.length > 0) {
    insights.push({
      icon: "🚨",
      title: `${overBudgetCategories.length} Categories Over Budget`,
      description: `${overBudgetCategories.map((c) => expenseCategoryConfig[c.category]?.label).join(", ")} exceeded their budget limits this month.`,
      type: "warning",
    });
  }

  if (incomeDependency > 70 && topIncome) {
    const cfg = incomeCategoryConfig[topIncome[0]];
    insights.push({
      icon: "⚡",
      title: "High Income Concentration",
      description: `${incomeDependency}% of your income comes from ${cfg?.label || topIncome[0]}. Consider diversifying your income streams.`,
      type: "warning",
    });
  }

  if (yearlySubCost > 0) {
    insights.push({
      icon: "🔄",
      title: `Subscriptions Cost ${fmt(Math.round(yearlySubCost))}/year`,
      description: `You spend ${fmt(Math.round(monthlySubCost))}/month on ${activeSubs.length} active subscriptions. Review if all are necessary.`,
      type: "tip",
    });
  }

  if (recurringExpenses > oneTimeExpenses) {
    insights.push({
      icon: "📌",
      title: "High Fixed Costs",
      description: `${Math.round((recurringExpenses / totalExpenses) * 100)}% of expenses are recurring. Look for ways to negotiate or reduce fixed costs.`,
      type: "tip",
    });
  }

  if (monthlyData.length >= 2) {
    const latest = monthlyData[monthlyData.length - 1].expenses;
    const prev = monthlyData[monthlyData.length - 2].expenses;
    if (prev > 0) {
      const change = Math.round(((latest - prev) / prev) * 100);
      if (change > 10) {
        insights.push({ icon: "📈", title: "Spending Increased", description: `Your expenses went up ${change}% from ${monthNames[monthlyData.length - 2]} to ${monthNames[monthlyData.length - 1]}.`, type: "warning" });
      } else if (change < -10) {
        insights.push({ icon: "📉", title: "Spending Decreased!", description: `Great job! Your expenses dropped ${Math.abs(change)}% from ${monthNames[monthlyData.length - 2]} to ${monthNames[monthlyData.length - 1]}.`, type: "good" });
      }
    }
  }

  const typeColors = { good: "border-green-200 bg-green-50", warning: "border-amber-200 bg-amber-50", tip: "border-blue-200 bg-blue-50" };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl border border-gray-100 p-5 text-center">
          <p className="text-[11px] text-gray-500 font-medium">Savings Rate</p>
          <p className={`text-3xl font-bold mt-1 ${savingsRate >= 20 ? "text-emerald-600" : "text-amber-600"}`}>{savingsRate}%</p>
          <p className="text-[10px] text-gray-400">Target: 20%+</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-5 text-center">
          <p className="text-[11px] text-gray-500 font-medium">Recurring Costs</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">{fmt(recurringExpenses)}</p>
          <p className="text-[10px] text-gray-400">{totalExpenses > 0 ? Math.round((recurringExpenses / totalExpenses) * 100) : 0}% of total</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-5 text-center">
          <p className="text-[11px] text-gray-500 font-medium">Income Sources</p>
          <p className="text-3xl font-bold text-blue-600 mt-1">{Object.keys(incomeByCategory).length}</p>
          <p className="text-[10px] text-gray-400">{incomeDependency}% from top source</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-5 text-center">
          <p className="text-[11px] text-gray-500 font-medium">Budget Compliance</p>
          <p className={`text-3xl font-bold mt-1 ${overBudgetCategories.length === 0 ? "text-emerald-600" : "text-red-600"}`}>
            {budget.categoryBudgets.length - overBudgetCategories.length}/{budget.categoryBudgets.length}
          </p>
          <p className="text-[10px] text-gray-400">Categories within budget</p>
        </div>
      </div>

      {/* Insights */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <h3 className="text-gray-900 font-bold text-sm mb-4">💡 Smart Insights</h3>
        <div className="space-y-3">
          {insights.map((insight, idx) => (
            <div key={idx} className={`p-4 rounded-xl border ${typeColors[insight.type]}`}>
              <div className="flex items-start gap-3">
                <span className="text-xl mt-0.5">{insight.icon}</span>
                <div>
                  <p className="text-sm font-semibold text-gray-800">{insight.title}</p>
                  <p className="text-xs text-gray-600 mt-0.5">{insight.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Monthly Comparison */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <h3 className="text-gray-900 font-bold text-sm mb-4">Monthly Comparison</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="text-gray-500 border-b border-gray-100">
                <th className="text-left py-2 font-medium">Month</th>
                <th className="text-right py-2 font-medium">Income</th>
                <th className="text-right py-2 font-medium">Expenses</th>
                <th className="text-right py-2 font-medium">Savings</th>
                <th className="text-right py-2 font-medium">Rate</th>
              </tr>
            </thead>
            <tbody>
              {monthNames.map((name, idx) => {
                const d = monthlyData[idx];
                const savings = d.income - d.expenses;
                const rate = d.income > 0 ? Math.round((savings / d.income) * 100) : 0;
                return (
                  <tr key={name} className="border-b border-gray-50">
                    <td className="py-3 font-medium text-gray-800">{name}</td>
                    <td className="py-3 text-right text-emerald-600 font-medium">{fmt(d.income)}</td>
                    <td className="py-3 text-right text-red-600 font-medium">{fmt(d.expenses)}</td>
                    <td className={`py-3 text-right font-medium ${savings >= 0 ? "text-blue-600" : "text-red-600"}`}>{fmt(savings)}</td>
                    <td className={`py-3 text-right font-semibold ${rate >= 20 ? "text-emerald-600" : rate > 0 ? "text-amber-600" : "text-red-600"}`}>{rate}%</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Category Ranking */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <h3 className="text-gray-900 font-bold text-sm mb-4">Spending Ranking</h3>
        <div className="space-y-2">
          {sortedCats.map(([cat, amount], idx) => {
            const cfg = expenseCategoryConfig[cat] || { label: cat, icon: "📦", color: "bg-gray-100 text-gray-700" };
            const pct = totalExpenses > 0 ? Math.round((amount / totalExpenses) * 100) : 0;
            return (
              <div key={cat} className="flex items-center gap-3 p-2">
                <span className="w-6 text-center text-sm font-bold text-gray-300">#{idx + 1}</span>
                <span className="text-lg">{cfg.icon}</span>
                <div className="flex-1">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-gray-700 font-medium">{cfg.label}</span>
                    <span className="text-gray-500">{fmt(amount)} ({pct}%)</span>
                  </div>
                  <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SpendingInsights;
