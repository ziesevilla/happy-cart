// src/pages/SavedAddresses.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/pages/SavedAddresses.css";
import { mockDB } from "../../assets/data/mockDatabase";

function SavedAddresses() {
  const navigate = useNavigate();
  const [addresses, setAddresses] = useState(mockDB.addresses);

  const handleSetDefault = (index) => {
    const updated = addresses.map((addr, i) => ({
      ...addr,
      isDefault: i === index,
    }));
    setAddresses(updated);
  };

  const handleDelete = (index) => {
    if (window.confirm("Are you sure you want to delete this address?")) {
      const updated = addresses.filter((_, i) => i !== index);
      setAddresses(updated);
    }
  };

  return (
    <div className="address-container">
      <div className="address-header">
        <button className="back-btn" onClick={() => navigate("/profile")}>
          ← Back
        </button>
        <h2 className="address-title">Saved Address</h2>
        <button
          className="add-btn"
          onClick={() => alert("Add new address feature coming soon!")}
        >
          + Add New Address
        </button>
      </div>

      <div className="address-list">
        <h3>My Addresses</h3>
        {addresses.map((addr, index) => (
          <div className="address-card" key={index}>
            <h4>{addr.type}</h4>
            <p>
              <strong>{addr.name}</strong> | {addr.contact}
            </p>
            <p>{addr.address}</p>

            <div className="address-actions">
              <div className="left-actions">
                <button
                  className="edit-btn"
                  onClick={() => alert("Edit feature coming soon!")}
                >
                  Edit
                </button>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(index)}
                >
                  Delete
                </button>
              </div>
              <button
                className={`default-btn ${addr.isDefault ? "active" : ""}`}
                onClick={() => handleSetDefault(index)}
              >
                {addr.isDefault ? "Default" : "Set Default"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SavedAddresses;
