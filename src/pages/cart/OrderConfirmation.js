import React from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import "../../styles/pages/OrderConfirmation.css";
import { mockDB } from "../../assets/data/mockDatabase";

function OrderConfirmation() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get order data from navigation state or use mock data
  const orderData = location.state?.orderData || {
    orderNumber: `ORD-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
    items: mockDB.checkoutData.items,
    shippingAddress: mockDB.checkoutData.address,
    paymentMethod: "Cash on Delivery",
    subtotal: 2450.00,
    discount: 16.00,
    shippingFee: 50.00,
    total: 2484.00,
    estimatedDelivery: "Dec 28, 2024"
  };

  const {
    orderNumber,
    items,
    shippingAddress,
    paymentMethod,
    subtotal,
    discount,
    shippingFee,
    total,
    estimatedDelivery
  } = orderData;

  // ✅ Continue shopping handler
  const handleContinueShopping = () => {
    navigate("/products");
  };

  // ✅ Track order handler
  const handleTrackOrder = () => {
    // In a real app, this would navigate to order tracking
    alert(`Tracking for order ${orderNumber} will be available soon!`);
  };

  // ✅ Download receipt handler
  const handleDownloadReceipt = () => {
    // In a real app, this would generate a PDF receipt
    alert(`Receipt for ${orderNumber} downloaded!`);
  };

  return (
    <div className="confirmation-page">
      <div className="confirmation-container">
        {/* Header Section */}
        <header className="confirmation-header">
          <div className="success-checkmark">✓</div>
          <h1>Order Confirmed!</h1>
          <p className="order-number">Order #: {orderNumber}</p>
          <p className="confirmation-message">
            Thank you for your purchase! Your order has been confirmed and will be shipped soon.
          </p>
        </header>

        <div className="confirmation-content">
          {/* Left Column: Order Details */}
          <section className="order-details-section">
            <div className="delivery-card">
              <h2>Estimated Delivery</h2>
              <div className="delivery-date">{estimatedDelivery}</div>
              <p>We'll send you a tracking number once your order ships.</p>
            </div>

            <div className="shipping-card">
              <div className="card-header">
                <h2>Shipping Address</h2>
                <button className="edit-btn">Edit</button>
              </div>
              <div className="address-info">
                <p><strong>{shippingAddress.name}</strong></p>
                <p>{shippingAddress.email}</p>
                <p>{shippingAddress.barangay}, {shippingAddress.municipality}</p>
                <p>{shippingAddress.province}, {shippingAddress.zip}</p>
                <p>{shippingAddress.country}</p>
              </div>
            </div>

            <div className="payment-card">
              <div className="card-header">
                <h2>Payment Method</h2>
                <button className="edit-btn">Change</button>
              </div>
              <div className="payment-info">
                <div className="payment-method">
                  <span className="method-name">{paymentMethod}</span>
                  {paymentMethod === "Cash on Delivery" && (
                    <span className="payment-note">Pay when you receive your order</span>
                  )}
                </div>
              </div>
            </div>

            <div className="items-card">
              <h2>Order Items ({items.length})</h2>
              <div className="order-items-list">
                {items.map((item) => (
                  <div key={item.id} className="confirmation-item">
                    <img src={item.image} alt={item.name} className="item-image" />
                    <div className="item-details">
                      <h4>{item.name}</h4>
                      <p className="item-price">₱{item.price.toFixed(2)}</p>
                      <p className="item-quantity">Quantity: {item.quantity}</p>
                    </div>
                    <div className="item-total">
                      ₱{(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Right Column: Summary & Actions */}
          <aside className="summary-section">
            <div className="summary-card">
              <h3>Order Summary</h3>
              
              <div className="summary-rows">
                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>₱{subtotal.toFixed(2)}</span>
                </div>
                
                <div className="summary-row">
                  <span>Shipping</span>
                  <span>₱{shippingFee.toFixed(2)}</span>
                </div>
                
                <div className="summary-row discount">
                  <span>Discount</span>
                  <span>-₱{discount.toFixed(2)}</span>
                </div>

                <div className="summary-total">
                  <span>Total</span>
                  <span>₱{total.toFixed(2)}</span>
                </div>
              </div>

              <div className="action-buttons">
                <button 
                  className="btn-primary"
                  onClick={handleTrackOrder}
                >
                  Track Your Order
                </button>
                
                <button 
                  className="btn-secondary"
                  onClick={handleDownloadReceipt}
                >
                  Download Receipt
                </button>
                
                <button 
                  className="btn-outline"
                  onClick={handleContinueShopping}
                >
                  Continue Shopping
                </button>
              </div>

              <div className="support-info">
                <h4>Need Help?</h4>
                <p>Contact our customer support team:</p>
                <div className="contact-methods">
                  <p>📞 +63 912 345 6789</p>
                  <p>✉️ support@happycart.com</p>
                </div>
              </div>
            </div>

            <div className="next-steps">
              <h3>What's Next?</h3>
              <div className="steps-timeline">
                <div className="step completed">
                  <div className="step-icon">1</div>
                  <div className="step-content">
                    <strong>Order Confirmed</strong>
                    <p>We've received your order</p>
                  </div>
                </div>
                
                <div className="step active">
                  <div className="step-icon">2</div>
                  <div className="step-content">
                    <strong>Processing</strong>
                    <p>Preparing your shipment</p>
                  </div>
                </div>
                
                <div className="step">
                  <div className="step-icon">3</div>
                  <div className="step-content">
                    <strong>Shipped</strong>
                    <p>On its way to you</p>
                  </div>
                </div>
                
                <div className="step">
                  <div className="step-icon">4</div>
                  <div className="step-content">
                    <strong>Delivered</strong>
                    <p>Expected {estimatedDelivery}</p>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* Quick Actions Footer */}
        <footer className="confirmation-footer">
          <Link to="/products" className="footer-link">
            ← Continue Shopping
          </Link>
          <Link to="/orders" className="footer-link">
            View Order History →
          </Link>
        </footer>
      </div>
    </div>
  );
}

export default OrderConfirmation;