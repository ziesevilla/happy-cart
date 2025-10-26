// src/store/slices/cartSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  carts: {},
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { userId, productId, quantity } = action.payload;
      if (!state.carts[userId]) state.carts[userId] = [];
      const item = state.carts[userId].find((i) => i.productId === productId);
      if (item) item.quantity += quantity;
      else state.carts[userId].push({ productId, quantity });
    },
    removeFromCart: (state, action) => {
      const { userId, productId } = action.payload;
      if (!state.carts[userId]) return;
      state.carts[userId] = state.carts[userId].filter((i) => i.productId !== productId);
    },
    clearCart: (state, action) => {
      state.carts[action.payload] = [];
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
