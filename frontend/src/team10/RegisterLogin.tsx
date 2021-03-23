import React, { useState } from "react";
import firebase from "./firebase";
import { useToast } from "@chakra-ui/react";

const RegisterLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const toast = useToast();
  
  const register = () => {

    if (password === passwordConfirm) {
      firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        resetInput();
      })
      .catch((err) => {
        console.error(err);
      });
    } else {
      toast({
        title: 'password does not match',
        status: 'error',
      });
    }
  };

  const login = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        resetInput();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // const reset

  const logOut = () => {
    firebase.auth().signOut();
  };

  const resetInput = () => {
    setEmail("");
    setPassword("");
    setPasswordConfirm("");
  };

  return (
    <>
      <h2>Login</h2>
      <div>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
        />
        <input
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
          placeholder="confirm password"
        />
        <button onClick={register}>sign up</button>
        <button onClick={login}>log in</button>
        <button onClick={logOut}>log out</button>
      </div>
    </>
  );
};

export default RegisterLogin;

