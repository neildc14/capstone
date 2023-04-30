const Schedule = require("../models/ScheduleModel");
const User = require("../models/UserModel");
const Ambulance = require("../models/AmbulanceModel");
const throwError = require("../helpers/createError");
const validateInstanceMethod = require("../helpers/validateInstanceMethod");
const isNotValidObjectId = require("../helpers/validateObjectId");
const { isEmpty } = require("../helpers/validateRequest");
const { HTTPResponse } = require("../helpers/sendResponseStatus");

/**GET ALL SCHEDULE */
const getAllSchedule = async (req, res) => {
  try {
    const all_schedule = await Schedule.find()
      .populate("scheduled_personnel", "firstname lastname email user_type")
      .sort({ createdAt: "desc" });

    console.log(all_schedule);
    let errorMessage = "No schedules found.";
    if (all_schedule.length === 0) {
      throwError(errorMessage);
    }

    const success = new HTTPResponse(res, 200, all_schedule);
    return success.sendResponse();
  } catch (error) {
    const failure = new HTTPResponse(res, 400, error.message);
    return failure.sendResponse();
  }
};

/**GET specific schedule */
const getSchedule = async (req, res) => {
  const { id } = req.params;

  try {
    let errorMessage = "Invalid ID.";
    if (isNotValidObjectId(id)) {
      throwError(errorMessage);
    }

    const schedule = await Schedule.findOne({ _id: id })
      .populate("scheduled_personnel", "firstname lastname")
      .sort({ createdAt: "desc" });

    errorMessage = "No schedule found.";
    validateInstanceMethod(schedule, errorMessage);
    const success = new HTTPResponse(res, 200, schedule);
    return success.sendResponse();
  } catch (error) {
    const failure = new HTTPResponse(res, 400, error.message);
    return failure.sendResponse();
  }
};
/**GET specific schedule */
const getSchedulePerDriver = async (req, res) => {
  const { id } = req.params;
  console.log(id, "SCHED ID");

  try {
    let errorMessage = "Invalid ID.";
    if (isNotValidObjectId(id)) {
      throwError(errorMessage);
    }

    const schedule = await Schedule.findOne({ _id: id })
      .populate("scheduled_personnel", "firstname lastname")
      .sort({ createdAt: "desc" });

    errorMessage = "No schedule found.";
    validateInstanceMethod(schedule, errorMessage);
    const success = new HTTPResponse(res, 200, schedule);
    return success.sendResponse();
  } catch (error) {
    const failure = new HTTPResponse(res, 400, error.message);
    return failure.sendResponse();
  }
};

/*POST new schedule */
const postSchedule = async (req, res) => {
  const { scheduled_personnel, status, ambulance } = req.body;

  try {
    let errorMessage = "Scheduled personnel is not defined.";
    isEmpty(scheduled_personnel, errorMessage);

    errorMessage = "Personnel not found.";
    if (isNotValidObjectId(scheduled_personnel)) {
      throwError(errorMessage);
    }

    const personnel = await User.findOne({ _id: scheduled_personnel }).exec();
    validateInstanceMethod(personnel, errorMessage);

    const new_schedule = await Schedule.create({
      scheduled_personnel,
      status,
      ambulance,
    });

    errorMessage = "Failed to post schedule";
    validateInstanceMethod(new_schedule, errorMessage);
    const success = new HTTPResponse(res, 200, new_schedule);
    return success.sendResponse();
  } catch (error) {
    const failure = new HTTPResponse(res, 400, error.message);
    return failure.sendResponse();
  }
};

/**UPDATE schedule */
const putSchedule = async (req, res) => {
  const { id } = req.params;
  const { status, ambulance } = req.body;

  try {
    let errorMessage = "Invalid ID.";
    if (isNotValidObjectId(id)) {
      throwError(errorMessage);
    }

    const schedule = await Schedule.findOne({ _id: id }).exec();

    errorMessage = "No schedule found";
    validateInstanceMethod(schedule);

    errorMessage = "Status is not defined";
    isEmpty(status, errorMessage);

    const all_ambulance = await Ambulance.find();
    const available_ambulances = all_ambulance.filter(
      (amb) => amb.assigned === false && amb.status === "available"
    );
    const available = available_ambulances[0];

    let assigned;
    let amb_status;
    switch (status) {
      case "stand-by":
        assigned = true;
        amb_status = "available";
        break;
      case "driving":
        assigned = true;
        amb_status = "travelling";
        break;
      case "off-duty":
        assigned = false;
        amb_status = "available";
        break;
    }

    const ambulance_id = ambulance !== undefined ? ambulance : available._id;
    const assigned_ambulance = await Ambulance.findByIdAndUpdate(
      ambulance_id,
      {
        assigned,
        status:amb_status,
      },
      {
        new: true,
      }
    );

    console.log(assigned_ambulance);

    const filter = { _id: id };
    const body = {
      status,
      ambulance: assigned_ambulance._id,
      ambulance_plate: assigned_ambulance.license_plate,
    };
    const updated_schedule = await Schedule.findOneAndUpdate(filter, body, {
      new: true,
    });

    console.log(updated_schedule, "UPDATED SCHED");

    errorMessage = "Failed to update scheduled personnel";
    validateInstanceMethod(updated_schedule, errorMessage);
    const success = new HTTPResponse(res, 200, updated_schedule);
    return success.sendResponse();
  } catch (error) {
    const failure = new HTTPResponse(res, 400, error.message);
    return failure.sendResponse();
  }
};

/*DELETE Schedule */
const deleteSchedule = async (req, res) => {
  const { id } = req.params;
  try {
    let errorMessage = "Invalid ID.";
    if (isNotValidObjectId(id)) {
      throwError(errorMessage);
    }

    const deleted_schedule = await Schedule.findOneAndDelete({
      _id: id,
    }).exec();

    errorMessage = "Failed to delete schedule";
    validateInstanceMethod(deleted_schedule, errorMessage);
    const success = new HTTPResponse(res, 200, {
      message: "Schedule deleted successfully.",
    });
    return success.sendResponse();
  } catch (error) {
    const failure = new HTTPResponse(res, 400, error.message);
    return failure.sendResponse();
  }
};

const deleteAll = async (req, res) => {
  await Schedule.deleteMany({});
  const success = new HTTPResponse(res, 200, {
    message: "Schedule deleted successfully.",
  });
  return success.sendResponse();
};

module.exports = {
  getAllSchedule,
  getSchedule,
  getSchedulePerDriver,
  postSchedule,
  putSchedule,
  deleteSchedule,
  deleteAll,
};
