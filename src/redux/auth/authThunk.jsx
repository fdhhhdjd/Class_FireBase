//* LIB
import { createAsyncThunk } from '@reduxjs/toolkit';

//* IMPORT
import { auth, facebookAuthProvider, googleAuthProvider } from '@/common/configs/database/firebase';
import { handleAuthError } from '@/common/utils/Error';

// Todo: Handle create account into firebase
export const registerInitial = createAsyncThunk(
  'auth/register',
  async ({ email, password, displayName }) => {
    try {
      // Create new account
      const userCredential = await auth.createUserWithEmailAndPassword(email, password);
      // If account create success, assign value into variable user
      const user = userCredential.user;

      // Handle asy update full name account just created
      await user.updateProfile({
        displayName,
      });

      // return all data user redux toolkit
      return user;
    } catch (error) {
      handleAuthError(error.code);
      // If error return error redux toolkit
      console.error('Error during registration:', error);
      return error;
    }
  },
);

// Todo: Handle login google account into firebase
export const loginGoogleInitial = createAsyncThunk(
  'auth/login/google',
  async (_, { rejectWithValue }) => {
    try {
      // Perform Google sign-in
      const { user } = await auth.signInWithPopup(googleAuthProvider);

      // Return the user for the async thunk
      return user;
    } catch (error) {
      handleAuthError(error.code);
      // Check if the error is due to the user closing the popup
      if (error.code === 'auth/popup-closed-by-user') {
        // Return a specific error for this scenario
        return rejectWithValue('Google sign-in popup closed by the user.');
      } else {
        // Throw the error to be captured by the rejected action
        return rejectWithValue(error);
      }
    }
  },
);

// Todo: Handle login Facebook account into firebase
export const loginFacebookInitial = createAsyncThunk(
  'auth/login/facebook',
  async (_, { rejectWithValue }) => {
    try {
      // Perform Facebook sign-in
      const { user } = await auth.signInWithPopup(facebookAuthProvider);

      // Return the user for the async thunk
      return user;
    } catch (error) {
      handleAuthError(error.code);
      if (error.code === 'auth/account-exists-with-different-credential') {
        // Handle Backend login email
        console.log(error.email);
      }
      // Check if the error is due to the user closing the popup
      if (error.code === 'auth/popup-closed-by-user') {
        // Return a specific error for this scenario
        return rejectWithValue('Facebook sign-in popup closed by the user.');
      } else {
        // Throw the error to be captured by the rejected action
        return rejectWithValue(error);
      }
    }
  },
);

// Todo: Handle reset password account into firebase
export const sendPasswordResetEmailInitial = createAsyncThunk(
  'auth/reset/password',
  async ({ email = 'nguyentientai10@gmail.com' } = {}) => {
    try {
      // Create new account
      const resultResetPassword = await auth.sendPasswordResetEmail(email);

      // return all data user redux toolkit
      return resultResetPassword;
    } catch (error) {
      handleAuthError(error.code);
      // If error return error redux toolkit
      console.error('Error during registration:', error);
      return error;
    }
  },
);

// Todo: Handle logout account into firebase
export const logoutInitial = createAsyncThunk('auth/logout', async () => {
  try {
    // Create new account
    const resultLogout = await auth.signOut();

    return resultLogout;
  } catch (error) {
    handleAuthError(error.code);
    // If error return error redux toolkit
    console.error('Error during registration:', error);
    return error;
  }
});
