// import React, { useState } from "react";
// import { FaEye, FaEyeSlash, FaUser } from "react-icons/fa";
// import "../../styles/admins/AdminLogin.css";

// const AdminLogin = () => {
//   const [showPassword, setShowPassword] = useState(false);

//   return (
//     <div className="admin-login-container">
//       <div className="admin-login-card">
//         {/* Header */}
//         <div className="admin-header">
//           <h3>Administrator Login</h3>
//         </div>

//         {/* Subheading */}
//         <p className="admin-subheading">ACCESS YOUR STORE DASHBOARD</p>

//         {/* Username Field */}
//         <input
//           type="text"
//           placeholder="Username / Email"
//           className="admin-input"
//         />

//         {/* Password Field */}
//         <div className="admin-password-field">
//           <input
//             type={showPassword ? "text" : "password"}
//             placeholder="Password"
//             className="admin-input"
//           />
//           <button
//             type="button"
//             onClick={() => setShowPassword(!showPassword)}
//             className="admin-eye-btn"
//           >
//             {showPassword ? <FaEyeSlash /> : <FaEye />}
//           </button>
//         </div>

//         {/* Forgot Password */}
//         <p className="forgot-password">Forgot Password?</p>

//         {/* Login Button */}
//         <button className="login-btn">
//           LOGIN <FaUser className="login-icon" />
//         </button>

//         {/* Footer Warning */}
//         <p className="admin-footer">
//           🚨 Restricted Access 🚨 <br />
//           Authorized Personnel only
//         </p>
//       </div>
//     </div>
//   );
// };

// export default AdminLogin;
