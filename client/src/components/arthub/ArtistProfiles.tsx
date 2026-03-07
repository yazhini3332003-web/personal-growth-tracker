import React, { useState } from "react";
import { artistProfiles, artworks } from "../../data/artHubData";
import { useArtHubContext } from "../../context/ArtHubContext";

const ArtistProfiles: React.FC = () => {
  const [selectedArtist, setSelectedArtist] = useState<string | null>(null);
  const [followedArtists, setFollowedArtists] = useState<Set<string>>(new Set());
  const [commentTexts, setCommentTexts] = useState<Record<string, string>>({});
  const { isLiked, likeArtwork, unlikeArtwork } = useArtHubContext();

  const artist = artistProfiles.find((a) => a.id === selectedArtist);
  const artistWorks = artworks.filter((a) => a.artistId === selectedArtist);

  const toggleFollow = (artistId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setFollowedArtists((prev) => {
      const next = new Set(prev);
      next.has(artistId) ? next.delete(artistId) : next.add(artistId);
      return next;
    });
  };

  if (artist) {
    const isFollowing = followedArtists.has(artist.id);
    return (
      <div className="space-y-6">
        <button
          onClick={() => setSelectedArtist(null)}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors"
        >
          ← Back to Artists
        </button>

        {/* Profile Header */}
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="h-36 bg-gradient-to-r from-rose-500 via-purple-500 to-indigo-500 relative">
            <div className="absolute inset-0 opacity-10 flex items-center justify-center">
              <span className="text-9xl">🎨</span>
            </div>
          </div>
          <div className="px-6 pb-6 -mt-12">
            <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4">
              <div className="w-24 h-24 bg-white rounded-2xl border-4 border-white shadow-lg flex items-center justify-center text-5xl">
                {artist.avatar}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="text-xl font-bold text-gray-900">{artist.name}</h2>
                  {artist.featured && <span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 text-xs rounded-full font-medium">⭐ Featured</span>}
                </div>
                <p className="text-sm text-gray-500 flex items-center gap-1">📍 {artist.location}</p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => toggleFollow(artist.id)}
                  className={`px-5 py-2 rounded-xl text-sm font-medium transition-all ${
                    isFollowing
                      ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      : "bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:shadow-lg hover:shadow-purple-200"
                  }`}
                >
                  {isFollowing ? "✓ Following" : "＋ Follow"}
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="flex gap-6 mt-4 pt-4 border-t border-gray-100">
              <div className="text-center">
                <p className="text-lg font-bold text-gray-900">{(artist.followers + (isFollowing ? 1 : 0)).toLocaleString()}</p>
                <p className="text-xs text-gray-500">Followers</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-gray-900">{artist.following}</p>
                <p className="text-xs text-gray-500">Following</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-gray-900">{artistWorks.length}</p>
                <p className="text-xs text-gray-500">Works</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-gray-900">{artistWorks.reduce((s, w) => s + w.likes, 0).toLocaleString()}</p>
                <p className="text-xs text-gray-500">Total Likes</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bio, Styles & Social */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="md:col-span-2 bg-white rounded-xl border border-gray-100 p-5">
            <h3 className="font-semibold text-gray-900 mb-2">About</h3>
            <p className="text-sm text-gray-600 leading-relaxed">{artist.bio}</p>
            <div className="mt-4">
              <h4 className="text-xs font-semibold text-gray-500 uppercase mb-2">Art Styles</h4>
              <div className="flex flex-wrap gap-2">
                {artist.styles.map((style, i) => (
                  <span key={i} className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-xs font-medium">
                    {style}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 p-5">
            <h3 className="font-semibold text-gray-900 mb-3">Social Links</h3>
            <div className="space-y-2">
              {artist.socialLinks.map((link, i) => (
                <a
                  key={i}
                  href={link.url}
                  className="flex items-center gap-2 text-sm text-gray-600 hover:text-purple-600 transition-colors"
                >
                  <span>{link.icon}</span>
                  {link.platform}
                </a>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100">
              <p className="text-xs text-gray-400">Joined {new Date(artist.joinedDate).toLocaleDateString("en-US", { month: "long", year: "numeric" })}</p>
            </div>
          </div>
        </div>

        {/* Artist's Works with Comments */}
        <div>
          <h3 className="font-bold text-gray-900 mb-4">🎨 Artworks ({artistWorks.length})</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {artistWorks.map((work) => {
              const liked = isLiked(work.id);
              return (
                <div key={work.id} className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all">
                  {/* Artwork header gradient */}
                  <div className="h-20 bg-gradient-to-r from-rose-100 via-purple-100 to-indigo-100 flex items-center justify-center">
                    <span className="text-3xl opacity-40">
                      {work.category === "stories" ? "📖" : work.category === "poems" ? "🌸" : work.category === "drawings" ? "✏️" : work.category === "digital-art" ? "🖥️" : "🔬"}
                    </span>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full capitalize">{work.category.replace("-", " ")}</span>
                      {work.galleryApproved && <span className="text-xs text-emerald-600 font-medium">✓ Gallery Approved</span>}
                    </div>
                    <h4 className="font-semibold text-gray-900 text-sm">{work.title}</h4>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">{work.description}</p>

                    {/* Actions */}
                    <div className="flex items-center gap-3 mt-3 pt-3 border-t border-gray-100">
                      <button
                        onClick={() => liked ? unlikeArtwork(work.id) : likeArtwork(work.id)}
                        className={`flex items-center gap-1 text-xs font-medium transition-all ${liked ? "text-red-500" : "text-gray-400 hover:text-red-500"}`}
                      >
                        {liked ? "❤️" : "🤍"} {work.likes + (liked ? 1 : 0)}
                      </button>
                      <span className="text-xs text-gray-400">💬 {work.comments.length}</span>
                    </div>

                    {/* Comments */}
                    {work.comments.length > 0 && (
                      <div className="mt-3 space-y-2">
                        {work.comments.slice(0, 2).map((c) => (
                          <div key={c.id} className="flex items-start gap-2 p-2 bg-gray-50 rounded-lg">
                            <span className="text-sm">{c.userAvatar}</span>
                            <div>
                              <span className="text-xs font-medium text-gray-700">{c.userName}</span>
                              <p className="text-xs text-gray-500">{c.text}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Add Comment */}
                    <div className="mt-3 flex gap-2">
                      <input
                        type="text"
                        placeholder="Add a comment..."
                        value={commentTexts[work.id] || ""}
                        onChange={(e) => setCommentTexts(prev => ({ ...prev, [work.id]: e.target.value }))}
                        className="flex-1 text-xs px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-purple-300 bg-gray-50"
                      />
                      <button
                        onClick={() => setCommentTexts(prev => ({ ...prev, [work.id]: "" }))}
                        className="px-3 py-2 bg-purple-50 text-purple-600 rounded-lg text-xs font-medium hover:bg-purple-100 transition-colors"
                      >
                        Post
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl border border-indigo-100 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-1">👩‍🎨 Explore Artists</h2>
        <p className="text-sm text-gray-500">
          Discover talented creators from around the world. Follow artists, explore their portfolios, comment on their work, and build your creative network.
        </p>
      </div>

      {/* Artist Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {artistProfiles.map((a) => {
          const works = artworks.filter((w) => w.artistId === a.id);
          const totalLikes = works.reduce((sum, w) => sum + w.likes, 0);
          const isFollowing = followedArtists.has(a.id);

          return (
            <div
              key={a.id}
              className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 group"
            >
              <div
                onClick={() => setSelectedArtist(a.id)}
                className="cursor-pointer"
              >
                <div className="h-24 bg-gradient-to-r from-rose-400 via-purple-400 to-indigo-400 relative">
                  {a.featured && (
                    <span className="absolute top-3 right-3 px-2 py-0.5 bg-yellow-400/90 backdrop-blur-sm rounded-full text-yellow-900 text-xs font-medium">
                      ⭐ Featured
                    </span>
                  )}
                </div>
                <div className="px-5 pt-0 -mt-8">
                  <div className="w-16 h-16 bg-white rounded-xl border-4 border-white shadow-md flex items-center justify-center text-3xl mb-3 group-hover:scale-110 transition-transform">
                    {a.avatar}
                  </div>
                  <h3 className="font-bold text-gray-900">{a.name}</h3>
                  <p className="text-xs text-gray-500 mt-0.5">📍 {a.location}</p>
                  <p className="text-xs text-gray-500 mt-2 line-clamp-2 leading-relaxed">{a.bio}</p>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {a.styles.slice(0, 3).map((s, i) => (
                      <span key={i} className="px-2 py-0.5 bg-purple-50 text-purple-600 rounded-md text-xs">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="px-5 pb-5 pt-3">
                <div className="flex items-center justify-between text-xs text-gray-400 mb-3">
                  <span>👥 {(a.followers + (isFollowing ? 1 : 0)).toLocaleString()} followers</span>
                  <span>🖼️ {works.length} works · ❤️ {totalLikes.toLocaleString()}</span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={(e) => toggleFollow(a.id, e)}
                    className={`flex-1 py-2 rounded-xl text-xs font-medium transition-all ${
                      isFollowing
                        ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        : "bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:shadow-md"
                    }`}
                  >
                    {isFollowing ? "✓ Following" : "＋ Follow"}
                  </button>
                  <button
                    onClick={() => setSelectedArtist(a.id)}
                    className="px-4 py-2 border border-gray-200 rounded-xl text-xs font-medium text-gray-600 hover:bg-gray-50 transition-all"
                  >
                    View Profile
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ArtistProfiles;
