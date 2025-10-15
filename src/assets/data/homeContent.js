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
};

export default homeContent;
