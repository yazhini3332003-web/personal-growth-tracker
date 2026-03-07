import React from "react";
import { whyLearnBlender, industryApplications } from "../../data/blenderLabData";

const WhyLearnBlender: React.FC = () => {
  return (
    <div className="space-y-10">
      {/* Why Learn Blender */}
      <div>
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">🎯 Why Learn Blender?</h2>
          <p className="text-gray-500 text-sm max-w-2xl mx-auto">
            Blender is the world's most powerful free 3D creation tool. It's used by everyone
            from indie artists to major studios. Here's why you should learn it.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {whyLearnBlender.map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-gray-200 p-6 hover:border-orange-200 transition-all hover:shadow-lg group"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <h3 className="text-gray-900 font-semibold">{item.title}</h3>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed mb-4">{item.description}</p>
              <div>
                <h4 className="text-orange-600 text-xs font-semibold mb-2">Career Paths:</h4>
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
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">🏭 Industry Applications</h2>
          <p className="text-gray-500 text-sm max-w-2xl mx-auto">
            Blender is used across many industries. Here's where your skills will be valuable.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {industryApplications.map((app, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-gray-200 p-6 hover:border-blue-200 transition-all hover:shadow-lg group"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                  {app.icon}
                </div>
                <h3 className="text-gray-900 font-semibold">{app.industry}</h3>
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
