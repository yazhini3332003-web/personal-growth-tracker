import React, { useState } from "react";
import { MoneyProvider } from "../context/MoneyContext";
import MoneyDashboard from "../components/money/MoneyDashboard";
import IncomeTracker from "../components/money/IncomeTracker";
import ExpenseTracker from "../components/money/ExpenseTracker";
import BudgetPlanner from "../components/money/BudgetPlanner";
import SavingsGoals from "../components/money/SavingsGoals";
import InvestmentTracker from "../components/money/InvestmentTracker";
import SpendingInsights from "../components/money/SpendingInsights";
import SubscriptionManager from "../components/money/SubscriptionManager";
import FinancialEducation from "../components/money/FinancialEducation";
import AIFinancialAssistant from "../components/money/AIFinancialAssistant";

type ViewMode = "dashboard" | "income" | "expenses" | "budget" | "savings" | "investments" | "insights" | "subscriptions" | "education" | "assistant";

const MoneyManagerContent: React.FC = () => {
  const [view, setView] = useState<ViewMode>("dashboard");

  const navItems: { key: ViewMode; label: string; icon: string }[] = [
    { key: "dashboard", label: "Dashboard", icon: "📊" },
    { key: "income", label: "Income", icon: "💰" },
    { key: "expenses", label: "Expenses", icon: "💸" },
    { key: "budget", label: "Budget", icon: "📋" },
    { key: "savings", label: "Savings", icon: "🎯" },
    { key: "investments", label: "Invest", icon: "📈" },
    { key: "insights", label: "Insights", icon: "💡" },
    { key: "subscriptions", label: "Subs", icon: "🔄" },
    { key: "education", label: "Learn", icon: "📚" },
    { key: "assistant", label: "AI", icon: "🤖" },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
            <span className="text-lg">💰</span>
          </div>
          <div>
            <h1 className="text-gray-900 font-bold text-xl">Money Manager</h1>
            <p className="text-gray-500 text-xs">Track income, expenses, budgets & investments</p>
          </div>
        </div>
        <div className="flex gap-1 bg-gray-100 rounded-xl p-1.5 flex-wrap">
          {navItems.map((item) => (
            <button
              key={item.key}
              onClick={() => setView(item.key)}
              className={`px-2.5 sm:px-3 py-2 rounded-lg text-[11px] sm:text-xs font-medium transition-all flex items-center gap-1 ${
                view === item.key
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <span>{item.icon}</span>
              <span className="hidden sm:inline">{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      {view === "dashboard" && <MoneyDashboard />}
      {view === "income" && <IncomeTracker />}
      {view === "expenses" && <ExpenseTracker />}
      {view === "budget" && <BudgetPlanner />}
      {view === "savings" && <SavingsGoals />}
      {view === "investments" && <InvestmentTracker />}
      {view === "insights" && <SpendingInsights />}
      {view === "subscriptions" && <SubscriptionManager />}
      {view === "education" && <FinancialEducation />}
      {view === "assistant" && <AIFinancialAssistant />}
    </div>
  );
};

const MoneyManager: React.FC = () => {
  return (
    <MoneyProvider>
      <MoneyManagerContent />
    </MoneyProvider>
  );
};

export default MoneyManager;
