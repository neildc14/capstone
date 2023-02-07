const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RequestSchema = new Schema(
  {
    requestor_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
    location: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "approved", "fulfilled"],
      required: true,
    },
    referral_slip: { data: Buffer, contentType: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Request", RequestSchema);
