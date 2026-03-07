import React, { useState, useRef, useEffect } from "react";
import { useMoneyContext } from "../../context/MoneyContext";
import { expenseCategoryConfig, incomeCategoryConfig } from "../../data/moneyData";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const AIFinancialAssistant: React.FC = () => {
  const { incomes, expenses, budget, savingsGoals, investments, subscriptions, getStats } = useMoneyContext();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "👋 Hi! I'm your AI Financial Assistant. I can help you analyze your spending, suggest budgets, and provide savings strategies. Try asking me something!",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const fmt = (n: number) => {
    if (n >= 100000) return `₹${(n / 100000).toFixed(1)}L`;
    if (n >= 1000) return `₹${(n / 1000).toFixed(1)}K`;
    return `₹${n.toLocaleString("en-IN")}`;
  };

  const generateResponse = (query: string): string => {
    const q = query.toLowerCase();
    const stats = getStats();

    // Category analysis
    const catTotals: Record<string, number> = {};
    expenses.forEach((e) => { catTotals[e.category] = (catTotals[e.category] || 0) + e.amount; });
    const sortedCats = Object.entries(catTotals).sort((a, b) => b[1] - a[1]);

    // Monthly data
    const currentMonth = new Date().toISOString().slice(0, 7);
    const monthIncome = incomes.filter((i) => i.date.startsWith(currentMonth)).reduce((s, i) => s + i.amount, 0);
    const monthExpenses = expenses.filter((e) => e.date.startsWith(currentMonth)).reduce((s, e) => s + e.amount, 0);

    const activeSubs = subscriptions.filter((s) => s.active);
    const subCost = activeSubs.reduce((s, sub) => s + (sub.billingCycle === "monthly" ? sub.amount : sub.amount / 12), 0);

    if (q.includes("summary") || q.includes("overview") || q.includes("how am i doing")) {
      const savingsRate = stats.totalIncome > 0 ? Math.round(((stats.totalIncome - stats.totalExpenses) / stats.totalIncome) * 100) : 0;
      return `📊 **Financial Summary:**\n\n• Total Income: ${fmt(stats.totalIncome)}\n• Total Expenses: ${fmt(stats.totalExpenses)}\n• Net Balance: ${fmt(stats.netBalance)}\n• Savings Rate: ${savingsRate}%\n• Active Investments: ${fmt(stats.totalInvestments)}\n• Savings Goals Progress: ${fmt(stats.totalSavings)}\n\n${savingsRate >= 20 ? "✅ Your savings rate is healthy! Keep it up." : "⚠️ Try to increase savings to at least 20% of income."}`;
    }

    if (q.includes("expense") || q.includes("spending") || q.includes("spend")) {
      const top3 = sortedCats.slice(0, 3);
      let resp = `💸 **Spending Analysis:**\n\nTotal Expenses: ${fmt(stats.totalExpenses)}\nThis Month: ${fmt(monthExpenses)}\n\nTop spending categories:\n`;
      top3.forEach(([cat, amt], i) => {
        const cfg = expenseCategoryConfig[cat];
        resp += `${i + 1}. ${cfg?.icon || "📦"} ${cfg?.label || cat}: ${fmt(amt)} (${Math.round((amt / stats.totalExpenses) * 100)}%)\n`;
      });
      if (sortedCats[0]) {
        const topCfg = expenseCategoryConfig[sortedCats[0][0]];
        resp += `\n💡 **Tip:** ${topCfg?.label || sortedCats[0][0]} is your biggest expense. Can you reduce it by 10-15%?`;
      }
      return resp;
    }

    if (q.includes("income") || q.includes("earning") || q.includes("earn")) {
      const incByCategory: Record<string, number> = {};
      incomes.forEach((i) => { incByCategory[i.category] = (incByCategory[i.category] || 0) + i.amount; });
      const topSource = Object.entries(incByCategory).sort((a, b) => b[1] - a[1])[0];
      let resp = `💰 **Income Analysis:**\n\nTotal Income: ${fmt(stats.totalIncome)}\nThis Month: ${fmt(monthIncome)}\nSources: ${Object.keys(incByCategory).length}\n\n`;
      Object.entries(incByCategory).sort((a, b) => b[1] - a[1]).forEach(([cat, amt]) => {
        const cfg = incomeCategoryConfig[cat];
        resp += `• ${cfg?.icon || "💰"} ${cfg?.label || cat}: ${fmt(amt)}\n`;
      });
      if (topSource && stats.totalIncome > 0) {
        const dep = Math.round((topSource[1] / stats.totalIncome) * 100);
        resp += `\n${dep > 70 ? "⚠️ " + dep + "% of income is from one source. Consider diversifying." : "✅ Good income diversification!"}`;
      }
      return resp;
    }

    if (q.includes("budget")) {
      const monthExp = expenses.filter((e) => e.date.startsWith(budget.month));
      const actualByCategory: Record<string, number> = {};
      monthExp.forEach((e) => { actualByCategory[e.category] = (actualByCategory[e.category] || 0) + e.amount; });
      const over = budget.categoryBudgets.filter((cb) => (actualByCategory[cb.category] || 0) > cb.limit);
      let resp = `📋 **Budget Status (${new Date(budget.month + "-01").toLocaleDateString("en-IN", { month: "long", year: "numeric" })}):**\n\n`;
      resp += `Planned: ${fmt(budget.plannedSpending)} | Actual: ${fmt(monthExp.reduce((s, e) => s + e.amount, 0))}\n`;
      resp += `Savings Target: ${fmt(budget.savingsTarget)}\n\n`;
      if (over.length > 0) {
        resp += `⚠️ **Over budget in:**\n`;
        over.forEach((o) => {
          const actual = actualByCategory[o.category] || 0;
          const cfg = expenseCategoryConfig[o.category];
          resp += `• ${cfg?.icon} ${cfg?.label}: ${fmt(actual)} / ${fmt(o.limit)} (+${fmt(actual - o.limit)})\n`;
        });
      } else {
        resp += `✅ All categories within budget! Great discipline.`;
      }
      return resp;
    }

    if (q.includes("savings") || q.includes("saving") || q.includes("goal")) {
      let resp = `🎯 **Savings Goals:**\n\n`;
      savingsGoals.forEach((g) => {
        const pct = Math.round((g.currentAmount / g.targetAmount) * 100);
        resp += `${g.icon} ${g.name}: ${fmt(g.currentAmount)} / ${fmt(g.targetAmount)} (${pct}%)\n`;
      });
      const totalSaved = savingsGoals.reduce((s, g) => s + g.currentAmount, 0);
      const totalTarget = savingsGoals.reduce((s, g) => s + g.targetAmount, 0);
      resp += `\n📊 Overall: ${fmt(totalSaved)} / ${fmt(totalTarget)} (${Math.round((totalSaved / totalTarget) * 100)}%)\n`;
      resp += `\n💡 Focus on high-priority goals first, especially your emergency fund!`;
      return resp;
    }

    if (q.includes("invest")) {
      const totalInv = investments.reduce((s, i) => s + i.investedAmount, 0);
      const totalCur = investments.reduce((s, i) => s + i.currentValue, 0);
      const gain = totalCur - totalInv;
      let resp = `📈 **Investment Portfolio:**\n\n`;
      resp += `Total Invested: ${fmt(totalInv)}\nCurrent Value: ${fmt(totalCur)}\nGain/Loss: ${gain >= 0 ? "+" : ""}${fmt(gain)} (${totalInv > 0 ? ((gain / totalInv) * 100).toFixed(1) : 0}%)\n\nHoldings:\n`;
      investments.forEach((inv) => {
        const g = inv.currentValue - inv.investedAmount;
        resp += `• ${inv.name}: ${fmt(inv.currentValue)} (${g >= 0 ? "+" : ""}${fmt(g)})\n`;
      });
      resp += `\n💡 Keep investing regularly. SIPs are great for long-term wealth building.`;
      return resp;
    }

    if (q.includes("subscription") || q.includes("sub")) {
      let resp = `🔄 **Subscriptions:**\n\n`;
      resp += `Active: ${activeSubs.length} | Monthly Cost: ${fmt(Math.round(subCost))}\nYearly Cost: ${fmt(Math.round(subCost * 12))}\n\n`;
      activeSubs.forEach((s) => {
        resp += `${s.icon} ${s.name}: ${fmt(s.amount)}/${s.billingCycle === "monthly" ? "mo" : "yr"}\n`;
      });
      resp += `\n💡 Review if all subscriptions are being used. Even ${fmt(200)}/month saved = ${fmt(2400)}/year!`;
      return resp;
    }

    if (q.includes("tip") || q.includes("advice") || q.includes("suggest") || q.includes("help")) {
      const savingsRate = stats.totalIncome > 0 ? Math.round(((stats.totalIncome - stats.totalExpenses) / stats.totalIncome) * 100) : 0;
      let tips = `💡 **Personalized Suggestions:**\n\n`;
      if (savingsRate < 20) tips += `1. ⬆️ Increase savings rate from ${savingsRate}% to 20%+\n`;
      if (sortedCats[0] && sortedCats[0][1] > stats.totalExpenses * 0.3) {
        const cfg = expenseCategoryConfig[sortedCats[0][0]];
        tips += `2. 📉 Reduce ${cfg?.label} spending — it's ${Math.round((sortedCats[0][1] / stats.totalExpenses) * 100)}% of total\n`;
      }
      tips += `3. 🏦 Maintain 3-6 months expenses as emergency fund\n`;
      tips += `4. 📊 Start a SIP to build long-term wealth\n`;
      tips += `5. 🔄 Review subscriptions monthly — cancel unused ones\n`;
      tips += `6. 📝 Track every expense, no matter how small\n`;
      return tips;
    }

    return `I can help you with:\n\n• **"summary"** — Financial overview\n• **"spending"** — Expense analysis\n• **"income"** — Income breakdown\n• **"budget"** — Budget status\n• **"savings"** — Goals progress\n• **"investments"** — Portfolio review\n• **"subscriptions"** — Recurring payments\n• **"tips"** — Personalized suggestions\n\nWhat would you like to know?`;
  };

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg: Message = { id: `user-${Date.now()}`, role: "user", content: input, timestamp: new Date() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    setTimeout(() => {
      const response = generateResponse(input);
      const aiMsg: Message = { id: `ai-${Date.now()}`, role: "assistant", content: response, timestamp: new Date() };
      setMessages((prev) => [...prev, aiMsg]);
    }, 500);
  };

  const quickActions = [
    { label: "📊 Summary", query: "Give me a financial summary" },
    { label: "💸 Spending", query: "Analyze my spending" },
    { label: "📋 Budget", query: "How is my budget?" },
    { label: "🎯 Savings", query: "Show savings goals" },
    { label: "📈 Investments", query: "Review my investments" },
    { label: "💡 Tips", query: "Give me financial tips" },
  ];

  return (
    <div className="space-y-4">
      {/* Chat Header */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl p-5 text-white">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-2xl backdrop-blur">🤖</div>
          <div>
            <h2 className="font-bold text-lg">AI Financial Assistant</h2>
            <p className="text-white/70 text-sm">Ask me anything about your finances</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex gap-2 flex-wrap">
        {quickActions.map((action) => (
          <button
            key={action.label}
            onClick={() => { setInput(action.query); }}
            className="px-3 py-1.5 text-xs font-medium bg-white border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all"
          >
            {action.label}
          </button>
        ))}
      </div>

      {/* Chat Messages */}
      <div className="bg-white rounded-2xl border border-gray-100 p-4 h-[500px] overflow-y-auto">
        <div className="space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[80%] p-3 rounded-2xl ${
                msg.role === "user"
                  ? "bg-blue-500 text-white rounded-br-md"
                  : "bg-gray-100 text-gray-800 rounded-bl-md"
              }`}>
                <p className="text-sm whitespace-pre-wrap leading-relaxed">{msg.content}</p>
                <p className={`text-[10px] mt-1 ${msg.role === "user" ? "text-blue-200" : "text-gray-400"}`}>
                  {msg.timestamp.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
                </p>
              </div>
            </div>
          ))}
          <div ref={endRef} />
        </div>
      </div>

      {/* Input */}
      <div className="bg-white rounded-2xl border border-gray-100 p-3 flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Ask about your finances..."
          className="flex-1 px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"
        />
        <button
          onClick={handleSend}
          className="px-5 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl hover:shadow-lg transition-all"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default AIFinancialAssistant;
