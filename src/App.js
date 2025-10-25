// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap styling
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// 🧱 Layout Components
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

// 🛍️ Shopper Pages
import Home from "./pages/home/Home";
import ProductDetails from "./pages/product/ProductCatalog";
import Cart from "./pages/cart/Cart";
import Checkout from "./pages/cart/Checkout";
import OrderConfirmation from "./pages/cart/OrderConfirmation"; // ✅ ADDED
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import ResetPassword from "./pages/auth/ResetPassword";
import Profile from "./pages/user/Profile";

// ⚙️ Admin Pages
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageUsers from "./pages/admin/ManageUsers";
import ManageProducts from "./pages/admin/ManageProducts";
import ManageOrders from "./pages/admin/ManageOrders";

// 🔒 Auth and State Management (Context or Redux)
import { Provider } from "react-redux";
import store from "./redux/store"; // Only if using Redux

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="d-flex flex-column min-vh-100">
          {/* 🌐 Global Navbar */}
          <Navbar />

          {/* 🔔 Toast Notifications */}
          <ToastContainer position="top-center" autoClose={3000} />

          {/* 🧭 Route Navigation */}
          <main className="flex-grow-1 mt-4">
            <Routes>
              {/* Shopper Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<ProductDetails />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/order-confirmation" element={<OrderConfirmation />} /> {/* ✅ ADDED */}
              <Route path="/profile" element={<Profile />} />

              {/* Authentication Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/reset-password" element={<ResetPassword />} />

              {/* Admin Routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/users" element={<ManageUsers />} />
              <Route path="/admin/products" element={<ManageProducts />} />
              <Route path="/admin/orders" element={<ManageOrders />} />

              {/* Fallback Route (404 Page - optional) */}
              {/* <Route path="*" element={<NotFound />} /> */}
            </Routes>
          </main>

          {/* 🌊 Global Footer */}
          <Footer />
        </div>
      </Router>
    </Provider>
  );
}

export default App;