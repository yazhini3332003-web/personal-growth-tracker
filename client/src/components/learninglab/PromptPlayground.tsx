import React, { useState, useCallback } from "react";
import { useLabContext } from "../../context/LearningLabContext";

interface PromptPlaygroundProps {
  phaseId: number;
}

const promptTemplates: Record<number, { label: string; prompt: string }[]> = {
  1: [
    { label: "Generate Webpage", prompt: "Create a modern HTML webpage with a hero section, navigation bar, 3 feature cards, and a footer. Use a dark purple theme." },
    { label: "Debug Code", prompt: "Debug this JavaScript code and explain what's wrong:\n\nfor (let i = 0; i <= arr.length; i++) {\n  console.log(arr[i].name);\n}" },
    { label: "Explain Code", prompt: "Explain this code line by line:\n\nconst debounce = (fn, ms) => {\n  let timer;\n  return (...args) => {\n    clearTimeout(timer);\n    timer = setTimeout(() => fn(...args), ms);\n  };\n};" },
    { label: "Write Tests", prompt: "Write unit tests for a function called 'calculateDiscount' that takes a price and discount percentage, and returns the discounted price." },
  ],
  2: [
    { label: "Refactor Function", prompt: "Refactor this function to use modern JavaScript:\n\nfunction getUsers(data) {\n  var result = [];\n  for(var i=0; i<data.length; i++) {\n    if(data[i].active == true) {\n      result.push(data[i].name);\n    }\n  }\n  return result;\n}" },
    { label: "Add TypeScript", prompt: "Convert this JavaScript to TypeScript with proper types:\n\nfunction processOrder(order) {\n  return {\n    id: order.id,\n    total: order.items.reduce((sum, item) => sum + item.price * item.qty, 0),\n    date: new Date()\n  };\n}" },
  ],
  7: [
    { label: "App Idea", prompt: "Build a personal finance tracker app with: expense categories, monthly charts, budget goals, dark theme, responsive design." },
    { label: "Landing Page", prompt: "Create a landing page for an AI writing tool called 'WriteFlow' with: hero section, pricing plans, testimonials, and CTA buttons." },
  ],
};

const simulatedResponses: Record<string, string> = {
  "webpage": `<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <title>AI Generated Page</title>\n  <style>\n    * { margin: 0; padding: 0; box-sizing: border-box; }\n    body { font-family: 'Segoe UI', sans-serif; background: #1a1a2e; color: #eee; }\n    nav { display: flex; justify-content: space-between; padding: 20px 40px; background: #16213e; }\n    .hero { text-align: center; padding: 100px 20px; background: linear-gradient(135deg, #0f3460, #533483); }\n    .hero h1 { font-size: 3rem; margin-bottom: 20px; }\n    .features { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; padding: 60px 40px; }\n    .card { background: #16213e; padding: 32px; border-radius: 12px; }\n    footer { text-align: center; padding: 30px; background: #16213e; }\n  </style>\n</head>\n<body>\n  <nav><span>🚀 MySite</span><div>Home | About | Contact</div></nav>\n  <div class="hero">\n    <h1>Welcome to the Future</h1>\n    <p>AI-powered web development at your fingertips</p>\n  </div>\n  <div class="features">\n    <div class="card"><h3>⚡ Fast</h3><p>Lightning-fast performance</p></div>\n    <div class="card"><h3>🔒 Secure</h3><p>Enterprise-grade security</p></div>\n    <div class="card"><h3>🎨 Beautiful</h3><p>Stunning modern design</p></div>\n  </div>\n  <footer>© 2026 MySite. All rights reserved.</footer>\n</body>\n</html>`,
  "debug": `🔍 **Bug Analysis:**\n\n**Issue 1: Off-by-one error**\n\`for (let i = 0; i <= arr.length; i++)\`\nShould be \`i < arr.length\` (not \`<=\`). When i equals arr.length, arr[i] is undefined.\n\n**Issue 2: No null check**\nIf arr[i] is undefined, accessing .name will throw TypeError.\n\n**Fixed code:**\n\`\`\`javascript\nfor (let i = 0; i < arr.length; i++) {\n  if (arr[i] && arr[i].name) {\n    console.log(arr[i].name);\n  }\n}\n\`\`\`\n\n**Or with modern JS:**\n\`\`\`javascript\narr.forEach(item => console.log(item?.name));\n\`\`\``,
  "explain": `📖 **Line-by-line explanation:**\n\n\`const debounce = (fn, ms) => {\`\nDeclares a debounce function that takes a function (fn) and delay in milliseconds (ms).\n\n\`let timer;\`\nDeclares a timer variable in the closure scope to track the timeout.\n\n\`return (...args) => {\`\nReturns a new function that captures all arguments.\n\n\`clearTimeout(timer);\`\nCancels any existing timeout — this is the key to debouncing.\n\n\`timer = setTimeout(() => fn(...args), ms);\`\nSets a new timeout. The original function only runs after the user stops calling for 'ms' milliseconds.\n\n**Use case:** Prevents a function from firing too often (e.g., search as you type, window resize handlers).`,
  "test": `// Unit tests for calculateDiscount\ndescribe('calculateDiscount', () => {\n  test('applies 10% discount correctly', () => {\n    expect(calculateDiscount(100, 10)).toBe(90);\n  });\n\n  test('applies 50% discount correctly', () => {\n    expect(calculateDiscount(200, 50)).toBe(100);\n  });\n\n  test('handles 0% discount', () => {\n    expect(calculateDiscount(100, 0)).toBe(100);\n  });\n\n  test('handles 100% discount', () => {\n    expect(calculateDiscount(100, 100)).toBe(0);\n  });\n\n  test('handles decimal prices', () => {\n    expect(calculateDiscount(99.99, 25)).toBeCloseTo(74.99);\n  });\n\n  test('throws on negative price', () => {\n    expect(() => calculateDiscount(-10, 20)).toThrow();\n  });\n});`,
  "refactor": `// ✨ Refactored with modern JavaScript:\n\nconst getUsers = (data) => \n  data\n    .filter(user => user.active)\n    .map(user => user.name);\n\n// Changes made:\n// 1. Arrow function syntax\n// 2. const instead of var\n// 3. Array.filter() instead of manual loop + if\n// 4. Array.map() instead of push\n// 5. Strict comparison removed (filter handles truthiness)\n// 6. Single expression — no temporary variable needed`,
  "typescript": `interface OrderItem {\n  price: number;\n  qty: number;\n}\n\ninterface Order {\n  id: string;\n  items: OrderItem[];\n}\n\ninterface ProcessedOrder {\n  id: string;\n  total: number;\n  date: Date;\n}\n\nfunction processOrder(order: Order): ProcessedOrder {\n  return {\n    id: order.id,\n    total: order.items.reduce(\n      (sum: number, item: OrderItem) => sum + item.price * item.qty,\n      0\n    ),\n    date: new Date(),\n  };\n}`,
  "default": `🤖 **AI Response:**\n\nI've analyzed your prompt and here's my response:\n\nThis is a simulated AI response. In a production environment, this would connect to an AI API (like OpenAI or Anthropic) to generate real responses.\n\n**Key points:**\n1. Your prompt was well-structured\n2. Clear requirements help AI generate better code\n3. Always review and test AI-generated output\n\n💡 **Tip:** Try being more specific in your prompts for better results!`,
};

function getSimulatedResponse(prompt: string): string {
  const lower = prompt.toLowerCase();
  if (lower.includes("webpage") || lower.includes("html") || lower.includes("page")) return simulatedResponses.webpage;
  if (lower.includes("debug") || lower.includes("fix") || lower.includes("bug")) return simulatedResponses.debug;
  if (lower.includes("explain") || lower.includes("line by line")) return simulatedResponses.explain;
  if (lower.includes("test") || lower.includes("unit test")) return simulatedResponses.test;
  if (lower.includes("refactor") || lower.includes("modern")) return simulatedResponses.refactor;
  if (lower.includes("typescript") || lower.includes("types")) return simulatedResponses.typescript;
  return simulatedResponses.default;
}

const PromptPlayground: React.FC<PromptPlaygroundProps> = ({ phaseId }) => {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [history, setHistory] = useState<{ prompt: string; response: string }[]>([]);
  const { addLearningTime } = useLabContext();

  const templates = promptTemplates[phaseId] || promptTemplates[1];

  const generateResponse = useCallback(() => {
    if (!prompt.trim()) return;
    setIsGenerating(true);
    setResponse("");

    const fullResponse = getSimulatedResponse(prompt);
    let index = 0;

    // Typing effect
    const interval = setInterval(() => {
      index += 3;
      setResponse(fullResponse.slice(0, index));
      if (index >= fullResponse.length) {
        clearInterval(interval);
        setIsGenerating(false);
        setHistory((h) => [...h, { prompt, response: fullResponse }]);
        addLearningTime(2);
      }
    }, 10);
  }, [prompt, addLearningTime]);

  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
      <div className="bg-gray-100 px-4 py-3 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <span className="text-lg">🎮</span>
          <span className="text-gray-900 font-semibold text-sm">Prompt Playground</span>
          <span className="text-gray-500 text-xs ml-2">Practice prompt engineering</span>
        </div>
      </div>

      {/* Template buttons */}
      <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 flex flex-wrap gap-2">
        <span className="text-gray-500 text-xs self-center mr-1">Templates:</span>
        {templates.map((t, i) => (
          <button
            key={i}
            onClick={() => setPrompt(t.prompt)}
            className="px-3 py-1.5 bg-blue-500/20 text-blue-300 text-xs rounded-lg hover:bg-blue-500/30 transition-colors border border-blue-500/20"
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Input */}
      <div className="p-4">
        <label className="text-gray-500 text-xs font-semibold block mb-2">
          ✍️ Your Prompt:
        </label>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Write your prompt here... Be specific about what you want the AI to do."
          className="w-full bg-gray-100 text-gray-700 font-mono text-sm p-4 rounded-xl outline-none resize-none min-h-[120px] border border-gray-200 focus:border-blue-500 transition-colors placeholder-gray-600"
        />
        <div className="flex justify-between items-center mt-3">
          <span className="text-gray-500 text-xs">{prompt.length} characters</span>
          <div className="flex gap-2">
            <button
              onClick={() => { setPrompt(""); setResponse(""); }}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-200 text-gray-700 text-sm rounded-lg transition-colors"
            >
              Clear
            </button>
            <button
              onClick={generateResponse}
              disabled={isGenerating || !prompt.trim()}
              className="px-5 py-2 bg-blue-500 hover:bg-blue-600 text-gray-900 text-sm font-medium rounded-lg transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              {isGenerating ? (
                <>
                  <span className="animate-spin">⚙️</span> Generating...
                </>
              ) : (
                <>🤖 Generate Response</>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Response */}
      {response && (
        <div className="border-t border-gray-200">
          <div className="px-4 py-2 bg-gray-100 text-gray-500 text-xs font-semibold flex items-center gap-2">
            <span>🤖</span> AI Response
            {isGenerating && <span className="animate-pulse text-blue-400">generating...</span>}
          </div>
          <div className="p-4 bg-gray-50 max-h-[400px] overflow-y-auto">
            <pre className="text-gray-700 text-sm whitespace-pre-wrap font-mono leading-relaxed">
              {response}
            </pre>
          </div>
        </div>
      )}

      {/* History */}
      {history.length > 0 && (
        <div className="border-t border-gray-200 px-4 py-3 bg-gray-50">
          <p className="text-gray-500 text-xs font-semibold mb-2">
            📜 History ({history.length} prompts)
          </p>
          <div className="flex flex-wrap gap-2">
            {history.map((h, i) => (
              <button
                key={i}
                onClick={() => { setPrompt(h.prompt); setResponse(h.response); }}
                className="px-3 py-1 bg-gray-200 text-gray-500 text-xs rounded-lg hover:bg-gray-200 transition-colors truncate max-w-[200px]"
              >
                {h.prompt.slice(0, 30)}...
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PromptPlayground;
