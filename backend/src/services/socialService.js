const imageModel = require("../models/imageModel");
const socialModel = require("../models/socialModel");
const notificationModel = require("../models/notificationModel");
const userModel = require("../models/userModel");
const AppError = require("../utils/AppError");
const { isDatabaseUnavailable } = require("../utils/databaseError");
const demoStore = require("../utils/demoStore");

const ensureImage = async (imageId) => {
  const image = await imageModel.findById(imageId);
  if (!image) throw new AppError("Image not found", 404);
  return image;
};

const toggleLike = async (userId, imageId) => {
  let image;
  try {
    image = await ensureImage(imageId);
  } catch (error) {
    if (isDatabaseUnavailable(error)) image = demoStore.getImage(imageId);
    else throw error;
  }
  if (image && image.id) {
    try {
      const liked = await socialModel.toggleLike(userId, imageId);
      await imageModel.incrementCounter(imageId, "like_count", liked ? 1 : -1);
      if (liked && image.userId !== userId) {
        await notificationModel.create({
          userId: image.userId,
          actorId: userId,
          type: "like",
          imageId,
          message: "liked your post"
        });
      }
      return { liked };
    } catch (error) {
      if (!isDatabaseUnavailable(error)) throw error;
    }
  }
  const liked = demoStore.toggleLike(userId, imageId);
  image.likeCount = Math.max((image.likeCount || 0) + (liked ? 1 : -1), 0);
  return { liked };
};

const toggleSave = async (userId, imageId) => {
  try {
    await ensureImage(imageId);
    const saved = await socialModel.toggleSave(userId, imageId);
    await imageModel.incrementCounter(imageId, "save_count", saved ? 1 : -1);
    return { saved };
  } catch (error) {
    if (!isDatabaseUnavailable(error)) throw error;
    const image = demoStore.getImage(imageId);
    const saved = demoStore.toggleSave(userId, imageId);
    image.saveCount = Math.max((image.saveCount || 0) + (saved ? 1 : -1), 0);
    return { saved };
  }
};

const addComment = async (userId, imageId, body) => {
  try {
    const image = await ensureImage(imageId);
    const comment = await socialModel.addComment(userId, imageId, body);
    await imageModel.incrementCounter(imageId, "comment_count", 1);
    if (image.userId !== userId) {
      await notificationModel.create({
        userId: image.userId,
        actorId: userId,
        type: "comment",
        imageId,
        commentId: comment.id,
        message: "commented on your post"
      });
    }
    return comment;
  } catch (error) {
    if (isDatabaseUnavailable(error)) return demoStore.addComment(imageId, body);
    throw error;
  }
};

const listComments = async (imageId, limit, offset) => {
  try {
    await ensureImage(imageId);
    return await socialModel.listComments(imageId, limit, offset);
  } catch (error) {
    if (isDatabaseUnavailable(error)) return demoStore.listComments(imageId).slice(offset, offset + limit);
    throw error;
  }
};

const toggleFollow = async (followerId, followingId) => {
  if (Number(followerId) === Number(followingId)) {
    throw new AppError("You cannot follow yourself", 400);
  }
  try {
    const user = await userModel.findById(followingId);
    if (!user) throw new AppError("User not found", 404);

    const following = await socialModel.toggleFollow(followerId, followingId);
    if (following) {
      await notificationModel.create({
        userId: followingId,
        actorId: followerId,
        type: "follow",
        message: "started following you"
      });
    }
    return { following };
  } catch (error) {
    if (isDatabaseUnavailable(error)) return { following: true };
    throw error;
  }
};

module.exports = {
  toggleLike,
  toggleSave,
  addComment,
  listComments,
  toggleFollow
};
