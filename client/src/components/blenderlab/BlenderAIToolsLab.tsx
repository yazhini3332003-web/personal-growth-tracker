import React, { useState, useEffect } from "react";

// ==================== TYPES ====================
interface AITool {
  id: string;
  name: string;
  category: "generation" | "enhancement" | "automation" | "texturing" | "animation" | "workflow";
  description: string;
  features: string[];
  useCases: string[];
  difficulty: "beginner" | "intermediate" | "advanced";
  icon: string;
  isPremium: boolean;
  website?: string;
  tutorial?: string;
  isNew?: boolean;
  isTrending?: boolean;
}

interface DailyChallenge {
  id: string;
  day: number;
  title: string;
  description: string;
  aiTool: string;
  difficulty: "easy" | "medium" | "hard";
  xpReward: number;
  timeEstimate: string;
  steps: string[];
  tips: string[];
  completed?: boolean;
}

interface AITrend {
  id: string;
  title: string;
  description: string;
  date: string;
  category: string;
  icon: string;
  link?: string;
  isHot?: boolean;
}

interface ModelingIdea {
  id: string;
  prompt: string;
  category: string;
  difficulty: string;
  aiSuggestions: string[];
  referenceStyle?: string;
}

interface UserProgress {
  totalXP: number;
  level: number;
  streakDays: number;
  completedChallenges: string[];
  exploredTools: string[];
  generatedIdeas: number;
}

type TabView = "tools" | "practice" | "ideas" | "trends" | "playground";

// ==================== DATA ====================
const aiTools: AITool[] = [
  {
    id: "stable-diffusion",
    name: "Stable Diffusion + Blender",
    category: "texturing",
    description: "Generate AI textures and materials using Stable Diffusion models directly in Blender with various add-ons.",
    features: ["PBR texture generation", "Seamless textures", "Material variations", "Style transfer"],
    useCases: ["Creating unique textures", "Generating material variations", "Artistic textures"],
    difficulty: "intermediate",
    icon: "🎨",
    isPremium: false,
    isNew: true,
    isTrending: true
  },
  {
    id: "ai-denoiser",
    name: "AI Denoiser (OptiX/OIDN)",
    category: "enhancement",
    description: "Built-in AI denoising for faster, cleaner renders using NVIDIA OptiX or Intel Open Image Denoise.",
    features: ["Real-time preview denoising", "Fast final renders", "Noise reduction", "Detail preservation"],
    useCases: ["Reducing render times", "Clean renders with fewer samples", "Animation workflows"],
    difficulty: "beginner",
    icon: "✨",
    isPremium: false
  },
  {
    id: "dream-textures",
    name: "Dream Textures",
    category: "texturing",
    description: "Free Blender add-on that generates AI textures using Stable Diffusion right inside Blender's shader editor.",
    features: ["Text-to-texture", "Seamless generation", "PBR support", "Local processing"],
    useCases: ["Quick texture creation", "Concept textures", "Unique material designs"],
    difficulty: "beginner",
    icon: "🌈",
    isPremium: false,
    isTrending: true
  },
  {
    id: "meshroom",
    name: "Meshroom / AliceVision",
    category: "generation",
    description: "AI-powered photogrammetry to create 3D models from photos using machine learning algorithms.",
    features: ["Photo to 3D", "Automatic mesh generation", "Texture extraction", "Dense reconstruction"],
    useCases: ["Scanning real objects", "Environment capture", "Asset creation"],
    difficulty: "intermediate",
    icon: "📸",
    isPremium: false
  },
  {
    id: "point-e",
    name: "Point-E / Shap-E",
    category: "generation",
    description: "OpenAI's text-to-3D models that generate 3D point clouds or meshes from text descriptions.",
    features: ["Text-to-3D", "Fast generation", "Various outputs", "API access"],
    useCases: ["Rapid prototyping", "Concept visualization", "Idea exploration"],
    difficulty: "intermediate",
    icon: "🔮",
    isPremium: false,
    isNew: true
  },
  {
    id: "polycam",
    name: "Polycam AI",
    category: "generation",
    description: "Mobile photogrammetry with AI-enhanced mesh cleaning and optimization for Blender import.",
    features: ["Phone scanning", "AI mesh repair", "Auto texturing", "Export to Blender"],
    useCases: ["Mobile asset capture", "Quick scans", "Real-world objects"],
    difficulty: "beginner",
    icon: "📱",
    isPremium: true
  },
  {
    id: "mixamo",
    name: "Mixamo",
    category: "animation",
    description: "AI-powered auto-rigging and animation library for humanoid characters.",
    features: ["Auto-rigging", "Animation library", "Motion capture", "Blender export"],
    useCases: ["Character animation", "Quick rigging", "Motion clips"],
    difficulty: "beginner",
    icon: "🏃",
    isPremium: false,
    isTrending: true
  },
  {
    id: "cascadeur",
    name: "Cascadeur",
    category: "animation",
    description: "AI-assisted animation software with physics simulation and pose estimation.",
    features: ["AI pose interpolation", "Physics simulation", "Auto-secondary motion", "FBX export"],
    useCases: ["Realistic animation", "Action sequences", "Physics-based motion"],
    difficulty: "advanced",
    icon: "🤸",
    isPremium: true,
    isNew: true
  },
  {
    id: "blenderkit-ai",
    name: "BlenderKit AI Search",
    category: "workflow",
    description: "AI-powered asset search and recommendation system for the BlenderKit library.",
    features: ["Smart search", "Style matching", "Asset recommendations", "Quality filtering"],
    useCases: ["Finding assets", "Style consistency", "Workflow speedup"],
    difficulty: "beginner",
    icon: "🔍",
    isPremium: false
  },
  {
    id: "nvidia-canvas",
    name: "NVIDIA Canvas",
    category: "texturing",
    description: "AI painting tool that transforms brushstrokes into realistic landscape images using GauGAN.",
    features: ["AI landscape generation", "Material painting", "Real-time preview", "Export to Blender"],
    useCases: ["Environment backgrounds", "Concept art", "HDRI creation"],
    difficulty: "beginner",
    icon: "🖌️",
    isPremium: false
  },
  {
    id: "luma-ai",
    name: "Luma AI / NeRF",
    category: "generation",
    description: "Neural Radiance Fields technology for capturing realistic 3D scenes from video input.",
    features: ["Video to 3D", "Realistic lighting", "View synthesis", "Mesh export"],
    useCases: ["Scene capture", "Virtual tours", "Realistic assets"],
    difficulty: "advanced",
    icon: "🌐",
    isPremium: true,
    isTrending: true
  },
  {
    id: "stability-3d",
    name: "Stability AI 3D",
    category: "generation",
    description: "Text-to-3D and image-to-3D generation models for creating 3D assets from prompts.",
    features: ["Text-to-3D", "Image-to-3D", "Multiple styles", "API integration"],
    useCases: ["Asset generation", "Concept models", "Rapid prototyping"],
    difficulty: "intermediate",
    icon: "🎯",
    isPremium: true,
    isNew: true,
    isTrending: true
  }
];

const dailyChallenges: DailyChallenge[] = [
  {
    id: "day1",
    day: 1,
    title: "AI-Assisted Texture Creation",
    description: "Create a stylized rock texture using AI tools and apply it to a 3D model in Blender.",
    aiTool: "Dream Textures / Stable Diffusion",
    difficulty: "easy",
    xpReward: 50,
    timeEstimate: "30 mins",
    steps: [
      "Install Dream Textures add-on (if not installed)",
      "Create a simple rock mesh in Blender",
      "Open shader editor and generate AI texture",
      "Prompt: 'mossy rock surface, detailed, seamless'",
      "Apply generated texture to your rock",
      "Adjust mapping and preview result"
    ],
    tips: [
      "Use seamless mode for tileable textures",
      "Try different prompts for variations",
      "Combine with Blender's procedural nodes"
    ]
  },
  {
    id: "day2",
    day: 2,
    title: "Quick Character Rigging with Mixamo",
    description: "Upload a character model to Mixamo for AI auto-rigging and import animations into Blender.",
    aiTool: "Mixamo",
    difficulty: "easy",
    xpReward: 60,
    timeEstimate: "45 mins",
    steps: [
      "Export your character as FBX from Blender",
      "Upload to Mixamo website",
      "Let AI auto-rig your character",
      "Select and download an animation",
      "Import FBX back into Blender",
      "Apply animation to your scene"
    ],
    tips: [
      "T-pose works best for auto-rigging",
      "Download with 'In Place' option for loops",
      "Use Blender's NLA editor to combine animations"
    ]
  },
  {
    id: "day3",
    day: 3,
    title: "AI Denoiser Optimization",
    description: "Learn to use AI denoising to achieve clean renders with minimal samples.",
    aiTool: "OptiX / OIDN Denoiser",
    difficulty: "easy",
    xpReward: 40,
    timeEstimate: "25 mins",
    steps: [
      "Create a simple interior scene",
      "Enable Cycles render engine",
      "Go to Render Properties → Sampling",
      "Enable 'Denoise' and select OpenImageDenoise",
      "Render with only 64-128 samples",
      "Compare with non-denoised render"
    ],
    tips: [
      "Use viewport denoising for faster preview",
      "Combine with adaptive sampling",
      "AI denoising works better with some noise than no data"
    ]
  },
  {
    id: "day4",
    day: 4,
    title: "Photogrammetry Model Import",
    description: "Process photos through AI photogrammetry and import the resulting 3D model into Blender.",
    aiTool: "Meshroom / Polycam",
    difficulty: "medium",
    xpReward: 80,
    timeEstimate: "60 mins",
    steps: [
      "Take 20-50 photos of an object from all angles",
      "Import photos into Meshroom or Polycam",
      "Process with AI reconstruction",
      "Export as OBJ or glTF",
      "Import into Blender",
      "Clean up mesh and optimize"
    ],
    tips: [
      "Good lighting = better results",
      "Overlap photos by 60-80%",
      "Avoid reflective surfaces"
    ]
  },
  {
    id: "day5",
    day: 5,
    title: "AI-Generated Environment Textures",
    description: "Use NVIDIA Canvas to create a custom environment and use it in Blender.",
    aiTool: "NVIDIA Canvas",
    difficulty: "medium",
    xpReward: 70,
    timeEstimate: "45 mins",
    steps: [
      "Open NVIDIA Canvas (requires RTX GPU)",
      "Paint a simple landscape with AI materials",
      "Export the generated image",
      "Import into Blender as environment texture",
      "Set up as HDRI or background",
      "Render scene with custom environment"
    ],
    tips: [
      "Paint simple shapes - AI adds details",
      "Try different styles and moods",
      "Create matching foreground/background"
    ]
  },
  {
    id: "day6",
    day: 6,
    title: "Text-to-3D Exploration",
    description: "Generate a 3D model from text description using AI text-to-3D tools.",
    aiTool: "Point-E / Shap-E / Stability AI",
    difficulty: "medium",
    xpReward: 90,
    timeEstimate: "60 mins",
    steps: [
      "Access text-to-3D tool (online or API)",
      "Write detailed prompt: 'a medieval wooden chair with carved details'",
      "Generate 3D model",
      "Download in compatible format",
      "Import into Blender",
      "Refine and add details manually"
    ],
    tips: [
      "Be specific in your prompts",
      "Generate multiple variations",
      "Use AI output as starting point, not final"
    ]
  },
  {
    id: "day7",
    day: 7,
    title: "AI Animation Polish",
    description: "Use Cascadeur's AI to create physics-based animation and import to Blender.",
    aiTool: "Cascadeur",
    difficulty: "hard",
    xpReward: 100,
    timeEstimate: "90 mins",
    steps: [
      "Export rigged character from Blender",
      "Import into Cascadeur",
      "Create keyframes for basic action",
      "Apply AI auto-physics for secondary motion",
      "Use AutoPosing for in-between frames",
      "Export and import back to Blender"
    ],
    tips: [
      "Start with simple actions",
      "Let AI handle physics details",
      "Combine with Blender's NLA for complex sequences"
    ]
  }
];

const aiTrends: AITrend[] = [
  {
    id: "trend1",
    title: "Gaussian Splatting Revolution",
    description: "3D Gaussian Splatting is enabling real-time, photorealistic 3D scene rendering from images, faster than NeRF.",
    date: "2026-03-08",
    category: "Technology",
    icon: "💥",
    isHot: true
  },
  {
    id: "trend2",
    title: "Blender 4.2 AI Features",
    description: "New AI-powered tools in Blender 4.2 including smart UV unwrapping and geometry suggestions.",
    date: "2026-03-06",
    category: "Software Update",
    icon: "🟠",
    isHot: true
  },
  {
    id: "trend3",
    title: "Real-Time AI Texture Synthesis",
    description: "New research enables real-time AI texture generation during viewport navigation in 3D software.",
    date: "2026-03-05",
    category: "Research",
    icon: "🔬"
  },
  {
    id: "trend4",
    title: "AI Motion Capture from Video",
    description: "Single-camera AI motion capture tools are becoming accessible for indie 3D artists.",
    date: "2026-03-04",
    category: "Animation",
    icon: "🎬",
    isHot: true
  },
  {
    id: "trend5",
    title: "Text-to-Animation Advances",
    description: "New models can generate full 3D animations from text descriptions, moving beyond static poses.",
    date: "2026-03-03",
    category: "Generation",
    icon: "📝"
  },
  {
    id: "trend6",
    title: "AI Mesh Retopology Tools",
    description: "Automatic retopology using AI is achieving near-manual quality at 100x speed.",
    date: "2026-03-02",
    category: "Modeling",
    icon: "🔺"
  },
  {
    id: "trend7",
    title: "ControlNet for 3D",
    description: "ControlNet technology adapted for 3D generation, enabling precise control over AI-generated models.",
    date: "2026-03-01",
    category: "Research",
    icon: "🎮"
  },
  {
    id: "trend8",
    title: "AI Material Scanner Apps",
    description: "Mobile apps using AI to scan real materials and create PBR textures instantly.",
    date: "2026-02-28",
    category: "Mobile",
    icon: "📱"
  }
];

const modelingPrompts = [
  { category: "Characters", prompts: ["A wise old wizard with flowing robes", "Cyberpunk street vendor robot", "Friendly alien creature with multiple eyes", "Medieval knight in ornate armor"] },
  { category: "Environments", prompts: ["Floating island with waterfalls", "Underground mushroom city", "Abandoned space station interior", "Enchanted forest clearing"] },
  { category: "Vehicles", prompts: ["Steampunk airship", "Futuristic hover bike", "Ancient magical chariot", "Deep sea exploration submarine"] },
  { category: "Props", prompts: ["Magical grimoire with glowing runes", "Sci-fi holographic terminal", "Fantasy treasure chest", "Alien artifact with unknown purpose"] },
  { category: "Creatures", prompts: ["Dragon with crystalline scales", "Mechanical spider guardian", "Ethereal forest spirit", "Underwater bioluminescent fish"] }
];

// ==================== MAIN COMPONENT ====================
const BlenderAIToolsLab: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabView>("tools");
  const [selectedTool, setSelectedTool] = useState<AITool | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentChallenge, setCurrentChallenge] = useState<DailyChallenge | null>(null);
  const [generatedIdea, setGeneratedIdea] = useState<ModelingIdea | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [playgroundPrompt, setPlaygroundPrompt] = useState("");
  const [playgroundResult, setPlaygroundResult] = useState<string | null>(null);
  
  // User progress
  const [userProgress, setUserProgress] = useState<UserProgress>(() => {
    const saved = localStorage.getItem("blender_ai_lab_progress");
    return saved ? JSON.parse(saved) : {
      totalXP: 0,
      level: 1,
      streakDays: 0,
      completedChallenges: [],
      exploredTools: [],
      generatedIdeas: 0
    };
  });

  // Save progress
  useEffect(() => {
    localStorage.setItem("blender_ai_lab_progress", JSON.stringify(userProgress));
  }, [userProgress]);

  // Filter tools
  const filteredTools = aiTools.filter(tool => {
    const matchesCategory = selectedCategory === "all" || tool.category === selectedCategory;
    const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          tool.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categories = [
    { id: "all", label: "All Tools", icon: "🔧" },
    { id: "generation", label: "Generation", icon: "🔮" },
    { id: "texturing", label: "Texturing", icon: "🎨" },
    { id: "animation", label: "Animation", icon: "🏃" },
    { id: "enhancement", label: "Enhancement", icon: "✨" },
    { id: "workflow", label: "Workflow", icon: "⚡" }
  ];

  const markToolExplored = (toolId: string) => {
    if (!userProgress.exploredTools.includes(toolId)) {
      setUserProgress(prev => ({
        ...prev,
        exploredTools: [...prev.exploredTools, toolId],
        totalXP: prev.totalXP + 10
      }));
    }
  };

  const completeChallenge = (challengeId: string, xpReward: number) => {
    if (!userProgress.completedChallenges.includes(challengeId)) {
      const newXP = userProgress.totalXP + xpReward;
      const newLevel = Math.floor(newXP / 200) + 1;
      setUserProgress(prev => ({
        ...prev,
        completedChallenges: [...prev.completedChallenges, challengeId],
        totalXP: newXP,
        level: newLevel,
        streakDays: prev.streakDays + 1
      }));
    }
  };

  const generateIdea = () => {
    setIsGenerating(true);
    
    setTimeout(() => {
      const randomCategory = modelingPrompts[Math.floor(Math.random() * modelingPrompts.length)];
      const randomPrompt = randomCategory.prompts[Math.floor(Math.random() * randomCategory.prompts.length)];
      
      const difficulties = ["Beginner", "Intermediate", "Advanced"];
      const styles = ["Stylized", "Realistic", "Low-poly", "Sculptural", "Cartoon"];
      
      const idea: ModelingIdea = {
        id: Date.now().toString(),
        prompt: randomPrompt,
        category: randomCategory.category,
        difficulty: difficulties[Math.floor(Math.random() * difficulties.length)],
        aiSuggestions: [
          `Start with basic shapes and use AI texturing for details`,
          `Use reference images generated by Stable Diffusion`,
          `Consider using ${aiTools[Math.floor(Math.random() * 3)].name} for enhancement`,
          `Break down into modular parts for efficient workflow`
        ],
        referenceStyle: styles[Math.floor(Math.random() * styles.length)]
      };
      
      setGeneratedIdea(idea);
      setIsGenerating(false);
      setUserProgress(prev => ({
        ...prev,
        generatedIdeas: prev.generatedIdeas + 1,
        totalXP: prev.totalXP + 5
      }));
    }, 1500);
  };

  const simulatePlayground = () => {
    if (!playgroundPrompt.trim()) return;
    
    setIsGenerating(true);
    setTimeout(() => {
      const responses = [
        `🎨 **AI Analysis of "${playgroundPrompt}"**\n\n**Suggested Approach:**\n1. Start with primitive shapes (cubes, spheres)\n2. Use subdivision surface for smoothness\n3. Apply AI textures for realistic materials\n\n**Recommended AI Tools:**\n- Dream Textures for materials\n- Mixamo if character-based\n- AI Denoiser for clean renders\n\n**Estimated Complexity:** Medium\n**Skill Focus:** Modeling + Texturing`,
        `🔮 **Creative Breakdown for "${playgroundPrompt}"**\n\n**Key Elements to Model:**\n1. Main form/silhouette\n2. Secondary details\n3. Surface details & textures\n\n**AI Workflow Suggestion:**\n1. Generate concept with Stable Diffusion\n2. Block out in Blender\n3. Add AI-generated textures\n4. Render with AI denoising\n\n**Pro Tip:** Use ControlNet for consistent reference images`,
        `✨ **Model Planning for "${playgroundPrompt}"**\n\n**Optimal Workflow:**\n\n**Phase 1 - Research**\n- Use text-to-image AI for references\n- Study similar 3D models\n\n**Phase 2 - Modeling**\n- Start low-poly, add detail\n- Consider modular approach\n\n**Phase 3 - Texturing**\n- AI texture generation\n- PBR material setup\n\n**AI Tools to Use:** Dream Textures, Stability AI, OptiX Denoiser`
      ];
      
      setPlaygroundResult(responses[Math.floor(Math.random() * responses.length)]);
      setIsGenerating(false);
    }, 2000);
  };

  const getDaysSinceStart = () => {
    const today = new Date().getDay();
    return today === 0 ? 7 : today;
  };

  const todayChallenge = dailyChallenges[getDaysSinceStart() - 1] || dailyChallenges[0];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 rounded-2xl p-6 shadow-lg">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center">
              <span className="text-4xl">🤖</span>
            </div>
            <div>
              <h1 className="text-white font-bold text-2xl">Blender AI Tools Lab</h1>
              <p className="text-white/80 text-sm mt-1">Explore, Learn & Practice AI-Powered 3D Creation</p>
            </div>
          </div>
          
          {/* User Stats */}
          <div className="flex items-center gap-4">
            <div className="bg-white/20 backdrop-blur rounded-xl px-4 py-2 text-center">
              <p className="text-white/80 text-xs">Level</p>
              <p className="text-white font-bold text-xl">{userProgress.level}</p>
            </div>
            <div className="bg-white/20 backdrop-blur rounded-xl px-4 py-2 text-center">
              <p className="text-white/80 text-xs">XP</p>
              <p className="text-white font-bold text-xl">{userProgress.totalXP}</p>
            </div>
            <div className="bg-white/20 backdrop-blur rounded-xl px-4 py-2 text-center">
              <p className="text-white/80 text-xs">Streak</p>
              <p className="text-white font-bold text-xl">🔥 {userProgress.streakDays}</p>
            </div>
          </div>
        </div>
        
        {/* XP Progress Bar */}
        <div className="mt-4">
          <div className="flex items-center justify-between text-white/80 text-xs mb-1">
            <span>Level {userProgress.level}</span>
            <span>{userProgress.totalXP % 200}/200 XP to Level {userProgress.level + 1}</span>
          </div>
          <div className="h-2 bg-white/20 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full transition-all"
              style={{ width: `${(userProgress.totalXP % 200) / 2}%` }}
            />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2">
        {[
          { id: "tools" as TabView, label: "AI Tools Directory", icon: "🔧" },
          { id: "practice" as TabView, label: "Daily Practice", icon: "📅" },
          { id: "ideas" as TabView, label: "Idea Generator", icon: "💡" },
          { id: "trends" as TabView, label: "AI Trends", icon: "📈" },
          { id: "playground" as TabView, label: "AI Playground", icon: "🎮" }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-xl font-medium text-sm transition-all ${
              activeTab === tab.id
                ? "bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-lg"
                : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
            }`}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* ==================== AI TOOLS DIRECTORY ==================== */}
      {activeTab === "tools" && (
        <div className="space-y-6">
          {/* Search and Filter */}
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search AI tools..."
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:border-purple-500 outline-none"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedCategory === cat.id
                      ? "bg-purple-100 text-purple-700 border border-purple-300"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {cat.icon} {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tools Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTools.map(tool => (
              <div
                key={tool.id}
                onClick={() => {
                  setSelectedTool(tool);
                  markToolExplored(tool.id);
                }}
                className="bg-white rounded-xl border border-gray-200 p-4 hover:border-purple-300 hover:shadow-lg transition-all cursor-pointer"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{tool.icon}</span>
                    <div>
                      <h3 className="font-bold text-gray-800">{tool.name}</h3>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        tool.difficulty === "beginner" ? "bg-green-100 text-green-700" :
                        tool.difficulty === "intermediate" ? "bg-yellow-100 text-yellow-700" :
                        "bg-red-100 text-red-700"
                      }`}>
                        {tool.difficulty}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    {tool.isNew && <span className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">New</span>}
                    {tool.isTrending && <span className="text-xs bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full">🔥</span>}
                    {tool.isPremium && <span className="text-xs bg-purple-100 text-purple-600 px-2 py-0.5 rounded-full">Pro</span>}
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{tool.description}</p>
                <div className="flex flex-wrap gap-1">
                  {tool.features.slice(0, 3).map((feature, i) => (
                    <span key={i} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                      {feature}
                    </span>
                  ))}
                </div>
                {userProgress.exploredTools.includes(tool.id) && (
                  <div className="mt-3 text-xs text-green-600 flex items-center gap-1">
                    ✅ Explored
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Tool Detail Modal */}
          {selectedTool && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6 border-b border-gray-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-4xl">{selectedTool.icon}</span>
                      <div>
                        <h2 className="text-xl font-bold text-gray-800">{selectedTool.name}</h2>
                        <div className="flex items-center gap-2 mt-1">
                          <span className={`text-xs px-2 py-0.5 rounded-full ${
                            selectedTool.category === "generation" ? "bg-purple-100 text-purple-700" :
                            selectedTool.category === "texturing" ? "bg-yellow-100 text-yellow-700" :
                            selectedTool.category === "animation" ? "bg-blue-100 text-blue-700" :
                            "bg-gray-100 text-gray-700"
                          }`}>
                            {selectedTool.category}
                          </span>
                          {selectedTool.isPremium && (
                            <span className="text-xs bg-purple-100 text-purple-600 px-2 py-0.5 rounded-full">Premium</span>
                          )}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedTool(null)}
                      className="text-gray-400 hover:text-gray-600 text-2xl"
                    >
                      ✕
                    </button>
                  </div>
                </div>
                
                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-700 mb-2">Description</h3>
                    <p className="text-gray-600">{selectedTool.description}</p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-gray-700 mb-2">Features</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedTool.features.map((feature, i) => (
                        <span key={i} className="bg-purple-50 text-purple-700 px-3 py-1 rounded-full text-sm">
                          ✓ {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-gray-700 mb-2">Use Cases</h3>
                    <ul className="space-y-1">
                      {selectedTool.useCases.map((useCase, i) => (
                        <li key={i} className="text-gray-600 flex items-center gap-2">
                          <span className="text-purple-500">→</span> {useCase}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-100 flex gap-3">
                    <button className="flex-1 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-medium">
                      🔗 Learn More
                    </button>
                    <button className="flex-1 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-medium">
                      📚 Tutorial
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ==================== DAILY PRACTICE ==================== */}
      {activeTab === "practice" && (
        <div className="space-y-6">
          {/* Today's Challenge */}
          <div className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-white/80 text-sm">Day {getDaysSinceStart()} Challenge</p>
                <h2 className="text-2xl font-bold">{todayChallenge.title}</h2>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold">+{todayChallenge.xpReward}</p>
                <p className="text-white/80 text-xs">XP Reward</p>
              </div>
            </div>
            <p className="text-white/90 mb-4">{todayChallenge.description}</p>
            <div className="flex items-center gap-4 text-sm">
              <span className="bg-white/20 px-3 py-1 rounded-full">🔧 {todayChallenge.aiTool}</span>
              <span className="bg-white/20 px-3 py-1 rounded-full">⏱️ {todayChallenge.timeEstimate}</span>
              <span className={`px-3 py-1 rounded-full ${
                todayChallenge.difficulty === "easy" ? "bg-green-500/50" :
                todayChallenge.difficulty === "medium" ? "bg-yellow-500/50" : "bg-red-500/50"
              }`}>
                {todayChallenge.difficulty}
              </span>
            </div>
            <button
              onClick={() => setCurrentChallenge(todayChallenge)}
              className="mt-4 w-full py-3 bg-white text-orange-600 rounded-xl font-bold hover:bg-white/90 transition-colors"
            >
              {userProgress.completedChallenges.includes(todayChallenge.id) ? "✅ Completed - View Again" : "🚀 Start Challenge"}
            </button>
          </div>

          {/* Weekly Challenges */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <h3 className="font-bold text-gray-800 mb-4">Weekly Challenge Schedule</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
              {dailyChallenges.map(challenge => {
                const isCompleted = userProgress.completedChallenges.includes(challenge.id);
                const isToday = challenge.day === getDaysSinceStart();
                
                return (
                  <div
                    key={challenge.id}
                    onClick={() => setCurrentChallenge(challenge)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      isToday ? "border-orange-500 bg-orange-50" :
                      isCompleted ? "border-green-300 bg-green-50" :
                      "border-gray-200 hover:border-purple-300"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                        isToday ? "bg-orange-500 text-white" : "bg-gray-200 text-gray-600"
                      }`}>
                        Day {challenge.day}
                      </span>
                      {isCompleted && <span className="text-green-500">✅</span>}
                    </div>
                    <h4 className="font-medium text-gray-800 text-sm">{challenge.title}</h4>
                    <p className="text-gray-500 text-xs mt-1">{challenge.aiTool}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className={`text-xs px-2 py-0.5 rounded ${
                        challenge.difficulty === "easy" ? "bg-green-100 text-green-700" :
                        challenge.difficulty === "medium" ? "bg-yellow-100 text-yellow-700" :
                        "bg-red-100 text-red-700"
                      }`}>
                        {challenge.difficulty}
                      </span>
                      <span className="text-xs text-purple-600 font-medium">+{challenge.xpReward} XP</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Challenge Detail Modal */}
          {currentChallenge && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-t-2xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white/80 text-sm">Day {currentChallenge.day} Challenge</p>
                      <h2 className="text-xl font-bold">{currentChallenge.title}</h2>
                    </div>
                    <button onClick={() => setCurrentChallenge(null)} className="text-white/80 hover:text-white text-2xl">
                      ✕
                    </button>
                  </div>
                </div>
                
                <div className="p-6 space-y-4">
                  <p className="text-gray-600">{currentChallenge.description}</p>
                  
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">
                      🔧 {currentChallenge.aiTool}
                    </span>
                    <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                      ⏱️ {currentChallenge.timeEstimate}
                    </span>
                    <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-medium">
                      +{currentChallenge.xpReward} XP
                    </span>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-3">📝 Steps</h3>
                    <div className="space-y-2">
                      {currentChallenge.steps.map((step, i) => (
                        <div key={i} className="flex items-start gap-3 bg-gray-50 p-3 rounded-lg">
                          <span className="w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                            {i + 1}
                          </span>
                          <p className="text-gray-700 text-sm">{step}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">💡 Tips</h3>
                    <ul className="space-y-1">
                      {currentChallenge.tips.map((tip, i) => (
                        <li key={i} className="text-gray-600 text-sm flex items-center gap-2">
                          <span className="text-yellow-500">★</span> {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <button
                    onClick={() => {
                      completeChallenge(currentChallenge.id, currentChallenge.xpReward);
                      setCurrentChallenge(null);
                    }}
                    disabled={userProgress.completedChallenges.includes(currentChallenge.id)}
                    className={`w-full py-3 rounded-xl font-bold transition-colors ${
                      userProgress.completedChallenges.includes(currentChallenge.id)
                        ? "bg-green-100 text-green-600 cursor-not-allowed"
                        : "bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:opacity-90"
                    }`}
                  >
                    {userProgress.completedChallenges.includes(currentChallenge.id) ? "✅ Already Completed" : "✓ Mark as Complete"}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ==================== IDEA GENERATOR ==================== */}
      {activeTab === "ideas" && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-gray-200 p-6 text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-4xl">💡</span>
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">AI Modeling Idea Generator</h2>
            <p className="text-gray-600 mb-6">Get creative prompts with AI workflow suggestions</p>
            
            <button
              onClick={generateIdea}
              disabled={isGenerating}
              className="px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-bold hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {isGenerating ? "⏳ Generating..." : "🎲 Generate Idea"}
            </button>
            
            <p className="text-gray-400 text-sm mt-4">Ideas generated: {userProgress.generatedIdeas}</p>
          </div>

          {generatedIdea && (
            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl border border-purple-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">
                  {generatedIdea.category}
                </span>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  generatedIdea.difficulty === "Beginner" ? "bg-green-100 text-green-700" :
                  generatedIdea.difficulty === "Intermediate" ? "bg-yellow-100 text-yellow-700" :
                  "bg-red-100 text-red-700"
                }`}>
                  {generatedIdea.difficulty}
                </span>
              </div>
              
              <h3 className="text-2xl font-bold text-gray-800 mb-2">"{generatedIdea.prompt}"</h3>
              
              <div className="flex items-center gap-2 mb-4">
                <span className="text-gray-600 text-sm">Style:</span>
                <span className="bg-white px-3 py-1 rounded-full text-sm text-gray-700 border border-gray-200">
                  {generatedIdea.referenceStyle}
                </span>
              </div>
              
              <div className="bg-white rounded-xl p-4">
                <h4 className="font-semibold text-gray-800 mb-3">🤖 AI Workflow Suggestions</h4>
                <ul className="space-y-2">
                  {generatedIdea.aiSuggestions.map((suggestion, i) => (
                    <li key={i} className="flex items-center gap-2 text-gray-700 text-sm">
                      <span className="text-purple-500">→</span> {suggestion}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="flex gap-3 mt-4">
                <button
                  onClick={generateIdea}
                  className="flex-1 py-2 bg-white border border-purple-300 text-purple-700 rounded-lg hover:bg-purple-50 font-medium"
                >
                  🔄 New Idea
                </button>
                <button className="flex-1 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-medium">
                  💾 Save Idea
                </button>
              </div>
            </div>
          )}

          {/* Category Browser */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <h3 className="font-bold text-gray-800 mb-4">Browse by Category</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {modelingPrompts.map((cat, index) => (
                <div
                  key={index}
                  className="p-4 bg-gray-50 rounded-xl text-center hover:bg-purple-50 hover:border-purple-300 border border-transparent cursor-pointer transition-all"
                >
                  <span className="text-3xl block mb-2">
                    {cat.category === "Characters" ? "👤" :
                     cat.category === "Environments" ? "🏞️" :
                     cat.category === "Vehicles" ? "🚗" :
                     cat.category === "Props" ? "🎁" : "🐉"}
                  </span>
                  <p className="font-medium text-gray-700">{cat.category}</p>
                  <p className="text-gray-400 text-xs">{cat.prompts.length} ideas</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ==================== AI TRENDS ==================== */}
      {activeTab === "trends" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {aiTrends.map(trend => (
              <div
                key={trend.id}
                className="bg-white rounded-xl border border-gray-200 p-4 hover:border-purple-300 hover:shadow-lg transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="text-3xl">{trend.icon}</span>
                  {trend.isHot && (
                    <span className="bg-red-100 text-red-600 px-2 py-0.5 rounded-full text-xs font-medium">
                      🔥 Hot
                    </span>
                  )}
                </div>
                <h3 className="font-bold text-gray-800 mb-2">{trend.title}</h3>
                <p className="text-gray-600 text-sm mb-3">{trend.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                    {trend.category}
                  </span>
                  <span className="text-xs text-gray-400">{trend.date}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Stats */}
          <div className="bg-gradient-to-r from-purple-100 to-indigo-100 rounded-2xl p-6">
            <h3 className="font-bold text-gray-800 mb-4">🚀 AI in 3D - Quick Stats</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-xl p-4 text-center">
                <p className="text-3xl font-bold text-purple-600">50+</p>
                <p className="text-gray-600 text-sm">AI Tools for 3D</p>
              </div>
              <div className="bg-white rounded-xl p-4 text-center">
                <p className="text-3xl font-bold text-purple-600">10x</p>
                <p className="text-gray-600 text-sm">Faster Workflows</p>
              </div>
              <div className="bg-white rounded-xl p-4 text-center">
                <p className="text-3xl font-bold text-purple-600">80%</p>
                <p className="text-gray-600 text-sm">Artists Using AI</p>
              </div>
              <div className="bg-white rounded-xl p-4 text-center">
                <p className="text-3xl font-bold text-purple-600">2026</p>
                <p className="text-gray-600 text-sm">AI-Native Era</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==================== AI PLAYGROUND ==================== */}
      {activeTab === "playground" && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">🎮</span>
              <div>
                <h2 className="text-xl font-bold text-gray-800">AI Workflow Planner</h2>
                <p className="text-gray-600 text-sm">Describe what you want to create and get AI-powered workflow suggestions</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <textarea
                value={playgroundPrompt}
                onChange={(e) => setPlaygroundPrompt(e.target.value)}
                placeholder="Describe what you want to model... e.g., 'A futuristic robot character with glowing parts' or 'An ancient temple environment with overgrown vegetation'"
                className="w-full h-32 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm resize-none focus:border-purple-500 outline-none"
              />
              
              <button
                onClick={simulatePlayground}
                disabled={!playgroundPrompt.trim() || isGenerating}
                className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-bold hover:opacity-90 disabled:opacity-50"
              >
                {isGenerating ? "⏳ Analyzing..." : "🤖 Get AI Workflow Suggestions"}
              </button>
            </div>
          </div>

          {playgroundResult && (
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 text-white">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xl">🤖</span>
                <span className="font-medium">AI Workflow Assistant</span>
              </div>
              <div className="bg-black/30 rounded-xl p-4 font-mono text-sm whitespace-pre-wrap">
                {playgroundResult}
              </div>
              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => setPlaygroundResult(null)}
                  className="flex-1 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20"
                >
                  Clear
                </button>
                <button className="flex-1 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                  📋 Copy
                </button>
              </div>
            </div>
          )}

          {/* Quick Prompts */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <h3 className="font-bold text-gray-800 mb-4">💡 Quick Prompt Ideas</h3>
            <div className="flex flex-wrap gap-2">
              {[
                "Realistic human character",
                "Low-poly game asset",
                "Stylized vehicle design",
                "Environment with lighting",
                "Creature with textures",
                "Product visualization",
                "Architecture exterior",
                "Fantasy weapon prop"
              ].map((prompt, i) => (
                <button
                  key={i}
                  onClick={() => setPlaygroundPrompt(prompt)}
                  className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-purple-100 hover:text-purple-700 transition-colors"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlenderAIToolsLab;
