const fs = require('fs');

const users = [
  {
    id: 1,
    full_name: 'Nexa Admin',
    username: 'admin',
    email: 'admin@nexa.com',
    password_hash: '$2a$12$R.S4.i3g.V1QexGgN2qPZexC.B6V04JkL5YlP1h72oB2YcIe0x7p.', // demo12345
    avatar_url: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
    bio: 'Official Administrator of Nexa Platform. Exploring AI and photography.',
    location: 'San Francisco, CA'
  },
  {
    id: 2,
    full_name: 'Priya Sharma',
    username: 'priya_shoots',
    email: 'priya@nexa.com',
    password_hash: '$2a$12$R.S4.i3g.V1QexGgN2qPZexC.B6V04JkL5YlP1h72oB2YcIe0x7p.',
    avatar_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    bio: 'Photographer & visual storyteller. Capturing everyday moments.',
    location: 'Mumbai, India'
  },
  {
    id: 3,
    full_name: 'Rahul Verma',
    username: 'rahul.creates',
    email: 'rahul@nexa.com',
    password_hash: '$2a$12$R.S4.i3g.V1QexGgN2qPZexC.B6V04JkL5YlP1h72oB2YcIe0x7p.',
    avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    bio: 'UI/UX Designer | Minimalist. Less is more.',
    location: 'Delhi, India'
  },
  {
    id: 4,
    full_name: 'Ananya Gupta',
    username: 'ananya_art',
    email: 'ananya@nexa.com',
    password_hash: '$2a$12$R.S4.i3g.V1QexGgN2qPZexC.B6V04JkL5YlP1h72oB2YcIe0x7p.',
    avatar_url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80',
    bio: 'Digital artist & dreamer. Creating magic with pixels.',
    location: 'Bangalore, India'
  },
  {
    id: 5,
    full_name: 'Vikram Singh',
    username: 'vikram.lens',
    email: 'vikram@nexa.com',
    password_hash: '$2a$12$R.S4.i3g.V1QexGgN2qPZexC.B6V04JkL5YlP1h72oB2YcIe0x7p.',
    avatar_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    bio: 'Travel photographer. Wandering where the wifi is weak.',
    location: 'Jaipur, India'
  },
  {
    id: 6,
    full_name: 'Meera Patel',
    username: 'meera_clicks',
    email: 'meera@nexa.com',
    password_hash: '$2a$12$R.S4.i3g.V1QexGgN2qPZexC.B6V04JkL5YlP1h72oB2YcIe0x7p.',
    avatar_url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
    bio: 'Nature lover & macro photographer. Seeing small things.',
    location: 'Ahmedabad, India'
  },
  {
    id: 7,
    full_name: 'Arjun Reddy',
    username: 'arjun.visuals',
    email: 'arjun@nexa.com',
    password_hash: '$2a$12$R.S4.i3g.V1QexGgN2qPZexC.B6V04JkL5YlP1h72oB2YcIe0x7p.',
    avatar_url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80',
    bio: 'Filmmaker & cinematic content creator.',
    location: 'Hyderabad, India'
  },
  {
    id: 8,
    full_name: 'Kavya Nair',
    username: 'kavya_designs',
    email: 'kavya@nexa.com',
    password_hash: '$2a$12$R.S4.i3g.V1QexGgN2qPZexC.B6V04JkL5YlP1h72oB2YcIe0x7p.',
    avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    bio: 'Graphic designer and art director.',
    location: 'Chennai, India'
  },
  {
    id: 9,
    full_name: 'Rohan Das',
    username: 'rohan.captures',
    email: 'rohan@nexa.com',
    password_hash: '$2a$12$R.S4.i3g.V1QexGgN2qPZexC.B6V04JkL5YlP1h72oB2YcIe0x7p.',
    avatar_url: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&q=80',
    bio: 'Street photography enthusiast. Finding beauty in the chaos.',
    location: 'Kolkata, India'
  },
  {
    id: 10,
    full_name: 'Sneha Joshi',
    username: 'sneha_frames',
    email: 'sneha@nexa.com',
    password_hash: '$2a$12$R.S4.i3g.V1QexGgN2qPZexC.B6V04JkL5YlP1h72oB2YcIe0x7p.',
    avatar_url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80',
    bio: 'Fashion & lifestyle blogger. Curating my aesthetic.',
    location: 'Pune, India'
  }
];

const tags = [
  { id: 1, name: 'nature' },
  { id: 2, name: 'city' },
  { id: 3, name: 'animals' },
  { id: 4, name: 'technology' },
  { id: 5, name: 'art' },
  { id: 6, name: 'travel' },
  { id: 7, name: 'architecture' },
  { id: 8, name: 'fashion' },
  { id: 9, name: 'lifestyle' },
  { id: 10, name: 'interior' },
  { id: 11, name: 'food' },
  { id: 12, name: 'sports' }
];

const commentsList = [
  "Wow, this is absolutely beautiful!",
  "Stunning composition, love the colors here.",
  "Which lens did you use for this?",
  "Perfect timing, lighting is incredible.",
  "This is pure art! Keep up the great work.",
  "What an amazing view!",
  "Such clean lines and framing.",
  "Incredible details, looks so cinematic.",
  "This makes me want to travel right now.",
  "So peaceful and calm.",
  "The aesthetic of this is top-notch.",
  "Super creative, I love it!",
  "Brilliant shot!",
  "This is phenomenal.",
  "Love everything about this!",
  "Incredible work!",
  "Simply gorgeous.",
  "Perfect composition.",
  "The lighting here is unreal.",
  "Awesome shot!"
];

let sql = `-- ==========================================
-- NEXA SOCIAL & IMAGE CMS MASSIVE SEED SCRIPT
-- ==========================================\n\n`;

// Clear existing tables to ensure a clean seed run
sql += `-- Clear existing seed data\n`;
sql += `SET FOREIGN_KEY_CHECKS = 0;\n`;
sql += `TRUNCATE TABLE follows;\n`;
sql += `TRUNCATE TABLE comments;\n`;
sql += `TRUNCATE TABLE saves;\n`;
sql += `TRUNCATE TABLE likes;\n`;
sql += `TRUNCATE TABLE image_tags;\n`;
sql += `TRUNCATE TABLE images;\n`;
sql += `TRUNCATE TABLE tags;\n`;
sql += `TRUNCATE TABLE users;\n`;
sql += `SET FOREIGN_KEY_CHECKS = 1;\n\n`;

// 1. Insert Users
sql += `-- Seeding Users\n`;
sql += `INSERT INTO users (id, full_name, username, email, password_hash, avatar_url, bio, location) VALUES\n`;
users.forEach((u, i) => {
  sql += `  (${u.id}, '${u.full_name.replace(/'/g, "''")}', '${u.username}', '${u.email}', '${u.password_hash}', '${u.avatar_url}', '${u.bio.replace(/'/g, "''")}', '${u.location.replace(/'/g, "''")}')${i === users.length - 1 ? ';' : ','}\n`;
});
sql += `\n`;

// 2. Insert Tags
sql += `-- Seeding Tags\n`;
sql += `INSERT INTO tags (id, name) VALUES\n`;
tags.forEach((t, i) => {
  sql += `  (${t.id}, '${t.name}')${i === tags.length - 1 ? ';' : ','}\n`;
});
sql += `\n`;

// 3. Generate Images, Likes, Saves, Comments, Image Tags
const adjectives = ['Beautiful', 'Stunning', 'Vibrant', 'Dark', 'Bright', 'Minimalist', 'Cozy', 'Epic', 'Calm', 'Wild'];
const nouns = ['Landscape', 'Cityscape', 'Ocean', 'Forest', 'Architecture', 'Mountain', 'Sunset', 'Street', 'Portrait', 'Abstract'];

const images = [];
const imageTagsRelations = [];
const likesRelations = [];
const savesRelations = [];
const commentsRelations = [];

for (let i = 1; i <= 100; i++) {
  const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  const title = `${adj} ${noun} ${i}`;
  const caption = `A fantastic shot capturing the essence of a ${adj.toLowerCase()} ${noun.toLowerCase()}.`;
  const url = `https://picsum.photos/seed/nexa_massive_${i}/800/600`;
  
  // Random owner from users 1 to 10
  const userId = Math.floor(Math.random() * 10) + 1;
  
  // Assign 1 to 3 random tags
  const numTags = Math.floor(Math.random() * 3) + 1;
  const imageTags = [];
  while (imageTags.length < numTags) {
    const tagId = Math.floor(Math.random() * tags.length) + 1;
    if (!imageTags.includes(tagId)) {
      imageTags.push(tagId);
    }
  }
  imageTags.forEach(tagId => {
    imageTagsRelations.push({ image_id: i, tag_id: tagId });
  });

  // Assign random likes (1 to 7 random users)
  const numLikes = Math.floor(Math.random() * 7) + 1;
  const imageLikes = [];
  while (imageLikes.length < numLikes) {
    const likerId = Math.floor(Math.random() * 10) + 1;
    if (!imageLikes.includes(likerId)) {
      imageLikes.push(likerId);
    }
  }
  imageLikes.forEach(likerId => {
    likesRelations.push({ user_id: likerId, image_id: i });
  });

  // Assign random saves (0 to 4 random users)
  const numSaves = Math.floor(Math.random() * 5);
  const imageSaves = [];
  while (imageSaves.length < numSaves) {
    const saverId = Math.floor(Math.random() * 10) + 1;
    if (!imageSaves.includes(saverId)) {
      imageSaves.push(saverId);
    }
  }
  imageSaves.forEach(saverId => {
    savesRelations.push({ user_id: saverId, image_id: i });
  });

  // Assign random comments (0 to 3 comments)
  const numComments = Math.floor(Math.random() * 4);
  for (let c = 0; c < numComments; c++) {
    const commenterId = Math.floor(Math.random() * 10) + 1;
    const body = commentsList[Math.floor(Math.random() * commentsList.length)];
    commentsRelations.push({ user_id: commenterId, image_id: i, body });
  }

  const viewCount = Math.floor(Math.random() * 450) + 50;

  images.push({
    id: i,
    user_id: userId,
    title,
    caption,
    image_url: url,
    view_count: viewCount,
    like_count: imageLikes.length,
    comment_count: numComments,
    save_count: imageSaves.length
  });
}

// 4. Generate Follows
const followsRelations = [];
for (let followerId = 1; followerId <= 10; followerId++) {
  const numFollows = Math.floor(Math.random() * 4) + 2; // Follow 2 to 5 random users
  const followed = [];
  while (followed.length < numFollows) {
    const followingId = Math.floor(Math.random() * 10) + 1;
    if (followingId !== followerId && !followed.includes(followingId)) {
      followed.push(followingId);
    }
  }
  followed.forEach(followingId => {
    followsRelations.push({ follower_id: followerId, following_id: followingId });
  });
}

// Write Images insert
sql += `-- Seeding Images\n`;
sql += `INSERT INTO images (id, user_id, title, caption, image_url, source_type, view_count, like_count, comment_count, save_count) VALUES\n`;
images.forEach((img, index) => {
  sql += `  (${img.id}, ${img.user_id}, '${img.title.replace(/'/g, "''")}', '${img.caption.replace(/'/g, "''")}', '${img.image_url}', 'upload', ${img.view_count}, ${img.like_count}, ${img.comment_count}, ${img.save_count})${index === images.length - 1 ? ';' : ','}\n`;
});
sql += `\n`;

// Write Image-Tags relations insert
sql += `-- Seeding Image Tags\n`;
sql += `INSERT INTO image_tags (image_id, tag_id) VALUES\n`;
imageTagsRelations.forEach((rel, index) => {
  sql += `  (${rel.image_id}, ${rel.tag_id})${index === imageTagsRelations.length - 1 ? ';' : ','}\n`;
});
sql += `\n`;

// Write Likes insert
sql += `-- Seeding Likes\n`;
sql += `INSERT INTO likes (user_id, image_id) VALUES\n`;
likesRelations.forEach((rel, index) => {
  sql += `  (${rel.user_id}, ${rel.image_id})${index === likesRelations.length - 1 ? ';' : ','}\n`;
});
sql += `\n`;

// Write Saves insert
sql += `-- Seeding Saves\n`;
sql += `INSERT INTO saves (user_id, image_id) VALUES\n`;
savesRelations.forEach((rel, index) => {
  sql += `  (${rel.user_id}, ${rel.image_id})${index === savesRelations.length - 1 ? ';' : ','}\n`;
});
sql += `\n`;

// Write Comments insert
sql += `-- Seeding Comments\n`;
sql += `INSERT INTO comments (user_id, image_id, body) VALUES\n`;
commentsRelations.forEach((rel, index) => {
  sql += `  (${rel.user_id}, ${rel.image_id}, '${rel.body.replace(/'/g, "''")}')${index === commentsRelations.length - 1 ? ';' : ','}\n`;
});
sql += `\n`;

// Write Follows insert
sql += `-- Seeding Follows\n`;
sql += `INSERT INTO follows (follower_id, following_id) VALUES\n`;
followsRelations.forEach((rel, index) => {
  sql += `  (${rel.follower_id}, ${rel.following_id})${index === followsRelations.length - 1 ? ';' : ','}\n`;
});
sql += `\n`;

// End transaction
sql += `COMMIT;\n`;

fs.writeFileSync('c:/NEXA/Lumora/backend/src/database/seed_massive.sql', sql);
console.log('Successfully generated complete seed_massive.sql with 100 images, users, tags, comments, likes, saves, and follows!');
