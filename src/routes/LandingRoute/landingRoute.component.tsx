import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
  signInWithGoogleRedirect,
  signInAuthUserWithEmailAndPassword,
  verifyInviteCode,
} from "../../firebase/utils";

import FormInput from "../../components/FormInput/index.component";

import { VerifiedCode } from "../../types";

const defaultFormFields = {
  email: "",
  password: "",
  displayName: "",
};

const LandingRoute = (): React.JSX.Element => {
  // const [inviteCode, setInviteCode] = useState("");
  // const [verifiedCode, setVerifiedCode] = useState<VerifiedCode[] | null>(null);
  // const [isSigningUp, setIsSigningUp] = useState(true);
  // const [formFields, setFormFields] = useState(defaultFormFields);
  // const { email, password, displayName } = formFields;
  // const navigate = useNavigate();

  // const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const newCode = e.target.value;
  //   setInviteCode(newCode);
  //   sessionStorage.setItem("inviteCode", newCode);
  // };

  // const handleInviteCode = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   verifyInviteCode(inviteCode).then((res) => {
  //     setVerifiedCode(res);
  //   });
  // };

  // const googleSignin = async () => {
  //   await signInWithGoogleRedirect(inviteCode);
  // };

  // const showDisplayName = () => {
  //   let name = "";
  //   if (verifiedCode) {
  //     name = verifiedCode.map((code) => code.name).join(" & ");
  //   }
  //   return name;
  // };

  // const resetFormFields = () => {
  //   setFormFields(defaultFormFields);
  // };

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;

  //   setFormFields({
  //     ...formFields,
  //     [name]: value,
  //   });
  // };

  // const handleSignInToggle = () => {
  //   setIsSigningUp(!isSigningUp);
  // };

  // const handleSignUpSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   try {
  //     const userCred = await createAuthUserWithEmailAndPassword(
  //       email,
  //       password
  //     );

  //     if (!userCred) throw new Error("User not created");
  //     await createUserDocumentFromAuth(
  //       {
  //         ...userCred.user,
  //         displayName,
  //       },
  //       inviteCode
  //     );
  //     navigate("/home");
  //   } catch (error) {
  //     console.log(error);
  //   }

  //   resetFormFields();
  // };

  // const handleSignInSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   try {
  //     await signInAuthUserWithEmailAndPassword(email, password);
  //   } catch (error: any) {
  //     switch (error.code) {
  //       case "auth/invalid-login-credentials":
  //         alert("Incorrect password");
  //         break;
  //       case "auth/user-not-found":
  //         alert("No User associated with this email");
  //         break;
  //       default:
  //         alert(`Error logging in: ${error.message}`);
  //         break;
  //     }
  //   }
  // };

  // return (
  //   <section>
  //     {!verifiedCode?.length ? (
  //       <form onSubmit={handleInviteCode}>
  //         <h3>Welcome!</h3>
  //         <h2>To Sara and Clark's Wedding</h2>
  //         <input type="text" value={inviteCode} onChange={handleInput} />
  //         <button type="submit">Enter</button>
  //       </form>
  //     ) : (
  //       <>
  //         <h2>Hi {showDisplayName()}</h2>
  //         <form
  //           onSubmit={isSigningUp ? handleSignUpSubmit : handleSignInSubmit}
  //         >
  //           {isSigningUp && (
  //             <FormInput
  //               label="Name"
  //               inputOptions={{
  //                 type: "text",
  //                 onChange: handleChange,
  //                 name: "displayName",
  //                 value: displayName,
  //                 required: true,
  //               }}
  //             />
  //           )}
  //           <FormInput
  //             label="Email"
  //             inputOptions={{
  //               type: "email",
  //               onChange: handleChange,
  //               name: "email",
  //               value: email,
  //               required: true,
  //             }}
  //           />

  //           <FormInput
  //             label="Password"
  //             inputOptions={{
  //               type: "password",
  //               onChange: handleChange,
  //               name: "password",
  //               value: password,
  //               required: true,
  //             }}
  //           />
  //           <button onClick={handleSignInToggle}>
  //             Already have an account? Sign in
  //           </button>
  //           <button type="submit">{isSigningUp ? "Sign Up" : "Sign In"}</button>
  //         </form>
  //         <button onClick={googleSignin}>Sign in</button>
  //       </>
  //     )}
  //   </section>
  // );

  return <div></div>;
};

export default LandingRoute;
