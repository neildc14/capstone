const Request = require("../models/RequestModel");
const path = require("path");

const throwError = require("../helpers/createError");
const isNotValidObjectId = require("../helpers/validateObjectId");
const { HTTPResponse } = require("../helpers/sendResponseStatus");
const { isEmpty } = require("../helpers/validateRequest");
const validateInstanceMethod = require("../helpers/validateInstanceMethod");

const getAllRequests = async (req, res) => {
  try {
    const all_requests = await Request.find()
      .sort({ createdAt: "desc" })
      .exec();

    let errorMessage = "No requests found.";
    if (all_requests.length === 0) {
      return throwError(errorMessage);
    }
    const success = new HTTPResponse(res, 200, all_requests);
    return success.sendResponse();
  } catch (error) {
    const failure = new HTTPResponse(res, 400, error.message);
    return failure.sendResponse();
  }
};

//GET all the requests per user
const getAllRequestsPerRequestor = async (req, res) => {
  const user_id = await req.user._id;

  try {
    const all_requests = await Request.find({ user_id })
      .sort({ createdAt: "desc" })
      .exec();

    let errorMessage = "No requests found.";
    if (all_requests.length === 0) {
      return throwError(errorMessage);
    }
    const success = new HTTPResponse(res, 200, all_requests);
    return success.sendResponse();
  } catch (error) {
    const failure = new HTTPResponse(res, 400, error.message);
    return failure.sendResponse();
  }
};

const getAllRequestsHandledByDriver = async (req, res) => {
  const user_id = await req.user._id;

  try {
    let errorMessage = "Invalid ID";
    if (isNotValidObjectId(user_id)) {
      return throwError(errorMessage);
    }

    const all_requests = await Request.find()
      .sort({ createdAt: "desc" })
      .exec();

    errorMessage = "No requests found.";
    if (all_requests.length === 0) {
      return throwError(errorMessage);
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
  const user_id = await req.user._id;

  try {
    let errorMessage = "Invalid ID";
    if (isNotValidObjectId(id)) {
      return throwError(errorMessage);
    }

    const request = await Request.findOne({ _id: id })
      .sort({ createdAt: "desc" })
      .exec();

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
  const user_id = await req.user._id;
  const {
    first_name,
    last_name,
    pickup_location,
    transfer_location,
    status,
    patient_condition,
    confirmation,
    referral_slip,
  } = req.body;
  console.log(req.body);

  try {
    let errorMessage = "Location is not defined";
    isEmpty(pickup_location, errorMessage);

    const new_request = await Request.create({
      user_id,
      first_name,
      last_name,
      pickup_location,
      transfer_location,
      status,
      patient_condition,
      confirmation,
      /*referral_slip: {
        data: fs.readFileSync(
          path.join(__dirname + "/uploads/" + req.file.filename)
        ),
        contentType: "image/png",
      },*/
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
  const { pickup_location } = req.body;
  console.log(req.body, "REQ");

  try {
    let errorMessage = "Invalid ID";
    if (isNotValidObjectId(id)) {
      return throwError(errorMessage);
    }

    const request = await Request.findOne({ _id: id }).exec();

    errorMessage = "No request found.";
    validateInstanceMethod(request, errorMessage);

    errorMessage = "Location is not defined";
    isEmpty(pickup_location, errorMessage);

    const filter = { _id: id };
    const body = req.body;
    const updated_request = await Request.findOneAndUpdate(filter, body);

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
      return throwError(errorMessage);
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
  getAllRequestsPerRequestor,
  getAllRequestsHandledByDriver,
  getRequest,
  postRequest,
  putRequest,
  deleteRequest,
};
