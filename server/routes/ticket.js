const express = require("express");
const router = express.Router();
const {
  getAllTripTicket,
  getTripTicket,
  postTripTicket,
  putTripTicket,
  deleteTripTicket,
} = require("../controllers/TripTicketController");
const corsHeaders = require("../middlewares/headers");

router.get("/", corsHeaders, getAllTripTicket);
router.post("/", corsHeaders, postTripTicket);

router.get("/:id", corsHeaders, getTripTicket);
router.put("/:id", corsHeaders, putTripTicket);
router.delete("/:id", corsHeaders, deleteTripTicket);

module.exports = router;
