const { pool } = require("../config/database");

const createEvent = async ({ userId = null, imageId = null, eventType, metadata = null, ipAddress = null }) => {
  // Safe mock since the analytics table is deleted
  return { id: 1, userId, imageId, eventType, metadata };
};

const summarizeImage = async (imageId) => {
  // Safe mock returning empty stats or basic placeholders
  return [
    { eventType: "view", count: 0 },
    { eventType: "upload", count: 0 },
    { eventType: "generate_image", count: 0 }
  ];
};

module.exports = {
  createEvent,
  summarizeImage
};
