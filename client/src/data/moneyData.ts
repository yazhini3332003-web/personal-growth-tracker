import {
  IncomeEntry,
  ExpenseEntry,
  BudgetPlan,
  SavingsGoal,
  InvestmentEntry,
  Subscription,
  FinancialTip,
} from "../types/money";

export const sampleIncomes: IncomeEntry[] = [
  { id: "inc-1", source: "Monthly Salary", category: "salary", amount: 75000, date: "2026-03-01", recurring: true },
  { id: "inc-2", source: "Freelance Web Project", category: "freelance", amount: 15000, date: "2026-03-05", recurring: false },
  { id: "inc-3", source: "YouTube Ad Revenue", category: "passive", amount: 3200, date: "2026-03-10", recurring: true },
  { id: "inc-4", source: "Stock Dividends", category: "investments", amount: 2800, date: "2026-03-15", recurring: false },
  { id: "inc-5", source: "Online Course Sales", category: "business", amount: 8500, date: "2026-02-28", recurring: true },
  { id: "inc-6", source: "February Salary", category: "salary", amount: 75000, date: "2026-02-01", recurring: true },
  { id: "inc-7", source: "Consulting Fee", category: "freelance", amount: 12000, date: "2026-02-12", recurring: false },
  { id: "inc-8", source: "Blog Sponsorship", category: "passive", amount: 5000, date: "2026-01-20", recurring: false },
];

export const sampleExpenses: ExpenseEntry[] = [
  { id: "exp-1", description: "Grocery Shopping", category: "food", amount: 3500, date: "2026-03-02", recurring: false },
  { id: "exp-2", description: "Monthly Rent", category: "rent", amount: 18000, date: "2026-03-01", recurring: true },
  { id: "exp-3", description: "Electricity Bill", category: "bills", amount: 2200, date: "2026-03-05", recurring: true },
  { id: "exp-4", description: "Metro Pass", category: "transport", amount: 1500, date: "2026-03-01", recurring: true },
  { id: "exp-5", description: "New Headphones", category: "shopping", amount: 4500, date: "2026-03-08", recurring: false },
  { id: "exp-6", description: "Netflix Subscription", category: "subscriptions", amount: 649, date: "2026-03-01", recurring: true },
  { id: "exp-7", description: "Movie Night", category: "entertainment", amount: 800, date: "2026-03-06", recurring: false },
  { id: "exp-8", description: "Restaurant Dinner", category: "food", amount: 1800, date: "2026-03-07", recurring: false },
  { id: "exp-9", description: "Uber Rides", category: "transport", amount: 950, date: "2026-03-04", recurring: false },
  { id: "exp-10", description: "Phone Recharge", category: "bills", amount: 599, date: "2026-03-03", recurring: true },
  { id: "exp-11", description: "Gym Membership", category: "health", amount: 2000, date: "2026-03-01", recurring: true },
  { id: "exp-12", description: "Online Course", category: "education", amount: 3000, date: "2026-03-02", recurring: false },
  { id: "exp-13", description: "Coffee & Snacks", category: "food", amount: 1200, date: "2026-03-06", recurring: false },
  { id: "exp-14", description: "February Rent", category: "rent", amount: 18000, date: "2026-02-01", recurring: true },
  { id: "exp-15", description: "Feb Groceries", category: "food", amount: 4200, date: "2026-02-10", recurring: false },
  { id: "exp-16", description: "Feb Transport", category: "transport", amount: 2100, date: "2026-02-05", recurring: false },
  { id: "exp-17", description: "Feb Entertainment", category: "entertainment", amount: 1500, date: "2026-02-15", recurring: false },
  { id: "exp-18", description: "Jan Groceries", category: "food", amount: 3800, date: "2026-01-08", recurring: false },
];

export const sampleBudget: BudgetPlan = {
  id: "budget-1",
  month: "2026-03",
  totalIncome: 96000,
  plannedSpending: 45000,
  savingsTarget: 30000,
  categoryBudgets: [
    { category: "food", limit: 8000 },
    { category: "transport", limit: 3000 },
    { category: "rent", limit: 18000 },
    { category: "bills", limit: 4000 },
    { category: "shopping", limit: 5000 },
    { category: "subscriptions", limit: 2000 },
    { category: "entertainment", limit: 3000 },
    { category: "health", limit: 2500 },
    { category: "education", limit: 5000 },
    { category: "miscellaneous", limit: 2000 },
  ],
};

export const sampleSavingsGoals: SavingsGoal[] = [
  { id: "goal-1", name: "Emergency Fund", icon: "🛡️", targetAmount: 300000, currentAmount: 185000, priority: "high", color: "from-red-500 to-rose-600" },
  { id: "goal-2", name: "New MacBook Pro", icon: "💻", targetAmount: 180000, currentAmount: 92000, priority: "medium", color: "from-blue-500 to-indigo-600" },
  { id: "goal-3", name: "Higher Education", icon: "🎓", targetAmount: 500000, currentAmount: 125000, priority: "high", color: "from-purple-500 to-violet-600" },
  { id: "goal-4", name: "Japan Trip", icon: "✈️", targetAmount: 200000, currentAmount: 45000, deadline: "2027-04-01", priority: "low", color: "from-cyan-500 to-teal-600" },
  { id: "goal-5", name: "New Car Down Payment", icon: "🚗", targetAmount: 400000, currentAmount: 80000, deadline: "2028-01-01", priority: "medium", color: "from-amber-500 to-orange-600" },
  { id: "goal-6", name: "Retirement Fund", icon: "🏖️", targetAmount: 5000000, currentAmount: 320000, priority: "high", color: "from-emerald-500 to-green-600" },
];

export const sampleInvestments: InvestmentEntry[] = [
  { id: "inv-1", name: "Nifty 50 Index Fund", type: "mutual-funds", investedAmount: 120000, currentValue: 142800, date: "2025-06-15", notes: "SIP ₹10K/month" },
  { id: "inv-2", name: "Reliance Industries", type: "stocks", investedAmount: 50000, currentValue: 58500, date: "2025-08-20", units: 20 },
  { id: "inv-3", name: "Bitcoin", type: "crypto", investedAmount: 25000, currentValue: 31200, date: "2025-10-01", units: 0.005 },
  { id: "inv-4", name: "Digital Gold", type: "gold", investedAmount: 30000, currentValue: 34500, date: "2025-09-10" },
  { id: "inv-5", name: "5-Year FD", type: "fixed-deposits", investedAmount: 200000, currentValue: 214000, date: "2024-12-01", notes: "7% p.a." },
  { id: "inv-6", name: "HDFC Flexi Cap Fund", type: "mutual-funds", investedAmount: 80000, currentValue: 91200, date: "2025-07-01" },
  { id: "inv-7", name: "TCS Shares", type: "stocks", investedAmount: 40000, currentValue: 43800, date: "2025-11-15", units: 10 },
  { id: "inv-8", name: "Ethereum", type: "crypto", investedAmount: 15000, currentValue: 18900, date: "2026-01-05", units: 0.08 },
];

export const sampleSubscriptions: Subscription[] = [
  { id: "sub-1", name: "Netflix", icon: "🎬", amount: 649, billingCycle: "monthly", nextPayment: "2026-04-01", category: "Entertainment", active: true },
  { id: "sub-2", name: "Spotify", icon: "🎵", amount: 119, billingCycle: "monthly", nextPayment: "2026-04-05", category: "Entertainment", active: true },
  { id: "sub-3", name: "GitHub Copilot", icon: "💻", amount: 830, billingCycle: "monthly", nextPayment: "2026-04-01", category: "Software", active: true },
  { id: "sub-4", name: "ChatGPT Plus", icon: "🤖", amount: 1650, billingCycle: "monthly", nextPayment: "2026-04-10", category: "Software", active: true },
  { id: "sub-5", name: "Figma Pro", icon: "🎨", amount: 1100, billingCycle: "monthly", nextPayment: "2026-04-15", category: "Software", active: true },
  { id: "sub-6", name: "iCloud Storage", icon: "☁️", amount: 75, billingCycle: "monthly", nextPayment: "2026-04-01", category: "Storage", active: true },
  { id: "sub-7", name: "Amazon Prime", icon: "📦", amount: 1499, billingCycle: "yearly", nextPayment: "2026-09-15", category: "Shopping", active: true },
  { id: "sub-8", name: "Adobe Creative Cloud", icon: "🖌️", amount: 4500, billingCycle: "monthly", nextPayment: "2026-04-20", category: "Software", active: false },
];

export const financialTips: FinancialTip[] = [
  { id: "tip-1", title: "The 50/30/20 Rule", description: "Allocate 50% of income to needs, 30% to wants, and 20% to savings. This simple framework helps maintain balance between living well today and building for tomorrow.", category: "Budgeting", icon: "📊" },
  { id: "tip-2", title: "Pay Yourself First", description: "Before paying bills or spending on wants, transfer a fixed amount to savings. Treat savings like a non-negotiable expense. Automate this process for consistency.", category: "Saving", icon: "💰" },
  { id: "tip-3", title: "Emergency Fund Basics", description: "Build 3-6 months of living expenses as an emergency fund. Keep it in a liquid account so you can access it quickly. This protects you from unexpected events.", category: "Saving", icon: "🛡️" },
  { id: "tip-4", title: "Start Investing Early", description: "The power of compound interest means even small amounts invested early can grow significantly over time. Start with index funds or SIPs if you're a beginner.", category: "Investing", icon: "📈" },
  { id: "tip-5", title: "Avoid Lifestyle Inflation", description: "When your income increases, resist the urge to increase spending proportionally. Instead, save or invest the extra income to accelerate wealth building.", category: "Budgeting", icon: "⚖️" },
  { id: "tip-6", title: "Track Every Rupee", description: "Awareness is the first step to financial health. Track all your expenses — even small ones like coffee or snacks. You'll be surprised where your money actually goes.", category: "Tracking", icon: "🔍" },
  { id: "tip-7", title: "Diversify Investments", description: "Don't put all your money in one type of investment. Spread across stocks, mutual funds, FDs, gold, and other assets to reduce risk.", category: "Investing", icon: "🎯" },
  { id: "tip-8", title: "Avoid High-Interest Debt", description: "Credit card debt and personal loans can have interest rates of 15-40%. Pay off high-interest debt first before focusing on investments.", category: "Debt", icon: "🚫" },
  { id: "tip-9", title: "Review Subscriptions Monthly", description: "Unused subscriptions are silent money drains. Review and cancel services you don't actively use. Even small amounts add up over a year.", category: "Saving", icon: "📋" },
  { id: "tip-10", title: "Set SMART Financial Goals", description: "Make goals Specific, Measurable, Achievable, Relevant, and Time-bound. Instead of 'save more money', say 'save ₹50,000 in 6 months for a laptop'.", category: "Planning", icon: "🎯" },
  { id: "tip-11", title: "Understand Compound Interest", description: "Compound interest is earning interest on interest. ₹10,000 invested at 12% annually becomes ₹31,058 in 10 years. Time is your greatest asset.", category: "Investing", icon: "🔄" },
  { id: "tip-12", title: "Build Multiple Income Streams", description: "Don't rely on a single income source. Explore freelancing, content creation, investments, or side businesses to build financial resilience.", category: "Income", icon: "💼" },
];

export const expenseCategoryConfig: Record<string, { label: string; icon: string; color: string }> = {
  food: { label: "Food", icon: "🍕", color: "bg-orange-100 text-orange-700 border-orange-200" },
  transport: { label: "Transport", icon: "🚗", color: "bg-blue-100 text-blue-700 border-blue-200" },
  rent: { label: "Rent", icon: "🏠", color: "bg-purple-100 text-purple-700 border-purple-200" },
  bills: { label: "Bills", icon: "📄", color: "bg-red-100 text-red-700 border-red-200" },
  shopping: { label: "Shopping", icon: "🛍️", color: "bg-pink-100 text-pink-700 border-pink-200" },
  subscriptions: { label: "Subscriptions", icon: "🔄", color: "bg-indigo-100 text-indigo-700 border-indigo-200" },
  entertainment: { label: "Entertainment", icon: "🎮", color: "bg-cyan-100 text-cyan-700 border-cyan-200" },
  health: { label: "Health", icon: "💊", color: "bg-emerald-100 text-emerald-700 border-emerald-200" },
  education: { label: "Education", icon: "📚", color: "bg-amber-100 text-amber-700 border-amber-200" },
  miscellaneous: { label: "Misc", icon: "📦", color: "bg-gray-100 text-gray-700 border-gray-200" },
};

export const incomeCategoryConfig: Record<string, { label: string; icon: string; color: string }> = {
  salary: { label: "Salary", icon: "💼", color: "from-emerald-500 to-green-600" },
  freelance: { label: "Freelance", icon: "🧑‍💻", color: "from-blue-500 to-indigo-600" },
  business: { label: "Business", icon: "🏢", color: "from-purple-500 to-violet-600" },
  passive: { label: "Passive", icon: "💤", color: "from-amber-500 to-orange-600" },
  investments: { label: "Investments", icon: "📈", color: "from-cyan-500 to-teal-600" },
  other: { label: "Other", icon: "💰", color: "from-gray-500 to-slate-600" },
};

export const investmentTypeConfig: Record<string, { label: string; icon: string; color: string }> = {
  stocks: { label: "Stocks", icon: "📊", color: "from-blue-500 to-indigo-600" },
  "mutual-funds": { label: "Mutual Funds", icon: "📈", color: "from-emerald-500 to-green-600" },
  crypto: { label: "Crypto", icon: "₿", color: "from-amber-500 to-orange-600" },
  gold: { label: "Gold", icon: "🥇", color: "from-yellow-500 to-amber-600" },
  "fixed-deposits": { label: "Fixed Deposits", icon: "🏦", color: "from-purple-500 to-violet-600" },
  "real-estate": { label: "Real Estate", icon: "🏠", color: "from-cyan-500 to-teal-600" },
  other: { label: "Other", icon: "💼", color: "from-gray-500 to-slate-600" },
};
