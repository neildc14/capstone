const User = require("../models/UserModel");
const Schedule = require("../models/ScheduleModel");
const createToken = require("../helpers/createToken");
const { HTTPResponse } = require("../helpers/sendResponseStatus");
const throwError = require("../helpers/createError");
const isNotValidObjectId = require("../helpers/validateObjectId");
const validateInstanceMethod = require("../helpers/validateInstanceMethod");

const signUp = async (req, res) => {
  const { firstname, lastname, email, password, contact, address, user_type } =
    req.body;

  try {
    const new_user = await User.signup(
      firstname,
      lastname,
      contact,
      address,
      email,
      password,
      user_type
    );
    const id = new_user._id;
    const token = createToken(new_user._id);
    const success = new HTTPResponse(res, 201, {
      id,
      firstname,
      lastname,
      email,
      contact,
      address,
      user_type,
      token,
    });
    return success.sendResponse();
  } catch (error) {
    const failure = new HTTPResponse(res, 400, error.message);
    return failure.sendResponse();
  }
};

const logIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const login_user = await User.login(email, password);
    const id = login_user._id;
    const fullName = login_user.fullName;
    const user_type = login_user.user_type;
    const token = createToken(login_user._id);
    const success = new HTTPResponse(res, 200, {
      id,
      fullName,
      email,
      user_type,
      token,
    });
    return success.sendResponse();
  } catch (error) {
    const failure = new HTTPResponse(res, 400, error.message);
    return failure.sendResponse();
  }
};

const getDrivers = async (req, res) => {
  try {
    const users = await User.find();
    const all_drivers = users
      .filter((user) => user.user_type === "ambulance_personnel")
      .map((user) => {
        return {
          _id: user._id,
          email: user.email,
          user_type: user.user_type,
          firstname: user.firstname,
          lastname: user.lastname,
          contact: user.contact,
          address: user.address,
        };
      });

    let errorMessage = "No trip ambulance drivers were found";
    if (all_drivers.length === 0) {
      throwError(errorMessage);
    }
    const success = new HTTPResponse(res, 200, all_drivers);
    return success.sendResponse();
  } catch (error) {
    const failure = new HTTPResponse(res, 400, error.message);
    return failure.sendResponse();
  }
};

const deleteDriver = async (req, res) => {
  const { id } = req.params;

  try {
    let errorMessage = "Invalid ID.";
    if (isNotValidObjectId(id)) {
      throwError(errorMessage);
    }

    const deleted_driver = await User.findOneAndDelete({ _id: id });

    errorMessage = "Failed to delete driver";
    validateInstanceMethod(deleted_driver, errorMessage);

    const query = { scheduled_personnel: id };
    if (Schedule.find(query)) {
      const deleted_schedule = await Schedule.deleteMany(query);
      errorMessage = "Failed to delete schedule";
      validateInstanceMethod(deleted_schedule, errorMessage);
    }

    const success = new HTTPResponse(res, 200, {
      message: "Driver deleted successfully!",
    });

    return success.sendResponse();
  } catch (error) {
    const failure = new HTTPResponse(res, 400, error.message);
    return failure.sendResponse();
  }
};

module.exports = {
  signUp,
  logIn,
  getDrivers,
  deleteDriver,
};
