import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../../context/user.context";

const PrivateRoute: React.FC<{ children: any }> = ({ children }) => {
  const { currentUser } = useContext(UserContext);

  return currentUser ? children : <Navigate to="/" />;
};

export default PrivateRoute;
