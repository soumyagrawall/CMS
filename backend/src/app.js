const path = require("path");
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const env = require("./config/env");
const routes = require("./routes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

const app = express();
const frontendRoot = path.resolve(process.cwd(), "..", "Frontend");
const pageMap = {
  "/": "lumora_login/code.html",
  "/login": "lumora_login/code.html",
  "/signup": "lumora_signup/code.html",
  "/feed": "lumora_refined_feed/code.html",
  "/create": "lumora_create_post/code.html",
  "/explore": "lumora_dynamic_search_grid/code.html",
  "/post": "lumora_post_detail/code.html",
  "/profile": "lumora_profile/code.html",
  "/settings": "lumora_settings_corrected/code.html",
  "/notifications": "lumora_notifications/code.html",
  "/support": "lumora_support_final/code.html"
};

app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: env.frontendOrigin === "*" ? true : env.frontendOrigin, credentials: true }));
app.use(helmet({ 
  crossOriginResourcePolicy: { policy: "cross-origin" },
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "blob:", "https://images.unsplash.com", "https://lh3.googleusercontent.com"],
      scriptSrc: ["'self'", "'unsafe-inline'", "https://cdn.tailwindcss.com"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      connectSrc: ["'self'"]
    }
  }
}));
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 300,
    standardHeaders: true,
    legacyHeaders: false
  })
);

app.use("/uploads", express.static(path.resolve(process.cwd(), "uploads")));
app.use("/frontend", express.static(frontendRoot));
app.use("/assets", express.static(path.join(frontendRoot, "assets")));

app.get("/health", (req, res) => {
  res.json({ success: true, status: "ok", message: "Lumora API is healthy" });
});

Object.entries(pageMap).forEach(([route, file]) => {
  app.get(route, (req, res) => {
    res.sendFile(path.join(frontendRoot, file));
  });
});

app.use("/api/v1", routes);
app.use(notFound);
app.use(errorHandler);

module.exports = app;
