import React, { useState } from "react";

type YearPhase = "year1" | "year2" | "year3" | "year5" | "beyond";

const YearlyGrowthSystem: React.FC = () => {
  const [activePhase, setActivePhase] = useState<YearPhase>("year1");

  const phases: Record<YearPhase, {
    icon: string;
    title: string;
    subtitle: string;
    gradient: string;
    bgColor: string;
    theme: string;
    description: string;
    milestones: { icon: string; title: string; detail: string; target: string }[];
    monthlyPlan: { month: string; focus: string }[];
    habits: string[];
    expectedOutcome: string;
    financialSnapshot: { label: string; value: string; icon: string }[];
  }> = {
    year1: {
      icon: "🌱",
      title: "Year 1: Foundation",
      subtitle: "Track, Budget, Save — Build the basics",
      gradient: "from-emerald-500 to-teal-600",
      bgColor: "emerald",
      theme: "Building Awareness & Basic Habits",
      description: "Your first year is about building awareness. You'll learn to track every rupee, create your first budget, and start saving — even if it's small. Don't try to invest yet. Focus on understanding where your money goes.",
      milestones: [
        { icon: "📝", title: "Track every expense for 90 days straight", detail: "Use an app or notebook. Record everything — ₹10 chai to ₹10,000 rent. Awareness is the foundation.", target: "Complete by Month 3" },
        { icon: "📋", title: "Create and follow a monthly budget", detail: "Use 50/30/20 rule. Allocate income to needs, wants, and savings. Review weekly.", target: "Start by Month 2" },
        { icon: "🏦", title: "Save 10% of income consistently", detail: "Auto-transfer on salary day. Even ₹3,000 from ₹30K salary. The habit matters more than the amount.", target: "Monthly from Month 1" },
        { icon: "🛡️", title: "Build a ₹20,000 mini emergency fund", detail: "Not investments — liquid cash for unexpected expenses. This prevents credit card debt.", target: "Complete by Month 6" },
        { icon: "📱", title: "Cancel 2+ unnecessary subscriptions", detail: "Review all recurring payments. Cancel what you don't use weekly.", target: "Complete by Month 1" },
        { icon: "🍳", title: "Reduce food delivery to 2x/week max", detail: "Cooking 5 meals = saving ₹3,000-5,000/month. Meal prep on Sundays.", target: "Build habit by Month 3" },
      ],
      monthlyPlan: [
        { month: "Month 1-2", focus: "Start tracking ALL expenses. Download a tracking app. Record daily." },
        { month: "Month 3-4", focus: "Create first budget using 50/30/20. Identify biggest spending leaks." },
        { month: "Month 5-6", focus: "Auto-save 10% on salary day. Build emergency fund to ₹10K." },
        { month: "Month 7-8", focus: "Refine budget based on 6 months of data. Cut unnecessary expenses." },
        { month: "Month 9-10", focus: "Emergency fund hits ₹20K. Start researching investment basics." },
        { month: "Month 11-12", focus: "Review full year. Calculate total saved. Plan Year 2 goals." },
      ],
      habits: [
        "Log expenses daily — morning or evening, pick a time",
        "Weekly 10-minute budget review every Sunday",
        "Monthly savings transfer on salary day (automate!)",
        "48-hour wait rule before purchases over ₹500",
        "One 'no-spend day' per week to build discipline"
      ],
      expectedOutcome: "By end of Year 1: You know exactly where your money goes, have a working budget, ₹20K+ emergency fund, and the discipline to save consistently. You're in the top 30% of Indians financially.",
      financialSnapshot: [
        { label: "Savings Rate", value: "10-15%", icon: "💰" },
        { label: "Emergency Fund", value: "₹20K+", icon: "🛡️" },
        { label: "Budget Adherence", value: "70%+", icon: "📋" },
        { label: "Tracking Streak", value: "90+ days", icon: "📊" },
      ]
    },
    year2: {
      icon: "🌿",
      title: "Year 2: Growth",
      subtitle: "Emergency fund, optimize, start investing",
      gradient: "from-blue-500 to-indigo-600",
      bgColor: "blue",
      theme: "Strengthening Foundation & First Investments",
      description: "Year 2 is about solidifying your foundation and taking the first step into investing. You'll build a full emergency fund, optimize your budget, and start systematic investments. This is where money starts working for you.",
      milestones: [
        { icon: "🛡️", title: "Build full 3-month emergency fund", detail: "If monthly expenses are ₹25K, target ₹75K in a liquid fund or FD. This is your financial shield.", target: "Complete by Month 6" },
        { icon: "📈", title: "Start first SIP (₹1,000-5,000/month)", detail: "Index fund or balanced fund. Small start, big future. ₹3K/month at 12% = ₹6L in 10 years.", target: "Start by Month 3" },
        { icon: "💰", title: "Increase savings rate to 20%", detail: "From 10% to 20% by reducing expenses and/or increasing income. The extra 10% goes to investments.", target: "Achieve by Month 6" },
        { icon: "💸", title: "Reduce unnecessary expenses by 15%", detail: "Audit every category. Negotiate bills, switch to cheaper plans, batch cook more.", target: "Ongoing" },
        { icon: "📚", title: "Learn about 3+ investment types", detail: "Mutual funds, stocks, FDs, gold, PPF. Understand risk, returns, and time horizons.", target: "By Month 6" },
        { icon: "🎯", title: "Set 2 specific savings goals with deadlines", detail: "Example: ₹1L vacation in 12 months, ₹50K course in 6 months. Goals make saving purposeful.", target: "By Month 2" },
      ],
      monthlyPlan: [
        { month: "Month 1-2", focus: "Optimize Year 1 budget. Set up first SIP. Research investment basics." },
        { month: "Month 3-4", focus: "Emergency fund growing. SIP running. Target specific savings goals." },
        { month: "Month 5-6", focus: "Emergency fund at 3 months. Increase SIP if possible. Review expenses." },
        { month: "Month 7-8", focus: "Explore a second income source. Side hustle or freelance." },
        { month: "Month 9-10", focus: "Portfolio review. Rebalance if needed. Budget is now semi-automatic." },
        { month: "Month 11-12", focus: "Year review: savings rate, investment returns, net worth calculation." },
      ],
      habits: [
        "Monthly SIP running automatically — never skip",
        "Bi-weekly budget review instead of weekly (you're more experienced now)",
        "Quarterly investment portfolio review",
        "Reading one financial article per week",
        "Yearly review and goal-setting for the next year"
      ],
      expectedOutcome: "By end of Year 2: Full emergency fund (3 months expenses), SIP running for 10+ months, savings rate at 20%, basic investment knowledge. You're in the top 15% of Indians financially.",
      financialSnapshot: [
        { label: "Savings Rate", value: "20%+", icon: "💰" },
        { label: "Emergency Fund", value: "3 months", icon: "🛡️" },
        { label: "Investments", value: "₹36K-₹60K", icon: "📈" },
        { label: "Net Worth Growth", value: "+₹1-2L", icon: "📊" },
      ]
    },
    year3: {
      icon: "🌳",
      title: "Year 3: Acceleration",
      subtitle: "Diversify investments, grow income, plan long-term",
      gradient: "from-purple-500 to-violet-600",
      bgColor: "purple",
      theme: "Diversification & Income Growth",
      description: "Year 3 is about acceleration. Your basics are solid. Now you diversify investments, actively work on growing your income, and start serious long-term planning. This is where the compounding effect begins to show.",
      milestones: [
        { icon: "📊", title: "Diversify into 3+ investment types", detail: "Don't keep everything in one fund. Split across equity SIP, PPF/debt, and gold SGB.", target: "By Month 3" },
        { icon: "💼", title: "Grow income by 15-25%", detail: "Negotiate a raise, build a side hustle, upgrade skills for better pay. More income = faster growth.", target: "Ongoing" },
        { icon: "🏠", title: "Start saving for a major goal", detail: "House down payment, car, higher education. Set up a dedicated fund with monthly contributions.", target: "Start by Month 2" },
        { icon: "📋", title: "Understand tax-saving investments", detail: "Section 80C (PPF, ELSS), 80D (health insurance), HRA. Save ₹15,000-₹50,000 on taxes.", target: "By Month 4" },
        { icon: "💰", title: "Increase SIP to ₹5,000-10,000/month", detail: "As income grows, so should investments. Increasing SIP by ₹1,000/year makes massive difference.", target: "By Month 6" },
        { icon: "🛡️", title: "Get proper insurance coverage", detail: "Health insurance (₹5L+ cover) and term life insurance if you have dependents.", target: "By Month 3" },
      ],
      monthlyPlan: [
        { month: "Month 1-2", focus: "Tax planning for current year. Open PPF/ELSS if not done. Review insurances." },
        { month: "Month 3-4", focus: "Diversify investments. Add gold or international fund. Increase SIP." },
        { month: "Month 5-6", focus: "Focus on income growth. Learn a new skill, ask for promotion, start side income." },
        { month: "Month 7-8", focus: "Major goal fund growing. Calculate how much more is needed and timeline." },
        { month: "Month 9-10", focus: "Portfolio review. Check asset allocation. Rebalance if heavily tilted." },
        { month: "Month 11-12", focus: "Net worth calculation. Year-over-year comparison. Set Year 4 goals." },
      ],
      habits: [
        "Monthly portfolio tracking and net worth update",
        "Quarterly rebalancing of investment allocation",
        "Reading/listening to one financial book or podcast per month",
        "Annual tax planning starting in April (not waiting till March)",
        "Networking and skill-building for income growth"
      ],
      expectedOutcome: "By end of Year 3: Diversified portfolio, income growing, emergency fund at 6 months, starting a major savings goal. Total invested: ₹2-4 lakhs. You're building real wealth now.",
      financialSnapshot: [
        { label: "Savings Rate", value: "25-30%", icon: "💰" },
        { label: "Emergency Fund", value: "6 months", icon: "🛡️" },
        { label: "Total Invested", value: "₹2-4L", icon: "📈" },
        { label: "Income Growth", value: "+15-25%", icon: "💼" },
      ]
    },
    year5: {
      icon: "🏔️",
      title: "Year 5: Wealth Building",
      subtitle: "Compounding kicks in, wealth becomes visible",
      gradient: "from-amber-500 to-orange-600",
      bgColor: "amber",
      theme: "Compounding Power & Financial Confidence",
      description: "By Year 5, your habits are automatic, your investments are growing, and compound interest is doing real work. This is when you start feeling financially confident. You move from surviving to thriving.",
      milestones: [
        { icon: "📈", title: "Investment portfolio crosses ₹5-10 lakhs", detail: "5 years of consistent SIPs + returns = visible wealth. Your money is now earning money.", target: "Natural progression" },
        { icon: "🏦", title: "Net worth crosses ₹10-20 lakhs", detail: "Savings + investments + assets. You now have a financial cushion that provides real security.", target: "By end of Year 5" },
        { icon: "💰", title: "Passive income starts showing", detail: "Dividends, interest, potential rental income. Even ₹2,000/month passive = ₹24K/year without working.", target: "Building" },
        { icon: "🎯", title: "One major goal achieved", detail: "Down payment saved, car bought with cash, dream vacation funded. This is what disciplined saving creates.", target: "Year 4-5" },
        { icon: "📊", title: "Savings rate at 30%+ of income", detail: "Budget is optimized, lifestyle is balanced, saving is natural. No more 'where did my money go?'", target: "Sustained" },
        { icon: "🧠", title: "Financial decisions are confident and quick", detail: "You understand risk, know your numbers, and make money decisions without stress or doubt.", target: "Ongoing" },
      ],
      monthlyPlan: [
        { month: "Q1", focus: "Annual review and new goals. Increase all SIPs by market returns + new savings." },
        { month: "Q2", focus: "Mid-year portfolio rebalance. Explore new investment opportunities. Tax planning." },
        { month: "Q3", focus: "Evaluate progress on major goals. Course-correct if behind schedule." },
        { month: "Q4", focus: "Year-end review. Calculate returns. Plan next year strategy." },
      ],
      habits: [
        "Quarterly rather than monthly reviews (system runs itself)",
        "Annual financial planning session each January",
        "Teaching others what you've learned (strengthens your own knowledge)",
        "Staying updated on economic changes affecting your investments",
        "Regular income skill upgrades and career advancement focus"
      ],
      expectedOutcome: "By end of Year 5: ₹10-20L net worth, diversified portfolio, multiple savings goals achieved, financial stress is gone. You've built a system that runs itself.",
      financialSnapshot: [
        { label: "Savings Rate", value: "30%+", icon: "💰" },
        { label: "Portfolio Value", value: "₹5-10L", icon: "📈" },
        { label: "Net Worth", value: "₹10-20L", icon: "🏦" },
        { label: "Passive Income", value: "Starting", icon: "🔄" },
      ]
    },
    beyond: {
      icon: "🏆",
      title: "Year 5+: Financial Freedom",
      subtitle: "Independence, legacy, and life on your terms",
      gradient: "from-rose-500 to-pink-600",
      bgColor: "rose",
      theme: "Financial Independence & Beyond",
      description: "Beyond Year 5, you're not just managing money — you're building financial independence. Your investments compound faster, passive income grows, and you start thinking about legacy and long-term wealth transfer.",
      milestones: [
        { icon: "🏆", title: "Financial independence number identified", detail: "Calculate: Annual expenses × 25 = your FI number. If you spend ₹5L/year, you need ₹1.25 crore invested.", target: "Year 6" },
        { icon: "🏠", title: "Major assets acquired", detail: "Property, significant investments, business ownership. Assets that generate income or appreciate.", target: "Year 7-10" },
        { icon: "📈", title: "Portfolio crosses ₹25L-50L+", detail: "Consistent investing + compounding + income growth. At this stage, your money earns more than your early salary.", target: "Year 8-12" },
        { icon: "💰", title: "Passive income covers 30%+ expenses", detail: "Dividends, rental income, interest. You work because you want to, not because you have to.", target: "Year 10+" },
        { icon: "👨‍👩‍👧", title: "Wealth transfer planning", detail: "Will, nominations, family financial education. Ensure your wealth benefits the next generation.", target: "Year 10+" },
        { icon: "🌍", title: "Give back", detail: "Donate, mentor others, fund causes. Financial success enables generosity. This is the highest use of money.", target: "Ongoing" },
      ],
      monthlyPlan: [
        { month: "Annually", focus: "Comprehensive portfolio review, tax optimization, goal recalibration." },
        { month: "Bi-annually", focus: "Insurance review, estate planning update, family financial check-in." },
        { month: "As needed", focus: "Rebalance portfolio, explore new opportunities, mentor others." },
        { month: "Ongoing", focus: "Enjoy the fruits of discipline. Travel, experiences, giving back." },
      ],
      habits: [
        "Annual comprehensive financial review with a professional if needed",
        "Continuous learning about tax optimization and wealth management",
        "Mentoring family and friends on financial discipline",
        "Regular philanthropy and social impact investments",
        "Enjoying life without financial stress — the ultimate goal"
      ],
      expectedOutcome: "Year 10+: True financial confidence. Your money works harder than you. You choose how to spend your time. Any career change, sabbatical, or dream is financially possible.",
      financialSnapshot: [
        { label: "Net Worth", value: "₹50L-1Cr+", icon: "🏦" },
        { label: "Passive Income", value: "₹5K-20K/mo", icon: "🔄" },
        { label: "Financial Freedom", value: "On track", icon: "🏆" },
        { label: "Life Satisfaction", value: "High", icon: "😊" },
      ]
    }
  };

  const active = phases[activePhase];

  const phaseTabs: { key: YearPhase; icon: string; label: string; year: string }[] = [
    { key: "year1", icon: "🌱", label: "Foundation", year: "Year 1" },
    { key: "year2", icon: "🌿", label: "Growth", year: "Year 2" },
    { key: "year3", icon: "🌳", label: "Acceleration", year: "Year 3" },
    { key: "year5", icon: "🏔️", label: "Wealth", year: "Year 5" },
    { key: "beyond", icon: "🏆", label: "Freedom", year: "5+" },
  ];

  return (
    <div className="space-y-6">
      {/* Hero */}
      <div className="bg-gradient-to-br from-cyan-500 via-blue-500 to-indigo-600 rounded-2xl p-6 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -translate-y-12 translate-x-12" />
        <div className="relative">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">📅</span>
            <div>
              <h2 className="font-bold text-xl">Yearly Financial Growth System</h2>
              <p className="text-white/70 text-sm">A 5-year roadmap from zero to financial freedom</p>
            </div>
          </div>
          <p className="text-white/80 text-sm mt-3 max-w-2xl leading-relaxed">
            Financial growth doesn't happen overnight. This system shows you exactly what to focus on each year — from building basic habits 
            to achieving financial independence. Follow this roadmap and your future self will thank you.
          </p>
        </div>
      </div>

      {/* Timeline Navigation */}
      <div className="bg-white rounded-2xl border border-gray-100 p-4">
        <div className="flex gap-1 flex-wrap">
          {phaseTabs.map((tab, idx) => (
            <button
              key={tab.key}
              onClick={() => setActivePhase(tab.key)}
              className={`flex-1 min-w-[100px] py-3 px-3 rounded-xl text-center transition-all ${
                activePhase === tab.key
                  ? `bg-gradient-to-r ${phases[tab.key].gradient} text-white shadow-lg`
                  : "bg-gray-50 text-gray-500 hover:bg-gray-100"
              }`}
            >
              <span className="text-lg block">{tab.icon}</span>
              <p className="text-[10px] font-bold mt-1">{tab.year}</p>
              <p className="text-[9px] opacity-70">{tab.label}</p>
            </button>
          ))}
        </div>
        {/* Progress bar */}
        <div className="flex gap-1 mt-3">
          {phaseTabs.map((tab, idx) => (
            <div
              key={tab.key}
              className={`flex-1 h-1 rounded-full transition-all ${
                phaseTabs.findIndex(t => t.key === tab.key) <= phaseTabs.findIndex(t => t.key === activePhase)
                  ? `bg-gradient-to-r ${phases[tab.key].gradient}`
                  : "bg-gray-200"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Phase Header */}
      <div className={`bg-gradient-to-r ${active.gradient} rounded-2xl p-6 text-white`}>
        <div className="flex items-center gap-3 mb-3">
          <span className="text-3xl">{active.icon}</span>
          <div>
            <h3 className="font-bold text-lg">{active.title}</h3>
            <p className="text-white/70 text-sm">{active.subtitle}</p>
          </div>
        </div>
        <p className="text-white/80 text-sm leading-relaxed">{active.description}</p>
        <div className="flex items-center gap-2 mt-3">
          <span className="px-2.5 py-1 bg-white/15 rounded-lg text-[11px] font-medium backdrop-blur">🎯 {active.theme}</span>
        </div>
      </div>

      {/* Financial Snapshot */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {active.financialSnapshot.map((item, idx) => (
          <div key={idx} className="bg-white rounded-xl border border-gray-100 p-4 text-center hover:shadow-md transition-all">
            <span className="text-xl">{item.icon}</span>
            <p className={`text-lg font-bold mt-1 bg-gradient-to-r ${active.gradient} bg-clip-text text-transparent`}>{item.value}</p>
            <p className="text-[10px] text-gray-400 mt-0.5">{item.label}</p>
          </div>
        ))}
      </div>

      {/* Milestones */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <h3 className="text-gray-900 font-bold text-sm mb-4">🎯 Key Milestones</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {active.milestones.map((milestone, idx) => (
            <div key={idx} className="p-4 rounded-xl border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all">
              <div className="flex items-start gap-3">
                <span className="text-xl flex-shrink-0">{milestone.icon}</span>
                <div>
                  <p className="text-sm font-semibold text-gray-800">{milestone.title}</p>
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">{milestone.detail}</p>
                  <span className="inline-block mt-2 px-2 py-0.5 text-[10px] font-medium bg-gray-100 text-gray-500 rounded-md">{milestone.target}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Monthly/Quarterly Plan */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <h3 className="text-gray-900 font-bold text-sm mb-4">📅 {activePhase === "year5" || activePhase === "beyond" ? "Quarterly" : "Monthly"} Focus Plan</h3>
        <div className="space-y-2">
          {active.monthlyPlan.map((item, idx) => (
            <div key={idx} className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
              <span className={`px-2 py-1 text-[10px] font-bold rounded-lg bg-gradient-to-r ${active.gradient} text-white flex-shrink-0`}>
                {item.month}
              </span>
              <p className="text-sm text-gray-600 leading-relaxed">{item.focus}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Habits */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <h3 className="text-gray-900 font-bold text-sm mb-4">🔄 Daily/Weekly Habits for This Phase</h3>
        <div className="space-y-2">
          {active.habits.map((habit, idx) => (
            <div key={idx} className="flex items-start gap-3">
              <div className={`w-6 h-6 rounded-full bg-gradient-to-br ${active.gradient} flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0 mt-0.5`}>
                {idx + 1}
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">{habit}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Expected Outcome */}
      <div className={`bg-gradient-to-r ${active.gradient} rounded-2xl p-6 text-white`}>
        <h3 className="font-bold text-sm mb-2">✨ Expected Outcome</h3>
        <p className="text-white/90 text-sm leading-relaxed">{active.expectedOutcome}</p>
      </div>

      {/* Bottom Navigation */}
      <div className="flex items-center justify-between bg-gray-50 rounded-2xl border border-gray-100 p-4">
        <button
          onClick={() => {
            const keys = phaseTabs.map(t => t.key);
            const idx = keys.indexOf(activePhase);
            if (idx > 0) setActivePhase(keys[idx - 1]);
          }}
          className={`px-4 py-2 text-xs font-medium rounded-xl transition-all ${
            activePhase === "year1" ? "text-gray-300 cursor-not-allowed" : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-100"
          }`}
          disabled={activePhase === "year1"}
        >
          ← Previous Phase
        </button>
        <span className="text-xs text-gray-400">
          Phase {phaseTabs.findIndex(t => t.key === activePhase) + 1} of {phaseTabs.length}
        </span>
        <button
          onClick={() => {
            const keys = phaseTabs.map(t => t.key);
            const idx = keys.indexOf(activePhase);
            if (idx < keys.length - 1) setActivePhase(keys[idx + 1]);
          }}
          className={`px-4 py-2 text-xs font-medium rounded-xl transition-all ${
            activePhase === "beyond" ? "text-gray-300 cursor-not-allowed" : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-100"
          }`}
          disabled={activePhase === "beyond"}
        >
          Next Phase →
        </button>
      </div>
    </div>
  );
};

export default YearlyGrowthSystem;
