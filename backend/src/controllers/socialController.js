const socialService = require("../services/socialService");
const { success } = require("../utils/apiResponse");
const asyncHandler = require("../utils/asyncHandler");
const { getPagination } = require("../utils/pagination");

const toggleLike = asyncHandler(async (req, res) => {
  const result = await socialService.toggleLike(req.user.id, req.validated.params.imageId);
  success(res, result, result.liked ? "Post liked" : "Post unliked");
});

const toggleSave = asyncHandler(async (req, res) => {
  const result = await socialService.toggleSave(req.user.id, req.validated.params.imageId);
  success(res, result, result.saved ? "Post saved" : "Post unsaved");
});

const addComment = asyncHandler(async (req, res) => {
  const comment = await socialService.addComment(req.user.id, req.validated.params.imageId, req.validated.body.body);
  success(res, { comment }, "Comment posted", 201);
});

const listComments = asyncHandler(async (req, res) => {
  const { page, limit, offset } = getPagination(req.query);
  const comments = await socialService.listComments(req.validated.params.imageId, limit, offset);
  success(res, { comments }, "Comments loaded", 200, { page, limit });
});

const toggleFollow = asyncHandler(async (req, res) => {
  const result = await socialService.toggleFollow(req.user.id, req.validated.params.userId);
  success(res, result, result.following ? "User followed" : "User unfollowed");
});

module.exports = {
  toggleLike,
  toggleSave,
  addComment,
  listComments,
  toggleFollow
};
