// src/pages/Profile.js
import React, { useState } from "react";
import "../../styles/pages/Profile.css";
import { useNavigate } from "react-router-dom";
import { mockDB } from "../../assets/data/mockDatabase";

function Profile() {
  const { user } = mockDB.profile;
  const [editable, setEditable] = useState(false);
  const [formData, setFormData] = useState(user);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEdit = () => {
    setEditable(true);
  };

  const handleUpdate = () => {
    setEditable(false);
    alert("Profile updated successfully!");
  };

  return (
    <div className="profile-container">
      <h2 className="profile-title">← Profile</h2>

      <div className="profile-header">
        <img
          src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
          alt="User Avatar"
          className="profile-avatar"
        />
        <div className="profile-summary">
          <h3>{formData.name}</h3>
          <p>{formData.email}</p>
          <p>{formData.phone}</p>
        </div>
      </div>

      <form className="profile-form">
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          disabled={!editable}
        />

        <label>Email Address:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          disabled={!editable}
        />

        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          disabled={!editable}
        />

        <div className="profile-buttons">
          <button
            type="button"
            className="edit-btn"
            onClick={handleEdit}
            disabled={editable}
          >
            EDIT
          </button>
          <button
            type="button"
            className="update-btn"
            onClick={handleUpdate}
            disabled={!editable}
          >
            UPDATE
          </button>
        </div>
      </form>

      <div className="profile-links">
        <h4 onClick={() => navigate("/orders")}>My Orders</h4>
        <h4 onClick={() => navigate("/savedaddresses")}>Saved Addresses</h4>
      </div>
    </div>
  );
}

export default Profile;
