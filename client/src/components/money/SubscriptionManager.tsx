import React, { useState } from "react";
import { useMoneyContext } from "../../context/MoneyContext";

const SubscriptionManager: React.FC = () => {
  const { subscriptions, addSubscription, toggleSubscription, removeSubscription } = useMoneyContext();
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [icon, setIcon] = useState("📱");
  const [amount, setAmount] = useState("");
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");
  const [nextPayment, setNextPayment] = useState(new Date().toISOString().split("T")[0]);
  const [category, setCategory] = useState("Software");

  const fmt = (n: number) => `₹${n.toLocaleString("en-IN")}`;

  const activeSubs = subscriptions.filter((s) => s.active);
  const inactiveSubs = subscriptions.filter((s) => !s.active);

  const monthlyTotal = activeSubs.reduce((s, sub) => s + (sub.billingCycle === "monthly" ? sub.amount : sub.amount / 12), 0);
  const yearlyTotal = monthlyTotal * 12;

  // Group by category
  const catTotals: Record<string, { count: number; monthly: number }> = {};
  activeSubs.forEach((s) => {
    if (!catTotals[s.category]) catTotals[s.category] = { count: 0, monthly: 0 };
    catTotals[s.category].count++;
    catTotals[s.category].monthly += s.billingCycle === "monthly" ? s.amount : s.amount / 12;
  });

  // Upcoming payments (next 30 days)
  const now = new Date();
  const thirtyDays = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
  const upcoming = activeSubs
    .filter((s) => new Date(s.nextPayment) <= thirtyDays)
    .sort((a, b) => new Date(a.nextPayment).getTime() - new Date(b.nextPayment).getTime());

  const handleAdd = () => {
    if (!name || !amount) return;
    addSubscription({
      id: `sub-${Date.now()}`,
      name,
      icon,
      amount: parseFloat(amount),
      billingCycle,
      nextPayment,
      category,
      active: true,
    });
    setName(""); setAmount(""); setIcon("📱");
    setShowForm(false);
  };

  const iconOptions = ["📱", "🎬", "🎵", "💻", "🤖", "🎨", "☁️", "📦", "🎮", "📰", "🔒", "📧"];
  const categoryOptions = ["Software", "Entertainment", "Storage", "Shopping", "Education", "Productivity", "Gaming", "News"];

  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <p className="text-gray-500 text-xs font-medium">Monthly Cost</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{fmt(Math.round(monthlyTotal))}</p>
          <p className="text-[11px] text-gray-400">{activeSubs.length} active subscriptions</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <p className="text-gray-500 text-xs font-medium">Yearly Cost</p>
          <p className="text-2xl font-bold text-amber-600 mt-1">{fmt(Math.round(yearlyTotal))}</p>
          <p className="text-[11px] text-gray-400">Projected yearly spend</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <p className="text-gray-500 text-xs font-medium">Upcoming (30 days)</p>
          <p className="text-2xl font-bold text-blue-600 mt-1">{upcoming.length}</p>
          <p className="text-[11px] text-gray-400">{fmt(upcoming.reduce((s, u) => s + u.amount, 0))} due</p>
        </div>
      </div>

      {/* Category Breakdown */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <h3 className="text-gray-900 font-bold text-sm mb-4">By Category</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {Object.entries(catTotals).sort((a, b) => b[1].monthly - a[1].monthly).map(([cat, data]) => (
            <div key={cat} className="p-3 bg-gray-50 rounded-xl text-center">
              <p className="text-xs font-semibold text-gray-800">{cat}</p>
              <p className="text-lg font-bold text-gray-900">{fmt(Math.round(data.monthly))}<span className="text-[10px] text-gray-400">/mo</span></p>
              <p className="text-[10px] text-gray-400">{data.count} subscription{data.count > 1 ? "s" : ""}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Payments */}
      {upcoming.length > 0 && (
        <div className="bg-white rounded-2xl border border-amber-100 p-6">
          <h3 className="text-gray-900 font-bold text-sm mb-3">⏰ Upcoming Payments</h3>
          <div className="space-y-2">
            {upcoming.map((sub) => {
              const daysUntil = Math.ceil((new Date(sub.nextPayment).getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
              return (
                <div key={sub.id} className="flex items-center justify-between p-3 bg-amber-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{sub.icon}</span>
                    <div>
                      <p className="text-sm font-medium text-gray-800">{sub.name}</p>
                      <p className="text-[11px] text-gray-500">
                        {daysUntil <= 0 ? "Due today" : daysUntil === 1 ? "Due tomorrow" : `In ${daysUntil} days`}
                        {" · "}{new Date(sub.nextPayment).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                      </p>
                    </div>
                  </div>
                  <span className="text-sm font-bold text-gray-900">{fmt(sub.amount)}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Add Form */}
      {showForm && (
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h3 className="text-gray-900 font-bold text-sm mb-4">Add Subscription</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-500 mb-1">Name</label>
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Spotify" className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-400" />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Amount (₹)</label>
              <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="0" className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-400" />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Billing Cycle</label>
              <select value={billingCycle} onChange={(e) => setBillingCycle(e.target.value as "monthly" | "yearly")} className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl bg-white focus:outline-none">
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
              </select>
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Category</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl bg-white focus:outline-none">
                {categoryOptions.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Next Payment Date</label>
              <input type="date" value={nextPayment} onChange={(e) => setNextPayment(e.target.value)} className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-400" />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Icon</label>
              <div className="flex gap-1.5 flex-wrap">
                {iconOptions.map((ic) => (
                  <button key={ic} onClick={() => setIcon(ic)} className={`w-8 h-8 rounded-lg text-base flex items-center justify-center border transition-all ${icon === ic ? "border-purple-400 bg-purple-50" : "border-gray-200 hover:border-gray-300"}`}>
                    {ic}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <button onClick={handleAdd} className="px-4 py-2 text-xs font-medium text-white bg-gradient-to-r from-purple-500 to-violet-600 rounded-xl hover:shadow-lg transition-all">Add Subscription</button>
            <button onClick={() => setShowForm(false)} className="px-4 py-2 text-xs font-medium text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 transition-all">Cancel</button>
          </div>
        </div>
      )}

      {/* Active Subscriptions */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-gray-900 font-bold text-sm">Active Subscriptions</h3>
          {!showForm && (
            <button onClick={() => setShowForm(true)} className="px-3 py-1.5 text-xs font-medium text-white bg-gradient-to-r from-purple-500 to-violet-600 rounded-lg hover:shadow-md transition-all">+ Add</button>
          )}
        </div>
        <div className="space-y-2">
          {activeSubs.map((sub) => (
            <div key={sub.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition-colors group">
              <div className="flex items-center gap-3">
                <span className="text-xl">{sub.icon}</span>
                <div>
                  <p className="text-sm font-medium text-gray-800">{sub.name}</p>
                  <p className="text-[11px] text-gray-400">{sub.category} · {sub.billingCycle} · Next: {new Date(sub.nextPayment).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-bold text-gray-900">{fmt(sub.amount)}<span className="text-[10px] text-gray-400">/{sub.billingCycle === "monthly" ? "mo" : "yr"}</span></span>
                <button onClick={() => toggleSubscription(sub.id)} className="opacity-0 group-hover:opacity-100 text-[10px] px-2 py-1 bg-amber-100 text-amber-700 rounded-lg hover:bg-amber-200 transition-all">Pause</button>
                <button onClick={() => removeSubscription(sub.id)} className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-600 text-xs transition-all">✕</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Inactive Subscriptions */}
      {inactiveSubs.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h3 className="text-gray-900 font-bold text-sm mb-4">Paused / Cancelled</h3>
          <div className="space-y-2">
            {inactiveSubs.map((sub) => (
              <div key={sub.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl opacity-60 hover:opacity-100 transition-opacity group">
                <div className="flex items-center gap-3">
                  <span className="text-xl grayscale">{sub.icon}</span>
                  <div>
                    <p className="text-sm font-medium text-gray-600 line-through">{sub.name}</p>
                    <p className="text-[11px] text-gray-400">{sub.category} · {fmt(sub.amount)}/{sub.billingCycle === "monthly" ? "mo" : "yr"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => toggleSubscription(sub.id)} className="opacity-0 group-hover:opacity-100 text-[10px] px-2 py-1 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-all">Reactivate</button>
                  <button onClick={() => removeSubscription(sub.id)} className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-600 text-xs transition-all">✕</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SubscriptionManager;
