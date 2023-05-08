const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NotificationSchema = new Schema(
  {
    message: { type: String },
    read: { type: Boolean },
    user: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Notification", NotificationSchema);
