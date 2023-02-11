const validator = require("validator");

const isEmpty = (field) => {
  return validator.isEmpty(field);
};

module.exports = { isEmpty };
