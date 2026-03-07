import React from "react";
import { artworks, artistProfiles } from "../../data/artHubData";

interface ArtHubIntroductionProps {
  onNavigate?: (view: string) => void;
}

const ArtHubIntroduction: React.FC<ArtHubIntroductionProps> = ({ onNavigate }) => {
  const totalArtworks = artworks.length;
  const totalArtists = artistProfiles.length;
  const totalLikes = artworks.reduce((sum, a) => sum + a.likes, 0);

  const stats = [
    { label: "Global Artists", value: `${totalArtists}+`, icon: "🎨", color: "from-rose-500 to-pink-600" },
    { label: "Art Forms", value: "5+", icon: "✨", color: "from-violet-500 to-purple-600" },
    { label: "Community Works", value: totalArtworks.toString(), icon: "🖼️", color: "from-amber-500 to-orange-600" },
    { label: "Total Appreciation", value: totalLikes.toLocaleString(), icon: "❤️", color: "from-cyan-500 to-blue-600" },
  ];

  const artForms = [
    { name: "Stories", icon: "📖", desc: "Craft worlds with words", color: "bg-amber-50 text-amber-700 border-amber-200" },
    { name: "Poetry", icon: "🌸", desc: "Express emotions in verse", color: "bg-pink-50 text-pink-700 border-pink-200" },
    { name: "Drawings", icon: "✏️", desc: "Sketch life into being", color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
    { name: "Digital Art", icon: "🖥️", desc: "Create with pixels", color: "bg-purple-50 text-purple-700 border-purple-200" },
    { name: "Experimental", icon: "🔬", desc: "Break all boundaries", color: "bg-cyan-50 text-cyan-700 border-cyan-200" },
  ];

  const whyLearnArt = [
    { title: "Boosts Creativity", desc: "Art trains your brain to think in new ways, see patterns, and generate original ideas.", icon: "💡" },
    { title: "Express Emotions", desc: "Art gives you a voice when words aren't enough — turn feelings into something beautiful.", icon: "💜" },
    { title: "Stronger Storytelling", desc: "Whether visual or written, art teaches you to communicate powerful narratives.", icon: "📖" },
    { title: "Improves Focus", desc: "Creating art demands deep attention and observation, sharpening your mind.", icon: "🎯" },
    { title: "Builds Confidence", desc: "Every creation you finish proves you can make something meaningful from nothing.", icon: "🔥" },
    { title: "Connect Globally", desc: "Share your work and discover creators from every corner of the world.", icon: "🌍" },
  ];

  const creativeCareers = [
    { role: "Illustrator", icon: "🎨", desc: "Create visuals for books, magazines, and brands" },
    { role: "Graphic Designer", icon: "🖥️", desc: "Design logos, posters, and digital experiences" },
    { role: "Animator", icon: "🎬", desc: "Bring characters and stories to life through motion" },
    { role: "Concept Artist", icon: "✏️", desc: "Design worlds, characters, and environments" },
    { role: "Digital Artist", icon: "💫", desc: "Create stunning art using digital tools and AI" },
    { role: "Writer / Poet", icon: "📝", desc: "Craft stories, poems, and literary works" },
  ];

  return (
    <div className="space-y-10">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-rose-600 via-purple-600 to-indigo-700 p-8 md:p-12 text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-4 right-8 text-8xl">🎨</div>
          <div className="absolute bottom-4 left-8 text-6xl">✨</div>
          <div className="absolute top-1/2 right-1/3 text-5xl">📖</div>
        </div>
        <div className="relative z-10 max-w-3xl">
          <div className="flex items-center gap-2 mb-4">
            <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-medium backdrop-blur-sm">
              🌍 Global Creative Platform
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
            Welcome to Art Hub
          </h1>
          <p className="text-white/90 text-lg leading-relaxed mb-4">
            Art is one of the most powerful ways humans share stories, emotions, and imagination.
            The Art Hub is a creative space where people can explore different forms of art, learn new
            skills, share their creations, and discover artists from around the world.
          </p>
          <p className="text-white/70 text-sm leading-relaxed mb-6">
            Whether you write stories, compose poetry, sketch on paper, paint digitally, or experiment
            with new forms — this is your canvas. Connect with creators globally, showcase your talent,
            and grow as an artist.
          </p>
          <p className="text-white/50 text-sm italic">
            "Art is not what you see, but what you make others see." — Edgar Degas
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-lg transition-all duration-300 group">
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
              <span className="text-lg">{stat.icon}</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Why Learn Art */}
      <div>
        <div className="text-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">🎯 Why Learn Art?</h2>
          <p className="text-gray-500 text-sm mt-1 max-w-2xl mx-auto">
            Art isn't just a hobby — it's a life skill that sharpens your mind, deepens your emotions, and opens doors to creative careers
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {whyLearnArt.map((item, i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-lg hover:border-purple-200 transition-all duration-300 group">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <h3 className="font-semibold text-gray-900 text-sm">{item.title}</h3>
              </div>
              <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Creative Careers */}
      <div>
        <div className="text-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">💼 Creative Careers You Can Build</h2>
          <p className="text-gray-500 text-sm mt-1">Art opens real career paths in design, media, entertainment, and more</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {creativeCareers.map((career, i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-100 p-4 text-center hover:shadow-md hover:border-rose-200 transition-all group">
              <span className="text-2xl block mb-2 group-hover:scale-125 transition-transform">{career.icon}</span>
              <p className="font-semibold text-gray-900 text-xs">{career.role}</p>
              <p className="text-gray-400 text-[10px] mt-1 leading-relaxed">{career.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Explore Art Forms */}
      <div>
        <h2 className="text-lg font-bold text-gray-900 mb-4">🎨 Explore Art Forms</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {artForms.map((form, i) => (
            <div
              key={i}
              onClick={() => onNavigate?.("categories")}
              className={`${form.color} border rounded-xl p-4 text-center hover:shadow-md transition-all duration-300 cursor-pointer group`}
            >
              <span className="text-3xl block mb-2 group-hover:scale-125 transition-transform">{form.icon}</span>
              <p className="font-semibold text-sm">{form.name}</p>
              <p className="text-xs mt-1 opacity-70">{form.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Connect with Artists — Community Section */}
      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl border border-indigo-100 p-6 md:p-8">
        <div className="text-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">👩‍🎨 Connect with Artists Worldwide</h2>
          <p className="text-gray-500 text-sm mt-1 max-w-xl mx-auto">
            Discover talented creators, follow their journeys, explore their artworks, and build your creative network
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 mb-6">
          {artistProfiles.slice(0, 6).map((artist) => (
            <div
              key={artist.id}
              onClick={() => onNavigate?.("artists")}
              className="bg-white rounded-xl p-4 text-center hover:shadow-lg transition-all cursor-pointer group border border-white hover:border-purple-200"
            >
              <div className="w-12 h-12 mx-auto rounded-full bg-gradient-to-br from-rose-100 to-purple-100 flex items-center justify-center text-2xl mb-2 group-hover:scale-110 transition-transform">
                {artist.avatar}
              </div>
              <p className="font-semibold text-gray-900 text-xs truncate">{artist.name}</p>
              <p className="text-gray-400 text-[10px] truncate">{artist.styles[0]}</p>
              <p className="text-purple-500 text-[10px] mt-1">👥 {artist.followers.toLocaleString()}</p>
            </div>
          ))}
        </div>
        <div className="text-center">
          <button
            onClick={() => onNavigate?.("artists")}
            className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl text-sm font-medium hover:shadow-lg hover:shadow-purple-200 transition-all"
          >
            Explore All Artists →
          </button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div
          onClick={() => onNavigate?.("gallery")}
          className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-lg hover:border-amber-200 transition-all cursor-pointer group"
        >
          <span className="text-2xl block mb-2">🖼️</span>
          <h3 className="font-semibold text-gray-900 text-sm">Visit the Gallery</h3>
          <p className="text-gray-500 text-xs mt-1">Browse curated artworks from our global community</p>
        </div>
        <div
          onClick={() => onNavigate?.("inspiration")}
          className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-lg hover:border-pink-200 transition-all cursor-pointer group"
        >
          <span className="text-2xl block mb-2">✨</span>
          <h3 className="font-semibold text-gray-900 text-sm">Discover Art Feed</h3>
          <p className="text-gray-500 text-xs mt-1">Get inspired by featured works and trending creations</p>
        </div>
        <div
          onClick={() => onNavigate?.("learn")}
          className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-lg hover:border-emerald-200 transition-all cursor-pointer group"
        >
          <span className="text-2xl block mb-2">📚</span>
          <h3 className="font-semibold text-gray-900 text-sm">Start Learning</h3>
          <p className="text-gray-500 text-xs mt-1">Tutorials for stories, poetry, drawing, digital art & more</p>
        </div>
      </div>

      {/* Platform Vision */}
      <div className="bg-gradient-to-r from-gray-50 to-slate-50 rounded-xl border border-gray-100 p-6">
        <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
          <span>🌟</span> Our Vision
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed">
          Art Hub exists to give every creator — from first-time doodlers to seasoned storytellers — a home
          to express their imagination freely. Learn, practice, create, share, collaborate, and showcase
          your talent to the world. There are no strict rules here, because art is about freedom of expression.
        </p>
      </div>
    </div>
  );
};

export default ArtHubIntroduction;
