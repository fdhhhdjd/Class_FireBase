//* LIB
import { createAsyncThunk } from '@reduxjs/toolkit';

//* IMPORT
import { auth, facebookAuthProvider, googleAuthProvider } from '@/common/configs/database/firebase';
import { handleAuthError } from '@/common/utils/Error';
import { showErrorToast, showSuccessToast } from '@/common/utils/Toast';

// Todo 1: Handle create account into firebase
export const registerInitial = createAsyncThunk(
  'auth/register',
  async ({ email, password, displayName }, { rejectWithValue }) => {
    try {
      // Create new account
      const userCredential = await auth.createUserWithEmailAndPassword(email, password);
      // If account create success, assign value into variable user
      const user = userCredential.user;

      // Handle asy update full name account just created
      await user.updateProfile({
        displayName,
      });

      showSuccessToast('Register Success');
      // return all data user redux toolkit
      return user;
    } catch (error) {
      // Info error
      showErrorToast(handleAuthError(error));
      // If error return error redux toolkit
      console.error('Error during registration:', error);
      return rejectWithValue(error);
    }
  },
);

// Todo 2: Handle login account into firebase
export const loginInitial = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      // Login with email,password
      const { user } = await auth.signInWithEmailAndPassword(email, password);

      showSuccessToast('Login Success');
      // return all data user redux toolkit
      return user;
    } catch (error) {
      // Info error
      showErrorToast(handleAuthError(error));
      // If error return error redux toolkit
      console.error('Error during registration:', error);
      return rejectWithValue(error);
    }
  },
);

// Todo 3: Handle login google account into firebase
export const loginGoogleInitial = createAsyncThunk(
  'auth/login/google',
  async (_, { rejectWithValue }) => {
    try {
      // Login with email,password
      const { user } = await auth.signInWithPopup(googleAuthProvider);

      showSuccessToast('Login google Success');
      // return all data user redux toolkit
      return user;
    } catch (error) {
      // Info error
      showErrorToast(handleAuthError(error));
      // If error return error redux toolkit
      console.error('Error during registration:', error);
      return rejectWithValue(error);
    }
  },
);

// Todo 4: Handle login facebook account into firebase
export const loginFacebookInitial = createAsyncThunk(
  'auth/login/facebook',
  async (_, { rejectWithValue }) => {
    try {
      // Login with email,password
      const { user } = await auth.signInWithPopup(facebookAuthProvider);

      showSuccessToast('Login Facebook Success');
      // return all data user redux toolkit
      return user;
    } catch (error) {
      // Info error
      showErrorToast(handleAuthError(error));
      // If error return error redux toolkit
      console.error('Error during registration:', error);
      return rejectWithValue(error);
    }
  },
);

// Todo 5: Handle reset password account into firebase
export const sendPasswordResetEmailInitial = createAsyncThunk(
  'auth/reset/password',
  async ({ email = 'nguyentientai10@gmail.com' } = {}, { rejectWithValue }) => {
    try {
      // Login with email,password
      auth.sendPasswordResetEmail(email);

      showSuccessToast(`Link reset had send into gmail ${email}`);
      // return all data user redux toolkit
    } catch (error) {
      // Info error
      showErrorToast(handleAuthError(error));
      // If error return error redux toolkit
      console.error('Error during registration:', error);
      return rejectWithValue(error);
    }
  },
);
