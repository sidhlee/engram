import React, { useContext, useState, useEffect } from 'react';
import firebase, { auth, googleProvider } from '../config/firebase';
import guestImg from '../images/guest.png';
import { getInitialArticlesFirebaseObject } from '../utils/getInitialArticles';

/**
 * @typedef {object} User
 * @property {string} userName
 * @property {string} email
 * @property {boolean} emailVerified
 * @property {string} photoURL
 * @property {string} id
 */

const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  /**
   * @type {[User, function]}
   */
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const signIn = (asDemo) => {
    // You will be able to login without page refresh
    // -> all control flow within React stays intact.
    if (asDemo) {
      const demoUser = {
        name: 'Guest',
        email: '',
        emailVerified: false,
        photoURL: guestImg,
        refreshToken: '',
        id: 'demo',
      };

      setUser(demoUser);
    } else {
      // Sign in using Google OAuth
      return auth.signInWithPopup(googleProvider).then((result) => {
        console.log(result);

        const initialArticles = getInitialArticlesFirebaseObject();

        const userId = result.user.uid;
        // Pre-populate with instruction articles for new users
        if (result.additionalUserInfo.isNewUser) {
          try {
            const articlesRef = firebase.database().ref(userId);
            articlesRef.set(initialArticles);
          } catch (err) {
            setError('Could not set initial articles');
          }
        }
      });
    }

    // If you used auth.signInWithRedirect method here,
    // user gets redirected to Google's auth page,
    // meaning that we're not ejected out of react app,
    // so any code after here will NOT RUN.
    // Then user will be redirected to the path they left off.
    // Now we're back in our react app but this wipes out all local state
    // making it really difficult to manage auth flow.
    // (all the loading state will be reset! -> all the setup we did before signing in is gone!)

    // return auth.signInWithRedirect(googleProvider);
  };

  const logOut = () => {
    if (user && user.name === 'Guest') {
      setUser(undefined);
    } else {
      return auth.signOut();
    }
  };

  useEffect(() => {
    try {
      const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
        if (firebaseUser) {
          // User logged in! handpick data we need.
          const {
            displayName,
            email,
            emailVerified,
            photoURL,
            refreshToken,
            uid,
          } = firebaseUser;
          const user = {
            name: displayName,
            email,
            emailVerified,
            photoURL,
            refreshToken,
            id: uid,
          };
          setUser(user);
        } else {
          // user logged out, reset our user state!
          setUser(undefined);
        }
        setLoading(false);
      });

      return unsubscribe;
    } catch (err) {
      setError(err);
    }
  }, []);

  const value = {
    user,
    loading,
    error,
    signIn,
    logOut,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

/**
 * @returns {{user: any, loading: boolean, error: string | null, signIn: () => void}}
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};
