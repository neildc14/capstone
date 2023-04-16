const express = require("express");
const router = express.Router();
const upload = require("../helpers/uploadImage");

const {
  getAllRequests,
  getRequest,
  postRequest,
  putRequest,
  deleteRequest,
} = require("../controllers/RequestController");
const corsHeaders = require("../middlewares/headers");

router.get("/", corsHeaders, getAllRequests);
router.post("/", corsHeaders, upload.single("referral_slip"), postRequest);

router.get("/:id", corsHeaders, getRequest);
router.put("/:id", corsHeaders, putRequest);
router.delete("/:id", corsHeaders, deleteRequest);

module.exports = router;
