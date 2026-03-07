import React, { useState } from "react";
import { useMoneyContext } from "../../context/MoneyContext";
import { investmentTypeConfig } from "../../data/moneyData";
import { InvestmentType } from "../../types/money";

const InvestmentTracker: React.FC = () => {
  const { investments, addInvestment, removeInvestment } = useMoneyContext();
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [type, setType] = useState<InvestmentType>("mutual-funds");
  const [investedAmount, setInvestedAmount] = useState("");
  const [currentValue, setCurrentValue] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [units, setUnits] = useState("");
  const [notes, setNotes] = useState("");
  const [filter, setFilter] = useState<string>("all");

  const fmt = (n: number) => {
    if (n >= 100000) return `₹${(n / 100000).toFixed(1)}L`;
    if (n >= 1000) return `₹${(n / 1000).toFixed(1)}K`;
    return `₹${n.toLocaleString("en-IN")}`;
  };

  const totalInvested = investments.reduce((s, i) => s + i.investedAmount, 0);
  const totalCurrent = investments.reduce((s, i) => s + i.currentValue, 0);
  const totalGain = totalCurrent - totalInvested;
  const totalReturn = totalInvested > 0 ? ((totalGain / totalInvested) * 100).toFixed(1) : "0";

  // Group by type
  const typeTotals: Record<string, { invested: number; current: number; count: number }> = {};
  investments.forEach((inv) => {
    if (!typeTotals[inv.type]) typeTotals[inv.type] = { invested: 0, current: 0, count: 0 };
    typeTotals[inv.type].invested += inv.investedAmount;
    typeTotals[inv.type].current += inv.currentValue;
    typeTotals[inv.type].count++;
  });

  const filtered = filter === "all" ? investments : investments.filter((i) => i.type === filter);

  const handleAdd = () => {
    if (!name || !investedAmount || !currentValue) return;
    addInvestment({
      id: `inv-${Date.now()}`,
      name,
      type,
      investedAmount: parseFloat(investedAmount),
      currentValue: parseFloat(currentValue),
      date,
      units: units ? parseFloat(units) : undefined,
      notes: notes || undefined,
    });
    setName(""); setInvestedAmount(""); setCurrentValue(""); setUnits(""); setNotes("");
    setShowForm(false);
  };

  return (
    <div className="space-y-6">
      {/* Portfolio Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <p className="text-gray-500 text-xs font-medium">Total Invested</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{fmt(totalInvested)}</p>
          <p className="text-[11px] text-gray-400 mt-1">{investments.length} investments</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <p className="text-gray-500 text-xs font-medium">Current Value</p>
          <p className="text-2xl font-bold text-blue-600 mt-1">{fmt(totalCurrent)}</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <p className="text-gray-500 text-xs font-medium">Total Gain/Loss</p>
          <p className={`text-2xl font-bold mt-1 ${totalGain >= 0 ? "text-emerald-600" : "text-red-600"}`}>
            {totalGain >= 0 ? "+" : ""}{fmt(totalGain)}
          </p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <p className="text-gray-500 text-xs font-medium">Overall Return</p>
          <p className={`text-2xl font-bold mt-1 ${totalGain >= 0 ? "text-emerald-600" : "text-red-600"}`}>
            {totalGain >= 0 ? "+" : ""}{totalReturn}%
          </p>
        </div>
      </div>

      {/* Asset Allocation */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <h3 className="text-gray-900 font-bold text-sm mb-4">Asset Allocation</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {Object.entries(typeTotals)
            .sort((a, b) => b[1].current - a[1].current)
            .map(([type, data]) => {
              const cfg = investmentTypeConfig[type] || { label: type, icon: "💼", color: "from-gray-500 to-slate-600" };
              const gain = data.current - data.invested;
              const returnPct = data.invested > 0 ? ((gain / data.invested) * 100).toFixed(1) : "0";
              const allocationPct = totalCurrent > 0 ? Math.round((data.current / totalCurrent) * 100) : 0;
              return (
                <div key={type} className="p-4 bg-gray-50 rounded-xl hover:shadow-md transition-all">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${cfg.color} flex items-center justify-center text-lg mb-2`}>
                    {cfg.icon}
                  </div>
                  <p className="text-xs font-semibold text-gray-800">{cfg.label}</p>
                  <p className="text-lg font-bold text-gray-900">{fmt(data.current)}</p>
                  <div className="flex items-center justify-between mt-1">
                    <span className={`text-[10px] font-medium ${gain >= 0 ? "text-emerald-600" : "text-red-600"}`}>
                      {gain >= 0 ? "+" : ""}{returnPct}%
                    </span>
                    <span className="text-[10px] text-gray-400">{allocationPct}%</span>
                  </div>
                  <p className="text-[10px] text-gray-400 mt-0.5">{data.count} holding{data.count > 1 ? "s" : ""}</p>
                </div>
              );
            })}
        </div>
      </div>

      {/* Add Form */}
      {showForm && (
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h3 className="text-gray-900 font-bold text-sm mb-4">Add Investment</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-500 mb-1">Investment Name</label>
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Nifty 50 Index Fund" className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400" />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Type</label>
              <select value={type} onChange={(e) => setType(e.target.value as InvestmentType)} className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl bg-white focus:outline-none">
                {Object.entries(investmentTypeConfig).map(([k, v]) => (
                  <option key={k} value={k}>{v.icon} {v.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Invested Amount (₹)</label>
              <input type="number" value={investedAmount} onChange={(e) => setInvestedAmount(e.target.value)} placeholder="0" className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400" />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Current Value (₹)</label>
              <input type="number" value={currentValue} onChange={(e) => setCurrentValue(e.target.value)} placeholder="0" className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400" />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Date</label>
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400" />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Units (optional)</label>
              <input type="number" value={units} onChange={(e) => setUnits(e.target.value)} placeholder="0" className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs text-gray-500 mb-1">Notes (optional)</label>
              <input value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="SIP, lump sum, etc." className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400" />
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <button onClick={handleAdd} className="px-4 py-2 text-xs font-medium text-white bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl hover:shadow-lg transition-all">Add Investment</button>
            <button onClick={() => setShowForm(false)} className="px-4 py-2 text-xs font-medium text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 transition-all">Cancel</button>
          </div>
        </div>
      )}

      {/* Holdings */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-gray-900 font-bold text-sm">Holdings</h3>
          <div className="flex items-center gap-2">
            <select value={filter} onChange={(e) => setFilter(e.target.value)} className="text-xs px-3 py-1.5 border border-gray-200 rounded-lg bg-white focus:outline-none">
              <option value="all">All Types</option>
              {Object.entries(investmentTypeConfig).map(([k, v]) => (
                <option key={k} value={k}>{v.label}</option>
              ))}
            </select>
            {!showForm && (
              <button onClick={() => setShowForm(true)} className="px-3 py-1.5 text-xs font-medium text-white bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg hover:shadow-md transition-all">+ Add</button>
            )}
          </div>
        </div>
        <div className="space-y-2">
          {filtered.map((inv) => {
            const cfg = investmentTypeConfig[inv.type] || { label: inv.type, icon: "💼", color: "from-gray-500 to-slate-600" };
            const gain = inv.currentValue - inv.investedAmount;
            const returnPct = inv.investedAmount > 0 ? ((gain / inv.investedAmount) * 100).toFixed(1) : "0";
            return (
              <div key={inv.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition-colors group">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${cfg.color} flex items-center justify-center text-white text-sm`}>
                    {cfg.icon}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">{inv.name}</p>
                    <p className="text-[11px] text-gray-400">
                      {cfg.label} · {new Date(inv.date).toLocaleDateString("en-IN", { month: "short", year: "numeric" })}
                      {inv.units && ` · ${inv.units} units`}
                    </p>
                  </div>
                </div>
                <div className="text-right flex items-center gap-3">
                  <div>
                    <p className="text-sm font-bold text-gray-900">{fmt(inv.currentValue)}</p>
                    <p className={`text-[11px] font-medium ${gain >= 0 ? "text-emerald-600" : "text-red-600"}`}>
                      {gain >= 0 ? "+" : ""}{fmt(gain)} ({gain >= 0 ? "+" : ""}{returnPct}%)
                    </p>
                  </div>
                  <button onClick={() => removeInvestment(inv.id)} className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-600 text-xs transition-all">✕</button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default InvestmentTracker;
