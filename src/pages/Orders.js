import React, { useState } from "react";
import "./../styles/pages/Orders.css";
import ordersContent from "../assets/data/ordersContent";

const Orders = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredOrders = ordersContent.filter((order) => {
    const query = searchTerm.toLowerCase();
    return (
      order.seller.toLowerCase().includes(query) ||
      order.product.toLowerCase().includes(query) ||
      order.orderId.toLowerCase().includes(query)
    );
  });

  return (
    <div className="orders-page">
      {/* Header Section */}
      <div className="orders-header">
        <button className="back-btn">← Back</button>
        <h1>My Purchase</h1>
      </div>

      {/* Search + Filter Section */}
      <div className="orders-search-bar">
        <input
          type="text"
          placeholder="You can search by Seller Name, Order Id or Product Name."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="filter-btn">
          <i className="fa fa-filter"></i> Filters
        </button>
      </div>

      {/* Orders List */}
      <div className="orders-list">
        {filteredOrders.map((order, index) => (
          <div key={index} className="order-card">
            {/* Header Row */}
            <div className="order-header">
              <span className="order-date">
                {order.status === "Completed"
                  ? `Delivered On: ${order.date}`
                  : `Placed On: ${order.date}`}
              </span>
              <span className={`order-status ${order.status.toLowerCase()}`}>
                <i className={`fa ${order.icon}`}></i> {order.status}
              </span>
            </div>

            {/* Product Info */}
            <div className="order-body">
              <img
                src={order.image}
                alt={order.product}
                className="order-image"
              />
              <div className="order-details">
                <h3>{order.product}</h3>
                <p className="variation">Variation: {order.variation}</p>
                <p className="quantity-price">
                  {order.quantity}x ₱{order.price} / {order.code}
                </p>
                <p className="reminder">
                  Confirm receipt after you’ve checked the received items and
                  made payment.
                </p>
              </div>

              <div className="order-info-box">
                <p className="order-total">Order Total: ₱{order.price}</p>
                <p className="order-id">Order ID: {order.orderId}</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="order-actions">
              <button className="contact-btn">Contact Seller</button>
              {order.status === "Completed" ? (
                <button className="buy-again-btn">Buy Again</button>
              ) : (
                <button className="track-btn">Track Order</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
