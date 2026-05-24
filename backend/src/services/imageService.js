const path = require("path");
const env = require("../config/env");
const imageModel = require("../models/imageModel");
const analyticsModel = require("../models/analyticsModel");
const AppError = require("../utils/AppError");
const { isDatabaseUnavailable } = require("../utils/databaseError");
const demoStore = require("../utils/demoStore");

const fileToPublicUrl = (file) => {
  if (file.location) return file.location;
  if (file.path && (file.path.startsWith("http://") || file.path.startsWith("https://"))) return file.path;

  const relative = path.relative(process.cwd(), file.path).replace(/\\/g, "/");
  return `${env.apiBaseUrl}/${relative}`;
};

const createUploadedImage = async (userId, file, payload) => {
  if (!file) throw new AppError("Image file is required", 400);

  try {
    const image = await imageModel.create({
      userId,
      title: payload.title,
      caption: payload.caption || "",
      imageUrl: fileToPublicUrl(file),
      sourceType: "upload",
      tags: payload.tags || []
    });

    await analyticsModel.createEvent({ userId, imageId: image.id, eventType: "upload" });
    return image;
  } catch (error) {
    if (isDatabaseUnavailable(error)) {
      return demoStore.createImage({
        userId,
        title: payload.title,
        caption: payload.caption || "",
        imageUrl: fileToPublicUrl(file),
        sourceType: "upload",
        tags: payload.tags || []
      });
    }
    throw error;
  }
};

const createGeneratedImage = async (userId, payload, imageUrl) => {
  try {
    const image = await imageModel.create({
      userId,
      title: payload.title || "Untitled AI Creation",
      caption: payload.caption || "",
      imageUrl,
      sourceType: "ai_generated",
      aiPrompt: payload.prompt,
      aiStyle: payload.style,
      tags: payload.tags || []
    });

    await analyticsModel.createEvent({ userId, imageId: image.id, eventType: "generate_image" });
    return image;
  } catch (error) {
    if (isDatabaseUnavailable(error)) {
      return demoStore.createImage({
        userId,
        title: payload.title || "Untitled AI Creation",
        caption: payload.caption || "",
        imageUrl,
        sourceType: "ai_generated",
        aiPrompt: payload.prompt,
        aiStyle: payload.style,
        tags: payload.tags || []
      });
    }
    throw error;
  }
};

const getImage = async (id, viewerId = null, ipAddress = null) => {
  try {
    const image = await imageModel.findById(id);
    if (!image) throw new AppError("Image not found", 404);

    await imageModel.incrementCounter(id, "view_count", 1);
    await analyticsModel.createEvent({ userId: viewerId, imageId: id, eventType: "view", ipAddress });

    return imageModel.findById(id);
  } catch (error) {
    if (isDatabaseUnavailable(error)) {
      const image = demoStore.getImage(id);
      image.viewCount += 1;
      return image;
    }
    throw error;
  }
};

const listFeed = async (viewerId, limit, offset) => {
  try {
    return await imageModel.listFeed(viewerId, limit, offset);
  } catch (error) {
    if (isDatabaseUnavailable(error)) {
      return demoStore.getImages().slice(offset, offset + limit);
    }
    throw error;
  }
};

module.exports = {
  createUploadedImage,
  createGeneratedImage,
  getImage,
  listFeed
};
