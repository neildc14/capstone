const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const throwError = require("../helpers/createError");

const UserSchema = new Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    contact: { type: String, required: true },
    address: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    user_type: {
      type: String,
      default: "requestor",
      enum: ["administrator", "ambulance_personnel", "requestor"],
    },
  },
  { toJSON: { virtuals: true } }
);

UserSchema.virtual("fullName").get(function () {
  return this.firstname + " " + this.lastname;
});

UserSchema.statics.signup = async function (
  firstname,
  lastname,
  contact,
  address,
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
    firstname,
    lastname,
    contact,
    address,
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
