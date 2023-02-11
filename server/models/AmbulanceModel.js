const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AmbulanceSchema = new Schema(
  {
    license_plate: { type: String, required: true }, 
    status: {
      type: String,
      default: "available",
      enum: ["available", "maintenance", "travelling"],
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Ambulance", AmbulanceSchema);
