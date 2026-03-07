import React, { useState } from "react";

// Types
interface Asset3D {
  id: string;
  name: string;
  category: string;
  thumbnail: string;
  description: string;
  complexity: "simple" | "moderate" | "complex";
  downloadCount: number;
  rating: number;
  tags: string[];
}

interface MaterialPreset {
  id: string;
  name: string;
  color: string;
  roughness: number;
  metallic: number;
  preview: string;
  category: string;
}

interface HDRIEnvironment {
  id: string;
  name: string;
  preview: string;
  category: string;
  intensity: number;
}

interface TextureAsset {
  id: string;
  name: string;
  type: "diffuse" | "normal" | "roughness" | "metallic" | "height";
  preview: string;
  resolution: string;
  tileable: boolean;
}

type AssetCategory = "models" | "materials" | "textures" | "hdri" | "templates";

// Sample data
const sampleModels: Asset3D[] = [
  {
    id: "m1",
    name: "Low Poly Tree",
    category: "Nature",
    thumbnail: "🌳",
    description: "Simple stylized tree perfect for game environments",
    complexity: "simple",
    downloadCount: 1250,
    rating: 4.5,
    tags: ["nature", "tree", "lowpoly", "game"]
  },
  {
    id: "m2",
    name: "Wooden Chair",
    category: "Furniture",
    thumbnail: "🪑",
    description: "Classic wooden chair with detailed wood grain",
    complexity: "moderate",
    downloadCount: 890,
    rating: 4.8,
    tags: ["furniture", "chair", "interior", "wood"]
  },
  {
    id: "m3",
    name: "Stone Castle",
    category: "Architecture",
    thumbnail: "🏰",
    description: "Medieval castle with towers and walls",
    complexity: "complex",
    downloadCount: 2100,
    rating: 4.9,
    tags: ["architecture", "castle", "medieval", "building"]
  },
  {
    id: "m4",
    name: "Sports Car",
    category: "Vehicles",
    thumbnail: "🚗",
    description: "Sleek sports car with detailed interior",
    complexity: "complex",
    downloadCount: 3400,
    rating: 4.7,
    tags: ["vehicle", "car", "sports", "automotive"]
  },
  {
    id: "m5",
    name: "Cute Robot",
    category: "Characters",
    thumbnail: "🤖",
    description: "Friendly robot character with rigging ready",
    complexity: "moderate",
    downloadCount: 1800,
    rating: 4.6,
    tags: ["character", "robot", "scifi", "rigged"]
  },
  {
    id: "m6",
    name: "Space Station",
    category: "SciFi",
    thumbnail: "🛸",
    description: "Modular space station components",
    complexity: "complex",
    downloadCount: 1560,
    rating: 4.8,
    tags: ["scifi", "space", "station", "modular"]
  },
  {
    id: "m7",
    name: "Treasure Chest",
    category: "Props",
    thumbnail: "📦",
    description: "Animated treasure chest with gold coins",
    complexity: "moderate",
    downloadCount: 2200,
    rating: 4.5,
    tags: ["props", "treasure", "game", "animated"]
  },
  {
    id: "m8",
    name: "Mountain Rock",
    category: "Nature",
    thumbnail: "🗻",
    description: "Realistic mountain rock formation",
    complexity: "moderate",
    downloadCount: 980,
    rating: 4.4,
    tags: ["nature", "rock", "mountain", "environment"]
  }
];

const sampleMaterials: MaterialPreset[] = [
  { id: "mat1", name: "Brushed Steel", color: "#A8A9AD", roughness: 0.3, metallic: 1.0, preview: "🔩", category: "Metal" },
  { id: "mat2", name: "Gold", color: "#FFD700", roughness: 0.2, metallic: 1.0, preview: "🥇", category: "Metal" },
  { id: "mat3", name: "Copper", color: "#B87333", roughness: 0.25, metallic: 1.0, preview: "🥉", category: "Metal" },
  { id: "mat4", name: "Oak Wood", color: "#C19A6B", roughness: 0.7, metallic: 0.0, preview: "🪵", category: "Wood" },
  { id: "mat5", name: "Cherry Wood", color: "#9B2335", roughness: 0.65, metallic: 0.0, preview: "🪵", category: "Wood" },
  { id: "mat6", name: "Marble White", color: "#F5F5F5", roughness: 0.1, metallic: 0.0, preview: "⬜", category: "Stone" },
  { id: "mat7", name: "Granite", color: "#666666", roughness: 0.5, metallic: 0.0, preview: "🪨", category: "Stone" },
  { id: "mat8", name: "Red Plastic", color: "#FF4444", roughness: 0.4, metallic: 0.0, preview: "🔴", category: "Plastic" },
  { id: "mat9", name: "Blue Plastic", color: "#4444FF", roughness: 0.4, metallic: 0.0, preview: "🔵", category: "Plastic" },
  { id: "mat10", name: "Glass Clear", color: "#87CEEB", roughness: 0.0, metallic: 0.0, preview: "💎", category: "Glass" },
  { id: "mat11", name: "Frosted Glass", color: "#E8E8E8", roughness: 0.6, metallic: 0.0, preview: "🧊", category: "Glass" },
  { id: "mat12", name: "Rubber Black", color: "#1A1A1A", roughness: 0.9, metallic: 0.0, preview: "⚫", category: "Rubber" }
];

const sampleHDRI: HDRIEnvironment[] = [
  { id: "h1", name: "Studio Soft", preview: "🏠", category: "Studio", intensity: 1.0 },
  { id: "h2", name: "Studio Hard", preview: "💡", category: "Studio", intensity: 1.5 },
  { id: "h3", name: "Sunny Day", preview: "☀️", category: "Outdoor", intensity: 1.2 },
  { id: "h4", name: "Cloudy Sky", preview: "☁️", category: "Outdoor", intensity: 0.8 },
  { id: "h5", name: "Sunset Beach", preview: "🌅", category: "Outdoor", intensity: 0.9 },
  { id: "h6", name: "Night City", preview: "🌃", category: "Urban", intensity: 0.5 },
  { id: "h7", name: "Forest Path", preview: "🌲", category: "Nature", intensity: 0.7 },
  { id: "h8", name: "Desert Noon", preview: "🏜️", category: "Nature", intensity: 1.4 }
];

const sampleTextures: TextureAsset[] = [
  { id: "t1", name: "Wood Planks", type: "diffuse", preview: "🪵", resolution: "4K", tileable: true },
  { id: "t2", name: "Brick Wall", type: "diffuse", preview: "🧱", resolution: "4K", tileable: true },
  { id: "t3", name: "Concrete", type: "diffuse", preview: "⬜", resolution: "2K", tileable: true },
  { id: "t4", name: "Metal Scratched", type: "diffuse", preview: "🔩", resolution: "4K", tileable: true },
  { id: "t5", name: "Fabric Cloth", type: "diffuse", preview: "🧵", resolution: "2K", tileable: true },
  { id: "t6", name: "Ground Dirt", type: "diffuse", preview: "🟤", resolution: "4K", tileable: true },
  { id: "t7", name: "Grass Field", type: "diffuse", preview: "🌿", resolution: "4K", tileable: true },
  { id: "t8", name: "Leather Brown", type: "diffuse", preview: "🟫", resolution: "2K", tileable: true }
];

const modelCategories = ["All", "Nature", "Furniture", "Architecture", "Vehicles", "Characters", "SciFi", "Props"];
const materialCategories = ["All", "Metal", "Wood", "Stone", "Plastic", "Glass", "Rubber"];

const BlenderAssetLibrary: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<AssetCategory>("models");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [selectedAsset, setSelectedAsset] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Filter models based on search and category
  const filteredModels = sampleModels.filter(model => {
    const matchesSearch = model.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      model.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedFilter === "All" || model.category === selectedFilter;
    return matchesSearch && matchesCategory;
  });

  // Filter materials
  const filteredMaterials = sampleMaterials.filter(mat => {
    const matchesSearch = mat.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedFilter === "All" || mat.category === selectedFilter;
    return matchesSearch && matchesCategory;
  });

  const renderStars = (rating: number) => {
    return "⭐".repeat(Math.floor(rating)) + (rating % 1 >= 0.5 ? "½" : "");
  };

  const getComplexityColor = (complexity: Asset3D["complexity"]) => {
    switch (complexity) {
      case "simple": return "text-green-400 bg-green-500/20";
      case "moderate": return "text-yellow-400 bg-yellow-500/20";
      case "complex": return "text-red-400 bg-red-500/20";
    }
  };

  return (
    <div className="min-h-[80vh] bg-gradient-to-b from-gray-900 via-purple-900/20 to-gray-900 rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="bg-gray-800/50 border-b border-gray-700 p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <span className="text-3xl">📚</span>
              3D Asset Library
            </h2>
            <p className="text-gray-400 text-sm mt-1">
              Browse and import professional 3D assets, materials, textures, and environments
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors text-sm font-medium">
              📤 Upload Asset
            </button>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2">
          {[
            { id: "models" as AssetCategory, label: "3D Models", icon: "📦", count: sampleModels.length },
            { id: "materials" as AssetCategory, label: "Materials", icon: "🎨", count: sampleMaterials.length },
            { id: "textures" as AssetCategory, label: "Textures", icon: "🖼️", count: sampleTextures.length },
            { id: "hdri" as AssetCategory, label: "HDRI", icon: "🌅", count: sampleHDRI.length },
            { id: "templates" as AssetCategory, label: "Templates", icon: "📋", count: 5 }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveCategory(tab.id);
                setSelectedFilter("All");
                setSearchQuery("");
              }}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeCategory === tab.id
                  ? "bg-purple-500 text-white shadow-lg shadow-purple-500/30"
                  : "bg-gray-700/50 text-gray-400 hover:bg-gray-700 hover:text-white"
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
              <span className="ml-2 px-1.5 py-0.5 bg-black/30 rounded text-[10px]">{tab.count}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Search & Filters */}
      <div className="bg-gray-800/30 border-b border-gray-700/50 px-6 py-4">
        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search assets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-2">
            <span className="text-gray-400 text-sm">Filter:</span>
            <div className="flex gap-1">
              {(activeCategory === "models" ? modelCategories : materialCategories).map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedFilter(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs transition-colors ${
                    selectedFilter === cat
                      ? "bg-purple-500 text-white"
                      : "bg-gray-700/50 text-gray-400 hover:bg-gray-700"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* View Toggle */}
          <div className="flex items-center gap-1 bg-gray-700/50 rounded-lg p-1">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-1.5 rounded ${viewMode === "grid" ? "bg-purple-500 text-white" : "text-gray-400"}`}
            >
              ▦
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-1.5 rounded ${viewMode === "list" ? "bg-purple-500 text-white" : "text-gray-400"}`}
            >
              ☰
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Models Grid */}
        {activeCategory === "models" && (
          <div className={viewMode === "grid" ? "grid grid-cols-4 gap-4" : "space-y-3"}>
            {filteredModels.map(model => (
              <div
                key={model.id}
                onClick={() => setSelectedAsset(model.id)}
                className={`rounded-xl overflow-hidden cursor-pointer transition-all hover:scale-[1.02] ${
                  selectedAsset === model.id
                    ? "ring-2 ring-purple-500 shadow-lg shadow-purple-500/20"
                    : "hover:shadow-lg"
                } ${viewMode === "list" ? "flex items-center gap-4 bg-gray-800/50 p-4" : ""}`}
              >
                {/* Thumbnail */}
                <div className={`${viewMode === "grid" ? "aspect-square" : "w-24 h-24"} bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center`}>
                  <span className="text-5xl">{model.thumbnail}</span>
                </div>

                {/* Info */}
                <div className={viewMode === "grid" ? "p-4 bg-gray-800/70" : "flex-1"}>
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-white font-medium">{model.name}</h3>
                      <p className="text-gray-400 text-xs mt-1">{model.category}</p>
                    </div>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-medium ${getComplexityColor(model.complexity)}`}>
                      {model.complexity}
                    </span>
                  </div>
                  
                  <p className="text-gray-500 text-xs mt-2 line-clamp-2">{model.description}</p>
                  
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-yellow-400 text-xs">{renderStars(model.rating)}</span>
                    <span className="text-gray-500 text-xs">📥 {model.downloadCount.toLocaleString()}</span>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mt-2">
                    {model.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="px-2 py-0.5 bg-gray-700 text-gray-400 text-[10px] rounded">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Action Button */}
                  <button
                    className="w-full mt-3 py-2 bg-purple-500/20 text-purple-400 rounded-lg text-xs font-medium hover:bg-purple-500/30 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      alert(`Added "${model.name}" to scene!`);
                    }}
                  >
                    + Add to Scene
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Materials Grid */}
        {activeCategory === "materials" && (
          <div className="grid grid-cols-6 gap-4">
            {filteredMaterials.map(material => (
              <div
                key={material.id}
                onClick={() => setSelectedAsset(material.id)}
                className={`rounded-xl overflow-hidden cursor-pointer transition-all hover:scale-105 ${
                  selectedAsset === material.id
                    ? "ring-2 ring-purple-500"
                    : ""
                }`}
              >
                {/* Preview */}
                <div
                  className="aspect-square flex items-center justify-center relative"
                  style={{ background: material.color }}
                >
                  <span className="text-4xl drop-shadow-lg">{material.preview}</span>
                  <div className="absolute bottom-2 right-2 flex gap-1">
                    {material.metallic > 0.5 && (
                      <span className="px-1.5 py-0.5 bg-black/30 text-white text-[8px] rounded">Metal</span>
                    )}
                  </div>
                </div>
                <div className="p-3 bg-gray-800/70">
                  <h3 className="text-white text-sm font-medium truncate">{material.name}</h3>
                  <p className="text-gray-400 text-xs">{material.category}</p>
                  <div className="flex gap-2 mt-2 text-[10px] text-gray-500">
                    <span>R: {material.roughness}</span>
                    <span>M: {material.metallic}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Textures Grid */}
        {activeCategory === "textures" && (
          <div className="grid grid-cols-4 gap-4">
            {sampleTextures.map(texture => (
              <div
                key={texture.id}
                onClick={() => setSelectedAsset(texture.id)}
                className={`rounded-xl overflow-hidden cursor-pointer transition-all hover:scale-[1.02] ${
                  selectedAsset === texture.id ? "ring-2 ring-purple-500" : ""
                }`}
              >
                <div className="aspect-square bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center">
                  <span className="text-5xl">{texture.preview}</span>
                </div>
                <div className="p-4 bg-gray-800/70">
                  <h3 className="text-white font-medium">{texture.name}</h3>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-purple-400 text-xs capitalize">{texture.type}</span>
                    <span className="text-gray-500 text-xs">{texture.resolution}</span>
                  </div>
                  {texture.tileable && (
                    <span className="inline-block mt-2 px-2 py-0.5 bg-green-500/20 text-green-400 text-[10px] rounded">
                      ✓ Tileable
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* HDRI Grid */}
        {activeCategory === "hdri" && (
          <div className="grid grid-cols-4 gap-4">
            {sampleHDRI.map(hdri => (
              <div
                key={hdri.id}
                onClick={() => setSelectedAsset(hdri.id)}
                className={`rounded-xl overflow-hidden cursor-pointer transition-all hover:scale-[1.02] ${
                  selectedAsset === hdri.id ? "ring-2 ring-purple-500" : ""
                }`}
              >
                <div className="aspect-video bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center">
                  <span className="text-5xl">{hdri.preview}</span>
                </div>
                <div className="p-4 bg-gray-800/70">
                  <h3 className="text-white font-medium">{hdri.name}</h3>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-purple-400 text-xs">{hdri.category}</span>
                    <span className="text-gray-500 text-xs">Intensity: {hdri.intensity}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Templates */}
        {activeCategory === "templates" && (
          <div className="grid grid-cols-3 gap-6">
            {[
              { name: "Product Shot", icon: "📦", desc: "Perfect setup for product visualization" },
              { name: "Interior Scene", icon: "🏠", desc: "Fully lit interior environment" },
              { name: "Character Pose", icon: "🧍", desc: "Character presentation template" },
              { name: "Vehicle Showcase", icon: "🚗", desc: "Automotive presentation setup" },
              { name: "Abstract Art", icon: "🎨", desc: "Creative abstract composition" }
            ].map((template, i) => (
              <div
                key={i}
                className="bg-gray-800/50 rounded-xl p-6 cursor-pointer hover:bg-gray-800 transition-all hover:scale-[1.02]"
              >
                <div className="text-5xl mb-4">{template.icon}</div>
                <h3 className="text-white font-bold text-lg">{template.name}</h3>
                <p className="text-gray-400 text-sm mt-2">{template.desc}</p>
                <button className="mt-4 px-4 py-2 bg-purple-500 text-white rounded-lg text-sm hover:bg-purple-600 transition-colors">
                  Use Template
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {activeCategory === "models" && filteredModels.length === 0 && (
          <div className="text-center py-16">
            <span className="text-5xl">🔍</span>
            <h3 className="text-white font-bold mt-4">No assets found</h3>
            <p className="text-gray-400">Try adjusting your search or filters</p>
          </div>
        )}
      </div>

      {/* Footer Stats */}
      <div className="bg-gray-800/30 border-t border-gray-700/50 px-6 py-4">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-6 text-gray-400">
            <span>📦 {sampleModels.length} Models</span>
            <span>🎨 {sampleMaterials.length} Materials</span>
            <span>🖼️ {sampleTextures.length} Textures</span>
            <span>🌅 {sampleHDRI.length} HDRIs</span>
          </div>
          <div className="text-gray-500 text-xs">
            All assets are free for personal and commercial use
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlenderAssetLibrary;
