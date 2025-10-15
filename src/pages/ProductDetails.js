// src/pages/ProductDetails.js
import React, { useState, useEffect, useRef } from "react";
import "./../styles/pages/ProductDetails.css";
import productContent from "../assets/data/productContent";

function ProductDetails() {
  // Hero logic
  const [currentHero, setCurrentHero] = useState(0);
  const prevHero = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      prevHero.current = currentHero;
      setCurrentHero((prev) => (prev + 1) % productContent.heroSets.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [currentHero]);

  // Filter states
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(productContent.products);
  const [searchTerm, setSearchTerm] = useState("");

  // Toggle categories
  const toggleCategory = (category) => {
    if (category === "All") {
      setSelectedCategories(["All"]);
    } else {
      setSelectedCategories((prev) =>
        prev.includes(category)
          ? prev.filter((c) => c !== category)
          : [...prev.filter((c) => c !== "All"), category]
      );
    }
  };

  // Apply filters automatically
  useEffect(() => {
    let result = productContent.products;

    // Filter by category
    if (selectedCategories.length > 0 && !selectedCategories.includes("All")) {
      result = result.filter((p) => selectedCategories.includes(p.category));
    }

    // Filter by price
    if (selectedPrice) {
      const priceRange = productContent.priceRanges.find(
        (r) => r.label === selectedPrice
      );
      if (priceRange) {
        result = result.filter(
          (p) => p.price >= priceRange.min && p.price <= priceRange.max
        );
      }
    }

    // Filter by search term
    if (searchTerm.trim() !== "") {
      result = result.filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredProducts(result);
  }, [selectedCategories, selectedPrice, searchTerm]);

  // Clear filters
  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedPrice("");
    setSearchTerm("");
    setFilteredProducts(productContent.products);
  };

  return (
    <div className="product-page">
      {/* Hero Banner */}
      <div className="hero-container">
        {productContent.heroSets.map((hero, index) => (
          <div
            key={index}
            className={`hero-slide ${index === currentHero ? "visible" : ""}`}
            style={{ backgroundImage: `url(${hero.image})` }}
          >
            <div className="hero-text">
              <h2>{hero.text}</h2>
            </div>
          </div>
        ))}
      </div>
      

      {/* Content area */}
      <div className="content-area">
        {/* Sidebar */}
        <aside className="sidebar">
          <h3>Categories</h3>
          <hr />
          <p className="filter-header">Filters and Sort</p>

          <div className="filter-section">
            {productContent.categories.map((cat) => (
              <label key={cat}>
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(cat)}
                  onChange={() => toggleCategory(cat)}
                />
                {cat}
              </label>
            ))}
          </div>

          <h4>Price Range</h4>
          <div className="filter-section">
            {productContent.priceRanges.map((range) => (
              <label key={range.label}>
                <input
                  type="radio"
                  name="price"
                  checked={selectedPrice === range.label}
                  onChange={() => setSelectedPrice(range.label)}
                />
                {range.label}
              </label>
            ))}
          </div>

          <div className="button-group">
            <button onClick={clearFilters}>Clear Filter</button>
          </div>
        </aside>

        {/* Product Grid */}
        <section className="products-panel">
          <div className="products-header">
            <h2>All Products</h2>
            <div className="search-bar">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {filteredProducts.length === 0 ? (
            <p>No products found.</p>
          ) : (
            <div className="product-grid">
              {filteredProducts.map((p) => (
                <div key={p.id} className="product-card">
                  <img src={p.image} alt={p.name} />
                  <h5>{p.name}</h5>
                  <p>₱{p.price}</p>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default ProductDetails;
