const getPagination = (query) => {
  const page = Math.max(Number(query.page || 1), 1);
  const limit = Math.min(Math.max(Number(query.limit || 50), 1), 200);
  const offset = (page - 1) * limit;

  return { page, limit, offset };
};

module.exports = {
  getPagination
};
