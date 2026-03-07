import React from "react";
import { leaderboard } from "../../data/artHubData";

const ArtistLeaderboard: React.FC = () => {
  const topThree = leaderboard.slice(0, 3);
  const rest = leaderboard.slice(3);

  const podiumColors = [
    "from-yellow-400 to-amber-500",
    "from-gray-300 to-gray-400",
    "from-amber-600 to-amber-700",
  ];
  const podiumBgs = [
    "bg-yellow-50 border-yellow-200",
    "bg-gray-50 border-gray-200",
    "bg-amber-50 border-amber-200",
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900">Artist Leaderboard</h2>
        <p className="text-sm text-gray-500 mt-1">Recognizing the most active and appreciated creators</p>
      </div>

      {/* Top 3 Podium */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {topThree.map((entry, i) => (
          <div
            key={entry.artistId}
            className={`${podiumBgs[i]} border rounded-2xl p-6 text-center hover:shadow-lg transition-all duration-300 ${i === 0 ? "md:order-2 md:-mt-4" : i === 1 ? "md:order-1" : "md:order-3"}`}
          >
            <div className="flex justify-center mb-3">
              <div className={`w-16 h-16 bg-gradient-to-br ${podiumColors[i]} rounded-2xl flex items-center justify-center text-3xl shadow-lg`}>
                {entry.artistAvatar}
              </div>
            </div>
            <span className="text-2xl">{entry.badge}</span>
            <h3 className="font-bold text-gray-900 mt-2">{entry.artistName}</h3>
            <p className="text-xs text-gray-500 mt-0.5">Rank #{entry.rank}</p>
            <div className="mt-4 pt-4 border-t border-gray-200/50">
              <p className="text-2xl font-bold text-gray-900">{entry.score.toLocaleString()}</p>
              <p className="text-xs text-gray-500">Score</p>
            </div>
            <div className="flex items-center justify-center gap-4 mt-3 text-xs text-gray-500">
              <span>❤️ {entry.totalLikes.toLocaleString()}</span>
              <span>📝 {entry.totalWorks} works</span>
            </div>
          </div>
        ))}
      </div>

      {/* Rest of Leaderboard */}
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100">
          <h3 className="font-semibold text-gray-900">All Rankings</h3>
        </div>
        <div className="divide-y divide-gray-50">
          {leaderboard.map((entry) => (
            <div
              key={entry.artistId}
              className="flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors"
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold ${
                entry.rank <= 3 ? "bg-gradient-to-br from-yellow-100 to-amber-100 text-amber-700" : "bg-gray-100 text-gray-500"
              }`}>
                {entry.rank}
              </div>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-100 to-indigo-100 flex items-center justify-center text-xl">
                {entry.artistAvatar}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 text-sm">{entry.artistName}</p>
                <p className="text-xs text-gray-500">Score: {entry.score.toLocaleString()}</p>
              </div>
              <div className="hidden sm:flex items-center gap-4 text-xs text-gray-400">
                <span>❤️ {entry.totalLikes.toLocaleString()}</span>
                <span>📝 {entry.totalWorks}</span>
              </div>
              <span className="text-xl">{entry.badge}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Feature of the Month */}
      <div className="bg-gradient-to-r from-yellow-50 to-amber-50 rounded-xl border border-yellow-200 p-6">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-2xl flex items-center justify-center text-3xl shadow-md">
            👑
          </div>
          <div>
            <h3 className="font-bold text-gray-900 mb-1">Artist of the Month: {topThree[0]?.artistName}</h3>
            <p className="text-sm text-gray-600">
              With {topThree[0]?.totalLikes.toLocaleString()} appreciations across {topThree[0]?.totalWorks} works,
              this month's featured artist leads the community with exceptional creativity and engagement.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtistLeaderboard;
