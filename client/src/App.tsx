import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { GoalProvider } from "./context/GoalContext";
import Sidebar from "./components/Sidebar";
import MobileNav from "./components/MobileNav";
import Dashboard from "./pages/Dashboard";
import Goals from "./pages/Goals";
import Categories from "./pages/Categories";
import Tasks from "./pages/Tasks";
import DailyTracker from "./pages/DailyTracker";
import Analytics from "./pages/Analytics";
import WebDevAIUpdates from "./pages/WebDevAIUpdates";
import Investment from "./pages/Investment";
import AILearningPlatform from "./pages/AILearningPlatform";
import AILearningLab from "./pages/AILearningLab";
import Settings from "./pages/Settings";

function App() {
  return (
    <GoalProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
          <Sidebar />
          <MobileNav />
          <main className="flex-1 overflow-auto">
            <div className="w-full px-6 lg:px-10 py-8">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/goals" element={<Goals />} />
                <Route path="/categories" element={<Categories />} />
                <Route path="/tasks" element={<Tasks />} />
                <Route path="/tracker" element={<DailyTracker />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/ai-updates" element={<WebDevAIUpdates />} />
                <Route path="/investment" element={<Investment />} />
                <Route path="/ai-learning" element={<AILearningPlatform />} />
                <Route path="/learning-lab" element={<AILearningLab />} />
                <Route path="/settings" element={<Settings />} />
              </Routes>
            </div>
          </main>
        </div>
        <Toaster
          position="bottom-right"
          toastOptions={{
            duration: 3000,
            style: {
              borderRadius: "12px",
              background: "#1e1b4b",
              color: "#fff",
              fontSize: "14px",
            },
          }}
        />
      </Router>
    </GoalProvider>
  );
}

export default App;
