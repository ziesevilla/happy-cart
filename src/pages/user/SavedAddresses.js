// src/pages/user/SavedAddresses.js
import React, { useState, useCallback } from "react";
import { mockDB } from "../../assets/data/mockDatabase";
import "../../styles/pages/Profile.css";

// Reusable Components
const ActionButton = ({ 
  children, 
  variant = "primary", 
  onClick, 
  disabled = false, 
  type = "button",
  icon 
}) => (
  <button
    type={type}
    className={`btn btn-${variant}`}
    onClick={onClick}
    disabled={disabled}
  >
    {icon && <span className="btn-icon">{icon}</span>}
    {children}
  </button>
);

const Card = ({ children, className = "" }) => (
  <div className={`card ${className}`}>
    {children}
  </div>
);

const SectionHeader = ({ title, subtitle, action }) => (
  <div className="section-header">
    <div className="section-title">
      <h2>{title}</h2>
      {subtitle && <p className="section-subtitle">{subtitle}</p>}
    </div>
    {action && <div className="section-action">{action}</div>}
  </div>
);

function SavedAddresses() {
  const [addresses, setAddresses] = useState(mockDB.addresses);
  const [notification, setNotification] = useState({ show: false, message: "", type: "" });

  // Show notification helper
  const showNotification = useCallback((message, type = "success") => {
    setNotification({ show: true, message, type });
    setTimeout(() => setNotification({ show: false, message: "", type: "" }), 3000);
  }, []);

  // Addresses actions
  const handleSetDefault = useCallback((index) => {
    const updated = addresses.map((addr, i) => ({
      ...addr,
      isDefault: i === index,
    }));
    setAddresses(updated);
    showNotification("Default address updated");
  }, [addresses, showNotification]);

  const handleDelete = useCallback((index) => {
    if (addresses[index].isDefault) {
      showNotification("Cannot delete default address", "error");
      return;
    }

    if (window.confirm("Are you sure you want to delete this address?")) {
      const updated = addresses.filter((_, i) => i !== index);
      setAddresses(updated);
      showNotification("Address deleted");
    }
  }, [addresses, showNotification]);

  return (
    <div className="profile-page">
      {/* Notification System */}
      {notification.show && (
        <div className={`notification ${notification.type}`}>
          {notification.message}
        </div>
      )}

      <Card className="addresses-section">
        <SectionHeader 
          title="Saved Addresses" 
          subtitle="Manage your delivery addresses"
          action={
            <ActionButton 
              variant="primary" 
              icon="➕"
              onClick={() => showNotification("Add new address feature coming soon!")}
            >
              Add New Address
            </ActionButton>
          }
        />

        <div className="addresses-content">
          {addresses.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📍</div>
              <h3>No addresses saved</h3>
              <p>Add your first address to get started with deliveries.</p>
              <ActionButton 
                variant="primary" 
                icon="➕"
                onClick={() => showNotification("Add new address feature coming soon!")}
              >
                Add Your First Address
              </ActionButton>
            </div>
          ) : (
            <div className="addresses-grid">
              {addresses.map((addr, index) => (
                <Card key={index} className="address-card">
                  <div className="address-header">
                    <div className="address-type">
                      <span className="type-icon">
                        {addr.type === 'Home' ? '🏠' : addr.type === 'Work' ? '🏢' : '👨‍👩‍👧‍👦'}
                      </span>
                      <h4>{addr.type} Address</h4>
                      {addr.isDefault && (
                        <span className="default-badge" aria-label="Default address">
                          Default
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="address-details">
                    <p className="contact-name">
                      <strong>{addr.name}</strong> | {addr.contact}
                    </p>
                    <p className="address-text">{addr.address}</p>
                  </div>

                  <div className="address-actions">
                    <div className="left-actions">
                      <ActionButton 
                        variant="text" 
                        icon="✏️"
                        onClick={() => showNotification("Edit feature coming soon!")}
                      >
                        Edit
                      </ActionButton>
                      <ActionButton 
                        variant="text" 
                        icon="🗑️"
                        onClick={() => handleDelete(index)}
                        disabled={addr.isDefault}
                      >
                        Delete
                      </ActionButton>
                    </div>
                    <ActionButton
                      variant={addr.isDefault ? "primary" : "outline"}
                      onClick={() => handleSetDefault(index)}
                      disabled={addr.isDefault}
                      icon={addr.isDefault ? "⭐" : "⚡"}
                    >
                      {addr.isDefault ? "Default" : "Set Default"}
                    </ActionButton>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}

export default SavedAddresses;