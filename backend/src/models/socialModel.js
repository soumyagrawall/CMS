const { pool } = require("../config/database");

const toggleLike = async (userId, imageId) => {
  const [existing] = await pool.execute(
    "SELECT id FROM likes WHERE user_id = :userId AND image_id = :imageId LIMIT 1",
    { userId, imageId }
  );

  if (existing[0]) {
    await pool.execute("DELETE FROM likes WHERE id = :id", { id: existing[0].id });
    return false;
  }

  await pool.execute("INSERT INTO likes (user_id, image_id) VALUES (:userId, :imageId)", { userId, imageId });
  return true;
};

const toggleSave = async (userId, imageId) => {
  const [existing] = await pool.execute(
    "SELECT id FROM saves WHERE user_id = :userId AND image_id = :imageId LIMIT 1",
    { userId, imageId }
  );

  if (existing[0]) {
    await pool.execute("DELETE FROM saves WHERE id = :id", { id: existing[0].id });
    return false;
  }

  await pool.execute("INSERT INTO saves (user_id, image_id) VALUES (:userId, :imageId)", { userId, imageId });
  return true;
};

const addComment = async (userId, imageId, body) => {
  const [result] = await pool.execute(
    "INSERT INTO comments (user_id, image_id, body) VALUES (:userId, :imageId, :body)",
    { userId, imageId, body }
  );
  const [rows] = await pool.execute(
    `SELECT c.id, c.image_id AS imageId, c.body, c.created_at AS createdAt,
            u.id AS userId, u.username, u.full_name AS fullName, u.avatar_url AS avatarUrl
     FROM comments c
     JOIN users u ON u.id = c.user_id
     WHERE c.id = :id`,
    { id: result.insertId }
  );
  return rows[0];
};

const listComments = async (imageId, limit, offset) => {
  const [rows] = await pool.execute(
    `SELECT c.id, c.image_id AS imageId, c.body, c.created_at AS createdAt,
            u.id AS userId, u.username, u.full_name AS fullName, u.avatar_url AS avatarUrl
     FROM comments c
     JOIN users u ON u.id = c.user_id
     WHERE c.image_id = :imageId
     ORDER BY c.created_at DESC
     LIMIT :limit OFFSET :offset`,
    { imageId, limit, offset }
  );
  return rows;
};

const toggleFollow = async (followerId, followingId) => {
  const [existing] = await pool.execute(
    "SELECT id FROM follows WHERE follower_id = :followerId AND following_id = :followingId LIMIT 1",
    { followerId, followingId }
  );

  if (existing[0]) {
    await pool.execute("DELETE FROM follows WHERE id = :id", { id: existing[0].id });
    return false;
  }

  await pool.execute(
    "INSERT INTO follows (follower_id, following_id) VALUES (:followerId, :followingId)",
    { followerId, followingId }
  );
  return true;
};

module.exports = {
  toggleLike,
  toggleSave,
  addComment,
  listComments,
  toggleFollow
};
