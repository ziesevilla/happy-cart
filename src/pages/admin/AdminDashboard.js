import React from "react";
import "../../styles/admins/AdminDashboard.css";
import Sidebar from "../../assets/Sidebar";
import { FaBell, FaArrowUp, FaArrowDown, FaSearch, FaBars } from "react-icons/fa";

const AdminDashboard = () => {
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
            <p>₱ ---</p>
            <span>
              <FaArrowUp className="green" /> This month
            </span>
          </div>
          <div className="card">
            <h3>Total Orders</h3>
            <p>---</p>
            <span>
              <FaArrowDown className="red" /> This month
            </span>
          </div>
          <div className="card">
            <h3>Total Users</h3>
            <p>---</p>
            <span>
              <FaArrowUp className="green" /> This month
            </span>
          </div>
          <div className="card">
            <h3>Total Products</h3>
            <p>---</p>
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
              <tr>
                <td>---</td>
                <td>---</td>
                <td>---</td>
                <td>---</td>
                <td className="delivered">---</td>
              </tr>
              <tr>
                <td>---</td>
                <td>---</td>
                <td>---</td>
                <td>---</td>
                <td className="cancelled">---</td>
              </tr>
              <tr>
                <td>---</td>
                <td>---</td>
                <td>---</td>
                <td>---</td>
                <td className="pending">---</td>
              </tr>
              <tr>
                <td>---</td>
                <td>---</td>
                <td>---</td>
                <td>---</td>
                <td className="processing">---</td>
              </tr>
              <tr>
                <td>---</td>
                <td>---</td>
                <td>---</td>
                <td>---</td>
                <td className="delivered">---</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* ===== Lower Section ===== */}
        <div className="bottom-section">
          <div className="recent-activity">
            <h2>Recent Activity</h2>
            <ul>
              <li>
                <span className="dot green"></span> Order Completed — --- — ---
              </li>
              <li>
                <span className="dot blue"></span> New User Registered — --- — ---
              </li>
              <li>
                <span className="dot orange"></span> Refund Requested — --- — ---
              </li>
            </ul>
          </div>

          <div className="low-stocks">
            <h2>Low Stocks</h2>
            <ul>
              <li>
                <strong>---</strong> — Only --- Left (Last Restock: ---)
              </li>
              <li>
                <strong>---</strong> — Only --- Left (Last Restock: ---)
              </li>
              <li>
                <strong>---</strong> — Only --- Left (Last Restock: ---)
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
