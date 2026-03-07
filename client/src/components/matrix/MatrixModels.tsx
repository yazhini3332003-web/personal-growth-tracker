import React, { useState } from "react";

interface MatrixModelData {
  id: string;
  name: string;
  icon: string;
  gradient: string;
  tagline: string;
  description: string;
  axes: { x: string; y: string };
  quadrants: { label: string; desc: string; color: string; examples: string[] }[];
  whenToUse: string[];
  proTips: string[];
}

const matrixModels: MatrixModelData[] = [
  {
    id: "eisenhower",
    name: "Eisenhower Matrix",
    icon: "⏰",
    gradient: "from-blue-500 to-indigo-600",
    tagline: "Priority & Time Management",
    description: "Named after President Eisenhower, this matrix helps you distinguish between what's URGENT and what's IMPORTANT. Most people spend all day on urgent tasks while ignoring important ones — this matrix fixes that.",
    axes: { x: "Urgency →", y: "Importance ↑" },
    quadrants: [
      { label: "DO FIRST", desc: "Urgent + Important — Handle immediately", color: "bg-red-100 border-red-200 text-red-800", examples: ["Deadline tomorrow", "Health emergency", "Client crisis", "Exam preparation"] },
      { label: "SCHEDULE", desc: "Not Urgent + Important — Plan for these", color: "bg-blue-100 border-blue-200 text-blue-800", examples: ["Exercise routine", "Learning new skills", "Relationship building", "Long-term goals"] },
      { label: "DELEGATE", desc: "Urgent + Not Important — Hand off if possible", color: "bg-amber-100 border-amber-200 text-amber-800", examples: ["Most emails", "Some meetings", "Phone interruptions", "Others' minor tasks"] },
      { label: "ELIMINATE", desc: "Not Urgent + Not Important — Stop doing these", color: "bg-gray-100 border-gray-200 text-gray-800", examples: ["Mindless scrolling", "Gossip", "Excessive TV", "Busywork with no value"] },
    ],
    whenToUse: ["Overwhelmed by too many tasks", "Can't figure out what to work on first", "Feeling busy but not productive", "Need to free up time for what matters"],
    proTips: ["Quadrant 2 (Schedule) is where life-changing work happens — protect it", "If everything feels urgent, you're not planning enough", "Review daily: move tasks between quadrants as priorities shift", "Be honest — most 'urgent' things aren't actually important"]
  },
  {
    id: "decision",
    name: "Decision Matrix",
    icon: "⚖️",
    gradient: "from-emerald-500 to-teal-600",
    tagline: "Weighted Comparison",
    description: "The most practical matrix for everyday choices. You list options, define criteria, assign weights (how much each criterion matters), score each option, and multiply. The highest total score reveals the best data-backed choice.",
    axes: { x: "Criteria →", y: "Options ↓" },
    quadrants: [
      { label: "DEFINE OPTIONS", desc: "What are you choosing between?", color: "bg-emerald-100 border-emerald-200 text-emerald-800", examples: ["3-5 options works best", "Name them clearly", "Include 'do nothing' as an option", "Be exhaustive"] },
      { label: "SET CRITERIA", desc: "What factors matter to you?", color: "bg-blue-100 border-blue-200 text-blue-800", examples: ["Cost, quality, time", "Growth potential", "Risk level", "Personal happiness"] },
      { label: "WEIGHT & SCORE", desc: "Rate importance and performance", color: "bg-purple-100 border-purple-200 text-purple-800", examples: ["Weight: 1-5 importance", "Score: 1-10 rating", "Be honest, not hopeful", "Use same scale for all"] },
      { label: "CALCULATE", desc: "Multiply weights × scores, sum up", color: "bg-amber-100 border-amber-200 text-amber-800", examples: ["Weight × Score = Result", "Sum each option's results", "Highest total = best option", "Compare top 2 closely"] },
    ],
    whenToUse: ["Choosing between job offers", "Buying expensive items (car, laptop, home)", "Selecting a college or course", "Any decision with 3+ options and 3+ factors"],
    proTips: ["Don't use more than 7-8 criteria — focus on what truly matters", "If two options score within 5% of each other, they're essentially equal — go with your gut", "Let someone else cross-check your scores for bias", "Save your matrices — revisit them later to see how the decision played out"]
  },
  {
    id: "risk",
    name: "Risk Assessment Matrix",
    icon: "🛡️",
    gradient: "from-rose-500 to-red-600",
    tagline: "Likelihood vs Impact",
    description: "This matrix maps risks by how LIKELY they are to happen and how much IMPACT they'd have. It's used in every major project, business plan, and safety analysis worldwide — but it works beautifully for personal decisions too.",
    axes: { x: "Likelihood →", y: "Impact ↑" },
    quadrants: [
      { label: "CRITICAL", desc: "High Likelihood + High Impact — Immediate action needed", color: "bg-red-100 border-red-200 text-red-800", examples: ["No emergency fund + job instability", "Ignoring health symptoms", "Missing loan payments", "No backups for critical data"] },
      { label: "IMPORTANT", desc: "Low Likelihood + High Impact — Prepare & insure against", color: "bg-orange-100 border-orange-200 text-orange-800", examples: ["Natural disaster", "Major illness", "Market crash if invested", "Home burglary"] },
      { label: "MANAGEABLE", desc: "High Likelihood + Low Impact — Monitor & reduce", color: "bg-yellow-100 border-yellow-200 text-yellow-800", examples: ["Minor car repairs", "Seasonal illness", "Small budget overruns", "App subscription hikes"] },
      { label: "MINIMAL", desc: "Low Likelihood + Low Impact — Accept & move on", color: "bg-green-100 border-green-200 text-green-800", examples: ["Losing a pen", "WiFi outage for an hour", "Delayed delivery", "Minor schedule changes"] },
    ],
    whenToUse: ["Planning a major life change", "Evaluating financial risks", "Starting a business or side project", "Making health or safety decisions"],
    proTips: ["Focus your energy on Critical and Important quadrants only", "For Important risks (low chance, high impact), insurance is your friend", "Review your risk matrix quarterly — risks change over time", "Don't waste time worrying about Minimal risks — it's wasted energy"]
  },
  {
    id: "learning",
    name: "Learning Matrix",
    icon: "📚",
    gradient: "from-violet-500 to-purple-600",
    tagline: "Skill vs Knowledge",
    description: "A unique matrix for personal growth that maps your current KNOWLEDGE level against your SKILL level. It reveals exactly where you need to focus: study more, practice more, or both — or where you're already a master.",
    axes: { x: "Skill Level →", y: "Knowledge ↑" },
    quadrants: [
      { label: "HIGH K + HIGH S", desc: "Expert zone — you know it AND can do it", color: "bg-emerald-100 border-emerald-200 text-emerald-800", examples: ["Teach others", "Mentor beginners", "Create content", "Lead projects in this area"] },
      { label: "HIGH K + LOW S", desc: "Theory-rich — you know it but can't do it well yet", color: "bg-blue-100 border-blue-200 text-blue-800", examples: ["Read about coding but never built", "Know nutrition but don't cook", "Study investing but haven't invested", "Need: PRACTICE"] },
      { label: "LOW K + HIGH S", desc: "Natural talent — you can do it but don't understand why", color: "bg-amber-100 border-amber-200 text-amber-800", examples: ["Good at sales but no theory", "Can cook but don't know nutrition", "Can fix things intuitively", "Need: STUDY foundations"] },
      { label: "LOW K + LOW S", desc: "Beginner zone — start here with basics", color: "bg-gray-100 border-gray-200 text-gray-800", examples: ["Complete beginner topics", "New fields of interest", "Future goals", "Need: BOTH study + practice"] },
    ],
    whenToUse: ["Planning your learning journey", "Identifying skill gaps", "Deciding what to study vs. practice", "Career skill assessment"],
    proTips: ["Most people are stuck in 'High Knowledge, Low Skill' — they read but don't DO", "The fastest growth happens when you practice just slightly beyond your comfort zone", "Map all your skills on this matrix quarterly to track progress", "Focus on moving skills from bottom-left to top-right over time"]
  }
];

const MatrixModels: React.FC = () => {
  const [selectedModel, setSelectedModel] = useState<string>("eisenhower");
  const [expandedModel, setExpandedModel] = useState<string | null>(null);

  const currentModel = matrixModels.find((m) => m.id === selectedModel)!;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-violet-500 via-purple-500 to-indigo-600 rounded-2xl p-6 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-10 translate-x-10" />
        <div className="relative">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">📊</span>
            <div>
              <h2 className="font-bold text-xl">Popular Matrix Models</h2>
              <p className="text-white/70 text-sm mt-1">The 4 most powerful frameworks you'll ever need</p>
            </div>
          </div>
          <p className="text-white/80 text-sm leading-relaxed mt-3 max-w-xl">
            Each model is a different "lens" to look at decisions. Learn all four, and you'll 
            have a thinking toolkit that covers prioritization, decision-making, risk evaluation, and personal growth.
          </p>
        </div>
      </div>

      {/* Model Selector */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {matrixModels.map((model) => (
          <button
            key={model.id}
            onClick={() => setSelectedModel(model.id)}
            className={`p-4 rounded-xl border transition-all text-left ${
              selectedModel === model.id
                ? "bg-white border-indigo-200 shadow-md ring-2 ring-indigo-100"
                : "bg-white border-gray-100 hover:border-gray-200 hover:shadow-sm"
            }`}
          >
            <span className="text-2xl">{model.icon}</span>
            <p className="text-sm font-bold text-gray-800 mt-2">{model.name}</p>
            <p className="text-[11px] text-gray-400 mt-1">{model.tagline}</p>
          </button>
        ))}
      </div>

      {/* Selected Model Detail */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        {/* Model Header */}
        <div className={`bg-gradient-to-r ${currentModel.gradient} p-5 text-white`}>
          <div className="flex items-center gap-3">
            <span className="text-3xl">{currentModel.icon}</span>
            <div>
              <h3 className="font-bold text-lg">{currentModel.name}</h3>
              <p className="text-white/70 text-xs mt-0.5">{currentModel.tagline}</p>
            </div>
          </div>
          <p className="text-white/85 text-sm mt-3 leading-relaxed">{currentModel.description}</p>
        </div>

        {/* Visual Matrix Grid */}
        <div className="p-5">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs font-bold text-gray-500">{currentModel.axes.y}</span>
            <div className="h-px bg-gray-200 flex-1" />
            <span className="text-xs font-bold text-gray-500">{currentModel.axes.x}</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {currentModel.quadrants.map((q, idx) => (
              <div key={idx} className={`p-4 rounded-xl border ${q.color}`}>
                <p className="font-bold text-xs mb-1">{q.label}</p>
                <p className="text-[11px] opacity-80 mb-3">{q.desc}</p>
                <div className="space-y-1">
                  {q.examples.map((ex, eidx) => (
                    <div key={eidx} className="flex items-center gap-1.5">
                      <div className="w-1 h-1 rounded-full bg-current opacity-40" />
                      <p className="text-[11px]">{ex}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* When to Use & Pro Tips (side by side) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 border-t border-gray-100">
          <div className="p-5 lg:border-r border-gray-100">
            <p className="text-xs font-bold text-gray-700 mb-3">🎯 When to Use</p>
            <div className="space-y-2">
              {currentModel.whenToUse.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-indigo-50 text-indigo-600 text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">{idx + 1}</span>
                  <p className="text-xs text-gray-600 leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="p-5 border-t lg:border-t-0 border-gray-100">
            <p className="text-xs font-bold text-gray-700 mb-3">💡 Pro Tips</p>
            <div className="space-y-2">
              {currentModel.proTips.map((tip, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <span className="text-amber-500 text-xs flex-shrink-0 mt-0.5">★</span>
                  <p className="text-xs text-gray-600 leading-relaxed">{tip}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* All Models Overview */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <h3 className="text-gray-900 font-bold text-sm mb-4">🗂️ Quick Comparison — All Models</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-3 py-2.5 text-left text-gray-500 font-bold rounded-tl-xl">Matrix</th>
                <th className="px-3 py-2.5 text-left text-gray-500 font-bold">Best For</th>
                <th className="px-3 py-2.5 text-left text-gray-500 font-bold">Axes</th>
                <th className="px-3 py-2.5 text-left text-gray-500 font-bold rounded-tr-xl">Difficulty</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: "Eisenhower", use: "Daily task prioritization", axes: "Urgency × Importance", diff: "⭐ Easy" },
                { name: "Decision", use: "Comparing options objectively", axes: "Options × Criteria (weighted)", diff: "⭐⭐ Medium" },
                { name: "Risk", use: "Evaluating dangers & preparation", axes: "Likelihood × Impact", diff: "⭐⭐ Medium" },
                { name: "Learning", use: "Planning personal growth", axes: "Knowledge × Skill", diff: "⭐ Easy" },
              ].map((row, idx) => (
                <tr key={idx} className="border-t border-gray-50 hover:bg-gray-50/50">
                  <td className="px-3 py-2.5 font-medium text-gray-800">{row.name}</td>
                  <td className="px-3 py-2.5 text-gray-600">{row.use}</td>
                  <td className="px-3 py-2.5 text-gray-600">{row.axes}</td>
                  <td className="px-3 py-2.5 text-gray-600">{row.diff}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Deep Dive Accordion */}
      <div className="space-y-3">
        <h3 className="text-gray-900 font-bold text-sm px-1">📖 Deep Dive into Each Model</h3>
        {matrixModels.map((model) => {
          const isOpen = expandedModel === model.id;
          return (
            <div key={model.id} className="bg-white rounded-xl border border-gray-100">
              <button onClick={() => setExpandedModel(isOpen ? null : model.id)} className="w-full flex items-center gap-3 p-4 text-left">
                <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${model.gradient} flex items-center justify-center text-white text-sm`}>{model.icon}</div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-800">{model.name}</p>
                </div>
                <span className={`text-gray-400 text-xs transition-transform ${isOpen ? "rotate-180" : ""}`}>▼</span>
              </button>
              {isOpen && (
                <div className="px-4 pb-4 space-y-4 border-t border-gray-50 pt-4">
                  <div>
                    <p className="text-xs font-bold text-gray-700 mb-2">Step-by-Step Guide</p>
                    <div className="space-y-2">
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <p className="text-[11px] text-gray-500 font-medium mb-1">Step 1: Set Up Your Grid</p>
                        <p className="text-xs text-gray-600">Draw a 2×2 grid (or use the Matrix Builder). Label the axes: {model.axes.x} and {model.axes.y}.</p>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <p className="text-[11px] text-gray-500 font-medium mb-1">Step 2: List Your Items</p>
                        <p className="text-xs text-gray-600">Write down all items you want to categorize — tasks, options, risks, or skills depending on the matrix type.</p>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <p className="text-[11px] text-gray-500 font-medium mb-1">Step 3: Place Each Item</p>
                        <p className="text-xs text-gray-600">For each item, ask: Where does it fall on each axis? Place it in the appropriate quadrant.</p>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <p className="text-[11px] text-gray-500 font-medium mb-1">Step 4: Act on the Results</p>
                        <p className="text-xs text-gray-600">Each quadrant tells you what to do. Follow the guidance — DO, SCHEDULE, DELEGATE, or ELIMINATE for Eisenhower, for example.</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-3 bg-indigo-50 border border-indigo-100 rounded-lg">
                    <p className="text-xs font-bold text-indigo-700 mb-1">💡 Key Insight</p>
                    <p className="text-[11px] text-indigo-600 leading-relaxed">
                      {model.id === "eisenhower" && "80% of your meaningful results come from Quadrant 2 (Important but Not Urgent). If you're always firefighting in Quadrant 1, you're not planning enough."}
                      {model.id === "decision" && "The power isn't in the final score — it's in the process of thinking through criteria and weights. Often, you realize what matters most to you WHILE building the matrix."}
                      {model.id === "risk" && "Most people overestimate Minimal risks and underestimate Important ones. This matrix forces realistic assessment instead of emotional reaction."}
                      {model.id === "learning" && "The biggest trap is the 'High Knowledge, Low Skill' quadrant — reading 10 books on coding without building a single project. Practice transfers knowledge into ability."}
                    </p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MatrixModels;
