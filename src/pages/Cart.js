import React, { useState } from "react";
import "./../styles/pages/Cart.css";
import cartContent from "../assets/data/cartContent";

function Cart() {
  const [cartItems, setCartItems] = useState(cartContent.items);
  const [shipping, setShipping] = useState("Standard Delivery");
  const [promoCode, setPromoCode] = useState("");

  // ✅ Quantity Controls
  const handleQuantityChange = (id, delta) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  // ✅ Checkbox Toggle
  const toggleSelect = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, selected: !item.selected } : item
      )
    );
  };

  // ✅ Remove Item
  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // ✅ Calculations
  const subtotal = cartItems
    .filter((i) => i.selected)
    .reduce((acc, i) => acc + i.price * i.quantity, 0);

  return (
    <div className="cart-page">
      <header className="cart-header">
        <h1>Shopping Cart</h1>
        <div className="cart-count">
          🛒 {cartItems.filter((i) => i.selected).length} Items
        </div>
      </header>

      <div className="cart-content">
        {/* LEFT SIDE: Cart Items */}
        <section className="cart-items">
          <hr />
          {cartItems.map((item) => (
            <div className="cart-item" key={item.id}>
              <input
                type="checkbox"
                checked={item.selected}
                onChange={() => toggleSelect(item.id)}
              />
              <img src={item.image} alt={item.name} className="item-image" />

              <div className="item-details">
                <h4>{item.name}</h4>
                <p>₱{item.price.toFixed(2)}</p>
                <button onClick={() => removeItem(item.id)}>Remove</button>
              </div>

              <div className="quantity-controls">
                <button onClick={() => handleQuantityChange(item.id, -1)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => handleQuantityChange(item.id, 1)}>+</button>
              </div>

              <div className="item-total">
                ₱{(item.price * item.quantity).toFixed(2)}
              </div>
            </div>
          ))}

          <div className="continue-shopping">
            ← <span>Continue Shopping</span>
          </div>
        </section>

        {/* RIGHT SIDE: Summary */}
        <aside className="cart-summary">
          <h3>Subtotal</h3>
          <div className="summary-row">
            <span>ITEMS {cartItems.filter((i) => i.selected).length}</span>
            <strong>₱{subtotal.toLocaleString()}</strong>
          </div>

          <div className="summary-section">
            <p>SHIPPING</p>
            <select
              value={shipping}
              onChange={(e) => setShipping(e.target.value)}
            >
              <option>Standard Delivery</option>
              <option>Express Delivery</option>
              <option>Pickup</option>
            </select>
          </div>

          <div className="summary-section">
            <p>PROMO CODE</p>
            <input
              type="text"
              placeholder="Enter your code"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
            />
            <button className="apply-btn">APPLY</button>
          </div>

          <div className="summary-total">
            <p>TOTAL COST</p>
            <h2>₱{subtotal.toLocaleString()}</h2>
          </div>

          <button className="checkout-btn">PROCEED TO CHECK OUT</button>
        </aside>
      </div>
    </div>
  );
}

export default Cart;
