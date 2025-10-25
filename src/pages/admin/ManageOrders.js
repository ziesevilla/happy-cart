import React, { useEffect, useState } from "react";
import "../../styles/admins/ManageOrders.css";
import Sidebar from "../../assets/Sidebar";
import { FaBars, FaSearch, FaSlidersH } from "react-icons/fa";

const ManageOrders = () => {
  // ===== Static Data (Temporary) =====
  const [orders, setOrders] = useState([
    { id: 1, customer: "Zyra Batumbakal", orderId: "#ORD-001245", total: "₱143", status: "Pending", payment: "Unpaid" },
    { id: 2, customer: "Raziel Masiyahin", orderId: "#ORD-001246", total: "₱555", status: "Shipped", payment: "Paid" },
    { id: 3, customer: "Jericho Barnes", orderId: "#ORD-001247", total: "₱1,062", status: "Delivered", payment: "COD" },
    { id: 4, customer: "Michael Mikel", orderId: "#ORD-001248", total: "₱444", status: "Shipped", payment: "COD" },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterVisible, setFilterVisible] = useState(false);
  const [sortOption, setSortOption] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [paymentFilter, setPaymentFilter] = useState("");

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
        order.total.toLowerCase().includes(term);

      const matchesStatus = statusFilter ? order.status === statusFilter : true;
      const matchesPayment = paymentFilter ? order.payment === paymentFilter : true;

      return matchesSearch && matchesStatus && matchesPayment;
    })
    .sort((a, b) => {
      if (sortOption === "name-asc") return a.customer.localeCompare(b.customer);
      if (sortOption === "name-desc") return b.customer.localeCompare(a.customer);
      if (sortOption === "price-high")
        return parseFloat(b.total.replace(/[₱,]/g, "")) - parseFloat(a.total.replace(/[₱,]/g, ""));
      if (sortOption === "price-low")
        return parseFloat(a.total.replace(/[₱,]/g, "")) - parseFloat(b.total.replace(/[₱,]/g, ""));
      return 0;
    });

  // ===== Clear Filters =====
  const clearFilters = () => {
    setSortOption("");
    setStatusFilter("");
    setPaymentFilter("");
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
        </div>

        {/* ===== Search + Filter ===== */}
        <div className="search-filter-bar">
          <div className="search-box">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search orders..."
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
                <option value="name-asc">Name (A–Z)</option>
                <option value="name-desc">Name (Z–A)</option>
                <option value="price-high">Price (High → Low)</option>
                <option value="price-low">Price (Low → High)</option>
              </select>

              <h4>Status</h4>
              <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                <option value="">-- All --</option>
                <option value="Pending">Pending</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
              </select>

              <h4>Payment</h4>
              <select value={paymentFilter} onChange={(e) => setPaymentFilter(e.target.value)}>
                <option value="">-- All --</option>
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
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <tr key={order.id}>
                    <td>{order.customer}</td>
                    <td>{order.orderId}</td>
                    <td>{order.total}</td>
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
                      <span className="view-link">View /</span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" style={{ textAlign: "center", padding: "20px" }}>
                    No matching orders found.
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
