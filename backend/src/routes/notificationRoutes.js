const express = require("express");
const notificationController = require("../controllers/notificationController");
const validate = require("../middleware/validate");
const { authenticate } = require("../middleware/authMiddleware");
const notificationValidation = require("../validations/notificationValidation");

const router = express.Router();

router.get("/", authenticate, validate(notificationValidation.list), notificationController.list);
router.patch("/:id/read", authenticate, validate(notificationValidation.markRead), notificationController.markRead);

module.exports = router;
