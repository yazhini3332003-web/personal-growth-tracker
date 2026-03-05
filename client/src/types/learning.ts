export interface LearningResource {
  title: string;
  url: string;
  type: "docs" | "tutorial" | "course" | "github" | "blog" | "video";
  description: string;
}

export interface PracticeTask {
  id: string;
  title: string;
  description: string;
  difficulty: "beginner" | "intermediate" | "advanced";
}

export interface RoadmapStage {
  id: number;
  title: string;
  shortTitle: string;
  icon: string;
  color: string;
  description: string;
  topics: string[];
  tools: string[];
  resources: LearningResource[];
  practices: PracticeTask[];
  miniProjects: PracticeTask[];
}

export interface DailyTask {
  id: string;
  title: string;
  description: string;
  type: "concept" | "article" | "coding" | "project" | "explore";
  stageId: number;
}

export interface NewsItem {
  id: string;
  title: string;
  source: string;
  category: string;
  date: string;
  url: string;
  summary: string;
}

export interface TrendingTool {
  name: string;
  category: string;
  description: string;
  url: string;
  trending: boolean;
  icon: string;
}

export interface LearningProgress {
  completedLessons: string[];
  completedExercises: string[];
  completedProjects: string[];
  completedDailyTasks: string[];
  stageProgress: { [stageId: number]: number };
  currentStage: number;
  totalTimeMinutes: number;
  dailyLog: { [date: string]: { minutes: number; tasks: number } };
  weeklyReviews: WeeklyReview[];
  lastActive: string;
}

export interface WeeklyReview {
  weekStart: string;
  weekEnd: string;
  topicsLearned: string[];
  exercisesCompleted: number;
  projectsFinished: number;
  minutesSpent: number;
}
