const express = require("express");
const searchController = require("../controllers/searchController");
const validate = require("../middleware/validate");
const { authenticate } = require("../middleware/authMiddleware");
const searchValidation = require("../validations/searchValidation");

const router = express.Router();

router.get("/", authenticate, validate(searchValidation.search), searchController.searchAll);
router.get("/tags", authenticate, validate(searchValidation.search), searchController.searchTags);

module.exports = router;
