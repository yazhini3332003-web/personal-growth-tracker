/* ═══════════════════════════════════════════════════════════════════
   AI COPILOT — Platform Knowledge Base
   Full knowledge of every section, feature, and workflow
   ═══════════════════════════════════════════════════════════════════ */

export interface PageInfo {
  path: string;
  name: string;
  description: string;
  features: string[];
  howToUse: string[];
  tips: string[];
}

export const platformPages: PageInfo[] = [
  {
    path: "/",
    name: "Dashboard",
    description:
      "Your command center! The Dashboard gives you a real-time snapshot of your personal growth journey — points, streaks, progress charts, and category breakdowns all in one place.",
    features: [
      "Total points earned vs target",
      "Days completed counter",
      "Average daily score",
      "Daily score trend chart",
      "Category breakdown doughnut chart",
      "Goal progress bar",
      "Remaining days countdown",
    ],
    howToUse: [
      "Select an active goal from the Goals page first — the Dashboard tracks that goal.",
      "Check your daily score trend to see if you're improving.",
      "Use the category breakdown to identify which areas need more focus.",
      "The progress bar shows how close you are to your target points.",
    ],
    tips: [
      "Visit the Dashboard daily to stay motivated.",
      "If your average daily score is below target, try adding more tasks.",
      "The trend chart helps you spot patterns — weekends dipping? Plan ahead!",
    ],
  },
  {
    path: "/goals",
    name: "Goals",
    description:
      "Set and manage your personal growth goals. Each goal has a name, duration, target points, and tracks your entire journey.",
    features: [
      "Create new goals with name, description, duration, and target",
      "View all goals in a clean list",
      "Set any goal as your active goal",
      "Track completion percentage",
      "Edit or delete existing goals",
    ],
    howToUse: [
      "Click 'Create Goal' to start a new growth journey.",
      "Set a realistic target — maybe 500 points over 30 days to start.",
      "Mark a goal as Active to track it on the Dashboard.",
      "You can have multiple goals but only one active at a time.",
    ],
    tips: [
      "Start with a 7-day goal to build the habit, then go longer.",
      "Be specific — 'Learn React Basics' is better than 'Learn Coding'.",
      "Review and adjust your target if it's too easy or too hard.",
    ],
  },
  {
    path: "/categories",
    name: "Categories",
    description:
      "Organize your tasks into meaningful categories like Coding, Reading, Exercise, etc. Categories help you track which areas of growth you're focusing on.",
    features: [
      "Create custom categories with name, color, and icon",
      "Categories are linked to your active goal",
      "Color-coded for easy visual identification",
      "View all categories in a grid layout",
      "Edit or delete categories",
    ],
    howToUse: [
      "Create categories that match your goal — for a coding goal, try 'Frontend', 'Backend', 'Practice'.",
      "Choose distinct colors so the Dashboard chart is easy to read.",
      "You need at least one category before creating tasks.",
    ],
    tips: [
      "Keep categories broad — 3 to 6 categories work best.",
      "The Dashboard shows a breakdown by category so you can spot imbalances.",
    ],
  },
  {
    path: "/tasks",
    name: "Tasks",
    description:
      "Create the specific tasks you'll complete each day. Each task belongs to a category and has a point value. Complete tasks to earn points toward your goal.",
    features: [
      "Create tasks with name, category, and point value",
      "Tasks linked to your active goal and a category",
      "Point values let you weight tasks by importance",
      "View, edit, and delete tasks",
    ],
    howToUse: [
      "Create tasks like 'Complete 1 LeetCode problem (10 pts)' or 'Read 30 min (5 pts)'.",
      "Assign higher points to harder or more important tasks.",
      "These tasks show up on the Daily Tracker for you to check off.",
    ],
    tips: [
      "Have a mix of easy (2-3 pts) and challenging (10+ pts) tasks.",
      "Create tasks you can realistically do daily.",
      "You can always add more tasks as you progress.",
    ],
  },
  {
    path: "/tracker",
    name: "Daily Tracker",
    description:
      "Your daily check-in! Select which tasks you completed today, add notes, and log your progress. This is where your points get recorded.",
    features: [
      "Select today's date and day number",
      "Check off completed tasks from your task list",
      "Add daily notes or reflections",
      "See total points earned for the day",
      "Submit your daily log",
    ],
    howToUse: [
      "Visit the Daily Tracker every day (or at least every few days).",
      "Check the tasks you completed.",
      "Add notes about what you learned or how you felt.",
      "Submit to record your progress — it feeds into the Dashboard.",
    ],
    tips: [
      "Try to log at the same time each day to build a routine.",
      "Even if you only did one task, log it — consistency beats perfection.",
      "Use the notes section as a mini journal.",
    ],
  },
  {
    path: "/analytics",
    name: "Analytics",
    description:
      "Deep-dive into your performance data. See trends, category breakdowns, streaks, and insights about your growth journey.",
    features: [
      "Performance charts and trend lines",
      "Category-wise point distribution",
      "Streak tracking",
      "Historical data comparison",
      "Visual progress indicators",
    ],
    howToUse: [
      "Check Analytics weekly to see your progress trends.",
      "Compare categories to see where you're excelling or slacking.",
      "Use insights to adjust your task mix for better balance.",
    ],
    tips: [
      "Weekly check-ins on Analytics help you stay on course.",
      "If one category dominates, try diversifying your tasks.",
    ],
  },
  {
    path: "/ai-updates",
    name: "AI Updates",
    description:
      "Stay current with the latest in AI and web development. Curated news, trending tools, and industry updates all in one feed.",
    features: [
      "Curated AI and web dev news articles",
      "Trending tools and frameworks",
      "Category-based filtering",
      "Links to original sources",
      "Regular content updates",
    ],
    howToUse: [
      "Browse the feed to discover new tools and frameworks.",
      "Click articles to read the full content on the source site.",
      "Use this to stay informed about the AI development landscape.",
    ],
    tips: [
      "Spend 10-15 minutes here each week to stay current.",
      "When you find an interesting tool, try it in the Learning Lab!",
    ],
  },
  {
    path: "/investment",
    name: "Investment",
    description:
      "Track and manage your investments. A dedicated section for monitoring your financial growth alongside personal growth.",
    features: [
      "Investment portfolio tracking",
      "Financial data visualization",
      "Performance monitoring",
      "Investment management tools",
    ],
    howToUse: [
      "Add your investments to track them alongside your growth goals.",
      "Monitor performance over time with visual charts.",
      "Use this to build financial literacy as part of your personal development.",
    ],
    tips: [
      "Financial growth is part of personal growth — track both!",
      "Review your investment performance monthly.",
    ],
  },
  {
    path: "/ai-learning",
    name: "AI Learning",
    description:
      "A structured AI learning platform with a visual roadmap, stages from beginner to advanced, daily tasks, trending tools, and weekly reviews.",
    features: [
      "Visual learning roadmap with stages",
      "Stage-based learning content",
      "Daily AI learning tasks",
      "Trending AI tools showcase",
      "Weekly progress reviews",
      "Learning resources for each stage",
    ],
    howToUse: [
      "Follow the roadmap stages from beginner to advanced.",
      "Complete daily tasks to build consistent learning habits.",
      "Explore trending tools to stay current.",
      "Do the weekly review to consolidate learning.",
    ],
    tips: [
      "Don't skip stages — each one builds on the previous.",
      "Combine with the Learning Lab for hands-on practice.",
    ],
  },
  {
    path: "/learning-lab",
    name: "Learning Lab",
    description:
      "Your interactive AI web developer lab! 8 structured phases with coding exercises, mini projects, a resource library, AI news feed, and progress tracking. This is where you learn by doing.",
    features: [
      "8 learning phases from AI basics to advanced agents",
      "Interactive code editor for exercises",
      "Prompt playground for AI prompt engineering",
      "Chatbot simulator for testing AI conversations",
      "API testing playground",
      "Agent workflow builder",
      "Mini projects for each phase",
      "Resource library with tutorials, docs, videos",
      "AI news feed",
      "Progress tracking with streaks and stats",
      "Notes for each phase",
    ],
    howToUse: [
      "Start at Phase 1: 'Master AI as Your Daily Copilot'.",
      "Each phase has 4 tabs: Learning, Resources, Practice, and Mini Project.",
      "Complete exercises using the built-in code editor.",
      "Build the mini project to solidify your knowledge.",
      "Check your progress in the Progress tab.",
      "Browse the Resource Library for additional learning materials.",
    ],
    tips: [
      "Go phase by phase — don't jump ahead!",
      "Actually write the code in exercises, don't just read them.",
      "Save notes in each phase for future reference.",
      "The mini projects are the most valuable part — don't skip them.",
      "Use the AI News tab to discover new tools to integrate into your projects.",
    ],
  },
  {
    path: "/settings",
    name: "Settings",
    description:
      "Configure your profile and application preferences. Customize the platform to fit your workflow.",
    features: [
      "Profile management",
      "Application preferences",
      "Account settings",
      "Customization options",
    ],
    howToUse: [
      "Visit Settings to update your profile information.",
      "Configure notification preferences.",
      "Adjust display and theme settings.",
    ],
    tips: [
      "Keep your profile updated for a personalized experience.",
    ],
  },
];

/* ─── Contextual quick suggestions per page ─────────────────────── */
export const contextSuggestions: Record<string, string[]> = {
  "/": [
    "How do I improve my daily score?",
    "What does the category breakdown show?",
    "How do I change my active goal?",
  ],
  "/goals": [
    "How do I create a new goal?",
    "What's a good target for a beginner?",
    "Can I have multiple goals?",
  ],
  "/categories": [
    "How many categories should I create?",
    "What are good category ideas?",
    "How do categories affect the dashboard?",
  ],
  "/tasks": [
    "How do I assign points to tasks?",
    "What's a good task list?",
    "How many tasks should I have?",
  ],
  "/tracker": [
    "How do I log my daily progress?",
    "What should I write in notes?",
    "Can I edit past entries?",
  ],
  "/analytics": [
    "How do I read the analytics charts?",
    "What does the streak counter mean?",
    "How can I improve my performance?",
  ],
  "/ai-updates": [
    "What are the trending AI tools?",
    "How do I stay current with AI?",
    "What should I learn next?",
  ],
  "/investment": [
    "How do I track investments?",
    "What features are available here?",
  ],
  "/ai-learning": [
    "Where should I start learning AI?",
    "What are the learning stages?",
    "How do daily tasks work?",
  ],
  "/learning-lab": [
    "What phase should I start with?",
    "How do exercises work?",
    "What's in the resource library?",
    "How do I track my lab progress?",
  ],
  "/settings": [
    "How do I update my profile?",
    "What can I customize?",
  ],
};

/* ─── Navigation intents — keyword → route ──────────────────────── */
export const navigationIntents: { keywords: string[]; path: string; label: string }[] = [
  { keywords: ["dashboard", "home", "overview", "main page", "command center"], path: "/", label: "Dashboard" },
  { keywords: ["goal", "goals", "create goal", "set goal", "my goals"], path: "/goals", label: "Goals" },
  { keywords: ["categor", "categories", "organize"], path: "/categories", label: "Categories" },
  { keywords: ["task", "tasks", "create task", "my tasks", "to do", "todo"], path: "/tasks", label: "Tasks" },
  { keywords: ["tracker", "daily tracker", "daily log", "log today", "check in", "track today", "today's task"], path: "/tracker", label: "Daily Tracker" },
  { keywords: ["analytics", "stats", "statistics", "performance", "insights", "data"], path: "/analytics", label: "Analytics" },
  { keywords: ["ai update", "ai news", "news", "trending", "latest ai"], path: "/ai-updates", label: "AI Updates" },
  { keywords: ["invest", "investment", "financial", "portfolio", "money"], path: "/investment", label: "Investment" },
  { keywords: ["ai learning", "learning platform", "roadmap", "stages", "learning path"], path: "/ai-learning", label: "AI Learning" },
  { keywords: ["learning lab", "lab", "exercises", "practice", "code editor", "mini project", "resource library"], path: "/learning-lab", label: "Learning Lab" },
  { keywords: ["setting", "settings", "profile", "preferences", "account", "config"], path: "/settings", label: "Settings" },
];

/* ─── Smart action suggestions ──────────────────────────────────── */
export const smartActions = [
  { label: "📝 Log today's progress", path: "/tracker", description: "Open the Daily Tracker and record what you did today." },
  { label: "🎯 Review your goals", path: "/goals", description: "Check how your goals are progressing." },
  { label: "🧪 Continue Learning Lab", path: "/learning-lab", description: "Pick up where you left off in the Learning Lab." },
  { label: "📊 Check your analytics", path: "/analytics", description: "See your performance trends and insights." },
  { label: "📰 Read AI updates", path: "/ai-updates", description: "Catch up on the latest AI news and tools." },
  { label: "💡 Explore AI Learning", path: "/ai-learning", description: "Follow the structured AI learning roadmap." },
];

/* ─── Motivational quotes ───────────────────────────────────────── */
export const motivationalQuotes = [
  "Small daily improvements lead to staggering long-term results. 🚀",
  "You don't have to be great to start, but you have to start to be great. 💪",
  "Consistency beats intensity. Show up every day. 🔥",
  "The expert in anything was once a beginner. Keep going! 🌟",
  "Progress, not perfection. Every step counts. ✨",
  "Your future self will thank you for what you do today. 🎯",
  "Learning is a superpower. You're leveling up right now! ⚡",
  "Don't compare your chapter 1 to someone else's chapter 20. 📖",
  "The best time to start was yesterday. The next best time is now. 🕐",
  "You're building something amazing — one day at a time. 🏗️",
];

/* ─── AI Learning recommendations ───────────────────────────────── */
export const learningRecommendations = [
  { tool: "ChatGPT", description: "Start with ChatGPT for conversational AI and code generation. It's the best starting point for beginners.", url: "https://chat.openai.com" },
  { tool: "Claude", description: "Anthropic's Claude is excellent for longer reasoning, code analysis, and detailed explanations.", url: "https://claude.ai" },
  { tool: "GitHub Copilot", description: "Install Copilot in VS Code for AI-powered code autocomplete. Game-changer for productivity.", url: "https://github.com/features/copilot" },
  { tool: "Cursor", description: "An AI-first code editor built on VS Code. Great for AI-assisted development.", url: "https://cursor.sh" },
  { tool: "v0 by Vercel", description: "Generate UI components with AI. Perfect for learning React and Next.js.", url: "https://v0.dev" },
  { tool: "Perplexity", description: "AI-powered search engine. Great for research and learning new concepts.", url: "https://perplexity.ai" },
];
