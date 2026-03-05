const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Task name is required"],
      trim: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Category reference is required"],
    },
    goal: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Goal",
      required: [true, "Goal reference is required"],
    },
    points: {
      type: Number,
      required: [true, "Points are required"],
      min: 1,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema);
