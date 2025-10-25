import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

// 🛍️ Shopper Pages
import Home from "./pages/home/Home";
import ProductDetails from "./pages/product/ProductCatalog";
import Cart from "./pages/cart/Cart";
import Checkout from "./pages/cart/Checkout";
import OrderConfirmation from "./pages/cart/OrderConfirmation";
import Profile from "./pages/user/Profile";

// 🔐 Auth Pages
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import ResetPassword from "./pages/auth/ResetPassword";

// ⚙️ Admin Pages
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageUsers from "./pages/admin/ManageUsers";
import ManageProducts from "./pages/admin/ManageProducts";
import ManageOrders from "./pages/admin/ManageOrders";

import { Provider } from "react-redux";
import store from "./redux/store";
import { AuthProvider } from "./context/AuthContext"; // 🆕 Added

function LayoutWrapper() {
  const location = useLocation();

  const hideLayoutPaths = [
    "/auth/login",
    "/auth/signup",
    "/auth/reset-password",
    "/admin/login",
  ];

  const shouldHideLayout = hideLayoutPaths.includes(location.pathname);

  return (
    <div className="d-flex flex-column min-vh-100">
      {!shouldHideLayout && <Navbar />}
      <ToastContainer position="top-center" autoClose={3000} />

      <main className="flex-grow-1 mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-confirmation" element={<OrderConfirmation />} />
          <Route path="/profile" element={<Profile />} />

          {/* Auth Routes */}
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/signup" element={<Signup />} />
          <Route path="/auth/reset-password" element={<ResetPassword />} />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<ManageUsers />} />
          <Route path="/admin/products" element={<ManageProducts />} />
          <Route path="/admin/orders" element={<ManageOrders />} />
        </Routes>
      </main>

      {!shouldHideLayout && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Provider store={store}>
       <AuthProvider>
        <Router>
          <LayoutWrapper />
        </Router>
      </AuthProvider>
    </Provider>
  );
}

export default App;
