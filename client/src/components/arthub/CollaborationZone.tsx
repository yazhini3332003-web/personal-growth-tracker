import React from "react";
import { collaborationProjects } from "../../data/artHubData";
import { useArtHubContext } from "../../context/ArtHubContext";

const CollaborationZone: React.FC = () => {
  const { joinCollaboration, progress } = useArtHubContext();

  const statusColors: Record<string, string> = {
    open: "bg-emerald-100 text-emerald-700",
    "in-progress": "bg-blue-100 text-blue-700",
    completed: "bg-gray-100 text-gray-600",
  };

  const typeLabels: Record<string, { label: string; icon: string }> = {
    "writer-illustrator": { label: "Writer + Illustrator", icon: "📖🎨" },
    "poet-artist": { label: "Poet + Artist", icon: "🌸✏️" },
    group: { label: "Group Project", icon: "👥" },
    open: { label: "Open Collab", icon: "🌐" },
  };

  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 p-8 text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-4 right-8 text-7xl">🤝</div>
        </div>
        <div className="relative z-10">
          <h2 className="text-2xl font-bold mb-2">Collaboration Zone</h2>
          <p className="text-white/80 text-sm max-w-xl">
            Create something extraordinary together — writers + illustrators, poets + visual artists,
            and group creative projects. Art is even more powerful when shared.
          </p>
        </div>
      </div>

      {/* Projects */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {collaborationProjects.map((project) => {
          const joined = progress.collaborationsJoined.includes(project.id);
          const typeConfig = typeLabels[project.type];

          return (
            <div key={project.id} className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-lg transition-all duration-300">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-100 to-cyan-100 rounded-xl flex items-center justify-center text-xl">
                    {project.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{project.title}</h3>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs text-gray-500">{typeConfig.icon} {typeConfig.label}</span>
                    </div>
                  </div>
                </div>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${statusColors[project.status]}`}>
                  {project.status.replace("-", " ")}
                </span>
              </div>

              <p className="text-sm text-gray-600 mb-4">{project.description}</p>

              {/* Members */}
              <div className="mb-4">
                <p className="text-xs font-semibold text-gray-500 mb-2">Members</p>
                <div className="flex flex-wrap gap-2">
                  {project.members.map((member, i) => (
                    <div key={i} className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 rounded-lg">
                      <span className="text-sm">{member.avatar}</span>
                      <div>
                        <p className="text-xs font-medium text-gray-700">{member.name}</p>
                        <p className="text-xs text-gray-400">{member.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {project.tags.map((tag, i) => (
                  <span key={i} className="px-2 py-0.5 bg-teal-50 text-teal-700 rounded-md text-xs">
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Action */}
              {project.status === "open" && !joined && (
                <button
                  onClick={() => joinCollaboration(project.id)}
                  className="w-full py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl text-sm font-medium hover:shadow-lg transition-all"
                >
                  Join this Collaboration 🤝
                </button>
              )}
              {joined && (
                <div className="w-full py-2.5 bg-emerald-50 text-emerald-700 rounded-xl text-sm font-medium text-center">
                  ✓ You've joined this project
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Call to Action */}
      <div className="bg-gray-50 rounded-xl border border-gray-100 p-6 text-center">
        <h3 className="font-bold text-gray-900 mb-2">💡 Have an Idea for a Collaboration?</h3>
        <p className="text-sm text-gray-500 mb-4">
          Propose your own collaboration project and find the perfect creative partners.
        </p>
        <button className="px-6 py-2.5 bg-gray-900 text-white rounded-xl text-sm font-medium hover:shadow-lg transition-all">
          Propose a Project
        </button>
      </div>
    </div>
  );
};

export default CollaborationZone;
