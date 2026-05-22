const mysql = require("mysql2/promise");
require("dotenv").config();

const data = [
  {
    title: 'Sunset over hills',
    caption: 'A beautiful orange sunset over rolling hills.',
    imageUrl: 'https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?auto=format&fit=crop&w=800&q=80',
    tags: ['nature', 'travel']
  },
  {
    title: 'Modern skyline',
    caption: 'City skyline at night with lights.',
    imageUrl: 'https://images.unsplash.com/photo-1477959858617-6c9224665487?auto=format&fit=crop&w=800&q=80',
    tags: ['city', 'architecture']
  },
  {
    title: 'Playful puppy',
    caption: 'A cute puppy playing in the grass.',
    imageUrl: 'https://images.unsplash.com/photo-1543466835-00a733971f18?auto=format&fit=crop&w=800&q=80',
    tags: ['animals', 'dogs']
  },
  {
    title: 'Futuristic circuit board',
    caption: 'Close-up of a glowing circuit board.',
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
    tags: ['technology', 'coding']
  },
  {
    title: 'Abstract painting',
    caption: 'Vibrant abstract art with splashes of colour.',
    imageUrl: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=800&q=80',
    tags: ['art', 'minimalist']
  },
  {
    title: 'Mountain trail',
    caption: 'A winding trail through the mountains.',
    imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
    tags: ['nature', 'sports']
  },
  {
    title: 'Modern Minimalist Living Room',
    caption: 'Clean lines and neutral colors in this interior.',
    imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80',
    tags: ['interior', 'minimalist', 'architecture']
  },
  {
    title: 'Street Fashion',
    caption: 'Urban street style in the heart of the city.',
    imageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80',
    tags: ['fashion', 'lifestyle', 'city']
  },
  {
    title: 'Gourmet Burger',
    caption: 'A delicious gourmet burger with crispy fries.',
    imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
    tags: ['food', 'lifestyle']
  },
  {
    title: 'Skateboarding',
    caption: 'Mid-air trick at the local skatepark.',
    imageUrl: 'https://images.unsplash.com/photo-1520045892732-304bc3ac5d8e?auto=format&fit=crop&w=800&q=80',
    tags: ['sports', 'lifestyle']
  },
  {
    title: 'Brutalist Architecture',
    caption: 'Imposing concrete structures reaching for the sky.',
    imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
    tags: ['architecture', 'city']
  },
  {
    title: 'Healthy Lifestyle',
    caption: 'Morning yoga session with a green smoothie.',
    imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80',
    tags: ['lifestyle', 'sports']
  },
  {
    title: 'Developer Desk',
    caption: 'A tidy workspace promoting focus and creativity.',
    imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80',
    tags: ['coding', 'technology', 'interior']
  }
];

(async () => {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT || 3306),
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    multipleStatements: true,
    database: process.env.DB_NAME || "lumora"
  });

  try {
    console.log("Cleaning up old dummy data...");
    await connection.query("DELETE FROM image_tags");
    await connection.query("DELETE FROM images");
    await connection.query("DELETE FROM tags");

    console.log("Inserting new images and assigning tags precisely...");

    for (const item of data) {
      // Insert image
      const [imgResult] = await connection.execute(
        `INSERT INTO images (user_id, title, caption, image_url, source_type) 
         VALUES (1, ?, ?, ?, 'upload')`,
        [item.title, item.caption, item.imageUrl]
      );
      const imageId = imgResult.insertId;

      for (const tagName of item.tags) {
        // Insert tag or get existing
        await connection.execute(
          "INSERT IGNORE INTO tags (name) VALUES (?)",
          [tagName]
        );
        const [tagRows] = await connection.execute(
          "SELECT id FROM tags WHERE name = ?",
          [tagName]
        );
        const tagId = tagRows[0].id;

        // Link them
        await connection.execute(
          "INSERT IGNORE INTO image_tags (image_id, tag_id) VALUES (?, ?)",
          [imageId, tagId]
        );
      }
    }

    console.log("Database reseeded successfully! Tags now perfectly match their images.");
  } catch (err) {
    console.error("Failed to seed database:", err.message);
  } finally {
    await connection.end();
  }
})();
