const mysql = require("mysql2/promise");
require("dotenv").config();

const users = [
  {
    id: 1,
    fullName: 'Aadarsh Soni',
    username: 'aadarsh',
    email: 'demo@lumora.test',
    passwordHash: '$2a$12$R.S4.i3g.V1QexGgN2qPZexC.B6V04JkL5YlP1h72oB2YcIe0x7p.' // demo12345
  },
  {
    id: 2,
    fullName: 'Evelyn Thorne',
    username: 'evelyn_curates',
    email: 'evelyn@studio.com',
    passwordHash: '$2a$12$R.S4.i3g.V1QexGgN2qPZexC.B6V04JkL5YlP1h72oB2YcIe0x7p.'
  }
];

const imagesData = [
  {
    userId: 1,
    title: 'Sunset Beach Coastline',
    caption: 'A breathtaking orange sunset casting glowing hues over rolling ocean waves.',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    tags: ['nature', 'travel', 'aesthetic']
  },
  {
    userId: 1,
    title: 'Shinjuku Neon Streets',
    caption: 'Dynamic Tokyo street scene illuminated by glowing neon storefronts at midnight.',
    imageUrl: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80',
    tags: ['city', 'architecture', 'travel']
  },
  {
    userId: 1,
    title: 'Minimalist Monochromatic Desk',
    caption: 'A sleek clean desk workspace promoting deep focus and organic design textures.',
    imageUrl: 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?auto=format&fit=crop&w=800&q=80',
    tags: ['minimalist', 'workspace', 'design']
  },
  {
    userId: 2,
    title: 'Brutalist Concrete Spiral',
    caption: 'An imposing raw concrete spiral staircase showing majestic geometry.',
    imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
    tags: ['architecture', 'design', 'minimalist']
  },
  {
    userId: 1,
    title: 'Misty Redwood Path',
    caption: 'Diffused morning light cutting through deep redwood forest trails.',
    imageUrl: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=80',
    tags: ['nature', 'travel']
  },
  {
    userId: 2,
    title: 'Pour Over Coffee & Magazine',
    caption: 'A relaxed slow morning setup featuring fresh coffee and editorial layouts.',
    imageUrl: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80',
    tags: ['food', 'lifestyle', 'aesthetic']
  },
  {
    userId: 2,
    title: 'Streetwear Autumn Layering',
    caption: 'Contemporary minimal styling capturing autumn colors in an urban park.',
    imageUrl: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80',
    tags: ['fashion', 'lifestyle', 'aesthetic']
  },
  {
    userId: 1,
    title: 'Bauhaus Arch Geometry',
    caption: 'Symmetry and clean arch designs in mid-century architectural structures.',
    imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
    tags: ['minimalist', 'architecture', 'design']
  },
  {
    userId: 1,
    title: 'Secret Turquoise Lagoon',
    caption: 'Pristine turquoise ocean waters nested against clean white sand shores.',
    imageUrl: 'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?auto=format&fit=crop&w=800&q=80',
    tags: ['travel', 'nature', 'aesthetic']
  },
  {
    userId: 2,
    title: 'Vintage Sportscar Details',
    caption: 'Classic retro Porsche coupe detailed styling lines parked on city concrete.',
    imageUrl: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80',
    tags: ['cars', 'city', 'design']
  },
  {
    userId: 1,
    title: 'Minimal Bedroom Interior',
    caption: 'Soft linen textiles and clean neutral walls promoting serene rest.',
    imageUrl: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80',
    tags: ['interior', 'minimalist', 'design']
  },
  {
    userId: 2,
    title: 'Abstract Plaster Sculpture',
    caption: 'A tactile sculptural plaster art composition focusing on shadows and raw forms.',
    imageUrl: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80',
    tags: ['art', 'design', 'aesthetic']
  },
  {
    userId: 1,
    title: 'Organic Sourdough & Avocado',
    caption: 'Nutritious breakfast curation with aesthetic plating and slow living vibes.',
    imageUrl: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80',
    tags: ['food', 'lifestyle']
  },
  {
    userId: 2,
    title: 'Knitwear Soft Textures',
    caption: 'Warm cozy sweater fabrics capturing contemporary minimal lifestyle.',
    imageUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=800&q=80',
    tags: ['fashion', 'lifestyle']
  },
  {
    userId: 1,
    title: 'Morning Sunbeams Through Blinds',
    caption: 'A dreamy light study displaying soft warm lines cutting through linen sheets.',
    imageUrl: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=800&q=80',
    tags: ['nature', 'aesthetic', 'minimalist']
  },
  {
    userId: 2,
    title: 'Aesthetic Developer Workspace',
    caption: 'A clean workstation featuring dual displays and ambient warm illumination.',
    imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
    tags: ['workspace', 'technology', 'design']
  },
  {
    userId: 1,
    title: 'Splattered Acrylic Canvas',
    caption: 'Bold brushstrokes and splash patterns detailing fluid dynamic paint textures.',
    imageUrl: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=800&q=80',
    tags: ['art', 'aesthetic']
  },
  {
    userId: 2,
    title: 'Amalfi Coast Highway',
    caption: 'A scenic winding highway cut directly into Amalfi cliffs overseeing azure seas.',
    imageUrl: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=800&q=80',
    tags: ['travel', 'nature']
  },
  {
    userId: 1,
    title: 'Dried Floral Ceramic Study',
    caption: 'A clean still-life composition featuring dried branches in raw clay pottery.',
    imageUrl: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80',
    tags: ['interior', 'minimalist', 'aesthetic']
  },
  {
    userId: 2,
    title: 'Classic Headlight Detail',
    caption: 'Sophisticated detail lines of a vintage classic roadster body panel.',
    imageUrl: 'https://images.unsplash.com/photo-1485291571150-772bcfc10da5?auto=format&fit=crop&w=800&q=80',
    tags: ['cars', 'aesthetic']
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
    console.log("Cleaning up old tables...");
    await connection.query("DELETE FROM notifications");
    await connection.query("DELETE FROM image_tags");
    await connection.query("DELETE FROM images");
    await connection.query("DELETE FROM tags");
    await connection.query("DELETE FROM users");

    console.log("Inserting default test users...");
    for (const u of users) {
      await connection.execute(
        `INSERT INTO users (id, full_name, username, email, password_hash)
         VALUES (?, ?, ?, ?, ?)`,
        [u.id, u.fullName, u.username, u.email, u.passwordHash]
      );
    }

    console.log("Inserting 20 premium visual images...");
    const imageIds = [];
    for (const item of imagesData) {
      const [imgResult] = await connection.execute(
        `INSERT INTO images (user_id, title, caption, image_url, source_type) 
         VALUES (?, ?, ?, ?, 'upload')`,
        [item.userId, item.title, item.caption, item.imageUrl]
      );
      const imageId = imgResult.insertId;
      imageIds.push(imageId);

      for (const tagName of item.tags) {
        await connection.execute(
          "INSERT IGNORE INTO tags (name) VALUES (?)",
          [tagName]
        );
        const [tagRows] = await connection.execute(
          "SELECT id FROM tags WHERE name = ?",
          [tagName]
        );
        const tagId = tagRows[0].id;

        await connection.execute(
          "INSERT IGNORE INTO image_tags (image_id, tag_id) VALUES (?, ?)",
          [imageId, tagId]
        );
      }
    }

    console.log("Seeding realistic notifications for admin user...");
    const notificationsData = [
      {
        userId: 1,
        actorId: 2,
        type: 'like',
        imageId: imageIds[0],
        message: 'liked your "Sunset Beach Coastline" post.'
      },
      {
        userId: 1,
        actorId: 2,
        type: 'comment',
        imageId: imageIds[2],
        message: 'commented: "This perspective on minimalist workstation layouts is inspiring!"'
      },
      {
        userId: 1,
        actorId: 2,
        type: 'follow',
        imageId: null,
        message: 'started following you.'
      },
      {
        userId: 1,
        actorId: null,
        type: 'system',
        imageId: null,
        message: 'Welcome to Lumora! Discover clean aesthetic room visual textures.'
      }
    ];

    for (const n of notificationsData) {
      await connection.execute(
        `INSERT INTO notifications (user_id, actor_id, type, image_id, message)
         VALUES (?, ?, ?, ?, ?)`,
        [n.userId, n.actorId, n.type, n.imageId, n.message]
      );
    }

    console.log("Database successfully reseeded! Users, 20 images, tags, and notifications are now ready.");
  } catch (err) {
    console.error("Failed to seed database:", err.message);
  } finally {
    await connection.end();
  }
})();
