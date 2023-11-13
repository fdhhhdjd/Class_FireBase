import { auth } from "@/common/configs/database/firebase";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const registerInitial = createAsyncThunk("auth/register", () => {
  return auth
    .createUserWithEmailAndPassword(email, password)
    .then(({ user }) => {
      user.updateProfile({
        displayName,
      });
      return user;
    })
    .catch((error) => error.message);
});
// signInWithEmailAndPassword()
// signOut()
