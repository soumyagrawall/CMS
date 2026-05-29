const fs = require("fs");
const path = require("path");
const { pool } = require("../src/config/database");
require("dotenv").config();

async function main() {
  console.log("Starting database rebuild and fresh massive seed...");

  const connection = await pool.getConnection();
  try {
    // 1. Drop existing tables safely
    console.log("Dropping existing tables...");
    await connection.query("SET FOREIGN_KEY_CHECKS = 0;");
    
    const tables = [
      "notifications",
      "follows",
      "comments",
      "saves",
      "likes",
      "image_tags",
      "tags",
      "images",
      "users"
    ];

    for (const table of tables) {
      await connection.query(`DROP TABLE IF EXISTS ${table};`);
      console.log(` - Dropped table: ${table}`);
    }
    await connection.query("SET FOREIGN_KEY_CHECKS = 1;");
    console.log("All tables dropped successfully.");

    // 2. Re-apply schema.sql
    console.log("Applying database schema (schema.sql)...");
    const schemaPath = path.join(__dirname, "../src/database/schema.sql");
    const schemaSql = fs.readFileSync(schemaPath, "utf-8");
    
    // Split by semicolon and run queries individually
    const schemaQueries = schemaSql
      .split(/;\s*$/m)
      .map(q => q.trim())
      .filter(q => q.length > 0);

    for (const query of schemaQueries) {
      await connection.query(query);
    }
    console.log("SUCCESS: Database schema applied perfectly!");

    // 3. Re-apply seed_massive.sql
    console.log("Populating database with massive seed data (seed_massive.sql)...");
    const seedPath = path.join(__dirname, "../src/database/seed_massive.sql");
    const seedSql = fs.readFileSync(seedPath, "utf-8");

    // Replace TRUNCATE TABLE with DELETE FROM to avoid FK truncate restrictions
    // and strip all SQL comments to ensure correct query execution
    const safeSeedSql = seedSql
      .replace(/TRUNCATE TABLE/gi, "DELETE FROM")
      .replace(/--.*$/gm, "");

    // Split seed SQL by semicolon and newline to execute queries sequentially (cross-platform CRLF/LF)
    const seedQueries = safeSeedSql
      .split(/;\s*[\r\n]+/g)
      .map(q => q.trim())
      .filter(q => q.length > 0);

    let count = 0;
    for (const query of seedQueries) {
      await connection.query(query);
      count++;
    }
    console.log(`SUCCESS: Executed ${count} seeding queries! Database is now populated with perfect tag relationships.`);
    
    // 4. Run the loremflickr-to-picsum migration immediately so all seeded images load instantly
    console.log("Migrating seeded image URLs from loremflickr to picsum.photos...");
    const [images] = await connection.query("SELECT id, image_url FROM images WHERE image_url LIKE '%loremflickr.com%'");
    if (images.length > 0) {
      for (const img of images) {
        try {
          const urlObj = new URL(img.image_url);
          const lock = urlObj.searchParams.get("lock") || img.id;
          const newUrl = `https://picsum.photos/800/1000?random=${lock}`;
          await connection.execute("UPDATE images SET image_url = :newUrl WHERE id = :id", { newUrl, id: img.id });
        } catch (urlErr) {
          const newUrl = `https://picsum.photos/800/1000?random=${img.id}`;
          await connection.execute("UPDATE images SET image_url = :newUrl WHERE id = :id", { newUrl, id: img.id });
        }
      }
      console.log(`SUCCESS: Migrated ${images.length} image URLs to Picsum!`);
    }

  } catch (err) {
    console.error("CRITICAL: Failed to rebuild database:", err.message);
    console.error(err);
  } finally {
    connection.release();
    process.exit(0);
  }
}

main();
