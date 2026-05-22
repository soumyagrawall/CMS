const notificationService = require("../services/notificationService");
const { success } = require("../utils/apiResponse");
const asyncHandler = require("../utils/asyncHandler");
const { getPagination } = require("../utils/pagination");

const list = asyncHandler(async (req, res) => {
  const { page, limit, offset } = getPagination(req.validated.query);
  const notifications = await notificationService.listForUser(req.user.id, limit, offset);
  success(res, { notifications }, "Notifications loaded", 200, { page, limit });
});

const markRead = asyncHandler(async (req, res) => {
  const result = await notificationService.markRead(req.user.id, req.validated.params.id);
  success(res, result, "Notification marked read");
});

module.exports = {
  list,
  markRead
};
