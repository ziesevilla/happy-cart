import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FaUser, FaEye, FaEyeSlash, FaArrowLeft, FaCheck, FaTimes } from "react-icons/fa";
import "../../styles/auths/Signup.css";
import SignupImage from "../../assets/images/Signup-image.png";

const Signup = () => {
  // ===== State Management =====
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showPasswordRules, setShowPasswordRules] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const passwordRef = useRef(null);
  const rulesRef = useRef(null);

  // ===== Password Validation Rules =====
  const passwordRules = [
    {
      id: 1,
      text: "At least 8 characters",
      validator: (pwd) => pwd.length >= 8,
    },
    {
      id: 2,
      text: "At least one uppercase letter",
      validator: (pwd) => /[A-Z]/.test(pwd),
    },
    {
      id: 3,
      text: "At least one lowercase letter",
      validator: (pwd) => /[a-z]/.test(pwd),
    },
    {
      id: 4,
      text: "At least one number",
      validator: (pwd) => /[0-9]/.test(pwd),
    },
    {
      id: 5,
      text: "At least one special character",
      validator: (pwd) => /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pwd),
    },
  ];

  // ===== Password Strength Calculator =====
  const calculatePasswordStrength = () => {
    if (password.length === 0) return { strength: 'none', score: 0 };
    
    let score = 0;
    const rules = passwordRules;
    
    // Calculate score based on satisfied rules
    rules.forEach(rule => {
      if (rule.validator(password)) {
        score += 1;
      }
    });

    // Additional points for length
    if (password.length >= 12) score += 1;
    if (password.length >= 16) score += 1;

    // Determine strength level
    if (score <= 2) {
      return { strength: 'weak', score };
    } else if (score <= 4) {
      return { strength: 'moderate', score };
    } else {
      return { strength: 'strong', score };
    }
  };

  const passwordStrength = calculatePasswordStrength();
  const passwordValidation = passwordRules.map(rule => ({
    ...rule,
    satisfied: rule.validator(password)
  }));

  // ===== Auto-clear errors when typing =====
  useEffect(() => {
    if (fullName && errors.fullName) setErrors(prev => ({ ...prev, fullName: undefined }));
    if (email && errors.email) setErrors(prev => ({ ...prev, email: undefined }));
    if (password && errors.password) setErrors(prev => ({ ...prev, password: undefined }));
    if (confirmPassword && errors.confirmPassword) setErrors(prev => ({ ...prev, confirmPassword: undefined }));
  }, [fullName, email, password, confirmPassword]);

  // ===== Close password rules when clicking outside =====
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        rulesRef.current && 
        !rulesRef.current.contains(event.target) &&
        passwordRef.current &&
        !passwordRef.current.contains(event.target)
      ) {
        setShowPasswordRules(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // ===== Validation Functions =====
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return "Please enter a valid email address.";
    }
    return "";
  };

  const validatePassword = (password) => {
    if (passwordStrength.strength === 'weak') {
      return "Please use a stronger password.";
    }
    return "";
  };

  const validateConfirmPassword = (confirmPassword) => {
    if (confirmPassword !== password) {
      return "Passwords do not match.";
    }
    return "";
  };

  // ===== Password Input Handlers =====
  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    
    // Show rules when user starts typing, hide when empty
    if (newPassword.length > 0) {
      setShowPasswordRules(true);
    } else {
      setShowPasswordRules(false);
    }
  };

  const handlePasswordFocus = () => {
    if (password.length > 0) {
      setShowPasswordRules(true);
    }
  };

  // ===== Form Submission =====
  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccessMessage("");
    
    const newErrors = {};

    // Validate fields
    if (!fullName.trim()) newErrors.fullName = "Please enter your full name.";
    if (!email) newErrors.email = "Please enter your email address.";
    else {
      const emailError = validateEmail(email);
      if (emailError) newErrors.email = emailError;
    }
    if (!password) newErrors.password = "Please enter a password.";
    else {
      const passwordError = validatePassword(password);
      if (passwordError) newErrors.password = passwordError;
    }
    if (!confirmPassword) newErrors.confirmPassword = "Please confirm your password.";
    else {
      const confirmError = validateConfirmPassword(confirmPassword);
      if (confirmError) newErrors.confirmPassword = confirmError;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // ✅ Registration successful
    setSuccessMessage("✅ Account created successfully! Redirecting to login...");
    
    // Simulate API call and redirect
    setTimeout(() => {
      window.location.href = "/auth/login";
    }, 2000);
  };

  // ===== Redirect to Login =====
  const handleBackToLogin = () => {
    window.location.href = "/auth/login";
  };

  // ===== Password Strength Indicator Component =====
  const PasswordStrengthIndicator = () => (
    <div className="password-strength-indicator">
      <div className="strength-bars">
        <div className={`strength-bar ${passwordStrength.strength === 'weak' ? 'active' : ''} ${passwordStrength.strength === 'weak' ? 'weak' : ''}`}></div>
        <div className={`strength-bar ${passwordStrength.strength === 'moderate' ? 'active' : ''} ${passwordStrength.strength === 'moderate' ? 'moderate' : ''}`}></div>
        <div className={`strength-bar ${passwordStrength.strength === 'strong' ? 'active' : ''} ${passwordStrength.strength === 'strong' ? 'strong' : ''}`}></div>
      </div>
      <div className={`strength-text ${passwordStrength.strength}`}>
        {passwordStrength.strength === 'weak' && 'Weak password'}
        {passwordStrength.strength === 'moderate' && 'Moderate password'}
        {passwordStrength.strength === 'strong' && 'Strong password'}
        {passwordStrength.strength === 'none' && 'Enter a password'}
      </div>
    </div>
  );

  return (
    <div className="signup-page">
      {/* ===== Left Section (Promo) ===== */}
      <div className="signup-left">
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
            <img src={SignupImage} alt="Fashion models" />
          </div>
        </div>
      </div>

      {/* ===== Right Section (Form) ===== */}
      <div className="signup-right">
        <div className="signup-box">
          <h2 className="signup-heading">CREATE YOUR ACCOUNT</h2>
          <hr className="signup-divider" />

          <form className="signup-form" onSubmit={handleSubmit}>
            {/* ===== Full Name Input ===== */}
            <div className="input-wrapper">
              <input
                type="text"
                placeholder="Full Name"
                className={`input-field ${errors.fullName ? "input-error" : ""}`}
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
              {errors.fullName && <small className="error-text">{errors.fullName}</small>}
            </div>

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

            {/* ===== Password Input with Rules Dropdown ===== */}
            <div className="input-wrapper password-wrapper">
              <div className="password-container" ref={passwordRef}>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className={`input-field ${errors.password ? "input-error" : ""} ${
                    passwordStrength.strength === 'weak' && password.length > 0 ? "input-warning" : ""
                  } ${
                    passwordStrength.strength === 'moderate' ? "input-moderate" : ""
                  } ${
                    passwordStrength.strength === 'strong' ? "input-valid" : ""
                  }`}
                  value={password}
                  onChange={handlePasswordChange}
                  onFocus={handlePasswordFocus}
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

              {/* Password Rules Dropdown */}
              {showPasswordRules && (
                <div className="password-rules-dropdown" ref={rulesRef}>
                  <div className="password-rules-header">
                    <h4>Password must contain:</h4>
                    <div className={`password-strength ${passwordStrength.strength}`}>
                      {passwordStrength.strength === 'weak' && 'Weak'}
                      {passwordStrength.strength === 'moderate' && 'Moderate'}
                      {passwordStrength.strength === 'strong' && 'Strong'}
                    </div>
                  </div>
                  <ul className="password-rules-list">
                    {passwordValidation.map((rule) => (
                      <li key={rule.id} className={`password-rule ${rule.satisfied ? 'satisfied' : 'unsatisfied'}`}>
                        <span className="rule-icon">
                          {rule.satisfied ? <FaCheck /> : <FaTimes />}
                        </span>
                        <span className="rule-text">{rule.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {errors.password && (
                <small className="error-text password-error">{errors.password}</small>
              )}
            </div>

            {/* ===== Confirm Password Input ===== */}
            <div className="input-wrapper password-wrapper">
              <div className="password-container">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  className={`input-field ${errors.confirmPassword ? "input-error" : ""} ${
                    confirmPassword.length > 0 && confirmPassword === password ? "input-valid" : ""
                  }`}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <span
                  className="toggle-password"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  role="button"
                  aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                >
                  {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
                </span>
              </div>
              {errors.confirmPassword && (
                <small className="error-text password-error">{errors.confirmPassword}</small>
              )}
            </div>

            {/* ===== Signup Button ===== */}
            <button 
              type="submit" 
              className="signup-button"
              disabled={passwordStrength.strength === 'weak' && password.length > 0}
            >
              SIGN UP <FaUser className="signup-icon" />
            </button>

            {/* ===== Success Message ===== */}
            {successMessage && <p className="success-text">{successMessage}</p>}
          </form>

          {/* ===== Back to Login Section ===== */}
          <div className="login-section">
            <p className="login-text">Already have an account?</p>
            <button 
              className="login-button"
              onClick={handleBackToLogin}
            >
              <FaArrowLeft className="arrow-icon" /> BACK TO LOGIN
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;