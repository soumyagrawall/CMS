const searchService = require("../services/searchService");
const { success } = require("../utils/apiResponse");
const asyncHandler = require("../utils/asyncHandler");
const { getPagination } = require("../utils/pagination");

const searchAll = asyncHandler(async (req, res) => {
  const { page, limit, offset } = getPagination(req.validated.query);
  const results = await searchService.searchAll(req.validated.query.q, limit, offset);
  success(res, results, "Search results", 200, { page, limit });
});

const searchTags = asyncHandler(async (req, res) => {
  const { limit } = getPagination(req.validated.query);
  const tags = await searchService.searchTags(req.validated.query.q, limit);
  success(res, { tags }, "Tags found");
});

module.exports = {
  searchAll,
  searchTags
};
