import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  createUserDocumentFromAuth,
  getUser,
  onAuthStateChangedListener,
} from "../firebase/utils";

export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: (user) => null,
});

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [inviteCode, setInviteCode] = useState("");

  const value = { currentUser, setCurrentUser };
  const navigate = useNavigate();

  useEffect(() => {
    const storedCode = sessionStorage.getItem("inviteCode");
    if (storedCode) {
      setInviteCode(storedCode);
    }

    const unsubscribe = onAuthStateChangedListener(async (user) => {
      if (user) {
        // create user after redirect
        const docRef = await createUserDocumentFromAuth(user, inviteCode);

        if (docRef) {
          // get user information
          const newUser = await getUser(docRef.id);
          if (newUser) {
            setCurrentUser(newUser);
            navigate("/home");
          }
        }
        // cleanup
        sessionStorage.removeItem("inviteCode");
      }
    });

    return unsubscribe;
  }, [inviteCode, navigate]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
