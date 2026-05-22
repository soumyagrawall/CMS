const express = require("express");
const socialController = require("../controllers/socialController");
const validate = require("../middleware/validate");
const { authenticate } = require("../middleware/authMiddleware");
const socialValidation = require("../validations/socialValidation");

const router = express.Router();

router.post("/images/:imageId/like", authenticate, validate(socialValidation.imageId), socialController.toggleLike);
router.post("/images/:imageId/save", authenticate, validate(socialValidation.imageId), socialController.toggleSave);
router.get("/images/:imageId/comments", authenticate, validate(socialValidation.imageId), socialController.listComments);
router.post("/images/:imageId/comments", authenticate, validate(socialValidation.addComment), socialController.addComment);
router.post("/users/:userId/follow", authenticate, validate(socialValidation.follow), socialController.toggleFollow);

module.exports = router;
