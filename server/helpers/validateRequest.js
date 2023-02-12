const validator = require("validator");
const createError = require("./createError");

const isEmpty = (request, errorMessage) => {
  if (!request || validator.isEmpty(request)) {
    return createError(errorMessage);
  }
};


module.exports = { isEmpty };
