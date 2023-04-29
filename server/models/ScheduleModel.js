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
      default: "off-duty",
      enum: ["stand-by", "driving", "off-duty"],
      required: true,
    },
    ambulance: { type: Schema.Types.ObjectId, ref: "Ambulance" },
    ambulance_plate:{type:String}
  },
  { timestamps: true }
);

module.exports = mongoose.model("PersonnelSchedule", ScheduleSchema);
