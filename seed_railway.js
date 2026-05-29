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

  console.log('Connecting to Railway MySQL database for curated clean rebuild...');
  
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

  console.log(`Connection details parsed:`);
  console.log(` - Host: ${host}`);
  console.log(` - Port: ${port}`);
  console.log(` - User: ${user}`);
  console.log(` - Database: ${database}`);

  // Inject Railway credentials into environment variables for rebuild script
  process.env.MYSQLHOST = host;
  process.env.MYSQLPORT = port;
  process.env.MYSQLUSER = user;
  process.env.MYSQLPASSWORD = password;
  process.env.MYSQLDATABASE = database;
  process.env.NODE_ENV = 'production';
  process.env.REQUIRE_DB_ON_START = 'false';

  // Run the rebuild script programmatically
  console.log('\nTriggering database clean curated seeding routine...');
  const rebuildScriptPath = path.resolve(__dirname, 'backend', 'scripts', 'rebuild_db_clean.js');
  
  if (!fs.existsSync(rebuildScriptPath)) {
    console.error(`Error: Rebuild script not found at ${rebuildScriptPath}`);
    process.exit(1);
  }

  // Load and execute rebuild script
  require(rebuildScriptPath);
};

run();
