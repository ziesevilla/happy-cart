import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaBoxOpen,
  FaShoppingCart,
  FaUsers,
  FaChartBar,
  FaCog,
  FaQuestionCircle,
  FaSignOutAlt,
} from "react-icons/fa";
import "../styles/admins/Sidebar.css";
import happyCartLogo from "./images/happy-cart.png";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      navigate("/admin/login");
    }
  };

  return (
    <div className="sidebar">
      {/* ===== Logo Section ===== */}
      <div className="sidebar-header">
        <img
          src={happyCartLogo}
          alt="Happy Cart Logo"
          className="sidebar-logo"
        />
        <h2>HAPPY CART</h2>
      </div>

      {/* ===== Navigation Menu ===== */}
      <nav className="sidebar-menu">
        <NavLink to="/admin/dashboard" className="sidebar-link">
          <FaHome /> Overview
        </NavLink>
        <NavLink to="/admin/products" className="sidebar-link">
          <FaBoxOpen /> Products
        </NavLink>
        <NavLink to="/admin/orders" className="sidebar-link">
          <FaShoppingCart /> Orders
        </NavLink>
        <NavLink to="/admin/users" className="sidebar-link">
          <FaUsers /> Users
        </NavLink>
      </nav>

      {/* ===== Footer Buttons ===== */}
      <div className="sidebar-footer">
        <button className="sidebar-btn">
          <FaCog /> Settings
        </button>
        <button className="sidebar-btn">
          <FaQuestionCircle /> Help
        </button>
        <button className="sidebar-btn logout" onClick={handleLogout}>
          <FaSignOutAlt /> Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
