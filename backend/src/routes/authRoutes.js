const express = require("express");
const authController = require("../controllers/authController");
const validate = require("../middleware/validate");
const { authenticate } = require("../middleware/authMiddleware");
const authValidation = require("../validations/authValidation");

const router = express.Router();

router.post("/signup", validate(authValidation.signup), authController.signup);
router.post("/login", validate(authValidation.login), authController.login);
router.get("/me", authenticate, authController.me);

module.exports = router;
