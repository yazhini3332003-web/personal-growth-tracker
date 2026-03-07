import React, { useState } from "react";

interface LifeArea {
  id: string;
  icon: string;
  title: string;
  gradient: string;
  intro: string;
  applications: {
    title: string;
    description: string;
    matrixType: string;
    sampleSetup: { rows: string[]; columns: string[] };
    stepByStep: string[];
  }[];
}

const lifeAreas: LifeArea[] = [
  {
    id: "career",
    icon: "💼",
    title: "Career Decisions",
    gradient: "from-blue-500 to-indigo-600",
    intro: "Career decisions are some of the most impactful choices you'll make. A matrix eliminates emotional bias and shows you what truly matters.",
    applications: [
      {
        title: "Comparing Job Offers",
        description: "When you have multiple offers, your brain defaults to salary. A matrix forces you to evaluate everything that affects your daily happiness.",
        matrixType: "Decision Matrix",
        sampleSetup: {
          rows: ["Company A (Startup)", "Company B (MNC)", "Company C (Remote)"],
          columns: ["Salary", "Growth", "Work-Life", "Culture", "Location"]
        },
        stepByStep: [
          "List all offers as rows",
          "Define criteria: Salary, growth opportunity, work-life balance, culture fit, commute/location",
          "Assign weights (1-5): If growth matters most, give it 5. If salary is secondary, give it 3",
          "Score each offer (1-10) honestly on each criterion",
          "Multiply weights × scores, sum totals — compare the results"
        ]
      },
      {
        title: "Career Path Planning",
        description: "Should you go into management, stay technical, freelance, or start a business? Map each path against what you value.",
        matrixType: "Decision Matrix",
        sampleSetup: {
          rows: ["Management Track", "Technical Expert", "Freelance", "Entrepreneurship"],
          columns: ["Income Ceiling", "Freedom", "Stability", "Passion Fit", "Learning"]
        },
        stepByStep: [
          "Identify 3-5 realistic career paths",
          "List what matters: income ceiling, freedom, job stability, passion alignment, continuous learning",
          "Research each path honestly — talk to people in those roles",
          "Score each path based on YOUR values, not society's expectations",
          "The highest score reveals what truly aligns with your life goals"
        ]
      }
    ]
  },
  {
    id: "finance",
    icon: "💰",
    title: "Financial Decisions",
    gradient: "from-emerald-500 to-teal-600",
    intro: "Money decisions are emotional by nature. Matrices remove the emotion and show you the math + life impact combined.",
    applications: [
      {
        title: "Investment Comparison",
        description: "Stocks vs FDs vs Real Estate vs Gold — which is right for YOU? It depends on your goals, risk tolerance, and timeline.",
        matrixType: "Decision + Risk Matrix",
        sampleSetup: {
          rows: ["Stocks/MFs", "Fixed Deposits", "Real Estate", "Gold", "PPF/NPS"],
          columns: ["Returns", "Risk Level", "Liquidity", "Tax Benefit", "Effort"]
        },
        stepByStep: [
          "List investment options you're considering",
          "Define criteria: Expected returns, risk level, ease of withdrawal, tax benefits, effort to manage",
          "Weight based on YOUR situation (beginner? safety-first → weight Risk Level higher)",
          "Score each investment honestly on each criterion",
          "Use Risk Matrix additionally to assess worst-case scenarios"
        ]
      },
      {
        title: "Big Purchase Decision",
        description: "Buying a car, phone, or laptop? Comparison shopping gets overwhelming. A matrix cuts through the noise.",
        matrixType: "Decision Matrix",
        sampleSetup: {
          rows: ["Option A (Budget)", "Option B (Mid-range)", "Option C (Premium)"],
          columns: ["Price", "Features", "Durability", "Resale Value", "Reviews"]
        },
        stepByStep: [
          "Shortlist 3-5 options in your budget range",
          "List what matters: price, features you'll actually use, build quality, resale value, user reviews",
          "Score each option — be honest about NEEDS vs WANTS",
          "If top 2 are within 5% of each other, pick the one that makes you smile",
          "Save the matrix — it prevents buyer's remorse later"
        ]
      }
    ]
  },
  {
    id: "personal",
    icon: "🌱",
    title: "Personal Growth",
    gradient: "from-violet-500 to-purple-600",
    intro: "Your personal development shouldn't be random. Matrix thinking helps you focus on what will create the most growth in the least time.",
    applications: [
      {
        title: "Skill Development Planning",
        description: "With 100 skills you COULD learn, which 3-5 should you focus on THIS year? A Learning Matrix reveals the answer.",
        matrixType: "Learning Matrix",
        sampleSetup: {
          rows: ["JavaScript", "Public Speaking", "Data Analysis", "Design", "Writing"],
          columns: ["Current Knowledge", "Current Skill", "Career Impact", "Interest Level"]
        },
        stepByStep: [
          "List all skills you want to develop (be honest, list everything)",
          "Score your current knowledge and skill level for each (1-10)",
          "Rate career impact and personal interest for each",
          "Skills with HIGH impact + HIGH interest + LOW current level = priority targets",
          "Pick top 3 for this quarter — depth beats breadth"
        ]
      },
      {
        title: "Goal Prioritization",
        description: "Too many goals? Use Eisenhower-style thinking to decide what to pursue NOW vs later vs never.",
        matrixType: "Eisenhower + Decision Matrix",
        sampleSetup: {
          rows: ["Learn AI/ML", "Get fit", "Save ₹5L", "Build side project", "Read 24 books"],
          columns: ["Impact on Life", "Urgency", "Effort Required", "Joy Factor"]
        },
        stepByStep: [
          "Brain dump ALL goals you're considering",
          "Score each on: life impact, time urgency, effort required, personal joy",
          "Plot on Eisenhower Matrix: Which are urgent AND important?",
          "Select max 3 goals per quarter — any more spreads you too thin",
          "Review & adjust each month based on progress"
        ]
      }
    ]
  },
  {
    id: "daily",
    icon: "📋",
    title: "Daily & Weekly Decisions",
    gradient: "from-amber-500 to-orange-600",
    intro: "Matrix thinking isn't just for big decisions. Use simple matrices daily to be more productive, less stressed, and more intentional.",
    applications: [
      {
        title: "Daily Task Prioritization",
        description: "10 tasks on your list, 8 hours in the day. The Eisenhower Matrix tells you which 3-4 actually matter.",
        matrixType: "Eisenhower Matrix",
        sampleSetup: {
          rows: ["Client deliverable", "Team meeting", "Email replies", "Learning", "Planning", "Social media"],
          columns: ["Urgent?", "Important?", "Quadrant", "Action"]
        },
        stepByStep: [
          "List ALL tasks for the day",
          "For each task, ask: Is it URGENT? (deadline pressure) Is it IMPORTANT? (moves life forward)",
          "Place in quadrant: Do Now → Schedule → Delegate → Don't Do",
          "Do Quadrant 1 tasks first, then protect time for Quadrant 2",
          "Say NO to Quadrant 3 & 4 tasks without guilt"
        ]
      },
      {
        title: "Weekend Planning",
        description: "Maximize your weekend by comparing activities on what recharges you vs what's obligatory.",
        matrixType: "Custom Matrix",
        sampleSetup: {
          rows: ["Meet friends", "Study for exam", "Exercise", "Netflix binge", "Clean house", "Side project"],
          columns: ["Energy Gained", "Obligation Level", "Fun Factor", "Productive?"]
        },
        stepByStep: [
          "List everything you COULD do this weekend",
          "Score each on energy impact, obligation, fun, and productivity",
          "Aim for a mix: some high-energy fun + some productive deep work + rest",
          "Eliminate low-score activities that drain you with no return",
          "Plan blocks of time — don't leave the weekend unstructured"
        ]
      }
    ]
  }
];

const MatrixRealLife: React.FC = () => {
  const [activeArea, setActiveArea] = useState<string>("career");
  const [expandedApp, setExpandedApp] = useState<number>(0);

  const currentArea = lifeAreas.find((a) => a.id === activeArea)!;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-orange-500 via-rose-500 to-pink-500 rounded-2xl p-6 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-44 h-44 bg-white/5 rounded-full -translate-y-10 translate-x-10" />
        <div className="relative">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">🌍</span>
            <div>
              <h2 className="font-bold text-xl">Real-Life Applications</h2>
              <p className="text-white/70 text-sm mt-1">Matrix thinking applied to career, money, growth & daily life</p>
            </div>
          </div>
          <p className="text-white/80 text-sm leading-relaxed mt-3 max-w-xl">
            This isn't theory — these are <strong>practical, ready-to-use</strong> matrix setups for real decisions 
            you face every day. Pick a life area and follow the step-by-step guides.
          </p>
        </div>
      </div>

      {/* Life Area Selector */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {lifeAreas.map((area) => (
          <button
            key={area.id}
            onClick={() => { setActiveArea(area.id); setExpandedApp(0); }}
            className={`p-4 rounded-xl border transition-all text-left ${
              activeArea === area.id
                ? "bg-white border-indigo-200 shadow-md ring-2 ring-indigo-100"
                : "bg-white border-gray-100 hover:border-gray-200 hover:shadow-sm"
            }`}
          >
            <span className="text-2xl">{area.icon}</span>
            <p className="text-sm font-bold text-gray-800 mt-2">{area.title}</p>
            <p className="text-[11px] text-gray-400 mt-1">{area.applications.length} applications</p>
          </button>
        ))}
      </div>

      {/* Area Detail */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className={`bg-gradient-to-r ${currentArea.gradient} p-5 text-white`}>
          <div className="flex items-center gap-3">
            <span className="text-3xl">{currentArea.icon}</span>
            <div>
              <h3 className="font-bold text-lg">{currentArea.title}</h3>
              <p className="text-white/80 text-sm mt-1">{currentArea.intro}</p>
            </div>
          </div>
        </div>

        {/* Application tabs */}
        <div className="flex border-b border-gray-100">
          {currentArea.applications.map((app, idx) => (
            <button
              key={idx}
              onClick={() => setExpandedApp(idx)}
              className={`flex-1 py-3 px-4 text-xs font-medium transition-all ${
                expandedApp === idx
                  ? "text-indigo-700 border-b-2 border-indigo-500 bg-indigo-50/50"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
              }`}
            >
              {app.title}
            </button>
          ))}
        </div>

        {/* Application Content */}
        {currentArea.applications[expandedApp] && (
          <div className="p-5 space-y-5">
            <div>
              <p className="text-sm text-gray-700 leading-relaxed">{currentArea.applications[expandedApp].description}</p>
              <span className="inline-block mt-2 px-2.5 py-1 bg-indigo-50 text-indigo-700 text-[10px] font-bold rounded-lg">
                Uses: {currentArea.applications[expandedApp].matrixType}
              </span>
            </div>

            {/* Sample Matrix Setup */}
            <div>
              <p className="text-xs font-bold text-gray-700 mb-3">📐 Sample Matrix Setup</p>
              <div className="overflow-x-auto">
                <table className="w-full text-[11px]">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-3 py-2 text-left text-gray-500 font-bold first:rounded-tl-xl">Options</th>
                      {currentArea.applications[expandedApp].sampleSetup.columns.map((col, cidx) => (
                        <th key={cidx} className={`px-3 py-2 text-center text-indigo-600 font-bold ${cidx === currentArea.applications[expandedApp].sampleSetup.columns.length - 1 ? "rounded-tr-xl" : ""}`}>
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {currentArea.applications[expandedApp].sampleSetup.rows.map((row, ridx) => (
                      <tr key={ridx} className="border-t border-gray-50">
                        <td className="px-3 py-2 text-gray-700 font-medium bg-blue-50/50">{row}</td>
                        {currentArea.applications[expandedApp].sampleSetup.columns.map((_, cidx) => (
                          <td key={cidx} className="px-3 py-2 text-center text-gray-400">
                            <span className="inline-block w-8 h-5 bg-gray-100 rounded text-[10px] leading-5">—</span>
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-[10px] text-gray-400 mt-2 italic">Fill in scores (1-10) for each option × criteria combination</p>
            </div>

            {/* Step by Step */}
            <div>
              <p className="text-xs font-bold text-gray-700 mb-3">🚀 Step-by-Step Guide</p>
              <div className="space-y-2">
                {currentArea.applications[expandedApp].stepByStep.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <p className="text-xs text-gray-600 leading-relaxed pt-1">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Quick Reference Cards */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <h3 className="text-gray-900 font-bold text-sm mb-4">⚡ Quick Reference: Which Matrix for Which Decision?</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { decision: "Which job to take?", matrix: "Decision Matrix", reason: "Multiple options + multiple criteria = weighted comparison" },
            { decision: "What to work on today?", matrix: "Eisenhower Matrix", reason: "Quick urgency vs importance sort" },
            { decision: "Should I invest in crypto?", matrix: "Risk Matrix", reason: "Evaluate likelihood of loss vs potential gain" },
            { decision: "What to learn next?", matrix: "Learning Matrix", reason: "Map current knowledge vs skill to find gaps" },
            { decision: "Which laptop to buy?", matrix: "Decision Matrix", reason: "Objective comparison of specs, price, reviews" },
            { decision: "Am I at financial risk?", matrix: "Risk Matrix", reason: "Map all risks by probability and severity" },
            { decision: "Which goals this quarter?", matrix: "Eisenhower + Decision", reason: "Prioritize by impact, then compare objectively" },
            { decision: "Career change or stay?", matrix: "Decision + Risk", reason: "Compare options AND evaluate worst-case risks" },
          ].map((item, idx) => (
            <div key={idx} className="p-3 bg-gray-50 rounded-xl hover:bg-gray-100/80 transition-all">
              <p className="text-xs font-bold text-gray-800">"{item.decision}"</p>
              <p className="text-[11px] text-indigo-600 font-medium mt-1">→ {item.matrix}</p>
              <p className="text-[10px] text-gray-500 mt-1">{item.reason}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MatrixRealLife;
