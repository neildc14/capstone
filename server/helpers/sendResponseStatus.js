const sendSuccessfullResponse = (res, code, data) => {
  return res.status(code).json(data);
};

const sendErrorResponse = (res, error) => {
  return res.status(400).json({ error: error.message });
};

const sendHTTPResponse = (res, status_code, data) => {
  return res.status(status_code).json(data);
};

function HTTPResponse(res, status_code, data) {
  this.res = res;
  this.status_code = status_code;
  this.data = data;
}

HTTPResponse.prototype.sendResponse = function () {
  return this.res.status(this.status_code).json(this.data);
};

module.exports = {
  sendErrorResponse,
  sendSuccessfullResponse,
  sendHTTPResponse,
  HTTPResponse,
};
