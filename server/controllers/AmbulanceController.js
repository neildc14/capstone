const Ambulance = require("../models/AmbulanceModel");
const TripTicket = require("../models/TripTicketModel");
const { HTTPResponse } = require("../helpers/sendResponseStatus");
const throwError = require("../helpers/createError");
const isNotObjectId = require("../helpers/validateObjectId");
const { isEmpty } = require("../helpers/validateRequest");
const validateInstanceMethod = require("../helpers/validateInstanceMethod");

//GET all ambulance
const getAllAmbulance = async (req, res) => {
  try {
    const all_ambulance = await Ambulance.find().sort({ createdAt: "desc" });

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

const getAmbulanceFromTripTicket = async (req, res) => {
  const { ticket_id } = req.query;

  try {
    const trip_ticket = await TripTicket.findOne({ _id: ticket_id });
    let errorMessage = "No trip ticket found";
    validateInstanceMethod(trip_ticket, errorMessage);

    const ambulance_id = trip_ticket.ambulance;

    const ambulance = await Ambulance.findById(ambulance_id);
    errorMessage = "No ambulance found";
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

    const filter = { _id: id };
    const body = req.body;
    const updated_ambulance = await Ambulance.findOneAndUpdate(filter, body);
    console.log(updated_ambulance, "AMBULANCE");
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

    errorMessage = "Failed to delete ambulance";
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
  getAmbulanceFromTripTicket,
  postAmbulance,
  putAmbulance,
  deleteAmbulance,
};
