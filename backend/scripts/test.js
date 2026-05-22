const { pool } = require("../src/config/database");

async function run() {
  try {
    const limit = 20;
    const offset = 0;
    const viewerId = 1;
    console.log("Testing feed query...");
    const [rows] = await pool.execute(
      `SELECT i.id,
              EXISTS(SELECT 1 FROM likes l WHERE l.image_id = i.id AND l.user_id = :viewerId) AS likedByMe,
              EXISTS(SELECT 1 FROM saves s WHERE s.image_id = i.id AND s.user_id = :viewerId) AS savedByMe
       FROM images i
       WHERE i.deleted_at IS NULL
       LIMIT :limit OFFSET :offset`,
      { viewerId, limit, offset }
    );
    console.log("Feed query passed", rows.length);
  } catch (e) {
    console.error("Feed query failed:", e.message);
  }
  process.exit();
}
run();
