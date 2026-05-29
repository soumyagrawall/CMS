const app = require("./app");
const env = require("./config/env");
const { testConnection } = require("./config/database");

const startServer = async () => {
  if (process.env.REQUIRE_DB_ON_START === "true") {
    await testConnection();
  } else {
    try {
      await testConnection();
      console.log("MySQL connection verified");

      const { pool } = require("./config/database");

      // Auto-migrate loremflickr.com to picsum.photos in DB
      try {
        const [images] = await pool.query("SELECT id, image_url FROM images WHERE image_url LIKE '%loremflickr.com%'");
        if (images.length > 0) {
          console.log(`Found ${images.length} seeded images with loremflickr.com URLs. Auto-migrating to picsum.photos...`);
          for (const img of images) {
            try {
              const urlObj = new URL(img.image_url);
              const lock = urlObj.searchParams.get("lock") || img.id;
              const newUrl = `https://picsum.photos/800/1000?random=${lock}`;
              await pool.execute("UPDATE images SET image_url = :newUrl WHERE id = :id", { newUrl, id: img.id });
            } catch (urlErr) {
              const newUrl = `https://picsum.photos/800/1000?random=${img.id}`;
              await pool.execute("UPDATE images SET image_url = :newUrl WHERE id = :id", { newUrl, id: img.id });
            }
          }
          console.log("Auto-migration of loremflickr.com to picsum.photos completed successfully!");
        }
      } catch (migrateErr) {
        console.error("Database auto-migration of images failed:", migrateErr.message);
      }

      // Clean up the incorrect placeholder seed image showing a cat statue instead of cricket
      try {
        await pool.execute("DELETE FROM images WHERE title = 'Virat Kohli Cover Drive'");
        console.log("Database clean-up successful: Virat Kohli Cover Drive placeholder image removed.");
      } catch (dbErr) {
        console.error("Database clean-up failed:", dbErr.message);
      }
    } catch (error) {
      console.warn(`MySQL not connected yet: ${error.message}`);
      console.warn("Starting API anyway so frontend/backend can run while database setup is pending.");
    }
  }

  app.listen(env.port, () => {
    console.log(`Nexa API and frontend running on port ${env.port}`);
  });
};

startServer().catch((error) => {
  console.error("Failed to start Nexa API:", error.message);
  process.exit(1);
});
