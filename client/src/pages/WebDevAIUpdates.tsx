import React, { useState } from "react";

const phases = [
  {
    title: "Phase 1: Master AI as Your Daily Copilot",
    content: (
      <>
        <p className="text-slate-600 mb-4">
          Developers should begin by integrating AI assistants into their
          everyday workflow. AI tools can help with research, debugging,
          documentation, and code explanation.
        </p>
        <p className="text-slate-700 font-medium mb-2">
          Popular AI assistants include:
        </p>
        <ul className="list-disc list-inside text-slate-600 space-y-1 ml-2">
          <li>ChatGPT</li>
          <li>Claude</li>
          <li>Perplexity AI</li>
          <li>Google Gemini</li>
          <li>Microsoft Copilot</li>
        </ul>
        <p className="text-slate-600 mt-4">
          The main objective is to learn prompt engineering and understand how AI
          can assist with problem solving and development tasks.
        </p>
      </>
    ),
  },
  {
    title: "Phase 2: Integrate AI into Your Development Environment",
    content: (
      <>
        <p className="text-slate-600 mb-4">
          After learning basic AI usage, developers should integrate AI directly
          into their coding environment.
        </p>
        <p className="text-slate-700 font-medium mb-2">
          Examples of AI coding tools include:
        </p>
        <ul className="list-disc list-inside text-slate-600 space-y-1 ml-2">
          <li>Cursor AI Editor</li>
          <li>GitHub Copilot</li>
          <li>Codeium</li>
          <li>Tabnine</li>
          <li>Continue.dev</li>
        </ul>
        <p className="text-slate-600 mt-4">
          These tools assist developers by generating code suggestions, debugging
          problems, and improving development speed.
        </p>
      </>
    ),
  },
  {
    title: "Phase 3: Learn AI Integration Fundamentals",
    content: (
      <>
        <p className="text-slate-600 mb-4">
          Developers should learn how applications interact with AI systems.
        </p>
        <p className="text-slate-700 font-medium mb-2">
          Important concepts include:
        </p>
        <ul className="list-disc list-inside text-slate-600 space-y-1 ml-2">
          <li>AI API integration</li>
          <li>Prompt engineering techniques</li>
          <li>Tool calling and automation</li>
          <li>Connecting AI with external data sources</li>
        </ul>
        <p className="text-slate-600 mt-4">
          Frameworks like LangChain help developers build AI-powered applications
          more easily.
        </p>
      </>
    ),
  },
  {
    title: "Phase 4: Build Knowledge-Based AI Systems",
    content: (
      <>
        <p className="text-slate-600 mb-4">
          Developers can create intelligent systems that answer questions using
          custom data.
        </p>
        <p className="text-slate-700 font-medium mb-2">Key concepts include:</p>
        <ul className="list-disc list-inside text-slate-600 space-y-1 ml-2">
          <li>Retrieval Augmented Generation (RAG)</li>
          <li>Embeddings and vector search</li>
          <li>Semantic search</li>
          <li>Document chunking</li>
        </ul>
        <p className="text-slate-700 font-medium mt-4 mb-2">
          Vector databases used in AI applications include:
        </p>
        <ul className="list-disc list-inside text-slate-600 space-y-1 ml-2">
          <li>Pinecone</li>
          <li>Weaviate</li>
          <li>Qdrant</li>
          <li>Chroma</li>
        </ul>
        <p className="text-slate-600 mt-4">
          These technologies allow developers to build AI systems that understand
          and retrieve information efficiently.
        </p>
      </>
    ),
  },
  {
    title: "Phase 5: Run AI Models Locally",
    content: (
      <>
        <p className="text-slate-600 mb-4">
          Developers should also learn how to run AI models locally instead of
          relying only on cloud services.
        </p>
        <p className="text-slate-700 font-medium mb-2">
          Popular local AI tools include:
        </p>
        <ul className="list-disc list-inside text-slate-600 space-y-1 ml-2">
          <li>Ollama</li>
          <li>LM Studio</li>
          <li>Jan.ai</li>
        </ul>
        <p className="text-slate-600 mt-4">
          Local deployment helps developers understand model performance, privacy
          considerations, and system optimization.
        </p>
      </>
    ),
  },
  {
    title: "Phase 6: Build AI Agents",
    content: (
      <>
        <p className="text-slate-600 mb-4">
          The next stage of development involves creating autonomous AI agents
          that can perform complex tasks.
        </p>
        <p className="text-slate-700 font-medium mb-2">AI agents can:</p>
        <ul className="list-disc list-inside text-slate-600 space-y-1 ml-2">
          <li>Generate code</li>
          <li>Analyze data</li>
          <li>Automate workflows</li>
          <li>Create marketing content</li>
          <li>Assist in customer support</li>
        </ul>
        <p className="text-slate-700 font-medium mt-4 mb-2">
          Agent frameworks include:
        </p>
        <ul className="list-disc list-inside text-slate-600 space-y-1 ml-2">
          <li>LangGraph</li>
          <li>CrewAI</li>
          <li>AutoGen</li>
          <li>Semantic Kernel</li>
        </ul>
        <p className="text-slate-600 mt-4">
          AI agents represent one of the fastest-growing opportunities in the AI
          industry.
        </p>
      </>
    ),
  },
  {
    title: "Phase 7: No-Code and Low-Code AI Builders",
    content: (
      <>
        <p className="text-slate-600 mb-4">
          Developers can also use visual AI platforms to quickly prototype
          applications.
        </p>
        <p className="text-slate-700 font-medium mb-2">Examples include:</p>
        <ul className="list-disc list-inside text-slate-600 space-y-1 ml-2">
          <li>Replit</li>
          <li>Lovable</li>
          <li>Bolt.new</li>
          <li>v0.dev</li>
        </ul>
        <p className="text-slate-600 mt-4">
          These tools allow developers to rapidly build applications and test new
          ideas.
        </p>
      </>
    ),
  },
  {
    title: "Phase 8: Understand AI Challenges",
    content: (
      <>
        <p className="text-slate-600 mb-4">
          Developers must also understand AI limitations.
        </p>
        <p className="text-slate-700 font-medium mb-2">
          Key challenges include:
        </p>
        <ul className="list-disc list-inside text-slate-600 space-y-1 ml-2">
          <li>Context window limitations</li>
          <li>AI hallucinations</li>
          <li>Security risks such as prompt injection</li>
          <li>Reliability issues</li>
          <li>Cost optimization</li>
        </ul>
        <p className="text-slate-600 mt-4">
          Understanding these problems helps developers design safer and more
          reliable AI systems.
        </p>
      </>
    ),
  },
];

const WebDevAIUpdates: React.FC = () => {
  const [expandedPhase, setExpandedPhase] = useState<number | null>(0);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">
          Web Developer AI Updates
        </h1>
        <p className="text-slate-500 mt-1">
          How AI is transforming software development \u2014 a structured roadmap for
          developers
        </p>
      </div>

      {/* Introduction */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-6 text-white">
        <h2 className="text-xl font-bold mb-3">Introduction</h2>
        <p className="text-primary-100 leading-relaxed">
          The Web Developer AI Updates section helps developers understand how
          artificial intelligence is transforming software development. It
          provides a structured roadmap showing how developers can integrate AI
          into their workflow, increase productivity, and stay competitive in the
          evolving technology industry.
        </p>
        <p className="text-primary-100 leading-relaxed mt-3">
          This section focuses on practical tools, modern development workflows,
          and long-term learning strategies for developers who want to work
          effectively with AI technologies.
        </p>
      </div>

      {/* Phases Accordion */}
      <div className="space-y-3">
        {phases.map((phase, index) => (
          <div
            key={index}
            className="bg-white rounded-xl border border-slate-200/60 shadow-sm overflow-hidden"
          >
            <button
              onClick={() =>
                setExpandedPhase(expandedPhase === index ? null : index)
              }
              className="w-full flex items-center justify-between p-5 text-left hover:bg-slate-50 transition"
            >
              <div className="flex items-center gap-3">
                <span className="flex-shrink-0 w-8 h-8 bg-primary-100 text-primary-700 rounded-lg flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </span>
                <h3 className="font-semibold text-slate-900">{phase.title}</h3>
              </div>
              <svg
                className={`w-5 h-5 text-slate-400 transition-transform ${
                  expandedPhase === index ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {expandedPhase === index && (
              <div className="px-5 pb-5 pt-0 border-t border-slate-50">
                <div className="pt-4">{phase.content}</div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Continuous Learning */}
      <div className="bg-white rounded-xl border border-slate-200/60 p-6 shadow-sm">
        <h3 className="text-xl font-bold text-slate-900 mb-3">
          Continuous Learning
        </h3>
        <p className="text-slate-600 leading-relaxed">
          Developers should maintain a habit of learning daily by reading AI
          research papers, technology blogs, and industry news.
        </p>
        <p className="text-slate-600 leading-relaxed mt-2">
          Following AI researchers and industry leaders helps developers stay
          updated with the latest advancements.
        </p>
      </div>

      {/* Core Programming Foundations */}
      <div className="bg-white rounded-xl border border-slate-200/60 p-6 shadow-sm">
        <h3 className="text-xl font-bold text-slate-900 mb-3">
          Core Programming Foundations
        </h3>
        <p className="text-slate-600 mb-4">
          Even with AI tools, strong fundamentals remain essential. Developers
          should maintain skills in:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            "Programming languages",
            "Databases and SQL",
            "System architecture",
            "Linux environments",
            "Software engineering principles",
          ].map((skill) => (
            <div
              key={skill}
              className="flex items-center gap-2 bg-primary-50 rounded-lg px-4 py-3"
            >
              <div className="w-2 h-2 bg-primary-500 rounded-full" />
              <span className="text-slate-700 text-sm font-medium">{skill}</span>
            </div>
          ))}
        </div>
        <p className="text-slate-500 text-sm mt-4 italic">
          AI enhances productivity but cannot replace strong technical knowledge.
        </p>
      </div>
    </div>
  );
};

export default WebDevAIUpdates;
