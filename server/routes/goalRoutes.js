const express = require("express");
const router = express.Router();
const {
  getGoals,
  getGoal,
  createGoal,
  updateGoal,
  deleteGoal,
  resetGoal,
  getDashboard,
} = require("../controllers/goalController");

router.route("/").get(getGoals).post(createGoal);
router.route("/:id").get(getGoal).put(updateGoal).delete(deleteGoal);
router.post("/:id/reset", resetGoal);
router.get("/:id/dashboard", getDashboard);

module.exports = router;
