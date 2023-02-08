const Request = require("../models/RequestModel");
const createError = require("../helpers/createError");
const isNotValidObjectId = require("../helpers/validateObjectId");
const { sendHTTPResponse } = require("../helpers/sendResponseStatus");

//GET all the requests
const getAllRequests = async (req, res) => {
  const all_requests = await Request.find().sort({ createdAt: 1 });

  try {
    if (all_requests.length === 0) {
      return createError("No requests found.");
    }
    sendHTTPResponse(res, 200, all_requests);
  } catch (error) {
    sendHTTPResponse(res, 400, { message: error.message });
  }
};

//GET specific request
const getRequest = async (req, res) => {
  const { id } = req.params;

  try {
    if (isNotValidObjectId(id)) {
      return createError("Invalid ID");
    }

    const request = await Request.findOne({ _id: id }).exec();
    if (!request) {
      return createError("No request found.");
    }
    sendHTTPResponse(res, 200, request);
  } catch (error) {
    sendHTTPResponse(res, 400, { message: error.message });
  }
};

//POST new request
const postRequest = async (req, res) => {
  const { requestor_id, location, status } = req.body;

  try {
    const new_request = await Request.create({
      requestor_id,
      location,
      status,
    });
    if (!new_request) {
      return createError("Failed to post request.");
    }
    sendHTTPResponse(res, 200, new_request);
  } catch (error) {
    sendHTTPResponse(res, 400, { message: error.message });
  }
};

//EDIT existing request
const putRequest = async (req, res) => {
  const { id } = req.params;

  try {
    if (isNotValidObjectId(id)) {
      return createError("Invalid ID");
    }

    const request = await Request.findOne({ _id: id }).exec();
    if (!request) {
      return createError("No request found.");
    }

    const updated_request = await Request.findOneAndUpdate({
      id,
      ...req.body,
    });

    if (!updated_request) {
      return createError("Failed to update request.");
    }
    sendHTTPResponse(res, 201, updated_request);
  } catch (error) {
    sendHTTPResponse(res, 400, { message: error.message });
  }
};

//DELETE existing request
const deleteRequest = async (req, res) => {
  const { id } = req.params;

  try {
    if (isNotValidObjectId(id)) {
      return createError("Invalid ID.");
    }

    const request = await Request.findOne({ _id: id }).exec();
    if (!request) {
      return createError("No request found.");
    }

    const deleted_request = await Request.findOneAndDelete({ _id: id });
    if (!deleted_request) {
      return createError("Failed to delete request");
    }
    sendHTTPResponse(res, 200, {
      message: "Request deleted successfully!",
    });
  } catch (error) {
    sendHTTPResponse(res, 400, { message: error.message });
  }
};

module.exports = {
  getAllRequests,
  getRequest,
  postRequest,
  putRequest,
  deleteRequest,
};
