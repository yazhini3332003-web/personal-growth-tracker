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
      content: "👋 Hi! I'm your AI Financial Guide. I can analyze your spending, find where money is leaking, suggest ways to save more, check your financial health, and help you learn money management from scratch. Try asking me anything!",
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

    // Where am I spending too much?
    if (q.includes("too much") || q.includes("overspend") || q.includes("where") && (q.includes("spend") || q.includes("money go"))) {
      if (sortedCats.length === 0) return "📊 No expense data yet. Start tracking your expenses to get spending insights!";
      let resp = `🔍 **Where Your Money Is Going:**\n\n`;
      const totalExp = stats.totalExpenses;
      sortedCats.forEach(([cat, amt], i) => {
        const pct = Math.round((amt / totalExp) * 100);
        const cfg = expenseCategoryConfig[cat];
        const flag = pct > 25 ? " ⚠️ HIGH" : pct > 15 ? " ⚡ Watch" : " ✅";
        resp += `${i + 1}. ${cfg?.icon || "📦"} ${cfg?.label || cat}: ${fmt(amt)} (${pct}%)${flag}\n`;
      });
      resp += `\n📋 **Action Items:**\n`;
      if (sortedCats[0]) {
        const topCfg = expenseCategoryConfig[sortedCats[0][0]];
        resp += `• Cut ${topCfg?.label} by 15% = save ${fmt(Math.round(sortedCats[0][1] * 0.15))}/month\n`;
      }
      if (sortedCats[1]) {
        const secCfg = expenseCategoryConfig[sortedCats[1][0]];
        resp += `• Reduce ${secCfg?.label} by 10% = save ${fmt(Math.round(sortedCats[1][1] * 0.10))}/month\n`;
      }
      resp += `• Review all categories under 5% — small leaks add up`;
      return resp;
    }

    // How can I save more?
    if (q.includes("save more") || q.includes("how to save") || q.includes("saving tips") || q.includes("cut costs")) {
      const savingsRate = stats.totalIncome > 0 ? Math.round(((stats.totalIncome - stats.totalExpenses) / stats.totalIncome) * 100) : 0;
      let resp = `💰 **Your Savings Potential:**\n\nCurrent savings rate: ${savingsRate}%\n\n`;
      resp += `📋 **Personalized Ways to Save More:**\n\n`;
      if (subCost > 0) resp += `1. 🔄 Review subscriptions: You spend ${fmt(Math.round(subCost))}/month (${fmt(Math.round(subCost * 12))}/year). Cancel 2 unused ones.\n`;
      const foodCat = sortedCats.find(([cat]) => cat === "food" || cat === "dining");
      if (foodCat) resp += `2. 🍕 Food spending is ${fmt(foodCat[1])}. Cook 3 more meals/week to save ₹${Math.round(foodCat[1] * 0.3 / 1000)}K/month.\n`;
      resp += `3. 📱 Switch to cheaper phone/internet plan — save ₹500-1,000/month\n`;
      resp += `4. ☕ ₹100 daily chai/snacks = ₹3,000/month. Bring from home 3 days/week.\n`;
      resp += `5. 🎯 Use 24-hour rule: Wait before any purchase over ₹500. 80% of impulses die.\n`;
      resp += `6. 💰 Auto-transfer ${savingsRate < 20 ? "20" : Math.min(savingsRate + 5, 40)}% on salary day — save BEFORE spending.\n`;
      resp += `\n✨ Even saving ₹2,000 more/month = ₹24,000/year = ₹3.8L in 10 years at 12% returns!`;
      return resp;
    }

    // What to do with extra income?
    if (q.includes("extra income") || q.includes("bonus") || q.includes("extra money") || q.includes("windfall") || q.includes("got money")) {
      const emergencyTarget = stats.totalExpenses > 0 ? stats.totalExpenses * 3 : 75000;
      const totalSaved = savingsGoals.reduce((s, g) => s + g.currentAmount, 0);
      let resp = `🎉 **Smart Ways to Use Extra Income:**\n\n`;
      resp += `Based on your financial situation:\n\n`;
      if (totalSaved < emergencyTarget) {
        resp += `1. 🛡️ **TOP PRIORITY:** Boost emergency fund. You have ${fmt(totalSaved)}, target is ${fmt(Math.round(emergencyTarget))}. Put 50% of extra income here.\n\n`;
      }
      resp += `2. 💳 Pay off any high-interest debt first (credit cards, personal loans)\n`;
      resp += `3. 📈 Increase SIP amount — one-time top-up or increase monthly SIP\n`;
      resp += `4. 🎯 Accelerate savings goals — pick your highest-priority goal\n`;
      resp += `5. 📚 Invest in yourself — a course or skill that increases earning potential\n`;
      resp += `6. 🎁 Allocate 10% for guilt-free enjoyment — you deserve it!\n\n`;
      resp += `💡 **Rule of thumb:** 50% invest/save, 30% goals/debt, 20% enjoy.`;
      return resp;
    }

    // Financial health check
    if (q.includes("health") || q.includes("score") || q.includes("how am i") || q.includes("checkup") || q.includes("status")) {
      const savingsRate = stats.totalIncome > 0 ? Math.round(((stats.totalIncome - stats.totalExpenses) / stats.totalIncome) * 100) : 0;
      const totalSaved = savingsGoals.reduce((s, g) => s + g.currentAmount, 0);
      const emergencyMonths = stats.totalExpenses > 0 ? Math.round((totalSaved / (stats.totalExpenses / Math.max(expenses.length, 1))) * 10) / 10 : 0;
      let score = 0;
      let resp = `🏥 **Financial Health Checkup:**\n\n`;
      // Scoring
      if (savingsRate >= 20) { score += 25; resp += `✅ Savings Rate: ${savingsRate}% (Excellent!)\n`; }
      else if (savingsRate >= 10) { score += 15; resp += `⚡ Savings Rate: ${savingsRate}% (Good, aim for 20%)\n`; }
      else { score += 5; resp += `⚠️ Savings Rate: ${savingsRate}% (Needs improvement)\n`; }
      
      if (investments.length >= 3) { score += 25; resp += `✅ Portfolio: ${investments.length} investments (Well diversified)\n`; }
      else if (investments.length >= 1) { score += 15; resp += `⚡ Portfolio: ${investments.length} investment(s) (Add more diversity)\n`; }
      else { score += 0; resp += `⚠️ No investments yet (Start with a simple SIP)\n`; }
      
      if (savingsGoals.length >= 3) { score += 25; resp += `✅ Goals: ${savingsGoals.length} savings goals (Great planning!)\n`; }
      else if (savingsGoals.length >= 1) { score += 15; resp += `⚡ Goals: ${savingsGoals.length} goal(s) (Set more targets)\n`; }
      else { score += 5; resp += `⚠️ No savings goals (Set at least 3)\n`; }
      
      const hasInsurance = subscriptions.some(s => s.name.toLowerCase().includes("insurance") || s.name.toLowerCase().includes("health"));
      if (hasInsurance) { score += 25; resp += `✅ Insurance: Protected\n`; }
      else { score += 0; resp += `⚠️ No insurance found (Critical — get health insurance ASAP)\n`; }
      
      resp += `\n📊 **Financial Health Score: ${score}/100**\n`;
      if (score >= 80) resp += `🏆 Excellent! You're in great financial shape.`;
      else if (score >= 60) resp += `👍 Good foundation. Focus on the ⚡ items to level up.`;
      else if (score >= 40) resp += `📈 Making progress. Address the ⚠️ items one at a time.`;
      else resp += `🌱 Just getting started. That's okay! Focus on tracking and saving first.`;
      return resp;
    }

    // Learning / what should I learn
    if (q.includes("learn") || q.includes("beginner") || q.includes("start") || q.includes("new to")) {
      return `📚 **Getting Started with Money Management:**\n\n1. 🌱 Start with the **Introduction** tab — understand what money management really means\n2. 🧩 Move to **Core Concepts** — learn about income, expenses, savings & investments\n3. 🧠 Go through **Financial Awareness** — needs vs wants, budgeting mindset, avoiding debt\n4. 📋 Then start practicing with **Dashboard, Budget & Expense Tracker**\n5. 📅 Use **Growth System** to see the year-by-year plan\n6. 📚 Visit the **Library** for in-depth guides and book recommendations\n\n💡 **Tip:** Don't try to do everything at once. Spend a week on each section. Understanding comes before action!`;
    }

    return `I can help you with:\n\n• **"summary"** — Financial overview\n• **"spending"** — Expense analysis\n• **"where is my money going"** — Spending breakdown\n• **"income"** — Income breakdown\n• **"budget"** — Budget status\n• **"savings"** — Goals progress\n• **"investments"** — Portfolio review\n• **"subscriptions"** — Recurring payments\n• **"how to save more"** — Saving strategies\n• **"extra income"** — What to do with bonuses\n• **"health check"** — Financial health score\n• **"tips"** — Personalized suggestions\n• **"learn"** — Getting started guide\n\nWhat would you like to know?`;
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
    { label: "💸 Where's my money?", query: "Where am I spending too much?" },
    { label: "💰 Save more", query: "How can I save more?" },
    { label: "📋 Budget", query: "How is my budget?" },
    { label: "🎯 Savings", query: "Show savings goals" },
    { label: "📈 Investments", query: "Review my investments" },
    { label: "🎉 Extra income", query: "What to do with extra income?" },
    { label: "🏥 Health check", query: "Financial health checkup" },
    { label: "💡 Tips", query: "Give me financial tips" },
    { label: "📚 Learn", query: "I'm new to money management" },
  ];

  return (
    <div className="space-y-4">
      {/* Chat Header */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl p-5 text-white">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-2xl backdrop-blur">🤖</div>
          <div>
            <h2 className="font-bold text-lg">AI Financial Guide</h2>
            <p className="text-white/70 text-sm">Your personal money mentor — ask anything about finances</p>
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
