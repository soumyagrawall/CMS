const fs = require("fs");
const path = require("path");
const { pool } = require("../src/config/database");
const imageModel = require("../src/models/imageModel");
require("dotenv").config();

// Curated seed data imported from seedController.js context
const seedController = require("../src/controllers/seedController");

// Extract the raw data array using reflection or write a clean runner
async function main() {
  console.log("Starting database rebuild and fresh clean curated seed...");

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
    
    const schemaQueries = schemaSql
      .split(/;\s*$/m)
      .map(q => q.trim())
      .filter(q => q.length > 0);

    for (const query of schemaQueries) {
      await connection.query(query);
    }
    console.log("SUCCESS: Clean database schema applied!");

    // 3. Re-seed with perfectly curated seedController data
    console.log("Seeding perfectly matching curated images...");
    
    // We will call a helper that mimics seedIndian but executes it on a blank slate
    // Let's invoke the seed creators and seed images directly to ensure pristine IDs
    const seedCreators = [
      { id: 1001, username: "arjun_shoots", email: "arjun@nexa.test", fullName: "Arjun Mehta" },
      { id: 1002, username: "priya_captures", email: "priya@nexa.test", fullName: "Priya Sharma" },
      { id: 1003, username: "rahul.frames", email: "rahul@nexa.test", fullName: "Rahul Verma" },
      { id: 1004, username: "sneha_lens", email: "sneha@nexa.test", fullName: "Sneha Iyer" },
      { id: 1005, username: "vikram_wild", email: "vikram@nexa.test", fullName: "Vikram Singh" },
      { id: 1006, username: "ananya.art", email: "ananya@nexa.test", fullName: "Ananya Das" },
      { id: 1007, username: "karthik_dev", email: "karthik@nexa.test", fullName: "Karthik Nair" },
      { id: 1008, username: "meera_travels", email: "meera@nexa.test", fullName: "Meera Patel" },
      { id: 1009, username: "rohit_cinema", email: "rohit@nexa.test", fullName: "Rohit Kapoor" },
      { id: 1010, username: "deepika_foodie", email: "deepika@nexa.test", fullName: "Deepika Reddy" },
      { id: 1011, username: "amit_heritage", email: "amit@nexa.test", fullName: "Amit Choudhary" },
      { id: 1012, username: "kavya_pets", email: "kavya@nexa.test", fullName: "Kavya Menon" },
      { id: 1013, username: "suresh_nature", email: "suresh@nexa.test", fullName: "Suresh Kumar" },
      { id: 1014, username: "nisha_fashion", email: "nisha@nexa.test", fullName: "Nisha Agarwal" },
      { id: 1015, username: "rajesh_spiritual", email: "rajesh@nexa.test", fullName: "Rajesh Gupta" },
      { id: 1016, username: "pooja_dance", email: "pooja@nexa.test", fullName: "Pooja Banerjee" },
      { id: 1017, username: "sanjay_motors", email: "sanjay@nexa.test", fullName: "Sanjay Joshi" },
      { id: 1018, username: "riya_minimal", email: "riya@nexa.test", fullName: "Riya Saxena" }
    ];

    // Seed creators first
    for (const creator of seedCreators) {
      await connection.query(
        "INSERT INTO users (id, username, email, full_name, password_hash) VALUES (?, ?, ?, ?, 'dummy')",
        [creator.id, creator.username, creator.email, creator.fullName]
      );
    }
    console.log(` - Seeded ${seedCreators.length} creators successfully.`);

    // Import the curated seed images from seedController
    // Since seedController.js is in our scope, we can require it
    // Wait, let's load it dynamically using a require wrapper or just execute the endpoint!
    // But doing it programmatically gives us absolute clean control.
    // Let's write the seed images array inside the script for perfect reliability!
    console.log("Seeding curated Indian images (Cricket, Food, Monuments, Travel, Bollywood)...");
    
    // We will call the controller function directly via mock req/res!
    let finished = false;
    const mockReq = {};
    const mockRes = {
      json: (data) => {
        console.log("SUCCESS: Curated images seeded successfully!");
        console.log(data.message);
        finished = true;
      },
      status: (code) => ({
        json: (data) => {
          console.error(`FAILED: Seeding failed with status ${code}`);
          console.error(data);
          finished = true;
        }
      })
    };

    await seedController.seedIndian(mockReq, mockRes);
    
  } catch (err) {
    console.error("CRITICAL: Failed to rebuild database:", err.message);
  } finally {
    connection.release();
    // Wait for the async seedIndian to complete before exiting
    setTimeout(() => {
      process.exit(0);
    }, 2000);
  }
}

main();
