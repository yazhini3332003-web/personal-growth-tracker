import React, { useState } from "react";

type ConceptTab = "income" | "expenses" | "savings" | "investments";

const CoreConcepts: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ConceptTab>("income");
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  const concepts: Record<ConceptTab, {
    icon: string;
    title: string;
    gradient: string;
    bgGradient: string;
    tagline: string;
    definition: string;
    keyMessage: string;
    types: { name: string; icon: string; description: string; example: string }[];
    tips: string[];
    commonMistakes: string[];
    realWorldExample: { scenario: string; good: string; bad: string };
  }> = {
    income: {
      icon: "💰",
      title: "Income",
      gradient: "from-emerald-500 to-teal-600",
      bgGradient: "from-emerald-50 to-teal-50",
      tagline: "Money that flows INTO your life",
      definition: "Income is any money you receive — from your job, freelance work, business, investments, or any other source. It's the starting point of all financial planning.",
      keyMessage: "The goal isn't just to earn more, but to build multiple income streams so you're never dependent on a single source.",
      types: [
        { name: "Salary Income", icon: "🏢", description: "Regular monthly pay from your employer. Most reliable but limited by hours and role.", example: "₹35,000/month from a software job" },
        { name: "Freelance Income", icon: "💻", description: "Money earned from independent projects. Flexible but variable month to month.", example: "₹15,000/month from weekend web design projects" },
        { name: "Business Income", icon: "🏪", description: "Revenue from running your own business. Scalable but requires investment and risk.", example: "₹50,000/month from a small online store" },
        { name: "Investment Returns", icon: "📈", description: "Money your investments earn — dividends, interest, capital gains. Passive but takes time to build.", example: "₹3,000/month from mutual fund SIP dividends" },
        { name: "Passive Income", icon: "🔄", description: "Income that requires little daily effort — rental income, royalties, digital products.", example: "₹8,000/month from a rented property" },
        { name: "Side Hustle Income", icon: "⚡", description: "Extra earnings from skills or hobbies outside your main job. Great for building savings.", example: "₹5,000/month from tutoring or content creation" },
      ],
      tips: [
        "Never rely on a single income source — job loss happens",
        "Even ₹5,000/month from a side income changes your financial picture",
        "Negotiate your salary every year — even 10% more compounds hugely",
        "Turn a skill or hobby into income: teaching, writing, designing",
        "Track ALL income, not just salary. Cashbacks, gifts, tax refunds count"
      ],
      commonMistakes: [
        "Thinking salary is the only income — there are 6+ income types",
        "Not tracking irregular income (bonuses, gifts, cashbacks)",
        "Spending a raise instead of saving/investing the difference",
        "Not building emergency income alternatives"
      ],
      realWorldExample: {
        scenario: "Priya earns ₹40,000/month salary",
        good: "She does freelance ₹10K + earns ₹2K from FD interest. Even if she loses her job, she has backup income and savings to survive 6 months.",
        bad: "She only depends on salary. A sudden layoff means zero income and credit card debt within 2 months."
      }
    },
    expenses: {
      icon: "💸",
      title: "Expenses",
      gradient: "from-red-500 to-rose-600",
      bgGradient: "from-red-50 to-rose-50",
      tagline: "Money that flows OUT of your life",
      definition: "Expenses are everything you spend money on — from rent and food to subscriptions and shopping. Understanding where your money goes is the first step to controlling it.",
      keyMessage: "The problem is never how much you earn. It's how much you spend without realizing it. Track every rupee.",
      types: [
        { name: "Housing & Rent", icon: "🏠", description: "Your biggest fixed expense. Should ideally be under 30% of income.", example: "₹12,000/month rent in a shared apartment" },
        { name: "Food & Groceries", icon: "🍕", description: "Daily meals, groceries, eating out, food delivery. Often the most underestimated expense.", example: "₹8,000/month including ₹3,000 on Zomato/Swiggy" },
        { name: "Transport", icon: "🚗", description: "Fuel, public transport, ride-hailing, vehicle EMI. Can add up quickly.", example: "₹3,000/month for metro + occasional Uber" },
        { name: "Bills & Utilities", icon: "📱", description: "Electricity, internet, phone, water, gas — recurring monthly necessities.", example: "₹4,000/month for phone + internet + electricity" },
        { name: "Shopping & Lifestyle", icon: "🛍️", description: "Clothes, gadgets, accessories, home items. The biggest 'leak' in most budgets.", example: "₹5,000/month on Amazon/Flipkart purchases" },
        { name: "Subscriptions", icon: "🔄", description: "Netflix, Spotify, gym, apps. Small amounts that quietly drain thousands yearly.", example: "₹2,000/month across 8 different subscriptions" },
        { name: "Healthcare", icon: "🏥", description: "Medicines, doctor visits, insurance premiums. Often ignored until emergency strikes.", example: "₹1,500/month for insurance + occasional visits" },
        { name: "Entertainment", icon: "🎬", description: "Movies, restaurants, outings, events, hobbies. Important for well-being but needs limits.", example: "₹3,000/month on weekends and outings" },
      ],
      tips: [
        "Use the 50/30/20 rule: 50% needs, 30% wants, 20% savings",
        "Track EVERY expense for 30 days — you'll be shocked where money goes",
        "Cooking vs ordering: ₹150/meal × 30 = ₹4,500 saved/month by cooking",
        "Review subscriptions monthly — cancel what you don't use weekly",
        "Wait 24 hours before any purchase over ₹500 to avoid impulse buys"
      ],
      commonMistakes: [
        "Not tracking small daily expenses (₹100 chai × 30 days = ₹3,000)",
        "Emotional spending when stressed, bored, or celebrating",
        "Confusing 'sale price' with 'saving money' — you still spent money",
        "Keeping subscriptions you forgot about or rarely use"
      ],
      realWorldExample: {
        scenario: "Rahul earns ₹50,000/month",
        good: "He tracks expenses in an app, cooks 5 days/week, has a ₹15K fun budget. Saves ₹12,000/month consistently.",
        bad: "He doesn't track, orders food daily (₹400 × 30 = ₹12,000), has 10 unused subscriptions (₹3,000). Left with ₹0 savings."
      }
    },
    savings: {
      icon: "🏦",
      title: "Savings",
      gradient: "from-blue-500 to-indigo-600",
      bgGradient: "from-blue-50 to-indigo-50",
      tagline: "Money you keep for YOURSELF",
      definition: "Savings is money you deliberately set aside from your income — not spent, not invested, just safely stored for when you need it. It's your financial safety net.",
      keyMessage: "Save BEFORE you spend, not after. If you save what's left after spending, you'll never save. If you spend what's left after saving, you'll always have something.",
      types: [
        { name: "Emergency Fund", icon: "🛡️", description: "3-6 months of expenses saved for unexpected events — job loss, medical emergency, urgent repairs.", example: "₹1,50,000 saved in a liquid fund for emergencies" },
        { name: "Short-term Savings", icon: "🎯", description: "Money saved for goals within 1-2 years — vacation, new phone, course fees.", example: "₹5,000/month saved for a ₹30K vacation in 6 months" },
        { name: "Long-term Savings", icon: "🏔️", description: "Large goals 3-10 years away — house down payment, marriage, higher education.", example: "₹10,000/month for 5 years = ₹6+ lakhs home down payment" },
        { name: "Retirement Savings", icon: "👴", description: "Money for when you stop working. Start early — even small amounts compound massively over 30 years.", example: "₹3,000/month from age 25 = ₹1+ crore by age 55" },
        { name: "Opportunity Fund", icon: "⚡", description: "Money set aside for unexpected opportunities — a good deal, a business idea, a course.", example: "₹25,000 kept liquid for chance opportunities" },
      ],
      tips: [
        "Follow the Pay Yourself First rule — save on salary day, not month end",
        "Start with 10% of income. Increase by 1% every quarter",
        "Keep emergency fund in a liquid fund or FD, not savings account",
        "Automate savings: set up auto-transfer on salary day",
        "Never touch your emergency fund for non-emergencies"
      ],
      commonMistakes: [
        "Saving what's left after spending (instead of spending what's left after saving)",
        "No separate emergency fund — mixing all goals into one account",
        "Breaking savings for wants disguised as needs",
        "Keeping large amounts in savings account earning 3% (inflation is 6-7%)"
      ],
      realWorldExample: {
        scenario: "Anita earns ₹35,000/month",
        good: "Auto-saves ₹7,000 on salary day (20%). Has ₹1,00,000 emergency fund after 14 months. Sleeps stress-free.",
        bad: "Saves 'whatever is left' — usually ₹0-₹2,000. Zero emergency fund. A ₹15,000 medical bill goes on credit card at 36% interest."
      }
    },
    investments: {
      icon: "📈",
      title: "Investments",
      gradient: "from-purple-500 to-violet-600",
      bgGradient: "from-purple-50 to-violet-50",
      tagline: "Money that GROWS while you sleep",
      definition: "Investing is putting your money into assets that grow in value over time — stocks, mutual funds, gold, real estate. It's how you beat inflation and build real wealth.",
      keyMessage: "Saving preserves money. Investing grows money. ₹1,000/month invested at 12% becomes ₹35 lakhs in 25 years. In a savings account at 4%, the same becomes just ₹5 lakhs.",
      types: [
        { name: "Mutual Funds (SIP)", icon: "📊", description: "Professionally managed funds that invest in stocks/bonds. SIP lets you invest small amounts monthly. Best for beginners.", example: "₹5,000/month SIP in an index fund at ~12% returns" },
        { name: "Stocks / Equity", icon: "📉", description: "Buying ownership shares in companies. Higher risk but higher potential returns over 5+ years.", example: "Investing ₹10,000 in Reliance, Infosys, HDFC shares" },
        { name: "Fixed Deposits (FD)", icon: "🏦", description: "Guaranteed returns from banks. Safe but low returns (6-7%). Good for emergency fund parking.", example: "₹50,000 in a 1-year FD at 7% = ₹53,500" },
        { name: "Gold", icon: "🥇", description: "Physical gold, gold ETFs, or sovereign gold bonds. Stable long-term hedge against inflation.", example: "₹2,000/month in Sovereign Gold Bonds" },
        { name: "Real Estate", icon: "🏗️", description: "Property investment. Requires large capital but provides rental income + appreciation. Long-term play.", example: "Buying a ₹30L property that grows to ₹50L in 10 years" },
        { name: "PPF / NPS", icon: "🇮🇳", description: "Government-backed retirement schemes. Tax benefits + guaranteed returns. 15-year+ lock-in for PPF.", example: "₹12,500/month in PPF = ₹1.5L tax deduction under 80C" },
      ],
      tips: [
        "Start with SIP in an index fund — simplest and most effective for beginners",
        "Rule of 72: Divide 72 by return rate to know doubling time (72/12 = 6 years)",
        "Never invest emergency fund money — that should always be liquid",
        "Don't try to time the market — invest regularly regardless of ups/downs",
        "Diversify: Don't put all money in one type — split across equity, debt, gold"
      ],
      commonMistakes: [
        "Waiting to 'have enough money' to start investing. SIP starts at ₹500/month",
        "Panic selling when market drops — markets always recover over time",
        "Investing without understanding. Learn basics before putting money in",
        "Ignoring tax implications — short-term gains are taxed differently than long-term"
      ],
      realWorldExample: {
        scenario: "Kiran starts investing ₹5,000/month at age 23",
        good: "At 12% average returns, by age 45 she has ₹50+ lakhs. By 55, over ₹1.5 crore. Compound interest did the heavy lifting.",
        bad: "She waits until 35 to start. Same amount, same returns — by 55, only ₹50 lakhs. Waiting 12 years cost her ₹1 crore."
      }
    }
  };

  const active = concepts[activeTab];

  const tabs: { key: ConceptTab; label: string; icon: string; color: string }[] = [
    { key: "income", label: "Income", icon: "💰", color: "emerald" },
    { key: "expenses", label: "Expenses", icon: "💸", color: "red" },
    { key: "savings", label: "Savings", icon: "🏦", color: "blue" },
    { key: "investments", label: "Investments", icon: "📈", color: "purple" },
  ];

  return (
    <div className="space-y-6">
      {/* Hero */}
      <div className="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-2xl p-6 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-10 translate-x-10" />
        <div className="relative">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">🧩</span>
            <div>
              <h2 className="font-bold text-xl">Core Money Concepts</h2>
              <p className="text-white/70 text-sm">The 4 pillars every person must understand</p>
            </div>
          </div>
          <p className="text-white/80 text-sm mt-3 max-w-2xl leading-relaxed">
            Before you start tracking or investing money, you need to understand WHAT these things mean and HOW they work. 
            Master these four concepts and you'll understand 90% of personal finance.
          </p>
        </div>
      </div>

      {/* 4 Pillar Tabs */}
      <div className="flex gap-2 flex-wrap">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => { setActiveTab(tab.key); setExpandedCard(null); }}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
              activeTab === tab.key
                ? `bg-gradient-to-r ${concepts[tab.key].gradient} text-white shadow-lg shadow-${tab.color}-200`
                : "bg-white border border-gray-200 text-gray-600 hover:border-gray-300"
            }`}
          >
            <span className="text-base">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Active Concept Content */}
      <div className="space-y-4">
        {/* Definition Card */}
        <div className={`bg-gradient-to-r ${active.bgGradient} rounded-2xl border border-gray-100 p-6`}>
          <div className="flex items-start gap-3">
            <span className="text-3xl">{active.icon}</span>
            <div>
              <h3 className="text-gray-900 font-bold text-lg">{active.title}: {active.tagline}</h3>
              <p className="text-gray-600 text-sm mt-2 leading-relaxed">{active.definition}</p>
              <div className="mt-3 p-3 bg-white/60 rounded-xl border border-white">
                <p className="text-xs font-semibold text-gray-700">💡 Key Insight:</p>
                <p className="text-sm text-gray-600 mt-1">{active.keyMessage}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Types Grid */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h3 className="text-gray-900 font-bold text-sm mb-4">📋 Types of {active.title}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {active.types.map((type) => {
              const isExpanded = expandedCard === type.name;
              return (
                <div
                  key={type.name}
                  onClick={() => setExpandedCard(isExpanded ? null : type.name)}
                  className="p-4 rounded-xl border border-gray-100 hover:border-gray-200 hover:shadow-sm cursor-pointer transition-all"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl">{type.icon}</span>
                    <p className="text-sm font-semibold text-gray-800">{type.name}</p>
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed">{type.description}</p>
                  {isExpanded && (
                    <div className="mt-2 p-2 bg-gray-50 rounded-lg">
                      <p className="text-[11px] text-gray-400 font-medium">Example:</p>
                      <p className="text-xs text-gray-600">{type.example}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Tips + Mistakes side by side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Tips */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <h3 className="text-gray-900 font-bold text-sm mb-3">✅ Smart Tips</h3>
            <div className="space-y-2">
              {active.tips.map((tip, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5">{idx + 1}</span>
                  <p className="text-xs text-gray-600 leading-relaxed">{tip}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Common Mistakes */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <h3 className="text-gray-900 font-bold text-sm mb-3">❌ Common Mistakes</h3>
            <div className="space-y-2">
              {active.commonMistakes.map((mistake, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5">!</span>
                  <p className="text-xs text-gray-600 leading-relaxed">{mistake}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Real World Example */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h3 className="text-gray-900 font-bold text-sm mb-3">🎬 Real-World Example</h3>
          <p className="text-sm text-gray-700 font-medium mb-3">{active.realWorldExample.scenario}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-100">
              <p className="text-xs font-bold text-emerald-700 mb-1">✅ Smart Approach</p>
              <p className="text-xs text-gray-600 leading-relaxed">{active.realWorldExample.good}</p>
            </div>
            <div className="p-4 rounded-xl bg-red-50 border border-red-100">
              <p className="text-xs font-bold text-red-600 mb-1">❌ Poor Approach</p>
              <p className="text-xs text-gray-600 leading-relaxed">{active.realWorldExample.bad}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl border border-indigo-100 p-5 text-center">
        <p className="text-xs text-gray-500">You've learned {tabs.findIndex(t => t.key === activeTab) + 1} of 4 core concepts</p>
        <div className="flex items-center justify-center gap-2 mt-2">
          {tabs.map((tab) => (
            <div
              key={tab.key}
              className={`w-12 h-1.5 rounded-full transition-all ${
                tabs.findIndex(t => t.key === tab.key) <= tabs.findIndex(t => t.key === activeTab)
                  ? `bg-gradient-to-r ${concepts[tab.key].gradient}`
                  : "bg-gray-200"
              }`}
            />
          ))}
        </div>
        <p className="text-xs text-gray-400 mt-2">Next: Financial Awareness →</p>
      </div>
    </div>
  );
};

export default CoreConcepts;
