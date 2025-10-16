import React from "react";
import "../../styles/component/Navbar.css";
import logo from "../../assets/images/happy-cart.png";
import { FaUser, FaHeart, FaShoppingCart, FaSearch } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="navbar">
      {/* Left Side - Logo and Brand */}
      <div className="navbar-left">
        <img src={logo} alt="Happy Cart Logo" className="navbar-logo" />
        <h1 className="navbar-title">HAPPY CART</h1>
      </div>

      {/* Middle Links */}
      <ul className="navbar-links">
        <li><a href="#">New & Featured</a></li>
        <li><a href="#">Men</a></li>
        <li><a href="#">Woman</a></li>
        <li><a href="#">Kids</a></li>
        <li><a href="#">Sale</a></li>
      </ul>

      {/* Right Side - Search and Icons */}
      <div className="navbar-right">
        <div className="search-container">
          <input type="text" placeholder="Search" />
          <FaSearch className="search-icon" />
        </div>
        <FaUser className="nav-icon" />
        <FaHeart className="nav-icon" />
        <FaShoppingCart className="nav-icon" />
      </div>
    </nav>
  );
};

export default Navbar;
