const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TripTicketSchema = new Schema(
  {
    ambulance_personnel: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    ambulance: {
      type: Schema.Types.ObjectId,
      ref: "Ambulance",
      required: true,
    },
    destination: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("TripTicket", TripTicketSchema);
