-- Insert more tags
INSERT IGNORE INTO tags (name) VALUES
  ('architecture'),
  ('fashion'),
  ('lifestyle'),
  ('interior'),
  ('food'),
  ('sports'),
  ('minimalist');

-- Insert more images
INSERT INTO images (user_id, title, caption, image_url, source_type) VALUES
  (1, 'Modern Minimalist Living Room', 'Clean lines and neutral colors in this interior.', 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80', 'upload'),
  (1, 'Street Fashion', 'Urban street style in the heart of the city.', 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80', 'upload'),
  (1, 'Gourmet Burger', 'A delicious gourmet burger with crispy fries.', 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80', 'upload'),
  (1, 'Skateboarding', 'Mid-air trick at the local skatepark.', 'https://images.unsplash.com/photo-1520045892732-304bc3ac5d8e?auto=format&fit=crop&w=800&q=80', 'upload'),
  (1, 'Brutalist Architecture', 'Imposing concrete structures reaching for the sky.', 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80', 'upload'),
  (1, 'Healthy Lifestyle', 'Morning yoga session with a green smoothie.', 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80', 'upload'),
  (1, 'Minimalist Desk', 'A tidy workspace promoting focus and creativity.', 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?auto=format&fit=crop&w=800&q=80', 'upload');

-- Link new images to tags
INSERT IGNORE INTO image_tags (image_id, tag_id) VALUES
  (LAST_INSERT_ID() - 6, (SELECT id FROM tags WHERE name='interior')),
  (LAST_INSERT_ID() - 6, (SELECT id FROM tags WHERE name='minimalist')),
  (LAST_INSERT_ID() - 5, (SELECT id FROM tags WHERE name='fashion')),
  (LAST_INSERT_ID() - 5, (SELECT id FROM tags WHERE name='lifestyle')),
  (LAST_INSERT_ID() - 4, (SELECT id FROM tags WHERE name='food')),
  (LAST_INSERT_ID() - 3, (SELECT id FROM tags WHERE name='sports')),
  (LAST_INSERT_ID() - 3, (SELECT id FROM tags WHERE name='lifestyle')),
  (LAST_INSERT_ID() - 2, (SELECT id FROM tags WHERE name='architecture')),
  (LAST_INSERT_ID() - 1, (SELECT id FROM tags WHERE name='lifestyle')),
  (LAST_INSERT_ID(), (SELECT id FROM tags WHERE name='interior')),
  (LAST_INSERT_ID(), (SELECT id FROM tags WHERE name='minimalist')),
  (LAST_INSERT_ID(), (SELECT id FROM tags WHERE name='architecture'));

COMMIT;
