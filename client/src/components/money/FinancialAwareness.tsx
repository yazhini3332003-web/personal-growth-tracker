import React, { useState } from "react";

type AwarenessSection = "needs-wants" | "budgeting" | "debt" | "discipline";

const FinancialAwareness: React.FC = () => {
  const [activeSection, setActiveSection] = useState<AwarenessSection>("needs-wants");
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const sections: Record<AwarenessSection, {
    icon: string;
    title: string;
    gradient: string;
    subtitle: string;
    lessons: { title: string; icon: string; points: string[] }[];
    actionSteps: string[];
  }> = {
    "needs-wants": {
      icon: "⚖️",
      title: "Needs vs Wants",
      gradient: "from-blue-500 to-indigo-600",
      subtitle: "The most important financial skill: knowing the difference",
      lessons: [
        {
          title: "What are Needs?",
          icon: "🏠",
          points: [
            "Things required for survival and basic quality of life",
            "Food, shelter, healthcare, basic clothing, transport to work",
            "If you can't function without it, it's a need",
            "Needs should consume about 50% of your income (50/30/20 rule)",
            "Even needs can be expensive — choosing a ₹15K rent over ₹25K is still smart budgeting"
          ]
        },
        {
          title: "What are Wants?",
          icon: "🛍️",
          points: [
            "Things that improve quality of life but aren't essential for survival",
            "Eating out, latest phone upgrade, streaming subscriptions, branded clothes",
            "The tricky part: your brain disguises wants as needs to justify spending",
            "'I need new shoes' vs 'I need ₹5,000 designer shoes' — the need is shoes, the want is designer",
            "Wants should be around 30% of income, not more"
          ]
        },
        {
          title: "The Gray Zone",
          icon: "🔍",
          points: [
            "Internet: Need for work, but a ₹2,000/month plan when ₹500 works = want portion",
            "Phone: Basic phone is a need, latest iPhone is a want — the excess is discretionary spending",
            "Food: Groceries are a need, daily Zomato orders are a want",
            "Transport: Getting to work is a need, Uber everywhere instead of metro is a want",
            "Ask: Would a simpler/cheaper version meet the actual need?"
          ]
        }
      ],
      actionSteps: [
        "Before any purchase, ask: 'Would I survive without this?' — if yes, it's a want",
        "Create two lists: monthly needs and monthly wants. Compare the totals",
        "Apply the 48-hour rule on all wants over ₹1,000",
        "Track how much of your spending is needs vs wants for one month",
        "Set a 'fun budget' for wants — enjoy guilt-free within that limit"
      ]
    },
    budgeting: {
      icon: "📋",
      title: "Why Budgeting Changes Everything",
      gradient: "from-emerald-500 to-teal-600",
      subtitle: "A budget isn't a restriction — it's permission to spend guilt-free",
      lessons: [
        {
          title: "What is a Budget?",
          icon: "📝",
          points: [
            "A budget is a plan for your money — telling every rupee where to go BEFORE spending",
            "Without a budget, money controls you. With a budget, you control money",
            "It's not about cutting all fun — it's about making room for what matters",
            "A simple budget: Income - Savings = Your spending limit for the month",
            "If you earn ₹40K and save ₹8K first, you have ₹32K to spend — that's your real budget"
          ]
        },
        {
          title: "The 50/30/20 Rule",
          icon: "📊",
          points: [
            "50% for Needs — rent, groceries, bills, commute, insurance, healthcare",
            "30% for Wants — dining out, entertainment, shopping, subscriptions, hobbies",
            "20% for Savings/Investments — emergency fund, SIPs, FDs, goals",
            "Example: ₹40,000 income → ₹20K needs, ₹12K wants, ₹8K savings",
            "Adjust percentages to your situation — 40/20/40 is even better if you can manage"
          ]
        },
        {
          title: "Zero-Based Budgeting",
          icon: "🎯",
          points: [
            "Every rupee gets a job — income minus all planned spending = zero",
            "₹40,000 income: ₹12K rent + ₹8K food + ₹4K bills + ₹6K wants + ₹10K savings = ₹0 left",
            "No 'miscellaneous' category — that's where money leaks happen",
            "If unexpected expenses come up, it borrows from another category, not from thin air",
            "Review and recreate every month — your budget is a living document"
          ]
        },
        {
          title: "Why People Fail at Budgeting",
          icon: "⚠️",
          points: [
            "Making it too restrictive — ₹0 for fun is unsustainable",
            "Not tracking actual spending — a budget without tracking is just a wish list",
            "Giving up after one bad month — consistency matters more than perfection",
            "Not budgeting for irregular expenses — annual insurance, festivals, gifts",
            "Solution: Start simple, track weekly, adjust monthly, be kind to yourself"
          ]
        }
      ],
      actionSteps: [
        "Write down your take-home income and every single recurring expense",
        "Apply 50/30/20 rule to your income and see where you currently stand",
        "Create a simple monthly budget — even on paper or a Google Sheet",
        "Track daily for the first week to build the habit before automating",
        "Review spending vs budget every Sunday — 10 minutes is enough"
      ]
    },
    debt: {
      icon: "⚠️",
      title: "Avoiding Unnecessary Debt",
      gradient: "from-red-500 to-rose-600",
      subtitle: "Debt is the heaviest weight on your financial journey",
      lessons: [
        {
          title: "Good Debt vs Bad Debt",
          icon: "📐",
          points: [
            "Good debt: Helps you earn more or build assets — education loan, home loan, business loan",
            "Bad debt: Funds consumption that loses value — credit card debt, personal loans for gadgets",
            "Test: Will this debt put money in my pocket in the future? If no, it's bad debt",
            "A ₹5L education loan that helps you earn ₹5L/year salary is good debt",
            "A ₹50K credit card bill for shopping is bad debt — the items lose value immediately"
          ]
        },
        {
          title: "The Credit Card Trap",
          icon: "💳",
          points: [
            "Credit cards charge 24-42% annual interest on unpaid balances — that's insanely expensive",
            "Minimum payment trap: Paying ₹2,000 minimum on a ₹50K balance means 3+ years to clear",
            "₹50,000 at 36% interest with minimum payments → you'll pay ₹30,000+ in interest alone",
            "Rule: If you can't pay the full bill this month, you can't afford the purchase",
            "Use credit cards for convenience and rewards, NEVER for spending beyond your means"
          ]
        },
        {
          title: "EMI Culture",
          icon: "📱",
          points: [
            "No-cost EMI sounds free but often includes hidden costs or locks you into purchases",
            "Multiple EMIs add up: ₹3K phone + ₹2K laptop + ₹5K TV = ₹10K/month already committed",
            "EMIs reduce your future spending power — that ₹10K/month is gone for 12-24 months",
            "Before EMI, ask: Can I save and buy this in 3 months instead?",
            "If the item will lose 50% value in a year, it's not worth financing"
          ]
        },
        {
          title: "How to Get Out of Debt",
          icon: "🚪",
          points: [
            "List all debts: amount, interest rate, minimum payment. Face the reality",
            "Avalanche method: Pay off highest interest rate first, minimum on everything else",
            "Snowball method: Pay off smallest balance first for psychological wins",
            "Stop adding new debt immediately — cut the cards if you have to",
            "Redirect all savings to debt repayment until cleared, then rebuild savings"
          ]
        }
      ],
      actionSteps: [
        "List all current debts, interest rates, and monthly payments in one place",
        "Check if any subscriptions or EMIs can be cancelled right now",
        "If you have credit card debt, create a payoff plan using avalanche method",
        "Set a personal rule: No purchases over ₹2,000 on credit unless paid in full",
        "Build a ₹10,000 mini emergency fund to stop using credit cards for emergencies"
      ]
    },
    discipline: {
      icon: "🧠",
      title: "Building Financial Discipline",
      gradient: "from-amber-500 to-orange-600",
      subtitle: "The bridge between knowing and doing — habits that stick",
      lessons: [
        {
          title: "Mindset Shift",
          icon: "💭",
          points: [
            "Stop thinking 'I can't afford fun things' → Start thinking 'I choose where my money goes'",
            "Rich mindset isn't about income — it's about the gap between earning and spending",
            "A ₹25K earner who saves ₹5K is wealthier in habits than a ₹1L earner with ₹0 savings",
            "Money is a tool, not a score. Use it intentionally, not emotionally",
            "Financial discipline is self-care — you're protecting future you"
          ]
        },
        {
          title: "Daily Money Habits",
          icon: "📅",
          points: [
            "Morning: Quick glance at yesterday's spending (30 seconds)",
            "Before spending: Ask 'Is this in my budget?' (5 seconds)",
            "Evening: Log any cash/UPI spending you haven't tracked (1 minute)",
            "Weekend: Review weekly spending vs budget, adjust plans (10 minutes)",
            "Monthly: Full review — income, expenses, savings, investments progress (30 minutes)"
          ]
        },
        {
          title: "Psychological Tricks That Work",
          icon: "🧪",
          points: [
            "The envelope method: Put cash in category envelopes. When it's gone, stop spending",
            "24-hour rule: Sleep on any purchase over ₹500. 80% of impulses die overnight",
            "Visual progress: Track savings growth with a chart. Seeing progress motivates more saving",
            "Accountability partner: Share your financial goals with a trusted friend or family member",
            "Reward milestones: Saved ₹10K? Treat yourself to something small. Celebrate wins"
          ]
        },
        {
          title: "Long-term Discipline Framework",
          icon: "🏗️",
          points: [
            "Month 1-3: Just TRACK everything. Don't try to change, just observe and record",
            "Month 4-6: Create and follow a basic budget. Target 10% savings rate",
            "Month 7-12: Build emergency fund. Start one small SIP investment",
            "Year 2: Increase savings to 20%. Add new investment goals. Review and optimize",
            "Year 3+: You're now running on autopilot. Focus on growing income and investments"
          ]
        }
      ],
      actionSteps: [
        "Start a 30-day tracking challenge: Record every single expense, no matter how small",
        "Set up one automatic savings transfer — even ₹500/month on salary day",
        "Identify your top 3 spending triggers (boredom, stress, FOMO) and create alternatives",
        "Write down 3 financial goals and put them where you see them daily",
        "Find an accountability partner or join a financial discipline community"
      ]
    }
  };

  const quizQuestions = [
    {
      question: "You see shoes you like for ₹3,500. Your current shoes work fine. This is a:",
      options: ["Need — everyone requires shoes", "Want — current shoes still work", "Investment — good shoes last longer", "Savings — it's on sale!"],
      correct: 1,
      explanation: "Since your current shoes work fine, new ones are a want. Save the ₹3,500 instead!"
    },
    {
      question: "The 50/30/20 rule means:",
      options: ["50% investing, 30% saving, 20% spending", "50% wants, 30% needs, 20% savings", "50% needs, 30% wants, 20% savings", "50% saving, 30% investing, 20% fun"],
      correct: 2,
      explanation: "50% for needs (rent, food, bills), 30% for wants (entertainment, shopping), 20% for savings and investments."
    },
    {
      question: "Your credit card bill is ₹25,000 and you can only pay ₹5,000. You should:",
      options: ["Pay minimum and shop more", "Pay ₹5,000 and don't add more debt", "Ignore it for now", "Take a personal loan to pay it"],
      correct: 1,
      explanation: "Pay what you can AND immediately stop using the card until it's paid off. Adding debt to cover debt is a spiral."
    },
    {
      question: "₹200/day on food delivery adds up to how much per year?",
      options: ["₹12,000", "`₹36,000", "₹72,000", "₹24,000"],
      correct: 2,
      explanation: "₹200 × 365 = ₹73,000/year! Small daily expenses are the biggest budget leak. Cooking even 3 days/week saves ₹30,000+."
    },
    {
      question: "When should you start saving for emergencies?",
      options: ["After paying all debts", "When earning ₹1L+", "Right now, even ₹500/month", "After marriage"],
      correct: 2,
      explanation: "Start now! Even ₹500/month builds the habit. In 2 years, that's ₹12,000 — enough for small emergencies."
    },
    {
      question: "Which is an example of 'good debt'?",
      options: ["₹50K credit card for shopping", "₹2L personal loan for a vacation", "₹5L education loan for MBA", "₹30K EMI for latest phone"],
      correct: 2,
      explanation: "Education loan is good debt because it increases your earning potential. Shopping, vacations, and phone EMIs are consumption debt."
    },
  ];

  const active = sections[activeSection];

  const sectionTabs: { key: AwarenessSection; label: string; icon: string }[] = [
    { key: "needs-wants", label: "Needs vs Wants", icon: "⚖️" },
    { key: "budgeting", label: "Budgeting", icon: "📋" },
    { key: "debt", label: "Avoiding Debt", icon: "⚠️" },
    { key: "discipline", label: "Discipline", icon: "🧠" },
  ];

  return (
    <div className="space-y-6">
      {/* Hero */}
      <div className="bg-gradient-to-br from-amber-500 via-orange-500 to-red-500 rounded-2xl p-6 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-10 translate-x-10" />
        <div className="relative">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">🧠</span>
            <div>
              <h2 className="font-bold text-xl">Financial Awareness Training</h2>
              <p className="text-white/70 text-sm">Build the right mindset before building wealth</p>
            </div>
          </div>
          <p className="text-white/80 text-sm mt-3 max-w-2xl leading-relaxed">
            Understanding money concepts is step 1. Building the awareness and discipline to ACT on that knowledge is what separates 
            people who struggle financially from those who thrive. This section bridges knowing and doing.
          </p>
        </div>
      </div>

      {/* Section Tabs */}
      <div className="flex gap-2 flex-wrap">
        {sectionTabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveSection(tab.key)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
              activeSection === tab.key
                ? `bg-gradient-to-r ${sections[tab.key].gradient} text-white shadow-lg`
                : "bg-white border border-gray-200 text-gray-600 hover:border-gray-300"
            }`}
          >
            <span>{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Section Header */}
      <div className={`bg-gradient-to-r ${active.gradient} rounded-2xl p-5 text-white`}>
        <div className="flex items-center gap-3">
          <span className="text-3xl">{active.icon}</span>
          <div>
            <h3 className="font-bold text-lg">{active.title}</h3>
            <p className="text-white/70 text-sm">{active.subtitle}</p>
          </div>
        </div>
      </div>

      {/* Lessons */}
      <div className="space-y-4">
        {active.lessons.map((lesson, lidx) => (
          <div key={lidx} className="bg-white rounded-2xl border border-gray-100 p-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xl">{lesson.icon}</span>
              <h4 className="text-sm font-bold text-gray-800">{lesson.title}</h4>
            </div>
            <div className="space-y-2.5">
              {lesson.points.map((point, pidx) => (
                <div key={pidx} className="flex items-start gap-3">
                  <div className={`w-5 h-5 rounded-full bg-gradient-to-br ${active.gradient} flex items-center justify-center text-white text-[9px] font-bold flex-shrink-0 mt-0.5`}>
                    {pidx + 1}
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">{point}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Action Steps */}
      <div className="bg-gradient-to-r from-gray-50 to-slate-50 rounded-2xl border border-gray-100 p-6">
        <h3 className="text-gray-900 font-bold text-sm mb-4">🎯 Action Steps — Do This Today</h3>
        <div className="space-y-3">
          {active.actionSteps.map((step, idx) => (
            <div key={idx} className="flex items-start gap-3 p-3 bg-white rounded-xl border border-gray-100">
              <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold flex-shrink-0">
                {idx + 1}
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">{step}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Quiz Section */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-gray-900 font-bold text-sm">🧪 Test Your Awareness</h3>
          {quizStarted && (
            <span className="text-xs text-gray-400">Question {quizIndex + 1} of {quizQuestions.length}</span>
          )}
        </div>

        {!quizStarted ? (
          <div className="text-center py-6">
            <span className="text-4xl">🎓</span>
            <p className="text-sm text-gray-600 mt-3 mb-4">Test what you've learned with a quick 6-question quiz!</p>
            <button
              onClick={() => { setQuizStarted(true); setQuizIndex(0); setQuizScore(0); setSelectedAnswer(null); }}
              className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-orange-600 text-white text-sm font-medium rounded-xl hover:shadow-lg transition-all"
            >
              Start Quiz
            </button>
          </div>
        ) : quizIndex < quizQuestions.length ? (
          <div>
            <p className="text-sm font-medium text-gray-800 mb-4">{quizQuestions[quizIndex].question}</p>
            <div className="space-y-2">
              {quizQuestions[quizIndex].options.map((opt, oidx) => {
                const isCorrect = oidx === quizQuestions[quizIndex].correct;
                const isSelected = selectedAnswer === oidx;
                const showResult = selectedAnswer !== null;
                return (
                  <button
                    key={oidx}
                    onClick={() => {
                      if (selectedAnswer !== null) return;
                      setSelectedAnswer(oidx);
                      if (oidx === quizQuestions[quizIndex].correct) setQuizScore(s => s + 1);
                    }}
                    className={`w-full text-left p-3 rounded-xl text-sm transition-all border ${
                      showResult
                        ? isCorrect ? "bg-emerald-50 border-emerald-300 text-emerald-800" : isSelected ? "bg-red-50 border-red-300 text-red-800" : "bg-gray-50 border-gray-100 text-gray-400"
                        : "bg-gray-50 border-gray-100 text-gray-700 hover:bg-gray-100 hover:border-gray-200"
                    }`}
                  >
                    <span className="font-medium mr-2">{String.fromCharCode(65 + oidx)}.</span>
                    {opt}
                    {showResult && isCorrect && " ✅"}
                    {showResult && isSelected && !isCorrect && " ❌"}
                  </button>
                );
              })}
            </div>
            {selectedAnswer !== null && (
              <div className="mt-3 p-3 bg-blue-50 rounded-xl border border-blue-100">
                <p className="text-xs text-blue-800 leading-relaxed">💡 {quizQuestions[quizIndex].explanation}</p>
              </div>
            )}
            {selectedAnswer !== null && (
              <button
                onClick={() => { setQuizIndex(i => i + 1); setSelectedAnswer(null); }}
                className="mt-3 px-4 py-2 bg-gray-900 text-white text-xs font-medium rounded-xl hover:bg-gray-800 transition-all"
              >
                {quizIndex < quizQuestions.length - 1 ? "Next Question →" : "See Results"}
              </button>
            )}
          </div>
        ) : (
          <div className="text-center py-6">
            <span className="text-4xl">{quizScore >= 5 ? "🏆" : quizScore >= 3 ? "👍" : "📖"}</span>
            <p className="text-2xl font-bold text-gray-900 mt-3">{quizScore}/{quizQuestions.length}</p>
            <p className="text-sm text-gray-500 mt-1">
              {quizScore >= 5 ? "Excellent! You have strong financial awareness!" : quizScore >= 3 ? "Good foundation! Review the sections you missed." : "Keep learning! Re-read the sections above and try again."}
            </p>
            <button
              onClick={() => { setQuizStarted(false); setQuizIndex(0); setQuizScore(0); setSelectedAnswer(null); }}
              className="mt-4 px-5 py-2.5 bg-gradient-to-r from-amber-500 to-orange-600 text-white text-sm font-medium rounded-xl hover:shadow-lg transition-all"
            >
              Retake Quiz
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FinancialAwareness;
