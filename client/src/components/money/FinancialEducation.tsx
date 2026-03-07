import React, { useState } from "react";
import { financialTips } from "../../data/moneyData";

const FinancialEducation: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [expandedTip, setExpandedTip] = useState<string | null>(null);

  const categories = ["all", ...Array.from(new Set(financialTips.map((t) => t.category)))];

  const filtered = activeCategory === "all" ? financialTips : financialTips.filter((t) => t.category === activeCategory);

  const categoryColors: Record<string, string> = {
    Budgeting: "from-blue-500 to-indigo-600",
    Saving: "from-emerald-500 to-green-600",
    Investing: "from-purple-500 to-violet-600",
    Tracking: "from-cyan-500 to-teal-600",
    Debt: "from-red-500 to-rose-600",
    Planning: "from-amber-500 to-orange-600",
    Income: "from-pink-500 to-rose-600",
  };

  const resources = [
    { title: "50/30/20 Budget Calculator", description: "Calculate your ideal budget split based on income", icon: "🧮", color: "bg-blue-50 border-blue-100" },
    { title: "Compound Interest Calculator", description: "See how your investments grow over time", icon: "📊", color: "bg-emerald-50 border-emerald-100" },
    { title: "SIP Returns Calculator", description: "Calculate expected returns on systematic investments", icon: "📈", color: "bg-purple-50 border-purple-100" },
    { title: "Emergency Fund Planner", description: "Determine how much you need for emergencies", icon: "🛡️", color: "bg-amber-50 border-amber-100" },
    { title: "Debt Payoff Strategy", description: "Compare avalanche vs snowball debt repayment", icon: "💳", color: "bg-red-50 border-red-100" },
    { title: "Tax Saving Guide", description: "Understand Section 80C, 80D, and other deductions", icon: "📋", color: "bg-cyan-50 border-cyan-100" },
  ];

  const keyPrinciples = [
    { principle: "Spend less than you earn", detail: "The foundation of all financial health. No investment strategy can save you if you consistently overspend." },
    { principle: "Build an emergency fund first", detail: "Before investing, save 3-6 months of expenses. This prevents you from going into debt during unexpected events." },
    { principle: "Avoid high-interest debt", detail: "Credit card debt at 30%+ interest will erode any investment gains. Pay off expensive debt first." },
    { principle: "Start investing early", detail: "Time in the market beats timing the market. Even ₹1,000/month invested early compounds to lakhs." },
    { principle: "Diversify your portfolio", detail: "Don't put all eggs in one basket. Spread across equity, debt, gold, and real estate." },
    { principle: "Review and rebalance quarterly", detail: "Markets change. Review your portfolio allocation every quarter and rebalance if needed." },
  ];

  return (
    <div className="space-y-6">
      {/* Hero */}
      <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-6 text-white">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-3xl">📚</span>
          <div>
            <h2 className="font-bold text-xl">Financial Education</h2>
            <p className="text-white/70 text-sm">Build your financial literacy one concept at a time</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 mt-4">
          <div className="bg-white/10 rounded-xl p-3 text-center backdrop-blur">
            <p className="text-2xl font-bold">{financialTips.length}</p>
            <p className="text-[11px] text-white/70">Tips & Lessons</p>
          </div>
          <div className="bg-white/10 rounded-xl p-3 text-center backdrop-blur">
            <p className="text-2xl font-bold">{categories.length - 1}</p>
            <p className="text-[11px] text-white/70">Categories</p>
          </div>
          <div className="bg-white/10 rounded-xl p-3 text-center backdrop-blur">
            <p className="text-2xl font-bold">{resources.length}</p>
            <p className="text-[11px] text-white/70">Resources</p>
          </div>
        </div>
      </div>

      {/* Key Principles */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <h3 className="text-gray-900 font-bold text-sm mb-4">🏆 Key Financial Principles</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {keyPrinciples.map((p, idx) => (
            <div key={idx} className="p-4 bg-gray-50 rounded-xl hover:shadow-md transition-all">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-6 h-6 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center text-xs font-bold">{idx + 1}</span>
                <p className="text-sm font-semibold text-gray-800">{p.principle}</p>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed">{p.detail}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Tips by Category */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <h3 className="text-gray-900 font-bold text-sm mb-4">💡 Financial Tips</h3>
        <div className="flex gap-1.5 mb-4 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                activeCategory === cat
                  ? "bg-indigo-100 text-indigo-700"
                  : "bg-gray-100 text-gray-500 hover:text-gray-700"
              }`}
            >
              {cat === "all" ? "All" : cat}
            </button>
          ))}
        </div>
        <div className="space-y-2">
          {filtered.map((tip) => {
            const isExpanded = expandedTip === tip.id;
            const gradient = categoryColors[tip.category] || "from-gray-500 to-slate-600";
            return (
              <div
                key={tip.id}
                onClick={() => setExpandedTip(isExpanded ? null : tip.id)}
                className="p-4 rounded-xl border border-gray-100 hover:border-gray-200 hover:shadow-sm cursor-pointer transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white text-lg flex-shrink-0`}>
                    {tip.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold text-gray-800">{tip.title}</p>
                      <span className="text-[10px] px-2 py-0.5 bg-gray-100 text-gray-500 rounded-full ml-2">{tip.category}</span>
                    </div>
                    {isExpanded && (
                      <p className="text-xs text-gray-500 mt-2 leading-relaxed">{tip.description}</p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Resources */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <h3 className="text-gray-900 font-bold text-sm mb-4">🧰 Tools & Resources</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {resources.map((res, idx) => (
            <div key={idx} className={`p-4 rounded-xl border ${res.color} hover:shadow-md transition-all`}>
              <span className="text-2xl">{res.icon}</span>
              <p className="text-sm font-semibold text-gray-800 mt-2">{res.title}</p>
              <p className="text-xs text-gray-500 mt-1">{res.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FinancialEducation;
