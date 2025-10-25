import React from "react";
import "../../styles/component/Navbar.css";
import logo from "../../assets/images/happy-cart.png";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaShoppingCart } from "react-icons/fa";

const Navbar = ({ isLoggedIn }) => {
  const navigate = useNavigate();

  // 🧭 Handle protected navigation (redirects to login if not logged in)
  const handleProtectedRoute = (path) => {
    if (isLoggedIn) {
      navigate(path);
    } else {
      navigate("/auth/signup");
    }
  };

  return (
    <nav className="navbar">
      {/* LEFT: LOGO + HOME */}
      <div className="navbar-left">
        <Link to="/" className="navbar-home-link">
          <img src={logo} alt="Happy Cart Logo" className="navbar-logo" />
          <h1 className="navbar-title">HAPPY CART</h1>
        </Link>
      </div>

      {/* RIGHT: USER + CART */}
      <div className="navbar-right">
        {/* USER ICON */}
        <button
          onClick={() => handleProtectedRoute("/profile")}
          className="nav-icon-button"
          aria-label="User Account"
        >
          <FaUser className="nav-icon" />
        </button>

        {/* CART ICON */}
        <button
          onClick={() => handleProtectedRoute("/cart")}
          className="nav-icon-button"
          aria-label="Shopping Cart"
        >
          <FaShoppingCart className="nav-icon" />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
