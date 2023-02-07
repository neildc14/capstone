const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const logger = require("morgan");
const http = require("http");
const requests = require("./routes/requests");
const ambulance = require("./routes/ambulance");

require("dotenv").config();

const app = express();
const server = http.createServer(app);

//middlewares
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger("dev"));

//routes
app.use("/api/request", requests);
app.use("/api/ambulance", ambulance);

mongoose.set("strictQuery", true);
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let db = mongoose.connection;
db.once("open", () => console.log("connected to the database"));
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// launch our backend into a port
server.listen(process.env.API_PORT, () =>
  console.log(`Listening on port ${process.env.API_PORT}`)
);
