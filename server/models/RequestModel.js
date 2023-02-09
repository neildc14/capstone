const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/*
  @request_id: requuired 

*/

const RequestSchema = new Schema(
  {
    requestor_id: { type: Schema.Types.ObjectId, ref: "User" },
    location: { type: String, required: true },
    status: {       
      type: String,
      default: "pending",
      enum: ["pending", "approved", "fulfilled"],
      required: true,
    },
    referral_slip: { data: Buffer, contentType: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Request", RequestSchema);
