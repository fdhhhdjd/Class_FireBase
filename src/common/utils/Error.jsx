export const handleAuthError = (error) => {
  switch (error.code) {
    case 'auth/email-already-in-use':
      return 10;

    case 'auth/invalid-email':
      return 20;

    case 'auth/weak-password':
      return 30;

    case 'auth/account-exists-with-different-credential':
      return 40;

    case 'auth/popup-closed-by-user':
      return 50;
    default:
      return 0;
  }
};
