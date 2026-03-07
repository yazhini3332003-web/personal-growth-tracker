import React, { useState } from "react";

const MoneyIntroduction: React.FC = () => {
  const [expandedSection, setExpandedSection] = useState<string | null>("what");

  const toggleSection = (id: string) => setExpandedSection(expandedSection === id ? null : id);

  const introSections = [
    {
      id: "what",
      icon: "💡",
      title: "What is Money Management?",
      gradient: "from-emerald-500 to-teal-600",
      content: [
        "Money management is the process of understanding how money comes in, how it goes out, and how to make it work for you over time.",
        "It's NOT about being rich. It's about being in control — knowing where every rupee goes and making intentional choices about spending, saving, and growing your money.",
        "Think of it like health: you don't need to be an athlete, but understanding nutrition and exercise keeps you fit. Similarly, understanding money keeps your finances fit.",
        "At its core, money management covers four pillars: Earning → Spending wisely → Saving consistently → Investing for growth."
      ]
    },
    {
      id: "why-struggle",
      icon: "🤔",
      title: "Why Do People Struggle with Money?",
      gradient: "from-red-500 to-rose-600",
      content: [
        "No one teaches us about money in school. We learn math, science, and history — but not how to manage a salary, avoid debt, or build savings.",
        "Lifestyle inflation: When income increases, spending increases even faster. A ₹30K salary feels tight, but so does ₹1L if spending habits don't change.",
        "Impulse spending: Online shopping, food delivery apps, and sales make it easy to spend without thinking. Small daily ₹200 spends add up to ₹6,000/month.",
        "Lack of tracking: Most people have no idea where their money actually goes. Without tracking, you can't improve.",
        "Social pressure: Buying things to keep up with friends or social media creates unnecessary financial stress.",
        "Fear of investing: Money sitting idle in a savings account loses value to inflation every year."
      ]
    },
    {
      id: "why-discipline",
      icon: "⚡",
      title: "Why Financial Discipline Matters",
      gradient: "from-amber-500 to-orange-600",
      content: [
        "Financial discipline means making conscious, planned decisions about your money — every single day. It's the difference between financial stress and financial freedom.",
        "With discipline, ₹5,000/month saved and invested at 12% becomes ₹50+ lakhs in 20 years. Without it, that money disappears into random purchases.",
        "Discipline protects you from emergencies. 70% of Indians don't have an emergency fund. One medical bill or job loss can create years of debt.",
        "It reduces stress. When you know your bills are covered, savings are growing, and future is planned — you sleep better.",
        "Financial discipline isn't about restriction. It's about freedom. The freedom to say 'yes' to things that truly matter because you've said 'no' to things that don't."
      ]
    },
    {
      id: "habits",
      icon: "🔄",
      title: "How Good Habits Improve Your Life",
      gradient: "from-blue-500 to-indigo-600",
      content: [
        "Habit 1 — Track everything: When you record every expense, you naturally start spending less on unnecessary things. Awareness creates change.",
        "Habit 2 — Pay yourself first: Before paying bills or buying things, put money into savings. Even ₹500/month builds the habit.",
        "Habit 3 — The 24-hour rule: Before any purchase over ₹500, wait 24 hours. If you still need it tomorrow, buy it. Most impulses pass.",
        "Habit 4 — Weekly review: Spend 10 minutes every Sunday reviewing your week's spending. Identify patterns and adjust.",
        "Habit 5 — Automate savings: Set up auto-transfers to savings/investment accounts on salary day. What you don't see, you don't spend.",
        "These habits compound over time. In year 1, you'll save a little. By year 3, you'll have an emergency fund. By year 5, actual wealth."
      ]
    },
    {
      id: "not-rich",
      icon: "🌱",
      title: "It's Not About Being Rich",
      gradient: "from-purple-500 to-violet-600",
      content: [
        "Money management is often confused with making a lot of money. That's a myth. It's about making the most of whatever you have.",
        "A person earning ₹25,000/month who saves ₹5,000 is financially healthier than someone earning ₹1,00,000 who spends ₹1,05,000.",
        "What matters: Understanding your income sources | Controlling where money goes | Building an emergency safety net | Having a plan for the future.",
        "You don't need complex strategies. Start with the basics: track, budget, save, then invest. This section will teach you all of it, step by step.",
        "Remember: Every financial expert started as a beginner. The best time to start was yesterday. The second best time is now."
      ]
    }
  ];

  const quickFacts = [
    { stat: "76%", desc: "of Indians don't track monthly expenses", color: "from-red-500 to-rose-600" },
    { stat: "70%", desc: "don't have a 3-month emergency fund", color: "from-amber-500 to-orange-600" },
    { stat: "₹200", desc: "daily saved = ₹6,000/month = ₹72,000/year", color: "from-emerald-500 to-teal-600" },
    { stat: "12%", desc: "average annual return on Indian equity markets", color: "from-blue-500 to-indigo-600" },
  ];

  const journeySteps = [
    { step: 1, label: "Learn Basics", desc: "Understand income, expenses, savings, investments", icon: "📖", color: "bg-blue-50 border-blue-200 text-blue-700" },
    { step: 2, label: "Build Awareness", desc: "Needs vs wants, budgeting mindset, avoiding debt", icon: "🧠", color: "bg-purple-50 border-purple-200 text-purple-700" },
    { step: 3, label: "Start Practicing", desc: "Track expenses, create budget, set savings goals", icon: "🎯", color: "bg-emerald-50 border-emerald-200 text-emerald-700" },
    { step: 4, label: "Grow & Invest", desc: "Build emergency fund, start investing, plan for future", icon: "📈", color: "bg-amber-50 border-amber-200 text-amber-700" },
    { step: 5, label: "Master & Review", desc: "AI insights, yearly growth tracking, financial freedom", icon: "🏆", color: "bg-rose-50 border-rose-200 text-rose-700" },
  ];

  return (
    <div className="space-y-6">
      {/* Hero Banner */}
      <div className="bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-600 rounded-2xl p-6 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -translate-y-12 translate-x-12" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-8 -translate-x-8" />
        <div className="relative">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-4xl">🌱</span>
            <div>
              <h2 className="font-bold text-2xl">Welcome to Money Management</h2>
              <p className="text-white/70 text-sm mt-1">Your journey from zero to financial confidence starts here</p>
            </div>
          </div>
          <p className="text-white/80 text-sm leading-relaxed mt-4 max-w-2xl">
            This is not a boring finance course. This is a practical, step-by-step guide that will teach you how to understand money, 
            control your spending, build savings, and eventually grow your wealth — no matter how much you earn right now.
          </p>
          <div className="mt-5 flex items-center gap-3 flex-wrap">
            <span className="px-3 py-1.5 bg-white/15 rounded-lg text-xs font-medium backdrop-blur">📖 Start from zero</span>
            <span className="px-3 py-1.5 bg-white/15 rounded-lg text-xs font-medium backdrop-blur">🎯 Learn by doing</span>
            <span className="px-3 py-1.5 bg-white/15 rounded-lg text-xs font-medium backdrop-blur">📈 Grow over time</span>
            <span className="px-3 py-1.5 bg-white/15 rounded-lg text-xs font-medium backdrop-blur">🤖 AI-guided</span>
          </div>
        </div>
      </div>

      {/* Quick Facts */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {quickFacts.map((fact, idx) => (
          <div key={idx} className="bg-white rounded-xl border border-gray-100 p-4 hover:shadow-md transition-all">
            <p className={`text-2xl font-bold bg-gradient-to-r ${fact.color} bg-clip-text text-transparent`}>{fact.stat}</p>
            <p className="text-[11px] text-gray-500 mt-1 leading-relaxed">{fact.desc}</p>
          </div>
        ))}
      </div>

      {/* Your Learning Journey */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <h3 className="text-gray-900 font-bold text-sm mb-5">🗺️ Your Learning Journey</h3>
        <div className="relative">
          {/* Connection line */}
          <div className="absolute top-6 left-6 right-6 h-0.5 bg-gradient-to-r from-blue-200 via-purple-200 via-emerald-200 via-amber-200 to-rose-200 hidden lg:block" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {journeySteps.map((s) => (
              <div key={s.step} className={`relative p-4 rounded-xl border ${s.color} text-center`}>
                <div className="w-10 h-10 mx-auto rounded-full bg-white border-2 border-current flex items-center justify-center text-lg mb-2 relative z-10">
                  {s.icon}
                </div>
                <p className="text-xs font-bold mb-1">Step {s.step}: {s.label}</p>
                <p className="text-[10px] opacity-70 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Sections */}
      <div className="space-y-3">
        {introSections.map((section) => {
          const isExpanded = expandedSection === section.id;
          return (
            <div key={section.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-sm transition-all">
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full flex items-center gap-3 p-5 text-left"
              >
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${section.gradient} flex items-center justify-center text-white text-lg flex-shrink-0`}>
                  {section.icon}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-800">{section.title}</p>
                  <p className="text-[11px] text-gray-400 mt-0.5">Click to {isExpanded ? "collapse" : "expand"}</p>
                </div>
                <span className={`text-gray-400 transition-transform ${isExpanded ? "rotate-180" : ""}`}>▼</span>
              </button>
              {isExpanded && (
                <div className="px-5 pb-5 space-y-3">
                  {section.content.map((paragraph, idx) => (
                    <div key={idx} className="flex gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0 mt-1.5" />
                      <p className="text-sm text-gray-600 leading-relaxed">{paragraph}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom CTA */}
      <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl border border-emerald-100 p-6 text-center">
        <span className="text-3xl">🚀</span>
        <h3 className="text-gray-900 font-bold text-base mt-3">Ready to Learn?</h3>
        <p className="text-gray-500 text-sm mt-2 max-w-lg mx-auto">
          Start with <strong>Core Concepts</strong> to understand the four pillars of money management. 
          Then move to <strong>Financial Awareness</strong> to build the right mindset. 
          After that, you'll be ready to practice with real tools!
        </p>
        <div className="flex items-center justify-center gap-2 mt-4">
          <span className="text-xs text-gray-400">Next:</span>
          <span className="px-3 py-1.5 bg-emerald-100 text-emerald-700 text-xs font-medium rounded-lg">Core Concepts →</span>
        </div>
      </div>
    </div>
  );
};

export default MoneyIntroduction;
