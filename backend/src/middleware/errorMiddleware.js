const AppError = require("../utils/AppError");
const { isDatabaseUnavailable } = require("../utils/databaseError");

const notFound = (req, res, next) => {
  next(new AppError(`Route not found: ${req.method} ${req.originalUrl}`, 404));
};

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const isProduction = process.env.NODE_ENV === "production";

  if (err.code === "LIMIT_FILE_SIZE") {
    err.statusCode = 413;
    err.message = "Uploaded file is too large";
  }

  const hasDatabaseError = req.originalUrl.startsWith("/api/") && isDatabaseUnavailable(err);

  if (hasDatabaseError) {
    err.statusCode = 503;
    err.message = "Database unavailable. Configure and start MySQL, then run the schema.sql file.";
  }

  res.status(err.statusCode || statusCode).json({
    success: false,
    message: err.message || "Internal server error",
    ...(err.details ? { details: err.details } : {}),
    ...(!isProduction && err.stack ? { stack: err.stack } : {})
  });
};

module.exports = {
  notFound,
  errorHandler
};
