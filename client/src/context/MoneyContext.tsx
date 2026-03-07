import React, { createContext, useContext, useState, ReactNode } from "react";
import {
  IncomeEntry,
  ExpenseEntry,
  BudgetPlan,
  SavingsGoal,
  InvestmentEntry,
  Subscription,
  MoneyStats,
} from "../types/money";
import {
  sampleIncomes,
  sampleExpenses,
  sampleBudget,
  sampleSavingsGoals,
  sampleInvestments,
  sampleSubscriptions,
} from "../data/moneyData";

interface MoneyContextType {
  incomes: IncomeEntry[];
  expenses: ExpenseEntry[];
  budget: BudgetPlan;
  savingsGoals: SavingsGoal[];
  investments: InvestmentEntry[];
  subscriptions: Subscription[];
  addIncome: (entry: IncomeEntry) => void;
  removeIncome: (id: string) => void;
  addExpense: (entry: ExpenseEntry) => void;
  removeExpense: (id: string) => void;
  updateBudget: (budget: BudgetPlan) => void;
  addSavingsGoal: (goal: SavingsGoal) => void;
  updateSavingsGoal: (id: string, amount: number) => void;
  removeSavingsGoal: (id: string) => void;
  addInvestment: (entry: InvestmentEntry) => void;
  removeInvestment: (id: string) => void;
  addSubscription: (sub: Subscription) => void;
  toggleSubscription: (id: string) => void;
  removeSubscription: (id: string) => void;
  getStats: () => MoneyStats;
  getMonthlyData: (month: string) => { income: number; expenses: number };
}

const MoneyContext = createContext<MoneyContextType | undefined>(undefined);

export const MoneyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [incomes, setIncomes] = useState<IncomeEntry[]>(sampleIncomes);
  const [expenses, setExpenses] = useState<ExpenseEntry[]>(sampleExpenses);
  const [budget, setBudget] = useState<BudgetPlan>(sampleBudget);
  const [savingsGoals, setSavingsGoals] = useState<SavingsGoal[]>(sampleSavingsGoals);
  const [investments, setInvestments] = useState<InvestmentEntry[]>(sampleInvestments);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>(sampleSubscriptions);

  const addIncome = (entry: IncomeEntry) => setIncomes((prev) => [entry, ...prev]);
  const removeIncome = (id: string) => setIncomes((prev) => prev.filter((i) => i.id !== id));

  const addExpense = (entry: ExpenseEntry) => setExpenses((prev) => [entry, ...prev]);
  const removeExpense = (id: string) => setExpenses((prev) => prev.filter((e) => e.id !== id));

  const updateBudget = (b: BudgetPlan) => setBudget(b);

  const addSavingsGoal = (goal: SavingsGoal) => setSavingsGoals((prev) => [...prev, goal]);
  const updateSavingsGoal = (id: string, amount: number) =>
    setSavingsGoals((prev) => prev.map((g) => (g.id === id ? { ...g, currentAmount: Math.min(g.currentAmount + amount, g.targetAmount) } : g)));
  const removeSavingsGoal = (id: string) => setSavingsGoals((prev) => prev.filter((g) => g.id !== id));

  const addInvestment = (entry: InvestmentEntry) => setInvestments((prev) => [entry, ...prev]);
  const removeInvestment = (id: string) => setInvestments((prev) => prev.filter((i) => i.id !== id));

  const addSubscription = (sub: Subscription) => setSubscriptions((prev) => [...prev, sub]);
  const toggleSubscription = (id: string) =>
    setSubscriptions((prev) => prev.map((s) => (s.id === id ? { ...s, active: !s.active } : s)));
  const removeSubscription = (id: string) => setSubscriptions((prev) => prev.filter((s) => s.id !== id));

  const getStats = (): MoneyStats => {
    const now = new Date();
    const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;

    const totalIncome = incomes.reduce((s, i) => s + i.amount, 0);
    const totalExpenses = expenses.reduce((s, e) => s + e.amount, 0);
    const totalSavings = savingsGoals.reduce((s, g) => s + g.currentAmount, 0);
    const totalInvestments = investments.reduce((s, i) => s + i.currentValue, 0);

    const monthlyIncome = incomes.filter((i) => i.date.startsWith(currentMonth)).reduce((s, i) => s + i.amount, 0);
    const monthlyExpenses = expenses.filter((e) => e.date.startsWith(currentMonth)).reduce((s, e) => s + e.amount, 0);

    return {
      totalIncome,
      totalExpenses,
      totalSavings,
      totalInvestments,
      netBalance: totalIncome - totalExpenses,
      monthlyIncome,
      monthlyExpenses,
    };
  };

  const getMonthlyData = (month: string) => {
    const income = incomes.filter((i) => i.date.startsWith(month)).reduce((s, i) => s + i.amount, 0);
    const exp = expenses.filter((e) => e.date.startsWith(month)).reduce((s, e) => s + e.amount, 0);
    return { income, expenses: exp };
  };

  return (
    <MoneyContext.Provider
      value={{
        incomes,
        expenses,
        budget,
        savingsGoals,
        investments,
        subscriptions,
        addIncome,
        removeIncome,
        addExpense,
        removeExpense,
        updateBudget,
        addSavingsGoal,
        updateSavingsGoal,
        removeSavingsGoal,
        addInvestment,
        removeInvestment,
        addSubscription,
        toggleSubscription,
        removeSubscription,
        getStats,
        getMonthlyData,
      }}
    >
      {children}
    </MoneyContext.Provider>
  );
};

export const useMoneyContext = () => {
  const ctx = useContext(MoneyContext);
  if (!ctx) throw new Error("useMoneyContext must be used within MoneyProvider");
  return ctx;
};
