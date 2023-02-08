const sendSuccessfullResponse = (res, code, data) => {
  return res.status(code).json(data);
};

const sendErrorResponse = (res, error) => {
  return res.status(400).json({ error: error.message });
};

const sendHTTPResponse = (res, status_code, data) => {
  return res.status(status_code).json(data);
};

module.exports = {
  sendErrorResponse,
  sendSuccessfullResponse,
  sendHTTPResponse,
};
