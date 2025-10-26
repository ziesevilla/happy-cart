import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../../styles/component/Navbar.css";
import logo from "../../assets/images/happy-cart.png";
import { Link } from "react-router-dom";
import { FaUser, FaShoppingCart, FaSignOutAlt, FaUserCircle } from "react-icons/fa";
import { logout } from "../../store/slices/authSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const cartItemsCount = useSelector((state) => state.cart.items?.length || 0);

  const handleProtectedRoute = (path) => {
    if (isAuthenticated) {
      navigate(path);
    } else {
      navigate("/auth/login");
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const handleAdminDashboard = () => {
    if (user?.role === 'admin') {
      navigate("/admin/dashboard");
    }
  };

  // Handle category navigation with filters
  const handleCategoryClick = (category) => {
    navigate(`/products?category=${category}`);
  };

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
        <button 
          onClick={() => handleCategoryClick("men")}
          className="category-link"
        >
          Men
        </button>
        <button 
          onClick={() => handleCategoryClick("women")}
          className="category-link"
        >
          Women
        </button>
        <button 
          onClick={() => handleCategoryClick("kids")}
          className="category-link"
        >
          Kids
        </button>
        <button 
          onClick={() => handleCategoryClick("accessories")}
          className="category-link"
        >
          Accessories
        </button>
      </div>

      {/* RIGHT: USER ACTIONS */}
      <div className="navbar-right">
        {/* Authentication Section */}
        {isAuthenticated ? (
          <div className="user-section">
            <span className="user-welcome">
              <FaUserCircle className="user-icon" />
              Welcome, {user?.name || 'User'}!
            </span>
            
            {user?.role === 'admin' && (
              <button
                onClick={handleAdminDashboard}
                className="nav-btn admin-btn"
              >
                Admin
              </button>
            )}
            
            <button
              onClick={handleLogout}
              className="nav-btn logout-btn"
            >
              <FaSignOutAlt className="btn-icon" />
              Logout
            </button>
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
    </nav>
  );
};

export default Navbar;