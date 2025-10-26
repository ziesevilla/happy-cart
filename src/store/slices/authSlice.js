// store/slices/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Get initial state from localStorage for persistence
const getInitialState = () => {
  const storedAuth = localStorage.getItem('auth');
  if (storedAuth) {
    try {
      return JSON.parse(storedAuth);
    } catch (error) {
      console.error('Error parsing stored auth data:', error);
      return getDefaultState();
    }
  }
  return getDefaultState();
};

const getDefaultState = () => ({
  isAuthenticated: false,
  user: null,
  token: null,
  isLoading: false,
  error: null
});

const authSlice = createSlice({
  name: 'auth',
  initialState: getInitialState(),
  reducers: {
    // Initialize auth from localStorage
    initializeAuth: (state) => {
      const storedAuth = localStorage.getItem('auth');
      if (storedAuth) {
        try {
          const parsedAuth = JSON.parse(storedAuth);
          state.isAuthenticated = parsedAuth.isAuthenticated || false;
          state.user = parsedAuth.user || null;
          state.token = parsedAuth.token || null;
        } catch (error) {
          console.error('Error initializing auth from localStorage:', error);
          // Reset to default state if there's an error
          Object.assign(state, getDefaultState());
        }
      }
    },
    
    // Login actions
    loginStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    
    loginSuccess: (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.error = null;
      
      // Save to localStorage
      localStorage.setItem('auth', JSON.stringify({
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token
      }));
    },
    
    loginFailure: (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      state.error = action.payload;
    },
    
    // Logout action
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      state.error = null;
      
      // Clear localStorage
      localStorage.removeItem('auth');
    },
    
    // Update user profile
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
      // Update localStorage
      if (state.isAuthenticated) {
        localStorage.setItem('auth', JSON.stringify({
          isAuthenticated: true,
          user: state.user,
          token: state.token
        }));
      }
    },
    
    // Clear errors
    clearError: (state) => {
      state.error = null;
    }
  }
});

export const {
  initializeAuth, // Add this export
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  updateUser,
  clearError
} = authSlice.actions;

// Selectors
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectUser = (state) => state.auth.user;
export const selectUserRole = (state) => state.auth.user?.role;
export const selectAuthLoading = (state) => state.auth.isLoading;
export const selectAuthError = (state) => state.auth.error;
export const selectToken = (state) => state.auth.token;

export default authSlice.reducer;