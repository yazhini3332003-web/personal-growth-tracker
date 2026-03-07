import React, { useState } from "react";

interface ShowcaseProject {
  id: string;
  title: string;
  creator: string;
  avatar: string;
  image: string;
  category: string;
  description: string;
  software: string;
  renderTime: string;
  likes: number;
  comments: number;
  tags: string[];
  featured?: boolean;
}

const showcaseProjects: ShowcaseProject[] = [
  {
    id: "1",
    title: "Cozy Winter Cabin",
    creator: "Alex Chen",
    avatar: "🧑‍🎨",
    image: "🏔️",
    category: "Architecture",
    description: "A warm, inviting cabin scene with volumetric lighting through snowy windows. Rendered in Cycles with 2048 samples.",
    software: "Blender 4.0 + Cycles",
    renderTime: "4 hours",
    likes: 234,
    comments: 18,
    tags: ["architecture", "lighting", "cycles", "winter"],
    featured: true
  },
  {
    id: "2",
    title: "Sci-Fi Corridor",
    creator: "Maya Rodriguez",
    avatar: "👩‍💻",
    image: "🚀",
    category: "Sci-Fi",
    description: "Futuristic spaceship corridor with emissive panels and atmospheric fog. Heavy use of procedural textures.",
    software: "Blender 4.0 + Eevee",
    renderTime: "15 minutes",
    likes: 189,
    comments: 24,
    tags: ["sci-fi", "emissive", "procedural", "eevee"],
    featured: true
  },
  {
    id: "3",
    title: "Forest Spirit Character",
    creator: "Jordan Kim",
    avatar: "🧑‍🎤",
    image: "🧚",
    category: "Character",
    description: "Stylized forest spirit character with particle hair and cloth simulation. Fully rigged for animation.",
    software: "Blender 4.0 + Cycles",
    renderTime: "8 hours",
    likes: 456,
    comments: 45,
    tags: ["character", "stylized", "rigging", "particles"]
  },
  {
    id: "4",
    title: "Product Visualization",
    creator: "Sam Wilson",
    avatar: "🧔",
    image: "⌚",
    category: "Product",
    description: "Clean product render of a luxury watch with studio lighting and realistic materials.",
    software: "Blender 4.0 + Cycles",
    renderTime: "2 hours",
    likes: 167,
    comments: 12,
    tags: ["product", "studio", "materials", "clean"]
  },
  {
    id: "5",
    title: "Animated Logo Reveal",
    creator: "Chris Park",
    avatar: "👨‍💼",
    image: "🎬",
    category: "Motion Graphics",
    description: "Dynamic 3D logo animation with particles, reflections, and motion blur. 5-second loop.",
    software: "Blender 4.0 + Eevee",
    renderTime: "45 minutes",
    likes: 203,
    comments: 19,
    tags: ["animation", "motion-graphics", "logo", "particles"]
  },
  {
    id: "6",
    title: "Low Poly Landscape",
    creator: "Emma Davis",
    avatar: "👩‍🎨",
    image: "🏞️",
    category: "Stylized",
    description: "Colorful low poly mountain landscape with stylized water and sky gradient. Great for games.",
    software: "Blender 4.0 + Eevee",
    renderTime: "5 minutes",
    likes: 312,
    comments: 28,
    tags: ["low-poly", "stylized", "landscape", "game-art"]
  },
  {
    id: "7",
    title: "Realistic Interior",
    creator: "David Nguyen",
    avatar: "🧑‍🔬",
    image: "🛋️",
    category: "Architecture",
    description: "Photorealistic living room interior with HDRI lighting and imported furniture models.",
    software: "Blender 4.0 + Cycles",
    renderTime: "6 hours",
    likes: 278,
    comments: 32,
    tags: ["interior", "realistic", "hdri", "architecture"]
  },
  {
    id: "8",
    title: "Abstract Geometry",
    creator: "Luna Martinez",
    avatar: "🧑‍🚀",
    image: "💎",
    category: "Abstract",
    description: "Experimental abstract piece with glass shaders, caustics, and rainbow dispersion.",
    software: "Blender 4.0 + Cycles",
    renderTime: "3 hours",
    likes: 145,
    comments: 11,
    tags: ["abstract", "glass", "caustics", "experimental"]
  }
];

const categories = ["All", "Architecture", "Character", "Sci-Fi", "Product", "Motion Graphics", "Stylized", "Abstract"];

const BlenderShowcase: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState<ShowcaseProject | null>(null);
  const [likedProjects, setLikedProjects] = useState<string[]>([]);

  const filteredProjects = activeCategory === "All"
    ? showcaseProjects
    : showcaseProjects.filter((p) => p.category === activeCategory);

  const featuredProjects = showcaseProjects.filter((p) => p.featured);

  const toggleLike = (id: string) => {
    if (likedProjects.includes(id)) {
      setLikedProjects(likedProjects.filter((l) => l !== id));
    } else {
      setLikedProjects([...likedProjects, id]);
    }
  };

  if (selectedProject) {
    const isLiked = likedProjects.includes(selectedProject.id);
    return (
      <div className="space-y-6">
        <button
          onClick={() => setSelectedProject(null)}
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
        >
          ← Back to Gallery
        </button>

        {/* Project Detail */}
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          {/* Image Placeholder */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 h-64 flex items-center justify-center">
            <span className="text-8xl">{selectedProject.image}</span>
          </div>

          <div className="p-6">
            {/* Header */}
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-800">{selectedProject.title}</h2>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-2xl">{selectedProject.avatar}</span>
                  <span className="text-sm text-gray-600">{selectedProject.creator}</span>
                </div>
              </div>
              <button
                onClick={() => toggleLike(selectedProject.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  isLiked
                    ? "bg-pink-500 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                <span>{isLiked ? "❤️" : "🤍"}</span>
                <span className="text-sm font-medium">{selectedProject.likes + (isLiked ? 1 : 0)}</span>
              </button>
            </div>

            {/* Description */}
            <p className="text-gray-600 text-sm mt-4 leading-relaxed">{selectedProject.description}</p>

            {/* Details */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-400">Category</p>
                <p className="text-sm font-medium text-gray-700">{selectedProject.category}</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-400">Software</p>
                <p className="text-sm font-medium text-gray-700">{selectedProject.software}</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-400">Render Time</p>
                <p className="text-sm font-medium text-gray-700">{selectedProject.renderTime}</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-400">Comments</p>
                <p className="text-sm font-medium text-gray-700">{selectedProject.comments}</p>
              </div>
            </div>

            {/* Tags */}
            <div className="mt-6">
              <p className="text-xs text-gray-400 mb-2">Tags</p>
              <div className="flex flex-wrap gap-2">
                {selectedProject.tags.map((tag) => (
                  <span key={tag} className="px-3 py-1 bg-blue-50 text-blue-600 text-xs rounded-full">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex gap-3">
              <button className="flex-1 py-3 bg-orange-500 text-white rounded-xl text-sm font-medium hover:bg-orange-600 transition-colors">
                View Full Size
              </button>
              <button className="px-6 py-3 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">
                💬 Comment
              </button>
            </div>
          </div>
        </div>

        {/* Related */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h3 className="font-bold text-gray-800 mb-4">More from this category</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {showcaseProjects
              .filter((p) => p.category === selectedProject.category && p.id !== selectedProject.id)
              .slice(0, 4)
              .map((project) => (
                <button
                  key={project.id}
                  onClick={() => setSelectedProject(project)}
                  className="bg-gray-100 rounded-xl p-4 text-center hover:bg-gray-200 transition-colors"
                >
                  <span className="text-3xl">{project.image}</span>
                  <p className="text-xs font-medium text-gray-700 mt-2 truncate">{project.title}</p>
                </button>
              ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-fuchsia-500 via-purple-500 to-indigo-500 rounded-2xl p-6 text-white relative overflow-hidden">
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full" />
        <div className="relative">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">🎨</span>
            <div>
              <h2 className="font-bold text-xl">User Showcase</h2>
              <p className="text-white/70 text-sm">Gallery of amazing community creations</p>
            </div>
          </div>
          <p className="text-white/80 text-sm leading-relaxed mt-3 max-w-xl">
            Get inspired by projects created by fellow Blender learners. See what's possible 
            and share your own work to get feedback from the community.
          </p>
        </div>
      </div>

      {/* Featured */}
      {featuredProjects.length > 0 && (
        <div>
          <h3 className="text-gray-800 font-bold text-sm mb-3 flex items-center gap-2">
            <span>⭐</span> Featured This Week
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {featuredProjects.map((project) => (
              <button
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all text-left group"
              >
                <div className="bg-gradient-to-br from-gray-700 to-gray-900 h-32 flex items-center justify-center relative">
                  <span className="text-5xl">{project.image}</span>
                  <span className="absolute top-3 right-3 px-2 py-0.5 bg-amber-400 text-amber-900 text-[10px] font-bold rounded">
                    FEATURED
                  </span>
                </div>
                <div className="p-4">
                  <h4 className="font-bold text-gray-800 group-hover:text-orange-600 transition-colors">
                    {project.title}
                  </h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span>{project.avatar}</span>
                    <span className="text-xs text-gray-500">{project.creator}</span>
                  </div>
                  <div className="flex items-center gap-3 mt-3 text-xs text-gray-400">
                    <span>❤️ {project.likes}</span>
                    <span>💬 {project.comments}</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Category Filter */}
      <div>
        <p className="text-xs text-gray-500 mb-2">Filter by category</p>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-xl text-xs font-medium transition-colors ${
                activeCategory === category
                  ? "bg-orange-500 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredProjects.map((project) => {
          const isLiked = likedProjects.includes(project.id);
          return (
            <div
              key={project.id}
              className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-md transition-all group"
            >
              <button
                onClick={() => setSelectedProject(project)}
                className="w-full text-left"
              >
                <div className="bg-gradient-to-br from-gray-600 to-gray-800 h-28 flex items-center justify-center">
                  <span className="text-4xl">{project.image}</span>
                </div>
                <div className="p-3">
                  <h4 className="font-medium text-sm text-gray-800 group-hover:text-orange-600 transition-colors truncate">
                    {project.title}
                  </h4>
                  <p className="text-[11px] text-gray-400 mt-0.5">{project.creator}</p>
                </div>
              </button>
              <div className="px-3 pb-3 flex items-center justify-between">
                <span className="text-[10px] text-gray-400 bg-gray-100 px-2 py-0.5 rounded">
                  {project.category}
                </span>
                <button
                  onClick={() => toggleLike(project.id)}
                  className="flex items-center gap-1 text-xs"
                >
                  <span>{isLiked ? "❤️" : "🤍"}</span>
                  <span className="text-gray-500">{project.likes + (isLiked ? 1 : 0)}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Upload Prompt */}
      <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl p-6 text-white">
        <div className="flex items-center gap-4">
          <span className="text-4xl">📤</span>
          <div className="flex-1">
            <h3 className="font-bold text-lg">Share Your Work</h3>
            <p className="text-white/80 text-sm mt-1">
              Created something in Blender? Upload it to the showcase and get feedback from the community!
            </p>
          </div>
          <button className="px-6 py-3 bg-white text-emerald-600 rounded-xl text-sm font-medium hover:bg-emerald-50 transition-colors">
            Upload Project
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-gray-100 p-4 text-center">
          <p className="text-2xl font-bold text-purple-600">{showcaseProjects.length}</p>
          <p className="text-xs text-gray-500 mt-1">Projects</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-4 text-center">
          <p className="text-2xl font-bold text-pink-600">{showcaseProjects.reduce((a, b) => a + b.likes, 0)}</p>
          <p className="text-xs text-gray-500 mt-1">Total Likes</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-4 text-center">
          <p className="text-2xl font-bold text-blue-600">{new Set(showcaseProjects.map((p) => p.creator)).size}</p>
          <p className="text-xs text-gray-500 mt-1">Creators</p>
        </div>
      </div>
    </div>
  );
};

export default BlenderShowcase;
