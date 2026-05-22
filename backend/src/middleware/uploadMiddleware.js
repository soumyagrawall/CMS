const fs = require("fs");
const path = require("path");
const multer = require("multer");
const { v4: uuid } = require("uuid");
const env = require("../config/env");
const AppError = require("../utils/AppError");

const uploadPath = path.resolve(process.cwd(), env.uploadDir);
fs.mkdirSync(uploadPath, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadPath),
  filename: (req, file, cb) => {
    const extension = path.extname(file.originalname).toLowerCase();
    cb(null, `${uuid()}${extension}`);
  }
});

const fileFilter = (req, file, cb) => {
  if (!["image/jpeg", "image/png", "image/webp", "image/gif"].includes(file.mimetype)) {
    return cb(new AppError("Only JPEG, PNG, WEBP, and GIF images are allowed", 415));
  }
  cb(null, true);
};

const uploadImage = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: env.maxUploadMb * 1024 * 1024
  }
}).single("image");

module.exports = {
  uploadImage
};
