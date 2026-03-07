import React from "react";
import { whyLearnBlender, industryApplications } from "../../data/blenderLabData";

const WhyLearnBlender: React.FC = () => {
  const benefits = [
    { title: "Completely Free", desc: "Blender is 100% free and open-source — no subscriptions, no hidden costs, no limits.", icon: "🆓" },
    { title: "All-in-One Tool", desc: "Modeling, sculpting, animation, rendering, VFX, video editing — all in a single software.", icon: "🛠️" },
    { title: "Industry Standard", desc: "Used at Netflix, Ubisoft, NASA, and hundreds of studios worldwide.", icon: "🏆" },
    { title: "Huge Community", desc: "Millions of artists, thousands of tutorials, and an active open-source community.", icon: "🌍" },
    { title: "Real Career Paths", desc: "Opens doors to careers in gaming, film, architecture, product design, and more.", icon: "💼" },
    { title: "Future-Proof Skill", desc: "3D is growing fast in gaming, VR/AR, metaverse, and AI-generated content.", icon: "🚀" },
  ];

  const whatYouCanCreate = [
    { title: "3D Characters", icon: "🧑‍🎨", examples: ["Game heroes", "Movie characters", "Digital avatars"] },
    { title: "Game Environments", icon: "🏰", examples: ["Open worlds", "Level designs", "Terrain models"] },
    { title: "Product Renders", icon: "📦", examples: ["Product mockups", "Packaging visuals", "Furniture renders"] },
    { title: "Animated Scenes", icon: "🎬", examples: ["Short films", "Character animation", "Cinematic sequences"] },
    { title: "Visual Effects", icon: "💥", examples: ["Fire & smoke", "Water simulations", "Explosions & particles"] },
    { title: "Motion Graphics", icon: "✨", examples: ["Logo animations", "Title sequences", "Abstract art"] },
  ];

  return (
    <div className="space-y-10">
      {/* Hero */}
      <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl border border-orange-100 p-6 md:p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">🎯 Why Learn Blender?</h2>
        <p className="text-gray-500 text-sm max-w-2xl mx-auto">
          Blender is the world's most powerful free 3D creation tool — used by indie artists to major film studios.
          Here's why learning Blender is one of the smartest creative investments you can make.
        </p>
      </div>

      {/* Key Benefits */}
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-4">💡 Key Benefits</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {benefits.map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-lg hover:border-orange-200 transition-all duration-300 group"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <h4 className="font-semibold text-gray-900 text-sm">{item.title}</h4>
              </div>
              <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* What You Can Create */}
      <div>
        <div className="text-center mb-6">
          <h3 className="text-lg font-bold text-gray-900">🎨 What Users Can Create With Blender</h3>
          <p className="text-gray-500 text-sm mt-1">From characters to cinematic VFX — the possibilities are endless</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {whatYouCanCreate.map((item, i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-md hover:border-amber-200 transition-all group">
              <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">{item.icon}</div>
              <h4 className="font-semibold text-gray-900 text-sm mb-2">{item.title}</h4>
              <div className="space-y-1">
                {item.examples.map((ex, j) => (
                  <div key={j} className="flex items-center gap-2 text-xs text-gray-500">
                    <span className="text-orange-400">▸</span>
                    {ex}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Why Learn from Data */}
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-4">🚀 Deep Dive: Skills & Career Paths</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {whyLearnBlender.map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-gray-100 p-6 hover:border-orange-200 transition-all hover:shadow-lg group"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <h4 className="text-gray-900 font-semibold">{item.title}</h4>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed mb-4">{item.description}</p>
              <div>
                <h5 className="text-orange-600 text-xs font-semibold mb-2">Career Paths:</h5>
                <div className="flex flex-wrap gap-1.5">
                  {item.careers.map((career, j) => (
                    <span
                      key={j}
                      className="px-2 py-0.5 bg-orange-50 text-orange-600 rounded-full text-xs border border-orange-200"
                    >
                      {career}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Industry Applications */}
      <div>
        <div className="text-center mb-6">
          <h3 className="text-lg font-bold text-gray-900">🏭 Industries Using Blender</h3>
          <p className="text-gray-500 text-sm mt-1">Blender skills are in demand across many industries</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {industryApplications.map((app, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-gray-100 p-6 hover:border-blue-200 transition-all hover:shadow-lg group"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                  {app.icon}
                </div>
                <h4 className="text-gray-900 font-semibold">{app.industry}</h4>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed mb-4">{app.description}</p>
              <div className="space-y-1.5">
                {app.examples.map((example, j) => (
                  <div key={j} className="flex items-center gap-2 text-sm">
                    <span className="text-blue-500">▸</span>
                    <span className="text-gray-600">{example}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhyLearnBlender;
