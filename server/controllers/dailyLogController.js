const DailyLog = require("../models/DailyLog");
const Goal = require("../models/Goal");
const Task = require("../models/Task");

// @desc    Get daily logs for a goal
// @route   GET /api/daily-logs?goal=:goalId
exports.getDailyLogs = async (req, res) => {
  try {
    const filter = req.query.goal ? { goal: req.query.goal } : {};
    const logs = await DailyLog.find(filter)
      .populate({
        path: "completedTasks.task",
        populate: { path: "category", select: "name color" },
      })
      .sort({ dayNumber: 1 });
    res.json(logs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single daily log
// @route   GET /api/daily-logs/:id
exports.getDailyLog = async (req, res) => {
  try {
    const log = await DailyLog.findById(req.params.id).populate({
      path: "completedTasks.task",
      populate: { path: "category", select: "name color" },
    });
    if (!log) return res.status(404).json({ message: "Daily log not found" });
    res.json(log);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create or update daily log
// @route   POST /api/daily-logs
exports.createDailyLog = async (req, res) => {
  try {
    const { goal, date, dayNumber, completedTaskIds, notes } = req.body;

    // Fetch tasks to get their points
    const tasks = await Task.find({ _id: { $in: completedTaskIds } });
    const completedTasks = tasks.map((task) => ({
      task: task._id,
      pointsEarned: task.points,
    }));

    const totalPoints = completedTasks.reduce(
      (sum, ct) => sum + ct.pointsEarned,
      0
    );

    // Normalize date to start of day
    const normalizedDate = new Date(date);
    normalizedDate.setHours(0, 0, 0, 0);

    // Check if log already exists for this day
    let existingLog = await DailyLog.findOne({
      goal,
      dayNumber,
    });

    let log;
    if (existingLog) {
      // Update existing log
      const oldPoints = existingLog.totalPoints;
      existingLog.completedTasks = completedTasks;
      existingLog.totalPoints = totalPoints;
      existingLog.notes = notes || "";
      existingLog.date = normalizedDate;
      log = await existingLog.save();

      // Update goal's currentPoints
      const goalDoc = await Goal.findById(goal);
      goalDoc.currentPoints = goalDoc.currentPoints - oldPoints + totalPoints;
      await goalDoc.save();
    } else {
      // Create new log
      log = await DailyLog.create({
        goal,
        date: normalizedDate,
        dayNumber,
        completedTasks,
        totalPoints,
        notes: notes || "",
      });

      // Update goal's currentPoints
      const goalDoc = await Goal.findById(goal);
      goalDoc.currentPoints += totalPoints;
      await goalDoc.save();
    }

    const populatedLog = await DailyLog.findById(log._id).populate({
      path: "completedTasks.task",
      populate: { path: "category", select: "name color" },
    });

    res.status(201).json(populatedLog);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete daily log
// @route   DELETE /api/daily-logs/:id
exports.deleteDailyLog = async (req, res) => {
  try {
    const log = await DailyLog.findById(req.params.id);
    if (!log) return res.status(404).json({ message: "Daily log not found" });

    // Subtract points from goal
    const goalDoc = await Goal.findById(log.goal);
    if (goalDoc) {
      goalDoc.currentPoints = Math.max(
        0,
        goalDoc.currentPoints - log.totalPoints
      );
      await goalDoc.save();
    }

    await DailyLog.findByIdAndDelete(req.params.id);
    res.json({ message: "Daily log deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
