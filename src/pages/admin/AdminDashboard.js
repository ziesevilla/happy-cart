// src/pages/admin/AdminDashboard.js
import React from "react";
import "../../styles/admins/AdminDashboard.css";
import Sidebar from "../../components/layout/Sidebar.js";
import { FaBell, FaArrowUp, FaArrowDown, FaSearch, FaBars } from "react-icons/fa";
import { mockDB } from "../../assets/data/mockDatabase";

const AdminDashboard = () => {
  // Calculate dashboard statistics from mockDB
  const totalSales = mockDB.orders.reduce((sum, order) => sum + order.total, 0);
  const totalOrders = mockDB.orders.length;
  const totalUsers = mockDB.users.length;
  const totalProducts = mockDB.products.length;

  // Get recent orders (last 5 orders)
  const recentOrders = mockDB.orders.slice(-5).reverse();

  // Get low stock products (stock < 20)
  const lowStockProducts = mockDB.products.filter(product => product.stock < 20);

  // Get recent activity (mock data based on orders and users)
  const recentActivity = [
    {
      type: "Order Completed",
      description: `Order #${recentOrders[0]?.id || 'ORD-001'} completed`,
      time: "2 hours ago",
      color: "green"
    },
    {
      type: "New User Registered",
      description: `${mockDB.users[mockDB.users.length - 1]?.name || 'New user'} joined`,
      time: "5 hours ago",
      color: "blue"
    },
    {
      type: "Refund Requested",
      description: "Refund requested for order",
      time: "1 day ago",
      color: "orange"
    }
  ];

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

  // Get status class for orders
  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered': return 'delivered';
      case 'completed': return 'delivered';
      case 'processing': return 'processing';
      case 'pending': return 'pending';
      case 'cancelled': return 'cancelled';
      default: return 'pending';
    }
  };

  return (
    <div className="admin-dashboard">
      <Sidebar />

      <div className="dashboard-content">
        {/* ===== Top Bar ===== */}
        <div className="dashboard-header">
          {/* Left side: Menu icon + Title */}
          <div className="header-left">
            <FaBars className="menu-icon" />
            <h1>Overview</h1>
          </div>

          {/* Right side: Search bar + icons */}
          <div className="search-area">
            <input type="text" placeholder="Search..." />
            <FaSearch className="icon" />
            <FaBell className="icon bell" />
          </div>
        </div>

        {/* ===== Stats Summary ===== */}
        <div className="stats-cards">
          <div className="card">
            <h3>Total Sales</h3>
            <p>{formatCurrency(totalSales)}</p>
            <span>
              <FaArrowUp className="green" /> This month
            </span>
          </div>
          <div className="card">
            <h3>Total Orders</h3>
            <p>{totalOrders}</p>
            <span>
              <FaArrowUp className="green" /> This month
            </span>
          </div>
          <div className="card">
            <h3>Total Users</h3>
            <p>{totalUsers}</p>
            <span>
              <FaArrowUp className="green" /> This month
            </span>
          </div>
          <div className="card">
            <h3>Total Products</h3>
            <p>{totalProducts}</p>
            <span>
              <FaArrowUp className="green" /> This month
            </span>
          </div>
        </div>

        {/* ===== Recent Orders ===== */}
        <div className="recent-orders">
          <h2>Recent Orders</h2>
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Order ID</th>
                <th>Purchased On</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => {
                const firstProduct = mockDB.products.find(p => p.id === order.items[0]?.productId);
                return (
                  <tr key={order.id}>
                    <td>{firstProduct?.name || 'Multiple Items'}</td>
                    <td>ORD-{order.id.toString().padStart(3, '0')}</td>
                    <td>{formatDate(order.date)}</td>
                    <td>{formatCurrency(order.total)}</td>
                    <td className={getStatusClass(order.status)}>
                      {order.status}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* ===== Lower Section ===== */}
        <div className="bottom-section">
          <div className="recent-activity">
            <h2>Recent Activity</h2>
            <ul>
              {recentActivity.map((activity, index) => (
                <li key={index}>
                  <span className={`dot ${activity.color}`}></span>
                  {activity.type} — {activity.description} — {activity.time}
                </li>
              ))}
            </ul>
          </div>

          <div className="low-stocks">
            <h2>Low Stocks</h2>
            <ul>
              {lowStockProducts.slice(0, 3).map((product) => (
                <li key={product.id}>
                  <strong>{product.name}</strong> — Only {product.stock} Left
                </li>
              ))}
              {lowStockProducts.length === 0 && (
                <li>No low stock items</li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;