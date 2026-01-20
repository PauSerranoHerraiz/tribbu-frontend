import React, { useState, useEffect } from "react";
import { auth, provider } from "../services/firebase";
import { signInWithPopup } from "firebase/auth";
import axios from "axios";

const AuthContext = React.createContext();

function AuthProviderWrapper(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  const storeToken = (token) => {
    localStorage.setItem("authToken", token);
  };

  const authenticateUser = () => {
    const storedToken = localStorage.getItem("authToken");

    if (storedToken) {
      return axios
        .get(`${import.meta.env.VITE_API_URL}/auth/verify`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        .then((response) => {
          setUser(response.data);
          setIsLoggedIn(true);
          setIsLoading(false);
          return response.data;
        })
        .catch((error) => {
          console.error("Error verificando token:", error);
          localStorage.removeItem("authToken");
          setIsLoggedIn(false);
          setUser(null);
          setIsLoading(false);
          throw error;
        });
    } else {
      setIsLoggedIn(false);
      setIsLoading(false);
      setUser(null);
      return Promise.resolve(null);
    }
  };

  const logOutUser = () => {
    auth.signOut().then(() => {
      setIsLoggedIn(false);
      setUser(null);
      localStorage.removeItem("authToken");
    });
  };

  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const firebaseUser = result.user;
      const idToken = await firebaseUser.getIdToken();

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/google`,
        { idToken }
      );

      const { authToken } = response.data;
      storeToken(authToken);
      await authenticateUser();
    } catch (error) {
      console.error("Error during Google login:", error);
      throw error;
    }
  };

  useEffect(() => {
    authenticateUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        isLoading,
        user,
        storeToken,
        authenticateUser,
        logOutUser,
        loginWithGoogle,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthProviderWrapper, AuthContext };