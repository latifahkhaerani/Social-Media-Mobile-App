import { createContext, useEffect, useState } from "react";
import { getItem } from "expo-secure-store";

export const AuthContext = createContext(null);

export default function AuthContextProvider({ children }) {
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    const token = getItem("token");
    if (token) setIsSignedIn(true);
  }, []);
  return (
    <AuthContext value={{ isSignedIn, setIsSignedIn }}>{children}</AuthContext>
  );
}
