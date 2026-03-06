import React, { useState, useRef, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useGoalContext } from "../context/GoalContext";
import {
  platformPages,
  contextSuggestions,
  navigationIntents,
  smartActions,
  motivationalQuotes,
  learningRecommendations,
  type PageInfo,
} from "../data/copilotKnowledge";

/* ═══════════════════════════════════════════════════════════════
   Types
   ═══════════════════════════════════════════════════════════════ */
interface Message {
  id: string;
  role: "user" | "assistant";
  text: string;
  actions?: ActionButton[];
  timestamp: Date;
}

interface ActionButton {
  label: string;
  path?: string;
  onClick?: () => void;
}

/* ═══════════════════════════════════════════════════════════════
   Helpers
   ═══════════════════════════════════════════════════════════════ */
const uid = () => Math.random().toString(36).slice(2, 10);

const randomQuote = () =>
  motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];

const getCurrentPageInfo = (pathname: string): PageInfo | undefined =>
  platformPages.find((p) => p.path === pathname);

const matchPage = (query: string): PageInfo | undefined => {
  const q = query.toLowerCase();
  return platformPages.find(
    (p) =>
      q.includes(p.name.toLowerCase()) ||
      p.features.some((f) => q.includes(f.toLowerCase().slice(0, 25)))
  );
};

const matchNavigation = (
  query: string
): { path: string; label: string } | undefined => {
  const q = query.toLowerCase();
  for (const intent of navigationIntents) {
    if (intent.keywords.some((k) => q.includes(k))) {
      return { path: intent.path, label: intent.label };
    }
  }
  return undefined;
};

/* ═══════════════════════════════════════════════════════════════
   Response generator — the "brain" of the copilot
   ═══════════════════════════════════════════════════════════════ */
function generateResponse(
  query: string,
  pathname: string,
  goalName: string | null
): { text: string; actions?: ActionButton[] } {
  const q = query.toLowerCase().trim();
  const currentPage = getCurrentPageInfo(pathname);

  /* ── greetings ─────────────────────────────────────────────── */
  if (/^(hi|hey|hello|yo|sup|what's up|hola|hii+)/.test(q)) {
    const page = currentPage ? currentPage.name : "the platform";
    const goalLine = goalName
      ? ` You're currently working on **"${goalName}"** — let's crush it! 💪`
      : "";
    return {
      text: `Hey there! 👋 Welcome to your AI Growth Copilot! I'm here to help you navigate, learn, and grow. You're currently on **${page}**.${goalLine}\n\nAsk me anything — how a feature works, where to go next, or just say "motivate me" 😄`,
    };
  }

  /* ── motivation ────────────────────────────────────────────── */
  if (/motivat|inspire|encourage|pump me|boost|uplift|cheer/.test(q)) {
    return {
      text: `Here's something for you:\n\n> ${randomQuote()}\n\n${goalName ? `Keep pushing on **"${goalName}"** — you've got this! 🙌` : "Set a goal and start your journey. Every step counts! 🎯"}`,
    };
  }

  /* ── what can you do ──────────────────────────────────────── */
  if (/what can you do|help me|what do you know|your feature|capabilities/.test(q)) {
    return {
      text: `I'm your **AI Growth Copilot** — here's what I can do:\n\n🧠 **Answer questions** about any section of the platform\n🧭 **Navigate** you to any page — just say "take me to" or "go to"\n💡 **Smart suggestions** based on where you are\n📊 **Explain features** — dashboards, analytics, learning lab, everything\n🎯 **Track your goals** — I know your active goal and can give tips\n🛠️ **Recommend tools** — AI tools, learning resources, best practices\n🔥 **Motivate you** — ask for a boost anytime!\n📚 **Learning guidance** — help you navigate the AI learning journey\n\nJust ask me anything! 💬`,
    };
  }

  /* ── navigation intent ────────────────────────────────────── */
  if (/go to|take me|navigate|open|show me|visit|switch to|jump to/.test(q)) {
    const nav = matchNavigation(q);
    if (nav) {
      return {
        text: `Sure! Let me take you to **${nav.label}**. Click below 👇`,
        actions: [{ label: `🚀 Go to ${nav.label}`, path: nav.path }],
      };
    }
    return {
      text: `I'm not sure which page you mean. Here are all the sections you can visit:`,
      actions: platformPages.map((p) => ({
        label: `${p.name}`,
        path: p.path,
      })),
    };
  }

  /* ── "where am I" / current page ──────────────────────────── */
  if (/where am i|current page|what page|which page|what section/.test(q)) {
    if (currentPage) {
      return {
        text: `You're on **${currentPage.name}**! 📍\n\n${currentPage.description}\n\n**Key features:** ${currentPage.features.join(", ")}`,
      };
    }
    return { text: "Hmm, I'm not sure what page you're on. Try navigating from the sidebar!" };
  }

  /* ── how to use / how does X work ─────────────────────────── */
  if (/how (to|do|does|can)|explain|what (is|are|does)|tell me about|describe/.test(q)) {
    // Check if asking about a specific page
    const page = matchPage(q);
    if (page) {
      const howTo = page.howToUse.map((h, i) => `${i + 1}. ${h}`).join("\n");
      const tips = page.tips.map((t) => `• ${t}`).join("\n");
      return {
        text: `## ${page.name}\n\n${page.description}\n\n**How to use it:**\n${howTo}\n\n**Pro tips:**\n${tips}`,
        actions: [{ label: `Go to ${page.name}`, path: page.path }],
      };
    }

    // Check for specific question topics
    if (/point|score|earn/.test(q)) {
      return {
        text: `**Points System 🏆**\n\nEach task you create has a point value. When you complete tasks and log them in the **Daily Tracker**, you earn those points. Your total points contribute to your active goal's progress.\n\n**How to maximize points:**\n1. Create tasks with varying point values (2-15 pts)\n2. Log your progress daily in the Daily Tracker\n3. Check the Dashboard to see your total and daily averages\n4. Aim for consistency — daily streaks matter more than big bursts!`,
        actions: [
          { label: "📝 Go to Tasks", path: "/tasks" },
          { label: "📋 Open Tracker", path: "/tracker" },
        ],
      };
    }

    if (/streak|consistent|consistency/.test(q)) {
      return {
        text: `**Streaks 🔥**\n\nYour streak counts consecutive days you've logged progress. The longer your streak, the better your habits are forming!\n\n**Tips for maintaining streaks:**\n• Log at least one task per day\n• Set a daily reminder\n• Even small progress counts — 1 task is better than 0\n• Check your streak in Analytics`,
        actions: [{ label: "📊 Check Analytics", path: "/analytics" }],
      };
    }

    if (/phase|learning lab|lab phase|exercise/.test(q)) {
      return {
        text: `**Learning Lab Phases 🧪**\n\nThe Learning Lab has **8 structured phases** that take you from AI basics to building advanced AI agents:\n\n1. **Master AI as Your Daily Copilot** — Start here!\n2. **Prompt Engineering** — Learn to talk to AI effectively\n3. **AI-Powered Web Development** — Build with AI tools\n4. **AI APIs & Integration** — Connect to AI services\n5. **Voice & Multimodal AI** — Beyond text\n6. **AI Agents & Automation** — Build autonomous systems\n7. **Full-Stack AI Apps** — End-to-end AI applications\n8. **Deploy & Scale** — Ship your AI products\n\nEach phase has exercises, a mini project, resources, and a code editor!`,
        actions: [{ label: "🧪 Open Learning Lab", path: "/learning-lab" }],
      };
    }

    // Default: use current page context
    if (currentPage) {
      const howTo = currentPage.howToUse.map((h, i) => `${i + 1}. ${h}`).join("\n");
      return {
        text: `Here's how **${currentPage.name}** works:\n\n${currentPage.description}\n\n**Steps:**\n${howTo}`,
      };
    }

    return {
      text: `Great question! Could you be more specific? I know about: **${platformPages.map((p) => p.name).join(", ")}**. Ask me about any of these!`,
    };
  }

  /* ── recommend / suggest / what should I ──────────────────── */
  if (/recommend|suggest|what should|next step|what to do|where to start|getting started|begin/.test(q)) {
    if (/tool|ai tool|software|app/.test(q)) {
      const recs = learningRecommendations
        .map((r) => `• **${r.tool}** — ${r.description}`)
        .join("\n");
      return {
        text: `**Recommended AI Tools 🛠️**\n\n${recs}\n\nStart with ChatGPT if you're new, then add Copilot for coding!`,
      };
    }

    if (/learn|study|course|education/.test(q)) {
      return {
        text: `**Your Learning Path 📚**\n\nHere's my recommended order:\n\n1. **AI Learning** page — Follow the structured roadmap from beginner to advanced\n2. **Learning Lab** — Hands-on exercises and projects for each phase\n3. **AI Updates** — Stay current with new tools and trends\n4. **Practice daily** — Use the Daily Tracker to log your learning!\n\nThe Learning Lab is where the real magic happens — you learn by building! 🧪`,
        actions: [
          { label: "📚 AI Learning", path: "/ai-learning" },
          { label: "🧪 Learning Lab", path: "/learning-lab" },
        ],
      };
    }

    // General next step advice
    const actions: ActionButton[] = [];
    if (!goalName) {
      actions.push({ label: "🎯 Create a Goal", path: "/goals" });
      return {
        text: `**Getting Started 🚀**\n\nI'd recommend starting with these steps:\n\n1. **Create a Goal** — Set a clear, time-bound objective\n2. **Add Categories** — Organize your tasks into areas\n3. **Create Tasks** — Define what you'll do daily\n4. **Start Tracking** — Log progress in the Daily Tracker\n\nLet's start by setting up your first goal!`,
        actions,
      };
    }

    return {
      text: `**Suggested Next Steps for "${goalName}" 🎯**\n\n${smartActions.map((a) => `• ${a.label} — ${a.description}`).join("\n")}\n\nPick one and let's go! 💪`,
      actions: smartActions.map((a) => ({
        label: a.label,
        path: a.path,
      })),
    };
  }

  /* ── goal-related queries ─────────────────────────────────── */
  if (/my goal|active goal|current goal|goal progress|goal status/.test(q)) {
    if (goalName) {
      return {
        text: `Your active goal is **"${goalName}"** 🎯\n\nHere's what you can do:\n• Check the **Dashboard** for a visual progress overview\n• Visit **Analytics** for detailed performance data\n• Open the **Daily Tracker** to log today's progress\n\nKeep going — consistency is the key! 🔑`,
        actions: [
          { label: "📊 Dashboard", path: "/" },
          { label: "📋 Log Progress", path: "/tracker" },
          { label: "📈 Analytics", path: "/analytics" },
        ],
      };
    }
    return {
      text: `You don't have an active goal yet! Let's fix that 🎯\n\nHead to the **Goals** page to create your first goal. A good starter goal might be a 7-day challenge.`,
      actions: [{ label: "🎯 Create a Goal", path: "/goals" }],
    };
  }

  /* ── list all pages / features ────────────────────────────── */
  if (/all page|all section|all feature|everything|full list|overview|platform/.test(q)) {
    const list = platformPages
      .map((p) => `• **${p.name}** — ${p.description.split(".")[0]}.`)
      .join("\n");
    return {
      text: `**Platform Overview 🗺️**\n\nHere's everything this platform offers:\n\n${list}\n\nWant me to explain any of these in detail? Just ask!`,
    };
  }

  /* ── thank you ────────────────────────────────────────────── */
  if (/thank|thanks|thx|appreciate|ty/.test(q)) {
    return {
      text: `You're welcome! 😊 I'm always here if you need help. ${randomQuote()}`,
    };
  }

  /* ── bye / close ──────────────────────────────────────────── */
  if (/bye|goodbye|see ya|later|close|exit/.test(q)) {
    return {
      text: `Catch you later! 👋 Keep grinding — ${randomQuote()}`,
    };
  }

  /* ── fallback — smart context-aware response ──────────────── */
  // Try partial matching against page features and descriptions
  for (const page of platformPages) {
    const allText = [
      page.description,
      ...page.features,
      ...page.howToUse,
      ...page.tips,
    ]
      .join(" ")
      .toLowerCase();

    const words = q.split(/\s+/).filter((w) => w.length > 3);
    const matchCount = words.filter((w) => allText.includes(w)).length;
    if (matchCount >= 2) {
      return {
        text: `Sounds like you might be asking about **${page.name}**!\n\n${page.description}\n\n**Key features:** ${page.features.slice(0, 4).join(", ")}\n\nWant me to go deeper? Just ask "how to use ${page.name}" 😄`,
        actions: [{ label: `Go to ${page.name}`, path: page.path }],
      };
    }
  }

  // True fallback
  const suggestions = contextSuggestions[pathname] || contextSuggestions["/"];
  return {
    text: `Hmm, I'm not 100% sure about that one! 🤔 But I can help with a lot of things. Try asking:\n\n${suggestions.map((s) => `• "${s}"`).join("\n")}\n\nOr ask "what can you do?" to see all my capabilities! 💡`,
  };
}

/* ═══════════════════════════════════════════════════════════════
   Component
   ═══════════════════════════════════════════════════════════════ */
const AICopilot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { activeGoal } = useGoalContext();

  const goalName = activeGoal?.name || null;

  /* ── auto scroll ──────────────────────────────────────────── */
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  /* ── focus input when chat opens ──────────────────────────── */
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  /* ── welcome message on first open ────────────────────────── */
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const currentPage = getCurrentPageInfo(location.pathname);
      const page = currentPage ? currentPage.name : "the platform";
      const goalLine = goalName
        ? `\n\nYou're working on **"${goalName}"** — let's make progress! 💪`
        : "\n\nI notice you haven't set a goal yet. Want me to help you get started? 🎯";

      setMessages([
        {
          id: uid(),
          role: "assistant",
          text: `Hey! 👋 I'm your **AI Growth Copilot** — think of me as your personal mentor for this platform.\n\nYou're on **${page}** right now.${goalLine}\n\nAsk me anything or pick a suggestion below! 👇`,
          timestamp: new Date(),
        },
      ]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  /* ── handle send ──────────────────────────────────────────── */
  const handleSend = useCallback(() => {
    const trimmed = input.trim();
    if (!trimmed) return;

    const userMsg: Message = {
      id: uid(),
      role: "user",
      text: trimmed,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Simulate typing delay (250–800ms for realism)
    const delay = Math.min(250 + trimmed.length * 8, 800);
    setTimeout(() => {
      const response = generateResponse(trimmed, location.pathname, goalName);
      const assistantMsg: Message = {
        id: uid(),
        role: "assistant",
        text: response.text,
        actions: response.actions,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMsg]);
      setIsTyping(false);
    }, delay);
  }, [input, location.pathname, goalName]);

  /* ── handle suggestion click ──────────────────────────────── */
  const handleSuggestionClick = (suggestion: string) => {
    setInput("");
    const userMsg: Message = {
      id: uid(),
      role: "user",
      text: suggestion,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    setTimeout(() => {
      const response = generateResponse(suggestion, location.pathname, goalName);
      const assistantMsg: Message = {
        id: uid(),
        role: "assistant",
        text: response.text,
        actions: response.actions,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMsg]);
      setIsTyping(false);
    }, 400);
  };

  /* ── handle action click (navigation) ─────────────────────── */
  const handleAction = (action: ActionButton) => {
    if (action.path) {
      navigate(action.path);
      setMessages((prev) => [
        ...prev,
        {
          id: uid(),
          role: "assistant",
          text: `Navigated to **${action.label.replace(/[^\w\s]/g, "").trim()}**! ✅`,
          timestamp: new Date(),
        },
      ]);
    }
    if (action.onClick) action.onClick();
  };

  /* ── context suggestions for current page ─────────────────── */
  const suggestions =
    contextSuggestions[location.pathname] || contextSuggestions["/"];

  /* ── render markdown-lite (bold, line breaks) ─────────────── */
  const renderText = (text: string) => {
    const lines = text.split("\n");
    return lines.map((line, i) => {
      if (line.startsWith("## ")) {
        return (
          <h3 key={i} className="text-base font-bold mt-2 mb-1 text-indigo-300">
            {line.replace("## ", "")}
          </h3>
        );
      }
      if (line.startsWith("> ")) {
        return (
          <blockquote
            key={i}
            className="border-l-3 border-indigo-400 pl-3 italic text-indigo-200 my-2"
          >
            {renderInline(line.replace("> ", ""))}
          </blockquote>
        );
      }
      if (line.trim() === "") return <br key={i} />;
      return (
        <p key={i} className="leading-relaxed">
          {renderInline(line)}
        </p>
      );
    });
  };

  const renderInline = (text: string) => {
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong key={i} className="font-semibold text-white">
            {part.slice(2, -2)}
          </strong>
        );
      }
      return <span key={i}>{part}</span>;
    });
  };

  return (
    <>
      {/* ── Floating Action Button ─────────────────────────────── */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-2xl 
          flex items-center justify-center transition-all duration-300 
          hover:scale-110 active:scale-95
          ${
            isOpen
              ? "bg-gradient-to-br from-red-500 to-pink-600 rotate-0"
              : "bg-gradient-to-br from-indigo-600 to-purple-700 hover:from-indigo-500 hover:to-purple-600"
          }`}
        style={{ boxShadow: isOpen ? "0 4px 24px rgba(239,68,68,0.4)" : "0 4px 24px rgba(99,102,241,0.5)" }}
        aria-label={isOpen ? "Close AI Copilot" : "Open AI Copilot"}
      >
        {isOpen ? (
          <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
          </svg>
        )}
      </button>

      {/* ── Notification badge (when closed) ───────────────────── */}
      {!isOpen && messages.length === 0 && (
        <div className="fixed bottom-[5.2rem] right-6 z-50 animate-bounce">
          <div className="bg-white rounded-2xl shadow-xl px-4 py-2 text-sm font-medium text-slate-800 max-w-[200px]">
            <div className="absolute -bottom-1.5 right-5 w-3 h-3 bg-white rotate-45 shadow-sm" />
            Need help? Ask me! ✨
          </div>
        </div>
      )}

      {/* ── Chat Panel ─────────────────────────────────────────── */}
      <div
        className={`fixed bottom-24 right-6 z-50 w-[400px] max-w-[calc(100vw-2rem)] 
          transition-all duration-300 ease-out origin-bottom-right
          ${isOpen ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-4 pointer-events-none"}`}
      >
        <div className="bg-[#0f0b2e] rounded-2xl shadow-2xl border border-indigo-500/20 flex flex-col overflow-hidden"
          style={{ height: "min(580px, calc(100vh - 140px))", boxShadow: "0 8px 40px rgba(15,11,46,0.6)" }}
        >
          {/* ── Header ─────────────────────────────────────────── */}
          <div className="bg-gradient-to-r from-indigo-700 via-purple-700 to-indigo-800 px-5 py-4 flex items-center gap-3 shrink-0">
            <div className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center">
              <svg className="w-5 h-5 text-indigo-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
              </svg>
            </div>
            <div className="flex-1">
              <h2 className="text-white font-bold text-sm tracking-wide">AI Growth Copilot</h2>
              <p className="text-indigo-200 text-xs">Your personal growth mentor</p>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-green-300 text-xs font-medium">Online</span>
            </div>
          </div>

          {/* ── Messages ───────────────────────────────────────── */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 scrollbar-thin" id="copilot-messages">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 text-[13.5px] leading-relaxed
                    ${
                      msg.role === "user"
                        ? "bg-indigo-600 text-white rounded-br-md"
                        : "bg-white/8 text-indigo-100 rounded-bl-md border border-white/5"
                    }`}
                >
                  {renderText(msg.text)}

                  {/* ── Action buttons ──────────────────────────── */}
                  {msg.actions && msg.actions.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {msg.actions.map((action, i) => (
                        <button
                          key={i}
                          onClick={() => handleAction(action)}
                          className="px-3 py-1.5 text-xs font-medium rounded-lg
                            bg-indigo-600/40 hover:bg-indigo-600/70 text-indigo-100
                            border border-indigo-500/30 hover:border-indigo-400/50
                            transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                        >
                          {action.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* ── Typing indicator ─────────────────────────────── */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white/8 rounded-2xl rounded-bl-md px-4 py-3 border border-white/5">
                  <div className="flex gap-1.5 items-center">
                    <div className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                    <div className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                    <div className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* ── Quick suggestions ──────────────────────────────── */}
          {messages.length <= 1 && (
            <div className="px-4 pb-2 shrink-0">
              <p className="text-indigo-400 text-[11px] font-semibold uppercase tracking-wider mb-2">
                Quick Suggestions
              </p>
              <div className="flex flex-wrap gap-1.5">
                {suggestions.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => handleSuggestionClick(s)}
                    className="text-xs px-3 py-1.5 rounded-full 
                      bg-white/5 hover:bg-indigo-600/30 text-indigo-200 hover:text-white
                      border border-white/8 hover:border-indigo-500/30
                      transition-all duration-200"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ── Input ──────────────────────────────────────────── */}
          <div className="px-4 py-3 border-t border-white/8 shrink-0">
            <div className="flex items-center gap-2 bg-white/5 rounded-xl border border-white/10 focus-within:border-indigo-500/50 transition-colors">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
                placeholder="Ask me anything..."
                className="flex-1 bg-transparent text-white text-sm px-4 py-3 outline-none placeholder:text-indigo-300/40"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim()}
                className={`mr-2 p-2 rounded-lg transition-all duration-200
                  ${
                    input.trim()
                      ? "bg-indigo-600 hover:bg-indigo-500 text-white scale-100"
                      : "bg-transparent text-indigo-500/30 scale-95"
                  }`}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AICopilot;
