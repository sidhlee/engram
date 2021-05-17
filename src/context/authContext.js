import React, { useContext, useState, useEffect } from 'react';
import { auth, googleProvider } from '../config/firebase';

const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const signIn = () => {
    // You will be able to login without page refresh
    // -> all control flow within React stays intact.
    return auth.signInWithPopup(googleProvider);

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
    console.log('logout');
    return auth.signOut();
  };

  // useEffect(() => {
  //   // https://firebase.google.com/docs/auth/web/google-signin#web-v8_5
  //   auth
  //     .getRedirectResult()
  //     .then((result) => {
  //       // if (result.credential) {
  //       //   /** @type {firebase.auth.OAuthCredential} */
  //       //   const credential = result.credential;
  //       //   // This gives you a Google Access Token. You can use it to access the Google API.
  //       //   const token = credential.accessToken;
  //       // }
  //       // The signed-in user info.
  //       setUser(result.user);
  //       setLoading(false);
  //       history.push('/');
  //     })
  //     .catch((error) => {
  //       setError(error.message);
  //     });
  // }, [history]);

  useEffect(() => {
    try {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        setUser(user);
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
