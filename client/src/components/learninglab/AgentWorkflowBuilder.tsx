import React, { useState, useCallback } from "react";
import { FiPlay, FiPlus, FiTrash2, FiArrowRight, FiSettings, FiCheckCircle } from "react-icons/fi";
import { useLabContext } from "../../context/LearningLabContext";

interface AgentTool {
  id: string;
  name: string;
  description: string;
  icon: string;
}

interface WorkflowStep {
  id: string;
  toolId: string;
  input: string;
  output: string;
  status: "pending" | "running" | "done" | "error";
}

const availableTools: AgentTool[] = [
  { id: "search", name: "Web Search", description: "Search the web for information", icon: "🔍" },
  { id: "code", name: "Code Runner", description: "Execute JavaScript code", icon: "💻" },
  { id: "summarize", name: "Summarizer", description: "Summarize text content", icon: "📝" },
  { id: "analyze", name: "Data Analyzer", description: "Analyze and extract data patterns", icon: "📊" },
  { id: "transform", name: "Transformer", description: "Transform data format", icon: "🔄" },
  { id: "validate", name: "Validator", description: "Validate data or code", icon: "✅" },
];

const toolSimulations: Record<string, (input: string) => string> = {
  search: (input) => {
    const topics: Record<string, string> = {
      react: "React 19: New features include Actions, use() hook, form handling improvements, and Server Components.",
      ai: "Latest AI trends: Multi-modal models, AI agents, local LLMs, and RAG systems are leading 2026 development.",
      typescript: "TypeScript 5.4: Features pattern matching, improved inference, and faster compilation.",
      default: `Search results for "${input}":\n1. "${input}" - comprehensive guide (docs.example.com)\n2. Best practices for ${input} (blog.example.com)\n3. ${input} tutorial for beginners (tutorial.example.com)`,
    };
    const key = Object.keys(topics).find((k) => input.toLowerCase().includes(k));
    return topics[key || "default"];
  },
  code: (input) => {
    try {
      if (input.includes("fibonacci")) return "fibonacci(10) = 55\nExecution time: 0.02ms";
      if (input.includes("sort")) return "[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]\nSorted in ascending order";
      if (input.includes("fetch") || input.includes("api")) return '{ "status": 200, "data": { "message": "API call successful" } }';
      return `Code executed successfully.\nOutput: ${input.slice(0, 100)}`;
    } catch {
      return "Error: Could not execute code";
    }
  },
  summarize: (input) => {
    const words = input.split(/\s+/);
    if (words.length <= 10) return `Summary: ${input}`;
    return `Summary (${words.length} words → ${Math.ceil(words.length / 3)} words):\n${words.slice(0, Math.ceil(words.length / 3)).join(" ")}...`;
  },
  analyze: (input) => {
    const words = input.split(/\s+/);
    const chars = input.length;
    const sentences = input.split(/[.!?]+/).filter((s) => s.trim()).length;
    return `Analysis:\n• Words: ${words.length}\n• Characters: ${chars}\n• Sentences: ${sentences}\n• Avg word length: ${(chars / words.length).toFixed(1)}\n• Reading time: ~${Math.ceil(words.length / 200)} min`;
  },
  transform: (input) => {
    try {
      const data = JSON.parse(input);
      return `Transformed:\n${JSON.stringify(data, null, 2)}`;
    } catch {
      return `Transformed:\n• Original: "${input}"\n• Uppercase: "${input.toUpperCase()}"\n• Words: [${input.split(/\s+/).map((w) => `"${w}"`).join(", ")}]`;
    }
  },
  validate: (input) => {
    const checks = [];
    if (input.length > 0) checks.push("✅ Non-empty input");
    if (input.length < 1000) checks.push("✅ Within size limits");
    if (!/[<>{}]/.test(input)) checks.push("✅ No suspicious characters");
    else checks.push("⚠️ Contains special characters");
    if (input.trim() === input) checks.push("✅ No leading/trailing whitespace");
    else checks.push("⚠️ Has extra whitespace");
    return `Validation Results:\n${checks.join("\n")}`;
  },
};

interface AgentWorkflowBuilderProps {
  phaseId: number;
}

const AgentWorkflowBuilder: React.FC<AgentWorkflowBuilderProps> = ({ phaseId }) => {
  const [steps, setSteps] = useState<WorkflowStep[]>([
    { id: "step-1", toolId: "search", input: "Latest AI development trends", output: "", status: "pending" },
    { id: "step-2", toolId: "summarize", input: "", output: "", status: "pending" },
  ]);
  const [isRunning, setIsRunning] = useState(false);
  const [agentLog, setAgentLog] = useState<string[]>([]);
  const { addLearningTime } = useLabContext();

  const addStep = () => {
    const newStep: WorkflowStep = {
      id: `step-${Date.now()}`,
      toolId: "search",
      input: "",
      output: "",
      status: "pending",
    };
    setSteps((prev) => [...prev, newStep]);
  };

  const removeStep = (id: string) => {
    setSteps((prev) => prev.filter((s) => s.id !== id));
  };

  const updateStep = (id: string, updates: Partial<WorkflowStep>) => {
    setSteps((prev) => prev.map((s) => (s.id === id ? { ...s, ...updates } : s)));
  };

  const runWorkflow = useCallback(async () => {
    if (isRunning) return;
    setIsRunning(true);
    setAgentLog(["🤖 Agent: Starting workflow execution..."]);

    let previousOutput = "";

    for (let i = 0; i < steps.length; i++) {
      const step = steps[i];

      // Mark step as running
      setSteps((prev) => prev.map((s, idx) => (idx === i ? { ...s, status: "running" } : s)));
      setAgentLog((prev) => [...prev, `\n🔄 Step ${i + 1}: Running ${availableTools.find((t) => t.id === step.toolId)?.name}...`]);

      // Wait for simulation
      await new Promise((r) => setTimeout(r, 800 + Math.random() * 700));

      // Use previous output as input if current input is empty
      const input = step.input || previousOutput || "No input provided";
      const simulate = toolSimulations[step.toolId];
      const output = simulate ? simulate(input) : "Tool not found";

      previousOutput = output;

      // Mark step as done
      setSteps((prev) =>
        prev.map((s, idx) => (idx === i ? { ...s, output, status: "done", input: step.input || `[From Step ${i}] ${previousOutput.slice(0, 50)}...` } : s))
      );
      setAgentLog((prev) => [...prev, `✅ Step ${i + 1}: Complete\n   Output: ${output.slice(0, 80)}...`]);
    }

    setAgentLog((prev) => [...prev, "\n🎉 Workflow complete!"]);
    setIsRunning(false);
    addLearningTime(2);
  }, [steps, isRunning, addLearningTime]);

  const resetWorkflow = () => {
    setSteps((prev) => prev.map((s) => ({ ...s, output: "", status: "pending" as const })));
    setAgentLog([]);
  };

  const loadTemplate = (template: string) => {
    const templates: Record<string, WorkflowStep[]> = {
      research: [
        { id: "t1", toolId: "search", input: "AI agent frameworks 2026", output: "", status: "pending" },
        { id: "t2", toolId: "summarize", input: "", output: "", status: "pending" },
        { id: "t3", toolId: "analyze", input: "", output: "", status: "pending" },
      ],
      validate: [
        { id: "t1", toolId: "code", input: "function fibonacci(n) { return n <= 1 ? n : fibonacci(n-1) + fibonacci(n-2); }", output: "", status: "pending" },
        { id: "t2", toolId: "validate", input: "", output: "", status: "pending" },
        { id: "t3", toolId: "summarize", input: "", output: "", status: "pending" },
      ],
      dataflow: [
        { id: "t1", toolId: "search", input: "React best practices", output: "", status: "pending" },
        { id: "t2", toolId: "transform", input: "", output: "", status: "pending" },
        { id: "t3", toolId: "validate", input: "", output: "", status: "pending" },
        { id: "t4", toolId: "summarize", input: "", output: "", status: "pending" },
      ],
    };
    if (templates[template]) {
      setSteps(templates[template]);
      setAgentLog([]);
    }
  };

  return (
    <div className="bg-gray-100 rounded-xl border border-gray-200">
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <span className="text-blue-500 text-sm font-medium">🤖 Agent Workflow Builder</span>
          <span className="text-xs text-gray-500">Phase {phaseId}</span>
        </div>
        <div className="flex items-center space-x-2">
          <button onClick={resetWorkflow} className="text-gray-500 hover:text-gray-900 text-xs transition-colors">Reset</button>
          <button
            onClick={runWorkflow}
            disabled={isRunning || steps.length === 0}
            className="bg-blue-500 text-gray-900 text-xs px-3 py-1 rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-1"
          >
            <FiPlay size={10} />
            <span>{isRunning ? "Running..." : "Run Workflow"}</span>
          </button>
        </div>
      </div>

      {/* Templates */}
      <div className="p-3 border-b border-gray-200 flex flex-wrap gap-1">
        <span className="text-gray-500 text-xs mr-2">Templates:</span>
        {[
          { id: "research", label: "🔍 Research Agent" },
          { id: "validate", label: "✅ Code Validator" },
          { id: "dataflow", label: "🔄 Data Pipeline" },
        ].map((t) => (
          <button key={t.id} onClick={() => loadTemplate(t.id)} className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded hover:bg-gray-200 transition-colors">
            {t.label}
          </button>
        ))}
      </div>

      {/* Workflow Steps */}
      <div className="p-3 space-y-3">
        {steps.map((step, i) => {
          const tool = availableTools.find((t) => t.id === step.toolId);
          return (
            <div key={step.id}>
              <div
                className={`border rounded-lg p-3 ${
                  step.status === "running"
                    ? "border-yellow-500 bg-yellow-500/5"
                    : step.status === "done"
                    ? "border-green-500/50 bg-green-500/5"
                    : step.status === "error"
                    ? "border-red-500/50 bg-red-500/5"
                    : "border-gray-300"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-gray-500">Step {i + 1}</span>
                    {step.status === "running" && <span className="text-yellow-400 text-xs animate-pulse">Running...</span>}
                    {step.status === "done" && <FiCheckCircle className="text-green-400" size={12} />}
                  </div>
                  <button onClick={() => removeStep(step.id)} className="text-gray-500 hover:text-blue-500 transition-colors" disabled={isRunning}>
                    <FiTrash2 size={12} />
                  </button>
                </div>

                <div className="flex flex-col sm:flex-row gap-2 mb-2">
                  <select
                    value={step.toolId}
                    onChange={(e) => updateStep(step.id, { toolId: e.target.value })}
                    className="bg-gray-200 text-gray-900 text-xs rounded px-2 py-1.5 border border-gray-300 sm:w-40"
                    disabled={isRunning}
                  >
                    {availableTools.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.icon} {t.name}
                      </option>
                    ))}
                  </select>
                  <input
                    type="text"
                    value={step.input}
                    onChange={(e) => updateStep(step.id, { input: e.target.value })}
                    placeholder={i === 0 ? "Enter input..." : "Leave empty to use previous output"}
                    className="flex-1 bg-gray-200 text-gray-900 text-xs rounded px-3 py-1.5 border border-gray-300 focus:border-blue-500 focus:outline-none"
                    disabled={isRunning}
                  />
                </div>

                {step.output && (
                  <div className="bg-white rounded p-2 text-xs text-gray-700 font-mono whitespace-pre-wrap max-h-32 overflow-y-auto mt-2">
                    {step.output}
                  </div>
                )}
              </div>

              {i < steps.length - 1 && (
                <div className="flex justify-center py-1">
                  <FiArrowRight className="text-gray-500" size={16} />
                </div>
              )}
            </div>
          );
        })}

        <button
          onClick={addStep}
          disabled={isRunning}
          className="w-full border border-dashed border-gray-300 rounded-lg py-2 text-gray-500 hover:text-gray-900 hover:border-gray-400 transition-colors flex items-center justify-center space-x-1 text-xs"
        >
          <FiPlus size={12} />
          <span>Add Step</span>
        </button>
      </div>

      {/* Agent Log */}
      {agentLog.length > 0 && (
        <div className="border-t border-gray-200 p-3">
          <div className="flex items-center space-x-2 mb-2">
            <FiSettings className="text-gray-500" size={12} />
            <span className="text-gray-500 text-xs font-medium">Agent Log</span>
          </div>
          <div className="bg-white rounded p-3 max-h-40 overflow-y-auto">
            {agentLog.map((log, i) => (
              <div key={i} className="text-xs text-gray-700 font-mono">
                {log}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AgentWorkflowBuilder;
