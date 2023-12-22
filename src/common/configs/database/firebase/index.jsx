import { initializeApp } from 'firebase/app';
import {
  FacebookAuthProvider,
  GithubAuthProvider,
  GoogleAuthProvider,
  getAuth,
} from 'firebase/auth';
import { getMessaging } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGE_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENTID,
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const messaging = getMessaging(app);
const googleAuthProvider = new GoogleAuthProvider();
const githubAuthProvider = new GithubAuthProvider();
const facebookAuthProvider = new FacebookAuthProvider();

facebookAuthProvider.addScope('user_birthday');
facebookAuthProvider.addScope('email');
facebookAuthProvider.setCustomParameters({
  display: 'popup',
});

export { auth, facebookAuthProvider, githubAuthProvider, googleAuthProvider, messaging };
