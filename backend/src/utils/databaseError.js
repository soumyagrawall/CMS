const databaseCodes = ["ECONNREFUSED", "ER_BAD_DB_ERROR", "ER_ACCESS_DENIED_ERROR", "PROTOCOL_CONNECTION_LOST"];

const isDatabaseUnavailable = (error) => {
  const nestedErrors = Array.isArray(error.errors) ? error.errors : [];
  return (
    databaseCodes.includes(error.code) ||
    nestedErrors.some((nestedError) => databaseCodes.includes(nestedError.code)) ||
    error.name === "AggregateError"
  );
};

module.exports = {
  isDatabaseUnavailable
};
