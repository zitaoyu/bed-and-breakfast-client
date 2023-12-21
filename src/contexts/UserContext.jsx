import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext({});

export const UserContextProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [ready, setReady] = useState(false);
  const [showAboutPage, setShowAboutPage] = useState(false);

  useEffect(() => {
    // try to fetch profile with cookie
    if (!userInfo) {
      axios
        .get("/profile")
        .then(({ data }) => {
          setUserInfo(data);
        })
        .catch((error) => {
          console.error("Unable to fetch profile:", error);
        })
        .finally(() => {
          setReady(true);
        });
    }
  }, []);

  return (
    <UserContext.Provider
      value={{ userInfo, setUserInfo, ready, showAboutPage, setShowAboutPage }}
    >
      {children}
    </UserContext.Provider>
  );
};
