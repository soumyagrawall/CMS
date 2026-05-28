const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');

const run = async () => {
  const connectionUrl = process.argv[2];

  if (!connectionUrl) {
    console.error('Error: Please provide your Railway MySQL Connection URL.');
    console.error('Example: node seed_railway.js "mysql://root:your_password@your_host:your_port/railway"');
    process.exit(1);
  }

  console.log('Reading seed_massive.sql...');
  const seedPath = path.resolve(__dirname, 'backend', 'src', 'database', 'seed_massive.sql');
  if (!fs.existsSync(seedPath)) {
    console.error(`Error: Seed file not found at ${seedPath}`);
    process.exit(1);
  }

  const sql = fs.readFileSync(seedPath, 'utf8');

  console.log('Connecting to Railway MySQL database...');
  let connection;
  try {
    connection = await mysql.createConnection({
      uri: connectionUrl,
      multipleStatements: true
    });
    console.log('Connected successfully!');
  } catch (err) {
    console.error('Failed to connect to Railway database:', err.message);
    process.exit(1);
  }

  try {
    console.log('Executing seed script (this might take a few seconds)...');
    await connection.query(sql);
    console.log('Database successfully seeded with 100 images, users, tags, comments, likes, saves, and follows! 🎉');
  } catch (err) {
    console.error('Failed to run seed script:', err.message);
  } finally {
    await connection.end();
  }
};

run();
