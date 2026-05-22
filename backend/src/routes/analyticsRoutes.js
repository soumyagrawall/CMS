const express = require("express");
const analyticsController = require("../controllers/analyticsController");
const validate = require("../middleware/validate");
const { optionalAuthenticate, authenticate } = require("../middleware/authMiddleware");
const analyticsValidation = require("../validations/analyticsValidation");

const router = express.Router();

router.post("/events", optionalAuthenticate, validate(analyticsValidation.track), analyticsController.track);
router.get("/images/:imageId", authenticate, validate(analyticsValidation.imageSummary), analyticsController.imageSummary);

module.exports = router;
