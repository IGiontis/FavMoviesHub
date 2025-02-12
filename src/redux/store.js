import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import friendsReducer from "./friendSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    friends:friendsReducer
  },
});

export default store;
