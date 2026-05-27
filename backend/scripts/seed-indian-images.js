const { pool } = require("../src/config/database");
const imageModel = require("../src/models/imageModel");

const indianImages = [
  {
    title: "Streets of Mumbai",
    caption: "A vibrant street scene capturing the heart of Mumbai.",
    imageUrl: "https://images.unsplash.com/photo-1570168007204-dfb528c6858f?w=800&q=80",
    tags: ["india", "mumbai", "street", "city"]
  },
  {
    title: "Taj Mahal",
    caption: "The majestic Taj Mahal at sunrise.",
    imageUrl: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&q=80",
    tags: ["india", "agra", "monument", "travel"]
  },
  {
    title: "Rajasthan Desert",
    caption: "Camels traversing the golden dunes of the Thar Desert.",
    imageUrl: "https://images.unsplash.com/photo-1599661559864-47b2c0199e43?w=800&q=80",
    tags: ["india", "rajasthan", "desert", "nature"]
  },
  {
    title: "Varanasi Ghats",
    caption: "A deeply spiritual evening at the banks of the Ganges river.",
    imageUrl: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=800&q=80",
    tags: ["india", "varanasi", "spiritual", "river"]
  },
  {
    title: "Kerala Backwaters",
    caption: "A houseboat floating peacefully through God's Own Country.",
    imageUrl: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&q=80",
    tags: ["india", "kerala", "nature", "water"]
  },
  {
    title: "Indian Spices",
    caption: "Vibrant and aromatic spices at a local Indian market.",
    imageUrl: "https://images.unsplash.com/photo-1596646146032-15be9b1dce67?w=800&q=80",
    tags: ["india", "food", "spices", "market"]
  },
  {
    title: "Himalayan Peaks",
    caption: "Snow-capped mountains in the northern regions of India.",
    imageUrl: "https://images.unsplash.com/photo-1581404172551-7abde123d6fa?w=800&q=80",
    tags: ["india", "himalayas", "mountains", "nature"]
  },
  {
    title: "Colors of Holi",
    caption: "Celebrating the vibrant festival of colors.",
    imageUrl: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=800&q=80",
    tags: ["india", "holi", "festival", "colors"]
  },
  {
    title: "Goa Beach",
    caption: "A relaxing and scenic sunset on the beaches of Goa.",
    imageUrl: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&q=80",
    tags: ["india", "goa", "beach", "sunset"]
  },
  {
    title: "Indian Architecture",
    caption: "Intricate stone carvings on an ancient Indian temple.",
    imageUrl: "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?w=800&q=80",
    tags: ["india", "architecture", "temple", "art"]
  },
  {
    title: "Darjeeling Tea Gardens",
    caption: "Lush green tea estates spread across the hills of Darjeeling.",
    imageUrl: "https://images.unsplash.com/photo-1567087611737-020c6a51d451?w=800&q=80",
    tags: ["india", "tea", "nature", "green"]
  },
  {
    title: "Golden Temple",
    caption: "The beautiful and serene Golden Temple in Amritsar.",
    imageUrl: "https://images.unsplash.com/photo-1582650824241-115f5c35848c?w=800&q=80",
    tags: ["india", "amritsar", "temple", "peace"]
  }
];

async function run() {
  try {
    const [users] = await pool.query('SELECT id FROM users LIMIT 1');
    const userId = users.length > 0 ? users[0].id : 1;

    console.log(`Seeding 12 Indian images for User ID: ${userId}...`);
    let count = 0;
    for (const img of indianImages) {
      await imageModel.create({
        userId,
        title: img.title,
        caption: img.caption,
        imageUrl: img.imageUrl,
        sourceType: "upload",
        tags: img.tags
      });
      console.log(`Seeded: ${img.title}`);
      count++;
    }
    console.log(`Successfully seeded ${count} beautiful Indian images!`);
  } catch (error) {
    console.error("Error seeding images:", error);
  } finally {
    process.exit(0);
  }
}

run();
