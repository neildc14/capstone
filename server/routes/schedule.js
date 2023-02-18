const express = require("express");
const router = express.Router();
const {
  getAllSchedule,
  getSchedule,
  postSchedule,
  putSchedule,
  deleteSchedule,
} = require("../controllers/ScheduleController");

router.get("/", getAllSchedule);
router.post("/", postSchedule);

router.get("/:id", getSchedule);
router.put("/:id", putSchedule);
router.delete("/:id", deleteSchedule);

module.exports = router;
