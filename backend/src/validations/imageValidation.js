const { z } = require("zod");

const tagsField = z.preprocess((value) => {
  if (Array.isArray(value)) return value;
  if (typeof value === "string") {
    return value
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);
  }
  return [];
}, z.array(z.string().max(40)).max(20));

const createUpload = z.object({
  body: z.object({
    title: z.string().min(1).max(160),
    caption: z.string().max(2000).optional().default(""),
    tags: tagsField.optional().default([])
  }),
  query: z.object({}).passthrough(),
  params: z.object({})
});

const imageId = z.object({
  body: z.object({}).passthrough(),
  query: z.object({}).passthrough(),
  params: z.object({
    id: z.coerce.number().int().positive()
  })
});

const feed = z.object({
  body: z.object({}).passthrough(),
  query: z.object({
    page: z.coerce.number().optional(),
    limit: z.coerce.number().optional(),
    type: z.string().optional()
  }),
  params: z.object({})
});

module.exports = {
  createUpload,
  imageId,
  feed,
  tagsField
};
