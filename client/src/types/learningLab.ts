export interface LabTool {
  name: string;
  description: string;
  url: string;
  icon: string;
}

export interface LabExercise {
  id: string;
  title: string;
  description: string;
  starterCode: string;
  expectedOutput?: string;
  hints: string[];
  difficulty: "beginner" | "intermediate" | "advanced";
}

export interface LabMiniProject {
  id: string;
  title: string;
  description: string;
  steps: string[];
  starterCode: string;
  tags: string[];
}

export interface LabPhase {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  learningContent: string[];
  tools: LabTool[];
  exercises: LabExercise[];
  miniProject: LabMiniProject;
  practiceType: "prompt" | "code" | "api" | "simulator";
  practiceDescription: string;
  color: string;
  icon: string;
}

export interface LabProgress {
  completedPhases: number[];
  completedExercises: string[];
  completedProjects: string[];
  phaseNotes: Record<number, string>;
  codeSnapshots: Record<string, string>;
  currentPhase: number;
  streak: number;
  lastActiveDate: string;
  totalMinutes: number;
  weeklyLog: Record<string, number>;
}

export interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  category: "tools" | "frameworks" | "startups" | "research";
  date: string;
  source: string;
  url: string;
  icon: string;
}
