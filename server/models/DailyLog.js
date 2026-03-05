const mongoose = require("mongoose");

const dailyLogSchema = new mongoose.Schema(
  {
    goal: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Goal",
      required: [true, "Goal reference is required"],
    },
    date: {
      type: Date,
      required: [true, "Date is required"],
    },
    dayNumber: {
      type: Number,
      required: true,
      min: 1,
    },
    completedTasks: [
      {
        task: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Task",
        },
        pointsEarned: {
          type: Number,
          default: 0,
        },
      },
    ],
    totalPoints: {
      type: Number,
      default: 0,
    },
    notes: {
      type: String,
      trim: true,
      default: "",
    },
  },
  { timestamps: true }
);

dailyLogSchema.index({ goal: 1, date: 1 }, { unique: true });

module.exports = mongoose.model("DailyLog", dailyLogSchema);
