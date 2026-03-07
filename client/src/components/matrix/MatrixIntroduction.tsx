import React, { useState } from "react";

const MatrixIntroduction: React.FC = () => {
  const [expandedSection, setExpandedSection] = useState<string | null>("what");

  const toggleSection = (id: string) => setExpandedSection(expandedSection === id ? null : id);

  const introSections = [
    {
      id: "what",
      icon: "🧩",
      title: "What is a Matrix?",
      gradient: "from-indigo-500 to-purple-600",
      content: [
        "A matrix is simply a **structured grid** used to compare options, organize information, and make better decisions. Think of it as a table with rows and columns where you fill in information to see patterns clearly.",
        "Imagine you're choosing between 3 phones. Instead of thinking randomly, a matrix lays it out: phones on one side, features on the other — price, camera, battery, storage. Instantly, the best choice becomes obvious.",
        "Matrices are NOT complicated math. At their core, they're just organized thinking — putting information into a grid so your brain can process it clearly instead of juggling everything at once.",
        "Every spreadsheet you've used, every pros-and-cons list you've made, every comparison table you've seen — those are all forms of matrix thinking. You've been doing it without knowing the name."
      ]
    },
    {
      id: "why",
      icon: "⚡",
      title: "Why Structured Thinking Matters",
      gradient: "from-amber-500 to-orange-600",
      content: [
        "Our brains are terrible at comparing more than 2-3 things at once. When choosing between 5 job offers with 8 factors each, your brain simply can't hold all 40 comparisons. A matrix can.",
        "Unstructured thinking leads to **decision fatigue** — the feeling of being overwhelmed by choices. Structured thinking breaks big decisions into small, manageable comparisons.",
        "Studies show structured decision-makers are 3x more confident in their choices and 2x less likely to regret them. The structure doesn't make the decision for you — it gives you clarity to decide well.",
        "Every successful field — business strategy, engineering, medicine, military planning — uses structured frameworks. It's not about being robotic; it's about being clear-headed when it matters most."
      ]
    },
    {
      id: "how",
      icon: "🔧",
      title: "How Matrices Simplify Decisions",
      gradient: "from-emerald-500 to-teal-600",
      content: [
        "Step 1: **Define your options** — What are you choosing between? (3 apartments, 4 career paths, 5 investment options)",
        "Step 2: **List your criteria** — What matters to you? (Cost, location, growth potential, work-life balance, risk)",
        "Step 3: **Score each option** — Rate how well each option meets each criterion on a simple scale (1-5 or 1-10)",
        "Step 4: **Weight the criteria** — Not all factors matter equally. If salary matters 3x more than commute, multiply accordingly",
        "Step 5: **Calculate and compare** — Add up the weighted scores. The highest score isn't always the final answer, but it shows what the data says — then you add your gut feeling on top.",
        "This 5-step process works for literally any decision — from choosing dinner to choosing a life partner."
      ]
    },
    {
      id: "who",
      icon: "🏢",
      title: "Who Uses Matrix Thinking?",
      gradient: "from-rose-500 to-pink-600",
      content: [
        "**Business leaders** use SWOT matrices (Strengths, Weaknesses, Opportunities, Threats) to evaluate strategies and markets.",
        "**Engineers** use decision matrices to compare design options, evaluate trade-offs, and prioritize features in product development.",
        "**Doctors** use diagnostic matrices to evaluate symptoms against possible conditions, ensuring nothing is missed.",
        "**Military strategists** use risk matrices to evaluate threats and plan responses based on likelihood and impact.",
        "**Students** use priority matrices to manage study schedules, comparing urgency of assignments with importance of topics.",
        "**You** can use matrix thinking for career decisions, financial planning, goal setting, relationship evaluation, and any life choice with multiple factors."
      ]
    }
  ];

  const benefitCards = [
    { icon: "🎯", title: "Clear Decisions", desc: "See all options side-by-side instead of juggling them in your head", color: "bg-blue-50 border-blue-100" },
    { icon: "🧠", title: "Organized Thinking", desc: "Break complex problems into simple, structured components", color: "bg-purple-50 border-purple-100" },
    { icon: "⚖️", title: "Fair Comparison", desc: "Every option gets evaluated on the same criteria — no bias", color: "bg-emerald-50 border-emerald-100" },
    { icon: "🔍", title: "Reduced Confusion", desc: "When overwhelmed, a matrix cuts through the noise instantly", color: "bg-amber-50 border-amber-100" },
    { icon: "💪", title: "Confident Choices", desc: "Data-backed decisions you can explain and defend to others", color: "bg-rose-50 border-rose-100" },
    { icon: "🔄", title: "Reusable Framework", desc: "Learn it once, apply it to hundreds of decisions in your life", color: "bg-cyan-50 border-cyan-100" },
  ];

  const quickExample = {
    title: "Quick Example: Choosing a Phone",
    headers: ["Criteria", "Phone A", "Phone B", "Phone C"],
    rows: [
      ["Price (₹)", "15,000", "22,000", "18,000"],
      ["Camera (1-5)", "3", "5", "4"],
      ["Battery (1-5)", "4", "3", "5"],
      ["Storage (1-5)", "3", "4", "4"],
      ["Total Score", "10", "12", "13"],
    ],
    winner: "Phone C",
    insight: "Phone C wins with the best balance. But if camera matters most to you, Phone B might still be your pick. The matrix informs — you decide."
  };

  return (
    <div className="space-y-6">
      {/* Hero */}
      <div className="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-2xl p-6 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -translate-y-12 translate-x-12" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-8 -translate-x-8" />
        <div className="relative">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-4xl">🧠</span>
            <div>
              <h2 className="font-bold text-2xl">Welcome to Matrix Thinking</h2>
              <p className="text-white/70 text-sm mt-1">Turn confusion into clarity with structured decision-making</p>
            </div>
          </div>
          <p className="text-white/80 text-sm leading-relaxed mt-4 max-w-2xl">
            Most people make important decisions — career, finances, relationships — using gut feeling alone. 
            Matrix thinking gives you a <strong>simple, powerful framework</strong> to analyze any decision clearly. 
            It's not about math. It's about thinking better.
          </p>
          <div className="mt-5 flex items-center gap-3 flex-wrap">
            <span className="px-3 py-1.5 bg-white/15 rounded-lg text-xs font-medium backdrop-blur">🎯 Clear thinking</span>
            <span className="px-3 py-1.5 bg-white/15 rounded-lg text-xs font-medium backdrop-blur">📊 Visual comparison</span>
            <span className="px-3 py-1.5 bg-white/15 rounded-lg text-xs font-medium backdrop-blur">⚡ Better decisions</span>
            <span className="px-3 py-1.5 bg-white/15 rounded-lg text-xs font-medium backdrop-blur">🔧 Practical tools</span>
          </div>
        </div>
      </div>

      {/* Quick Visual Example */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <h3 className="text-gray-900 font-bold text-sm mb-4">⚡ {quickExample.title}</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr>
                {quickExample.headers.map((h, i) => (
                  <th key={i} className={`px-4 py-2.5 text-left text-xs font-bold ${i === 0 ? "text-gray-500" : "text-gray-700"} ${i === 0 ? "bg-gray-50" : "bg-indigo-50"} ${i === 0 ? "" : "text-center"} first:rounded-tl-xl last:rounded-tr-xl`}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {quickExample.rows.map((row, ridx) => (
                <tr key={ridx} className={ridx === quickExample.rows.length - 1 ? "bg-gradient-to-r from-indigo-50 to-purple-50 font-bold" : ""}>
                  {row.map((cell, cidx) => (
                    <td key={cidx} className={`px-4 py-2.5 text-xs ${cidx === 0 ? "text-gray-600 font-medium" : "text-center text-gray-700"} border-t border-gray-50`}>
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-3 p-3 bg-emerald-50 rounded-xl border border-emerald-100">
          <p className="text-xs text-emerald-800">🏆 <strong>Winner: {quickExample.winner}</strong> — {quickExample.insight}</p>
        </div>
      </div>

      {/* Benefits Grid */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <h3 className="text-gray-900 font-bold text-sm mb-4">💎 Why Matrix Thinking is Powerful</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {benefitCards.map((card, idx) => (
            <div key={idx} className={`p-4 rounded-xl border ${card.color} hover:shadow-md transition-all`}>
              <span className="text-2xl">{card.icon}</span>
              <p className="text-sm font-semibold text-gray-800 mt-2">{card.title}</p>
              <p className="text-xs text-gray-500 mt-1 leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Deep Dive Sections */}
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
                      <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 flex-shrink-0 mt-1.5" />
                      <p className="text-sm text-gray-600 leading-relaxed">{paragraph}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Basic Matrix Structure Visual */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <h3 className="text-gray-900 font-bold text-sm mb-4">📐 Basic Matrix Structure</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="p-4 bg-gray-50 rounded-xl">
            <p className="text-xs font-bold text-gray-700 mb-3">Generic Decision Matrix</p>
            <div className="grid grid-cols-4 gap-1 text-[10px]">
              <div className="p-2 bg-gray-200 rounded font-bold text-center">Options ↓</div>
              <div className="p-2 bg-indigo-100 rounded font-bold text-center text-indigo-700">Criteria 1</div>
              <div className="p-2 bg-indigo-100 rounded font-bold text-center text-indigo-700">Criteria 2</div>
              <div className="p-2 bg-indigo-100 rounded font-bold text-center text-indigo-700">Criteria 3</div>
              <div className="p-2 bg-blue-50 rounded font-medium">Option A</div>
              <div className="p-2 bg-white rounded text-center">Score</div>
              <div className="p-2 bg-white rounded text-center">Score</div>
              <div className="p-2 bg-white rounded text-center">Score</div>
              <div className="p-2 bg-blue-50 rounded font-medium">Option B</div>
              <div className="p-2 bg-white rounded text-center">Score</div>
              <div className="p-2 bg-white rounded text-center">Score</div>
              <div className="p-2 bg-white rounded text-center">Score</div>
              <div className="p-2 bg-blue-50 rounded font-medium">Option C</div>
              <div className="p-2 bg-white rounded text-center">Score</div>
              <div className="p-2 bg-white rounded text-center">Score</div>
              <div className="p-2 bg-white rounded text-center">Score</div>
            </div>
          </div>
          <div className="p-4 bg-gray-50 rounded-xl">
            <p className="text-xs font-bold text-gray-700 mb-3">How It Works</p>
            <div className="space-y-2.5">
              <div className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">1</span>
                <p className="text-xs text-gray-600"><strong>Rows</strong> = Your options (things you're comparing)</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">2</span>
                <p className="text-xs text-gray-600"><strong>Columns</strong> = Your criteria (what matters to you)</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">3</span>
                <p className="text-xs text-gray-600"><strong>Cells</strong> = Scores (how well each option meets each criterion)</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">4</span>
                <p className="text-xs text-gray-600"><strong>Totals</strong> = Sum of scores reveals the best option</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl border border-indigo-100 p-6 text-center">
        <span className="text-3xl">🚀</span>
        <h3 className="text-gray-900 font-bold text-base mt-3">Ready to Explore?</h3>
        <p className="text-gray-500 text-sm mt-2 max-w-lg mx-auto">
          Head to <strong>Matrix Models</strong> to learn popular frameworks, or jump to the 
          <strong> Matrix Builder</strong> to create your own decision matrix right now!
        </p>
      </div>
    </div>
  );
};

export default MatrixIntroduction;
