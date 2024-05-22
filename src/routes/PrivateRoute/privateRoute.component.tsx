import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { VerifiedCodeContext } from "../../context/verifiedCode.context";

const PrivateRoute: React.FC<{ children: any }> = ({ children }) => {
  const { currentVerifiedCode } = useContext(VerifiedCodeContext);

  return currentVerifiedCode ? children : <Navigate to="/" />;
};

export default PrivateRoute;
