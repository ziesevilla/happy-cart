import React, { useState, useEffect } from "react";
import { Button, Badge, Alert } from "react-bootstrap";
import { toast } from "react-toastify";
import "../../styles/pages/ProductCard.css";
import { mockDB } from "../../assets/data/mockDatabase";

const ProductCard = ({ product, onClose, onAddToCart }) => {
  const [mainImage, setMainImage] = useState(product.image);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Enhanced product data with realistic variants
  const productVariants = {
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Black', value: '#000000' },
      { name: 'White', value: '#ffffff' },
      { name: 'Navy Blue', value: '#000080' },
      { name: 'Burgundy', value: '#800020' },
      { name: 'Forest Green', value: '#228B22' },
      { name: 'Charcoal Gray', value: '#36454F' }
    ]
  };

  // Get category names from category IDs
  const getCategoryNames = () => {
    if (!product.categories || !mockDB.categories) return [];
    return product.categories.map(catId => {
      const category = mockDB.categories.find(c => c.id === catId);
      return category ? category.name : '';
    }).filter(name => name !== '');
  };

  // Generate multiple image variations (in real app, these would come from API)
  const productImages = [
    product.image,
    product.image, // In real app, these would be different angles
    product.image,
  ];

  useEffect(() => {
    // Set default selections
    if (!selectedSize) setSelectedSize(productVariants.sizes[2]); // Default to Medium
    if (!selectedColor) setSelectedColor(productVariants.colors[0].value);
    
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = '15px'; // Prevent layout shift
    
    return () => {
      document.body.style.overflow = 'unset';
      document.body.style.paddingRight = '0';
    };
  }, []);

  if (!product) return null;

  const increaseQty = () => {
    if (quantity < (product.stock || 99)) {
      setQuantity(quantity + 1);
    } else {
      toast.warning(`Maximum available quantity is ${product.stock}`);
    }
  };

  const decreaseQty = () => setQuantity(quantity > 1 ? quantity - 1 : 1);

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value) || 1;
    const maxStock = product.stock || 99;
    setQuantity(Math.min(Math.max(1, value), maxStock));
  };

  const handleAddToCart = async () => {
    if (!selectedSize || !selectedColor) {
      toast.error("Please select size and color");
      return;
    }

    setIsLoading(true);
    try {
      const cartItem = {
        id: `${product.id}-${selectedSize}-${selectedColor}`,
        productId: product.id,
        name: product.name,
        price: product.price,
        image: mainImage,
        quantity,
        size: selectedSize,
        color: selectedColor,
        colorName: productVariants.colors.find(c => c.value === selectedColor)?.name || selectedColor,
        selected: true,
        stock: product.stock
      };

      if (onAddToCart) {
        await onAddToCart(cartItem);
      }
      
      toast.success(
        <div>
          <strong>Added to Cart!</strong>
          <br />
          {quantity} × {product.name} ({selectedSize}, {productVariants.colors.find(c => c.value === selectedColor)?.name})
        </div>
      );
      
      // Don't reset quantity, keep it for user convenience
    } catch (error) {
      toast.error("Failed to add item to cart");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBuyNow = () => {
    handleAddToCart();
    // In a real app, this would navigate to checkout
    setTimeout(() => {
      toast.info(
        <div>
          <strong>Ready to Checkout!</strong>
          <br />
          Redirecting to secure checkout...
        </div>
      );
    }, 1000);
  };

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    toast.success(
      <div>
        <strong>{isWishlisted ? "Removed from" : "Added to"} Wishlist</strong>
        <br />
        {product.name}
      </div>
    );
  };

  const handleImageError = (e) => {
    setImageError(true);
    e.target.src = '/images/placeholder-product.jpg';
  };

  const isOutOfStock = product.stock === 0;
  const categoryNames = getCategoryNames();
  const selectedColorName = productVariants.colors.find(c => c.value === selectedColor)?.name;

  // Calculate if low stock
  const isLowStock = product.stock && product.stock < 10;
  const isVeryLowStock = product.stock && product.stock < 5;

  return (
    <div className="card-overlay" onClick={onClose}>
      <div className="card-content" onClick={(e) => e.stopPropagation()}>
        {/* Header with Close Button */}
        <div className="card-header">
          <h2 className="product-title">{product.name}</h2>
          <button 
            className="close-modal-btn" 
            onClick={onClose}
            aria-label="Close product details"
          >
            <span>×</span>
          </button>
        </div>

        <div className="product-card-grid">
          {/* Left Side: Enhanced Image Gallery */}
          <div className="product-images">
            <div className="main-image-container">
              <img 
                src={imageError ? '/images/placeholder-product.jpg' : mainImage} 
                alt={product.name} 
                className="main-image"
                onError={handleImageError}
                loading="lazy"
              />
              
              {/* Stock Status Badge */}
              {isOutOfStock && (
                <div className="status-badge out-of-stock-badge">
                  Out of Stock
                </div>
              )}
              {isVeryLowStock && !isOutOfStock && (
                <div className="status-badge low-stock-badge">
                  Almost Gone!
                </div>
              )}
              {isLowStock && !isVeryLowStock && !isOutOfStock && (
                <div className="status-badge low-stock-badge">
                  Low Stock
                </div>
              )}
            </div>
            
            {/* Thumbnail Gallery */}
            <div className="thumbnail-gallery">
              {productImages.map((image, index) => (
                <div 
                  key={index}
                  className={`thumbnail-container ${mainImage === image ? "active" : ""}`}
                  onClick={() => setMainImage(image)}
                >
                  <img
                    src={imageError ? '/images/placeholder-product.jpg' : image}
                    alt={`${product.name} view ${index + 1}`}
                    className="thumbnail"
                    onError={handleImageError}
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right Side: Enhanced Product Info */}
          <div className="product-details">
            {/* Product Meta Information */}
            <div className="product-meta-grid">
              {categoryNames.length > 0 && (
                <div className="category-tags">
                  {categoryNames.map((category, index) => (
                    <span key={index} className="category-tag">
                      {category}
                    </span>
                  ))}
                </div>
              )}
              
              <div className="stock-status">
                <span className={`stock-indicator ${isOutOfStock ? 'out-of-stock' : isVeryLowStock ? 'very-low-stock' : isLowStock ? 'low-stock' : 'in-stock'}`}>
                  {isOutOfStock ? 'Out of Stock' : 
                   isVeryLowStock ? `Only ${product.stock} left!` :
                   isLowStock ? `Low Stock (${product.stock} left)` : 
                   `${product.stock || '99+'} in stock`}
                </span>
              </div>
            </div>

            {/* Price Section */}
            <div className="price-section">
              <div className="price-display">
                <span className="current-price">₱{product.price.toLocaleString()}</span>
                {product.originalPrice && (
                  <span className="original-price">₱{product.originalPrice.toLocaleString()}</span>
                )}
              </div>
              {product.originalPrice && (
                <div className="savings">
                  Save ₱{(product.originalPrice - product.price).toLocaleString()}
                </div>
              )}
            </div>

            {/* Variants Section */}
            <div className="variants-section">
              {/* Color Selection */}
              <div className="variant-group">
                <label className="variant-label">
                  Color: <span className="selected-option">{selectedColorName}</span>
                </label>
                <div className="color-options-grid">
                  {productVariants.colors.map((color, index) => (
                    <button
                      key={index}
                      className={`color-option ${selectedColor === color.value ? 'active' : ''}`}
                      style={{ backgroundColor: color.value }}
                      onClick={() => setSelectedColor(color.value)}
                      aria-label={`Select color ${color.name}`}
                      title={color.name}
                    >
                      {selectedColor === color.value && (
                        <span className="checkmark">✓</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div className="variant-group">
                <label className="variant-label">
                  Size: <span className="selected-option">{selectedSize}</span>
                </label>
                <div className="size-options-grid">
                  {productVariants.sizes.map((size, index) => (
                    <button
                      key={index}
                      className={`size-option ${selectedSize === size ? 'active' : ''}`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
                <div className="size-guide-link">
                  <button className="guide-btn">Size Guide</button>
                </div>
              </div>
            </div>

            {/* Quantity Selector */}
            {!isOutOfStock && (
              <div className="quantity-section">
                <label className="quantity-label">Quantity:</label>
                <div className="quantity-controls">
                  <button 
                    className="quantity-btn decrease"
                    onClick={decreaseQty}
                    disabled={quantity <= 1}
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>
                  <input
                    type="number"
                    className="quantity-input"
                    value={quantity}
                    onChange={handleQuantityChange}
                    min="1"
                    max={product.stock || 99}
                    aria-label="Product quantity"
                  />
                  <button 
                    className="quantity-btn increase"
                    onClick={increaseQty}
                    disabled={quantity >= (product.stock || 99)}
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
                {isLowStock && (
                  <div className="stock-warning">
                    ⚠️ Only {product.stock} items left in stock!
                  </div>
                )}
              </div>
            )}

            {/* Action Buttons */}
            <div className="action-section">
              {isOutOfStock ? (
                <div className="out-of-stock-actions">
                  <Alert variant="warning" className="stock-alert">
                    <strong>Out of Stock</strong>
                    <br />
                    We'll notify you when this item is back in stock.
                  </Alert>
                  <button className="notify-btn">
                    Notify Me When Available
                  </button>
                </div>
              ) : (
                <>
                  <div className="primary-actions">
                    <button 
                      className="buy-now-btn primary-btn"
                      onClick={handleBuyNow}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <span className="loading-spinner"></span>
                      ) : (
                        'Buy Now'
                      )}
                    </button>
                    <button 
                      className="add-to-cart-btn secondary-btn"
                      onClick={handleAddToCart}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <span className="loading-spinner"></span>
                      ) : (
                        'Add to Cart'
                      )}
                    </button>
                  </div>
                  
                  <div className="secondary-actions">
                    <button 
                      className={`wishlist-btn ${isWishlisted ? 'active' : ''}`}
                      onClick={handleWishlist}
                    >
                      <span className="wishlist-icon">
                        {isWishlisted ? '❤️' : '🤍'}
                      </span>
                      {isWishlisted ? 'Saved' : 'Save for Later'}
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* Product Description */}
            <div className="description-section">
              <h4 className="section-title">Product Details</h4>
              <div className="product-description">
                {product.description || "This premium quality product combines style with comfort. Made from high-quality materials, it's designed to last while keeping you looking great."}
              </div>
              
              <div className="product-features">
                <h5>Features:</h5>
                <ul>
                  <li>Premium quality materials</li>
                  <li>Comfortable fit and feel</li>
                  <li>Durable construction</li>
                  <li>Easy to care for</li>
                  <li>Versatile styling options</li>
                </ul>
              </div>
            </div>

            {/* Trust Signals */}
            <div className="trust-signals">
              <div className="trust-item">
                <span className="trust-icon">🚚</span>
                <div className="trust-text">
                  <strong>Free Shipping</strong>
                  <span>On orders over ₱500</span>
                </div>
              </div>
              <div className="trust-item">
                <span className="trust-icon">↩️</span>
                <div className="trust-text">
                  <strong>30-Day Returns</strong>
                  <span>Easy returns within 30 days</span>
                </div>
              </div>
              <div className="trust-item">
                <span className="trust-icon">🔒</span>
                <div className="trust-text">
                  <strong>Secure Checkout</strong>
                  <span>Your data is protected</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;