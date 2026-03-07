import React, { useState } from "react";
import { MoneyProvider } from "../context/MoneyContext";
import MoneyIntroduction from "../components/money/MoneyIntroduction";
import CoreConcepts from "../components/money/CoreConcepts";
import FinancialAwareness from "../components/money/FinancialAwareness";
import MoneyDashboard from "../components/money/MoneyDashboard";
import IncomeTracker from "../components/money/IncomeTracker";
import ExpenseTracker from "../components/money/ExpenseTracker";
import BudgetPlanner from "../components/money/BudgetPlanner";
import SavingsGoals from "../components/money/SavingsGoals";
import InvestmentTracker from "../components/money/InvestmentTracker";
import YearlyGrowthSystem from "../components/money/YearlyGrowthSystem";
import SpendingInsights from "../components/money/SpendingInsights";
import SubscriptionManager from "../components/money/SubscriptionManager";
import FinancialEducation from "../components/money/FinancialEducation";
import AIFinancialAssistant from "../components/money/AIFinancialAssistant";

type ViewMode = "introduction" | "concepts" | "awareness" | "dashboard" | "income" | "expenses" | "budget" | "savings" | "investments" | "growth" | "insights" | "subscriptions" | "education" | "assistant";

interface NavGroup {
  label: string;
  icon: string;
  color: string;
  items: { key: ViewMode; label: string; icon: string }[];
}

const MoneyManagerContent: React.FC = () => {
  const [view, setView] = useState<ViewMode>("introduction");

  const navGroups: NavGroup[] = [
    {
      label: "LEARN",
      icon: "📖",
      color: "text-blue-500",
      items: [
        { key: "introduction", label: "Start Here", icon: "🌱" },
        { key: "concepts", label: "Concepts", icon: "🧩" },
        { key: "awareness", label: "Awareness", icon: "🧠" },
        { key: "education", label: "Library", icon: "📚" },
      ]
    },
    {
      label: "PRACTICE",
      icon: "🎯",
      color: "text-emerald-500",
      items: [
        { key: "dashboard", label: "Dashboard", icon: "📊" },
        { key: "income", label: "Income", icon: "💰" },
        { key: "expenses", label: "Expenses", icon: "💸" },
        { key: "budget", label: "Budget", icon: "📋" },
        { key: "savings", label: "Savings", icon: "🎯" },
        { key: "investments", label: "Invest", icon: "📈" },
      ]
    },
    {
      label: "TOOLS",
      icon: "🔧",
      color: "text-purple-500",
      items: [
        { key: "growth", label: "Growth", icon: "📅" },
        { key: "insights", label: "Insights", icon: "💡" },
        { key: "subscriptions", label: "Subs", icon: "🔄" },
        { key: "assistant", label: "AI Guide", icon: "🤖" },
      ]
    }
  ];

  const allItems = navGroups.flatMap(g => g.items);
  const currentGroup = navGroups.find(g => g.items.some(i => i.key === view));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-100">
            <span className="text-lg">💰</span>
          </div>
          <div>
            <h1 className="text-gray-900 font-bold text-xl">Money Management</h1>
            <p className="text-gray-500 text-xs">Learn → Practice → Grow — Your complete financial journey</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-white rounded-2xl border border-gray-100 p-3">
        <div className="space-y-2">
          {navGroups.map((group) => (
            <div key={group.label}>
              <div className="flex items-center gap-1.5 px-2 mb-1">
                <span className="text-[10px]">{group.icon}</span>
                <span className={`text-[9px] font-bold tracking-wider ${group.color}`}>{group.label}</span>
              </div>
              <div className="flex gap-1 flex-wrap">
                {group.items.map((item) => (
                  <button
                    key={item.key}
                    onClick={() => setView(item.key)}
                    className={`px-2.5 py-1.5 rounded-lg text-[11px] font-medium transition-all flex items-center gap-1 ${
                      view === item.key
                        ? "bg-gray-900 text-white shadow-sm"
                        : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <span className="text-xs">{item.icon}</span>
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Content */}
      {view === "introduction" && <MoneyIntroduction />}
      {view === "concepts" && <CoreConcepts />}
      {view === "awareness" && <FinancialAwareness />}
      {view === "education" && <FinancialEducation />}
      {view === "dashboard" && <MoneyDashboard />}
      {view === "income" && <IncomeTracker />}
      {view === "expenses" && <ExpenseTracker />}
      {view === "budget" && <BudgetPlanner />}
      {view === "savings" && <SavingsGoals />}
      {view === "investments" && <InvestmentTracker />}
      {view === "growth" && <YearlyGrowthSystem />}
      {view === "insights" && <SpendingInsights />}
      {view === "subscriptions" && <SubscriptionManager />}
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
