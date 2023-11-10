//* LIB
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  authData: null,
  isLoading: false,
  error: null,
};

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetDataAuth: (state) => {
      return state;
    },
  },
  extraReducers: {},
});
const AuthReducer = AuthSlice.reducer;
// eslint-disable-next-line react-refresh/only-export-components
export const { resetDataAuth } = AuthSlice.actions;

export default AuthReducer;
