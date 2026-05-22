const { z } = require("zod");

const updateProfile = z.object({
  body: z.object({
    fullName: z.string().min(2).max(120).optional(),
    bio: z.string().max(500).nullable().optional(),
    website: z.string().url().max(255).nullable().optional(),
    location: z.string().max(120).nullable().optional(),
    avatarUrl: z.string().url().max(500).nullable().optional(),
    isPrivate: z.boolean().optional()
  }),
  query: z.object({}).passthrough(),
  params: z.object({})
});

const searchUsers = z.object({
  body: z.object({}).passthrough(),
  query: z.object({
    q: z.string().min(1).max(80),
    page: z.coerce.number().optional(),
    limit: z.coerce.number().optional()
  }),
  params: z.object({})
});

module.exports = {
  updateProfile,
  searchUsers
};
