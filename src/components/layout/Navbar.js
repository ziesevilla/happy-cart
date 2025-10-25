import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { FaShoppingCart, FaUser } from "react-icons/fa";

function AppNavbar() {
  return (
    <Navbar bg="primary" variant="dark" expand="lg" sticky="top">
      <Container>
        {/* Logo / Brand */}
        <Navbar.Brand as={Link} to="/">
          ShopWave 🌊
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          <Nav className="ms-auto">
            {/* Shopper Links */}
            <Nav.Link as={NavLink} to="/" end>
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to="/products">
              Products
            </Nav.Link>
            <Nav.Link as={NavLink} to="/cart">
              <FaShoppingCart className="me-1" /> Cart
            </Nav.Link>

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
}

export default AppNavbar;
