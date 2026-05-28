const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');

const run = async () => {
  const connectionUrl = process.argv[2];

  if (!connectionUrl) {
    console.error('Error: Please provide your Railway MySQL Connection URL.');
    process.exit(1);
  }

  console.log('Reading seed_massive.sql...');
  const seedPath = path.resolve(__dirname, '..', 'src', 'database', 'seed_massive.sql');
  if (!fs.existsSync(seedPath)) {
    console.error(`Error: Seed file not found at ${seedPath}`);
    process.exit(1);
  }

  const sql = fs.readFileSync(seedPath, 'utf8');

  console.log('Connecting to Railway MySQL database...');
  let connection;
  try {
    let config = {
      multipleStatements: true
    };

    if (connectionUrl.startsWith('mysql://')) {
      const match = connectionUrl.match(/mysql:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+)/);
      if (match) {
        config.user = decodeURIComponent(match[1]);
        config.password = decodeURIComponent(match[2]);
        config.host = match[3];
        config.port = parseInt(match[4], 10);
        config.database = match[5];
      } else {
        config.uri = connectionUrl;
      }
    } else {
      config.uri = connectionUrl;
    }

    console.log(`Connecting to Host: ${config.host || 'URI'}, Port: ${config.port || 'default'}, User: ${config.user || 'default'}, Database: ${config.database || 'default'}...`);

    connection = await mysql.createConnection(config);
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
