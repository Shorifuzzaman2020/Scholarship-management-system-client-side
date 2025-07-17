
import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithRedirect,
} from 'firebase/auth';
import axios from 'axios';
import { auth } from '../firebase/firebase.init';

const AuthContext = createContext();
const googleProvider = new GoogleAuthProvider();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true';
  });

  useEffect(() => {
    localStorage.setItem('isLoggedIn', isLoggedIn);
  }, [isLoggedIn]);

  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
  //     setLoading(true);
  //     if (currentUser && isLoggedIn) {
  //       setUser(currentUser);

  //       // Prepare user data for the DB
  //       const userData = {
  //         uid: currentUser.uid,
  //         displayName: currentUser.displayName || 'Anonymous',
  //         email: currentUser.email,
  //         photoURL: currentUser.photoURL || '',
  //         role: "general",
  //       };

  //       try {
  //         // Save user to DB
  //         await axios.post("http://localhost:5000/users", userData, {
  //           headers: { 'Content-Type': 'application/json' }
  //         });

  //         // Get JWT
  //         const jwtRes = await axios.post("http://localhost:5000/jwt", {
  //           email: currentUser.email
  //         });

  //         localStorage.setItem("access-token", jwtRes.data.token);
  //       } catch (err) {
  //         console.error("Error during user sync or JWT fetch:", err);
  //       }
  //     } else {
  //       setUser(null);
  //       localStorage.removeItem("access-token");
  //     }
  //     setLoading(false);
  //   });

  //   return () => unsubscribe();
  // }, [isLoggedIn]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setLoading(true);

      if (currentUser && isLoggedIn) {
        try {
          // Step 1: Save or upsert user to MongoDB
          const userData = {
            uid: currentUser.uid,
            displayName: currentUser.displayName || 'Anonymous',
            email: currentUser.email,
            photoURL: currentUser.photoURL || '',
            role:
              currentUser.email === "shorifuzzamansoil2020@gmail.com"
                ? "admin"
                : currentUser.email === "22203037@iubat.edu"
                  ? "moderator"
                  : "general",

          };

          await axios.post('http://localhost:5000/users', userData, {
            headers: { 'Content-Type': 'application/json' },
          });

          // Step 2: Get JWT token
          const jwtRes = await axios.post('http://localhost:5000/jwt', {
            email: currentUser.email,
          });

          localStorage.setItem('access-token', jwtRes.data.token);

          // Step 3: Fetch the full user from MongoDB
          const userRes = await axios.get(`http://localhost:5000/users/${currentUser.email}`, {
            headers: {
              Authorization: `Bearer ${jwtRes.data.token}`,
            },
          });

          // Step 4: Set MongoDB user in context
          setUser(userRes.data);
        } catch (err) {
          console.error('Error syncing or fetching user:', err);
          setUser(null);
        }
      } else {
        setUser(null);
        localStorage.removeItem('access-token');
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, [isLoggedIn]);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const googleLogin = () => {
    setLoading(true);
    return signInWithRedirect(auth, googleProvider);
  };

  const logOut = () => {
    setLoading(true);
    setIsLoggedIn(false);
    localStorage.removeItem("access-token");
    return signOut(auth);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        isLoggedIn,
        setIsLoggedIn,
        createUser,
        signIn,
        googleLogin,
        logOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useUser = () => useContext(AuthContext);
