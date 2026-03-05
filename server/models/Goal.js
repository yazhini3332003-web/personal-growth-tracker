const mongoose = require("mongoose");

const goalSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Goal name is required"],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },
    startDate: {
      type: Date,
      required: [true, "Start date is required"],
    },
    totalDays: {
      type: Number,
      required: [true, "Total challenge days is required"],
      min: 1,
    },
    targetPoints: {
      type: Number,
      required: [true, "Target points is required"],
      min: 1,
    },
    currentPoints: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

goalSchema.virtual("endDate").get(function () {
  const end = new Date(this.startDate);
  end.setDate(end.getDate() + this.totalDays - 1);
  return end;
});

goalSchema.virtual("completionPercentage").get(function () {
  if (this.targetPoints === 0) return 0;
  return Math.min(
    100,
    Math.round((this.currentPoints / this.targetPoints) * 100)
  );
});

goalSchema.set("toJSON", { virtuals: true });
goalSchema.set("toObject", { virtuals: true });

module.exports = mongoose.model("Goal", goalSchema);
