const mysql = require("mysql2/promise");

const connectionUrl = "mysql://root:ptTFzEKyvGaLLyHYlfZgJiWJdqEgdWjJ@yamabiko.proxy.rlwy.net:26523/railway";

async function main() {
  try {
    const connection = await mysql.createConnection({
      uri: connectionUrl
    });

    const [images] = await connection.query("SELECT COUNT(*) AS count FROM images");
    const [tags] = await connection.query("SELECT COUNT(*) AS count FROM tags");
    const [imageTags] = await connection.query("SELECT COUNT(*) AS count FROM image_tags");
    const [users] = await connection.query("SELECT COUNT(*) AS count FROM users");

    console.log("Current Live Railway Database Counts:");
    console.log(` - Users: ${users[0].count}`);
    console.log(` - Images: ${images[0].count}`);
    console.log(` - Tags: ${tags[0].count}`);
    console.log(` - Image Tag Mappings: ${imageTags[0].count}`);

    await connection.end();
  } catch (err) {
    console.error("Failed to query live Railway database:", err.message);
  } finally {
    process.exit(0);
  }
}

main();
