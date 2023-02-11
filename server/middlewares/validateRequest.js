const validator = require("validator");

const validateUserInput = (req, res, next) => {
  const validationErrors = validateBody(req.body);

  if (validationErrors.length > 0) {
    return res.status(400).send({ validationErrors });
  }

  next();
};

function validateBody(body) {
  const validationErrors = [];

  if (body.username && validator.isEmpty(body.username)) {
    validationErrors.push({
      field: "username",
      message: "Please fill username",
    });
  }
  if (!validator.isEmail(body.email)) {
    validationErrors.push({ field: "email", message: "Invalid email address" });
  }
  if (!body.password || body.password.length < 8) {
    validationErrors.push({
      field: "password",
      message: "Password must be at least 8 characters long",
    });
  }

  return validationErrors;
}

module.exports = validateUserInput;
