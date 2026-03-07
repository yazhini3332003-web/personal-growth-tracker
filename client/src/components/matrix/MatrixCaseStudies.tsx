import React, { useState } from "react";

interface CaseStudy {
  id: string;
  icon: string;
  title: string;
  category: string;
  gradient: string;
  situation: string;
  challenge: string;
  matrixUsed: string;
  setup: {
    rows: string[];
    columns: string[];
    scores: number[][];
    weights: number[];
  };
  analysis: string[];
  outcome: string;
  lesson: string;
}

const caseStudies: CaseStudy[] = [
  {
    id: "career",
    icon: "💼",
    title: "Priya's Career Crossroads",
    category: "Career",
    gradient: "from-blue-500 to-indigo-600",
    situation: "Priya, a 24-year-old software developer with 2 years of experience, received 3 job offers simultaneously: a well-funded startup, a major MNC (TCS), and a remote position at a foreign company. Everyone around her had different opinions — parents wanted stability, friends said 'go for the startup', and she was confused.",
    challenge: "How to objectively compare 3 very different opportunities when everyone's advice conflicts and emotions are running high.",
    matrixUsed: "Weighted Decision Matrix",
    setup: {
      rows: ["Startup (Fintech)", "MNC (TCS)", "Remote (US Company)"],
      columns: ["Salary", "Growth", "Work-Life", "Learning", "Stability"],
      scores: [
        [7, 9, 5, 9, 4],
        [6, 5, 7, 5, 9],
        [9, 7, 8, 7, 6],
      ],
      weights: [3, 5, 4, 5, 3],
    },
    analysis: [
      "Priya weighted Growth and Learning highest (5) because she's early in her career",
      "Salary and Stability got lower weights (3) — she has no family responsibilities yet",
      "Startup scored highest on Growth (9) and Learning (9) — daily exposure to new challenges",
      "MNC won on Stability (9) but scored lowest on Growth and Learning",
      "Remote job had best salary but moderate scores everywhere else",
      "Final weighted scores: Startup = 138, Remote = 149, MNC = 124"
    ],
    outcome: "The matrix showed the Remote job was the best overall fit. But the Startup was only 11 points behind and offered superior Growth and Learning which she weighted highest. After reviewing, Priya chose the Startup — the matrix highlighted what she valued most, even though the total favored another option. She's now a tech lead there.",
    lesson: "The matrix doesn't decide for you — it shows you what you value. When the top 2 are close, the criterion you weighted highest becomes the tiebreaker. Trust the process AND your instinct."
  },
  {
    id: "investment",
    icon: "💰",
    title: "Rahul's First ₹1 Lakh Investment",
    category: "Finance",
    gradient: "from-emerald-500 to-teal-600",
    situation: "Rahul saved his first ₹1 lakh and wanted to invest it wisely. He'd heard about mutual funds, FDs, gold, stocks, and PPF — but had no idea which was right for his age (23), risk tolerance (moderate), and timeline (5+ years).",
    challenge: "How to compare investment options when each has different return rates, risk profiles, liquidity, and tax implications — and you're a complete beginner.",
    matrixUsed: "Decision Matrix + Risk Matrix",
    setup: {
      rows: ["Mutual Funds (Index)", "Fixed Deposit", "Gold ETF", "Direct Stocks", "PPF"],
      columns: ["Returns", "Risk Level", "Liquidity", "Tax Benefit", "Effort"],
      scores: [
        [8, 6, 8, 5, 7],
        [4, 9, 5, 6, 9],
        [5, 7, 7, 3, 8],
        [9, 3, 9, 4, 3],
        [6, 9, 2, 9, 9],
      ],
      weights: [5, 4, 3, 3, 2],
    },
    analysis: [
      "Rahul weighted Returns highest (5) — at 23, growing wealth is priority #1",
      "Risk Level got weight 4 — he's moderate, not aggressive",
      "Low Effort weighted only 2 — he's willing to learn and put in time",
      "Index Mutual Funds scored best overall: solid returns + manageable risk + high liquidity",
      "PPF scored second — great for tax savings but terrible liquidity (15-year lock)",
      "Direct Stocks had highest returns potential but lowest risk score and highest effort",
      "Risk Matrix showed: Stocks in 'High Impact, Medium Likelihood' zone, MFs in 'Manageable' zone"
    ],
    outcome: "Rahul split his ₹1 lakh: ₹60K in Index Mutual Funds (top scorer), ₹25K in PPF (tax benefit), and ₹15K in a FD (emergency buffer). He avoided direct stocks for now — the matrix revealed his risk tolerance didn't match. A year later, his portfolio grew 12%.",
    lesson: "You don't have to pick just ONE winner. The matrix helped Rahul understand the strengths of each option and create a balanced split. Also — the Risk Matrix prevented him from a costly mistake with direct stocks."
  },
  {
    id: "priority",
    icon: "📋",
    title: "Anita's Overwhelmed Week",
    category: "Productivity",
    gradient: "from-amber-500 to-orange-600",
    situation: "Anita, a final-year engineering student, had 14 things on her plate in one week: an exam, a project deadline, job applications, a family event, exercise, catching up on shows, studying for interviews, and more. She was stressed, sleeping poorly, and doing everything halfway.",
    challenge: "When EVERYTHING feels urgent and important, how do you decide what to actually do vs what to skip?",
    matrixUsed: "Eisenhower Matrix",
    setup: {
      rows: ["Exam prep", "Project deadline", "Apply for jobs", "Family event", "Interview study", "Netflix", "Exercise", "Email replies"],
      columns: ["Urgent?", "Important?", "Quadrant", "Action"],
      scores: [
        [9, 9, 1, 1],
        [10, 8, 1, 1],
        [5, 9, 2, 2],
        [8, 5, 3, 3],
        [4, 9, 2, 2],
        [2, 1, 4, 4],
        [3, 8, 2, 2],
        [7, 2, 3, 3],
      ],
      weights: [1, 1, 1, 1],
    },
    analysis: [
      "Q1 (DO NOW): Exam prep and Project deadline — these have hard deadlines AND matter for her degree",
      "Q2 (SCHEDULE): Job applications, interview study, exercise — hugely important for her future but no immediate deadline",
      "Q3 (DELEGATE/MINIMIZE): Family event (attend briefly, don't spend all day), email replies (batch once/day)",
      "Q4 (ELIMINATE): Netflix binge — zero urgency, zero importance during this critical week",
      "Key insight: Anita was spending 2 hours/day on Netflix + 1 hour on emails — that's 21 hours/week wasted",
      "After reorganizing: She freed 15+ hours for Q1 and Q2 tasks"
    ],
    outcome: "Anita aced her exam (85%), finished the project on time, sent 8 job applications, and started interview prep — all in the same week. She attended the family event for 2 hours instead of a full day, answered emails in one 20-minute batch, and cut Netflix to zero for that week. Stress dropped dramatically.",
    lesson: "When everything feels urgent, almost nothing actually is. The Eisenhower Matrix reveals that most of your 'busy work' falls in Q3 and Q4 — cutting those frees massive time for what truly matters. Also: Q2 is where life-changing work happens, but it NEVER feels urgent, so you must SCHEDULE it."
  },
  {
    id: "business",
    icon: "🚀",
    title: "Dev & Meera's Side Project Dilemma",
    category: "Business",
    gradient: "from-violet-500 to-purple-600",
    situation: "Dev and Meera, two friends with full-time jobs, wanted to start a side project. They had 5 ideas: a YouTube channel, a SaaS tool, an online course, a freelance agency, and an e-commerce store. Both could only invest 10 hours/week, so they could only pursue ONE idea seriously.",
    challenge: "How to pick one side project from 5 when each has different time requirements, revenue potential, skills needed, and personal excitement levels.",
    matrixUsed: "Weighted Decision Matrix + Risk Matrix",
    setup: {
      rows: ["YouTube Channel", "SaaS Product", "Online Course", "Freelance Agency", "E-Commerce Store"],
      columns: ["Revenue Potential", "Time to Profit", "Skill Match", "Excitement", "Scalability"],
      scores: [
        [7, 4, 8, 9, 8],
        [10, 3, 7, 7, 10],
        [7, 7, 9, 8, 6],
        [6, 8, 6, 5, 4],
        [8, 5, 4, 6, 7],
      ],
      weights: [4, 5, 3, 4, 3],
    },
    analysis: [
      "They weighted Time to Profit highest (5) — with full-time jobs, they needed quick validation, not a 2-year runway",
      "Revenue Potential and Excitement both got weight 4 — it needs to be profitable AND fun to sustain alongside jobs",
      "Online Course won on Time to Profit (7) + Skill Match (9) — they're both domain experts who can teach",
      "SaaS had highest Revenue Potential and Scalability but lowest Time to Profit — building takes 6-12 months",
      "YouTube was exciting but slow to monetize; E-Commerce required inventory investment they didn't have",
      "Risk Matrix showed: SaaS in 'Critical' zone (high effort, uncertain payoff), Course in 'Manageable' zone",
      "Final scores: Course = 140, YouTube = 133, SaaS = 133, E-Commerce = 113, Freelance = 113"
    ],
    outcome: "Dev and Meera launched an online course on web development. Within 3 months, they had 200 students and generated ₹2.5L in revenue — while working only 10 hours/week. The matrix prevented them from building a SaaS that would have burned 6 months with no revenue. They plan to add a YouTube channel (their #2 scorer) in Year 2.",
    lesson: "The matrix revealed a critical blind spot: they were both most excited about SaaS (it sounded cool), but the data showed it was the riskiest choice for their constraints. Time to Profit was the deciding factor. Sometimes the 'less exciting' option is the smartest one."
  }
];

const MatrixCaseStudies: React.FC = () => {
  const [activeCase, setActiveCase] = useState<string>("career");
  const [expandedSection, setExpandedSection] = useState<string>("situation");

  const currentCase = caseStudies.find((c) => c.id === activeCase)!;

  const getTotal = (rowIdx: number) => {
    return currentCase.setup.scores[rowIdx].reduce(
      (sum, score, colIdx) => sum + score * currentCase.setup.weights[colIdx],
      0
    );
  };

  const maxTotal = Math.max(...currentCase.setup.scores.map((_, idx) => getTotal(idx)));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-indigo-500 via-blue-500 to-cyan-500 rounded-2xl p-6 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-44 h-44 bg-white/5 rounded-full -translate-y-10 translate-x-10" />
        <div className="relative">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">📖</span>
            <div>
              <h2 className="font-bold text-xl">Case Studies</h2>
              <p className="text-white/70 text-sm mt-1">Real examples showing how matrices simplified real decisions</p>
            </div>
          </div>
          <p className="text-white/80 text-sm leading-relaxed mt-3 max-w-xl">
            These aren't hypothetical — they're based on real scenarios people face every day. 
            See the full matrix setup, scoring, analysis, and the actual outcome of each decision.
          </p>
        </div>
      </div>

      {/* Case Selector */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {caseStudies.map((cs) => (
          <button
            key={cs.id}
            onClick={() => { setActiveCase(cs.id); setExpandedSection("situation"); }}
            className={`p-4 rounded-xl border transition-all text-left ${
              activeCase === cs.id
                ? "bg-white border-indigo-200 shadow-md ring-2 ring-indigo-100"
                : "bg-white border-gray-100 hover:border-gray-200 hover:shadow-sm"
            }`}
          >
            <span className="text-2xl">{cs.icon}</span>
            <p className="text-xs font-bold text-gray-800 mt-2">{cs.title}</p>
            <span className="inline-block mt-1 px-2 py-0.5 bg-gray-100 text-gray-500 rounded text-[9px] font-medium">{cs.category}</span>
          </button>
        ))}
      </div>

      {/* Case Detail */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className={`bg-gradient-to-r ${currentCase.gradient} p-5 text-white`}>
          <div className="flex items-center gap-3">
            <span className="text-3xl">{currentCase.icon}</span>
            <div>
              <h3 className="font-bold text-lg">{currentCase.title}</h3>
              <div className="flex items-center gap-2 mt-1">
                <span className="px-2 py-0.5 bg-white/20 rounded text-[10px] font-medium">{currentCase.category}</span>
                <span className="px-2 py-0.5 bg-white/20 rounded text-[10px] font-medium">Uses: {currentCase.matrixUsed}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Section Tabs */}
        <div className="flex border-b border-gray-100 overflow-x-auto">
          {[
            { id: "situation", label: "📋 Situation" },
            { id: "matrix", label: "📊 Matrix" },
            { id: "analysis", label: "🔍 Analysis" },
            { id: "outcome", label: "🏆 Outcome" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setExpandedSection(tab.id)}
              className={`flex-shrink-0 py-3 px-5 text-xs font-medium transition-all ${
                expandedSection === tab.id
                  ? "text-indigo-700 border-b-2 border-indigo-500 bg-indigo-50/50"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="p-5">
          {/* Situation */}
          {expandedSection === "situation" && (
            <div className="space-y-4">
              <div>
                <p className="text-xs font-bold text-gray-700 mb-2">📋 The Situation</p>
                <p className="text-sm text-gray-600 leading-relaxed">{currentCase.situation}</p>
              </div>
              <div className="p-4 bg-amber-50 rounded-xl border border-amber-100">
                <p className="text-xs font-bold text-amber-700 mb-1">⚡ The Challenge</p>
                <p className="text-xs text-amber-600 leading-relaxed">{currentCase.challenge}</p>
              </div>
              <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-100">
                <p className="text-xs font-bold text-indigo-700 mb-1">🔧 Matrix Used</p>
                <p className="text-xs text-indigo-600">{currentCase.matrixUsed}</p>
              </div>
            </div>
          )}

          {/* Matrix */}
          {expandedSection === "matrix" && (
            <div className="space-y-4">
              <p className="text-xs font-bold text-gray-700 mb-2">📊 The Actual Matrix</p>
              <div className="overflow-x-auto">
                <table className="w-full text-[11px]">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-3 py-2 text-left text-gray-500 font-bold rounded-tl-xl">Options</th>
                      {currentCase.setup.columns.map((col, idx) => (
                        <th key={idx} className="px-2 py-2 text-center text-indigo-600 font-bold">
                          <div>{col}</div>
                          <div className="text-[9px] text-gray-400 font-normal mt-0.5">×{currentCase.setup.weights[idx]}</div>
                        </th>
                      ))}
                      <th className="px-3 py-2 text-center text-gray-700 font-bold rounded-tr-xl bg-indigo-50">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentCase.setup.rows.map((row, ridx) => {
                      const total = getTotal(ridx);
                      const isWinner = total === maxTotal;
                      return (
                        <tr key={ridx} className={`border-t border-gray-50 ${isWinner ? "bg-emerald-50/50" : ""}`}>
                          <td className="px-3 py-2.5 font-medium text-gray-800">{row}</td>
                          {currentCase.setup.scores[ridx].map((score, cidx) => (
                            <td key={cidx} className="px-2 py-2.5 text-center">
                              <span className={`inline-block px-2 py-0.5 rounded ${
                                score >= 8 ? "bg-emerald-100 text-emerald-700" :
                                score >= 5 ? "bg-blue-50 text-blue-700" :
                                "bg-gray-100 text-gray-500"
                              } text-[10px] font-bold`}>{score}</span>
                            </td>
                          ))}
                          <td className={`px-3 py-2.5 text-center font-bold ${isWinner ? "text-emerald-700" : "text-gray-700"}`}>
                            {total} {isWinner && "🏆"}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <p className="text-[10px] text-gray-400 italic">Scores are on a 1-10 scale. Total = sum of (score × weight) for each criterion.</p>
            </div>
          )}

          {/* Analysis */}
          {expandedSection === "analysis" && (
            <div className="space-y-3">
              <p className="text-xs font-bold text-gray-700 mb-2">🔍 Step-by-Step Analysis</p>
              {currentCase.analysis.map((point, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <p className="text-xs text-gray-600 leading-relaxed pt-0.5">{point}</p>
                </div>
              ))}
            </div>
          )}

          {/* Outcome */}
          {expandedSection === "outcome" && (
            <div className="space-y-4">
              <div>
                <p className="text-xs font-bold text-gray-700 mb-2">🏆 The Outcome</p>
                <p className="text-sm text-gray-600 leading-relaxed">{currentCase.outcome}</p>
              </div>
              <div className="p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-100">
                <p className="text-xs font-bold text-indigo-700 mb-2">💡 Key Lesson</p>
                <p className="text-xs text-indigo-600 leading-relaxed">{currentCase.lesson}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Takeaways */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <h3 className="text-sm font-bold text-gray-800 mb-4">🧠 Common Patterns Across All Cases</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { icon: "🎯", title: "Clarity beats complexity", desc: "Even a simple matrix gives better results than unstructured thinking" },
            { icon: "⚖️", title: "Weights reveal values", desc: "What you weight highest tells you what you truly care about — sometimes surprising yourself" },
            { icon: "🔢", title: "Close scores = equal options", desc: "When top 2 are within 10%, use your instinct. The matrix already did the hard work" },
            { icon: "🛡️", title: "Risk Matrix prevents costly mistakes", desc: "Pairing a Decision Matrix with a Risk Matrix catches blind spots" },
            { icon: "📈", title: "Document and revisit", desc: "Saving your matrix lets you learn from past decisions and improve future ones" },
            { icon: "🤝", title: "Share for objectivity", desc: "Having someone else review your scores catches emotional bias instantly" },
          ].map((item, idx) => (
            <div key={idx} className="p-4 bg-gray-50 rounded-xl border border-gray-100">
              <span className="text-lg">{item.icon}</span>
              <p className="text-xs font-bold text-gray-800 mt-2">{item.title}</p>
              <p className="text-[11px] text-gray-500 mt-1 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MatrixCaseStudies;
