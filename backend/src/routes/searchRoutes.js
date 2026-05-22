const express = require("express");
const searchController = require("../controllers/searchController");
const validate = require("../middleware/validate");
const { optionalAuthenticate } = require("../middleware/authMiddleware");
const searchValidation = require("../validations/searchValidation");

const router = express.Router();

router.get("/", optionalAuthenticate, validate(searchValidation.search), searchController.searchAll);
router.get("/tags", optionalAuthenticate, validate(searchValidation.search), searchController.searchTags);

module.exports = router;
