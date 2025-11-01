const logger = require("./logger");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const requestLogger = (request, response, next) => {
  logger.info("Method:", request.method);
  logger.info("Path:  ", request.path);
  logger.info("Body:  ", request.body);
  logger.info("---");
  next();
};

const getTokenFrom = (request, response, next) => {
  const authorization = request.get("authorization");
  //get is a function provided by Express's request object
  if (authorization && authorization.startsWith("Bearer ")) {
    request.token = authorization.replace("Bearer ", "");
  } else {
    request.token = null;
  }

  next();
};

const getUserFrom = async (request, response, next) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!decodedToken.id) {
    //contains username and id fields
    return response.status(401).json({ error: "token invalid" });
  }
  const user = await User.findById(decodedToken.id);

  if (!user) {
    return response.status(400).json({ error: "userId missing or not valid" });
  }
  request.user = user;
  next();
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (error, request, response, next) => {
  logger.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response
      .status(400)
      .json({ error: `ValidationError: ${error.message}` });
  } else if (
    error.name === "MongoServerError" &&
    error.message.includes("E11000 duplicate key error")
  ) {
    return response
      .status(400)
      .json({ error: "expected `username` to be unique" });
  } else if (error.name === "JsonWebTokenError") {
    return response.status(401).json({ error: "token invalid" });
  }

  next(error);
};

const allOtherErrorsHandler = (error, req, res, next) => {
  return res.status(500).json({ error: "Something went wrong!" });
};

module.exports = {
  requestLogger,
  getTokenFrom,
  getUserFrom,
  unknownEndpoint,
  errorHandler,
  allOtherErrorsHandler,
};
