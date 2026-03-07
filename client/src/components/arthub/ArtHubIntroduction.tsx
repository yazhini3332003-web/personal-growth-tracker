import React from "react";
import { artworks, artistProfiles } from "../../data/artHubData";

const ArtHubIntroduction: React.FC = () => {
  const totalArtworks = artworks.length;
  const totalArtists = artistProfiles.length;
  const totalLikes = artworks.reduce((sum, a) => sum + a.likes, 0);

  const stats = [
    { label: "Global Artists", value: "5M+", icon: "🎨", color: "from-rose-500 to-pink-600" },
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

  return (
    <div className="space-y-8">
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
          <p className="text-white/80 text-lg leading-relaxed mb-6">
            A global creative space where artists from every corner of the world come together to
            create, share, and inspire. Whether you write stories, compose poetry, sketch, paint
            digitally, or experiment with new forms — this is your canvas.
          </p>
          <p className="text-white/60 text-sm italic">
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

      {/* Art Forms */}
      <div>
        <h2 className="text-lg font-bold text-gray-900 mb-4">Explore Art Forms</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {artForms.map((form, i) => (
            <div
              key={i}
              className={`${form.color} border rounded-xl p-4 text-center hover:shadow-md transition-all duration-300 cursor-pointer group`}
            >
              <span className="text-3xl block mb-2 group-hover:scale-125 transition-transform">{form.icon}</span>
              <p className="font-semibold text-sm">{form.name}</p>
              <p className="text-xs mt-1 opacity-70">{form.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Platform Vision */}
      <div className="bg-gradient-to-r from-gray-50 to-slate-50 rounded-xl border border-gray-100 p-6">
        <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
          <span>🌟</span> Our Vision
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed">
          Millions of creators worldwide express themselves through art every day. Art Hub exists to give
          every creator — from first-time doodlers to seasoned storytellers — a home to express their
          imagination freely. There are no strict rules here, because art is about freedom of expression.
          Learn, practice, create, share, collaborate, and showcase your talent to the world.
        </p>
      </div>
    </div>
  );
};

export default ArtHubIntroduction;
