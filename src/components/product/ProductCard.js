import React, { useState } from "react";
import { Button } from "react-bootstrap";
import "../../styles/pages/ProductCard.css";

const ProductCard = ({ product, onClose }) => {
  const [mainImage, setMainImage] = useState(product.image);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || "");

  if (!product) return null;

  const increaseQty = () => setQuantity(quantity + 1);
  const decreaseQty = () => setQuantity(quantity > 1 ? quantity - 1 : 1);

  return (
    <div className="card-overlay" onClick={onClose}>
      <div className="card-content" onClick={(e) => e.stopPropagation()}>
        <div className="product-card-grid">
          {/* Left Side: Image Gallery */}
          <div className="product-images">
            <img src={mainImage} alt={product.name} className="main-image" />
            <div className="thumbnails">
              {product.images?.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`${product.name}-${idx}`}
                  className={`thumbnail ${mainImage === img ? "active" : ""}`}
                  onClick={() => setMainImage(img)}
                />
              ))}
            </div>
          </div>

          {/* Right Side: Product Info */}
          <div className="product-info">
            <h2 className="product-name">{product.name}</h2>

            {product.rating && (
              <div className="rating">
                {"★".repeat(Math.floor(product.rating))} {product.rating.toFixed(1)}
              </div>
            )}

            <div className="stock-order">
              {product.orders && <p>{product.orders} orders</p>}
              {product.stock && <p>{product.stock} in stock</p>}
            </div>

            <div className="price">₱{product.price}</div>

            {/* Description grows to take available space */}
            <div className="description">{product.description}</div>

            {/* Bottom Controls */}
            <div className="bottom-controls">
              {product.sizes && (
                <div className="size-selector">
                  <label>Size: </label>
                  <select
                    value={selectedSize}
                    onChange={(e) => setSelectedSize(e.target.value)}
                  >
                    {product.sizes.map((size, idx) => (
                      <option key={idx} value={size}>
                        {size}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div className="quantity-selector">
                <Button variant="secondary" onClick={decreaseQty}>
                  -
                </Button>
                <span>{quantity}</span>
                <Button variant="secondary" onClick={increaseQty}>
                  +
                </Button>
              </div>

              <div className="action-buttons">
                <Button variant="primary">Buy Now</Button>
                <Button variant="success">Add to Cart</Button>
                <Button variant="outline-danger">❤</Button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProductCard;
