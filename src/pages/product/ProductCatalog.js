import React, { useState, useEffect, useMemo } from "react";
import "../../styles/pages/ProductCatalog.css";
import { mockDB } from "../../assets/data/mockDatabase";
import ProductCard from "../../components/product/ProductCard";

// Custom hook for debouncing
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  
  return debouncedValue;
};

// Custom hook for hero slider
const useHeroSlider = (heroSets, interval = 5000) => {
  const [currentHero, setCurrentHero] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  
  useEffect(() => {
    if (isPaused || !heroSets?.length) return;
    
    const timer = setInterval(() => {
      setCurrentHero(prev => (prev + 1) % heroSets.length);
    }, interval);
    
    return () => clearInterval(timer);
  }, [currentHero, heroSets, interval, isPaused]);
  
  return { currentHero, setCurrentHero, setIsPaused };
};

// Skeleton Loading Component
const ProductCatalogSkeleton = () => (
  <div className="product-page">
    <div className="hero-skeleton skeleton"></div>
    <div className="content-area">
      <div className="sidebar">
        <div className="skeleton skeleton-text"></div>
        <div className="skeleton skeleton-text"></div>
        <div className="skeleton skeleton-text"></div>
      </div>
      <div className="products-panel">
        <div className="products-header">
          <div className="skeleton skeleton-title"></div>
          <div className="skeleton skeleton-search"></div>
        </div>
        <div className="product-grid">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="product-card-skeleton skeleton">
              <div className="skeleton skeleton-image"></div>
              <div className="skeleton skeleton-text"></div>
              <div className="skeleton skeleton-price"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

// Filter Summary Component
const FilterSummary = ({ filters, onClear }) => {
  const hasActiveFilters = filters.categories.length > 0 || filters.price || filters.search;
  
  if (!hasActiveFilters) return null;
  
  return (
    <div className="filter-summary">
      <span className="summary-label">Active Filters:</span>
      {filters.categories.map(cat => (
        <span key={cat} className="filter-tag">
          {cat} 
          <button 
            onClick={() => onClear('categories', cat)}
            className="tag-remove"
          >×</button>
        </span>
      ))}
      {filters.price && (
        <span className="filter-tag">
          Price: {filters.price}
          <button 
            onClick={() => onClear('price')}
            className="tag-remove"
          >×</button>
        </span>
      )}
      {filters.search && (
        <span className="filter-tag">
          Search: "{filters.search}"
          <button 
            onClick={() => onClear('search')}
            className="tag-remove"
          >×</button>
        </span>
      )}
      <button className="clear-all-btn" onClick={() => onClear('all')}>
        Clear All
      </button>
    </div>
  );
};

const ProductCatalog = () => {
  // Data with safety checks
  const { 
    products = [], 
    categories = [], 
    priceRanges = [], 
    heroSets = [] 
  } = mockDB.productCatalog || {};

  // State management
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    categories: [],
    price: "",
    search: ""
  });
  const [sortBy, setSortBy] = useState("default");
  const [activeProduct, setActiveProduct] = useState(null);

  // Custom hooks
  const { currentHero, setCurrentHero, setIsPaused } = useHeroSlider(heroSets);
  const debouncedSearch = useDebounce(filters.search, 300);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  // Load filters from localStorage
  useEffect(() => {
    const savedFilters = localStorage.getItem('productFilters');
    if (savedFilters) {
      setFilters(JSON.parse(savedFilters));
    }
  }, []);

  // Save filters to localStorage
  useEffect(() => {
    localStorage.setItem('productFilters', JSON.stringify(filters));
  }, [filters]);

  // Get category counts
  const getCategoryCount = (category) => {
    return products.filter(product => product.category === category).length;
  };

  // Filter and sort products
  const sortedAndFilteredProducts = useMemo(() => {
    let result = [...products];

    // Category filter
    if (filters.categories.length > 0 && !filters.categories.includes("All")) {
      result = result.filter(p => filters.categories.includes(p.category));
    }

    // Price filter
    if (filters.price) {
      const priceRange = priceRanges.find(r => r.label === filters.price);
      if (priceRange) {
        result = result.filter(
          p => p.price >= priceRange.min && p.price <= priceRange.max
        );
      }
    }

    // Search filter (using debounced value)
    if (debouncedSearch.trim() !== "") {
      result = result.filter(p =>
        p.name.toLowerCase().includes(debouncedSearch.toLowerCase())
      );
    }

    // Sorting
    switch(sortBy) {
      case "price-low":
        return result.sort((a, b) => a.price - b.price);
      case "price-high":
        return result.sort((a, b) => b.price - a.price);
      case "name":
        return result.sort((a, b) => a.name.localeCompare(b.name));
      default:
        return result;
    }
  }, [products, filters, debouncedSearch, sortBy, priceRanges]);

  // Filter handlers
  const updateFilters = (type, value) => {
    setFilters(prev => ({
      ...prev,
      [type]: value
    }));
  };

  const toggleCategory = (category) => {
    if (category === "All") {
      updateFilters("categories", ["All"]);
    } else {
      const newCategories = filters.categories.includes(category)
        ? filters.categories.filter(c => c !== category)
        : [...filters.categories.filter(c => c !== "All"), category];
      updateFilters("categories", newCategories);
    }
  };

  const clearFilter = (type, value = null) => {
    if (type === 'all') {
      setFilters({
        categories: [],
        price: "",
        search: ""
      });
    } else if (type === 'categories' && value) {
      updateFilters('categories', filters.categories.filter(c => c !== value));
    } else {
      updateFilters(type, type === 'categories' ? [] : "");
    }
  };

  const clearAllFilters = () => {
    setFilters({
      categories: [],
      price: "",
      search: ""
    });
  };

  // Hero slider controls
  const goToSlide = (index) => {
    setCurrentHero(index);
  };

  if (isLoading) {
    return <ProductCatalogSkeleton />;
  }

  return (
    <div className="product-page">
      {/* Hero Banner */}
      <div 
        className="hero-container"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {heroSets.map((hero, index) => (
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
        
        {/* Hero Navigation Dots */}
        {heroSets.length > 1 && (
          <div className="hero-dots">
            {heroSets.map((_, index) => (
              <button
                key={index}
                className={`hero-dot ${index === currentHero ? "active" : ""}`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      <div className="content-area">
        {/* Sidebar */}
        <aside className="sidebar">

          {/* Sort Options */}
          <div className="filter-section">
            <h4>Sort By</h4>
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="sort-select"
            >
              <option value="default">Default</option>
              <option value="name">Name A-Z</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>

          {/* Categories */}
          <div className="filter-section">
            <h4>Categories</h4>
            {categories.map((cat) => (
              <label key={cat} className="filter-label">
                <input
                  type="checkbox"
                  checked={filters.categories.includes(cat)}
                  onChange={() => toggleCategory(cat)}
                />
                <span className="filter-text">
                  {cat} <span className="count-badge">({getCategoryCount(cat)})</span>
                </span>
              </label>
            ))}
          </div>

          {/* Price Range */}
          <h4>Price Range</h4>
          <div className="filter-section">
            {priceRanges.map((range) => (
              <label key={range.label} className="filter-label">
                <input
                  type="radio"
                  name="price"
                  checked={filters.price === range.label}
                  onChange={() => updateFilters("price", range.label)}
                />
                <span className="filter-text">{range.label}</span>
              </label>
            ))}
          </div>
        </aside>

        {/* Product Grid */}
        <section className="products-panel">
          <div className="products-header">
            <h2>
              All Products 
              <span className="product-count">
                ({sortedAndFilteredProducts.length} products)
              </span>
            </h2>
            <div className="search-bar">
              <input
                type="text"
                placeholder="Search products..."
                value={filters.search}
                onChange={(e) => updateFilters("search", e.target.value)}
              />
            </div>
          </div>

          {/* Filter Summary */}
          <FilterSummary filters={filters} onClear={clearFilter} />

          {sortedAndFilteredProducts.length === 0 ? (
            <div className="no-products">
              <p>No products found matching your criteria.</p>
              <button onClick={clearAllFilters} className="clear-filters-btn">
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="product-grid">
  {sortedAndFilteredProducts.map((product) => (
    <div
      key={product.id}
      className="product-card"
      onClick={() => setActiveProduct(product)}
      role="button"
      tabIndex={0}
      onKeyPress={(e) => e.key === 'Enter' && setActiveProduct(product)}
      aria-label={`View details for ${product.name}, price ₱${product.price}`}
    >
      <img src={product.image} alt={product.name} />
      <div className="product-info">
        <h5>{product.name}</h5>
        <p className="product-price">₱{product.price}</p>
      </div>
      {/* Remove the quick-view button entirely */}
    </div>
  ))}
</div>
          )}
        </section>
      </div>

      {/* Product Detail Modal */}
      {activeProduct && (
        <ProductCard
          product={activeProduct}
          onClose={() => setActiveProduct(null)}
        />
      )}
    </div>
  );
};

export default ProductCatalog;