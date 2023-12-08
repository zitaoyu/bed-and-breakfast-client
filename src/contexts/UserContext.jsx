import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext({});

export const UserContextProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // try to fetch profile with cookie
    if (!userInfo) {
      axios
        .get("/profile")
        .then(({ data }) => {
          setUserInfo(data);
          setReady(true);
        })
        .catch((error) => {
          console.error("Error fetching profile:", error);
        });
    }
  }, []);

  return (
    <UserContext.Provider value={{ userInfo, setUserInfo, ready }}>
      {children}
    </UserContext.Provider>
  );
};
