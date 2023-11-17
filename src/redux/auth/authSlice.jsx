//* LIB
import { createSlice } from '@reduxjs/toolkit';

//* IMPORT
import {
  loginFacebookInitial,
  loginGithubInitial,
  loginGoogleInitial,
  loginInitial,
  logoutInitial,
  registerInitial,
  sendPasswordResetEmailInitial,
} from './authThunk';

const initialState = {
  authData: null,
  resetPassword: false,
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
    // Todo: 1. Register
    [registerInitial.pending]: (state, _) => {
      return { ...state, isLoading: true };
    },
    [registerInitial.fulfilled]: (state, action) => {
      return { ...state, isLoading: false, authData: action.payload };
    },
    [registerInitial.rejected]: (state, action) => {
      return { ...state, isLoading: false, error: action.payload };
    },

    // Todo: 2. Login
    [loginInitial.pending]: (state, _) => {
      return { ...state, isLoading: true };
    },
    [loginInitial.fulfilled]: (state, action) => {
      return { ...state, isLoading: false, authData: action.payload };
    },
    [loginInitial.rejected]: (state, action) => {
      return { ...state, isLoading: false, error: action.payload };
    },

    // Todo: 3. Login Google
    [loginGoogleInitial.pending]: (state, _) => {
      return { ...state, isLoading: true };
    },
    [loginGoogleInitial.fulfilled]: (state, action) => {
      return { ...state, isLoading: false, authData: action.payload };
    },
    [loginGoogleInitial.rejected]: (state, action) => {
      return { ...state, isLoading: false, error: action.payload };
    },

    // Todo: 4. Login Facebook
    [loginFacebookInitial.pending]: (state, _) => {
      return { ...state, isLoading: true };
    },
    [loginFacebookInitial.fulfilled]: (state, action) => {
      return { ...state, isLoading: false, authData: action.payload };
    },
    [loginFacebookInitial.rejected]: (state, action) => {
      return { ...state, isLoading: false, error: action.payload };
    },

    // Todo: 5. Reset Password
    [sendPasswordResetEmailInitial.pending]: (state, _) => {
      return { ...state, isLoading: true };
    },
    [sendPasswordResetEmailInitial.fulfilled]: (state, _) => {
      return { ...state, isLoading: false, resetPassword: true };
    },
    [sendPasswordResetEmailInitial.rejected]: (state, action) => {
      return { ...state, isLoading: false, error: action.payload };
    },

    // Todo: 6. Reset Password
    [logoutInitial.pending]: (state, _) => {
      return { ...state, isLoading: true };
    },
    [logoutInitial.fulfilled]: (state, _) => {
      return { ...state, isLoading: false };
    },
    [logoutInitial.rejected]: (state, action) => {
      return { ...state, isLoading: false, error: action.payload };
    },

    // Todo: 7. Login Github
    [loginGithubInitial.pending]: (state, _) => {
      return { ...state, isLoading: true };
    },
    [loginGithubInitial.fulfilled]: (state, action) => {
      return { ...state, isLoading: false, authData: action.payload };
    },
    [loginGithubInitial.rejected]: (state, action) => {
      return { ...state, isLoading: false, error: action.payload };
    },
  },
});
const AuthReducer = AuthSlice.reducer;

export const { resetDataAuth } = AuthSlice.actions;

export default AuthReducer;
