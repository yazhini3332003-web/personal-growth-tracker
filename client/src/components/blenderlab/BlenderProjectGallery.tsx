import React, { useState } from "react";

// Types
interface GalleryProject {
  id: string;
  title: string;
  creator: {
    name: string;
    avatar: string;
    level: string;
  };
  thumbnail: string;
  category: string;
  description: string;
  likes: number;
  views: number;
  comments: number;
  createdAt: string;
  tags: string[];
  featured: boolean;
  softwareUsed: string[];
  renderTime: string;
}

interface Comment {
  id: string;
  user: string;
  avatar: string;
  text: string;
  likes: number;
  time: string;
}

// Sample data
const sampleProjects: GalleryProject[] = [
  {
    id: "p1",
    title: "Futuristic City Skyline",
    creator: { name: "Alex Chen", avatar: "👨‍💻", level: "Pro" },
    thumbnail: "🌆",
    category: "Architecture",
    description: "A detailed sci-fi cityscape with volumetric lighting and atmospheric effects. Inspired by Blade Runner aesthetics.",
    likes: 1245,
    views: 8920,
    comments: 89,
    createdAt: "2 hours ago",
    tags: ["scifi", "architecture", "city", "cyberpunk"],
    featured: true,
    softwareUsed: ["Blender", "Cycles"],
    renderTime: "4h 23m"
  },
  {
    id: "p2",
    title: "Mystical Forest Dragon",
    creator: { name: "Sarah Kim", avatar: "👩‍🎨", level: "Expert" },
    thumbnail: "🐉",
    category: "Characters",
    description: "A majestic dragon resting in an enchanted forest. Full creature design with custom scales and wing membrane.",
    likes: 2340,
    views: 15600,
    comments: 156,
    createdAt: "5 hours ago",
    tags: ["dragon", "creature", "fantasy", "character"],
    featured: true,
    softwareUsed: ["Blender", "Substance Painter"],
    renderTime: "6h 45m"
  },
  {
    id: "p3",
    title: "Vintage Sports Car",
    creator: { name: "Mike R.", avatar: "🧑‍🔧", level: "Intermediate" },
    thumbnail: "🚗",
    category: "Vehicles",
    description: "Classic muscle car with chrome details and leather interior. Studio lighting setup included.",
    likes: 890,
    views: 5400,
    comments: 45,
    createdAt: "1 day ago",
    tags: ["car", "vehicle", "vintage", "automotive"],
    featured: false,
    softwareUsed: ["Blender", "EEVEE"],
    renderTime: "45m"
  },
  {
    id: "p4",
    title: "Cozy Coffee Shop",
    creator: { name: "Emma L.", avatar: "👩‍💼", level: "Pro" },
    thumbnail: "☕",
    category: "Interior",
    description: "Warm and inviting coffee shop interior with realistic materials and morning light streaming through windows.",
    likes: 1560,
    views: 9800,
    comments: 78,
    createdAt: "1 day ago",
    tags: ["interior", "coffee", "cozy", "architecture"],
    featured: false,
    softwareUsed: ["Blender", "Cycles"],
    renderTime: "2h 15m"
  },
  {
    id: "p5",
    title: "Space Station Module",
    creator: { name: "John D.", avatar: "👨‍🚀", level: "Expert" },
    thumbnail: "🛸",
    category: "SciFi",
    description: "Modular space station with realistic mechanical details, inspired by ISS. Fully animated airlocks.",
    likes: 1890,
    views: 12300,
    comments: 112,
    createdAt: "2 days ago",
    tags: ["space", "scifi", "station", "mechanical"],
    featured: true,
    softwareUsed: ["Blender", "Cycles"],
    renderTime: "8h 30m"
  },
  {
    id: "p6",
    title: "Stylized Character - Mage",
    creator: { name: "Lisa Wong", avatar: "🧙‍♀️", level: "Pro" },
    thumbnail: "🧙",
    category: "Characters",
    description: "Hand-painted stylized mage character ready for animation. Includes full rig and basic animations.",
    likes: 2100,
    views: 11200,
    comments: 98,
    createdAt: "3 days ago",
    tags: ["character", "stylized", "mage", "fantasy"],
    featured: false,
    softwareUsed: ["Blender", "Hand-painted"],
    renderTime: "15m"
  },
  {
    id: "p7",
    title: "Procedural Landscapes",
    creator: { name: "Tom B.", avatar: "🏔️", level: "Intermediate" },
    thumbnail: "🏔️",
    category: "Environment",
    description: "Fully procedural terrain with forests, rivers, and mountains. Node-based workflow included.",
    likes: 980,
    views: 6700,
    comments: 56,
    createdAt: "4 days ago",
    tags: ["landscape", "procedural", "environment", "terrain"],
    featured: false,
    softwareUsed: ["Blender", "Geometry Nodes"],
    renderTime: "1h 30m"
  },
  {
    id: "p8",
    title: "Product Visualization Pack",
    creator: { name: "Design Studio", avatar: "📦", level: "Pro" },
    thumbnail: "📱",
    category: "Product",
    description: "Professional product shots for tech devices. Studio setup with 3-point lighting system.",
    likes: 1450,
    views: 8900,
    comments: 67,
    createdAt: "5 days ago",
    tags: ["product", "tech", "visualization", "studio"],
    featured: false,
    softwareUsed: ["Blender", "Cycles"],
    renderTime: "3h 00m"
  }
];

const sampleComments: Comment[] = [
  { id: "c1", user: "3D_Master", avatar: "🎨", text: "Amazing work! The lighting is incredible!", likes: 24, time: "10m ago" },
  { id: "c2", user: "BlenderFan", avatar: "🔥", text: "How did you achieve that metal effect?", likes: 12, time: "25m ago" },
  { id: "c3", user: "ArtLover", avatar: "❤️", text: "This is gallery-worthy! Stunning composition.", likes: 18, time: "1h ago" },
  { id: "c4", user: "NewLearner", avatar: "📚", text: "Inspiring work! I'm learning so much from this.", likes: 8, time: "2h ago" }
];

const categories = ["All", "Featured", "Architecture", "Characters", "Vehicles", "Interior", "SciFi", "Environment", "Product"];

const BlenderProjectGallery: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState<"popular" | "recent" | "trending">("popular");
  const [selectedProject, setSelectedProject] = useState<GalleryProject | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [likedProjects, setLikedProjects] = useState<Set<string>>(new Set());

  // Filter projects
  const filteredProjects = sampleProjects.filter(project => {
    const matchesCategory = selectedCategory === "All" || 
      (selectedCategory === "Featured" ? project.featured : project.category === selectedCategory);
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  // Sort projects
  const sortedProjects = [...filteredProjects].sort((a, b) => {
    switch (sortBy) {
      case "popular": return b.likes - a.likes;
      case "trending": return b.views - a.views;
      case "recent": return 0; // Would sort by date
      default: return 0;
    }
  });

  const toggleLike = (projectId: string) => {
    setLikedProjects(prev => {
      const newSet = new Set(prev);
      if (newSet.has(projectId)) {
        newSet.delete(projectId);
      } else {
        newSet.add(projectId);
      }
      return newSet;
    });
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Expert": return "text-purple-400 bg-purple-500/20";
      case "Pro": return "text-blue-400 bg-blue-500/20";
      case "Intermediate": return "text-green-400 bg-green-500/20";
      default: return "text-gray-400 bg-gray-500/20";
    }
  };

  return (
    <div className="min-h-[80vh] bg-gradient-to-b from-gray-900 via-indigo-900/10 to-gray-900">
      {/* Header */}
      <div className="bg-gray-800/50 border-b border-gray-700 px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-3xl font-bold text-white flex items-center gap-3">
                <span className="text-4xl">🎨</span>
                Community Gallery
              </h2>
              <p className="text-gray-400 mt-2">
                Discover amazing 3D artwork from creators around the world
              </p>
            </div>
            <button className="px-6 py-3 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-xl font-medium hover:opacity-90 transition-opacity shadow-lg shadow-orange-500/30">
              📤 Share Your Work
            </button>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            {[
              { label: "Total Projects", value: "12,450+", icon: "📦" },
              { label: "Active Creators", value: "3,200+", icon: "👥" },
              { label: "Weekly Uploads", value: "850+", icon: "📈" },
              { label: "Total Likes", value: "2.5M+", icon: "❤️" }
            ].map((stat, i) => (
              <div key={i} className="bg-gray-700/30 rounded-xl p-4 text-center">
                <span className="text-2xl">{stat.icon}</span>
                <p className="text-2xl font-bold text-white mt-2">{stat.value}</p>
                <p className="text-gray-400 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Search & Categories */}
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search projects, tags, or creators..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-orange-500"
              />
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl">🔍</span>
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white focus:outline-none"
            >
              <option value="popular">Most Popular</option>
              <option value="trending">Trending</option>
              <option value="recent">Most Recent</option>
            </select>
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap gap-2 mt-4">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === cat
                    ? "bg-orange-500 text-white shadow-lg shadow-orange-500/30"
                    : "bg-gray-700/50 text-gray-400 hover:bg-gray-700 hover:text-white"
                }`}
              >
                {cat === "Featured" && "⭐ "}
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedProjects.map(project => (
            <div
              key={project.id}
              className="bg-gray-800/50 rounded-2xl overflow-hidden cursor-pointer transition-all hover:scale-[1.02] hover:shadow-xl hover:shadow-purple-500/10 group"
              onClick={() => setSelectedProject(project)}
            >
              {/* Thumbnail */}
              <div className="relative aspect-[4/3] bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center overflow-hidden">
                <span className="text-7xl group-hover:scale-110 transition-transform">{project.thumbnail}</span>
                
                {/* Featured Badge */}
                {project.featured && (
                  <div className="absolute top-3 left-3 px-2 py-1 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-[10px] font-bold rounded-full">
                    ⭐ FEATURED
                  </div>
                )}

                {/* Quick Actions Overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                  <button className="p-3 bg-white/20 rounded-full hover:bg-white/30 transition-colors">
                    <span className="text-xl">👁️</span>
                  </button>
                  <button 
                    className={`p-3 rounded-full transition-colors ${
                      likedProjects.has(project.id) ? "bg-red-500" : "bg-white/20 hover:bg-white/30"
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleLike(project.id);
                    }}
                  >
                    <span className="text-xl">❤️</span>
                  </button>
                  <button className="p-3 bg-white/20 rounded-full hover:bg-white/30 transition-colors">
                    <span className="text-xl">💾</span>
                  </button>
                </div>
              </div>

              {/* Info */}
              <div className="p-4">
                <h3 className="text-white font-bold text-lg truncate">{project.title}</h3>
                
                {/* Creator */}
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-2xl">{project.creator.avatar}</span>
                  <div>
                    <p className="text-gray-300 text-sm">{project.creator.name}</p>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full ${getLevelColor(project.creator.level)}`}>
                      {project.creator.level}
                    </span>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mt-3">
                  {project.tags.slice(0, 3).map(tag => (
                    <span key={tag} className="px-2 py-0.5 bg-gray-700 text-gray-400 text-[10px] rounded-full">
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-700">
                  <div className="flex items-center gap-3 text-xs text-gray-400">
                    <span className="flex items-center gap-1">
                      <span className={likedProjects.has(project.id) ? "text-red-400" : ""}>❤️</span>
                      {likedProjects.has(project.id) ? project.likes + 1 : project.likes}
                    </span>
                    <span className="flex items-center gap-1">👁️ {(project.views / 1000).toFixed(1)}k</span>
                    <span className="flex items-center gap-1">💬 {project.comments}</span>
                  </div>
                  <span className="text-xs text-gray-500">{project.createdAt}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {sortedProjects.length === 0 && (
          <div className="text-center py-20">
            <span className="text-6xl">🔍</span>
            <h3 className="text-2xl font-bold text-white mt-6">No projects found</h3>
            <p className="text-gray-400 mt-2">Try adjusting your search or filters</p>
          </div>
        )}

        {/* Load More */}
        {sortedProjects.length > 0 && (
          <div className="text-center mt-8">
            <button className="px-8 py-3 bg-gray-800 text-white rounded-xl hover:bg-gray-700 transition-colors">
              Load More Projects
            </button>
          </div>
        )}
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div 
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setSelectedProject(null)}
        >
          <div 
            className="bg-gray-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="relative aspect-video bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center">
              <span className="text-[120px]">{selectedProject.thumbnail}</span>
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors"
              >
                ✕
              </button>
              {selectedProject.featured && (
                <div className="absolute top-4 left-4 px-3 py-1.5 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-sm font-bold rounded-full">
                  ⭐ FEATURED PROJECT
                </div>
              )}
            </div>

            <div className="p-6">
              {/* Title & Creator */}
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-white">{selectedProject.title}</h2>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="text-3xl">{selectedProject.creator.avatar}</span>
                    <div>
                      <p className="text-white font-medium">{selectedProject.creator.name}</p>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${getLevelColor(selectedProject.creator.level)}`}>
                        {selectedProject.creator.level} Creator
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => toggleLike(selectedProject.id)}
                    className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${
                      likedProjects.has(selectedProject.id)
                        ? "bg-red-500 text-white"
                        : "bg-gray-700 text-gray-300 hover:bg-red-500/20 hover:text-red-400"
                    }`}
                  >
                    ❤️ {likedProjects.has(selectedProject.id) ? "Liked" : "Like"}
                  </button>
                  <button className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600">
                    💾 Save
                  </button>
                  <button className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">
                    📥 Download
                  </button>
                </div>
              </div>

              {/* Stats */}
              <div className="flex items-center gap-6 mt-6 p-4 bg-gray-700/30 rounded-xl">
                <div className="text-center">
                  <p className="text-2xl font-bold text-white">{selectedProject.likes.toLocaleString()}</p>
                  <p className="text-gray-400 text-sm">Likes</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-white">{selectedProject.views.toLocaleString()}</p>
                  <p className="text-gray-400 text-sm">Views</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-white">{selectedProject.comments}</p>
                  <p className="text-gray-400 text-sm">Comments</p>
                </div>
                <div className="ml-auto text-right">
                  <p className="text-gray-400 text-sm">Render Time</p>
                  <p className="text-white font-medium">{selectedProject.renderTime}</p>
                </div>
              </div>

              {/* Description */}
              <div className="mt-6">
                <h3 className="text-white font-bold mb-2">Description</h3>
                <p className="text-gray-400">{selectedProject.description}</p>
              </div>

              {/* Tags & Software */}
              <div className="grid grid-cols-2 gap-6 mt-6">
                <div>
                  <h3 className="text-white font-bold mb-2">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-2">Software Used</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.softwareUsed.map(sw => (
                      <span key={sw} className="px-3 py-1 bg-orange-500/20 text-orange-400 rounded-full text-sm">
                        {sw}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Comments */}
              <div className="mt-6 pt-6 border-t border-gray-700">
                <h3 className="text-white font-bold mb-4">Comments ({sampleComments.length})</h3>
                <div className="space-y-4">
                  {sampleComments.map(comment => (
                    <div key={comment.id} className="flex gap-3">
                      <span className="text-2xl">{comment.avatar}</span>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="text-white font-medium">{comment.user}</p>
                          <span className="text-gray-500 text-xs">{comment.time}</span>
                        </div>
                        <p className="text-gray-400 text-sm mt-1">{comment.text}</p>
                        <button className="text-gray-500 text-xs mt-1 hover:text-orange-400">
                          ❤️ {comment.likes}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Add Comment */}
                <div className="flex gap-3 mt-4 pt-4 border-t border-gray-700">
                  <span className="text-2xl">👤</span>
                  <input
                    type="text"
                    placeholder="Add a comment..."
                    className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-orange-500"
                  />
                  <button className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">
                    Post
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlenderProjectGallery;
