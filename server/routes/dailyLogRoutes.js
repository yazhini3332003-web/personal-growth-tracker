const express = require("express");
const router = express.Router();
const {
  getDailyLogs,
  getDailyLog,
  createDailyLog,
  deleteDailyLog,
} = require("../controllers/dailyLogController");

router.route("/").get(getDailyLogs).post(createDailyLog);
router.route("/:id").get(getDailyLog).delete(deleteDailyLog);

module.exports = router;
