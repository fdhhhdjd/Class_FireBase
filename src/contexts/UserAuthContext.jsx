//* LIB
import React from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { getToken, onMessage } from 'firebase/messaging';

//* IMPORT
import { auth, messaging } from '@/common/configs/database/firebase';

export const userAuthContext = React.createContext();

export const UserAuthContextProvider = ({ children }) => {
  const [user, setUser] = React.useState();

  //Todo: 1. Notification
  const requestForToken = async () => {
    try {
      const currentToken = await getToken(messaging, {
        vapidKey:
          'BAPzNYvha1_0WTTLMqQ0hjowdlvweQB0ZUXFJMPafEuKl9VEWReL936uhh1CTAM7SkkzRRRpISfUdGd69R4aCw4',
      });
      if (currentToken) {
        console.log('current token for client: ', currentToken);
      } else {
        console.log('No registration token available. Request permission to generate one.');
      }
    } catch (err) {
      console.error('An error occurred while retrieving token. ', err);
    }
  };

  const onMessageListener = () => {
    return new Promise((resolve) => {
      onMessage(messaging, (payload) => {
        console.log('payload', payload);
        resolve(payload);
      });
    });
  };

  const logOut = () => {
    return signOut(auth);
  };

  React.useLayoutEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
      console.log('Auth', currentuser);

      setUser(currentuser);
    });

    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <userAuthContext.Provider value={{ logOut, requestForToken, onMessageListener, user, setUser }}>
      {children}
    </userAuthContext.Provider>
  );
};
