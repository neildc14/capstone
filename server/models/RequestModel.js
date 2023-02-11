const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/*
  @request_id: requuired 

*/

const RequestSchema = new Schema(
  {
    requestor_id: { type: Schema.Types.ObjectId, ref: "User" }, //required
    location: { type: String },
    status: {
      type: String,
      default: "pending",
      enum: ["pending", "approved", "fulfilled"],
    },
    referral_slip: { data: Buffer, contentType: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Request", RequestSchema);
