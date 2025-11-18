// src/store/slices/userSlice.js
import { createSlice } from "@reduxjs/toolkit";
import mockDB from "../../assets/data/mockDatabase";

const initialState = {
  currentUser: mockDB.currentUser,
  users: mockDB.users,
  admins: mockDB.admins,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      const { email, password } = action.payload;
      const user = state.users.find(
        (u) => u.email === email && u.password === password
      );
      if (user) state.currentUser = user;
    },
    logout: (state) => {
      state.currentUser = null;
    },
    signup: (state, action) => {
      const { name, email, password } = action.payload;
      const exists = state.users.some((u) => u.email === email);
      if (!exists) {
        const newUser = { id: state.users.length + 1, name, email, password, address: "", orders: [] };
        state.users.push(newUser);
        state.currentUser = newUser;
      }
    },
    updateProfile: (state, action) => {
      const { id, updatedData } = action.payload;
      const user = state.users.find((u) => u.id === id);
      if (user) Object.assign(user, updatedData);
    },
  },
});

export const { login, logout, signup, updateProfile } = userSlice.actions;
export default userSlice.reducer;
