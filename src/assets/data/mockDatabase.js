// src/assets/data/mockDatabase.js

// 💳 Payment Method Icons
import CodIcon from "../images/codIcon.png";
import VisaIcon from "../images/visaIcon.png";
import GcashIcon from "../images/gcashIcon.png";

// 🖼️ Product Images (54 total)
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

import HbL1 from "../images/Left side hero banner (Set 1).png";
import HbL2 from "../images/Left side hero banner (Set 1).png";
import HbL3 from "../images/Left side hero banner (Set 3).png";

import HbR1 from "../images/Right side hero banner (Set 1).png";
import HbR2 from "../images/Right side hero banner (Set 2).png";
import HbR3 from "../images/Right side hero banner (Set 3).png";

import HbC1 from "../images/Center hero background (Set 1).png";
import HbC2 from "../images/Center hero background (Set 2).png";
import HbC3 from "../images/Center hero background (Set 3).png";


// ==================================================
// ==============  MOCK DATABASE  ===================
// ==================================================

export const mockDB = {
  // 🏝️ Hero Banner Sets
  heroSets: [
    { id: 1, left: HbL1, centerBg: HbC1, centerText: "STEP INTO COMFORT", right: HbR1 },
    { id: 2, left: HbL2, centerBg: HbC2, centerText: "WALK IN STYLE", right: HbR2 },
    { id: 3, left: HbL3, centerBg: HbC3, centerText: "DISCOVER YOUR LOOK", right: HbR3 },
  ],

  // 💎 Featured Products
  featured: [
    { id: 1, name: "StrideMax Pro", image: Pr14, description: "Lightweight comfort StrideMax Pro", price: 2499 },
    { id: 2, name: "CanvasCap", image: Pr20, description: "Shield the heat with Canvas Cap", price: 399 },
    { id: 3, name: "CloudStep Everyday", image: Pr15, description: "Jump in the clouds with CloudStep Everyday.", price: 1799 },
    { id: 4, name: "Wristwatch", image: Pr21, description: "Sleek through time with Wristwatch", price: 1499 },
  ],

  // 💎 Top Picks
  topPicks: [
    { id: 1, name: "AirFlex Runner", image: Pr17, description: "Lightweight running shoes designed for superior comfort and breathability." },
    { id: 2, name: "ComfyWalk Everyday", image: Pr18, description: "Stylish casual shoes made for all-day comfort and effortless walking." },
    { id: 3, name: "Mini Sneakers", image: Pr44, description: "Trendy kids’ sneakers combining durability and playful design." },
    { id: 4, name: "High-Waist Jeans", image: Pr9, description: "Fashionable jeans with a flattering high-rise fit and classic style." },
    { id: 5, name: "Denim Jacket", image: Pr3, description: "Timeless jacket crafted from durable denim for versatile layering." },
  ],

  // 🎉 Happy Deals
  happyDeals: [
    { id: 1, name: "Men's Clothing", image: Pr1 },
    { id: 2, name: "Women's Clothing", image: Pr7 },
    { id: 3, name: "Footwear", image: Pr13 },
    { id: 4, name: "Accessories", image: Pr19 },
    { id: 5, name: "Sportswear & Activewear", image: Pr25 },
    { id: 6, name: "Outerwear", image: Pr31 },
    { id: 7, name: "Streetwear", image: Pr37 },
    { id: 8, name: "Kids & Teens", image: Pr43 },
    { id: 9, name: "Seasonal & Limited Edition", image: Pr49 },
  ],

  // 💬 Happy Reviews
  happyReviews: [
    { id: 1, productImage: Pr6, productName: "Hooded Sweatshirt", comment: "Warm and cozy! The material feels premium and perfect for chilly days.", userName: "Ella Cruz", userImage: "https://i.pravatar.cc/100?img=5", rating: 5 },
    { id: 2, productImage: Pr12, productName: "Knit Cardigan", comment: "Soft and stylish. I love how it layers well with my outfits!", userName: "Lance Rivera", userImage: "https://i.pravatar.cc/100?img=3", rating: 4 },
    { id: 3, productImage: Pr18, productName: "ComfyWalk Everyday", comment: "Super comfortable and easy to slip on. Great for daily use!", userName: "Trisha Villanueva", userImage: "https://i.pravatar.cc/100?img=7", rating: 5 },
    { id: 4, productImage: Pr24, productName: "Woven Bracelet", comment: "Simple but charming! A nice everyday accessory that goes with anything.", userName: "Miko Tan", userImage: "https://i.pravatar.cc/100?img=10", rating: 4 },
    { id: 5, productImage: Pr30, productName: "Track Pants", comment: "Perfect fit and great quality! Ideal for workouts and lounging.", userName: "Bea Santos", userImage: "https://i.pravatar.cc/100?img=8", rating: 5 },
    { id: 6, productImage: Pr53, productName: "Festival Hat", comment: "Hat is used festively, so beautiful for the purpose.", userName: "Jane Allison Sacs", userImage: "https://i.pravatar.cc/100?img=12", rating: 5 },
  ],

  // 🏷️ Promo Messages
  promoMessages: [{ title: "NEW MEMBERS ENJOY 15% OFF", code: "HAPPY15", subtext: "Sign up now!" }],

  // 🛍️ Product Catalog
  productCatalog: {
    heroSets: [
      { image: Pr4, text: "FRESH STYLES EVERYDAY" },
      { image: Pr10, text: "NEW ARRIVALS JUST LANDED" },
      { image: Pr5, text: "STEP INTO COMFORT" },
      { image: Pr11, text: "STREET STYLE PICKS" },
    ],

    categories: [
      "Men's Clothing",
      "Women's Clothing",
      "Footwear",
      "Accessories",
      "Sportswear & Activewear",
      "Outerwear",
      "Streetwear",
      "Kids & Teens",
      "Seasonal & Limited Edition",
    ],

    priceRanges: [
      { label: "Under ₱500", min: 0, max: 500 },
      { label: "₱500 - ₱1500", min: 500, max: 1500 },
      { label: "₱2000 - ₱3500", min: 2000, max: 3500 },
      { label: "₱4000 - ₱5000", min: 4000, max: 5000 },
      { label: "Over ₱5000", min: 5000, max: Infinity },
    ],

    products: [
      // (✅ all 54 products preserved exactly)
      { id: 1, category: "Men's Clothing", name: "Classic Tee", price: 499, image: Pr1 },
      { id: 2, category: "Men's Clothing", name: "Slim Fit Jeans", price: 1299, image: Pr2 },
      { id: 3, category: "Men's Clothing", name: "Denim Jacket", price: 1799, image: Pr3 },
      { id: 4, category: "Men's Clothing", name: "Casual Polo", price: 799, image: Pr4 },
      { id: 5, category: "Men's Clothing", name: "Linen Shorts", price: 699, image: Pr5 },
      { id: 6, category: "Men's Clothing", name: "Hooded Sweatshirt", price: 999, image: Pr6 },
      { id: 7, category: "Women's Clothing", name: "Floral Dress", price: 1499, image: Pr7 },
      { id: 8, category: "Women's Clothing", name: "Crop Top", price: 499, image: Pr8 },
      { id: 9, category: "Women's Clothing", name: "High-Waist Jeans", price: 1299, image: Pr9 },
      { id: 10, category: "Women's Clothing", name: "Blouse & Skirt Set", price: 1599, image: Pr10 },
      { id: 11, category: "Women's Clothing", name: "Maxi Dress", price: 1799, image: Pr11 },
      { id: 12, category: "Women's Clothing", name: "Knit Cardigan", price: 899, image: Pr12 },
      { id: 13, category: "Footwear", name: "UrbanEase Sneakers", price: 1999, image: Pr13 },
      { id: 14, category: "Footwear", name: "StrideMax Pro", price: 2499, image: Pr14 },
      { id: 15, category: "Footwear", name: "CloudStep Everyday", price: 1799, image: Pr15 },
      { id: 16, category: "Footwear", name: "AeroFlex Lite", price: 2299, image: Pr16 },
      { id: 17, category: "Footwear", name: "AirFlex Runner", price: 1999, image: Pr17 },
      { id: 18, category: "Footwear", name: "ComfyWalk Everyday", price: 1899, image: Pr18 },
      { id: 19, category: "Accessories", name: "Leather Belt", price: 499, image: Pr19 },
      { id: 20, category: "Accessories", name: "Canvas Cap", price: 399, image: Pr20 },
      { id: 21, category: "Accessories", name: "Wristwatch", price: 1499, image: Pr21 },
      { id: 22, category: "Accessories", name: "Sling Bag", price: 899, image: Pr22 },
      { id: 23, category: "Accessories", name: "Sunglasses", price: 699, image: Pr23 },
      { id: 24, category: "Accessories", name: "Woven Bracelet", price: 299, image: Pr24 },
      { id: 25, category: "Sportswear & Activewear", name: "Training Tee", price: 599, image: Pr25 },
      { id: 26, category: "Sportswear & Activewear", name: "Running Shorts", price: 799, image: Pr26 },
      { id: 27, category: "Sportswear & Activewear", name: "Yoga Pants", price: 999, image: Pr27 },
      { id: 28, category: "Sportswear & Activewear", name: "Compression Shirt", price: 899, image: Pr28 },
      { id: 29, category: "Sportswear & Activewear", name: "Sport Jacket", price: 1399, image: Pr29 },
      { id: 30, category: "Sportswear & Activewear", name: "Track Pants", price: 999, image: Pr30 },
      { id: 31, category: "Outerwear", name: "Windbreaker", price: 1599, image: Pr31 },
      { id: 32, category: "Outerwear", name: "Puffer Jacket", price: 2299, image: Pr32 },
      { id: 33, category: "Outerwear", name: "Denim Jacket", price: 1799, image: Pr33 },
      { id: 34, category: "Outerwear", name: "Hoodie", price: 1099, image: Pr34 },
      { id: 35, category: "Outerwear", name: "Cardigan", price: 999, image: Pr35 },
      { id: 36, category: "Outerwear", name: "Long Coat", price: 1999, image: Pr36 },
      { id: 37, category: "Streetwear", name: "Oversized Hoodie", price: 1099, image: Pr37 },
      { id: 38, category: "Streetwear", name: "Graphic Tee", price: 699, image: Pr38 },
      { id: 39, category: "Streetwear", name: "Cargo Pants", price: 1199, image: Pr39 },
      { id: 40, category: "Streetwear", name: "Bucket Hat", price: 499, image: Pr40 },
      { id: 41, category: "Streetwear", name: "Sneaker Low", price: 2399, image: Pr41 },
      { id: 42, category: "Streetwear", name: "Sneaker High", price: 2499, image: Pr42 },
      { id: 43, category: "Kids & Teens", name: "Kids Tee", price: 399, image: Pr43 },
      { id: 44, category: "Kids & Teens", name: "Mini Sneakers", price: 999, image: Pr44 },
      { id: 45, category: "Kids & Teens", name: "Cute Dress", price: 699, image: Pr45 },
      { id: 46, category: "Kids & Teens", name: "Denim Shorts", price: 499, image: Pr46 },
      { id: 47, category: "Kids & Teens", name: "School Hoodie", price: 899, image: Pr47 },
      { id: 48, category: "Kids & Teens", name: "Sporty Set", price: 1099, image: Pr48 },
      { id: 49, category: "Seasonal & Limited Edition", name: "Holiday Sweater", price: 1299, image: Pr49 },
      { id: 50, category: "Seasonal & Limited Edition", name: "Summer Sandals", price: 999, image: Pr50 },
      { id: 51, category: "Seasonal & Limited Edition", name: "Beach Shorts", price: 799, image: Pr51 },
      { id: 52, category: "Seasonal & Limited Edition", name: "Limited Edition Hoodie", price: 2499, image: Pr52 },
      { id: 53, category: "Seasonal & Limited Edition", name: "Festival Hat", price: 599, image: Pr53 },
      { id: 54, category: "Seasonal & Limited Edition", name: "Pride Edition Tee", price: 699, image: Pr54 },
    ],
  },

  // 🛒 Cart Items
  cartItems: [
    { id: 1, name: "Beach Shorts", image: Pr51, price: 799, quantity: 3, selected: true },
    { id: 2, name: "Denim Shorts", image: Pr46, price: 499, quantity: 1, selected: true },
    { id: 3, name: "Bucket Hat", image: Pr40, price: 499, quantity: 2, selected: true },
  ],

  // 🧾 Checkout Data
  checkoutData: {
    address: {
      name: "Zyra Batumbakal",
      email: "z*****@gmail.com",
      barangay: "Barangay Mamatid",
      zip: "****",
      municipality: "Cabuyao City",
      province: "Laguna",
      country: "Philippines",
    },
    paymentMethods: [
      { id: "cod", name: "Cash on delivery", icon: CodIcon },
      { id: "card", name: "Add credit/debit card", icon: VisaIcon },
      { id: "gcash", name: "Gcash", icon: GcashIcon },
    ],
    items: [
      { id: 1, name: "AeroFlex Lite", image: Pr16, price: 2299, quantity: 1 },
      { id: 2, name: "Sling Bag", image: Pr22, price: 899, quantity: 1 },
      { id: 3, name: "School Hoodie", image: Pr47, price: 899, quantity: 1 },
    ],
  },

  // 🧾 Orders
  orders: [
    { date: "October 15, 2024", status: "Out for Delivery", icon: "fa-truck", product: "AirFlex Runner", variation: "Size 42 - Black", quantity: 1, price: 1999, code: "AF42", orderId: "BB01", seller: "StrideHub PH", image: Pr17 },
    { date: "October 16, 2024", status: "Processing", icon: "fa-box", product: "Canvas Cap", variation: "Beige", quantity: 1, price: 399, code: "CC12", orderId: "BB02", seller: "Urban Essentials", image: Pr20 },
    { date: "October 31, 2024", status: "Completed", icon: "fa-check", product: "ComfyWalk Everyday", variation: "Size 40 - Gray", quantity: 1, price: 1899, code: "CW09", orderId: "BB03", seller: "Comfort Step", image: Pr18 },
    { date: "October 31, 2024", status: "Completed", icon: "fa-check", product: "Yoga Pants", variation: "Medium - Black", quantity: 1, price: 999, code: "YP2", orderId: "BB04", seller: "ActiveWear PH", image: Pr27 },
  ],

  // 👤 User Profile
  profile: {
    user: {
      name: "Zyra Batumbakal",
      email: "zyra08@gmail.com",
      phone: "0969697119696",
      password: "****************",
    },
  },

  // 🏠 Saved Addresses
  addresses: [
    { type: "Home Address", name: "John Doe", contact: "(+63) 912 345 6789", address: "123, MAIN STREET, BRGY UNO, Quezon City, Metro Manila", isDefault: true },
    { type: "Work Address", name: "Maria Santos", contact: "(+63) 912 345 6789", address: "456, Business Center, Floor 6, Makati City, Metro Manila", isDefault: false },
    { type: "Parent's Address", name: "Pedro Reyes", contact: "(+63) 912 345 6789", address: "789, Subdivision Phase 2, Cebu City, Cebu 6000", isDefault: false },
  ],


// 👥 Customer Data
customers: [
  {
    id: 1,
    name: "Zyra Batumbakal",
    email: "zyra08@gmail.com",
    password: "Zyra@123", // (Note: in real apps, never store plain passwords!)
    phone: "0969697119696",
    address: "Barangay Mamatid, Cabuyao City, Laguna",
    joinedDate: "2024-06-21",
    orders: ["BB01", "BB03"], // references to orders in mockDB.orders
  },
  {
    id: 2,
    name: "Lance Rivera",
    email: "lance.rivera@example.com",
    password: "Lance@2024",
    phone: "09123456789",
    address: "Quezon City, Metro Manila",
    joinedDate: "2024-07-15",
    orders: ["BB02"],
  },
  {
    id: 3,
    name: "Ella Cruz",
    email: "ella.cruz@example.com",
    password: "Ella@2024",
    phone: "09998887777",
    address: "Cebu City, Cebu",
    joinedDate: "2024-08-05",
    orders: [],
  },
  {
    id: 4,
    name: "Trisha Villanueva",
    email: "trisha.v@example.com",
    password: "Trisha@2024",
    phone: "09221113344",
    address: "Pasig City, Metro Manila",
    joinedDate: "2024-09-12",
    orders: ["BB04"],
    },

  ],
};


export default mockDB;
