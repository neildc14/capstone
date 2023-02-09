const express = require("express");
const router = express.Router();
const {
  getAllTripTicket,
  getTripTicket,
  postTripTicket,
  putTripTicket,
  deleteTripTicket,
} = require("../controllers/TripTicketController");

router.get("/", getAllTripTicket);
router.post("/", postTripTicket);

router.get("/:id", getTripTicket);
router.put("/:id", putTripTicket);
router.delete("/:id", deleteTripTicket);

module.exports = router;
