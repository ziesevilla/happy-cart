// ResetPassword.js
import React, { useEffect, useRef, useState } from "react";
import "../../styles/auths/ResetPassword.css";

/**
 * Props:
 * - isOpen: boolean (controls modal visibility)
 * - onClose: function() (close modal)
 * - onContinueToLogin: function() (callback when user chooses to go to Login page)
 *
 * Usage: <ResetPassword isOpen={showReset} onClose={() => setShowReset(false)} onContinueToLogin={...} />
 */

export default function ResetPassword({ isOpen, onClose, onContinueToLogin }) {
  const [step, setStep] = useState(1); // 1: request email, 2: create password, 3: success
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [pwdError, setPwdError] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      // reset internal state whenever modal opens
      setStep(1);
      setEmail("");
      setEmailError("");
      setPassword("");
      setConfirm("");
      setPwdError("");
      setShowPwd(false);
      setShowConfirm(false);
      document.body.style.overflow = "hidden"; // lock scroll
    } else {
      document.body.style.overflow = "";
    }
    return () => (document.body.style.overflow = "");
  }, [isOpen]);

  // close on ESC
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose?.();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  const validateEmail = (value) => {
    const trimmed = value.trim();
    if (!trimmed) return "Email is required.";
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!re.test(trimmed)) return "Enter a valid email address.";
    return "";
  };

  const handleSend = (e) => {
    e?.preventDefault();
    const err = validateEmail(email);
    setEmailError(err);
    if (!err) {
      // Real app: call API to send reset link or generate token
      // For this modal flow: go to Create New Password
      setStep(2);
    }
  };

  const handleResetPassword = (e) => {
    e?.preventDefault();
    if (password.length < 8) {
      setPwdError("Password must be at least 8 characters.");
      return;
    }
    if (password !== confirm) {
      setPwdError("Passwords do not match.");
      return;
    }
    setPwdError("");
    // Real app: submit new password + token
    setStep(3);
  };

  const onOverlayClick = (e) => {
    // close if clicked outside the modal card (overlay)
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose?.();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="rp-overlay" onMouseDown={onOverlayClick} aria-modal="true" role="dialog">
      <div className="rp-card" ref={modalRef} onMouseDown={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="rp-header">
          <button
            className="rp-back"
            onClick={() => {
              if (step === 1) {
                onClose?.();
              } else {
                setPwdError("");
                setEmailError("");
                setStep((s) => Math.max(1, s - 1));
              }
            }}
            aria-label="Back"
          >
            <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
              <path
                d="M15 6L9 12l6 6"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>Back</span>
          </button>

          <div className="rp-title">
            {step === 1 && "Reset your Password"}
            {step === 2 && "Create New Password"}
            {step === 3 && "Password Updated"}
          </div>
        </div>

        <div className="rp-divider" />

        <div className="rp-body">
          {step === 1 && (
            <form onSubmit={handleSend} className="rp-form">
              <h3 className="rp-question">Forgot your password?</h3>
              <p className="rp-subtext">Enter your Email to Receive reset Instruction</p>

              <label className="rp-input-wrapper">
                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (emailError) setEmailError("");
                  }}
                  className={`rp-input ${emailError ? "rp-input-error" : ""}`}
                  aria-label="Email Address"
                />
              </label>
              {emailError && <div className="rp-error">{emailError}</div>}

              <button type="submit" className="rp-btn rp-btn-primary">SEND</button>

              <div className="rp-footer-text">
                Remember your Password?{" "}
                <button
                  type="button"
                  className="rp-link"
                  onClick={() => {
                    onClose?.();
                    onContinueToLogin?.();
                  }}
                >
                  Login
                </button>
              </div>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleResetPassword} className="rp-form">
              <div className="rp-field">
                <label className="sr-only">Enter New Password</label>
                <div className="rp-input-icon">
                  <input
                    type={showPwd ? "text" : "password"}
                    placeholder="Enter New Password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (pwdError) setPwdError("");
                    }}
                    className="rp-input rp-input-pill"
                    aria-label="Enter new password"
                  />
                  <button
                    type="button"
                    className="rp-eye"
                    onClick={() => setShowPwd((v) => !v)}
                    aria-label={showPwd ? "Hide password" : "Show password"}
                  >
                    {showPwd ? (
                      <svg viewBox="0 0 24 24" width="18" height="18">
                        <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M12 9a3 3 0 100 6 3 3 0 000-6z" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" width="18" height="18">
                        <path d="M2 2l20 20" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M17.94 17.94C16.14 19.11 14.11 20 12 20 5 20 1 12 1 12c1.6-3.1 4.25-5.5 7.59-6.8" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M9.88 9.88A3 3 0 0114.12 14.12" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </button>
                </div>
                <div className="rp-helper">(Must be 8+ Characters)</div>
              </div>

              <div className="rp-field">
                <label className="sr-only">Confirm New Password</label>
                <div className="rp-input-icon">
                  <input
                    type={showConfirm ? "text" : "password"}
                    placeholder="Confirm New Password"
                    value={confirm}
                    onChange={(e) => {
                      setConfirm(e.target.value);
                      if (pwdError) setPwdError("");
                    }}
                    className="rp-input rp-input-pill"
                    aria-label="Confirm new password"
                  />
                  <button
                    type="button"
                    className="rp-eye"
                    onClick={() => setShowConfirm((v) => !v)}
                    aria-label={showConfirm ? "Hide confirmation" : "Show confirmation"}
                  >
                    {showConfirm ? (
                      <svg viewBox="0 0 24 24" width="18" height="18">
                        <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M12 9a3 3 0 100 6 3 3 0 000-6z" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" width="18" height="18">
                        <path d="M2 2l20 20" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M17.94 17.94C16.14 19.11 14.11 20 12 20 5 20 1 12 1 12c1.6-3.1 4.25-5.5 7.59-6.8" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M9.88 9.88A3 3 0 0114.12 14.12" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {pwdError && <div className="rp-error">{pwdError}</div>}

              <button type="submit" className="rp-btn rp-btn-primary">Reset Password</button>
            </form>
          )}

          {step === 3 && (
            <div className="rp-success">
              <div className="rp-success-icon" aria-hidden>
                <svg viewBox="0 0 24 24" width="36" height="36">
                  <circle cx="12" cy="12" r="10" fill="#06a84b" />
                  <path d="M9 12.5l1.8 1.8L15 10.1" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 className="rp-success-title">Password Successfully Reset</h3>
              <p className="rp-success-sub">You can now login with your new password</p>

              <button
                className="rp-btn rp-btn-primary"
                onClick={() => {
                  onClose?.();
                  onContinueToLogin?.();
                }}
              >
                Continue to Login
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
