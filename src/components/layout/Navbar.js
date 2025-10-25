import React from "react";
import "../../styles/component/Navbar.css";
import logo from "../../assets/images/happy-cart.png";
import { NavLink, Link } from "react-router-dom";
import { FaUser, FaShoppingCart } from "react-icons/fa";

const Navbar = () => {
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
        {/* USER ICON → redirects to login */}
        <NavLink to="/auth/login">
          <FaUser className="nav-icon" />
        </NavLink>

        {/* CART ICON */}
        <NavLink to="/cart">
          <FaShoppingCart className="nav-icon" />
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
