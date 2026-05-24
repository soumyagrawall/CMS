const imageService = require("../services/imageService");
const { success } = require("../utils/apiResponse");
const asyncHandler = require("../utils/asyncHandler");
const { getPagination } = require("../utils/pagination");

const upload = asyncHandler(async (req, res) => {
  const image = await imageService.createUploadedImage(req.user.id, req.file, req.validated.body);
  success(res, { image }, "Image uploaded", 201);
});

const getImage = asyncHandler(async (req, res) => {
  const viewerId = req.user ? req.user.id : null;
  const image = await imageService.getImage(req.validated.params.id, viewerId, req.ip);
  success(res, { image });
});

const feed = asyncHandler(async (req, res) => {
  const { page, limit, offset } = getPagination(req.validated.query);
  const userId = req.user ? req.user.id : null;
  const images = await imageService.listFeed(userId, limit, offset);
  success(res, { images }, "Feed loaded", 200, { page, limit });
});

module.exports = {
  upload,
  getImage,
  feed
};
