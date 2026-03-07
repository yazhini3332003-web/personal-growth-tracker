import React, { useState } from "react";
import { artworks } from "../../data/artHubData";
import { useArtHubContext } from "../../context/ArtHubContext";

const ArtworkPosting: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"image" | "written" | "project">("image");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "digital-art",
    content: "",
    tags: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const { submitWork } = useArtHubContext();

  const handleSubmit = () => {
    if (formData.title && formData.description) {
      submitWork(`custom-${Date.now()}`);
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ title: "", description: "", category: "digital-art", content: "", tags: "" });
      }, 3000);
    }
  };

  const recentSubmissions = artworks.slice(0, 4);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900">Post Your Artwork</h2>
        <p className="text-sm text-gray-500 mt-1">Share your creations with the world</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Posting Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            {/* Tabs */}
            <div className="flex border-b border-gray-100">
              {[
                { key: "image" as const, label: "Image Artwork", icon: "🖼️" },
                { key: "written" as const, label: "Written Work", icon: "📝" },
                { key: "project" as const, label: "Project", icon: "📁" },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex-1 px-4 py-3.5 text-sm font-medium transition-all flex items-center justify-center gap-2 ${
                    activeTab === tab.key
                      ? "text-purple-700 border-b-2 border-purple-700 bg-purple-50/50"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <span>{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="p-6 space-y-4">
              {submitted ? (
                <div className="text-center py-12">
                  <span className="text-5xl block mb-4">🎉</span>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Artwork Submitted!</h3>
                  <p className="text-sm text-gray-500">Your creative work has been shared with the community.</p>
                </div>
              ) : (
                <>
                  {/* Title */}
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1.5">Title</label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="Give your artwork a title..."
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-400"
                    />
                  </div>

                  {/* Category */}
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1.5">Category</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-400 bg-white"
                    >
                      <option value="stories">Stories</option>
                      <option value="poems">Poems</option>
                      <option value="drawings">Drawings / Sketches</option>
                      <option value="digital-art">Digital Art / Paintings</option>
                      <option value="experimental">Experimental Art</option>
                    </select>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1.5">Description</label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Describe your artwork..."
                      rows={3}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-400 resize-none"
                    />
                  </div>

                  {/* Image upload area */}
                  {activeTab === "image" && (
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1.5">Upload Image</label>
                      <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center hover:border-purple-400 transition-colors cursor-pointer">
                        <span className="text-4xl block mb-2">📤</span>
                        <p className="text-sm text-gray-500">Click or drag to upload your artwork</p>
                        <p className="text-xs text-gray-400 mt-1">PNG, JPG, GIF up to 10MB</p>
                      </div>
                    </div>
                  )}

                  {/* Written content */}
                  {activeTab === "written" && (
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1.5">Your Written Work</label>
                      <textarea
                        value={formData.content}
                        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                        placeholder="Write your story, poem, or creative piece here..."
                        rows={10}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-400 resize-none font-mono leading-relaxed"
                      />
                    </div>
                  )}

                  {/* Project description */}
                  {activeTab === "project" && (
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1.5">Project Description</label>
                      <textarea
                        value={formData.content}
                        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                        placeholder="Describe your creative project, process, and vision..."
                        rows={6}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-400 resize-none"
                      />
                    </div>
                  )}

                  {/* Tags */}
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1.5">Tags</label>
                    <input
                      type="text"
                      value={formData.tags}
                      onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                      placeholder="Add tags separated by commas (e.g., nature, watercolor, abstract)"
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-400"
                    />
                  </div>

                  {/* Submit */}
                  <button
                    onClick={handleSubmit}
                    disabled={!formData.title || !formData.description}
                    className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-medium text-sm hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Publish Artwork 🚀
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          {/* Tips */}
          <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl border border-purple-100 p-5">
            <h3 className="font-bold text-gray-900 text-sm mb-3">💡 Posting Tips</h3>
            <ul className="space-y-2">
              {[
                "Give your work a descriptive title",
                "Add relevant tags for discovery",
                "Write a compelling description",
                "Choose the right category",
                "Engage with comments on your work",
              ].map((tip, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-gray-600">
                  <span className="text-purple-400 mt-0.5">✦</span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>

          {/* Recent Submissions */}
          <div className="bg-white rounded-xl border border-gray-100 p-5">
            <h3 className="font-bold text-gray-900 text-sm mb-3">📋 Recent Posts</h3>
            <div className="space-y-3">
              {recentSubmissions.map((art) => (
                <div key={art.id} className="flex items-center gap-3 group cursor-pointer">
                  <span className="text-lg">{art.artistAvatar}</span>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-medium text-gray-900 truncate group-hover:text-purple-700 transition-colors">{art.title}</p>
                    <p className="text-xs text-gray-400">{art.artistName}</p>
                  </div>
                  <span className="text-xs text-gray-400">❤️ {art.likes}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtworkPosting;
