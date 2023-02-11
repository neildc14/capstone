const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TripTicketSchema = new Schema(
  {
    ambulance_personnel: {
      type: Schema.Types.ObjectId,
      ref: "Users",
    },
    ambulance: { type: Schema.Types.ObjectId, ref: "Ambulance" },
    destination: { type: String, required:true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("TripTicket", TripTicketSchema);
