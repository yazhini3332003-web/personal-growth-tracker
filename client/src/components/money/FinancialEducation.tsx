import React, { useState } from "react";
import { financialTips } from "../../data/moneyData";

type LibrarySection = "principles" | "tips" | "guides" | "resources" | "books";

const FinancialEducation: React.FC = () => {
  const [activeSection, setActiveSection] = useState<LibrarySection>("principles");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [expandedTip, setExpandedTip] = useState<string | null>(null);
  const [expandedGuide, setExpandedGuide] = useState<string | null>(null);

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
    { title: "Net Worth Calculator", description: "Track assets minus liabilities for your true financial picture", icon: "🏦", color: "bg-indigo-50 border-indigo-100" },
    { title: "Inflation Impact Tool", description: "See how inflation erodes your savings purchasing power", icon: "📉", color: "bg-rose-50 border-rose-100" },
    { title: "Retirement Corpus Calculator", description: "Find out how much you need for retirement at any age", icon: "👴", color: "bg-teal-50 border-teal-100" },
  ];

  const keyPrinciples = [
    { principle: "Spend less than you earn", detail: "The foundation of all financial health. No investment strategy can save you if you consistently overspend. Even a ₹500 surplus each month means you're moving forward.", icon: "📉" },
    { principle: "Build an emergency fund first", detail: "Before investing, save 3-6 months of expenses. This prevents you from going into debt during unexpected events like job loss, medical bills, or repairs.", icon: "🛡️" },
    { principle: "Avoid high-interest debt", detail: "Credit card debt at 30%+ interest will erode any investment gains. Pay off expensive debt first. A ₹1L credit card balance costs you ₹3,000+/month in interest alone.", icon: "⚠️" },
    { principle: "Start investing early", detail: "Time in the market beats timing the market. ₹5,000/month invested at 12% from age 25 = ₹3.2 crore by 55. Starting at 35 = only ₹95 lakhs. 10 years cost you ₹2+ crore.", icon: "⏰" },
    { principle: "Diversify your portfolio", detail: "Don't put all eggs in one basket. Spread across equity (growth), debt (stability), gold (hedge), and real estate. When one falls, others protect you.", icon: "🥚" },
    { principle: "Review and rebalance quarterly", detail: "Markets change. Review your portfolio allocation every quarter and rebalance if needed. An unmonitored portfolio drifts from your risk profile.", icon: "🔄" },
    { principle: "Pay yourself first", detail: "On salary day, auto-transfer savings BEFORE spending. If you wait to save what's left, there's never anything left.", icon: "💰" },
    { principle: "Understand the difference between price and value", detail: "A ₹50,000 course that doubles your salary is cheap. A ₹500 gadget you never use is expensive. Value is what you get, price is what you pay.", icon: "💡" },
    { principle: "Insurance is non-negotiable", detail: "Health insurance (₹5L+ cover) protects your savings from one hospital visit. Term insurance protects your family. Don't skip this.", icon: "🏥" },
    { principle: "Inflation is the silent wealth destroyer", detail: "₹1 lakh today will buy only ₹50K worth of goods in 10 years at 7% inflation. Money in a savings account at 4% actually loses value every year.", icon: "📊" },
  ];

  const deepGuides = [
    {
      id: "emergency",
      icon: "🛡️",
      title: "Complete Guide to Emergency Fund",
      gradient: "from-emerald-500 to-teal-600",
      sections: [
        { subtitle: "How much do you need?", content: "Calculate your monthly essential expenses (rent + food + transport + bills + insurance). Multiply by 3 for minimum, 6 for comfortable. If expenses are ₹25K/month, target ₹75K-₹1.5L." },
        { subtitle: "Where to keep it", content: "NOT in savings account (3.5% interest < 7% inflation). Use liquid mutual funds (5-6% returns, withdraw in 24 hours) or a short-term FD. Keep 1 month in savings for immediate access." },
        { subtitle: "How to build it", content: "Start with ₹2,000/month auto-transfer. In 12 months, you have ₹24K + interest. Increase to ₹5K when possible. It takes 12-24 months — that's okay. Consistency wins." },
        { subtitle: "When to use it", content: "ONLY for actual emergencies: job loss, medical emergency, urgent home repair. NOT for sales, vacations, or 'good deals'. If you use it, rebuild it immediately." },
      ]
    },
    {
      id: "budgeting-deep",
      icon: "📋",
      title: "Budgeting Mastery: From Beginner to Pro",
      gradient: "from-blue-500 to-indigo-600",
      sections: [
        { subtitle: "Level 1: Track everything for 30 days", content: "Don't budget yet. Just record every expense for a month. Use an app, spreadsheet, or paper. This reveals where money actually goes vs where you think it goes." },
        { subtitle: "Level 2: Apply 50/30/20", content: "After tracking, apply the rule. 50% needs, 30% wants, 20% savings. If your numbers are 65/30/5, you see the gap. Slowly shift 5% per month toward the target." },
        { subtitle: "Level 3: Zero-based budget", content: "Assign every rupee a job. Income - all planned categories = ₹0. This eliminates 'miscellaneous' — the category where money disappears. Review weekly." },
        { subtitle: "Level 4: Automated system", content: "Auto-transfers on salary day: savings, investments, bill payments. Only discretionary spending requires active management. You've built a financial autopilot." },
      ]
    },
    {
      id: "investing-basics",
      icon: "📈",
      title: "Investing Basics for Absolute Beginners",
      gradient: "from-purple-500 to-violet-600",
      sections: [
        { subtitle: "When to start investing", content: "After: 1) No high-interest debt 2) Emergency fund of 1-3 months 3) Basic insurance. You don't need to be debt-free — paying off a low-interest education loan while investing is fine." },
        { subtitle: "Start with SIP in index fund", content: "A Nifty 50 index fund tracks India's top 50 companies. Returns average 12% over 10+ years. Start with ₹500-5,000/month SIP. No stock picking needed." },
        { subtitle: "Understand risk = time", content: "Equity is risky for 1 year but safe for 10 years. Average returns: FD (7%), gold (8%), equity (12%), real estate (8-10%). Choose based on when you need the money." },
        { subtitle: "Tax-efficient investing", content: "ELSS funds give 80C tax benefit + equity returns. PPF gives guaranteed 7.1% + tax-free. EPF is already working for salaried people. Use all tax-saving options before general investing." },
      ]
    },
    {
      id: "common-mistakes",
      icon: "❌",
      title: "Top 15 Money Mistakes to Avoid",
      gradient: "from-red-500 to-rose-600",
      sections: [
        { subtitle: "Spending mistakes", content: "1) Not tracking expenses (flying blind) 2) Lifestyle inflation with every raise 3) Impulse purchasing triggered by sales/social media 4) Eating out daily instead of cooking 5) Keeping unused subscriptions active" },
        { subtitle: "Saving mistakes", content: "6) Saving what's left instead of budgeting savings first 7) No separate emergency fund 8) Keeping large amounts in savings account earning 3% 9) Dipping into savings for non-emergencies 10) No clear savings goals" },
        { subtitle: "Investment mistakes", content: "11) Waiting for the 'right time' to invest — just start 12) Panic selling when markets drop 13) Putting all money in one investment type 14) Investing without understanding the product 15) Ignoring inflation — ₹1L today = ₹50K in 10 years" },
      ]
    },
    {
      id: "wealth-planning",
      icon: "🏗️",
      title: "Long-term Wealth Building Strategy",
      gradient: "from-amber-500 to-orange-600",
      sections: [
        { subtitle: "The wealth equation", content: "Wealth = (Income - Expenses) × Time × Returns. You can improve any variable. Earn more, spend less, invest longer, get better returns. Most people only focus on income — work on all four." },
        { subtitle: "Power of compounding", content: "₹10K/month at 12% for 30 years = ₹3.5 crore. For 20 years = ₹1 crore. For 10 years = ₹23 lakhs. The last 10 years earned ₹2.5 crore — that's compounding. Start early." },
        { subtitle: "Income growth strategy", content: "Skill upgrades every 2 years. Negotiate salary annually. Build a side income stream. Career changes for 30-50% jumps. Income growth is the most powerful wealth accelerator." },
        { subtitle: "Your target number", content: "Financial independence = Annual expenses × 25. If you spend ₹6L/year, you need ₹1.5 crore invested. The 4% withdrawal rule would sustain you indefinitely." },
      ]
    },
  ];

  const books = [
    { title: "The Psychology of Money", author: "Morgan Housel", description: "Wealth isn't about intelligence — it's about behavior. 19 short stories about money and life.", icon: "🧠", level: "Beginner" },
    { title: "Rich Dad Poor Dad", author: "Robert Kiyosaki", description: "Assets vs liabilities, financial education, and why working for money isn't enough.", icon: "💰", level: "Beginner" },
    { title: "Let's Talk Money", author: "Monika Halan", description: "India-specific personal finance guide. Insurance, investments, and financial planning.", icon: "🇮🇳", level: "Beginner" },
    { title: "The Intelligent Investor", author: "Benjamin Graham", description: "The bible of value investing. Teaches patience, discipline, and market psychology.", icon: "📊", level: "Intermediate" },
    { title: "I Will Teach You to Be Rich", author: "Ramit Sethi", description: "Practical 6-week system for automating your finances and building wealth.", icon: "🎯", level: "Beginner" },
    { title: "Coffee Can Investing", author: "Saurabh Mukherjea", description: "India-focused long-term investing philosophy. Buy quality, hold forever.", icon: "☕", level: "Intermediate" },
    { title: "The Richest Man in Babylon", author: "George Clason", description: "Ancient wisdom about saving, investing, and building wealth. Simple but powerful.", icon: "🏛️", level: "Beginner" },
    { title: "Atomic Habits", author: "James Clear", description: "Not strictly finance, but the habit-building system applies perfectly to money habits.", icon: "⚡", level: "Beginner" },
  ];

  const sectionTabs: { key: LibrarySection; label: string; icon: string }[] = [
    { key: "principles", label: "Principles", icon: "🏆" },
    { key: "tips", label: "Tips", icon: "💡" },
    { key: "guides", label: "Deep Guides", icon: "📖" },
    { key: "resources", label: "Tools", icon: "🧰" },
    { key: "books", label: "Books", icon: "📚" },
  ];

  return (
    <div className="space-y-6">
      {/* Hero */}
      <div className="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-2xl p-6 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-10 translate-x-10" />
        <div className="relative">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-3xl">📚</span>
            <div>
              <h2 className="font-bold text-xl">Financial Education Library</h2>
              <p className="text-white/70 text-sm">Continuously grow your financial knowledge</p>
            </div>
          </div>
          <p className="text-white/80 text-sm mt-2 leading-relaxed max-w-2xl">
            Financial literacy is a lifelong journey. This library contains principles, practical tips, in-depth guides, 
            tools, and recommended reading to help you make better money decisions every day.
          </p>
          <div className="grid grid-cols-4 gap-3 mt-4">
            <div className="bg-white/10 rounded-xl p-2.5 text-center backdrop-blur">
              <p className="text-xl font-bold">{keyPrinciples.length}</p>
              <p className="text-[10px] text-white/70">Principles</p>
            </div>
            <div className="bg-white/10 rounded-xl p-2.5 text-center backdrop-blur">
              <p className="text-xl font-bold">{financialTips.length}</p>
              <p className="text-[10px] text-white/70">Tips</p>
            </div>
            <div className="bg-white/10 rounded-xl p-2.5 text-center backdrop-blur">
              <p className="text-xl font-bold">{deepGuides.length}</p>
              <p className="text-[10px] text-white/70">Guides</p>
            </div>
            <div className="bg-white/10 rounded-xl p-2.5 text-center backdrop-blur">
              <p className="text-xl font-bold">{books.length}</p>
              <p className="text-[10px] text-white/70">Books</p>
            </div>
          </div>
        </div>
      </div>

      {/* Section Tabs */}
      <div className="flex gap-1.5 flex-wrap">
        {sectionTabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveSection(tab.key)}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium transition-all ${
              activeSection === tab.key
                ? "bg-indigo-100 text-indigo-700 shadow-sm"
                : "bg-gray-100 text-gray-500 hover:text-gray-700"
            }`}
          >
            <span>{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Principles Section */}
      {activeSection === "principles" && (
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h3 className="text-gray-900 font-bold text-sm mb-4">🏆 10 Key Financial Principles</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {keyPrinciples.map((p, idx) => (
              <div key={idx} className="p-4 bg-gray-50 rounded-xl hover:shadow-md transition-all">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">{p.icon}</span>
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center text-[10px] font-bold">{idx + 1}</span>
                    <p className="text-sm font-semibold text-gray-800">{p.principle}</p>
                  </div>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed ml-7">{p.detail}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tips Section */}
      {activeSection === "tips" && (
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h3 className="text-gray-900 font-bold text-sm mb-4">💡 Financial Tips by Category</h3>
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
      )}

      {/* Deep Guides Section */}
      {activeSection === "guides" && (
        <div className="space-y-3">
          {deepGuides.map((guide) => {
            const isExpanded = expandedGuide === guide.id;
            return (
              <div key={guide.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                <button
                  onClick={() => setExpandedGuide(isExpanded ? null : guide.id)}
                  className="w-full flex items-center gap-3 p-5 text-left"
                >
                  <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${guide.gradient} flex items-center justify-center text-white text-xl flex-shrink-0`}>
                    {guide.icon}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-800">{guide.title}</p>
                    <p className="text-[11px] text-gray-400 mt-0.5">{guide.sections.length} sections</p>
                  </div>
                  <span className={`text-gray-400 transition-transform ${isExpanded ? "rotate-180" : ""}`}>▼</span>
                </button>
                {isExpanded && (
                  <div className="px-5 pb-5 space-y-3">
                    {guide.sections.map((section, idx) => (
                      <div key={idx} className="p-4 bg-gray-50 rounded-xl">
                        <p className="text-sm font-semibold text-gray-700 mb-2">{section.subtitle}</p>
                        <p className="text-xs text-gray-500 leading-relaxed">{section.content}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Resources Section */}
      {activeSection === "resources" && (
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h3 className="text-gray-900 font-bold text-sm mb-4">🧰 Financial Tools & Calculators</h3>
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
      )}

      {/* Books Section */}
      {activeSection === "books" && (
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h3 className="text-gray-900 font-bold text-sm mb-4">📚 Recommended Reading</h3>
          <p className="text-xs text-gray-500 mb-4">These books will transform how you think about money. Start with any beginner book.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {books.map((book, idx) => (
              <div key={idx} className="p-4 rounded-xl border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all">
                <div className="flex items-start gap-3">
                  <span className="text-2xl flex-shrink-0">{book.icon}</span>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold text-gray-800">{book.title}</p>
                      <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-medium ${
                        book.level === "Beginner" ? "bg-emerald-100 text-emerald-700" : "bg-purple-100 text-purple-700"
                      }`}>{book.level}</span>
                    </div>
                    <p className="text-[11px] text-gray-400 mt-0.5">by {book.author}</p>
                    <p className="text-xs text-gray-500 mt-1 leading-relaxed">{book.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FinancialEducation;
