export interface BlenderTool {
  name: string;
  description: string;
  url: string;
  icon: string;
  category: "addon" | "ai" | "plugin" | "resource";
}

export interface BlenderResource {
  title: string;
  url: string;
  type: "tutorial" | "docs" | "blog" | "github" | "video";
  description: string;
}

export interface BlenderExercise {
  id: string;
  title: string;
  description: string;
  task: string;
  exampleResult: string;
  hints: string[];
  difficulty: "beginner" | "intermediate" | "advanced";
}

export interface BlenderMiniProject {
  id: string;
  title: string;
  description: string;
  goal: string;
  steps: string[];
  skillsLearned: string[];
  resultReference: string;
  tags: string[];
}

export interface BlenderPhase {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  whyImportant: string;
  realWorldApps: string[];
  learningContent: string[];
  tools: BlenderTool[];
  resources: BlenderResource[];
  exercises: BlenderExercise[];
  miniProject: BlenderMiniProject;
  color: string;
  icon: string;
  level: "beginner" | "intermediate" | "advanced";
}

export interface BlenderProgress {
  completedPhases: number[];
  completedExercises: string[];
  completedProjects: string[];
  completedLessons: string[];
  phaseNotes: Record<number, string>;
  currentPhase: number;
  streak: number;
  lastActiveDate: string;
  totalMinutes: number;
  weeklyLog: Record<string, number>;
  dailyLog: Record<string, number>;
}

export interface BlenderNewsArticle {
  id: string;
  title: string;
  summary: string;
  category: "update" | "community" | "addon" | "tutorial" | "industry";
  date: string;
  source: string;
  url: string;
  icon: string;
}

export interface BlenderAITool {
  id: string;
  name: string;
  description: string;
  useCase: string;
  url: string;
  icon: string;
  category: "texture" | "concept-art" | "rendering" | "animation" | "modeling";
}

export interface BlenderAddon {
  id: string;
  name: string;
  description: string;
  whyUseful: string;
  url: string;
  icon: string;
  trending: boolean;
  free: boolean;
}

export interface WhyLearnItem {
  title: string;
  description: string;
  icon: string;
  careers: string[];
}

export interface IndustryApplication {
  industry: string;
  description: string;
  icon: string;
  examples: string[];
}
