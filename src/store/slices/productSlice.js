// src/store/slices/productSlice.js
import { createSlice } from "@reduxjs/toolkit";
import mockDB from "../../assets/data/mockDatabase";

const initialState = {
  products: mockDB.products,
};

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      state.products.push({ id: state.products.length + 1, ...action.payload });
    },
    updateProduct: (state, action) => {
      const { id, data } = action.payload;
      const product = state.products.find((p) => p.id === id);
      if (product) Object.assign(product, data);
    },
    deleteProduct: (state, action) => {
      state.products = state.products.filter((p) => p.id !== action.payload);
    },
  },
});

export const { addProduct, updateProduct, deleteProduct } = productSlice.actions;
export default productSlice.reducer;
