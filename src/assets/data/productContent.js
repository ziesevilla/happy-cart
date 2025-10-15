// src/assets/data/productContent.js
import shoe1 from "../images/Pages/HeroBanner1.jpg";
import shoe2 from "../images/Pages/HeroBanner2.jpg";
import shoe3 from "../images/Pages/HeroBanner3.jpg";

const productContent = {
  heroSets: [
    { image: shoe1, text: "FRESH STYLES EVERYDAY" },
    { image: shoe2, text: "NEW ARRIVALS JUST LANDED" },
    { image: shoe3, text: "STEP INTO COMFORT" },
    { image: shoe2, text: "STREET STYLE PICKS" },
    { image: shoe1, text: "LIMITED TIME OFFERS" },
  ],

  // 🏷️ Dynamic categories
  categories: [
    "All",
    "Women tops",
    "Men tops",
    "Kids tops",
    "Jeans",
    "Hoodies",
    "Watch",
    "Accessories",
  ],

  // 💰 Dynamic price ranges
  priceRanges: [
    { label: "Under ₱500", min: 0, max: 500 },
    { label: "₱500 - ₱1500", min: 500, max: 1500 },
    { label: "₱2000 - ₱3500", min: 2000, max: 3500 },
    { label: "₱4000 - ₱5000", min: 4000, max: 5000 },
    { label: "Over ₱5000", min: 5000, max: Infinity },
  ],

  // 👟 Products list
  products: [
    { id: 1, name: "Classic Sneaker", image: shoe1, price: 899, category: "Men tops" },
    { id: 2, name: "Running Pro", image: shoe2, price: 1299, category: "Men tops" },
    { id: 3, name: "Street Style", image: shoe3, price: 1099, category: "Women tops" },
    { id: 4, name: "Comfort Walk", image: shoe2, price: 999, category: "Jeans" },
    { id: 5, name: "Everyday Hoodie", image: shoe3, price: 1499, category: "Hoodies" },
    { id: 6, name: "Casual Watch", image: shoe1, price: 2499, category: "Watch" },
  ],
};

export default productContent;
