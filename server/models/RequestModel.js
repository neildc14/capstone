const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/*
  @request_id: requuired 

*/

const RequestSchema = new Schema(
  {
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    pickup_location: { type: String, required: true },
    transfer_location: { type: String },
    status: {
      type: String,
      default: "pending",
      enum: ["pending", "approved", "fulfilled"],
    },
    patient_condition: { type: String },
    referral_slip: { data: Buffer, contentType: String },
    confirmation:{type:Boolean, required:true}
  },
  { timestamps: true }
);

module.exports = mongoose.model("Request", RequestSchema);
