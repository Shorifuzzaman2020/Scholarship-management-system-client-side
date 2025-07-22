

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
          };

          await axios.post('https://scholarship-server-liard.vercel.app/users', userData, {
            headers: { 'Content-Type': 'application/json' },
          });

          // Step 2: Get JWT token
          const jwtRes = await axios.post('https://scholarship-server-liard.vercel.app/jwt', {
            email: currentUser.email,
          });

          localStorage.setItem('access-token', jwtRes.data.token);

          // Step 3: Fetch the full user from MongoDB
          const userRes = await axios.get(`https://scholarship-server-liard.vercel.app/users/${currentUser.email}`, {
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
    localStorage.removeItem('access-token');
    return signOut(auth);
  };

  // ✅ New function to update role
  const updateUserRole = async (email, newRole) => {
    try {
      const token = localStorage.getItem('access-token');

      await axios.patch(
        `https://scholarship-server-liard.vercel.app/users/${email}/role`,
        { role: newRole },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      // Refresh user data after role update
      const userRes = await axios.get(`https://scholarship-server-liard.vercel.app/users/${email}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(userRes.data); // ✅ Update context
    } catch (err) {
      console.error('Failed to update user role:', err);
    }
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
        updateUserRole, // ✅ exposed to context
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useUser = () => useContext(AuthContext);
