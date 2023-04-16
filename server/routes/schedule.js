const express = require("express");
const router = express.Router();
const {
  getAllSchedule,
  getSchedule,
  postSchedule,
  putSchedule,
  deleteSchedule,
} = require("../controllers/ScheduleController");
const corsHeaders = require("../middlewares/headers");

router.get("/", corsHeaders, getAllSchedule);
router.post("/", corsHeaders, postSchedule);

router.get("/:id", corsHeaders, getSchedule);
router.put("/:id", corsHeaders, putSchedule);
router.delete("/:id", corsHeaders, deleteSchedule);

module.exports = router;
