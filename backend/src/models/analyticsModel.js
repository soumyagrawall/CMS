const { pool } = require("../config/database");

const createEvent = async ({ userId = null, imageId = null, eventType, metadata = null, ipAddress = null }) => {
  const [result] = await pool.execute(
    `INSERT INTO analytics_events (user_id, image_id, event_type, metadata, ip_address)
     VALUES (:userId, :imageId, :eventType, :metadata, :ipAddress)`,
    {
      userId,
      imageId,
      eventType,
      metadata: metadata ? JSON.stringify(metadata) : null,
      ipAddress
    }
  );
  return { id: result.insertId, userId, imageId, eventType, metadata };
};

const summarizeImage = async (imageId) => {
  const [rows] = await pool.execute(
    `SELECT event_type AS eventType, COUNT(*) AS count
     FROM analytics_events
     WHERE image_id = :imageId
     GROUP BY event_type`,
    { imageId }
  );
  return rows;
};

module.exports = {
  createEvent,
  summarizeImage
};
