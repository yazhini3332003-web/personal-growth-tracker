import React, { useEffect, useState } from "react";
import { useGoalContext } from "../context/GoalContext";
import { fetchDashboard } from "../api";
import type { DashboardData } from "../types";
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
import { Line, Bar, Doughnut } from "react-chartjs-2";

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

const Analytics: React.FC = () => {
  const { activeGoal } = useGoalContext();
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

  if (!activeGoal) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500">
          Please create a goal to view analytics.
        </p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600" />
      </div>
    );
  }

  if (!dashboard) return null;

  const dailyScores = dashboard.dailyScores;

  // ─── Daily Score Line Chart ─────────────────────────────
  const lineData = {
    labels: dailyScores.map((s) => `Day ${s.day}`),
    datasets: [
      {
        label: "Daily Points",
        data: dailyScores.map((s) => s.points),
        borderColor: "#6366f1",
        backgroundColor: "rgba(99, 102, 241, 0.1)",
        tension: 0.4,
        fill: true,
        pointBackgroundColor: "#6366f1",
        pointRadius: 5,
      },
    ],
  };

  // ─── Cumulative Progress Line ───────────────────────────
  let cumulative = 0;
  const cumulativeData = dailyScores.map((s) => {
    cumulative += s.points;
    return cumulative;
  });

  const cumulativeLineData = {
    labels: dailyScores.map((s) => `Day ${s.day}`),
    datasets: [
      {
        label: "Cumulative Points",
        data: cumulativeData,
        borderColor: "#14b8a6",
        backgroundColor: "rgba(20, 184, 166, 0.1)",
        tension: 0.4,
        fill: true,
        pointBackgroundColor: "#14b8a6",
        pointRadius: 5,
      },
      {
        label: "Target Pace",
        data: dailyScores.map((s) =>
          Math.round((dashboard.targetPoints / dashboard.totalDays) * s.day)
        ),
        borderColor: "#e5e7eb",
        borderDash: [5, 5],
        tension: 0,
        fill: false,
        pointRadius: 0,
      },
    ],
  };

  // ─── Weekly Aggregation Bar Chart ───────────────────────
  const weeklyData: number[] = [];
  dailyScores.forEach((s) => {
    const weekIndex = Math.floor((s.day - 1) / 7);
    if (!weeklyData[weekIndex]) weeklyData[weekIndex] = 0;
    weeklyData[weekIndex] += s.points;
  });

  const barData = {
    labels: weeklyData.map((_, i) => `Week ${i + 1}`),
    datasets: [
      {
        label: "Weekly Points",
        data: weeklyData,
        backgroundColor: [
          "rgba(99, 102, 241, 0.7)",
          "rgba(236, 72, 153, 0.7)",
          "rgba(20, 184, 166, 0.7)",
          "rgba(245, 158, 11, 0.7)",
          "rgba(139, 92, 246, 0.7)",
        ],
        borderRadius: 8,
      },
    ],
  };

  // ─── Category Doughnut ──────────────────────────────────
  const catLabels = Object.keys(dashboard.categoryBreakdown);
  const catColors = [
    "#6366f1",
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

  const chartOptions = {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: {
      y: { beginAtZero: true, grid: { color: "rgba(0,0,0,0.05)" } },
      x: { grid: { display: false } },
    },
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Progress Analytics
        </h1>
        <p className="text-gray-500 mt-1">
          Detailed performance analysis for "{activeGoal.name}"
        </p>
      </div>

      {dailyScores.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl border border-gray-100">
          <p className="text-gray-500 text-lg">
            No data available yet. Start tracking your daily progress!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Daily Score Chart */}
          <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
            <h3 className="font-semibold text-gray-700 mb-4">
              Daily Score Trend
            </h3>
            <Line data={lineData} options={chartOptions} />
          </div>

          {/* Cumulative Progress */}
          <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
            <h3 className="font-semibold text-gray-700 mb-4">
              Cumulative Progress vs Target Pace
            </h3>
            <Line
              data={cumulativeLineData}
              options={{
                ...chartOptions,
                plugins: { legend: { position: "bottom" as const } },
              }}
            />
          </div>

          {/* Weekly Progress */}
          <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
            <h3 className="font-semibold text-gray-700 mb-4">
              Weekly Progress
            </h3>
            <Bar data={barData} options={chartOptions} />
          </div>

          {/* Category Performance */}
          <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
            <h3 className="font-semibold text-gray-700 mb-4">
              Category Performance
            </h3>
            {catLabels.length > 0 ? (
              <>
                <div className="max-w-[250px] mx-auto mb-4">
                  <Doughnut
                    data={doughnutData}
                    options={{
                      responsive: true,
                      plugins: { legend: { position: "bottom" } },
                      cutout: "65%",
                    }}
                  />
                </div>
                <div className="space-y-2 mt-4">
                  {catLabels.map((cat, i) => (
                    <div
                      key={cat}
                      className="flex items-center justify-between text-sm"
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{
                            backgroundColor:
                              catColors[i % catColors.length],
                          }}
                        />
                        <span className="text-gray-600">{cat}</span>
                      </div>
                      <div className="text-gray-900 font-semibold">
                        {dashboard.categoryBreakdown[cat].points} pts
                        <span className="text-gray-400 font-normal ml-1">
                          ({dashboard.categoryBreakdown[cat].count} tasks)
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <p className="text-gray-400 text-center py-8">
                No category data yet.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Analytics;
