const express = require("express");
const router = express.Router();
const {
  getAllSchedule,
  getSchedule,
  getSchedulePerDriver,
  postSchedule,
  putSchedule,
  deleteSchedule,
} = require("../controllers/ScheduleController");
const corsHeaders = require("../middlewares/headers");

router.get("/all_schedule/", corsHeaders, getAllSchedule);
router.post("/all_schedule/", corsHeaders, postSchedule);

router.get("/all_schedule/:id", corsHeaders, getSchedule);
router.put("/all_schedule/:id", corsHeaders, putSchedule);
router.delete("/all_schedule/:id", corsHeaders, deleteSchedule);

router.get("/personnel/:id", corsHeaders, getSchedulePerDriver);

module.exports = router;
