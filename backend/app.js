const express = require("express");
require("express-async-errors");
const morgan = require("morgan");
const cors = require("cors");
const csurf = require("csurf");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const routes = require("./routes");
const { ValidationError } = require("sequelize");

const { environment } = require("./config");
const isProduction = environment === "production";

const app = express();

// GLOBAL MIDDLEWARE
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json());

// SECURITY MIDDLEWARE
// enable cors only in development
if (!isProduction) {
  app.use(cors());
}

// helmet helps set a variety of headers to better secure app
app.use(
  helmet.crossOriginResourcePolicy({
    policy: "cross-origin",
  })
);

// set the csrf token and create req.csrfToken methid
app.use(
  csurf({
    cookie: {
      secure: isProduction,
      sameSite: isProduction && "Lax",
      httpOnly: true,
    },
  })
);

//Connect all routes
app.use(routes);

// ERROR HANDLING MIDDLEWARE
app.use((_req, _res, next) => {
  const err = new Error("The requested resource couldn't be found.");
  err.title = "Resource Not Found";
  err.errors = ["The requested resource couldn't be found."];
  err.status = 404;
  next(err);
});

app.use((err, _req, _res, next) => {
  // check if error is a Sequelize error
  if (err instanceof ValidationError) {
    err.errors = err.errors.map((e) => e.message);
    err.title = "Validation error";
  }
  next(err);
});

app.use((err, _req, res, _next) => {
  res.status(err.status || 500);
  console.error(err);
  res.json({
    // title: err.title || "Server Error",
    message: err.message,
    statusCode: err.status,
    errors: err.errors,
    stack: isProduction ? null : err.stack,
  });
});

module.exports = app;
