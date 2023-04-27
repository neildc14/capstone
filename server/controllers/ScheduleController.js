const Schedule = require("../models/ScheduleModel");
const User = require("../models/UserModel");
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
  console.log(req.body, "POST");
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
  const { scheduled_personnel, status, ambulance } = req.body;
  console.log(req.body, "SCHED");
  try {
    let errorMessage = "Invalid ID.";
    if (isNotValidObjectId(id)) {
      throwError(errorMessage);
    }

    const schedule = await Schedule.findOne({ _id: id }).exec();

    errorMessage = "No schedule found";
    validateInstanceMethod(schedule);

    // errorMessage = "Scheduled personnel is not defined";
    // isEmpty(scheduled_personnel, errorMessage);

    errorMessage = "Status is not defined";
    isEmpty(status, errorMessage);

    // errorMessage = "Personnel not found.";
    // if (isNotValidObjectId(scheduled_personnel)) {
    //   throwError(errorMessage);
    // }

    // const personnel = await User.findOne({ _id: scheduled_personnel }).exec();
    // validateInstanceMethod(personnel, errorMessage);

    const filter = { _id: id };
    const body = req.body;
    const updated_schedule = await Schedule.findOneAndUpdate(filter, body);

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

module.exports = {
  getAllSchedule,
  getSchedule,
  getSchedulePerDriver,
  postSchedule,
  putSchedule,
  deleteSchedule,
};
