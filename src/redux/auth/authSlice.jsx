//* LIB
import { createSlice } from "@reduxjs/toolkit";
import { registerInitial } from "./authThunk";

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
  extraReducers: {
    [registerInitial.pending]: (state, _) => {
      return { ...state, isLoading: true };
    },
    [registerInitial.fulfilled]: (state, action) => {
      return { ...state, isLoading: false, authData: action.payload };
    },
    [registerInitial.rejected]: (state, action) => {
      return { ...state, isLoading: false, error: action.payload };
    },
  },
});
const AuthReducer = AuthSlice.reducer;

export const { resetDataAuth } = AuthSlice.actions;

export default AuthReducer;
