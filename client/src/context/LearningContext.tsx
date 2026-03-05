import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { LearningProgress, WeeklyReview } from "../types/learning";

const DEFAULT_PROGRESS: LearningProgress = {
  completedLessons: [],
  completedExercises: [],
  completedProjects: [],
  completedDailyTasks: [],
  stageProgress: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0 },
  currentStage: 1,
  totalTimeMinutes: 0,
  dailyLog: {},
  weeklyReviews: [],
  lastActive: new Date().toISOString(),
};

interface LearningContextType {
  progress: LearningProgress;
  toggleLesson: (id: string) => void;
  toggleExercise: (id: string) => void;
  toggleProject: (id: string) => void;
  toggleDailyTask: (id: string) => void;
  setCurrentStage: (stage: number) => void;
  addTime: (minutes: number) => void;
  getStageCompletion: (stageId: number) => number;
  getOverallCompletion: () => number;
  getTodayStats: () => { minutes: number; tasks: number };
  getWeekStats: () => { minutes: number; tasks: number; days: number };
  resetProgress: () => void;
}

const LearningContext = createContext<LearningContextType | undefined>(undefined);

const STORAGE_KEY = "ai-learning-progress";

const getToday = () => new Date().toISOString().split("T")[0];

const getWeekStart = () => {
  const d = new Date();
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  return new Date(d.setDate(diff)).toISOString().split("T")[0];
};

export const LearningProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [progress, setProgress] = useState<LearningProgress>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) return { ...DEFAULT_PROGRESS, ...JSON.parse(stored) };
    } catch {}
    return DEFAULT_PROGRESS;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  const updateDailyLog = useCallback((p: LearningProgress, tasksAdded: number = 1): LearningProgress => {
    const today = getToday();
    const existing = p.dailyLog[today] || { minutes: 0, tasks: 0 };
    return {
      ...p,
      dailyLog: {
        ...p.dailyLog,
        [today]: { minutes: existing.minutes, tasks: existing.tasks + tasksAdded },
      },
      lastActive: new Date().toISOString(),
    };
  }, []);

  const recalcStageProgress = useCallback((p: LearningProgress): LearningProgress => {
    const stageProgress: { [k: number]: number } = {};
    for (let s = 1; s <= 8; s++) {
      const prefix = `${s}-`;
      const exercises = p.completedExercises.filter((e) => e.startsWith(prefix)).length;
      const projects = p.completedProjects.filter((e) => e.startsWith(prefix)).length;
      const lessons = p.completedLessons.filter((e) => e.startsWith(prefix)).length;
      const total = exercises + projects + lessons;
      // Each stage has ~4 practices + ~2 projects + ~8 topics = ~14 items
      stageProgress[s] = Math.min(100, Math.round((total / 14) * 100));
    }
    return { ...p, stageProgress };
  }, []);

  const toggleLesson = useCallback((id: string) => {
    setProgress((p) => {
      const exists = p.completedLessons.includes(id);
      const updated = exists
        ? { ...p, completedLessons: p.completedLessons.filter((l) => l !== id) }
        : updateDailyLog({ ...p, completedLessons: [...p.completedLessons, id] });
      return recalcStageProgress(updated);
    });
  }, [updateDailyLog, recalcStageProgress]);

  const toggleExercise = useCallback((id: string) => {
    setProgress((p) => {
      const exists = p.completedExercises.includes(id);
      const updated = exists
        ? { ...p, completedExercises: p.completedExercises.filter((e) => e !== id) }
        : updateDailyLog({ ...p, completedExercises: [...p.completedExercises, id] });
      return recalcStageProgress(updated);
    });
  }, [updateDailyLog, recalcStageProgress]);

  const toggleProject = useCallback((id: string) => {
    setProgress((p) => {
      const exists = p.completedProjects.includes(id);
      const updated = exists
        ? { ...p, completedProjects: p.completedProjects.filter((e) => e !== id) }
        : updateDailyLog({ ...p, completedProjects: [...p.completedProjects, id] });
      return recalcStageProgress(updated);
    });
  }, [updateDailyLog, recalcStageProgress]);

  const toggleDailyTask = useCallback((id: string) => {
    setProgress((p) => {
      const today = getToday();
      const key = `${today}-${id}`;
      const exists = p.completedDailyTasks.includes(key);
      if (exists) {
        return { ...p, completedDailyTasks: p.completedDailyTasks.filter((t) => t !== key) };
      }
      return updateDailyLog({ ...p, completedDailyTasks: [...p.completedDailyTasks, key] });
    });
  }, [updateDailyLog]);

  const setCurrentStage = useCallback((stage: number) => {
    setProgress((p) => ({ ...p, currentStage: stage }));
  }, []);

  const addTime = useCallback((minutes: number) => {
    setProgress((p) => {
      const today = getToday();
      const existing = p.dailyLog[today] || { minutes: 0, tasks: 0 };
      return {
        ...p,
        totalTimeMinutes: p.totalTimeMinutes + minutes,
        dailyLog: {
          ...p.dailyLog,
          [today]: { minutes: existing.minutes + minutes, tasks: existing.tasks },
        },
      };
    });
  }, []);

  const getStageCompletion = useCallback((stageId: number) => {
    return progress.stageProgress[stageId] || 0;
  }, [progress.stageProgress]);

  const getOverallCompletion = useCallback(() => {
    const values = Object.values(progress.stageProgress);
    return Math.round(values.reduce((s, v) => s + v, 0) / values.length);
  }, [progress.stageProgress]);

  const getTodayStats = useCallback(() => {
    const today = getToday();
    return progress.dailyLog[today] || { minutes: 0, tasks: 0 };
  }, [progress.dailyLog]);

  const getWeekStats = useCallback(() => {
    const weekStart = getWeekStart();
    let minutes = 0, tasks = 0, days = 0;
    Object.entries(progress.dailyLog).forEach(([date, data]) => {
      if (date >= weekStart) { minutes += data.minutes; tasks += data.tasks; days++; }
    });
    return { minutes, tasks, days };
  }, [progress.dailyLog]);

  const resetProgress = useCallback(() => {
    setProgress(DEFAULT_PROGRESS);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return (
    <LearningContext.Provider
      value={{
        progress,
        toggleLesson,
        toggleExercise,
        toggleProject,
        toggleDailyTask,
        setCurrentStage,
        addTime,
        getStageCompletion,
        getOverallCompletion,
        getTodayStats,
        getWeekStats,
        resetProgress,
      }}
    >
      {children}
    </LearningContext.Provider>
  );
};

export const useLearning = () => {
  const ctx = useContext(LearningContext);
  if (!ctx) throw new Error("useLearning must be used within LearningProvider");
  return ctx;
};
