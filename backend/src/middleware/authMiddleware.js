const AppError = require("../utils/AppError");
const { verifyToken } = require("../utils/jwt");
const userModel = require("../models/userModel");
const env = require("../config/env");
const { isDatabaseUnavailable } = require("../utils/databaseError");
const demoStore = require("../utils/demoStore");

const authenticate = async (req, res, next) => {
  try {
    const header = req.headers.authorization || "";
    const [scheme, token] = header.split(" ");

    if (scheme !== "Bearer" || !token) {
      throw new AppError("Authentication token is required", 401);
    }

    const payload = verifyToken(token);
    let user;
    try {
      user = await userModel.findById(payload.sub);
    } catch (error) {
      if (env.demoAuthEnabled && isDatabaseUnavailable(error)) {
        user = {
          ...demoStore.demoUser,
          id: payload.sub,
          email: payload.email,
          username: payload.username
        };
      } else {
        throw error;
      }
    }

    if (!user) {
      throw new AppError("Authenticated user no longer exists", 401);
    }

    req.user = user;
    next();
  } catch (error) {
    next(error.name === "JsonWebTokenError" ? new AppError("Invalid authentication token", 401) : error);
  }
};

const optionalAuthenticate = async (req, res, next) => {
  const header = req.headers.authorization || "";
  if (!header) return next();
  return authenticate(req, res, next);
};

module.exports = {
  authenticate,
  optionalAuthenticate
};
