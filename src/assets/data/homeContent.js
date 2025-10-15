// Default content for the Home page (hero images and featured products)
// Edit these imports or replace this file to change the default images/site content.

import shoe1 from "../images/Pages/HeroBanner1.jpg";
import shoe2 from "../images/Pages/HeroBanner2.jpg";
import heroBg from "../images/Pages/HeroBanner3.jpg";
const shoe3 = heroBg; // fallback to existing banner (no HeroBanner4 present)

const homeContent = {
  hero: {
    left: shoe1,
    centerBg: heroBg,
    right: shoe2,
  },
  // multiple hero sets for timed rotation (reuses images in different order)
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
    { id: 1, name: "Classic Sneaker", image: shoe1 },
    { id: 2, name: "Running Pro", image: shoe2 },
    { id: 3, name: "Street Style", image: shoe1 },
    { id: 4, name: "Comfort Walk", image: shoe2 },
  ],
  happyDeals: [
    { id: 1, name: "Weekend Special", image: shoe1 },
    { id: 2, name: "Limited Edition", image: shoe2 },
    { id: 3, name: "Flash Sale", image: shoe3 },
  ],
  // rotating promo messages for the promo banner
  promoMessages: [
    { title: "NEW MEMBERS ENJOY 15% OFF ON HAPPY CART", code: "HAPPY15", subtext: "Sign up now!" },
    { title: "FREE SHIPPING ON ORDERS OVER $50", code: "FREESHIP", subtext: "Limited time" },
    { title: "WEEKEND DEALS: EXTRA 10% OFF", code: "WEEKEND10", subtext: "Shop today" },
  ],
};

export default homeContent;
