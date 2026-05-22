const { z } = require("zod");
const { tagsField } = require("./imageValidation");

const generateImage = z.object({
  body: z.object({
    prompt: z.string().min(4).max(1000),
    style: z.enum(["editorial", "abstract", "monotone", "film"]).default("editorial"),
    title: z.string().min(1).max(160).optional(),
    caption: z.string().max(2000).optional().default(""),
    tags: tagsField.optional().default([])
  }),
  query: z.object({}).passthrough(),
  params: z.object({})
});

const generateCaption = z.object({
  body: z.object({
    prompt: z.string().min(4).max(1000),
    title: z.string().max(160).optional(),
    tags: tagsField.optional().default([])
  }),
  query: z.object({}).passthrough(),
  params: z.object({})
});

module.exports = {
  generateImage,
  generateCaption
};
