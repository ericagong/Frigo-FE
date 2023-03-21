import { createContext, useState } from "react";
import { NAMES as SIGN_UP_NAMES, DUPLICATE } from "./SignUp";
import { STEPS } from "./constants";

const SIGN_IN_NAMES = {
  ID: "id",
  PW: "password",
};

const AuthContext = createContext({
  state: {
    step: [STEPS.SIGN_UP],
    signUpInfo: {
      [SIGN_UP_NAMES.EMAIL]: "",
      [SIGN_UP_NAMES.ID]: "",
      [SIGN_UP_NAMES.PW]: "",
      [SIGN_UP_NAMES.CHECK]: "",
    },
    signUpErrors: {
      [SIGN_UP_NAMES.EMAIL]: false,
      [DUPLICATE]: false,
      [SIGN_UP_NAMES.ID]: false,
      [SIGN_UP_NAMES.PW]: false,
      [SIGN_UP_NAMES.CHECK]: false,
    },
    signInInfo: {
      [SIGN_IN_NAMES.ID]: "",
      [SIGN_IN_NAMES.PW]: "",
    },
    signInErrors: {
      [SIGN_IN_NAMES.ID]: false,
      [SIGN_IN_NAMES.PW]: false,
    },
  },
  actions: {
    setStep: () => {},
    setSignUpInfo: () => {},
    setSignUpErrors: () => {},
    setSignInInfo: () => {},
    setSignInErrors: () => {},
  },
});

const AuthProvider = ({ children }) => {
  const [step, setStep] = useState(STEPS.SIGN_UP);
  const [signUpInfo, setSignUpInfo] = useState({
    [SIGN_UP_NAMES.EMAIL]: "",
    [SIGN_UP_NAMES.ID]: "",
    [SIGN_UP_NAMES.PW]: "",
    [SIGN_UP_NAMES.CHECK]: "",
  });
  const [signUpErrors, setSignUpErrors] = useState({
    [SIGN_UP_NAMES.EMAIL]: false,
    [DUPLICATE]: false,
    [SIGN_UP_NAMES.ID]: false,
    [SIGN_UP_NAMES.PW]: false,
    [SIGN_UP_NAMES.CHECK]: false,
  });
  const [signInInfo, setSignInInfo] = useState({
    [SIGN_IN_NAMES.ID]: "",
    [SIGN_IN_NAMES.PW]: "",
  });
  const [signInErrors, setSignInErrors] = useState({
    [SIGN_IN_NAMES.ID]: false,
    [SIGN_IN_NAMES.PW]: false,
  });

  const value = {
    state: { step, signInInfo, signInErrors, signUpInfo, signUpErrors },
    actions: {
      setStep,
      setSignInInfo,
      setSignInErrors,
      setSignUpInfo,
      setSignUpErrors,
    },
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const AuthConsumer = AuthContext.Consumer;

export { SIGN_IN_NAMES, AuthProvider, AuthConsumer };
export default AuthContext;
