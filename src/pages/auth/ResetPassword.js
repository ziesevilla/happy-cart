import React, { useEffect, useRef, useState } from "react";
import { FaEye, FaEyeSlash, FaArrowLeft, FaCheck } from "react-icons/fa";
import "../../styles/auths/ResetPassword.css";

export default function ResetPassword({ isOpen, onClose, onContinueToLogin }) {
  const [step, setStep] = useState(1); // 1: request email, 2: create password, 3: success
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [pwdError, setPwdError] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const modalRef = useRef(null);

  // Password strength states
  const [showPasswordRules, setShowPasswordRules] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({ strength: 'none', score: 0 });

  // Password validation rules
  const passwordRules = [
    { id: 1, text: "At least 8 characters", validator: (pwd) => pwd.length >= 8 },
    { id: 2, text: "At least one uppercase letter", validator: (pwd) => /[A-Z]/.test(pwd) },
    { id: 3, text: "At least one lowercase letter", validator: (pwd) => /[a-z]/.test(pwd) },
    { id: 4, text: "At least one number", validator: (pwd) => /[0-9]/.test(pwd) },
    { id: 5, text: "At least one special character", validator: (pwd) => /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pwd) },
  ];

  // Calculate password strength
  const calculatePasswordStrength = (pwd) => {
    if (pwd.length === 0) return { strength: 'none', score: 0 };
    
    let score = 0;
    passwordRules.forEach(rule => {
      if (rule.validator(pwd)) score += 1;
    });

    if (pwd.length >= 12) score += 1;
    if (pwd.length >= 16) score += 1;

    if (score <= 2) return { strength: 'weak', score };
    else if (score <= 4) return { strength: 'moderate', score };
    else return { strength: 'strong', score };
  };

  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setEmail("");
      setEmailError("");
      setPassword("");
      setConfirm("");
      setPwdError("");
      setShowPwd(false);
      setShowConfirm(false);
      setIsSubmitting(false);
      setShowPasswordRules(false);
      setPasswordStrength({ strength: 'none', score: 0 });
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => (document.body.style.overflow = "");
  }, [isOpen]);

  // Close on ESC
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape" && isOpen) onClose?.();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  // Close password rules when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setShowPasswordRules(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const validateEmail = (value) => {
    const trimmed = value.trim();
    if (!trimmed) return "Please enter your email address.";
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!re.test(trimmed)) return "Please enter a valid email address.";
    return "";
  };

  const handleSend = async (e) => {
    e?.preventDefault();
    const err = validateEmail(email);
    setEmailError(err);
    
    if (!err) {
      setIsSubmitting(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setStep(2);
      setIsSubmitting(false);
    }
  };

  const handleResetPassword = async (e) => {
    e?.preventDefault();
    
    if (passwordStrength.strength === 'weak') {
      setPwdError("Please use a stronger password.");
      return;
    }
    if (password !== confirm) {
      setPwdError("Passwords do not match.");
      return;
    }
    
    setPwdError("");
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setStep(3);
    setIsSubmitting(false);
  };

  const handlePasswordChange = (value) => {
    setPassword(value);
    setPasswordStrength(calculatePasswordStrength(value));
    if (value.length > 0) {
      setShowPasswordRules(true);
    } else {
      setShowPasswordRules(false);
    }
    if (pwdError) setPwdError("");
  };

  const onOverlayClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose?.();
    }
  };

  const PasswordStrengthIndicator = () => (
    <div className="password-strength-indicator">
      <div className="strength-bars">
        <div className={`strength-bar ${passwordStrength.strength === 'weak' ? 'active weak' : ''}`}></div>
        <div className={`strength-bar ${passwordStrength.strength === 'moderate' ? 'active moderate' : ''}`}></div>
        <div className={`strength-bar ${passwordStrength.strength === 'strong' ? 'active strong' : ''}`}></div>
      </div>
      <div className={`strength-text ${passwordStrength.strength}`}>
        {passwordStrength.strength === 'weak' && 'Weak password'}
        {passwordStrength.strength === 'moderate' && 'Moderate password'}
        {passwordStrength.strength === 'strong' && 'Strong password'}
        {passwordStrength.strength === 'none' && 'Enter a password'}
      </div>
    </div>
  );

  if (!isOpen) return null;

  return (
    <div className="reset-overlay" onMouseDown={onOverlayClick} aria-modal="true" role="dialog">
      <div className="reset-card" ref={modalRef} onMouseDown={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="reset-header">
          <div className="reset-title">
            {step === 1 && "RESET YOUR PASSWORD"}
            {step === 2 && "CREATE NEW PASSWORD"}
            {step === 3 && "PASSWORD UPDATED"}
          </div>
        </div>

        <hr className="reset-divider" />

        <div className="reset-body">
          {step === 1 && (
            <form onSubmit={handleSend} className="reset-form">
              <h3 className="reset-question">Forgot your password?</h3>
              <p className="reset-subtext">Enter your email to receive reset instructions</p>

              <div className="input-wrapper">
                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (emailError) setEmailError("");
                  }}
                  className={`input-field ${emailError ? "input-error" : ""}`}
                  disabled={isSubmitting}
                />
                {emailError && <small className="error-text">{emailError}</small>}
              </div>

              <button 
                type="submit" 
                className="reset-btn primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? "SENDING..." : "SEND RESET LINK"}
              </button>

              <div className="reset-footer">
                <hr className="reset-footer-divider" />
                <p className="reset-footer-text">Remember your password?</p>
                <button
                  type="button"
                  className="reset-footer-btn"
                  onClick={() => {
                    onClose?.();
                    onContinueToLogin?.();
                  }}
                  disabled={isSubmitting}
                >
                  BACK TO LOGIN
                </button>
              </div>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleResetPassword} className="reset-form">
              <div className="input-wrapper password-wrapper">
                <div className="password-container">
                  <input
                    type={showPwd ? "text" : "password"}
                    placeholder="New Password"
                    value={password}
                    onChange={(e) => handlePasswordChange(e.target.value)}
                    className={`input-field ${pwdError ? "input-error" : ""} ${
                      passwordStrength.strength === 'weak' && password.length > 0 ? "input-warning" : ""
                    } ${
                      passwordStrength.strength === 'moderate' ? "input-moderate" : ""
                    } ${
                      passwordStrength.strength === 'strong' ? "input-valid" : ""
                    }`}
                    disabled={isSubmitting}
                  />
                  <span
                    className="toggle-password"
                    onClick={() => setShowPwd(!showPwd)}
                    role="button"
                  >
                    {showPwd ? <FaEye /> : <FaEyeSlash />}
                  </span>
                </div>

                {/* Password Strength Indicator */}
                {password.length > 0 && <PasswordStrengthIndicator />}

                {/* Password Rules Dropdown */}
                {showPasswordRules && (
                  <div className="password-rules-dropdown">
                    <div className="password-rules-header">
                      <h4>Password must contain:</h4>
                      <div className={`password-strength ${passwordStrength.strength}`}>
                        {passwordStrength.strength === 'weak' && 'Weak'}
                        {passwordStrength.strength === 'moderate' && 'Moderate'}
                        {passwordStrength.strength === 'strong' && 'Strong'}
                      </div>
                    </div>
                    <ul className="password-rules-list">
                      {passwordRules.map((rule) => {
                        const satisfied = rule.validator(password);
                        return (
                          <li key={rule.id} className={`password-rule ${satisfied ? 'satisfied' : 'unsatisfied'}`}>
                            <span className="rule-icon">
                              {satisfied ? <FaCheck /> : <FaCheck />}
                            </span>
                            <span className="rule-text">{rule.text}</span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}
              </div>

              <div className="input-wrapper password-wrapper">
                <div className="password-container">
                  <input
                    type={showConfirm ? "text" : "password"}
                    placeholder="Confirm New Password"
                    value={confirm}
                    onChange={(e) => {
                      setConfirm(e.target.value);
                      if (pwdError) setPwdError("");
                    }}
                    className={`input-field ${pwdError ? "input-error" : ""} ${
                      confirm.length > 0 && confirm === password ? "input-valid" : ""
                    }`}
                    disabled={isSubmitting}
                  />
                  <span
                    className="toggle-password"
                    onClick={() => setShowConfirm(!showConfirm)}
                    role="button"
                  >
                    {showConfirm ? <FaEye /> : <FaEyeSlash />}
                  </span>
                </div>
              </div>

              {pwdError && <small className="error-text">{pwdError}</small>}

              <button 
                type="submit" 
                className="reset-btn primary"
                disabled={isSubmitting || (passwordStrength.strength === 'weak' && password.length > 0)}
              >
                {isSubmitting ? "RESETTING..." : "RESET PASSWORD"}
              </button>
            </form>
          )}

          {step === 3 && (
            <div className="reset-success">
              <div className="success-icon">
                <FaCheck />
              </div>
              <h3 className="success-title">Password Successfully Reset!</h3>
              <p className="success-subtext">You can now login with your new password</p>

              <button
                className="reset-btn primary"
                onClick={() => {
                  onClose?.();
                  onContinueToLogin?.();
                }}
              >
                CONTINUE TO LOGIN
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}