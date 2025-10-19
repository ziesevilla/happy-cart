import React, { useState } from "react";
import { FaEye, FaEyeSlash, FaUser } from "react-icons/fa";
import "../../styles/auths/Signup.css";
import LoginImage from "../../assets/images/Signup-image.png";
import { Link } from "react-router-dom";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="signup-container">
      {/* Left Section */}
      <div className="signup-left">
        <div className="signup-text">
          <h1>
            FIND WHAT YOU LOVE <br />
            <span>LOVE WHAT YOU FIND.</span>
          </h1>
          <p>Discover affordable finds that make you smile</p>
        </div>
        <div className="signup-image">
          <img src={LoginImage} alt="Fashion Models" />
        </div>
      </div>

      {/* Right Section */}
      <div className="signup-right">
        <div className="signup-form-box">
          <h2>CREATE YOUR ACCOUNT</h2>
          <hr />
          <form>
            <input type="text" placeholder="Enter full name" />
            <input type="email" placeholder="Email Address" />
            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="eye-icon"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            <small className="password-note">(Must be 8+ Characters)</small>

            <div className="password-wrapper">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
              />
              <span
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="eye-icon"
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            <div className="account-text">
              Already have an Account?{" "}
              <Link to="/login" className="login-link">
                Login
              </Link>
            </div>

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
