import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { submitRSVPToFirebase, verifyInviteCode } from "../firebase/utils";

import { VerifiedCode, Error } from "../types";

export const VerifiedCodeContext = createContext({
  currentVerifiedCode: null as VerifiedCode | null,
  setCurrentVerifiedCode: (verifiedCode: VerifiedCode | null) => {},
  inviteCode: "",
  setInviteCode: (code: string) => {},
  error: { title: "", message: "" } as Error,
  setError: (errorObj: Error) => {},
  getCode: () => Promise.resolve(),
  submitRSVP: (
    updatedVerifiedCode: VerifiedCode,
    confirmed: string[],
    denied: string[]
  ) => Promise.resolve(),
});

export const VerifiedCodeProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [currentVerifiedCode, setCurrentVerifiedCode] =
    useState<VerifiedCode | null>(null);
  const [inviteCode, setInviteCode] = useState("");
  const [error, setError] = useState({ title: "", message: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const storedCode = sessionStorage.getItem("inviteCode");
    if (storedCode) {
      setInviteCode(storedCode);
    }

    async function verifyCode() {
      try {
        await verifyInviteCode(inviteCode);
        navigate("/home");
      } catch (e: any) {
        setError({ title: "Code Expired", message: e.message });
        // cleanup
        setCurrentVerifiedCode(null);
        sessionStorage.removeItem("inviteCode");
      }
    }

    storedCode && verifyCode();
  }, [inviteCode, navigate]);

  const getCode = () => {
    return new Promise<void>((resolve, reject) => {
      verifyInviteCode(inviteCode)
        .then((resp) => {
          sessionStorage.setItem("inviteCode", inviteCode);
          setCurrentVerifiedCode(resp);
          resolve();
        })
        .catch((error) => {
          setError({
            title: "Something went wrong with your invite code!",
            message: error.message,
          });
          reject(`Invite code Error: ${error.message}`);
        });
    });
  };

  const submitRSVP = (
    updatedVerifiedCode: VerifiedCode,
    confirmed: string[],
    denied: string[]
  ) => {
    return new Promise<void>((resolve, reject) => {
      submitRSVPToFirebase(updatedVerifiedCode, confirmed, denied)
        .then((resp) => {
          setCurrentVerifiedCode(resp);
          resolve();
        })
        .catch((error) => {
          setError({
            title: "Something went wrong with your RSVP!",
            message: error.message,
          });
          reject(error.message);
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
    submitRSVP,
  };
  return (
    <VerifiedCodeContext.Provider value={value}>
      {children}
    </VerifiedCodeContext.Provider>
  );
};
