import React, { useState, useEffect } from "react";
import { Button, Badge, Alert } from "react-bootstrap";
import { toast } from "react-toastify";
import "../../styles/pages/ProductCard.css";

const ProductCard = ({ product, onClose, onAddToCart }) => {
  const [mainImage, setMainImage] = useState(product.image);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || "");
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || "");
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  if (!product) return null;

  const increaseQty = () => {
    if (quantity < (product.stock || 99)) {
      setQuantity(quantity + 1);
    }
  };

  const decreaseQty = () => setQuantity(quantity > 1 ? quantity - 1 : 1);

  const handleAddToCart = async () => {
    setIsLoading(true);
    try {
      const cartItem = {
        id: product.id,
        name: product.name,
        price: product.price,
        image: mainImage,
        quantity,
        size: selectedSize,
        color: selectedColor,
        selected: true
      };

      if (onAddToCart) {
        await onAddToCart(cartItem);
      }
      
      toast.success(`Added ${quantity} ${product.name} to cart!`);
      setQuantity(1); // Reset quantity after adding
    } catch (error) {
      toast.error("Failed to add item to cart");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBuyNow = () => {
    handleAddToCart();
    // In a real app, this would navigate to checkout
    toast.info("Proceeding to checkout...");
  };

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    toast.success(isWishlisted ? "Removed from wishlist" : "Added to wishlist!");
  };

  const handleImageError = (e) => {
    e.target.src = '/images/placeholder-product.jpg'; // Fallback image
  };

  const isOutOfStock = product.stock === 0;

  return (
    <div className="card-overlay" onClick={onClose}>
      <div className="card-content" onClick={(e) => e.stopPropagation()}>
        {/* Close Button - Top Right */}
        <button className="close-modal-btn" onClick={onClose} aria-label="Close">
          ×
        </button>

        <div className="product-card-grid">
          {/* Left Side: Image Gallery */}
          <div className="product-images">
            <div className="main-image-container">
              <img 
                src={mainImage} 
                alt={product.name} 
                className="main-image"
                onError={handleImageError}
              />
              {product.isNew && <Badge className="new-badge">NEW</Badge>}
              {product.discount && <Badge className="discount-badge">-{product.discount}%</Badge>}
            </div>
            
            <div className="thumbnails">
              {/* Always include main image as first thumbnail */}
              <img
                src={product.image}
                alt={product.name}
                className={`thumbnail ${mainImage === product.image ? "active" : ""}`}
                onClick={() => setMainImage(product.image)}
                onError={handleImageError}
              />
              {/* Additional images */}
              {product.images?.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`${product.name} view ${idx + 1}`}
                  className={`thumbnail ${mainImage === img ? "active" : ""}`}
                  onClick={() => setMainImage(img)}
                  onError={handleImageError}
                />
              ))}
            </div>
          </div>

          {/* Right Side: Product Info */}
          <div className="product-info">
            {/* Wishlist Button - Moved to product header area */}
            <div className="product-header">
              <h2 className="product-name">{product.name}</h2>
              <button 
                className={`wishlist-btn ${isWishlisted ? 'active' : ''}`}
                onClick={handleWishlist}
                aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
              >
                {isWishlisted ? '❤️' : '🤍'}
              </button>
            </div>

            {/* Rating and Stock Info */}
            <div className="product-meta">
              {product.rating && (
                <div className="rating">
                  <span className="stars">
                    {"★".repeat(Math.floor(product.rating))}
                    {"☆".repeat(5 - Math.floor(product.rating))}
                  </span>
                  <span className="rating-text">
                    {product.rating.toFixed(1)} ({product.reviews || 0} reviews)
                  </span>
                </div>
              )}

              <div className="stock-info">
                {product.orders && <span className="orders">{product.orders} orders</span>}
                {product.stock !== undefined && (
                  <span className={`stock ${product.stock < 10 ? 'low-stock' : ''}`}>
                    {product.stock} in stock
                  </span>
                )}
              </div>
            </div>

            {/* Price Section */}
            <div className="price-section">
              {product.originalPrice && (
                <span className="original-price">₱{product.originalPrice}</span>
              )}
              <span className="current-price">₱{product.price.toLocaleString()}</span>
              {product.discount && (
                <span className="discount-text">Save {product.discount}%</span>
              )}
            </div>

            {/* Variants */}
            <div className="variants-section">
              {product.colors && (
                <div className="color-selector">
                  <label>Color:</label>
                  <div className="color-options">
                    {product.colors.map((color, idx) => (
                      <button
                        key={idx}
                        className={`color-option ${selectedColor === color ? 'active' : ''}`}
                        style={{ backgroundColor: color }}
                        onClick={() => setSelectedColor(color)}
                        aria-label={`Select color ${color}`}
                      />
                    ))}
                  </div>
                </div>
              )}

              {product.sizes && (
                <div className="size-selector">
                  <label>Size:</label>
                  <div className="size-options">
                    {product.sizes.map((size, idx) => (
                      <button
                        key={idx}
                        className={`size-option ${selectedSize === size ? 'active' : ''}`}
                        onClick={() => setSelectedSize(size)}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Description */}
            <div className="description-section">
              <h4>Description</h4>
              <div className="description">
                {product.description || "No description available."}
              </div>
              
              {/* Product Features */}
              {product.features && (
                <div className="product-features">
                  <h5>Features:</h5>
                  <ul>
                    {product.features.map((feature, idx) => (
                      <li key={idx}>{feature}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Bottom Controls */}
            <div className="bottom-controls">
              {isOutOfStock ? (
                <Alert variant="warning" className="out-of-stock-alert">
                  Out of Stock
                </Alert>
              ) : (
                <>
                  <div className="quantity-section">
                    <label>Quantity:</label>
                    <div className="quantity-selector">
                      <Button 
                        variant="outline-secondary" 
                        onClick={decreaseQty}
                        disabled={quantity <= 1}
                      >
                        -
                      </Button>
                      <span className="quantity-display">{quantity}</span>
                      <Button 
                        variant="outline-secondary" 
                        onClick={increaseQty}
                        disabled={quantity >= (product.stock || 99)}
                      >
                        +
                      </Button>
                    </div>
                    {product.stock && product.stock < 10 && (
                      <span className="low-stock-warning">Only {product.stock} left!</span>
                    )}
                  </div>

                  <div className="action-buttons">
                    <Button 
                      variant="primary" 
                      className="buy-now-btn"
                      onClick={handleBuyNow}
                      disabled={isLoading}
                    >
                      {isLoading ? 'Adding...' : 'Buy Now'}
                    </Button>
                    <Button 
                      variant="success" 
                      className="add-to-cart-btn"
                      onClick={handleAddToCart}
                      disabled={isLoading}
                    >
                      {isLoading ? 'Adding...' : 'Add to Cart'}
                    </Button>
                  </div>
                </>
              )}
            </div>

            {/* Additional Info */}
            <div className="additional-info">
              <div className="info-item">
                <span>🚚 Free shipping on orders over ₱500</span>
              </div>
              <div className="info-item">
                <span>↩️ 30-day return policy</span>
              </div>
              <div className="info-item">
                <span>🔒 Secure checkout</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;