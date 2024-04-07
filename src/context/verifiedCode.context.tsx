import { createContext, useState } from "react";

import { verifyInviteCode } from "../firebase/utils";

import { VerifiedCode } from "../types";

export const VerifiedCodeContext = createContext({
  currentVerifiedCode: null as VerifiedCode | null,
  setCurrentVerifiedCode: (verifiedCode: VerifiedCode | null) => {},
  inviteCode: "",
  setInviteCode: (code: string) => {},
  error: "",
  setError: (errorMessage: string) => {},
  getCode: () => {},
});

export const VerifiedCodeProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [currentVerifiedCode, setCurrentVerifiedCode] =
    useState<VerifiedCode | null>(null);
  const [inviteCode, setInviteCode] = useState("");
  const [error, setError] = useState("");

  const getCode = () => {
    return new Promise<void>((resolve, reject) => {
      console.log("called", inviteCode);
      verifyInviteCode(inviteCode)
        .then((resp) => {
          setCurrentVerifiedCode(resp);
          resolve();
        })
        .catch((err: any) => {
          setError(`Invite code Error: ${err}`);
          reject(`Invite code Error: ${err}`);
        });
    });
  };

  const value = {
    currentVerifiedCode,
    setCurrentVerifiedCode,
    inviteCode,
    setInviteCode,
    error,
    setError,
    getCode,
  };
  return (
    <VerifiedCodeContext.Provider value={value}>
      {children}
    </VerifiedCodeContext.Provider>
  );
};
