import React, { useEffect, useState } from "react";
import "../../styles/admins/ManageOrders.css";
import Sidebar from "../../assets/Sidebar";
import { FaBars, FaSearch, FaSlidersH } from "react-icons/fa";

const ManageOrders = () => {
  // ===== Temporary Static Data =====
  const [orders, setOrders] = useState([
    {
      id: 1,
      customer: "Zyra Batumbakal",
      orderId: "#ORD-001245",
      total: "₱143",
      status: "Pending",
      payment: "Unpaid",
    },
    {
      id: 2,
      customer: "Raziel Masiyahin",
      orderId: "#ORD-001246",
      total: "₱555",
      status: "Shipped",
      payment: "Paid",
    },
    {
      id: 3,
      customer: "Jericho Barnes",
      orderId: "#ORD-001247",
      total: "₱1,062",
      status: "Delivered",
      payment: "COD",
    },
    {
      id: 4,
      customer: "Michael Mikel",
      orderId: "#ORD-001248",
      total: "₱444",
      status: "Shipped",
      payment: "COD",
    },
  ]);

  // ===== Placeholder for Backend Integration =====
  useEffect(() => {
    // 🔹 When backend is ready, replace this section with API call:
    // fetch("/api/orders")
    //   .then((res) => res.json())
    //   .then((data) => setOrders(data))
    //   .catch((err) => console.error("Error fetching orders:", err));
  }, []);

  return (
    <div className="admin-layout">
      {/* ===== Sidebar (fixed area) ===== */}
      <Sidebar />

      {/* ===== Main Content ===== */}
      <main className="orders-main">
        {/* ===== Header ===== */}
        <div className="orders-header">
          <div className="header-left">
            <FaBars className="menu-icon" />
            <h2>Order Management</h2>
          </div>
        </div>

        {/* ===== Search & Filter Bar ===== */}
        <div className="search-filter-bar">
          <div className="search-box">
            <FaSearch className="search-icon" />
            <input type="text" placeholder="Search orders" />
          </div>
          <button className="filter-btn">
            <FaSlidersH className="filter-icon" /> Filters
          </button>
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
              {orders.length > 0 ? (
                orders.map((order) => (
                  <tr key={order.id}>
                    <td>{order.customer}</td>
                    <td>{order.orderId}</td>
                    <td>{order.total}</td>
                    <td>
                      <span
                        className={`status ${
                          order.status.toLowerCase() === "pending"
                            ? "pending"
                            : order.status.toLowerCase() === "shipped"
                            ? "shipped"
                            : "delivered"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td>
                      <span
                        className={`payment ${
                          order.payment.toLowerCase() === "paid"
                            ? "paid"
                            : order.payment.toLowerCase() === "cod"
                            ? "cod"
                            : "unpaid"
                        }`}
                      >
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
                    No orders available.
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
