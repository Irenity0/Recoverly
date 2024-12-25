import { useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import { auth } from "../firebase/firebase.config";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import axios from "axios";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Create User
  const createUser = async (email, password) => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(userCredential.user);
      return userCredential;
    } catch (error) {
      console.error("Error creating user:", error.message);
      throw error; // Pass the error to the caller
    } finally {
      setLoading(false);
    }
  };

  // Sign In User
  const signInUser = async (email, password) => {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(userCredential.user);
      return userCredential;
    } catch (error) {
      console.error("Error signing in:", error.message);
      throw error; // Pass the error to the caller
    } finally {
      setLoading(false);
    }
  };

  // Google Sign-In Handler
  const googleProvider = new GoogleAuthProvider();
  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      setUser(result.user);
      return result.user;
    } catch (error) {
      console.error("Google Sign-In Error:", error.message);
      throw error; // Pass the error to the caller
    } finally {
      setLoading(false);
    }
  };

  // Log Out
  const logOut = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Error logging out:", error.message);
      throw error; // Pass the error to the caller
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      console.log('state captured', currentUser?.email)
      if (currentUser?.email){
        const user = { email: currentUser?.email }

        axios.post('https://recoverly-server.vercel.app/jwt', user, { withCredentials: true })
        .then(res => {
          console.log(`login`, res.data)
          setLoading(false)
        })
      }

      else {
        axios.post('https://recoverly-server.vercel.app/logout', {}, { withCredentials: true })
        .then(res => {
          console.log(`logout`, res.data)
          setLoading(false)
        })
      }
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const authInfo = {
    user,
    loading,
    createUser,
    signInUser,
    logOut,
    handleGoogleSignIn,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
