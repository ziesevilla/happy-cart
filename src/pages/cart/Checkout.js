import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import "../../styles/pages/Checkout.css";
import { mockDB } from "../../assets/data/mockDatabase";

function Checkout() {
  const navigate = useNavigate(); // ✅ MOVED TO TOP
  const location = useLocation();
  
  const { address, paymentMethods, items: initialItems } = mockDB.checkoutData;
  
  // Get cart items from navigation state or fallback to mock data
  const cartItems = location.state?.cartItems || initialItems;
  const cartTotal = location.state?.total || initialItems.reduce((acc, i) => acc + i.price * i.quantity, 0);

  const [selectedPayment, setSelectedPayment] = useState("cod");
  const [orderItems, setOrderItems] = useState(cartItems);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [notes, setNotes] = useState({});

  const shippingFee = 50;
  const discount = 16.0;
  const subtotal = orderItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const total = subtotal - discount + shippingFee;

  // ✅ Handle quantity changes
  const handleQuantityChange = (id, delta) => {
    setOrderItems(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  // ✅ Handle note changes
  const handleNoteChange = (id, note) => {
    setNotes(prev => ({
      ...prev,
      [id]: note
    }));
  };

  // ✅ Place order handler - FIXED: navigate is now available
  const handlePlaceOrder = async () => {
    if (orderItems.length === 0) {
      alert("Your cart is empty");
      return;
    }

    setIsPlacingOrder(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Get payment method name
      const paymentMethodName = paymentMethods.find(method => method.id === selectedPayment)?.name || selectedPayment;
      
      // Here you would typically send the order to your backend
      const orderData = {
        items: orderItems,
        paymentMethod: paymentMethodName,
        shippingAddress: address,
        notes,
        total,
        subtotal,
        discount,
        shippingFee,
        estimatedDelivery: getEstimatedDelivery()
      };
      
      console.log("Order placed:", orderData);
      
      // ✅ FIXED: navigate is now available in this scope
      navigate("/order-confirmation", { 
        state: { 
          orderNumber: `ORD-${Date.now()}`,
          orderData 
        }
      });
    } catch (error) {
      alert("Failed to place order. Please try again.");
    } finally {
      setIsPlacingOrder(false);
    }
  };

  // ✅ Helper function to calculate estimated delivery
  const getEstimatedDelivery = () => {
    const today = new Date();
    const deliveryDate = new Date(today);
    deliveryDate.setDate(today.getDate() + 5); // 5 days from now
    
    return deliveryDate.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  // ✅ Remove item from order
  const removeItem = (id) => {
    if (window.confirm("Remove this item from your order?")) {
      setOrderItems(prev => prev.filter(item => item.id !== id));
    }
  };

  if (orderItems.length === 0) {
    return (
      <div className="checkout-page">
        <div className="empty-checkout">
          <h2>No items to checkout</h2>
          <p>Add some items to your cart first!</p>
          <Link to="/products" className="continue-shopping">
            ← Continue Shopping
          </Link>
          <Link to="/cart" className="back-to-cart">
            Back to Cart
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      {/* LEFT: Checkout Forms */}
      <section className="checkout-left">
        <div className="checkout-header">
          <h1>Checkout</h1>
          <div className="checkout-steps">
            <span className="step active">Cart</span>
            <span className="step active">Checkout</span>
            <span className="step">Confirmation</span>
          </div>
        </div>

        {/* Shipping Address Section */}
        <div className="address-section">
          <div className="section-header">
            <h2>Shipping Address</h2>
            <button 
              className="add-address"
              onClick={() => setShowAddressForm(!showAddressForm)}
            >
              {showAddressForm ? 'Cancel' : '+ Add New Address'}
            </button>
          </div>

          {showAddressForm ? (
            <div className="address-form">
              <h3>Add New Address</h3>
              <form onSubmit={(e) => {
                e.preventDefault();
                setShowAddressForm(false);
                alert('Address saved!');
              }}>
                <div className="form-row">
                  <input type="text" placeholder="Full Name" required />
                  <input type="email" placeholder="Email" required />
                </div>
                <div className="form-row">
                  <input type="text" placeholder="Barangay" required />
                  <input type="text" placeholder="Zip Code" required />
                </div>
                <div className="form-row">
                  <input type="text" placeholder="Municipality" required />
                  <input type="text" placeholder="Province" required />
                </div>
                <input type="text" placeholder="Country" required />
                <div className="form-actions">
                  <button type="button" onClick={() => setShowAddressForm(false)}>
                    Cancel
                  </button>
                  <button type="submit">Save Address</button>
                </div>
              </form>
            </div>
          ) : (
            <div className="address-card">
              <div className="address-details">
                <div className="address-header">
                  <strong>{address.name}</strong>
                  <span className="default-badge">Default</span>
                </div>
                <p>{address.email}</p>
                <p>{address.barangay}, {address.municipality}</p>
                <p>{address.province}, {address.zip}</p>
                <p>{address.country}</p>
              </div>
              <button className="edit-address">Edit</button>
            </div>
          )}
        </div>

        {/* Payment Method Section */}
        <div className="payment-section">
          <h2>Payment Method</h2>
          
          <div className="payment-options">
            {paymentMethods.map((method) => (
              <label key={method.id} className={`payment-option ${selectedPayment === method.id ? 'selected' : ''}`}>
                <div className="payment-info">
                  <img src={method.icon} alt={method.name} />
                  <div>
                    <div className="payment-name">{method.name}</div>
                    {method.fee && <div className="payment-fee">Fee: ₱{method.fee}</div>}
                  </div>
                </div>
                <input
                  type="radio"
                  name="payment"
                  value={method.id}
                  checked={selectedPayment === method.id}
                  onChange={() => setSelectedPayment(method.id)}
                />
              </label>
            ))}
          </div>

          <button className="view-options">
            View all payment options ➜
          </button>
        </div>

        <div className="checkout-actions">
          <button 
            className={`place-order-btn ${isPlacingOrder ? 'loading' : ''}`}
            onClick={handlePlaceOrder}
            disabled={isPlacingOrder}
          >
            {isPlacingOrder ? 'Placing Order...' : `Place Order • ₱${total.toFixed(2)}`}
          </button>
          
          <Link to="/cart" className="back-link">
            ← Back to Cart
          </Link>
        </div>
      </section>

      {/* RIGHT: Order Summary */}
      <aside className="checkout-right">
        <div className="summary-header">
          <h2>Order Summary</h2>
          <span>{orderItems.length} {orderItems.length === 1 ? 'item' : 'items'}</span>
        </div>

        <div className="order-items">
          {orderItems.map((item) => (
            <div className="order-item" key={item.id}>
              <img src={item.image} alt={item.name} />
              <div className="order-details">
                <div className="order-header">
                  <h4 className="order-name">{item.name}</h4>
                  <button 
                    className="remove-item"
                    onClick={() => removeItem(item.id)}
                    aria-label={`Remove ${item.name}`}
                  >
                    ×
                  </button>
                </div>
                <p className="order-price">₱{item.price.toFixed(2)}</p>
                <p className="order-return">Free Return • 30 Days</p>
                
                <div className="order-controls">
                  <div className="order-qty">
                    <button 
                      onClick={() => handleQuantityChange(item.id, -1)}
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button onClick={() => handleQuantityChange(item.id, 1)}>
                      +
                    </button>
                  </div>
                  
                  <div className="note-section">
                    <input
                      type="text"
                      placeholder="Add note..."
                      value={notes[item.id] || ''}
                      onChange={(e) => handleNoteChange(item.id, e.target.value)}
                      className="note-input"
                    />
                  </div>
                </div>
                
                <div className="item-total">
                  ₱{(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="cost-breakdown">
          <div className="cost-row">
            <span>Subtotal</span>
            <span>₱{subtotal.toFixed(2)}</span>
          </div>
          
          <div className="cost-row">
            <span>Shipping</span>
            <span>₱{shippingFee.toFixed(2)}</span>
          </div>
          
          <div className="cost-row discount">
            <span>Happy Cart Discount</span>
            <span>-₱{discount.toFixed(2)}</span>
          </div>

          <div className="cost-total">
            <strong>TOTAL</strong>
            <strong>₱{total.toFixed(2)}</strong>
          </div>
          
          <div className="tax-note">
            *Includes VAT and applicable taxes
          </div>
        </div>
      </aside>
    </div>
  );
}

export default Checkout;