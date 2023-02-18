const User = require("../models/UserModel");
const createToken = require("../helpers/createToken");
const { HTTPResponse } = require("../helpers/sendResponseStatus");

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

module.exports = {
  signUp,
  logIn,
};
