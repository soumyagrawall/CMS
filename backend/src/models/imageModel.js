const { pool } = require("../config/database");

const imageSelect = `
  i.id, i.user_id AS userId, i.title, i.caption, i.image_url AS imageUrl,
  i.source_type AS sourceType, i.ai_prompt AS aiPrompt, i.ai_style AS aiStyle,
  i.view_count AS viewCount, i.like_count AS likeCount, i.comment_count AS commentCount,
  i.save_count AS saveCount, i.created_at AS createdAt,
  u.username, u.full_name AS authorName, u.avatar_url AS authorAvatarUrl
`;

const normalizeTags = (tags = []) =>
  tags.map((tag) => tag.trim().replace(/^#/, "").toLowerCase()).filter(Boolean);

const create = async ({ userId, title, caption, imageUrl, sourceType, aiPrompt = null, aiStyle = null, tags = [] }) => {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();
    const [result] = await connection.execute(
      `INSERT INTO images (user_id, title, caption, image_url, source_type, ai_prompt, ai_style)
       VALUES (:userId, :title, :caption, :imageUrl, :sourceType, :aiPrompt, :aiStyle)`,
      { userId, title, caption, imageUrl, sourceType, aiPrompt, aiStyle }
    );
    const imageId = result.insertId;

    for (const tag of normalizeTags(tags)) {
      const [tagResult] = await connection.execute(
        "INSERT INTO tags (name) VALUES (:tag) ON DUPLICATE KEY UPDATE id = LAST_INSERT_ID(id)",
        { tag }
      );
      await connection.execute(
        "INSERT IGNORE INTO image_tags (image_id, tag_id) VALUES (:imageId, :tagId)",
        { imageId, tagId: tagResult.insertId }
      );
    }

    await connection.commit();
    return findById(imageId);
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};

const findById = async (id) => {
  const [rows] = await pool.execute(
    `SELECT ${imageSelect}
     FROM images i
     JOIN users u ON u.id = i.user_id
     WHERE i.id = :id AND i.deleted_at IS NULL
     LIMIT 1`,
    { id }
  );
  if (!rows[0]) return null;

  const [tags] = await pool.execute(
    `SELECT t.name FROM tags t
     JOIN image_tags it ON it.tag_id = t.id
     WHERE it.image_id = :id
     ORDER BY t.name`,
    { id }
  );

  return { ...rows[0], tags: tags.map((tag) => tag.name) };
};

const listFeed = async (viewerId, limit, offset) => {
  const vId = viewerId || 0;
  const [rows] = await pool.execute(
    `SELECT ${imageSelect},
            EXISTS(SELECT 1 FROM likes l WHERE l.image_id = i.id AND l.user_id = ?) AS likedByMe,
            EXISTS(SELECT 1 FROM saves s WHERE s.image_id = i.id AND s.user_id = ?) AS savedByMe
     FROM images i
     JOIN users u ON u.id = i.user_id
     WHERE i.deleted_at IS NULL
     ORDER BY i.created_at DESC
     LIMIT ? OFFSET ?`,
    [vId, vId, limit, offset]
  );
  return rows;
};

const search = async (term, limit, offset) => {
  const like = `%${term}%`;
  const [rows] = await pool.execute(
    `SELECT DISTINCT ${imageSelect}
     FROM images i
     JOIN users u ON u.id = i.user_id
     LEFT JOIN image_tags it ON it.image_id = i.id
     LEFT JOIN tags t ON t.id = it.tag_id
     WHERE i.deleted_at IS NULL
       AND (i.title LIKE ? OR i.caption LIKE ? OR t.name LIKE ?)
     ORDER BY i.created_at DESC
     LIMIT ? OFFSET ?`,
    [like, like, like, limit, offset]
  );
  return rows;
};

const incrementCounter = async (id, column, amount = 1) => {
  const allowed = ["view_count", "like_count", "comment_count", "save_count"];
  if (!allowed.includes(column)) return;
  await pool.execute(`UPDATE images SET ${column} = GREATEST(${column} + :amount, 0) WHERE id = :id`, { id, amount });
};

module.exports = {
  create,
  findById,
  listFeed,
  search,
  incrementCounter
};
