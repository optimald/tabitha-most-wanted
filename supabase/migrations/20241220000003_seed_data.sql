-- Insert sample products for testing
INSERT INTO public.products (
  title,
  description,
  price,
  original_price,
  currency,
  image_url,
  product_url,
  retailer,
  category,
  age_range_min,
  age_range_max,
  rating,
  availability
) VALUES
-- Toys for younger kids (6-10)
(
  'LEGO Classic Creative Bricks Set',
  'A colorful set of LEGO bricks to spark creativity and imagination. Perfect for building anything you can dream up!',
  29.99,
  34.99,
  'USD',
  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
  'https://amazon.com/lego-classic-creative-bricks',
  'amazon',
  'toys',
  6,
  12,
  4.5,
  true
),
(
  'Crayola 64-Count Crayon Box',
  'The classic crayon box with 64 vibrant colors including built-in sharpener. Perfect for coloring and art projects.',
  4.99,
  6.99,
  'USD',
  'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400',
  'https://walmart.com/crayola-64-crayon-box',
  'walmart',
  'arts-crafts',
  6,
  14,
  4.8,
  true
),
(
  'Hot Wheels 20-Car Pack',
  'A variety pack of 20 die-cast Hot Wheels cars featuring different designs and colors. Great for collectors!',
  19.99,
  24.99,
  'USD',
  'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400',
  'https://amazon.com/hot-wheels-20-car-pack',
  'amazon',
  'toys',
  6,
  12,
  4.3,
  true
),

-- Games and puzzles (8-14)
(
  'Monopoly Junior Board Game',
  'The classic property-trading game designed for younger players with simpler rules and faster gameplay.',
  14.99,
  19.99,
  'USD',
  'https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=400',
  'https://walmart.com/monopoly-junior-board-game',
  'walmart',
  'games',
  8,
  14,
  4.4,
  true
),
(
  '1000-Piece Jigsaw Puzzle - Nature Scene',
  'Beautiful nature scene puzzle with 1000 pieces. Great for developing problem-solving skills and patience.',
  12.99,
  15.99,
  'USD',
  'https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=400',
  'https://amazon.com/1000-piece-nature-puzzle',
  'amazon',
  'games',
  10,
  16,
  4.2,
  true
),

-- Books (6-16)
(
  'Dog Man: Mothering Heights',
  'The latest adventure in the popular Dog Man series by Dav Pilkey. Perfect for young readers who love humor and adventure.',
  9.99,
  12.99,
  'USD',
  'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400',
  'https://amazon.com/dog-man-mothering-heights',
  'amazon',
  'books',
  6,
  12,
  4.7,
  true
),
(
  'Diary of a Wimpy Kid: Big Shot',
  'Greg Heffley and sports just don''t mix. Another hilarious adventure in the beloved series.',
  8.99,
  10.99,
  'USD',
  'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400',
  'https://walmart.com/diary-wimpy-kid-big-shot',
  'walmart',
  'books',
  8,
  14,
  4.6,
  true
),

-- Electronics for older kids (12-16)
(
  'Bluetooth Wireless Headphones - Kids',
  'Safe volume-limited wireless headphones designed specifically for children with comfortable padding.',
  39.99,
  49.99,
  'USD',
  'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
  'https://amazon.com/bluetooth-kids-headphones',
  'amazon',
  'electronics',
  10,
  16,
  4.1,
  true
),
(
  'Digital Camera for Kids',
  'Easy-to-use digital camera with fun filters and frames. Perfect for budding photographers.',
  79.99,
  99.99,
  'USD',
  'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400',
  'https://walmart.com/digital-camera-kids',
  'walmart',
  'electronics',
  8,
  16,
  4.0,
  true
),

-- Sports equipment (8-16)
(
  'Youth Basketball - Official Size 5',
  'Official size 5 basketball perfect for youth players. Great for developing basketball skills.',
  24.99,
  29.99,
  'USD',
  'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400',
  'https://amazon.com/youth-basketball-size-5',
  'amazon',
  'sports',
  8,
  16,
  4.3,
  true
),
(
  'Skateboard Complete Set - Beginner',
  'Complete skateboard set perfect for beginners with safety gear included.',
  89.99,
  109.99,
  'USD',
  'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=400',
  'https://walmart.com/skateboard-complete-beginner',
  'walmart',
  'sports',
  10,
  16,
  4.2,
  true
),

-- Arts and crafts (6-14)
(
  'Deluxe Art Set with Easel',
  'Complete art set with easel, paints, brushes, colored pencils, and more. Everything needed to create masterpieces!',
  49.99,
  69.99,
  'USD',
  'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400',
  'https://amazon.com/deluxe-art-set-easel',
  'amazon',
  'arts-crafts',
  6,
  14,
  4.5,
  true
),

-- Educational toys (6-12)
(
  'Science Experiment Kit',
  'Safe and fun science experiments for kids to learn about chemistry, physics, and biology.',
  34.99,
  44.99,
  'USD',
  'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400',
  'https://walmart.com/science-experiment-kit',
  'walmart',
  'educational',
  8,
  14,
  4.4,
  true
),

-- Outdoor toys (6-16)
(
  'Frisbee Flying Disc Set',
  'Set of colorful flying discs perfect for outdoor fun and exercise. Great for the whole family!',
  12.99,
  16.99,
  'USD',
  'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400',
  'https://amazon.com/frisbee-flying-disc-set',
  'amazon',
  'outdoor',
  6,
  16,
  4.1,
  true
),

-- Music instruments (8-16)
(
  'Beginner Acoustic Guitar',
  'Perfect starter guitar for young musicians with comfortable size and easy-to-play strings.',
  89.99,
  119.99,
  'USD',
  'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400',
  'https://walmart.com/beginner-acoustic-guitar',
  'walmart',
  'music',
  10,
  16,
  4.3,
  true
);

-- Create some sample categories for easy filtering
INSERT INTO public.products (
  title,
  description,
  price,
  currency,
  image_url,
  product_url,
  retailer,
  category,
  age_range_min,
  age_range_max,
  rating,
  availability
) VALUES
(
  'Building Blocks Mega Set',
  'Large set of colorful building blocks for endless creative possibilities.',
  45.99,
  'USD',
  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
  'https://amazon.com/building-blocks-mega-set',
  'amazon',
  'toys',
  6,
  12,
  4.6,
  true
),
(
  'Watercolor Paint Set',
  'Professional-quality watercolor paints perfect for young artists.',
  19.99,
  'USD',
  'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400',
  'https://walmart.com/watercolor-paint-set',
  'walmart',
  'arts-crafts',
  8,
  16,
  4.4,
  true
);
