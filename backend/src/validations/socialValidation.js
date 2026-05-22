const { z } = require("zod");

const imageId = z.object({
  body: z.object({}).passthrough(),
  query: z.object({}).passthrough(),
  params: z.object({
    imageId: z.coerce.number().int().positive()
  })
});

const addComment = z.object({
  body: z.object({
    body: z.string().min(1).max(1000)
  }),
  query: z.object({}).passthrough(),
  params: z.object({
    imageId: z.coerce.number().int().positive()
  })
});

const follow = z.object({
  body: z.object({}).passthrough(),
  query: z.object({}).passthrough(),
  params: z.object({
    userId: z.coerce.number().int().positive()
  })
});

module.exports = {
  imageId,
  addComment,
  follow
};
