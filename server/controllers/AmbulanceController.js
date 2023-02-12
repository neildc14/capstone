const Ambulance = require("../models/AmbulanceModel");
const {
  sendHTTPErrorResponse,
  HTTPResponse,
} = require("../helpers/sendResponseStatus");
const throwError = require("../helpers/createError");
const isNotObjectId = require("../helpers/validateObjectId");
const { isEmpty } = require("../helpers/validateRequest");
const validateInstanceMethod = require("../helpers/validateInstanceMethod");

//GET all ambulance
const getAllAmbulance = async (req, res) => {
  try {
    const all_ambulance = await Ambulance.find().sort({ createdAt: 1 });

    let errorMessage = "No ambulances found";
    if (all_ambulance.length === 0) {
      throwError(errorMessage);
    }
    const success = new HTTPResponse(res, 200, all_ambulance);
    return success.sendResponse();
  } catch (error) {
    const failure = new HTTPResponse(res, 400, error.message);
    return failure.sendResponse();
  }
};

//GET specific ambulance
const getAmbulance = async (req, res) => {
  const { id } = req.params;

  try {
    let errorMessage = "Invalid ID.";
    if (isNotObjectId(id)) {
      throwError(errorMessage);
    }

    const ambulance = await Ambulance.findOne({ _id: id }).exec();

    errorMessage = "No ambulance found.";
    validateInstanceMethod(ambulance, errorMessage);
    const success = new HTTPResponse(res, 200, ambulance);
    return success.sendResponse();
  } catch (error) {
    const failure = new HTTPResponse(res, 400, error.message);
    return failure.sendResponse();
  }
};

//POST new ambulance
const postAmbulance = async (req, res) => {
  const { license_plate, status } = req.body;
  try {
    let errorMessage = "License plate is not defined.";
    isEmpty(license_plate, errorMessage);

    const new_ambulance = await Ambulance.create({
      license_plate,
      status,
    });

    errorMessage = "Failed to create new ambulance";
    validateInstanceMethod(new_ambulance, errorMessage);
    const success = new HTTPResponse(res, 200, new_ambulance);
    return success.sendResponse();
  } catch (error) {
    const failure = new HTTPResponse(res, 400, error.message);
    return failure.sendResponse();
  }
};

//UPDATE specific ambulance
const putAmbulance = async (req, res) => {
  const { id } = req.params;
  try {
    let errorMessage = "Invalid ID.";
    if (isNotObjectId(id)) {
      throwError(errorMessage);
    }

    const ambulance = await Ambulance.findOne({ _id: id }).exec();

    errorMessage = "No ambulance found";
    validateInstanceMethod(ambulance, errorMessage);

    errorMessage = "License plate is not defined.";
    isEmpty(req.body.license_plate, errorMessage);

    const updated_ambulance = await Ambulance.findOneAndUpdate({
      id,
      ...req.body,
    });

    errorMessage = "Failed to update ambulance status.";
    validateInstanceMethod(updated_ambulance, errorMessage);
    const success = new HTTPResponse(res, 201, updated_ambulance);
    return success.sendResponse();
  } catch (error) {
    const failure = new HTTPResponse(res, 400, error.message);
    return failure.sendResponse();
  }
};

//DELETE specific ambulance
const deleteAmbulance = async (req, res) => {
  const { id } = req.params;
  try {
    let errorMessage = "Invalid ID.";
    if (isNotObjectId(id)) {
      throwError(errorMessage);
    }
    const deleted_ambulance = await Ambulance.findOneAndDelete({ _id: id });

    errorMessage = "Failed to deleted ambulance";
    validateInstanceMethod(deleted_ambulance, errorMessage);
    const success = new HTTPResponse(res, 200, {
      message: "Ambulance deleted successfully!",
    });
    return success.sendResponse();
  } catch (error) {
    const failure = new HTTPResponse(res, 400, error.message);
    return failure.sendResponse();
  }
};

module.exports = {
  getAllAmbulance, 
  getAmbulance,
  postAmbulance,
  putAmbulance,
  deleteAmbulance,
};
