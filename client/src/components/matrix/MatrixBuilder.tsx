import React, { useState, useMemo } from "react";

interface MatrixCell {
  score: number;
}

interface MatrixRow {
  name: string;
  cells: MatrixCell[];
}

interface CriteriaCol {
  name: string;
  weight: number;
}

type MatrixTemplate = {
  name: string;
  icon: string;
  rows: string[];
  cols: { name: string; weight: number }[];
};

const templates: MatrixTemplate[] = [
  {
    name: "Job Comparison",
    icon: "💼",
    rows: ["Company A", "Company B", "Company C"],
    cols: [
      { name: "Salary", weight: 4 },
      { name: "Growth", weight: 5 },
      { name: "Work-Life", weight: 4 },
      { name: "Culture", weight: 3 },
      { name: "Location", weight: 2 },
    ],
  },
  {
    name: "Laptop Purchase",
    icon: "💻",
    rows: ["Budget Option", "Mid-Range", "Premium"],
    cols: [
      { name: "Price", weight: 5 },
      { name: "Performance", weight: 4 },
      { name: "Battery", weight: 3 },
      { name: "Display", weight: 3 },
      { name: "Build Quality", weight: 2 },
    ],
  },
  {
    name: "Skill Priority",
    icon: "📚",
    rows: ["JavaScript", "Python", "Design", "Communication"],
    cols: [
      { name: "Career Impact", weight: 5 },
      { name: "Interest", weight: 4 },
      { name: "Difficulty", weight: 2 },
      { name: "Time Needed", weight: 3 },
    ],
  },
  {
    name: "City to Live In",
    icon: "🏙️",
    rows: ["Bangalore", "Mumbai", "Hyderabad", "Chennai"],
    cols: [
      { name: "Job Market", weight: 5 },
      { name: "Cost of Living", weight: 4 },
      { name: "Climate", weight: 2 },
      { name: "Social Life", weight: 3 },
      { name: "Safety", weight: 4 },
    ],
  },
];

const MatrixBuilder: React.FC = () => {
  const [rows, setRows] = useState<MatrixRow[]>([
    { name: "Option A", cells: [{ score: 0 }, { score: 0 }, { score: 0 }] },
    { name: "Option B", cells: [{ score: 0 }, { score: 0 }, { score: 0 }] },
    { name: "Option C", cells: [{ score: 0 }, { score: 0 }, { score: 0 }] },
  ]);
  const [criteria, setCriteria] = useState<CriteriaCol[]>([
    { name: "Criteria 1", weight: 3 },
    { name: "Criteria 2", weight: 3 },
    { name: "Criteria 3", weight: 3 },
  ]);
  const [matrixTitle, setMatrixTitle] = useState("My Decision Matrix");
  const [showResults, setShowResults] = useState(false);

  const loadTemplate = (template: MatrixTemplate) => {
    const newCriteria = template.cols.map((c) => ({ name: c.name, weight: c.weight }));
    const newRows = template.rows.map((r) => ({
      name: r,
      cells: template.cols.map(() => ({ score: 0 })),
    }));
    setCriteria(newCriteria);
    setRows(newRows);
    setMatrixTitle(`${template.name} Matrix`);
    setShowResults(false);
  };

  const addRow = () => {
    setRows([...rows, { name: `Option ${rows.length + 1}`, cells: criteria.map(() => ({ score: 0 })) }]);
  };

  const removeRow = (idx: number) => {
    if (rows.length <= 2) return;
    setRows(rows.filter((_, i) => i !== idx));
  };

  const addCriteria = () => {
    setCriteria([...criteria, { name: `Criteria ${criteria.length + 1}`, weight: 3 }]);
    setRows(rows.map((r) => ({ ...r, cells: [...r.cells, { score: 0 }] })));
  };

  const removeCriteria = (idx: number) => {
    if (criteria.length <= 2) return;
    setCriteria(criteria.filter((_, i) => i !== idx));
    setRows(rows.map((r) => ({ ...r, cells: r.cells.filter((_, i) => i !== idx) })));
  };

  const updateRowName = (rowIdx: number, name: string) => {
    const updated = [...rows];
    updated[rowIdx] = { ...updated[rowIdx], name };
    setRows(updated);
  };

  const updateCriteriaName = (colIdx: number, name: string) => {
    const updated = [...criteria];
    updated[colIdx] = { ...updated[colIdx], name };
    setCriteria(updated);
  };

  const updateWeight = (colIdx: number, weight: number) => {
    const updated = [...criteria];
    updated[colIdx] = { ...updated[colIdx], weight: Math.max(1, Math.min(5, weight)) };
    setCriteria(updated);
  };

  const updateScore = (rowIdx: number, colIdx: number, score: number) => {
    const updated = [...rows];
    updated[rowIdx] = {
      ...updated[rowIdx],
      cells: updated[rowIdx].cells.map((c, i) =>
        i === colIdx ? { score: Math.max(0, Math.min(10, score)) } : c
      ),
    };
    setRows(updated);
  };

  const results = useMemo(() => {
    return rows.map((row) => {
      const weightedTotal = row.cells.reduce((sum, cell, idx) => sum + cell.score * criteria[idx].weight, 0);
      const maxPossible = criteria.reduce((sum, c) => sum + 10 * c.weight, 0);
      const percentage = maxPossible > 0 ? Math.round((weightedTotal / maxPossible) * 100) : 0;
      return { name: row.name, total: weightedTotal, maxPossible, percentage };
    });
  }, [rows, criteria]);

  const sortedResults = useMemo(() => [...results].sort((a, b) => b.total - a.total), [results]);
  const bestOption = sortedResults.length > 0 ? sortedResults[0] : null;
  const hasScores = rows.some((r) => r.cells.some((c) => c.score > 0));

  const resetMatrix = () => {
    setRows([
      { name: "Option A", cells: [{ score: 0 }, { score: 0 }, { score: 0 }] },
      { name: "Option B", cells: [{ score: 0 }, { score: 0 }, { score: 0 }] },
      { name: "Option C", cells: [{ score: 0 }, { score: 0 }, { score: 0 }] },
    ]);
    setCriteria([
      { name: "Criteria 1", weight: 3 },
      { name: "Criteria 2", weight: 3 },
      { name: "Criteria 3", weight: 3 },
    ]);
    setMatrixTitle("My Decision Matrix");
    setShowResults(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-cyan-500 via-blue-500 to-indigo-600 rounded-2xl p-6 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-44 h-44 bg-white/5 rounded-full -translate-y-10 translate-x-10" />
        <div className="relative">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">🔧</span>
            <div>
              <h2 className="font-bold text-xl">Interactive Matrix Builder</h2>
              <p className="text-white/70 text-sm mt-1">Build, score, and compare — your personal decision engine</p>
            </div>
          </div>
          <p className="text-white/80 text-sm leading-relaxed mt-3 max-w-xl">
            Create a custom decision matrix from scratch or use a template. Add your options, define your criteria, 
            assign weights, score everything, and let the math reveal the best choice.
          </p>
        </div>
      </div>

      {/* Templates */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-sm text-gray-800">⚡ Quick Templates</h3>
          <button onClick={resetMatrix} className="text-[11px] text-gray-400 hover:text-red-500 transition-colors">Reset Matrix</button>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
          {templates.map((t, idx) => (
            <button
              key={idx}
              onClick={() => loadTemplate(t)}
              className="p-3 bg-gray-50 rounded-xl hover:bg-indigo-50 hover:border-indigo-200 border border-gray-100 transition-all text-left"
            >
              <span className="text-lg">{t.icon}</span>
              <p className="text-xs font-semibold text-gray-700 mt-1">{t.name}</p>
              <p className="text-[10px] text-gray-400 mt-0.5">{t.rows.length} options × {t.cols.length} criteria</p>
            </button>
          ))}
        </div>
      </div>

      {/* Matrix Title */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5">
        <label className="text-xs font-bold text-gray-700">📝 Matrix Title</label>
        <input
          type="text"
          value={matrixTitle}
          onChange={(e) => setMatrixTitle(e.target.value)}
          className="w-full mt-2 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-300"
          placeholder="Name your decision matrix..."
        />
      </div>

      {/* Criteria Setup */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-sm text-gray-800">📊 Define Criteria & Weights</h3>
          <button onClick={addCriteria} className="px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-lg text-[11px] font-medium hover:bg-indigo-100 transition-all">
            + Add Criteria
          </button>
        </div>
        <p className="text-[11px] text-gray-400 mb-3">Weight = how important this criterion is (1 = low, 5 = most important)</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {criteria.map((c, idx) => (
            <div key={idx} className="p-3 bg-gray-50 rounded-xl border border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] text-gray-400 font-medium">Criteria {idx + 1}</span>
                {criteria.length > 2 && (
                  <button onClick={() => removeCriteria(idx)} className="text-gray-300 hover:text-red-400 text-sm transition-colors">×</button>
                )}
              </div>
              <input
                type="text"
                value={c.name}
                onChange={(e) => updateCriteriaName(idx, e.target.value)}
                className="w-full px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-indigo-200"
                placeholder="Criteria name..."
              />
              <div className="flex items-center gap-2 mt-2">
                <span className="text-[10px] text-gray-500 font-medium">Weight:</span>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((w) => (
                    <button
                      key={w}
                      onClick={() => updateWeight(idx, w)}
                      className={`w-6 h-6 rounded text-[10px] font-bold transition-all ${
                        c.weight >= w
                          ? "bg-indigo-500 text-white"
                          : "bg-gray-200 text-gray-400 hover:bg-gray-300"
                      }`}
                    >
                      {w}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Matrix Input */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-sm text-gray-800">🎯 Score Your Options (1-10)</h3>
          <button onClick={addRow} className="px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-lg text-[11px] font-medium hover:bg-emerald-100 transition-all">
            + Add Option
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-3 py-2.5 text-left text-gray-500 font-bold rounded-tl-xl min-w-[130px]">
                  Options
                </th>
                {criteria.map((c, idx) => (
                  <th key={idx} className="px-2 py-2.5 text-center min-w-[80px]">
                    <p className="text-indigo-600 font-bold text-[10px]">{c.name}</p>
                    <p className="text-gray-400 text-[9px] mt-0.5">×{c.weight}</p>
                  </th>
                ))}
                <th className="px-3 py-2.5 text-center text-gray-500 font-bold rounded-tr-xl min-w-[50px]">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, ridx) => (
                <tr key={ridx} className="border-t border-gray-50">
                  <td className="px-2 py-2">
                    <input
                      type="text"
                      value={row.name}
                      onChange={(e) => updateRowName(ridx, e.target.value)}
                      className="w-full px-2 py-1.5 bg-blue-50 border border-blue-100 rounded-lg text-xs font-medium focus:outline-none focus:ring-1 focus:ring-indigo-200"
                    />
                  </td>
                  {row.cells.map((cell, cidx) => (
                    <td key={cidx} className="px-2 py-2 text-center">
                      <input
                        type="number"
                        min={0}
                        max={10}
                        value={cell.score || ""}
                        onChange={(e) => updateScore(ridx, cidx, parseInt(e.target.value) || 0)}
                        className="w-14 mx-auto px-2 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs text-center focus:outline-none focus:ring-1 focus:ring-indigo-200"
                        placeholder="0"
                      />
                    </td>
                  ))}
                  <td className="px-2 py-2 text-center">
                    {rows.length > 2 && (
                      <button
                        onClick={() => removeRow(ridx)}
                        className="text-gray-300 hover:text-red-400 text-sm transition-colors"
                      >
                        ×
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Calculate Button */}
      <div className="text-center">
        <button
          onClick={() => setShowResults(true)}
          disabled={!hasScores}
          className={`px-6 py-3 rounded-xl text-sm font-bold transition-all ${
            hasScores
              ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:shadow-lg hover:shadow-indigo-200 active:scale-95"
              : "bg-gray-100 text-gray-400 cursor-not-allowed"
          }`}
        >
          🧮 Calculate Results
        </button>
        {!hasScores && <p className="text-[10px] text-gray-400 mt-2">Fill in at least some scores to see results</p>}
      </div>

      {/* Results */}
      {showResults && hasScores && (
        <div className="space-y-4">
          {/* Winner Banner */}
          {bestOption && (
            <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl p-5 text-white">
              <div className="flex items-center gap-3">
                <span className="text-3xl">🏆</span>
                <div>
                  <p className="text-white/70 text-xs font-medium">Best Option</p>
                  <h3 className="font-bold text-xl">{bestOption.name}</h3>
                  <p className="text-white/80 text-sm mt-1">
                    Weighted Score: <strong>{bestOption.total}</strong> / {bestOption.maxPossible} ({bestOption.percentage}%)
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* All Results */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <h3 className="font-bold text-sm text-gray-800 mb-4">📊 Full Results — {matrixTitle}</h3>
            <div className="space-y-3">
              {sortedResults.map((result, idx) => (
                <div key={idx} className="flex items-center gap-4">
                  <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                    idx === 0 ? "bg-amber-100 text-amber-700" : idx === 1 ? "bg-gray-100 text-gray-600" : "bg-gray-50 text-gray-400"
                  }`}>
                    {idx + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-xs font-semibold text-gray-800 truncate">{result.name}</p>
                      <p className="text-xs font-bold text-gray-600">{result.total} pts ({result.percentage}%)</p>
                    </div>
                    <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-700 ${
                          idx === 0 ? "bg-gradient-to-r from-emerald-400 to-teal-500" : idx === 1 ? "bg-gradient-to-r from-blue-400 to-indigo-500" : "bg-gradient-to-r from-gray-300 to-gray-400"
                        }`}
                        style={{ width: `${result.percentage}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Detailed Breakdown */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <h3 className="font-bold text-sm text-gray-800 mb-4">🔍 Detailed Breakdown</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-[11px]">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-3 py-2 text-left text-gray-500 font-bold rounded-tl-xl">Option</th>
                    {criteria.map((c, idx) => (
                      <th key={idx} className="px-2 py-2 text-center text-gray-500 font-bold">
                        {c.name} (×{c.weight})
                      </th>
                    ))}
                    <th className="px-3 py-2 text-center text-gray-500 font-bold rounded-tr-xl">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, ridx) => (
                    <tr key={ridx} className="border-t border-gray-50">
                      <td className="px-3 py-2 font-medium text-gray-800">{row.name}</td>
                      {row.cells.map((cell, cidx) => (
                        <td key={cidx} className="px-2 py-2 text-center">
                          <span className="text-gray-500">{cell.score}</span>
                          <span className="text-gray-300 mx-0.5">×</span>
                          <span className="text-gray-400">{criteria[cidx].weight}</span>
                          <span className="text-gray-300 mx-0.5">=</span>
                          <span className="font-bold text-gray-700">{cell.score * criteria[cidx].weight}</span>
                        </td>
                      ))}
                      <td className="px-3 py-2 text-center font-bold text-indigo-600">
                        {results[ridx].total}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Insight */}
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl border border-indigo-100 p-5">
            <p className="text-xs font-bold text-indigo-700 mb-2">💡 Remember</p>
            <p className="text-xs text-indigo-600 leading-relaxed">
              The matrix gives you the <strong>data-backed recommendation</strong>, but it's not the final word. 
              If the top 2 options are within 10% of each other, they're essentially equal — trust your instinct. 
              The real power of the matrix is in the <strong>thinking process</strong>, not just the final number.
            </p>
          </div>
        </div>
      )}

      {/* Instructions */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5">
        <h3 className="font-bold text-sm text-gray-800 mb-3">📖 How to Use This Builder</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { step: "1", title: "Name your options", desc: "Click on 'Option A' etc. to type real names (e.g., 'Google', 'Amazon')" },
            { step: "2", title: "Define criteria", desc: "Change criteria names to what matters to you. Add or remove as needed" },
            { step: "3", title: "Set weights", desc: "Click weight buttons (1-5) to indicate how important each criterion is" },
            { step: "4", title: "Score honestly", desc: "Rate each option 0-10 on each criterion. Be honest, not hopeful" },
            { step: "5", title: "Calculate", desc: "Hit Calculate to see weighted totals, rankings, and detailed breakdown" },
            { step: "6", title: "Decide wisely", desc: "Use the data plus your intuition — the best decision combines both" },
          ].map((item, idx) => (
            <div key={idx} className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
              <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">{item.step}</span>
              <div>
                <p className="text-xs font-semibold text-gray-800">{item.title}</p>
                <p className="text-[11px] text-gray-500 mt-0.5">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MatrixBuilder;
