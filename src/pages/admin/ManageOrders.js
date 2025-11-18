// src/pages/admin/ManageOrders.js
import React, { useState, useMemo } from "react";
import "../../styles/admins/ManageOrders.css";
import Sidebar from "../../components/layout/Sidebar.js";
import { FaBars, FaSearch, FaSlidersH } from "react-icons/fa";
import { mockDB } from "../../assets/data/mockDatabase";

const ManageOrders = () => {
  // Convert mockDB orders to display format
  const orders = useMemo(() => {
    return mockDB.orders.map(order => {
      const user = mockDB.users.find(u => u.id === order.userId);
      const firstProduct = mockDB.products.find(p => p.id === order.items[0]?.productId);
      
      return {
        id: order.id,
        customer: user?.name || 'Unknown Customer',
        orderId: `ORD-${order.id.toString().padStart(3, '0')}`,
        total: order.total,
        status: order.status,
        payment: getPaymentMethod(order),
        date: order.date,
        items: order.items
      };
    });
  }, []);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterVisible, setFilterVisible] = useState(false);
  const [sortOption, setSortOption] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [paymentFilter, setPaymentFilter] = useState("");

  // Helper function to determine payment method
  function getPaymentMethod(order) {
    // For demo purposes, we'll determine payment based on order total
    if (order.total < 1000) return "COD";
    if (order.total < 2000) return "Paid";
    return "Unpaid";
  }

  // ===== Toggle Filter Dropdown =====
  const toggleFilter = () => setFilterVisible((prev) => !prev);

  // ===== Filtering + Sorting =====
  const filteredOrders = orders
    .filter((order) => {
      const term = searchTerm.toLowerCase();
      const matchesSearch =
        order.customer.toLowerCase().includes(term) ||
        order.orderId.toLowerCase().includes(term) ||
        order.status.toLowerCase().includes(term) ||
        order.payment.toLowerCase().includes(term) ||
        order.total.toString().includes(term);

      const matchesStatus = statusFilter ? order.status === statusFilter : true;
      const matchesPayment = paymentFilter ? order.payment === paymentFilter : true;

      return matchesSearch && matchesStatus && matchesPayment;
    })
    .sort((a, b) => {
      if (sortOption === "name-asc") return a.customer.localeCompare(b.customer);
      if (sortOption === "name-desc") return b.customer.localeCompare(a.customer);
      if (sortOption === "price-high") return b.total - a.total;
      if (sortOption === "price-low") return a.total - b.total;
      if (sortOption === "date-new") return new Date(b.date) - new Date(a.date);
      if (sortOption === "date-old") return new Date(a.date) - new Date(b.date);
      return 0;
    });

  // ===== Clear Filters =====
  const clearFilters = () => {
    setSortOption("");
    setStatusFilter("");
    setPaymentFilter("");
  };

  // Format currency
  const formatCurrency = (amount) => {
    return `₱${amount.toLocaleString()}`;
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Handle status update
  const handleStatusUpdate = (orderId, newStatus) => {
    // In a real app, this would update the backend
    alert(`Order ${orderId} status updated to ${newStatus}`);
    console.log(`Updating order ${orderId} to ${newStatus}`);
  };

  // Handle view order details
  const handleViewOrder = (order) => {
    alert(`Viewing order details for ${order.orderId}\nCustomer: ${order.customer}\nTotal: ${formatCurrency(order.total)}\nStatus: ${order.status}`);
  };

  return (
    <div className="admin-layout">
      <Sidebar />

      <main className="orders-main">
        {/* ===== Header ===== */}
        <div className="orders-header">
          <div className="header-left">
            <FaBars className="menu-icon" />
            <h2>Order Management</h2>
          </div>
          <div className="header-stats">
            <span>Total Orders: {orders.length}</span>
            <span>Pending: {orders.filter(o => o.status === 'Processing').length}</span>
            <span>Delivered: {orders.filter(o => o.status === 'Delivered').length}</span>
          </div>
        </div>

        {/* ===== Search + Filter ===== */}
        <div className="search-filter-bar">
          <div className="search-box">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search orders by customer, order ID, or status..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="filter-dropdown-container">
            <button
              className={`filter-btn ${filterVisible ? "active" : ""}`}
              onClick={toggleFilter}
            >
              <FaSlidersH className={`filter-icon ${filterVisible ? "rotated" : ""}`} /> Filters
            </button>

            <div className={`filter-dropdown ${filterVisible ? "show" : ""}`}>
              <h4>Sort By</h4>
              <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
                <option value="">-- None --</option>
                <option value="name-asc">Customer Name (A–Z)</option>
                <option value="name-desc">Customer Name (Z–A)</option>
                <option value="price-high">Total (High → Low)</option>
                <option value="price-low">Total (Low → High)</option>
                <option value="date-new">Date (Newest First)</option>
                <option value="date-old">Date (Oldest First)</option>
              </select>

              <h4>Status</h4>
              <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                <option value="">-- All Status --</option>
                <option value="Processing">Processing</option>
                <option value="Delivered">Delivered</option>
              </select>

              <h4>Payment</h4>
              <select value={paymentFilter} onChange={(e) => setPaymentFilter(e.target.value)}>
                <option value="">-- All Payment --</option>
                <option value="Paid">Paid</option>
                <option value="Unpaid">Unpaid</option>
                <option value="COD">COD</option>
              </select>

              <button className="clear-btn" onClick={clearFilters}>
                Clear Filters
              </button>
            </div>
          </div>
        </div>

        {/* ===== Orders Table ===== */}
        <div className="orders-table">
          <table>
            <thead>
              <tr>
                <th>Customer</th>
                <th>Order ID</th>
                <th>Total</th>
                <th>Status</th>
                <th>Payment</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <tr key={order.id}>
                    <td>
                      <div className="customer-cell">
                        <strong>{order.customer}</strong>
                      </div>
                    </td>
                    <td>
                      <code>{order.orderId}</code>
                    </td>
                    <td>
                      <strong>{formatCurrency(order.total)}</strong>
                    </td>
                    <td>
                      <span className={`status ${order.status.toLowerCase()}`}>
                        {order.status}
                      </span>
                    </td>
                    <td>
                      <span className={`payment ${order.payment.toLowerCase()}`}>
                        {order.payment}
                      </span>
                    </td>
                    <td>
                      <span className="order-date">{formatDate(order.date)}</span>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button 
                          className="view-btn"
                          onClick={() => handleViewOrder(order)}
                        >
                          View
                        </button>
                        <select 
                          className="status-select"
                          value={order.status}
                          onChange={(e) => handleStatusUpdate(order.id, e.target.value)}
                        >
                          <option value="Processing">Processing</option>
                          <option value="Delivered">Delivered</option>
                        </select>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="no-orders">
                    <div className="empty-state">
                      <p>No matching orders found.</p>
                      {searchTerm || statusFilter || paymentFilter ? (
                        <button className="clear-filters-btn" onClick={clearFilters}>
                          Clear filters to see all orders
                        </button>
                      ) : (
                        <p>No orders in the system yet.</p>
                      )}
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default ManageOrders;