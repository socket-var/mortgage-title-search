const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const mongoose = require("mongoose");

if (process.env.NODE_ENV !== "production") {
  mongoose.set("debug", true);
  require("dotenv").config();
}

// instantiate server
const app = express();

// connect to db
const dbURL = process.env.DB_URL;

require(path.join(__dirname, "rest_api/models/db_connect"))(dbURL);

// some boilerplate middleware for logging and handling requests
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "client", "build")));

// auth route
const authRouter = require("./rest_api/routes/auth");
const createContract = require("./ethereum/contract");

const contract = createContract(process.env.CONTRACT_ADDRESS);

// use routes
app.use("/api/auth", authRouter(contract));

// needed for Single-page application to reroute to index page
app.get("*", function(req, res, next) {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500).json({ errorMessage: "Internal Server Error" });
});

module.exports = app;
