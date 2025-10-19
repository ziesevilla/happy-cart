import React, { useState, useEffect } from "react";
import "../../styles/admins/ManageUsers.css";
import Sidebar from "../../assets/Sidebar";
import { FaBars } from "react-icons/fa"; // ✅ Added import for FaBars
import happyCartLogo from "../../assets/images/happy-cart.png";

const ManageCustomers = () => {
  const [customers, setCustomers] = useState([]);

  // ===== Fetch Users from Backend (Ready for API Integration) =====
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        // Replace with your backend endpoint when ready
        // const response = await axios.get("/api/customers");
        // setCustomers(response.data);
        setCustomers([
          { id: 1, name: "Zyra Batumbakal", email: "zyra@example.com" },
          { id: 2, name: "Raziel Maiyahin", email: "raziel@example.com" },
          { id: 3, name: "Jericho Barnes", email: "jericho@example.com" },
          { id: 4, name: "Michael Mikel", email: "michael@example.com" },
        ]);
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };

    fetchCustomers();
  }, []);

  // ===== Backend-Ready Action Handlers =====
  const handleDeactivate = async (id) => {
    const confirm = window.confirm("Are you sure you want to deactivate this user?");
    if (confirm) {
      try {
        // await axios.post(`/api/customers/${id}/deactivate`);
        console.log(`User ${id} deactivated`);
      } catch (error) {
        console.error("Error deactivating user:", error);
      }
    }
  };

  const handleSuspend = async (id) => {
    const confirm = window.confirm("Suspend this user?");
    if (confirm) {
      try {
        // await axios.post(`/api/customers/${id}/suspend`);
        console.log(`User ${id} suspended`);
      } catch (error) {
        console.error("Error suspending user:", error);
      }
    }
  };

  const handleResetPassword = async (id) => {
    const confirm = window.confirm("Reset password for this user?");
    if (confirm) {
      try {
        // await axios.post(`/api/customers/${id}/reset-password`);
        console.log(`Password reset for user ${id}`);
      } catch (error) {
        console.error("Error resetting password:", error);
      }
    }
  };

  return (
    <div className="admin-dashboard-container">
      {/* ===== Sidebar ===== */}
      <Sidebar />

      {/* ===== Main Content ===== */}
      <div className="admin-main-content">

        {/* ===== User Management Section ===== */}
        <div className="user-management-card">
          <div className="user-management-header">
            <FaBars className="menu-icon" />
            <h2 className="user-management-title">User Management</h2>
          </div>

          <div className="user-management-tabs">
            <button className="tab active">User</button>
            <button className="tab">Add User</button>
            <button
              className="tab logout"
              onClick={() => window.location.assign("/AdminLogin")}
            >
              Log Out
            </button>
          </div>
        </div>

        {/* ===== List of Shoppers Section ===== */}
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
              {customers.length > 0 ? (
                customers.map((customer) => (
                  <tr key={customer.id}>
                    <td>{customer.name}</td>
                    <td>{customer.email}</td>
                    <td className="actions">
                      <button
                        className="btn deactivate"
                        onClick={() => handleDeactivate(customer.id)}
                      >
                        Deactivate
                      </button>
                      <button
                        className="btn suspend"
                        onClick={() => handleSuspend(customer.id)}
                      >
                        Suspend
                      </button>
                      <button
                        className="btn reset"
                        onClick={() => handleResetPassword(customer.id)}
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
    </div>
  );
};

export default ManageCustomers;
