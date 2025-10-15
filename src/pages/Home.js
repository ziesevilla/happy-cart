import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Button, Image } from "react-bootstrap";
import "../styles/pages/Home.css";


// 🖼️ Local images
import shoe1 from "../assets/images/Pages/HeroBanner1.jpg";
import shoe2 from "../assets/images/Pages/HeroBanner2.jpg";
import heroBg from "../assets/images/Pages/HeroBanner3.jpg";
import homeContent from "../assets/data/homeContent";


const Home = (props) => {
  // 🧩 Product data (can be overridden by props.featuredData)
  const products = props?.featuredData ?? homeContent.featured;

  // Hero sets (either provided single heroData or rotate through heroSets)
  const heroSets = props?.heroData ? [props.heroData] : homeContent.heroSets ?? [homeContent.hero];
  const [heroIndex, setHeroIndex] = useState(0);
  const [prevHero, setPrevHero] = useState(null);
  const [currentVisible, setCurrentVisible] = useState(true);

  // advance hero index every 5 seconds (keeps effect deps simple)
  useEffect(() => {
    const id = setInterval(() => {
      setHeroIndex((i) => (i + 1) % heroSets.length);
    }, 5000);
    return () => clearInterval(id);
  }, [heroSets.length]);

  // when heroIndex changes, set up crossfade from previous to current
  const prevIndexRef = React.useRef(0);
  useEffect(() => {
    const prevIndex = prevIndexRef.current;
    // set prevHero for layered crossfade
    setPrevHero(heroSets[prevIndex]);
    // start with prev visible, then quickly show current to trigger CSS fade
    setCurrentVisible(false);
    const enter = setTimeout(() => setCurrentVisible(true), 20);
    const cleanupPrev = setTimeout(() => setPrevHero(null), 900);
    prevIndexRef.current = heroIndex;
    return () => {
      clearTimeout(enter);
      clearTimeout(cleanupPrev);
    };
  }, [heroIndex, heroSets]);


  // 💎 Top Picks data
  const topPicks = [
    {
      id: 1,
      name: "Urban Explorer",
      description: "Designed for comfort and confidence in every step.",
      image: shoe1,
    },
    {
      id: 2,
      name: "Trail Master",
      description: "Built tough for adventure seekers on any terrain.",
      image: shoe2,
    },
    {
      id: 3,
      name: "City Glide",
      description: "Sleek, modern, and made for fast-paced living.",
      image: heroBg,
    },
  ];


  // 🎁 Happy Deals data (use prop override if provided to make images dynamic)
  const happyDeals = props?.happyDealsData ?? homeContent.happyDeals;

  // Promo messages (rotate through them) - can be overridden via props.promoData
  const promos = props?.promoData ?? homeContent.promoMessages ?? [
    { title: "NEW MEMBERS ENJOY 15% OFF ON HAPPY CART", code: "HAPPY15", subtext: "Sign up now!" },
  ];
  const [promoIndex, setPromoIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => {
      setPromoIndex((i) => (i + 1) % promos.length);
    }, 4000);
    return () => clearInterval(id);
  }, [promos.length]);

  // we'll render the happyDeals twice for the seamless marquee and give duplicates unique ids


  
  return (
    <div className="home-page">
      {/* 🔸 Promo Banner */}
      <section>
        <div className="promo-banner">
          {promos[promoIndex].title} &nbsp; | &nbsp; USE CODE: {" "}
          <span className="promo-code">{promos[promoIndex].code}</span>
          <div className="promo-subtext">{promos[promoIndex].subtext}</div>
        </div>


        {/* 🏝️ Hero Section */}
        <div className="hero-wrapper">
          {/* left image container */}
          <div className="hero-container">
            <div className={`hero-layer ${currentVisible ? "visible" : ""}`}>
              <Image src={heroSets[heroIndex].left ?? homeContent.hero.left} alt="Left" fluid />
            </div>
            {prevHero && (
              <div className={`hero-layer ${!currentVisible ? "visible" : ""}`}>
                <Image src={prevHero.left ?? homeContent.hero.left} alt="Left prev" fluid />
              </div>
            )}
          </div>

          {/* center container */}
          <div className="hero-container">
            <div className={`hero-layer hero-center ${currentVisible ? "visible" : ""}`} style={{ backgroundImage: `url(${heroSets[heroIndex].centerBg ?? homeContent.hero.centerBg})` }}>
              <h2>{heroSets[heroIndex].centerText ?? "FIND YOUR \n PERFECT FIT"}</h2>
              <Button variant="light" href="/products" className="mt-3">Shop Now</Button>
            </div>
            {prevHero && (
              <div className={`hero-layer hero-center ${!currentVisible ? "visible" : ""}`} style={{ backgroundImage: `url(${prevHero.centerBg ?? homeContent.hero.centerBg})` }}>
                <h2>{prevHero.centerText ?? "FIND YOUR \n PERFECT FIT"}</h2>
                <Button variant="light" href="/products" className="mt-3">Shop Now</Button>
              </div>
            )}
          </div>

          {/* right image container */}
          <div className="hero-container">
            <div className={`hero-layer ${currentVisible ? "visible" : ""}`}>
              <Image src={heroSets[heroIndex].right ?? homeContent.hero.right} alt="Right" fluid />
            </div>
            {prevHero && (
              <div className={`hero-layer ${!currentVisible ? "visible" : ""}`}>
                <Image src={prevHero.right ?? homeContent.hero.right} alt="Right prev" fluid />
              </div>
            )}
          </div>
        </div>
      </section>


      {/* ⭐ Featured Section */}
      <section className="featured-section">
        <h3 className="fw-bold">Featured</h3>
        <div className="product-grid">
          {products.map((product) => (
            <div key={product.id} className="product-tile">
              <div className="card-image-overlay">
                <img src={product.image} alt={product.name} />
                <div className="overlay-text">
                  <h5>{product.name}</h5>
                  <Button variant="light" size="sm" href="#top">
                    Shop Now
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>


      {/* 💎 Top Picks Section */}
      <section className="top-picks-section">
        <h3 className="fw-bold">Top Picks</h3>
        <div className="top-picks-row">
          {topPicks.map((item) => (
            <div key={item.id} className="top-pick-card">
              <img src={item.image} alt={item.name} />
              <div className="top-pick-overlay">
                <h5>{item.name}</h5>
                <p>{item.description}</p>
                <Button variant="light" size="sm" href="/products">
                  Shop Now
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>


      {/* 🎉 Happy Deals Section */}
      <section className="happy-deals-section">
        <h3 className="fw-bold">Happy Deals</h3>
        <div className="marquee" aria-hidden="false">
          <div className="marquee-track">
            {/* duplicate set once to create seamless infinite scroll */}
            {[
              ...happyDeals,
              ...happyDeals.map((d) => ({ ...d, id: `dup-${d.id}` })),
            ].map((deal) => (
              <div className="deal-card" key={deal.id}>
                <img src={deal.image} alt={deal.name} />
                <div className="deal-overlay">
                  <h5>{deal.name}</h5>
                  <Button variant="light" size="sm" href="/products">
                    Shop Now
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


    </div>
  );
};


export default Home;

Home.propTypes = {
  happyDealsData: PropTypes.array,
  heroData: PropTypes.shape({
    left: PropTypes.string,
    centerBg: PropTypes.string,
    right: PropTypes.string,
  }),
  featuredData: PropTypes.array,
  promoData: PropTypes.array,
};



