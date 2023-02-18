const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const throwError = require("../helpers/createError");

const UserSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  user_type: {
    type: String,
    default: "requestor",
    enum: ["administrator", "ambulance_personnel", "requestor"],
  },
});

UserSchema.statics.signup = async function (
  username,
  email,
  password,
  user_type
) {
  const exists = await this.findOne({ email });

  let errorMessage = "This email is already in use.";
  if (exists) {
    throwError(errorMessage);
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  const user = await this.create({
    username,
    email,
    user_type,
    password: hash,
  });
  return user;
};

UserSchema.statics.login = async function (email, password, user_type) {
  const user = await this.findOne({ email, user_type });

  let errorMessage = `${user_type} account not found.`;
  if (!user) {
    throwError(errorMessage);
  }

  const matchPassword = await bcrypt.compare(password, user.password);

  errorMessage = "Incorrect password";
  if (!matchPassword) {
    throwError(errorMessage);
  }

  return user;
};
module.exports = mongoose.model("User", UserSchema);
