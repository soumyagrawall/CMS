const { z } = require("zod");

const list = z.object({
  body: z.object({}).passthrough(),
  query: z.object({
    page: z.coerce.number().optional(),
    limit: z.coerce.number().optional()
  }),
  params: z.object({})
});

const markRead = z.object({
  body: z.object({}).passthrough(),
  query: z.object({}).passthrough(),
  params: z.object({
    id: z.coerce.number().int().positive()
  })
});

module.exports = {
  list,
  markRead
};
