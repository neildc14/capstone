const TripTicket = require("../models/TripTicketModel");
const throwError = require("../helpers/createError");
const isNotValidObjectId = require("../helpers/validateObjectId");
const { HTTPResponse } = require("../helpers/sendResponseStatus");
const { isEmpty } = require("../helpers/validateRequest");
const validateInstanceMethod = require("../helpers/validateInstanceMethod");

const getAllTripTicket = async (req, res) => {
  try {
    const all_trip_tickets = await TripTicket.find().sort({ createdAt: 1 });

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

    const trip_ticket = await TripTicket.findOne({ _id: id }).exec();

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

    const new_trip_ticket = await TripTicket.create({
      ambulance_personnel,
      ambulance,
      destination,
    });

    errorMessage = "Failed to create new trip ticket";
    validateInstanceMethod(new_trip_ticket);
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
  try {
    let errorMessage = "Invalid ID.";
    if (isNotValidObjectId(id)) {
      throwError(errorMessage);
    }

    const trip_ticket = await TripTicket.findOne({ _id: id }).exec();

    errorMessage = "Trip ticket not found.";
    validateInstanceMethod(trip_ticket, errorMessage);

    errorMessage = "Destination is not defined.";
    const destination = req.body.destination;
    isEmpty(destination, errorMessage);

    const updated_trip_ticket = await TripTicket.findOneAndUpdate({
      id,
      ...req.body,
    });

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
