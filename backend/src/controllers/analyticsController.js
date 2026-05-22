const analyticsService = require("../services/analyticsService");
const { success } = require("../utils/apiResponse");
const asyncHandler = require("../utils/asyncHandler");

const track = asyncHandler(async (req, res) => {
  const event = await analyticsService.trackEvent({
    userId: req.user ? req.user.id : null,
    imageId: req.validated.body.imageId,
    eventType: req.validated.body.eventType,
    metadata: req.validated.body.metadata,
    ipAddress: req.ip
  });
  success(res, { event }, "Event tracked", 201);
});

const imageSummary = asyncHandler(async (req, res) => {
  const summary = await analyticsService.summarizeImage(req.validated.params.imageId);
  success(res, { summary });
});

module.exports = {
  track,
  imageSummary
};
