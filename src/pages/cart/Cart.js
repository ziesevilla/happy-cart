// src/pages/cart/Cart.js
import React, { useState, useMemo } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../../styles/pages/Cart.css";
import { mockDB } from "../../assets/data/mockDatabase";

function Cart() {
  // Get current user's cart (for demo, using user ID 1)
  const currentUserId = 1;
  const userCart = mockDB.carts[currentUserId] || [];
  
  // Convert cart data to display format
  const initialCartItems = userCart.map(cartItem => {
    const product = mockDB.products.find(p => p.id === cartItem.productId);
    return {
      id: cartItem.productId,
      name: product?.name || 'Unknown Product',
      price: product?.price || 0,
      image: product?.image || '',
      quantity: cartItem.quantity,
      selected: true
    };
  });

  const [cartItems, setCartItems] = useState(initialCartItems);
  const [shipping, setShipping] = useState("Standard Delivery");
  const [promoCode, setPromoCode] = useState("");
  const [isApplyingPromo, setIsApplyingPromo] = useState(false);

  const navigate = useNavigate();

  // ✅ Shipping costs
  const shippingCosts = {
    "Standard Delivery": 50,
    "Express Delivery": 120,
    "Pickup": 0
  };

  // ✅ Memoized calculations for better performance
  const { selectedItems, subtotal, shippingFee, total } = useMemo(() => {
    const selected = cartItems.filter(item => item.selected);
    const subtotalCalc = selected.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const shippingFeeCalc = shippingCosts[shipping] || 0;
    
    return {
      selectedItems: selected,
      subtotal: subtotalCalc,
      shippingFee: shippingFeeCalc,
      total: subtotalCalc + shippingFeeCalc
    };
  }, [cartItems, shipping]);

  // ✅ Quantity Controls with validation
  const handleQuantityChange = (id, delta) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  // ✅ Checkbox Toggle with select all functionality
  const toggleSelect = (id) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, selected: !item.selected } : item
      )
    );
  };

  const toggleSelectAll = () => {
    const allSelected = cartItems.every(item => item.selected);
    setCartItems(prev =>
      prev.map(item => ({ ...item, selected: !allSelected }))
    );
  };

  // ✅ Remove Item with confirmation
  const removeItem = (id) => {
    if (window.confirm("Are you sure you want to remove this item?")) {
      setCartItems(prev => prev.filter(item => item.id !== id));
    }
  };

  // ✅ Remove Selected Items
  const removeSelected = () => {
    if (selectedItems.length === 0) return;
    if (window.confirm(`Remove ${selectedItems.length} selected item(s)?`)) {
      setCartItems(prev => prev.filter(item => !item.selected));
    }
  };

  // ✅ Promo Code Handler
  const handleApplyPromo = async () => {
    if (!promoCode.trim()) return;
    
    setIsApplyingPromo(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    // Add your promo code logic here
    alert(`Promo code "${promoCode}" applied!`);
    setIsApplyingPromo(false);
    setPromoCode("");
  };

  // ✅ Checkout Handler with validation
  const handleCheckout = () => {
    if (selectedItems.length === 0) {
      alert("Please select at least one item to checkout");
      return;
    }
    navigate("/checkout", { state: { cartItems: selectedItems, total } });
  };

  // ✅ Empty cart state
  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        <div className="empty-cart">
          <h2>Your cart is empty</h2>
          <p>Add some items to get started!</p>
          <Link to="/products" className="continue-shopping">
            ← Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-content">
        {/* LEFT SIDE: Cart Items */}
        <section className="cart-items-section">
          <div className="section-header">
            <h1 className="cart-title">Shopping Cart</h1>
            <div className="cart-count">
              🛒 {selectedItems.length} {selectedItems.length === 1 ? 'Item' : 'Items'} Selected
            </div>
          </div>

          <div className="cart-actions">
            <label className="select-all">
              <input
                type="checkbox"
                checked={cartItems.length > 0 && cartItems.every(item => item.selected)}
                onChange={toggleSelectAll}
              />
              Select All ({cartItems.length})
            </label>
            {selectedItems.length > 0 && (
              <button className="remove-selected" onClick={removeSelected}>
                Remove Selected
              </button>
            )}
          </div>
          
          <div className="items-container">
            {cartItems.map((item) => (
              <div className={`cart-item ${item.selected ? 'selected' : ''}`} key={item.id}>
                <input
                  type="checkbox"
                  checked={item.selected}
                  onChange={() => toggleSelect(item.id)}
                  aria-label={`Select ${item.name}`}
                />
                <img src={item.image} alt={item.name} className="item-image" />

                <div className="item-details">
                  <h4>{item.name}</h4>
                  <p className="item-price">₱{item.price.toFixed(2)}</p>
                  <button 
                    onClick={() => removeItem(item.id)}
                    className="remove-btn"
                    aria-label={`Remove ${item.name}`}
                  >
                    Remove
                  </button>
                </div>

                <div className="quantity-controls">
                  <button 
                    onClick={() => handleQuantityChange(item.id, -1)}
                    disabled={item.quantity <= 1}
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button 
                    onClick={() => handleQuantityChange(item.id, 1)}
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                <div className="item-total">
                  ₱{(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>

          <Link to="/products" className="continue-shopping">
            ← <span>Continue Shopping</span>
          </Link>
        </section>

        {/* RIGHT SIDE: Summary */}
        <aside className="cart-summary">
          <h3>Order Summary</h3>
          
          <div className="summary-row">
            <span>Items ({selectedItems.length})</span>
            <strong>₱{subtotal.toLocaleString()}</strong>
          </div>

          <div className="summary-section">
            <label htmlFor="shipping">SHIPPING</label>
            <select
              id="shipping"
              value={shipping}
              onChange={(e) => setShipping(e.target.value)}
            >
              <option value="Standard Delivery">Standard Delivery (₱50)</option>
              <option value="Express Delivery">Express Delivery (₱120)</option>
              <option value="Pickup">Pickup (Free)</option>
            </select>
          </div>

          <div className="summary-section">
            <label htmlFor="promo-code">PROMO CODE</label>
            <div className="promo-input-group">
              <input
                id="promo-code"
                type="text"
                placeholder="Enter your code"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleApplyPromo()}
              />
              <button 
                className={`apply-btn ${isApplyingPromo ? 'loading' : ''}`}
                onClick={handleApplyPromo}
                disabled={!promoCode.trim() || isApplyingPromo}
              >
                {isApplyingPromo ? 'Applying...' : 'APPLY'}
              </button>
            </div>
          </div>

          <div className="cost-breakdown">
            <div className="summary-row">
              <span>Subtotal</span>
              <span>₱{subtotal.toLocaleString()}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span>₱{shippingFee.toLocaleString()}</span>
            </div>
            <div className="summary-total">
              <p>TOTAL COST</p>
              <h2>₱{total.toLocaleString()}</h2>
            </div>
          </div>

          <button 
            className="checkout-btn" 
            onClick={handleCheckout}
            disabled={selectedItems.length === 0}
          >
            PROCEED TO CHECKOUT
          </button>
          
          {selectedItems.length === 0 && (
            <p className="checkout-hint">Select items to proceed</p>
          )}
        </aside>
      </div>
    </div>
  );
}

export default Cart;