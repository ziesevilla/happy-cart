import React, { useState } from "react";
import "./../styles/pages/Checkout.css";
import checkoutContent from "../assets/data/checkoutContent";

function Checkout() {
  const { address, paymentMethods, items } = checkoutContent;

  const [selectedPayment, setSelectedPayment] = useState("cod");
  const subtotal = items.reduce((acc, i) => acc + i.price * i.quantity, 0);
  const discount = 16.0;
  const total = subtotal - discount;

  return (
    <div className="checkout-page">
      {/* LEFT: Shipping Info */}
      <section className="checkout-left">
        <h1>Checkout</h1>

        <div className="address-section">
          <h3>Shipping Detail Address</h3>
          <button className="add-address">+ Add Address</button>

          <div className="address-details">
            <p>
              <strong>Name:</strong> {address.name}
            </p>
            <p>
              <strong>E-mail:</strong> {address.email}
            </p>
            <p>
              <strong>Barangay:</strong> {address.barangay}
            </p>
            <p>
              <strong>Zip Code:</strong> {address.zip}
            </p>
            <p>
              <strong>Municipality:</strong> {address.municipality}
            </p>
            <p>
              <strong>Province:</strong> {address.province}
            </p>
            <p>
              <strong>Country:</strong> {address.country}
            </p>
          </div>
        </div>

        {/* Payment Section */}
        <div className="payment-section">
          <h3>Payment Method</h3>
          <hr />

          {paymentMethods.map((method) => (
            <label key={method.id} className="payment-option">
              <div className="payment-left">
                <img src={method.icon} alt={method.name} />
                {method.name}
              </div>
              <input
                type="checkbox"
                checked={selectedPayment === method.id}
                onChange={() => setSelectedPayment(method.id)}
              />
            </label>
          ))}

          <button className="view-options">View all options ➜</button>
        </div>

        <button className="place-order-btn">Place Order</button>
        <a href="/cart" className="back-link">
          ← Back to Cart
        </a>
      </section>

      {/* RIGHT: Order Summary */}
      <aside className="checkout-right">
        <h3>Order Summary</h3>

        {items.map((item) => (
          <div className="order-item" key={item.id}>
            <img src={item.image} alt={item.name} />
            <div className="order-details">
              <div className="order-top">
                <p className="order-name">{item.name}</p>
                <span className="add-note">Add Note</span>
              </div>
              <p className="order-price">₱{item.price.toFixed(2)}</p>
              <p className="order-return">Free Return</p>
              <div className="order-qty">
                <button>-</button>
                <span>{item.quantity}</span>
                <button>+</button>
              </div>
            </div>
          </div>
        ))}

        <div className="discount-row">
          <p>Happy Cart discount</p>
          <p className="discount-amount">-₱{discount.toFixed(2)}</p>
        </div>

        <div className="total-row">
          <strong>TOTAL COST</strong>
          <strong>₱{total.toFixed(2)}</strong>
        </div>
      </aside>
    </div>
  );
}

export default Checkout;
