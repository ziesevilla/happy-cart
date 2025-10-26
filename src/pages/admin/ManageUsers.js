// src/pages/admin/ManageUsers.js
import React, { useState, useEffect } from "react";
import "../../styles/admins/ManageUsers.css";
import Sidebar from "../../components/layout/Sidebar.js";
import { FaBars } from "react-icons/fa";
import { mockDB } from "../../assets/data/mockDatabase";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [showAddUserPopup, setShowAddUserPopup] = useState(false);
  const [newUser, setNewUser] = useState({ 
    name: "", 
    email: "", 
    password: "",
    address: "" 
  });

  // ===== Fetch Users from mockDatabase =====
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Convert mockDB users to include status
        const usersWithStatus = mockDB.users.map(user => ({
          ...user,
          status: "active", // Default status
          orders: user.orders || [] // Ensure orders array exists
        }));
        setUsers(usersWithStatus);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  // ===== Toggle Deactivate / Activate =====
  const handleDeactivate = (id) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === id
          ? {
              ...user,
              status: user.status === "deactivated" ? "active" : "deactivated",
            }
          : user
      )
    );
  };

  // ===== Toggle Suspend / Unsuspend =====
  const handleSuspend = (id) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === id
          ? {
              ...user,
              status: user.status === "suspended" ? "active" : "suspended",
            }
          : user
      )
    );
  };

  // ===== Reset Password =====
  const handleResetPassword = (id) => {
    const user = users.find(u => u.id === id);
    if (window.confirm(`Reset password for ${user?.name}?`)) {
      // In a real app, this would call a backend API
      console.log(`Password reset for user ${id}`);
      alert(`Password has been successfully reset for ${user?.name}`);
    }
  };

  // ===== Delete User =====
  const handleDeleteUser = (id) => {
    const user = users.find(u => u.id === id);
    if (window.confirm(`Are you sure you want to delete ${user?.name}? This action cannot be undone.`)) {
      setUsers(prevUsers => prevUsers.filter(user => user.id !== id));
      alert(`User ${user?.name} has been deleted`);
    }
  };

  // ===== Add User Popup Handlers =====
  const handleAddUser = () => setShowAddUserPopup(true);
  
  const handleClosePopup = () => {
    setShowAddUserPopup(false);
    setNewUser({ 
      name: "", 
      email: "", 
      password: "",
      address: "" 
    });
  };

  const handleInputChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleSubmitNewUser = (e) => {
    e.preventDefault();
    if (!newUser.name || !newUser.email || !newUser.password) {
      alert("Please fill in all required fields.");
      return;
    }

    // Generate new user ID
    const newId = Math.max(...users.map(u => u.id)) + 1;
    
    const userToAdd = {
      id: newId,
      name: newUser.name,
      email: newUser.email,
      password: newUser.password,
      address: newUser.address || "Not specified",
      orders: [],
      status: "active"
    };

    setUsers([...users, userToAdd]);
    handleClosePopup();
    alert(`User ${newUser.name} added successfully!`);
  };

  // Get user statistics
  const userStats = {
    total: users.length,
    active: users.filter(u => u.status === "active").length,
    deactivated: users.filter(u => u.status === "deactivated").length,
    suspended: users.filter(u => u.status === "suspended").length,
    withOrders: users.filter(u => u.orders && u.orders.length > 0).length
  };

  return (
    <div className="admin-dashboard-container">
      <Sidebar />

      <div className="admin-main-content">
        {/* ===== User Management Header ===== */}
        <div className="user-management-card">
          <div className="user-management-header">
            <FaBars className="menu-icon" />
            <h2 className="user-management-title">User Management</h2>
            <div className="user-stats">
              <span>Total: {userStats.total}</span>
              <span>Active: {userStats.active}</span>
              <span>With Orders: {userStats.withOrders}</span>
            </div>
          </div>

          <div className="user-management-tabs">
            <button className="tab active">All Users</button>
            <button className="tab" onClick={handleAddUser}>
              Add New User
            </button>
          </div>
        </div>

        {/* ===== User List ===== */}
        <section className="customer-list-section">
          <h3 className="customer-list-title">List of Shoppers</h3>

          <table className="customer-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Address</th>
                <th>Orders</th>
                <th className="actions-col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user) => (
                  <tr
                    key={user.id}
                    className={
                      user.status === "deactivated"
                        ? "row-deactivated"
                        : user.status === "suspended"
                        ? "row-suspended"
                        : ""
                    }
                  >
                    <td>
                      <div className="user-name-cell">
                        <strong>{user.name}</strong>
                        {user.status === "deactivated" && (
                          <span className="status-text">ACCOUNT DEACTIVATED</span>
                        )}
                        {user.status === "suspended" && (
                          <span className="status-text red">ACCOUNT SUSPENDED</span>
                        )}
                      </div>
                    </td>
                    <td>{user.email}</td>
                    <td className="user-address">{user.address}</td>
                    <td className="order-count">
                      {user.orders?.length || 0} orders
                    </td>
                    <td className="actions">
                      <button
                        className={`btn deactivate ${
                          user.status === "deactivated" ? "activate" : ""
                        }`}
                        onClick={() => handleDeactivate(user.id)}
                      >
                        {user.status === "deactivated" ? "Activate" : "Deactivate"}
                      </button>
                      <button
                        className={`btn suspend ${
                          user.status === "suspended" ? "unsuspend" : ""
                        }`}
                        onClick={() => handleSuspend(user.id)}
                      >
                        {user.status === "suspended" ? "Unsuspend" : "Suspend"}
                      </button>
                      <button
                        className="btn reset"
                        onClick={() => handleResetPassword(user.id)}
                      >
                        Reset Password
                      </button>
                      <button
                        className="btn delete"
                        onClick={() => handleDeleteUser(user.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="no-data">
                    ----- No users available -----
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </section>
      </div>

      {/* ===== Add User Popup ===== */}
      {showAddUserPopup && (
        <div className="add-user-popup-overlay">
          <div className="add-user-popup-blur"></div>
          <div className="add-user-popup-container">
            <div className="add-user-popup-header">
              <span className="back-arrow" onClick={handleClosePopup}>
                &lt;
              </span>
              <h3>ADD NEW USER</h3>
            </div>
            <hr className="header-divider" />
            <form className="add-user-form" onSubmit={handleSubmitNewUser}>
              <div className="form-group">
                <label>Full Name:</label>
                <input
                  type="text"
                  name="name"
                  value={newUser.name}
                  onChange={handleInputChange}
                  placeholder="Enter full name"
                  required
                />
              </div>

              <div className="form-group">
                <label>Email Address:</label>
                <input
                  type="email"
                  name="email"
                  value={newUser.email}
                  onChange={handleInputChange}
                  placeholder="Enter email address"
                  required
                />
              </div>

              <div className="form-group">
                <label>Password:</label>
                <input
                  type="password"
                  name="password"
                  value={newUser.password}
                  onChange={handleInputChange}
                  placeholder="Enter password"
                  required
                  minLength="6"
                />
              </div>

              <div className="form-group">
                <label>Address (Optional):</label>
                <input
                  type="text"
                  name="address"
                  value={newUser.address}
                  onChange={handleInputChange}
                  placeholder="Enter address"
                />
              </div>

              <button type="submit" className="add-user-btn">
                Add User
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;