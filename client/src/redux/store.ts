import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import authApi from "./queries/auth";

const store = configureStore({
  reducer: {
    //? Slice reducers
    currentUser: userReducer,

    //? Query reducers
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(authApi.middleware);
  },
});

export default store;
