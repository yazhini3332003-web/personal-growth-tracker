import React, { useEffect, useState } from "react";
import { useGoalContext } from "../context/GoalContext";
import { fetchDashboard } from "../api";
import type { DashboardData } from "../types";
import StatCard from "../components/StatCard";
import ProgressBar from "../components/ProgressBar";
import {
  HiOutlineStar,
  HiOutlineCalendar,
  HiOutlineTrendingUp,
  HiOutlineClock,
} from "react-icons/hi";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler,
} from "chart.js";
import { Line, Doughnut } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler
);

const Dashboard: React.FC = () => {
  const { activeGoal, loading: goalLoading } = useGoalContext();
  const [dashboard, setDashboard] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (activeGoal) {
      setLoading(true);
      fetchDashboard(activeGoal._id)
        .then((res) => setDashboard(res.data))
        .catch(console.error)
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [activeGoal]);

  if (goalLoading || loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600" />
      </div>
    );
  }

  if (!activeGoal) {
    return (
      <div className="text-center py-20">
        <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <HiOutlineStar className="w-10 h-10 text-primary-500" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Welcome to Personal Growth Tracker
        </h2>
        <p className="text-gray-500 mb-6 max-w-md mx-auto">
          Start your self-improvement journey by creating your first goal.
        </p>
        <a
          href="/goals"
          className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition font-medium shadow-sm hover:shadow-md"
        >
          Create Your First Goal
        </a>
      </div>
    );
  }

  if (!dashboard) return null;

  const lineData = {
    labels: dashboard.dailyScores.map((s) => `Day ${s.day}`),
    datasets: [
      {
        label: "Daily Points",
        data: dashboard.dailyScores.map((s) => s.points),
        borderColor: "#3B82F6",
        backgroundColor: "rgba(124, 58, 237, 0.1)",
        tension: 0.4,
        fill: true,
        pointBackgroundColor: "#3B82F6",
        pointRadius: 4,
      },
    ],
  };

  const lineOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
    scales: {
      y: { beginAtZero: true, grid: { color: "rgba(0,0,0,0.05)" } },
      x: { grid: { display: false } },
    },
  };

  const catLabels = Object.keys(dashboard.categoryBreakdown);
  const catColors = [
    "#3B82F6",
    "#ec4899",
    "#14b8a6",
    "#f59e0b",
    "#ef4444",
    "#8b5cf6",
    "#06b6d4",
  ];

  const doughnutData = {
    labels: catLabels,
    datasets: [
      {
        data: catLabels.map((k) => dashboard.categoryBreakdown[k].points),
        backgroundColor: catColors.slice(0, catLabels.length),
        borderWidth: 0,
      },
    ],
  };

  const doughnutOptions = {
    responsive: true,
    plugins: {
      legend: { position: "bottom" as const },
    },
    cutout: "65%",
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-1">
          Tracking: <span className="font-semibold text-primary-600">{activeGoal.name}</span>
        </p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200/60 p-6 shadow-sm">
        <h3 className="font-semibold text-gray-700 mb-3">Goal Progress</h3>
        <ProgressBar
          current={dashboard.totalPoints}
          target={dashboard.targetPoints}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Points"
          value={dashboard.totalPoints}
          subtitle={`of ${dashboard.targetPoints} target`}
          icon={<HiOutlineStar className="w-6 h-6" />}
          color="bg-primary-50 text-primary-600"
        />
        <StatCard
          title="Days Completed"
          value={dashboard.daysCompleted}
          subtitle={`of ${dashboard.totalDays} days`}
          icon={<HiOutlineCalendar className="w-6 h-6" />}
          color="bg-green-50 text-green-600"
        />
        <StatCard
          title="Remaining Days"
          value={dashboard.remainingDays}
          subtitle="to complete"
          icon={<HiOutlineClock className="w-6 h-6" />}
          color="bg-amber-50 text-amber-600"
        />
        <StatCard
          title="Avg Daily Score"
          value={dashboard.averageDailyScore}
          subtitle="points per day"
          icon={<HiOutlineTrendingUp className="w-6 h-6" />}
          color="bg-pink-50 text-pink-600"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200/60 p-6 shadow-sm">
          <h3 className="font-semibold text-gray-700 mb-4">
            Daily Score Trend
          </h3>
          {dashboard.dailyScores.length > 0 ? (
            <Line data={lineData} options={lineOptions} />
          ) : (
            <p className="text-gray-400 text-center py-8">
              No data yet. Start tracking your daily tasks!
            </p>
          )}
        </div>
        <div className="bg-white rounded-xl border border-gray-200/60 p-6 shadow-sm">
          <h3 className="font-semibold text-gray-700 mb-4">
            Category Breakdown
          </h3>
          {catLabels.length > 0 ? (
            <div className="max-w-[280px] mx-auto">
              <Doughnut data={doughnutData} options={doughnutOptions} />
            </div>
          ) : (
            <p className="text-gray-400 text-center py-8">
              No category data available yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
