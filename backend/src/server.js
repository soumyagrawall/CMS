const app = require("./app");
const env = require("./config/env");
const { testConnection } = require("./config/database");

const startServer = async () => {
  if (process.env.REQUIRE_DB_ON_START === "true") {
    await testConnection();
  } else {
    try {
      await testConnection();
      console.log("MySQL connection verified");
    } catch (error) {
      console.warn(`MySQL not connected yet: ${error.message}`);
      console.warn("Starting API anyway so frontend/backend can run while database setup is pending.");
    }
  }

  app.listen(env.port, () => {
    console.log(`Lumora API and frontend running on port ${env.port}`);
  });
};

startServer().catch((error) => {
  console.error("Failed to start Lumora API:", error.message);
  process.exit(1);
});
