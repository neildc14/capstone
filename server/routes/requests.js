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

router.get("/", getAllRequests);
router.post("/", upload.single("referral_slip"), postRequest);

router.get("/:id", getRequest);
router.put("/:id", putRequest);
router.delete("/:id", deleteRequest);

module.exports = router;
