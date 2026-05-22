const express = require("express");
const aiController = require("../controllers/aiController");
const validate = require("../middleware/validate");
const { authenticate } = require("../middleware/authMiddleware");
const aiValidation = require("../validations/aiValidation");

const router = express.Router();

router.post("/images/generate", authenticate, validate(aiValidation.generateImage), aiController.generateImage);
router.post("/captions/generate", authenticate, validate(aiValidation.generateCaption), aiController.generateCaption);

module.exports = router;
