// src/store/slices/orderSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: [],
};

export const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    placeOrder: (state, action) => {
      const { userId, items, total } = action.payload;
      const newOrder = {
        id: state.orders.length + 1,
        userId,
        items,
        total,
        status: "Processing",
        date: new Date().toLocaleString(),
      };
      state.orders.push(newOrder);
    },
  },
});

export const { placeOrder } = orderSlice.actions;
export default orderSlice.reducer;
