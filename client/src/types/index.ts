export interface Goal {
  _id: string;
  name: string;
  description: string;
  startDate: string;
  totalDays: number;
  targetPoints: number;
  currentPoints: number;
  isActive: boolean;
  endDate: string;
  completionPercentage: number;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  _id: string;
  name: string;
  goal: string;
  color: string;
  icon: string;
  createdAt: string;
  updatedAt: string;
}

export interface Task {
  _id: string;
  name: string;
  category: Category | string;
  goal: string;
  points: number;
  createdAt: string;
  updatedAt: string;
}

export interface CompletedTask {
  task: Task;
  pointsEarned: number;
  _id: string;
}

export interface DailyLog {
  _id: string;
  goal: string;
  date: string;
  dayNumber: number;
  completedTasks: CompletedTask[];
  totalPoints: number;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export interface DashboardData {
  totalPoints: number;
  targetPoints: number;
  daysCompleted: number;
  totalDays: number;
  remainingDays: number;
  completionPercentage: number;
  averageDailyScore: number;
  dailyScores: { day: number; date: string; points: number }[];
  categoryBreakdown: Record<
    string,
    { points: number; count: number }
  >;
}

export interface GoalFormData {
  name: string;
  description: string;
  startDate: string;
  totalDays: number;
  targetPoints: number;
}

export interface CategoryFormData {
  name: string;
  goal: string;
  color: string;
}

export interface TaskFormData {
  name: string;
  category: string;
  goal: string;
  points: number;
}

export interface DailyLogFormData {
  goal: string;
  date: string;
  dayNumber: number;
  completedTaskIds: string[];
  notes: string;
}
