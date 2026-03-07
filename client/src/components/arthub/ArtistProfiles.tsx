import React, { useState } from "react";
import { artistProfiles, artworks } from "../../data/artHubData";

const ArtistProfiles: React.FC = () => {
  const [selectedArtist, setSelectedArtist] = useState<string | null>(null);
  const artist = artistProfiles.find((a) => a.id === selectedArtist);
  const artistWorks = artworks.filter((a) => a.artistId === selectedArtist);

  if (artist) {
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
          <div className="h-32 bg-gradient-to-r from-rose-500 via-purple-500 to-indigo-500" />
          <div className="px-6 pb-6 -mt-10">
            <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4">
              <div className="w-20 h-20 bg-white rounded-2xl border-4 border-white shadow-lg flex items-center justify-center text-4xl">
                {artist.avatar}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-bold text-gray-900">{artist.name}</h2>
                  {artist.featured && <span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 text-xs rounded-full font-medium">⭐ Featured</span>}
                </div>
                <p className="text-sm text-gray-500">{artist.location}</p>
              </div>
              <div className="flex gap-6 text-center">
                <div>
                  <p className="text-lg font-bold text-gray-900">{artist.followers.toLocaleString()}</p>
                  <p className="text-xs text-gray-500">Followers</p>
                </div>
                <div>
                  <p className="text-lg font-bold text-gray-900">{artist.following}</p>
                  <p className="text-xs text-gray-500">Following</p>
                </div>
                <div>
                  <p className="text-lg font-bold text-gray-900">{artistWorks.length}</p>
                  <p className="text-xs text-gray-500">Works</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bio & Details */}
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

        {/* Artist's Works */}
        <div>
          <h3 className="font-bold text-gray-900 mb-4">Artworks ({artistWorks.length})</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {artistWorks.map((work) => (
              <div key={work.id} className="bg-white rounded-xl border border-gray-100 p-4 hover:shadow-md transition-all">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full capitalize">{work.category.replace("-", " ")}</span>
                  {work.galleryApproved && <span className="text-xs text-emerald-600">✓ Gallery</span>}
                </div>
                <h4 className="font-semibold text-gray-900 text-sm">{work.title}</h4>
                <p className="text-xs text-gray-500 mt-1 line-clamp-2">{work.description}</p>
                <div className="flex items-center gap-3 mt-3 text-xs text-gray-400">
                  <span>❤️ {work.likes}</span>
                  <span>💬 {work.comments.length}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900">Artist Profiles</h2>
        <p className="text-sm text-gray-500 mt-1">Discover talented creators from around the world</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {artistProfiles.map((a) => {
          const works = artworks.filter((w) => w.artistId === a.id);
          const totalLikes = works.reduce((sum, w) => sum + w.likes, 0);

          return (
            <div
              key={a.id}
              onClick={() => setSelectedArtist(a.id)}
              className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group"
            >
              <div className="h-24 bg-gradient-to-r from-rose-400 via-purple-400 to-indigo-400 relative">
                {a.featured && (
                  <span className="absolute top-3 right-3 px-2 py-0.5 bg-yellow-400/90 backdrop-blur-sm rounded-full text-yellow-900 text-xs font-medium">
                    ⭐ Featured
                  </span>
                )}
              </div>
              <div className="px-5 pb-5 -mt-8">
                <div className="w-16 h-16 bg-white rounded-xl border-4 border-white shadow-md flex items-center justify-center text-3xl mb-3 group-hover:scale-110 transition-transform">
                  {a.avatar}
                </div>
                <h3 className="font-bold text-gray-900">{a.name}</h3>
                <p className="text-xs text-gray-500 mt-0.5">{a.location}</p>
                <p className="text-xs text-gray-500 mt-2 line-clamp-2 leading-relaxed">{a.bio}</p>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {a.styles.slice(0, 3).map((s, i) => (
                    <span key={i} className="px-2 py-0.5 bg-purple-50 text-purple-600 rounded-md text-xs">
                      {s}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100 text-xs text-gray-400">
                  <span>👥 {a.followers.toLocaleString()} followers</span>
                  <span>❤️ {totalLikes.toLocaleString()} likes</span>
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
