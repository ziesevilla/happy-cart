// Default content for the Home page (hero images and featured products)
// Edit these imports or replace this file to change the default images/site content.

import shoe1 from "../images/Pages/HeroBanner1.jpg";
import shoe2 from "../images/Pages/HeroBanner2.jpg";
import heroBg from "../images/Pages/HeroBanner3.jpg";

// 🆕 Import new product images
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
// 🆕 Additional imports
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

const shoe3 = heroBg; 

const homeContent = {
  hero: {
    left: shoe1,
    centerBg: heroBg,
    right: shoe2,
  },


  heroSets: [
    {
      left: shoe1,
      centerBg: heroBg,
      right: shoe2,
      centerText: "FIND YOUR PERFECT FIT",
    },
    {
      left: shoe2,
      centerBg: shoe1,
      right: shoe1,
      centerText: "STEP INTO COMFORT",
    },
  ],
  featured: [
    { id: 1, name: "Womens Top", image: Pr2 },
    { id: 2, name: "Mens Top", image: Pr7 },
    { id: 3, name: "Womens Shoes", image: Pr12 },
    { id: 4, name: "Mens Shoes", image: Pr17 },
  ],
  happyDeals: [
    { id: 1, name: "Womens Top", image: Pr1 },
    { id: 2, name: "Mens Top", image: Pr6 },
    { id: 3, name: "Womens Shoes", image: Pr11 },
    { id: 4, name: "Mens Shoes", image: Pr16 },
    { id: 5, name: "Jeans", image: Pr21 },
    { id: 6, name: "Hoodies", image: Pr25 },
    { id: 7, name: "Accessories", image: Pr27 },
  ],

   topPicks: [
    { id: 1, name: "Urban Explorer", description: "Designed for comfort and confidence in every step.", image: Pr8 },
    { id: 2, name: "Trail Master", description: "Built tough for adventure seekers on any terrain.", image: Pr3 },
    { id: 3, name: "City Glide", description: "Sleek, modern, and made for fast-paced living.", image: Pr13 },
  ],

  // rotating promo messages for the promo banner
  promoMessages: [
    { title: "NEW MEMBERS ENJOY 15% OFF ON HAPPY CART", code: "HAPPY15", subtext: "Sign up now!" },
    { title: "FREE SHIPPING ON ORDERS OVER $50", code: "FREESHIP", subtext: "Limited time" },
    { title: "WEEKEND DEALS: EXTRA 10% OFF", code: "WEEKEND10", subtext: "Shop today" },
  ],
};

export default homeContent;
