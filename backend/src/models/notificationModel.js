const { pool } = require("../config/database");

const create = async ({ userId, actorId = null, type, imageId = null, commentId = null, message }) => {
  await pool.execute(
    `INSERT INTO notifications (user_id, actor_id, type, image_id, comment_id, message)
     VALUES (:userId, :actorId, :type, :imageId, :commentId, :message)`,
    { userId, actorId, type, imageId, commentId, message }
  );
};

const listForUser = async (userId, limit, offset) => {
  const [rows] = await pool.execute(
    `SELECT n.id, n.type, n.message, n.image_id AS imageId, n.comment_id AS commentId,
            n.read_at AS readAt, n.created_at AS createdAt,
            a.id AS actorId, a.username AS actorUsername, a.avatar_url AS actorAvatarUrl
     FROM notifications n
     LEFT JOIN users a ON a.id = n.actor_id
     WHERE n.user_id = :userId
     ORDER BY n.created_at DESC
     LIMIT :limit OFFSET :offset`,
    { userId, limit, offset }
  );
  return rows;
};

const markRead = async (userId, notificationId) => {
  await pool.execute(
    "UPDATE notifications SET read_at = CURRENT_TIMESTAMP WHERE id = :notificationId AND user_id = :userId",
    { userId, notificationId }
  );
};

module.exports = {
  create,
  listForUser,
  markRead
};
