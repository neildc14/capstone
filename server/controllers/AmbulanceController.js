const Ambulance = require("../models/AmbulanceModel");
const { sendHTTPResponse } = require("../helpers/sendResponseStatus");
const createError = require("../helpers/createError");
const isNotObjectId = require("../helpers/validateObjectId");

//GET all ambulance
const getAllAmbulance = async (req, res) => {
  try {
    const all_ambulance = await Ambulance.find().sort({ createdAt: 1 });
    if (all_ambulance.length === 0) {
      createError("No ambulances found");
    }
    sendHTTPResponse(res, 200, all_ambulance);
  } catch (error) {
    sendHTTPResponse(res, 400, error.message);
  }
};

//GET specific ambulance
const getAmbulance = async (req, res) => {
  const { id } = req.params;

  try {
    if (isNotObjectId(id)) {
      createError("Invalid ID.");
    }

    const ambulance = await Ambulance.findOne({ _id: id }).exec();
    if (!ambulance) {
      createError("No ambulance found");
    }
    sendHTTPResponse(res, 200, ambulance);
  } catch (error) {
    sendHTTPResponse(res, 400, error.message);
  }
};

//POST new ambulance
const postAmbulance = async (req, res) => {
  const { license_plate, status } = req.body;
  try {
    const new_ambulance = await Ambulance.create({
      license_plate,
      status,
    });

    if (!new_ambulance) {
      createError("Failed to create new ambulance");
    }
    sendHTTPResponse(res, 200, new_ambulance);
  } catch (error) {
    sendHTTPResponse(res, 400, error.message);
  }
};

//UPDATE specific ambulance
const putAmbulance = async (req, res) => {
  const { id } = req.params;
  try {
    if (isNotObjectId(id)) {
      createError("Invalid ID.");
    }

    const ambulance = await Ambulance.findOne({ _id: id }).exec();
    if (!ambulance) {
      createError("No ambulance found");
    }

    const updated_ambulance = await Ambulance.findOneAndUpdate({
      id,
      ...req.body,
    });
    if (!updated_ambulance) {
      createError("Failed to update ambulance status.");
    }
    sendHTTPResponse(res, 201, updated_ambulance);
  } catch (error) {
    sendHTTPResponse(res, 400, error.message);
  }
};

//DELETE specific ambulance
const deleteAmbulance = async (req, res) => {
  const { id } = req.params;
  try {
    if (isNotObjectId(id)) {
      createError("Invalid ID.");
    }
    const deleted_ambulance = await Ambulance.findOneAndDelete({ _id: id });
    if (!deleted_ambulance) {
      createError("Failed to deleted ambulance");
    }
    sendHTTPResponse(res, 200, { message: "Ambulance deleted successfully!" });
  } catch (error) {
    sendHTTPResponse(res, 400, error.message);
  }
};

module.exports = {
  getAllAmbulance,
  getAmbulance,
  postAmbulance,
  putAmbulance,
  deleteAmbulance,
};
