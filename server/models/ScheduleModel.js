const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ScheduleSchema = new Schema(
  {
    scheduled_personnel: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      default: "stand-by",
      enum: ["stand-by", "driving", "off-duty"],
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("PersonnelSchedule", ScheduleSchema);
