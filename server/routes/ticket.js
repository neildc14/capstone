const express = require("express");
const router = express.Router();
const {
  getAllTripTicket,
  getAllTripTicketDriver,
  getAllTripTicketRequestor,
  getTripTicket,
  postTripTicket,
  putTripTicket,
  deleteTripTicket,
} = require("../controllers/TripTicketController");
const corsHeaders = require("../middlewares/headers");
const requireAuth = require("../middlewares/requireAuth");

router.use(requireAuth);

router.get("/all", corsHeaders, getAllTripTicket);
router.post("/all", corsHeaders, postTripTicket);

router.get("/all/:id", corsHeaders, getTripTicket);
router.put("/all/:id", corsHeaders, putTripTicket);
router.delete("/all/:id", corsHeaders, deleteTripTicket);

router.get("/requestor", corsHeaders, getAllTripTicketRequestor);
router.get("/ambulance_personnel", corsHeaders, getAllTripTicketDriver);

module.exports = router;
