import React, { useState } from "react";
import { FiExternalLink, FiSearch, FiBook, FiCode, FiFileText, FiGithub, FiVideo } from "react-icons/fi";
import { labPhases } from "../../data/learningLabData";
import { LabResource } from "../../types/learningLab";

type ResourceType = "all" | "tutorial" | "docs" | "blog" | "github" | "video";

const typeIcons: Record<string, React.ReactNode> = {
  tutorial: <FiBook className="text-blue-400" />,
  docs: <FiFileText className="text-green-400" />,
  blog: <FiCode className="text-purple-400" />,
  github: <FiGithub className="text-gray-700" />,
  video: <FiVideo className="text-red-400" />,
};

const typeColors: Record<string, string> = {
  tutorial: "bg-blue-500/10 text-blue-400 border-blue-500/30",
  docs: "bg-green-500/10 text-green-400 border-green-500/30",
  blog: "bg-purple-500/10 text-purple-400 border-purple-500/30",
  github: "bg-gray-100 text-gray-700 border-gray-400/30",
  video: "bg-red-500/10 text-red-400 border-red-500/30",
};

const ResourceLibrary: React.FC = () => {
  const [selectedPhase, setSelectedPhase] = useState<number>(0); // 0 = all phases
  const [selectedType, setSelectedType] = useState<ResourceType>("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Gather all resources
  const allResources: (LabResource & { phaseId: number; phaseTitle: string })[] = [];
  labPhases.forEach((phase) => {
    phase.resources.forEach((resource) => {
      allResources.push({
        ...resource,
        phaseId: phase.id,
        phaseTitle: phase.title,
      });
    });
  });

  // Filter resources
  const filtered = allResources.filter((r) => {
    if (selectedPhase > 0 && r.phaseId !== selectedPhase) return false;
    if (selectedType !== "all" && r.type !== selectedType) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        r.title.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q) ||
        r.phaseTitle.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const typeCounts: Record<string, number> = { all: allResources.length };
  allResources.forEach((r) => {
    typeCounts[r.type] = (typeCounts[r.type] || 0) + 1;
  });

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">📚 Resource Library</h2>
        <p className="text-gray-500 text-sm">
          Curated tutorials, documentation, blogs, GitHub repos, and videos for every phase of your AI development journey.
        </p>
      </div>

      {/* Filters */}
      <div className="bg-gray-100 rounded-xl border border-gray-200 p-5 mb-8">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <div className="relative flex-1">
            <FiSearch className="absolute left-3 top-1/2 -trangray-y-1/2 text-gray-500" size={14} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search resources..."
              className="w-full bg-gray-200 text-gray-900 text-sm rounded-lg pl-9 pr-3 py-2 border border-gray-300 focus:border-blue-500 focus:outline-none"
            />
          </div>

          {/* Phase filter */}
          <select
            value={selectedPhase}
            onChange={(e) => setSelectedPhase(Number(e.target.value))}
            className="bg-gray-200 text-gray-900 text-sm rounded-lg px-3 py-2 border border-gray-300 sm:w-56"
          >
            <option value={0}>All Phases</option>
            {labPhases.map((p) => (
              <option key={p.id} value={p.id}>
                Phase {p.id}: {p.title.slice(0, 30)}
              </option>
            ))}
          </select>
        </div>

        {/* Type filter pills */}
        <div className="flex flex-wrap gap-2 mt-3">
          {(["all", "tutorial", "docs", "blog", "github", "video"] as ResourceType[]).map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`text-xs px-3 py-1.5 rounded-full border transition-colors flex items-center space-x-1 ${
                selectedType === type
                  ? "bg-blue-500 text-gray-900 border-blue-500"
                  : "bg-gray-200 text-gray-700 border-gray-300 hover:border-gray-400"
              }`}
            >
              {type !== "all" && <span className="mr-1">{typeIcons[type]}</span>}
              <span className="capitalize">{type}</span>
              <span className="text-gray-500 ml-1">({typeCounts[type] || 0})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Results count */}
      <div className="text-gray-500 text-sm mb-4">
        Showing {filtered.length} of {allResources.length} resources
      </div>

      {/* Resource Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((resource, i) => (
          <a
            key={`${resource.phaseId}-${i}`}
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-100 rounded-xl border border-gray-200 p-4 hover:border-blue-500/50 transition-all duration-200 group"
          >
            {/* Type badge */}
            <div className="flex items-center justify-between mb-3">
              <span className={`text-xs px-2 py-0.5 rounded-full border ${typeColors[resource.type]}`}>
                {resource.type}
              </span>
              <FiExternalLink className="text-gray-500 group-hover:text-blue-400 transition-colors" size={12} />
            </div>

            {/* Title */}
            <h3 className="text-gray-900 font-medium text-sm mb-1 group-hover:text-blue-300 transition-colors">
              {resource.title}
            </h3>

            {/* Description */}
            <p className="text-gray-500 text-xs mb-3">{resource.description}</p>

            {/* Phase tag */}
            <div className="flex items-center space-x-1">
              <span className="text-xs text-gray-500">Phase {resource.phaseId}</span>
              <span className="text-gray-500">·</span>
              <span className="text-xs text-gray-500 truncate">{resource.phaseTitle}</span>
            </div>
          </a>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No resources found</p>
          <p className="text-gray-500 text-sm mt-1">Try adjusting your filters or search query</p>
        </div>
      )}
    </div>
  );
};

export default ResourceLibrary;
