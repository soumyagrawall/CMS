const { pool } = require("../src/config/database");
const imageModel = require("../src/models/imageModel");

const diverseImages = [
  {
    title: "Minimalist Workspace",
    caption: "Clean desk setup for maximum productivity.",
    imageUrl: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=800&q=80",
    tags: ["workspace", "minimalist", "tech", "office"]
  },
  {
    title: "Neon City Nights",
    caption: "Cyberpunk vibes in the bustling metropolis.",
    imageUrl: "https://images.unsplash.com/photo-1514565131-fce0801e5785?w=800&q=80",
    tags: ["city", "neon", "architecture", "night"]
  },
  {
    title: "Classic Sports Car",
    caption: "Vintage beauty on the open road.",
    imageUrl: "https://images.unsplash.com/photo-1563720223185-11003d516935?w=800&q=80",
    tags: ["cars", "vintage", "automotive", "travel"]
  },
  {
    title: "Gourmet Avocado Toast",
    caption: "Healthy and delicious breakfast aesthetic.",
    imageUrl: "https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=800&q=80",
    tags: ["food", "breakfast", "healthy", "lifestyle"]
  },
  {
    title: "Abstract Liquid Art",
    caption: "Mesmerizing fluid color mixing.",
    imageUrl: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=800&q=80",
    tags: ["art", "abstract", "colors", "design"]
  },
  {
    title: "Streetwear Fashion",
    caption: "Urban autumn layering styles.",
    imageUrl: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800&q=80",
    tags: ["fashion", "streetwear", "clothing", "style"]
  },
  {
    title: "Modern Interior",
    caption: "Scandinavian living room design.",
    imageUrl: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80",
    tags: ["interior", "design", "home", "decor"]
  },
  {
    title: "Misty Pine Forest",
    caption: "Getting lost in the foggy woods.",
    imageUrl: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&q=80",
    tags: ["nature", "forest", "moody", "trees"]
  },
  {
    title: "Mechanical Keyboard",
    caption: "Custom built keyboard setup.",
    imageUrl: "https://images.unsplash.com/photo-1595225476474-87563907a212?w=800&q=80",
    tags: ["tech", "keyboard", "gaming", "setup"]
  },
  {
    title: "Espresso Pour",
    caption: "Morning coffee rituals.",
    imageUrl: "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800&q=80",
    tags: ["food", "coffee", "morning", "cafe"]
  },
  {
    title: "Brutalism Architecture",
    caption: "Concrete giants piercing the sky.",
    imageUrl: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&q=80",
    tags: ["architecture", "building", "brutalism", "city"]
  },
  {
    title: "Coding Late Night",
    caption: "Developer aesthetic in dark mode.",
    imageUrl: "https://images.unsplash.com/photo-1555099962-4199c345e5dd?w=800&q=80",
    tags: ["tech", "coding", "software", "darkmode"]
  },
  {
    title: "Mountain Lake Reflection",
    caption: "Perfect mirror reflection in the wild.",
    imageUrl: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80",
    tags: ["nature", "mountains", "landscape", "water"]
  },
  {
    title: "Vintage Film Camera",
    caption: "Analog photography gear.",
    imageUrl: "https://images.unsplash.com/photo-1516961642265-531546e84af2?w=800&q=80",
    tags: ["art", "photography", "vintage", "camera"]
  }
];

async function run() {
  try {
    // We will assign these to a dummy curator user so they don't get hidden 
    // from the main user's explore feed by the quirky SQL filter.
    await pool.query("INSERT IGNORE INTO users (id, username, email, full_name, password_hash) VALUES (999, 'curator', 'curator@lumora.test', 'Lumora Curator', 'dummy')");
    
    console.log(`Seeding 14 diverse images for User ID: 999...`);
    let count = 0;
    
    // We insert each image TWICE just to guarantee one gets an EVEN ID and one gets an ODD ID, 
    // completely bypassing the weird 'i.id % 2' filter bug in the backend!
    for (const img of diverseImages) {
      await imageModel.create({
        userId: 999,
        title: img.title,
        caption: img.caption,
        imageUrl: img.imageUrl,
        sourceType: "upload",
        tags: img.tags
      });
      await imageModel.create({
        userId: 999,
        title: img.title,
        caption: img.caption,
        imageUrl: img.imageUrl,
        sourceType: "upload",
        tags: img.tags
      });
      console.log(`Seeded: ${img.title}`);
      count++;
    }
    console.log(`Successfully seeded ${count} diverse image sets!`);
  } catch (error) {
    console.error("Error seeding images:", error);
  } finally {
    process.exit(0);
  }
}

run();
