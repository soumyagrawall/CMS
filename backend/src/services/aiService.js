const env = require("../config/env");

const generateImage = async ({ prompt, style }) => {
  if (env.ai.provider === "mock") {
    const encoded = encodeURIComponent(`${style || "Editorial"} ${prompt}`);
    return {
      imageUrl: `https://placehold.co/1200x1500/png?text=${encoded}`,
      provider: "mock",
      prompt,
      style
    };
  }

  throw new Error("AI provider is not configured. Set AI_PROVIDER=mock or wire a provider in aiService.");
};

const generateCaption = async ({ prompt, title, tags = [] }) => {
  const tagText = tags.length ? ` with notes of ${tags.join(", ")}` : "";
  return {
    caption: `${title || "This piece"} explores ${prompt.toLowerCase()}${tagText}, composed with Nexa's editorial eye.`,
    provider: env.ai.provider
  };
};

module.exports = {
  generateImage,
  generateCaption
};
