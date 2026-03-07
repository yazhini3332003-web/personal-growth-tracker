import React, { useState } from "react";

interface Discussion {
  id: string;
  title: string;
  author: string;
  avatar: string;
  category: string;
  content: string;
  replies: number;
  views: number;
  likes: number;
  timeAgo: string;
  pinned?: boolean;
  solved?: boolean;
}

interface CommunityMember {
  name: string;
  avatar: string;
  level: string;
  projects: number;
  helpfulAnswers: number;
}

const discussions: Discussion[] = [
  {
    id: "1",
    title: "How do I reduce render noise in Cycles?",
    author: "NewToBlender",
    avatar: "🧑‍🎓",
    category: "Rendering",
    content: "I'm getting very grainy renders even at 500 samples. What settings should I adjust?",
    replies: 12,
    views: 234,
    likes: 8,
    timeAgo: "2 hours ago",
    solved: true
  },
  {
    id: "2",
    title: "Best free texture resources?",
    author: "TextureLover",
    avatar: "🎨",
    category: "Resources",
    content: "Looking for high quality PBR textures for my architectural project. Any recommendations?",
    replies: 18,
    views: 456,
    likes: 24,
    timeAgo: "5 hours ago",
    pinned: true
  },
  {
    id: "3",
    title: "Struggling with UV unwrapping curved surfaces",
    author: "ModelingPro",
    avatar: "🔧",
    category: "Modeling",
    content: "Every time I unwrap a cylinder or sphere, I get terrible stretching. Help!",
    replies: 7,
    views: 123,
    likes: 5,
    timeAgo: "1 day ago"
  },
  {
    id: "4",
    title: "Share your first Blender render!",
    author: "CommunityMod",
    avatar: "⭐",
    category: "Show & Tell",
    content: "New to Blender? Post your first ever render here — we all started somewhere!",
    replies: 45,
    views: 892,
    likes: 67,
    timeAgo: "3 days ago",
    pinned: true
  },
  {
    id: "5",
    title: "Cloth simulation keeps exploding",
    author: "SimFrustrated",
    avatar: "😤",
    category: "Simulation",
    content: "My cloth goes crazy when I press play. I've tried adjusting quality but nothing helps.",
    replies: 9,
    views: 167,
    likes: 4,
    timeAgo: "4 hours ago",
    solved: true
  },
  {
    id: "6",
    title: "Feedback on my character design?",
    author: "CharacterArtist",
    avatar: "🎭",
    category: "Feedback",
    content: "Working on a stylized knight character. Would love constructive criticism!",
    replies: 22,
    views: 345,
    likes: 31,
    timeAgo: "1 day ago"
  },
  {
    id: "7",
    title: "Weight painting for beginners - tips?",
    author: "AnimationNewbie",
    avatar: "🦴",
    category: "Rigging",
    content: "Just started rigging my first character. Weight painting is confusing. Any advice?",
    replies: 14,
    views: 278,
    likes: 12,
    timeAgo: "2 days ago"
  },
  {
    id: "8",
    title: "Weekly Challenge: Low Poly Animals",
    author: "CommunityMod",
    avatar: "⭐",
    category: "Challenges",
    content: "This week's challenge: Create a low poly animal in under 500 polygons. Post your entries!",
    replies: 38,
    views: 567,
    likes: 45,
    timeAgo: "5 days ago",
    pinned: true
  }
];

const topMembers: CommunityMember[] = [
  { name: "BlenderGuru", avatar: "🏆", level: "Expert", projects: 45, helpfulAnswers: 234 },
  { name: "PolyMaster", avatar: "🥈", level: "Advanced", projects: 32, helpfulAnswers: 156 },
  { name: "3DArtist", avatar: "🥉", level: "Advanced", projects: 28, helpfulAnswers: 98 },
  { name: "RenderPro", avatar: "⭐", level: "Intermediate", projects: 15, helpfulAnswers: 67 },
  { name: "NewCreator", avatar: "🌟", level: "Beginner", projects: 5, helpfulAnswers: 12 }
];

const categories = ["All", "Modeling", "Rendering", "Simulation", "Rigging", "Resources", "Feedback", "Show & Tell", "Challenges"];

const categoryColors: Record<string, string> = {
  "Modeling": "bg-blue-100 text-blue-700",
  "Rendering": "bg-purple-100 text-purple-700",
  "Simulation": "bg-amber-100 text-amber-700",
  "Rigging": "bg-rose-100 text-rose-700",
  "Resources": "bg-emerald-100 text-emerald-700",
  "Feedback": "bg-pink-100 text-pink-700",
  "Show & Tell": "bg-indigo-100 text-indigo-700",
  "Challenges": "bg-orange-100 text-orange-700"
};

const BlenderCommunity: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeTab, setActiveTab] = useState<"discussions" | "members" | "challenges">("discussions");
  const [showNewPost, setShowNewPost] = useState(false);

  const filteredDiscussions = activeCategory === "All"
    ? discussions
    : discussions.filter((d) => d.category === activeCategory);

  const pinnedDiscussions = filteredDiscussions.filter((d) => d.pinned);
  const regularDiscussions = filteredDiscussions.filter((d) => !d.pinned);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-cyan-500 via-blue-500 to-indigo-500 rounded-2xl p-6 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -translate-y-12 translate-x-12" />
        <div className="relative">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">💬</span>
            <div>
              <h2 className="font-bold text-xl">Community Hub</h2>
              <p className="text-white/70 text-sm">Connect, share, and learn together</p>
            </div>
          </div>
          <p className="text-white/80 text-sm leading-relaxed mt-3 max-w-xl">
            Join discussions, ask questions, share your work, and get feedback from 
            fellow Blender enthusiasts. Our community is here to help you grow.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        {[
          { id: "discussions", label: "Discussions", icon: "💬" },
          { id: "members", label: "Top Members", icon: "👥" },
          { id: "challenges", label: "Challenges", icon: "🏆" }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? "bg-blue-500 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            <span>{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "discussions" && (
        <>
          {/* New Post Button */}
          <button
            onClick={() => setShowNewPost(true)}
            className="w-full py-4 bg-gradient-to-r from-orange-500 to-pink-500 rounded-xl text-white font-medium hover:from-orange-600 hover:to-pink-600 transition-all flex items-center justify-center gap-2"
          >
            <span>✍️</span> Start a New Discussion
          </button>

          {/* New Post Form */}
          {showNewPost && (
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-800">New Discussion</h3>
                <button
                  onClick={() => setShowNewPost(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              <input
                type="text"
                placeholder="Discussion title..."
                className="w-full px-4 py-3 border border-gray-200 rounded-xl mb-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <textarea
                placeholder="What would you like to discuss?"
                rows={4}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl mb-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
              />
              <div className="flex items-center gap-3">
                <select className="px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Select category...</option>
                  {categories.filter((c) => c !== "All").map((cat) => (
                    <option key={cat}>{cat}</option>
                  ))}
                </select>
                <div className="flex-1" />
                <button
                  onClick={() => setShowNewPost(false)}
                  className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button className="px-6 py-2 bg-blue-500 text-white text-sm font-medium rounded-lg hover:bg-blue-600 transition-colors">
                  Post Discussion
                </button>
              </div>
            </div>
          )}

          {/* Category Filter */}
          <div className="overflow-x-auto">
            <div className="flex gap-2 pb-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-colors ${
                    activeCategory === category
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Pinned Discussions */}
          {pinnedDiscussions.length > 0 && (
            <div>
              <p className="text-xs font-bold text-gray-500 mb-3">📌 PINNED</p>
              <div className="space-y-3">
                {pinnedDiscussions.map((discussion) => (
                  <div
                    key={discussion.id}
                    className="bg-amber-50 rounded-xl border border-amber-100 p-4 hover:shadow-sm transition-shadow"
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">{discussion.avatar}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="font-bold text-gray-800 hover:text-blue-600 cursor-pointer">
                            {discussion.title}
                          </h4>
                          <span className={`px-2 py-0.5 text-[10px] font-medium rounded ${categoryColors[discussion.category] || "bg-gray-100 text-gray-600"}`}>
                            {discussion.category}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1 line-clamp-1">{discussion.content}</p>
                        <div className="flex items-center gap-4 mt-2 text-[11px] text-gray-400">
                          <span>by {discussion.author}</span>
                          <span>💬 {discussion.replies}</span>
                          <span>👁️ {discussion.views}</span>
                          <span>❤️ {discussion.likes}</span>
                          <span>{discussion.timeAgo}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Regular Discussions */}
          <div className="space-y-3">
            {regularDiscussions.map((discussion) => (
              <div
                key={discussion.id}
                className="bg-white rounded-xl border border-gray-100 p-4 hover:shadow-sm hover:border-gray-200 transition-all cursor-pointer"
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{discussion.avatar}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="font-bold text-gray-800 hover:text-blue-600">
                        {discussion.title}
                      </h4>
                      {discussion.solved && (
                        <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-[10px] font-medium rounded">
                          ✓ SOLVED
                        </span>
                      )}
                      <span className={`px-2 py-0.5 text-[10px] font-medium rounded ${categoryColors[discussion.category] || "bg-gray-100 text-gray-600"}`}>
                        {discussion.category}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-1">{discussion.content}</p>
                    <div className="flex items-center gap-4 mt-2 text-[11px] text-gray-400">
                      <span>by {discussion.author}</span>
                      <span>💬 {discussion.replies}</span>
                      <span>👁️ {discussion.views}</span>
                      <span>❤️ {discussion.likes}</span>
                      <span>{discussion.timeAgo}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {activeTab === "members" && (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <h3 className="font-bold text-gray-800 mb-4">🏅 Top Community Contributors</h3>
            <div className="space-y-4">
              {topMembers.map((member, idx) => (
                <div
                  key={member.name}
                  className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl"
                >
                  <span className="text-3xl">{member.avatar}</span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-bold text-gray-800">{member.name}</p>
                      <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-[10px] font-medium rounded">
                        {member.level}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 mt-1 text-xs text-gray-500">
                      <span>🎨 {member.projects} projects</span>
                      <span>💡 {member.helpfulAnswers} helpful answers</span>
                    </div>
                  </div>
                  <span className={`text-2xl ${idx === 0 ? "text-amber-400" : idx === 1 ? "text-gray-400" : idx === 2 ? "text-amber-600" : "text-gray-300"}`}>
                    #{idx + 1}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl border border-gray-100 p-4 text-center">
              <p className="text-2xl font-bold text-blue-600">1.2K</p>
              <p className="text-xs text-gray-500 mt-1">Members</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 p-4 text-center">
              <p className="text-2xl font-bold text-purple-600">456</p>
              <p className="text-xs text-gray-500 mt-1">Discussions</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 p-4 text-center">
              <p className="text-2xl font-bold text-emerald-600">89%</p>
              <p className="text-xs text-gray-500 mt-1">Solved Rate</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 p-4 text-center">
              <p className="text-2xl font-bold text-orange-600">24</p>
              <p className="text-xs text-gray-500 mt-1">Active Today</p>
            </div>
          </div>
        </div>
      )}

      {activeTab === "challenges" && (
        <div className="space-y-4">
          {/* Active Challenge */}
          <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl p-6 text-white">
            <div className="flex items-start gap-4">
              <span className="text-4xl">🏆</span>
              <div className="flex-1">
                <span className="text-xs bg-white/20 px-2 py-0.5 rounded">THIS WEEK</span>
                <h3 className="font-bold text-xl mt-2">Low Poly Animals Challenge</h3>
                <p className="text-white/80 text-sm mt-2">
                  Create any animal using only 500 polygons or less. Focus on form and silhouette!
                </p>
                <div className="flex items-center gap-4 mt-4 text-sm text-white/70">
                  <span>📅 5 days left</span>
                  <span>👥 38 entries</span>
                  <span>🎁 Featured spotlight</span>
                </div>
              </div>
            </div>
            <button className="mt-4 w-full py-3 bg-white text-orange-600 rounded-xl font-medium hover:bg-orange-50 transition-colors">
              Submit Entry
            </button>
          </div>

          {/* Past Challenges */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <h3 className="font-bold text-gray-800 mb-4">Previous Challenges</h3>
            <div className="space-y-3">
              {[
                { title: "Isometric Room", entries: 56, winner: "PolyMaster" },
                { title: "Sci-Fi Props", entries: 42, winner: "3DArtist" },
                { title: "Food Modeling", entries: 67, winner: "BlenderGuru" }
              ].map((challenge, idx) => (
                <div key={idx} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                  <span className="text-2xl">🏅</span>
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">{challenge.title}</p>
                    <p className="text-xs text-gray-500">{challenge.entries} entries • Winner: {challenge.winner}</p>
                  </div>
                  <button className="px-4 py-2 text-xs bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200">
                    View Gallery
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Quick Guidelines */}
      <div className="bg-blue-50 rounded-xl border border-blue-100 p-5">
        <h3 className="font-bold text-blue-800 text-sm mb-3">📋 Community Guidelines</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="flex items-start gap-2">
            <span className="text-blue-500">✓</span>
            <p className="text-xs text-blue-700">Be respectful and constructive</p>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-blue-500">✓</span>
            <p className="text-xs text-blue-700">Share knowledge freely</p>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-blue-500">✓</span>
            <p className="text-xs text-blue-700">Give credit when sharing others' work</p>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-blue-500">✓</span>
            <p className="text-xs text-blue-700">Use descriptive titles for questions</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlenderCommunity;
