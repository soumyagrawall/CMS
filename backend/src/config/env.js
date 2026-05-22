const dotenv = require("dotenv");

dotenv.config();

const env = {
  nodeEnv: process.env.NODE_ENV || "development",
  port: Number(process.env.PORT || 5000),
  apiBaseUrl: process.env.API_BASE_URL || "http://localhost:5000",
  frontendOrigin: process.env.FRONTEND_ORIGIN || "*",
  db: {
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT || 3306),
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "lumora",
    connectionLimit: Number(process.env.DB_CONNECTION_LIMIT || 10)
  },
  jwt: {
    secret: process.env.JWT_SECRET || "development-only-secret-change-me",
    expiresIn: process.env.JWT_EXPIRES_IN || "7d"
  },
  bcryptSaltRounds: Number(process.env.BCRYPT_SALT_ROUNDS || 12),
  uploadDir: process.env.UPLOAD_DIR || "uploads/images",
  maxUploadMb: Number(process.env.MAX_UPLOAD_MB || 8),
  demoAuthEnabled: process.env.DEMO_AUTH_ENABLED !== "false",
  demoEmail: process.env.DEMO_EMAIL || "demo@lumora.test",
  demoPassword: process.env.DEMO_PASSWORD || "demo12345",
  ai: {
    provider: process.env.AI_PROVIDER || "mock",
    apiKey: process.env.AI_API_KEY || process.env.OPENAI_API_KEY || ""
  },
  aws: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
    bucketName: process.env.AWS_BUCKET_NAME || "",
    region: process.env.AWS_REGION || ""
  }
};

module.exports = env;
