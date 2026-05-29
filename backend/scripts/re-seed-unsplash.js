const fs = require("fs");
const path = require("path");
const mysql = require("mysql2/promise");

const run = async () => {
  const connectionUrl = process.argv[2] || "mysql://root:ptTFzEKyvGaLLyHYlfZgJiWJdqEgdWjJ@yamabiko.proxy.rlwy.net:26523/railway";

  console.log("Starting premium Unsplash Database Seeding on Railway...");
  
  // Parse Connection URL
  let host, port, user, password, database;
  try {
    if (connectionUrl.startsWith('mysql://')) {
      const match = connectionUrl.match(/mysql:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+)/);
      if (match) {
        user = decodeURIComponent(match[1]);
        password = decodeURIComponent(match[2]);
        host = match[3];
        port = match[4];
        database = match[5];
      } else {
        throw new Error("Invalid MySQL URI format");
      }
    } else {
      throw new Error("URL must start with mysql://");
    }
  } catch (err) {
    console.error('Failed to parse Railway Connection URL:', err.message);
    process.exit(1);
  }

  console.log("Connecting securely to Railway database...");
  let connection;
  try {
    connection = await mysql.createConnection({
      host,
      port: parseInt(port, 10),
      user,
      password,
      database,
      multipleStatements: true
    });
    console.log("Connected successfully!");
  } catch (err) {
    console.error("Failed to connect to Railway database:", err.message);
    process.exit(1);
  }

  try {
    // 1. Drop existing tables safely
    console.log("Wiping old tables...");
    await connection.query("SET FOREIGN_KEY_CHECKS = 0;");
    const tables = ["notifications", "follows", "comments", "saves", "likes", "image_tags", "tags", "images", "users"];
    for (const table of tables) {
      await connection.query(`DROP TABLE IF EXISTS ${table};`);
    }
    await connection.query("SET FOREIGN_KEY_CHECKS = 1;");

    // 2. Re-apply schema.sql
    console.log("Applying database schema (schema.sql)...");
    const schemaPath = path.resolve(__dirname, "..", "src", "database", "schema.sql");
    const schemaSql = fs.readFileSync(schemaPath, "utf-8");
    const schemaQueries = schemaSql.split(/;\s*$/m).map(q => q.trim()).filter(q => q.length > 0);
    for (const query of schemaQueries) {
      await connection.query(query);
    }
    console.log("SUCCESS: Clean schema applied!");

    // 3. Setup curated seed creators and premium Unsplash image list
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

    const tags = ['nature', 'city', 'animals', 'technology', 'art', 'travel', 'architecture', 'fashion', 'lifestyle', 'interior', 'food', 'sports'];
    const tagMap = {};
    tags.forEach((name, index) => {
      tagMap[name] = index + 1;
    });

    const seedImages = [
      // ─── INDIAN CRICKET ───
      { id: 1, userId: 1003, title: "Virat Kohli Cover Drive", caption: "The king plays a stunning cover drive at Wankhede.", imageUrl: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800", tags: ["cricket", "india", "sports", "virat"] },
      { id: 2, userId: 1003, title: "Cricket Stadium Lights", caption: "The electric atmosphere of an IPL night match.", imageUrl: "https://images.unsplash.com/photo-1540747737956-37872404f8c1?w=800", tags: ["cricket", "stadium", "ipl", "sports"] },
      { id: 3, userId: 1003, title: "Gully Cricket", caption: "Kids playing cricket in the narrow lanes of Old Delhi.", imageUrl: "https://images.unsplash.com/photo-1589487391730-58f20eb2c308?w=800", tags: ["cricket", "india", "street", "kids"] },
      { id: 4, userId: 1003, title: "Cricket Bat & Ball", caption: "The tools of the gentleman's game.", imageUrl: "https://images.unsplash.com/photo-1608905978679-dec214268b1b?w=800", tags: ["cricket", "sports", "closeup", "equipment"] },
      { id: 5, userId: 1003, title: "Indian Cricket Fans", caption: "Passionate fans painted in tricolor cheering at the stadium.", imageUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800", tags: ["cricket", "india", "fans", "celebration"] },

      // ─── BOLLYWOOD & CINEMA ───
      { id: 6, userId: 1009, title: "Bollywood Dance Scene", caption: "Vibrant colors and energy of a Bollywood dance number.", imageUrl: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800", tags: ["bollywood", "dance", "cinema", "india"] },
      { id: 7, userId: 1009, title: "Film City Mumbai", caption: "Behind the scenes at Goregaon Film City.", imageUrl: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800", tags: ["bollywood", "mumbai", "cinema", "filmmaking"] },
      { id: 8, userId: 1009, title: "Movie Poster Wall", caption: "Vintage hand-painted Bollywood movie posters.", imageUrl: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=800", tags: ["bollywood", "art", "vintage", "poster"] },
      { id: 9, userId: 1009, title: "Cinema Hall Nostalgia", caption: "The charm of old single-screen theaters in India.", imageUrl: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800", tags: ["cinema", "nostalgia", "india", "theater"] },

      // ─── INDIAN TRAVEL & MONUMENTS ───
      { id: 10, userId: 1002, title: "Taj Mahal at Sunrise", caption: "The icon of eternal love bathed in golden morning light.", imageUrl: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800", tags: ["tajmahal", "india", "travel", "monument", "agra"] },
      { id: 11, userId: 1008, title: "Jaipur Pink City", caption: "The stunning rose-colored architecture of Hawa Mahal.", imageUrl: "https://images.unsplash.com/photo-1477587458883-471a5bd08bc4?w=800", tags: ["jaipur", "rajasthan", "india", "architecture", "travel"] },
      { id: 12, userId: 1008, title: "Kerala Backwaters", caption: "A houseboat gliding through the serene backwaters.", imageUrl: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=800", tags: ["kerala", "backwaters", "india", "travel", "nature"] },
      { id: 13, userId: 1002, title: "Varanasi Evening Aarti", caption: "The mesmerizing Ganga Aarti at Dashashwamedh Ghat.", imageUrl: "https://images.unsplash.com/photo-1561361513-2d000a50f0db?w=800", tags: ["varanasi", "spiritual", "india", "ganges", "ritual"] },
      { id: 14, userId: 1011, title: "Golden Temple Amritsar", caption: "The divine Harmandir Sahib reflecting in the sacred pool.", imageUrl: "https://images.unsplash.com/photo-1588598126702-8646b9a91795?w=800", tags: ["goldentemple", "amritsar", "india", "spiritual", "sikh"] },
      { id: 15, userId: 1008, title: "Ladakh Pangong Lake", caption: "The stunning blue waters of Pangong Tso at 14,000 feet.", imageUrl: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800", tags: ["ladakh", "lake", "india", "mountains", "travel"] },
      { id: 16, userId: 1011, title: "Qutub Minar Delhi", caption: "The soaring 73-meter victory tower of Delhi.", imageUrl: "https://images.unsplash.com/photo-1585135497273-1a86b09fe70e?w=800", tags: ["delhi", "monument", "india", "history", "architecture"] },
      { id: 17, userId: 1002, title: "Mysore Palace Illuminated", caption: "97,000 bulbs light up Mysore Palace.", imageUrl: "https://images.unsplash.com/photo-1590050752117-238cb0612b1b?w=800", tags: ["mysore", "palace", "india", "night", "architecture"] },
      { id: 18, userId: 1008, title: "Hampi Boulders", caption: "Surreal boulder landscape of the ancient Vijayanagara empire.", imageUrl: "https://images.unsplash.com/photo-1600100397608-f010e42ec910?w=800", tags: ["hampi", "ruins", "india", "history", "travel"] },
      { id: 19, userId: 1011, title: "Konark Sun Temple", caption: "The magnificent 13th-century temple shaped as a chariot.", imageUrl: "https://images.unsplash.com/photo-1609137144813-7d8487dbd761?w=800", tags: ["konark", "temple", "india", "architecture", "heritage"] },
      { id: 20, userId: 1002, title: "Gateway of India", caption: "Mumbai's iconic arch overlooking the Arabian Sea.", imageUrl: "https://images.unsplash.com/photo-1566552881560-0be862a7c445?w=800", tags: ["mumbai", "monument", "india", "sea", "travel"] },
      { id: 21, userId: 1008, title: "Rishikesh Suspension Bridge", caption: "The iconic Lakshman Jhula spanning the Ganges.", imageUrl: "https://images.unsplash.com/photo-1598977123418-45f04b615d0e?w=800", tags: ["rishikesh", "adventure", "india", "bridge", "river"] },
      { id: 22, userId: 1011, title: "Charminar Hyderabad", caption: "The magnificent four-towered monument of the Deccan.", imageUrl: "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800", tags: ["hyderabad", "charminar", "india", "monument", "history"] },
      { id: 23, userId: 1008, title: "Udaipur Lake Palace", caption: "The floating white marble palace on Lake Pichola.", imageUrl: "https://images.unsplash.com/photo-1590050752117-238cb0612b1b?w=800", tags: ["udaipur", "palace", "india", "lake", "rajasthan"] },

      // ─── INDIAN FOOD ───
      { id: 24, userId: 1004, title: "Indian Thali Feast", caption: "A grand vegetarian thali with 20+ dishes.", imageUrl: "https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?w=800", tags: ["food", "thali", "india", "cuisine", "vegetarian"] },
      { id: 25, userId: 1010, title: "Mumbai Vada Pav", caption: "The king of Mumbai street food.", imageUrl: "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?w=800", tags: ["food", "streetfood", "mumbai", "india", "snack"] },
      { id: 26, userId: 1004, title: "Spice Market Colors", caption: "Vibrant heaps of turmeric, chili, and cumin.", imageUrl: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=800", tags: ["food", "spices", "market", "colors", "india"] },
      { id: 27, userId: 1010, title: "Hyderabadi Biryani", caption: "Layers of fragrant dum biryani cooked to perfection.", imageUrl: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800", tags: ["food", "biryani", "rice", "hyderabad", "india"] },
      { id: 28, userId: 1004, title: "Chai on the Tracks", caption: "Cutting chai served in clay cups at a railway station.", imageUrl: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=800", tags: ["food", "chai", "street", "train", "india"] },
      { id: 29, userId: 1010, title: "South Indian Dosa", caption: "A crispy golden dosa with sambar and chutney.", imageUrl: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=800", tags: ["food", "dosa", "southindian", "breakfast", "india"] },
      { id: 30, userId: 1004, title: "Samosa Plate", caption: "Hot, crispy samosas with green chutney.", imageUrl: "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?w=800", tags: ["food", "samosa", "streetfood", "snack", "india"] },
      { id: 31, userId: 1010, title: "Pani Puri Cart", caption: "The most loved chaat being assembled by an expert hand.", imageUrl: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=800", tags: ["food", "panipuri", "streetfood", "chaat", "india"] }
    ];

    // 4. Bulk Seeding Query 1: Users
    console.log("Bulk seeding users...");
    const userValues = seedCreators.map(c => `(${c.id}, '${c.fullName}', '${c.username}', '${c.email}', 'dummy')`).join(",\n");
    await connection.query(`INSERT INTO users (id, full_name, username, email, password_hash) VALUES ${userValues};`);

    // 5. Bulk Seeding Query 2: Tags
    console.log("Bulk seeding tags...");
    const tagValues = tags.map((t, idx) => `(${idx + 1}, '${t}')`).join(",\n");
    await connection.query(`INSERT INTO tags (id, name) VALUES ${tagValues};`);

    // 6. Bulk Seeding Query 3: Images
    console.log("Bulk seeding images...");
    const imageValues = seedImages.map(img => 
      `(${img.id}, ${img.userId}, '${img.title}', '${img.caption.replace(/'/g, "''")}', '${img.imageUrl}', 'upload')`
    ).join(",\n");
    await connection.query(`INSERT INTO images (id, user_id, title, caption, image_url, source_type) VALUES ${imageValues};`);

    // 7. Bulk Seeding Query 4: Image Tags Relationships
    console.log("Bulk seeding image-tag relationships...");
    const relationshipValues = [];
    seedImages.forEach(img => {
      let primaryTagId = 1; // Default nature
      if (img.tags.includes("cricket") || img.tags.includes("sports")) primaryTagId = 12; // sports
      else if (img.tags.includes("bollywood") || img.tags.includes("cinema")) primaryTagId = 6; // travel
      else if (img.tags.includes("travel") || img.tags.includes("monument")) primaryTagId = 6; // travel
      else if (img.tags.includes("food") || img.tags.includes("thali") || img.tags.includes("snack")) primaryTagId = 11; // food
      
      relationshipValues.push(`(${img.id}, ${primaryTagId})`);

      img.tags.forEach(tName => {
        if (tagMap[tName]) {
          relationshipValues.push(`(${img.id}, ${tagMap[tName]})`);
        }
      });
    });

    const uniqueRelations = [...new Set(relationshipValues)];
    await connection.query(`INSERT IGNORE INTO image_tags (image_id, tag_id) VALUES ${uniqueRelations.join(",\n")};`);

    // 8. Bulk Seeding Query 5: Comments
    console.log("Bulk seeding comments...");
    const sampleComments = [
      "Absolutely stunning!", "Love the colors here.", "Great shot, where is this?",
      "This aesthetic is exactly what I was looking for.", "So beautiful!",
      "Incredible composition.", "Wow, just wow.", "This is my new wallpaper.",
      "Amazing details.", "So calming to look at."
    ];

    const commentValues = [];
    seedImages.forEach(img => {
      const numComments = Math.floor(Math.random() * 3) + 1; // 1 to 3 comments
      for (let i = 0; i < numComments; i++) {
        const randomUserId = seedCreators[Math.floor(Math.random() * seedCreators.length)].id;
        const randomComment = sampleComments[Math.floor(Math.random() * sampleComments.length)];
        commentValues.push(`(${randomUserId}, ${img.id}, '${randomComment.replace(/'/g, "''")}')`);
      }
    });
    await connection.query(`INSERT INTO comments (user_id, image_id, body) VALUES ${commentValues.join(",\n")};`);

    console.log("SUCCESS: Premium matching Unsplash images and tag mappings successfully seeded on live Railway! 🚀");
  } catch (err) {
    console.error("CRITICAL Seeding Failed:", err.message);
    console.error(err);
  } finally {
    await connection.end();
    process.exit(0);
  }
};

run();
