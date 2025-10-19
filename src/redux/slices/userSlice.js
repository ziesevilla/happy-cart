// src/redux/slices/userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  token: null,
  status: "idle",
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      const { user, token } = action.payload;
      state.currentUser = user;
      state.token = token;
    },
    logout: (state) => {
      state.currentUser = null;
      state.token = null;
    },
    updateProfile: (state, action) => {
      state.currentUser = { ...state.currentUser, ...action.payload };
    },
  },
});

export const { loginSuccess, logout, updateProfile } = userSlice.actions;

export default userSlice.reducer;
