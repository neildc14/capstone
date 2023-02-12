const Request = require("../models/RequestModel");
const createError = require("../helpers/createError");
const isNotValidObjectId = require("../helpers/validateObjectId");
const { HTTPResponse } = require("../helpers/sendResponseStatus");
const { isEmpty } = require("../helpers/validateRequest");

//GET all the requests
const getAllRequests = async (req, res) => {
  try {
    const all_requests = await Request.find().sort({ createdAt: 1 });
    if (all_requests.length === 0) {
      return createError("No requests found.");
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
    if (isNotValidObjectId(id)) {
      return createError("Invalid ID");
    }

    const request = await Request.findOne({ _id: id }).exec();
    if (!request) {
      return createError("No request found.");
    }
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
    //validate request body
    isEmpty(location, "Location is not defined");

    const new_request = await Request.create({
      requestor_id,
      location,
      status,
    });

    if (!new_request) {
      return createError("Failed to post request.");
    }

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
    if (isNotValidObjectId(id)) {
      return createError("Invalid ID");
    }

    const request = await Request.findOne({ _id: id }).exec();
    if (!request) {
      return createError("No request found.");
    }

    //validate request body
    isEmpty(req.body.location, "Location is not defined");

    const updated_request = await Request.findOneAndUpdate({
      id,
      ...req.body,
    });

    if (!updated_request) {
      return createError("Failed to update request.");
    }

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
    if (isNotValidObjectId(id)) {
      return createError("Invalid ID.");
    }

    const deleted_request = await Request.findOneAndDelete({ _id: id });
    if (!deleted_request) {
      return createError("Failed to delete request");
    }

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
