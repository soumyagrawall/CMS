const express = require("express");
const userController = require("../controllers/userController");
const validate = require("../middleware/validate");
const { authenticate } = require("../middleware/authMiddleware");
const userValidation = require("../validations/userValidation");

const router = express.Router();

router.get("/me", authenticate, userController.getMe);
router.patch("/me", authenticate, validate(userValidation.updateProfile), userController.updateMe);
router.get("/search", authenticate, validate(userValidation.searchUsers), userController.searchUsers);
router.get("/:id", authenticate, userController.getUser);

module.exports = router;
