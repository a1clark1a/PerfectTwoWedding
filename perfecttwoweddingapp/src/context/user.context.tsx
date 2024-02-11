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
  updateUserInviteAcceptance: (
    currentUser: User | null,
    confirmedName: string,
    accepted: boolean
  ) => {},
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

  const updateUserInviteAcceptance = (
    currentUser: User | null,
    confirmedName: string,
    accepted: boolean
  ) => {
    if (!currentUser) return null;
    const currentUserToUpdate = currentUser;

    const updatedVerifiedCode = currentUserToUpdate.verifiedCode.map(
      (invite) => {
        if (invite.name === confirmedName) {
          invite.accepted = accepted;
        }
        return invite;
      }
    );
    currentUserToUpdate.verifiedCode = updatedVerifiedCode;
    setCurrentUser(currentUserToUpdate);
  };
  const value = { currentUser, setCurrentUser, updateUserInviteAcceptance };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
