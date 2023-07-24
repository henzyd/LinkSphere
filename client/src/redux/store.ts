import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";

const store = configureStore({
  reducer: {
    currentUser: userReducer,
  },
});

export default store;
