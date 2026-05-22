const { z } = require("zod");

const track = z.object({
  body: z.object({
    imageId: z.number().int().positive().optional(),
    eventType: z.enum(["view", "save", "share", "download", "search", "upload", "generate_image", "generate_caption"]),
    metadata: z.record(z.any()).optional()
  }),
  query: z.object({}).passthrough(),
  params: z.object({})
});

const imageSummary = z.object({
  body: z.object({}).passthrough(),
  query: z.object({}).passthrough(),
  params: z.object({
    imageId: z.coerce.number().int().positive()
  })
});

module.exports = {
  track,
  imageSummary
};
