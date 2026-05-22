const { z } = require("zod");

const signup = z.object({
  body: z.object({
    fullName: z.string().min(2).max(120),
    username: z.string().min(3).max(40),
    email: z.string().email().max(160),
    password: z.string().min(8).max(128)
  }),
  query: z.object({}).passthrough(),
  params: z.object({})
});

const login = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(1)
  }),
  query: z.object({}).passthrough(),
  params: z.object({})
});

module.exports = {
  signup,
  login
};
