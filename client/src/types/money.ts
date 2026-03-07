// Money Management Types

export type IncomeCategory = "salary" | "freelance" | "business" | "passive" | "investments" | "other";
export type ExpenseCategory = "food" | "transport" | "rent" | "bills" | "shopping" | "subscriptions" | "entertainment" | "health" | "education" | "miscellaneous";
export type InvestmentType = "stocks" | "mutual-funds" | "crypto" | "gold" | "fixed-deposits" | "real-estate" | "other";
export type GoalPriority = "high" | "medium" | "low";

export interface IncomeEntry {
  id: string;
  source: string;
  category: IncomeCategory;
  amount: number;
  date: string;
  recurring: boolean;
  notes?: string;
}

export interface ExpenseEntry {
  id: string;
  description: string;
  category: ExpenseCategory;
  amount: number;
  date: string;
  recurring: boolean;
  notes?: string;
}

export interface BudgetPlan {
  id: string;
  month: string; // "2026-03"
  totalIncome: number;
  plannedSpending: number;
  savingsTarget: number;
  categoryBudgets: { category: ExpenseCategory; limit: number }[];
}

export interface SavingsGoal {
  id: string;
  name: string;
  icon: string;
  targetAmount: number;
  currentAmount: number;
  deadline?: string;
  priority: GoalPriority;
  color: string;
}

export interface InvestmentEntry {
  id: string;
  name: string;
  type: InvestmentType;
  investedAmount: number;
  currentValue: number;
  date: string;
  units?: number;
  notes?: string;
}

export interface Subscription {
  id: string;
  name: string;
  icon: string;
  amount: number;
  billingCycle: "monthly" | "yearly";
  nextPayment: string;
  category: string;
  active: boolean;
}

export interface FinancialTip {
  id: string;
  title: string;
  description: string;
  category: string;
  icon: string;
}

export interface MoneyStats {
  totalIncome: number;
  totalExpenses: number;
  totalSavings: number;
  totalInvestments: number;
  netBalance: number;
  monthlyIncome: number;
  monthlyExpenses: number;
}
