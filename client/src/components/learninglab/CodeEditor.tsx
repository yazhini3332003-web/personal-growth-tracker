import React, { useState, useCallback, useRef, useEffect } from "react";
import { useLabContext } from "../../context/LearningLabContext";

interface CodeEditorProps {
  exerciseId: string;
  initialCode: string;
  title: string;
  description: string;
  hints: string[];
  onComplete: () => void;
  isCompleted: boolean;
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  exerciseId,
  initialCode,
  title,
  description,
  hints,
  onComplete,
  isCompleted,
}) => {
  const { saveCodeSnapshot, getCodeSnapshot } = useLabContext();
  const [code, setCode] = useState(() => getCodeSnapshot(exerciseId) || initialCode);
  const [output, setOutput] = useState<string[]>([]);
  const [showHints, setShowHints] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const saved = getCodeSnapshot(exerciseId);
    if (saved) setCode(saved);
  }, [exerciseId, getCodeSnapshot]);

  const handleCodeChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setCode(e.target.value);
      saveCodeSnapshot(exerciseId, e.target.value);
    },
    [exerciseId, saveCodeSnapshot]
  );

  const runCode = useCallback(() => {
    setIsRunning(true);
    setOutput([]);
    const logs: string[] = [];
    const originalLog = console.log;
    const originalError = console.error;
    const originalWarn = console.warn;

    console.log = (...args: any[]) => {
      logs.push(args.map((a) => (typeof a === "object" ? JSON.stringify(a, null, 2) : String(a))).join(" "));
    };
    console.error = (...args: any[]) => {
      logs.push("❌ " + args.map((a) => String(a)).join(" "));
    };
    console.warn = (...args: any[]) => {
      logs.push("⚠️ " + args.map((a) => String(a)).join(" "));
    };

    setTimeout(() => {
      try {
        // eslint-disable-next-line no-new-func
        const fn = new Function(code);
        fn();
        if (logs.length === 0) logs.push("✅ Code executed successfully (no output)");
      } catch (err: any) {
        logs.push(`❌ Error: ${err.message}`);
      }

      console.log = originalLog;
      console.error = originalError;
      console.warn = originalWarn;
      setOutput(logs);
      setIsRunning(false);
    }, 500);
  }, [code]);

  const resetCode = useCallback(() => {
    setCode(initialCode);
    saveCodeSnapshot(exerciseId, initialCode);
    setOutput([]);
  }, [initialCode, exerciseId, saveCodeSnapshot]);

  const handleTab = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const target = e.target as HTMLTextAreaElement;
      const start = target.selectionStart;
      const end = target.selectionEnd;
      const newCode = code.substring(0, start) + "  " + code.substring(end);
      setCode(newCode);
      saveCodeSnapshot(exerciseId, newCode);
      setTimeout(() => {
        target.selectionStart = target.selectionEnd = start + 2;
      }, 0);
    }
  }, [code, exerciseId, saveCodeSnapshot]);

  return (
    <div className="bg-slate-900 rounded-2xl border border-slate-700 overflow-hidden">
      {/* Header */}
      <div className="bg-slate-800 px-4 py-3 flex items-center justify-between border-b border-slate-700">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <span className="text-slate-300 text-sm font-mono">{title}</span>
        </div>
        <div className="flex items-center gap-2">
          {isCompleted && (
            <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full">
              ✅ Completed
            </span>
          )}
        </div>
      </div>

      {/* Description */}
      <div className="px-4 py-3 bg-slate-800/50 border-b border-slate-700">
        <p className="text-slate-300 text-sm">{description}</p>
      </div>

      {/* Editor */}
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-12 bg-slate-800/80 flex flex-col items-center pt-3 text-slate-600 text-xs font-mono select-none">
          {code.split("\n").map((_, i) => (
            <div key={i} className="h-[20px] leading-[20px]">
              {i + 1}
            </div>
          ))}
        </div>
        <textarea
          ref={textareaRef}
          value={code}
          onChange={handleCodeChange}
          onKeyDown={handleTab}
          className="w-full bg-slate-900 text-green-400 font-mono text-sm p-3 pl-14 outline-none resize-none min-h-[300px] leading-[20px]"
          spellCheck={false}
          style={{ tabSize: 2 }}
        />
      </div>

      {/* Actions */}
      <div className="bg-slate-800 px-4 py-3 flex items-center justify-between border-t border-slate-700">
        <div className="flex gap-2">
          <button
            onClick={runCode}
            disabled={isRunning}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50 flex items-center gap-2"
          >
            {isRunning ? (
              <>
                <span className="animate-spin">⚙️</span> Running...
              </>
            ) : (
              <>▶ Run Code</>
            )}
          </button>
          <button
            onClick={resetCode}
            className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-300 text-sm rounded-lg transition-colors"
          >
            ↺ Reset
          </button>
          <button
            onClick={() => setShowHints(!showHints)}
            className="px-4 py-2 bg-yellow-600/20 hover:bg-yellow-600/30 text-yellow-400 text-sm rounded-lg transition-colors"
          >
            💡 Hints
          </button>
        </div>
        {!isCompleted && (
          <button
            onClick={onComplete}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors"
          >
            ✓ Mark Complete
          </button>
        )}
      </div>

      {/* Hints */}
      {showHints && (
        <div className="px-4 py-3 bg-yellow-900/20 border-t border-yellow-800/30">
          <p className="text-yellow-400 text-xs font-semibold mb-2">💡 Hints:</p>
          {hints.map((hint, i) => (
            <p key={i} className="text-yellow-300/70 text-xs mb-1">
              {i + 1}. {hint}
            </p>
          ))}
        </div>
      )}

      {/* Output */}
      {output.length > 0 && (
        <div className="border-t border-slate-700">
          <div className="px-4 py-2 bg-slate-800 text-slate-400 text-xs font-semibold">
            📟 Output
          </div>
          <div className="px-4 py-3 bg-black/50 max-h-[250px] overflow-y-auto">
            {output.map((line, i) => (
              <pre
                key={i}
                className={`text-sm font-mono whitespace-pre-wrap mb-1 ${
                  line.startsWith("❌") ? "text-red-400" : line.startsWith("⚠️") ? "text-yellow-400" : "text-slate-300"
                }`}
              >
                {line}
              </pre>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CodeEditor;
