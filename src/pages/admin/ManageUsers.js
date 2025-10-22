import React, { useState, useEffect } from "react";
import "../../styles/admins/ManageUsers.css";
import Sidebar from "../../assets/Sidebar";
import { FaBars } from "react-icons/fa";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [showAddUserPopup, setShowAddUserPopup] = useState(false);
  const [newUser, setNewUser] = useState({ name: "", email: "", password: "" });

  // ===== Fetch Users (Mock Data) =====
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setUsers([
          { id: 1, name: "Zyra Batumbakal", email: "zyra@example.com", status: "active" },
          { id: 2, name: "Raziel Maiyahin", email: "raziel@example.com", status: "active" },
          { id: 3, name: "Jericho Barnes", email: "jericho@example.com", status: "active" },
          { id: 4, name: "Michael Mikel", email: "michael@example.com", status: "active" },
        ]);
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
    if (window.confirm("Reset password for this user?")) {
      // Placeholder for backend API call
      console.log(`Password reset for user ${id}`);
      alert("The password has been successfully reset");
    }
  };

  // ===== Add User Popup Handlers =====
  const handleAddUser = () => setShowAddUserPopup(true);
  const handleClosePopup = () => {
    setShowAddUserPopup(false);
    setNewUser({ name: "", email: "", password: "" });
  };

  const handleInputChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleSubmitNewUser = (e) => {
    e.preventDefault();
    if (!newUser.name || !newUser.email || !newUser.password) {
      alert("Please fill in all fields.");
      return;
    }
    setUsers([...users, { id: users.length + 1, ...newUser, status: "active" }]);
    handleClosePopup();
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
          </div>

          <div className="user-management-tabs">
            <button className="tab active">User</button>
            <button className="tab" onClick={handleAddUser}>
              Add User
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
                      {user.name}
                      {user.status === "deactivated" && (
                        <span className="status-text">ACCOUNT DEACTIVATED</span>
                      )}
                      {user.status === "suspended" && (
                        <span className="status-text red">ACCOUNT SUSPENDED</span>
                      )}
                    </td>
                    <td>{user.email}</td>
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
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="no-data">
                    ----- No data available -----
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
              <h3>ADD USER</h3>
            </div>
            <hr className="header-divider" />
            <form className="add-user-form" onSubmit={handleSubmitNewUser}>
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={newUser.name}
                onChange={handleInputChange}
                placeholder="Enter full name"
              />

              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={newUser.email}
                onChange={handleInputChange}
                placeholder="Enter email address"
              />

              <label>Password:</label>
              <input
                type="password"
                name="password"
                value={newUser.password}
                onChange={handleInputChange}
                placeholder="Enter password"
              />

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
