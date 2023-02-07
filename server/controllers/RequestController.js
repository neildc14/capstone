const getAllRequests = (req, res) => {
  res.json({ message: "All requests here" });
};

const getRequest = (req, res) => {
  res.json({ message: "Specific request here" });
};

const postRequest = (req, res) => {
  res.json({ message: "Post request here" });
};

const putRequest = (req, res) => {
  res.json({ message: "Edit Request here" });
};

const deleteRequest = (req, res) => {
  res.json({ message: "Delete request here" });
};

module.exports = {
  getAllRequests,
  getRequest,
  postRequest,
  putRequest,
  deleteRequest,
};
