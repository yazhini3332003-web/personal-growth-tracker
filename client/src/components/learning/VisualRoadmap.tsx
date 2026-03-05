import React from "react";
import { roadmapStages } from "../../data/learningData";
import { useLearning } from "../../context/LearningContext";

interface Props {
  onSelectStage: (stageId: number) => void;
  selectedStage: number | null;
}

const VisualRoadmap: React.FC<Props> = ({ onSelectStage, selectedStage }) => {
  const { getStageCompletion, getOverallCompletion } = useLearning();
  const overall = getOverallCompletion();

  return (
    <div className="space-y-6">
      {/* Overall Progress */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-bold">Overall Roadmap Progress</h3>
          <span className="text-2xl font-bold">{overall}%</span>
        </div>
        <div className="w-full bg-white/20 rounded-full h-3">
          <div
            className="bg-white rounded-full h-3 transition-all duration-700"
            style={{ width: `${overall}%` }}
          />
        </div>
        <p className="text-indigo-100 text-sm mt-2">
          {overall === 0 ? "Start your journey! Click any stage to begin." : 
           overall < 30 ? "Great start! Keep learning every day." :
           overall < 60 ? "Making great progress! You're on track." :
           overall < 90 ? "Almost there! You're becoming an AI developer." :
           "Congratulations! You've mastered the roadmap! 🎉"}
        </p>
      </div>

      {/* Roadmap Timeline */}
      <div className="relative">
        {/* Connection Line */}
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 via-purple-500 to-teal-500 transform -translate-x-1/2 rounded-full" />
        
        <div className="space-y-4 md:space-y-8">
          {roadmapStages.map((stage, index) => {
            const completion = getStageCompletion(stage.id);
            const isSelected = selectedStage === stage.id;
            const isEven = index % 2 === 0;

            return (
              <div
                key={stage.id}
                className={`relative flex items-center ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                {/* Content Card */}
                <div className={`w-full md:w-5/12 ${isEven ? 'md:pr-8 md:text-right' : 'md:pl-8'}`}>
                  <button
                    onClick={() => onSelectStage(stage.id)}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
                      isSelected
                        ? "border-current shadow-lg ring-2 ring-offset-2"
                        : completion === 100
                        ? "border-green-300 bg-green-50"
                        : "border-gray-200 bg-white hover:border-gray-300"
                    }`}
                    style={isSelected ? { borderColor: stage.color, boxShadow: `0 4px 14px ${stage.color}30` } : {}}
                  >
                    <div className={`flex items-center gap-3 ${isEven ? 'md:flex-row-reverse' : ''}`}>
                      <span className="text-2xl">{stage.icon}</span>
                      <div className={`flex-1 ${isEven ? 'md:text-right' : ''}`}>
                        <h3 className="font-bold text-gray-800">{stage.title}</h3>
                        <p className="text-sm text-gray-500 mt-0.5">Stage {stage.id} of 8</p>
                      </div>
                      {completion === 100 && (
                        <span className="text-green-500 text-xl">✅</span>
                      )}
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="mt-3">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-500">{completion}% complete</span>
                        <span className="text-gray-400">{stage.topics.length} topics</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2">
                        <div
                          className="h-2 rounded-full transition-all duration-500"
                          style={{ width: `${completion}%`, backgroundColor: stage.color }}
                        />
                      </div>
                    </div>
                  </button>
                </div>

                {/* Center Node */}
                <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 items-center justify-center">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg border-4 border-white shadow-lg transition-all duration-300 ${
                      isSelected ? "scale-125" : ""
                    }`}
                    style={{ backgroundColor: completion === 100 ? "#10B981" : stage.color }}
                  >
                    {completion === 100 ? "✓" : stage.id}
                  </div>
                </div>

                {/* Spacer for other side */}
                <div className="hidden md:block w-5/12" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default VisualRoadmap;
