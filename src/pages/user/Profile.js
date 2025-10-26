// src/pages/user/Profile.js
import React, { useState, useCallback, useEffect } from "react";
import { mockDB } from "../../assets/data/mockDatabase";
import "../../styles/pages/Profile.css";

// Reusable Components
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
  const user = mockDB.profile.user;
  
  const [editable, setEditable] = useState(false);
  const [formData, setFormData] = useState(user || {});
  const [originalData] = useState(user || {});
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState({ show: false, message: "", type: "" });

  // Show notification helper
  const showNotification = useCallback((message, type = "success") => {
    setNotification({ show: true, message, type });
    setTimeout(() => setNotification({ show: false, message: "", type: "" }), 3000);
  }, []);

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