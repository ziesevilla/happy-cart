import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../../styles/component/Navbar.css";
import logo from "../../assets/images/happy-cart.png";
import { Link } from "react-router-dom";
import { 
  FaUser, 
  FaShoppingCart, 
  FaSignOutAlt, 
  FaUserCircle,
  FaChevronDown,
  FaStore,
  FaHistory,
  FaHeart
} from "react-icons/fa";
import { logout, selectIsAuthenticated, selectUser, selectUserRole } from "../../store/slices/authSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // Use selectors to get auth state
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);
  const userRole = useSelector(selectUserRole);
  const cartItemsCount = useSelector((state) => state.cart.items?.length || 0);
  
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleProtectedRoute = (path) => {
    if (isAuthenticated) {
      navigate(path);
      setShowUserMenu(false);
    } else {
      navigate("/auth/login");
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
    setShowUserMenu(false);
  };

  const handleAdminDashboard = () => {
    if (userRole === 'admin') {
      navigate("/admin/dashboard");
      setShowUserMenu(false);
    }
  };

  // Handle category navigation with filters
  const handleCategoryClick = (category) => {
    navigate(`/products?category=${encodeURIComponent(category)}`);
  };

  // Toggle user dropdown menu
  const toggleUserMenu = () => {
    if (isAuthenticated) {
      setShowUserMenu(!showUserMenu);
    } else {
      navigate("/auth/login");
    }
  };

  // Sample categories - you can replace with your actual categories
  const categories = [
    { name: "Men's Clothing", slug: "men's clothing" },
    { name: "Women's Clothing", slug: "women's clothing" },
    { name: "Kid's Clothing", slug: "kid's clothing" },
  ];

  return (
    <nav className="navbar">
      {/* LEFT: LOGO + BRAND */}
      <div className="navbar-left">
        <Link to="/" className="navbar-brand">
          <img src={logo} alt="Happy Cart Logo" className="navbar-logo" />
          <h1 className="navbar-title">HAPPY CART</h1>
        </Link>
      </div>

      {/* CENTER: CATEGORIES */}
      <div className="navbar-center">
        {categories.map((category) => (
          <button 
            key={category.slug}
            onClick={() => handleCategoryClick(category.name)}
            className="category-link"
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* RIGHT: USER ACTIONS */}
      <div className="navbar-right">
        {/* Authentication Section */}
        {isAuthenticated ? (
          <div className="user-section">
            {/* User Menu Dropdown */}
            <div className="user-menu-container">
              <button 
                className="user-menu-trigger"
                onClick={toggleUserMenu}
              >
                <FaUserCircle className="user-avatar" />
                <span className="user-name">
                  Hi, {user?.name?.split(' ')[0] || 'User'}!
                </span>
                <FaChevronDown className={`dropdown-arrow ${showUserMenu ? 'rotated' : ''}`} />
              </button>
              
              {/* Dropdown Menu */}
              {showUserMenu && (
                <div className="user-dropdown-menu">
                  {/* User Info */}
                  <div className="dropdown-header">
                    <FaUserCircle className="header-avatar" />
                    <div className="user-info">
                      <strong>{user?.name || 'User'}</strong>
                      <span>{user?.email}</span>
                    </div>
                  </div>
                  
                  <div className="dropdown-divider"></div>
                  
                  {/* Menu Items */}
                  <button 
                    onClick={() => handleProtectedRoute("/profile")}
                    className="dropdown-item"
                  >
                    <FaUser className="dropdown-icon" />
                    My Profile
                  </button>
                  
                  <button 
                    onClick={() => handleProtectedRoute("/orders")}
                    className="dropdown-item"
                  >
                    <FaHistory className="dropdown-icon" />
                    Order History
                  </button>
                  
                  <button 
                    onClick={() => handleProtectedRoute("/addresses")}
                    className="dropdown-item"
                  >
                    <FaHeart className="dropdown-icon" />
                    Saved Addresses
                  </button>
                  
                  {/* Admin Section */}
                  {userRole === 'admin' && (
                    <>
                      <div className="dropdown-divider"></div>
                      <button 
                        onClick={handleAdminDashboard}
                        className="dropdown-item admin-item"
                      >
                        <FaStore className="dropdown-icon" />
                        Admin Dashboard
                      </button>
                    </>
                  )}
                  
                  <div className="dropdown-divider"></div>
                  
                  {/* Logout */}
                  <button 
                    onClick={handleLogout}
                    className="dropdown-item logout-item"
                  >
                    <FaSignOutAlt className="dropdown-icon" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="auth-section">
            <button
              onClick={() => navigate("/auth/login")}
              className="nav-btn login-btn"
            >
              Login
            </button>
            <span className="nav-divider">|</span>
            <button
              onClick={() => navigate("/auth/signup")}
              className="nav-btn signup-btn"
            >
              Sign Up
            </button>
          </div>
        )}

        {/* Action Icons */}
        <div className="action-icons">
          <button
            onClick={() => handleProtectedRoute("/profile")}
            className="icon-btn"
            aria-label="User Profile"
          >
            <FaUser className="nav-icon" />
          </button>

          <div className="cart-wrapper">
            <button
              onClick={() => handleProtectedRoute("/cart")}
              className="icon-btn"
              aria-label="Shopping Cart"
            >
              <FaShoppingCart className="nav-icon" />
            </button>
            {cartItemsCount > 0 && (
              <span className="cart-badge">{cartItemsCount}</span>
            )}
          </div>
        </div>
      </div>

      {/* Overlay for closing dropdown when clicking outside */}
      {showUserMenu && (
        <div 
          className="dropdown-overlay"
          onClick={() => setShowUserMenu(false)}
        />
      )}
    </nav>
  );
};

export default Navbar;