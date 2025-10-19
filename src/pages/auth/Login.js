// Login.js
import React, { useState } from "react";
import "../../styles/auths/Login.css";
import { FaUser, FaEye, FaEyeSlash } from "react-icons/fa";
import loginImage from "../../assets/images/Login-image.png";
import ResetPassword from "./ResetPassword"; // Ensure ResetPassword.js is in same folder

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);

  // This handler is used when ResetPassword asks to "continue to login"
  const handleContinueToLogin = () => {
    setShowResetModal(false);
    // If you want to focus a particular input in Login form, do that here.
    // If you're using react-router you can navigate('/login') here instead.
  };

  return (
    <div className="login-container">
      {/* Left Section */}
      <div className="login-form-section">
        <h2 className="login-title">LOG INTO YOUR ACCOUNT</h2>
        <hr className="divider" />

        <form className="login-form" onSubmit={(e) => e.preventDefault()}>
          <div className="input-group">
            <input type="email" placeholder="Email Address" />
          </div>

          <div className="input-group password-group">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
            />
            <span
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
              role="button"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {/* Forgot password now opens the reset modal popup */}
          <button
            type="button"
            className="forgot-password"
            onClick={() => setShowResetModal(true)}
          >
            Forgot Password?
          </button>

          <button className="login-btn" type="submit">
            LOGIN <FaUser className="login-icon" />
          </button>
        </form>
      </div>

      {/* Right Section */}
      <div className="right-section">
        <div className="promo-content">
          <h1>
            FIND WHAT YOU LOVE <br />
            <span>LOVE WHAT YOU FIND.</span>
          </h1>
          <p>Discover affordable finds that make you smile</p>

          <div className="models">
            <img src={loginImage} alt="Fashion models" />
          </div>
        </div>
      </div>

      {/* Reset Password Modal Popup */}
      <ResetPassword
        isOpen={showResetModal}
        onClose={() => setShowResetModal(false)}
        onContinueToLogin={handleContinueToLogin}
      />
    </div>
  );
};

export default Login;
