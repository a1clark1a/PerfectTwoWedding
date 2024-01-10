import { getRedirectResult } from "firebase/auth";
import React, { useEffect, useState } from "react";
import {
  auth,
  createUserDocumentFromAuth,
  signInWithGoogleRedirect,
  verifyInviteCode,
} from "../../firebase/utils";

const LandingRoute = (): React.JSX.Element => {
  const [inviteCode, setInviteCode] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [verifiedUser, setVerifiedUser] = useState<any>(null);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newCode = e.target.value;
    setInviteCode(newCode);
    sessionStorage.setItem("inviteCode", newCode);
  };

  const handleInviteCode = async () => {
    setVerifiedUser(await verifyInviteCode(inviteCode));
    if (verifiedUser) {
      setIsVerified(true);
    }
  };

  const googleSignin = async () => {
    await signInWithGoogleRedirect(inviteCode);
  };

  return (
    <section>
      {!isVerified ? (
        <>
          <h3>Welcome!</h3>
          <h2>To Sara and Clark's Wedding</h2>
          <input type="text" value={inviteCode} onChange={handleInput} />
          <button onClick={handleInviteCode}>Enter</button>
        </>
      ) : (
        <>
          <h2>Hi </h2>
          <button onClick={googleSignin}>Sign in</button>
        </>
      )}
    </section>
  );
};

export default LandingRoute;
