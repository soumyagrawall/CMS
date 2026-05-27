const imageModel = require("../models/imageModel");
const { pool } = require("../config/database");

// 28 diverse creators for seeding
const seedCreators = [
  { id: 1001, username: "arjun_shoots", email: "arjun@lumora.test", fullName: "Arjun Mehta" },
  { id: 1002, username: "priya_captures", email: "priya@lumora.test", fullName: "Priya Sharma" },
  { id: 1003, username: "rahul.frames", email: "rahul@lumora.test", fullName: "Rahul Verma" },
  { id: 1004, username: "sneha_lens", email: "sneha@lumora.test", fullName: "Sneha Iyer" },
  { id: 1005, username: "vikram_wild", email: "vikram@lumora.test", fullName: "Vikram Singh" },
  { id: 1006, username: "ananya.art", email: "ananya@lumora.test", fullName: "Ananya Das" },
  { id: 1007, username: "karthik_dev", email: "karthik@lumora.test", fullName: "Karthik Nair" },
  { id: 1008, username: "meera_travels", email: "meera@lumora.test", fullName: "Meera Patel" },
  { id: 1009, username: "rohit_cinema", email: "rohit@lumora.test", fullName: "Rohit Kapoor" },
  { id: 1010, username: "deepika_foodie", email: "deepika@lumora.test", fullName: "Deepika Reddy" },
  { id: 1011, username: "amit_heritage", email: "amit@lumora.test", fullName: "Amit Choudhary" },
  { id: 1012, username: "kavya_pets", email: "kavya@lumora.test", fullName: "Kavya Menon" },
  { id: 1013, username: "suresh_nature", email: "suresh@lumora.test", fullName: "Suresh Kumar" },
  { id: 1014, username: "nisha_fashion", email: "nisha@lumora.test", fullName: "Nisha Agarwal" },
  { id: 1015, username: "rajesh_spiritual", email: "rajesh@lumora.test", fullName: "Rajesh Gupta" },
  { id: 1016, username: "pooja_dance", email: "pooja@lumora.test", fullName: "Pooja Banerjee" },
  { id: 1017, username: "sanjay_motors", email: "sanjay@lumora.test", fullName: "Sanjay Joshi" },
  { id: 1018, username: "riya_minimal", email: "riya@lumora.test", fullName: "Riya Saxena" },
  { id: 1019, username: "alex_marvel", email: "alex@lumora.test", fullName: "Alex Thompson" },
  { id: 1020, username: "sarah_dc", email: "sarah@lumora.test", fullName: "Sarah Chen" },
  { id: 1021, username: "james_code", email: "james@lumora.test", fullName: "James Wilson" },
  { id: 1022, username: "maria_cats", email: "maria@lumora.test", fullName: "Maria Garcia" },
  { id: 1023, username: "david_astro", email: "david@lumora.test", fullName: "David Park" },
  { id: 1024, username: "aisha_stories", email: "aisha@lumora.test", fullName: "Aisha Khan" },
  { id: 1025, username: "tanvi_street", email: "tanvi@lumora.test", fullName: "Tanvi Desai" },
  { id: 1026, username: "harsh_fitness", email: "harsh@lumora.test", fullName: "Harsh Vardhan" },
  { id: 1027, username: "lisa_nature", email: "lisa@lumora.test", fullName: "Lisa Anderson" },
  { id: 1028, username: "nikhil_astro", email: "nikhil@lumora.test", fullName: "Nikhil Rao" },
];

const seedImages = [
  // ─── INDIAN CRICKET ───
  { userId: 1003, title: "Virat Kohli Cover Drive", caption: "The king plays a stunning cover drive at Wankhede.", imageUrl: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800&q=80", tags: ["cricket", "india", "sports", "virat"] },
  { userId: 1003, title: "Cricket Stadium Lights", caption: "The electric atmosphere of an IPL night match.", imageUrl: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&q=80", tags: ["cricket", "stadium", "ipl", "sports"] },
  { userId: 1003, title: "Gully Cricket", caption: "Kids playing cricket in the narrow lanes of Old Delhi.", imageUrl: "https://images.unsplash.com/photo-1624526267942-ab0ff8a3e972?w=800&q=80", tags: ["cricket", "india", "street", "kids"] },
  { userId: 1003, title: "Cricket Bat & Ball", caption: "The tools of the gentleman's game.", imageUrl: "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=800&q=80", tags: ["cricket", "sports", "closeup", "equipment"] },
  { userId: 1003, title: "Indian Cricket Fans", caption: "Passionate fans painted in tricolor cheering at the stadium.", imageUrl: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&q=80", tags: ["cricket", "india", "fans", "celebration"] },

  // ─── BOLLYWOOD & CINEMA ───
  { userId: 1009, title: "Bollywood Dance Scene", caption: "Vibrant colors and energy of a Bollywood dance number.", imageUrl: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&q=80", tags: ["bollywood", "dance", "cinema", "india"] },
  { userId: 1009, title: "Film City Mumbai", caption: "Behind the scenes at Goregaon Film City.", imageUrl: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800&q=80", tags: ["bollywood", "mumbai", "cinema", "filmmaking"] },
  { userId: 1009, title: "Movie Poster Wall", caption: "Vintage hand-painted Bollywood movie posters.", imageUrl: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&q=80", tags: ["bollywood", "art", "vintage", "poster"] },
  { userId: 1009, title: "Cinema Hall Nostalgia", caption: "The charm of old single-screen theaters in India.", imageUrl: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&q=80", tags: ["cinema", "nostalgia", "india", "theater"] },

  // ─── INDIAN TRAVEL & MONUMENTS ───
  { userId: 1002, title: "Taj Mahal at Sunrise", caption: "The icon of eternal love bathed in golden morning light.", imageUrl: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&q=80", tags: ["tajmahal", "india", "travel", "monument", "agra"] },
  { userId: 1008, title: "Jaipur Pink City", caption: "The stunning rose-colored architecture of Hawa Mahal.", imageUrl: "https://images.unsplash.com/photo-1599839619722-39751411ea63?w=800&q=80", tags: ["jaipur", "rajasthan", "india", "architecture", "travel"] },
  { userId: 1008, title: "Kerala Backwaters", caption: "A houseboat gliding through the serene backwaters.", imageUrl: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&q=80", tags: ["kerala", "backwaters", "india", "travel", "nature"] },
  { userId: 1002, title: "Varanasi Evening Aarti", caption: "The mesmerizing Ganga Aarti at Dashashwamedh Ghat.", imageUrl: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=800&q=80", tags: ["varanasi", "spiritual", "india", "ganges", "ritual"] },
  { userId: 1011, title: "Golden Temple Amritsar", caption: "The divine Harmandir Sahib reflecting in the sacred pool.", imageUrl: "https://images.unsplash.com/photo-1582650824241-115f5c35848c?w=800&q=80", tags: ["goldentemple", "amritsar", "india", "spiritual", "sikh"] },
  { userId: 1008, title: "Ladakh Pangong Lake", caption: "The stunning blue waters of Pangong Tso at 14,000 feet.", imageUrl: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800&q=80", tags: ["ladakh", "lake", "india", "mountains", "travel"] },
  { userId: 1011, title: "Qutub Minar Delhi", caption: "The soaring 73-meter victory tower of Delhi.", imageUrl: "https://images.unsplash.com/photo-1598285918731-f2f53d49df29?w=800&q=80", tags: ["delhi", "monument", "india", "history", "architecture"] },
  { userId: 1002, title: "Mysore Palace Illuminated", caption: "97,000 bulbs light up Mysore Palace.", imageUrl: "https://images.unsplash.com/photo-1600100397608-f010f438a3ee?w=800&q=80", tags: ["mysore", "palace", "india", "night", "architecture"] },
  { userId: 1008, title: "Hampi Boulders", caption: "Surreal boulder landscape of the ancient Vijayanagara empire.", imageUrl: "https://images.unsplash.com/photo-1600010996482-eb0d50711cc9?w=800&q=80", tags: ["hampi", "ruins", "india", "history", "travel"] },
  { userId: 1011, title: "Konark Sun Temple", caption: "The magnificent 13th-century temple shaped as a chariot.", imageUrl: "https://images.unsplash.com/photo-1620247953245-c1e1dc503d40?w=800&q=80", tags: ["konark", "temple", "india", "architecture", "heritage"] },
  { userId: 1002, title: "Gateway of India", caption: "Mumbai's iconic arch overlooking the Arabian Sea.", imageUrl: "https://images.unsplash.com/photo-1566552881560-0be862a7c445?w=800&q=80", tags: ["mumbai", "monument", "india", "sea", "travel"] },
  { userId: 1008, title: "Rishikesh Suspension Bridge", caption: "The iconic Lakshman Jhula spanning the Ganges.", imageUrl: "https://images.unsplash.com/photo-1593693411515-c20261bcad6e?w=800&q=80", tags: ["rishikesh", "adventure", "india", "bridge", "river"] },
  { userId: 1011, title: "Charminar Hyderabad", caption: "The magnificent four-towered monument of the Deccan.", imageUrl: "https://images.unsplash.com/photo-1623063539820-2b1d3d63c267?w=800&q=80", tags: ["hyderabad", "charminar", "india", "monument", "history"] },
  { userId: 1008, title: "Udaipur Lake Palace", caption: "The floating white marble palace on Lake Pichola.", imageUrl: "https://images.unsplash.com/photo-1585698308436-c0c1b7d579ef?w=800&q=80", tags: ["udaipur", "palace", "india", "lake", "rajasthan"] },

  // ─── INDIAN FOOD ───
  { userId: 1004, title: "Indian Thali Feast", caption: "A grand vegetarian thali with 20+ dishes.", imageUrl: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=800&q=80", tags: ["food", "thali", "india", "cuisine", "vegetarian"] },
  { userId: 1010, title: "Mumbai Vada Pav", caption: "The king of Mumbai street food.", imageUrl: "https://images.unsplash.com/photo-1606491956689-2ea866880049?w=800&q=80", tags: ["food", "streetfood", "mumbai", "india", "snack"] },
  { userId: 1004, title: "Spice Market Colors", caption: "Vibrant heaps of turmeric, chili, and cumin.", imageUrl: "https://images.unsplash.com/photo-1596646146032-15be9b1dce67?w=800&q=80", tags: ["spices", "food", "india", "market", "colors"] },
  { userId: 1010, title: "Hyderabadi Biryani", caption: "Layers of fragrant dum biryani cooked to perfection.", imageUrl: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&q=80", tags: ["biryani", "food", "india", "hyderabad", "rice"] },
  { userId: 1004, title: "Chai on the Tracks", caption: "Cutting chai served in clay cups at a railway station.", imageUrl: "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=800&q=80", tags: ["chai", "food", "india", "train", "street"] },
  { userId: 1010, title: "South Indian Dosa", caption: "A crispy golden dosa with sambar and chutney.", imageUrl: "https://images.unsplash.com/photo-1630383249896-424e482df921?w=800&q=80", tags: ["dosa", "food", "india", "southindian", "breakfast"] },
  { userId: 1004, title: "Samosa Plate", caption: "Hot, crispy samosas with green chutney.", imageUrl: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&q=80", tags: ["samosa", "food", "india", "snack", "streetfood"] },
  { userId: 1010, title: "Pani Puri Cart", caption: "The most loved chaat being assembled by an expert hand.", imageUrl: "https://images.unsplash.com/photo-1625398407796-82650a8c135f?w=800&q=80", tags: ["panipuri", "streetfood", "food", "india", "chaat"] },

  // ─── INDIAN FESTIVALS ───
  { userId: 1002, title: "Diwali Diyas", caption: "Rows of earthen lamps illuminating the night.", imageUrl: "https://images.unsplash.com/photo-1508236720235-5b4cf59275e5?w=800&q=80", tags: ["diwali", "festival", "india", "light", "celebration"] },
  { userId: 1002, title: "Holi Colors Explosion", caption: "Faces covered in vibrant gulaal during the festival of colors.", imageUrl: "https://images.unsplash.com/photo-1576398289164-c48dc021b4e1?w=800&q=80", tags: ["holi", "festival", "india", "colors", "celebration"] },
  { userId: 1015, title: "Durga Puja Pandal", caption: "An elaborately decorated pandal during Durga Puja.", imageUrl: "https://images.unsplash.com/photo-1575384043001-fa89df641a17?w=800&q=80", tags: ["durgapuja", "festival", "kolkata", "india", "culture"] },
  { userId: 1015, title: "Ganesh Chaturthi", caption: "An enormous Ganesh idol during the immersion procession.", imageUrl: "https://images.unsplash.com/photo-1567591370504-ed4fd8300b88?w=800&q=80", tags: ["ganesh", "festival", "mumbai", "india", "spiritual"] },
  { userId: 1002, title: "Navratri Garba Night", caption: "Whirling dancers in colorful chaniya cholis.", imageUrl: "https://images.unsplash.com/photo-1533158307587-828f0a76ef46?w=800&q=80", tags: ["navratri", "garba", "festival", "india", "dance"] },
  { userId: 1024, title: "Pushkar Mela Camels", caption: "Decorated camels at the Pushkar Camel Fair.", imageUrl: "https://images.unsplash.com/photo-1596547609652-9cb5b42a98f7?w=800&q=80", tags: ["pushkar", "rajasthan", "camels", "festival", "india"] },

  // ─── INDIAN WILDLIFE ───
  { userId: 1005, title: "Bengal Tiger Resting", caption: "A majestic Royal Bengal Tiger in Ranthambore.", imageUrl: "https://images.unsplash.com/photo-1602491453631-e2a5ad90a131?w=800&q=80", tags: ["tiger", "wildlife", "india", "ranthambore", "nature"] },
  { userId: 1005, title: "Indian Peacock Display", caption: "The national bird of India in full glory.", imageUrl: "https://images.unsplash.com/photo-1587402636294-f25081b2d35c?w=800&q=80", tags: ["peacock", "bird", "wildlife", "india", "nature"] },
  { userId: 1005, title: "Indian Elephant Festival", caption: "A beautifully decorated temple elephant in Kerala.", imageUrl: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=800&q=80", tags: ["elephant", "wildlife", "india", "kerala", "culture"] },
  { userId: 1005, title: "Himalayan Snow Leopard", caption: "The ghost of the mountains in Spiti Valley.", imageUrl: "https://images.unsplash.com/photo-1456926631375-92c8ce872def?w=800&q=80", tags: ["snowleopard", "wildlife", "himalayas", "india", "rare"] },

  // ─── INDIAN CULTURE & DANCE ───
  { userId: 1016, title: "Kathakali Performance", caption: "The elaborate makeup and costume of Kerala's classical dance.", imageUrl: "https://images.unsplash.com/photo-1621696009855-6802f06b6eb8?w=800&q=80", tags: ["kathakali", "dance", "kerala", "india", "culture"] },
  { userId: 1016, title: "Bharatanatyam Pose", caption: "A dancer frozen in a powerful Bharatanatyam stance.", imageUrl: "https://images.unsplash.com/photo-1547153760-18fc86c4afcb?w=800&q=80", tags: ["bharatanatyam", "dance", "classical", "india", "art"] },
  { userId: 1014, title: "Indian Wedding Ceremony", caption: "The vibrant rituals of a traditional Hindu wedding.", imageUrl: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=800&q=80", tags: ["wedding", "india", "tradition", "culture", "celebration"] },
  { userId: 1014, title: "Mehndi Art", caption: "Intricate henna designs on a bride's hands.", imageUrl: "https://images.unsplash.com/photo-1600369672770-985fd30004eb?w=800&q=80", tags: ["mehndi", "henna", "india", "art", "wedding"] },
  { userId: 1014, title: "Bangle Market", caption: "Glittering stacks of colorful bangles in a bustling bazaar.", imageUrl: "https://images.unsplash.com/photo-1614210080649-6f5dfdb4e0ff?w=800&q=80", tags: ["bangles", "market", "india", "colorful", "shopping"] },
  { userId: 1014, title: "Indian Silk Sarees", caption: "Gorgeous Kanchipuram silk sarees draped on display.", imageUrl: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&q=80", tags: ["saree", "fashion", "india", "silk", "tradition"] },

  // ─── INDIAN NATURE & LANDSCAPES ───
  { userId: 1013, title: "Himalayan Sunrise", caption: "Dawn breaking over the snow-capped peaks.", imageUrl: "https://images.unsplash.com/photo-1581404172551-7abde123d6fa?w=800&q=80", tags: ["himalayas", "mountains", "india", "sunrise", "nature"] },
  { userId: 1013, title: "Goa Beach Sunset", caption: "Golden hour on the beaches of Goa.", imageUrl: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&q=80", tags: ["goa", "beach", "sunset", "india", "travel"] },
  { userId: 1013, title: "Spiti Valley Road", caption: "The winding mountain road through Spiti's lunar landscape.", imageUrl: "https://images.unsplash.com/photo-1604959114757-b12e126ff48a?w=800&q=80", tags: ["spiti", "mountains", "india", "road", "adventure"] },
  { userId: 1013, title: "Munnar Tea Gardens", caption: "Rolling green tea plantations in the hills of Kerala.", imageUrl: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=800&q=80", tags: ["munnar", "tea", "kerala", "india", "green"] },
  { userId: 1013, title: "Andaman Clear Waters", caption: "Crystal-clear turquoise waters of Havelock Island.", imageUrl: "https://images.unsplash.com/photo-1601235128090-e5bf41416fb8?w=800&q=80", tags: ["andaman", "beach", "island", "india", "ocean"] },
  { userId: 1013, title: "Dal Lake Kashmir", caption: "Shikaras floating on the mirror-like Dal Lake.", imageUrl: "https://images.unsplash.com/photo-1610471242371-d8ec76e0ffc7?w=800&q=80", tags: ["kashmir", "lake", "india", "shikara", "nature"] },
  { userId: 1028, title: "Milky Way over Ladakh", caption: "Astrophotography capturing the galaxy over Hanle.", imageUrl: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&q=80", tags: ["astrophotography", "ladakh", "india", "milkyway", "night"] },

  // ─── INDIAN STREET LIFE ───
  { userId: 1001, title: "Mumbai Local Train", caption: "The lifeline of Mumbai during rush hour.", imageUrl: "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=800&q=80", tags: ["mumbai", "train", "india", "city", "commute"] },
  { userId: 1025, title: "Jodhpur Blue City", caption: "The mesmerizing blue-painted houses of Jodhpur.", imageUrl: "https://images.unsplash.com/photo-1596700755919-8669c58ea618?w=800&q=80", tags: ["jodhpur", "blue", "city", "india", "rajasthan"] },
  { userId: 1001, title: "Auto Rickshaw Mumbai", caption: "The ubiquitous three-wheeler weaving through traffic.", imageUrl: "https://images.unsplash.com/photo-1548345680-f5475ea90818?w=800&q=80", tags: ["autorickshaw", "india", "street", "mumbai", "transport"] },
  { userId: 1025, title: "Old Delhi Chandni Chowk", caption: "The bustling narrow lanes of Shahjahanabad.", imageUrl: "https://images.unsplash.com/photo-1570168007204-dfb528c6858f?w=800&q=80", tags: ["delhi", "street", "india", "market", "old"] },
  { userId: 1025, title: "Street Art Mumbai", caption: "Colorful graffiti on the walls of Bandra.", imageUrl: "https://images.unsplash.com/photo-1583225214464-9296029427aa?w=800&q=80", tags: ["streetart", "graffiti", "mumbai", "india", "art"] },

  // ─── INDIAN SPIRITUAL & YOGA ───
  { userId: 1015, title: "Yoga at Sunrise", caption: "A practitioner in tree pose on the banks of the Ganges.", imageUrl: "https://images.unsplash.com/photo-1545389336-cf090694435e?w=800&q=80", tags: ["yoga", "spiritual", "india", "rishikesh", "wellness"] },
  { userId: 1015, title: "Temple Bell", caption: "A brass bell in a centuries-old Hindu temple.", imageUrl: "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?w=800&q=80", tags: ["temple", "spiritual", "india", "bell", "tradition"] },
  { userId: 1015, title: "Varanasi Morning Prayers", caption: "Sadhus performing morning rituals at the ghats.", imageUrl: "https://images.unsplash.com/photo-1550974868-52fb58dc1801?w=800&q=80", tags: ["varanasi", "spiritual", "india", "prayer", "morning"] },
  { userId: 1015, title: "Ganga Aarti Fire", caption: "Priests performing the fire ritual with large brass lamps.", imageUrl: "https://images.unsplash.com/photo-1557800636-894a64c1696f?w=800&q=80", tags: ["gangaaarti", "varanasi", "fire", "india", "spiritual"] },

  // ─── INDIAN ART & CRAFT ───
  { userId: 1006, title: "Indian Potter at Work", caption: "Skilled hands shaping clay on a traditional wheel.", imageUrl: "https://images.unsplash.com/photo-1592864696081-30d0fb9254c2?w=800&q=80", tags: ["pottery", "craft", "india", "artisan", "handmade"] },
  { userId: 1006, title: "Madhubani Painting", caption: "Traditional folk art from Bihar with vibrant geometric patterns.", imageUrl: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&q=80", tags: ["madhubani", "art", "india", "folk", "painting"] },
  { userId: 1006, title: "Rangoli Design", caption: "An intricate floor art design made with colored powders.", imageUrl: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=800&q=80", tags: ["rangoli", "art", "india", "festival", "design"] },

  // ─── INDIAN TRANSPORT ───
  { userId: 1017, title: "Royal Enfield Ride", caption: "Bikers on Royal Enfields through the Ladakh passes.", imageUrl: "https://images.unsplash.com/photo-1558981285-6f0c94958bb6?w=800&q=80", tags: ["royalenfield", "bike", "ladakh", "india", "adventure"] },
  { userId: 1001, title: "Toy Train Shimla", caption: "The heritage Kalka-Shimla railway through the mountains.", imageUrl: "https://images.unsplash.com/photo-1553701879-4ddf72a8bcc8?w=800&q=80", tags: ["train", "shimla", "india", "heritage", "mountains"] },

  // ─── INDIAN SPORTS ───
  { userId: 1026, title: "Kushti Wrestling", caption: "Traditional Indian mud wrestling at an akhara.", imageUrl: "https://images.unsplash.com/photo-1517438322307-e67111335449?w=800&q=80", tags: ["kushti", "wrestling", "india", "sports", "tradition"] },
  { userId: 1026, title: "Morning Yoga Class", caption: "Group yoga session at sunrise on Marina Beach.", imageUrl: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80", tags: ["yoga", "fitness", "india", "beach", "wellness"] },
  { userId: 1003, title: "Kabaddi Match", caption: "The intensity of a Pro Kabaddi League game.", imageUrl: "https://images.unsplash.com/photo-1461896836934-bd45ba48e298?w=800&q=80", tags: ["kabaddi", "sports", "india", "team", "action"] },

  // ─── RAJASTHAN SPECIAL ───
  { userId: 1008, title: "Jaisalmer Fort", caption: "The golden fortress rising from the Thar Desert.", imageUrl: "https://images.unsplash.com/photo-1599661559864-47b2c0199e43?w=800&q=80", tags: ["jaisalmer", "fort", "rajasthan", "india", "desert"] },
  { userId: 1008, title: "Thar Desert Camels", caption: "Camel caravan crossing the golden sand dunes at sunset.", imageUrl: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800&q=80", tags: ["thar", "desert", "camels", "rajasthan", "india"] },

  // ─── MONSOON ───
  { userId: 1001, title: "Mumbai Monsoon", caption: "Rain-soaked streets of Mumbai during peak monsoon.", imageUrl: "https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?w=800&q=80", tags: ["monsoon", "rain", "mumbai", "india", "weather"] },
  { userId: 1013, title: "Western Ghats Waterfall", caption: "Lush waterfalls cascading down the ghats.", imageUrl: "https://images.unsplash.com/photo-1432405972618-c6b0cfba8673?w=800&q=80", tags: ["monsoon", "waterfall", "india", "nature", "green"] },

  // ─── INDIAN PEOPLE & PORTRAITS ───
  { userId: 1024, title: "Rajasthani Elder", caption: "Weathered face telling stories of the desert.", imageUrl: "https://images.unsplash.com/photo-1545957463-5c11ccf30dcc?w=800&q=80", tags: ["portrait", "rajasthan", "india", "people", "elder"] },
  { userId: 1001, title: "Chai Wallah", caption: "A tea seller pouring chai with the signature long pour.", imageUrl: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800&q=80", tags: ["chai", "portrait", "india", "street", "tea"] },

  // ─── NORTHEAST INDIA ───
  { userId: 1008, title: "Meghalaya Living Root Bridge", caption: "Ancient bridges grown from living tree roots.", imageUrl: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80", tags: ["meghalaya", "northeast", "india", "nature", "bridge"] },
  { userId: 1005, title: "Kaziranga Rhino", caption: "The one-horned rhinoceros in Assam's famous national park.", imageUrl: "https://images.unsplash.com/photo-1535338454528-1b9456715d4e?w=800&q=80", tags: ["kaziranga", "rhino", "wildlife", "assam", "india"] },

  // ─── MORE INDIAN ───
  { userId: 1011, title: "India Gate Delhi", caption: "The war memorial arch illuminated at night.", imageUrl: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800&q=80", tags: ["indiagate", "delhi", "india", "monument", "night"] },
  { userId: 1002, title: "Lotus Temple", caption: "The stunning Bahai House of Worship in Delhi.", imageUrl: "https://images.unsplash.com/photo-1590766940554-634a89e48e0d?w=800&q=80", tags: ["lotustemple", "delhi", "india", "architecture", "modern"] },
  { userId: 1001, title: "Mumbai Skyline", caption: "The glittering skyline of India's financial capital.", imageUrl: "https://images.unsplash.com/photo-1567157577867-05ccb1388e13?w=800&q=80", tags: ["mumbai", "skyline", "india", "city", "modern"] },
  { userId: 1025, title: "Bangalore IT Park", caption: "Modern glass towers of India's Silicon Valley.", imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80", tags: ["bangalore", "tech", "modern", "india", "skyline"] },
  { userId: 1007, title: "Indian Startup Hub", caption: "Co-working space in Bangalore's tech corridor.", imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80", tags: ["startup", "bangalore", "india", "tech", "coworking"] },
  { userId: 1024, title: "Rice Paddy Fields", caption: "Emerald green rice terraces in the Western Ghats.", imageUrl: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80", tags: ["rice", "farming", "india", "green", "rural"] },
  { userId: 1024, title: "Mustard Fields Punjab", caption: "Endless yellow mustard fields stretching to the horizon.", imageUrl: "https://images.unsplash.com/photo-1495107334309-fcf20504a5ab?w=800&q=80", tags: ["mustard", "punjab", "india", "farming", "yellow"] },
  { userId: 1001, title: "Marine Drive Night", caption: "The Queen's Necklace - Mumbai's iconic seafront at night.", imageUrl: "https://images.unsplash.com/photo-1567157577867-05ccb1388e13?w=800&q=80", tags: ["mumbai", "night", "city", "india", "lights"] },
  { userId: 1013, title: "Rann of Kutch", caption: "The vast white salt desert of Gujarat under moonlight.", imageUrl: "https://images.unsplash.com/photo-1592237000305-651fc897d287?w=800&q=80", tags: ["kutch", "desert", "india", "gujarat", "nature"] },
  { userId: 1011, title: "Stepwell Geometry", caption: "The mesmerizing symmetry of Chand Baori stepwell.", imageUrl: "https://images.unsplash.com/photo-1590071089561-2f59cfb74f95?w=800&q=80", tags: ["stepwell", "geometry", "rajasthan", "india", "architecture"] },
  { userId: 1002, title: "Diwali Fireworks", caption: "A spectacular fireworks display over the city skyline.", imageUrl: "https://images.unsplash.com/photo-1498931299210-d53080a1b10c?w=800&q=80", tags: ["diwali", "fireworks", "india", "night", "celebration"] },
  { userId: 1005, title: "Jim Corbett National Park", caption: "Dense sal forests of India's oldest national park.", imageUrl: "https://images.unsplash.com/photo-1474511320723-9a56873571b7?w=800&q=80", tags: ["jimcorbett", "wildlife", "india", "forest", "nature"] },
  { userId: 1010, title: "Tandoori Platter", caption: "Smoky tandoori chicken with mint chutney.", imageUrl: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=800&q=80", tags: ["tandoori", "food", "india", "nonveg", "grill"] },
  { userId: 1010, title: "Chole Bhature", caption: "The iconic Punjabi breakfast.", imageUrl: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&q=80", tags: ["cholebhature", "food", "punjabi", "india", "breakfast"] },
  { userId: 1024, title: "Indian School Children", caption: "Bright smiles in school uniforms heading to class.", imageUrl: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80", tags: ["children", "school", "india", "education", "smile"] },
  { userId: 1001, title: "Howrah Bridge Kolkata", caption: "The iconic cantilever bridge over the Hooghly River.", imageUrl: "https://images.unsplash.com/photo-1558431382-27e303142255?w=800&q=80", tags: ["howrahbridge", "kolkata", "india", "bridge", "iconic"] },
  { userId: 1017, title: "Ambassador Car", caption: "The classic Hindustan Ambassador.", imageUrl: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&q=80", tags: ["ambassador", "car", "vintage", "india", "classic"] },
  { userId: 1005, title: "Flamingos Mumbai", caption: "A flock of flamingos at the Sewri mudflats.", imageUrl: "https://images.unsplash.com/photo-1497206365907-f5e630693df0?w=800&q=80", tags: ["flamingo", "bird", "mumbai", "india", "nature"] },
  { userId: 1013, title: "Western Ghats Green", caption: "Dense tropical rainforest of the Western Ghats.", imageUrl: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&q=80", tags: ["westernghats", "forest", "india", "nature", "biodiversity"] },
  { userId: 1006, title: "Warli Art", caption: "Traditional tribal art from Maharashtra.", imageUrl: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&q=80", tags: ["warli", "tribalart", "maharashtra", "india", "art"] },
  { userId: 1016, title: "Odissi Dance", caption: "Graceful Odissi dance in a traditional setting.", imageUrl: "https://images.unsplash.com/photo-1547153760-18fc86c4afcb?w=800&q=80", tags: ["odissi", "dance", "classical", "india", "odisha"] },
  { userId: 1024, title: "Sitar in Golden Light", caption: "The strings of a sitar glowing under stage lights.", imageUrl: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=800&q=80", tags: ["sitar", "music", "india", "classical", "instrument"] },
  { userId: 1008, title: "Zanskar Frozen River", caption: "The frozen Chadar trek over the Zanskar River.", imageUrl: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&q=80", tags: ["zanskar", "trek", "ladakh", "india", "adventure"] },
  { userId: 1003, title: "IPL Stadium Crowd", caption: "The electric atmosphere of an IPL match.", imageUrl: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&q=80", tags: ["ipl", "cricket", "india", "stadium", "crowd"] },
  { userId: 1009, title: "Indian Film Set", caption: "Behind the scenes of a Hindi film production.", imageUrl: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&q=80", tags: ["filmset", "bollywood", "india", "cinema", "production"] },
  { userId: 1004, title: "Assam Tea Picking", caption: "Workers harvesting in the vast tea gardens of Assam.", imageUrl: "https://images.unsplash.com/photo-1556881286-fc6915169721?w=800&q=80", tags: ["tea", "assam", "india", "harvest", "green"] },
  { userId: 1004, title: "Filter Coffee Tumbler", caption: "South Indian filter coffee in a traditional steel tumbler.", imageUrl: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&q=80", tags: ["coffee", "southindian", "india", "beverage", "filter"] },
  { userId: 1014, title: "Kundan Jewelry Set", caption: "Exquisite traditional bridal jewelry.", imageUrl: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&q=80", tags: ["jewelry", "bridal", "india", "gold", "kundan"] },
  { userId: 1015, title: "Tibetan Prayer Flags", caption: "Colorful prayer flags fluttering over Himalayan passes.", imageUrl: "https://images.unsplash.com/photo-1504457047772-27faf1c00561?w=800&q=80", tags: ["prayerflags", "tibet", "himalaya", "india", "spiritual"] },
  { userId: 1014, title: "Kolhapuri Chappal", caption: "Traditional handcrafted leather sandals.", imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80", tags: ["kolhapuri", "footwear", "india", "craft", "leather"] },
  { userId: 1025, title: "Flower Market Kolkata", caption: "Mountains of marigolds at Mallick Ghat market.", imageUrl: "https://images.unsplash.com/photo-1490750967868-88aa4f44baee?w=800&q=80", tags: ["flowers", "market", "kolkata", "india", "marigold"] },
  { userId: 1008, title: "Ooty Hills", caption: "The beautiful Nilgiri hills of Tamil Nadu.", imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80", tags: ["ooty", "hills", "tamilnadu", "india", "nature"] },
  { userId: 1002, title: "Alleppey Houseboat", caption: "Cruising through Kerala's palm-fringed backwaters.", imageUrl: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=800&q=80", tags: ["alleppey", "houseboat", "kerala", "india", "backwaters"] },
  { userId: 1013, title: "Coorg Coffee Plantation", caption: "Lush coffee estates in the Scotland of India.", imageUrl: "https://images.unsplash.com/photo-1559525839-b184a4d698c7?w=800&q=80", tags: ["coorg", "coffee", "india", "plantation", "green"] },
  { userId: 1028, title: "Stars Over Pangong", caption: "The Milky Way reflected in the high-altitude lake.", imageUrl: "https://images.unsplash.com/photo-1507400492013-162706c8c05e?w=800&q=80", tags: ["astrophotography", "pangong", "ladakh", "india", "stars"] },
  { userId: 1013, title: "Valley of Flowers", caption: "Alpine wildflowers blooming in Uttarakhand.", imageUrl: "https://images.unsplash.com/photo-1490750967868-88aa4f44baee?w=800&q=80", tags: ["valleyofflowers", "uttarakhand", "india", "flowers", "trek"] },
  { userId: 1013, title: "Sunset Over Thar", caption: "Golden desert sunset from Sam Sand Dunes.", imageUrl: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800&q=80", tags: ["thar", "sunset", "rajasthan", "india", "desert"] },
  { userId: 1005, title: "Indian Monkey", caption: "A playful Rhesus macaque in the temple complex.", imageUrl: "https://images.unsplash.com/photo-1540573133985-87b6da6d54a9?w=800&q=80", tags: ["monkey", "wildlife", "india", "temple", "animal"] },
  { userId: 1013, title: "Lotus Bloom India", caption: "The sacred lotus flower in a temple pond.", imageUrl: "https://images.unsplash.com/photo-1474557157379-8aa74a6ef541?w=800&q=80", tags: ["lotus", "flower", "india", "sacred", "nature"] },
  { userId: 1001, title: "Mumbai CST Station", caption: "The Victorian Gothic architecture of CST.", imageUrl: "https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?w=800&q=80", tags: ["mumbai", "station", "architecture", "india", "heritage"] },
  { userId: 1011, title: "Meenakshi Temple Gopuram", caption: "Thousands of colorful sculptures on the towering gopuram.", imageUrl: "https://images.unsplash.com/photo-1596484552834-6a58f850e0a1?w=800&q=80", tags: ["meenakshi", "temple", "tamilnadu", "india", "sculpture"] },
  { userId: 1008, title: "Leh Palace", caption: "The ancient royal palace overlooking the Leh valley.", imageUrl: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800&q=80", tags: ["leh", "palace", "ladakh", "india", "heritage"] },

  // ═══════════ 20% INTERNATIONAL CONTENT ═══════════

  // ─── MARVEL & DC ───
  { userId: 1019, title: "Iron Man Suit Display", caption: "The iconic red and gold armor on display.", imageUrl: "https://images.unsplash.com/photo-1635863138275-d9b33299680b?w=800&q=80", tags: ["marvel", "ironman", "superhero", "avengers", "comics"] },
  { userId: 1019, title: "Spider-Man Wall Art", caption: "Amazing Spider-Man street art on a city wall.", imageUrl: "https://images.unsplash.com/photo-1608889825103-eb5ed706fc64?w=800&q=80", tags: ["marvel", "spiderman", "streetart", "superhero", "art"] },
  { userId: 1019, title: "Captain America Shield", caption: "The vibranium shield — symbol of hope.", imageUrl: "https://images.unsplash.com/photo-1569003339405-ea396a5a8a90?w=800&q=80", tags: ["marvel", "captainamerica", "superhero", "avengers", "shield"] },
  { userId: 1019, title: "Avengers Assemble", caption: "The ultimate superhero team-up.", imageUrl: "https://images.unsplash.com/photo-1618519764620-7403abdbdfe9?w=800&q=80", tags: ["marvel", "avengers", "superhero", "team", "epic"] },
  { userId: 1020, title: "Batman Signal", caption: "The Bat-Signal lighting up Gotham's night sky.", imageUrl: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=800&q=80", tags: ["dc", "batman", "gotham", "superhero", "night"] },
  { userId: 1020, title: "Superman Symbol", caption: "The iconic S shield — hope for humanity.", imageUrl: "https://images.unsplash.com/photo-1531259683007-016a7b628fc3?w=800&q=80", tags: ["dc", "superman", "hope", "superhero", "symbol"] },
  { userId: 1020, title: "Joker Art", caption: "Why so serious? Stunning fan art of the Clown Prince.", imageUrl: "https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?w=800&q=80", tags: ["dc", "joker", "villain", "art", "dark"] },

  // ─── CODING & TECH ───
  { userId: 1007, title: "VS Code Setup", caption: "The perfect dark theme coding environment.", imageUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=80", tags: ["coding", "vscode", "programming", "developer", "tech"] },
  { userId: 1021, title: "Clean Code Terminal", caption: "Green text on black — the hacker aesthetic.", imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80", tags: ["coding", "terminal", "hacker", "tech", "matrix"] },
  { userId: 1007, title: "JavaScript Code", caption: "Beautiful JavaScript code with syntax highlighting.", imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80", tags: ["javascript", "coding", "programming", "web", "developer"] },
  { userId: 1021, title: "Mechanical Keyboard RGB", caption: "Custom mechanical keyboard with RGB backlighting.", imageUrl: "https://images.unsplash.com/photo-1595225476474-87563907a212?w=800&q=80", tags: ["keyboard", "tech", "rgb", "gaming", "mechanical"] },
  { userId: 1021, title: "Server Room", caption: "Rows of blinking servers in a modern data center.", imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80", tags: ["server", "tech", "datacenter", "cloud", "infrastructure"] },

  // ─── DOGS & CATS ───
  { userId: 1012, title: "Golden Retriever Smile", caption: "The happiest dog in the world.", imageUrl: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=800&q=80", tags: ["dog", "goldenretriever", "pets", "happy", "animal"] },
  { userId: 1012, title: "Indian Stray Puppy", caption: "An adorable Indian pariah puppy with soulful eyes.", imageUrl: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&q=80", tags: ["dog", "puppy", "india", "stray", "cute"] },
  { userId: 1012, title: "Husky Blue Eyes", caption: "Piercing blue eyes of a Siberian Husky.", imageUrl: "https://images.unsplash.com/photo-1605568427561-40dd23c2acea?w=800&q=80", tags: ["dog", "husky", "pets", "blueeyes", "beautiful"] },
  { userId: 1022, title: "Persian Cat Royalty", caption: "A fluffy Persian cat with an aristocratic gaze.", imageUrl: "https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?w=800&q=80", tags: ["cat", "persian", "pets", "fluffy", "royal"] },
  { userId: 1022, title: "Kitten Yawning", caption: "The cutest kitten mid-yawn.", imageUrl: "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=800&q=80", tags: ["cat", "kitten", "pets", "cute", "yawn"] },
  { userId: 1022, title: "Orange Tabby Cat", caption: "A majestic orange tabby basking in sunlight.", imageUrl: "https://images.unsplash.com/photo-1495360010541-f48722b34f7d?w=800&q=80", tags: ["cat", "tabby", "pets", "orange", "sun"] },

  // ─── INTERNATIONAL TRAVEL ───
  { userId: 1027, title: "Northern Lights Iceland", caption: "The spectacular Aurora Borealis.", imageUrl: "https://images.unsplash.com/photo-1483347756197-71ef80e95f73?w=800&q=80", tags: ["aurora", "iceland", "travel", "night", "nature"] },
  { userId: 1027, title: "Swiss Alps", caption: "Snow-capped peaks with a clear blue sky.", imageUrl: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800&q=80", tags: ["switzerland", "alps", "mountains", "travel", "snow"] },
  { userId: 1027, title: "Japanese Cherry Blossoms", caption: "Sakura trees in full bloom along a Tokyo canal.", imageUrl: "https://images.unsplash.com/photo-1522383225653-ed111181a951?w=800&q=80", tags: ["sakura", "japan", "cherryblossom", "travel", "spring"] },

  // ─── SPACE & ASTRONOMY ───
  { userId: 1023, title: "Nebula in Deep Space", caption: "A stunning view of a colorful nebula.", imageUrl: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800&q=80", tags: ["space", "nebula", "astronomy", "galaxy", "cosmos"] },
  { userId: 1023, title: "Full Moon Close-up", caption: "High-resolution details of the lunar surface.", imageUrl: "https://images.unsplash.com/photo-1532693322450-2cb5c511067d?w=800&q=80", tags: ["moon", "space", "astronomy", "night", "closeup"] },
  { userId: 1023, title: "Saturn Rings", caption: "The magnificent rings of Saturn.", imageUrl: "https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=800&q=80", tags: ["saturn", "space", "astronomy", "planet", "rings"] },

  // ─── GAMING ───
  { userId: 1021, title: "Gaming Setup RGB", caption: "Ultimate RGB gaming battlestation.", imageUrl: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=800&q=80", tags: ["gaming", "setup", "rgb", "pc", "battlestation"] },
  { userId: 1021, title: "Retro Arcade", caption: "Classic arcade machines glowing in neon.", imageUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80", tags: ["arcade", "retro", "gaming", "neon", "vintage"] },

  // ─── ABSTRACT & ART ───
  { userId: 1006, title: "Neon Abstract Waves", caption: "Flowing neon waves in a digital art piece.", imageUrl: "https://images.unsplash.com/photo-1550684376-efcbd6e3f031?w=800&q=80", tags: ["abstract", "neon", "digital", "art", "creative"] },
  { userId: 1006, title: "Liquid Color Swirl", caption: "Abstract color mixing creating organic patterns.", imageUrl: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=800&q=80", tags: ["abstract", "color", "art", "liquid", "creative"] },
  { userId: 1006, title: "Geometric Pattern", caption: "Perfectly symmetrical geometric digital art.", imageUrl: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=800&q=80", tags: ["geometric", "pattern", "art", "abstract", "symmetry"] },

  // ─── FOOD INTERNATIONAL ───
  { userId: 1010, title: "Sushi Platter", caption: "Beautifully arranged sushi with wasabi and ginger.", imageUrl: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800&q=80", tags: ["sushi", "food", "japanese", "seafood", "platter"] },
  { userId: 1004, title: "Pizza Margherita", caption: "A perfectly wood-fired Neapolitan Margherita pizza.", imageUrl: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800&q=80", tags: ["pizza", "food", "italian", "cheese", "woodfired"] },

  // ─── NATURE & OCEAN ───
  { userId: 1027, title: "Coral Reef Colors", caption: "Vibrant coral reef teeming with marine life.", imageUrl: "https://images.unsplash.com/photo-1546026423-cc4642628d2b?w=800&q=80", tags: ["coral", "ocean", "underwater", "marine", "nature"] },
  { userId: 1027, title: "Wave Crashing", caption: "A powerful ocean wave caught at the perfect moment.", imageUrl: "https://images.unsplash.com/photo-1509914398892-963f53e6e2f1?w=800&q=80", tags: ["wave", "ocean", "surf", "nature", "power"] },
  { userId: 1027, title: "Sunflower Field", caption: "An endless field of sunflowers facing the sun.", imageUrl: "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=800&q=80", tags: ["sunflower", "flower", "field", "nature", "yellow"] },

  // ─── ARCHITECTURE ───
  { userId: 1018, title: "Minimalist Interior", caption: "Clean lines and natural light in a modern home.", imageUrl: "https://images.unsplash.com/photo-1494526585095-c41746248156?w=800&q=80", tags: ["minimalist", "interior", "architecture", "modern", "design"] },
  { userId: 1018, title: "Brutalist Concrete", caption: "Raw concrete architecture in dramatic light.", imageUrl: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=800&q=80", tags: ["brutalist", "architecture", "concrete", "modern", "urban"] },
];

const seedIndian = async (req, res) => {
  try {
    // 1. Create all seed users
    for (const creator of seedCreators) {
      await pool.query(
        "INSERT IGNORE INTO users (id, username, email, full_name, password_hash) VALUES (?, ?, ?, ?, 'dummy')",
        [creator.id, creator.username, creator.email, creator.fullName]
      );
    }

    // 2. Fix any orphaned images
    await pool.query("UPDATE images SET user_id = 1001 WHERE user_id NOT IN (SELECT id FROM users)");

    // 3. Count how many seeded images we already have
    const [existing] = await pool.query("SELECT count(*) as count FROM images WHERE user_id >= 1001 AND user_id <= 1028");

    let count = 0;
    if (existing[0].count < 50) {
      // 4. Insert all seed images
      for (const img of seedImages) {
        await imageModel.create({
          userId: img.userId,
          title: img.title,
          caption: img.caption,
          imageUrl: img.imageUrl,
          sourceType: "upload",
          tags: img.tags
        });
        count++;
      }
    }

    res.json({ success: true, message: `Successfully seeded ${count} images from ${seedCreators.length} creators!` });
  } catch (error) {
    console.error("Error seeding images:", error);
    res.status(500).json({ success: false, message: "Error seeding images", error: error.message });
  }
};

module.exports = { seedIndian };
