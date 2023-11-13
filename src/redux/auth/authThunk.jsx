//* LIB
import { createAsyncThunk } from "@reduxjs/toolkit";

//* IMPORT
import { auth } from "@/common/configs/database/firebase";

// Todo: Handle create account into firebase
export const registerInitial = createAsyncThunk(
  "auth/register",
  async ({ email, password, displayName }) => {
    try {
      // Create new account
      const userCredential = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      // If account create success, assign value into variable user
      const user = userCredential.user;

      // Handle asy update full name account just created
      await user.updateProfile({
        displayName,
      });

      // return all data user redux toolkit
      return user;
    } catch (error) {
      // If error return error redux toolkit
      console.error("Error during registration:", error);
      return error;
    }
  }
);
