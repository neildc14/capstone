const TripTicket = require("../models/TripTicketModel");
const createError = require("../helpers/createError");
const isNotValidObjectId = require("../helpers/validateObjectId");
const { HTTPResponse } = require("../helpers/sendResponseStatus");
const { isEmpty } = require("../helpers/validateRequest");

const getAllTripTicket = async (req, res) => {
  try {
    const all_trip_tickets = await TripTicket.find().sort({ createdAt: 1 });
    if (all_trip_tickets.length === 0) {
      createError("No trip tickets were found");
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
    if (isNotValidObjectId(id)) {
      createError("Invalid ID.");
    }

    const trip_ticket = await TripTicket.findOne({ _id: id }).exec();

    if (!trip_ticket) {
      createError("Trip ticket not found.");
    }

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
    //validate request body
    isEmpty(destination, "Destination is not defined.");

    const new_trip_ticket = await TripTicket.create({
      ambulance_personnel,
      ambulance,
      destination,
    });

    if (!new_trip_ticket) {
      createError("Failed to create new trip ticket");
    }

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
    if (isNotValidObjectId(id)) {
      createError("Invalid ID.");
    }

    const trip_ticket = await TripTicket.findOne({ _id: id }).exec();
    if (!trip_ticket) {
      createError("Trip ticket not found.");
    }

    //validate request body
    isEmpty(req.body.destination, "Destination is not defined.");

    const updated_trip_ticket = await TripTicket.findOneAndUpdate({
      id,
      ...req.body,
    });

    if (!updated_trip_ticket) {
      createError("Failed to update trip ticket.");
    }

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
    const delete_trip_ticket = await TripTicket.findOneAndDelete({ _id: id });

    if (!delete_trip_ticket) {
      createError("Failed to delete trip ticket.");
    }

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
