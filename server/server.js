const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const logger = require("morgan");
const requests = require("./routes/requests");
const http = require("http");

require("dotenv").config();

const app = express();

//middlewarecd ..
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger("dev"));

//routes
app.use("/api", requests);

mongoose.set("strictQuery", true);
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let db = mongoose.connection;
db.once("open", () => console.log("connected to the database"));
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// launch our backend into a port
app.listen(process.env.API_PORT, () =>
  console.log(`Listening on port ${process.env.API_PORT}`)
);
