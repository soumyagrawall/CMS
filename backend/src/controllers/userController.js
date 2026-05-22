const userService = require("../services/userService");
const { success } = require("../utils/apiResponse");
const asyncHandler = require("../utils/asyncHandler");
const { getPagination } = require("../utils/pagination");

const getMe = asyncHandler(async (req, res) => {
  const user = await userService.getProfile(req.user.id);
  success(res, { user });
});

const updateMe = asyncHandler(async (req, res) => {
  const user = await userService.updateProfile(req.user.id, req.validated.body);
  success(res, { user }, "Profile updated");
});

const getUser = asyncHandler(async (req, res) => {
  const user = await userService.getProfile(req.params.id);
  success(res, { user });
});

const searchUsers = asyncHandler(async (req, res) => {
  const { page, limit, offset } = getPagination(req.validated.query);
  const users = await userService.searchUsers(req.validated.query.q, limit, offset);
  success(res, { users }, "Users found", 200, { page, limit });
});

module.exports = {
  getMe,
  updateMe,
  getUser,
  searchUsers
};
