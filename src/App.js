import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Redux
import { initializeAuth } from "./store/slices/authSlice";

// Components
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

// 🛍️ Shopper Pages
import Home from "./pages/home/Home";
import ProductCatalog from "./pages/product/ProductCatalog";
import Cart from "./pages/cart/Cart";
import Checkout from "./pages/cart/Checkout";
import OrderConfirmation from "./pages/cart/OrderConfirmation";
import Profile from "./pages/user/Profile";
import Orders from "./pages/user/Orders";
import SavedAddresses from "./pages/user/SavedAddresses";

// 🔐 Auth Pages
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import ResetPassword from "./pages/auth/ResetPassword";

// ⚙️ Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageUsers from "./pages/admin/ManageUsers";
import ManageProducts from "./pages/admin/ManageProducts";
import ManageOrders from "./pages/admin/ManageOrders";

// Common Components
import ProtectedRoute from "./components/common/ProtectedRoute";

function LayoutWrapper() {
  const location = useLocation();
  const dispatch = useDispatch();

  // Initialize auth from localStorage when app loads
  useEffect(() => {
    dispatch(initializeAuth());
  }, [dispatch]);

  const hideLayoutPaths = [
    "/auth/login",
    "/auth/signup",
    "/auth/reset-password",
  ];

  const shouldHideLayout = hideLayoutPaths.includes(location.pathname);

  return (
    <div className="d-flex flex-column min-vh-100">
      {!shouldHideLayout && <Navbar />}
      <ToastContainer position="top-center" autoClose={3000} />

      <main className="flex-grow-1 mt-4">
        <Routes>
          {/* Shopper Routes */}
          <Route path="/" element={<Home />} /> 
          <Route path="/products" element={<ProductCatalog />} />
          
          {/* Protected Routes */}
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/cart" 
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/checkout" 
            element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/order-confirmation" 
            element={
              <ProtectedRoute>
                <OrderConfirmation />
              </ProtectedRoute>
            } 
          />
          <Route 
  path="/profile" 
  element={
    <ProtectedRoute>
      <Profile />
    </ProtectedRoute>
  } 
/>
<Route 
  path="/orders" 
  element={
    <ProtectedRoute>
      <Orders />
    </ProtectedRoute>
  } 
/>
<Route 
  path="/addresses" 
  element={
    <ProtectedRoute>
      <SavedAddresses />
    </ProtectedRoute>
  } 
/>

          {/* Auth Routes */}
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/signup" element={<Signup />} />
          <Route path="/auth/reset-password" element={<ResetPassword />} />

          {/* Admin Routes - Protected with admin role */}
          <Route 
            path="/admin/dashboard" 
            element={
              <ProtectedRoute requireAdmin={true}>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/users" 
            element={
              <ProtectedRoute requireAdmin={true}>
                <ManageUsers />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/products" 
            element={
              <ProtectedRoute requireAdmin={true}>
                <ManageProducts />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/orders" 
            element={
              <ProtectedRoute requireAdmin={true}>
                <ManageOrders />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </main>

      {!shouldHideLayout && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <LayoutWrapper />
    </Router>
  );
}

export default App;