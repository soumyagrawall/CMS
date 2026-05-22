const userModel = require("../models/userModel");
const AppError = require("../utils/AppError");
const { isDatabaseUnavailable } = require("../utils/databaseError");
const demoStore = require("../utils/demoStore");

const getProfile = async (userId) => {
  try {
    const user = await userModel.findById(userId);
    if (!user) throw new AppError("User not found", 404);
    return user;
  } catch (error) {
    if (isDatabaseUnavailable(error)) return demoStore.demoUser;
    throw error;
  }
};

const updateProfile = async (userId, payload) => {
  try {
    return await userModel.update(userId, payload);
  } catch (error) {
    if (isDatabaseUnavailable(error)) return { ...demoStore.demoUser, ...payload };
    throw error;
  }
};

const searchUsers = async (term, limit, offset) => {
  try {
    return await userModel.search(term, limit, offset);
  } catch (error) {
    if (isDatabaseUnavailable(error)) return demoStore.searchUsers(term).slice(offset, offset + limit);
    throw error;
  }
};

module.exports = {
  getProfile,
  updateProfile,
  searchUsers
};
