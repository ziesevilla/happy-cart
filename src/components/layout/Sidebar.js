import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaBoxOpen,
  FaShoppingCart,
  FaUsers,
  FaCog,
  FaQuestionCircle,
  FaSignOutAlt,
} from "react-icons/fa";
import "../../styles/component/Sidebar.css";
import happyCartLogo from "../../assets/images/happy-cart.png";
import { logout } from "../../store/slices/authSlice"; // Import logout action

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // Get auth state from Redux store
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      dispatch(logout());
      navigate("/admin/login");
    }
  };

  // Redirect to login if not authenticated (safety check)
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate("/admin/login");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="sidebar">
      {/* ===== Logo Section ===== */}
      <div className="sidebar-header">
        <div className="logo-container">
          <img
            src={happyCartLogo}
            alt="Happy Cart Logo"
            className="sidebar-logo"
          />
          <h2 className="sidebar-title">HAPPY CART</h2>
        </div>
        
        {/* Admin User Info */}
        {user && (
          <div className="admin-user-info">
            <p className="admin-welcome">Welcome, Admin!</p>
            <p className="admin-email">{user.email}</p>
          </div>
        )}
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