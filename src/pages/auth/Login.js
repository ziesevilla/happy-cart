import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../../styles/auths/Login.css";
import { FaUser, FaEye, FaEyeSlash, FaArrowRight } from "react-icons/fa";
import loginImage from "../../assets/images/Login-image.png";
import ResetPassword from "./ResetPassword";
import mockDB from "../../assets/data/mockDatabase"; 
import { loginStart, loginSuccess, loginFailure } from "../../store/slices/authSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { isAuthenticated, user, loading, error } = useSelector((state) => state.auth);

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

  // ===== Redirect if already authenticated =====
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  // ===== Validate Login Against mockDatabase =====
  const handleLogin = (e) => {
    e.preventDefault();
    const newErrors = {};
    setSuccessMessage("");
    dispatch(loginFailure(null)); // Clear any previous Redux errors

    if (!email) newErrors.email = "Please enter your email.";
    if (!password) newErrors.password = "Please enter your password.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    dispatch(loginStart());

    // ✅ Find user in mock database
    const user = mockDB.users.find((acc) => acc.email === email);

    if (!user) {
      setErrors({ email: "Account not found. Please sign up first." });
      dispatch(loginFailure("Account not found. Please sign up first."));
      return;
    }

    if (user.password !== password) {
      setErrors({ password: "Incorrect password. Please try again." });
      dispatch(loginFailure("Incorrect password. Please try again."));
      return;
    }

    // ✅ Login successful - Save user globally using Redux (remove sensitive data)
    const userData = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role || 'customer'

    };

    const token = `mock-jwt-token-${user.id}-${Date.now()}`;

    dispatch(loginSuccess({ 
      user: userData,
      token: token
    }));

    // ✅ Success feedback
    setSuccessMessage("✅ Login successful! Redirecting...");
    setTimeout(() => {
      navigate("/"); // Redirect to home page
    }, 1500);
  };

  // ===== Redirect to Signup Page =====
  const handleCreateAccount = () => {
    navigate("/auth/signup");
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
            <button 
              type="submit" 
              className="login-button"
              disabled={loading}
            >
              {loading ? "LOGGING IN..." : "LOGIN"} <FaUser className="login-icon" />
            </button>

            {/* ===== Show Redux error if any ===== */}
            {error && <p className="error-text redux-error">{error}</p>}

            {/* ===== Success Message ===== */}
            {successMessage && <p className="success-text">{successMessage}</p>}
          </form>

          {/* ===== Create Account Section ===== */}
          <div className="create-account-section">
            <hr className="account-divider" />
            <p className="create-account-text">Don't have an account?</p>
            <button 
              className="create-account-button"
              onClick={handleCreateAccount}
            >
              CREATE ACCOUNT <FaArrowRight className="arrow-icon" />
            </button>
          </div>
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