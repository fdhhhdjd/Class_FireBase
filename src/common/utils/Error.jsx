//* IMPORT
import { ERROR } from '../constants';

export const handleAuthError = (error) => {
  let message = '';
  switch (error.code) {
    case ERROR.ACCOUNT.EXIT:
      return (message = 'Email already in used');

    case ERROR.ACCOUNT.INVALID_EMAIL:
      return (message = 'Email invalid ');

    case ERROR.ACCOUNT.WEAK_PASSWORD:
      return (message = 'Weak password');

    case ERROR.ACCOUNT.EXIT_WITH_DIFFERENT_CREDENTIAL:
      return (message = 'Account exists with different credential');

    case ERROR.ACCOUNT.POPUP_CLOSE:
      return (message = 'You had close popup');

    case ERROR.ACCOUNT.WRONG_PASSWORD:
      return (message = 'Password invalid');

    default:
      // eslint-disable-next-line no-unused-vars
      return (message = 'No error');
  }
};
