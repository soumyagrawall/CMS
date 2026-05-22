const bcrypt = require("bcryptjs");
const env = require("../config/env");
const userModel = require("../models/userModel");
const AppError = require("../utils/AppError");
const { signToken } = require("../utils/jwt");
const { isDatabaseUnavailable } = require("../utils/databaseError");
const demoStore = require("../utils/demoStore");

const buildDemoUser = ({ fullName, username, email }) => ({
  ...demoStore.demoUser,
  fullName: fullName || demoStore.demoUser.fullName,
  username: (username || demoStore.demoUser.username).replace(/^@/, "").toLowerCase(),
  email: email || env.demoEmail
});

const toPublicAuth = (user) => ({
  token: signToken(user),
  user
});

const signup = async ({ fullName, username, email, password }) => {
  const cleanUsername = username.replace(/^@/, "").toLowerCase();

  try {
    if (await userModel.findByEmail(email)) {
      throw new AppError("Email is already registered", 409);
    }
    if (await userModel.findByUsername(cleanUsername)) {
      throw new AppError("Username is already taken", 409);
    }

    const passwordHash = await bcrypt.hash(password, env.bcryptSaltRounds);
    const user = await userModel.create({ fullName, username: cleanUsername, email, passwordHash });
    return toPublicAuth(user);
  } catch (error) {
    if (env.demoAuthEnabled && isDatabaseUnavailable(error)) {
      return toPublicAuth(buildDemoUser({ fullName, username: cleanUsername, email }));
    }
    throw error;
  }
};

const login = async ({ email, password }) => {
  const isDemoCredential = env.demoAuthEnabled && email === env.demoEmail && password === env.demoPassword;

  if (isDemoCredential) {
    return toPublicAuth(buildDemoUser({ email }));
  }

  try {
    const rawUser = await userModel.findByEmail(email);
    if (!rawUser) {
      throw new AppError("Invalid email or password", 401);
    }

    const matches = await bcrypt.compare(password, rawUser.password_hash);
    if (!matches) {
      throw new AppError("Invalid email or password", 401);
    }

    const user = await userModel.findById(rawUser.id);
    return toPublicAuth(user);
  } catch (error) {
    if (isDatabaseUnavailable(error) && env.demoAuthEnabled) {
      throw new AppError(`Database unavailable. Use demo login ${env.demoEmail} / ${env.demoPassword} until MySQL is ready.`, 503);
    }
    throw error;
  }
};

module.exports = {
  signup,
  login
};
