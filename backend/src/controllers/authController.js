const authService = require("../services/authService");
const { success } = require("../utils/apiResponse");
const asyncHandler = require("../utils/asyncHandler");

const signup = asyncHandler(async (req, res) => {
  const data = await authService.signup(req.validated.body);
  success(res, data, "Account created", 201);
});

const login = asyncHandler(async (req, res) => {
  const data = await authService.login(req.validated.body);
  success(res, data, "Logged in");
});

const me = asyncHandler(async (req, res) => {
  success(res, { user: req.user }, "Token is valid");
});

module.exports = {
  signup,
  login,
  me
};
