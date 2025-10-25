import React from "react";
import "../../styles/component/Navbar.css";
import logo from "../../assets/images/happy-cart.png";
import { NavLink, Link } from "react-router-dom"; // ✅ include Link
import { FaUser, FaHeart, FaShoppingCart, FaSearch } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="navbar">
      {/* ===== Left Section ===== */}
      <div className="navbar-left">
        <Link to="/" className="navbar-home-link">   {/* ✅ Redirect to homepage */}
          <img src={logo} alt="Happy Cart Logo" className="navbar-logo" />
          <h1 className="navbar-title">HAPPY CART</h1>
        </Link>
      </div>

      {/* ===== Middle Links ===== */}
      <ul className="navbar-links">
        <li>
          <NavLink
            to="/new"
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            New & Featured
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/men"
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            Men
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/women"
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            Women
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/kids"
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            Kids
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/sale"
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            Sale
          </NavLink>
        </li>
      </ul>

            {/* Account Dropdown */}
            <NavDropdown title={<FaUser />} id="user-dropdown" align="end">
              <NavDropdown.Item as={NavLink} to="/login">
                Login
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/signup">
                Sign Up
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={NavLink} to="/profile">
                Profile
              </NavDropdown.Item>
            </NavDropdown>

            {/* Admin Dropdown */}
            <NavDropdown title="Admin" id="admin-dropdown" align="end">
              <NavDropdown.Item as={NavLink} to="/admin/dashboard">
                Dashboard
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/admin/products">
                Manage Products
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/admin/orders">
                Manage Orders
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/admin/users">
                Manage Users
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navbar;
