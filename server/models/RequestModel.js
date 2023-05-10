const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/*
  @request_id: requuired 

*/

const RequestSchema = new Schema(
  {
    user_id: { type: String, required: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    pickup_location: { type: String, required: true },
    transfer_location: { type: String },
    status: {
      type: String,
      default: "pending",
      enum: ["pending", "approved", "fulfilled", "rejected"],
    },
    patient_condition: { type: String },
    referral_slip: { type:String },
    confirmation: { type: Boolean, required: true },
    handled_by: { type: Schema.Types.ObjectId, ref: "User" },
    ticket_id: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Request", RequestSchema);
