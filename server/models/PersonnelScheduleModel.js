const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PersonnelScheduleModel = new Schema(
  {
    scheduled_personnel: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("PersonnelSchedule", PersonnelScheduleModel);
