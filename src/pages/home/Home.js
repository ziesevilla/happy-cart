import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import { Button, Image } from "react-bootstrap";
import "../../styles/pages/Home.css";
import { mockDB } from "../../assets/data/mockDatabase";

const Home = (props) => {
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
      {/* 🔸 Promo Banner */}
      <section>
        <div className="promo-banner">
          {promos[promoIndex].title} &nbsp; | &nbsp; USE CODE:{" "}
          <span className="promo-code">{promos[promoIndex].code}</span>
          <div className="promo-subtext">{promos[promoIndex].subtext}</div>
        </div>

        {/* 🏝️ Hero Section - Original Version */}
        <div className="hero-wrapper">
          <div className="hero-container hero-left">
            <Image src={heroSets[heroIndex].left} alt="Left banner" fluid />
          </div>

          <div
            className="hero-container hero-center"
            style={{
              backgroundImage: `url(${heroSets[heroIndex].centerBg})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="hero-text-overlay text-center text-white">
              <h2 className="fw-bold">{heroSets[heroIndex].centerText}</h2>
              <Button variant="light" href="/products" className="mt-3">
                Shop Now
              </Button>
            </div>
          </div>

          <div className="hero-container hero-right">
            <Image src={heroSets[heroIndex].right} alt="Right banner" fluid />
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
                  <Button variant="light" size="sm" href="/products">
                    Shop Now
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 💎 Top Picks */}
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

      {/* 🎉 Happy Deals */}
      <section 
        className="happy-deals-section"
        onMouseEnter={() => setIsMarqueePaused(true)}
        onMouseLeave={() => setIsMarqueePaused(false)}
      >
        <h3 className="fw-bold">Happy Deals</h3>
        <div className="marquee" aria-hidden="false">
          <div 
            className="marquee-track"
            style={{ animationPlayState: isMarqueePaused ? 'paused' : 'running' }}
          >
            {[...happyDeals, ...happyDeals.map((d) => ({ ...d, id: `dup-${d.id}` }))].map((deal) => (
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

      {/* 💬 Happy Reviews - Consistent with other sections */}
      <section className="happy-reviews-section">
        <h3 className="fw-bold">Happy Reviews 💕</h3>
        <div className="reviews-grid">
          {happyReviews.map((review) => (
            <div key={review.id} className="review-card">
              <img src={review.productImage} className="review-image" alt={review.productName} />
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
                    <strong>{review.userName}</strong>
                    <div className="review-rating">
                      {"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}
                    </div>
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