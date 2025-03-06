import { createSlice } from "@reduxjs/toolkit";

// Load user from localStorage
const userFromStorage = JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: userFromStorage || null,
  isAuthenticated: !!userFromStorage,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem("user", JSON.stringify(action.payload)); // Store user in localStorage
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem("user"); // Clear localStorage on logout
    },
  },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
