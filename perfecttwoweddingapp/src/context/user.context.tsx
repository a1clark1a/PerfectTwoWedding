import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  createUserDocumentFromAuth,
  getUser,
  onAuthStateChangedListener,
} from "../firebase/utils";

import { User } from "../types";

export const UserContext = createContext({
  currentUser: null as User | null,
  setCurrentUser: (user: User | null) => {},
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [inviteCode, setInviteCode] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const storedCode = sessionStorage.getItem("inviteCode");
    if (storedCode) {
      setInviteCode(storedCode);
    }

    // listen for auth state changes
    const unsubscribe = onAuthStateChangedListener(async (user) => {
      if (user) {
        // create user after redirect
        const docRef = await createUserDocumentFromAuth(user, inviteCode);

        if (docRef) {
          // get user information
          const newUser = await getUser(docRef.id);
          console.log("newUser", newUser);
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

  const value = { currentUser, setCurrentUser };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
