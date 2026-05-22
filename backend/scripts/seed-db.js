// seed-db.js - executes seed.sql to populate the Lumora database
const fs = require("fs");
const path = require("path");
const mysql = require("mysql2/promise");
require("dotenv").config();

(async () => {
  const seedPath = path.resolve(__dirname, "..", "src", "database", "seed.sql");
  const sql = fs.readFileSync(seedPath, "utf8");

  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT || 3306),
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    multipleStatements: true,
    database: process.env.DB_NAME || "lumora"
  });

  try {
    await connection.query(sql);
    console.log("Seed data inserted successfully.");
  } catch (err) {
    console.error("Failed to seed database:", err.message);
    process.exit(1);
  } finally {
    await connection.end();
  }
})();
