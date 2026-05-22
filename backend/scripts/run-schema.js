const fs = require("fs");
const path = require("path");
const mysql = require("mysql2/promise");
require("dotenv").config();

const run = async () => {
  const schemaPath = path.resolve(__dirname, "..", "src", "database", "schema.sql");
  const sql = fs.readFileSync(schemaPath, "utf8");

  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT || 3306),
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    multipleStatements: true
  });

  try {
    await connection.query(sql);
    console.log("Lumora schema applied successfully.");
  } finally {
    await connection.end();
  }
};

if (require.main === module) {
  run().catch((error) => {
    console.error("Failed to apply Lumora schema:", error.message);
    process.exit(1);
  });
}

module.exports = run;
