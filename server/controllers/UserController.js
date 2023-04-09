const User = require("../models/UserModel");
const createToken = require("../helpers/createToken");
const { HTTPResponse } = require("../helpers/sendResponseStatus");
const throwError = require("../helpers/createError");

const signUp = async (req, res) => {
  const { firstname, lastname, email, password, user_type } = req.body;

  try {
    const new_user = await User.signup(
      firstname,
      lastname,
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
  const { email, password, user_type } = req.body;

  try {
    const login_user = await User.login(email, password, user_type);
    const id = login_user._id;
    const fullName = login_user.fullName;
    const type = login_user.user_type;
    const token = createToken(login_user._id);
    const success = new HTTPResponse(res, 200, {
      id,
      fullName,
      email,
      type,
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
        };
      });
    console.log(all_drivers);

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

module.exports = {
  signUp,
  logIn,
  getDrivers,
};
