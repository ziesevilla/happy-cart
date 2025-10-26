import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import { Image } from "react-bootstrap";
import "../../styles/pages/Home.css";
import { mockDB } from "../../assets/data/mockDatabase";
import ShopNow from "../../components/common/ShopNow";

const Home = (props) => {
  // Use data from props if provided, otherwise use mockDB
  const products = props?.featuredData ?? mockDB.featured;
  const heroSets = props?.heroData ?? mockDB.heroSets;
  const topPicks = props?.topPicksData ?? mockDB.topPicks;
  const happyDeals = props?.happyDealsData ?? mockDB.happyDeals;
  const happyReviews = props?.happyReviewsData ?? mockDB.happyReviews;
  const promos = props?.promoData ?? mockDB.promoMessages;

  // Hero carousel logic
  const [heroIndex, setHeroIndex] = useState(0);
  const [prevHero, setPrevHero] = useState(null);
  const [currentVisible, setCurrentVisible] = useState(true);
  const prevIndexRef = useRef(0);

  useEffect(() => {
    const id = setInterval(() => {
      setHeroIndex((i) => (i + 1) % heroSets.length);
    }, 5000);
    return () => clearInterval(id);
  }, [heroSets.length]);

  useEffect(() => {
    const prevIndex = prevIndexRef.current;
    setPrevHero(heroSets[prevIndex]);
    setCurrentVisible(false);
    const enter = setTimeout(() => setCurrentVisible(true), 20);
    const cleanupPrev = setTimeout(() => setPrevHero(null), 900);
    prevIndexRef.current = heroIndex;
    return () => {
      clearTimeout(enter);
      clearTimeout(cleanupPrev);
    };
  }, [heroIndex, heroSets]);

  // Promo banner rotation
  const [promoIndex, setPromoIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => {
      setPromoIndex((i) => (i + 1) % promos.length);
    }, 4000);
    return () => clearInterval(id);
  }, [promos.length]);

  // Happy Deals pause state
  const [isMarqueePaused, setIsMarqueePaused] = useState(false);

  return (
    <div className="home-page">
      
      {/* 🎯 Promo Banner - Single Line with Separators */}
{/* <section className="promo-section">
  <div className="promo-banner">
    <div className="promo-content">
      <span className="promo-text">
        {promos[promoIndex].title}
        <span className="promo-separator">|</span>
        USE CODE: 
        <span className="promo-code">{promos[promoIndex].code}</span>
      </span>
      <span className="promo-separator">|</span>
      <span className="promo-subtext">{promos[promoIndex].subtext}</span>
    </div>
  </div>
</section> */}

      {/* 🏝️ Hero Section - Full Width & Taller */}
      <section className="hero-section">
        <div className="hero-wrapper">
          <div className="hero-container hero-left">
            <Image src={heroSets[heroIndex].left} alt="Left banner" fluid />
          </div>

          <div
            className="hero-container hero-center"
            style={{
              backgroundImage: `url(${heroSets[heroIndex].centerBg})`,
            }}
          >
            <div className="hero-text-overlay">
              <h2 className="hero-title">{heroSets[heroIndex].centerText}</h2>
              <ShopNow to="/products" label="Shop Now" />
            </div>
          </div>

          <div className="hero-container hero-right">
            <Image src={heroSets[heroIndex].right} alt="Right banner" fluid />
          </div>
        </div>
      </section>

      {/* Rest of your existing sections remain the same */}
      {/* ⭐ Featured Section */}
      <section className="featured-section">
        <div className="section-header">
          <h3 className="section-title">Featured Collection</h3>
          <p className="section-subtitle">Discover our handpicked favorites</p>
        </div>
        <div className="featured-grid">
          {products.map((product) => (
            <div key={product.id} className="featured-item">
              <img src={product.image} alt={product.name} className="featured-image" />
              <div className="featured-overlay">
                <ShopNow to="/products" size="lg" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 💎 Top Picks */}
      <section className="top-picks-section">
        <div className="section-header">
          <h3 className="section-title">Top Picks This Season</h3>
          <p className="section-subtitle">Curated styles for every occasion</p>
        </div>
        <div className="top-picks-row">
          {topPicks.map((item) => (
            <div key={item.id} className="top-pick-item">
              <img src={item.image} alt={item.name} className="top-pick-image" />
              <div className="top-pick-overlay">
                <h5 className="top-pick-name">{item.name}</h5>
                <p className="top-pick-desc">{item.description}</p>
                <ShopNow to="/products" size="sm" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 🎉 Happy Deals */}
      <section 
        className="happy-deals-section"
        onMouseEnter={() => setIsMarqueePaused(true)}
        onMouseLeave={() => setIsMarqueePaused(false)}
      >
        <div className="section-header">
          <h3 className="section-title">Shop By Category</h3>
          <p className="section-subtitle">Explore our wide range of products</p>
        </div>
        <div className="marquee">
          <div
            className="marquee-track"
            style={{
              animationPlayState: isMarqueePaused ? "paused" : "running",
            }}
          >
            {[...happyDeals, ...happyDeals].map((deal, index) => (
              <div className="deal-card" key={`${deal.id}-${index}`}>
                <img src={deal.image} alt={deal.name} className="deal-image" />
                <div className="deal-overlay">
                  <button className="deal-button">{deal.name}</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 💬 Happy Reviews */}
      <section className="happy-reviews-section">
        <div className="section-header">
          <h3 className="section-title">Customer Reviews</h3>
          <p className="section-subtitle">What our customers are saying</p>
        </div>
        <div className="reviews-grid">
          {happyReviews.map((review) => (
            <div key={review.id} className="review-card">
              <div className="review-header">
                <img
                  src={review.productImage}
                  className="review-image"
                  alt={review.productName}
                />
                <div className="review-rating">
                  {"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}
                </div>
              </div>
              <div className="review-content">
                <h5 className="review-product-name">{review.productName}</h5>
                <p className="review-comment">"{review.comment}"</p>
                <div className="review-user">
                  <img
                    src={review.userImage}
                    alt={review.userName}
                    className="user-avatar"
                  />
                  <div className="user-info">
                    <strong className="user-name">{review.userName}</strong>
                    <span className="user-role">{review.userRole}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

Home.propTypes = {
  happyDealsData: PropTypes.array,
  heroData: PropTypes.array,
  featuredData: PropTypes.array,
  promoData: PropTypes.array,
  happyReviewsData: PropTypes.array,
  topPicksData: PropTypes.array,
};

export default Home;