import { createContext, useEffect, useState } from "react";
import { getItem } from "expo-secure-store";

export const AuthContext = createContext(null);

export default function AuthContextProvider({ children }) {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [profileID, setProfileID] = useState(null);

  useEffect(() => {
    async function checkLogin() {
      const token = await getItem("token");
      const _id = await getItem("_id");

      if (token) {
        setProfileID(_id);
        setIsSignedIn(true);
      }
    }

    checkLogin();
  }, []);
  return (
    <AuthContext value={{ isSignedIn, setIsSignedIn, profileID, setProfileID }}>
      {children}
    </AuthContext>
  );
}
