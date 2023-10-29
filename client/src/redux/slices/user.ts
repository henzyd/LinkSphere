import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
  id: string;
  username: string;
  email: string;
}

const initialState = {
  id: "",
  username: "",
  email: "",
};

const userSlice = createSlice({
  name: "currentUser",
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<InitialState>) => {
      state.id = action.payload.id;
      state.username = action.payload.username;
      state.email = action.payload.email;
    },
  },
});

export default userSlice.reducer;
