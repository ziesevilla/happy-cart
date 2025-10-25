import React, { useState, useEffect, useContext } from "react";
import "../../styles/auths/Login.css";
import { FaUser, FaEye, FaEyeSlash } from "react-icons/fa";
import loginImage from "../../assets/images/Login-image.png";
import ResetPassword from "./ResetPassword";
import { useNavigate } from "react-router-dom";
import mockDB from "../../assets/data/mockDatabase"; // ✅ Mock database
import { AuthContext } from "../../context/AuthContext"; // ✅ Import context

const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext); // ✅ Access the login() function from context

  // ===== State Management =====
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  // ===== Auto-clear errors when typing =====
  useEffect(() => {
    if (email && errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
    if (password && errors.password) setErrors((prev) => ({ ...prev, password: undefined }));
  }, [email, password]);

  // ===== Validate Login Against mockDatabase =====
  const handleLogin = (e) => {
    e.preventDefault();
    const newErrors = {};
    setSuccessMessage("");

    if (!email) newErrors.email = "Please enter your email.";
    if (!password) newErrors.password = "Please enter your password.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // ✅ Find user in mock database
    const user = mockDB.customers.find((acc) => acc.email === email);

    if (!user) {
      setErrors({ email: "Account not found. Please sign up first." });
      return;
    }

    if (user.password !== password) {
      setErrors({ password: "Incorrect password. Please try again." });
      return;
    }

    // ✅ Save user globally using AuthContext
    login(user);

    // ✅ Success feedback
    setSuccessMessage("✅ Login successful! Redirecting...");
    setTimeout(() => {
      navigate("/"); // Redirect to home page
    }, 1500);
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
              {errors.email && <small className="error-text">{errors.email}</small>}
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

              {errors.password && (
                <small className="error-text password-error">{errors.password}</small>
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
            {successMessage && <p className="success-text">{successMessage}</p>}
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
