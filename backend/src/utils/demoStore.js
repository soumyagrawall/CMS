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
  { id: 1, ...c(3), title: "Virat Kohli Cover Drive", caption: "The king plays a stunning cover drive at Wankhede.", imageUrl: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800&q=80", sourceType: "upload", viewCount: 890, likeCount: 312, commentCount: 45, saveCount: 89, createdAt: now(), tags: ["cricket", "india", "sports", "virat"] },
  { id: 2, ...c(3), title: "Cricket Stadium Lights", caption: "The electric atmosphere of an IPL night match.", imageUrl: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&q=80", sourceType: "upload", viewCount: 654, likeCount: 201, commentCount: 22, saveCount: 55, createdAt: now(), tags: ["cricket", "stadium", "ipl", "sports"] },
  { id: 3, ...c(3), title: "Gully Cricket", caption: "Kids playing cricket in the narrow lanes of Old Delhi.", imageUrl: "https://images.unsplash.com/photo-1624526267942-ab0ff8a3e972?w=800&q=80", sourceType: "upload", viewCount: 432, likeCount: 156, commentCount: 18, saveCount: 42, createdAt: now(), tags: ["cricket", "india", "street", "kids"] },
  { id: 4, ...c(3), title: "Cricket Bat & Ball", caption: "The tools of the gentleman's game.", imageUrl: "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=800&q=80", sourceType: "upload", viewCount: 321, likeCount: 98, commentCount: 8, saveCount: 34, createdAt: now(), tags: ["cricket", "sports", "closeup", "equipment"] },
  { id: 5, ...c(3), title: "Indian Cricket Fans", caption: "Passionate fans painted in tricolor cheering at the stadium.", imageUrl: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&q=80", sourceType: "upload", viewCount: 567, likeCount: 234, commentCount: 31, saveCount: 67, createdAt: now(), tags: ["cricket", "india", "fans", "celebration"] },

  // ═══════════════════════════════════════════════════════════════════
  // BOLLYWOOD & INDIAN CINEMA (tags: bollywood, cinema, india)
  // ═══════════════════════════════════════════════════════════════════
  { id: 6, ...c(9), title: "Bollywood Dance Scene", caption: "Vibrant colors and energy of a Bollywood dance number.", imageUrl: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&q=80", sourceType: "upload", viewCount: 765, likeCount: 287, commentCount: 39, saveCount: 78, createdAt: now(), tags: ["bollywood", "dance", "cinema", "india"] },
  { id: 7, ...c(9), title: "Film City Mumbai", caption: "Behind the scenes at Goregaon Film City.", imageUrl: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800&q=80", sourceType: "upload", viewCount: 543, likeCount: 187, commentCount: 25, saveCount: 56, createdAt: now(), tags: ["bollywood", "mumbai", "cinema", "filmmaking"] },
  { id: 8, ...c(9), title: "Movie Poster Wall", caption: "Vintage hand-painted Bollywood movie posters on a Mumbai street.", imageUrl: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&q=80", sourceType: "upload", viewCount: 432, likeCount: 154, commentCount: 19, saveCount: 47, createdAt: now(), tags: ["bollywood", "art", "vintage", "poster"] },
  { id: 9, ...c(9), title: "Cinema Hall Nostalgia", caption: "The charm of old single-screen theaters in India.", imageUrl: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&q=80", sourceType: "upload", viewCount: 387, likeCount: 134, commentCount: 14, saveCount: 39, createdAt: now(), tags: ["cinema", "nostalgia", "india", "theater"] },

  // ═══════════════════════════════════════════════════════════════════
  // INDIAN TRAVEL & MONUMENTS (tags: travel, india, monument, architecture)
  // ═══════════════════════════════════════════════════════════════════
  { id: 10, ...c(2), title: "Taj Mahal at Sunrise", caption: "The icon of eternal love bathed in golden morning light.", imageUrl: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&q=80", sourceType: "upload", viewCount: 1200, likeCount: 456, commentCount: 67, saveCount: 123, createdAt: now(), tags: ["tajmahal", "india", "travel", "monument", "agra"] },
  { id: 11, ...c(8), title: "Jaipur Pink City", caption: "The stunning rose-colored architecture of Hawa Mahal.", imageUrl: "https://images.unsplash.com/photo-1599839619722-39751411ea63?w=800&q=80", sourceType: "upload", viewCount: 876, likeCount: 312, commentCount: 42, saveCount: 89, createdAt: now(), tags: ["jaipur", "rajasthan", "india", "architecture", "travel"] },
  { id: 12, ...c(8), title: "Kerala Backwaters", caption: "A houseboat gliding through the serene backwaters.", imageUrl: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&q=80", sourceType: "upload", viewCount: 765, likeCount: 278, commentCount: 35, saveCount: 76, createdAt: now(), tags: ["kerala", "backwaters", "india", "travel", "nature"] },
  { id: 13, ...c(2), title: "Varanasi Evening Aarti", caption: "The mesmerizing Ganga Aarti at Dashashwamedh Ghat.", imageUrl: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=800&q=80", sourceType: "upload", viewCount: 987, likeCount: 389, commentCount: 54, saveCount: 102, createdAt: now(), tags: ["varanasi", "spiritual", "india", "ganges", "ritual"] },
  { id: 14, ...c(11), title: "Golden Temple Amritsar", caption: "The divine Harmandir Sahib reflecting in the sacred pool.", imageUrl: "https://images.unsplash.com/photo-1582650824241-115f5c35848c?w=800&q=80", sourceType: "upload", viewCount: 1100, likeCount: 445, commentCount: 61, saveCount: 115, createdAt: now(), tags: ["goldentemple", "amritsar", "india", "spiritual", "sikh"] },
  { id: 15, ...c(8), title: "Ladakh Pangong Lake", caption: "The stunning blue waters of Pangong Tso at 14,000 feet.", imageUrl: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800&q=80", sourceType: "upload", viewCount: 890, likeCount: 334, commentCount: 47, saveCount: 92, createdAt: now(), tags: ["ladakh", "lake", "india", "mountains", "travel"] },
  { id: 16, ...c(11), title: "Qutub Minar Delhi", caption: "The soaring 73-meter victory tower of Delhi.", imageUrl: "https://images.unsplash.com/photo-1598285918731-f2f53d49df29?w=800&q=80", sourceType: "upload", viewCount: 654, likeCount: 234, commentCount: 28, saveCount: 63, createdAt: now(), tags: ["delhi", "monument", "india", "history", "architecture"] },
  { id: 17, ...c(2), title: "Mysore Palace Illuminated", caption: "97,000 bulbs light up Mysore Palace on Sunday evenings.", imageUrl: "https://images.unsplash.com/photo-1600100397608-f010f438a3ee?w=800&q=80", sourceType: "upload", viewCount: 765, likeCount: 287, commentCount: 36, saveCount: 78, createdAt: now(), tags: ["mysore", "palace", "india", "night", "architecture"] },
  { id: 18, ...c(8), title: "Hampi Boulders", caption: "Surreal boulder landscape of the ancient Vijayanagara empire.", imageUrl: "https://images.unsplash.com/photo-1600010996482-eb0d50711cc9?w=800&q=80", sourceType: "upload", viewCount: 543, likeCount: 198, commentCount: 24, saveCount: 54, createdAt: now(), tags: ["hampi", "ruins", "india", "history", "travel"] },
  { id: 19, ...c(11), title: "Konark Sun Temple", caption: "The magnificent 13th-century temple shaped as a chariot.", imageUrl: "https://images.unsplash.com/photo-1620247953245-c1e1dc503d40?w=800&q=80", sourceType: "upload", viewCount: 432, likeCount: 167, commentCount: 19, saveCount: 45, createdAt: now(), tags: ["konark", "temple", "india", "architecture", "heritage"] },
  { id: 20, ...c(2), title: "Gateway of India", caption: "Mumbai's iconic arch overlooking the Arabian Sea.", imageUrl: "https://images.unsplash.com/photo-1566552881560-0be862a7c445?w=800&q=80", sourceType: "upload", viewCount: 876, likeCount: 312, commentCount: 41, saveCount: 84, createdAt: now(), tags: ["mumbai", "monument", "india", "sea", "travel"] },
  { id: 21, ...c(8), title: "Rishikesh River Rafting", caption: "Adventure seekers tackling the rapids of the Ganges.", imageUrl: "https://images.unsplash.com/photo-1593693411515-c20261bcad6e?w=800&q=80", sourceType: "upload", viewCount: 654, likeCount: 245, commentCount: 32, saveCount: 67, createdAt: now(), tags: ["rishikesh", "adventure", "india", "rafting", "river"] },
  { id: 22, ...c(11), title: "Charminar Hyderabad", caption: "The magnificent four-towered monument of the Deccan.", imageUrl: "https://images.unsplash.com/photo-1623063539820-2b1d3d63c267?w=800&q=80", sourceType: "upload", viewCount: 543, likeCount: 198, commentCount: 25, saveCount: 56, createdAt: now(), tags: ["hyderabad", "charminar", "india", "monument", "history"] },
  { id: 23, ...c(8), title: "Udaipur Lake Palace", caption: "The floating white marble palace on Lake Pichola.", imageUrl: "https://images.unsplash.com/photo-1585698308436-c0c1b7d579ef?w=800&q=80", sourceType: "upload", viewCount: 765, likeCount: 287, commentCount: 38, saveCount: 72, createdAt: now(), tags: ["udaipur", "palace", "india", "lake", "rajasthan"] },

  // ═══════════════════════════════════════════════════════════════════
  // INDIAN FOOD (tags: food, india, streetfood, cuisine)
  // ═══════════════════════════════════════════════════════════════════
  { id: 24, ...c(4), title: "Indian Thali Feast", caption: "A grand vegetarian thali with 20+ dishes.", imageUrl: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=800&q=80", sourceType: "upload", viewCount: 876, likeCount: 345, commentCount: 48, saveCount: 98, createdAt: now(), tags: ["food", "thali", "india", "cuisine", "vegetarian"] },
  { id: 25, ...c(10), title: "Mumbai Vada Pav", caption: "The king of Mumbai street food.", imageUrl: "https://images.unsplash.com/photo-1606491956689-2ea866880049?w=800&q=80", sourceType: "upload", viewCount: 654, likeCount: 267, commentCount: 35, saveCount: 72, createdAt: now(), tags: ["food", "streetfood", "mumbai", "india", "snack"] },
  { id: 26, ...c(4), title: "Spice Market Colors", caption: "Vibrant heaps of turmeric, chili, and cumin at Khari Baoli.", imageUrl: "https://images.unsplash.com/photo-1596646146032-15be9b1dce67?w=800&q=80", sourceType: "upload", viewCount: 765, likeCount: 289, commentCount: 37, saveCount: 82, createdAt: now(), tags: ["spices", "food", "india", "market", "colors"] },
  { id: 27, ...c(10), title: "Hyderabadi Biryani", caption: "Layers of fragrant dum biryani cooked to perfection.", imageUrl: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&q=80", sourceType: "upload", viewCount: 987, likeCount: 398, commentCount: 56, saveCount: 112, createdAt: now(), tags: ["biryani", "food", "india", "hyderabad", "rice"] },
  { id: 28, ...c(4), title: "Chai on the Tracks", caption: "Cutting chai served in clay cups at a railway station.", imageUrl: "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=800&q=80", sourceType: "upload", viewCount: 543, likeCount: 212, commentCount: 27, saveCount: 58, createdAt: now(), tags: ["chai", "food", "india", "train", "street"] },
  { id: 29, ...c(10), title: "South Indian Dosa", caption: "A crispy golden dosa with sambar and chutney.", imageUrl: "https://images.unsplash.com/photo-1630383249896-424e482df921?w=800&q=80", sourceType: "upload", viewCount: 654, likeCount: 245, commentCount: 31, saveCount: 67, createdAt: now(), tags: ["dosa", "food", "india", "southindian", "breakfast"] },
  { id: 30, ...c(4), title: "Samosa Plate", caption: "Hot, crispy samosas with green chutney.", imageUrl: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&q=80", sourceType: "upload", viewCount: 765, likeCount: 298, commentCount: 39, saveCount: 79, createdAt: now(), tags: ["samosa", "food", "india", "snack", "streetfood"] },
  { id: 31, ...c(10), title: "Jalebi Swirl", caption: "Freshly fried jalebis dripping in saffron sugar syrup.", imageUrl: "https://images.unsplash.com/photo-1666190100494-b46d0a16d0f7?w=800&q=80", sourceType: "upload", viewCount: 543, likeCount: 213, commentCount: 28, saveCount: 58, createdAt: now(), tags: ["jalebi", "sweets", "food", "india", "dessert"] },
  { id: 32, ...c(4), title: "Pani Puri Cart", caption: "The most loved chaat being assembled by an expert hand.", imageUrl: "https://images.unsplash.com/photo-1625398407796-82650a8c135f?w=800&q=80", sourceType: "upload", viewCount: 654, likeCount: 256, commentCount: 34, saveCount: 69, createdAt: now(), tags: ["panipuri", "streetfood", "food", "india", "chaat"] },

  // ═══════════════════════════════════════════════════════════════════
  // INDIAN FESTIVALS (tags: diwali, holi, festival, india)
  // ═══════════════════════════════════════════════════════════════════
  { id: 33, ...c(2), title: "Diwali Diyas", caption: "Rows of earthen lamps illuminating the night.", imageUrl: "https://images.unsplash.com/photo-1508236720235-5b4cf59275e5?w=800&q=80", sourceType: "upload", viewCount: 1100, likeCount: 445, commentCount: 63, saveCount: 118, createdAt: now(), tags: ["diwali", "festival", "india", "light", "celebration"] },
  { id: 34, ...c(2), title: "Holi Colors Explosion", caption: "Faces covered in vibrant gulaal during the festival of colors.", imageUrl: "https://images.unsplash.com/photo-1576398289164-c48dc021b4e1?w=800&q=80", sourceType: "upload", viewCount: 987, likeCount: 398, commentCount: 54, saveCount: 104, createdAt: now(), tags: ["holi", "festival", "india", "colors", "celebration"] },
  { id: 35, ...c(15), title: "Durga Puja Pandal", caption: "An elaborately decorated pandal during Durga Puja in Kolkata.", imageUrl: "https://images.unsplash.com/photo-1575384043001-fa89df641a17?w=800&q=80", sourceType: "upload", viewCount: 765, likeCount: 287, commentCount: 38, saveCount: 78, createdAt: now(), tags: ["durgapuja", "festival", "kolkata", "india", "culture"] },
  { id: 36, ...c(15), title: "Ganesh Chaturthi", caption: "An enormous Ganesh idol during the immersion procession.", imageUrl: "https://images.unsplash.com/photo-1567591370504-ed4fd8300b88?w=800&q=80", sourceType: "upload", viewCount: 876, likeCount: 334, commentCount: 46, saveCount: 89, createdAt: now(), tags: ["ganesh", "festival", "mumbai", "india", "spiritual"] },
  { id: 37, ...c(2), title: "Navratri Garba Night", caption: "Whirling dancers in colorful chaniya cholis.", imageUrl: "https://images.unsplash.com/photo-1533158307587-828f0a76ef46?w=800&q=80", sourceType: "upload", viewCount: 654, likeCount: 256, commentCount: 33, saveCount: 69, createdAt: now(), tags: ["navratri", "garba", "festival", "india", "dance"] },
  { id: 38, ...c(15), title: "Onam Pookalam", caption: "Intricate flower rangoli design for the harvest festival.", imageUrl: "https://images.unsplash.com/photo-1598431429388-e3eb95519dec?w=800&q=80", sourceType: "upload", viewCount: 543, likeCount: 198, commentCount: 25, saveCount: 54, createdAt: now(), tags: ["onam", "festival", "kerala", "india", "flowers"] },
  { id: 39, ...c(2), title: "Makar Sankranti Kites", caption: "A sky full of colorful kites over Ahmedabad.", imageUrl: "https://images.unsplash.com/photo-1583753075968-1236ccb83c66?w=800&q=80", sourceType: "upload", viewCount: 432, likeCount: 167, commentCount: 21, saveCount: 45, createdAt: now(), tags: ["kite", "festival", "india", "sankranti", "sky"] },
  { id: 40, ...c(24), title: "Pushkar Mela Camels", caption: "Decorated camels at the Pushkar Camel Fair in Rajasthan.", imageUrl: "https://images.unsplash.com/photo-1596547609652-9cb5b42a98f7?w=800&q=80", sourceType: "upload", viewCount: 654, likeCount: 245, commentCount: 31, saveCount: 67, createdAt: now(), tags: ["pushkar", "rajasthan", "camels", "festival", "india"] },

  // ═══════════════════════════════════════════════════════════════════
  // INDIAN WILDLIFE (tags: wildlife, india, tiger, nature)
  // ═══════════════════════════════════════════════════════════════════
  { id: 41, ...c(5), title: "Bengal Tiger Resting", caption: "A majestic Royal Bengal Tiger in Ranthambore.", imageUrl: "https://images.unsplash.com/photo-1602491453631-e2a5ad90a131?w=800&q=80", sourceType: "upload", viewCount: 1200, likeCount: 478, commentCount: 67, saveCount: 134, createdAt: now(), tags: ["tiger", "wildlife", "india", "ranthambore", "nature"] },
  { id: 42, ...c(5), title: "Indian Peacock Display", caption: "The national bird of India in full glory.", imageUrl: "https://images.unsplash.com/photo-1587402636294-f25081b2d35c?w=800&q=80", sourceType: "upload", viewCount: 876, likeCount: 345, commentCount: 46, saveCount: 92, createdAt: now(), tags: ["peacock", "bird", "wildlife", "india", "nature"] },
  { id: 43, ...c(5), title: "Indian Elephant Festival", caption: "A beautifully decorated temple elephant in Kerala.", imageUrl: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=800&q=80", sourceType: "upload", viewCount: 765, likeCount: 289, commentCount: 38, saveCount: 78, createdAt: now(), tags: ["elephant", "wildlife", "india", "kerala", "culture"] },
  { id: 44, ...c(5), title: "Asiatic Lion", caption: "The rare Asiatic Lion in the Gir Forest of Gujarat.", imageUrl: "https://images.unsplash.com/photo-1614027164847-1b28cfe1df60?w=800&q=80", sourceType: "upload", viewCount: 654, likeCount: 256, commentCount: 33, saveCount: 69, createdAt: now(), tags: ["lion", "wildlife", "india", "gujarat", "gir"] },
  { id: 45, ...c(5), title: "Kingfisher Bird", caption: "A vibrant kingfisher perched over a still pond.", imageUrl: "https://images.unsplash.com/photo-1579380656108-f98e4df8ea62?w=800&q=80", sourceType: "upload", viewCount: 543, likeCount: 212, commentCount: 27, saveCount: 58, createdAt: now(), tags: ["kingfisher", "bird", "wildlife", "india", "nature"] },
  { id: 46, ...c(5), title: "Himalayan Snow Leopard", caption: "The ghost of the mountains in Spiti Valley.", imageUrl: "https://images.unsplash.com/photo-1456926631375-92c8ce872def?w=800&q=80", sourceType: "upload", viewCount: 987, likeCount: 398, commentCount: 54, saveCount: 112, createdAt: now(), tags: ["snowleopard", "wildlife", "himalayas", "india", "rare"] },

  // ═══════════════════════════════════════════════════════════════════
  // INDIAN CULTURE & DANCE (tags: dance, culture, tradition, india)
  // ═══════════════════════════════════════════════════════════════════
  { id: 47, ...c(16), title: "Kathakali Performance", caption: "The elaborate makeup and costume of Kerala's classical dance.", imageUrl: "https://images.unsplash.com/photo-1621696009855-6802f06b6eb8?w=800&q=80", sourceType: "upload", viewCount: 765, likeCount: 289, commentCount: 38, saveCount: 78, createdAt: now(), tags: ["kathakali", "dance", "kerala", "india", "culture"] },
  { id: 48, ...c(16), title: "Bharatanatyam Pose", caption: "A dancer frozen in a powerful Bharatanatyam stance.", imageUrl: "https://images.unsplash.com/photo-1547153760-18fc86c4afcb?w=800&q=80", sourceType: "upload", viewCount: 654, likeCount: 245, commentCount: 31, saveCount: 67, createdAt: now(), tags: ["bharatanatyam", "dance", "classical", "india", "art"] },
  { id: 49, ...c(14), title: "Rajasthani Puppets", caption: "Colorful string puppets from the desert state.", imageUrl: "https://images.unsplash.com/photo-1582738411706-bfc8e691d1c2?w=800&q=80", sourceType: "upload", viewCount: 432, likeCount: 167, commentCount: 21, saveCount: 45, createdAt: now(), tags: ["rajasthan", "puppet", "art", "india", "culture"] },
  { id: 50, ...c(14), title: "Indian Wedding Ceremony", caption: "The vibrant rituals of a traditional Hindu wedding.", imageUrl: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=800&q=80", sourceType: "upload", viewCount: 876, likeCount: 334, commentCount: 47, saveCount: 92, createdAt: now(), tags: ["wedding", "india", "tradition", "culture", "celebration"] },
  { id: 51, ...c(14), title: "Mehndi Art", caption: "Intricate henna designs on a bride's hands.", imageUrl: "https://images.unsplash.com/photo-1600369672770-985fd30004eb?w=800&q=80", sourceType: "upload", viewCount: 654, likeCount: 256, commentCount: 33, saveCount: 69, createdAt: now(), tags: ["mehndi", "henna", "india", "art", "wedding"] },
  { id: 52, ...c(14), title: "Bangle Market", caption: "Glittering stacks of colorful bangles in a bustling bazaar.", imageUrl: "https://images.unsplash.com/photo-1614210080649-6f5dfdb4e0ff?w=800&q=80", sourceType: "upload", viewCount: 543, likeCount: 198, commentCount: 25, saveCount: 54, createdAt: now(), tags: ["bangles", "market", "india", "colorful", "shopping"] },
  { id: 53, ...c(14), title: "Indian Silk Sarees", caption: "Gorgeous Kanchipuram silk sarees draped on display.", imageUrl: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&q=80", sourceType: "upload", viewCount: 654, likeCount: 245, commentCount: 31, saveCount: 67, createdAt: now(), tags: ["saree", "fashion", "india", "silk", "tradition"] },

  // ═══════════════════════════════════════════════════════════════════
  // INDIAN NATURE & LANDSCAPES (tags: mountains, beach, nature, india)
  // ═══════════════════════════════════════════════════════════════════
  { id: 54, ...c(13), title: "Himalayan Sunrise", caption: "Dawn breaking over the snow-capped peaks of the Himalayas.", imageUrl: "https://images.unsplash.com/photo-1581404172551-7abde123d6fa?w=800&q=80", sourceType: "upload", viewCount: 987, likeCount: 389, commentCount: 54, saveCount: 104, createdAt: now(), tags: ["himalayas", "mountains", "india", "sunrise", "nature"] },
  { id: 55, ...c(13), title: "Goa Beach Sunset", caption: "Golden hour on the beaches of Goa.", imageUrl: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&q=80", sourceType: "upload", viewCount: 876, likeCount: 334, commentCount: 47, saveCount: 89, createdAt: now(), tags: ["goa", "beach", "sunset", "india", "travel"] },
  { id: 56, ...c(13), title: "Spiti Valley Road", caption: "The winding mountain road through Spiti's lunar landscape.", imageUrl: "https://images.unsplash.com/photo-1604959114757-b12e126ff48a?w=800&q=80", sourceType: "upload", viewCount: 765, likeCount: 287, commentCount: 38, saveCount: 78, createdAt: now(), tags: ["spiti", "mountains", "india", "road", "adventure"] },
  { id: 57, ...c(13), title: "Munnar Tea Gardens", caption: "Rolling green tea plantations in the hills of Kerala.", imageUrl: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=800&q=80", sourceType: "upload", viewCount: 654, likeCount: 245, commentCount: 31, saveCount: 67, createdAt: now(), tags: ["munnar", "tea", "kerala", "india", "green"] },
  { id: 58, ...c(13), title: "Andaman Clear Waters", caption: "Crystal-clear turquoise waters of Havelock Island.", imageUrl: "https://images.unsplash.com/photo-1601235128090-e5bf41416fb8?w=800&q=80", sourceType: "upload", viewCount: 876, likeCount: 334, commentCount: 47, saveCount: 89, createdAt: now(), tags: ["andaman", "beach", "island", "india", "ocean"] },
  { id: 59, ...c(13), title: "Darjeeling Hills", caption: "Misty morning view of the tea gardens and Kanchenjunga.", imageUrl: "https://images.unsplash.com/photo-1567087611737-020c6a51d451?w=800&q=80", sourceType: "upload", viewCount: 654, likeCount: 245, commentCount: 31, saveCount: 67, createdAt: now(), tags: ["darjeeling", "hills", "tea", "india", "mountains"] },
  { id: 60, ...c(13), title: "Rann of Kutch", caption: "The vast white salt desert of Gujarat under moonlight.", imageUrl: "https://images.unsplash.com/photo-1592237000305-651fc897d287?w=800&q=80", sourceType: "upload", viewCount: 765, likeCount: 287, commentCount: 38, saveCount: 78, createdAt: now(), tags: ["kutch", "desert", "india", "gujarat", "nature"] },
  { id: 61, ...c(13), title: "Dal Lake Kashmir", caption: "Shikaras floating on the mirror-like Dal Lake.", imageUrl: "https://images.unsplash.com/photo-1610471242371-d8ec76e0ffc7?w=800&q=80", sourceType: "upload", viewCount: 876, likeCount: 334, commentCount: 47, saveCount: 89, createdAt: now(), tags: ["kashmir", "lake", "india", "shikara", "nature"] },
  { id: 62, ...c(28), title: "Milky Way over Ladakh", caption: "Astrophotography capturing the galaxy over Hanle.", imageUrl: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&q=80", sourceType: "upload", viewCount: 987, likeCount: 398, commentCount: 54, saveCount: 112, createdAt: now(), tags: ["astrophotography", "ladakh", "india", "milkyway", "night"] },
  { id: 63, ...c(13), title: "Coorg Coffee Plantation", caption: "Lush coffee estates in the Scotland of India.", imageUrl: "https://images.unsplash.com/photo-1559525839-b184a4d698c7?w=800&q=80", sourceType: "upload", viewCount: 543, likeCount: 198, commentCount: 25, saveCount: 54, createdAt: now(), tags: ["coorg", "coffee", "india", "plantation", "green"] },

  // ═══════════════════════════════════════════════════════════════════
  // INDIAN STREET LIFE & CITY (tags: street, city, india, urban)
  // ═══════════════════════════════════════════════════════════════════
  { id: 64, ...c(1), title: "Mumbai Local Train", caption: "The lifeline of Mumbai during rush hour.", imageUrl: "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=800&q=80", sourceType: "upload", viewCount: 876, likeCount: 334, commentCount: 47, saveCount: 89, createdAt: now(), tags: ["mumbai", "train", "india", "city", "commute"] },
  { id: 65, ...c(25), title: "Jodhpur Blue City", caption: "The mesmerizing blue-painted houses of Jodhpur.", imageUrl: "https://images.unsplash.com/photo-1596700755919-8669c58ea618?w=800&q=80", sourceType: "upload", viewCount: 765, likeCount: 287, commentCount: 38, saveCount: 78, createdAt: now(), tags: ["jodhpur", "blue", "city", "india", "rajasthan"] },
  { id: 66, ...c(1), title: "Auto Rickshaw Mumbai", caption: "The ubiquitous three-wheeler weaving through traffic.", imageUrl: "https://images.unsplash.com/photo-1548345680-f5475ea90818?w=800&q=80", sourceType: "upload", viewCount: 543, likeCount: 198, commentCount: 25, saveCount: 54, createdAt: now(), tags: ["autorickshaw", "india", "street", "mumbai", "transport"] },
  { id: 67, ...c(25), title: "Old Delhi Chandni Chowk", caption: "The bustling narrow lanes of Shahjahanabad.", imageUrl: "https://images.unsplash.com/photo-1570168007204-dfb528c6858f?w=800&q=80", sourceType: "upload", viewCount: 654, likeCount: 245, commentCount: 31, saveCount: 67, createdAt: now(), tags: ["delhi", "street", "india", "market", "old"] },
  { id: 68, ...c(1), title: "Pondicherry French Quarter", caption: "Charming yellow colonial buildings on the coast.", imageUrl: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80", sourceType: "upload", viewCount: 543, likeCount: 198, commentCount: 25, saveCount: 54, createdAt: now(), tags: ["pondicherry", "french", "india", "architecture", "coast"] },
  { id: 69, ...c(25), title: "Kolkata Yellow Tram", caption: "The last surviving tram network in India.", imageUrl: "https://images.unsplash.com/photo-1558431382-27e303142255?w=800&q=80", sourceType: "upload", viewCount: 432, likeCount: 167, commentCount: 21, saveCount: 45, createdAt: now(), tags: ["kolkata", "tram", "india", "vintage", "city"] },
  { id: 70, ...c(25), title: "Street Art Mumbai", caption: "Colorful graffiti on the walls of Bandra.", imageUrl: "https://images.unsplash.com/photo-1583225214464-9296029427aa?w=800&q=80", sourceType: "upload", viewCount: 543, likeCount: 212, commentCount: 28, saveCount: 58, createdAt: now(), tags: ["streetart", "graffiti", "mumbai", "india", "art"] },

  // ═══════════════════════════════════════════════════════════════════
  // INDIAN SPIRITUAL & YOGA (tags: yoga, spiritual, meditation, temple)
  // ═══════════════════════════════════════════════════════════════════
  { id: 71, ...c(15), title: "Yoga at Sunrise", caption: "A practitioner in tree pose on the banks of the Ganges.", imageUrl: "https://images.unsplash.com/photo-1545389336-cf090694435e?w=800&q=80", sourceType: "upload", viewCount: 876, likeCount: 345, commentCount: 47, saveCount: 92, createdAt: now(), tags: ["yoga", "spiritual", "india", "rishikesh", "wellness"] },
  { id: 72, ...c(15), title: "Temple Bell", caption: "A brass bell in a centuries-old Hindu temple.", imageUrl: "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?w=800&q=80", sourceType: "upload", viewCount: 654, likeCount: 245, commentCount: 31, saveCount: 67, createdAt: now(), tags: ["temple", "spiritual", "india", "bell", "tradition"] },
  { id: 73, ...c(15), title: "Auroville Matrimandir", caption: "The golden sphere of meditation in Tamil Nadu.", imageUrl: "https://images.unsplash.com/photo-1623910271183-5c8e31f8221b?w=800&q=80", sourceType: "upload", viewCount: 543, likeCount: 198, commentCount: 25, saveCount: 54, createdAt: now(), tags: ["auroville", "spiritual", "india", "meditation", "peace"] },
  { id: 74, ...c(15), title: "Varanasi Morning Prayers", caption: "Sadhus performing morning rituals at the ghats.", imageUrl: "https://images.unsplash.com/photo-1550974868-52fb58dc1801?w=800&q=80", sourceType: "upload", viewCount: 876, likeCount: 334, commentCount: 47, saveCount: 89, createdAt: now(), tags: ["varanasi", "spiritual", "india", "prayer", "morning"] },

  // ═══════════════════════════════════════════════════════════════════
  // INDIAN ART & CRAFT (tags: art, craft, handmade, india)
  // ═══════════════════════════════════════════════════════════════════
  { id: 75, ...c(6), title: "Indian Potter at Work", caption: "Skilled hands shaping clay on a traditional wheel.", imageUrl: "https://images.unsplash.com/photo-1592864696081-30d0fb9254c2?w=800&q=80", sourceType: "upload", viewCount: 543, likeCount: 198, commentCount: 25, saveCount: 54, createdAt: now(), tags: ["pottery", "craft", "india", "artisan", "handmade"] },
  { id: 76, ...c(6), title: "Madhubani Painting", caption: "Traditional folk art from Bihar with vibrant geometric patterns.", imageUrl: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&q=80", sourceType: "upload", viewCount: 432, likeCount: 167, commentCount: 21, saveCount: 45, createdAt: now(), tags: ["madhubani", "art", "india", "folk", "painting"] },
  { id: 77, ...c(6), title: "Rangoli Design", caption: "An intricate floor art design made with colored powders.", imageUrl: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=800&q=80", sourceType: "upload", viewCount: 654, likeCount: 245, commentCount: 31, saveCount: 67, createdAt: now(), tags: ["rangoli", "art", "india", "festival", "design"] },
  { id: 78, ...c(6), title: "Block Printing Jaipur", caption: "Hand-carved wooden blocks creating textile patterns.", imageUrl: "https://images.unsplash.com/photo-1590422749897-47036da0b0ff?w=800&q=80", sourceType: "upload", viewCount: 432, likeCount: 167, commentCount: 21, saveCount: 45, createdAt: now(), tags: ["blockprint", "craft", "jaipur", "india", "textile"] },

  // ═══════════════════════════════════════════════════════════════════
  // INDIAN MUSIC (tags: music, india, sitar, classical)
  // ═══════════════════════════════════════════════════════════════════
  { id: 79, ...c(24), title: "Sitar in Golden Light", caption: "The strings of a sitar glowing under stage lights.", imageUrl: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=800&q=80", sourceType: "upload", viewCount: 543, likeCount: 212, commentCount: 27, saveCount: 58, createdAt: now(), tags: ["sitar", "music", "india", "classical", "instrument"] },
  { id: 80, ...c(24), title: "Tabla Rhythm", caption: "A master tabla player in deep concentration.", imageUrl: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800&q=80", sourceType: "upload", viewCount: 432, likeCount: 167, commentCount: 21, saveCount: 45, createdAt: now(), tags: ["tabla", "music", "india", "classical", "percussion"] },

  // ═══════════════════════════════════════════════════════════════════
  // INDIAN TRANSPORT & VEHICLES (tags: transport, india, train)
  // ═══════════════════════════════════════════════════════════════════
  { id: 81, ...c(1), title: "Toy Train Shimla", caption: "The heritage Kalka-Shimla railway through the mountains.", imageUrl: "https://images.unsplash.com/photo-1553701879-4ddf72a8bcc8?w=800&q=80", sourceType: "upload", viewCount: 654, likeCount: 245, commentCount: 31, saveCount: 67, createdAt: now(), tags: ["train", "shimla", "india", "heritage", "mountains"] },
  { id: 82, ...c(17), title: "Royal Enfield Ride", caption: "Bikers on Royal Enfields through the Ladakh passes.", imageUrl: "https://images.unsplash.com/photo-1558981285-6f0c94958bb6?w=800&q=80", sourceType: "upload", viewCount: 876, likeCount: 334, commentCount: 47, saveCount: 89, createdAt: now(), tags: ["royalenfield", "bike", "ladakh", "india", "adventure"] },
  { id: 83, ...c(1), title: "Cycle Rickshaw Varanasi", caption: "A hand-painted rickshaw navigating the old city streets.", imageUrl: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&q=80", sourceType: "upload", viewCount: 432, likeCount: 167, commentCount: 21, saveCount: 45, createdAt: now(), tags: ["rickshaw", "varanasi", "india", "street", "vintage"] },

  // ═══════════════════════════════════════════════════════════════════
  // INDIAN EDUCATION & CAMPUS (tags: education, india, campus)
  // ═══════════════════════════════════════════════════════════════════
  { id: 84, ...c(24), title: "IIT Campus", caption: "The iconic lecture hall architecture of an IIT campus.", imageUrl: "https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80", sourceType: "upload", viewCount: 543, likeCount: 212, commentCount: 28, saveCount: 58, createdAt: now(), tags: ["iit", "education", "india", "campus", "engineering"] },
  { id: 85, ...c(7), title: "Indian Startup Hub", caption: "Co-working space in Bangalore's tech corridor.", imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80", sourceType: "upload", viewCount: 654, likeCount: 245, commentCount: 31, saveCount: 67, createdAt: now(), tags: ["startup", "bangalore", "india", "tech", "coworking"] },

  // ═══════════════════════════════════════════════════════════════════
  // INDIAN AGRICULTURE & RURAL (tags: farming, rural, india, village)
  // ═══════════════════════════════════════════════════════════════════
  { id: 86, ...c(24), title: "Rice Paddy Fields", caption: "Emerald green rice terraces in the Western Ghats.", imageUrl: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80", sourceType: "upload", viewCount: 654, likeCount: 245, commentCount: 31, saveCount: 67, createdAt: now(), tags: ["rice", "farming", "india", "green", "rural"] },
  { id: 87, ...c(24), title: "Indian Village Morning", caption: "Smoke rising from mud huts in rural Rajasthan.", imageUrl: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&q=80", sourceType: "upload", viewCount: 432, likeCount: 167, commentCount: 21, saveCount: 45, createdAt: now(), tags: ["village", "rural", "india", "rajasthan", "morning"] },
  { id: 88, ...c(24), title: "Mustard Fields Punjab", caption: "Endless yellow mustard fields stretching to the horizon.", imageUrl: "https://images.unsplash.com/photo-1495107334309-fcf20504a5ab?w=800&q=80", sourceType: "upload", viewCount: 543, likeCount: 198, commentCount: 25, saveCount: 54, createdAt: now(), tags: ["mustard", "punjab", "india", "farming", "yellow"] },

  // ═══════════════════════════════════════════════════════════════════
  // INDIAN FITNESS & SPORTS (tags: fitness, sports, india)
  // ═══════════════════════════════════════════════════════════════════
  { id: 89, ...c(26), title: "Kushti Wrestling", caption: "Traditional Indian mud wrestling at an akhara.", imageUrl: "https://images.unsplash.com/photo-1517438322307-e67111335449?w=800&q=80", sourceType: "upload", viewCount: 543, likeCount: 212, commentCount: 28, saveCount: 58, createdAt: now(), tags: ["kushti", "wrestling", "india", "sports", "tradition"] },
  { id: 90, ...c(26), title: "Morning Yoga Class", caption: "Group yoga session at sunrise on Marina Beach.", imageUrl: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80", sourceType: "upload", viewCount: 654, likeCount: 245, commentCount: 31, saveCount: 67, createdAt: now(), tags: ["yoga", "fitness", "india", "beach", "wellness"] },
  { id: 91, ...c(3), title: "Kabaddi Match", caption: "The intensity of a Pro Kabaddi League game.", imageUrl: "https://images.unsplash.com/photo-1461896836934-bd45ba48e298?w=800&q=80", sourceType: "upload", viewCount: 543, likeCount: 198, commentCount: 25, saveCount: 54, createdAt: now(), tags: ["kabaddi", "sports", "india", "team", "action"] },
  { id: 92, ...c(3), title: "Badminton Smash", caption: "PV Sindhu-style powerful smash in action.", imageUrl: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=800&q=80", sourceType: "upload", viewCount: 432, likeCount: 167, commentCount: 21, saveCount: 45, createdAt: now(), tags: ["badminton", "sports", "india", "olympic", "action"] },

  // ═══════════════════════════════════════════════════════════════════
  // INDIAN RAJASTHAN SPECIAL (tags: rajasthan, india, desert, fort)
  // ═══════════════════════════════════════════════════════════════════
  { id: 93, ...c(8), title: "Jaisalmer Fort", caption: "The golden fortress rising from the Thar Desert.", imageUrl: "https://images.unsplash.com/photo-1599661559864-47b2c0199e43?w=800&q=80", sourceType: "upload", viewCount: 765, likeCount: 287, commentCount: 38, saveCount: 78, createdAt: now(), tags: ["jaisalmer", "fort", "rajasthan", "india", "desert"] },
  { id: 94, ...c(8), title: "Rajasthani Folk Dance", caption: "Kalbeliya dancers whirling under desert stars.", imageUrl: "https://images.unsplash.com/photo-1504609813442-a8924e83f76e?w=800&q=80", sourceType: "upload", viewCount: 654, likeCount: 245, commentCount: 31, saveCount: 67, createdAt: now(), tags: ["rajasthan", "dance", "folk", "india", "desert"] },
  { id: 95, ...c(8), title: "Thar Desert Camels", caption: "Camel caravan crossing the golden sand dunes at sunset.", imageUrl: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800&q=80", sourceType: "upload", viewCount: 876, likeCount: 334, commentCount: 47, saveCount: 89, createdAt: now(), tags: ["thar", "desert", "camels", "rajasthan", "india"] },

  // ═══════════════════════════════════════════════════════════════════
  // INDIAN TEXTILES & FASHION (tags: fashion, textile, india)
  // ═══════════════════════════════════════════════════════════════════
  { id: 96, ...c(14), title: "Pashmina Weaving", caption: "A Kashmiri artisan weaving the world's finest wool.", imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&q=80", sourceType: "upload", viewCount: 543, likeCount: 198, commentCount: 25, saveCount: 54, createdAt: now(), tags: ["pashmina", "kashmir", "india", "weaving", "craft"] },
  { id: 97, ...c(14), title: "Turbans of Rajasthan", caption: "Colorful pagdis in every shade at a village market.", imageUrl: "https://images.unsplash.com/photo-1524230572899-a752b3835840?w=800&q=80", sourceType: "upload", viewCount: 432, likeCount: 167, commentCount: 21, saveCount: 45, createdAt: now(), tags: ["turban", "rajasthan", "fashion", "india", "colorful"] },

  // ═══════════════════════════════════════════════════════════════════
  // INDIAN NIGHTLIFE & MODERN (tags: nightlife, modern, india, city)
  // ═══════════════════════════════════════════════════════════════════
  { id: 98, ...c(1), title: "Marine Drive Night", caption: "The Queen's Necklace - Mumbai's iconic seafront at night.", imageUrl: "https://images.unsplash.com/photo-1567157577867-05ccb1388e13?w=800&q=80", sourceType: "upload", viewCount: 876, likeCount: 334, commentCount: 47, saveCount: 89, createdAt: now(), tags: ["mumbai", "night", "city", "india", "lights"] },
  { id: 99, ...c(25), title: "Bangalore IT Park", caption: "Modern glass towers of India's Silicon Valley.", imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80", sourceType: "upload", viewCount: 654, likeCount: 245, commentCount: 31, saveCount: 67, createdAt: now(), tags: ["bangalore", "tech", "modern", "india", "skyline"] },

  // ═══════════════════════════════════════════════════════════════════
  // INDIAN MONSOON (tags: monsoon, rain, india, weather)
  // ═══════════════════════════════════════════════════════════════════
  { id: 100, ...c(1), title: "Mumbai Monsoon", caption: "Rain-soaked streets of Mumbai during peak monsoon.", imageUrl: "https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?w=800&q=80", sourceType: "upload", viewCount: 654, likeCount: 245, commentCount: 31, saveCount: 67, createdAt: now(), tags: ["monsoon", "rain", "mumbai", "india", "weather"] },
  { id: 101, ...c(13), title: "Western Ghats Monsoon", caption: "Lush waterfalls cascading down the ghats.", imageUrl: "https://images.unsplash.com/photo-1432405972618-c6b0cfba8673?w=800&q=80", sourceType: "upload", viewCount: 765, likeCount: 287, commentCount: 38, saveCount: 78, createdAt: now(), tags: ["monsoon", "waterfall", "india", "nature", "green"] },
  { id: 102, ...c(1), title: "Kids Playing in Rain", caption: "Children splashing joyfully in monsoon puddles.", imageUrl: "https://images.unsplash.com/photo-1438449805896-28a666819a20?w=800&q=80", sourceType: "upload", viewCount: 543, likeCount: 212, commentCount: 28, saveCount: 58, createdAt: now(), tags: ["monsoon", "kids", "india", "joy", "rain"] },

  // ═══════════════════════════════════════════════════════════════════
  // INDIAN MARKETS (tags: market, shopping, india, bazaar)
  // ═══════════════════════════════════════════════════════════════════
  { id: 103, ...c(25), title: "Flower Market Kolkata", caption: "Mountains of marigolds at the Mallick Ghat market.", imageUrl: "https://images.unsplash.com/photo-1490750967868-88aa4f44baee?w=800&q=80", sourceType: "upload", viewCount: 654, likeCount: 245, commentCount: 31, saveCount: 67, createdAt: now(), tags: ["flowers", "market", "kolkata", "india", "marigold"] },
  { id: 104, ...c(25), title: "Jewellery Bazaar", caption: "Glittering gold and precious stones in a Jaipur bazaar.", imageUrl: "https://images.unsplash.com/photo-1515562141589-67f0d999c1db?w=800&q=80", sourceType: "upload", viewCount: 543, likeCount: 198, commentCount: 25, saveCount: 54, createdAt: now(), tags: ["jewellery", "gold", "market", "jaipur", "india"] },

  // ═══════════════════════════════════════════════════════════════════
  // INDIAN ARCHITECTURE DETAILS (tags: architecture, carving, india)
  // ═══════════════════════════════════════════════════════════════════
  { id: 105, ...c(11), title: "Meenakshi Temple Gopuram", caption: "Thousands of colorful sculptures on the towering gopuram.", imageUrl: "https://images.unsplash.com/photo-1596484552834-6a58f850e0a1?w=800&q=80", sourceType: "upload", viewCount: 765, likeCount: 287, commentCount: 38, saveCount: 78, createdAt: now(), tags: ["meenakshi", "temple", "tamilnadu", "india", "sculpture"] },
  { id: 106, ...c(11), title: "Agra Fort Red Walls", caption: "The imposing red sandstone walls of the Mughal fortress.", imageUrl: "https://images.unsplash.com/photo-1584988775837-7757b3294334?w=800&q=80", sourceType: "upload", viewCount: 654, likeCount: 245, commentCount: 31, saveCount: 67, createdAt: now(), tags: ["agra", "fort", "mughal", "india", "architecture"] },
  { id: 107, ...c(11), title: "Stepwell Geometry", caption: "The mesmerizing symmetry of Chand Baori stepwell.", imageUrl: "https://images.unsplash.com/photo-1590071089561-2f59cfb74f95?w=800&q=80", sourceType: "upload", viewCount: 876, likeCount: 334, commentCount: 47, saveCount: 89, createdAt: now(), tags: ["stepwell", "geometry", "rajasthan", "india", "architecture"] },

  // ═══════════════════════════════════════════════════════════════════
  // INDIAN SWEETS & DESSERTS (tags: sweets, dessert, india, mithai)
  // ═══════════════════════════════════════════════════════════════════
  { id: 108, ...c(10), title: "Rasgulla Bowl", caption: "Soft, spongy Bengali rasgullas in sugar syrup.", imageUrl: "https://images.unsplash.com/photo-1567337710282-00832b415979?w=800&q=80", sourceType: "upload", viewCount: 543, likeCount: 212, commentCount: 28, saveCount: 58, createdAt: now(), tags: ["rasgulla", "sweets", "bengali", "india", "dessert"] },
  { id: 109, ...c(10), title: "Lassi Glass", caption: "Thick creamy mango lassi in a traditional clay glass.", imageUrl: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=800&q=80", sourceType: "upload", viewCount: 432, likeCount: 167, commentCount: 21, saveCount: 45, createdAt: now(), tags: ["lassi", "drink", "india", "mango", "refreshing"] },

  // ═══════════════════════════════════════════════════════════════════
  // INDIAN BOATS & WATERWAYS (tags: boat, water, india, fishing)
  // ═══════════════════════════════════════════════════════════════════
  { id: 110, ...c(8), title: "Kerala Fishing Nets", caption: "Chinese fishing nets of Fort Kochi at sunset.", imageUrl: "https://images.unsplash.com/photo-1590050751776-a034d3e36b01?w=800&q=80", sourceType: "upload", viewCount: 654, likeCount: 245, commentCount: 31, saveCount: 67, createdAt: now(), tags: ["fishing", "kochi", "kerala", "india", "sunset"] },
  { id: 111, ...c(8), title: "Ganges Boat Varanasi", caption: "Wooden boats lined up at the ancient ghats.", imageUrl: "https://images.unsplash.com/photo-1567001910251-1f27fb990a17?w=800&q=80", sourceType: "upload", viewCount: 543, likeCount: 198, commentCount: 25, saveCount: 54, createdAt: now(), tags: ["boat", "varanasi", "ganges", "india", "river"] },

  // ═══════════════════════════════════════════════════════════════════
  // INDIAN HERITAGE RAILWAYS (tags: heritage, railway, india)
  // ═══════════════════════════════════════════════════════════════════
  { id: 112, ...c(2), title: "Darjeeling Toy Train", caption: "The UNESCO heritage steam train puffing through clouds.", imageUrl: "https://images.unsplash.com/photo-1553701879-4ddf72a8bcc8?w=800&q=80", sourceType: "upload", viewCount: 765, likeCount: 287, commentCount: 38, saveCount: 78, createdAt: now(), tags: ["toytrain", "darjeeling", "heritage", "india", "steam"] },

  // ═══════════════════════════════════════════════════════════════════
  // INDIAN PEOPLE & PORTRAITS (tags: portrait, people, india, faces)
  // ═══════════════════════════════════════════════════════════════════
  { id: 113, ...c(24), title: "Rajasthani Elder", caption: "Weathered face telling stories of the desert.", imageUrl: "https://images.unsplash.com/photo-1545957463-5c11ccf30dcc?w=800&q=80", sourceType: "upload", viewCount: 654, likeCount: 256, commentCount: 33, saveCount: 69, createdAt: now(), tags: ["portrait", "rajasthan", "india", "people", "elder"] },
  { id: 114, ...c(24), title: "Indian School Children", caption: "Bright smiles in school uniforms heading to class.", imageUrl: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80", sourceType: "upload", viewCount: 543, likeCount: 212, commentCount: 28, saveCount: 58, createdAt: now(), tags: ["children", "school", "india", "education", "smile"] },
  { id: 115, ...c(1), title: "Chai Wallah", caption: "A tea seller pouring chai with the signature long pour.", imageUrl: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800&q=80", sourceType: "upload", viewCount: 876, likeCount: 334, commentCount: 47, saveCount: 89, createdAt: now(), tags: ["chai", "portrait", "india", "street", "tea"] },

  // ═══════════════════════════════════════════════════════════════════
  // INDIAN DIWALI SPECIAL (more diwali content)
  // ═══════════════════════════════════════════════════════════════════
  { id: 116, ...c(2), title: "Diwali Fireworks", caption: "A spectacular fireworks display over the city skyline.", imageUrl: "https://images.unsplash.com/photo-1498931299210-d53080a1b10c?w=800&q=80", sourceType: "upload", viewCount: 987, likeCount: 398, commentCount: 54, saveCount: 112, createdAt: now(), tags: ["diwali", "fireworks", "india", "night", "celebration"] },
  { id: 117, ...c(15), title: "Diwali Rangoli", caption: "A beautiful floor rangoli made for the festival of lights.", imageUrl: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=800&q=80", sourceType: "upload", viewCount: 654, likeCount: 245, commentCount: 31, saveCount: 67, createdAt: now(), tags: ["diwali", "rangoli", "india", "art", "festival"] },

  // ═══════════════════════════════════════════════════════════════════
  // NORTH EAST INDIA (tags: northeast, india, nature, tribal)
  // ═══════════════════════════════════════════════════════════════════
  { id: 118, ...c(8), title: "Meghalaya Living Root Bridge", caption: "Ancient bridges grown from living tree roots.", imageUrl: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80", sourceType: "upload", viewCount: 765, likeCount: 287, commentCount: 38, saveCount: 78, createdAt: now(), tags: ["meghalaya", "northeast", "india", "nature", "bridge"] },
  { id: 119, ...c(8), title: "Tawang Monastery", caption: "The massive Buddhist monastery perched in Arunachal Pradesh.", imageUrl: "https://images.unsplash.com/photo-1592861956120-e524fc739696?w=800&q=80", sourceType: "upload", viewCount: 543, likeCount: 198, commentCount: 25, saveCount: 54, createdAt: now(), tags: ["tawang", "monastery", "northeast", "india", "buddhist"] },
  { id: 120, ...c(8), title: "Kaziranga Rhino", caption: "The one-horned rhinoceros in Assam's famous national park.", imageUrl: "https://images.unsplash.com/photo-1535338454528-1b9456715d4e?w=800&q=80", sourceType: "upload", viewCount: 876, likeCount: 334, commentCount: 47, saveCount: 89, createdAt: now(), tags: ["kaziranga", "rhino", "wildlife", "assam", "india"] },

  // ═══════════════════════════════════════════════════════════════════
  // INDIAN DEVOTION & TEMPLES (more spiritual)
  // ═══════════════════════════════════════════════════════════════════
  { id: 121, ...c(15), title: "Tirupati Temple", caption: "Devotees at one of the world's most visited temples.", imageUrl: "https://images.unsplash.com/photo-1604340202849-c5d6c7a71810?w=800&q=80", sourceType: "upload", viewCount: 876, likeCount: 334, commentCount: 47, saveCount: 89, createdAt: now(), tags: ["tirupati", "temple", "india", "devotion", "spiritual"] },
  { id: 122, ...c(15), title: "Bodh Gaya Tree", caption: "The sacred Bodhi Tree where Buddha attained enlightenment.", imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80", sourceType: "upload", viewCount: 654, likeCount: 245, commentCount: 31, saveCount: 67, createdAt: now(), tags: ["bodhgaya", "buddhism", "india", "spiritual", "tree"] },

  // ═══════════════════════════════════════════════════════════════════
  // INDIAN JEWELRY & ACCESSORIES (tags: jewelry, gold, india)
  // ═══════════════════════════════════════════════════════════════════
  { id: 123, ...c(14), title: "Kundan Jewelry Set", caption: "Exquisite traditional bridal jewelry with precious stones.", imageUrl: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&q=80", sourceType: "upload", viewCount: 654, likeCount: 256, commentCount: 33, saveCount: 69, createdAt: now(), tags: ["jewelry", "bridal", "india", "gold", "kundan"] },
  { id: 124, ...c(14), title: "Temple Jewelry", caption: "Traditional South Indian temple jewelry designs.", imageUrl: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=80", sourceType: "upload", viewCount: 543, likeCount: 198, commentCount: 25, saveCount: 54, createdAt: now(), tags: ["jewelry", "temple", "southindian", "india", "gold"] },

  // ═══════════════════════════════════════════════════════════════════
  // MORE INDIAN FOOD (tags: food, india)
  // ═══════════════════════════════════════════════════════════════════
  { id: 125, ...c(10), title: "Tandoori Platter", caption: "Smoky tandoori chicken with mint chutney.", imageUrl: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=800&q=80", sourceType: "upload", viewCount: 765, likeCount: 289, commentCount: 38, saveCount: 78, createdAt: now(), tags: ["tandoori", "food", "india", "nonveg", "grill"] },
  { id: 126, ...c(10), title: "Chole Bhature", caption: "The iconic Punjabi breakfast of chickpea curry with fried bread.", imageUrl: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&q=80", sourceType: "upload", viewCount: 654, likeCount: 256, commentCount: 34, saveCount: 69, createdAt: now(), tags: ["cholebhature", "food", "punjabi", "india", "breakfast"] },
  { id: 127, ...c(4), title: "Pav Bhaji Mumbai", caption: "Buttery mashed vegetables with toasted pav.", imageUrl: "https://images.unsplash.com/photo-1606491956689-2ea866880049?w=800&q=80", sourceType: "upload", viewCount: 543, likeCount: 212, commentCount: 28, saveCount: 58, createdAt: now(), tags: ["pavbhaji", "food", "mumbai", "india", "streetfood"] },

  // ═══════════════════════════════════════════════════════════════════
  // SOUTH INDIA SPECIAL (tags: southindia, india)
  // ═══════════════════════════════════════════════════════════════════
  { id: 128, ...c(2), title: "Hampi Chariot", caption: "The iconic stone chariot at Vittala Temple.", imageUrl: "https://images.unsplash.com/photo-1590071089561-2f59cfb74f95?w=800&q=80", sourceType: "upload", viewCount: 654, likeCount: 245, commentCount: 31, saveCount: 67, createdAt: now(), tags: ["hampi", "temple", "karnataka", "india", "heritage"] },
  { id: 129, ...c(8), title: "Ooty Hills", caption: "The beautiful Nilgiri hills of Tamil Nadu.", imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80", sourceType: "upload", viewCount: 543, likeCount: 198, commentCount: 25, saveCount: 54, createdAt: now(), tags: ["ooty", "hills", "tamilnadu", "india", "nature"] },
  { id: 130, ...c(2), title: "Alleppey Houseboat", caption: "Cruising through Kerala's palm-fringed backwaters.", imageUrl: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=800&q=80", sourceType: "upload", viewCount: 765, likeCount: 287, commentCount: 38, saveCount: 78, createdAt: now(), tags: ["alleppey", "houseboat", "kerala", "india", "backwaters"] },

  // ═══════════════════════════════════════════════════════════════════
  // VARANASI SPECIAL (more varanasi)
  // ═══════════════════════════════════════════════════════════════════
  { id: 131, ...c(15), title: "Varanasi Silk Weaving", caption: "A master weaver creating Banarasi silk on a handloom.", imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&q=80", sourceType: "upload", viewCount: 543, likeCount: 198, commentCount: 25, saveCount: 54, createdAt: now(), tags: ["varanasi", "silk", "weaving", "india", "craft"] },
  { id: 132, ...c(15), title: "Ganga Aarti Fire", caption: "Priests performing the fire ritual with large brass lamps.", imageUrl: "https://images.unsplash.com/photo-1557800636-894a64c1696f?w=800&q=80", sourceType: "upload", viewCount: 876, likeCount: 334, commentCount: 47, saveCount: 89, createdAt: now(), tags: ["gangaaarti", "varanasi", "fire", "india", "spiritual"] },

  // ═══════════════════════════════════════════════════════════════════
  // MORE INDIAN LANDSCAPES
  // ═══════════════════════════════════════════════════════════════════
  { id: 133, ...c(13), title: "Valley of Flowers", caption: "Alpine wildflowers blooming in Uttarakhand.", imageUrl: "https://images.unsplash.com/photo-1490750967868-88aa4f44baee?w=800&q=80", sourceType: "upload", viewCount: 765, likeCount: 287, commentCount: 38, saveCount: 78, createdAt: now(), tags: ["valleyofflowers", "uttarakhand", "india", "flowers", "trek"] },
  { id: 134, ...c(13), title: "Sunset Over Thar", caption: "Golden desert sunset from Sam Sand Dunes.", imageUrl: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800&q=80", sourceType: "upload", viewCount: 654, likeCount: 245, commentCount: 31, saveCount: 67, createdAt: now(), tags: ["thar", "sunset", "rajasthan", "india", "desert"] },
  { id: 135, ...c(28), title: "Stars Over Pangong", caption: "The Milky Way reflected in the high-altitude lake.", imageUrl: "https://images.unsplash.com/photo-1507400492013-162706c8c05e?w=800&q=80", sourceType: "upload", viewCount: 876, likeCount: 334, commentCount: 47, saveCount: 89, createdAt: now(), tags: ["astrophotography", "pangong", "ladakh", "india", "stars"] },

  // ═══════════════════════════════════════════════════════════════════
  // INDIAN TEA & COFFEE (tags: tea, coffee, india, beverage)
  // ═══════════════════════════════════════════════════════════════════
  { id: 136, ...c(4), title: "Assam Tea Picking", caption: "Workers harvesting in the vast tea gardens of Assam.", imageUrl: "https://images.unsplash.com/photo-1556881286-fc6915169721?w=800&q=80", sourceType: "upload", viewCount: 543, likeCount: 198, commentCount: 25, saveCount: 54, createdAt: now(), tags: ["tea", "assam", "india", "harvest", "green"] },
  { id: 137, ...c(4), title: "Filter Coffee Tumbler", caption: "South Indian filter coffee in a traditional steel tumbler.", imageUrl: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&q=80", sourceType: "upload", viewCount: 654, likeCount: 245, commentCount: 31, saveCount: 67, createdAt: now(), tags: ["coffee", "southindian", "india", "beverage", "filter"] },

  // ═══════════════════════════════════════════════════════════════════
  // MORE INDIAN STREET (tags: autorickshaw, street, india)
  // ═══════════════════════════════════════════════════════════════════
  { id: 138, ...c(25), title: "Dabbawala Mumbai", caption: "The legendary tiffin delivery system of Mumbai.", imageUrl: "https://images.unsplash.com/photo-1570168007204-dfb528c6858f?w=800&q=80", sourceType: "upload", viewCount: 543, likeCount: 212, commentCount: 28, saveCount: 58, createdAt: now(), tags: ["dabbawala", "mumbai", "india", "street", "iconic"] },
  { id: 139, ...c(1), title: "Mumbai CST Station", caption: "The Victorian Gothic architecture of Chhatrapati Shivaji Terminus.", imageUrl: "https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?w=800&q=80", sourceType: "upload", viewCount: 765, likeCount: 287, commentCount: 38, saveCount: 78, createdAt: now(), tags: ["mumbai", "station", "architecture", "india", "heritage"] },

  // ═══════════════════════════════════════════════════════════════════
  // INDIAN SPIRITUAL MORE (tags: mantra, prayer, india)
  // ═══════════════════════════════════════════════════════════════════
  { id: 140, ...c(15), title: "Tibetan Prayer Flags", caption: "Colorful prayer flags fluttering over Himalayan passes.", imageUrl: "https://images.unsplash.com/photo-1504457047772-27faf1c00561?w=800&q=80", sourceType: "upload", viewCount: 654, likeCount: 245, commentCount: 31, saveCount: 67, createdAt: now(), tags: ["prayerflags", "tibet", "himalaya", "india", "spiritual"] },
  { id: 141, ...c(15), title: "Incense Sticks", caption: "Fragrant agarbatti smoke curling in a temple.", imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80", sourceType: "upload", viewCount: 432, likeCount: 167, commentCount: 21, saveCount: 45, createdAt: now(), tags: ["incense", "temple", "india", "spiritual", "fragrance"] },

  // ═══════════════════════════════════════════════════════════════════
  // ADDITIONAL INDIAN (push to 170 Indian images)
  // ═══════════════════════════════════════════════════════════════════
  { id: 142, ...c(11), title: "India Gate Delhi", caption: "The war memorial arch illuminated at night.", imageUrl: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800&q=80", sourceType: "upload", viewCount: 876, likeCount: 334, commentCount: 47, saveCount: 89, createdAt: now(), tags: ["indiagate", "delhi", "india", "monument", "night"] },
  { id: 143, ...c(2), title: "Lotus Temple", caption: "The stunning Bahai House of Worship in Delhi.", imageUrl: "https://images.unsplash.com/photo-1590766940554-634a89e48e0d?w=800&q=80", sourceType: "upload", viewCount: 654, likeCount: 245, commentCount: 31, saveCount: 67, createdAt: now(), tags: ["lotustemple", "delhi", "india", "architecture", "modern"] },
  { id: 144, ...c(1), title: "Howrah Bridge Kolkata", caption: "The iconic cantilever bridge over the Hooghly River.", imageUrl: "https://images.unsplash.com/photo-1558431382-27e303142255?w=800&q=80", sourceType: "upload", viewCount: 543, likeCount: 198, commentCount: 25, saveCount: 54, createdAt: now(), tags: ["howrahbridge", "kolkata", "india", "bridge", "iconic"] },
  { id: 145, ...c(5), title: "Jim Corbett National Park", caption: "Dense sal forests of India's oldest national park.", imageUrl: "https://images.unsplash.com/photo-1474511320723-9a56873571b7?w=800&q=80", sourceType: "upload", viewCount: 654, likeCount: 245, commentCount: 31, saveCount: 67, createdAt: now(), tags: ["jimcorbett", "wildlife", "india", "forest", "nature"] },
  { id: 146, ...c(8), title: "Leh Palace", caption: "The ancient royal palace overlooking the Leh valley.", imageUrl: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800&q=80", sourceType: "upload", viewCount: 543, likeCount: 198, commentCount: 25, saveCount: 54, createdAt: now(), tags: ["leh", "palace", "ladakh", "india", "heritage"] },
  { id: 147, ...c(10), title: "Masala Chai Close-up", caption: "Boiling chai with cardamom, ginger, and cinnamon.", imageUrl: "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=800&q=80", sourceType: "upload", viewCount: 543, likeCount: 212, commentCount: 28, saveCount: 58, createdAt: now(), tags: ["chai", "masala", "india", "food", "spices"] },
  { id: 148, ...c(3), title: "Cricket Practice Nets", caption: "Young aspiring cricketers training in the nets.", imageUrl: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800&q=80", sourceType: "upload", viewCount: 432, likeCount: 167, commentCount: 21, saveCount: 45, createdAt: now(), tags: ["cricket", "practice", "india", "youth", "sports"] },
  { id: 149, ...c(26), title: "Indian Gym Culture", caption: "Bodybuilding culture in an open-air akhara.", imageUrl: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80", sourceType: "upload", viewCount: 543, likeCount: 198, commentCount: 25, saveCount: 54, createdAt: now(), tags: ["gym", "fitness", "india", "bodybuilding", "strength"] },
  { id: 150, ...c(6), title: "Warli Art", caption: "Traditional tribal art from Maharashtra on a mud wall.", imageUrl: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&q=80", sourceType: "upload", viewCount: 432, likeCount: 167, commentCount: 21, saveCount: 45, createdAt: now(), tags: ["warli", "tribalart", "maharashtra", "india", "art"] },
  { id: 151, ...c(16), title: "Odissi Dance", caption: "Graceful Odissi dance in a traditional temple setting.", imageUrl: "https://images.unsplash.com/photo-1547153760-18fc86c4afcb?w=800&q=80", sourceType: "upload", viewCount: 543, likeCount: 198, commentCount: 25, saveCount: 54, createdAt: now(), tags: ["odissi", "dance", "classical", "india", "odisha"] },
  { id: 152, ...c(9), title: "Indian Cinema Popcorn", caption: "The quintessential movie experience with buttery popcorn.", imageUrl: "https://images.unsplash.com/photo-1505686994434-e3cc5abf1330?w=800&q=80", sourceType: "upload", viewCount: 432, likeCount: 167, commentCount: 21, saveCount: 45, createdAt: now(), tags: ["cinema", "popcorn", "india", "movies", "entertainment"] },
  { id: 153, ...c(17), title: "Ambassador Car", caption: "The classic Hindustan Ambassador — India's once-beloved car.", imageUrl: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&q=80", sourceType: "upload", viewCount: 543, likeCount: 198, commentCount: 25, saveCount: 54, createdAt: now(), tags: ["ambassador", "car", "vintage", "india", "classic"] },
  { id: 154, ...c(1), title: "Mumbai Skyline", caption: "The glittering skyline of India's financial capital.", imageUrl: "https://images.unsplash.com/photo-1567157577867-05ccb1388e13?w=800&q=80", sourceType: "upload", viewCount: 765, likeCount: 287, commentCount: 38, saveCount: 78, createdAt: now(), tags: ["mumbai", "skyline", "india", "city", "modern"] },
  { id: 155, ...c(24), title: "Indian Harvest Festival", caption: "Farmers celebrating Pongal with fresh harvest.", imageUrl: "https://images.unsplash.com/photo-1495107334309-fcf20504a5ab?w=800&q=80", sourceType: "upload", viewCount: 432, likeCount: 167, commentCount: 21, saveCount: 45, createdAt: now(), tags: ["pongal", "harvest", "festival", "india", "tamilnadu"] },
  { id: 156, ...c(5), title: "Indian Monkey", caption: "A playful Rhesus macaque in the temple complex.", imageUrl: "https://images.unsplash.com/photo-1540573133985-87b6da6d54a9?w=800&q=80", sourceType: "upload", viewCount: 543, likeCount: 198, commentCount: 25, saveCount: 54, createdAt: now(), tags: ["monkey", "wildlife", "india", "temple", "animal"] },
  { id: 157, ...c(13), title: "Western Ghats Green", caption: "Dense tropical rainforest of the Western Ghats.", imageUrl: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&q=80", sourceType: "upload", viewCount: 654, likeCount: 245, commentCount: 31, saveCount: 67, createdAt: now(), tags: ["westernghats", "forest", "india", "nature", "biodiversity"] },
  { id: 158, ...c(11), title: "Jantar Mantar", caption: "The astronomical observatory instruments in Jaipur.", imageUrl: "https://images.unsplash.com/photo-1599661559684-f25081b2d35c?w=800&q=80", sourceType: "upload", viewCount: 432, likeCount: 167, commentCount: 21, saveCount: 45, createdAt: now(), tags: ["jantarmantar", "jaipur", "india", "science", "heritage"] },
  { id: 159, ...c(10), title: "Indian Pickle Jars", caption: "Homemade mango and lime pickles in glass jars.", imageUrl: "https://images.unsplash.com/photo-1596646146032-15be9b1dce67?w=800&q=80", sourceType: "upload", viewCount: 432, likeCount: 167, commentCount: 21, saveCount: 45, createdAt: now(), tags: ["pickle", "food", "india", "homemade", "spicy"] },
  { id: 160, ...c(2), title: "Holi Water Balloons", caption: "Colorful water balloons and gulaal at Holi celebrations.", imageUrl: "https://images.unsplash.com/photo-1576398289164-c48dc021b4e1?w=800&q=80", sourceType: "upload", viewCount: 654, likeCount: 245, commentCount: 31, saveCount: 67, createdAt: now(), tags: ["holi", "waterballoon", "festival", "india", "fun"] },
  { id: 161, ...c(8), title: "Zanskar Frozen River", caption: "The frozen Chadar trek over the Zanskar River.", imageUrl: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&q=80", sourceType: "upload", viewCount: 876, likeCount: 334, commentCount: 47, saveCount: 89, createdAt: now(), tags: ["zanskar", "trek", "ladakh", "india", "adventure"] },
  { id: 162, ...c(3), title: "IPL Stadium Crowd", caption: "The electric atmosphere of an Indian Premier League match.", imageUrl: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&q=80", sourceType: "upload", viewCount: 876, likeCount: 334, commentCount: 47, saveCount: 89, createdAt: now(), tags: ["ipl", "cricket", "india", "stadium", "crowd"] },
  { id: 163, ...c(9), title: "Indian Film Set", caption: "Behind the scenes of a Hindi film production.", imageUrl: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&q=80", sourceType: "upload", viewCount: 543, likeCount: 198, commentCount: 25, saveCount: 54, createdAt: now(), tags: ["filmset", "bollywood", "india", "cinema", "production"] },
  { id: 164, ...c(1), title: "Mumbai Dabba Delivery", caption: "Tiffin boxes being sorted at Churchgate station.", imageUrl: "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=800&q=80", sourceType: "upload", viewCount: 543, likeCount: 198, commentCount: 25, saveCount: 54, createdAt: now(), tags: ["dabbawala", "mumbai", "india", "logistics", "food"] },
  { id: 165, ...c(14), title: "Kolhapuri Chappal", caption: "Traditional handcrafted leather sandals of Maharashtra.", imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80", sourceType: "upload", viewCount: 432, likeCount: 167, commentCount: 21, saveCount: 45, createdAt: now(), tags: ["kolhapuri", "footwear", "india", "craft", "leather"] },
  { id: 166, ...c(24), title: "Indian School Assembly", caption: "Students lined up for morning prayers and national anthem.", imageUrl: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80", sourceType: "upload", viewCount: 432, likeCount: 167, commentCount: 21, saveCount: 45, createdAt: now(), tags: ["school", "education", "india", "morning", "assembly"] },
  { id: 167, ...c(5), title: "Flamingos Mumbai", caption: "A flock of flamingos at the Sewri mudflats.", imageUrl: "https://images.unsplash.com/photo-1497206365907-f5e630693df0?w=800&q=80", sourceType: "upload", viewCount: 654, likeCount: 245, commentCount: 31, saveCount: 67, createdAt: now(), tags: ["flamingo", "bird", "mumbai", "india", "nature"] },

  // ═══════════════════════════════════════════════════════════════════
  // MARVEL & SUPERHERO (20% International starts here)
  // ═══════════════════════════════════════════════════════════════════
  { id: 168, ...c(19), title: "Iron Man Suit Display", caption: "The iconic red and gold armor on display.", imageUrl: "https://images.unsplash.com/photo-1635863138275-d9b33299680b?w=800&q=80", sourceType: "upload", viewCount: 1200, likeCount: 478, commentCount: 67, saveCount: 134, createdAt: now(), tags: ["marvel", "ironman", "superhero", "avengers", "comics"] },
  { id: 169, ...c(19), title: "Spider-Man Wall Art", caption: "Amazing Spider-Man street art on a city wall.", imageUrl: "https://images.unsplash.com/photo-1608889825103-eb5ed706fc64?w=800&q=80", sourceType: "upload", viewCount: 987, likeCount: 398, commentCount: 54, saveCount: 112, createdAt: now(), tags: ["marvel", "spiderman", "streetart", "superhero", "art"] },
  { id: 170, ...c(19), title: "Captain America Shield", caption: "The vibranium shield — symbol of hope.", imageUrl: "https://images.unsplash.com/photo-1569003339405-ea396a5a8a90?w=800&q=80", sourceType: "upload", viewCount: 876, likeCount: 345, commentCount: 48, saveCount: 98, createdAt: now(), tags: ["marvel", "captainamerica", "superhero", "avengers", "shield"] },
  { id: 171, ...c(19), title: "Thor Hammer", caption: "Mjolnir — whosoever holds this hammer.", imageUrl: "https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=800&q=80", sourceType: "upload", viewCount: 765, likeCount: 289, commentCount: 38, saveCount: 78, createdAt: now(), tags: ["marvel", "thor", "mjolnir", "superhero", "asgard"] },
  { id: 172, ...c(19), title: "Avengers Assemble", caption: "The ultimate superhero team-up poster.", imageUrl: "https://images.unsplash.com/photo-1618519764620-7403abdbdfe9?w=800&q=80", sourceType: "upload", viewCount: 1100, likeCount: 445, commentCount: 62, saveCount: 118, createdAt: now(), tags: ["marvel", "avengers", "superhero", "team", "epic"] },

  // ═══════════════════════════════════════════════════════════════════
  // DC COMICS (tags: dc, batman, superman, superhero)
  // ═══════════════════════════════════════════════════════════════════
  { id: 173, ...c(20), title: "Batman Signal", caption: "The Bat-Signal lighting up Gotham's night sky.", imageUrl: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=800&q=80", sourceType: "upload", viewCount: 987, likeCount: 398, commentCount: 54, saveCount: 112, createdAt: now(), tags: ["dc", "batman", "gotham", "superhero", "night"] },
  { id: 174, ...c(20), title: "Superman Symbol", caption: "The iconic S shield — hope for humanity.", imageUrl: "https://images.unsplash.com/photo-1531259683007-016a7b628fc3?w=800&q=80", sourceType: "upload", viewCount: 876, likeCount: 345, commentCount: 47, saveCount: 92, createdAt: now(), tags: ["dc", "superman", "hope", "superhero", "symbol"] },
  { id: 175, ...c(20), title: "Wonder Woman Cosplay", caption: "An incredible Wonder Woman costume at a convention.", imageUrl: "https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=800&q=80", sourceType: "upload", viewCount: 765, likeCount: 289, commentCount: 38, saveCount: 78, createdAt: now(), tags: ["dc", "wonderwoman", "cosplay", "superhero", "convention"] },
  { id: 176, ...c(20), title: "Joker Art", caption: "Why so serious? Stunning fan art of the Clown Prince.", imageUrl: "https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?w=800&q=80", sourceType: "upload", viewCount: 876, likeCount: 334, commentCount: 47, saveCount: 89, createdAt: now(), tags: ["dc", "joker", "villain", "art", "dark"] },

  // ═══════════════════════════════════════════════════════════════════
  // CODING & TECH (tags: coding, programming, tech, developer)
  // ═══════════════════════════════════════════════════════════════════
  { id: 177, ...c(7), title: "VS Code Setup", caption: "The perfect dark theme coding environment.", imageUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=80", sourceType: "upload", viewCount: 876, likeCount: 334, commentCount: 47, saveCount: 92, createdAt: now(), tags: ["coding", "vscode", "programming", "developer", "tech"] },
  { id: 178, ...c(21), title: "Clean Code Terminal", caption: "Green text on black — the hacker aesthetic.", imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80", sourceType: "upload", viewCount: 765, likeCount: 289, commentCount: 38, saveCount: 78, createdAt: now(), tags: ["coding", "terminal", "hacker", "tech", "matrix"] },
  { id: 179, ...c(7), title: "JavaScript Code", caption: "Beautiful JavaScript code with syntax highlighting.", imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80", sourceType: "upload", viewCount: 654, likeCount: 245, commentCount: 31, saveCount: 67, createdAt: now(), tags: ["javascript", "coding", "programming", "web", "developer"] },
  { id: 180, ...c(21), title: "Mechanical Keyboard RGB", caption: "Custom mechanical keyboard with RGB backlighting.", imageUrl: "https://images.unsplash.com/photo-1595225476474-87563907a212?w=800&q=80", sourceType: "upload", viewCount: 543, likeCount: 212, commentCount: 28, saveCount: 58, createdAt: now(), tags: ["keyboard", "tech", "rgb", "gaming", "mechanical"] },
  { id: 181, ...c(7), title: "React Component Tree", caption: "Building beautiful UIs with React components.", imageUrl: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80", sourceType: "upload", viewCount: 543, likeCount: 198, commentCount: 25, saveCount: 54, createdAt: now(), tags: ["react", "coding", "frontend", "javascript", "ui"] },
  { id: 182, ...c(21), title: "Server Room", caption: "Rows of blinking servers in a modern data center.", imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80", sourceType: "upload", viewCount: 654, likeCount: 245, commentCount: 31, saveCount: 67, createdAt: now(), tags: ["server", "tech", "datacenter", "cloud", "infrastructure"] },

  // ═══════════════════════════════════════════════════════════════════
  // DOGS (tags: dog, pets, puppy, animal)
  // ═══════════════════════════════════════════════════════════════════
  { id: 183, ...c(12), title: "Golden Retriever Smile", caption: "The happiest dog in the world with that golden smile.", imageUrl: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=800&q=80", sourceType: "upload", viewCount: 987, likeCount: 412, commentCount: 58, saveCount: 115, createdAt: now(), tags: ["dog", "goldenretriever", "pets", "happy", "animal"] },
  { id: 184, ...c(12), title: "Indian Stray Puppy", caption: "An adorable Indian pariah puppy with soulful eyes.", imageUrl: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&q=80", sourceType: "upload", viewCount: 876, likeCount: 378, commentCount: 52, saveCount: 98, createdAt: now(), tags: ["dog", "puppy", "india", "stray", "cute"] },
  { id: 185, ...c(12), title: "Husky Blue Eyes", caption: "Piercing blue eyes of a Siberian Husky.", imageUrl: "https://images.unsplash.com/photo-1605568427561-40dd23c2acea?w=800&q=80", sourceType: "upload", viewCount: 765, likeCount: 312, commentCount: 42, saveCount: 84, createdAt: now(), tags: ["dog", "husky", "pets", "blueeyes", "beautiful"] },
  { id: 186, ...c(12), title: "Dog at the Beach", caption: "A playful dog running along the shoreline.", imageUrl: "https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?w=800&q=80", sourceType: "upload", viewCount: 654, likeCount: 267, commentCount: 35, saveCount: 72, createdAt: now(), tags: ["dog", "beach", "pets", "play", "happy"] },

  // ═══════════════════════════════════════════════════════════════════
  // CATS (tags: cat, pets, kitten, feline)
  // ═══════════════════════════════════════════════════════════════════
  { id: 187, ...c(22), title: "Persian Cat Royalty", caption: "A fluffy Persian cat with an aristocratic gaze.", imageUrl: "https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?w=800&q=80", sourceType: "upload", viewCount: 876, likeCount: 356, commentCount: 49, saveCount: 95, createdAt: now(), tags: ["cat", "persian", "pets", "fluffy", "royal"] },
  { id: 188, ...c(22), title: "Kitten Yawning", caption: "The cutest kitten mid-yawn captured perfectly.", imageUrl: "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=800&q=80", sourceType: "upload", viewCount: 987, likeCount: 412, commentCount: 58, saveCount: 115, createdAt: now(), tags: ["cat", "kitten", "pets", "cute", "yawn"] },
  { id: 189, ...c(22), title: "Cat in Window", caption: "A thoughtful cat gazing out a rain-streaked window.", imageUrl: "https://images.unsplash.com/photo-1513245543132-31f507417b26?w=800&q=80", sourceType: "upload", viewCount: 765, likeCount: 298, commentCount: 41, saveCount: 79, createdAt: now(), tags: ["cat", "window", "pets", "rain", "mood"] },
  { id: 190, ...c(22), title: "Orange Tabby Cat", caption: "A majestic orange tabby basking in sunlight.", imageUrl: "https://images.unsplash.com/photo-1495360010541-f48722b34f7d?w=800&q=80", sourceType: "upload", viewCount: 654, likeCount: 256, commentCount: 33, saveCount: 69, createdAt: now(), tags: ["cat", "tabby", "pets", "orange", "sun"] },

  // ═══════════════════════════════════════════════════════════════════
  // INTERNATIONAL FOOD (tags: food, international, cuisine)
  // ═══════════════════════════════════════════════════════════════════
  { id: 191, ...c(10), title: "Sushi Platter", caption: "Beautifully arranged sushi with wasabi and ginger.", imageUrl: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800&q=80", sourceType: "upload", viewCount: 765, likeCount: 289, commentCount: 38, saveCount: 78, createdAt: now(), tags: ["sushi", "food", "japanese", "seafood", "platter"] },
  { id: 192, ...c(4), title: "Pizza Margherita", caption: "A perfectly wood-fired Neapolitan Margherita pizza.", imageUrl: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800&q=80", sourceType: "upload", viewCount: 654, likeCount: 245, commentCount: 31, saveCount: 67, createdAt: now(), tags: ["pizza", "food", "italian", "cheese", "woodfired"] },

  // ═══════════════════════════════════════════════════════════════════
  // SPACE & ASTRONOMY (tags: space, astronomy, stars, galaxy)
  // ═══════════════════════════════════════════════════════════════════
  { id: 193, ...c(23), title: "Nebula in Deep Space", caption: "A stunning view of a colorful nebula.", imageUrl: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800&q=80", sourceType: "upload", viewCount: 987, likeCount: 398, commentCount: 54, saveCount: 112, createdAt: now(), tags: ["space", "nebula", "astronomy", "galaxy", "cosmos"] },
  { id: 194, ...c(23), title: "Full Moon Close-up", caption: "High-resolution details of the lunar surface.", imageUrl: "https://images.unsplash.com/photo-1532693322450-2cb5c511067d?w=800&q=80", sourceType: "upload", viewCount: 876, likeCount: 334, commentCount: 47, saveCount: 89, createdAt: now(), tags: ["moon", "space", "astronomy", "night", "closeup"] },
  { id: 195, ...c(23), title: "Saturn Rings", caption: "The magnificent rings of Saturn captured by telescope.", imageUrl: "https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=800&q=80", sourceType: "upload", viewCount: 765, likeCount: 289, commentCount: 38, saveCount: 78, createdAt: now(), tags: ["saturn", "space", "astronomy", "planet", "rings"] },

  // ═══════════════════════════════════════════════════════════════════
  // INTERNATIONAL TRAVEL (tags: travel, world, landscape)
  // ═══════════════════════════════════════════════════════════════════
  { id: 196, ...c(27), title: "Northern Lights Iceland", caption: "The spectacular Aurora Borealis dancing in the sky.", imageUrl: "https://images.unsplash.com/photo-1483347756197-71ef80e95f73?w=800&q=80", sourceType: "upload", viewCount: 1200, likeCount: 478, commentCount: 67, saveCount: 134, createdAt: now(), tags: ["aurora", "iceland", "travel", "night", "nature"] },
  { id: 197, ...c(27), title: "Swiss Alps", caption: "Snow-capped peaks with a clear blue sky.", imageUrl: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800&q=80", sourceType: "upload", viewCount: 987, likeCount: 389, commentCount: 54, saveCount: 104, createdAt: now(), tags: ["switzerland", "alps", "mountains", "travel", "snow"] },
  { id: 198, ...c(27), title: "Japanese Cherry Blossoms", caption: "Sakura trees in full bloom along a Tokyo canal.", imageUrl: "https://images.unsplash.com/photo-1522383225653-ed111181a951?w=800&q=80", sourceType: "upload", viewCount: 876, likeCount: 334, commentCount: 47, saveCount: 89, createdAt: now(), tags: ["sakura", "japan", "cherryblossom", "travel", "spring"] },

  // ═══════════════════════════════════════════════════════════════════
  // GAMING (tags: gaming, esports, game)
  // ═══════════════════════════════════════════════════════════════════
  { id: 199, ...c(21), title: "Gaming Setup RGB", caption: "Ultimate RGB gaming battlestation setup.", imageUrl: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=800&q=80", sourceType: "upload", viewCount: 876, likeCount: 345, commentCount: 48, saveCount: 92, createdAt: now(), tags: ["gaming", "setup", "rgb", "pc", "battlestation"] },
  { id: 200, ...c(21), title: "Retro Arcade", caption: "Classic arcade machines glowing in neon.", imageUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80", sourceType: "upload", viewCount: 654, likeCount: 245, commentCount: 31, saveCount: 67, createdAt: now(), tags: ["arcade", "retro", "gaming", "neon", "vintage"] },

  // ═══════════════════════════════════════════════════════════════════
  // NATURE & FLOWERS (tags: flower, nature, macro, garden)
  // ═══════════════════════════════════════════════════════════════════
  { id: 201, ...c(27), title: "Rose Macro", caption: "Dew drops on a perfect red rose petal.", imageUrl: "https://images.unsplash.com/photo-1490750967868-88aa4f44baee?w=800&q=80", sourceType: "upload", viewCount: 654, likeCount: 256, commentCount: 33, saveCount: 69, createdAt: now(), tags: ["rose", "flower", "macro", "nature", "dew"] },
  { id: 202, ...c(27), title: "Sunflower Field", caption: "An endless field of sunflowers facing the sun.", imageUrl: "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=800&q=80", sourceType: "upload", viewCount: 765, likeCount: 289, commentCount: 38, saveCount: 78, createdAt: now(), tags: ["sunflower", "flower", "field", "nature", "yellow"] },
  { id: 203, ...c(13), title: "Lotus Bloom India", caption: "The sacred lotus flower in a temple pond.", imageUrl: "https://images.unsplash.com/photo-1474557157379-8aa74a6ef541?w=800&q=80", sourceType: "upload", viewCount: 543, likeCount: 198, commentCount: 25, saveCount: 54, createdAt: now(), tags: ["lotus", "flower", "india", "sacred", "nature"] },

  // ═══════════════════════════════════════════════════════════════════
  // ARCHITECTURE & DESIGN (international)
  // ═══════════════════════════════════════════════════════════════════
  { id: 204, ...c(18), title: "Minimalist Interior", caption: "Clean lines and natural light in a modern home.", imageUrl: "https://images.unsplash.com/photo-1494526585095-c41746248156?w=800&q=80", sourceType: "upload", viewCount: 654, likeCount: 245, commentCount: 31, saveCount: 67, createdAt: now(), tags: ["minimalist", "interior", "architecture", "modern", "design"] },
  { id: 205, ...c(18), title: "Brutalist Concrete", caption: "Raw concrete architecture in dramatic light.", imageUrl: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=800&q=80", sourceType: "upload", viewCount: 543, likeCount: 198, commentCount: 25, saveCount: 54, createdAt: now(), tags: ["brutalist", "architecture", "concrete", "modern", "urban"] },

  // ═══════════════════════════════════════════════════════════════════
  // ABSTRACT & ART (tags: abstract, art, digital, creative)
  // ═══════════════════════════════════════════════════════════════════
  { id: 206, ...c(6), title: "Neon Abstract Waves", caption: "Flowing neon waves in a digital art piece.", imageUrl: "https://images.unsplash.com/photo-1550684376-efcbd6e3f031?w=800&q=80", sourceType: "upload", viewCount: 765, likeCount: 289, commentCount: 38, saveCount: 78, createdAt: now(), tags: ["abstract", "neon", "digital", "art", "creative"] },
  { id: 207, ...c(6), title: "Liquid Color Swirl", caption: "Abstract color mixing creating organic patterns.", imageUrl: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=800&q=80", sourceType: "upload", viewCount: 654, likeCount: 245, commentCount: 31, saveCount: 67, createdAt: now(), tags: ["abstract", "color", "art", "liquid", "creative"] },
  { id: 208, ...c(6), title: "Geometric Pattern", caption: "Perfectly symmetrical geometric digital art.", imageUrl: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=800&q=80", sourceType: "upload", viewCount: 543, likeCount: 198, commentCount: 25, saveCount: 54, createdAt: now(), tags: ["geometric", "pattern", "art", "abstract", "symmetry"] },

  // ═══════════════════════════════════════════════════════════════════
  // OCEAN & UNDERWATER (tags: ocean, underwater, marine)
  // ═══════════════════════════════════════════════════════════════════
  { id: 209, ...c(27), title: "Coral Reef Colors", caption: "Vibrant coral reef teeming with marine life.", imageUrl: "https://images.unsplash.com/photo-1546026423-cc4642628d2b?w=800&q=80", sourceType: "upload", viewCount: 765, likeCount: 289, commentCount: 38, saveCount: 78, createdAt: now(), tags: ["coral", "ocean", "underwater", "marine", "nature"] },
  { id: 210, ...c(27), title: "Wave Crashing", caption: "A powerful ocean wave caught at the perfect moment.", imageUrl: "https://images.unsplash.com/photo-1509914398892-963f53e6e2f1?w=800&q=80", sourceType: "upload", viewCount: 654, likeCount: 245, commentCount: 31, saveCount: 67, createdAt: now(), tags: ["wave", "ocean", "surf", "nature", "power"] },
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
