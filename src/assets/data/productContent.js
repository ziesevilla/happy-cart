import shoe1 from "../images/Pages/HeroBanner1.jpg";
import shoe2 from "../images/Pages/HeroBanner2.jpg";
import shoe3 from "../images/Pages/HeroBanner3.jpg";

import Pr1 from "../images/Pages/Pr1.jpg";
import Pr2 from "../images/Pages/Pr2.jpg";
import Pr3 from "../images/Pages/Pr3.jpg";
import Pr4 from "../images/Pages/Pr4.jpg";
import Pr5 from "../images/Pages/Pr5.jpg";
import Pr6 from "../images/Pages/Pr6.jpg";
import Pr7 from "../images/Pages/Pr7.jpg";
import Pr8 from "../images/Pages/Pr8.jpg";
import Pr9 from "../images/Pages/Pr9.jpg";
import Pr10 from "../images/Pages/Pr10.jpg";
import Pr11 from "../images/Pages/Pr11.jpg";
import Pr12 from "../images/Pages/Pr12.jpg";
import Pr13 from "../images/Pages/Pr13.jpg";
import Pr14 from "../images/Pages/Pr14.jpg";
import Pr15 from "../images/Pages/Pr15.jpg";
import Pr16 from "../images/Pages/Pr16.jpg";
import Pr17 from "../images/Pages/Pr17.jpg";
import Pr18 from "../images/Pages/Pr18.jpg";
import Pr19 from "../images/Pages/Pr19.jpg";
import Pr20 from "../images/Pages/Pr20.jpg";
import Pr21 from "../images/Pages/Pr21.jpg";
import Pr22 from "../images/Pages/Pr22.jpg";
import Pr23 from "../images/Pages/Pr23.jpg";
import Pr24 from "../images/Pages/Pr24.jpg";
import Pr25 from "../images/Pages/Pr25.jpg";
import Pr26 from "../images/Pages/Pr26.jpg";
import Pr27 from "../images/Pages/Pr27.jpg";
import Pr28 from "../images/Pages/Pr28.jpg";
import Pr29 from "../images/Pages/Pr29.jpg";
import Pr30 from "../images/Pages/Pr30.jpg";

const productContent = {
  heroSets: [
    { image: shoe1, text: "FRESH STYLES EVERYDAY" },
    { image: shoe2, text: "NEW ARRIVALS JUST LANDED" },
    { image: shoe3, text: "STEP INTO COMFORT" },
    { image: shoe2, text: "STREET STYLE PICKS" },
    { image: shoe1, text: "LIMITED TIME OFFERS" },
  ],

  categories: [
    "All",
    "Women Tops",
    "Men Tops",
    "Women Shoes",
    "Men Shoes",
    "Jeans",
    "Hoodies",
    "Accessories",
  ],

  priceRanges: [
    { label: "Under ₱500", min: 0, max: 500 },
    { label: "₱500 - ₱1500", min: 500, max: 1500 },
    { label: "₱2000 - ₱3500", min: 2000, max: 3500 },
    { label: "₱4000 - ₱5000", min: 4000, max: 5000 },
    { label: "Over ₱5000", min: 5000, max: Infinity },
  ],

  products: [
    { id: 1, name: "Floral Blouse", image: Pr1, price: 299, category: "Women Tops", description: "Lightweight floral blouse perfect for casual outings and summer wear." },
    { id: 2, name: "Casual Tee", image: Pr2, price: 1199, category: "Women Tops", description: "Comfortable cotton tee for daily wear with a relaxed fit." },
    { id: 3, name: "Summer Tank", image: Pr3, price: 3950, category: "Women Tops", description: "Breathable tank top made with soft fabric for hot summer days." },
    { id: 4, name: "Striped Shirt", image: Pr4, price: 2349, category: "Women Tops", description: "Classic striped shirt suitable for office or casual occasions." },
    { id: 5, name: "Chiffon Top", image: Pr5, price: 1099, category: "Women Tops", description: "Elegant chiffon top with flowy sleeves for a stylish look." },

    { id: 6, name: "Crew Neck Tee", image: Pr6, price: 199, category: "Men Tops", description: "Basic crew neck t-shirt made with soft cotton for all-day comfort." },
    { id: 7, name: "Polo Shirt", image: Pr7, price: 1299, category: "Men Tops", description: "Smart casual polo shirt perfect for work or weekend outings." },
    { id: 8, name: "Hooded Sweatshirt", image: Pr8, price: 6499, category: "Men Tops", description: "Warm hoodie with soft fleece lining for cozy indoor and outdoor wear." },
    { id: 9, name: "Denim Jacket", image: Pr9, price: 8799, category: "Men Tops", description: "Classic denim jacket with button closure, versatile for layering." },
    { id: 10, name: "Long Sleeve Tee", image: Pr10, price: 2099, category: "Men Tops", description: "Comfortable long sleeve t-shirt suitable for cooler weather." },

    { id: 11, name: "Classic Flats", image: Pr11, price: 299, category: "Women Shoes", description: "Simple and elegant flats ideal for daily wear or office." },
    { id: 12, name: "Running Sneakers", image: Pr12, price: 1899, category: "Women Shoes", description: "Lightweight sneakers designed for running and everyday comfort." },
    { id: 13, name: "High Heel Sandals", image: Pr13, price: 1599, category: "Women Shoes", description: "Stylish high heel sandals for parties and special occasions." },
    { id: 14, name: "Slip-On Loafers", image: Pr14, price: 2399, category: "Women Shoes", description: "Easy slip-on loafers with cushioned sole for comfort." },
    { id: 15, name: "Platform Sneakers", image: Pr15, price: 4999, category: "Women Shoes", description: "Trendy platform sneakers that add height without sacrificing comfort." },

    { id: 16, name: "Leather Sneakers", image: Pr16, price: 1499, category: "Men Shoes", description: "Durable leather sneakers perfect for casual and semi-formal wear." },
    { id: 17, name: "Running Trainers", image: Pr17, price: 699, category: "Men Shoes", description: "High-performance trainers designed for running and gym workouts." },
    { id: 18, name: "Slip-On Shoes", image: Pr18, price: 199, category: "Men Shoes", description: "Casual slip-on shoes for quick wear and comfort." },
    { id: 19, name: "Casual Loafers", image: Pr19, price: 1899, category: "Men Shoes", description: "Smart casual loafers with soft sole for comfortable walking." },
    { id: 20, name: "High Top Sneakers", image: Pr20, price: 5199, category: "Men Shoes", description: "Classic high-top sneakers with durable construction for style and support." },

    { id: 21, name: "Skinny Jeans", image: Pr21, price: 399, category: "Jeans", description: "Stretchy skinny jeans that provide a snug, flattering fit." },
    { id: 22, name: "Straight Cut Jeans", image: Pr22, price: 599, category: "Jeans", description: "Classic straight-cut jeans for everyday wear and comfort." },
    { id: 23, name: "Boyfriend Jeans", image: Pr23, price: 2199, category: "Jeans", description: "Relaxed fit jeans with a casual, laid-back style." },
    { id: 24, name: "Ripped Jeans", image: Pr24, price: 3999, category: "Jeans", description: "Trendy ripped jeans with a modern and edgy look." },

    { id: 25, name: "Zip-Up Hoodie", image: Pr25, price: 3199, category: "Hoodies", description: "Full-zip hoodie with soft lining, perfect for layering." },
    { id: 26, name: "Pullover Hoodie", image: Pr26, price: 1499, category: "Hoodies", description: "Classic pullover hoodie with front pocket for casual wear." },

    { id: 27, name: "Leather Belt", image: Pr27, price: 199, category: "Accessories", description: "Durable leather belt suitable for formal and casual outfits." },
    { id: 28, name: "Wrist Watch", image: Pr28, price: 1799, category: "Accessories", description: "Elegant wrist watch with analog display and leather strap." },
    { id: 29, name: "Sunglasses", image: Pr29, price: 8999, category: "Accessories", description: "Stylish sunglasses with UV protection and modern design." },
    { id: 30, name: "Backpack", image: Pr30, price: 1499, category: "Accessories", description: "Spacious backpack with multiple compartments for daily use." },
  ]
};

export default productContent;
