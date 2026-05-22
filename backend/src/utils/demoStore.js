const now = () => new Date().toISOString();

const demoUser = {
  id: 1,
  fullName: "Demo Creator",
  username: "demo_creator",
  email: "demo@lumora.test",
  avatarUrl: null,
  bio: "Demo workspace while MySQL is being configured.",
  website: "https://lumora.local",
  location: "Editorial Studio",
  isPrivate: false,
  createdAt: now()
};

let nextImageId = 4;
let nextCommentId = 3;

const images = [
  {
    id: 1,
    userId: 1,
    title: "The Architecture of Silence",
    caption: "A quiet editorial study of structure, light, and negative space.",
    imageUrl: "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80",
    sourceType: "ai_generated",
    aiPrompt: "minimal architecture in soft editorial light",
    aiStyle: "editorial",
    viewCount: 128,
    likeCount: 42,
    commentCount: 2,
    saveCount: 11,
    createdAt: now(),
    username: demoUser.username,
    authorName: demoUser.fullName,
    authorAvatarUrl: demoUser.avatarUrl,
    tags: ["architecture", "editorial", "light"]
  },
  {
    id: 2,
    userId: 1,
    title: "Iridescent Study",
    caption: "Abstract macro folds rendered like liquid silk.",
    imageUrl: "https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=1200&q=80",
    sourceType: "upload",
    aiPrompt: null,
    aiStyle: null,
    viewCount: 94,
    likeCount: 25,
    commentCount: 0,
    saveCount: 7,
    createdAt: now(),
    username: demoUser.username,
    authorName: demoUser.fullName,
    authorAvatarUrl: demoUser.avatarUrl,
    tags: ["abstract", "texture"]
  },
  {
    id: 3,
    userId: 1,
    title: "Botanical Light",
    caption: "Soft botanical forms for a calm visual system.",
    imageUrl: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
    sourceType: "ai_generated",
    aiPrompt: "botanical shapes in diffused morning light",
    aiStyle: "film",
    viewCount: 76,
    likeCount: 18,
    commentCount: 0,
    saveCount: 5,
    createdAt: now(),
    username: demoUser.username,
    authorName: demoUser.fullName,
    authorAvatarUrl: demoUser.avatarUrl,
    tags: ["nature", "film", "mood"]
  }
];

const comments = [
  { id: 1, imageId: 1, userId: 1, username: "demo_creator", fullName: "Demo Creator", avatarUrl: null, body: "This is the demo comment stream.", createdAt: now() },
  { id: 2, imageId: 1, userId: 1, username: "demo_creator", fullName: "Demo Creator", avatarUrl: null, body: "MySQL can replace this later without changing the frontend.", createdAt: now() }
];

const liked = new Set();
const saved = new Set();

const createImage = (payload) => {
  const image = {
    id: nextImageId++,
    userId: payload.userId || 1,
    title: payload.title || "Untitled Demo Creation",
    caption: payload.caption || "",
    imageUrl: payload.imageUrl,
    sourceType: payload.sourceType || "ai_generated",
    aiPrompt: payload.aiPrompt || null,
    aiStyle: payload.aiStyle || null,
    viewCount: 0,
    likeCount: 0,
    commentCount: 0,
    saveCount: 0,
    createdAt: now(),
    username: demoUser.username,
    authorName: demoUser.fullName,
    authorAvatarUrl: demoUser.avatarUrl,
    tags: payload.tags || []
  };
  images.unshift(image);
  return image;
};

const getImages = () => images;
const getImage = (id) => images.find((image) => Number(image.id) === Number(id)) || images[0];

const searchImages = (term) => {
  const q = term.toLowerCase();
  return images.filter((image) =>
    [image.title, image.caption, image.username, ...(image.tags || [])].some((value) => String(value).toLowerCase().includes(q))
  );
};

const toggleSet = (set, key) => {
  if (set.has(key)) {
    set.delete(key);
    return false;
  }
  set.add(key);
  return true;
};

const addComment = (imageId, body) => {
  const comment = {
    id: nextCommentId++,
    imageId: Number(imageId),
    userId: 1,
    username: demoUser.username,
    fullName: demoUser.fullName,
    avatarUrl: demoUser.avatarUrl,
    body,
    createdAt: now()
  };
  comments.unshift(comment);
  const image = getImage(imageId);
  image.commentCount += 1;
  return comment;
};

module.exports = {
  demoUser,
  getImages,
  getImage,
  createImage,
  searchImages,
  toggleLike: (userId, imageId) => toggleSet(liked, `${userId}:${imageId}`),
  toggleSave: (userId, imageId) => toggleSet(saved, `${userId}:${imageId}`),
  addComment,
  listComments: (imageId) => comments.filter((comment) => Number(comment.imageId) === Number(imageId)),
  searchUsers: (term) => (demoUser.username.includes(term.toLowerCase()) || demoUser.fullName.toLowerCase().includes(term.toLowerCase()) ? [demoUser] : []),
  searchTags: (term) => {
    const q = term.replace(/^#/, "").toLowerCase();
    const counts = new Map();
    images.flatMap((image) => image.tags || []).forEach((tag) => counts.set(tag, (counts.get(tag) || 0) + 1));
    return Array.from(counts.entries())
      .filter(([name]) => name.includes(q))
      .map(([name, imageCount], index) => ({ id: index + 1, name, imageCount }));
  }
};
