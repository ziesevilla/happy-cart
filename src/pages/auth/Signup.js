import React, { useState } from "react";
import { FaEye, FaEyeSlash, FaUser } from "react-icons/fa";
import "../../styles/auths/Signup.css";
import SignupImage from "../../assets/images/Signup-image.png";
import { Link, useNavigate } from "react-router-dom";
import mockDB from "../../assets/data/mockDatabase"; // ✅ default import instead of named

const Signup = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmError, setConfirmError] = useState("");

  // ===== Email Validation =====
  const validateEmail = (value) => {
    if (!value.includes("@")) {
      setEmailError("Please enter a valid email address.");
    } else {
      setEmailError("");
    }
  };

  // ===== Password Validation =====
  const validatePassword = (value) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;

    if (value === "") {
      setPasswordError("");
      return;
    }

    if (!passwordRegex.test(value)) {
      setPasswordError(
        "Password must contain upper, lower, number & special character."
      );
    } else {
      setPasswordError("");
    }
  };

  // ===== Confirm Password Validation =====
  const validateConfirmPassword = (value) => {
    if (value === "") {
      setConfirmError("");
      return;
    }

    if (value !== password) {
      setConfirmError("Passwords do not match.");
    } else {
      setConfirmError("");
    }
  };

  // ===== Submit Handler =====
  const handleSubmit = (e) => {
    e.preventDefault();

    validateEmail(email);
    validatePassword(password);
    validateConfirmPassword(confirmPassword);

    if (
      !emailError &&
      !passwordError &&
      !confirmError &&
      fullName &&
      email &&
      password &&
      confirmPassword
    ) {
      // ✅ Simulate saving to mockDB
      const existingUser = mockDB.customers.find(
        (user) => user.email.toLowerCase() === email.toLowerCase()
      );

      if (existingUser) {
        alert("Email already registered. Please login instead.");
        return;
      }

      mockDB.customers.push({
        id: mockDB.customers.length + 1,
        fullName,
        email,
        password,
      });

      alert("Signup successful! Redirecting to login...");
      navigate("/login");
    }
  };

  return (
    <div className="signup-page">
      {/* ===== Left Section (Visual Branding) ===== */}
      <div className="signup-left">
        <div className="branding-text">
          <h1>
            FIND WHAT YOU LOVE
            <br />
            <span>LOVE WHAT YOU FIND.</span>
          </h1>
          <p>Discover affordable finds that make you smile</p>
        </div>

        <div className="branding-image">
          <img src={SignupImage} alt="Fashion Models" />
        </div>
      </div>

      {/* ===== Right Section (Form) ===== */}
      <div className="signup-right">
        <div className="form-box">
          <h2>CREATE YOUR ACCOUNT</h2>
          <hr />
          <form onSubmit={handleSubmit}>
            {/* ===== Full Name ===== */}
            <input
              type="text"
              placeholder="Enter full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />

            {/* ===== Email ===== */}
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                validateEmail(e.target.value);
              }}
              required
            />
            {emailError && <p className="error-message">{emailError}</p>}

            {/* ===== Password ===== */}
            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  validatePassword(e.target.value);
                }}
                required
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="eye-icon"
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>
            {passwordError && (
              <p className="error-message password-error">{passwordError}</p>
            )}
            <small className="password-note">(Must be 8+ Characters)</small>

            {/* ===== Confirm Password ===== */}
            <div className="password-wrapper">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  validateConfirmPassword(e.target.value);
                }}
                required
              />
              <span
                onClick={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
                className="eye-icon"
              >
                {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>
            {confirmError && (
              <p className="error-message password-error">{confirmError}</p>
            )}

            {/* ===== Redirect to Login ===== */}
            <div className="account-text">
              Already have an Account?{" "}
              <Link to="/auth/login" className="login-link">
                Login
              </Link>
            </div>


            {/* ===== Submit Button ===== */}
            <button type="submit" className="signup-btn">
              SIGN UP <FaUser className="user-icon" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;