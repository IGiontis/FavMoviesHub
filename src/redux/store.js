import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import likedMoviesReducer from "./likedMoviesSlice"

const store = configureStore({
  reducer: {
    auth: authReducer,
    likedMovies: likedMoviesReducer,
  },
});

export default store;
