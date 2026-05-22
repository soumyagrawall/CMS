const { z } = require("zod");

const search = z.object({
  body: z.object({}).passthrough(),
  query: z.object({
    q: z.string().min(1).max(80),
    page: z.coerce.number().optional(),
    limit: z.coerce.number().optional()
  }),
  params: z.object({})
});

module.exports = {
  search
};
