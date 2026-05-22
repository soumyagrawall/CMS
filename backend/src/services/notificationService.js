const notificationModel = require("../models/notificationModel");
const { isDatabaseUnavailable } = require("../utils/databaseError");

const listForUser = async (userId, limit, offset) => {
  try {
    return await notificationModel.listForUser(userId, limit, offset);
  } catch (error) {
    if (isDatabaseUnavailable(error)) {
      return [
        {
          id: 1,
          type: "system",
          message: "Demo mode is active. MySQL can be connected later.",
          imageId: null,
          commentId: null,
          readAt: null,
          createdAt: new Date().toISOString(),
          actorId: null,
          actorUsername: null,
          actorAvatarUrl: null
        }
      ];
    }
    throw error;
  }
};

const markRead = async (userId, notificationId) => {
  try {
    await notificationModel.markRead(userId, notificationId);
    return { read: true };
  } catch (error) {
    if (isDatabaseUnavailable(error)) return { read: true };
    throw error;
  }
};

module.exports = {
  listForUser,
  markRead
};
