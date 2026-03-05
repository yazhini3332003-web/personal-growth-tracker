const Goal = require("../models/Goal");
const Category = require("../models/Category");
const Task = require("../models/Task");
const DailyLog = require("../models/DailyLog");

// @desc    Get all goals
// @route   GET /api/goals
exports.getGoals = async (req, res) => {
  try {
    const goals = await Goal.find().sort({ createdAt: -1 });
    res.json(goals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single goal
// @route   GET /api/goals/:id
exports.getGoal = async (req, res) => {
  try {
    const goal = await Goal.findById(req.params.id);
    if (!goal) return res.status(404).json({ message: "Goal not found" });
    res.json(goal);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create goal
// @route   POST /api/goals
exports.createGoal = async (req, res) => {
  try {
    // Deactivate other goals
    await Goal.updateMany({}, { isActive: false });
    const goal = await Goal.create(req.body);
    res.status(201).json(goal);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update goal
// @route   PUT /api/goals/:id
exports.updateGoal = async (req, res) => {
  try {
    const goal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!goal) return res.status(404).json({ message: "Goal not found" });
    res.json(goal);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete goal (and all related data)
// @route   DELETE /api/goals/:id
exports.deleteGoal = async (req, res) => {
  try {
    const goal = await Goal.findById(req.params.id);
    if (!goal) return res.status(404).json({ message: "Goal not found" });

    await DailyLog.deleteMany({ goal: req.params.id });
    await Task.deleteMany({ goal: req.params.id });
    await Category.deleteMany({ goal: req.params.id });
    await Goal.findByIdAndDelete(req.params.id);

    res.json({ message: "Goal and all related data deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Reset goal progress
// @route   POST /api/goals/:id/reset
exports.resetGoal = async (req, res) => {
  try {
    const goal = await Goal.findById(req.params.id);
    if (!goal) return res.status(404).json({ message: "Goal not found" });

    goal.currentPoints = 0;
    goal.startDate = new Date();
    await goal.save();

    await DailyLog.deleteMany({ goal: req.params.id });

    res.json(goal);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get dashboard stats
// @route   GET /api/goals/:id/dashboard
exports.getDashboard = async (req, res) => {
  try {
    const goal = await Goal.findById(req.params.id);
    if (!goal) return res.status(404).json({ message: "Goal not found" });

    const logs = await DailyLog.find({ goal: req.params.id }).sort({
      dayNumber: 1,
    });

    const today = new Date();
    const startDate = new Date(goal.startDate);
    const diffTime = today.getTime() - startDate.getTime();
    const daysElapsed = Math.max(
      1,
      Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    );
    const daysCompleted = Math.min(daysElapsed, goal.totalDays);
    const remainingDays = Math.max(0, goal.totalDays - daysCompleted);

    const averageDailyScore =
      logs.length > 0
        ? Math.round(goal.currentPoints / logs.length)
        : 0;

    const dailyScores = logs.map((log) => ({
      day: log.dayNumber,
      date: log.date,
      points: log.totalPoints,
    }));

    // Category-wise breakdown
    const categoryBreakdown = {};
    for (const log of logs) {
      for (const ct of log.completedTasks) {
        const task = await Task.findById(ct.task).populate("category");
        if (task && task.category) {
          const catName = task.category.name;
          if (!categoryBreakdown[catName]) {
            categoryBreakdown[catName] = { points: 0, count: 0 };
          }
          categoryBreakdown[catName].points += ct.pointsEarned;
          categoryBreakdown[catName].count += 1;
        }
      }
    }

    res.json({
      totalPoints: goal.currentPoints,
      targetPoints: goal.targetPoints,
      daysCompleted,
      totalDays: goal.totalDays,
      remainingDays,
      completionPercentage: goal.completionPercentage,
      averageDailyScore,
      dailyScores,
      categoryBreakdown,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
