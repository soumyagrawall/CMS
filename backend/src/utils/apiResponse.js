const success = (res, data = null, message = "OK", statusCode = 200, meta = undefined) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
    ...(meta ? { meta } : {})
  });
};

module.exports = {
  success
};
