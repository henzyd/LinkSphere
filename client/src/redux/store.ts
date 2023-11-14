import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/user";
import authApi from "./api/auth";
import userApi from "./api/user";

const store = configureStore({
  reducer: {
    //? Slice reducers
    currentUser: userReducer,

    //? Api reducers
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(authApi.middleware).concat(userApi.middleware);
  },
});

export default store;
