const userModel = require("../models/userModel");
const AppError = require("../utils/AppError");
const { isDatabaseUnavailable } = require("../utils/databaseError");
const demoStore = require("../utils/demoStore");

const getProfile = async (userId, viewerId = null) => {
  try {
    const user = await userModel.findById(userId, viewerId);
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

const path = require("path");
const env = require("../config/env");

const fileToPublicUrl = (file) => {
  if (file.location) return file.location;
  if (file.path && (file.path.startsWith("http://") || file.path.startsWith("https://"))) return file.path;
  const relative = path.relative(process.cwd(), file.path).replace(/\\/g, "/");
  return `${env.apiBaseUrl}/${relative}`;
};

const searchUsers = async (term, limit, offset) => {
  try {
    return await userModel.search(term, limit, offset);
  } catch (error) {
    if (isDatabaseUnavailable(error)) return demoStore.searchUsers(term).slice(offset, offset + limit);
    throw error;
  }
};

const uploadAvatar = async (userId, file) => {
  const avatarUrl = fileToPublicUrl(file);
  return await updateProfile(userId, { avatarUrl });
};

module.exports = {
  getProfile,
  updateProfile,
  searchUsers,
  uploadAvatar
};
