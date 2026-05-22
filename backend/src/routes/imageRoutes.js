const express = require("express");
const imageController = require("../controllers/imageController");
const validate = require("../middleware/validate");
const { authenticate, optionalAuthenticate } = require("../middleware/authMiddleware");
const { uploadImage } = require("../middleware/uploadMiddleware");
const imageValidation = require("../validations/imageValidation");

const router = express.Router();

router.get("/feed", optionalAuthenticate, validate(imageValidation.feed), imageController.feed);
router.post("/upload", authenticate, uploadImage, validate(imageValidation.createUpload), imageController.upload);
router.get("/:id", optionalAuthenticate, validate(imageValidation.imageId), imageController.getImage);

module.exports = router;
