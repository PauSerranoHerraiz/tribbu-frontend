import React, { useState, useEffect } from "react";
import { auth, provider } from "../services/firebase"; // Importa Firebase
import { signInWithPopup } from "firebase/auth";

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
      // Aquí puedes verificar el token si es necesario
      setIsLoggedIn(true);
      setIsLoading(false);
      // Aquí puedes obtener el usuario desde Firebase si es necesario
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
      const user = result.user;
      setUser(user);
      setIsLoggedIn(true);
      // Aquí puedes almacenar el token si es necesario
    } catch (error) {
      console.error("Error during Google login:", error);
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
        loginWithGoogle, // Agrega la función de login con Google
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthProviderWrapper, AuthContext };