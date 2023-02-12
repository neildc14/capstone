const Request = require("../models/RequestModel");
const createError = require("../helpers/createError");
const isNotValidObjectId = require("../helpers/validateObjectId");
const { HTTPResponse } = require("../helpers/sendResponseStatus");
const { isEmpty } = require("../helpers/validateRequest");
const validateInstanceMethod = require("../helpers/validateInstanceMethod");

//GET all the requests
const getAllRequests = async (req, res) => {
  try {
    const all_requests = await Request.find().sort({ createdAt: 1 });
    let errorMessage = "No requests found.";
    if (all_requests.length === 0) {
      return createError(errorMessage);
    }
    const success = new HTTPResponse(res, 200, all_requests);
    return success.sendResponse();
  } catch (error) {
    const failure = new HTTPResponse(res, 400, error.message);
    return failure.sendResponse();
  }
};

//GET specific request
const getRequest = async (req, res) => {
  const { id } = req.params;

  try {
    let errorMessage = "Invalid ID";
    if (isNotValidObjectId(id)) {
      return createError(errorMessage);
    }

    const request = await Request.findOne({ _id: id }).exec();

    errorMessage = "No request found.";
    validateInstanceMethod(request, errorMessage);
    const success = new HTTPResponse(res, 200, request);
    return success.sendResponse();
  } catch (error) {
    const failure = new HTTPResponse(res, 400, error.message);
    return failure.sendResponse();
  }
};

//POST new request
const postRequest = async (req, res) => {
  const { requestor_id, location, status } = req.body;

  try {
    let errorMessage = "Location is not defined";
    isEmpty(location, errorMessage);

    const new_request = await Request.create({
      requestor_id,
      location,
      status,
    });

    errorMessage = "Failed to post request.";
    validateInstanceMethod(new_request, errorMessage);
    const success = new HTTPResponse(res, 200, new_request);
    return success.sendResponse();
  } catch (error) {
    const failure = new HTTPResponse(res, 400, error.message);
    return failure.sendResponse();
  }
};

//UPDATE existing request
const putRequest = async (req, res) => {
  const { id } = req.params;

  try {
    let errorMessage = "Invalid ID";
    if (isNotValidObjectId(id)) {
      return createError(errorMessage);
    }

    const request = await Request.findOne({ _id: id }).exec();

    errorMessage = "No request found.";
    validateInstanceMethod(request, errorMessage);

    errorMessage = "Location is not defined";
    const location = req.body.location;
    isEmpty(location, errorMessage);

    const updated_request = await Request.findOneAndUpdate({
      id,
      ...req.body,
    });

    errorMessage = "Failed to update request.";
    validateInstanceMethod(updated_request, errorMessage);
    const success = new HTTPResponse(res, 201, updated_request);
    return success.sendResponse();
  } catch (error) {
    const failure = new HTTPResponse(res, 400, error.message);
    return failure.sendResponse();
  }
};

//DELETE existing request
const deleteRequest = async (req, res) => {
  const { id } = req.params;

  try {
    let errorMessage = "Invalid ID.";
    if (isNotValidObjectId(id)) {
      return createError(errorMessage);
    }

    const deleted_request = await Request.findOneAndDelete({ _id: id });

    errorMessage = "Failed to delete request";
    validateInstanceMethod(deleted_request, errorMessage);
    const success = new HTTPResponse(res, 200, {
      message: "Request deleted successfully!",
    });
    return success.sendResponse();
  } catch (error) {
    const failure = new HTTPResponse(res, 400, error.message);
    return failure.sendResponse();
  }
};

module.exports = {
  getAllRequests,
  getRequest,
  postRequest,
  putRequest,
  deleteRequest,
};
