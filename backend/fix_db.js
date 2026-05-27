const mysql = require('mysql2/promise');
require('dotenv').config({ path: '.env' });

async function run() {
  const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  });

  const [images] = await pool.query("SELECT id, image_url, title FROM images WHERE image_url LIKE '%unsplash.com%'");
  let count = 0;
  for (const img of images) {
    const hash = Math.abs((img.id * 31) % 5000) + 1;
    // Extract keywords from title
    const keywords = img.title.split(' ').slice(0, 2).join(',').toLowerCase();
    const newUrl = `https://loremflickr.com/800/1000/${keywords}?lock=${hash}`;
    await pool.query('UPDATE images SET image_url = ? WHERE id = ?', [newUrl, img.id]);
    count++;
  }
  console.log('Updated ' + count + ' URLs in DB');

  // Add comments to some posts in the DB
  const [allImages] = await pool.query("SELECT id FROM images");
  const [users] = await pool.query("SELECT id FROM users LIMIT 20");
  
  if (users.length > 0) {
    const sampleComments = [
      "Absolutely stunning!", "Love the colors here.", "Great shot, where is this?",
      "This aesthetic is exactly what I was looking for.", "So beautiful!",
      "Incredible composition.", "Wow, just wow.", "This is my new wallpaper.",
      "Amazing details.", "So calming to look at."
    ];
    let commentCount = 0;
    for (const img of allImages) {
      if (Math.random() < 0.3) { // 30% chance
        const numComments = Math.floor(Math.random() * 3) + 1;
        for (let i = 0; i < numComments; i++) {
          const randomUserId = users[Math.floor(Math.random() * users.length)].id;
          const randomComment = sampleComments[Math.floor(Math.random() * sampleComments.length)];
          await pool.query(
            `INSERT INTO comments (image_id, user_id, body) VALUES (?, ?, ?)`,
            [img.id, randomUserId, randomComment]
          );
          commentCount++;
        }
      }
    }
    console.log('Inserted ' + commentCount + ' comments into DB');
  }

  process.exit(0);
}

run().catch(console.error);
