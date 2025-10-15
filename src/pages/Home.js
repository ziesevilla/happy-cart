import React from "react";
import { Button, Image, Card } from "react-bootstrap";
import "./Pages.css";


// 🖼️ Local images
import shoe1 from "../assets/images/Pages/HeroBanner1.jpg";
import shoe2 from "../assets/images/Pages/HeroBanner2.jpg";
import heroBg from "../assets/images/Pages/HeroBanner3.jpg";


const Home = () => {
  // 🧩 Product data
  const products = [
    { id: 1, name: "Classic Sneaker", image: shoe1 },
    { id: 2, name: "Running Pro", image: shoe2 },
    { id: 3, name: "Street Style", image: shoe1 },
    { id: 4, name: "Comfort Walk", image: shoe2 },
  ];


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


  // 🎁 Happy Deals data
  const happyDeals = [
    { id: 1, name: "Weekend Special", image: shoe1 },
    { id: 2, name: "Limited Edition", image: shoe2 },
    { id: 3, name: "Flash Sale", image: shoe1 },
    { id: 4, name: "Hot Pick", image: shoe2 },
    { id: 5, name: "Trending Now", image: shoe1 },
    { id: 6, name: "Best Seller", image: shoe2 },
  ];


  let sliderRef = null;


  const sliderSettings = {
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1 },
      },
    ],
  };


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
            <Image src={shoe1} alt="Shoe 1" fluid />
          </div>


          <div
            className="hero-center"
            style={{ backgroundImage: `url(${heroBg})` }}
          >
            <h2>
              FIND YOUR <br /> PERFECT FIT
            </h2>
            <Button variant="light" href="/products" className="mt-3">
              Shop Now
            </Button>
          </div>


          <div className="hero-image">
            <Image src={shoe2} alt="Shoe 2" fluid />
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


    </div>
  );
};


export default Home;



