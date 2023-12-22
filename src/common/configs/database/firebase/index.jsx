import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { getMessaging, onMessage, getToken } from 'firebase/messaging';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGE_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENTID,
};

firebase.initializeApp(firebaseConfig);

const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

const auth = firebase.auth();

const facebookAuthProvider = new firebase.auth.FacebookAuthProvider();
facebookAuthProvider.addScope('user_birthday');
facebookAuthProvider.addScope('email');
facebookAuthProvider.setCustomParameters({
  display: 'popup',
});

const githubAuthProvider = new firebase.auth.GithubAuthProvider();
const messaging = getMessaging();

const requestForToken = async () => {
  try {
    const currentToken = await getToken(messaging, {
      vapidKey: process.env.KEY_MESSAGE,
    });
    if (currentToken) {
      console.log('current token for client: ', currentToken);
    } else {
      // Show permission request UI
      console.log('No registration token available. Request permission to generate one.');
    }
  } catch (err) {
    console.log('An error occurred while retrieving token. ', err);
  }
};

const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      console.log('payload', payload);
      resolve(payload);
    });
  });
const appPhone = firebase.initializeApp(firebaseConfig);
const authPhone = getAuth(appPhone);

export {
  auth,
  googleAuthProvider,
  facebookAuthProvider,
  githubAuthProvider,
  requestForToken,
  onMessageListener,
  authPhone,
};
