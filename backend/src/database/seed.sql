-- Seed script to add dummy images and tags
-- Ensure a user with id=1 exists (e.g., admin). Adjust user_id as needed.

-- Insert tags
INSERT INTO tags (name) VALUES
  ('nature'),
  ('city'),
  ('animals'),
  ('technology'),
  ('art'),
  ('travel');

-- Insert images
INSERT INTO images (user_id, title, caption, image_url, source_type) VALUES
  (1, 'Sunset over hills', 'A beautiful orange sunset over rolling hills.', 'https://picsum.photos/seed/sunset/800/600', 'upload'),
  (1, 'Modern skyline', 'City skyline at night with lights.', 'https://picsum.photos/seed/city/800/600', 'upload'),
  (1, 'Playful puppy', 'A cute puppy playing in the grass.', 'https://picsum.photos/seed/puppy/800/600', 'upload'),
  (1, 'Futuristic circuit board', 'Close‑up of a glowing circuit board.', 'https://picsum.photos/seed/circuit/800/600', 'upload'),
  (1, 'Abstract painting', 'Vibrant abstract art with splashes of colour.', 'https://picsum.photos/seed/abstract/800/600', 'upload'),
  (1, 'Mountain trail', 'A winding trail through the mountains.', 'https://picsum.photos/seed/mountain/800/600', 'upload');

-- Link images to tags (assumes auto‑increment ids start after existing rows)
-- Adjust the image_id and tag_id values if your DB already contains rows.
INSERT INTO image_tags (image_id, tag_id) VALUES
  (LAST_INSERT_ID() - 5, (SELECT id FROM tags WHERE name='nature')),
  (LAST_INSERT_ID() - 5, (SELECT id FROM tags WHERE name='travel')),
  (LAST_INSERT_ID() - 4, (SELECT id FROM tags WHERE name='city')),
  (LAST_INSERT_ID() - 4, (SELECT id FROM tags WHERE name='technology')),
  (LAST_INSERT_ID() - 3, (SELECT id FROM tags WHERE name='animals')),
  (LAST_INSERT_ID() - 2, (SELECT id FROM tags WHERE name='technology')),
  (LAST_INSERT_ID() - 2, (SELECT id FROM tags WHERE name='art')),
  (LAST_INSERT_ID() - 1, (SELECT id FROM tags WHERE name='art')),
  (LAST_INSERT_ID() - 1, (SELECT id FROM tags WHERE name='nature')),
  (LAST_INSERT_ID(), (SELECT id FROM tags WHERE name='nature')),
  (LAST_INSERT_ID(), (SELECT id FROM tags WHERE name='travel'));

-- Commit the transaction (optional depending on your client)
COMMIT;
