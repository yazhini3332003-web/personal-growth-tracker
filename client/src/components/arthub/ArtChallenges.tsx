import React from "react";
import { artChallenges } from "../../data/artHubData";
import { useArtHubContext } from "../../context/ArtHubContext";

const ArtChallenges: React.FC = () => {
  const { isChallengeJoined, joinChallenge } = useArtHubContext();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900">Art Challenges</h2>
        <p className="text-sm text-gray-500 mt-1">Push your creativity with themed challenges and community participation</p>
      </div>

      {/* Active Challenges */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {artChallenges.filter((c) => c.active).map((challenge) => {
          const joined = isChallengeJoined(challenge.id);
          const startDate = new Date(challenge.startDate);
          const endDate = new Date(challenge.endDate);
          const now = new Date();
          const totalDays = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24);
          const elapsed = Math.max(0, (now.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
          const progressPct = Math.min(100, Math.round((elapsed / totalDays) * 100));

          return (
            <div
              key={challenge.id}
              className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              <div className={`h-28 bg-gradient-to-r ${challenge.color} flex items-center justify-between px-6 relative`}>
                <div className="text-white">
                  <span className="px-2 py-0.5 bg-white/20 rounded-full text-xs font-medium backdrop-blur-sm uppercase">
                    {challenge.type}
                  </span>
                  <h3 className="font-bold text-lg mt-2">{challenge.title}</h3>
                </div>
                <span className="text-5xl opacity-30">{challenge.icon}</span>
              </div>
              <div className="p-5">
                <p className="text-xs text-gray-500 font-medium uppercase tracking-wide mb-1">{challenge.theme}</p>
                <p className="text-sm text-gray-600 mb-4">{challenge.description}</p>

                {/* Stats */}
                <div className="flex items-center gap-4 mb-4 text-xs text-gray-500">
                  <span>👥 {challenge.participants.toLocaleString()} joined</span>
                  <span>🖼️ {challenge.submissions.toLocaleString()} submissions</span>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
                    <span>{startDate.toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
                    <span>{progressPct}%</span>
                    <span>{endDate.toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r ${challenge.color} rounded-full transition-all duration-500`}
                      style={{ width: `${progressPct}%` }}
                    />
                  </div>
                </div>

                {/* Prompts */}
                <div className="mb-4">
                  <p className="text-xs font-semibold text-gray-500 mb-2">Prompts</p>
                  <div className="flex flex-wrap gap-1.5">
                    {challenge.prompts.map((prompt, i) => (
                      <span key={i} className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded-md text-xs">
                        {prompt}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Join Button */}
                {joined ? (
                  <div className="flex items-center justify-center gap-2 py-2.5 bg-emerald-50 text-emerald-700 rounded-xl text-sm font-medium">
                    ✓ Joined
                  </div>
                ) : (
                  <button
                    onClick={() => joinChallenge(challenge.id)}
                    className="w-full py-2.5 bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-xl text-sm font-medium hover:shadow-lg transition-all"
                  >
                    Join Challenge 🚀
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ArtChallenges;
