const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
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

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file?.originalname);
  },
});

const upload = multer({ storage: storage });
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
