import React, { useContext } from "react";
import { AuthContext } from "./AuthState";

const LoginIndicator = () => {
  const { currentUser } = useContext(AuthContext);
  const currentUserEmail = currentUser ? currentUser.email : "";

  return <h2>{`${currentUserEmail} is logged in`}</h2>;
};

export default LoginIndicator;
