// src/pages/Profile.js
import React, { useState, useCallback, useMemo, useEffect } from "react";
import { mockDB } from "../../assets/data/mockDatabase";
import "../../styles/pages/Profile.css";

// Reusable Components for consistent UI
const FormField = ({ 
  label, 
  name, 
  type, 
  value, 
  onChange, 
  disabled, 
  error, 
  showPasswordToggle, 
  onTogglePassword,
  placeholder 
}) => (
  <div className="form-field">
    <label htmlFor={name} className="form-label">
      {label}
    </label>
    <div className="input-wrapper">
      <input
        id={name}
        type={type}
        name={name}
        value={value || ""}
        onChange={onChange}
        disabled={disabled}
        placeholder={placeholder}
        aria-describedby={error ? `${name}-error` : undefined}
        aria-invalid={!!error}
        className={`form-input ${error ? "input-error" : ""}`}
      />
      {showPasswordToggle && (
        <button
          type="button"
          className="icon-btn password-toggle"
          onClick={onTogglePassword}
          aria-label={type === "password" ? "Show password" : "Hide password"}
          aria-pressed={type === "text"}
          disabled={disabled}
        >
          {type === "password" ? "👁️" : "🙈"}
        </button>
      )}
    </div>
    {error && (
      <span id={`${name}-error`} className="error-message" role="alert">
        {error}
      </span>
    )}
  </div>
);

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

const ConfirmationModal = ({ isOpen, onClose, onConfirm, title, message, isLoading }) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };
    
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="modal-overlay" 
      role="dialog" 
      aria-modal="true"
      aria-labelledby="confirm-title"
      onClick={handleBackdropClick}
    >
      <Card className="modal">
        <h3 id="confirm-title">{title}</h3>
        <p className="modal-message">{message}</p>
        <div className="modal-actions">
          <ActionButton 
            variant="secondary" 
            onClick={onClose} 
            disabled={isLoading}
          >
            Cancel
          </ActionButton>
          <ActionButton 
            variant="primary" 
            onClick={onConfirm} 
            disabled={isLoading}
          >
            {isLoading ? "Updating..." : "Confirm Update"}
          </ActionButton>
        </div>
      </Card>
    </div>
  );
};

function Profile() {
  const { user } = mockDB.profile;
  const [activeTab, setActiveTab] = useState("profile");
  const [editable, setEditable] = useState(false);
  const [formData, setFormData] = useState(user || {});
  const [originalData] = useState(user || {});
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [addresses, setAddresses] = useState(mockDB.addresses);
  const [notification, setNotification] = useState({ show: false, message: "", type: "" });

  // Show notification helper
  const showNotification = useCallback((message, type = "success") => {
    setNotification({ show: true, message, type });
    setTimeout(() => setNotification({ show: false, message: "", type: "" }), 3000);
  }, []);

  // Tab switching
  const handleTabChange = useCallback((tab) => {
    setActiveTab(tab);
    setErrors({});
  }, []);

  const handleKeyDown = useCallback((e, tab) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleTabChange(tab);
    }
  }, [handleTabChange]);

  // Profile validation
  const validateForm = useCallback(() => {
    const newErrors = {};
    
    if (!formData.name?.trim()) newErrors.name = "Name is required";
    if (!formData.email?.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email format";
    if (!formData.phone?.trim()) newErrors.phone = "Phone is required";
    else if (!/^\d{10,15}$/.test(formData.phone.replace(/\D/g, ''))) newErrors.phone = "Invalid phone number";
    if (!formData.password?.trim()) newErrors.password = "Password is required";
    else if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  }, [errors]);

  const handleEdit = useCallback(() => {
    setEditable(true);
    setErrors({});
  }, []);

  const handleCancel = useCallback(() => {
    setFormData(originalData);
    setEditable(false);
    setErrors({});
    setShowPassword(false);
  }, [originalData]);

  const handleUpdate = useCallback(() => {
    if (!validateForm()) {
      showNotification("Please fix the errors before updating", "error");
      return;
    }
    setShowConfirm(true);
  }, [validateForm, showNotification]);

  const confirmUpdate = useCallback(() => {
    setIsLoading(true);
    
    setTimeout(() => {
      mockDB.profile.user = formData;
      setEditable(false);
      setShowConfirm(false);
      setIsLoading(false);
      showNotification("Profile updated successfully!");
    }, 1000);
  }, [formData, showNotification]);

  // Orders filtering
  const filteredOrders = useMemo(() => {
    if (!searchTerm.trim()) return mockDB.orders;
    
    const query = searchTerm.toLowerCase();
    return mockDB.orders.filter((order) =>
      Object.values(order).some(value =>
        String(value).toLowerCase().includes(query)
      )
    );
  }, [searchTerm]);

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

  // Loading state
  if (!user) {
    return (
      <div className="profile-page loading">
        <div className="loading-spinner">Loading...</div>
      </div>
    );
  }

  return (
    <div className="profile-page">
      {/* Notification System */}
      {notification.show && (
        <div className={`notification ${notification.type}`}>
          {notification.message}
        </div>
      )}

      {/* Tab Navigation */}
      <nav className="tab-navigation" role="tablist" aria-label="Profile sections">
        {[
          { id: "profile", label: "Profile", icon: "👤" },
          { id: "orders", label: "My Orders", icon: "📦" },
          { id: "addresses", label: "Saved Addresses", icon: "📍" }
        ].map((tab) => (
          <button
            key={tab.id}
            className={`tab ${activeTab === tab.id ? "active" : ""}`}
            onClick={() => handleTabChange(tab.id)}
            onKeyDown={(e) => handleKeyDown(e, tab.id)}
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-controls={`${tab.id}-panel`}
            id={`${tab.id}-tab`}
          >
            <span className="tab-icon">{tab.icon}</span>
            <span className="tab-label">{tab.label}</span>
          </button>
        ))}
      </nav>

      {/* Profile Tab */}
      <section
        id="profile-panel"
        role="tabpanel"
        aria-labelledby="profile-tab"
        hidden={activeTab !== "profile"}
      >
        <Card className="profile-section">
          <SectionHeader 
            title="Profile Information" 
            subtitle="Manage your personal information and account settings"
          />

          <div className="profile-header">
            <div className="avatar-section">
              <img
                src={formData.avatar || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                alt={`${formData.name}'s avatar`}
                className="profile-avatar"
              />
              <ActionButton variant="outline" icon="📷">
                Change Photo
              </ActionButton>
            </div>
            <div className="profile-summary">
              <h3 className="user-name">{formData.name}</h3>
              <div className="user-details">
                <span className="detail-item">📧 {formData.email}</span>
                <span className="detail-item">📞 {formData.phone}</span>
              </div>
            </div>
          </div>

          <form className="profile-form" onSubmit={(e) => e.preventDefault()} noValidate>
            <div className="form-grid">
              <FormField
                label="Full Name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                disabled={!editable}
                error={errors.name}
                placeholder="Enter your full name"
              />
              <FormField
                label="Email Address"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                disabled={!editable}
                error={errors.email}
                placeholder="Enter your email address"
              />
              <FormField
                label="Phone Number"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                disabled={!editable}
                error={errors.phone}
                placeholder="Enter your phone number"
              />
              <FormField
                label="Password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                disabled={!editable}
                error={errors.password}
                placeholder="Enter your password"
                showPasswordToggle
                onTogglePassword={() => setShowPassword(!showPassword)}
              />
            </div>

            <div className="form-actions">
              {!editable ? (
                <ActionButton 
                  variant="primary" 
                  onClick={handleEdit}
                  icon="✏️"
                >
                  Edit Profile
                </ActionButton>
              ) : (
                <div className="action-group">
                  <ActionButton 
                    variant="secondary" 
                    onClick={handleCancel}
                    disabled={isLoading}
                  >
                    Cancel
                  </ActionButton>
                  <ActionButton 
                    variant="primary" 
                    onClick={handleUpdate}
                    disabled={isLoading}
                    icon="💾"
                  >
                    {isLoading ? "Saving..." : "Save Changes"}
                  </ActionButton>
                </div>
              )}
            </div>
          </form>
        </Card>
      </section>

<section
  id="orders-panel"
  role="tabpanel"
  aria-labelledby="orders-tab"
  hidden={activeTab !== "orders"}
>
  <Card className="orders-section">
    <SectionHeader 
      title="My Orders" 
      subtitle="Track and manage your purchases"
      action={
        <div className="search-box">
          <div className="search-input-wrapper">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search orders by seller, order ID, or product..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          <ActionButton variant="outline" icon="⚙️">
            Filters
          </ActionButton>
        </div>
      }
    />

    <div className="orders-content">
      {filteredOrders.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📦</div>
          <h3>No orders found</h3>
          <p>
            {searchTerm 
              ? "No orders match your search criteria." 
              : "You haven't placed any orders yet."
            }
          </p>
          {!searchTerm && (
            <ActionButton variant="primary" icon="🛍️">
              Start Shopping
            </ActionButton>
          )}
        </div>
      ) : (
        <div className="orders-grid">
          {filteredOrders.map((order, index) => (
            <Card key={order.orderId || index} className="order-card compact">
              <div className="order-header">
                <div className="order-meta">
                  <span className="order-date">
                    {order.status === "Completed"
                      ? `Delivered on ${order.date}`
                      : `Placed on ${order.date}`}
                  </span>
                  <span className={`order-status status-${order.status.toLowerCase()}`}>
                    <span className="status-icon">{order.icon}</span>
                    {order.status}
                  </span>
                </div>
              </div>

              <div className="order-body">
                <div className="product-info">
                  <img
                    src={order.image}
                    alt={order.product}
                    className="product-image"
                  />
                  <div className="product-details">
                    <h4 className="product-name">{order.product}</h4>
                    <p className="product-variation">Variation: {order.variation}</p>
                    <p className="product-quantity">
                      {order.quantity} × ₱{order.price}
                    </p>
                    <div className="order-summary compact">
                      <div className="summary-item">
                        <span>Total:</span>
                        <strong>₱{order.price}</strong>
                      </div>
                      <div className="summary-item">
                        <span>ID:</span>
                        <code>{order.orderId}</code>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="order-actions">
                <ActionButton variant="outline" size="small">
                  Contact Seller
                </ActionButton>
                {order.status === "Completed" ? (
                  <ActionButton variant="primary" size="small" icon="🔄">
                    Buy Again
                  </ActionButton>
                ) : (
                  <ActionButton variant="primary" size="small" icon="🚚">
                    Track Order
                  </ActionButton>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  </Card>
</section>

{/* Addresses Tab */}
<section
  id="addresses-panel"
  role="tabpanel"
  aria-labelledby="addresses-tab"
  hidden={activeTab !== "addresses"}
>
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
</section>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={confirmUpdate}
        title="Confirm Profile Update"
        message="Are you sure you want to update your profile information? This will save all your changes."
        isLoading={isLoading}
      />
    </div>
  );
}

export default Profile;