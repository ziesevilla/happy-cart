// src/store/store.js
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import productReducer from "./slices/productSlice";
import cartReducer from "./slices/cartSlice";
import orderReducer from "./slices/orderSlice";
import authReducer from "./slices/authSlice";
import categoryReducer from "./slices/categorySlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    products: productReducer,
    cart: cartReducer,
    orders: orderReducer,
    auth: authReducer,
    categories: categoryReducer,
  },
});

export default store;