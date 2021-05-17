import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};
// Initialize Firebase

const app = firebase.initializeApp(firebaseConfig);
// firebase.analytics();

// To enable auth with Google, you have to set it up in the firebase console
// https://stackoverflow.com/questions/41124178/com-google-firebase-firebaseexception-an-internal-error-has-occurred-configu
export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const auth = app.auth();
export default app;
