// src/assets/data/mockDatabase.js

// 🧩 Imports for Product Images
import Pr1 from "../images/Pr1.jpg";
import Pr2 from "../images/Pr2.jpg";
import Pr3 from "../images/Pr3.jpg";
import Pr4 from "../images/Pr4.jpg";
import Pr5 from "../images/Pr5.jpg";
import Pr6 from "../images/Pr6.jpg";
import Pr7 from "../images/Pr7.jpg";
import Pr8 from "../images/Pr8.jpg";
import Pr9 from "../images/Pr9.jpg";
import Pr10 from "../images/Pr10.jpg";
import Pr11 from "../images/Pr11.jpg";
import Pr12 from "../images/Pr12.jpg";
import Pr13 from "../images/Pr13.jpg";
import Pr14 from "../images/Pr14.jpg";
import Pr15 from "../images/Pr15.jpg";
import Pr16 from "../images/Pr16.jpg";
import Pr17 from "../images/Pr17.jpg";
import Pr18 from "../images/Pr18.jpg";
import Pr19 from "../images/Pr19.jpg";
import Pr20 from "../images/Pr20.jpg";
import Pr21 from "../images/Pr21.jpg";
import Pr22 from "../images/Pr22.jpg";
import Pr23 from "../images/Pr23.jpg";
import Pr24 from "../images/Pr24.jpg";
import Pr25 from "../images/Pr25.jpg";
import Pr26 from "../images/Pr26.jpg";
import Pr27 from "../images/Pr27.jpg";
import Pr28 from "../images/Pr28.jpg";
import Pr29 from "../images/Pr29.jpg";
import Pr30 from "../images/Pr30.jpg";
import Pr31 from "../images/Pr31.jpg";
import Pr32 from "../images/Pr32.jpg";
import Pr33 from "../images/Pr33.jpg";
import Pr34 from "../images/Pr34.jpg";
import Pr35 from "../images/Pr35.jpg";
import Pr36 from "../images/Pr36.jpg";
import Pr37 from "../images/Pr37.jpg";
import Pr38 from "../images/Pr38.jpg";
import Pr39 from "../images/Pr39.jpg";
import Pr40 from "../images/Pr40.jpg";
import Pr41 from "../images/Pr41.jpg";
import Pr42 from "../images/Pr42.jpg";
import Pr43 from "../images/Pr43.jpg";
import Pr44 from "../images/Pr44.jpg";
import Pr45 from "../images/Pr45.jpg";
import Pr46 from "../images/Pr46.jpg";
import Pr47 from "../images/Pr47.jpg";
import Pr48 from "../images/Pr48.jpg";
import Pr49 from "../images/Pr49.jpg";
import Pr50 from "../images/Pr50.jpg";
import Pr51 from "../images/Pr51.jpg";
import Pr52 from "../images/Pr52.jpg";
import Pr53 from "../images/Pr53.jpg";
import Pr54 from "../images/Pr54.jpg";

const generateId = () => Math.floor(Math.random() * 1000000);

// ==================== CATEGORY TABLE ====================
export const categories = [
  { id: 1, name: "Men's Clothing" },
  { id: 2, name: "Women's Clothing" },
  { id: 3, name: "Footwear" },
  { id: 4, name: "Accessories" },
  { id: 5, name: "Sportswear & Activewear" },
  { id: 6, name: "Outerwear" },
  { id: 7, name: "Streetwear" },
  { id: 8, name: "Kids & Teens" },
  { id: 9, name: "Seasonal & Limited Edition" },
];

// ==================== PRODUCTS TABLE ====================
export const products = [
    { id: 1, name: "Classic Tee", price: 499, stock: 35, image: Pr1, categories: [1, 7], description: "A timeless cotton tee for effortless style and comfort." },
  { id: 2, name: "Slim Fit Jeans", price: 1299, stock: 40, image: Pr2, categories: [1, 7], description: "Tailored slim-fit jeans that go with any look, day or night." },
  { id: 3, name: "Denim Jacket", price: 1799, stock: 20, image: Pr3, categories: [1, 6], description: "Rugged and versatile denim jacket with a classic wash." },
  { id: 4, name: "Casual Polo", price: 799, stock: 50, image: Pr4, categories: [1], description: "Soft cotton polo that keeps you cool and casual." },
  { id: 5, name: "Linen Shorts", price: 699, stock: 30, image: Pr5, categories: [1, 9], description: "Lightweight linen shorts perfect for warm, breezy days." },
  { id: 6, name: "Hooded Sweatshirt", price: 999, stock: 25, image: Pr6, categories: [1, 7], description: "Comfortable pullover hoodie with a soft fleece lining." },
  { id: 7, name: "Floral Dress", price: 1499, stock: 28, image: Pr7, categories: [2, 9], description: "Flowy floral dress that brings out your feminine charm." },
  { id: 8, name: "Crop Top", price: 499, stock: 40, image: Pr8, categories: [2, 7], description: "Trendy crop top made for confidence and comfort." },
  { id: 9, name: "High-Waist Jeans", price: 1299, stock: 45, image: Pr9, categories: [2], description: "Chic and flattering high-waist jeans that hug you right." },
  { id: 10, name: "Blouse & Skirt Set", price: 1599, stock: 22, image: Pr10, categories: [2], description: "Elegant two-piece set for casual or semi-formal outings." },
  { id: 11, name: "Maxi Dress", price: 1799, stock: 20, image: Pr11, categories: [2, 9], description: "Soft, breathable maxi dress for elegant daywear." },
  { id: 12, name: "Knit Cardigan", price: 899, stock: 35, image: Pr12, categories: [2, 6], description: "Cozy knit cardigan ideal for layering in cool weather." },
  { id: 13, name: "UrbanEase Sneakers", price: 1999, stock: 30, image: Pr13, categories: [3, 7], description: "Comfort-driven sneakers for all-day urban adventures." },
  { id: 14, name: "StrideMax Pro", price: 2499, stock: 20, image: Pr14, categories: [3, 5], description: "High-performance running shoes with premium support." },
  { id: 15, name: "CloudStep Everyday", price: 1799, stock: 25, image: Pr15, categories: [3], description: "Feather-light shoes with memory foam for extra comfort." },
  { id: 16, name: "AeroFlex Lite", price: 2299, stock: 18, image: Pr16, categories: [3, 5], description: "Breathable mesh shoes for gym and streetwear looks." },
  { id: 17, name: "AirFlex Runner", price: 1999, stock: 15, image: Pr17, categories: [3, 5], description: "Built for speed and stability — your ideal running partner." },
  { id: 18, name: "ComfyWalk Everyday", price: 1899, stock: 35, image: Pr18, categories: [3], description: "Soft and supportive walking shoes with durable soles." },
  { id: 19, name: "Leather Belt", price: 499, stock: 50, image: Pr19, categories: [4, 1], description: "Classic genuine leather belt for all outfit types." },
  { id: 20, name: "Canvas Cap", price: 399, stock: 40, image: Pr20, categories: [4, 7], description: "Lightweight and breathable canvas cap for everyday wear." },
  { id: 21, name: "Wristwatch", price: 1499, stock: 30, image: Pr21, categories: [4], description: "Stylish wristwatch with a minimalist dial and leather strap." },
  { id: 22, name: "Sling Bag", price: 899, stock: 35, image: Pr22, categories: [4, 7], description: "Compact sling bag with adjustable strap and secure zipper." },
  { id: 23, name: "Sunglasses", price: 699, stock: 45, image: Pr23, categories: [4, 9], description: "UV-protective sunglasses with classic frame design." },
  { id: 24, name: "Woven Bracelet", price: 299, stock: 60, image: Pr24, categories: [4], description: "Handmade woven bracelet that adds subtle charm." },
  { id: 25, name: "Training Tee", price: 599, stock: 40, image: Pr25, categories: [5, 1], description: "Moisture-wicking tee for performance and comfort." },
  { id: 26, name: "Running Shorts", price: 799, stock: 35, image: Pr26, categories: [5], description: "Lightweight shorts designed for flexibility and movement." },
  { id: 27, name: "Yoga Pants", price: 999, stock: 30, image: Pr27, categories: [5, 2], description: "Stretchable yoga pants for perfect comfort and fit." },
  { id: 28, name: "Compression Shirt", price: 899, stock: 25, image: Pr28, categories: [5], description: "Body-hugging compression top that enhances performance." },
  { id: 29, name: "Sport Jacket", price: 1399, stock: 28, image: Pr29, categories: [5, 6], description: "Lightweight sports jacket with breathable fabric." },
  { id: 30, name: "Track Pants", price: 999, stock: 32, image: Pr30, categories: [5], description: "Comfort-fit track pants for warmups and cool-downs." },
  { id: 31, name: "Windbreaker", price: 1599, stock: 25, image: Pr31, categories: [6, 9], description: "Wind-resistant jacket ideal for outdoor adventures." },
  { id: 32, name: "Puffer Jacket", price: 2299, stock: 20, image: Pr32, categories: [6], description: "Warm puffer jacket with insulated padding for winter." },
  { id: 33, name: "Denim Jacket", price: 1799, stock: 22, image: Pr33, categories: [6, 7], description: "Trendy denim jacket with streetwear appeal." },
  { id: 34, name: "Hoodie", price: 1099, stock: 35, image: Pr34, categories: [6, 7], description: "Soft hoodie designed for all-day comfort and warmth." },
  { id: 35, name: "Cardigan", price: 999, stock: 25, image: Pr35, categories: [6], description: "Elegant knit cardigan for casual layering." },
  { id: 36, name: "Long Coat", price: 1999, stock: 18, image: Pr36, categories: [6, 9], description: "Chic long coat for elevated cold-weather fashion." },
  { id: 37, name: "Oversized Hoodie", price: 1099, stock: 40, image: Pr37, categories: [7], description: "Cozy oversized hoodie for relaxed streetwear style." },
  { id: 38, name: "Graphic Tee", price: 699, stock: 50, image: Pr38, categories: [7], description: "Vibrant printed tee with eye-catching designs." },
  { id: 39, name: "Cargo Pants", price: 1199, stock: 35, image: Pr39, categories: [7], description: "Durable cargo pants with multiple pockets for utility." },
  { id: 40, name: "Bucket Hat", price: 499, stock: 45, image: Pr40, categories: [7, 4], description: "Trendy bucket hat that complements casual outfits." },
  { id: 41, name: "Sneaker Low", price: 2399, stock: 30, image: Pr41, categories: [7, 3], description: "Low-top sneakers with modern streetwear styling." },
  { id: 42, name: "Sneaker High", price: 2499, stock: 25, image: Pr42, categories: [7, 3], description: "High-top sneakers built for bold fashion statements." },
  { id: 43, name: "Kids Tee", price: 399, stock: 50, image: Pr43, categories: [8], description: "Soft cotton tee perfect for active kids." },
  { id: 44, name: "Mini Sneakers", price: 999, stock: 30, image: Pr44, categories: [8, 3], description: "Cute and durable sneakers for kids' adventures." },
  { id: 45, name: "Cute Dress", price: 699, stock: 28, image: Pr45, categories: [8], description: "Adorable printed dress for fun and comfort." },
  { id: 46, name: "Denim Shorts", price: 499, stock: 35, image: Pr46, categories: [8, 7], description: "Easy-to-wear denim shorts made for kids and teens." },
  { id: 47, name: "School Hoodie", price: 899, stock: 40, image: Pr47, categories: [8], description: "Comfortable school hoodie for daily wear." },
  { id: 48, name: "Sporty Set", price: 1099, stock: 25, image: Pr48, categories: [8, 5], description: "Matching sportswear set for kids on the move." },
  { id: 49, name: "Holiday Sweater", price: 1299, stock: 20, image: Pr49, categories: [9], description: "Festive sweater with cozy fabric and seasonal prints." },
  { id: 50, name: "Summer Sandals", price: 999, stock: 35, image: Pr50, categories: [9, 3], description: "Breathable sandals ideal for sunny adventures." },
  { id: 51, name: "Beach Shorts", price: 799, stock: 30, image: Pr51, categories: [9, 1], description: "Vibrant shorts perfect for beach or casual days." },
  { id: 52, name: "Limited Edition Hoodie", price: 2499, stock: 15, image: Pr52, categories: [9, 7], description: "Exclusive hoodie released in limited quantities." },
  { id: 53, name: "Festival Hat", price: 599, stock: 40, image: Pr53, categories: [9, 4], description: "Stylish hat to complete your festival outfit." },
  { id: 54, name: "Pride Edition Tee", price: 699, stock: 50, image: Pr54, categories: [9, 7], description: "Celebrate equality with our limited Pride tee." },
];

// ==================== HOME PAGE DATA ====================
export const featured = [
  { id: 1, name: "Classic Tee", image: Pr1 },
  { id: 2, name: "Floral Dress", image: Pr7 },
  { id: 3, name: "UrbanEase Sneakers", image: Pr13 },
  { id: 4, name: "Oversized Hoodie", image: Pr37 },
];

export const heroSets = [
  {
    left: Pr1,
    centerBg: Pr2,
    centerText: "SUMMER COLLECTION 2025",
    right: Pr3
  },
  {
    left: Pr4,
    centerBg: Pr5,
    centerText: "NEW ARRIVALS",
    right: Pr6
  },
  {
    left: Pr7,
    centerBg: Pr8,
    centerText: "TRENDING NOW",
    right: Pr9
  }
];

export const topPicks = [
  { id: 1, name: "Denim Jacket", description: "Rugged and versatile", image: Pr3 },
  { id: 2, name: "Maxi Dress", description: "Elegant and flowy", image: Pr11 },
  { id: 3, name: "Sneaker High", description: "Bold fashion statements", image: Pr42 },
  { id: 4, name: "Limited Edition Hoodie", description: "Exclusive release", image: Pr52 },
];

export const happyDeals = [
  { id: 1, name: "Mens Clothes", image: Pr1 },
  { id: 2, name: "Womens Clothes", image: Pr7 },
  { id: 3, name: "Footwear", image: Pr13 },
  { id: 4, name: "Accessories", image: Pr19 },
  { id: 5, name: "Sportswear", image: Pr25 },
  { id: 6, name: "Outerwear", image: Pr31 },
  { id: 7, name: "Streetwear", image: Pr37 },
  { id: 8, name: "Kids Wear", image: Pr43 },
  { id: 9, name: "Seasonal", image: Pr49 },
];

export const happyReviews = [
  {
    id: 1,
    productName: "Classic Tee",
    productImage: Pr1,
    comment: "So comfortable and fits perfectly!",
    userName: "Sarah M.",
    userImage: Pr1,
    rating: 5
  },
  {
    id: 2,
    productName: "UrbanEase Sneakers",
    productImage: Pr13,
    comment: "Best shoes I've ever worn!",
    userName: "Mike T.",
    userImage: Pr2,
    rating: 4
  },
  {
    id: 3,
    productName: "Floral Dress",
    productImage: Pr7,
    comment: "Beautiful design and great quality.",
    userName: "Jessica L.",
    userImage: Pr3,
    rating: 5
  }
];

export const promoMessages = [
  { title: "SUMMER SALE", code: "SUNNY25", subtext: "Limited time offer" },
  { title: "FREE SHIPPING", code: "SHIPFREE", subtext: "On orders over ₱999" },
  { title: "NEW CUSTOMER", code: "WELCOME15", subtext: "15% off your first order" }
];

// ==================== PRODUCT CATALOG DATA ====================
export const productCatalog = {
  heroSets: [
    {
      image: Pr1,
      text: "NEW ARRIVALS"
    },
    {
      image: Pr7,
      text: "SUMMER COLLECTION"
    },
    {
      image: Pr13,
      text: "TRENDING NOW"
    }
  ],
  categories: ["Men's Clothing", "Women's Clothing", "Footwear", "Accessories", "Sportswear & Activewear", "Outerwear", "Streetwear", "Kids & Teens", "Seasonal & Limited Edition"],
  priceRanges: [
    { label: "Under ₱500", min: 0, max: 500 },
    { label: "₱500 - ₱1000", min: 500, max: 1000 },
    { label: "₱1000 - ₱2000", min: 1000, max: 2000 },
    { label: "₱2000 - ₱3000", min: 2000, max: 3000 },
    { label: "Over ₱3000", min: 3000, max: 10000 }
  ]
};

// ==================== PROFILE & ORDERS DATA ====================
export const profile = {
  user: {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    phone: "+63 912 345 6789",
    password: "123456",
    avatar: "https://cdn-icons-png.flaticon.com/512/149/149071.png"
  }
};

export const addresses = [
  {
    type: 'Home',
    name: 'John Doe',
    contact: '+63 912 345 6789',
    address: '123 Main Street, Barangay 123, Manila, Metro Manila 1000',
    isDefault: true
  },
  {
    type: 'Work',
    name: 'John Doe',
    contact: '+63 912 345 6789',
    address: '456 Office Building, Makati Central Business District, Makati City 1200',
    isDefault: false
  },
  {
    type: 'Family',
    name: 'Jane Doe',
    contact: '+63 917 654 3210',
    address: '789 Family Home, Quezon City, Metro Manila 1100',
    isDefault: false
  }
];

export const orders = [
  {
    orderId: "ORD-001",
    product: "Classic Tee",
    variation: "Black / Large",
    quantity: 2,
    price: 998,
    date: "2025-10-15",
    status: "Completed",
    icon: "✅",
    image: Pr1
  },
  {
    orderId: "ORD-002",
    product: "UrbanEase Sneakers",
    variation: "White / 42",
    quantity: 1,
    price: 1999,
    date: "2025-10-18",
    status: "Processing",
    icon: "🔄",
    image: Pr13
  },
  {
    orderId: "ORD-003",
    product: "Floral Dress",
    variation: "Pink / Medium",
    quantity: 1,
    price: 1499,
    date: "2025-10-20",
    status: "Out for Delivery",
    icon: "🚚",
    image: Pr7
  },
  {
    orderId: "ORD-004",
    product: "Denim Jacket",
    variation: "Blue / Large",
    quantity: 1,
    price: 1799,
    date: "2025-10-22",
    status: "Completed",
    icon: "✅",
    image: Pr3
  }
];

// ==================== INITIAL USERS & ADMINS ====================
export const mockDB = {
  users: [
    { id: 1, name: "John Doe", email: "john@example.com", password: "123456", address: "Manila, Philippines", orders: [1, 2] },
    { id: 2, name: "Maria Santos", email: "maria@example.com", password: "maria123", address: "Quezon City, Philippines", orders: [] },
    { id: 3, name: "Carlos Reyes", email: "carlos@example.com", password: "reyes789", address: "Cebu City, Philippines", orders: [3] },
    { id: 4, name: "Andrea Cruz", email: "andrea@example.com", password: "andrea456", address: "Davao City, Philippines", orders: [] },
    { id: 5, name: "Miguel Tan", email: "miguel@example.com", password: "tan321", address: "Makati, Philippines", orders: [] },
    { id: 6, name: "Sofia Lim", email: "sofia@example.com", password: "lim654", address: "Pasig City, Philippines", orders: [] },
  ],

  admins: [
    { id: 1, name: "Admin", email: "admin@fashionhub.com", password: "admin123" },
  ],

  // ==================== INITIAL CARTS ====================
  carts: {
    2: [
      { productId: 8, quantity: 2 },   // Crop Top
      { productId: 19, quantity: 1 },  // Leather Belt
    ],
    4: [
      { productId: 25, quantity: 1 },  // Training Tee
      { productId: 41, quantity: 1 },  // Sneaker Low
      { productId: 37, quantity: 2 },  // Oversized Hoodie
    ],
    6: [
      { productId: 7, quantity: 1 },   // Floral Dress
      { productId: 13, quantity: 1 },  // UrbanEase Sneakers
    ],
  },

  // ==================== INITIAL ORDERS ====================
  orders: [
    {
      id: 1,
      userId: 1,
      items: [
        { productId: 1, quantity: 2 },  // Classic Tee
        { productId: 2, quantity: 1 },  // Slim Fit Jeans
      ],
      total: 499 * 2 + 1299,
      status: "Delivered",
      date: "2025-10-20 15:45:00",
    },
    {
      id: 2,
      userId: 1,
      items: [
        { productId: 23, quantity: 1 }, // Sunglasses
        { productId: 19, quantity: 1 }, // Leather Belt
      ],
      total: 699 + 499,
      status: "Processing",
      date: "2025-10-23 09:30:00",
    },
    {
      id: 3,
      userId: 3,
      items: [
        { productId: 33, quantity: 1 }, // Denim Jacket (Outerwear)
        { productId: 14, quantity: 1 }, // StrideMax Pro
      ],
      total: 1799 + 2499,
      status: "Delivered",
      date: "2025-10-18 18:10:00",
    },
  ],

  // ==================== ALL DATA EXPORTS ====================
  products,
  categories,
  productCatalog,
  featured,
  heroSets,
  topPicks,
  happyDeals,
  happyReviews,
  promoMessages,
  profile,
  addresses,
  orders,
  currentUser: null,
};

export default mockDB;