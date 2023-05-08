const Notification = require("../models/NotificationModel");
const { HTTPResponse } = require("../helpers/sendResponseStatus");
const throwError = require("../helpers/createError");
const isNotObjectId = require("../helpers/validateObjectId");
const { isEmpty } = require("../helpers/validateRequest");
const validateInstanceMethod = require("../helpers/validateInstanceMethod");

