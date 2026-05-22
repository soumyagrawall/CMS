const analyticsModel = require("../models/analyticsModel");
const { isDatabaseUnavailable } = require("../utils/databaseError");

const trackEvent = async ({ userId, imageId, eventType, metadata, ipAddress }) => {
  try {
    return await analyticsModel.createEvent({ userId, imageId, eventType, metadata, ipAddress });
  } catch (error) {
    if (isDatabaseUnavailable(error)) return { id: Date.now(), userId, imageId, eventType, metadata };
    throw error;
  }
};

const summarizeImage = async (imageId) => {
  try {
    return await analyticsModel.summarizeImage(imageId);
  } catch (error) {
    if (isDatabaseUnavailable(error)) return [];
    throw error;
  }
};

module.exports = {
  trackEvent,
  summarizeImage
};
