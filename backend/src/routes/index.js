const express = require("express");
const authRoutes = require("./authRoutes");
const userRoutes = require("./userRoutes");
const imageRoutes = require("./imageRoutes");
const aiRoutes = require("./aiRoutes");
const socialRoutes = require("./socialRoutes");
const searchRoutes = require("./searchRoutes");
const analyticsRoutes = require("./analyticsRoutes");
const notificationRoutes = require("./notificationRoutes");

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/images", imageRoutes);
router.use("/ai", aiRoutes);
router.use("/social", socialRoutes);
router.use("/search", searchRoutes);
router.use("/analytics", analyticsRoutes);
router.use("/notifications", notificationRoutes);

module.exports = router;
