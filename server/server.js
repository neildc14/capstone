const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const logger = require("morgan");
const http = require("http");
const { Server } = require("socket.io");
const requests = require("./routes/requests");
const ambulance = require("./routes/ambulance");
const ticket = require("./routes/ticket");
const users = require("./routes/users");
const schedule = require("./routes/schedule");

require("dotenv").config();

const app = express();
const server = http.createServer(app);

//middlewares
app.use(
  cors({
    origin: ["http://127.0.0.1:5173", "https://staging-capstone.netlify.app"],
  })
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger("dev"));

//routes
app.use("/api/request", requests);
app.use("/api/ambulance", ambulance);
app.use("/api/ticket", ticket);
app.use("/api/auth", users);
app.use("/api/schedule", schedule);

//websocket
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`USER CONNECTED ${socket.id}`);

  socket.on("admin_room", (data) => {
    socket.join(data);
  });

  socket.on("patient_driver_room", (data) => {
    console.log(data, "data");
    socket.join(data);
  });

  socket.on("send_location", (data) => {
    console.log(data);

    io.to(...data.room).emit("receive_location", data);
  });
});

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
