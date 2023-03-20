import { createContext, useState } from "react";
import { NAMES as SIGN_IN_NAMES } from "./SignUp";
import { STEPS } from "./index";

const SIGN_UP_NAMES = {
  ID: "id",
  PW: "password",
};

const AuthContext = createContext({
  state: {
    step: [STEPS.SIGN_UP],
    signInInfo: {
      [SIGN_IN_NAMES.EMAIL]: "",
      [SIGN_IN_NAMES.ID]: "",
      [SIGN_IN_NAMES.PW]: "",
      [SIGN_IN_NAMES.CHECK]: "",
    },
    signInErrors: {
      [SIGN_IN_NAMES.EMAIL]: false,
      [SIGN_IN_NAMES.ID]: false,
      [SIGN_IN_NAMES.PW]: false,
      [SIGN_IN_NAMES.CHECK]: false,
    },

    signUpInfo: {
      [SIGN_UP_NAMES.ID]: "",
      [SIGN_UP_NAMES.PW]: "",
    },
    signUpErrors: {
      [SIGN_UP_NAMES.ID]: false,
      [SIGN_UP_NAMES.PW]: false,
    },
  },
  actions: {
    setStep: () => {},
    setSignInInfo: () => {},
    setSignInError: () => {},
    setSignUpInfo: () => {},
    setSignUpError: () => {},
  },
});

const AuthProvider = ({ children }) => {
  const [step, setStep] = useState(STEPS.SIGN_UP);
  const [signInInfo, setSignInInfo] = useState({
    [SIGN_IN_NAMES.EMAIL]: "",
    [SIGN_IN_NAMES.ID]: "",
    [SIGN_IN_NAMES.PW]: "",
    [SIGN_IN_NAMES.CHECK]: "",
  });
  const [signInErrors, setSignInError] = useState({
    [SIGN_IN_NAMES.EMAIL]: false,
    [SIGN_IN_NAMES.ID]: false,
    [SIGN_IN_NAMES.PW]: false,
    [SIGN_IN_NAMES.CHECK]: false,
  });
  const [signUpInfo, setSignUpInfo] = useState({
    [SIGN_UP_NAMES.ID]: "",
    [SIGN_UP_NAMES.PW]: "",
  });
  const [signUpErrors, setSignUpError] = useState({
    [SIGN_UP_NAMES.ID]: false,
    [SIGN_UP_NAMES.PW]: false,
  });

  const value = {
    state: { step, signInInfo, signInErrors, signUpInfo, signUpErrors },
    actions: {
      setStep,
      setSignInInfo,
      setSignInError,
      setSignUpInfo,
      setSignUpError,
    },
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const AuthConsumer = AuthContext.Consumer;

export { AuthProvider, AuthConsumer };
export default AuthContext;
