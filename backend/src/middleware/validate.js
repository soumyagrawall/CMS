const AppError = require("../utils/AppError");

const validate = (schema) => (req, res, next) => {
  const result = schema.safeParse({
    body: req.body,
    query: req.query,
    params: req.params
  });

  if (!result.success) {
    const details = result.error.issues.map((issue) => ({
      path: issue.path.join("."),
      message: issue.message
    }));
    return next(new AppError("Validation failed", 400, details));
  }

  req.validated = result.data;
  next();
};

module.exports = validate;
