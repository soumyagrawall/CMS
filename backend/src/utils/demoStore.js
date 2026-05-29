const now = () => new Date().toISOString();

// ─── 25+ diverse creators ───────────────────────────────────────────
const creators = [
  { id: 1, fullName: "Arjun Mehta", username: "arjun_shoots", bio: "Street photographer from Mumbai", avatarUrl: null },
  { id: 2, fullName: "Priya Sharma", username: "priya_captures", bio: "Travel & culture photographer", avatarUrl: null },
  { id: 3, fullName: "Rahul Verma", username: "rahul.frames", bio: "Cricket & sports enthusiast", avatarUrl: null },
  { id: 4, fullName: "Sneha Iyer", username: "sneha_lens", bio: "Food and lifestyle blogger", avatarUrl: null },
  { id: 5, fullName: "Vikram Singh", username: "vikram_wild", bio: "Wildlife photographer from Ranthambore", avatarUrl: null },
  { id: 6, fullName: "Ananya Das", username: "ananya.art", bio: "Digital art & illustration", avatarUrl: null },
  { id: 7, fullName: "Karthik Nair", username: "karthik_dev", bio: "Developer & tech blogger", avatarUrl: null },
  { id: 8, fullName: "Meera Patel", username: "meera_travels", bio: "Wanderlust nomad exploring India", avatarUrl: null },
  { id: 9, fullName: "Rohit Kapoor", username: "rohit_cinema", bio: "Bollywood & cinema lover", avatarUrl: null },
  { id: 10, fullName: "Deepika Reddy", username: "deepika_foodie", bio: "Indian cuisine explorer", avatarUrl: null },
  { id: 11, fullName: "Amit Choudhary", username: "amit_heritage", bio: "Heritage & architecture photographer", avatarUrl: null },
  { id: 12, fullName: "Kavya Menon", username: "kavya_pets", bio: "Pet lover & animal rescue volunteer", avatarUrl: null },
  { id: 13, fullName: "Suresh Kumar", username: "suresh_nature", bio: "Landscape & nature photographer", avatarUrl: null },
  { id: 14, fullName: "Nisha Agarwal", username: "nisha_fashion", bio: "Fashion & textile enthusiast", avatarUrl: null },
  { id: 15, fullName: "Rajesh Gupta", username: "rajesh_spiritual", bio: "Spiritual India photographer", avatarUrl: null },
  { id: 16, fullName: "Pooja Banerjee", username: "pooja_dance", bio: "Classical dance & performing arts", avatarUrl: null },
  { id: 17, fullName: "Sanjay Joshi", username: "sanjay_motors", bio: "Cars & motorsport enthusiast", avatarUrl: null },
  { id: 18, fullName: "Riya Saxena", username: "riya_minimal", bio: "Minimalist photography", avatarUrl: null },
  { id: 19, fullName: "Alex Thompson", username: "alex_marvel", bio: "Marvel & superhero fan", avatarUrl: null },
  { id: 20, fullName: "Sarah Chen", username: "sarah_dc", bio: "DC Comics & pop culture", avatarUrl: null },
  { id: 21, fullName: "James Wilson", username: "james_code", bio: "Full-stack developer & open source", avatarUrl: null },
  { id: 22, fullName: "Maria Garcia", username: "maria_cats", bio: "Cat mom & animal photography", avatarUrl: null },
  { id: 23, fullName: "David Park", username: "david_astro", bio: "Astrophotography & space", avatarUrl: null },
  { id: 24, fullName: "Aisha Khan", username: "aisha_stories", bio: "Documentary & photojournalism", avatarUrl: null },
  { id: 25, fullName: "Tanvi Desai", username: "tanvi_street", bio: "Street art & urban photography", avatarUrl: null },
  { id: 26, fullName: "Harsh Vardhan", username: "harsh_fitness", bio: "Fitness & wellness coach", avatarUrl: null },
  { id: 27, fullName: "Lisa Anderson", username: "lisa_nature", bio: "Nature & landscape worldwide", avatarUrl: null },
  { id: 28, fullName: "Nikhil Rao", username: "nikhil_astro", bio: "Indian astrophotography", avatarUrl: null },
];

const demoUser = creators[0];

let nextImageId = 300;
let nextCommentId = 3;

// Helper to pick a creator
const c = (id) => {
  const cr = creators.find(x => x.id === id) || creators[0];
  return { userId: cr.id, username: cr.username, authorName: cr.fullName, authorAvatarUrl: cr.avatarUrl };
};

const images = [
  // ═══════════════════════════════════════════════════════════════════
  // INDIAN CRICKET (tags: cricket, india, sports)
  // ═══════════════════════════════════════════════════════════════════
  { id: 1, ...c(3), title: "Virat Kohli Cover Drive", caption: "The king plays a stunning cover drive at Wankhede.", imageUrl: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800&auto=format&fit=crop", sourceType: "upload", viewCount: 890, likeCount: 312, commentCount: 45, saveCount: 89, createdAt: now(), tags: ["cricket", "india", "sports", "virat"] },
  { id: 2, ...c(3), title: "Cricket Stadium Lights", caption: "The electric atmosphere of an IPL night match.", imageUrl: "https://picsum.photos/800/1000?random=1568", sourceType: "upload", viewCount: 654, likeCount: 201, commentCount: 22, saveCount: 55, createdAt: now(), tags: ["cricket", "stadium", "ipl", "sports"] },
  { id: 3, ...c(3), title: "Gully Cricket", caption: "Kids playing cricket in the narrow lanes of Old Delhi.", imageUrl: "https://picsum.photos/800/1000?random=1616", sourceType: "upload", viewCount: 432, likeCount: 156, commentCount: 18, saveCount: 42, createdAt: now(), tags: ["cricket", "india", "street", "kids"] },
  { id: 4, ...c(3), title: "Cricket Bat & Ball", caption: "The tools of the gentleman's game.", imageUrl: "https://picsum.photos/800/1000?random=1664", sourceType: "upload", viewCount: 321, likeCount: 98, commentCount: 8, saveCount: 34, createdAt: now(), tags: ["cricket", "sports", "closeup", "equipment"] },
  { id: 5, ...c(3), title: "Indian Cricket Fans", caption: "Passionate fans painted in tricolor cheering at the stadium.", imageUrl: "https://picsum.photos/800/1000?random=1712", sourceType: "upload", viewCount: 567, likeCount: 234, commentCount: 31, saveCount: 67, createdAt: now(), tags: ["cricket", "india", "fans", "celebration"] },

  // ═══════════════════════════════════════════════════════════════════
  // BOLLYWOOD & INDIAN CINEMA (tags: bollywood, cinema, india)
  // ═══════════════════════════════════════════════════════════════════
  { id: 6, ...c(9), title: "Bollywood Dance Scene", caption: "Vibrant colors and energy of a Bollywood dance number.", imageUrl: "https://picsum.photos/800/1000?random=1884", sourceType: "upload", viewCount: 765, likeCount: 287, commentCount: 39, saveCount: 78, createdAt: now(), tags: ["bollywood", "dance", "cinema", "india"] },
  { id: 7, ...c(9), title: "Film City Mumbai", caption: "Behind the scenes at Goregaon Film City.", imageUrl: "https://picsum.photos/800/1000?random=1932", sourceType: "upload", viewCount: 543, likeCount: 187, commentCount: 25, saveCount: 56, createdAt: now(), tags: ["bollywood", "mumbai", "cinema", "filmmaking"] },
  { id: 8, ...c(9), title: "Movie Poster Wall", caption: "Vintage hand-painted Bollywood movie posters on a Mumbai street.", imageUrl: "https://picsum.photos/800/1000?random=1980", sourceType: "upload", viewCount: 432, likeCount: 154, commentCount: 19, saveCount: 47, createdAt: now(), tags: ["bollywood", "art", "vintage", "poster"] },
  { id: 9, ...c(9), title: "Cinema Hall Nostalgia", caption: "The charm of old single-screen theaters in India.", imageUrl: "https://picsum.photos/800/1000?random=2028", sourceType: "upload", viewCount: 387, likeCount: 134, commentCount: 14, saveCount: 39, createdAt: now(), tags: ["cinema", "nostalgia", "india", "theater"] },

  // ═══════════════════════════════════════════════════════════════════
  // INDIAN TRAVEL & MONUMENTS (tags: travel, india, monument, architecture)
  // ═══════════════════════════════════════════════════════════════════
  { id: 10, ...c(2), title: "Taj Mahal at Sunrise", caption: "The icon of eternal love bathed in golden morning light.", imageUrl: "https://picsum.photos/800/1000?random=2200", sourceType: "upload", viewCount: 1200, likeCount: 456, commentCount: 67, saveCount: 123, createdAt: now(), tags: ["tajmahal", "india", "travel", "monument", "agra"] },
  { id: 11, ...c(8), title: "Jaipur Pink City", caption: "The stunning rose-colored architecture of Hawa Mahal.", imageUrl: "https://picsum.photos/800/1000?random=2248", sourceType: "upload", viewCount: 876, likeCount: 312, commentCount: 42, saveCount: 89, createdAt: now(), tags: ["jaipur", "rajasthan", "india", "architecture", "travel"] },
  { id: 12, ...c(8), title: "Kerala Backwaters", caption: "A houseboat gliding through the serene backwaters.", imageUrl: "https://picsum.photos/800/1000?random=2296", sourceType: "upload", viewCount: 765, likeCount: 278, commentCount: 35, saveCount: 76, createdAt: now(), tags: ["kerala", "backwaters", "india", "travel", "nature"] },
  { id: 13, ...c(2), title: "Varanasi Evening Aarti", caption: "The mesmerizing Ganga Aarti at Dashashwamedh Ghat.", imageUrl: "https://picsum.photos/800/1000?random=2344", sourceType: "upload", viewCount: 987, likeCount: 389, commentCount: 54, saveCount: 102, createdAt: now(), tags: ["varanasi", "spiritual", "india", "ganges", "ritual"] },
  { id: 14, ...c(11), title: "Golden Temple Amritsar", caption: "The divine Harmandir Sahib reflecting in the sacred pool.", imageUrl: "https://picsum.photos/800/1000?random=2392", sourceType: "upload", viewCount: 1100, likeCount: 445, commentCount: 61, saveCount: 115, createdAt: now(), tags: ["goldentemple", "amritsar", "india", "spiritual", "sikh"] },
  { id: 15, ...c(8), title: "Ladakh Pangong Lake", caption: "The stunning blue waters of Pangong Tso at 14,000 feet.", imageUrl: "https://picsum.photos/800/1000?random=2440", sourceType: "upload", viewCount: 890, likeCount: 334, commentCount: 47, saveCount: 92, createdAt: now(), tags: ["ladakh", "lake", "india", "mountains", "travel"] },
  { id: 16, ...c(11), title: "Qutub Minar Delhi", caption: "The soaring 73-meter victory tower of Delhi.", imageUrl: "https://picsum.photos/800/1000?random=2488", sourceType: "upload", viewCount: 654, likeCount: 234, commentCount: 28, saveCount: 63, createdAt: now(), tags: ["delhi", "monument", "india", "history", "architecture"] },
  { id: 17, ...c(2), title: "Mysore Palace Illuminated", caption: "97,000 bulbs light up Mysore Palace on Sunday evenings.", imageUrl: "https://picsum.photos/800/1000?random=2536", sourceType: "upload", viewCount: 765, likeCount: 287, commentCount: 36, saveCount: 78, createdAt: now(), tags: ["mysore", "palace", "india", "night", "architecture"] },
  { id: 18, ...c(8), title: "Hampi Boulders", caption: "Surreal boulder landscape of the ancient Vijayanagara empire.", imageUrl: "https://picsum.photos/800/1000?random=2584", sourceType: "upload", viewCount: 543, likeCount: 198, commentCount: 24, saveCount: 54, createdAt: now(), tags: ["hampi", "ruins", "india", "history", "travel"] },
  { id: 19, ...c(11), title: "Konark Sun Temple", caption: "The magnificent 13th-century temple shaped as a chariot.", imageUrl: "https://picsum.photos/800/1000?random=2632", sourceType: "upload", viewCount: 432, likeCount: 167, commentCount: 19, saveCount: 45, createdAt: now(), tags: ["konark", "temple", "india", "architecture", "heritage"] },
  { id: 20, ...c(2), title: "Gateway of India", caption: "Mumbai's iconic arch overlooking the Arabian Sea.", imageUrl: "https://picsum.photos/800/1000?random=2680", sourceType: "upload", viewCount: 876, likeCount: 312, commentCount: 41, saveCount: 84, createdAt: now(), tags: ["mumbai", "monument", "india", "sea", "travel"] },
  { id: 21, ...c(8), title: "Rishikesh River Rafting", caption: "Adventure seekers tackling the rapids of the Ganges.", imageUrl: "https://picsum.photos/800/1000?random=2728", sourceType: "upload", viewCount: 654, likeCount: 245, commentCount: 32, saveCount: 67, createdAt: now(), tags: ["rishikesh", "adventure", "india", "rafting", "river"] },
  { id: 22, ...c(11), title: "Charminar Hyderabad", caption: "The magnificent four-towered monument of the Deccan.", imageUrl: "https://picsum.photos/800/1000?random=2776", sourceType: "upload", viewCount: 543, likeCount: 198, commentCount: 25, saveCount: 56, createdAt: now(), tags: ["hyderabad", "charminar", "india", "monument", "history"] },
  { id: 23, ...c(8), title: "Udaipur Lake Palace", caption: "The floating white marble palace on Lake Pichola.", imageUrl: "https://picsum.photos/800/1000?random=2824", sourceType: "upload", viewCount: 765, likeCount: 287, commentCount: 38, saveCount: 72, createdAt: now(), tags: ["udaipur", "palace", "india", "lake", "rajasthan"] },

  // ═══════════════════════════════════════════════════════════════════
  // INDIAN FOOD (tags: food, india, streetfood, cuisine)
  // ═══════════════════════════════════════════════════════════════════
  { id: 24, ...c(4), title: "Indian Thali Feast", caption: "A grand vegetarian thali with 20+ dishes.", imageUrl: "https://picsum.photos/800/1000?random=2996", sourceType: "upload", viewCount: 876, likeCount: 345, commentCount: 48, saveCount: 98, createdAt: now(), tags: ["food", "thali", "india", "cuisine", "vegetarian"] },
  { id: 25, ...c(10), title: "Mumbai Vada Pav", caption: "The king of Mumbai street food.", imageUrl: "https://picsum.photos/800/1000?random=3044", sourceType: "upload", viewCount: 654, likeCount: 267, commentCount: 35, saveCount: 72, createdAt: now(), tags: ["food", "streetfood", "mumbai", "india", "snack"] },
  { id: 26, ...c(4), title: "Spice Market Colors", caption: "Vibrant heaps of turmeric, chili, and cumin at Khari Baoli.", imageUrl: "https://picsum.photos/800/1000?random=3092", sourceType: "upload", viewCount: 765, likeCount: 289, commentCount: 37, saveCount: 82, createdAt: now(), tags: ["spices", "food", "india", "market", "colors"] },
  { id: 27, ...c(10), title: "Hyderabadi Biryani", caption: "Layers of fragrant dum biryani cooked to perfection.", imageUrl: "https://picsum.photos/800/1000?random=3140", sourceType: "upload", viewCount: 987, likeCount: 398, commentCount: 56, saveCount: 112, createdAt: now(), tags: ["biryani", "food", "india", "hyderabad", "rice"] },
  { id: 28, ...c(4), title: "Chai on the Tracks", caption: "Cutting chai served in clay cups at a railway station.", imageUrl: "https://picsum.photos/800/1000?random=3188", sourceType: "upload", viewCount: 543, likeCount: 212, commentCount: 27, saveCount: 58, createdAt: now(), tags: ["chai", "food", "india", "train", "street"] },
  { id: 29, ...c(10), title: "South Indian Dosa", caption: "A crispy golden dosa with sambar and chutney.", imageUrl: "https://picsum.photos/800/1000?random=3236", sourceType: "upload", viewCount: 654, likeCount: 245, commentCount: 31, saveCount: 67, createdAt: now(), tags: ["dosa", "food", "india", "southindian", "breakfast"] },
  { id: 30, ...c(4), title: "Samosa Plate", caption: "Hot, crispy samosas with green chutney.", imageUrl: "https://picsum.photos/800/1000?random=3284", sourceType: "upload", viewCount: 765, likeCount: 298, commentCount: 39, saveCount: 79, createdAt: now(), tags: ["samosa", "food", "india", "snack", "streetfood"] },
  { id: 31, ...c(10), title: "Jalebi Swirl", caption: "Freshly fried jalebis dripping in saffron sugar syrup.", imageUrl: "https://picsum.photos/800/1000?random=3332", sourceType: "upload", viewCount: 543, likeCount: 213, commentCount: 28, saveCount: 58, createdAt: now(), tags: ["jalebi", "sweets", "food", "india", "dessert"] },
  { id: 32, ...c(4), title: "Pani Puri Cart", caption: "The most loved chaat being assembled by an expert hand.", imageUrl: "https://picsum.photos/800/1000?random=3380", sourceType: "upload", viewCount: 654, likeCount: 256, commentCount: 34, saveCount: 69, createdAt: now(), tags: ["panipuri", "streetfood", "food", "india", "chaat"] },

  // ═══════════════════════════════════════════════════════════════════
  // INDIAN FESTIVALS (tags: diwali, holi, festival, india)
  // ═══════════════════════════════════════════════════════════════════
  { id: 33, ...c(2), title: "Diwali Diyas", caption: "Rows of earthen lamps illuminating the night.", imageUrl: "https://picsum.photos/800/1000?random=3552", sourceType: "upload", viewCount: 1100, likeCount: 445, commentCount: 63, saveCount: 118, createdAt: now(), tags: ["diwali", "festival", "india", "light", "celebration"] },
  { id: 34, ...c(2), title: "Holi Colors Explosion", caption: "Faces covered in vibrant gulaal during the festival of colors.", imageUrl: "https://picsum.photos/800/1000?random=3600", sourceType: "upload", viewCount: 987, likeCount: 398, commentCount: 54, saveCount: 104, createdAt: now(), tags: ["holi", "festival", "india", "colors", "celebration"] },
  { id: 35, ...c(15), title: "Durga Puja Pandal", caption: "An elaborately decorated pandal during Durga Puja in Kolkata.", imageUrl: "https://picsum.photos/800/1000?random=3648", sourceType: "upload", viewCount: 765, likeCount: 287, commentCount: 38, saveCount: 78, createdAt: now(), tags: ["durgapuja", "festival", "kolkata", "india", "culture"] },
  { id: 36, ...c(15), title: "Ganesh Chaturthi", caption: "An enormous Ganesh idol during the immersion procession.", imageUrl: "https://picsum.photos/800/1000?random=3696", sourceType: "upload", viewCount: 876, likeCount: 334, commentCount: 46, saveCount: 89, createdAt: now(), tags: ["ganesh", "festival", "mumbai", "india", "spiritual"] },
  { id: 37, ...c(2), title: "Navratri Garba Night", caption: "Whirling dancers in colorful chaniya cholis.", imageUrl: "https://picsum.photos/800/1000?random=3744", sourceType: "upload", viewCount: 654, likeCount: 256, commentCount: 33, saveCount: 69, createdAt: now(), tags: ["navratri", "garba", "festival", "india", "dance"] },
  { id: 38, ...c(15), title: "Onam Pookalam", caption: "Intricate flower rangoli design for the harvest festival.", imageUrl: "https://picsum.photos/800/1000?random=3792", sourceType: "upload", viewCount: 543, likeCount: 198, commentCount: 25, saveCount: 54, createdAt: now(), tags: ["onam", "festival", "kerala", "india", "flowers"] },
  { id: 39, ...c(2), title: "Makar Sankranti Kites", caption: "A sky full of colorful kites over Ahmedabad.", imageUrl: "https://picsum.photos/800/1000?random=3840", sourceType: "upload", viewCount: 432, likeCount: 167, commentCount: 21, saveCount: 45, createdAt: now(), tags: ["kite", "festival", "india", "sankranti", "sky"] },
  { id: 40, ...c(24), title: "Pushkar Mela Camels", caption: "Decorated camels at the Pushkar Camel Fair in Rajasthan.", imageUrl: "https://picsum.photos/800/1000?random=3888", sourceType: "upload", viewCount: 654, likeCount: 245, commentCount: 31, saveCount: 67, createdAt: now(), tags: ["pushkar", "rajasthan", "camels", "festival", "india"] },

  // ═══════════════════════════════════════════════════════════════════
  // INDIAN WILDLIFE (tags: wildlife, india, tiger, nature)
  // ═══════════════════════════════════════════════════════════════════
  { id: 41, ...c(5), title: "Bengal Tiger Resting", caption: "A majestic Royal Bengal Tiger in Ranthambore.", imageUrl: "https://picsum.photos/800/1000?random=4060", sourceType: "upload", viewCount: 1200, likeCount: 478, commentCount: 67, saveCount: 134, createdAt: now(), tags: ["tiger", "wildlife", "india", "ranthambore", "nature"] },
  { id: 42, ...c(5), title: "Indian Peacock Display", caption: "The national bird of India in full glory.", imageUrl: "https://picsum.photos/800/1000?random=4108", sourceType: "upload", viewCount: 876, likeCount: 345, commentCount: 46, saveCount: 92, createdAt: now(), tags: ["peacock", "bird", "wildlife", "india", "nature"] },
  { id: 43, ...c(5), title: "Indian Elephant Festival", caption: "A beautifully decorated temple elephant in Kerala.", imageUrl: "https://picsum.photos/800/1000?random=4156", sourceType: "upload", viewCount: 765, likeCount: 289, commentCount: 38, saveCount: 78, createdAt: now(), tags: ["elephant", "wildlife", "india", "kerala", "culture"] },
  { id: 44, ...c(5), title: "Asiatic Lion", caption: "The rare Asiatic Lion in the Gir Forest of Gujarat.", imageUrl: "https://picsum.photos/800/1000?random=4204", sourceType: "upload", viewCount: 654, likeCount: 256, commentCount: 33, saveCount: 69, createdAt: now(), tags: ["lion", "wildlife", "india", "gujarat", "gir"] },
  { id: 45, ...c(5), title: "Kingfisher Bird", caption: "A vibrant kingfisher perched over a still pond.", imageUrl: "https://picsum.photos/800/1000?random=4252", sourceType: "upload", viewCount: 543, likeCount: 212, commentCount: 27, saveCount: 58, createdAt: now(), tags: ["kingfisher", "bird", "wildlife", "india", "nature"] },
  { id: 46, ...c(5), title: "Himalayan Snow Leopard", caption: "The ghost of the mountains in Spiti Valley.", imageUrl: "https://picsum.photos/800/1000?random=4300", sourceType: "upload", viewCount: 987, likeCount: 398, commentCount: 54, saveCount: 112, createdAt: now(), tags: ["snowleopard", "wildlife", "himalayas", "india", "rare"] },

  // ═══════════════════════════════════════════════════════════════════
  // INDIAN CULTURE & DANCE (tags: dance, culture, tradition, india)
  // ═══════════════════════════════════════════════════════════════════
  { id: 47, ...c(16), title: "Kathakali Performance", caption: "The elaborate makeup and costume of Kerala's classical dance.", imageUrl: "https://picsum.photos/800/1000?random=4472", sourceType: "upload", viewCount: 765, likeCount: 289, commentCount: 38, saveCount: 78, createdAt: now(), tags: ["kathakali", "dance", "kerala", "india", "culture"] },
  { id: 48, ...c(16), title: "Bharatanatyam Pose", caption: "A dancer frozen in a powerful Bharatanatyam stance.", imageUrl: "https://picsum.photos/800/1000?random=4520", sourceType: "upload", viewCount: 654, likeCount: 245, commentCount: 31, saveCount: 67, createdAt: now(), tags: ["bharatanatyam", "dance", "classical", "india", "art"] },
  { id: 49, ...c(14), title: "Rajasthani Puppets", caption: "Colorful string puppets from the desert state.", imageUrl: "https://picsum.photos/800/1000?random=4568", sourceType: "upload", viewCount: 432, likeCount: 167, commentCount: 21, saveCount: 45, createdAt: now(), tags: ["rajasthan", "puppet", "art", "india", "culture"] },
  { id: 50, ...c(14), title: "Indian Wedding Ceremony", caption: "The vibrant rituals of a traditional Hindu wedding.", imageUrl: "https://picsum.photos/800/1000?random=4616", sourceType: "upload", viewCount: 876, likeCount: 334, commentCount: 47, saveCount: 92, createdAt: now(), tags: ["wedding", "india", "tradition", "culture", "celebration"] },
  { id: 51, ...c(14), title: "Mehndi Art", caption: "Intricate henna designs on a bride's hands.", imageUrl: "https://picsum.photos/800/1000?random=4664", sourceType: "upload", viewCount: 654, likeCount: 256, commentCount: 33, saveCount: 69, createdAt: now(), tags: ["mehndi", "henna", "india", "art", "wedding"] },
  { id: 52, ...c(14), title: "Bangle Market", caption: "Glittering stacks of colorful bangles in a bustling bazaar.", imageUrl: "https://picsum.photos/800/1000?random=4712", sourceType: "upload", viewCount: 543, likeCount: 198, commentCount: 25, saveCount: 54, createdAt: now(), tags: ["bangles", "market", "india", "colorful", "shopping"] },
  { id: 53, ...c(14), title: "Indian Silk Sarees", caption: "Gorgeous Kanchipuram silk sarees draped on display.", imageUrl: "https://picsum.photos/800/1000?random=4760", sourceType: "upload", viewCount: 654, likeCount: 245, commentCount: 31, saveCount: 67, createdAt: now(), tags: ["saree", "fashion", "india", "silk", "tradition"] },

  // ═══════════════════════════════════════════════════════════════════
  // INDIAN NATURE & LANDSCAPES (tags: mountains, beach, nature, india)
  // ═══════════════════════════════════════════════════════════════════
  { id: 54, ...c(13), title: "Himalayan Sunrise", caption: "Dawn breaking over the snow-capped peaks of the Himalayas.", imageUrl: "https://picsum.photos/800/1000?random=4932", sourceType: "upload", viewCount: 987, likeCount: 389, commentCount: 54, saveCount: 104, createdAt: now(), tags: ["himalayas", "mountains", "india", "sunrise", "nature"] },
  { id: 55, ...c(13), title: "Goa Beach Sunset", caption: "Golden hour on the beaches of Goa.", imageUrl: "https://picsum.photos/800/1000?random=4980", sourceType: "upload", viewCount: 876, likeCount: 334, commentCount: 47, saveCount: 89, createdAt: now(), tags: ["goa", "beach", "sunset", "india", "travel"] },
  { id: 56, ...c(13), title: "Spiti Valley Road", caption: "The winding mountain road through Spiti's lunar landscape.", imageUrl: "https://picsum.photos/800/1000?random=28", sourceType: "upload", viewCount: 765, likeCount: 287, commentCount: 38, saveCount: 78, createdAt: now(), tags: ["spiti", "mountains", "india", "road", "adventure"] },
  { id: 57, ...c(13), title: "Munnar Tea Gardens", caption: "Rolling green tea plantations in the hills of Kerala.", imageUrl: "https://picsum.photos/800/1000?random=76", sourceType: "upload", viewCount: 654, likeCount: 245, commentCount: 31, saveCount: 67, createdAt: now(), tags: ["munnar", "tea", "kerala", "india", "green"] },
  { id: 58, ...c(13), title: "Andaman Clear Waters", caption: "Crystal-clear turquoise waters of Havelock Island.", imageUrl: "https://picsum.photos/800/1000?random=124", sourceType: "upload", viewCount: 876, likeCount: 334, commentCount: 47, saveCount: 89, createdAt: now(), tags: ["andaman", "beach", "island", "india", "ocean"] },
  { id: 59, ...c(13), title: "Darjeeling Hills", caption: "Misty morning view of the tea gardens and Kanchenjunga.", imageUrl: "https://picsum.photos/800/1000?random=172", sourceType: "upload", viewCount: 654, likeCount: 245, commentCount: 31, saveCount: 67, createdAt: now(), tags: ["darjeeling", "hills", "tea", "india", "mountains"] },
  { id: 60, ...c(13), title: "Rann of Kutch", caption: "The vast white salt desert of Gujarat under moonlight.", imageUrl: "https://picsum.photos/800/1000?random=220", sourceType: "upload", viewCount: 765, likeCount: 287, commentCount: 38, saveCount: 78, createdAt: now(), tags: ["kutch", "desert", "india", "gujarat", "nature"] },
  { id: 61, ...c(13), title: "Dal Lake Kashmir", caption: "Shikaras floating on the mirror-like Dal Lake.", imageUrl: "https://picsum.photos/800/1000?random=268", sourceType: "upload", viewCount: 876, likeCount: 334, commentCount: 47, saveCount: 89, createdAt: now(), tags: ["kashmir", "lake", "india", "shikara", "nature"] },
  { id: 62, ...c(28), title: "Milky Way over Ladakh", caption: "Astrophotography capturing the galaxy over Hanle.", imageUrl: "https://picsum.photos/800/1000?random=316", sourceType: "upload", viewCount: 987, likeCount: 398, commentCount: 54, saveCount: 112, createdAt: now(), tags: ["astrophotography", "ladakh", "india", "milkyway", "night"] },
  { id: 63, ...c(13), title: "Coorg Coffee Plantation", caption: "Lush coffee estates in the Scotland of India.", imageUrl: "https://picsum.photos/800/1000?random=364", sourceType: "upload", viewCount: 543, likeCount: 198, commentCount: 25, saveCount: 54, createdAt: now(), tags: ["coorg", "coffee", "india", "plantation", "green"] },

  // ═══════════════════════════════════════════════════════════════════
  // INDIAN STREET LIFE & CITY (tags: street, city, india, urban)
  // ═══════════════════════════════════════════════════════════════════
  { id: 64, ...c(1), title: "Mumbai Local Train", caption: "The lifeline of Mumbai during rush hour.", imageUrl: "https://picsum.photos/800/1000?random=536", sourceType: "upload", viewCount: 876, likeCount: 334, commentCount: 47, saveCount: 89, createdAt: now(), tags: ["mumbai", "train", "india", "city", "commute"] },
  { id: 65, ...c(25), title: "Jodhpur Blue City", caption: "The mesmerizing blue-painted houses of Jodhpur.", imageUrl: "https://picsum.photos/800/1000?random=584", sourceType: "upload", viewCount: 765, likeCount: 287, commentCount: 38, saveCount: 78, createdAt: now(), tags: ["jodhpur", "blue", "city", "india", "rajasthan"] },
  { id: 66, ...c(1), title: "Auto Rickshaw Mumbai", caption: "The ubiquitous three-wheeler weaving through traffic.", imageUrl: "https://picsum.photos/800/1000?random=632", sourceType: "upload", viewCount: 543, likeCount: 198, commentCount: 25, saveCount: 54, createdAt: now(), tags: ["autorickshaw", "india", "street", "mumbai", "transport"] },
  { id: 67, ...c(25), title: "Old Delhi Chandni Chowk", caption: "The bustling narrow lanes of Shahjahanabad.", imageUrl: "https://picsum.photos/800/1000?random=680", sourceType: "upload", viewCount: 654, likeCount: 245, commentCount: 31, saveCount: 67, createdAt: now(), tags: ["delhi", "street", "india", "market", "old"] },
  { id: 68, ...c(1), title: "Pondicherry French Quarter", caption: "Charming yellow colonial buildings on the coast.", imageUrl: "https://picsum.photos/800/1000?random=728", sourceType: "upload", viewCount: 543, likeCount: 198, commentCount: 25, saveCount: 54, createdAt: now(), tags: ["pondicherry", "french", "india", "architecture", "coast"] },
  { id: 69, ...c(25), title: "Kolkata Yellow Tram", caption: "The last surviving tram network in India.", imageUrl: "https://picsum.photos/800/1000?random=776", sourceType: "upload", viewCount: 432, likeCount: 167, commentCount: 21, saveCount: 45, createdAt: now(), tags: ["kolkata", "tram", "india", "vintage", "city"] },
  { id: 70, ...c(25), title: "Street Art Mumbai", caption: "Colorful graffiti on the walls of Bandra.", imageUrl: "https://picsum.photos/800/1000?random=824", sourceType: "upload", viewCount: 543, likeCount: 212, commentCount: 28, saveCount: 58, createdAt: now(), tags: ["streetart", "graffiti", "mumbai", "india", "art"] },

  // ═══════════════════════════════════════════════════════════════════
  // INDIAN SPIRITUAL & YOGA (tags: yoga, spiritual, meditation, temple)
  // ═══════════════════════════════════════════════════════════════════
  { id: 71, ...c(15), title: "Yoga at Sunrise", caption: "A practitioner in tree pose on the banks of the Ganges.", imageUrl: "https://picsum.photos/800/1000?random=996", sourceType: "upload", viewCount: 876, likeCount: 345, commentCount: 47, saveCount: 92, createdAt: now(), tags: ["yoga", "spiritual", "india", "rishikesh", "wellness"] },
  { id: 72, ...c(15), title: "Temple Bell", caption: "A brass bell in a centuries-old Hindu temple.", imageUrl: "https://picsum.photos/800/1000?random=1044", sourceType: "upload", viewCount: 654, likeCount: 245, commentCount: 31, saveCount: 67, createdAt: now(), tags: ["temple", "spiritual", "india", "bell", "tradition"] },
  { id: 73, ...c(15), title: "Auroville Matrimandir", caption: "The golden sphere of meditation in Tamil Nadu.", imageUrl: "https://picsum.photos/800/1000?random=1092", sourceType: "upload", viewCount: 543, likeCount: 198, commentCount: 25, saveCount: 54, createdAt: now(), tags: ["auroville", "spiritual", "india", "meditation", "peace"] },
  { id: 74, ...c(15), title: "Varanasi Morning Prayers", caption: "Sadhus performing morning rituals at the ghats.", imageUrl: "https://picsum.photos/800/1000?random=1140", sourceType: "upload", viewCount: 876, likeCount: 334, commentCount: 47, saveCount: 89, createdAt: now(), tags: ["varanasi", "spiritual", "india", "prayer", "morning"] },

  // ═══════════════════════════════════════════════════════════════════
  // INDIAN ART & CRAFT (tags: art, craft, handmade, india)
  // ═══════════════════════════════════════════════════════════════════
  { id: 75, ...c(6), title: "Indian Potter at Work", caption: "Skilled hands shaping clay on a traditional wheel.", imageUrl: "https://picsum.photos/800/1000?random=1312", sourceType: "upload", viewCount: 543, likeCount: 198, commentCount: 25, saveCount: 54, createdAt: now(), tags: ["pottery", "craft", "india", "artisan", "handmade"] },
  { id: 76, ...c(6), title: "Madhubani Painting", caption: "Traditional folk art from Bihar with vibrant geometric patterns.", imageUrl: "https://picsum.photos/800/1000?random=1360", sourceType: "upload", viewCount: 432, likeCount: 167, commentCount: 21, saveCount: 45, createdAt: now(), tags: ["madhubani", "art", "india", "folk", "painting"] },
  { id: 77, ...c(6), title: "Rangoli Design", caption: "An intricate floor art design made with colored powders.", imageUrl: "https://picsum.photos/800/1000?random=1408", sourceType: "upload", viewCount: 654, likeCount: 245, commentCount: 31, saveCount: 67, createdAt: now(), tags: ["rangoli", "art", "india", "festival", "design"] },
  { id: 78, ...c(6), title: "Block Printing Jaipur", caption: "Hand-carved wooden blocks creating textile patterns.", imageUrl: "https://picsum.photos/800/1000?random=1456", sourceType: "upload", viewCount: 432, likeCount: 167, commentCount: 21, saveCount: 45, createdAt: now(), tags: ["blockprint", "craft", "jaipur", "india", "textile"] },

  // ═══════════════════════════════════════════════════════════════════
  // INDIAN MUSIC (tags: music, india, sitar, classical)
  // ═══════════════════════════════════════════════════════════════════
  { id: 79, ...c(24), title: "Sitar in Golden Light", caption: "The strings of a sitar glowing under stage lights.", imageUrl: "https://picsum.photos/800/1000?random=1628", sourceType: "upload", viewCount: 543, likeCount: 212, commentCount: 27, saveCount: 58, createdAt: now(), tags: ["sitar", "music", "india", "classical", "instrument"] },
  { id: 80, ...c(24), title: "Tabla Rhythm", caption: "A master tabla player in deep concentration.", imageUrl: "https://picsum.photos/800/1000?random=1676", sourceType: "upload", viewCount: 432, likeCount: 167, commentCount: 21, saveCount: 45, createdAt: now(), tags: ["tabla", "music", "india", "classical", "percussion"] },

  // ═══════════════════════════════════════════════════════════════════
  // INDIAN TRANSPORT & VEHICLES (tags: transport, india, train)
  // ═══════════════════════════════════════════════════════════════════
  { id: 81, ...c(1), title: "Toy Train Shimla", caption: "The heritage Kalka-Shimla railway through the mountains.", imageUrl: "https://picsum.photos/800/1000?random=1848", sourceType: "upload", viewCount: 654, likeCount: 245, commentCount: 31, saveCount: 67, createdAt: now(), tags: ["train", "shimla", "india", "heritage", "mountains"] },
  { id: 82, ...c(17), title: "Royal Enfield Ride", caption: "Bikers on Royal Enfields through the Ladakh passes.", imageUrl: "https://picsum.photos/800/1000?random=1896", sourceType: "upload", viewCount: 876, likeCount: 334, commentCount: 47, saveCount: 89, createdAt: now(), tags: ["royalenfield", "bike", "ladakh", "india", "adventure"] },
  { id: 83, ...c(1), title: "Cycle Rickshaw Varanasi", caption: "A hand-painted rickshaw navigating the old city streets.", imageUrl: "https://picsum.photos/800/1000?random=1944", sourceType: "upload", viewCount: 432, likeCount: 167, commentCount: 21, saveCount: 45, createdAt: now(), tags: ["rickshaw", "varanasi", "india", "street", "vintage"] },

  // ═══════════════════════════════════════════════════════════════════
  // INDIAN EDUCATION & CAMPUS (tags: education, india, campus)
  // ═══════════════════════════════════════════════════════════════════
  { id: 84, ...c(24), title: "IIT Campus", caption: "The iconic lecture hall architecture of an IIT campus.", imageUrl: "https://picsum.photos/800/1000?random=2116", sourceType: "upload", viewCount: 543, likeCount: 212, commentCount: 28, saveCount: 58, createdAt: now(), tags: ["iit", "education", "india", "campus", "engineering"] },
  { id: 85, ...c(7), title: "Indian Startup Hub", caption: "Co-working space in Bangalore's tech corridor.", imageUrl: "https://picsum.photos/800/1000?random=2164", sourceType: "upload", viewCount: 654, likeCount: 245, commentCount: 31, saveCount: 67, createdAt: now(), tags: ["startup", "bangalore", "india", "tech", "coworking"] },

  // ═══════════════════════════════════════════════════════════════════
  // INDIAN AGRICULTURE & RURAL (tags: farming, rural, india, village)
  // ═══════════════════════════════════════════════════════════════════
  { id: 86, ...c(24), title: "Rice Paddy Fields", caption: "Emerald green rice terraces in the Western Ghats.", imageUrl: "https://picsum.photos/800/1000?random=2336", sourceType: "upload", viewCount: 654, likeCount: 245, commentCount: 31, saveCount: 67, createdAt: now(), tags: ["rice", "farming", "india", "green", "rural"] },
  { id: 87, ...c(24), title: "Indian Village Morning", caption: "Smoke rising from mud huts in rural Rajasthan.", imageUrl: "https://picsum.photos/800/1000?random=2384", sourceType: "upload", viewCount: 432, likeCount: 167, commentCount: 21, saveCount: 45, createdAt: now(), tags: ["village", "rural", "india", "rajasthan", "morning"] },
  { id: 88, ...c(24), title: "Mustard Fields Punjab", caption: "Endless yellow mustard fields stretching to the horizon.", imageUrl: "https://picsum.photos/800/1000?random=2432", sourceType: "upload", viewCount: 543, likeCount: 198, commentCount: 25, saveCount: 54, createdAt: now(), tags: ["mustard", "punjab", "india", "farming", "yellow"] },

  // ═══════════════════════════════════════════════════════════════════
  // INDIAN FITNESS & SPORTS (tags: fitness, sports, india)
  // ═══════════════════════════════════════════════════════════════════
  { id: 89, ...c(26), title: "Kushti Wrestling", caption: "Traditional Indian mud wrestling at an akhara.", imageUrl: "https://picsum.photos/800/1000?random=2604", sourceType: "upload", viewCount: 543, likeCount: 212, commentCount: 28, saveCount: 58, createdAt: now(), tags: ["kushti", "wrestling", "india", "sports", "tradition"] },
  { id: 90, ...c(26), title: "Morning Yoga Class", caption: "Group yoga session at sunrise on Marina Beach.", imageUrl: "https://picsum.photos/800/1000?random=2652", sourceType: "upload", viewCount: 654, likeCount: 245, commentCount: 31, saveCount: 67, createdAt: now(), tags: ["yoga", "fitness", "india", "beach", "wellness"] },
  { id: 91, ...c(3), title: "Kabaddi Match", caption: "The intensity of a Pro Kabaddi League game.", imageUrl: "https://picsum.photos/800/1000?random=2700", sourceType: "upload", viewCount: 543, likeCount: 198, commentCount: 25, saveCount: 54, createdAt: now(), tags: ["kabaddi", "sports", "india", "team", "action"] },
  { id: 92, ...c(3), title: "Badminton Smash", caption: "PV Sindhu-style powerful smash in action.", imageUrl: "https://picsum.photos/800/1000?random=2748", sourceType: "upload", viewCount: 432, likeCount: 167, commentCount: 21, saveCount: 45, createdAt: now(), tags: ["badminton", "sports", "india", "olympic", "action"] },

  // ═══════════════════════════════════════════════════════════════════
  // INDIAN RAJASTHAN SPECIAL (tags: rajasthan, india, desert, fort)
  // ═══════════════════════════════════════════════════════════════════
  { id: 93, ...c(8), title: "Jaisalmer Fort", caption: "The golden fortress rising from the Thar Desert.", imageUrl: "https://picsum.photos/800/1000?random=2920", sourceType: "upload", viewCount: 765, likeCount: 287, commentCount: 38, saveCount: 78, createdAt: now(), tags: ["jaisalmer", "fort", "rajasthan", "india", "desert"] },
  { id: 94, ...c(8), title: "Rajasthani Folk Dance", caption: "Kalbeliya dancers whirling under desert stars.", imageUrl: "https://picsum.photos/800/1000?random=2968", sourceType: "upload", viewCount: 654, likeCount: 245, commentCount: 31, saveCount: 67, createdAt: now(), tags: ["rajasthan", "dance", "folk", "india", "desert"] },
  { id: 95, ...c(8), title: "Thar Desert Camels", caption: "Camel caravan crossing the golden sand dunes at sunset.", imageUrl: "https://picsum.photos/800/1000?random=3016", sourceType: "upload", viewCount: 876, likeCount: 334, commentCount: 47, saveCount: 89, createdAt: now(), tags: ["thar", "desert", "camels", "rajasthan", "india"] },

  // ═══════════════════════════════════════════════════════════════════
  // INDIAN TEXTILES & FASHION (tags: fashion, textile, india)
  // ═══════════════════════════════════════════════════════════════════
  { id: 96, ...c(14), title: "Pashmina Weaving", caption: "A Kashmiri artisan weaving the world's finest wool.", imageUrl: "https://picsum.photos/800/1000?random=3188", sourceType: "upload", viewCount: 543, likeCount: 198, commentCount: 25, saveCount: 54, createdAt: now(), tags: ["pashmina", "kashmir", "india", "weaving", "craft"] },
  { id: 97, ...c(14), title: "Turbans of Rajasthan", caption: "Colorful pagdis in every shade at a village market.", imageUrl: "https://picsum.photos/800/1000?random=3236", sourceType: "upload", viewCount: 432, likeCount: 167, commentCount: 21, saveCount: 45, createdAt: now(), tags: ["turban", "rajasthan", "fashion", "india", "colorful"] },

  // ═══════════════════════════════════════════════════════════════════
  // INDIAN NIGHTLIFE & MODERN (tags: nightlife, modern, india, city)
  // ═══════════════════════════════════════════════════════════════════
  { id: 98, ...c(1), title: "Marine Drive Night", caption: "The Queen's Necklace - Mumbai's iconic seafront at night.", imageUrl: "https://picsum.photos/800/1000?random=3408", sourceType: "upload", viewCount: 876, likeCount: 334, commentCount: 47, saveCount: 89, createdAt: now(), tags: ["mumbai", "night", "city", "india", "lights"] },
  { id: 99, ...c(25), title: "Bangalore IT Park", caption: "Modern glass towers of India's Silicon Valley.", imageUrl: "https://picsum.photos/800/1000?random=3456", sourceType: "upload", viewCount: 654, likeCount: 245, commentCount: 31, saveCount: 67, createdAt: now(), tags: ["bangalore", "tech", "modern", "india", "skyline"] },

  // ═══════════════════════════════════════════════════════════════════
  // INDIAN MONSOON (tags: monsoon, rain, india, weather)
  // ═══════════════════════════════════════════════════════════════════
  { id: 100, ...c(1), title: "Mumbai Monsoon", caption: "Rain-soaked streets of Mumbai during peak monsoon.", imageUrl: "https://picsum.photos/800/1000?random=3628", sourceType: "upload", viewCount: 654, likeCount: 245, commentCount: 31, saveCount: 67, createdAt: now(), tags: ["monsoon", "rain", "mumbai", "india", "weather"] },
  { id: 101, ...c(13), title: "Western Ghats Monsoon", caption: "Lush waterfalls cascading down the ghats.", imageUrl: "https://picsum.photos/800/1000?random=3676", sourceType: "upload", viewCount: 765, likeCount: 287, commentCount: 38, saveCount: 78, createdAt: now(), tags: ["monsoon", "waterfall", "india", "nature", "green"] },
  { id: 102, ...c(1), title: "Kids Playing in Rain", caption: "Children splashing joyfully in monsoon puddles.", imageUrl: "https://picsum.photos/800/1000?random=3724", sourceType: "upload", viewCount: 543, likeCount: 212, commentCount: 28, saveCount: 58, createdAt: now(), tags: ["monsoon", "kids", "india", "joy", "rain"] },

  // ═══════════════════════════════════════════════════════════════════
  // INDIAN MARKETS (tags: market, shopping, india, bazaar)
  // ═══════════════════════════════════════════════════════════════════
  { id: 103, ...c(25), title: "Flower Market Kolkata", caption: "Mountains of marigolds at the Mallick Ghat market.", imageUrl: "https://picsum.photos/800/1000?random=3896", sourceType: "upload", viewCount: 654, likeCount: 245, commentCount: 31, saveCount: 67, createdAt: now(), tags: ["flowers", "market", "kolkata", "india", "marigold"] },
  { id: 104, ...c(25), title: "Jewellery Bazaar", caption: "Glittering gold and precious stones in a Jaipur bazaar.", imageUrl: "https://picsum.photos/800/1000?random=3944", sourceType: "upload", viewCount: 543, likeCount: 198, commentCount: 25, saveCount: 54, createdAt: now(), tags: ["jewellery", "gold", "market", "jaipur", "india"] },

  // ═══════════════════════════════════════════════════════════════════
  // INDIAN ARCHITECTURE DETAILS (tags: architecture, carving, india)
  // ═══════════════════════════════════════════════════════════════════
  { id: 105, ...c(11), title: "Meenakshi Temple Gopuram", caption: "Thousands of colorful sculptures on the towering gopuram.", imageUrl: "https://picsum.photos/800/1000?random=4116", sourceType: "upload", viewCount: 765, likeCount: 287, commentCount: 38, saveCount: 78, createdAt: now(), tags: ["meenakshi", "temple", "tamilnadu", "india", "sculpture"] },
  { id: 106, ...c(11), title: "Agra Fort Red Walls", caption: "The imposing red sandstone walls of the Mughal fortress.", imageUrl: "https://picsum.photos/800/1000?random=4164", sourceType: "upload", viewCount: 654, likeCount: 245, commentCount: 31, saveCount: 67, createdAt: now(), tags: ["agra", "fort", "mughal", "india", "architecture"] },
  { id: 107, ...c(11), title: "Stepwell Geometry", caption: "The mesmerizing symmetry of Chand Baori stepwell.", imageUrl: "https://picsum.photos/800/1000?random=4212", sourceType: "upload", viewCount: 876, likeCount: 334, commentCount: 47, saveCount: 89, createdAt: now(), tags: ["stepwell", "geometry", "rajasthan", "india", "architecture"] },

  // ═══════════════════════════════════════════════════════════════════
  // INDIAN SWEETS & DESSERTS (tags: sweets, dessert, india, mithai)
  // ═══════════════════════════════════════════════════════════════════
  { id: 108, ...c(10), title: "Rasgulla Bowl", caption: "Soft, spongy Bengali rasgullas in sugar syrup.", imageUrl: "https://picsum.photos/800/1000?random=4384", sourceType: "upload", viewCount: 543, likeCount: 212, commentCount: 28, saveCount: 58, createdAt: now(), tags: ["rasgulla", "sweets", "bengali", "india", "dessert"] },
  { id: 109, ...c(10), title: "Lassi Glass", caption: "Thick creamy mango lassi in a traditional clay glass.", imageUrl: "https://picsum.photos/800/1000?random=4432", sourceType: "upload", viewCount: 432, likeCount: 167, commentCount: 21, saveCount: 45, createdAt: now(), tags: ["lassi", "drink", "india", "mango", "refreshing"] },

  // ═══════════════════════════════════════════════════════════════════
  // INDIAN BOATS & WATERWAYS (tags: boat, water, india, fishing)
  // ═══════════════════════════════════════════════════════════════════
  { id: 110, ...c(8), title: "Kerala Fishing Nets", caption: "Chinese fishing nets of Fort Kochi at sunset.", imageUrl: "https://picsum.photos/800/1000?random=4604", sourceType: "upload", viewCount: 654, likeCount: 245, commentCount: 31, saveCount: 67, createdAt: now(), tags: ["fishing", "kochi", "kerala", "india", "sunset"] },
  { id: 111, ...c(8), title: "Ganges Boat Varanasi", caption: "Wooden boats lined up at the ancient ghats.", imageUrl: "https://picsum.photos/800/1000?random=4652", sourceType: "upload", viewCount: 543, likeCount: 198, commentCount: 25, saveCount: 54, createdAt: now(), tags: ["boat", "varanasi", "ganges", "india", "river"] },

  // ═══════════════════════════════════════════════════════════════════
  // INDIAN HERITAGE RAILWAYS (tags: heritage, railway, india)
  // ═══════════════════════════════════════════════════════════════════
  { id: 112, ...c(2), title: "Darjeeling Toy Train", caption: "The UNESCO heritage steam train puffing through clouds.", imageUrl: "https://picsum.photos/800/1000?random=4824", sourceType: "upload", viewCount: 765, likeCount: 287, commentCount: 38, saveCount: 78, createdAt: now(), tags: ["toytrain", "darjeeling", "heritage", "india", "steam"] },

  // ═══════════════════════════════════════════════════════════════════
  // INDIAN PEOPLE & PORTRAITS (tags: portrait, people, india, faces)
  // ═══════════════════════════════════════════════════════════════════
  { id: 113, ...c(24), title: "Rajasthani Elder", caption: "Weathered face telling stories of the desert.", imageUrl: "https://picsum.photos/800/1000?random=4996", sourceType: "upload", viewCount: 654, likeCount: 256, commentCount: 33, saveCount: 69, createdAt: now(), tags: ["portrait", "rajasthan", "india", "people", "elder"] },
  { id: 114, ...c(24), title: "Indian School Children", caption: "Bright smiles in school uniforms heading to class.", imageUrl: "https://picsum.photos/800/1000?random=44", sourceType: "upload", viewCount: 543, likeCount: 212, commentCount: 28, saveCount: 58, createdAt: now(), tags: ["children", "school", "india", "education", "smile"] },
  { id: 115, ...c(1), title: "Chai Wallah", caption: "A tea seller pouring chai with the signature long pour.", imageUrl: "https://picsum.photos/800/1000?random=92", sourceType: "upload", viewCount: 876, likeCount: 334, commentCount: 47, saveCount: 89, createdAt: now(), tags: ["chai", "portrait", "india", "street", "tea"] },

  // ═══════════════════════════════════════════════════════════════════
  // INDIAN DIWALI SPECIAL (more diwali content)
  // ═══════════════════════════════════════════════════════════════════
  { id: 116, ...c(2), title: "Diwali Fireworks", caption: "A spectacular fireworks display over the city skyline.", imageUrl: "https://picsum.photos/800/1000?random=264", sourceType: "upload", viewCount: 987, likeCount: 398, commentCount: 54, saveCount: 112, createdAt: now(), tags: ["diwali", "fireworks", "india", "night", "celebration"] },
  { id: 117, ...c(15), title: "Diwali Rangoli", caption: "A beautiful floor rangoli made for the festival of lights.", imageUrl: "https://picsum.photos/800/1000?random=312", sourceType: "upload", viewCount: 654, likeCount: 245, commentCount: 31, saveCount: 67, createdAt: now(), tags: ["diwali", "rangoli", "india", "art", "festival"] },

  // ═══════════════════════════════════════════════════════════════════
  // NORTH EAST INDIA (tags: northeast, india, nature, tribal)
  // ═══════════════════════════════════════════════════════════════════
  { id: 118, ...c(8), title: "Meghalaya Living Root Bridge", caption: "Ancient bridges grown from living tree roots.", imageUrl: "https://picsum.photos/800/1000?random=484", sourceType: "upload", viewCount: 765, likeCount: 287, commentCount: 38, saveCount: 78, createdAt: now(), tags: ["meghalaya", "northeast", "india", "nature", "bridge"] },
  { id: 119, ...c(8), title: "Tawang Monastery", caption: "The massive Buddhist monastery perched in Arunachal Pradesh.", imageUrl: "https://picsum.photos/800/1000?random=532", sourceType: "upload", viewCount: 543, likeCount: 198, commentCount: 25, saveCount: 54, createdAt: now(), tags: ["tawang", "monastery", "northeast", "india", "buddhist"] },
  { id: 120, ...c(8), title: "Kaziranga Rhino", caption: "The one-horned rhinoceros in Assam's famous national park.", imageUrl: "https://picsum.photos/800/1000?random=580", sourceType: "upload", viewCount: 876, likeCount: 334, commentCount: 47, saveCount: 89, createdAt: now(), tags: ["kaziranga", "rhino", "wildlife", "assam", "india"] },

  // ═══════════════════════════════════════════════════════════════════
  // INDIAN DEVOTION & TEMPLES (more spiritual)
  // ═══════════════════════════════════════════════════════════════════
  { id: 121, ...c(15), title: "Tirupati Temple", caption: "Devotees at one of the world's most visited temples.", imageUrl: "https://picsum.photos/800/1000?random=752", sourceType: "upload", viewCount: 876, likeCount: 334, commentCount: 47, saveCount: 89, createdAt: now(), tags: ["tirupati", "temple", "india", "devotion", "spiritual"] },
  { id: 122, ...c(15), title: "Bodh Gaya Tree", caption: "The sacred Bodhi Tree where Buddha attained enlightenment.", imageUrl: "https://picsum.photos/800/1000?random=800", sourceType: "upload", viewCount: 654, likeCount: 245, commentCount: 31, saveCount: 67, createdAt: now(), tags: ["bodhgaya", "buddhism", "india", "spiritual", "tree"] },

  // ═══════════════════════════════════════════════════════════════════
  // INDIAN JEWELRY & ACCESSORIES (tags: jewelry, gold, india)
  // ═══════════════════════════════════════════════════════════════════
  { id: 123, ...c(14), title: "Kundan Jewelry Set", caption: "Exquisite traditional bridal jewelry with precious stones.", imageUrl: "https://picsum.photos/800/1000?random=972", sourceType: "upload", viewCount: 654, likeCount: 256, commentCount: 33, saveCount: 69, createdAt: now(), tags: ["jewelry", "bridal", "india", "gold", "kundan"] },
  { id: 124, ...c(14), title: "Temple Jewelry", caption: "Traditional South Indian temple jewelry designs.", imageUrl: "https://picsum.photos/800/1000?random=1020", sourceType: "upload", viewCount: 543, likeCount: 198, commentCount: 25, saveCount: 54, createdAt: now(), tags: ["jewelry", "temple", "southindian", "india", "gold"] },

  // ═══════════════════════════════════════════════════════════════════
  // MORE INDIAN FOOD (tags: food, india)
  // ═══════════════════════════════════════════════════════════════════
  { id: 125, ...c(10), title: "Tandoori Platter", caption: "Smoky tandoori chicken with mint chutney.", imageUrl: "https://picsum.photos/800/1000?random=1192", sourceType: "upload", viewCount: 765, likeCount: 289, commentCount: 38, saveCount: 78, createdAt: now(), tags: ["tandoori", "food", "india", "nonveg", "grill"] },
  { id: 126, ...c(10), title: "Chole Bhature", caption: "The iconic Punjabi breakfast of chickpea curry with fried bread.", imageUrl: "https://picsum.photos/800/1000?random=1240", sourceType: "upload", viewCount: 654, likeCount: 256, commentCount: 34, saveCount: 69, createdAt: now(), tags: ["cholebhature", "food", "punjabi", "india", "breakfast"] },
  { id: 127, ...c(4), title: "Pav Bhaji Mumbai", caption: "Buttery mashed vegetables with toasted pav.", imageUrl: "https://picsum.photos/800/1000?random=1288", sourceType: "upload", viewCount: 543, likeCount: 212, commentCount: 28, saveCount: 58, createdAt: now(), tags: ["pavbhaji", "food", "mumbai", "india", "streetfood"] },

  // ═══════════════════════════════════════════════════════════════════
  // SOUTH INDIA SPECIAL (tags: southindia, india)
  // ═══════════════════════════════════════════════════════════════════
  { id: 128, ...c(2), title: "Hampi Chariot", caption: "The iconic stone chariot at Vittala Temple.", imageUrl: "https://picsum.photos/800/1000?random=1460", sourceType: "upload", viewCount: 654, likeCount: 245, commentCount: 31, saveCount: 67, createdAt: now(), tags: ["hampi", "temple", "karnataka", "india", "heritage"] },
  { id: 129, ...c(8), title: "Ooty Hills", caption: "The beautiful Nilgiri hills of Tamil Nadu.", imageUrl: "https://picsum.photos/800/1000?random=1508", sourceType: "upload", viewCount: 543, likeCount: 198, commentCount: 25, saveCount: 54, createdAt: now(), tags: ["ooty", "hills", "tamilnadu", "india", "nature"] },
  { id: 130, ...c(2), title: "Alleppey Houseboat", caption: "Cruising through Kerala's palm-fringed backwaters.", imageUrl: "https://picsum.photos/800/1000?random=1556", sourceType: "upload", viewCount: 765, likeCount: 287, commentCount: 38, saveCount: 78, createdAt: now(), tags: ["alleppey", "houseboat", "kerala", "india", "backwaters"] },

  // ═══════════════════════════════════════════════════════════════════
  // VARANASI SPECIAL (more varanasi)
  // ═══════════════════════════════════════════════════════════════════
  { id: 131, ...c(15), title: "Varanasi Silk Weaving", caption: "A master weaver creating Banarasi silk on a handloom.", imageUrl: "https://picsum.photos/800/1000?random=1728", sourceType: "upload", viewCount: 543, likeCount: 198, commentCount: 25, saveCount: 54, createdAt: now(), tags: ["varanasi", "silk", "weaving", "india", "craft"] },
  { id: 132, ...c(15), title: "Ganga Aarti Fire", caption: "Priests performing the fire ritual with large brass lamps.", imageUrl: "https://picsum.photos/800/1000?random=1776", sourceType: "upload", viewCount: 876, likeCount: 334, commentCount: 47, saveCount: 89, createdAt: now(), tags: ["gangaaarti", "varanasi", "fire", "india", "spiritual"] },

  // ═══════════════════════════════════════════════════════════════════
  // MORE INDIAN LANDSCAPES
  // ═══════════════════════════════════════════════════════════════════
  { id: 133, ...c(13), title: "Valley of Flowers", caption: "Alpine wildflowers blooming in Uttarakhand.", imageUrl: "https://picsum.photos/800/1000?random=1948", sourceType: "upload", viewCount: 765, likeCount: 287, commentCount: 38, saveCount: 78, createdAt: now(), tags: ["valleyofflowers", "uttarakhand", "india", "flowers", "trek"] },
  { id: 134, ...c(13), title: "Sunset Over Thar", caption: "Golden desert sunset from Sam Sand Dunes.", imageUrl: "https://picsum.photos/800/1000?random=1996", sourceType: "upload", viewCount: 654, likeCount: 245, commentCount: 31, saveCount: 67, createdAt: now(), tags: ["thar", "sunset", "rajasthan", "india", "desert"] },
  { id: 135, ...c(28), title: "Stars Over Pangong", caption: "The Milky Way reflected in the high-altitude lake.", imageUrl: "https://picsum.photos/800/1000?random=2044", sourceType: "upload", viewCount: 876, likeCount: 334, commentCount: 47, saveCount: 89, createdAt: now(), tags: ["astrophotography", "pangong", "ladakh", "india", "stars"] },

  // ═══════════════════════════════════════════════════════════════════
  // INDIAN TEA & COFFEE (tags: tea, coffee, india, beverage)
  // ═══════════════════════════════════════════════════════════════════
  { id: 136, ...c(4), title: "Assam Tea Picking", caption: "Workers harvesting in the vast tea gardens of Assam.", imageUrl: "https://picsum.photos/800/1000?random=2216", sourceType: "upload", viewCount: 543, likeCount: 198, commentCount: 25, saveCount: 54, createdAt: now(), tags: ["tea", "assam", "india", "harvest", "green"] },
  { id: 137, ...c(4), title: "Filter Coffee Tumbler", caption: "South Indian filter coffee in a traditional steel tumbler.", imageUrl: "https://picsum.photos/800/1000?random=2264", sourceType: "upload", viewCount: 654, likeCount: 245, commentCount: 31, saveCount: 67, createdAt: now(), tags: ["coffee", "southindian", "india", "beverage", "filter"] },

  // ═══════════════════════════════════════════════════════════════════
  // MORE INDIAN STREET (tags: autorickshaw, street, india)
  // ═══════════════════════════════════════════════════════════════════
  { id: 138, ...c(25), title: "Dabbawala Mumbai", caption: "The legendary tiffin delivery system of Mumbai.", imageUrl: "https://picsum.photos/800/1000?random=2436", sourceType: "upload", viewCount: 543, likeCount: 212, commentCount: 28, saveCount: 58, createdAt: now(), tags: ["dabbawala", "mumbai", "india", "street", "iconic"] },
  { id: 139, ...c(1), title: "Mumbai CST Station", caption: "The Victorian Gothic architecture of Chhatrapati Shivaji Terminus.", imageUrl: "https://picsum.photos/800/1000?random=2484", sourceType: "upload", viewCount: 765, likeCount: 287, commentCount: 38, saveCount: 78, createdAt: now(), tags: ["mumbai", "station", "architecture", "india", "heritage"] },

  // ═══════════════════════════════════════════════════════════════════
  // INDIAN SPIRITUAL MORE (tags: mantra, prayer, india)
  // ═══════════════════════════════════════════════════════════════════
  { id: 140, ...c(15), title: "Tibetan Prayer Flags", caption: "Colorful prayer flags fluttering over Himalayan passes.", imageUrl: "https://picsum.photos/800/1000?random=2656", sourceType: "upload", viewCount: 654, likeCount: 245, commentCount: 31, saveCount: 67, createdAt: now(), tags: ["prayerflags", "tibet", "himalaya", "india", "spiritual"] },
  { id: 141, ...c(15), title: "Incense Sticks", caption: "Fragrant agarbatti smoke curling in a temple.", imageUrl: "https://picsum.photos/800/1000?random=2704", sourceType: "upload", viewCount: 432, likeCount: 167, commentCount: 21, saveCount: 45, createdAt: now(), tags: ["incense", "temple", "india", "spiritual", "fragrance"] },

  // ═══════════════════════════════════════════════════════════════════
  // ADDITIONAL INDIAN (push to 170 Indian images)
  // ═══════════════════════════════════════════════════════════════════
  { id: 142, ...c(11), title: "India Gate Delhi", caption: "The war memorial arch illuminated at night.", imageUrl: "https://picsum.photos/800/1000?random=2876", sourceType: "upload", viewCount: 876, likeCount: 334, commentCount: 47, saveCount: 89, createdAt: now(), tags: ["indiagate", "delhi", "india", "monument", "night"] },
  { id: 143, ...c(2), title: "Lotus Temple", caption: "The stunning Bahai House of Worship in Delhi.", imageUrl: "https://picsum.photos/800/1000?random=2924", sourceType: "upload", viewCount: 654, likeCount: 245, commentCount: 31, saveCount: 67, createdAt: now(), tags: ["lotustemple", "delhi", "india", "architecture", "modern"] },
  { id: 144, ...c(1), title: "Howrah Bridge Kolkata", caption: "The iconic cantilever bridge over the Hooghly River.", imageUrl: "https://picsum.photos/800/1000?random=2972", sourceType: "upload", viewCount: 543, likeCount: 198, commentCount: 25, saveCount: 54, createdAt: now(), tags: ["howrahbridge", "kolkata", "india", "bridge", "iconic"] },
  { id: 145, ...c(5), title: "Jim Corbett National Park", caption: "Dense sal forests of India's oldest national park.", imageUrl: "https://picsum.photos/800/1000?random=3020", sourceType: "upload", viewCount: 654, likeCount: 245, commentCount: 31, saveCount: 67, createdAt: now(), tags: ["jimcorbett", "wildlife", "india", "forest", "nature"] },
  { id: 146, ...c(8), title: "Leh Palace", caption: "The ancient royal palace overlooking the Leh valley.", imageUrl: "https://picsum.photos/800/1000?random=3068", sourceType: "upload", viewCount: 543, likeCount: 198, commentCount: 25, saveCount: 54, createdAt: now(), tags: ["leh", "palace", "ladakh", "india", "heritage"] },
  { id: 147, ...c(10), title: "Masala Chai Close-up", caption: "Boiling chai with cardamom, ginger, and cinnamon.", imageUrl: "https://picsum.photos/800/1000?random=3116", sourceType: "upload", viewCount: 543, likeCount: 212, commentCount: 28, saveCount: 58, createdAt: now(), tags: ["chai", "masala", "india", "food", "spices"] },
  { id: 148, ...c(3), title: "Cricket Practice Nets", caption: "Young aspiring cricketers training in the nets.", imageUrl: "https://picsum.photos/800/1000?random=3164", sourceType: "upload", viewCount: 432, likeCount: 167, commentCount: 21, saveCount: 45, createdAt: now(), tags: ["cricket", "practice", "india", "youth", "sports"] },
  { id: 149, ...c(26), title: "Indian Gym Culture", caption: "Bodybuilding culture in an open-air akhara.", imageUrl: "https://picsum.photos/800/1000?random=3212", sourceType: "upload", viewCount: 543, likeCount: 198, commentCount: 25, saveCount: 54, createdAt: now(), tags: ["gym", "fitness", "india", "bodybuilding", "strength"] },
  { id: 150, ...c(6), title: "Warli Art", caption: "Traditional tribal art from Maharashtra on a mud wall.", imageUrl: "https://picsum.photos/800/1000?random=3260", sourceType: "upload", viewCount: 432, likeCount: 167, commentCount: 21, saveCount: 45, createdAt: now(), tags: ["warli", "tribalart", "maharashtra", "india", "art"] },
  { id: 151, ...c(16), title: "Odissi Dance", caption: "Graceful Odissi dance in a traditional temple setting.", imageUrl: "https://picsum.photos/800/1000?random=3308", sourceType: "upload", viewCount: 543, likeCount: 198, commentCount: 25, saveCount: 54, createdAt: now(), tags: ["odissi", "dance", "classical", "india", "odisha"] },
  { id: 152, ...c(9), title: "Indian Cinema Popcorn", caption: "The quintessential movie experience with buttery popcorn.", imageUrl: "https://picsum.photos/800/1000?random=3356", sourceType: "upload", viewCount: 432, likeCount: 167, commentCount: 21, saveCount: 45, createdAt: now(), tags: ["cinema", "popcorn", "india", "movies", "entertainment"] },
  { id: 153, ...c(17), title: "Ambassador Car", caption: "The classic Hindustan Ambassador — India's once-beloved car.", imageUrl: "https://picsum.photos/800/1000?random=3404", sourceType: "upload", viewCount: 543, likeCount: 198, commentCount: 25, saveCount: 54, createdAt: now(), tags: ["ambassador", "car", "vintage", "india", "classic"] },
  { id: 154, ...c(1), title: "Mumbai Skyline", caption: "The glittering skyline of India's financial capital.", imageUrl: "https://picsum.photos/800/1000?random=3452", sourceType: "upload", viewCount: 765, likeCount: 287, commentCount: 38, saveCount: 78, createdAt: now(), tags: ["mumbai", "skyline", "india", "city", "modern"] },
  { id: 155, ...c(24), title: "Indian Harvest Festival", caption: "Farmers celebrating Pongal with fresh harvest.", imageUrl: "https://picsum.photos/800/1000?random=3500", sourceType: "upload", viewCount: 432, likeCount: 167, commentCount: 21, saveCount: 45, createdAt: now(), tags: ["pongal", "harvest", "festival", "india", "tamilnadu"] },
  { id: 156, ...c(5), title: "Indian Monkey", caption: "A playful Rhesus macaque in the temple complex.", imageUrl: "https://picsum.photos/800/1000?random=3548", sourceType: "upload", viewCount: 543, likeCount: 198, commentCount: 25, saveCount: 54, createdAt: now(), tags: ["monkey", "wildlife", "india", "temple", "animal"] },
  { id: 157, ...c(13), title: "Western Ghats Green", caption: "Dense tropical rainforest of the Western Ghats.", imageUrl: "https://picsum.photos/800/1000?random=3596", sourceType: "upload", viewCount: 654, likeCount: 245, commentCount: 31, saveCount: 67, createdAt: now(), tags: ["westernghats", "forest", "india", "nature", "biodiversity"] },
  { id: 158, ...c(11), title: "Jantar Mantar", caption: "The astronomical observatory instruments in Jaipur.", imageUrl: "https://picsum.photos/800/1000?random=3644", sourceType: "upload", viewCount: 432, likeCount: 167, commentCount: 21, saveCount: 45, createdAt: now(), tags: ["jantarmantar", "jaipur", "india", "science", "heritage"] },
  { id: 159, ...c(10), title: "Indian Pickle Jars", caption: "Homemade mango and lime pickles in glass jars.", imageUrl: "https://picsum.photos/800/1000?random=3692", sourceType: "upload", viewCount: 432, likeCount: 167, commentCount: 21, saveCount: 45, createdAt: now(), tags: ["pickle", "food", "india", "homemade", "spicy"] },
  { id: 160, ...c(2), title: "Holi Water Balloons", caption: "Colorful water balloons and gulaal at Holi celebrations.", imageUrl: "https://picsum.photos/800/1000?random=3740", sourceType: "upload", viewCount: 654, likeCount: 245, commentCount: 31, saveCount: 67, createdAt: now(), tags: ["holi", "waterballoon", "festival", "india", "fun"] },
  { id: 161, ...c(8), title: "Zanskar Frozen River", caption: "The frozen Chadar trek over the Zanskar River.", imageUrl: "https://picsum.photos/800/1000?random=3788", sourceType: "upload", viewCount: 876, likeCount: 334, commentCount: 47, saveCount: 89, createdAt: now(), tags: ["zanskar", "trek", "ladakh", "india", "adventure"] },
  { id: 162, ...c(3), title: "IPL Stadium Crowd", caption: "The electric atmosphere of an Indian Premier League match.", imageUrl: "https://picsum.photos/800/1000?random=3836", sourceType: "upload", viewCount: 876, likeCount: 334, commentCount: 47, saveCount: 89, createdAt: now(), tags: ["ipl", "cricket", "india", "stadium", "crowd"] },
  { id: 163, ...c(9), title: "Indian Film Set", caption: "Behind the scenes of a Hindi film production.", imageUrl: "https://picsum.photos/800/1000?random=3884", sourceType: "upload", viewCount: 543, likeCount: 198, commentCount: 25, saveCount: 54, createdAt: now(), tags: ["filmset", "bollywood", "india", "cinema", "production"] },
  { id: 164, ...c(1), title: "Mumbai Dabba Delivery", caption: "Tiffin boxes being sorted at Churchgate station.", imageUrl: "https://picsum.photos/800/1000?random=3932", sourceType: "upload", viewCount: 543, likeCount: 198, commentCount: 25, saveCount: 54, createdAt: now(), tags: ["dabbawala", "mumbai", "india", "logistics", "food"] },
  { id: 165, ...c(14), title: "Kolhapuri Chappal", caption: "Traditional handcrafted leather sandals of Maharashtra.", imageUrl: "https://picsum.photos/800/1000?random=3980", sourceType: "upload", viewCount: 432, likeCount: 167, commentCount: 21, saveCount: 45, createdAt: now(), tags: ["kolhapuri", "footwear", "india", "craft", "leather"] },
  { id: 166, ...c(24), title: "Indian School Assembly", caption: "Students lined up for morning prayers and national anthem.", imageUrl: "https://picsum.photos/800/1000?random=4028", sourceType: "upload", viewCount: 432, likeCount: 167, commentCount: 21, saveCount: 45, createdAt: now(), tags: ["school", "education", "india", "morning", "assembly"] },
  { id: 167, ...c(5), title: "Flamingos Mumbai", caption: "A flock of flamingos at the Sewri mudflats.", imageUrl: "https://picsum.photos/800/1000?random=4076", sourceType: "upload", viewCount: 654, likeCount: 245, commentCount: 31, saveCount: 67, createdAt: now(), tags: ["flamingo", "bird", "mumbai", "india", "nature"] },

  // ═══════════════════════════════════════════════════════════════════
  // MARVEL & SUPERHERO (20% International starts here)
  // ═══════════════════════════════════════════════════════════════════
  { id: 168, ...c(19), title: "Iron Man Suit Display", caption: "The iconic red and gold armor on display.", imageUrl: "https://picsum.photos/800/1000?random=4248", sourceType: "upload", viewCount: 1200, likeCount: 478, commentCount: 67, saveCount: 134, createdAt: now(), tags: ["marvel", "ironman", "superhero", "avengers", "comics"] },
  { id: 169, ...c(19), title: "Spider-Man Wall Art", caption: "Amazing Spider-Man street art on a city wall.", imageUrl: "https://picsum.photos/800/1000?random=4296", sourceType: "upload", viewCount: 987, likeCount: 398, commentCount: 54, saveCount: 112, createdAt: now(), tags: ["marvel", "spiderman", "streetart", "superhero", "art"] },
  { id: 170, ...c(19), title: "Captain America Shield", caption: "The vibranium shield — symbol of hope.", imageUrl: "https://picsum.photos/800/1000?random=4344", sourceType: "upload", viewCount: 876, likeCount: 345, commentCount: 48, saveCount: 98, createdAt: now(), tags: ["marvel", "captainamerica", "superhero", "avengers", "shield"] },
  { id: 171, ...c(19), title: "Thor Hammer", caption: "Mjolnir — whosoever holds this hammer.", imageUrl: "https://picsum.photos/800/1000?random=4392", sourceType: "upload", viewCount: 765, likeCount: 289, commentCount: 38, saveCount: 78, createdAt: now(), tags: ["marvel", "thor", "mjolnir", "superhero", "asgard"] },
  { id: 172, ...c(19), title: "Avengers Assemble", caption: "The ultimate superhero team-up poster.", imageUrl: "https://picsum.photos/800/1000?random=4440", sourceType: "upload", viewCount: 1100, likeCount: 445, commentCount: 62, saveCount: 118, createdAt: now(), tags: ["marvel", "avengers", "superhero", "team", "epic"] },

  // ═══════════════════════════════════════════════════════════════════
  // DC COMICS (tags: dc, batman, superman, superhero)
  // ═══════════════════════════════════════════════════════════════════
  { id: 173, ...c(20), title: "Batman Signal", caption: "The Bat-Signal lighting up Gotham's night sky.", imageUrl: "https://picsum.photos/800/1000?random=4612", sourceType: "upload", viewCount: 987, likeCount: 398, commentCount: 54, saveCount: 112, createdAt: now(), tags: ["dc", "batman", "gotham", "superhero", "night"] },
  { id: 174, ...c(20), title: "Superman Symbol", caption: "The iconic S shield — hope for humanity.", imageUrl: "https://picsum.photos/800/1000?random=4660", sourceType: "upload", viewCount: 876, likeCount: 345, commentCount: 47, saveCount: 92, createdAt: now(), tags: ["dc", "superman", "hope", "superhero", "symbol"] },
  { id: 175, ...c(20), title: "Wonder Woman Cosplay", caption: "An incredible Wonder Woman costume at a convention.", imageUrl: "https://picsum.photos/800/1000?random=4708", sourceType: "upload", viewCount: 765, likeCount: 289, commentCount: 38, saveCount: 78, createdAt: now(), tags: ["dc", "wonderwoman", "cosplay", "superhero", "convention"] },
  { id: 176, ...c(20), title: "Joker Art", caption: "Why so serious? Stunning fan art of the Clown Prince.", imageUrl: "https://picsum.photos/800/1000?random=4756", sourceType: "upload", viewCount: 876, likeCount: 334, commentCount: 47, saveCount: 89, createdAt: now(), tags: ["dc", "joker", "villain", "art", "dark"] },

  // ═══════════════════════════════════════════════════════════════════
  // CODING & TECH (tags: coding, programming, tech, developer)
  // ═══════════════════════════════════════════════════════════════════
  { id: 177, ...c(7), title: "VS Code Setup", caption: "The perfect dark theme coding environment.", imageUrl: "https://picsum.photos/800/1000?random=4928", sourceType: "upload", viewCount: 876, likeCount: 334, commentCount: 47, saveCount: 92, createdAt: now(), tags: ["coding", "vscode", "programming", "developer", "tech"] },
  { id: 178, ...c(21), title: "Clean Code Terminal", caption: "Green text on black — the hacker aesthetic.", imageUrl: "https://picsum.photos/800/1000?random=4976", sourceType: "upload", viewCount: 765, likeCount: 289, commentCount: 38, saveCount: 78, createdAt: now(), tags: ["coding", "terminal", "hacker", "tech", "matrix"] },
  { id: 179, ...c(7), title: "JavaScript Code", caption: "Beautiful JavaScript code with syntax highlighting.", imageUrl: "https://picsum.photos/800/1000?random=24", sourceType: "upload", viewCount: 654, likeCount: 245, commentCount: 31, saveCount: 67, createdAt: now(), tags: ["javascript", "coding", "programming", "web", "developer"] },
  { id: 180, ...c(21), title: "Mechanical Keyboard RGB", caption: "Custom mechanical keyboard with RGB backlighting.", imageUrl: "https://picsum.photos/800/1000?random=72", sourceType: "upload", viewCount: 543, likeCount: 212, commentCount: 28, saveCount: 58, createdAt: now(), tags: ["keyboard", "tech", "rgb", "gaming", "mechanical"] },
  { id: 181, ...c(7), title: "React Component Tree", caption: "Building beautiful UIs with React components.", imageUrl: "https://picsum.photos/800/1000?random=120", sourceType: "upload", viewCount: 543, likeCount: 198, commentCount: 25, saveCount: 54, createdAt: now(), tags: ["react", "coding", "frontend", "javascript", "ui"] },
  { id: 182, ...c(21), title: "Server Room", caption: "Rows of blinking servers in a modern data center.", imageUrl: "https://picsum.photos/800/1000?random=168", sourceType: "upload", viewCount: 654, likeCount: 245, commentCount: 31, saveCount: 67, createdAt: now(), tags: ["server", "tech", "datacenter", "cloud", "infrastructure"] },

  // ═══════════════════════════════════════════════════════════════════
  // DOGS (tags: dog, pets, puppy, animal)
  // ═══════════════════════════════════════════════════════════════════
  { id: 183, ...c(12), title: "Golden Retriever Smile", caption: "The happiest dog in the world with that golden smile.", imageUrl: "https://picsum.photos/800/1000?random=340", sourceType: "upload", viewCount: 987, likeCount: 412, commentCount: 58, saveCount: 115, createdAt: now(), tags: ["dog", "goldenretriever", "pets", "happy", "animal"] },
  { id: 184, ...c(12), title: "Indian Stray Puppy", caption: "An adorable Indian pariah puppy with soulful eyes.", imageUrl: "https://picsum.photos/800/1000?random=388", sourceType: "upload", viewCount: 876, likeCount: 378, commentCount: 52, saveCount: 98, createdAt: now(), tags: ["dog", "puppy", "india", "stray", "cute"] },
  { id: 185, ...c(12), title: "Husky Blue Eyes", caption: "Piercing blue eyes of a Siberian Husky.", imageUrl: "https://picsum.photos/800/1000?random=436", sourceType: "upload", viewCount: 765, likeCount: 312, commentCount: 42, saveCount: 84, createdAt: now(), tags: ["dog", "husky", "pets", "blueeyes", "beautiful"] },
  { id: 186, ...c(12), title: "Dog at the Beach", caption: "A playful dog running along the shoreline.", imageUrl: "https://picsum.photos/800/1000?random=484", sourceType: "upload", viewCount: 654, likeCount: 267, commentCount: 35, saveCount: 72, createdAt: now(), tags: ["dog", "beach", "pets", "play", "happy"] },

  // ═══════════════════════════════════════════════════════════════════
  // CATS (tags: cat, pets, kitten, feline)
  // ═══════════════════════════════════════════════════════════════════
  { id: 187, ...c(22), title: "Persian Cat Royalty", caption: "A fluffy Persian cat with an aristocratic gaze.", imageUrl: "https://picsum.photos/800/1000?random=656", sourceType: "upload", viewCount: 876, likeCount: 356, commentCount: 49, saveCount: 95, createdAt: now(), tags: ["cat", "persian", "pets", "fluffy", "royal"] },
  { id: 188, ...c(22), title: "Kitten Yawning", caption: "The cutest kitten mid-yawn captured perfectly.", imageUrl: "https://picsum.photos/800/1000?random=704", sourceType: "upload", viewCount: 987, likeCount: 412, commentCount: 58, saveCount: 115, createdAt: now(), tags: ["cat", "kitten", "pets", "cute", "yawn"] },
  { id: 189, ...c(22), title: "Cat in Window", caption: "A thoughtful cat gazing out a rain-streaked window.", imageUrl: "https://picsum.photos/800/1000?random=752", sourceType: "upload", viewCount: 765, likeCount: 298, commentCount: 41, saveCount: 79, createdAt: now(), tags: ["cat", "window", "pets", "rain", "mood"] },
  { id: 190, ...c(22), title: "Orange Tabby Cat", caption: "A majestic orange tabby basking in sunlight.", imageUrl: "https://picsum.photos/800/1000?random=800", sourceType: "upload", viewCount: 654, likeCount: 256, commentCount: 33, saveCount: 69, createdAt: now(), tags: ["cat", "tabby", "pets", "orange", "sun"] },

  // ═══════════════════════════════════════════════════════════════════
  // INTERNATIONAL FOOD (tags: food, international, cuisine)
  // ═══════════════════════════════════════════════════════════════════
  { id: 191, ...c(10), title: "Sushi Platter", caption: "Beautifully arranged sushi with wasabi and ginger.", imageUrl: "https://picsum.photos/800/1000?random=972", sourceType: "upload", viewCount: 765, likeCount: 289, commentCount: 38, saveCount: 78, createdAt: now(), tags: ["sushi", "food", "japanese", "seafood", "platter"] },
  { id: 192, ...c(4), title: "Pizza Margherita", caption: "A perfectly wood-fired Neapolitan Margherita pizza.", imageUrl: "https://picsum.photos/800/1000?random=1020", sourceType: "upload", viewCount: 654, likeCount: 245, commentCount: 31, saveCount: 67, createdAt: now(), tags: ["pizza", "food", "italian", "cheese", "woodfired"] },

  // ═══════════════════════════════════════════════════════════════════
  // SPACE & ASTRONOMY (tags: space, astronomy, stars, galaxy)
  // ═══════════════════════════════════════════════════════════════════
  { id: 193, ...c(23), title: "Nebula in Deep Space", caption: "A stunning view of a colorful nebula.", imageUrl: "https://picsum.photos/800/1000?random=1192", sourceType: "upload", viewCount: 987, likeCount: 398, commentCount: 54, saveCount: 112, createdAt: now(), tags: ["space", "nebula", "astronomy", "galaxy", "cosmos"] },
  { id: 194, ...c(23), title: "Full Moon Close-up", caption: "High-resolution details of the lunar surface.", imageUrl: "https://picsum.photos/800/1000?random=1240", sourceType: "upload", viewCount: 876, likeCount: 334, commentCount: 47, saveCount: 89, createdAt: now(), tags: ["moon", "space", "astronomy", "night", "closeup"] },
  { id: 195, ...c(23), title: "Saturn Rings", caption: "The magnificent rings of Saturn captured by telescope.", imageUrl: "https://picsum.photos/800/1000?random=1288", sourceType: "upload", viewCount: 765, likeCount: 289, commentCount: 38, saveCount: 78, createdAt: now(), tags: ["saturn", "space", "astronomy", "planet", "rings"] },

  // ═══════════════════════════════════════════════════════════════════
  // INTERNATIONAL TRAVEL (tags: travel, world, landscape)
  // ═══════════════════════════════════════════════════════════════════
  { id: 196, ...c(27), title: "Northern Lights Iceland", caption: "The spectacular Aurora Borealis dancing in the sky.", imageUrl: "https://picsum.photos/800/1000?random=1460", sourceType: "upload", viewCount: 1200, likeCount: 478, commentCount: 67, saveCount: 134, createdAt: now(), tags: ["aurora", "iceland", "travel", "night", "nature"] },
  { id: 197, ...c(27), title: "Swiss Alps", caption: "Snow-capped peaks with a clear blue sky.", imageUrl: "https://picsum.photos/800/1000?random=1508", sourceType: "upload", viewCount: 987, likeCount: 389, commentCount: 54, saveCount: 104, createdAt: now(), tags: ["switzerland", "alps", "mountains", "travel", "snow"] },
  { id: 198, ...c(27), title: "Japanese Cherry Blossoms", caption: "Sakura trees in full bloom along a Tokyo canal.", imageUrl: "https://picsum.photos/800/1000?random=1556", sourceType: "upload", viewCount: 876, likeCount: 334, commentCount: 47, saveCount: 89, createdAt: now(), tags: ["sakura", "japan", "cherryblossom", "travel", "spring"] },

  // ═══════════════════════════════════════════════════════════════════
  // GAMING (tags: gaming, esports, game)
  // ═══════════════════════════════════════════════════════════════════
  { id: 199, ...c(21), title: "Gaming Setup RGB", caption: "Ultimate RGB gaming battlestation setup.", imageUrl: "https://picsum.photos/800/1000?random=1728", sourceType: "upload", viewCount: 876, likeCount: 345, commentCount: 48, saveCount: 92, createdAt: now(), tags: ["gaming", "setup", "rgb", "pc", "battlestation"] },
  { id: 200, ...c(21), title: "Retro Arcade", caption: "Classic arcade machines glowing in neon.", imageUrl: "https://picsum.photos/800/1000?random=1776", sourceType: "upload", viewCount: 654, likeCount: 245, commentCount: 31, saveCount: 67, createdAt: now(), tags: ["arcade", "retro", "gaming", "neon", "vintage"] },

  // ═══════════════════════════════════════════════════════════════════
  // NATURE & FLOWERS (tags: flower, nature, macro, garden)
  // ═══════════════════════════════════════════════════════════════════
  { id: 201, ...c(27), title: "Rose Macro", caption: "Dew drops on a perfect red rose petal.", imageUrl: "https://picsum.photos/800/1000?random=1948", sourceType: "upload", viewCount: 654, likeCount: 256, commentCount: 33, saveCount: 69, createdAt: now(), tags: ["rose", "flower", "macro", "nature", "dew"] },
  { id: 202, ...c(27), title: "Sunflower Field", caption: "An endless field of sunflowers facing the sun.", imageUrl: "https://picsum.photos/800/1000?random=1996", sourceType: "upload", viewCount: 765, likeCount: 289, commentCount: 38, saveCount: 78, createdAt: now(), tags: ["sunflower", "flower", "field", "nature", "yellow"] },
  { id: 203, ...c(13), title: "Lotus Bloom India", caption: "The sacred lotus flower in a temple pond.", imageUrl: "https://picsum.photos/800/1000?random=2044", sourceType: "upload", viewCount: 543, likeCount: 198, commentCount: 25, saveCount: 54, createdAt: now(), tags: ["lotus", "flower", "india", "sacred", "nature"] },

  // ═══════════════════════════════════════════════════════════════════
  // ARCHITECTURE & DESIGN (international)
  // ═══════════════════════════════════════════════════════════════════
  { id: 204, ...c(18), title: "Minimalist Interior", caption: "Clean lines and natural light in a modern home.", imageUrl: "https://picsum.photos/800/1000?random=2216", sourceType: "upload", viewCount: 654, likeCount: 245, commentCount: 31, saveCount: 67, createdAt: now(), tags: ["minimalist", "interior", "architecture", "modern", "design"] },
  { id: 205, ...c(18), title: "Brutalist Concrete", caption: "Raw concrete architecture in dramatic light.", imageUrl: "https://picsum.photos/800/1000?random=2264", sourceType: "upload", viewCount: 543, likeCount: 198, commentCount: 25, saveCount: 54, createdAt: now(), tags: ["brutalist", "architecture", "concrete", "modern", "urban"] },

  // ═══════════════════════════════════════════════════════════════════
  // ABSTRACT & ART (tags: abstract, art, digital, creative)
  // ═══════════════════════════════════════════════════════════════════
  { id: 206, ...c(6), title: "Neon Abstract Waves", caption: "Flowing neon waves in a digital art piece.", imageUrl: "https://picsum.photos/800/1000?random=2436", sourceType: "upload", viewCount: 765, likeCount: 289, commentCount: 38, saveCount: 78, createdAt: now(), tags: ["abstract", "neon", "digital", "art", "creative"] },
  { id: 207, ...c(6), title: "Liquid Color Swirl", caption: "Abstract color mixing creating organic patterns.", imageUrl: "https://picsum.photos/800/1000?random=2484", sourceType: "upload", viewCount: 654, likeCount: 245, commentCount: 31, saveCount: 67, createdAt: now(), tags: ["abstract", "color", "art", "liquid", "creative"] },
  { id: 208, ...c(6), title: "Geometric Pattern", caption: "Perfectly symmetrical geometric digital art.", imageUrl: "https://picsum.photos/800/1000?random=2532", sourceType: "upload", viewCount: 543, likeCount: 198, commentCount: 25, saveCount: 54, createdAt: now(), tags: ["geometric", "pattern", "art", "abstract", "symmetry"] },

  // ═══════════════════════════════════════════════════════════════════
  // OCEAN & UNDERWATER (tags: ocean, underwater, marine)
  // ═══════════════════════════════════════════════════════════════════
  { id: 209, ...c(27), title: "Coral Reef Colors", caption: "Vibrant coral reef teeming with marine life.", imageUrl: "https://picsum.photos/800/1000?random=2704", sourceType: "upload", viewCount: 765, likeCount: 289, commentCount: 38, saveCount: 78, createdAt: now(), tags: ["coral", "ocean", "underwater", "marine", "nature"] },
  { id: 210, ...c(27), title: "Wave Crashing", caption: "A powerful ocean wave caught at the perfect moment.", imageUrl: "https://picsum.photos/800/1000?random=2752", sourceType: "upload", viewCount: 654, likeCount: 245, commentCount: 31, saveCount: 67, createdAt: now(), tags: ["wave", "ocean", "surf", "nature", "power"] },
];

const comments = [
  { id: 1, imageId: 1, userId: 1, username: "arjun_shoots", fullName: "Arjun Mehta", avatarUrl: null, body: "What a stunning shot!", createdAt: now() },
  { id: 2, imageId: 1, userId: 2, username: "priya_captures", fullName: "Priya Sharma", avatarUrl: null, body: "The colors are absolutely magical.", createdAt: now() }
];

const liked = new Set();
const saved = new Set();

const createImage = (payload) => {
  const cr = creators.find(x => x.id === (payload.userId || 1)) || creators[0];
  const image = {
    id: nextImageId++,
    userId: payload.userId || 1,
    title: payload.title || "Untitled Creation",
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
    username: cr.username,
    authorName: cr.fullName,
    authorAvatarUrl: cr.avatarUrl,
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
    username: creators[0].username,
    fullName: creators[0].fullName,
    avatarUrl: creators[0].avatarUrl,
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
  searchUsers: (term) => {
    const q = term.toLowerCase();
    return creators.filter(cr => cr.username.includes(q) || cr.fullName.toLowerCase().includes(q));
  },
  searchTags: (term) => {
    const q = term.replace(/^#/, "").toLowerCase();
    const counts = new Map();
    images.flatMap((image) => image.tags || []).forEach((tag) => counts.set(tag, (counts.get(tag) || 0) + 1));
    return Array.from(counts.entries())
      .filter(([name]) => name.includes(q))
      .map(([name, imageCount], index) => ({ id: index + 1, name, imageCount }));
  }
};
