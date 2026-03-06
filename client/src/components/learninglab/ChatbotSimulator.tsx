import React, { useState, useRef, useEffect } from "react";
import { FiSend, FiTrash2, FiCpu, FiMessageCircle } from "react-icons/fi";
import { useLabContext } from "../../context/LearningLabContext";

interface Message {
  role: "user" | "bot" | "system";
  content: string;
  timestamp: string;
}

const knowledgeBases: Record<string, Record<string, string>> = {
  general: {
    hello: "Hello! I'm your AI assistant. I can help with coding, AI concepts, and development questions. What would you like to learn about?",
    help: "I can help you with:\n• AI and machine learning concepts\n• Coding best practices\n• Web development questions\n• Project architecture advice\n\nJust type your question!",
    react: "React is a JavaScript library for building user interfaces. Key concepts:\n\n• **Components** - Reusable UI building blocks\n• **JSX** - HTML-like syntax in JavaScript\n• **State** - Data that changes over time (useState)\n• **Props** - Data passed between components\n• **Effects** - Side effects like API calls (useEffect)\n\nWant to dive deeper into any of these?",
    api: "APIs (Application Programming Interfaces) let applications communicate:\n\n• **REST API** - Uses HTTP methods (GET, POST, PUT, DELETE)\n• **GraphQL** - Query language for flexible data fetching\n• **WebSocket** - Real-time bidirectional communication\n\nFor AI apps, you'll mainly work with REST APIs to call AI models.",
    ai: "Artificial Intelligence in web development:\n\n• **LLMs** - Large Language Models (GPT, Claude, Llama)\n• **Embeddings** - Convert text to numerical vectors\n• **RAG** - Retrieval-Augmented Generation\n• **Agents** - Autonomous AI systems with tool access\n• **Fine-tuning** - Customize models for your use case\n\nWhich area interests you most?",
    rag: "RAG (Retrieval-Augmented Generation) is a pattern that enhances AI responses with your own data:\n\n1. **Index** - Convert documents to embeddings\n2. **Retrieve** - Find relevant documents for a query\n3. **Augment** - Add retrieved context to the AI prompt\n4. **Generate** - AI generates answer using the context\n\nThis is how knowledge-based chatbots work!",
    agent: "AI Agents are autonomous systems that can:\n\n• **Plan** - Break tasks into steps\n• **Act** - Use tools (search, code, APIs)\n• **Observe** - Check results\n• **Iterate** - Adjust approach based on outcomes\n\nPopular frameworks: LangChain, CrewAI, AutoGen",
    database: "Popular databases for AI applications:\n\n• **PostgreSQL + pgvector** - Relational + vector search\n• **Pinecone** - Managed vector database\n• **ChromaDB** - Open-source embedding database\n• **MongoDB** - Flexible document storage\n• **Redis** - Caching and real-time data",
    deploy: "Deployment options for AI-powered apps:\n\n• **Vercel** - Great for Next.js + AI apps\n• **Railway** - Easy backend + database deployment\n• **Render** - Free tier, auto-deploy from Git\n• **AWS/GCP** - Enterprise-scale AI infrastructure\n• **Modal/Replicate** - AI model hosting specifically",
  },
  coding: {
    javascript: "JavaScript essentials for AI development:\n\n```js\n// Async/Await for API calls\nasync function callAI(prompt) {\n  const res = await fetch('/api/ai', {\n    method: 'POST',\n    body: JSON.stringify({ prompt })\n  });\n  return await res.json();\n}\n```\n\nKey concepts: Promises, async/await, fetch API, JSON handling",
    typescript: "TypeScript adds type safety to your AI apps:\n\n```ts\ninterface AIResponse {\n  text: string;\n  tokens: number;\n  model: string;\n}\n\nasync function generate(prompt: string): Promise<AIResponse> {\n  // Type-safe AI API call\n}\n```\n\nBenefits: Catch errors early, better IDE support, self-documenting code",
    function: "Functions are the building blocks of AI applications:\n\n• **Pure functions** - Same input always gives same output\n• **Async functions** - Handle API calls and I/O\n• **Higher-order functions** - Take/return other functions\n• **Closures** - Remember their scope context\n\nAI tool functions specifically need clear input/output contracts.",
    error: "Error handling for AI applications:\n\n• Always wrap API calls in try/catch\n• Implement retry logic with exponential backoff\n• Handle rate limits gracefully (429 status)\n• Provide fallback responses when AI is unavailable\n• Log errors for monitoring and debugging",
  },
};

interface ChatbotSimulatorProps {
  phaseId: number;
}

const ChatbotSimulator: React.FC<ChatbotSimulatorProps> = ({ phaseId }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "system",
      content: "🤖 AI Chatbot Simulator initialized. This simulates how knowledge-based AI chatbots work. Try asking about AI, coding, RAG, agents, or databases!",
      timestamp: new Date().toLocaleTimeString(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [kbMode, setKbMode] = useState<"general" | "coding">("general");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { addLearningTime } = useLabContext();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const findResponse = (query: string): string => {
    const lower = query.toLowerCase();
    const kb = knowledgeBases[kbMode];

    for (const [keyword, response] of Object.entries(kb)) {
      if (lower.includes(keyword)) return response;
    }

    // Check other knowledge base too
    const otherKb = kbMode === "general" ? knowledgeBases.coding : knowledgeBases.general;
    for (const [keyword, response] of Object.entries(otherKb)) {
      if (lower.includes(keyword)) return response;
    }

    return "That's a great question! In a production chatbot, this would be answered using RAG (Retrieval-Augmented Generation) — the chatbot would search its knowledge base for relevant documents and generate a contextual answer.\n\nTry asking about: AI, React, APIs, RAG, agents, databases, deployment, JavaScript, or TypeScript!";
  };

  const handleSend = () => {
    if (!input.trim() || isTyping) return;

    const userMessage: Message = {
      role: "user",
      content: input.trim(),
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI thinking delay
    setTimeout(() => {
      const response = findResponse(userMessage.content);
      const botMessage: Message = {
        role: "bot",
        content: response,
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
      addLearningTime(1);
    }, 800 + Math.random() * 1200);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const clearChat = () => {
    setMessages([
      {
        role: "system",
        content: "🤖 Chat cleared. Start a new conversation!",
        timestamp: new Date().toLocaleTimeString(),
      },
    ]);
  };

  const quickQuestions = [
    "What is RAG?",
    "Explain AI agents",
    "How do APIs work?",
    "Tell me about React",
  ];

  return (
    <div className="bg-slate-800 rounded-xl border border-slate-700 flex flex-col h-[500px]">
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b border-slate-700">
        <div className="flex items-center space-x-2">
          <FiCpu className="text-green-400" />
          <span className="text-white font-medium text-sm">AI Chatbot Simulator</span>
          <span className="text-xs text-slate-400">Phase {phaseId}</span>
        </div>
        <div className="flex items-center space-x-2">
          <select
            value={kbMode}
            onChange={(e) => setKbMode(e.target.value as "general" | "coding")}
            className="bg-slate-700 text-slate-300 text-xs rounded px-2 py-1 border border-slate-600"
          >
            <option value="general">General KB</option>
            <option value="coding">Coding KB</option>
          </select>
          <button onClick={clearChat} className="text-slate-400 hover:text-red-400 transition-colors" title="Clear chat">
            <FiTrash2 size={14} />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[80%] rounded-lg px-3 py-2 text-sm ${
                msg.role === "user"
                  ? "bg-indigo-600 text-white"
                  : msg.role === "system"
                  ? "bg-slate-700/50 text-slate-400 text-xs italic"
                  : "bg-slate-700 text-slate-200"
              }`}
            >
              {msg.role === "bot" && (
                <div className="flex items-center space-x-1 mb-1">
                  <FiCpu className="text-green-400" size={10} />
                  <span className="text-green-400 text-xs font-medium">AI Bot</span>
                  <span className="text-slate-500 text-xs">{msg.timestamp}</span>
                </div>
              )}
              <div className="whitespace-pre-wrap">{msg.content}</div>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-slate-700 rounded-lg px-3 py-2 text-sm text-slate-400">
              <span className="animate-pulse">● ● ●</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick questions */}
      <div className="px-3 pb-2 flex flex-wrap gap-1">
        {quickQuestions.map((q) => (
          <button
            key={q}
            onClick={() => {
              setInput(q);
              setTimeout(() => {
                setInput(q);
                handleSend();
              }, 100);
            }}
            className="text-xs bg-slate-700 text-slate-300 px-2 py-1 rounded-full hover:bg-slate-600 transition-colors"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Input */}
      <div className="p-3 border-t border-slate-700 flex space-x-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask the AI chatbot..."
          className="flex-1 bg-slate-700 text-white text-sm rounded-lg px-3 py-2 border border-slate-600 focus:border-indigo-500 focus:outline-none"
          disabled={isTyping}
        />
        <button
          onClick={handleSend}
          disabled={!input.trim() || isTyping}
          className="bg-indigo-600 text-white px-3 py-2 rounded-lg hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <FiSend size={14} />
        </button>
      </div>
    </div>
  );
};

export default ChatbotSimulator;
