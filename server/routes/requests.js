const express = require("express");
const router = express.Router();
const upload = require("../helpers/uploadImage");

const {
  getAllRequests,
  getAllRequestsHandledByDriver,
  getRequest,
  postRequest,
  putRequest,
  deleteRequest,
} = require("../controllers/RequestController");
const corsHeaders = require("../middlewares/headers");
const requireAuth = require("../middlewares/requireAuth");

router.use(requireAuth);

router.get("/", corsHeaders, getAllRequests);
router.post("/", corsHeaders, upload.single("referral_slip"), postRequest);

router.get("/:id", corsHeaders, getRequest);
router.put("/:id", corsHeaders, putRequest);
router.delete("/:id", corsHeaders, deleteRequest);

//for drivers
router.get("/handled", corsHeaders, getAllRequestsHandledByDriver);

module.exports = router;
