// Login.js
import React, { useState, useEffect } from "react";
import "../../styles/auths/Login.css";
import { FaUser, FaEye, FaEyeSlash } from "react-icons/fa";
import loginImage from "../../assets/images/Login-image.png";
import ResetPassword from "./ResetPassword";

const Login = () => {
  // ===== State Management =====
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  // ===== Helper Validation Functions =====
  const validateEmail = (email) => email.includes("@");

  const validatePassword = (password) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  // ===== Auto-Clear Errors When User Types =====
  useEffect(() => {
    if (email !== "" && errors.email) {
      setErrors((prev) => ({ ...prev, email: undefined }));
    }
    if (password !== "" && errors.password) {
      setErrors((prev) => ({ ...prev, password: undefined }));
    }
    if (password === "") {
      setErrors((prev) => ({ ...prev, password: undefined }));
    }
  }, [email, password]);

  // ===== Form Submit Handler =====
  const handleLogin = (e) => {
    e.preventDefault();
    const newErrors = {};
    setSuccessMessage("");

    if (!validateEmail(email)) {
      newErrors.email = "Please enter a valid email containing '@'.";
    }

    if (!validatePassword(password)) {
      newErrors.password =
        "Password must have 8+ characters, uppercase, lowercase, number, and special character.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setSuccessMessage("✅ Login successful! Redirecting...");
      setTimeout(() => console.log("Redirecting to dashboard..."), 1500);
    }
  };

  const handleContinueToLogin = () => setShowResetModal(false);

  return (
    <div className="login-page">
      {/* ===== Left Section (Form) ===== */}
      <div className="login-left">
        <div className="login-box">
          <h2 className="login-heading">LOG INTO YOUR ACCOUNT</h2>
          <hr className="login-divider" />

          <form className="login-form" onSubmit={handleLogin}>
            {/* ===== Email Input ===== */}
            <div className="input-wrapper">
              <input
                type="email"
                placeholder="Email Address"
                className={`input-field ${errors.email ? "input-error" : ""}`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && (
                <small className="error-text">{errors.email}</small>
              )}
            </div>

            {/* ===== Password Input ===== */}
            <div className="input-wrapper password-wrapper">
              <div className="password-container">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className={`input-field ${errors.password ? "input-error" : ""}`}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                  role="button"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </span>
              </div>

              {/* Aligned error message under password field */}
              {errors.password && (
                <small className="error-text password-error">
                  {errors.password}
                </small>
              )}
            </div>

            {/* ===== Forgot Password ===== */}
            <button
              type="button"
              className="forgot-password"
              onClick={() => setShowResetModal(true)}
            >
              Forgot Password?
            </button>

            {/* ===== Login Button ===== */}
            <button type="submit" className="login-button">
              LOGIN <FaUser className="login-icon" />
            </button>

            {/* ===== Success Message ===== */}
            {successMessage && (
              <p className="success-text">{successMessage}</p>
            )}
          </form>
        </div>
      </div>

      {/* ===== Right Section (Promo) ===== */}
      <div className="login-right">
        <div className="promo-section">
          <h1 className="promo-heading">
            FIND WHAT YOU LOVE
            <br />
            <span>LOVE WHAT YOU FIND.</span>
          </h1>
          <p className="promo-subtext">
            Discover affordable finds that make you smile
          </p>
          <div className="promo-image">
            <img src={loginImage} alt="Fashion models" />
          </div>
        </div>
      </div>

      {/* ===== Reset Password Modal ===== */}
      <ResetPassword
        isOpen={showResetModal}
        onClose={() => setShowResetModal(false)}
        onContinueToLogin={handleContinueToLogin}
      />
    </div>
  );
};

export default Login;
