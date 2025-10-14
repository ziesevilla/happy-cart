import React from "react";
import { Button, Image, Card } from "react-bootstrap";
import "./Pages.css";

// 🖼️ Local images
import shoe1 from "../assets/images/Pages/HeroBanner1.jpg";
import shoe2 from "../assets/images/Pages/HeroBanner2.jpg";
import heroBg from "../assets/images/Pages/HeroBanner3.jpg";

const Home = () => {
  // 🧩 Product data (easy to modify later)
  const products = [
    { id: 1, name: "Classic Sneaker", image: shoe1 },
    { id: 2, name: "Running Pro", image: shoe2 },
    { id: 3, name: "Street Style", image: shoe1 },
    { id: 4, name: "Comfort Walk", image: shoe2 },
  ];

  return (
    <div className="home-page">
      {/* 🔸 Promo Banner */}
      <section>
        <div className="promo-banner">
          NEW MEMBERS ENJOY 15% OFF ON HAPPY CART &nbsp; | &nbsp; USE CODE:{" "}
          <span className="promo-code">HAPPY15</span>
          <div className="promo-subtext">Sign up now!</div>
        </div>
      </section>

      {/* 🏝️ Hero Section */}
      <section>
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
      <section>
        <div className="featured-section text-center">
          <h3 className="fw-bold">Featured</h3>
        </div>
      </section>

      {/* 🛍️ Dynamic Product Grid */}
      <section>
        <div className="product-grid">
          {products.map((product) => (
            <Card key={product.id} className="product-card">
              <div className="card-image-overlay">
                <Card.Img variant="top" src={product.image} alt={product.name} />
                <div className="overlay-text" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <h5 style={{ marginBottom: "12px" }}>{product.name}</h5>
                  <Button
                    variant="light"
                    size="sm"
                    href="#top"
                    style={{ marginTop: "0px" }}
                  >
                    Shop Now
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
