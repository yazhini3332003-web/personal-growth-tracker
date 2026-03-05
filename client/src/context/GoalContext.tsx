import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import type { Goal } from "../types";
import { fetchGoals } from "../api";

interface GoalContextType {
  activeGoal: Goal | null;
  goals: Goal[];
  loading: boolean;
  setActiveGoal: (goal: Goal | null) => void;
  refreshGoals: () => Promise<void>;
}

const GoalContext = createContext<GoalContextType>({
  activeGoal: null,
  goals: [],
  loading: true,
  setActiveGoal: () => {},
  refreshGoals: async () => {},
});

export const useGoalContext = () => useContext(GoalContext);

export const GoalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [activeGoal, setActiveGoal] = useState<Goal | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshGoals = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetchGoals();
      setGoals(res.data);
      const active = res.data.find((g) => g.isActive) || res.data[0] || null;
      setActiveGoal(active);
    } catch (err) {
      console.error("Failed to fetch goals:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshGoals();
  }, [refreshGoals]);

  return (
    <GoalContext.Provider
      value={{ activeGoal, goals, loading, setActiveGoal, refreshGoals }}
    >
      {children}
    </GoalContext.Provider>
  );
};
