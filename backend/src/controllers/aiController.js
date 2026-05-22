const aiService = require("../services/aiService");
const imageService = require("../services/imageService");
const analyticsService = require("../services/analyticsService");
const { success } = require("../utils/apiResponse");
const asyncHandler = require("../utils/asyncHandler");

const generateImage = asyncHandler(async (req, res) => {
  const generated = await aiService.generateImage(req.validated.body);
  const image = await imageService.createGeneratedImage(req.user.id, req.validated.body, generated.imageUrl);
  success(res, { generated, image }, "Image generated", 201);
});

const generateCaption = asyncHandler(async (req, res) => {
  const caption = await aiService.generateCaption(req.validated.body);
  await analyticsService.trackEvent({
    userId: req.user.id,
    eventType: "generate_caption",
    metadata: req.validated.body
  });
  success(res, caption, "Caption generated");
});

module.exports = {
  generateImage,
  generateCaption
};
