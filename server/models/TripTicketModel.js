const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TripTicketSchema = new Schema(
  {
    ambulance_personnel: {
      type: Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    destination: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("TripTicket", TripTicketSchema);
