const express = require("express");
const router = express.Router();
const upload = require("../helpers/uploadImage");

const {
  getAllRequests,
  getAllRequestsPerRequestor,
  getAllRequestsHandledByDriver,
  getRequest,
  postRequest,
  putRequest,
  deleteRequest,
} = require("../controllers/RequestController");
const corsHeaders = require("../middlewares/headers");
const requireAuth = require("../middlewares/requireAuth");

router.use(requireAuth);

//universal requests
router.get("/all", corsHeaders, getAllRequests);

router.get("/requestor", corsHeaders, getAllRequestsPerRequestor);
router.post(
  "/requestor",
  corsHeaders,
  upload.single("referral_slip"),
  postRequest
);

router.get("/requestor/:id", corsHeaders, getRequest);
router.put("/requestor/:id", corsHeaders, putRequest);
router.delete("/requestor/:id", corsHeaders, deleteRequest);

//for drivers
router.get("/handled", corsHeaders, getAllRequestsHandledByDriver);

module.exports = router;
