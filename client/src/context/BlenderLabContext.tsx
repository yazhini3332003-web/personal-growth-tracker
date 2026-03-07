import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { BlenderProgress } from "../types/blenderLab";

interface BlenderLabContextType {
  progress: BlenderProgress;
  completeExercise: (exerciseId: string) => void;
  completeProject: (projectId: string) => void;
  completePhase: (phaseId: number) => void;
  completeLesson: (lessonId: string) => void;
  setCurrentPhase: (phaseId: number) => void;
  savePhaseNote: (phaseId: number, note: string) => void;
  addLearningTime: (minutes: number) => void;
  resetAllProgress: () => void;
  getPhaseProgress: (phaseId: number) => {
    exercises: number;
    totalExercises: number;
    projectDone: boolean;
    phaseDone: boolean;
  };
  getOverallStats: () => {
    completedPhases: number;
    completedExercises: number;
    completedProjects: number;
    completedLessons: number;
    totalProgress: number;
    streak: number;
    totalMinutes: number;
  };
}

const defaultProgress: BlenderProgress = {
  completedPhases: [],
  completedExercises: [],
  completedProjects: [],
  completedLessons: [],
  phaseNotes: {},
  currentPhase: 1,
  streak: 0,
  lastActiveDate: "",
  totalMinutes: 0,
  weeklyLog: {},
  dailyLog: {},
};

const STORAGE_KEY = "blender-learning-hub-progress";

const BlenderLabContext = createContext<BlenderLabContextType | undefined>(undefined);

export const useBlenderLabContext = () => {
  const ctx = useContext(BlenderLabContext);
  if (!ctx) throw new Error("useBlenderLabContext must be used within BlenderLabProvider");
  return ctx;
};

export const BlenderLabProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [progress, setProgress] = useState<BlenderProgress>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return { ...defaultProgress, ...JSON.parse(saved) };
    } catch {}
    return defaultProgress;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  // Update streak
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    if (progress.lastActiveDate !== today) {
      const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];
      setProgress((p) => ({
        ...p,
        lastActiveDate: today,
        streak: p.lastActiveDate === yesterday ? p.streak + 1 : 1,
      }));
    }
  }, [progress.lastActiveDate]);

  const completeExercise = useCallback((exerciseId: string) => {
    setProgress((p) => {
      if (p.completedExercises.includes(exerciseId)) return p;
      return { ...p, completedExercises: [...p.completedExercises, exerciseId] };
    });
  }, []);

  const completeProject = useCallback((projectId: string) => {
    setProgress((p) => {
      if (p.completedProjects.includes(projectId)) return p;
      return { ...p, completedProjects: [...p.completedProjects, projectId] };
    });
  }, []);

  const completePhase = useCallback((phaseId: number) => {
    setProgress((p) => {
      if (p.completedPhases.includes(phaseId)) return p;
      return { ...p, completedPhases: [...p.completedPhases, phaseId] };
    });
  }, []);

  const completeLesson = useCallback((lessonId: string) => {
    setProgress((p) => {
      if (p.completedLessons.includes(lessonId)) return p;
      return { ...p, completedLessons: [...p.completedLessons, lessonId] };
    });
  }, []);

  const setCurrentPhase = useCallback((phaseId: number) => {
    setProgress((p) => ({ ...p, currentPhase: phaseId }));
  }, []);

  const savePhaseNote = useCallback((phaseId: number, note: string) => {
    setProgress((p) => ({
      ...p,
      phaseNotes: { ...p.phaseNotes, [phaseId]: note },
    }));
  }, []);

  const addLearningTime = useCallback((minutes: number) => {
    const today = new Date().toISOString().split("T")[0];
    setProgress((p) => ({
      ...p,
      totalMinutes: p.totalMinutes + minutes,
      weeklyLog: { ...p.weeklyLog, [today]: (p.weeklyLog[today] || 0) + minutes },
      dailyLog: { ...p.dailyLog, [today]: (p.dailyLog[today] || 0) + minutes },
    }));
  }, []);

  const resetAllProgress = useCallback(() => {
    setProgress(defaultProgress);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const getPhaseProgress = useCallback(
    (phaseId: number) => {
      const prefix = `b${phaseId}-`;
      const phaseExercises = progress.completedExercises.filter((e) => e.startsWith(prefix));
      const projectDone = progress.completedProjects.includes(`b${phaseId}-proj`);
      const phaseDone = progress.completedPhases.includes(phaseId);
      const totalExercises = phaseId === 1 ? 2 : 1;
      return { exercises: phaseExercises.length, totalExercises, projectDone, phaseDone };
    },
    [progress]
  );

  const getOverallStats = useCallback(() => {
    const totalExercises = progress.completedExercises.length;
    const totalProjects = progress.completedProjects.length;
    const totalPhases = progress.completedPhases.length;
    const totalLessons = progress.completedLessons.length;
    // 10 phases, ~11 exercises, 10 projects, ~60 lessons = ~91 items
    const totalItems = 91;
    const completedItems = totalPhases + totalExercises + totalProjects + totalLessons;
    return {
      completedPhases: totalPhases,
      completedExercises: totalExercises,
      completedProjects: totalProjects,
      completedLessons: totalLessons,
      totalProgress: Math.min(100, Math.round((completedItems / totalItems) * 100)),
      streak: progress.streak,
      totalMinutes: progress.totalMinutes,
    };
  }, [progress]);

  return (
    <BlenderLabContext.Provider
      value={{
        progress,
        completeExercise,
        completeProject,
        completePhase,
        completeLesson,
        setCurrentPhase,
        savePhaseNote,
        addLearningTime,
        resetAllProgress,
        getPhaseProgress,
        getOverallStats,
      }}
    >
      {children}
    </BlenderLabContext.Provider>
  );
};
