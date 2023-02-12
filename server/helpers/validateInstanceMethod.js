const createError = require("./createError");

const validateInstanceMethod = (instance, errorMessage) => {
  if (!instance) return createError(errorMessage);
};

module.exports = validateInstanceMethod;
