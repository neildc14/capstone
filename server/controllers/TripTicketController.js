const TripTicket = require("../models/TripTicketModel");
const User = require("../models/UserModel");
const Ambulance = require("../models/AmbulanceModel");
const throwError = require("../helpers/createError");
const isNotValidObjectId = require("../helpers/validateObjectId");
const { HTTPResponse } = require("../helpers/sendResponseStatus");
const { isEmpty } = require("../helpers/validateRequest");
const validateInstanceMethod = require("../helpers/validateInstanceMethod");

const getAllTripTicket = async (req, res) => {
  try {
    const all_trip_tickets = await TripTicket.find()
      .populate("ambulance_personnel", "firstname lastname")
      .populate("ambulance", "license_plate")
      .sort({ createdAt: "desc" });

    let errorMessage = "No trip tickets were found";
    if (all_trip_tickets.length === 0) {
      throwError(errorMessage);
    }
    const success = new HTTPResponse(res, 200, all_trip_tickets);
    return success.sendResponse();
  } catch (error) {
    const failure = new HTTPResponse(res, 400, error.message);
    return failure.sendResponse();
  }
};

//GET specific trip ticket
const getTripTicket = async (req, res) => {
  const { id } = req.params;
  try {
    let errorMessage = "Invalid ID.";
    if (isNotValidObjectId(id)) {
      throwError(errorMessage);
    }

    const trip_ticket = await TripTicket.findOne({ _id: id })
      .populate("ambulance_personnel", "firstname lastname")
      .populate("ambulance", "license_plate")
      .sort({ createdAt: "desc" })
      .exec();

    errorMessage = "Trip ticket not found.";
    validateInstanceMethod(trip_ticket, errorMessage);
    const success = new HTTPResponse(res, 200, trip_ticket);
    return success.sendResponse();
  } catch (error) {
    const failure = new HTTPResponse(res, 400, error.message);
    return failure.sendResponse();
  }
};

//POST new trip ticket
const postTripTicket = async (req, res) => {
  const { ambulance_personnel, ambulance, destination } = req.body;

  try {
    let errorMessage = "Destination is not defined.";
    isEmpty(destination, errorMessage);

    errorMessage = "Invalid ambulance personnel ID.";
    if (isNotValidObjectId(ambulance_personnel)) {
      throwError(errorMessage);
    }
    errorMessage = "Invalid ambulance ID.";
    if (isNotValidObjectId(ambulance)) {
      throwError(errorMessage);
    }

    errorMessage = "Ambulance personnel not found";
    isEmpty(destination, errorMessage);
    const find_personnel = await User.findOne({
      _id: ambulance_personnel,
    }).exec();
    validateInstanceMethod(find_personnel, errorMessage);

    errorMessage = "Ambulance not found.";
    isEmpty(ambulance, errorMessage);
    const find_ambulance = await Ambulance.findOne({ _id: ambulance }).exec();
    validateInstanceMethod(find_ambulance, errorMessage);

    const new_trip_ticket = await TripTicket.create({
      ambulance_personnel,
      ambulance,
      destination,
    });

    errorMessage = "Failed to create new trip ticket";
    validateInstanceMethod(new_trip_ticket, errorMessage);
    const success = new HTTPResponse(res, 200, new_trip_ticket);
    return success.sendResponse();
  } catch (error) {
    const failure = new HTTPResponse(res, 400, error.message);
    return failure.sendResponse();
  }
};

//UPDATE trip ticket
const putTripTicket = async (req, res) => {
  const { id } = req.params;
  const { ambulance_personnel, ambulance, destination } = req.body;

  try {
    let errorMessage = "Invalid trip ticket ID.";
    if (isNotValidObjectId(id)) {
      throwError(errorMessage);
    }

    errorMessage = "Invalid ambulance personnel ID.";
    if (isNotValidObjectId(ambulance_personnel)) {
      throwError(errorMessage);
    }

    errorMessage = "Invalid ambulance ID.";
    if (isNotValidObjectId(ambulance)) {
      throwError(errorMessage);
    }

    errorMessage = "Destination is not defined.";
    isEmpty(destination, errorMessage);

    errorMessage = "Ambulance personnel not found";
    isEmpty(destination, errorMessage);
    const find_personnel = await User.findOne({
      _id: ambulance_personnel,
    }).exec();
    validateInstanceMethod(find_personnel, errorMessage);

    errorMessage = "Ambulance not found.";
    isEmpty(ambulance, errorMessage);
    const find_ambulance = await Ambulance.findOne({ _id: ambulance }).exec();
    validateInstanceMethod(find_ambulance, errorMessage);

    errorMessage = "Trip ticket not found.";
    const trip_ticket = await TripTicket.findOne({ _id: id }).exec();
    validateInstanceMethod(trip_ticket, errorMessage);

    const filter = { _id: id };
    const body = req.body;
    const updated_trip_ticket = await TripTicket.findOneAndUpdate(filter,body);

    errorMessage = "Failed to update trip ticket.";
    validateInstanceMethod(updated_trip_ticket, errorMessage);
    const success = new HTTPResponse(res, 201, updated_trip_ticket);
    return success.sendResponse();
  } catch (error) {
    const failure = new HTTPResponse(res, 400, error.message);
    return failure.sendResponse();
  }
};

//DELETE trip ticket
const deleteTripTicket = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted_trip_ticket = await TripTicket.findOneAndDelete({ _id: id });

    let errorMessage = "Failed to delete trip ticket.";
    validateInstanceMethod(deleted_trip_ticket, errorMessage);
    const success = new HTTPResponse(res, 200, {
      message: "Trip ticket deleted successfully!",
    });
    return success.sendResponse();
  } catch (error) {
    const failure = new HTTPResponse(res, 400, error.message);
    return failure.sendResponse();
  }
};

module.exports = {
  getAllTripTicket,
  getTripTicket,
  postTripTicket,
  putTripTicket,
  deleteTripTicket,
};
