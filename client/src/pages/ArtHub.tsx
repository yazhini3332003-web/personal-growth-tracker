import React, { useState } from "react";
import { ArtHubProvider, useArtHubContext } from "../context/ArtHubContext";
import ArtHubIntroduction from "../components/arthub/ArtHubIntroduction";
import ArtCategories from "../components/arthub/ArtCategories";
import ArtistProfiles from "../components/arthub/ArtistProfiles";
import ArtworkPosting from "../components/arthub/ArtworkPosting";
import LearningCenter from "../components/arthub/LearningCenter";
import AIArtLab from "../components/arthub/AIArtLab";
import ArtChallenges from "../components/arthub/ArtChallenges";
import CollaborationZone from "../components/arthub/CollaborationZone";
import CreativeResources from "../components/arthub/CreativeResources";
import InspirationFeed from "../components/arthub/InspirationFeed";
import CommunityGallery from "../components/arthub/CommunityGallery";
import ArtistLeaderboard from "../components/arthub/ArtistLeaderboard";
import ArtNewsFeed from "../components/arthub/ArtNewsFeed";

type ViewMode =
  | "home"
  | "categories"
  | "artists"
  | "post"
  | "learn"
  | "ai-lab"
  | "challenges"
  | "collab"
  | "resources"
  | "inspiration"
  | "gallery"
  | "leaderboard"
  | "news";

const ArtHubContent: React.FC = () => {
  const [view, setView] = useState<ViewMode>("home");
  const { getStats } = useArtHubContext();
  const stats = getStats();

  const navItems: { key: ViewMode; label: string; icon: string }[] = [
    { key: "home", label: "Home", icon: "🏠" },
    { key: "categories", label: "Categories", icon: "📂" },
    { key: "artists", label: "Artists", icon: "👩‍🎨" },
    { key: "post", label: "Create", icon: "✍️" },
    { key: "gallery", label: "Gallery", icon: "🖼️" },
    { key: "learn", label: "Learn", icon: "📚" },
    { key: "ai-lab", label: "AI Lab", icon: "🤖" },
    { key: "challenges", label: "Challenges", icon: "🏆" },
    { key: "collab", label: "Collab", icon: "🤝" },
    { key: "resources", label: "Resources", icon: "🧰" },
    { key: "inspiration", label: "Inspire", icon: "✨" },
    { key: "leaderboard", label: "Rankings", icon: "📊" },
    { key: "news", label: "News", icon: "📰" },
  ];

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 bg-gradient-to-br from-rose-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-200">
            <span className="text-xl">🎨</span>
          </div>
          <div>
            <h1 className="text-gray-900 font-bold text-xl">Art Hub</h1>
            <p className="text-gray-500 text-xs">
              {stats.totalLikes} likes · {stats.tutorialsCompleted} tutorials · {stats.challengesJoined} challenges
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Pills */}
      <div className="overflow-x-auto pb-2 -mx-1">
        <div className="flex gap-1 bg-gray-100 rounded-xl p-1.5 min-w-max">
          {navItems.map((item) => (
            <button
              key={item.key}
              onClick={() => setView(item.key)}
              className={`px-3 py-2 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 whitespace-nowrap ${
                view === item.key
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <span>{item.icon}</span>
              <span className="hidden sm:inline">{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      {view === "home" && <ArtHubIntroduction />}
      {view === "categories" && <ArtCategories />}
      {view === "artists" && <ArtistProfiles />}
      {view === "post" && <ArtworkPosting />}
      {view === "learn" && <LearningCenter />}
      {view === "ai-lab" && <AIArtLab />}
      {view === "challenges" && <ArtChallenges />}
      {view === "collab" && <CollaborationZone />}
      {view === "resources" && <CreativeResources />}
      {view === "inspiration" && <InspirationFeed />}
      {view === "gallery" && <CommunityGallery />}
      {view === "leaderboard" && <ArtistLeaderboard />}
      {view === "news" && <ArtNewsFeed />}
    </div>
  );
};

const ArtHub: React.FC = () => {
  return (
    <ArtHubProvider>
      <ArtHubContent />
    </ArtHubProvider>
  );
};

export default ArtHub;
