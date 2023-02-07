const getAllAmbulance = (req, res) => {
  res.json({ message: "Get all ambulance here" });
};

const getAmbulance = (req, res) => {
  res.json({ message: "Get Specific ambulance here" });
};

const postAmbulance = (req, res) => {
  res.json({ message: "Post ambulance here" });
};

const putAmbulance = (req, res) => {
  res.json({ message: "Put ambulance here" });
};

const deleteAmbulance = (req, res) => {
  res.json({ message: "Delete ambulance here" });
};

module.exports = {
  getAllAmbulance,
  getAmbulance,
  postAmbulance,
  putAmbulance,
  deleteAmbulance,
};
