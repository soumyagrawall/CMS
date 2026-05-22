const imageModel = require("../models/imageModel");
const userModel = require("../models/userModel");
const { pool } = require("../config/database");
const { isDatabaseUnavailable } = require("../utils/databaseError");
const demoStore = require("../utils/demoStore");

const searchAll = async (term, limit, offset) => {
  try {
    const [images, users, tags] = await Promise.all([
      imageModel.search(term, limit, offset),
      userModel.search(term, limit, offset),
      searchTags(term, limit)
    ]);
    return { images, users, tags };
  } catch (error) {
    if (isDatabaseUnavailable(error)) {
      return {
        images: demoStore.searchImages(term).slice(offset, offset + limit),
        users: demoStore.searchUsers(term),
        tags: demoStore.searchTags(term)
      };
    }
    throw error;
  }
};

const searchTags = async (term, limit = 20) => {
  const like = `%${term.replace(/^#/, "").toLowerCase()}%`;
  try {
    const [rows] = await pool.execute(
      `SELECT t.id, t.name, COUNT(it.image_id) AS imageCount
       FROM tags t
       LEFT JOIN image_tags it ON it.tag_id = t.id
       WHERE t.name LIKE :like
       GROUP BY t.id, t.name
       ORDER BY imageCount DESC, t.name ASC
       LIMIT :limit`,
      { like, limit }
    );
    return rows;
  } catch (error) {
    if (isDatabaseUnavailable(error)) return demoStore.searchTags(term).slice(0, limit);
    throw error;
  }
};

module.exports = {
  searchAll,
  searchTags
};
