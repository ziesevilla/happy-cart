import React from "react";
import PropTypes from "prop-types";
import { Button, Image } from "react-bootstrap";
import "./Pages.css";


// 🖼️ Local images
import shoe1 from "../assets/images/Pages/HeroBanner1.jpg";
import shoe2 from "../assets/images/Pages/HeroBanner2.jpg";
import heroBg from "../assets/images/Pages/HeroBanner3.jpg";
import homeContent from "../assets/data/homeContent";


const Home = (props) => {
  // 🧩 Product data (can be overridden by props.featuredData)
  const products = props?.featuredData ?? homeContent.featured;


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

  // we'll render the happyDeals twice for the seamless marquee and give duplicates unique ids


  
  return (
    <div className="home-page">
      {/* 🔸 Promo Banner */}
      <section>
        <div className="promo-banner">
          NEW MEMBERS ENJOY 15% OFF ON HAPPY CART &nbsp; | &nbsp; USE CODE:{" "}
          <span className="promo-code">HAPPY15</span>
          <div className="promo-subtext">Sign up now!</div>
        </div>


        {/* 🏝️ Hero Section */}
        <div className="hero-wrapper">
          <div className="hero-image">
            <Image src={props?.heroData?.left ?? homeContent.hero.left} alt="Shoe 1" fluid />
          </div>


          <div
            className="hero-center"
            style={{ backgroundImage: `url(${props?.heroData?.centerBg ?? homeContent.hero.centerBg})` }}
          >
            <h2>
              FIND YOUR <br /> PERFECT FIT
            </h2>
            <Button variant="light" href="/products" className="mt-3">
              Shop Now
            </Button>
          </div>


          <div className="hero-image">
            <Image src={props?.heroData?.right ?? homeContent.hero.right} alt="Shoe 2" fluid />
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
};



