//* LIB
import { createSlice } from '@reduxjs/toolkit';
import {
  loginFacebookInitial,
  loginGoogleInitial,
  logoutInitial,
  registerInitial,
  sendPasswordResetEmailInitial,
} from './authThunk';

const initialState = {
  authData: null,
  resetPassword: null,
  logout: false,
  isLoading: false,
  error: null,
};

const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetDataAuth: (state) => {
      return state;
    },
  },
  extraReducers: {
    // Todo: 1. Create account
    [registerInitial.pending]: (state, _) => {
      return { ...state, isLoading: true };
    },
    [registerInitial.fulfilled]: (state, action) => {
      return { ...state, isLoading: false, authData: action.payload };
    },
    [registerInitial.rejected]: (state, action) => {
      return { ...state, isLoading: false, error: action.payload };
    },

    // Todo: 2. Login Google
    [loginGoogleInitial.pending]: (state, _) => {
      return { ...state, isLoading: true };
    },
    [loginGoogleInitial.fulfilled]: (state, action) => {
      return { ...state, isLoading: false, authData: action.payload };
    },
    [loginGoogleInitial.rejected]: (state, action) => {
      return { ...state, isLoading: false, error: action.payload };
    },

    // Todo: 3. Login Facebook
    [loginFacebookInitial.pending]: (state, _) => {
      return { ...state, isLoading: true };
    },
    [loginFacebookInitial.fulfilled]: (state, action) => {
      return { ...state, isLoading: false, authData: action.payload };
    },
    [loginFacebookInitial.rejected]: (state, action) => {
      return { ...state, isLoading: false, error: action.payload };
    },

    // Todo: 4. Reset password
    [sendPasswordResetEmailInitial.pending]: (state, _) => {
      return { ...state, isLoading: true };
    },
    [sendPasswordResetEmailInitial.fulfilled]: (state, action) => {
      return { ...state, isLoading: false, resetPassword: action.payload };
    },
    [sendPasswordResetEmailInitial.rejected]: (state, action) => {
      return { ...state, isLoading: false, error: action.payload };
    },

    // Todo: 4. Logout
    [logoutInitial.pending]: (state, _) => {
      return { ...state, isLoading: true };
    },
    [logoutInitial.fulfilled]: (state, _) => {
      return { ...state, isLoading: false, logout: false };
    },
    [logoutInitial.rejected]: (state, action) => {
      return { ...state, isLoading: false, error: action.payload };
    },
  },
});
const AuthReducer = AuthSlice.reducer;

export const { resetDataAuth } = AuthSlice.actions;

export default AuthReducer;
