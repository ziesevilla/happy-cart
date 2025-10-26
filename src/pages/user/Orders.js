// src/pages/user/Orders.js
import React, { useState, useMemo, useCallback } from "react";
import { mockDB } from "../../assets/data/mockDatabase";
import "../../styles/pages/Profile.css";

// Reusable Components
const ActionButton = ({ 
  children, 
  variant = "primary", 
  onClick, 
  disabled = false, 
  type = "button",
  icon 
}) => (
  <button
    type={type}
    className={`btn btn-${variant}`}
    onClick={onClick}
    disabled={disabled}
  >
    {icon && <span className="btn-icon">{icon}</span>}
    {children}
  </button>
);

const Card = ({ children, className = "" }) => (
  <div className={`card ${className}`}>
    {children}
  </div>
);

const SectionHeader = ({ title, subtitle, action }) => (
  <div className="section-header">
    <div className="section-title">
      <h2>{title}</h2>
      {subtitle && <p className="section-subtitle">{subtitle}</p>}
    </div>
    {action && <div className="section-action">{action}</div>}
  </div>
);

function Orders() {
  const [searchTerm, setSearchTerm] = useState("");
  const [notification, setNotification] = useState({ show: false, message: "", type: "" });

  // Show notification helper
  const showNotification = useCallback((message, type = "success") => {
    setNotification({ show: true, message, type });
    setTimeout(() => setNotification({ show: false, message: "", type: "" }), 3000);
  }, []);

  // Orders filtering
  const filteredOrders = useMemo(() => {
    if (!searchTerm.trim()) return mockDB.orders;
    
    const query = searchTerm.toLowerCase();
    return mockDB.orders.filter((order) =>
      Object.values(order).some(value =>
        String(value).toLowerCase().includes(query)
      )
    );
  }, [searchTerm]);

  return (
    <div className="profile-page">
      {/* Notification System */}
      {notification.show && (
        <div className={`notification ${notification.type}`}>
          {notification.message}
        </div>
      )}

      <Card className="orders-section">
        <SectionHeader 
          title="My Orders" 
          subtitle="Track and manage your purchases"
          action={
            <div className="search-box">
              <div className="search-input-wrapper">
                <span className="search-icon">🔍</span>
                <input
                  type="text"
                  placeholder="Search orders by seller, order ID, or product..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />
              </div>
              <ActionButton variant="outline" icon="⚙️">
                Filters
              </ActionButton>
            </div>
          }
        />

        <div className="orders-content">
          {filteredOrders.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📦</div>
              <h3>No orders found</h3>
              <p>
                {searchTerm 
                  ? "No orders match your search criteria." 
                  : "You haven't placed any orders yet."
                }
              </p>
              {!searchTerm && (
                <ActionButton variant="primary" icon="🛍️">
                  Start Shopping
                </ActionButton>
              )}
            </div>
          ) : (
            <div className="orders-grid">
              {filteredOrders.map((order, index) => (
                <Card key={order.orderId || index} className="order-card compact">
                  <div className="order-header">
                    <div className="order-meta">
                      <span className="order-date">
                        {order.status === "Completed"
                          ? `Delivered on ${order.date}`
                          : `Placed on ${order.date}`}
                      </span>
                      <span className={`order-status status-${order.status.toLowerCase()}`}>
                        <span className="status-icon">{order.icon}</span>
                        {order.status}
                      </span>
                    </div>
                  </div>

                  <div className="order-body">
                    <div className="product-info">
                      <img
                        src={order.image}
                        alt={order.product}
                        className="product-image"
                      />
                      <div className="product-details">
                        <h4 className="product-name">{order.product}</h4>
                        <p className="product-variation">Variation: {order.variation}</p>
                        <p className="product-quantity">
                          {order.quantity} × ₱{order.price}
                        </p>
                        <div className="order-summary compact">
                          <div className="summary-item">
                            <span>Total:</span>
                            <strong>₱{order.price}</strong>
                          </div>
                          <div className="summary-item">
                            <span>ID:</span>
                            <code>{order.orderId}</code>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="order-actions">
                    <ActionButton variant="outline" size="small">
                      Contact Seller
                    </ActionButton>
                    {order.status === "Completed" ? (
                      <ActionButton variant="primary" size="small" icon="🔄">
                        Buy Again
                      </ActionButton>
                    ) : (
                      <ActionButton variant="primary" size="small" icon="🚚">
                        Track Order
                      </ActionButton>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}

export default Orders;