import React, { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../../styles/pages/ProductCatalog.css";
import { mockDB } from "../../assets/data/mockDatabase";
import ProductCard from "../../components/product/ProductCard";
import { setCategoryCounts, selectCategoryCounts } from "../../store/slices/categorySlice";

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
      <div className="filters-top-bar skeleton">
        <div className="skeleton skeleton-text" style={{height: '50px'}}></div>
      </div>
      <div className="products-panel">
        <div className="products-header">
          <div className="skeleton skeleton-title"></div>
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

// Main Component
const ProductCatalog = () => {
  const dispatch = useDispatch();
  
  // Data initialization
  const products = mockDB.products || [];
  const categoriesData = mockDB.categories || [];
  const { 
    priceRanges = [], 
    heroSets = [] 
  } = mockDB.productCatalog || {};

  // Get category names from productCatalog for display
  const categoryNames = mockDB.productCatalog?.categories || [];

  // Redux state
  const categoryCounts = useSelector(selectCategoryCounts);

  // Local state
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    categories: [],
    price: "",
    search: ""
  });
  const [sortBy, setSortBy] = useState("default");
  const [activeProduct, setActiveProduct] = useState(null);

  // Hooks
  const { currentHero, setCurrentHero, setIsPaused } = useHeroSlider(heroSets);
  const debouncedSearch = useDebounce(filters.search, 300);

  // Effects
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  // Initialize category counts in Redux
  useEffect(() => {
    if (products.length > 0 && categoriesData.length > 0) {
      dispatch(setCategoryCounts({ products, categories: categoriesData }));
    }
  }, [dispatch, products, categoriesData]);

  useEffect(() => {
    const savedFilters = localStorage.getItem('productFilters');
    if (savedFilters) {
      setFilters(JSON.parse(savedFilters));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('productFilters', JSON.stringify(filters));
  }, [filters]);

  // Helper functions
  const getCategoryCount = (categoryName) => {
    return categoryCounts[categoryName] || 0;
  };

  const updateFilters = (type, value) => {
    setFilters(prev => ({
      ...prev,
      [type]: value
    }));
  };

  const toggleCategory = (categoryName) => {
    const newCategories = filters.categories.includes(categoryName)
      ? filters.categories.filter(c => c !== categoryName)
      : [...filters.categories, categoryName];
    updateFilters("categories", newCategories);
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

  const goToSlide = (index) => {
    setCurrentHero(index);
  };

  // Filtered and sorted products
  const sortedAndFilteredProducts = useMemo(() => {
    let result = [...products];

    // Category filter
    if (filters.categories.length > 0) {
      result = result.filter(p => {
        const productCategories = p.categories || [];
        return filters.categories.some(filterCat => {
          const category = categoriesData.find(cat => cat.name === filterCat);
          return category && productCategories.includes(category.id);
        });
      });
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

    // Search filter
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
  }, [products, filters, debouncedSearch, sortBy, priceRanges, categoriesData]);

  if (isLoading) {
    return <ProductCatalogSkeleton />;
  }

  return (
    <div className="product-page">


      {/* Main Content */}
      <div className="content-area">
        {/* Top Filters Bar */}
        <div className="filters-top-bar">
          {/* First Row: Search + Sort */}
          <div className="filters-grid">
            <div className="search-bar-top">
              <input
                type="text"
                placeholder="Search products..."
                value={filters.search}
                onChange={(e) => updateFilters("search", e.target.value)}
              />
            </div>
            
            <div className="sort-section">
              <h4>Sort by:</h4>
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
          </div>

          {/* Second Row: Categories */}
          <div className="categories-row">
            <h4>Categories:</h4>
            <div className="category-pills">
              {categoryNames.map((cat) => (
                <div
                  key={cat}
                  className={`category-pill ${filters.categories.includes(cat) ? 'active' : ''}`}
                  onClick={() => toggleCategory(cat)}
                >
                  <span>{cat}</span>
                  <span className="count-badge">({getCategoryCount(cat)})</span>
                </div>
              ))}
            </div>
          </div>

          {/* Third Row: Price Range */}
          <div className="price-range-row">
            <h4>Price Range:</h4>
            <div className="price-pills">
              {priceRanges.map((range) => (
                <div
                  key={range.label}
                  className={`price-pill ${filters.price === range.label ? 'active' : ''}`}
                  onClick={() => updateFilters("price", range.label)}
                >
                  {range.label}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Products Panel */}
        <section className="products-panel">
          <div className="products-header">
            <h2>
              All Products 
              <span className="product-count">
                ({sortedAndFilteredProducts.length} products)
              </span>
            </h2>
          </div>

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
                >
                  <img src={product.image} alt={product.name} />
                  <div className="product-info">
                    <h5>{product.name}</h5>
                    <p className="product-price">₱{product.price}</p>
                  </div>
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
          onAddToCart={(cartItem) => {
            console.log('Adding to cart:', cartItem);
          }}
        />
      )}
    </div>
  );
};

export default ProductCatalog;